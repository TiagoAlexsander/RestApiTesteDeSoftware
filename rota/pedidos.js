const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const filePath = path.join(__dirname, '../data/pedidos.json');
const usuariosPath = path.join(__dirname, '../data/usuarios.json');
const itensPath = path.join(__dirname, '../data/itens.json');

function lerPedidos() {
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}
function escreverPedidos(data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}
function lerUsuarios() {
  return JSON.parse(fs.readFileSync(usuariosPath, 'utf-8'));
}
function lerItens() {
  return JSON.parse(fs.readFileSync(itensPath, 'utf-8'));
}

// GET /pedidos -> lista todos os pedidos
router.get('/', (req, res) => {
  const pedidos = lerPedidos();
  res.json(pedidos);
});

// POST /pedidos -> cria um novo pedido
router.post('/', (req, res) => {
  const pedidos = lerPedidos();
  const usuarios = lerUsuarios();
  const itens = lerItens();

  const { usuarioId, itemId, quantidade } = req.body;

  // valida usuário
  const usuario = usuarios.find(u => u.id === usuarioId);
  if (!usuario) {
    return res.status(400).json({ erro: 'Usuário não encontrado' });
  }

  // valida item
  const item = itens.find(i => i.id === itemId);
  if (!item) {
    return res.status(400).json({ erro: 'Item não encontrado' });
  }

  // cria pedido
  const novoPedido = {
    id: pedidos.length + 1,
    usuarioId: usuario.id,
    usuarioNome: usuario.nome,
    itemId: item.id,
    itemNome: item.nome,
    quantidade
  };

  pedidos.push(novoPedido);
  escreverPedidos(pedidos);

  res.status(201).json(novoPedido);
});

// PUT /pedidos/:id -> atualizar quantidade (ou item, se quiser)
router.put('/:id', (req, res) => {
  const pedidos = lerPedidos();
  const id = parseInt(req.params.id);
  const index = pedidos.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({ erro: 'Pedido não encontrado' });
  }

  // Atualiza apenas os campos permitidos
  if (req.body.quantidade !== undefined) {
    pedidos[index].quantidade = req.body.quantidade;
  }

  escreverPedidos(pedidos);
  res.json(pedidos[index]);
});

// DELETE /pedidos/:id -> remover pedido
router.delete('/:id', (req, res) => {
  const pedidos = lerPedidos();
  const id = parseInt(req.params.id);
  const index = pedidos.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({ erro: 'Pedido não encontrado' });
  }

  const removido = pedidos.splice(index, 1)[0];
  escreverPedidos(pedidos);

  res.json(removido);
});

module.exports = router;