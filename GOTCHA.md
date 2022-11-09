# Gotchas

These are the issues I ran into, and am likely to run into again, while working on this site.

## Lazy Errors

When running your site in dev mode, pages are generated lazily. If you have a syntax issue in one of your pages, you won't find out about it until you navigate to that page. You must generate the entire site via `yarn run build` to find all errors.

## Including `.DS_Store`

`DS_Store` is the folder where Mac puts files you've deleted (until you empty your trash). Astro doesn't ignore the folder, and will process and serve files inside, so if you deploy from your own computer you may accidentally release to the public files you meant to be deleted! Better to deploy from a GitHub Action or other CI service.

## Restart on Install

Every time you install a new dependency, you should restart your development server. The site will not build correctly and will give you cryptic errors. One example of such an error:

```
Error: `line` must be greater than 0 (lines start at line 1)
```

## Cryptic error messsages

Astro glues together several other systems, and errors meant for users of subsystems are not translated for users of Astro. This means that you'll see messages like this:

```
  reason: 'Could not parse expression with acorn: Unexpected token',
  line: 12,
  column: 3,
```
`acorn` is the markdown parser. Which markdown file has an issue is not mentioned. And finally the line numbers are never correct for various reasons; in the case of markdown, you must subtract the number of lines in the front matter to get the correct line number within the document body.

## Mixed Markdown Support

There's pretty nice syntax highlighting and navigation in .astro files in TS code. However, markdown files have no syntax highlighting for the code in the `setup` section and no navigation anywhere (clicking on inline components will not take you to the definition).

Additionally there are no compiler warnings when passing non-existent properties to an astro component in a markdown file. This is a real shame, given all of the effort to make typesafe components.

Putting an incorrect path into the `layout` property results in the dev server exiting with another cryptic error.

## Imports

You must put `.astro` in your `import` commands for astro components. Imports of `ts` or `tsx` files should not contain extensions.

The error below was caused by forgetting the `.astro`:

```
[astro] update /src/components/ResponsiveFigure.astro
 error   failed to load module for ssr: ../../components/ResponsiveFigure
    at instantiateModule (/Users/nathanglenn/workspaces/personal_workspace/personal_site_astro/node_modules/vite/dist/node/chunks/dep-c9998dc6.js:50231:15)
```

## Plaintext Code blocks

```
The language "plaintext" doesn't exist, falling back to plaintext.
```

`console` doesn't exist either. Maybe this is an issue with acorn? These are warnings anyway, so you can just ignore them.

## duplicated mapping key

```
 error   duplicated mapping key
```

This means you have the same property in your frontmatter listed twice.

## Input File Missing

```
node:internal/process/promises:279
            triggerUncaughtException(err, true /* fromPromise */);
            ^

[Error: Input file is missing]
```

This comes from astro-imagetools, which couldn't find a specified image file somewhere. Either you haven't added it to the project or you got the `src` attribute wrong. Too bad it doesn't give you the file name :/

## Not a Valid Picture Config Option

```
[astro-imagetools]  xx  is not a valid Picture Config Option
[astro-imagetools]  yy  is not a valid Picture Config Option
```

URL parameters and anchors in external image links cause issues for astro-imagetools. The warnings above are caused by parameters, which are stripped and then assumed to be component configuration options somehow. Anchors, on the other hand, are *not* stripped and will be considered part of the image extension, which will lead to a separate issue because the image file type cannot be recognized.

## Relative Image Links

astro-imagetools is only able to handle relative image links in markdown if you use the markdown syntax for including an image or the plain HTML `img` tag. There's no way to do this with a `Picture` component.

## Imagetools Component Parameter Types

These are not exported, so it's not possible to extend them to use in another component that wraps a `Picture` component, for example.

## Import/Export

Currently you have to put `export` statements before other statements in an Astro component. For example, the code below fails:

```
---
import { Picture } from "astro-imagetools/components";

interface Project {
    img_src: string;
    img_alt: string;
    name: string;
    description: string;
    repo: string | null;
};

export interface Props {
    projects: Project[]
};

const {
    projects
} = Astro.props as Props;
---
```

