import { pgTable, serial, boolean, varchar } from "drizzle-orm/pg-core";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { InferModel } from "drizzle-orm";
import { sql } from "@vercel/postgres";

export const todoTable = pgTable("todos", {
  id: serial("id").primaryKey(),
  todo: varchar("todo", { length: 255 }).notNull(),
  is_done: boolean("is_done").default(false).notNull(),
});

export type Todo = InferModel<typeof todoTable>;
export type NewTodo = InferModel<typeof todoTable, "insert">; // insert type

export const db = drizzle(sql);
