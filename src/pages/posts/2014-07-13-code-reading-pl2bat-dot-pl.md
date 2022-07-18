---
layout: "../../layouts/BlogPost.astro"
categories:
- code reading
- Perl
- batch
- pl2bat.pl
- distributions
comments: true
publishDate: 2014-07-13T23:42:07Z
title: 'Code Reading: pl2bat.pl'
---

When you install a Perl distribution from CPAN that comes with an executable script, Perl adds it to your path so it can be treated like any other command line program. On a *nix system, all that needs to be done for this to work is to set the script to be executable. Windows doesn't have executable script files with shebang lines like *nix, however, so Perl generates a batch file.

Let's see how this works. First, let's pick a distribution that comes with an executable script. The `App::` namespace is a great place to look for that.

```console
cpan App::Cleo
...
Running make install
Installing C:\dev\strawberry-perl-5.18.2.2-64bit-portable\perl\site\lib\App\Cleo.pm
Installing C:\dev\strawberry-perl-5.18.2.2-64bit-portable\perl\site\bin\cleo
Installing C:\dev\strawberry-perl-5.18.2.2-64bit-portable\perl\site\bin\cleo.bat
...
```

Hmm, cleo.bat. That's not in the [distribution](https://metacpan.org/source/THALJEF/App-Cleo-0.004/bin)! Let's take a look:

```console
@rem = '--*-Perl-*--
@echo off
if "%OS%" == "Windows_NT" goto WinNT
IF EXIST "%~dp0perl.exe" (
"%~dp0perl.exe" -x -S "%0" %1 %2 %3 %4 %5 %6 %7 %8 %9
) ELSE IF EXIST "%~dp0..\..\bin\perl.exe" (
"%~dp0..\..\bin\perl.exe" -x -S "%0" %1 %2 %3 %4 %5 %6 %7 %8 %9
) ELSE (
perl -x -S "%0" %1 %2 %3 %4 %5 %6 %7 %8 %9
)

...

#!/usr/bin/env perl
#line 29

use strict;
use warnings;
use App::Cleo;

our $VERSION = 0.003;
...
```

It seems to be a batch script with the entirety of cleo.pl pasted in the bottom. How does that work? Well first there's a little bit of logic to differentiate requirements on Windows NT versus other Windows systems, and some logic to deal with Perl being located in different places (relative to `%~dp0`, the directory containing the script). `%0` is the name of the script being run, and Perl is being invoked on it with different arguments. The other %number arguments are the script arguments, which are passed along to the script once again. So this is a batch script that passes itself to Perl? But what's Perl going to do with all of the batch garbage that comes before the actual Perl script?

The magic here is in the `-x` switch. From [perlrun](http://perldoc.perl.org/perlrun.html):

>tells Perl that the program is embedded in a larger chunk of unrelated text, such as in a mail message. Leading garbage will be discarded until the first line that starts with #! and contains the string "perl". Any meaningful switches on that line will be applied.

Ooh! That's an interesting feature. I wonder if anyone still uses it for emailed scripts.

So the batch script calls Perl on itself, and Perl skips all of the batch syntax and goes straight to the shebang line (`#!/usr/bin/env perl`) and runs the original [cleo](https://metacpan.org/source/THALJEF/App-Cleo-0.004/bin/cleo) Perl script.

The mechanism used to create this is is [pl2bat.pl](https://metacpan.org/pod/distribution/perl/win32/bin/pl2bat.pl), and you'll find interesting history, motivation and gotchas in the documentation there. Thanks to pl2bat, CPAN author scripts are installed on Windows and added to the path. I can just open my cmd and type `cleo` to start the app.
