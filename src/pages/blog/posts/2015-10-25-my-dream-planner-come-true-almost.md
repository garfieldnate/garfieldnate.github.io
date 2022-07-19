---
layout: "../../../layouts/BlogPost.astro"
categories:
- programming
- perl
- Japan
- holidays
- planner
- HTML
- CSS
- calendars
publishDate: 2015-10-25T19:23:49Z
title: My Dream Planner, Come True! (Almost)
description: Generating a personal calendar in Perl
---

I say almost because I haven't printed it yet. But I have a [PDF](https://github.com/garfieldnate/Personal-Planner/releases)!

When I was in college I had a favorite planner. It was the perfect size for my hand, and just had lines for each day, with one week visible in a two-page spread. It had a space in the front for schedules, and some blank pages in the back for notes and adresses. Nice and simple. I looked forward to buying it every year, and the last one I bought I also laminated and rebound so it would last longer.

Now that I'm not at BYU, though, I can't get that planner. I can't even buy it on the bookstore website, gosh darn it. So I took the opportunity to try a different technology out and make my own, hopefully this time my *dream* planner.

What makes it my *dream* planner? Well, let me tell you! It has *graph* paper note pages. That would have been nice when I was thinking about lattices all the time for [analogical modeling](https://github.com/garfieldnate/Weka_AnalogicalModeling). Best of all, it comes with both Japanese and American holidays, so I can know what's going on in both of my home countries. It's even got birthdays and my wedding aniversary, so I have no excuse to forget! I also gave the covers a personal touch: a mario star on the front, and a [Garfield](http://smile.amazon.com/Outrageous-Origin-Garfields-Force-Book/dp/0816772061) on the back!

What's this "different" technology I tried out, you ask? It's HTML/CSS. I know, it's not that different, but it was new to me, and it turned out to be pretty difficult to make a nice, printable document with CSS that worked in any one browser. This was an unfortunate finding, because after my honor's thesis I'm burned out on LaTeX.

The entries of the planner, though, are generated using Perl and a bunch of CPAN. This was mostly fine. I used the very simple `XML::Writer` for HTML generation, but for date handling I had to use a combination of `Date::Simple`, `Date::Calendar`, `Calendar::Japanese::Holiday`, and `Calendar`. `Date::Simple` gave me a quick way to cycle through all of the days in a year. `$date++` is the next day. Pretty simple, as the name implies. To handle holiday lookup, I needed `Date::Calendar`. This gives me the date of Easter, as well as letting me specify holidays with changing dates, like Mother's Day. `Calendar::Japanese::Holiday` gave me Japanese holidays, which I didn't feel like specifying in `Date::Calendar` and keeping track of myself, especially since they might change ("Mountain Day" is a new holiday starting next year, for example).

The last one, `Calendar`, I used because it came with a Chinese calendar and I wanted to know when to mark 十五夜 (juugoya, fifteenth night), or 月見 (tsukimi, moon viewing) on the calendar. That's one that you can't really do [tsuki-okure](http://en.wikipedia.org/wiki/Japanese_calendar#Gregorian_months_and_the_.22One-Month_Delay.22) with. The conversion wasn't straight-forward, but I came up with this for giving me the best Gregorian calendar day for looking at the moon and eating rice cakes:

```perl
my $year = 2015;
# start with any date near the middle of the year just to initialize
# the Chinese cycle/year correctly
my $temp_date = Calendar->new_from_Gregorian(7, 1, $year);
$temp_date->convert_to_China();
# get tsukimi date from cycle and year found above, and date 8/15
my $tsukimi = Calendar->new_from_China(-cycle => $temp_date->cycle, -year => $temp_date->year, -month => 8, -day => 15);
$tsukimi->convert_to_Gregorian();
print "Schedule moon-viewing party for $year/" . $tsukimi->month . '/' . $tsukimi->day;
```

And of course I marked this in my planner with the emoji for moon viewing ceremony: 🎑.

Modules added to my wish list (or find list, if they already exist):

* an emoji converter that would take :bear:, :corn:, etc. and give back either the unicode character or code point.
* Calendar module that allows specifying holidays in different calendars. For example, specifying that tsukimi is on 8/15 in the Chinese calendar, and being able to check whether a day matches regardless of what calendar the day was created with. My trick above worked for tsukimi, but further gymnastics would be required for the new year, since there might be more than one in a Gregorian year.

I'll cover my CSS woes another time.
