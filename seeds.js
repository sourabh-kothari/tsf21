const mongoose = require('mongoose');
const User = require('./models/user');

//. DB - test //
//. COLLECTION - users //

mongoose.connect('mongodb+srv://dbSourabh:sk27111614@cluster0.chzh5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connected to DB!'))
    .catch(error => console.log(error.message));

// const u = new User({
//     name: 'Rishabh',
//     email: 'rishabh02@gmail.com',
//     credits: 4000
// })
// u.save()
//     .then(u =>{
//         console.log(u);
//     })
//     .catch(e =>{
//         console.log(e);
//     })


const seedUsers = [
    {
        name: 'Sourabh',
        email: 'sourabhkothari2014@gmail.com',
        credits: 10000
    },
    {
        name: 'devansh',
        email: 'devansh@yahoo.com',
        credits: 7000
    },
    {
        name: 'Aditya',
        email: 'adityad@gmail.com',
        credits: 4500
    },
    {
        name: 'Shaurya',
        email: 'shaurya170410@yahoo.com',
        credits: 8600
    },
    {
        name: 'Saurav',
        email: 'Saurav2050@gmail.com',
        credits: 7500
    },
    {
        name: 'Vineet',
        email: 'vineet@yahoo.com',
        credits: 6900
    },
    {
        name: 'Manish',
        email: 'manish09@gmail.com',
        credits: 3000
    },
    {
        name: 'Sarthak',
        email: 'sarthak32@yahoo.com',
        credits: 2100
    },
    {
        name: 'Harshit',
        email: 'harshit@gmail.com',
        credits: 5300
    },
    {
        name: 'Raghav',
        email: 'raghav44@gmail.com',
        credits: 7300
    }
]


function seedDB() {
    User.remove({}, function (err) {
        if (err) {
            console.log(err);
        }
        console.log("removed users!");
    });
    seedUsers.forEach(function (seed) {
        User.create(seed, function (err, user) {
            if (err) {
                console.log(err)
            } else {
                console.log("added a user");
            }
        });
    });
}

module.exports = seedDB;