let s = 'selenium for web automation'
let words = s.split(' ')
let reversed = ""
for (let i = words.length - 1; i >= 0; i--) {
    for(let j = words[i].length-1; j>=0 ; j--) {
    reversed += words[i].charAt(j)
    }
    reversed += ' '
}
console.log(`Reversed string ${reversed}`);