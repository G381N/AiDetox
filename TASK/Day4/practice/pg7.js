// Given an array of user objects, return a new array containing only user names in uppercase.
function getUppercaseUsernames(users) {
  return users.map(user => user.name.toUpperCase());
}

getUppercaseUsernames([
  { name: "Gebin" },
  { name: "alex" }
]);
    