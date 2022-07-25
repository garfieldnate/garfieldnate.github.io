---
layout: "../../../layouts/BlogPost.astro"
categories:
- scalar context
- Perl
- context
- scalar
- list
- parameter checking
- list assignment
publishDate: 2014-01-11T00:00:00Z
title: List Assignment in Scalar Context
description: Understanding = in Perl
---

(Cross-posted on [blogs.perl.org](http://blogs.perl.org/users/nate_glenn/2014/01/list-assignment-in-scalar-context.html))

This week I received some special help [on SO](http://stackoverflow.com/questions/21037846/why-does-the-goatse-operator-work/21069822) in understanding how the goatse operator works. I was very thankful for everyone's help. [These](http://www.perlmonks.org/?node_id=790129) [two](http://www.perlmonks.org/?node_id=527973) articles were also very helpful and I recommend reading them.

Part of my confusion over the goatse operator was not knowing the difference between list and scalar assignment operators, which both are indicated via '='. Further confusing is the fact that each can be used in either scalar or list context, so you can have list assignment in scalar context or scalar assignment in list context.

The type of assignment is determined by what is being assigned to. As ikegami says, assignment to an aggregate is a list assignment, aggregate meaning an array, a hash, a parenthetical expression, or a my/our/local variable declared with parens.

The context of an assignment operator will really only matter when you are storing or checking the return value. You can store the value of an assignment operator by using another asignment operator: `blah1 = blah2 = blah3`, where `blah1` is the value returned by assigning `blah3` to `blah2`. The value gets checked in other contexts too, like inside a control structure condition: `if(my $line = <>)`, etc. Here are examples for each combination of context and assignment operator:

``` perl
# scalar assignment in scalar context
$thing = ($foo = 'bar'); # assignment returns $foo as lvalue
say $thing; # bar
# scalar assignment in list context
($thing) = ($foo = 'bar'); #assignment returns ($foo), $foo is lvalue
say $thing; # bar
# list assignment in scalar context;
# assignment returns number of items in RHS of list assignment
$thing = (($foo, $bar) = qw(foo bar));
say $thing; # 2
$thing = (() = qw(foo bar))
say $thing; # 2
$thing = () = qw(foo bar);
say $thing; # 2
# list assignment in list context
# assignment returns LHS list as lvalues
($thing) = (($foo, $bar) = qw(foo bar));
say $thing; # foo
($thing) = (() = qw(foo bar));
say $thing; # nothing ($thing is undef)
```

That third one is of course the goatse operator. By the way for the record I totally think it looks more like a Saturn, though my wife disagrees and everyone seems to call it goatse. Anyway, though generally list assignment in scalar context is the rarest one, there are other occurrences. Ysth mentions the `each` operator inside of a `while` loop:

``` perl
while(my ($key, $value) = each %hash)
```

The aggregate on the left makes this list assignment, and `while` makes it scalar context. Once the hash is out of keys, `each` returns `()` so that the assignment operator returns `0`, finishing the `while` loop.

I was pretty happy to finally understand this area I never quite understood I didn't understand (though someone might still point out I don't know what I'm talking about, as seems to be common with this subject). Today, though, I thought of one more usage of list assignment in scalar context that is probably used erroneously fairly often: quick and dirty parameter checking:

``` perl
my ($input, $output) = @ARGV or die 'Usage: script <input> <output>';
```

I always thought that the assignment would return $output, probably by analogy with comma expression assignment to a scalar (`$stuff = qw(foo bar)`). However, if the user fails to provide a second parameter, the error would not be caught. This assignment will return the number of elements in @ARGV, which could be `1` instead of the required `2`. So this use is only correct when unpacking `@_` or `@ARGV` and expecting exactly one variable:

``` perl
my ($input) = @ARGV or die 'Usage: script <input>';
```

This is probably obvious to Perl old-timers, but to me it was a revelation. And it doesn't look like I'm the only one, either. Grepping CPAN for assignment of an array to a parenthetical with 'or' after it turns up many mis-uses [here](http://grep.cpan.me/?q=%5C%29%5Cs*%3D%5Cs*%40%5B%5E+%5Cr%5Cn%5D%2B%5Cs%2Bor).
