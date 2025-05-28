
async function enviaFormulario() {
    const cursoDTO = {
        "nome": document.getElementById("input-nome").value,
        "area": document.getElementById("input-area").value,
        "cargaHoraria": Number(document.getElementById("input-cargaHoraria").value)
    };

    console.log(cursoDTO)

    try {
        const respostaServidor = await fetch("http://localhost:3333/novo/curso", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cursoDTO)
        });

        if (!respostaServidor.ok) {
            throw new Error("Erro ao enviar os dados para o servidor. Contate o administrador do sistema");
        }

        alert("Curso cadastrado com sucesso!");
    } catch (error) {
        console.log(error);
        alert(`Erro ao se comunicar com o servidor. ${error}`);
    }
}

async function recuperarListaCursos() {
    try {
        const respostaServidor = await fetch("http://localhost:3333/lista/cursos");

        if (!respostaServidor.ok) {
            throw new Error('Erro ao comunicar com o servidor');
        }

        const listaDeCursos = await respostaServidor.json();

        criarTabelaCursos(listaDeCursos)
    } catch (error) {
        console.log('Erro ao comunicar com o servidor');
        console.log(error);
    }
}

async function criarTabelaCursos(cursos) {
    const tabela = document.getElementById('corpoCurso');

    cursos.forEach(curso => {
        // Cria uma nova linha da tabela
        const linha = document.createElement('tr');
        // Cria e preenche cada célula da linha
        const idCurso = document.createElement('td');
        idCurso.textContent = curso.idCurso; // Preenche com o id do curso

        const nome = document.createElement('td');
        nome.textContent = curso.nome; // Preenche com o nome do curso

        const area = document.createElement('td');
        area.textContent = curso.area; // Preenche com a duracao do curso

        const cargaHoraria = document.createElement('td');
        cargaHoraria.textContent = curso.cargaHoraria; // Preenche com a categorização



        const tdAcoes = document.createElement('td');
        const iconAtualizar = document.createElement('img');
        iconAtualizar.src = 'assets/icons/pencil-square.svg';
        iconAtualizar.addEventListener('click', () => {
            // Criar objeto com os dados necessários
            const dadosParaEnviar = {
                nome: curso.nome,
                area: curso.area,
                cargaHoraria: curso.cargaHoraria,
                idCurso: curso.idCurso
            };

            // Converter para parâmetros de URL
            const queryParams = new URLSearchParams(dadosParaEnviar).toString();

            // Redirecionar com os dados na URL
            window.location.href = `atualizar-curso.html?${queryParams}`;
        });

        const iconExcluir = document.createElement('img');
        iconExcluir.addEventListener("click", () => excluirCurso(curso.idCurso));
        iconExcluir.src = 'assets/icons/trash-fill.svg';
        iconExcluir.alt = 'Ícone de excluir';

        //chamando
        linha.appendChild(idCurso);
        linha.appendChild(nome);
        linha.appendChild(area);
        linha.appendChild(cargaHoraria);
        tdAcoes.appendChild(iconAtualizar);
        linha.appendChild(tdAcoes);
        tdAcoes.appendChild(iconExcluir);


        tabela.appendChild(linha);

    });

    async function excluirCurso(idCurso) {
        const cursoDTO = {
            statusCurso: false
        };

        try {
            const response = await fetch(`http://localhost:3333/delete/curso/${idCurso}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(cursoDTO)
            });

            if (response.ok) {
                alert('Curso removido com sucesso');
                window.location.reload();
            } else {
                const error = await response.json();
                alert(`Erro: ${error}`);
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
            alert('Erro ao tentar excluir o curso.');
        }
    }
}

async function atualizarCurso() {
    const cursoDTO = {
        "idCurso": document.getElementById("input-idCurso").value,
        "nome": document.getElementById("input-nome").value,
        "area": document.getElementById("input-area").value,
        "cargaHoraria": Number(document.getElementById("input-cargaHoraria").value)
    };

    const confirmacaoUsuario = confirm("Deseja realmente atualizar o curso?");
    if (!confirmacaoUsuario) return false;

    try {
        const respostaServidor = await fetch(`http://localhost:3333/atualizar/curso/${cursoDTO.idCurso}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cursoDTO)
        });

        if (respostaServidor.ok) {
            alert("Curso atualizado com sucesso!");
            window.location.href = "lista-curso.html";
            return true;
        } else {
            alert("Erro ao atualizar curso.");
            return false;
        }
    } catch (error) {
        console.error(error);
        alert("Erro ao tentar atualizar o curso.");
        return false;
    }
}