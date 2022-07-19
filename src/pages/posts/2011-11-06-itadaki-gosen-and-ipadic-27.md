---
layout: "../../layouts/BlogPost.astro"
categories:
- Java code
- morphology
- Japanese
- NLP
comments: true
publishDate: 2011-11-06T00:00:00Z
title: Itadaki GoSen and IPADIC 2.7
description: Intro to Japanese morphological analysis
setup: |
  import ResponsiveFigure from "../../components/ResponsiveFigure.astro"
---

**Update3: I've forked the Itadaki project on [GitHub](https://github.com/garfieldnate/Itadaki) to keep track of it better.**

**Update2: I made an executable JAR for GoSen that runs the ReadingProcessorDemo. It requires Java 6; just unzip the contents of [this zip file](https://sites.google.com/site/complingfiles/files/gosen.7z?attredirects=0&d=1) to your computer and click on the jar file.**

**Update1: The IPADIC dictionary is no longer available from its original location. It has been replaced by the [NAIST](http://sourceforge.jp/projects/naist-jdic/) dictionary. I have edited the following post to reflect the needed changes.**

Itadaki is a software suite for processing Japanese in OpenOffice. GoSen, part of the Itadaki project, is a pure Java morphological analysis tool for Japanese, and I have found it extremely useful in my research. Unfortunately, the page for this project went down recently, making the tools harder to find. Itadaki is still available through Google code [here](http://code.google.com/p/itadaki/), but I can't find a separate installment of GoSen. The old GoSen website can still be accessed through the way-back-machine[ here](http://web.archive.org/web/20080108030419/http://itadaki.org/wiki/index.php/Itadaki). The other problem is that GoSen hasn't been updated since 2007, and in it's current release cannot handle the latest release of IPADIC. I'll describe how to fix it in this post.

Why does it matter that we can't use the latest version of IPADIC? Well, here's an example. I am using GoSen in my thesis work right now, and I put in a sentence which included a negative, past tense verb, such as 行かなかった. It analyzed it as な being used for negation, and かった being the past tense of the verb かう. That is indeed a problem! Using the newer IPADIC fixed it for me, though. To do that, download [this](http://neu101.up.seesaa.net/etc/gosen-t001.zip) modified version of GoSen. The explanation for the fix is [here](http://neu101.seesaa.net/article/182625342.html). Basically, a change in the new IPADIC versions to work better with MeCab adds a bunch of commas that break GoSen.

**Edit: Once you've downloaded and unzipped GoSen, run ant in the top directory to build an executable JAR file. Note that if you want javadoc, you'll have to change build.xml so that the javadoc command has 'encoding="utf-8"'. Next, you must download the IPADIC dictionary from its legacy repository, [here](http://sourceforge.jp/projects/ipadic/downloads/24435/ipadic-2.7.0.tar.gz/). Unpack the contents into testdata/dictionary. Change testdata/dictionary/build.xml so that the value of "ipadic.version" is "2.7.0" (the version that you downloaded). Now run ant in this directory to build the dictionary. [If you had errors, you may have forgotten to run ant in the top level directory first.]**

Then, to run a demo and see what amazing things GoSen can do, copy the dictionary.xml file from the testdata/dictionary directory to the dictionary/dictionary directory, go back to the root directory of GoSen, and then run <code>java -cp bin examples.ReadingProcessorDemo testData/dictionary/dictionary.xml</code>. The GoSen site says to run using the testdata folder, but that means you'll have to download the dictionary twice, which is dumb. When you run the above command, you'll get this GUI:

<!-- TODO: should have height 320 and width 209 -->
<ResponsiveFigure
    class_="center"
    src="/assets/blog/gosen.png"
    alt="Screenshot of the 'reading processor demo' tool that comes with GoSen. The window shows '情報スーパーハイウェイ' analyzed into consitituent words and assigned part of speech. The conrols for editing the processor's output are also open."/>

Notice that it tokenizes the sentence, gives readings, and allows you to choose among alternatives analyses. It also gives information on part of speech and inflection.

To use GoSen in an Eclipse project, add gosen-1.0beta.jar to the project build path. You also need to have the dictionary directory somewhere, along with the dictionary.xml file. This code will get you started:

``` java
package edu.byu.xnlsoar.jp.lexacc;
import java.io.IOException;
import java.util.List;

import edu.byu.xnlsoar.utils.Constants;

import net.java.sen.SenFactory;
import net.java.sen.StringTagger;
import net.java.sen.dictionary.Morpheme;
import net.java.sen.dictionary.Token;

public class GoSenInterface {
 public List<token> tokenize(String sentence){
  StringTagger tagger = SenFactory.getStringTagger(Constants.getProperty("GOSEN_DICT_CONFIG"));
  try {
   return tagger.analyze(sentence);
  } catch (IOException e) {
   e.printStackTrace();
   System.exit(-1);
  }
  return null;
 }

 public static void main(String[] args){
  String sentence = "やっぱり日本語情報処理って簡単に出来ちゃうんだもんな。";
  GoSenInterface dict = new GoSenInterface();
  System.out.println("tokenizing " + sentence);
  List<token> tokens = dict.tokenize(sentence);
  System.out.println(tokens);
  Morpheme m;
  System.out.println("surface, lemma, POS, conjugation");
  for(Token t : tokens){
   System.out.print(t + ", ");
   m = t.getMorpheme();
   System.out.print(m.getBasicForm() + ", ");
   System.out.print(m.getPartOfSpeech() + ", ");
   System.out.println(m.getConjugationalType());
  }
 }
}
```

If you run that you will get:

```no-highlight
tokenizing やっぱり日本語情報処理って簡単に出来ちゃうんだもんな。
[やっぱり, 日本語, 情報処理, って, 簡単, に, 出来, ちゃう, ん, だ, もん, な, 。]
surface, lemma, POS, conjugation
やっぱり, やっぱり, 副詞-一般, *
日本語, 日本語, 名詞-一般, *
情報処理, 情報処理, 名詞-一般, *
って, って, 助詞-格助詞-連語, *
簡単, 簡単, 名詞-形容動詞語幹, *
に, に, 助詞-副詞化, *
出来, 出来る, 動詞-自立, 一段
ちゃう, ちゃう, 動詞-非自立, 五段・ワ行促音便
ん, ん, 名詞-非自立-一般, *
だ, だ, 助動詞, 特殊・ダ
もん, もん, 名詞-非自立-一般, *
な, だ, 助動詞, 特殊・ダ
。, 。, 記号-句点, *
```

You have plenty of other options while processing, like grabbing alternate readings, etc. Notice that it got one wrong here: ちゃう is a contraction of てしまう, not a verb whose lemma is ちゃう. It doesn't seem to work on contractions because every token needs a surface form. So this might not work well on informal registers such as tweets or blogs unless some pre-preprocessing is done.

Feel free to leave any questions or comments.
