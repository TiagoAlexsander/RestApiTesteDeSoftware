const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const dataPath = path.join(__dirname, '..', 'data', 'usuarios.json');

function readUsers() {
  try {
    const txt = fs.readFileSync(dataPath, 'utf8');
    return JSON.parse(txt || '[]');
  } catch (err) {
    return [];
  }
}
function writeUsers(users) {
  fs.writeFileSync(dataPath, JSON.stringify(users, null, 2), 'utf8');
}

// GET /usuarios
router.get('/', (req, res) => {
  const users = readUsers();
  res.json(users);
});

// POST /usuarios
router.post('/', (req, res) => {
  const users = readUsers();
  const { nome, email } = req.body;
  if (!nome || !email) return res.status(400).json({ error: 'nome e email são obrigatórios' });

  const nextId = users.length ? Math.max(...users.map(u => Number(u.id) || 0)) + 1 : 1;
  const novo = { id: nextId, nome, email };
  users.push(novo);
  writeUsers(users);
  res.status(201).json(novo);
});

// PUT /usuarios/:id
router.put('/:id', (req, res) => {
  const users = readUsers();
  const id = Number(req.params.id);
  const idx = users.findIndex(u => Number(u.id) === id);
  if (idx === -1) return res.status(404).json({ error: 'Usuário não encontrado' });

  users[idx] = { ...users[idx], ...req.body };
  writeUsers(users);
  res.json(users[idx]);
});

// DELETE /usuarios/:id
router.delete('/:id', (req, res) => {
  let users = readUsers();
  const id = Number(req.params.id);
  const before = users.length;
  users = users.filter(u => Number(u.id) !== id);
  if (users.length === before) return res.status(404).json({ error: 'Usuário não encontrado' });

  writeUsers(users);
  res.status(204).end();
});

module.exports = router;