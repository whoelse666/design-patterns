/* 
小红住在1班，一班是一个整体，一班里面有小希，小溪，小西，学校分配任务给1班叫一班去操场大扫除，班级有大扫除的方法。我们先构建一班这个类 class 不需要去关注1班里面的小红，小希，小溪，小西，直接new 1班() 然后使用当前的大扫除方法。
*/
class oneClass {
  constructor() {
    this.a = "熏悟空";
  }
  clear() {
    console.log("一起去大扫除");
  }
}
let one = new oneClass();
one.clear();

// es6继承
/* class A {
  Afun() {
    console.log("es6继承 Afun");
  }
}
class B extends A {}
let b = new B();
b.Afun(); // b 可以继承A的方法 */

// /原型链继承
/* function A() {}
A.prototype.Afun = function () {
  console.log("原型链继承 Afun");
};
function B() {}
B.prototype = new A();
let b = new B();
b.Afun(); */
// b通过原型链 prototype 可以调用到A的方法
// 问题，当前并不能执行A的方法只是继承到来A到方法（而且A方法居然在之前就使用过一次）

// 构造函数;
/* function A(a) {
  this.a = a;
}
A.prototype.Afun = function () {
  console.log(123);
};
function B() {
  A.call(this, 1);
}
let b = new B();
console.log('b.a',b.a); */
// 可以获取到当前
// 问题，当前并不能继承A的方法，只能使用A方法

// 混合使用;
function A(a) {
  this.a = a;
}
A.prototype.Afun = function () {
  console.log("混合使用 Afun");
};
function B() {
  A.call(this, 1);
}
B.prototype = A.prototype;
B.prototype.constructor = A;
let b = new B();
// console.log("B.prototype.constructor", B.prototype === b.__proto__);
console.log(b.a);
b.Afun();



/*
设计原则
1.单一职责原则（类功能要单一，不能什么功能都往类里面写）
2.开放封闭原则（对扩展开放，对修改封闭，可以进行对功能对扩展，但是减少对功能对修改）
3.里式替换原则（前端不咋用）
4.依赖倒置原则（前端不咋用）
5.接口分离原则（前端不咋用，都没有接口）
*/