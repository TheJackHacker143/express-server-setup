class StockSpanner{
    constructor(){
    this.max = []
    this.min = []
    }
    
next(price) {
    if (this.max.length == 0) {
        this.max.push(price)
        return 1
    }
    else if (price < this.max[this.max.length - 1]) {
        this.max.push(price)
    return 1
    }
    else if (price > this.max[this.max.length - 1]) {
        this.count = 1
        while (price > this.max[this.max.length - 1]) {
            this.min.push(this.max.pop())
        this.count++
        }
        
        while (this.min.length > 0) {
            this.max.push(this.min.pop())
        }
        this.max.push(price)
    return this.count
   }
}
}
var stockSpanner = new StockSpanner();
console.log(stockSpanner.next(100)) // return 1
console.log(stockSpanner.next(80))  // return 1
console.log(stockSpanner.next(60))  // return 1
console.log(stockSpanner.next(70) ) // return 2
console.log(stockSpanner.next(60))// return 1
console.log(stockSpanner.next(75) ) // return 4, because the last 4 prices (including today's price of 75) were less than or equal to today's price.
console.log(stockSpanner.next(85)) // return 6
