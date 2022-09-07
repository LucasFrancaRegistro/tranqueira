const express = require('express');
const fileupload = require('express-fileupload');
const pdfparse = require('pdf-parse');
const { default: ler } = require('./leitor');

const app = express();

app.use('/', express.static('public'));
app.use(fileupload());

app.post('/extract-text', (req, res) => {
    if (!req.files && !req.files.pdfFile) {
        res.status(400)
        res.end()
    }

    pdfparse(req.files.pdfFile).then(result => {
        console.log(result.text.split('6013').length)
        let nomes = ['quatro mil', 'treze  mil']
        console.log(ler(result.text, nomes, '6013').length)
        res.send(result.text)
    })
})

app.listen(3000)