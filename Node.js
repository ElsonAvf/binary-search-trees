export default class Node {
  constructor(data) {
    this.data = (data !== undefined) ? data : null;
    this.left = null;
    this.right = null;
  }
}