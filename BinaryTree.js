import Node from './Node.js';

export class Tree {
  constructor(array) {
    this.root =
      (array !== undefined && array.length > 0)
        ? this.buildTree(array, 0, array.length - 1)
        : null;
  }

  buildTree(array, start, end) {
    if(start > end) return null

    let mid = Math.floor((start + end) / 2)
    let root = new Node(array[mid])
    root.left = this.buildTree(array, start, mid - 1)
    root.right = this.buildTree(array, mid + 1, end)
    return root
  }

  insert(value) {
    if(this.root === null) {
      this.root = new Node(value)
      return
    }
    function insertion(node) {
      if(value > node.data && node.right === null) {
        node.right = new Node(value)
        return
      }
      if(value < node.data && node.left === null) {
        node.left = new Node(value)
      }
      if(value > node.data && node.right !== null) {
        return insertion(node.right)
      }
      if(value < node.data && node.left !== null) {
        return insertion(node.left)
      }
    }
    insertion(this.root)
  }
  
  deleteNode(node, value) {
    if (node === null) return null

    if (value > node.data) {
      node.right = this.deleteNode(node.right, value)
    } else if (value < node.data) {
      node.left = this.deleteNode(node.left, value)
    } else {
      if (node.left === null && node.right === null) { // IsLeaf
        return null
      } else if (node.left === null) { // HasOneChild
        return node.right
      } else if (node.right === null) { // HasOneChild
        return node.left
      } else { // HasTwoChild
        let temporary = this._findSmaller(node.right)
        node.data = temporary.data
        node.right = this.deleteNode(node.right, temporary.data)
      }
    }
    return node
  }
  
  _findSmaller(node) {
    while(node.left !== null) {
      node = node.left
    }
    return node
  }

  find(value, node) {
    if(node === null) return null
    if(value > node.data) return this.find(value, node.right)
    if(value < node.data) return this.find(value, node.left)
    if(value === node.data) return node
  }
}