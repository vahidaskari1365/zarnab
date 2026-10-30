import {
  CATEGORIES,
  DEMO_LEADS,
  DEMO_ORDERS,
  DEMO_SUBSCRIBERS,
  FAQS,
  KEYWORDS,
  POSTS,
  PRODUCTS,
  SETTINGS,
  type Category,
  type Faq,
  type Keyword,
  type Lead,
  type Order,
  type Post,
  type Product,
  type Subscriber,
} from "@/lib/catalog";

export type ProductQuery = {
  category?: string;
  sort?: string;
  q?: string;
  featured?: boolean;
  limit?: number;
  minPrice?: number;
  maxPrice?: number;
};

/** همهٔ داده‌ها از کاتالوگ دمو خوانده می‌شوند — بدون دیتابیس. */

export async function getCategories(): Promise<Category[]> {
  return [...CATEGORIES].sort((a, b) => a.sortOrder - b.sortOrder);
}

export async function getProducts(query: ProductQuery = {}): Promise<Product[]> {
  let items = [...PRODUCTS];

  if (query.category) items = items.filter((item) => item.categorySlug === query.category);
  if (query.featured) items = items.filter((item) => item.featured);
  if (query.q) {
    const term = query.q.trim().toLowerCase();
    items = items.filter((item) =>
      [item.name, item.subtitle, item.description, item.stone]
        .some((field) => field.toLowerCase().includes(term)),
    );
  }
  if (typeof query.minPrice === "number") items = items.filter((item) => item.price >= query.minPrice!);
  if (typeof query.maxPrice === "number") items = items.filter((item) => item.price <= query.maxPrice!);

  switch (query.sort) {
    case "price-asc":
      items.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      items.sort((a, b) => b.price - a.price);
      break;
    case "weight":
      items.sort((a, b) => b.weightGrams - a.weightGrams);
      break;
    case "newest":
      items.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      break;
    default:
      items.sort((a, b) => Number(b.featured) - Number(a.featured) || a.id - b.id);
  }

  return items.slice(0, query.limit ?? 60);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  return PRODUCTS.find((product) => product.slug === slug) ?? null;
}

export async function getProductById(id: number): Promise<Product | null> {
  return PRODUCTS.find((product) => product.id === id) ?? null;
}

export async function getRelatedProducts(categorySlug: string, slug: string): Promise<Product[]> {
  return PRODUCTS.filter((product) => product.categorySlug === categorySlug && product.slug !== slug).slice(0, 4);
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  return CATEGORIES.find((category) => category.slug === slug) ?? null;
}

export async function getPosts(limit = 12): Promise<Post[]> {
  return [...POSTS]
    .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime())
    .slice(0, limit);
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  return POSTS.find((post) => post.slug === slug) ?? null;
}

export async function getFaqs(): Promise<Faq[]> {
  return [...FAQS].sort((a, b) => a.sortOrder - b.sortOrder);
}

export async function getSettings(): Promise<Record<string, string>> {
  return { ...SETTINGS };
}

export async function getKeywords(): Promise<Keyword[]> {
  return [...KEYWORDS].sort((a, b) => a.id - b.id);
}

export async function getOrders(limit = 60): Promise<Order[]> {
  return [...DEMO_ORDERS]
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, limit);
}

export async function getLeads(limit = 60): Promise<Lead[]> {
  return [...DEMO_LEADS]
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, limit);
}

export async function getSubscribers(limit = 60): Promise<Subscriber[]> {
  return [...DEMO_SUBSCRIBERS]
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, limit);
}

export async function getOrderByNumber(orderNumber: string): Promise<Order | null> {
  return DEMO_ORDERS.find((order) => order.orderNumber === orderNumber) ?? null;
}

export type DashboardStats = {
  revenue: number;
  orderCount: number;
  pendingOrders: number;
  leadCount: number;
  newLeads: number;
  productCount: number;
  lowStock: number;
  subscriberCount: number;
  avgOrder: number;
};

export async function getDashboardStats(): Promise<DashboardStats> {
  const orderRows = DEMO_ORDERS;
  const revenue = orderRows
    .filter((order) => order.status !== "cancelled")
    .reduce((sum, order) => sum + order.total, 0);
  return {
    revenue,
    orderCount: orderRows.length,
    pendingOrders: orderRows.filter((order) => order.status === "pending").length,
    leadCount: DEMO_LEADS.length,
    newLeads: DEMO_LEADS.filter((lead) => lead.status === "new").length,
    productCount: PRODUCTS.length,
    lowStock: PRODUCTS.filter((product) => product.stock <= 3).length,
    subscriberCount: DEMO_SUBSCRIBERS.length,
    avgOrder: orderRows.length ? Math.round(revenue / orderRows.length) : 0,
  };
}

export type { Category, Faq, Keyword, Lead, Order, Post, Product, Subscriber };
