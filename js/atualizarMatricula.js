const params = new URLSearchParams(window.location.search);

const dadosMatricula = {
    idAluno: params.get('idAluno'),
    idCurso: params.get('idCurso'),
    dataMatricula: params.get('dataMatricula'),
    idMatricula: params.get('idMatricula'),
};

console.log(dadosMatricula);

document.querySelectorAll("input")[0].value = dadosMatricula.idMatricula;
document.querySelectorAll("input")[1].value = dadosMatricula.idAluno;
document.querySelectorAll("input")[2].value = dadosMatricula.idCurso;
document.querySelectorAll("input")[3].value = dadosMatricula.dataMatricula;


async function atualizaFormulario() {
    const matriculaDTO = {
        "idMatricula": Number(document.querySelectorAll("input")[0].value),
        "idAluno": Number(document.querySelectorAll("input")[1].value),
        "idCurso": Number(document.querySelectorAll("input")[2].value),
        "dataMatricula": document.querySelectorAll("input")[3].value

    }

    try {
        const respostaServidor = await fetch(`http://localhost:3333/atualiza/matricula?idMatricula=${matriculaDTO.idMatricula}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(matriculaDTO)
        });
        console.log(respostaServidor)
        if (!respostaServidor.ok) {
            throw new Error("Erro ao atualizar os dados no servidor. Contate o administrador do sistema");
        }

        alert("Dados da matricula atualizados com sucesso!");
    } catch (error) {
        console.log(error);
        alert(`Erro ao se comunicar com o servidor. ${error}`);
    }
}

