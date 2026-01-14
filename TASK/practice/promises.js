const promise = new Promise((resolve, reject) => {
  const success = true;

  if (success) resolve("Done");
  else reject("Failed");
});

promise.then(msg => console.log(msg));


new Promise(resolve => {
  setTimeout(() => resolve("Finished"), 2000);
}).then(console.log);



fetch("https://jsonplaceholder.typicode.com/users")
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.log(err))
  .finally(() => console.log("Request completed"));
