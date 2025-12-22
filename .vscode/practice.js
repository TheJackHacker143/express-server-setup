function solve(A) {
//     let freq = new Map();
//     let q = [];
//     let result = "";

//     for (let ch of A) {
//         // Increase frequency
//         freq.set(ch, (freq.get(ch) || 0) + 1);

//         // Push to queue
//         q.push(ch);

//         // Remove repeating characters from queue front
//         while (q.length > 0 && freq.get(q[0]) > 1) {
//             q.shift();
//         }

//         // Check first non-repeating
//         if (q.length === 0) {
//             result += "#";
//         } else {
//             result += q[0];
//         }
//     }

//     return result;
// }

// // Test
// console.log(solve("aaaaababacdc")); // "aabbdd"
// console.log(solve("abcabc")); // "aaabc#"