/* 发布-订阅模式（Publish-Subscribe Pattern） */

var publisher = {
  events: {},

  addEvent: function (event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  },

  removeEvent: function (event, callback) {
    if (this.events[event]) {
      if (callback) {
        for (var i = 0; i < this.events[event].length; i++) {
          if (this.events[event][i] === callback) {
            this.events[event].splice(i, 1);
            break;
          }
        }
      } else {
        this.events[event] = [];
      }
    }
  },

  publishEvent: function (event, data) {
    if (this.events[event]) {
      for (var i = 0; i < this.events[event].length; i++) {
        this.events[event][i](data);
      }
    }
  }
};

var subscriber = {
  handleEvent: function (data) {
    console.log(data);
  }
};

publisher.addEvent("event1", subscriber.handleEvent);

publisher.publishEvent("event1", "Hello, world!");

publisher.removeEvent("event1", subscriber.handleEvent);
publisher.publishEvent("event1", "Hello, world!");

class MyEvent {
  constructor(name) {
    console.log("MyEvent", name);
    this.events = {};
    this.cache = {};
  }
  listen(key, fn) {
    if (!this.events[key]) {
      this.events[key] = [];
    }
    this.events[key].push(fn);
  }

  trigger() {
    const key = Array.prototype.shift.call(arguments),
      fns = this.events[key];

    if (!fns || fns.length === 0) {
      return false;
    }
    for (let i = 0, fn; (fn = fns[i++]); ) {
      fn.apply(this, arguments);
    }
  }

  remove(key, fn) {
    if (!this.events[key]) {
      return false;
    }
    let fns = this.events[key];
    if (!fn) {
      this.events[key] = [];
      // console.log(" this.events[key]", this.events[key]);
      return true;
    } else {
      this.events[key] = this.events[key].filter(f => {
        return f !== fn;
      });
    }
  }
}

const event = new MyEvent("1");
function fn1(name) {
  return function () {
    console.log(name);
  };
}

function f1(count) {
  console.log("牛魔王1:" + count);
}
function f2(count) {
  console.log("牛魔王2:" + count);
}

// event.listen("1", f1);
// event.listen("1", f2);
// event.listen("2", fn1("熏悟空1:"));
// event.listen("2", fn1("熏悟空2:"));

// event.trigger("1", 111);
// event.trigger("2", );
// event.remove("1", f1); // 取消订阅 f1
// event.trigger("1",222);
// console.log("---------");
// event.remove("2"); // 取消订阅 f2
// event.trigger("2");

const divDemo = new MyEvent("divDemo");
const A = (function () {
  const countDom = document.querySelector("#count");
  let count = 0;
  function s1() {
    divDemo.trigger("add", ++count);
  }

  countDom.addEventListener("click", function () {
    const key = "add";
    if (!divDemo.events[key] || divDemo.events[key].length === 0) {
      console.log("未订阅", "divDemo.events[key]", divDemo.events);
      console.log(divDemo.cache);
      if (!divDemo.cache[key]) {
        divDemo.cache[key] = [];
      }
      if (!divDemo.cache[key].includes(s1)) {
        divDemo.cache[key].push(s1);
      }
    } else {
      console.log("有订阅");
      s1();
    }
  });
})();
let b = false;

const B = function () {
  console.log("订阅");
  if (b) return;
  b = true;
  divDemo.listen("add", function (count) {
    console.log("B:" + count);
    const showDom = document.querySelector("#show");
    showDom.innerHTML = count;
  });
};
// B()
