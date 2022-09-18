import { User } from "@supabase/supabase-js";
import { atom } from "recoil";

export const UserState = atom<User | null>({
  key: "user",
  default: null,
});
