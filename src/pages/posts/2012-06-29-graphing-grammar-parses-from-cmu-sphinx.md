---
layout: "../../layouts/BlogPost.astro"
categories:
- java
- grammar
- GraphViz
- parsing
- graph
- CMU sphinx
comments: true
date: 2012-06-29T00:00:00Z
title: Graphing grammar parses from CMU Sphinx 4
setup: |
  import ResponsiveFigure from "../../components/ResponsiveFigure.astro"
---

CMU Sphinx comes with some neat grammar parsing stuff that I never knew about. It uses JSGF (as detailed [here](http://cmusphinx.sourceforge.net/sphinx4/javadoc/edu/cmu/sphinx/jsgf/JSGFGrammar.html)) and comes with several demos, showing how to use a basic grammar, arc weights, tags, and even getting a [javascript representation](http://cmusphinx.sourceforge.net/sphinx4/src/apps/edu/cmu/sphinx/demo/jsapi/tags/README.html) of the final parse! At work I've been needing to do some custom processing of the grammar output, but it was more conceptually difficult than I'd planned. So after figuring out how to traverse a parse tree, I decided to write a little application to print out the parse of a given sentence. The eclipse project for it can be found [here](https://sites.google.com/site/complingfiles/files/ParsePrinter.zip?attredirects=0&amp;d=1).

Given this small gramamar:

```plaintext
#JSGF V1.0;
grammar sidTests ;

public <greet> = <greeting> [<person>] [i am <person>];

<greeting> = konnichiwa {language:japanese} | hello {language:english} | guten tag {language:german};

<person> = john {gender:man} | martha {gender:female} | kelly;
```

If we parse the sentence "konnichiwa kelly i am john", the program outputs the following:

```plaintext
digraph {
 "greet-2147483647" [label="greet" color=magenta];
 "greet-2147483647" -> "(<sidTests.greeting> = konnichiwa {language:japanese}) ( (<sidTests.person> = kelly) ) ( i am (<sidTests.person> = john {gender:man}) )-2147483646";
 "(<sidTests.greeting> = konnichiwa {language:japanese}) ( (<sidTests.person> = kelly) ) ( i am (<sidTests.person> = john {gender:man}) )-2147483646" [label="(<sidTests.greeting> = konnichiwa {language:japanese}) ( (<sidTests.person> = kelly) ) ( i am (<sidTests.person> = john {gender:man}) )" color=green];
 "(<sidTests.greeting> = konnichiwa {language:japanese}) ( (<sidTests.person> = kelly) ) ( i am (<sidTests.person> = john {gender:man}) )-2147483646" -> "greeting-2147483645";
 "greeting-2147483645" [label="greeting" color=magenta];
 "greeting-2147483645" -> "konnichiwa {language:japanese}-2147483644";
 "konnichiwa {language:japanese}-2147483644" [label="konnichiwa {language:japanese}" color=green];
 "konnichiwa {language:japanese}-2147483644" -> "language:japanese-2147483643";
 "language:japanese-2147483643" [label="{language:japanese}" color=red];
 "language:japanese-2147483643" -> "konnichiwa-2147483642";
 "konnichiwa-2147483642" [label="konnichiwa" color=cadetblue shape=box];
 "(<sidTests.greeting> = konnichiwa {language:japanese}) ( (<sidTests.person> = kelly) ) ( i am (<sidTests.person> = john {gender:man}) )-2147483646" -> "(<sidTests.person> = kelly)-2147483641";
 "(<sidTests.person> = kelly)-2147483641" [label="(<sidTests.person> = kelly)" color=green];
 "(<sidTests.person> = kelly)-2147483641" -> "person-2147483640";
 "person-2147483640" [label="person" color=magenta];
 "person-2147483640" -> "kelly-2147483639";
 "kelly-2147483639" [label="kelly" color=green];
 "kelly-2147483639" -> "kelly-2147483638";
 "kelly-2147483638" [label="kelly" color=cadetblue shape=box];
 "(<sidTests.greeting> = konnichiwa {language:japanese}) ( (<sidTests.person> = kelly) ) ( i am (<sidTests.person> = john {gender:man}) )-2147483646" -> "i am (<sidTests.person> = john {gender:man})-2147483637";
 "i am (<sidTests.person> = john {gender:man})-2147483637" [label="i am (<sidTests.person> = john {gender:man})" color=green];
 "i am (<sidTests.person> = john {gender:man})-2147483637" -> "i-2147483636";
 "i-2147483636" [label="i" color=cadetblue shape=box];
 "i am (<sidTests.person> = john {gender:man})-2147483637" -> "am-2147483635";
 "am-2147483635" [label="am" color=cadetblue shape=box];
 "i am (<sidTests.person> = john {gender:man})-2147483637" -> "person-2147483634";
 "person-2147483634" [label="person" color=magenta];
 "person-2147483634" -> "john {gender:man}-2147483633";
 "john {gender:man}-2147483633" [label="john {gender:man}" color=green];
 "john {gender:man}-2147483633" -> "gender:man-2147483632";
 "gender:man-2147483632" [label="{gender:man}" color=red];
 "gender:man-2147483632" -> "john-2147483631";
 "john-2147483631" [label="john" color=cadetblue shape=box];
}
```

which is all a big mess until we run it through GraphViz and see this:

<!-- TODO: width="640" height="294" -->
<ResponsiveFigure
    class_="center"
    src="/images/content_images/jsgf_parse.jpg"
    alt="The sentence parse tree has a root node called 'greet' and three subtrees showing the three rules that were applied: there is a 'greeting' subtree containing 'konnichiwa', a 'person' subtree containing 'Kelly', and a third subtree containing 'I', 'am', and a further 'person' subtree containing 'John'. Unfortunately, if you require this alt text to know what is in the picture, I don't think dot graphs are going to help you at all. As I'm writing this alt text years later, I'm kicking myself for not generating the SVG instead so that blind users could inspect it themselves. Actually, I have no idea whether Graphviz is such a great tool at all from an accessibility standpoint."
    title="A graph of the JSGF sentence parse"/>

A graph explaining how our sentence was parsed! I color code the parse: green is a RuleSequence, magenta is a RuleParse, light blue is a Token, red is a Tag, yellow, which there strangely aren't any of, would be a RuleName.

I notice two very strange things here. First, RuleParses don't have anything as a direct child except for RuleSequences (RuleName is also possible but not shown). So RuleSequences will always be present and may only have one child. Second, text is treated as a sub-component of a tag instead of the other way around. So the text is tagging the tag? I don't know why they designed it that way, but at least now that I have a graph of the parse so I can figure out how to properly process it.
