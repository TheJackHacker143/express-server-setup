class List {
      constructor(data) {
        this.head = {
          value: data,
          next: null,
        };
        this.tail = this.head;
        this.size = 1;
      }
      appendNode(nodeData) {
        let newNode = {
          value: nodeData,
          next: null,
        };
        this.tail.next = newNode;
        this.tail = newNode;
        this.size += 1;
      }
      deletenode(index){
        let count=1
        if(index==1){
          this.head=this.head.next
        }
        else{
        let lead=this.head
        while(count<index-1){
          count++
          lead=lead.next

        }
        lead.next=lead.next.next
          if(index==this.size){
            this.tail=lead
          }
        }
        this.size--
      }
      insertnode(index,val){
        let count=1
        if(index==1){
          let newnode=this.head
          this.head={
            value:val,
            next:null
          }
          this.head.next=newnode
        }
        else{
        let lead=this.head
        while(count<index-1){
          count++
          lead=lead.next

        }let zode=lead.next
        lead.next={
          value:val,
          next:zode
        }

          if(index==this.size+1){
            this.tail={
                value:val,
                next:null
              }
          }
        }
        
        this.size++

      }
      
    }
    
    var list = new List(200);
    list.appendNode(300);
    list.appendNode(400);
    list.appendNode(500);
    list.appendNode(600);
    list.appendNode(700);
    list.insertnode(6,4000)

    //  list.deletenode(1)
    //  list.deletenode(2)
    // list.deletenode(4);
    // list.deletenode(2);
    // list.searchNode(900)

    
    console.warn(list);
  