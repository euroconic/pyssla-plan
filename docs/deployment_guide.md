# Deployment Guide for Pyssla Plan

Since **Pyssla Plan** is a modern React application (built with Vite), it can be deployed as a highly performant **Static Site**.

Here are the best free and low-cost options to host your application.

## 1. Vercel (Recommended) 🥇
**Best for:** React apps, ease of use, and future integration with databases (like Supabase).
*   **Cost:** Free for personal/hobby use.
*   **Setup:**
    1.  Push your code to **GitHub**.
    2.  Go to [Vercel.com](https://vercel.com) and sign up with GitHub.
    3.  Click **"Add New Project"** and select your `pyssla-plan` repository.
    4.  Vercel will detect `Vite` automatically.
    5.  Click **Deploy**.
*   **Why:** It's incredibly fast, gives you a `.vercel.app` domain, and automatically rebuilds whenever you push code changes.

## 2. Netlify 🥈
**Best for:** Alternative to Vercel, very robust free tier.
*   **Cost:** Free for personal use.
*   **Setup:**
    1.  Go to [Netlify.com](https://netlify.com).
    2.  Drag and drop your `dist` folder (created by running `npm run build`) onto their dashboard for a quick manual deploy.
    3.  **Or** connect GitHub for auto-deployments (similar to Vercel).

## 3. GitHub Pages 🥉
**Best for:** Keeping everything in GitHub. 100% free.
*   **Cost:** Free.
*   **Setup:** Requires a small logic change in `vite.config.js` (`base` path) and a GitHub Action workflow.
*   **Steps:**
    1.  Update `vite.config.js`:
        ```js
        export default defineConfig({
          base: '/pyssla-plan/', // Your repo name
          plugins: [react()],
          //...
        })
        ```
    2.  Push code to GitHub.
    3.  Go to Repo Settings > Pages > Source > GitHub Actions.

## Recommendations for "Cloud Library"
You mentioned wanting a database later (for saving designs).
*   **Frontend:** Host on **Vercel**.
*   **Backend/Database:** Use **Supabase**.
*   **Connection:** Vercel allows you to add "Environment Variables" easily, so you can securely connect your Vercel (App) to Supabase (Database) without exposing secrets in your code.

## How to prepare for deployment (Build)
Before manually deploying (e.g. to Netlify drag-and-drop), you must build the app:

```bash
npm run build
```

This creates a `dist` folder with optimized files ready for the web.
