---
layout: "../../../layouts/BlogPost.astro"
categories:
- Java code
- JAWS
- WordNet
publishDate: 2012-05-11T00:00:00Z
title: Getting WordNet Verb Frames with JAWS
descriptions: Instructions and examples
---

I love using JAWS to access WordNet. It has a rather extensive API, runs quickly, and doesn't require too much configuration. All you have to do is[ download the Jaws binary jar](http://lyle.smu.edu/~tspell/jaws/index.html) and [WordNet](http://wordnet.princeton.edu/wordnet/download/), and then specify to JAWS where the WordNet files are (I will demonstrate this later).

One thing that did take a while to figure out was how to get verb frames from it. A verb frame is an indication of how the verb may be used. For example, the entry for the verb "fax" in WordNet contains the following frames:

* `Somebody ----s something to somebody`
* `Somebody ----s somebody something`
* `Somebody ----s somebody`
* `Somebody ----s something`
* `Somebody ----s`

Let's look at the WordNet file to see how frames are specified. If you open data.verb, you will see that "sun" occurs twice. The frames are listed like so:

```no-highlight
02112546 39 v 04 sun 0 insolate 0 solarize 0 solarise ... 01 + 08 00 | expose to the rays of the sun or affect by exposure to the sun
```

```no-highlight
00104147 29 v 02 sun 0 sunbathe ... 03 + 02 00 + 22 00 + 09 01 | expose one's body to the sun
```

The `01` and `03` indicate the number of verb frames, `08`, `02`, `22`, and `09` are frame numbers. The `00`'s and `01` that follow the frame numbers indicate which words in the synset the numbers apply to. `00` means the frame is applicable to all members. The `01` in the second entry means that frame 9 is only for the word `sun`, and not for the second word, `sunbathe`.<br />There are two methods provided by JAWS to get frames. They are both contained in the [`VerbSynset`](http://lyle.smu.edu/~tspell/jaws/doc/edu/smu/tspell/wordnet/VerbSynset.html) class:

``` java
/**
 * Returns the sentence frames (if any) associated with this verb meaning.
 * Sentence frames are examples of how the verb can be used / applied, and
 * all the frames returned by this method apply to all word forms in the
 * synset.
 *
 * @return Sentence frames associated with all word forms in this synset.
 * @see
 *         Format of Lexicographer Files ("Verb Frames")
 */

public String[] getSentenceFrames();
/**
 * Returns the sentence frames (if any) that are specific to a particular
 * word form within this synset, where sentence frames are examples of
 * how the word form can be used / applied.
 *
 * @param  wordForm Word form for which to return sentence frames.
 * @return Sentence frames that are specific to the word form.
 * @see
 *         Format of Lexicographer Files ("Verb Frames")
 */
public String[] getSentenceFrames(String wordForm);
```

Keep in mind that the VerbSynset class is completely divorced from the actual orthographic representation of a word, since a synset may belong to several different words. The first method returns all of the frames that apply to every word in the synset, or to all of the frames marked with a 00 in the data.verb file as shown above. The second method returns only the frames which are marked as being specific to a single orthographic representation, specified by the one argument for the method. The return values are complementary and each is incomplete by itself. However, given only the synset offset or only the word to look up, JAWS is returning as much information as is possible. If you know both the synset number and the orthographic representation of a word you need frames for (and I don't see why you wouldn't), then the getWordFramesComplete method in the program below demonstrates how to get all of the available frames:

```java
package edu.byu.xnlsoar.test;

import java.util.ArrayList;
import java.util.List;

import edu.smu.tspell.wordnet.Synset;
import edu.smu.tspell.wordnet.SynsetType;
import edu.smu.tspell.wordnet.VerbSynset;
import edu.smu.tspell.wordnet.WordNetDatabase;
import edu.smu.tspell.wordnet.impl.file.SampleFrameFactory;
import edu.smu.tspell.wordnet.impl.file.SynsetFactory;
import edu.smu.tspell.wordnet.impl.file.SynsetPointer;

public class DemoFrames {

 private static WordNetDatabase database;
 private static SynsetFactory synsetFactory;
 //initialize everything here
 static{
  System.setProperty("wordnet.database.dir", "./lib/3.0/dict");
  database = WordNetDatabase.getFileInstance();
  synsetFactory = SynsetFactory.getInstance();
 }

 /**
  *
  * @param synsetOffset Synset number to look up frames for
  * @return Array of frames for the synset; only returns frames
  * which apply to every word in the synset
  * frames
  */
 public static List<string> getGeneralSynsetFrames(int synsetOffset){
  SynsetPointer sp = new SynsetPointer(SynsetType.VERB, synsetOffset);
  VerbSynset vSynset = (VerbSynset) synsetFactory.getSynset(sp);
  List<string> frames = new ArrayList<string>();
  for(String s : vSynset.getSentenceFrames())
   frames.add(s);
  return frames;
 }

 /**
  *
  * @param lemma Base form of the word you want to look up
  * @return Array of frames for the lemma; only returns those
  * that are specific to a particular word form within each synset.
  * frames
  */
 public static List<string> getWordFramesSpecific(String lemma){
  List<string> frames = new ArrayList<string>();
  Synset[] synsets = database.getSynsets(lemma,SynsetType.VERB);
  for(Synset synset : synsets){
   for(String s : ((VerbSynset) synset).getSentenceFrames(lemma))
    frames.add(s);
  }
  return frames;
 }

 /**
  * This one is more difficult to understand...
  * @param lemma Base form of the word you want to look up
  * @return Array of frames for the lemma; only returns those
  * that match every word in each of the synsets that contain this word.
  */
 public static List<string> getWordFramesGeneral(String lemma){
  List<string> frames = new ArrayList<string>();
  Synset[] synsets = database.getSynsets(lemma,SynsetType.VERB);
  for(Synset synset : synsets){
   for(String s : ((VerbSynset) synset).getSentenceFrames())
    frames.add(s);
  }
  return frames;
 }

 /**
  * This method is the best. It returns all possible frames
  * given a synset number and the accompanying word.
  * @param lemma Base form of the word you want to look up
  * @param synsetOffset Synset number to look up frames for
  * @return Array of frames for the synset; returns all frames
  * for this word within this synset.
  * frames
  */
 public static List<string> getWordFramesComplete(String lemma, int synsetOffset){
  SynsetPointer sp = new SynsetPointer(SynsetType.VERB, synsetOffset);
  VerbSynset vSynset = (VerbSynset) synsetFactory.getSynset(sp);
  List<string> frames = new ArrayList<string>();
  for(String s : vSynset.getSentenceFrames(lemma))
   frames.add(s);
  for(String s : vSynset.getSentenceFrames())
   frames.add(s);
  return frames;
 }

 /**
  * Prints out several different queries for the frames of "fax"
  */
 public static void main(String[] args) {
  int offset = 104147;//the synset meaning "expose one's body to the sun"
  System.out.println(getGeneralSynsetFrames(offset));//returns 2 frames
  System.out.println(getWordFramesSpecific("sun"));//returns 1 frame
  System.out.println(getWordFramesGeneral("sun"));//returns 3 frames
  System.out.println(getWordFramesComplete("sunbathe",offset));//returns 2 frames
  System.out.println(getWordFramesComplete("sun",offset));//returns 3 frames (different from before)
 }
}
```

`getWordFramesComplete` calls both of the available methods in JAWS, retrieving both frames that apply to all words in a synset and the frames that are specific to a single word in the synset.
