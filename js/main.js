async function buscaEndereco(cep) {
    try {
        var mensagem = document.getElementById("erro");
        mensagem.innerHTML = "";
        var consultaCep = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        var consultaCepJson = await consultaCep.json();
        if (consultaCepJson.erro) {
            throw Error("CEP não encontrado");
        } else {
            preencheEndereco(consultaCepJson);
        }
        console.log(consultaCepJson);
        return consultaCepJson;
    } catch (erro) {
        console.log(erro);
        mensagem.innerHTML = `<p>CEP Inválido, Informe outro CEP</p>`;
    }
}
var cep = document.getElementById("cep");
cep.addEventListener("focusout", () => buscaEndereco(cep.value));

function preencheEndereco(endereco) {
    preencheCampo(document.getElementById("endereco"), endereco.logradouro);
    preencheCampo(document.getElementById("bairro"), endereco.bairro);
    preencheCampo(document.getElementById("cidade"), endereco.localidade);
    preencheCampo(document.getElementById("estado"), endereco.uf);
}

function preencheCampo(element, valor) {
    element.value = valor;
    if (element.value != "") {
        element.disabled = true;
    }
}