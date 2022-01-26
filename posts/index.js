const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());


// store all the post in memory
const posts = {};

app.get('/posts',(freq,res) => {
    res.send(posts);
});

app.post('/posts', async (req,res) => {
    // generate Random Id
    const id = randomBytes(4).toString('hex');
    const { title } = req.body;

    posts[id] = {
        id, title
    };

    // send event to event-bus to Echo the event
    await axios.post('http://localhost:4005/events', {
        // event has 2 propertry
        // 1- type of event
        // 2- data same as res
        type:'PostCreated',
        data: {
            id, 
            title
        }
    });

    // sen back status
    res.status(201).send(posts[id]);
});

// req coming from event-bus
app.post('/events', (req, res) =>{
    console.log('Received Event', req.body.type);

    res.send({});
});

app.listen(4000, () =>{
    console.log('Listening on 4000');
});