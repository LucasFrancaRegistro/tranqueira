const express = require('express');
const fileupload = require('express-fileupload');
const { findSourceMap } = require('module');
const pdfparse = require('pdf-parse');

const app = express();

app.use('/', express.static('public'));
app.use(fileupload());

app.post('/extract-text', (req, res) => {
    if (!req.files && !req.files.pdfFile) {
        res.status(400)
        res.end()
    }

    pdfparse(req.files.pdfFile).then(result => {
        console.log(typeof result.text)
        console.log(result.text)
        res.send(result.text)
        console.log(result.text.indexof('oi'))
    })
    
})

app.listen(3000)
//npm i express express-fileupload pdf-parse