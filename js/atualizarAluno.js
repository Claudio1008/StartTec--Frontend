const params = new URLSearchParams(window.location.search);

const dadosAluno = {
    celular: params.get('celular'),
    email: params.get('email'),
    cpf: params.get('cpf'),
    nomeInteiro: params.get('nomeAluno'),
    idAluno: params.get('idAluno'),
};

console.log(dadosAluno);

document.querySelectorAll("input")[0].value = dadosAluno.idAluno;
document.querySelectorAll("input")[1].value = dadosAluno.nomeInteiro;
document.querySelectorAll("input")[2].value = dadosAluno.cpf
document.querySelectorAll("input")[3].value = dadosAluno.email;
document.querySelectorAll("input")[4].value = dadosAluno.celular;


async function atualizaFormulario() {
    const alunoDTO = {
        "idAluno": Number(document.querySelectorAll("input")[0].value),
        "nomeInteiro": document.querySelectorAll("input")[1].value,
        "cpf": document.querySelectorAll("input")[2].value,
        "celular": Number(document.querySelectorAll("input")[3].value),
        "email": document.querySelectorAll("input")[4].value

    }

    try {
        const respostaServidor = await fetch(`http://localhost:3333/atualizar/idAluno=${alunoDTO.idAluno}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(alunoDTO)
        });

        if (!respostaServidor.ok) {
            throw new Error("Erro ao atualizar os dados no servidor. Contate o administrador do sistema");
        }

        alert("Dados do aluno atualizados com sucesso!");
    } catch (error) {
        console.log(error);
        alert(`Erro ao se comunicar com o servidor. ${error}`);
    }
}

