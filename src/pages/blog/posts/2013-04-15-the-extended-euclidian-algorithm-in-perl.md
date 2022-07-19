---
layout: "../../../layouts/BlogPost.astro"
categories:
- Perl
- number theory
- Euclid
- GCD
- math
comments: true
publishDate: 2013-04-15T00:00:00Z
title: The Extended Euclidian Algorithm in Perl
---

This week I learned about the extended Euclidian algorithm for finding a linear combination of two numbers that yields their GCD. For example, the GCD of 213 and 171 is 3, and -4*213 + 5*171 = 3. This algorithm is important in the [RSA](http://en.wikipedia.org/wiki/RSA_(algorithm)) encryption scheme.

I had quite a difficult time getting myself to fully understand how it works. I jumped between [Wikipedia](http://en.wikipedia.org/wiki/Extended_euclidean_algorithm), my [data structures textbook](http://www.amazon.com/Data-Structures-Problem-Solving-Using/dp/0321541405/ref=sr_1_1?ie=UTF8&amp;qid=1365529203&amp;sr=8-1&amp;keywords=data+structures+and+problem+solving+using+java) (don't buy it), a [YouTube video](http://www.youtube.com/watch?v=twlo21D9LY0), and this excellent [number theory class lecture](http://public.csusm.edu/aitken_html/m422/Handout1.pdf). The lecture is the best, though I think there may be a typographical error in the recursive formula.

The basic idea uses recursion with an easy base step. We call `Euclid(a,b)` with `a ≥ b`:

* The base case is when b is 0. The GCD of x and 0 is always x, and the coefficients to produce a GCD of 0 are 1 and 0 (or anything else): 1*x + 0(or anything)\*0 = x. So the base case returns (1,0)
* Any other step starts by recursively calling `Euclid(b, a mod b)`. We know that the GCD of a and b is the same as the GCD of b and a mod b (lemma 12 in the lecture). This recursive call is guaranteed to eventually get to the base case of b = 0.
* After finding the coefficients for producing the GCD from b and a mod b, we can calculate the ones for producing the GCD from a and b, because a mod b can be put in terms of a and b (see the code comments for the formulas).

To really help myself understand the whole thing, I wrote a Perl script to illustrate it. I put in lots of comments as I worked my way through it.

``` perl
use strict;
use warnings;
use 5.010;
#start with a >= b
my @nums = sort {$b <=> $a} @ARGV;

gcd(@nums);

#input: two numbers (a,b) a >= b > 0
#output: the coefficients which which yield their GCD;
sub gcd {
 my ($a, $b) = @_;

 #base case; the GCD of x and 0 always x;
 #and the coefficients will always be 1 and 0 (or anything) because

 #1*x + 0*0 = x

if($b == 0){
  say "GCD is $a";
  say "(a,b) = ($a,$b), coefficients = (1,0)";
  say "1x$a + 0x$b = $a";
  return (1, 0);
 }

 #otherwise, we evaluate u and v for k = ub + vr, where r is a mod b
 #gcd(b, a%b) gives the same value
 my $remainder = $a % $b;
 my ($u, $v) = gcd($b, $remainder);
 #now we can find k in terms of a and b because we know r in terms a and b
 #r = a - bq, where q = the whole part of a/b
 #k = ub + vr = ub + v(a - bq) = va + b(u-qv)
 #so the coefficient on a is v, and the coefficient on b is 1-qv
 my $x = $v;
 my $q = int(($a/$b));
 my $y = $u - $q*$x;
 say "(a,b) = ($a,$b), coefficients are ($x,$y)";
 say "${x}x$a + ${y}x$b = " . ($x*$a + $y*$b);
 return ($x, $y);
}
```

Feel free to leave a comment if you think that something could be stated more clearly. I hope it helps anyone else trying to learn how the extended Euclidian algorithm works.
