class MinPriorityQueue{

    //Parent = Floor(i/2)
    //Right Child = i * 2 + 1
    //Left Child =  i * 2

    //Note - Start Heap Array at Index 1
    //Note - Javascript Arrays Grow Automatically If Adding to index == arr.length

    constructor(size = 8){
        this.heap = new Array(size).fill(null);
        this.count = 0;
    }


    addItem(data){
        if(this.count == 0){
            this.heap[1] = data;
        }else{
            this.heap[this.count + 1] = data;

            //Bubble Data Up
            let currentIndex = this.count + 1;
            let parentIndex = Math.floor(currentIndex/2);

            while(parentIndex >= 1){
                if(this.heap[parentIndex] > this.heap[currentIndex]){
                    //Swap items
                    let temp = this.heap[parentIndex];
                    this.heap[parentIndex] = this.heap[currentIndex];
                    this.heap[currentIndex] = temp;

                    //Recalculate Indexes
                    currentIndex = parentIndex;
                    parentIndex = Math.floor(currentIndex/2);
                }else{
                    break;
                }
            }
        }

        this.count++;
    }


    removeMin(){

        if(this.count == 0){
            return null;
        }

        let result = this.heap[1];
        //Move Last Item To Root
        this.heap[1] = this.heap[this.count];
        this.heap[this.count] = null;
        this.count--;


        //Bubble Root Down
        let currentIndex = 1;
        let leftChild = currentIndex * 2;
        let rightChild = currentIndex * 2 + 1;

        while(leftChild <= this.count || rightChild <= this.count){
            //Change Comp below to make max heap
            if(this.heap[currentIndex] > this.heap[leftChild] 
                || this.heap[currentIndex] > this.heap[rightChild]){
                //Swap items with smallest child
                if(rightChild > this.count || this.heap[leftChild] < this.heap[rightChild]){
                    let temp = this.heap[leftChild];
                    this.heap[leftChild] = this.heap[currentIndex];
                    this.heap[currentIndex] = temp;

                    //Recalculate Indexes
                    currentIndex = leftChild;
                    leftChild = currentIndex * 2;
                    rightChild = currentIndex * 2 + 1;

                }else{
                    let temp = this.heap[rightChild];
                    this.heap[rightChild] = this.heap[currentIndex];
                    this.heap[currentIndex] = temp;

                    //Recalculate Indexes
                    currentIndex = rightChild;
                    leftChild = currentIndex * 2;
                    rightChild = currentIndex * 2 + 1;
                }
            }else{
                break;
            }
        }

        return result;
    }


}


class MaxPriorityQueue{

    //Parent = Floor(i/2)
    //Right Child = i * 2 + 1
    //Left Child =  i * 2

    //Note - Start Heap Array at Index 1
    //Note - Javascript Arrays Grow Automatically If Adding to index == arr.length

    constructor(size = 8){
        this.heap = new Array(size).fill(null);
        this.count = 0;
    }


    addItem(data){
        if(this.count == 0){
            this.heap[1] = data;
        }else{
            this.heap[this.count + 1] = data;

            //Bubble Data Up
            let currentIndex = this.count + 1;
            let parentIndex = Math.floor(currentIndex/2);

            while(parentIndex >= 1){
                if(this.heap[parentIndex] < this.heap[currentIndex]){
                    //Swap items
                    let temp = this.heap[parentIndex];
                    this.heap[parentIndex] = this.heap[currentIndex];
                    this.heap[currentIndex] = temp;

                    //Recalculate Indexes
                    currentIndex = parentIndex;
                    parentIndex = Math.floor(currentIndex/2);
                }else{
                    break;
                }
            }
        }

        this.count++;
    }


    removeMax(){

        if(this.count == 0){
            return null;
        }

        let result = this.heap[1];
        //Move Last Item To Root
        this.heap[1] = this.heap[this.count];
        this.heap[this.count] = null;
        this.count--;


        //Bubble Root Down
        let currentIndex = 1;
        let leftChild = currentIndex * 2;
        let rightChild = currentIndex * 2 + 1;

        while(leftChild <= this.count || rightChild <= this.count){
            //Change Comp below to make max heap
            if(this.heap[currentIndex] < this.heap[leftChild] 
                || this.heap[currentIndex] < this.heap[rightChild]){
                //Swap items with largest child
                if(this.heap[leftChild] > this.heap[rightChild]){
                    let temp = this.heap[leftChild];
                    this.heap[leftChild] = this.heap[currentIndex];
                    this.heap[currentIndex] = temp;

                    //Recalculate Indexes
                    currentIndex = leftChild;
                    leftChild = currentIndex * 2;
                    rightChild = currentIndex * 2 + 1;

                }else{
                    let temp = this.heap[rightChild];
                    this.heap[rightChild] = this.heap[currentIndex];
                    this.heap[currentIndex] = temp;

                    //Recalculate Indexes
                    currentIndex = rightChild;
                    leftChild = currentIndex * 2;
                    rightChild = currentIndex * 2 + 1;
                }
            }else{
                break;
            }
        }

        return result;
    }


}


//Main Driver Code
let myHeap = new MinPriorityQueue();
myHeap.addItem(10);
myHeap.addItem(8);
myHeap.addItem(11);
myHeap.addItem(1);
myHeap.addItem(3);
myHeap.addItem(9);
myHeap.addItem(7);

let myHeap2 = new MaxPriorityQueue();
myHeap2.addItem(10);
myHeap2.addItem(8);
myHeap2.addItem(11);
myHeap2.addItem(1);
myHeap2.addItem(3);
myHeap2.addItem(9);
myHeap2.addItem(7);

console.log("Min Queue Next:")

console.log(myHeap.removeMin());
console.log(myHeap.removeMin());
console.log(myHeap.removeMin());
console.log(myHeap.removeMin());
console.log(myHeap.removeMin());
console.log(myHeap.removeMin());
console.log(myHeap.removeMin());

console.log("Max Queue Next:")

console.log(myHeap2.removeMax());
console.log(myHeap2.removeMax());
console.log(myHeap2.removeMax());
console.log(myHeap2.removeMax());
console.log(myHeap2.removeMax());
console.log(myHeap2.removeMax());
console.log(myHeap2.removeMax());



//console.log(myHeap.heap);



