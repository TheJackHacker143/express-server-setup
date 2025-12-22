                                        
 head=[1,2,6,3,5,6] 
  val=6;
  var removeElements = function(head, val) {
    class ListNode {
          constructor(val, next = null) {
              this.val = val;
                  this.next = next;
                    }
                    }

                    //function removeElements(head, val) {
                      let dummy = new ListNode(0);
                        dummy.next = head;
                          let curr = dummy;

                            while (curr.next !== null) {
                                if (curr.next.val === val) {
                                      curr.next = curr.next.next; // skip the node
                                          } else {
                                                curr = curr.next; // move forward
                                                    }
                                                      }

                                                        return dummy.next;
                    
                                                        
    
};

                                                        
                                                  
            
console.log( removeElements(head,val))
                                                        

//  arr=[1,2,6,3,5,6] 
//   let val=6;
//     function jagan(arr,val){
// let m=0
//       var head={}
//       if(arr[0]==val){
//          head={
//           val:arr[1],
//           next:null
          
//         }
//         m=1
//       }
//      else{
//         head={
//         val:arr[0],
//          next:null
         
//        }
//      }
//       let tail=head
//       for(let i=1+m;i<arr.length;i++){
//         if(arr[i]==val){ continue }
//           tail.next={val:arr[i],
//                     next:null }
//         tail=tail.next
//         }
//       return(head)
//     }
//       console.log(jagan(arr,val))