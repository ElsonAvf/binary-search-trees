import {Tree} from './BinaryTree.js'
import {mergeSort} from './MergeSort.js'

const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) {
     return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
}

const populate = () => {
  let array = []
  while (array.length < 10) {
    let random = Math.floor(Math.random() * 20)
    if (array.indexOf(random) === -1) {
      array.push(random)
    }
  }
  return array
}

let array = [2, 3, 4, 5, 6, 7]
let tree = new Tree(array)
prettyPrint(tree.root)