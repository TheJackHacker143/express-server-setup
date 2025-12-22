var removeDuplicates = function(s) {
    let stack = []
    let r = ""
    for (let char of s) {
        if ((stack[stack.length - 1] != char) || stack.length == 0) {
            stack.push(char)
        }
        else {
            stack.pop()
        }
    }
    for (let key of stack) {
        r += key
    }
    return r
};
console.log(removeDuplicates("abbaca"))