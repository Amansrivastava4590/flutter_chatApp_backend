const http = require('http');
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json()); // Middleware to parse JSON in the request body

const adminRoutes = require('./routes/admin');
const callRoutes = require('./routes/call');
const chatRoutes = require('./routes/chat');
const peopleRoutes = require('./routes/people');
const messageRoutes = require('./routes/message');


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use((req,res,next)=> {
    console.log("middleware!");
    next(); // allows to request to continue to the next middleware in line
});

app.use('/ping',(req,res,next)=> {
    res.send("<p> <h1> hello from node </h1></p>")
});


// app.use((req,res,next)=> {
//     res.status(404).send("<p> <h1> Page not found </h1></p>")
// });

app.use('/whatsapp-users',adminRoutes);

app.use('/whatsapp-chats',chatRoutes);

app.use('/whatsapp-calls',callRoutes);

app.use('/whatsapp-people',peopleRoutes);

app.use('/whatsapp-messages',messageRoutes);


const PORT = process.env.PORT || 5000;
// app.listen(PORT, () =>
//     console.log(`user-api server is running on port ${PORT}`)
// );
mongoose.connect(`${process.env.MONGO_URL}` ,{


}).then(() => {
    app.listen(PORT, () => console.log(`SERVER PORT ${PORT}`));
}).catch((error) => console.log(`${error}`));