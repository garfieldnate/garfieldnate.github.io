---
layout: "../../layouts/BlogPost.astro"
categories:
- Octopress
- Jekyll
- Ruby
- gems
- Windows
publishDate: 2015-07-20T22:10:27Z
title: Hacking Through an Octopress Update
description: To be fair, everything sucks more on Windows
---

A while back I watched a neat presentation from Justin Searls called [The Social Coding Contract](http://blog.testdouble.com/posts/2014-12-02-the-social-coding-contract.html). He has lots of good things to say, but there was one comment that really hit home: my Jekyll blog was easy to setup 6 months ago, but now it's impossible to maintain. Heh. Most of my trouble could have been avoided with more careful management of dependencies, but alas I am not a Ruby person and I did not realize that `bundle update` would completely sink my publishing abilities for 4 months. When I update Perl modules, `cpan` runs their tests on my machine and refuses to install unless they pass. `bundle` just installs them!

I think I ran into every possible problem, which was actually a good learning experience. Like <a href="{{ root_url }}blog/2014/07/07/using-octopress-one-more-thing/">uncle</a> said, that's what I get for using Windows! Some of the problems were my being a noob, and others were problems with various ruby modules. Honestly I don't think that anyone with this many problems should even be using the platform, but gosh darnit I wanted it to work. And while I was at it, I updated to Octopress 3.0, which I believe will be much more manageable (I can freeze the gem version, instead of having to track Git commits). Here's to the next person struggling with Octopress or Jekyll on Windows:

### Problems
* `jekyll serve` exits silently
    - See https://github.com/jekyll/jekyll/issues/2320
    - Solve by specifying `gem 'listen', '2.7.8'` in your Gemfile. I tried 2.7.6 first, but ran into other problems.
    - Don't forget to delete Gemfile.lock when changing your gem versions
* `Build Warning: Layout 'nil' requested in atom.xml does not exist`
    - https://github.com/jekyll/jekyll/issues/2712
    - The layout specified in the YAML front matter in the given file apparently says `nil`, meaning don't use any template in the _layouts folder.
    - The correct way to specify it is `null`
* When trying to [install Pygments](http://jekyll-windows.juthilo.com/3-syntax-highlighting/) you get `LookupError: unknown encoding: cp65001`
    - Python doesn't normally accept cp65001 as utf-8, but they're close enough, probably
    - Do `set PYTHONIOENCODING=utf-8` before running `python -m pip install pygments`; if that doesn't work (it broke for me on a Japanese computer), set the code page to ascii via `chcp 437` instead.
* `Error:  undefined method '[]' for nil:NilClass` in pygments_code.rb
    - This is caused by Pygments returning nil; it will do this if the system call to Python takes too long. Maybe your machine is busy, or maybe it's just slow like mine.
    - To solve this, do `set MENTOS_TIMEOUT=100` so it won't time out. Then delete `.pygments-cache`, which will have saved that nil result.
    - See https://github.com/tmm1/pygments.rb/issues/78, https://github.com/jekyll/jekyll/pull/2148 and https://github.com/octopress/octopress/issues/128
* `celluloid/calls.rb:48:in 'check': wrong number of arguments (2 for 1) (ArgumentError)`
    - The version of listen that we need (2.7.8) doesn't work with celluloid 17 or higher.
    - Specify `gem 'celluloid', '0.16.0'` in your Gemfile to fix.
    - See https://github.com/celluloid/celluloid/issues/619 and https://talk.jekyllrb.com/t/error-while-trying-to-run-jekyll-serve/933/6
* When you run `octopress deploy`, you get `error : src refspec master doesn't match any`
    - In my case, I had deployed once with the wrong branch name and was trying to redeploy to the correct branch. The result of a deploy is cached and currently the branch is not changed properly.
    - Fix the problem by deleting `.deploy` and redeploying
    - See https://github.com/octopress/deploy/issues/64
* `octopress deploy` does not first run a build; you must do `jekyll build` first.
* `octopress new draft Title`, etc. gives `cannot load such file: octopress/draft`.
    - I don't know why this is happening yet
    - For now the fix is to run `bundle exec octopress new draft Title`
    - See https://github.com/octopress/octopress/issues/102
    - "Such file" is a very Japanese expression, by the way: そのようなファイル
* linklog entries don't work properly (I don't think they ever have).
    - The functionality is supposed to be in Octopress 3.0, but I just don't see it.
    - You can do it yourself manually by following the directions here: http://www.candlerblog.com/2012/01/30/octopress-linked-list/
        + I chose not to; I didn't like the way it looked, and I'd rather wait for an update. It's not a show-stopper.
    - See https://github.com/imathis/octopress/issues/418
* Regenerating appears to take forever, so I just have to restart every time. That's annoying. Unfortunately I don't currently have any solution to that. It's also not a show-stopper.

After smoothing out all of the real errors, the (currently) permanent workarounds I need are 1) to set `MENTOS_TIMEOUT` to a large number and 2) to run commands with `bundle exec`.

Hope this helps!
