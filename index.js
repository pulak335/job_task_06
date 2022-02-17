const express = require('express');
const mongoose = require('mongoose');
const userModel  = require('./Model/userSchema');
const cors = require('cors');
const app = express();

app.use(cors())
app.use(express.json())

mongoose.connect('mongodb+srv://crud_mern:arafat135@cluster0.rzqwh.mongodb.net/users?retryWrites=true&w=majority', {
    useNewUrlParser: true
});

app.get('/adduser', async (req, res) => {
    userModel.find({}, (err, result) => {
        if (err) {
            console.log(err)
        }
        res.send(result)
    })
})


app.post('/adduser', async (req, res) => {
    const name = req.body?.name;
    const email = req.body?.email;
    const age = req.body?.age;
    const password = req.body?.password;
    const users = new userModel({ userName: name, email:email, age: age, password: password })
    try {
        await users.save()
        res.send("datainsart");
    } catch (error) {
        console.log(error)
    }
})


app.put('/updateuser', async (req, res) => {
    const updateName = req.body?.name;
    const updateEmail = req.body?.email;
    const updateAge = req.body?.age;
    const updatePassword = req.body?.password;
    const id = req.body?.id;

    try {
        await users.findById(id, (err,updateUser) => {
            updateUser.name = updateName;
            updateUser.email = updateEmail;
            updateUser.age = updateAge;
            updateUser.password = updatePassword;
            updateUser.save()
            res.send("update")
        })
    } catch (error) {
        console.log(error)
    }
})

app.delete('/delete/:id', async (req, res) => {
    const id = req.params.id;
    users.findByIdAndRemove(id).exec();
    res.send("deleted")
})

app.listen(3200, () => {
    console.log("the port is running in 3200");
})