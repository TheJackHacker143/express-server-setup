l1={val:11,
    next:{val:2,
    next:{val:3,
    next:{val:4,
    
    next:null
}}}}
l2={val:0,
    next:{val:4,
    next:{val:6,
    next:{val:8,
    next:{val:10,
    next:null
}}}}}
var addTwoNumbers = function (l1, l2) {
   while(l1.val==0||l2.val==0){ if(l1.val==0){l1=l1.next}
    if(l2.val==0){l2=l2.next}}
    let x=0
    let head = {
        val: 0,
    next:null
    } 
    let tail = head
         //head.next=tail
        //head.next=tail
    while (l1 != null || l2 != null) {
 tail.next ={val : (l1.val + l2.val + x) % 10,
    next:null}
        x = Math.floor((l1.val + l2.val + x) / 10)
tail = tail.next
        l1 = l1.next
        l2 = l2.next
        
        if (l1==null&&l2!=null) {
           l1={val:0,
            next:null}
        }
        if (l2==null&&l1!=null) {
           l2={val:0,
            next:null}
        }
        }

if(x!=0){
    tail.next={
        val:x,
        next:null
    }
}
    return head.next
};
console.log(addTwoNumbers(l1,l2))