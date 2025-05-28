async function enviaFormulario() {
    const alunoDTO = {
        "nomeInteiro": document.getElementById("input-nomeInteiro").value,
        "cpf": document.getElementById("input-cpf").value,
        "email": document.getElementById("input-email").value,
        "celular": Number(document.getElementById("input-celular").value)
    };

    console.log(alunoDTO);
    try {
        const respostaServidor = await fetch("http://localhost:3333/novo/aluno", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(alunoDTO)
        });

        if (!respostaServidor.ok) {
            throw new Error("Erro ao enviar os dados para o servidor. Contate o administrador do sistema");
        }

        alert("Aluno cadastrado com sucesso!");
    } catch (error) {
        console.log(error);
        alert(`Erro ao se comunicar com o servidor. ${error}`);
    }
}

async function recuperarListaAlunos() {
    try {
        const respostaServidor = await fetch("http://localhost:3333/lista/alunos");

        if (!respostaServidor.ok) {
            throw new Error('Erro ao comunicar com o servidor');
        }

        const listaDeAlunos = await respostaServidor.json();
        criarTabelaAlunos(listaDeAlunos);
        console.log(listaDeAlunos);
    } catch (error) {
        console.log('Erro ao comunicar com o servidor');
        console.log(error);
        return null;
    }
}

async function criarTabelaAlunos(alunos) {
    const tabela = document.getElementById('corpoAluno');
    tabela.innerHTML = ''; // limpa antes de recriar

    alunos.forEach(aluno => {
        const linha = document.createElement('tr');

        const idAluno = document.createElement('td');
        idAluno.textContent = aluno.idAluno;

        const nomeInteiro = document.createElement('td');
        nomeInteiro.textContent = aluno.nomeInteiro;

        const cpf = document.createElement('td');
        cpf.textContent = aluno.cpf;

        const email = document.createElement('td');
        email.textContent = aluno.email;

        const celular = document.createElement('td');
        celular.textContent = aluno.celular;

        const tdAcoes = document.createElement('td');

        const iconAtualizar = document.createElement('img');
        iconAtualizar.src = 'assets/icons/pencil-square.svg';
        iconAtualizar.alt = 'Ícone de edição';
        iconAtualizar.style.cursor = "pointer";
        iconAtualizar.addEventListener('click', () => {
            const dadosParaEnviar = {
                idAluno: aluno.idAluno,
                nomeInteiro: aluno.nomeInteiro,
                cpf: aluno.cpf,
                email: aluno.email,
                celular: aluno.celular
            };
            const queryParams = new URLSearchParams(dadosParaEnviar).toString();
            window.location.href = `atualizar-aluno.html?${queryParams}`;
        });

        const iconExcluir = document.createElement('img');
        iconExcluir.src = 'assets/icons/trash-fill.svg';
        iconExcluir.alt = 'Ícone de excluir';
        iconExcluir.style.cursor = "pointer";
        iconExcluir.addEventListener('click', () => excluirAluno(aluno.idAluno));

        linha.appendChild(idAluno);
        linha.appendChild(nomeInteiro);
        linha.appendChild(cpf);
        linha.appendChild(email);
        linha.appendChild(celular);
        tdAcoes.appendChild(iconAtualizar);
        tdAcoes.appendChild(iconExcluir);
        linha.appendChild(tdAcoes);

        tabela.appendChild(linha);
    });

    async function excluirAluno(idAluno) {
        const alunoDTO = { statusAluno: false };

        try {
            const response = await fetch(`http://localhost:3333/delete/aluno/${idAluno}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(alunoDTO)
            });

            if (response.ok) {
                alert('Aluno removido com sucesso');
                window.location.reload();
            } else {
                const error = await response.json();
                alert(`Erro: ${error}`);
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
            alert('Erro ao tentar excluir o aluno.');
        }
    }
}

async function atualizarAluno() {
    const alunoDTO = {
        "idAluno": document.getElementById("input-idAluno").value,
        "nomeInteiro": document.getElementById("input-nomeInteiro").value,
        "cpf": document.getElementById("input-cpf").value,
        "email": document.getElementById("input-email").value,
        "celular": Number(document.getElementById("input-celular").value)
    };

    const confirmacaoUsuario = confirm("Deseja realmente atualizar o aluno?");
    if (!confirmacaoUsuario) return false;

    try {
        const respostaServidor = await fetch(`http://localhost:3333/atualizar/aluno/${alunoDTO.idAluno}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(alunoDTO)
        });

        if (respostaServidor.ok) {
            alert("Aluno atualizado com sucesso!");
            window.location.href = "lista-aluno.html";
            return true;
        } else {
            alert("Erro ao atualizar aluno.");
            return false;
        }
    } catch (error) {
        console.error(error);
        alert("Erro ao tentar atualizar o aluno.");
        return false;
    }
}
