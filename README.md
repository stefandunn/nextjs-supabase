# About

This repo is a starter-kit for setting up a NextJS app with Supabase with the following features:

- Authentication (Supabase Auth)
- Database Integration (Supabase Database)
- API (Supabase functions)

The following packages are installed as part of this starter-kit:

- `lodash` - Util methods
- `immer` - Immutable object manipulation
- `recoiljs` - Global state management

The following modifications have been made:

- `yarn build` will execute a `build` and `export` instead of just a `build`. This exports the site statically also to serve as a static site.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
