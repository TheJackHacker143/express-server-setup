function toHex(num) {
    if (num === 0) return "0";
    if (num < 0) num += 0x100000000; // add 2^32 for negatives
    
    const hex = "0123456789abcdef";
    let res = "";
    while (num > 0) {
        let h=num|0
        res = hex[num & 15] + res;
        num >>>= 4;
    }
    return res;
}

//console.log(toHex(26));  // "1a"
console.log(toHex(-1));  // "ffffffff"
