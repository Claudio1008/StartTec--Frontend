
async function enviaFormulario() {
    // recuperar as informações do formulário e colocar em objeto JSON
    const matriculaDTO = {
        "idAluno": Number(document.querySelectorAll("input")[0].value),
        "idCurso": Number(document.querySelectorAll("input")[1].value),
        "dataMatricula": document.querySelectorAll("input")[2].value
    }

    console.log(matriculaDTO)
    try {
        const respostaServidor = await fetch("http://localhost:3333/nova/matricula", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(matriculaDTO)
        });

        if (!respostaServidor.ok) {
            throw new Error("Erro ao enviar os dados para o servidor. Contate o administrador do sistema");
        }

        alert("Matricula cadastrada com sucesso!");
    } catch (error) {
        console.log(error);
        alert(`Erro ao se comunicar com o servidor. ${error}`);
    }
}


async function recuperarListaMatriculas() {
    try {
        const respostaServidor = await fetch("http://localhost:3333/lista/matriculas");

        if (!respostaServidor.ok) {
            throw new Error('Erro ao comunicar com o servidor');
        }

        const listaDeMatriculas = await respostaServidor.json();

        criarTabelaMatriculas(listaDeMatriculas)
    } catch (error) {
        console.log('Erro ao comunicar com o servidor');
        console.log(error);
    }
}

async function criarTabelaMatriculas(matriculas) {
    const tabela = document.getElementById('corpoMatricula');
    console.log(matriculas)
    matriculas.forEach(matricula => {
        // Cria uma nova linha da tabela
        const linha = document.createElement('tr');

        // Cria e preenche cada célula da linha
        const idMatricula = document.createElement('td');
        idMatricula.textContent = matricula.idMatricula; // Preenche com o id da matricula


        const nomeAluno = document.createElement('td');
        nomeAluno.textContent = matricula.idAluno;


        const nomeCurso = document.createElement('td');
        nomeCurso.textContent = matricula.idCurso;

        const dataMatricula = document.createElement('td');
        dataMatricula.textContent = new Date(matricula.dataMatricula).toLocaleDateString('pt-br')


        const tdAcoes = document.createElement('td');
        const iconAtualizar = document.createElement('img'); // Cria o elemento <img>
        iconAtualizar.src = 'assets/icons/pencil-square.svg'; // Define o caminho da imagem
        iconAtualizar.alt = 'Ícone de edição'; // Texto alternativo para acessibilidade
        iconAtualizar.addEventListener('click', () => {
            // Criar objeto com os dados necessários
            const dadosParaEnviar = {
                idAluno: matricula.idAluno,
                idCurso: matricula.idCurso,
                dataMatricula: matricula.dataMatricula,
                idMatricula: matricula.idMatricula
            };
        
            const queryParams = new URLSearchParams(dadosParaEnviar).toString();
        
            window.location.href = `atualizar-matricula.html?${queryParams}`;
        });

        const iconExcluir = document.createElement('img'); 
        iconExcluir.src = 'assets/icons/trash-fill.svg'; 
        iconExcluir.alt = 'Ícone de excluir';
        iconExcluir.addEventListener('click', () => excluirMatricula(matricula.idMatricula));

        //chamando
        linha.appendChild(idMatricula);
        linha.appendChild(nomeAluno);
        linha.appendChild(nomeCurso);
        linha.appendChild(dataMatricula);
        tdAcoes.appendChild(iconAtualizar); // Adiciona o <img> dentro da célula <td>
        linha.appendChild(tdAcoes); // Adiciona a célula de imagem à linha
        tdAcoes.appendChild(iconExcluir); // Adiciona o <img> dentro da célula <td>

        // Adiciona a linha preenchida à tabela
        tabela.appendChild(linha);

    });

    async function excluirMatricula(idMatricula) {
        const matriculaDTO = {
            statusMatricula: false
        };
    
        try {
            const response = await fetch(`http://localhost:3333/remove/matricula?idMatricula=${idMatricula}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(matriculaDTO)
            });
    
            if (response.ok) {
                alert('Matricula removida com sucesso');
                window.location.reload();
            } else {
                const error = await response.json();
                alert(`Erro: ${error}`);
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
            alert('Erro ao tentar excluir a matricula.');
        }
    }
}