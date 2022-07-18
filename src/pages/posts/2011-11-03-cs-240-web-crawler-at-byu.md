---
categories:
- C++
- projects
- CS
- web crawler
- debugging
- BYU
comments: true
date: 2011-11-03T00:00:00Z
title: CS 240 Web Crawler at BYU
---

I recently polished off the web crawler project for CS 240 at BYU. It's probably the most talked-about project in the CS major, and the cause of so many students retaking the class.

The specification for the web crawler assignment can be found [here](http://students.cs.byu.edu/~cs240ta/fall2011/projects/crawler/). Basically, given a start URL, the crawler finds every link on a page, follows them, downloads the pages, and indexes each of the words on a page, as long as they are not in a given stop words file; then it follows the links from that page, and so on. All of the indexed information is printed out to XML files. The code also has to conform to proper style, and no memory leaks are allowed.<br />For those who still need to do the project or haven't taken the following exam yet, I thought I'd post a note or two of help.

First off, check your constructors! In an initialization for a templatized BST node, I had been invoking the default copy constructor. A copy constructor looks like this:

{{< highlight cpp "linenos=" >}}
T(const T & other)
{{< / highlight >}}

In the contained object, I had only implemented the operator= construction. My class T had pointers in it, and those pointers were to objects which were allocated on the heap with the new keyword. The default copy constructor copied the pointers, and when the copy of the object of type T was deleted, so were the structures that its pointers pointed to. Since the original object pointed to the same structures, that object would then cause a segfault when destroyed because it would try to delete non-existent structures. Ouch!

That bug wasted a good 6 hours of my life. Needless to say, I was a little scared of the next assignment: a debugging exam. The class TAs put 4 bugs into our code (they didn't touch comments, asserts, or unit tests), and we had 3 hours to find them. Here's what the TA's did to my code:

 * In my URL class, I call erase on a string representing a relative URL to get ride of the "../" at the beginning. The correct code is url.erase(0,3), but the TAs changed it to url.erase(0,2).
 * In my BST Insert method, there is a control structure that determines whether to put a value on a node's left or right, and the TA's changed one of the left's to right's, i.e. `node->left = new BSTNode<T> (v);` was changed to `node->right = new BSTNode<T> (v);`.
 * I have several boolean flags in an HTMLparser class which keep track of whether processing is inside of a header, title, body, or html tag. They should all be false at the beginning of processing, but one of them was changed to true, e.g. `constructor():titleFlag(false),bodyFlag(false),headerFlag(true){...`
 * The last bug was a memory leak. In my linked list Insert method, I declare a linked list node, use a control structure to determine the proper location of the new node, and then set the node with a call to `new` and insert it in that location. The TA's changed the declaration to be a definition which used the `new` keyword, so I always allocated one extra node on the heap.

The first three bugs I was I able find through unit testing. The last one I pinpointed using valgrind and print statements; however, even though it was staring me in the face, I couldn't find it and only got 75% on the exam.

In case somebody finds the code interesting/useful, I'll post it [here](https://sites.google.com/site/complingfiles/files/crawler.7z?attredirects=0&d=1) (no cheating!). Make with `make bin`. Run with `bin/crawler <start url> <stopwords file> <output file>`.
