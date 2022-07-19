---
layout: "../../../layouts/BlogPost.astro"
categories:
- C++
- Soar
- Code Reading
- Legacy Code
comments: true
publishDate: 2014-07-27T19:51:53Z
title: Refactoring the Soar Lexer
---

After my [last writeup](blog/2014/7/13/code-reading-the-soar-parser) on how [Soar](https://github.com/SoarGroup/Soar) parses Soar code, I decided to dive in and try and refactor it, starting with the lexer (and here's the resulting [PR](https://github.com/SoarGroup/Soar/pull/178)). I haven't worked with C/C++ in a while, and a good part of the code I changed was close to my age, so it was an interesting learning experience for me.

The lexer used global state stored via an agent to keep track of the current input character and lexeme as well as to remember line and column numbers. The goal of the refactoring was of course to change that, but 30 commits later I have not yet completely separated the agent from the Lexer because all printing logic (warnings, etc.) requires an agent. The result of this is that after every change I make I have to do `build Tests` and watch the entire project be rebuilt because of the various interdependencies. Also, the lexer has none if its own tests, and so the full test suite must be run to find possible problems. The result here is that every time I make a change and need to see if it works, I start a long compile/test process running and watch more of [some show](http://www.imdb.com/title/tt1637727/) while waiting for it to finish (you've probably seen [this comic](http://xkcd.com/303/) before). So the global state is not only difficult to work with, but it also slows development to a crawl.

The lexer had a lot of dead code which told me the story of how it used to work. Originally it would read Soar code straight from a file; later it was retrofitted to take production strings directly as an "alternate". There must have been something off about the string input, however, because besides setting `alternate_input_string`, `alternate_input_suffix` was also required, and always needed to be set to `") "`. Once the production string was finished, the lexer would read the suffix. The original reason for this was long gone, but the parser still expected productions to end with an `R_PAREN` lexeme, as did other lexer clients. Later developers copied the incantation to lex a string, not knowing why it was needed, and the refactored jSoar parser implementation has the check for the parenthesis commented and marked ["this makes no sense to me"](https://github.com/soartech/jsoar/blob/master/jsoar-core/src/main/java/org/jsoar/kernel/parser/original/OriginalParserImpl.java#L2005). So the current functionality started out as an alternative for testing or something and then became the only use case, leaving dead code everywhere.

Some of the updating work I did was already done in the [9.5] branch, but it was still interesting. There were workarounds for the old Think C and Symantech C++ compilers, between `THINK_C` and `__SC__` `#ifdef`s. I had no idea what they were and found an excellent compiler macros list project on [SourceForge](http://sourceforge.net/p/predef/wiki/Home/). Apparently C had no boolean variable types, either, so programmers used `typedef char Bool` and defined `TRUE` and `FALSE` manually, and part of updating to C++ code is changing those to real `bool` types.

The value of making small, working commits was reinforced when my initial pull request broke the automated build when `--no-scu` was set. This setting causes each `.cpp` file to be compiled separately, ensuring that the build fails if a `#include` directive was forgotten somewhere. I was able to bisect the Git history and discover the problem pretty quickly.

## Nuggets:

- Alex set up [Jenkins](http://jenkins-ci.org/) [to test pull requests](https://github.com/SoarGroup/Soar/issues/169), so I was able to push several times and get live feedback during another build each time.
- The legacy spaghetti code wasn't too difficult to untangle and I'm confident I can do a lot more

## New TODO's:
- A printer or printer manager class to decouple the `agent` code from everything else in Soar (jSoar is [way ahead](https://github.com/soartech/jsoar/blob/master/jsoar-core/src/main/java/org/jsoar/kernel/tracing/Printer.java) on that one).
- Unit tests for the lexer, preferably data-driven to reduce the amount of required recompilation
