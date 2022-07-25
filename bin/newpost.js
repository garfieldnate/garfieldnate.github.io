const dayjs = require('dayjs');
const path = require('path');
const fs = require('fs');

if (process.argv.length < 3) {
    console.log('Usage: node newpost.js <title>');
    process.exit(1);
}

const title = process.argv[2];

const now = new dayjs();
const slug = `${now.format('YYYY-MM-DD')}-${title.toLowerCase().replace(/\s+/g, '-')}`;
const frontmatter =
`title: ${title}
description: Intro to Japanese morphological analysis
categories:
- x
- y
- z
publishDate: ${now.format('YYYY-MM-DD')}
layout: "../../../layouts/BlogPost.astro",
---
`;

const filePath = path.join(__dirname, `../src/pages/blog/posts/${slug}.md`);
fs.writeFileSync(filePath, frontmatter);

console.log("Created new post: ", filePath);
