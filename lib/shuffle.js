function shuffle(array){
  let randIndex = (arrLength) => Math.floor(Math.random() * arrLength);
  let returnArr = [];
  while (array.length > 0) {
    let index = randIndex(array.length);
    returnArr.push(array[index]);
    array.splice(index, 1);
  }

  return returnArr;
}
module.exports = shuffle;
