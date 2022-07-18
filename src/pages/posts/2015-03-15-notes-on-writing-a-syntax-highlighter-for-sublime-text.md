---
categories:
- Sublime Text
- packages
- tmLanguage
- syntax highlighting
- BNF
- grammar
- Soar
comments: true
date: 2015-03-15T22:59:35Z
title: Notes on Writing a Syntax Highlighter for Sublime Text
---

I recently released the [Soar Tools](http://garfieldnate.github.io/Sublime-Soar-Tools/) package for Sublime Text, and I took a few notes that might help the next author. Sublime Text is pretty awesome in a lot of ways, but the documentation is more tutorial + forums than it is a thorough explanation. I mainly followed the directions [here](http://sublime-text-unofficial-documentation.readthedocs.org/en/latest/extensibility/syntaxdefs.html). My tips are as follows:

* Don't try to copy that BNF grammar into tmLanguage format. It's not designed for specifying grammars, it's designed for highlighting. That means that it's robust and will highlight while you're typing instead of waiting until you have a compilable program to highlight. This is a big advantage, especially for Soar, where there's a lot of typing to get a production sourcable. Instead of making a fully recursive grammar, pick out the few big areas that should be treated differently, such as the inside of a class or other curly-braced section, and detect them in the main `patterns` list, parsing the insides with patterns in the `repository`.
* Be careful about the YAML syntax. It looks simple, but you can mess it up easily. For example, `paterns` is the ONLY item that takes an array for a child. That means that you should have
    
        patterns:
        - comment:...
but no other keyword will have a child starting with a dash (`-`).

* You need to write the rules in order of application. No two rules will apply to the same section of text, so it's first come, first served. For example, you can't match a JavaDoc comment block starting with `/**` in one rule and *then* match `@arg`, etc. in a separate rule. The proper way to do that is to use a `begin/end` rule with a nested `patterns` section. Put quoted strings first, and then comments. That way `"this is a //string"`` doesn't turn into half-string, half-comment.
* Regexes are for the most part Perly; lookahead (`(?!xyz)`)works, but I haven't tested other look-arounds. One gotcha to keep in mind is that `*` and `+` do not match greedily, unlike Perl.  
* `include:` sections must be inside `patterns:` sections.
* You'll do lots of re-loading and restarting. An error box popped up saying something strange when you converted/saved the grammar? Restart sublime after trying a fix. If you get a fail message when Sublime reloads, then you didn't fix it and you need to try again, with another restart. Highlighting will not work at all until you've done a restart with it working. (This has apparently been improved in build 3068, but I don't have access as a trial user.) You changed something in one syntax file that's included in the rule of another? Compile/save both grammars (compile meaning turn your YAML into plist XML).

I hope this saves the next developer some time. Overall, the biggest gotcha for me was just realizing that I wasn't writing a BNF-style grammar to completely validate the syntax in a file, but a list of patterns and the scopes that they create or match in. Once I understood this, actually writing the rules was not too difficult a task.
