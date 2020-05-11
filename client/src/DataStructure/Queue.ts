export class Queue<T>{
    public items: Array<T>;

    constructor(){
        this.items = []
    }

    public enqueue(element: T): void{
        this.items.push(element)
    }

    public dequeue(): T | undefined{
        if(!this.isEmpty()){
            return this.items.shift();
        }
    }

    public front(): T{         
        return this.items[0]; 
    } 

    public isEmpty(): boolean{ 
        return this.items.length === 0;
    } 
}
