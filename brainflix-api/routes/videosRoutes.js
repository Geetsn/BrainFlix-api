const fs = require('fs');
const {v4: uuid} = require('uuid');
const express = require('express');
const { channel } = require('diagnostics_channel');
const router = express.Router();

router.route('/')
    .get((req, res) => {
        fs.readFile('./data/video-details.json', 'utf-8', (err, data)=> {
            if (err) {
                res.status(500).json({
                    message: "Sorry! Something went wrong. ",
                    error: err
                });
            } else {
                const videoData = JSON.parse(data).map(video => {
                    return {
                        id: video.id,
                        title: video.title,
                        channel: video.channel,
                        image: video.image,
                        description: video.description,
                        views: video.views,
                        likes: video.likes,
                        timestamp: video.timestamp,
                        comment: video.comment
                    };
                });
                res.json(videoData);
                console.log(videoData);
            }
        });
    })
    .post((req, res) => {
        const data = fs.readFileSync('./data/video-details.json', 'utf-8');
        const videosData = JSON.parse(data);
        // If all the fields on the json exist, then we create a new video object and write it to the file
        if(req.body?.title && req.body?.description) {
            const newVideo = {id: uuid(), ...req.body, timestamp: new Date(), likes: 10, views: 3,image:"http://localhost:8080/images/Upload-video-preview.jpg", channel:"anything"};
            videosData.push(newVideo);
            fs.writeFileSync('./data/video-details.json', JSON.stringify(videosData));
            res.status(201).json(newVideo);
        } else {
            res.status(400).json({message: "Error adding video."});
        }
    });
router.route("/:id")
    .get((req, res) => {
        const data = fs.readFileSync('./data/video-details.json', 'utf-8');
        const jsData = JSON.parse(data);
        res.json(jsData.find(video => {
            return video.id === req.params.id;
        }));

    })


module.exports = router;