// JavaScript 中的装饰者模式可以通过以下几种方式实现：

// const obj = {
//   foo() {
//     console.log("foo");
//   }
// };

// function barDecorator(obj) {
//   obj.bar = function () {
//     console.log("bar");
//   };
//   return obj;
// }

// const decoratedObj = barDecorator(obj);
// decoratedObj.foo();
// decoratedObj.bar();

function Foo() {}

Foo.prototype.foo = function () {
  console.log("foo");
};

function barDecorator(clazz) {
  clazz.prototype.bar = function () {
    console.log("bar");
  };
}

barDecorator(Foo);

const obj = new Foo();
obj.foo();
obj.bar();


