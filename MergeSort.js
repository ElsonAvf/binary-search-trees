const merge = (arrayLeft, arrayRight) => {
  let leftIndex = 0, rightIndex = 0, orderedArray = [];
  while(true) {
    if(leftIndex === arrayLeft.length) {
      orderedArray = orderedArray.concat(
        arrayRight.slice(rightIndex, arrayRight.length)
      )
      return orderedArray
    } else if(rightIndex === arrayRight.length) {
      orderedArray = orderedArray.concat(
        arrayLeft.slice(leftIndex, arrayLeft.length)
      )
      return orderedArray;
    }
    if(arrayLeft[leftIndex] > arrayRight[rightIndex]) {
      orderedArray.push(arrayRight[rightIndex])
      rightIndex++
    } else if(arrayRight[rightIndex] > arrayLeft[leftIndex]) {
      orderedArray.push(arrayLeft[leftIndex])
      leftIndex++
    }
  }
}

export const mergeSort = array => {
  if(array.length < 2) return array
  let mid = Math.floor(array.length / 2)
  return (
    merge(mergeSort(array.slice(0, mid)), mergeSort(array.slice(mid, array.length)))
  )
}