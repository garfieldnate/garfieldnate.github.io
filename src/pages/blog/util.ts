
/**
 * Order posts from newest to oldest and filter out drafts
 * TODO: environment variable or argument for also rendering drafts
 */
export const organizePosts = (posts: MD[]) =>
    posts
        .filter(doc => !doc.frontmatter.draft)
        .sort(function (a, b) {
            return (
                new Date(b.frontmatter.publishDate).valueOf() -
                new Date(a.frontmatter.publishDate).valueOf()
            )
        })
