---
layout: "../../layouts/BlogPost.astro"
categories:
- TeX
- Metafont
- Donald Knuth
- classic
- computer science
- code reading
- literate programming
comments: true
date: 2014-08-13T12:50:29Z
title: Knuth Classics are Freely Available
---

Donald Knuth wrote TeX in C/WEB. WEB is his system for writing literate programs which become both source code and typeset documents explaining the program's operation. Some of his programs have been published: [TeX: The Program](http://www.goodreads.com/book/show/499934.Computers_Typesetting_Volume_B) and [Metafont: The Program](http://www.goodreads.com/book/show/1746886.Computers_Typesetting_Volume_D). Others have not: I don't believe Bibtex was published in book form, for example.

All of these works are available online, though you have to generate the PDF yourself. The TeX live distribution (included in MikTeX, among others) comes with Knuth's WEB system for doing this. If you want a copy of TeX: The Program and you have TeX live, you can download some WEB programs from http://tug.org/texlive/devsrc/Build/source/texk/web2c/ and convert them yourselves. Let's do TeX as an example. Download tex.web and tex.ch. Then do this:

    weave tex.web tex.ch tex.tex
    pdftex tex.tex

Voila! One Knuth classic ready for reading. `weave` was available on my path because I have MikTeX installed on my computer. I did hit one snag- the first time I downloaded one of these files, I viewed it in the browser and then copied and pasted the entire thing into a text editor and saved it. This turned all of the newlines into Windows-style CRLF's, and `weave` would die with the unhelpful message, `read operation failed`. The WEB system only works with Unix-style newlines, so make sure you download the file as-is if you are on Windows. The change file is also required for whatever reason, so if you don't want it, just create a dummy change file containing `%` (a single empty comment).

Overall I'm pretty happy that it was so easy to generate these documents from such old sources. I wonder how difficult it will be to build the executables.

------------

Available programs:

* bibtex
* dvicopy
* dvitype
* gftodvi
* gftopk
* gftype
* mf (Metafont)
* mft (older Metafont?)
* patgen
* pktogf
* pktype
* pltotf
* pooltype
* tangle
* weave
