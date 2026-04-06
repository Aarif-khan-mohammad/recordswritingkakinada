# Records Writing Kakinada

Professional academic and technical services website built with Next.js and Supabase.

## Setup

1. Clone the repository
2. Copy `.env.example` to `.env.local` and fill in your Supabase credentials
3. Run `npm install`
4. Run `npm run dev`

## Environment Variables

Required in `.env.local` (never commit this file):

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

## Deploy

Deploy on [Vercel](https://vercel.com). Add environment variables in the Vercel dashboard under Project Settings → Environment Variables.
