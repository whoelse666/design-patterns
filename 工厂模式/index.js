/*  工厂模式（Factory Pattern） */

function ButtonFactory(type) {
  switch (type) {
    case "primary":
      return new PrimaryButton();
    case "secondary":
      return new SecondaryButton();
    case "link":
      return new LinkButton();
    default:
      throw new Error("Unknown button type: " + type);
  }
}

function PrimaryButton() {
  this.type = "primary";
  this.text = "Click me!";
  this.onClick = function () {
    console.log("Primary button clicked!");
  };
}

function SecondaryButton() {
  this.type = "secondary";
  this.text = "Click me too!";
  this.onClick = function () {
    console.log("Secondary button clicked!");
  };
}

function LinkButton() {
  this.type = "link";
  this.text = "Click me as well!";
  this.onClick = function () {
    console.log("Link button clicked!");
  };
}
