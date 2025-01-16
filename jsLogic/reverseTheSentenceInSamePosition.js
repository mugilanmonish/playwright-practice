// input: ""Hi Hello Welcome"
// Output: "em oclew olleHiH"
function reverseWordsWithSpaces(input) {
    let st = input;
    let s = st.replace(/ /g, '');
    let j = s.length - 1;
    let result = "";

    for (let i = 0; i < st.length; i++) {
        if (st.charAt(i) !== ' ') {
            result += s.charAt(j--);
        } else {
            result += st.charAt(i);
        }
    }
    return result;
}

const input = "Hi Hello Welcome";
const output = reverseWordsWithSpaces(input);
console.log(output); 