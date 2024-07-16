const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
const fs = require('fs');


const app = express();
const port = 3000;

app.use(cors());
app.use(bodyparser.json());



app.post('/formsent' , (req, res)=>{
        const formData = req.body;



    let existingData = [];
    try {
        existingData = require('./data.json');
    } catch (error) {
        console.error('Error reading data.json:', error);
    }

    existingData.push(formData);

    fs.writeFile('./data.json', JSON.stringify(existingData, null, 2), (err) => {
        if (err) {
            console.error('Error writing to data.json:', err);
            res.status(500).json({ error: 'Failed to store data' });
        } else {
            console.log('Data written to data.json');
            res.status(200).json({ message: 'Form data stored successfully' });
        }
    });

})





app.get('/formsent', (req, res) => {
    // Read data from data.json and send as response
    try {
        const data = require('./data.json');
        res.json(data);
    } catch (error) {
        console.error('Error reading data.json:', error);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

app.post('/del', (req,res) => {
    const { word } = req.body;

    try {
  
        let existingData = require('./data.json');

  
        existingData = existingData.filter(item => item.word !== word);

  
        fs.writeFile('./data.json', JSON.stringify(existingData, null, 2), (err) => {
            if (err) {
                console.error('Error writing to data.json:', err);
                res.status(500).json({ error: 'Failed to delete data' });
            } else {
                console.log(`Object with word '${word}' deleted from data.json`);
                res.status(200).json({ message: `Object with word '${word}' deleted successfully` });
            }
        });
    } catch (error) {
        console.error('Error reading or parsing data.json:', error);
        res.status(500).json({ error: 'Failed to delete data' });
    }

})





app.listen(port, ()=>{
    console.log(`Server is listening on http://localhost:${port}`);
})