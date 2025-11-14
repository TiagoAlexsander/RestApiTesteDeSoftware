async function carregarUsuarios() {
    try {
        const resp = await fetch('http://localhost:3000/usuarios');
        const usuarios = await resp.json();

        const tabela = document.getElementById('tabelaUsuarios');
        tabela.innerHTML = '';

        usuarios.forEach(u => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${u.id}</td>
                <td>${u.nome}</td>
                <td>${u.email}</td>
                <td>
                    <button class="btnEditar" data-id="${u.id}">Editar</button>
                    <button class="btnExcluir" data-id="${u.id}">Excluir</button>
                </td>
            `;
            tabela.appendChild(tr);
        });
    } catch (err) {
        console.error('Erro ao carregar usuários:', err);
    }
}

// Função para cadastrar usuario
async function cadastrarUsuario(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    if (!nome || !email) return;

    await fetch('http://localhost:3000/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, email })
    });

    document.getElementById('formUsuario').reset();
    carregarUsuarios();
}

// Delegação para editar / excluir
document.getElementById('tabelaUsuarios').addEventListener('click', async (e) => {
    const id = e.target.dataset.id;
    if (!id) return;

    if (e.target.classList.contains('btnExcluir')) {
        if (!confirm('Confirmar exclusão?')) return;
        await fetch(`http://localhost:3000/usuarios/${id}`, { method: 'DELETE' });
        carregarUsuarios();
    }

    if (e.target.classList.contains('btnEditar')) {
        const row = e.target.closest('tr');
        const atualNome = row.querySelector('td:nth-child(2)').innerText;
        const atualEmail = row.querySelector('td:nth-child(3)').innerText;
        const novoNome = prompt('Novo nome:', atualNome);
        const novoEmail = prompt('Novo email:', atualEmail);
        if (novoNome === null || novoEmail === null) return;
        await fetch(`http://localhost:3000/usuarios/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome: novoNome, email: novoEmail })
        });
        carregarUsuarios();
    }
});

// associa o formulário a função
document.getElementById('formUsuario').addEventListener('submit', cadastrarUsuario);

// carrega os usuarios ao abrir a página
window.addEventListener('load', carregarUsuarios);