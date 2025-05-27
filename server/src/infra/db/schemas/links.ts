import { pgTable, text, integer, timestamp } from "drizzle-orm/pg-core";
import { uuidv7 } from "uuidv7";

export const links = pgTable("links", {
  id: text("id").primaryKey().$defaultFn(() => uuidv7()),
  link: text("link").notNull(),
  shortLink: text("short_link").notNull().unique(),
  visits: integer("visits").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
