const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

const handleEvent = (type, data) => {
    if(type === 'PostCreated'){
        const {id, title} = data;
        posts[id] = {id, title, comments: []}
    }
    if(type === 'CommentCreated'){
        const { id, content, postId, status } = data;
        const post = posts[postId];
        post.comments.push({id, content, status})
    }
    if(type === 'CommentUpdated'){
        const {id, postId, status, content} = data;
        const post = posts[postId];
        const comment = post.comments.find((comment) => comment.id === id);
        comment.content = content;
        comment.status = status;
    }
}
app.get('/posts', (req, res) => {
    res.send(posts);
});

app.post('/events', (req, res) => {
    const {type, data} = req.body;
    handleEvent(type, data);
    res.send({});
});

app.listen(4002, async () => {
    console.log('Listening on port 4002');
    // Run only on first boot
    // try {
    //     const res = await axios.get('http://event-bus-srv:4005/events');
    //     if (res && res.data) {
    //         for (let event of res.data) {
    //             console.log('Processing event:', event.type);
    //             handleEvent(event.type, event.data);
    //         }
    //     } else {
    //         console.log('No events found.');
    //     }
    // } catch (error) {
    //     console.error('Error fetching events:', error);
    // }
});