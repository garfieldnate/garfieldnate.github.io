import rss from '@astrojs/rss';

const postImportResult = import.meta.globEager('./**/*.md');
const posts = Object.values(postImportResult);

export const get = () => rss({
    title: "Nathan Glenn's Blog",
    description: "Software, linguistics, and other random things I write about.",
    site: import.meta.env.SITE,
    items: posts.map((post) => ({
        link: post.url,
        title: post.frontmatter.title,
        pubDate: post.frontmatter.publishDate,
        description: post.frontmatter.description,
    })),
    customData: "<language>en-us</language>",
    stylesheet: "/rss/pretty-feed-v3.xsl"
});
