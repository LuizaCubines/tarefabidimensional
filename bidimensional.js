let funcionarios = [];

const getInputValues = () => ({
    id: document.getElementById('id').value,
    colaborador: document.getElementById('colaborador').value,
    dataNascimento: document.getElementById('dataNascimento').value,
    cargo: document.getElementById('cargo').value
});


const limparFormulario = () => {
    document.getElementById('id').value = '';
    document.getElementById('colaborador').value = '';
    document.getElementById('dataNascimento').value = '';
    document.getElementById('cargo').value = '';
};


const atualizarLista = () => {
    const tabelaFuncionarios = document.getElementById('tabelaFuncionarios').getElementsByTagName('tbody')[0];
    tabelaFuncionarios.innerHTML = ''; 

    if (funcionarios.length) {
        funcionarios.forEach(funcionario => {
            const tr = document.createElement('tr');

            const tdId = document.createElement('td');
            tdId.textContent = funcionario.id;
            tr.appendChild(tdId);

            const tdColaborador = document.createElement('td');
            tdColaborador.textContent = funcionario.colaborador;
            tr.appendChild(tdColaborador);

            const tdDataNascimento = document.createElement('td');
            tdDataNascimento.textContent = funcionario.dataNascimento;
            tr.appendChild(tdDataNascimento);

            const tdCargo = document.createElement('td');
            tdCargo.textContent = funcionario.cargo;
            tr.appendChild(tdCargo);

            tabelaFuncionarios.appendChild(tr);
        });
    } else {
        const tr = document.createElement('tr');
        const td = document.createElement('td');
        td.setAttribute('colspan', 4);
        td.textContent = 'Nenhum funcionário cadastrado.';
        tr.appendChild(td);
        tabelaFuncionarios.appendChild(tr);
    }
};

const buscarFuncionario = id => funcionarios.find(f => f.id === id);


const buscarFuncionarioIndex = id => funcionarios.findIndex(f => f.id === id);


function cadastrar() {
    const { id, colaborador, dataNascimento, cargo } = getInputValues();

    if (id && colaborador && dataNascimento && cargo) {
        if (buscarFuncionario(id)) {
            alert('ID já existe!');
            return;
        }

        funcionarios.push({ id, colaborador, dataNascimento, cargo });
        alert('Funcionário cadastrado com sucesso!');
        limparFormulario();
        atualizarLista();
    } else {
        alert('Por favor, preencha todos os campos.');
    }
}


function consultar() {
    const { id } = getInputValues();
    const funcionario = buscarFuncionario(id);

    if (funcionario) {
        document.getElementById('colaborador').value = funcionario.colaborador;
        document.getElementById('dataNascimento').value = funcionario.dataNascimento;
        document.getElementById('cargo').value = funcionario.cargo;
    } else {
        alert('Funcionário não encontrado.');
    }
}

function excluir() {
    const { id } = getInputValues();
    const index = buscarFuncionarioIndex(id);

    if (index !== -1) {
        funcionarios.splice(index, 1);
        alert('Funcionário excluído com sucesso!');
        limparFormulario();
        atualizarLista();
    } else {
        alert('Funcionário não encontrado.');
    }
}

function alterar() {
    const { id, colaborador, dataNascimento, cargo } = getInputValues();
    const index = buscarFuncionarioIndex(id);

    if (index !== -1) {
        funcionarios[index] = { id, colaborador, dataNascimento, cargo };
        alert('Funcionário alterado com sucesso!');
        limparFormulario();
        atualizarLista();
    } else {
        alert('Funcionário não encontrado.');
    }
}