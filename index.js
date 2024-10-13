const express = require('express')
const cors = require('cors')
require('dotenv').config()
require('./DBconnection/connection')
const UserModel = require('./Schema/UserSchema')





const app = express()
app.use(cors())
app.use(express.json())



app.post('/addrecord', async (req, res) => {
  try {
    const { name, lastname, phno, email, address } = req.body;

    
    const newUser = new UserModel({
      name,
      lastname,
      phno,
      email,
      address
    });

    
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
});

app.get('/get', (req, res) => {
  try {
    UserModel.find({}).then(user=>res.json(user)).catch(err=>res.json(err))
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
});


app.delete('/deleteuser/:id', (req, res) => {
  try {
    const id = req.params.id
    UserModel.findByIdAndDelete({_id:id})
    .then(res=>res.json(user))
    .catch(err=>res.json(err))
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
});


app.put('/updateuser/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const { name, lastname, phno, email, address } = req.body;

    const updatedUser = await UserModel.findByIdAndUpdate(
      id,
      { name, lastname, phno, email, address },
      { new: true }  
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
});



















const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`server running on port ${port}`);

})

