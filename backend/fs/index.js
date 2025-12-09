import { writeFile, readFile } from "fs";
writeFile("example.txt", "Hello i am modifying files in node again", (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("File written sucessfully");
  }
});

readFile("../intro/.env", "utf-8", (err, data) => {
  if (err) {
    console.log(err);
  } else {
    console.log(data, "data");
    // console.log(data.toString("utf-8"), "data");
  }
});
