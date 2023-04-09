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

let sorted = mergeSort(populate())
let array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
let tree = new Tree(array)
tree.insert(16)
tree.insert(17)
tree.insert(18)
tree.insert(19)
prettyPrint(tree.root)

if (!tree.isBalanced(tree.root)) {
  tree.rebalance()
  prettyPrint(tree.root)
}