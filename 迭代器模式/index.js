class Collection {
  constructor() {
    this.items = [];
  }
  add(item) {
    this.items.push(item);
  }
  [Symbol.iterator]() {
    let index = 0;
    const items = this.items;
    return {
      next() {
        if (index < items.length) {
          return { value: items[index++], done: false };
        } else {
          return { done: true };
        }
      }
    };
  }
}

const collection = new Collection();
collection.add("item 1");
collection.add("item 2");
collection.add("item 3");
collection.add("item 4");

const iterator = collection[Symbol.iterator]();
let result = iterator.next();

while (!result.done) {
  console.log(result.value);
  result = iterator.next();
}
