---
categories:
- Perl
- Dist::Zilla
- subdirectories
- software
- distribution
- testing
- prove
- Module::Build
- MakeMaker
comments: true
date: 2013-01-20T00:00:00Z
title: Testing Perl Distributions with Test Subdirectories
---

Normally I run my test suites with the prove utility:

`prove -vl --merge`

The `v` option turns on verbose processing, and the l option adds `lib/` to the include path. `prove `then runs all of the tests in the `t/` folder.

Today, I had a new problem. I merged multiple distributions into one ([without losing any Git history!](http://jasonkarns.com/blog/merge-two-git-repositories-into-one/)), and each had a test suite that I wanted to keep separate. Naturally, I moved the tests from each distribution into its own subdirectory under `t/`. However, this time when I ran `prove -vl`, I got this message:

    Files=0, Tests=0,  0 wallclock secs ( 0.00 usr +  0.00 sys =  0.00 CPU)
    Result: NOTESTS

Dubious... Well, I needed to know how to test with subdirectories in the `t/` folder, so I looked at the [prove](https://metacpan.org/module/prove) documentation and found the `-r` option. The `r` stands for "recurse", meaning that the test files would be found by recursing into the directories of the distribution (starting at the top in the root of the distribution). That turned out to be exactly what I needed!

    prove -vlr
    t/parser/01-testParser.t
    ...
    All tests successful.
    Files=28, Tests=1815, 211 wallclock secs ( 0.92 usr + 0.28 sys = 1.20 CPU)
    Result: PASS

Woohoo!

Also, both `MakeMaker `and `Module::Build` recurse in the same way during module testing. If you use `Dist::Zilla`, then you'll probably have the plugins `[MakeMaker]` and `[ModuleBuild]`. Using these, `dzil test` will recurse in the same way.
