
//*************** Developed By : Shaurya Agarwal **************//

const { concatSeries } = require('async');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const User = require('./models/user');
const Transaction = require('./models/transaction');
const seedDB = require("./seeds");

//# DB - test //
//# COLLECTION 1 - users //
//# COLLECTION 2 - transactions //

// mongoose.connect('mongodb://localhost:27017/', { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => {
//         console.log("MONGO CONNECTED!!!")
//     })
//     .catch(err => {
//         console.log("MONGO CONNECTION ERROR!!!!")
//         console.log(err)
//     })

mongoose.set('useFindAndModify', false);
mongoose.connect('mongodb+srv://dbSourabh:sk27111614@cluster0.chzh5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connected to DB!'))
    .catch(error => console.log(error.message));


app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride('_method'));
seedDB();
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/view", async (req, res) => {
    const users = await User.find({})
    res.render("view", { users });
});

app.get("/view/:id", async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    const users = await User.find({})
    res.render("transfer", { user, users });
});

app.get("/view/:id1/:id2", async (req, res) => {
    const { id1, id2 } = req.params;
    const fromUser = await User.findById(id1);
    const toUser = await User.findById(id2);
    res.render("form", { fromUser, toUser });
});

app.put("/view/:id1/:id2", async (req, res) => {
    const { id1, id2 } = req.params;
    const credit = parseInt(req.body.credit);
    const fromUser = await User.findById(id1);
    const toUser = await User.findById(id2);

    if (credit <= fromUser.credits && credit > 0) {

        let fromCreditsNew = fromUser.credits - credit;
        let toCreditsNew = parseInt(toUser.credits + credit);
        await User.findByIdAndUpdate(id1, { credits: fromCreditsNew }, { runValidators: true, new: true });
        await User.findByIdAndUpdate(id2, { credits: toCreditsNew }, { runValidators: true, new: true });

        let newTransaction = new Transaction();
        newTransaction.fromName = fromUser.name;
        newTransaction.toName = toUser.name;
        newTransaction.transfer = credit;
        await newTransaction.save();

        res.redirect("/view");
    }
    else {
        res.render('error');
    }
});

app.get("/history", async (req, res) => {
    const transactions = await Transaction.find({});
    res.render("history", { transactions });
});

var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log("Server started!!!!!");
});
