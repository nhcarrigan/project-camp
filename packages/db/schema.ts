import { defineRelations } from "drizzle-orm";
import { pgTable, text,integer, timestamp, uuid } from "drizzle-orm/pg-core";

export const testTable = pgTable("test_table", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  lastName: text("last_name").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const projectOwnerTable = pgTable("owners", {
  id: uuid("id").primaryKey().defaultRandom(),
  username: text("username"),
  image: text("image")
})

export const tagTable = pgTable("tags", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name"), 
  slug: text("slug")
});

export const projectTable =  pgTable("projects", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: text("slug").notNull(),
  title: text("title").notNull(),
  summary: text("summary").notNull(),
  repositoryUrl: text("string"),
  status: text("status").notNull(),
  voteCount: integer("vote_count"),
  followerCount: integer("follow_count"),
  tags: uuid("tag_id"),
  owner_id: uuid("owner_id"),
  createdAt: timestamp("created_at")
})


export const relations = defineRelations({ projectTable, tagTable, projectOwnerTable }, (r) => ({
	projectTable: {
    tags: r.many.tagTable({
      from: r.projectTable.id,
      to: r.tagTable.id,
    })
  }
}))