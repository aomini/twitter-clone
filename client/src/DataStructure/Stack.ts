export class Stack<T> {
  public items: Array<T>;

  constructor() {
    this.items = [];
  }

  public push(element: T): Array<T> {
    this.items.push(element);
    return this.items;
  }

  public pop(): T {
    return this.items.pop() as T;
  }

  public isEmpty(): boolean {
    return this.items.length === 0;
  }
}
