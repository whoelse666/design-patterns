class Command {
  constructor(receiver, args) {
    this.receiver = receiver;
    this.args = args;
    this.executed = false;
  }

  execute() {
    if (!this.executed) {
      this.receiver.execute(this.args);
      this.executed = true;
    }
  }

  undo() {
    if (this.executed) {
      this.receiver.undo(this.args);
      this.executed = false;
    }
  }
}

class Receiver {
  constructor() {
    this.value = 0;
  }

  execute(args) {
    this.value += args;
    console.log(`执行操作，value = ${this.value}`);
  }

  undo(args) {
    this.value -= args;
    console.log(`撤销操作，value = ${this.value}`);
  }
}

const receiver = new Receiver();
const command1 = new Command(receiver, 1);
const command2 = new Command(receiver, 2);
const command3 = new Command(receiver, 3);

const history = [command1, command2, command3];

history.forEach(command => {
  command.execute();
});

history.pop().undo();
