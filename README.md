# About

This repo is a starter-kit for setting up a NextJS app with Supabase with the following features:

- Authentication (Supabase Auth)
- Database Integration (Supabase Database)
- API (Supabase functions)

The following packages are installed as part of this starter-kit:

- `recoiljs` - Global state management for user persistant state
- `wildcard-match` - For wildcard route matching

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

## Learn More (NextJS)

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## More About This Starter Kit

### Guest routes

To set up which routes are `guest` accessible (i.e, not requiring an authenticated user to access), you can populate the `guestRoutes` prop to `AuthWrapper`. The values in the array should contain trailing slashes to match the path values returned from NextJS router object. You can also use glob patterns like `/terms/*` to match `/terms/refunds/` and `/terms/delivery` etc for example.

```
const guestRoutes = [
  '/login/',
  '/signup/',
  '/terms/*',
  '/contact/'
];

<AuthWrapper guestRoutes={guestRoutes}>
  <Component />
</AuthWrapper>
```

### Redirect to Auth routes

Some routes you may not want users to access when authenticated, for instance you may want to redirect a user from `/login/` back to `/`. At times you want to redirect all authenticated users to `/` when accessing any guest route.

```
const guestRoutes = [
  '/login/',
  '/signup/',
];

<AuthWrapper redirectIfAuthedRoutes={guestRoutes}>
  <Component />
</AuthWrapper>
```

But sometimes you want these differentiated:

```
const guestRoutes = [
  '/login/',
  '/signup/',
  '/terms/*',
  '/contact/'
];

const redirectIfAuthedRoutes = [
  '/login/',
  '/signup/',
];

<AuthWrapper guestRoutes={guestRoutes} redirectIfAuthedRoutes={guestRoutes}>
  <Component />
</AuthWrapper>
```
