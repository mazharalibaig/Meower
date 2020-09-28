const express = require('express');
const app = express();
const cors = require('cors');
const monk = require('monk');
const Filter = require('bad-words');

const db = monk(process.env.MOGNO_URI || 'localhost/meower');
const mews = db.get('mews');
const filter = new Filter();
const rateLimit = require("express-rate-limit");

app.use(cors());
app.use(express.json());

app.get('/', (req,res) => {

    res.json({
        message: 'Me is working!'
    });

});

app.get('/mews', (req,res) => {

    mews
        .find()
        .then((mews) => {
            res.json(mews);
        })

});

function isValidMew(mew)
{
    return mew.name&&mew.name.toString().trim()!==''&&mew.content&&mew.content.toString().trim()!=='';
}

app.use(rateLimit({
    windowMs: 15 * 1000, // 15 secs
    max: 2 // 2 per 15 secs
  }));

app.post('/mews', (req,res) => {
    // console.log(req.body);
    if(isValidMew(req.body)){
        //insert into DB
        const mew = {
            name: filter.clean(req.body.name.toString()),
            content: filter.clean(req.body.content.toString()),
            created: new Date()
        }

        console.log(mew); 

        mews
            .insert(mew)
            .then(createdMew => {
                res.json(createdMew);
            })
             
    }
    else
    {
        res.status(422);
        res.json('Hey! Name and Content is required!');
    }
});

app.listen(5000, ()=> {
    console.log('Listening on localhost 5000');
});