const params = new URLSearchParams(window.location.search);

const dadosCurso = {
    nome: params.get('nome'),
    area: params.get('area'),
    cargaHoraria: params.get('cargaHoraria'),
    idCurso: params.get('idCurso'),
};

console.log(dadosCurso);

document.querySelectorAll("input")[0].value = dadosCurso.idCurso;
document.querySelectorAll("input")[1].value = dadosAluno.nome;
document.querySelectorAll("input")[2].value = dadosAluno.area;
document.querySelectorAll("input")[3].value = dadosAluno.cargaHoraria;


async function atualizaFormulario() {
    const cursoDTO = {
        "idCurso": Number(document.querySelectorAll("input")[0].value),
        "nome": document.querySelectorAll("input")[1].value,
        "area": document.querySelectorAll("input")[2].value,
        "cargaHoraria": document.querySelectorAll("input")[3].value

    }

    try {
        const respostaServidor = await fetch(`http://localhost:3333/atualiza/curso?idCurso=${cursoDTO.idCurso}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cursoDTO)
        });

        if (!respostaServidor.ok) {
            throw new Error("Erro ao atualizar os dados no servidor. Contate o administrador do sistema");
        }

        alert("Dados do curso atualizados com sucesso!");
    } catch (error) {
        console.log(error);
        alert(`Erro ao se comunicar com o servidor. ${error}`);
    }
}

