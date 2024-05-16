// // 发布订阅中心


// class PubSub {
//   constructor() {
//     this.messages = {};
//     this.listeners = {};
//   }
//   publish(type, content) {
//     const existContent = this.messages[type];
//     if (!existContent) {
//       this.messages[type] = [];
//     }
//     this.messages[type].push(content);
//   }
//   subscribe(type, cb) {
//     const existListener = this.listeners[type];
//     if (!existListener) {
//       this.listeners[type] = [];
//     }
//     this.listeners[type].push(cb);
//   }
//   notify(type) {
//     const messages = this.messages[type];
//     const subscribers = this.listeners[type] || [];
//     subscribers.forEach(cb => cb(messages));
//   }
// }


// // 发布者

// class Publisher {
//   constructor(name, context) {
//     this.name = name;
//     this.context = context;
//   }
//   publish(type, content) {
//     this.context.publish(type, content);
//   }
// }

// //订阅者
// class Subscriber {
//   constructor(name, context) {
//     this.name = name;
//     this.context = context;
//   }
//   subscribe(type, cb) {
//     this.context.subscribe(type, cb);
//   }
// }


// const TYPE_A = "music";
// const TYPE_B = "movie";
// const TYPE_C = "novel";

// const pubsub = new PubSub();

// const publisherA = new Publisher("publisherA", pubsub);
// publisherA.publish(TYPE_A, "we are young");
// publisherA.publish(TYPE_B, "the silicon valley");
// const publisherB = new Publisher("publisherB", pubsub);
// publisherB.publish(TYPE_A, "stronger");
// const publisherC = new Publisher("publisherC", pubsub);
// publisherC.publish(TYPE_B, "imitation game");

// const subscriberA = new Subscriber("subscriberA", pubsub);
// subscriberA.subscribe(TYPE_A, res => {
//   console.log("subscriberA received", res);
// });
// const subscriberB = new Subscriber("subscriberB", pubsub);
// subscriberB.subscribe(TYPE_C, res => {
//   console.log("subscriberB received", res);
// });
// const subscriberC = new Subscriber("subscriberC", pubsub);
// subscriberC.subscribe(TYPE_B, res => {
//   console.log("subscriberC received", res);
// });

// pubsub.notify(TYPE_A);
// pubsub.notify(TYPE_B);
// pubsub.notify(TYPE_C);



class PubSub {
  constructor() {
    // 事件中心
    // 存储格式: warTask: [], routeTask: []
    // 每种事件(任务)下存放其订阅者的回调函数
    this.events = {};
  }
  // 订阅方法
  subscribe(type, cb) {
    if (!this.events[type]) {
      this.events[type] = [];
    }
    this.events[type].push(cb);
  }
  // 发布方法
  publish(type, ...args) {
    if (this.events[type]) {
      this.events[type].forEach(cb => cb(...args));
    }
  }
  // 取消订阅方法
  unsubscribe(type, cb) {
    if (this.events[type]) {
      const cbIndex = this.events[type].findIndex(e => e === cb);
      if (cbIndex != -1) {
        this.events[type].splice(cbIndex, 1);
      }
    }
    if (this.events[type].length === 0) {
      delete this.events[type];
    }
  }
  unsubscribeAll(type) {
    if (this.events[type]) {
      delete this.events[type];
    }
  }
}

// 创建一个中介公司
let pubsub = new PubSub();

// 弟子一订阅战斗任务
pubsub.subscribe("warTask", function (taskInfo) {
  console.log("宗门殿发布战斗任务，任务信息:" + taskInfo);
});
// 弟子二订阅日常任务
pubsub.subscribe("routeTask", function (taskInfo) {
  console.log("宗门殿发布日常任务，任务信息:" + taskInfo);
});
// 弟子三订阅全类型任务
pubsub.subscribe("allTask", function (taskInfo) {
  console.log("宗门殿发布五星任务，任务信息:" + taskInfo);
});

// 发布战斗任务
pubsub.publish("warTask", "猎杀时刻");
pubsub.publish("allTask", "猎杀时刻");

// 发布日常任务
pubsub.publish("routeTask", "种树浇水");
pubsub.publish("allTask", "种树浇水");
