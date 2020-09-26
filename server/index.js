const express = require('express');
const app = express();
const cors = require('cors');
const monk = require('monk');

const db = monk('localhost/meower');
const mews = db.get('mews');

app.use(cors());
app.use(express.json());

app.get('/', (req,res) => {

    res.json({
        message: 'Meow Bro!'
    });

});

function isValidMew(mew)
{
    return mew.name&&mew.name.toString().trim()!==''&&mew.content&&mew.content.toString().trim()!=='';
}

app.post('/mews', (req,res) => {
    // console.log(req.body);
    if(isValidMew(req.body)){
        //insert into DB
        const mew = {
            name: req.body.name.toString(),
            content: req.body.content.toString(),
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