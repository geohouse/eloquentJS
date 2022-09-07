// Vector class

class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  plus(otherVector) {
    return new Vector(otherVector.x + this.x, otherVector.y + this.y);
  }
  minus(otherVector) {
    return new Vector(this.x - otherVector.x, this.y - otherVector.y);
  }
  get length() {
    return Math.sqrt((this.x - 0) ** 2 + (this.y - 0) ** 2);
  }
}

console.log(new Vector(1, 2).plus(new Vector(2, 3)));
console.log(new Vector(1, 2).minus(new Vector(2, 3)));
console.log(new Vector(3, 4).length);

// Making a Set like class (like set in python, holds collection of
// unique entries)

class GroupIterator {
  constructor(group) {
    this.iteratorGroup = group;
    this.index = 0;
  }
  next() {
    // 'this.iteratorGroup' here in the GroupIterator class
    // is really just like 'this' in the Group class,
    // because the GroupIterator input parameter for the constructor
    // is the 'this' object which is passed by the GroupIterator
    // class instantiation that happens in the Group class.
    // So need 'this.iteratorGroup.group.length' to access the
    // same value as 'this.group.length' from the Group class
    if (this.index >= this.iteratorGroup.group.length) {
      return { done: true };
    } else {
      let value = this.iteratorGroup.group[this.index];
      this.index++;
      return { value, done: false };
    }
  }
}

class Group {
  constructor() {
    this.group = [];
  }
  add(value) {
    if (!this.group.includes(value)) {
      this.group.push(value);
    }
  }
  delete(value) {
    this.group = this.group.filter((element) => element !== value);
  }
  has(value) {
    return this.group.indexOf(value) >= 0 ? true : false;
  }
  static from(iterator) {
    let iteratorGroup = new Group();
    for (let element of iterator) {
      console.log({ element });
      iteratorGroup.add(element);
    }
    console.log({ iteratorGroup });
    return iteratorGroup;
  }

  [Symbol.iterator] = function () {
    return new GroupIterator(this);
  };
}

let group = Group.from([10, 20]);
console.log(group);
console.log(group.has(10));
console.log(group.has(30));
group.add(10);
group.delete(10);
console.log(group.has(10));

// Iterable groups
// defined new GroupIterator class above to provide this
// functionality

for (let value of Group.from(["a", "b", "c"])) {
  console.log(value);
}

// Borrowing a method
let map = { one: true, two: true, hasOwnProperty: true };

console.log(Object.prototype.hasOwnProperty.call(map, "one"));
