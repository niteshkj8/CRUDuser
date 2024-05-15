import faker from "faker";
import mongoose from "mongoose";
import User from "./models/user.js";
import {} from "dotenv/config";

async function seedData() {
    // Connection URL
    const url = process.env.MONGO_URL;
    const seed_count = 100;
    mongoose.set("strictQuery", false);
    mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Connected to DB")
    })
    .catch((err) => {
        console.log("error", err)
    })

    let dataSet = [];
    // creating 100 fake data
    for (let i = 0; i < seed_count; i++) {
        const name = faker.name.findName();
        const age = faker.random.number({ min: 18, max: 90, precision: 1 });
        const work = faker.name.jobTitle();
        const mobile = faker.phone.phoneNumberFormat();
        const email = faker.internet.email();
        const address = faker.address.streetAddress() + "," + faker.address.city();
        const salary = faker.finance.amount(20000, 100000, 2);

        dataSet.push({ name, age, work, mobile, email, address, salary });
    }

    const seedDB = async () => {
        await User.insertMany(dataSet);
    }

    seedDB().then(() => {
        mongoose.connection.close()
        console.log("seed successful")
    })
}

seedData();