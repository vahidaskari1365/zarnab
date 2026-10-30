import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

function createDb(pool: Pool) {
  return drizzle(pool);
}

type DrizzleDb = ReturnType<typeof createDb>;

const globalForDb = globalThis as typeof globalThis & {
  __zarnabPgPool?: Pool;
  __zarnabDb?: DrizzleDb;
};

/**
 * اتصال‌ها تنبل ساخته می‌شوند: فقط وقتی اولین کوئری واقعی اجرا شود.
 * به این ترتیب `next build` بدون DATABASE_URL هم با موفقیت جمع می‌شود
 * (مثلاً روی Vercel که متغیرهای محیطی زمان اجرا در دسترس build نیستند)،
 * و خطای اتصال در زمان اجرا توسط safe() در src/lib/data.ts گرفته می‌شود.
 */
export function getPool(): Pool {
  if (globalForDb.__zarnabPgPool) return globalForDb.__zarnabPgPool;

  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error("DATABASE_URL is required");
  }

  globalForDb.__zarnabPgPool = new Pool({
    connectionString: databaseUrl,
  });
  return globalForDb.__zarnabPgPool;
}

export function getDb(): DrizzleDb {
  if (globalForDb.__zarnabDb) return globalForDb.__zarnabDb;
  globalForDb.__zarnabDb = createDb(getPool());
  return globalForDb.__zarnabDb;
}

/**
 * پروکسی تنبل: import این ماژول هرگز محیط را نمی‌خواند و throw نمی‌کند؛
 * خطای «DATABASE_URL is required» فقط زمان اجرای واقعی کوئری ظاهر می‌شود.
 */
export const db = new Proxy({} as DrizzleDb, {
  get(_target, prop) {
    const instance = getDb() as unknown as Record<PropertyKey, unknown>;
    const value = instance[prop];
    return typeof value === "function" ? value.bind(instance) : value;
  },
});
