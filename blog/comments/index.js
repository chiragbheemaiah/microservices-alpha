const express = require('express')
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());
const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', async (req, res) => {
    const commentId = randomBytes(4).toString('hex');
    const { content } = req.body;
    const comments = commentsByPostId[req.params.id] || [];
    comments.push({ id: commentId, content, status: 'pending'});
    commentsByPostId[req.params.id] = comments;
    const event = {
        type: 'CommentCreated',
        data: {id: commentId, content, postId: req.params.id, status: 'pending'}
    };
    await axios.post('http://event-bus-srv:4005/events', event).catch((error) => console.log(error));
    res.status(201).send(comments);
});

app.post('/events', async (req, res) => {
    const {type, data} = req.body;
    if(type === 'CommentModerated'){
        const {postId, id, status, content} = data
        const comments = commentsByPostId[postId];
        const comment = comments.find(comment => {
            return comment.id === id
        })
        comment.status = status;
        const event = {
            type: 'CommentUpdated',
            data: {
                id,
                postId,
                status,
                content
            }
        }
        await axios.post('http://event-bus-srv:4005/events', event).catch((error) => console.log(error));
    }
    console.log(`Status: Received event - ${req.body.type}`);
    res.send({});
});

app.listen(4001, () => { console.log('Listening on port 4001 ...') });