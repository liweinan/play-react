// https://www.testdome.com/library?page=1&skillArea=31&questionSets=public&questionId=110584
class Song {
    name;
    nextSong;

    constructor(name) {
        this.name = name;
    }

    /**
     * @return {boolean} true if the playlist is repeating, false if not.
     */
    isInRepeatingPlaylist() {
        let slow = this;
        let fast = this;
        while (fast && fast.nextSong) {
            slow = slow.nextSong;
            fast = fast.nextSong.nextSong;
            if (slow === fast) {
                return true;
            }
        }
        return false;
    }
}

let first = new Song("Hello");
let second = new Song("Eye of the tiger");

first.nextSong = second;
second.nextSong = first;

console.log(first.isInRepeatingPlaylist());