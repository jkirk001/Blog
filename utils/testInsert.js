let arr = [
  {
    author: { date: "2021-03-29T22:38:23.964Z", name: "Jon", read: 5 },
    tags: ["React"],
    body: [[Object], [Object], [Object]],
    _id: "606256e204dd7b27fad5d68e",
    title: "TESTER 1",
    quip: "Tester 1",
    __v: 0,
    date: { month: "3", day: "29", year: "2021" },
  },
  {
    author: { date: "2021-03-29T22:40:04.296Z", name: "Mikey", read: 5 },
    tags: ["Node", "JS"],
    body: [[Object], [Object], [Object], [Object]],
    _id: "6062574604dd7b27fad5d68f",
    title: "TESTER 2",
    quip: "Tester 2",
    __v: 0,
    date: { month: "3", day: "29", year: "2021" },
  },
  {
    author: { date: "2021-03-29T22:40:40.613Z", name: "Jon", read: 5 },
    tags: ["Express"],
    body: [[Object], [Object], [Object], [Object]],
    _id: "6062576a04dd7b27fad5d690",
    title: "Tester 3",
    quip: "Teester 3",
    __v: 0,
    date: { month: "3", day: "29", year: "2021" },
  },
  {
    author: { date: "2021-03-30T02:51:08.094Z", name: "Jon", read: 5 },
    tags: ["React", "Next", "Node", "JS", "Express"],
    body: [[Object], [Object], [Object], [Object]],
    _id: "60629250ed3c7e303185907a",
    title: "TESTER. 5",
    quip: "I seea. thing in hte door",
    __v: 0,
    date: { month: "3", day: "29", year: "2021" },
  },
  {
    author: { date: "2021-03-30T03:42:26.935Z", name: "Mikey", read: 5 },
    tags: ["Node", "JS"],
    body: [[Object], [Object]],
    _id: "60629e2b03864e03dfa68bac",
    title: "TESTER 23",
    quip: "awdawdwd",
    __v: 0,
    date: { month: "3", day: "29", year: "2021" },
  },
];

function insertionSort(arr, n) {
  let i, key, j;
  for (i = 1; i < n; i++) {
    key = arr[i].author.date;
    j = i - 1;

    /* Move elements of arr[0..i-1], that are 
          greater than key, to one position ahead 
          of their current position */
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j].author.date;
      j = j - 1;
    }
    arr[j + 1].author.date = key;
  }
  console.log(arr);
}

// A utility function to print an array of size n

// Driver code

insertionSort(arr, arr.length);
