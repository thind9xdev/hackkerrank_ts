'use strict';


function aVeryBigSum(ar: number[]): number {
    // Write your code here
    let sum = 0;
  for (let i = 0; i < ar.length; i++) {
    sum += ar[i];
  }
  return sum;

}

