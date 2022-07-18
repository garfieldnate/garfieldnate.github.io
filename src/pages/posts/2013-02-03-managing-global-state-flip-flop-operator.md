---
layout: "../../layouts/BlogPost.astro"
categories:
- idiom
- flip-flop
- Perl
- bug
- testing
- perlop
comments: true
publishDate: 2013-02-03T00:00:00Z
title: 'Managing Global State: the Flip-Flop Operator'
---

Today I was faced with another mysterious failing test while writing a test suite for some legacy code. I knew it had to be a problem with persisting state because this particular test only failed when processing a particular data set with the same object which was just used to process another set.

My first step to trying to fix this was to delete all of the values stored in the object during the processing procedure:

``` perl
delete $self->{stateDatum1};
delete $self->{stateDatum2};
#etc....
```

Nothing changed. I reduced the problematic code into a small example for this post. First, the module to be tested:

``` perl
package Demo::Bad::GlobalFlipFlop;
use strict;
use warnings;
use autodie;
use 5.010;

sub new {
 my ($class) = @_;
 my $self = {};
 bless $self, $class;
 return $self;
}

#return true if parsing succeeded, false otherwise.
sub parse {
 my ($self, $file) = @_;
 open my $file_in, '<', $file;

 my $started = 0;
 while( <$file_in> ){

  #flip-flop
  next unless /^=startHere/i .. 0;    # start processing
  $started = 1;
  #continue doing something with file contents...
  # say 'hello:)' if(/hello/);
  # say 'goodbye:(' if(/goodbye/);
 }
 if(not $started){
  say "File not processed; missing '=startHere' line.";
  return;
 }
 close $file_in;
 return 1;
}

1;
```

The main idea here is that we are processing some file and returning a boolean representing its validity. The only requirement of validity of the file is that a certain start token is found within it; everything before the start sequence is ignored. Here are valid and invalid example files:

```plaintext
#good_file.txt
=startHere
hello
goodbye

#bad_file.txt- doesn't contain a start sequence
hello
goodbye
```

Now, the test file:

``` perl
use strict;
use warnings;
use autodie;
use Test::More tests => 2;
use File::Slurp;
use Demo::Bad::GlobalFlipFlop;

my $good_name = 'good_file.txt';
my $bad_file = 'bad_file.txt';

my $demo = Demo::Bad::GlobalFlipFlop->new();

ok( $demo->parse($good_name) );
ok( not $demo->parse($bad_file) );
```

The output of running this file:

    >perl test.pl
    1..2
    hello:)
    goodbye:(
    ok 1
    hello:)
    goodbye:(
    not ok 2
    #   Failed test at test.pl line 61.
    # Looks like you failed 1 test of 2.

Why did it fail the second test, which involves checking that an invalid file is considered invalid?

The bug is in the line which matches the start token:

```perl
# line 23
next unless /^=startHere/i .. 0; # start processing
```

The regex, flip-flop operator and 0 were clearly some sort of idiom that I was unfamiliar with. I had only ever used the flip-flop with numbers, such as `1..10`, which iterates from numbers 1 through 10. How does it work? Let's check [perlop](http://perldoc.perl.org/perlop.html):

    > Each ".." operator maintains its own boolean state, even across calls to a subroutine that contains it. It is false as long as its left operand is false. Once the left operand is true, the range operator stays true until the right operand is true *AFTER* which the range operator becomes false again.

The mysterious line thus worked like this:

* Skip lines of the input file until the left side, a match for the start token, is true
* Don't skip lines again until the right side, `0`, is evaluated as true (which never happens).
* The state of this flip-flop operator is stored between subsequent calls to the subroutine. It's a hidden global variable! Usually flip-flop operators are used in contexts that are guaranteed a reset after iteration (such as `1..10`). Not so here! I replaced the offending code with some that keeps state for me:

``` perl
my $started = 0;
while(<$file_in>){
    if(/^=startHere/i){
        $started = 1;
    }
    next unless $started;
#continue processing...
```

With this, everything works as expected:

    >perl test.pl
    1..2
    ok 1
    File not processed; missing '=startHere' line.
    ok 2

Note that this bug only presented itself to me because I changed the legacy standalone script to be its own module, creating the possibility of storing state between subroutine calls.
