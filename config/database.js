const mongoose = require('mongoose');

// UNCAUGHT EXCEPTION
process.on('uncaughtException', (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to uncaught exception`);
    process.exit(1);
})

mongoose.connect(process.env.DB)
.then(db => {
    console.log(`Mongodb connected with server ${db.connection.host}`);
})

mongoose.connection.on(`connected`, () => {
    console.log(`Mongoose connected to db`);
})

mongoose.connection.on(`error`, (err) => {
    console.log(err.message);
})

mongoose.connection.on(`disconnected`, () => {
    console.log(`Mongodb connection disconnected`);
})

process.on(`SIGINT`, async () => {
    await mongoose.connection.close();
    process.exit(0);
})

// UNHANDLED PROMISE REJECTION
process.on(`unhandledRejection`, (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to unhandled promise rejection`);

    mongoose.connection.close(() => {
        process.exit(1);
    });
})
