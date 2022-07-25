# Personal Website

This is the source for my personal portfolio and blog website: nateglenn.com. It's generated using Astro. The domain name is registered with CloudFlare. The [page quality scores from Lighthouse](https://web.dev/measure/?url=https%3A%2F%2Fnateglenn.com) are 92 for performance, 100 for best practices and SEO, and 89 for accessibility. Fixing the accessibility issue would require some redesign to improve text color contrast.

To create a new blog post, use `yarn run newpost <title>`. To publish the post, remove `draft: true` from the frontmatter.

`public/resume/resume-en.html` and `resume-ja.html` must be generated via a separate project and copied over manually: https://github.com/garfieldnate/resume.

Overall I'm really enjoying working with Astro, but it's beta software and there have been a lot of sharp corners. I've gathered issues I encountered under [GOTCHA.md](GOTCHA.md).

Original Astro template project readme below:

# Astro Starter Kit: Blog

```
npm init astro -- --template blog
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/withastro/astro/tree/latest/examples/blog)

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

Features:

- ✅ SEO-friendly setup with canonical URLs and OpenGraph data
- ✅ Full Markdown support

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```
├── public
│   ├── assets
│   │   └── blog
│   │       └── introducing-astro.jpg
│   ├── favicon.ico
│   ├── social.jpg
│   └── social.png
├── src
│   ├── components
│   │   ├── Author.astro
│   │   ├── BaseHead.astro
│   │   ├── BlogPostPreview.astro
│   │   ├── FollowMe.astro
│   │   ├── Header.astro
│   │   └── LikeButton.tsx
│   ├── layouts
│   │   └── BlogPost.astro
│   ├── pages
│   │   ├── index.astro
│   │   └── posts
│   │       ├── interactive-content.md
│   │       └── static-content.md
│   └── styles
│       └── blog.css
├── astro.config.mjs
├── README.md
├── package.json
└── tsconfig.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command           | Action                                       |
| :---------------- | :------------------------------------------- |
| `npm install`     | Installs dependencies                        |
| `npm run dev`     | Starts local dev server at `localhost:3000`  |
| `npm run build`   | Build your production site to `./dist/`      |
| `npm run preview` | Preview your build locally, before deploying |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
