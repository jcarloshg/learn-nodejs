# Closures & Memory Leaks

In the JavaScript/TypeScript world, **Closures** are a fundamental power, while **Memory Leaks** are the primary side effect of mismanaging that power.

### 1. Closures: The "Persistent Memory"

A closure is the combination of a function bundled together with references to its surrounding state (**lexical environment**).

- **Key Point:** In JS, functions are not just code; they "carry" their birthplace with them. Even after an outer function has finished executing, the inner function maintains a reference to the outer variables.
- **Why we use them:** For data privacy (private variables), function factories, and partial application (currying).

### 2. Memory Leaks: When Closures Go Wrong

A memory leak occurs when the garbage collector (GC) cannot reclaim memory because it thinks an object is still "needed." In the context of closures, this happens when a function is kept alive longer than necessary, holding onto its lexical scope.

#### **Common Expert Pitfalls:**

- **Unintentional References:** If a long-lived global variable or a DOM element holds a reference to a closure, everything in that closure's scope (even large arrays or objects) stays in memory.
- **The "Double Closure" Trap:** If two closures are created in the same parent scope, they share the same lexical environment. If one closure is leaked, it can prevent the other closure's variables from being collected.
- **Event Listeners:** Attaching a closure to a DOM element (e.g., `window.addEventListener`) and forgetting to `removeEventListener` when the component unmounts. The closure will keep the entire scope alive indefinitely.

### 🛠️ Key Takeaways for Experts

| Concept                  | The "Expert" Rule                                                                                                           |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------- |
| **Garbage Collection**   | JS uses **Mark-and-Sweep**. If a variable is reachable from the Root (Global/Stack), it won't be deleted.                   |
| **Lifecycle Management** | Always nullify references to large objects inside closures once they are no longer needed.                                  |
| **Modern JS**            | In many cases, using `WeakMap` or `WeakSet` helps prevent leaks because they don't prevent the GC from collecting the keys. |

### 💡 Pro-Tip: The `Timer` Leak

One of the most frequent leaks in React/TypeScript apps is a closure inside a `setInterval` that references state. If the interval isn't cleared on unmount, the closure stays alive, the state stays in memory, and you get a "memory leak" warning.
