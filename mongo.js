const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = encodeURIComponent(process.argv[2]);

const url = `mongodb+srv://jnaman01:${password}@cluster0.x8ez9at.mongodb.net/phoneBook?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const phoneBookSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model("Person", phoneBookSchema);

if(process.argv.length == 5){
    const person = new Person({
        name: process.argv[3],
        number: process.argv[4]
    })

    person.save().then(result => {
        console.log(`added ${process.argv[3]} ${process.argv[4]} to phonebook.`)
        mongoose.connection.close();
    })
} else {
    Person.find({}).then(result => {
        console.log(result);
        mongoose.connection.close();
    })
}