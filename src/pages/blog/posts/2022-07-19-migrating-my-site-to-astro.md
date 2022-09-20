---
layout: "../../../layouts/BlogPost.astro"
title: "Migrating my Site to Astro"
description: "Technical walkthrough and evaluation"
publishDate: "7 Jul 2022"
draft: true
followMe:
  username: "garfieldnate"
  href: "https://github.com/garfieldnate/"
halfTheMeaning: 21
heroImage:
  src: "/assets/blog/introducing-astro.jpg"
  alt: "Space shuttle leaving curved trail in the sky"
setup: |
  import LikeButton from "../../../components/LikeButton"
  import FollowMe from "../../../components/FollowMe.astro"
---

<FollowMe username={frontmatter.followMe.username} href={frontmatter.followMe.href} />

Access all exported properties with JSX expressions. For example, let's find the meaning of life: **{frontmatter.halfTheMeaning * 2}**

If this seems cool, consider giving my post a like with this Preact component: <LikeButton pageUrl={frontmatter.url} client:load />