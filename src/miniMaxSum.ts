function miniMaxSum(arr) {
    arr.sort((a, b) => a - b);
    
    let minSum = arr.slice(0, 4).reduce((acc, val) => acc + val, 0);
    
    let maxSum = arr.slice(arr.length - 4).reduce((acc, val) => acc + val, 0);
    
    console.log(minSum, maxSum);
}

miniMaxSum([1, 2, 3, 4, 5]);
