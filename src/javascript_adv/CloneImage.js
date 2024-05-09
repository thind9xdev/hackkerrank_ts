class Image {
    constructor(url, size) {
        this.url = url;
        this.size = size;
    }

    getUrl() {
        return this.url;
    }

    setUrl(url) {
        this.url = url;
    }

    setSize(width, height) {
        this.size.width = width;
        this.size.height = height;
    }

    getSize() {
        return this.size;
    }

    cloneImage() {
        return new Image(this.url, new Size(this.size.width, this.size.height));
    }
}
