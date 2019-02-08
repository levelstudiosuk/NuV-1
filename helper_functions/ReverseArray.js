export function reverseArray(array) {
  for (var i = 0; i <= Math.floor((array.length - 1) / 2); i++) {
      let element = array[i];
      array[i] = array[array.length - 1 - i];
      array[array.length - 1 - i] = element;
  }
  return array;
}