giving the following error:

```
 error   Transform failed with 1 error:
  /Users/nathanglenn/workspaces/personal_workspace/personal_site_astro/src/components/Portfolio.astro:40:0: ERROR: Unexpected "export"
```

And BTW that file is less than 40 lines long!

Known bug: https://github.com/withastro/astro/issues/3787.

A similar issue you may encounter:

```
 error   Transform failed with 1 error:
  /Users/nathanglenn/workspaces/personal_workspace/personal_site_astro/src/pages/blog/index.astro:51:7: ERROR: Unexpected "Portfolio"
```

The imports also have to come first in the file (starting to feel very C++ :/).

Also, not an Astro issue but was a gotcha for me: if you get `Error: Unable to render [Component] because it is undefined!`, you might have imported an astro component as `import { Component }` instead of `import Component`.

## JSON

If you mess up a JSON file that you import in a markdown file, you might get something like this:

```
Failed to parse JSON file, invalid JSON syntax found at line 1823
```

The line number is completely nonsensical and the JSON file with an issue is not listed.


## JSX

Using the comment shortcut (cmd-/) in VS code doesn't comment JSX in astro components! Puts in `//`, which doesn't work.

## CSS

If you have an issue in a CSS in a `<style>` tag in an astro component, you'll get something like this:

```
 error   /Users/nathanglenn/workspaces/personal_workspace/personal_site_astro/src/components/Portfolio.astro?astro&type=style&lang.css:15:12: Unknown word
 ```

You'll have to figure out the correct line number by subtracting the length of the frontmatter code.

## HTML

HTML files aren't rendered if placed in the pages directory, but that will change soon: https://github.com/withastro/astro/pull/3867. For now you just have to put them in the `public` folder to be rendered as-is. Taking advantage of this feature may allow Astro to optimize your HTML files.

## Imagetools Cache

Sometimes you need to force imagetools to reprocess an image (the image you see on your page is stale). Restarting the dev server will still use the stale images. Only way to fix this is to delete the imagetools cache: `rm -rf node_modules/.cache/astro-imagetools/`.

## Astro types

The "Astro" global is injected into the scope only inside of .astro component files. The declaration in astro's env.d.ts file contains this note:

```
// Caution! The types here are only available inside Astro files (injected automatically by our language server)
// As such, if the typings you're trying to add should be available inside ex: React components, they should instead
// be inside `client-base.d.ts`
```

For example, I wanted a utility function for sorting blog posts, and I wanted the function to accept the result of Astro.glob, which I would type as `ReturnType<Astro.glob>`. However, the `Astro` type is not available in the utility type, so I instead needed to type the parameter as `MD`, which is the same thing and is available in the `client-base.d.ts` file. If astro ever changes the return type of `Astro.glob`, I'll have to change the type of the parameter in my utility function.

## MDX/MD incompatibilities

All HTML tags must be closed, including those that are not normally closed in HTML. For example, If you have an `<img>` element in an MDX file, unlike in regular HTML you have to add a close `</img>` tag. This is [documented](https://kabartolo.github.io/chicago-docs-demo/docs/mdx-guide/errors/#unclosed-tags). Missing end tags result in an error message like this:

    Unexpected closing tag `</a>`, expected corresponding closing tag for `<img>` (2:146-2:233)

Note that the printed document location is not correct.

Comments cannot be placed in HTML comment tags (`<!-- ... -->`). The syntax instead is `{/* ... */}`. Using the HTML comment syntax will result in the following helpful error message:

    Unexpected character `!` (U+0021) before name, expected a character that can start a name, such as a letter, `$`, or `_` (note: to create a comment in MDX, use `{/* text */}`)

No document location is printed in this error, for some reason.

## VSCode MDX Plugin from unified

The filetype association to use in VSCode for .mdx files is "Markdown React".

The plugin can comment lines correctly for you with cmd-/, but if you try to comment out a selection of text within a line, the result will still be the entire line being commented.

Also, the plugin doesn't colorize MDX comments in dark green, while it does still colorize HTML comments in dark green, even though those are actually a syntax error in MDX.
