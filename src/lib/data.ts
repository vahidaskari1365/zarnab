import { and, asc, desc, eq, ilike, ne, or, sql } from "drizzle-orm";
import { db } from "@/db";
import {
  categories,
  faqs,
  keywords,
  leads,
  orders,
  posts,
  products,
  settings,
  subscribers,
  type Category,
  type Faq,
  type Keyword,
  type Lead,
  type Order,
  type Post,
  type Product,
} from "@/db/schema";

async function safe<T>(operation: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await operation();
  } catch (error) {
    console.error("database query failed", error);
    return fallback;
  }
}

export type ProductQuery = {
  category?: string;
  sort?: string;
  q?: string;
  featured?: boolean;
  limit?: number;
  minPrice?: number;
  maxPrice?: number;
};

export function getCategories(): Promise<Category[]> {
  return safe(
    () => db.select().from(categories).orderBy(asc(categories.sortOrder)),
    [],
  );
}

export function getProducts(query: ProductQuery = {}): Promise<Product[]> {
  return safe(async () => {
    const filters = [];
    if (query.category) filters.push(eq(products.categorySlug, query.category));
    if (query.featured) filters.push(eq(products.featured, true));
    if (query.q) {
      const term = `%${query.q}%`;
      filters.push(
        or(
          ilike(products.name, term),
          ilike(products.subtitle, term),
          ilike(products.description, term),
          ilike(products.stone, term),
        ),
      );
    }
    if (typeof query.minPrice === "number") filters.push(sql`${products.price} >= ${query.minPrice}`);
    if (typeof query.maxPrice === "number") filters.push(sql`${products.price} <= ${query.maxPrice}`);

    const orderBy =
      query.sort === "price-asc"
        ? asc(products.price)
        : query.sort === "price-desc"
          ? desc(products.price)
          : query.sort === "weight"
            ? desc(products.weightGrams)
            : query.sort === "newest"
              ? desc(products.createdAt)
              : desc(products.featured);

    return db
      .select()
      .from(products)
      .where(filters.length ? and(...filters) : undefined)
      .orderBy(orderBy, asc(products.id))
      .limit(query.limit ?? 60);
  }, []);
}

export function getProductBySlug(slug: string): Promise<Product | null> {
  return safe(async () => {
    const rows = await db.select().from(products).where(eq(products.slug, slug)).limit(1);
    return rows[0] ?? null;
  }, null);
}

export function getRelatedProducts(categorySlug: string, slug: string): Promise<Product[]> {
  return safe(
    () =>
      db
        .select()
        .from(products)
        .where(and(eq(products.categorySlug, categorySlug), ne(products.slug, slug)))
        .limit(4),
    [],
  );
}

export function getCategoryBySlug(slug: string): Promise<Category | null> {
  return safe(async () => {
    const rows = await db.select().from(categories).where(eq(categories.slug, slug)).limit(1);
    return rows[0] ?? null;
  }, null);
}

export function getPosts(limit = 12): Promise<Post[]> {
  return safe(
    () => db.select().from(posts).orderBy(desc(posts.publishedAt)).limit(limit),
    [],
  );
}

export function getPostBySlug(slug: string): Promise<Post | null> {
  return safe(async () => {
    const rows = await db.select().from(posts).where(eq(posts.slug, slug)).limit(1);
    return rows[0] ?? null;
  }, null);
}

export function getFaqs(): Promise<Faq[]> {
  return safe(() => db.select().from(faqs).orderBy(asc(faqs.sortOrder)), []);
}

export function getSettings(): Promise<Record<string, string>> {
  return safe(async () => {
    const rows = await db.select().from(settings);
    return Object.fromEntries(rows.map((row) => [row.key, row.value]));
  }, {});
}

export function getKeywords(): Promise<Keyword[]> {
  return safe(
    () => db.select().from(keywords).orderBy(asc(keywords.position)),
    [],
  );
}

export function getOrders(limit = 60): Promise<Order[]> {
  return safe(
    () => db.select().from(orders).orderBy(desc(orders.createdAt)).limit(limit),
    [],
  );
}

export function getLeads(limit = 60): Promise<Lead[]> {
  return safe(
    () => db.select().from(leads).orderBy(desc(leads.createdAt)).limit(limit),
    [],
  );
}

export function getSubscribers(limit = 60): Promise<{ id: number; email: string; createdAt: Date }[]> {
  return safe(
    () => db.select().from(subscribers).orderBy(desc(subscribers.createdAt)).limit(limit),
    [],
  );
}

export function getOrderByNumber(orderNumber: string): Promise<Order | null> {
  return safe(async () => {
    const rows = await db.select().from(orders).where(eq(orders.orderNumber, orderNumber)).limit(1);
    return rows[0] ?? null;
  }, null);
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
  return safe(
    async () => {
      const [orderRows, leadRows, productRows] = await Promise.all([
        db.select().from(orders),
        db.select().from(leads),
        db.select().from(products),
      ]);
      const subscriberRows = await db.select().from(subscribers);
      const revenue = orderRows
        .filter((order) => order.status !== "cancelled")
        .reduce((sum, order) => sum + order.total, 0);
      return {
        revenue,
        orderCount: orderRows.length,
        pendingOrders: orderRows.filter((order) => order.status === "pending").length,
        leadCount: leadRows.length,
        newLeads: leadRows.filter((lead) => lead.status === "new").length,
        productCount: productRows.length,
        lowStock: productRows.filter((product) => product.stock <= 3).length,
        subscriberCount: subscriberRows.length,
        avgOrder: orderRows.length ? Math.round(revenue / orderRows.length) : 0,
      };
    },
    {
      revenue: 0,
      orderCount: 0,
      pendingOrders: 0,
      leadCount: 0,
      newLeads: 0,
      productCount: 0,
      lowStock: 0,
      subscriberCount: 0,
      avgOrder: 0,
    },
  );
}

export type { Category, Faq, Keyword, Lead, Order, Post, Product };
