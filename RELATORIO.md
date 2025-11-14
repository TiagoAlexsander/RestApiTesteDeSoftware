# Relatório de Testes — API /usuarios

## 1. Resumo

Todos os endpoints exigidos foram testados com sucesso na porta 3001. A API atende aos requisitos da atividade: GET /usuarios, POST /usuarios, PUT /usuarios/{id} e DELETE /usuarios/{id} funcionam conforme esperado.

## 2. Ambiente

- SO: Windows
- Node.js: v20.x
- Projeto: C:\JS25\primeiraRest
- Servidor usado nos testes: http://localhost:3001
- Ferramenta de teste: EchoAPI / curl

## 3. Como executar a API (com porta 3001)

1. Instalar dependências:

```powershell
cd C:\JS25\primeiraRest
npm install
```

2. Iniciar (porta 3001):

```powershell
$env:PORT=3001
npm start
```

3. Verificar:

```powershell
curl http://localhost:3001/
```

## 4. Endpoints implementados

- GET /usuarios — retorna lista de usuários
- POST /usuarios — cria novo usuário (body: { nome, email })
- PUT /usuarios/{id} — atualiza usuário (body: campos a alterar)
- DELETE /usuarios/{id} — remove usuário

## 5. Requests executados (usados nos testes)

(Substituir `{id}` pelo id real quando necessário.)

- GET (listar):

```bash
curl http://localhost:3001/usuarios
```

- POST (criar):

```bash
curl -X POST http://localhost:3001/usuarios \
  -H "Content-Type: application/json" \
  -d '{"nome":"Tiago","email":"tiago@example.com"}'
```

- PUT (atualizar id=3):

```bash
curl -X PUT http://localhost:3001/usuarios/3 \
  -H "Content-Type: application/json" \
  -d '{"nome":"Tiago Atualizado","email":"tiago.atualizado@example.com"}'
```

- DELETE (remover id=3):

```bash
curl -X DELETE http://localhost:3001/usuarios/3
```

## 6. Resultados observados nos testes

- GET /usuarios

  - Status: 200
  - Resposta: array JSON com objetos usuário (ex: [{ "id":1, "nome":"Tiago", "email":"tiago@example.com" }, ...])

- POST /usuarios

  - Status: 201
  - Resposta: JSON do usuário criado com id (ex: { "id": 4, "nome":"Tiago", "email":"tiago@example.com" })

- PUT /usuarios/{id}

  - Status: 200 (quando id existe)
  - Resposta: JSON do usuário atualizado com os campos alterados

- DELETE /usuarios/{id}
  - Status: 204 (quando id existe) — sem corpo de resposta

Observações: chamadas a ids inexistentes retornam 404.

## 7. Conclusão

A API está funcional e cumpre os requisitos da atividade. O repositório contém a aplicação (index.js, rotas, data/usuarios.json, front/) e o script de start (`npm start` usa nodemon). O relatório documenta ambiente, comandos e resultados para reprodução dos testes na porta 3001.
