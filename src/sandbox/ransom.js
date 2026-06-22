/**
 * @param {string} ransomNote
 * @param {string} magazine
 * @return {boolean}
 */
// https://leetcode.com/problems/ransom-note/description/?envType=study-plan-v2&envId=top-interview-150

var canConstruct = function(ransomNote, magazine) {
    // 如果 ransomNote 为空，可以构造
    if (ransomNote.length === 0) return true;

    // 统计 magazine 中每个字符的出现次数
    const magazineCount = {};
    for (let char of magazine) {
        magazineCount[char] = (magazineCount[char] || 0) + 1;
    }

    // 检查 ransomNote 的每个字符
    for (let char of ransomNote) {
        if (!magazineCount[char] || magazineCount[char] === 0) {
            return false;  // magazine 中没有这个字符或不够用
        }
        magazineCount[char]--;
    }

    return true;
};
canConstruct("aa", "aab")