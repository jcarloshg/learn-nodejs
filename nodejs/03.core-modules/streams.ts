import { Readable, Writable, Transform, pipeline } from "stream";
import { createReadStream, createWriteStream } from "fs";
import { createGzip } from "zlib";

const readable = Readable.from(["Hello ", "World ", "Node.js ", "Streams!"]);

readable.on("data", (chunk) => {
  console.log("Readable chunk:", chunk.toString());
});

readable.pipe(
  new Transform({
    transform(chunk, encoding, callback) {
      this.push(chunk.toString().toUpperCase());
      callback();
    },
  })
).pipe(
  new Writable({
    write(chunk, encoding, callback) {
      console.log("Writable chunk:", chunk.toString());
      callback();
    },
  })
);

pipeline(
  createReadStream("input.txt"),
  createGzip(),
  createWriteStream("input.txt.gz"),
  (err) => {
    if (err) console.error("Pipeline failed:", err);
    else console.log("Pipeline succeeded");
  }
);