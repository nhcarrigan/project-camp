import { InferSelectModel } from "drizzle-orm";
import { testTable } from "./schema";

export type TestTable = InferSelectModel<typeof testTable>;
