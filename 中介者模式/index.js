const Mediator = {
  components: [],
  addComponent(component) {
    this.components.push(component);
  },
  broadcast(source, message) {
    this.components.filter(component => component !== source).forEach(component => component.receive(message));
  }
};

class Component {
  constructor() {
    this.mediator = Mediator;
    this.mediator.addComponent(this);
  }
  send(message) {
    this.mediator.broadcast(this, message);
  }
  receive(message) {
    console.log(`Received message: ${message}`);
  }
}

const componentA = new Component();
const componentB = new Component();
componentA.send("Hello from Component A");
componentB.send("Hi from Component B");


/* 在上面的例子中，我们定义了一个中介者对象 Mediator 和两个组件对象 ComponentA 和 ComponentB。当组件对象发送消息时，它会将消息发送给中介者对象，中介者对象负责将消息分发给其他组件对象。这样，我们就实现了组件之间的解耦和统一管理。
需要注意的是，在实际开发中，我们可能需要使用不同的中介者对象来管理不同的组件之间的交互行为。此外，我们还可以使用其他方式来实现中介者模式，比如使用观察者模式来实现。 */