---
layout: "../../../layouts/BlogPost.astro"
categories:
- Octopress
- Jekyll
- Ruby
- Python
- Pygments.rb
- blog
- Jackie Chan Adventures
- Windows
comments: true
publishDate: 2014-07-06T14:46:39Z
title: Using Octopress- One More Thing
description: It's Ruby but you also need Python
setup: |
  import ResponsiveFigure from "../../../components/ResponsiveFigure.astro"
---

"Aiiiiyaaaa! Jacky! You did not install Ruuuubyyy. You need that to write your blog."

"I already install Ruby, uncle, but it still does not work. `rake generate` creates empty HTML file! Look, it's broken!"

```console
>rake generate
Generating... C:/Ruby200-x64/lib/ruby/gems/2.0.0/gems/posix-spawn-0.3.8/lib/posix/spawn.rb:162: warning: cannot close fd before spawn
'which' is not recognized as an internal or external command, operable program or batch file.
```

Swat!

"Ow! What was dat for?"

"These are not eeeeerroooorrs, just warnings! Your site is empty because you forgot to install Pyyyythoooon."

"What? Python? But you said Ruby!"

Swat! "Ow!"

"You need Ruby *and* Python to use coooode hiiiighliiiighting on your blooooog!"

"What!? I have to install Ruby *and* Python?! But I don't use either of those!"

"One mooooore thing." Swat!

"Ow! What was that for?!"

<ResponsiveFigure
    class_="center"
    src="/assets/blog/uncle_hits_jackie.png"
    alt="A still from 'Jackie Chan Adventures' showing uncle swatting Jackie on the head."/>

"For using Windooooows!"

---

So, if you tried using [Octopress](http://octopress.org/)'s neat [backtick codeblock syntax](http://octopress.org/docs/plugins/backtick-codeblock/) to display code on your blog, but you don't have Python intsalled, you will get a mostly blank website as the Pygments plugin silently fails and messes up the whole `generate` process. The warnings can safely be ignored (and will hopefully be [eliminated](https://github.com/tmm1/pygments.rb/pull/90) soon). I put in a [request](https://github.com/tmm1/pygments.rb/issues/130) for a message of some kind so that the process wouldn't fail so silently.

Good times. Those are all on Netflix, by the way.
