/* 
小红住在1班，一班是一个整体，一班里面有小希，小溪，小西，学校分配任务给1班叫一班去操场大扫除，班级有大扫除的方法。我们先构建一班这个类 class 不需要去关注1班里面的小红，小希，小溪，小西，直接new 1班() 然后使用当前的大扫除方法。
*/
/* class oneClass {
  constructor() {
    this.a = "熏悟空";
  }
  clear() {
    console.log("一起去大扫除");
  }
}
let one = new oneClass();
one.clear(); */

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
/* function A(a) {
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
b.Afun(); */

/*
设计原则
1.单一职责原则（类功能要单一，不能什么功能都往类里面写）
2.开放封闭原则（对扩展开放，对修改封闭，可以进行对功能对扩展，但是减少对功能对修改）
3.里式替换原则（前端不咋用）
4.依赖倒置原则（前端不咋用）
5.接口分离原则（前端不咋用，都没有接口）
*/

var name = "window";
var obj1 = {
  name: "小红",
  sex: "女",
  say: function () {
    return this.name;
  }
};
var obj2 = {
  name: "小希",
  sex: "女"
};
var a = obj1.say;
// console.log(obj1.say(), 1);
// console.log(a(), 2);

const mult = (function () {
  const cache = {};
  const calculate = function () {
    var a = 1;
    for (var i = 0; i < arguments.length; i++) {
      a = a * arguments[i];
    }
    return a;
  };
  return function () {
    const args = Array.prototype.join.call(arguments, ",");
    if (args in cache) {
      console.log(" cache==", cache);
      return cache[args];
    }
    console.log("no cache");
    return (cache[args] = calculate.apply(null, arguments));
  };

  /*   const cache = {};
  return function () {
    const args = Array.prototype.join.call(arguments, ",");
    if (args in cache) {
      console.log(" cache");
      return cache[args];
    }
    var a = 1;
    for (var i = 0; i < arguments.length; i++) {
      a = a * arguments[i];
    }

    console.log("no cache");
    return (cache[args] = a);
  }; */
})();
// console.log("1", mult(1, 2, 3));
// console.log("2", mult(1, 2, 3));
// console.log("3", mult(1, 2, 3, 4, 5));

Function.prototype.before = function (context) {
  // if (typeof this !== "function") {
  //   throw new Error("type error");
  // }
  const _self = this;
  return function () {
    console.log("_self", _self);
    console.log("this", this);
    context.apply(this, arguments);
    return _self.apply(this, arguments);
  };
};
Function.prototype.after = function (context) {
  const _self = this;
  console.log("1", _self);
  return function () {
    var ret = _self.apply(this, arguments);
    context.apply(this, arguments);
    return ret;
  };
};

var func = function () {
  console.log(2);
};

// func = func
//   .before(function () {
//     console.log("1", 1);
//   })
//   .after(function () {
//     console.log("3", 3);
//   });
// console.log("func", func);
// func();

// 柯里化函数
function currying(fn, ...args) {
  // fn需要的参数个数
  const len = fn.length;
  // 返回一个函数接收剩余参数
  return function (...params) {
    // 拼接已经接收和新接收的参数列表
    let _args = [...args, ...params];
    // 如果已经接收的参数个数还不够，继续返回一个新函数接收剩余参数
    if (_args.length < len) {
      return currying.call(this, fn, ..._args);
    }
    // 参数全部接收完调用原函数
    return fn.apply(this, _args);
  };

  // // 函数的参数个数可以直接通过函数数的.length属性来访问
  // args.length >= fn.length // 这个判断很关键！！！
  //   ? // 传入的参数大于等于原始函数fn的参数个数，则直接执行该函数
  //     fn(...args)
  //   : /**
  //      * 传入的参数小于原始函数fn的参数个数时
  //      * 则继续对当前函数进行柯里化，返回一个接受所有参数（当前参数和剩余参数） 的函数
  //      */
  //     (..._args) => curry(fn, ...args, ..._args);
}

function mycurrying(fn, ...args) {
  return function (...args1) {
    const _args = [...args, ...args1];
    if (_args.length >= fn.length) {
      return fn.call(this, ..._args);
    }
    return mycurrying.call(this, fn, ..._args);
  };
}

function addNum(a, b, c, d) {
  return a + b + c + d;
}
// const addCurry = currying(addNum);
const addCurry = mycurrying(addNum, 1);
console.log("addCurry(1)(2)(3)", addCurry(2)(3)(4)); // 6
console.log("addCurry(1)(2)(3)", addCurry(2, 3, 4)); // 6
console.log("addCurry(1)(2)(3)", addCurry(2, 3)(4)); // 6
