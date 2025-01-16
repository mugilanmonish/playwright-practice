// input: "Selenium for web automation"
// Output: "muineleS rof bew noitamotua"

function reverseString(input) {
    const words = input.split(" "); // Split the string into characters
    let reversed = "";
    for (let i = 0; i < words.length; i++) {
        for (let j = words[i].length-1; j >=0 ; j--) {
            const element = words[i].charAt(j);
            reversed += element
        }
        reversed += " "
    }
    return reversed
}

const input = "Selenium for web automation";
const output = reverseString(input);
console.log(output); 