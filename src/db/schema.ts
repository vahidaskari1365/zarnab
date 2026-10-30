import {
  boolean,
  integer,
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export type OrderItem = {
  slug: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  weightGrams?: number;
};

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  tagline: text("tagline").notNull().default(""),
  description: text("description").notNull().default(""),
  image: text("image").notNull().default("/images/necklace.jpg"),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  subtitle: text("subtitle").notNull().default(""),
  description: text("description").notNull().default(""),
  story: text("story").notNull().default(""),
  categorySlug: text("category_slug").notNull(),
  price: integer("price").notNull(),
  compareAtPrice: integer("compare_at_price"),
  weightGrams: integer("weight_grams").notNull().default(0),
  karat: text("karat").notNull().default("18"),
  stone: text("stone").notNull().default(""),
  stock: integer("stock").notNull().default(0),
  images: jsonb("images").$type<string[]>().notNull().default([]),
  badge: text("badge"),
  featured: boolean("featured").notNull().default(false),
  ratingX10: integer("rating_x10").notNull().default(49),
  reviewCount: integer("review_count").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  orderNumber: text("order_number").notNull().unique(),
  customerName: text("customer_name").notNull(),
  phone: text("phone").notNull(),
  email: text("email").notNull().default(""),
  city: text("city").notNull().default(""),
  address: text("address").notNull().default(""),
  note: text("note").notNull().default(""),
  items: jsonb("items").$type<OrderItem[]>().notNull().default([]),
  total: integer("total").notNull().default(0),
  status: text("status").notNull().default("pending"),
  paymentMethod: text("payment_method").notNull().default("online"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().default(""),
  phone: text("phone").notNull().default(""),
  email: text("email").notNull().default(""),
  topic: text("topic").notNull().default("مشاوره خرید"),
  message: text("message").notNull().default(""),
  source: text("source").notNull().default("website"),
  status: text("status").notNull().default("new"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  excerpt: text("excerpt").notNull().default(""),
  content: text("content").notNull().default(""),
  category: text("category").notNull().default("دانشنامه طلا"),
  cover: text("cover").notNull().default("/images/campaign.jpg"),
  readMinutes: integer("read_minutes").notNull().default(5),
  tags: jsonb("tags").$type<string[]>().notNull().default([]),
  publishedAt: timestamp("published_at", { withTimezone: true }).notNull().defaultNow(),
});

export const faqs = pgTable("faqs", {
  id: serial("id").primaryKey(),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  category: text("category").notNull().default("عمومی"),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const keywords = pgTable(
  "keywords",
  {
    id: serial("id").primaryKey(),
    keyword: text("keyword").notNull(),
    intent: text("intent").notNull().default("commercial"),
    volume: integer("volume").notNull().default(0),
    position: integer("position").notNull().default(0),
    previousPosition: integer("previous_position").notNull().default(0),
    landingPage: text("landing_page").notNull().default("/"),
    aiCitations: integer("ai_citations").notNull().default(0),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [uniqueIndex("keywords_keyword_unique").on(table.keyword)],
);

export const settings = pgTable("settings", {
  key: text("key").primaryKey(),
  value: text("value").notNull().default(""),
});

export const subscribers = pgTable("subscribers", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export type Product = typeof products.$inferSelect;
export type Category = typeof categories.$inferSelect;
export type Order = typeof orders.$inferSelect;
export type Lead = typeof leads.$inferSelect;
export type Post = typeof posts.$inferSelect;
export type Faq = typeof faqs.$inferSelect;
export type Keyword = typeof keywords.$inferSelect;
