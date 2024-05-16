class Subject {
  constructor() {
    this.observers = [];
  }
  addObserver(observer) {
    this.observers.push(observer);
    console.log("this.addObserver", this.observers);
  }
  removeObserver(observer) {
    this.observers = this.observers.filter(o => o !== observer);
    console.log("this.removeObserver", this.observers);
  }

  notifyObservers(data) {
    this.observers &&
      this.observers.forEach(observer => {
        observer.update(data);
      });
  }
}

class Observer {
  constructor(name, subject) {
    this.name = name;
    if (subject) {
      subject.addObserver(this);
    }
  }

  update(data) {
    console.log(data);
  }
}

const subject = new Subject();
const observerA = new Observer("observerA", subject);
const observerB = new Observer("observerB");
subject.addObserver(observerB);
subject.notifyObservers("Hello from subject");
subject.removeObserver(observerA);
subject.notifyObservers("Hello again");

