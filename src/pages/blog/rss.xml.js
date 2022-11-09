import rss from '@astrojs/rss';

import { organizePosts } from './util';

const postImportResult = import.meta.globEager('./**/*.mdx');
const unsortedPosts = Object.values(postImportResult);

const posts = organizePosts(unsortedPosts).map((post) => ({
    link: post.url,
    title: post.frontmatter.title,
    pubDate: post.frontmatter.publishDate,
    description: post.frontmatter.description,
}));

export const get = () => rss({
    title: "Nathan Glenn's Blog",
    description: "Software, linguistics, and other random things I write about.",
    site: import.meta.env.SITE,
    items: posts,
    customData: "<language>en-us</language>",
    stylesheet: "/rss/pretty-feed-v3.xsl"
});
