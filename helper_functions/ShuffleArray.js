export function shuffle(array) {
    let counter = array.length;

    // While the array has at least one element
    while (counter > 0) {
        // Select index at random
        let index = Math.floor(Math.random() * counter);

        // Decrement counter
        counter--;

        // Swap last element with it
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}
