class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

// create linked list 1 → 2 → 3 → 4
let head = new Node(1);
head.next = new Node(2);
head.next.next = new Node(3);
head.next.next.next = new Node(4);
var n=2
// print
var removeNthFromEnd = function(head, n) {
    let said=head
    let zaid=head
    let maid=zaid.next
    let count=0
    while(head!=null){
head=head.next
count++
    }
    console.log(count)
    let b=1
    let m=count-n
    if(m==0) return head.next
    while(b<=m){
if(b==m) {said.next=said.next.next}
else{
    said=said.next
}
b++
    }
    return zaid
};
console.log(removeNthFromEnd(head,n))