const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Quick example how post will look like
/*
    post==={
        id: 'j1223j42',
        title: 'post title',
        comments:[
            {id:'klj3kl',content: 'comment!' }
        ]
    }
*/

const posts = {};

const handleEvent = (type, data) =>{
    if(type=== 'PostCreated') {
        const { id, title } = data;
        posts[id] = {id, title, comments: [] };
    }

    if(type=== 'CommentCreated'){ 
        const {id,content,status, postId} = data;

        const post = posts[postId];
        post.comments.push({ id, content, status });
    }

    // Update if commentUpdated event is seen
    if(type === 'CommentUpdated') {
        const { id, content, postId, status } = data;

        // find the post
        const post  = posts[postId];
        // find the comment
        const comment = post.comments.find(comment =>{
            return comment.id === id;
        });
        // update the comment
        comment.status = status;
        comment.content = content;
    }
};

app.get('/posts', (req, res) => {
    res.send(posts);
});

app.post('/events', (req, res) =>{
    const { type, data } = req.body;

    // reusable function
    handleEvent(type, data);

    res.send({});
});

app.listen(4002, async () => {
    console.log("Listening on 4002");
    try {
      const res = await axios.get("http://localhost:4005/events");
   
      for (let event of res.data) {
        console.log("Processing event:", event.type);
        // reusable function
        handleEvent(event.type, event.data);
      }
    } catch (error) {
      console.log(error.message);
    }
});
