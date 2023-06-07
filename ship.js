export default class Ship {
  constructor(coords) {
    this.coords = coords;
    this.size = coords.size;
  }

  getSize() {
    return this.size;
  }

  fire(coord) {
    if (this.coords.has(coord)) {
      this.size--;
      return true;
    }
    return false;
  }
}
