const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// servir frontend estático (opcional)
app.use(express.static(path.join(__dirname, 'front')));

// rotas
const usuarioRotas = require('./rota/usuarios');
const itensRotas = require('./rota/itens');
const pedidosRotas = require('./rota/pedidos');

app.use('/usuarios', usuarioRotas);
app.use('/itens', itensRotas);
app.use('/pedidos', pedidosRotas);

app.get('/', (req, res) => {
  res.send('API rodando! Use /usuarios, /itens ou /pedidos');
});

app.listen(PORT, () => {
  console.log(`api rodando em http://localhost:${PORT}`);
});