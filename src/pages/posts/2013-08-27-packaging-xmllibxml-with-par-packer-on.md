---
layout: "../../layouts/BlogPost.astro"
categories:
- wxpar
- XML::LibXML
- LibXML
- Perl
- Windows
- pp
- XML
- DLL
- Par Packer
- WxWidgets
comments: true
publishDate: 2013-08-27T00:00:00Z
title: Packaging XML::LibXML with PAR Packer on Windows
---

PAR Packer is an excellent utility for delivering your Perl scripts as standalone executables. A standalone executable is highly desired in, for example, a corporate environment where everyone needs a program you wrote but you can't expect anyone to learn how to run Perl programs.

A recent requirement at $work was for a standalone executable. Originally, I was supposed to let my coworker work his magic (and his ActiveState PerlPacker license), but the client required an all-open-source solution. Thus I turned to PAR Packer and its [`pp`](https://metacpan.org/module/pp) utility.

So far, the most difficult aspect of using pp is that it doesn't detect all dependencies. It requires the user to explicitly list many required DLL's. I needed to list DLL's for two libraries: [Wx](https://metacpan.org/module/Wx) and [`XML::LibXML`](https://metacpan.org/module/XML::LibXML).

Creating Wx apps with pp is a solved problem: `wxpar`, bundled with [`Wx::Perl::Packager`](https://metacpan.org/module/Wx::Perl::Packager), is a `pp` wrapper and adds all of the required Wx DLL's.

Getting it to work with `XML::LibXML` required some trial and error. I would create the executable, move it to another computer without Perl or C, run it from the command line (clicking the file hid certain error messages), and write down the name of the library that was missing. It turned out that three DLL's needed to be explicitly added: `libxml2-2__.dll`, `libiconv-2__.dll` and `libz__.dll`. On my computer these were located in C:\strawberry\c\bin. So, the final command I used to build my application was thus:

    wxpar -o MyApp.exe -I lib -l C:/strawberry/c/bin/libxml2-2__.dll -l C:/strawberry/c/bin/libiconv-2__.dll -l C:/strawberry/c/bin/libz__.dll MyApp.pl

Is there a simpler way to do this? What's with all the underscores? Comments and questions welcome below.
