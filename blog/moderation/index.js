const express = require('express');
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/events', async (req, res) => {
    const {type, data} = req.body;
    if(type === 'CommentCreated'){
        const status = data.content.includes('orange') ? 'rejected' : 'approved'
        await axios.post('http://event-bus-srv:4005/events', {
            type: 'CommentModerated',
            data: {
                id: data.id,
                postId: data.postId,
                status,
                content: data.content
            }
        }).catch((error) => console.log(error));
    }
    res.send({});
});

app.listen(4003, () => { console.log('Moderation Service listening on port 4003...')})
