---
layout: "../../layouts/BlogPost.astro"
categories:
- Levenshtein
- Java code
- sequence
- alignment
- NLP
- Strings
comments: true
date: 2011-09-01T00:00:00Z
title: String Allignment with Edit Operations
---

A common way to measure the distance between two strings is using Levenshtein distance. Levenshtein distance is the minimum number of deletions, insertions, and substitutions needed to transform one string into another. Finding the distance between two strings is useful in certain applications such as spell checking (a word processor will suggest dictionary words that are close to your misspelled word). See [wikipedia](http://en.wikipedia.org/wiki/Levenshtein_distance) for more details and an example of Levenshtein distance calculation.

Another related and also important operation is to find the minimum edit alignment; that is, once the minimum edit distance between the two strings is found, output the sequence of operations that can be used to change the one string into the other. For example, if we let C mean "correct", S mean "substitution", D mean "deletion" and I mean "insertion", then the edit alignment between the characters in "construction" and "distortions" would be ISSCCISSCCCCD. Here is an explanation of the alignment:

* I: Insert a "c" ->cdistortions
* S: Substitute "d" for "o" ->coistortions
* S: Substitute "i" for "n" -> constortions
* CC: Leave the "st" alone
* I: Insert "r" -> constrortion
* S: Substitute "u" for "o" -> contrurtion
* S: Substitute "c" for "r" -> constructions
* CCCC: Leave "tion" alone
* D: delete "s" -> construction

 This sort of an allignment operation is commonly used in grading the output of machine translation and speech recognition systems, though the operations are done at the word level instead of the character level. When I needed a quick piece of code to do the alignment in my own application, though, there was none to be found on the internet! So I made my own and am posting it here. The logic for determining the proper string of edit operations is taken from a StackOverflow answer [here](http://stackoverflow.com/questions/5849139/levenshtein-distance-inferring-the-edit-operations-from-the-matrix/5861206#5861206). And now the code:

``` java
/**
 * @return List of Operations representing allignment between list1 and
 * list2. The allignment represents operations to change list2 into list1.
 */

public static List levenshteinAllignment(Object[] list1, Object[] list2) {
    int[][] distanceMatrix = getDistanceMatrix(list1, list2);
    List ops= new ArrayList(
            list1.length > list2.length ? list1.length : list2.length);
    //think of distance chart as going from bottom left to top right;
    //current position coordinates; start at top right.
    int row = list1.length;
    int col = list2.length;
    //could have moved to current position from three others; store their scores here.
    int diag;
    int left;
    int below;
    int current;

    while (row != 0 || col != 0) {
        diag = getVal(row-1,col-1,distanceMatrix);
        left = getVal(row,col-1,distanceMatrix);
        below = getVal(row-1,col,distanceMatrix);
        current = distanceMatrix[row][col];

//      if the value in the diagonal cell (going up+left) is smaller or equal to the
//      values found in the other two cells

//      AND
//      if this is same or 1 minus the value of the current cell
        if(diag <= left && diag <= below && (diag == current || diag == current - 1)){
//      then  "take the diagonal cell"
//      if the value of the diagonal cell is one less than the current cell:
            if(diag == current - 1)
//          Add a SUBSTITUTION operation (from the letters corresponding to
//          the _current_ cell)
                ops.add(new Operation(Operation.Type.SUBSTITUTION,list1[row-1],list2[col-1]));
            else
//              otherwise: do not add an operation this was a no-operation.
                ops.add(new Operation(Operation.Type.CORRECT,list1[row-1]));
            //move diagonally
            row--;
            col--;
        }
//      elseif the value in the cell to the left is smaller or equal to the value of the cell below current cell
//      AND
//      if this value is same or 1 minus the value of the current cell
        else if(left < below && (left == current || left == current - 1)){
//          add an INSERTION of the cell to the left
            ops.add(new Operation(Operation.Type.INSERTION,list2[col-1]));
            //move left
            col--;
        }
        else{
//          take the cell below, add
//          Add a DELETION operation
            ops.add(new Operation(Operation.Type.DELETION,list1[row-1]));
            //move down
            row--;
        }
    }
    Collections.reverse(ops);
    return ops;
}
private static int getVal(int row, int col, int[][] distanceMatrix){
    if(row < 0 || row > distanceMatrix.length)
        return Integer.MAX_VALUE;
    if(col < 0 || col > distanceMatrix.length)
        return Integer.MAX_VALUE;
    else return distanceMatrix[row][col];
}
public static class Operation{
    private Type type;
    private Object object1;
    private Object object2;
    public enum Type{
        CORRECT,SUBSTITUTION,DELETION,INSERTION
    }
    public Operation(Type t, Object o1){
        type = t;
        object1 = o1;
        object2 = null;
    }
    public Operation(Type t, Object o1, Object o2){
        type = t;
        object1 = o1;
        object2 = o2;
    }
    @Override
    public String toString(){
        if(type == Type.SUBSTITUTION)
            return "Substitution: " + object1.toString() + " -> " + object2.toString();
        if(type == Type.CORRECT)
            return "Correct:      " + object1.toString();
        if(type == Type.DELETION)
            return "Deletion:     " + object1.toString();
        if(type == Type.INSERTION)
            return "Insertion:    " + object1.toString();
        return null;
    }
}

/**
 *
 * @param array of objects to compare
 * @param array of objects to compare
 * @return Levenshtein distance between arrays.
 * This method uses the equals(Object o) method to compare the
 * objects in the two arrays, returning the Levenshtein distance between them.
 */
public static int levenshteinDistance(Object[] list1, Object[] list2) {
    int[][] distance = getDistanceMatrix(list1, list2);
    return distance[list1.length][list2.length];
}

/**
 *
 * @param list1
 * @param list2
 * @return A completely filled distance matrix; movement from [i-1][j]
 *         represents insertion, from [i][j-1] represents deletion, and from
 *         [i-1][j-1] represents substitution or no operation.
 */
private static int[][] getDistanceMatrix(Object[] list1, Object[] list2) {
    int[][] distanceMatrix = new int[list1.length + 1][list2.length + 1];

    for (int i = 0; i <= list1.length; i++)
        distanceMatrix[i][0] = i;
    for (int j = 0; j <= list2.length; j++)
        distanceMatrix[0][j] = j;

    for (int i = 1; i <= list1.length; i++)
        for (int j = 1; j <= list2.length; j++)
            distanceMatrix[i][j] = minimum(distanceMatrix[i - 1][j] + 1,// insertion
                    distanceMatrix[i][j - 1] + 1,// deletion
                    distanceMatrix[i - 1][j - 1]// substitution or correct
                            + ((list1[i - 1].equals(list2[j - 1])) ? 0 : 1));
    return distanceMatrix;
}

/**
 * Same as Math.min, but returns the minimum of three arguments instead of
 * two.
 */
private static int minimum(int a, int b, int c) {
    return Math.min(Math.min(a, b), c);
}
```

For word level alignment, you can call it on Strings using the split function like so:

``` java
for(Operation o : levenshteinAllignment(
            "What My house gleams with the light of the moon and your face"
                    .split(" "),
            "Your house with the light of the the moon and my face"
                    .split(" "))
        )
            System.out.println(o);

```

And the output would be:

```no-highlight
    Deletion:     What
    Substitution: My -> Your
    Correct:      house
    Deletion:     gleams
    Correct:      with
    Correct:      the
    Correct:      light
    Correct:      of
    Correct:      the
    Insertion:    the
    Correct:      moon
    Correct:      and
    Substitution: your -> my
    Correct:      face
```

Feel free to use and edit this as you like. Many applications disregard the strings that are correct and only output the edit operations, and that should be an easy edit.
