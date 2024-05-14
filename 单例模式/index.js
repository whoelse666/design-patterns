/*  单例模式（Singleton Pattern） */

/* 在JavaScript中，每个构造函数都可以用于创建单例对象，例如： */
function Singleton() {
  console.log("1", Singleton, Singleton.ins, typeof Singleton.ins);
  if (typeof Singleton.ins === "object") {
    return Singleton.ins;
  }

  this.property1 = "value1";
  this.property2 = "value2";
  this.name = "张三丰";
  this.fn = function () {
    console.log("Hello, World!");
  }
  Singleton.ins = this;
}

// const instance1 = new Singleton();
// const instance2 = new Singleton();

// console.log(instance1,instance2);
// console.log(instance1 === instance2);



/* 使用对象字面量可以轻松地创建单例对象，例如： */
const singleton = {
  property1: "value1",
  property2: "value2",
  method1: function () {},
  method2: function () {}
};



/* 使用模块模式可以创建一个只有单个实例的对象，例如： */

const Singleton1 = (function () {
  let instance;

  function init() {
    const object = new Object("I am the instance");
    return object;
  }

  return {
    getInstance: function () {
      if (!instance) {
        instance = init();
      }
      return instance;
    }
  };
})();

const instance1 = Singleton1.getInstance();
const instance2 = Singleton1.getInstance();

console.log('Singleton1',instance1);