import Node from './Node.js';

export class Tree {
  constructor(array) {
    this._sortedAndRemoveDuplicate = [...new Set(array)].sort((a, b) => a - b)
    this.root =
      (Array.isArray(array) && array.length > 0)
        ? this.buildTree(
          this._sortedAndRemoveDuplicate,
          0,
          this._sortedAndRemoveDuplicate.length - 1
        )
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
    function insertion(node = this.root) {
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

  deleteNode(value, node = this.root) {
    if(node === null) return null

    if(value > node.data) {
      node.right = this.deleteNode(node.right, value)
    } else if(value < node.data) {
      node.left = this.deleteNode(node.left, value)
    } else {
      if(node.left === null && node.right === null) { // IsLeaf
        return null
      } else if(node.left === null) { // HasOneChild
        return node.right
      } else if(node.right === null) { // HasOneChild
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

  find(value, node = this.root) {
    if(node === null) return null
    if(value > node.data) return this.find(value, node.right)
    if(value < node.data) return this.find(value, node.left)
    if(value === node.data) return node
  }

  levelOrder(callback) {
    let queue = [this.root]
    let queueCopy = []
    while(queue.length > 0) {
      if(queue[0].left !== null) {
        queue.push(queue[0].left)
      }
      if(queue[0].right !== null) {
        queue.push(queue[0].right)
      }
      if(typeof callback === 'function') {
        callback(queue[0])
      } else {
        queueCopy.push(queue[0].data)
      }
      queue.shift()
    }
    if(typeof callback !== 'function') return queueCopy
  }

  preorder(callback, node = this.root) {
    if(node === null) return
    callback(node)
    this.preorder(node.left, callback)
    this.preorder(node.right, callback)
  }

  inorder(callback, node = this.root) {
    if(node === null) return
    this.inorder(node.left, callback)
    if (typeof callback === 'function') {
      callback(node)
    } else if (Array.isArray(callback)) {
      callback.push(node.data)
    }
    this.inorder(node.right, callback)
  }

  postorder(callback, node = this.root) {
    if(node === null) return
    this.postorder(node.left, callback)
    this.postorder(node.right, callback)
    callback(node)
  }

  height(node = this.root) {
    if(node === null) return 0
    let leftHeight = this.height(node.left)
    let rightHeight = this.height(node.right)
    return this._max(leftHeight, rightHeight) + 1
  }
  _max(leftHeight, rightHeight) {
    return (leftHeight >= rightHeight) ? leftHeight : rightHeight
  }

  depth(value) {
    let node = this.root
    let depth = 1;
    while(node !== null) {
      if (node.data === value) return depth
      if (node.data > value) {
        node = node.left
      } else {
        node = node.right
      }
      depth++
    }
    return null
  }
  
  isBalanced(node = this.root) {
    if (node === null) return true
    let left = this.height(node.left)
    let right = this.height(node.right)
    if (
      (Math.abs(left - right) <= 1)
      && this.isBalanced(node.left)
      && this.isBalanced(node.right)
    ) {
      return true
    }
    return false
  }
  
  rebalance() {
    let array = []
    this.inorder(this.root, array)
    this.root = this.buildTree(array, 0, array.length - 1)
  }
}