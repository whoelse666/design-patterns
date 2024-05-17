// KVue类：
// 1. 对传入data对象执行响应化处理

class KVue {
  constructor(options) {
    this.$options = options;
    this.$data = options.data;

    // 响应化处理
    this.observe(this.$data);
    new Compile(options.el, this);
    if (options.created) {
      options.created.call(this);
    }
  }

  observe(target) {
    if (!target || typeof target !== "object") {
      return;
    }

    Object.keys(target).forEach(key => {
      this.defineProperty(target, key, target[key]);
      this.proxyData(key);
    });
  }
  defineProperty(target, key, value) {
    // 递归处理多层对象
    this.observe(value);
    Object.defineProperty(target, key, {
      get() {
        console.log("get", value);
        return value;
      },
      set(newValue) {
        console.log("set", newValue);
        if (newValue === value) {
          return true;
        }
        value = newValue;
        return true;
      }
    });
  }
  proxyData(key) {
    Object.defineProperty(this, key, {
      get() {
        return this.$data[key];
      },
      set(newValue) {
        const value = this.$data[key];
        if (newValue === value) {
          return true;
        }
        this.$data[key] = newValue;
        return true;
      }
    });
  }
}

// Dep: 管理若干Watcher实例，通知它们更新
class Dep {
  constructor() {
    this.deps = [];
  }
  addDep(dep) {
    this.deps.push(dep);
  }
  notify() {
    this.deps.forEach(dep => dep && dep.update());
  }
}

// Watcher: 执行具体更新操作
class Watcher {
  constructor(vm, key, updater) {
    console.log("vm", vm);
    this.vm = vm;
    this.key = key;
    this.updater = updater;
    Dep.target = this; // 依赖收集时要用到
    this.vm[this.key];
    Dep.target = null;
  }

  update() {
    console.log("属性" + this.key + "更新了");
    this.updater.call(this.vm, this.vm[this.key]);
  }
}
