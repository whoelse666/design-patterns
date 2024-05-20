// 使用适配器模式将不同的 API 接口进行统一封装：
class Target {
  request() {
    return "Target: 请求完成！";
  }
}

class Adaptee {
  specificRequest() {
    return "Adaptee: 请求完成！";
  }
}

class Adapter extends Target {
  constructor(adaptee) {
    super();
    this.adaptee = adaptee;
  }

  request() {
    const result = this.adaptee.specificRequest();
    return `Adapter: ${result}`;
  }
}

const adaptee = new Adaptee();
const adapter = new Adapter(adaptee);
console.log(adapter.request());
