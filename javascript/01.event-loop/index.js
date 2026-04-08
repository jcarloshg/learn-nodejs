console.log("1. Sync code start");

setTimeout(() => {
  console.log("4. Macrotask: setTimeout");
}, 2000);

Promise.resolve().then(() => {
  console.log("3.1 Microtask: Promise resolved");
  setTimeout(() => {
    console.log("3.2 Macrotask: Promise.then");
  }, 3000);
});

queueMicrotask(() => {
  console.log("2. Microtask: queueMicrotask");
});

console.log("5. Sync code end");

// Expected output order:
// 1. Sync code start
// 5. Sync code end
// 3.1 Microtask: Promise resolved
// 2. Microtask: queueMicrotask
// 4. Macrotask: setTimeout
// 3.2 Macrotask: Promise.then
