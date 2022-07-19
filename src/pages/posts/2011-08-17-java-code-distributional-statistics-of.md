---
layout: "../../layouts/BlogPost.astro"
categories:
- Java
- Math
- Statistics
- Logarithm
comments: true
publishDate: 2011-08-17T00:00:00Z
title: Distributional Statistics of Log Values in Linear Domain
description: Aggregating logarithmic values of mean, variance, kurtosis, etc.
---

Quite a long title, sorry. Basically, I had a bunch of log values (and they needed to stay logarithmic to avoid underflow) and I wanted to compute distributional statistics on them, like mean, variance and kurtosis. I wasn't sure if it would be valid to compute these kinds of statistics on the numbers as is, so I created a class to do all of the calculations in linear space. I'll post the result here, though there may be bugs (tell me if you find some!).

One thing to remember is that if the statistics map onto a negative number in linear space then it will be impossible to take the logarithm; therefore, these are invalid operations and you have to consider this before trying to retrieve any numbers from this program. I hope someone finds this useful!

```java

package edu.jhu.clsp.ws11.rerank.utils;

import java.util.Arrays;

/**
 * This class returns distributional statistics given a list of numbers. The numbers are assumed to
 * be in logarithmic space, and all of the computation is done on numbers converted from log to linear
 * space; the results are returned again in log space.
 * @author Nate Glenn
 *
 */
public class LogDistributionalStats {
    private double[] numbers;
    private int N;//number of numbers input
    private double logN;//log(N)
    private double min;
    private double median;
    private double max;
    private double mean;
    private double avgAbsDeviation = 0;
    private double standardDeviation = 0;
    private double variance = 0;
    private double skew = 0;
    private double kurtosis = 0;
    private double sum;
    /**
     * Compute statistics on nums. If norm is true, then compute statistics after normalizing
     * the array, except for min, mean, and max.
     *
     */
    public LogDistributionalStats(double[] nums, boolean norm){
        N = nums.length;
        //must make new array so as to avoid overwriting the input.
        numbers = new double[N];
        for(int i = 0; i < numbers.length; i++)
            numbers[i] = nums[i];
        logN = Math.log(N);
        //compute sum, mean, min, and max before normalization (if done at all)
        sum = sumAsLinear();
        mean = sum - logN;
        Arrays.sort(numbers);
        min = numbers[0];
        max = numbers[N-1];
        if(norm)
            ArrayUtils.minusAll(numbers,sum);

        double deviation;
        if(N > 1){
            for(double d : numbers){
                deviation = LogMath.linearDifference(mean, d);
                avgAbsDeviation = LogMath.addAsLinear(avgAbsDeviation, deviation);
                variance += deviation*2;
                skew += deviation*3;
                kurtosis += deviation*4;
            }
            variance -= Math.log(N-1);
            standardDeviation = variance/2;
            skew -= logN+variance+standardDeviation;
            //don't do negative 3 calculation here.
            kurtosis = kurtosis-(logN + 2*variance);
        }
        else{
            for(double d : numbers){
                deviation = LogMath.linearDifference(mean, d);
                avgAbsDeviation = LogMath.addAsLinear(avgAbsDeviation, deviation);
            }
            variance = Double.NaN;
            standardDeviation = Double.NaN;
            skew = Double.NaN;
            kurtosis = Double.NaN;
        }
        avgAbsDeviation -= logN;
        int mid = N/2;
        if(N % 2 == 0)
            median = LogMath.addAsLinear(numbers[mid-1], numbers[mid]) - Math.log(2);
        else
            median = numbers[mid];
    }

    /**
     *
     * @param nums
     * @return Linear space sum of all numbers in nums
     */
    private double sumAsLinear() {
        double total = 0;
        for(double d : numbers)
            total = LogMath.addAsLinear(total, d);
        return total;
    }

    public double getMin() {
        return min;
    }

    public double getMax() {
        return max;
    }

    public double getMean() {
        return mean;
    }

    public double getStandardDeviation() {
        return standardDeviation;
    }

    public double getVariance() {
        return variance;
    }

    public double getSkew() {
        return skew;
    }

    public double getSum() {
        return sum;
    }

    /**
     * Kurtosis is not calculated with any linear combinations (subtracting three)
     * This is because it is often impossible to convert this to log space, since
     * the final product is so often negative. If you want the minus three back again, you can
     * try to minus it yourself and handle any exceptions (use LogMath.minusAsLinear()).
    */
    public double getKurtosis() {
        return kurtosis;
    }

    public double getMedian() {
        return median;
    }

}
```
