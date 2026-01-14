async function getUser() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users/1");
  const user = await response.json();
  console.log(user.name);
}

getUser();


async function createUser() {
  saveToDB();
  sendEmail();
}


async function createUser() {
  await saveToDB();
  await sendEmail();
}
