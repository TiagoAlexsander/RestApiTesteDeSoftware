const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const filePath = path.join(__dirname, '../data/itens.json');

function lerItens(){
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}
function escreverItens(data){
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

//GET /itens
router.get('/', (req, res) => {
    res.json(lerItens());
})

//POST /itens
router.post('/', (req, res) => {
    const itens = lerItens();
    const novoItem = {id: itens.length + 1, ...req.body};
    itens.push(novoItem);
    res.status(201).json(novoItem);
});

module.exports = router