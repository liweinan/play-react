/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
// https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/submissions/2036515377/?envType=study-plan-v2&envId=top-interview-150
var strStr = function (haystack, needle) {
    if (needle === "") {
        return 0;
    }

    let m = haystack.length;
    let n = needle.length;

    for (let i = 0; i <= m - n; i++) {
        let j = 0;

        while (j < n) {
            if (haystack[i + j] === needle[j]) {
                j++;
            } else {
                break;
            }

            if (j === n) {
                return i;
            }
        }


    }

    return -1;

};

// console.log(strStr("ddsadofsad", "sad"));
// console.log(strStr("ddddd", "sad"));
console.log(strStr("a", "a"));