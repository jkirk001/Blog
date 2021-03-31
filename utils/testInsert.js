let arr = [
  {
    author: { date: "2021-03-29T22:38:23.964Z", name: "Jon", read: 5 },
    tags: ["React"],
    body: [[Object], [Object], [Object]],
    _id: "606256e204dd7b27fad5d68e",
    title: "TESTER 1",
    quip: "Tester 1",
    __v: 0,
  },
  {
    author: { date: "2021-03-29T22:40:04.296Z", name: "Mikey", read: 5 },
    tags: ["Node", "JS"],
    body: [[Object], [Object], [Object], [Object]],
    _id: "6062574604dd7b27fad5d68f",
    title: "TESTER 2",
    quip: "Tester 2",
    __v: 0,
  },
  {
    author: { date: "2021-03-29T22:40:40.613Z", name: "Jon", read: 5 },
    tags: ["Express"],
    body: [[Object], [Object], [Object], [Object]],
    _id: "6062576a04dd7b27fad5d690",
    title: "Tester 3",
    quip: "Teester 3",
    __v: 0,
  },
  {
    author: { date: "2021-03-30T02:51:08.094Z", name: "Jon", read: 5 },
    tags: ["React", "Next", "Node", "JS", "Express"],
    body: [[Object], [Object], [Object], [Object]],
    _id: "60629250ed3c7e303185907a",
    title: "TESTER. 5",
    quip: "I seea. thing in hte door",
    __v: 0,
  },
  {
    author: { date: "2021-03-30T03:42:26.935Z", name: "Mikey", read: 5 },
    tags: ["Node", "JS"],
    body: [[Object], [Object]],
    _id: "60629e2b03864e03dfa68bac",
    title: "TESTER 23",
    quip: "awdawdwd",
    __v: 0,
  },
  {
    author: { date: "2021-03-30T04:55:22.172Z", name: "Jon", read: 5 },
    tags: ["React"],
    body: [
      [Object],
      [Object],
      [Object],
      [Object],
      [Object],
      [Object],
      [Object],
      [Object],
      [Object],
      [Object],
      [Object],
      [Object],
      [Object],
    ],
    _id: "6062af4403864e03dfa68bad",
    title: "Using context to manage global state",
    quip:
      "But what if you need your state to persist across your entire component tree? ",
    __v: 0,
  },
  {
    author: { date: "2021-03-30T05:05:55.872Z", name: "Jon", read: 5 },
    tags: [],
    body: [
      [Object],
      [Object],
      [Object],
      [Object],
      [Object],
      [Object],
      [Object],
      [Object],
      [Object],
      [Object],
      [Object],
      [Object],
    ],
    _id: "6062b1b703864e03dfa68bae",
    title: "Building statically rendered pages with Next",
    quip: "Just like the good ol'days",
    __v: 0,
  },
  {
    author: { date: "2021-03-30T05:45:29.914Z", name: "Jon", read: 5 },
    tags: ["React", "Next"],
    body: [
      [Object],
      [Object],
      [Object],
      [Object],
      [Object],
      [Object],
      [Object],
      [Object],
      [Object],
      [Object],
      [Object],
      [Object],
      [Object],
    ],
    _id: "6062bb0503864e03dfa68baf",
    title: "Clean Component File Structures",
    quip: "It’s not a sexy topic, nor one to write home about.",
    __v: 0,
  },
  {
    author: { date: "2021-03-30T06:48:42.621Z", name: "Mikey", read: 5 },
    tags: ["React", "Next", "Node", "JS"],
    body: [[Object], [Object]],
    _id: "6062c9cdd2eec50a7ab9c632",
    title: "Tester",
    quip: "awdawdawdawd",
    __v: 0,
  },
];

function insertionSort(arr) {
  let n = arr.length;
  let i, key, j;
  for (i = 1; i < n; i++) {
    key = arr[i];
    j = i - 1;

    /* Move elements of arr[0..i-1], that are 
          greater than key, to one position ahead 
          of their current position */
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j].author.date;
      j = j - 1;
    }
    arr[j + 1] = key;
  }
  console.log(arr);
}

insertionSort(arr);
//export default insertionSort;
