---
title: "Introducing My Favorite Electronic Device"
publishDate: 2020-09-21T11:55:53+02:00
draft: true
---

carried it around for my mission plus all of college and then several years before it was stolen
comes with hole to put a charm on; makes its usage a bit noisier, but a fun customization
startup is instant
screen is reflective, can turn on light but wastes battery
two AAA batteries and it will last months (declared 130 hours display of an entry, average 60 usage hours)
contains MILLIONS of words
great cross-dictionary searching functionality
add on with sd card or internal memory; Kanji Learner's dictionary is a really epic dictionary.
shortcut buttons for jukugo, super jump
view, then type and that starts another search. There is no other true way to do this!
seems obvious, but it remembers where you were when last opened.
tangocho saving, but only max number.
add text files
mp3 playing over jack or speaker!
English pronunciation generation (pretty good! distinct template overlap butterfly effect, though. But it's almost 15 years old!)
auto on when opening case
full qerty keyboard
customizable function buttons
search for kanji by writing
high DPI screen for reading Chinese characters
usb for uploading CD-based dictionaries. Only works on Japanese windows, and pairs with your dictionary so you can't upload to multiple.
    Mine filled with copper rust while in Japan, and a guy in Provo fixed it for 60 bucks.

* Features I want the next jisho to have
    - mixed kanji/kana search for kanji compounds
    - copy/jump from input line (in case it's not found in current dictionary, look it up in another without having to retype/write)
    - proper jump with pronunciation-annotated words: 漢〔かん〕字
    - go back to non-color screen; just be fast! I wish mirasol or ClearInk were options...
    - upload tango-cho to computer
    - up and down to scroll through history with completion like in the shell

***

I received my mission call to Hiroshima, Japan when I was 18. I had already studied Japanese for a couple of years in college, and I was pretty excited to be completely immersed. I had recently changed my major to linguistics, and I was fairly obsessed with learning more.

The final purchase I made before leaving for the MTC was a Casio electronic dictionary, purchased from White Rabbit Press. I worked cleaning houses to save up close to $500 to purchase the top-of-the-line professional level XD-GW9600. It was probably the most expensive thing I had ever paid for by myself at the time. And it was worth every penny. I used it for many hours every day as a missionary learning Japanese. I used it constantly as a student not only for studying Japanese but also for looking up words in English that I didn't know. I took it with me *everywhere*, to friend's houses and classes and church and on read walks. I had some fun conversations with curious people fascinated by my personal computer with a chicken-scratch (as far as they were concerned!) interface.

<!-- Lately I've sadly reached the device's limits and don't use it as often anymore. I would love nothing more than to breath new life into it and carry it from country to country studying new languages. -->

Let me tell you about my favorite device:

***

What is it? A dictionary?

Sleek finish, shiny black. Flip open and responds immediately with at-first-intimidating sea of symbols. Size is perfect for typing with two thumbs.


Keyboard

Full qerty


This is essentially a hand-held, battery-operated computer. It runs on 2 AAA batteries, and the screen is reflective, too, so the batteries last a long time (at least 6 months if you leave the device closed, but it's rated for 60 hours of actual use). Everything about it is fully customized to do the job of a paper dictionary, but 10 bajillion times better.

The homescreen shows a bunch of tabs which organize the linguistic resources into themes (I'm pretty sure these resources are where most of the expense comes from). The highly used dictionaries are given special buttons across the top of the keyboard, and one of the buttons takes the user to a menu where they can view their own favorites (possibly add-on resources).

The search screens all have the same unified interface, which I have come to view as the one true dictionary interface:

* as the user types, the results are shown in a list, with a preview of the top result on the right. (this could be improved using a BK tree to catch spelling or hearing errors, but in general it's great).
* when the user selects an entry and presses enter, the entry is shown full-screen.
* there is a single-press command to save the word for later study
* when the user presses any letter key, it immediately returns to the search screen and starts typing a new entry.

This is so basic, and so perfect, it is endlessly frustrating when it is violated. Type, read, save, type, read, save; later on, review. Admittedly, the review experience is not so great (small letters, pagination, limited saving size, no categorization or search functionality).

My own CLI dictionary tool employs this very basic type/read loop (no saving! I guess I should add that.). It's very simple to implement, but isn't done often for some reason.

Continuing what I think are obvious usability features but which are usually missing from other applications:

* when the device is closed and opened again, the previous screen is still displayed.
* any word in an entry can be further selected for lookup, and history is saved so the user can explore new words and go down a fun rabbit hole :) Not sure what kind of history length is allowed.
* search history is saved and easily accessable but is also easily erasable.
* There is basically no load time, ever.
* Warning is given far ahead of time when the battery is low.
* The data is *always* available (as long as you have battery).
* input is easy

And extra goodies:

* Advanced searching is supported in separate menus (basic regex, prefix/suffix search, multi-dictionary search). Great for crosswords! (Queue picture of crossword that I never solved but kept since years ago because I want to want to solve it but it's actually really boring.)
* Can do full-text search of everything, not just headwords.


Example of sucky dictionary UIs:

* I paid 20 dollars for my Oxford German dictionary on iOS. If I change apps for just a second and come back, the language direction is automatically switched to English -> German. The keyboard disappears when viewing an entry (can't help that much, with the screen and keyboard sharing real estate). You have to navigate through a menu to save a word for later.
* Online dictionaries are only available with internet and often come with ads. Smart phone batteries do not last that long, especially with constant internet usagewhile taking a train through the town. Dictionary websites have disappeared in the past, to the detriment of all.
* Phones in general suck to type on; the microphone can be a solution, but always requires cloud processing, which again sucks battery. Nothing beats a physical keyboard for portable dictionary usage.



I would put in words while talking or reading, and then come back while on the train or bus or just during study time and go through the word list, quizing myself and deleting the words that I thought I knew well enough. Seeing the words next to eachother in the order I had originally looked them up made me remember the context that I learned them (a scene from a Manga, a conversation with a church member, saw on a billboard, etc.). It's probably better for memorization to randomize the order, but strolling down memory lane made review fun, and who knows, maybe that also strengthens the memory.


When I was a kid I had a Garfield-themed webster's dictionary, with comics to demonstrate word usage throughout. It was fun, but it had too few comics, and paper dictionaries always sucked to use.

Follow up with ThaiDict about how amazing it is.


I want to reverse it; I want to rebuild it! I want to write everything in Rust and employ special string compression algorithms and make the perfect UI and support new languages and add Jim Breen's dictionaries and make it easy to upload for everyone! I want the perfect dictionary. (I wanted to use the Mirasol screen but that's out; e-ink is too slow.). I want to understand how to do this, but I don't. I opened the thing to take a look and I'm pretty overwhelmed, plus the processors are blobbed so I can't see what they are. The screen is higher resolution than anything available today (no battery-sucking backlit LCDs, thank you very much!). I guess there's libexword already, and it supports my model. I have to start somewhere!

I naively thought maybe this could be like an Arduino project, but that was shot down pretty quick. My theory is that the OS is largely character based, and a separate processor pulls the fonts from memory and sends the pixels to the screen, plus supports fast scrolling and stuff.

BTW kudos to Casio for leaving the product page up for this long! Just in case, I made sure it was saved in the internet archive...

***

Electonic subsystems

* OS
	- dictionary display and searching
	- menu navigation
		- navigation buttons
	- memory
* Screen 1
	- LED backlight
* Screen 2
	- touch
* Audio
	- speakers
	- headphone jack
	- switch between outputs
	- volume adjustment
	- MP3 decoding stack
* power
	- batteries
	- detect low batteries
* keyboard
* other switches and actuators
	- piezo
	- reset button
	- hidden/internal button pads
