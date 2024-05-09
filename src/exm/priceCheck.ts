function priceCheck(products, productPrices, productSold, soldPrice) {
     let count = 0;
    
    for (let i = 0; i < productSold.length; i++) {
        const soldProductIndex = products.indexOf(productSold[i]);
        
        if (soldProductIndex !== -1) {
            if (productPrices[soldProductIndex] !== soldPrice[i]) {
                count++;
            }
        }
    }
    
    return count;

}