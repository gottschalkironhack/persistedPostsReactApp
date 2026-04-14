# Posts App

A React + TypeScript application that fetches posts from JSONPlaceholder and displays them in a paginated, searchable table with favorite management.

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview production build |
| `npm test` | Run tests in watch mode |
| `npm run test:run` | Run tests once |

## Project Structure

```
src/
├── api/
│   └── postsApi.ts          # API fetch logic
├── components/
│   ├── ErrorBoundary.tsx     # React error boundary
│   ├── ErrorState.tsx        # Error display with retry
│   ├── FavoritePostsTable.tsx # Favorites table
│   ├── Pagination.tsx        # Reusable pagination controls
│   ├── PostsTable.tsx        # Main posts table
│   ├── SearchInput.tsx       # Search input field
│   ├── SkeletonTable.tsx     # Loading skeleton
│   └── Table.tsx             # Generic reusable table
├── helpers/
│   ├── comparePosts.ts       # Reconcile favorites with fresh data
│   └── storeFavorites.ts     # localStorage persistence
├── hooks/
│   └── usePosts.ts           # Main data hook
├── pages/
│   └── Posts.tsx             # Page-level orchestration
├── test/
│   └── setup.ts             # Test environment setup
├── types.ts                  # Shared TypeScript types
├── App.tsx                   # Root component with global styles
└── main.tsx                  # Entry point
```

## Features

- Fetch and display 100 posts from JSONPlaceholder API
- Client-side pagination (10 per page)
- Search/filter posts by title
- Skeleton loader during initial load
- Error state with retry button
- Error boundary for unexpected render errors
- Refresh button to re-fetch data
- Favorite/unfavorite posts (persisted to localStorage)
- Favorites reconciliation on refresh (updates changed posts, flags removed ones)

## Tech Stack

- React 18 with TypeScript
- Vite 5
- styled-components 6
- Vitest + React Testing Library
