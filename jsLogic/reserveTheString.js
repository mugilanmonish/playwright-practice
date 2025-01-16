//input : Mugilan
//output : naligum

let s = "Mugilan"
s = s.toLowerCase()
console.log(reverseCompleteString(s));

function reverseCompleteString(input) {
    let reversed = ''
    for (let i = input.length-1; i >=0; i--) {
        const element = input[i];
        reversed += element
        console.log(reversed);
    }
    return reversed
}
