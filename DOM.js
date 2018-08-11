var sistema = new SistemaCadastro();
var valorRadio = 0;
var edicao = false;

function inicioProcesso(){
	modificarTabela();
}

function alterarParticipante(email){
	checarRadio();
	var participante = sistema.obterParticipante(email);
	document.getElementById("nomeParticipante").value = participante.nome,
	document.getElementById("sobrenomeParticipante").value = participante.sobrenome;
	document.getElementById("emailParticipante").value = participante.email;
	document.getElementById("emailParticipante").disabled = true;
	document.getElementById("idadeParticipante").value = participante.idade;
	document.getElementById("notaParticipante").value = participante.nota;
	valorRadio;
	edicao = true;
}

function excluirParticipante(email){
	sistema.removerParticipante(email);
	modificarTabela();
	window.location.reload(true);
}

function modificarTabela(){
    sistema.obterParticipantes().forEach(function(elemento, index){
        document.querySelector('#informacoes').innerHTML += "<tr><td>"+(index+1)+"</td><td>"+elemento.nome+" "+elemento.sobrenome+"</td><td>"+elemento.idade+"</td><td>"+elemento.sexo+"</td><td>"+elemento.nota+"</td><td>"+elemento.aprovado+"</td><td>"+'<a href="javascript:void(0)" onclick="alterarParticipante(\''+elemento.email+'\')">Editar Participante</a>'+' | '+'<a href="javascript:void(0)" onclick="excluirParticipante(\''+elemento.email+'\')">Excluir Participante</a>'+"</td></tr>";
    });
}

function checarRadio(){
    if(document.getElementById("sexoMasculino").checked){
        valorRadio = 1;
    }
    else{
        valorRadio = 2;
    }
}

function desabilitarEdicao(){
	edicao = false;
	document.getElementById("emailParticipante").disabled = false;
}

inicioProcesso();
var salvar = document.getElementById("salvarCadastro");
salvar.addEventListener('click', function(e){
	if(edicao){
		checarRadio();
		sistema.editarParticipante(
			document.getElementById("nomeParticipante").value,
			document.getElementById("sobrenomeParticipante").value,
			document.getElementById("emailParticipante").value,
			document.getElementById("idadeParticipante").value,
			valorRadio,
			document.getElementById("notaParticipante").value
			);
			modificarTabela();
			window.location.reload(true);
	}
	else
	{
		try{
			checarRadio();
			sistema.adicionarParticipante(
				document.getElementById("nomeParticipante").value,
				document.getElementById("sobrenomeParticipante").value,
				document.getElementById("emailParticipante").value,
				document.getElementById("idadeParticipante").value,
				valorRadio
			);

			sistema.adicionarNotaAoParticipante(
				document.getElementById("emailParticipante").value,
				document.getElementById("notaParticipante").value
				);
			modificarTabela();
			window.location.reload(true);
		}catch(Error){
			window.alert(Error.message);
		}
	}
	desabilitarEdicao();
});