declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_APP_SUPABASE_URL: string;
      NEXT_APP_SUPABASE_ANON_KEY: string;
    }
  }
}

export {};
