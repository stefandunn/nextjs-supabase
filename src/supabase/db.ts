import { supabase } from "./client";

export const db = supabase;
export const table = (tableName: string) => db.from(tableName);
