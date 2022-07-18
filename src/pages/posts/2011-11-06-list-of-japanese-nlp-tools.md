---
categories:
- Japanese
- NLP
- tools
comments: true
date: 2011-11-06T00:00:00Z
title: List of Japanese NLP tools
---

I haven't tried out all of these so I don't have comments for everything, but hopefully this list will come in useful for someone.

## Morphological analyzers/tokenizers

* [Itadaki](http://sourceforge.net/projects/itadaki/): a Japanese processing module for OpenOffice. I've done a tiny bit of work and issue documentation on a fork [here](https://github.com/garfieldnate/itadaki), and someone forked that to work with a Japanese/German dictionary [here](https://github.com/wichmann/Itadaki).
* GoSen: Uses [sen](http://java.net/projects/sen/) as a base, and is part of Itadaki; a pure Java version of ChaSen. See my previous post on where to download it from.
* [MeCab](http://mecab.sourceforge.net/): This page also contains a comparison of MeCab, ChaSen, JUMAN, and Kakasi.
* [ChaSen](http://chasen.naist.jp/hiki/ChaSen/?%C3%E3%E4%A5%A4%CE%C7%DB%C9%DB)
* [JUMAN](http://nlp.ist.i.kyoto-u.ac.jp/EN/index.php?JUMAN)
* [Cabocha](http://code.google.com/p/cabocha/): Uses support vector machines for morphological and dependency structure analysis.
* [Gomoku](https://github.com/sile/gomoku)
* [Igo](http://igo.sourceforge.jp/)
* [Kuromoji](https://github.com/atilika/kuromoji): Donated to Apache and used in Solr. Looks nice.

## Corpora

* [Hypermedia Corpus](http://www.env.kitakyu-u.ac.jp/corpus/docs/index.html)
* [TüBa-J/S](http://www.sfs.uni-tuebingen.de/en/tuebajs.shtml): Japanese treebank from universityu of Tübingen. Not as heavily annotated as I'd hoped. You have to send them an agreement to download it, but it's free.
* [GSK](http://www.gsk.or.jp/catalog_e.html): Not free, but very cheap.
* [LDC](http://www.ldc.upenn.edu/): Expensive unless your institution is a member

## Other lexical resources

* [Kakasi](http://kakasi.namazu.org/): Gives readings for kanji compounds.
* [WordNet](http://nlpwww.nict.go.jp/wn-ja/index.en.html): Stil under development by NiCT. The sense numbers are cross-indexed with those in the English WordNet, so it could be useful for translation. Also, there are no verb frames like there are in English.
* [LCS Database](http://cl.it.okayama-u.ac.jp/rsc/data/index.html): From Okayama University
* [Framenet](http://jfn.st.hc.keio.ac.jp/index.html): Unfortunately you can only do online browsing.
* [Chakoshi](http://tell.fll.purdue.edu/chakoshi/public.html): Online collocation search engine.
