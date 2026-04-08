
// 1. Closure for Data Privacy (Good Use)
function makeCounter() {
	let count = 0; // private variable
	return function() {
		count++;
		return count;
	};
}
const counter = makeCounter();
console.log('Counter:', counter()); // 1
console.log('Counter:', counter()); // 2

// // 2. Memory Leak via Unintentional Reference
// let theClosure;
// function createLargeClosure() {
// 	const largeArray = new Array(1000000).fill('leak');
// 	theClosure = function() {
// 		// references largeArray
// 		console.log(largeArray[0]);
// 	};
// }
// createLargeClosure();
// // theClosure is global, so largeArray is never garbage collected!
// 
// // 3. The "Double Closure" Trap
// function parent() {
// 	let shared = { big: new Array(1000000).fill('data') };
// 	function a() { /* uses shared */ }
// 	function b() { /* uses shared */ }
// 	window.leak = a; // Only a is leaked, but b's variables (and shared) are kept alive too!
// }
// parent();
// 
// // 4. Event Listener Leak
// function attachListener() {
// 	const bigObj = { data: new Array(1000000).fill('leak') };
// 	function handler() {
// 		console.log(bigObj.data[0]);
// 	}
// 	window.addEventListener('resize', handler);
// 	// If you never call removeEventListener, bigObj stays in memory!
// }
// attachListener();
// 
// // 5. Timer Leak (React/JS Example)
// function startInterval() {
// 	let state = { big: new Array(1000000).fill('leak') };
// 	const interval = setInterval(() => {
// 		console.log(state.big[0]);
// 	}, 1000);
// 	// If you never call clearInterval(interval), state stays in memory!
// }
// startInterval();
// 
// // 6. Using WeakMap to Prevent Leaks
// const cache = new WeakMap();
// function remember(obj) {
// 	cache.set(obj, 'some value');
// 	// When obj is no longer referenced elsewhere, it can be garbage collected.
// }
