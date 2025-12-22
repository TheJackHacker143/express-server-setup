function orderFood() {

return new Promise((res,rej)=>{

setTimeout(()=>{

let check=Math.random()>0.5

if (check){

res("Food delivered")

}else{

rej(“Food not delivered”)

}

},1000)

})

}

function orderDessert() {

return new Promise((res,rej)=>{

setTimeout(()=>{

let check=Math.random()>0.5

if (check){

res(“Dessert delivered”)

}else{

rej(“Dessert not delivered”)

}

},1000)

})

}

orderFood()

.then ((res)=>{

console.log(res)

return orderDessert()

}).then((res)=>{

console.log(res)

}).catch((err)=>console.log(err))

// Do not touch the code below:

module.exports = {

orderFood,

orderDessert,

};


