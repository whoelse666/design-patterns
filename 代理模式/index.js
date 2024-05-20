class Image {
  constructor(url) {
    this.url = url;
  }

  load() {
    console.log(`Image loaded: ${this.url}`);
  }
}

class ProxyImage {
  constructor(url) {
    this.url = url;
    this.image = null;
  }

  load() {
    if (!this.image) {
      this.image = new Image(this.url);
      console.log(`Placeholder loaded for ${this.url}`);
    }
    this.image.load();
  }
}

const img1 = new ProxyImage("https://example.com/image1.jpg");
const img2 = new ProxyImage("https://example.com/image2.jpg");

img1.load();
// img1.load();

// img2.load();
