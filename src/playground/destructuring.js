const person = {
  age: 50,
  location: {
    city: "London",
    temp: 20
  }
};

const { name: firstName = "Anonymous", age } = person;

console.log(firstName);
console.log(age);

const { city, temp: temperature } = person.location;

console.log(city, temperature);
