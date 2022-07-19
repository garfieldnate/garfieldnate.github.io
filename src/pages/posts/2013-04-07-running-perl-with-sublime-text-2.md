---
layout: "../../layouts/BlogPost.astro"
categories:
- Sublime Text
- productivity
- Perl
comments: true
publishDate: 2013-04-07T00:00:00Z
title: Running Perl with Sublime Text 2
description: Project setup code
---

I've been having fun trying out [Sublime Text](http://www.sublimetext.com/). It's pretty, fast, and extremely extensible.

The first thing that I wanted was to be able to work well with Perl. I installed [Package Control](http://wbond.net/sublime_packages/package_control), followed by [SublimeLinter](https://github.com/SublimeLinter/SublimeLinter), which has the [perlcritic](http://perlcritic.com/) command built in. Making this useful requires a little finagling; perlcritic is by no means a quick program (being a really thorough linter for a language which is complex to parse), and the defaults for SublimeLinter cause it run over and over again as you type. To fix this, I edited `Packages/SublimeLinter/SublimeLinter.sublime-settings` and changed the "sublimelinter" setting to false. Now, in order to lint the current file, I have to press <kbd>ctrl+alt+l</kbd>. (**Update:** I don't recommend this for Sublime Text 2 because of speed problems. See [this issue on Github](https://github.com/SublimeLinter/SublimeLinter/issues/408). ST3 should be fine, though.)

Next, I wanted to be able to run my Perl scripts. Sublime has the <kbd>ctrl+b</kbd> shortcut for running a build for the current file. What the build actually does is specified in either a build file or the project file. To create a new build file for perl, go to Tools->Build System -> New Build System. The build file I've seen on different sites for Perl looks like this:

``` json
{
    "cmd": ["perl", "$file"],
    "file_regex": ".* at (.*) line ([0-9]*)",
    "selector": "source.perl"
}
```

Save this as perl.sublime-build. With this, whenever you are working on a Perl file and hit <kbd>ctrl+b</kbd>, the command "perl -w your_file.pl" will be run. This, however, was not good enough for me. Most of the time I am working on tests for a Perl module, so I have to run `perl -Ilib t/my_test_file.t`. I also want to be able to run individual tests as well as [`prove`](https://metacpan.org/module/OVID/Test-Harness-3.26/bin/prove) using shortcuts.

To do this, we need to turn the module directory into a Sublime Text project. This is pretty simple. First, open the module directory in Sublime Text. Select Project->Save Project As, then choose the name of the project and save it in the top directory of the module. Paste the following simple contents into the project file:

``` json
{
 "folders":
 [
  {
   "path": "."
  }
 ]
}
```

All this does is add the entire directory to the project. Next, we edit the Perl build file to reference the root of the project so we can add the top-level lib directory to our include path:

``` perl
{
 "cmd": ["perl", "-Ilib", "$file"],
 "working_dir": "$project_path",
 "file_regex": ".* at (.) line ([0-9])",
 "selector": "source.perl",
}
```

Great! Now we can run Perl on tests contained in module directories. This still works fine for standalone scripts, too.

Now I'd like to run my whole test suite using prove. By default, <kbd>ctrl+shift+b</kbd> runs a build variant with the name "Run", so we'll just make a `prove` variant with that name. I'd much rather give it a more descriptive name, but the Sublime shortcut requires this name. You can change the shortcut, but then you wouldn't be able to use the shortcut for other builds (other languages). It's all up to you. Here is the final build file:

``` json
{
 "cmd": ["perl", "-Ilib", "$file"],
 "working_dir": "$project_path",
 "file_regex": ".* at (.) line ([0-9])",
 "selector": "source.perl",
 "variants": [
        {
  "cmd": ["prove", "-vlr", "--merge"],
  "working_dir": "$project_path",
         "name": "Run",
  "windows": {
                 "cmd": ["prove.bat", "-vlr", "--merge"]
             }
        }
    ]
}
```

Note that I needed a Windows variant for `prove` since the Sublime editor doesn't work the same as cmd. You could, alternatively, add '"shell":true' to use the system's command shell so you don't need a separate command for Windows.

With this build file in place, I can now press ctrl+b to run any Perl script, with it's project lib directory in @INC, and <kbd>ctrl+shift+b</kbd> to run prove. Voila!

Here are the final files:

* [project file](https://sites.google.com/site/complingfiles/files/perl-module.sublime-project?attredirects=0&d=1) (put a copy in your project root folders)
* [Perl build file](https://sites.google.com/site/complingfiles/files/perl.sublime-build?attredirects=0&d=1) (only one is needed per ST installation)
