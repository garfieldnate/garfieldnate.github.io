---
layout: "../../layouts/BlogPost.astro"
categories:
- Perl
- software
- distribution
- Module::Build
- MakeMaker
comments: true
publishDate: 2012-08-17T00:00:00Z
title: 'Perl Tip: Don''t Use a Makefile for Your Module'
---

During my internship at [SoarTech](http://www.soartech.com/), I got a chance to learn a lot more about creating Perl modules. I put together a package of scripts for converting old file formats for speech recognition grammars, and I thought it worked beautifully. Of course, to start my module I used the classic tool h2xs:

    h2xs -X -n Foo::Bar

My final code was well tested, and quick to install. I asked my co-worker to install it on his machine, and it was just as easy to use.

I was confident when I presented it to the company, until someone asked, "so, these Perl scripts, they work on Windows, Mac, Linux, etc., right?" I told them they *should*, since Perl is cross-platform. I became (a good kind of) paranoid, and asked my boss to test my code on his Mac (I was using Windows). The thing exploded when fed my script! I couldn't believe it! What could I have done so wrong?

So, the next day I stayed home a bit to borrow my wife's Mac and do more testing. But there was a big problem: my module used [ExtUtils::MakeMaker](http://search.cpan.org/~mschwern/ExtUtils-MakeMaker-6.62/lib/ExtUtils/MakeMaker.pm) to install itself. This has been the standard for years, and the majority of CPAN modules use this for installation. The cpan utility recognizes it, and runs installation automatically. However, [MakeMaker is DOOMED!](http://schwern.dreamhosters.com/talks/MakeMaker_Is_DOOMED/) It requires an external tool, make, which you can find on every *nix platform, but everywhere else it has to be installed by the user. Strawberry Perl and ActiveState Perl for Windows come with a version (dmake or nmake). But on Mac, you have to install [XCode](https://developer.apple.com/xcode/), a whopping 4 gigabyte distribution for Mac developers.

...

Dangit...

My solution was to follow [Michael Schwern](http://search.cpan.org/~mschwern/)'s advice and convert to using [Module::Build](http://search.cpan.org/~leont/Module-Build-0.4002/lib/Module/Build.pm), which does not have external dependencies. There happens to be a [converter](http://search.cpan.org/~schubiger/Module-Build-Convert-0.49/lib/Module/Build/Convert.pm) to help you switch. When I ran it on my code, it didn't give a completely valid output, but the edits I did were minimal. From a user standpoint, the module will still be installed using the `cpan` utility, so nothing has changed.

When I put new distribution, with a shiny new Build.PL file, on a Mac, I still had some failed tests, but there weren't intermingled with the giant BOOM that happens when the `cpan` utility can't find `make`. After fixing a bug or two, my module works on Windows and Mac and my boss is a happy camper.
