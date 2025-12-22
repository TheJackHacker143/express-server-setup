function searchRange(nums, target) {
    // Helper function to find the first or last position
    function binarySearch(nums, target, findFirst) {
        let left = 0, right = nums.length - 1;
        let result = -1;

        while (left <= right) {
            let mid = Math.floor((left + right) / 2);

            if (nums[mid] === target) {
                result = mid;
                if (findFirst) {
                    right = mid - 1; // keep searching on the left side
                } else {
                    left = mid + 1;  // keep searching on the right side
                }
            } else if (nums[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }

        return result;
    }

    let start = binarySearch(nums, target, true);
    let end = binarySearch(nums, target, false);
    return [start, end];
}

// Example Test Cases
console.log(searchRange([5,7,7,8,8,10], 8)); 