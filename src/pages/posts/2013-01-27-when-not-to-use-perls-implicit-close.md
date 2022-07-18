---
layout: "../../layouts/BlogPost.astro"
categories:
- Perl
- filehandles
- software
- buffering
- special variables
comments: true
date: 2013-01-27T00:00:00Z
title: When not to use Perl's Implicit close; Suffering from Buffering
---

This post is a quick note on a bug I had difficulty tracking down.

One nice feature of Perl, introduced long before my time, is that of implicit closing. Perl closes filehandles for you when you forget (maybe on purpose). So the following is not a resource leak as a standalone script:

``` perl
open my $file, '>utf8', '/path/to/new/file'
    or die "couldn't open file: $!";
print $file 'Hello!';
```

When the script finishes, Perl will close $file for you, so you can be nice and lazy. The caveat to this is that the variable `$.` isn't reset as it would be with a normal close ([see docs here](http://perldoc.perl.org/functions/close.html)). [`$.`](http://www.perlmonks.org/?node_id=353259) holds the current line number from the last file read. So if you were processing a file line-by-line and found an error, you might print an error like `bad value foo on line XYZ` using the `$.` variable for `XYZ`. I raised a question about this on [StackOverflow](http://stackoverflow.com/questions/14513477/perl-implicit-close-resets#comment20233976_14513477).

Today I found another case where not explicitly closing a filehandle means trouble. I was working on testing a [modulino](https://github.com/briandfoy/modulino-demo/blob/master/lib/Modulino/Demo.pm)-style script with flexible outputs. You can call a method to set the handle that this script prints to. In my test script, I was setting the handle to be some filehandle and then checking the contents of the file against a string. The problem? The file was always empty at run time, but contained what I expected it to when I manually inspected it. Here's some example broken code:

``` perl
#ImplicitClose.pm
package Demo::Bad::ImplicitClose;
use strict;
use warnings;
sub new {
 my ($class) = @_;
 my $self = {};
 bless $self, $class;
 return $self;
}
sub output_fh {
    my ( $self, $fh ) = @_;
    if ($fh) {
        if ( ref($fh) eq 'GLOB' ) {
            $self->{output_fh} = $fh;
        }
        else {
            open my $fh2, '>', $fh or die "Couldn't open $fh";
            $self->{output_fh} = $fh2;
        }
    }
    $self->{output_fh};
}
sub some_long_method {
 my ($self, $text) = @_;
 print { $self->{output_fh} } $text;
}
1;
#test.pl
use strict;
use warnings;
use autodie;
use Test::More tests => 1;
use File::Slurp;
use Demo::Bad::ImplicitClose;
my $file_name = 'file1.txt';
#make sure we pass the test from outputting something *this* run
unlink $file_name if -e $file_name;
my $print = 'some junk';
my $demo = Demo::Bad::ImplicitClose->new();
$demo->output_fh($file_name);
$demo->some_long_method($print);
my $contents = read_file($file_name);
is($contents, $print);
```

If you run `test.pl`, you'll see that its one and only test fails:

    >perl -I[folder where you put the Demo directory] test.pl
    1..1
    not ok 1
    #   Failed test at test.pl line 68.
    #          got: ''
    #     expected: 'some junk'
    # Looks like you failed 1 test of 1.

Then, when you inspect the contents of `file1.txt`, you have:

    some junk

What happened here? I was [suffering from buffering](http://perl.plover.com/FAQs/Buffering.html). Because neither `test.pl` nor `ImplicitClose.pm` closed the file, it was still open when I was trying to read it. Nothing had been written to it yet because the amount printed was so small that it had to wait in the buffer either until there was more to write or until the file was closed, which would flush the buffer. Implicit close wouldn't be performed until the the filehandle's reference count reached 0, and the `$demo` object still had a reference to it. So the test would have worked fine if I had assigned `undef` to `$demo`, or just closed the filehandle.

Watch those implicit closes.
