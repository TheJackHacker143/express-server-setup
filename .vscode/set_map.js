var twoSum = function(nums, target) {
    let map = new Map();
    for (let i = 0; i < nums.length; i++) {
        let a = nums[i];
        let b = target - a;
        if (map.has(b)) {
            return [map.get(b), i]; // return indices
        }
        map.set(a, i);
    }
};
let result = twoSum([2,7,11,15], 9);
console.log(result); // [0, 1]
