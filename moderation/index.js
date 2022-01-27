const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());


// THis service is for moderating comments on Post

app.post('/events', async (req,res) => {
    const {type, data} = req.body;

    if(type === 'CommentCreated'){
        // if comment has 'orange' keyword then reject the commment
        const status = data.content.includes('orange') ? 'rejected':'approved';

        await axios.post('http://localhost:4005/events', {
            type: 'CommentModerated',
            data:{
                id: data.id,
                postId: data.postId,
                status,
                content:data.content
            }
        });
    }

    res.send({});
});

app.listen(4003, () =>{
    console.log('Listening on 4003');
}) ;