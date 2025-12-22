arr = [1, 2, 3, 4, 5, 6, 7, 8];

function sortByBits(arr) {
  return arr.sort((a, b) => {
    let countA = a.toString(2).split('1').length - 1;
    let countB = b.toString(2).split('1').length - 1;
    return countA === countB ? a - b : countA - countB;
  });
}

console.log(sortByBits(arr));
