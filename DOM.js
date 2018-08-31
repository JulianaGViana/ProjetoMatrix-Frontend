var sistema = new SistemaCadastro();
var valorRadio = 0;
var edicao = false;
var idParticipante = 0;

function inicioProcesso(){
	modificarTabela();
}

function alterarParticipante(id){
	idParticipante = id;
	checarRadio();
	sistema.obterParticipante(id)
	.then(function(participante){
		document.getElementById("nomeParticipante").value = participante.nome,
		document.getElementById("sobrenomeParticipante").value = participante.sobrenome;
		document.getElementById("emailParticipante").value = participante.email;
		document.getElementById("emailParticipante").disabled = true;
		document.getElementById("idadeParticipante").value = participante.idade;
		document.getElementById("notaParticipante").value = participante.nota;
		valorRadio;
		edicao = true;
	});
}

function excluirParticipante(id){
	sistema.removerParticipante(id)
	.then(function(){
		window.location.reload(true);
	})
}

function modificarTabela(){
    sistema.obterParticipantes() 
    .then(function(res){
    	res.forEach(function(elemento, index){
        	document.querySelector('#informacoes').innerHTML += "<tr><td>"+(index+1)+"</td><td>"+elemento.nome+" "+elemento.sobrenome+"</td><td>"+elemento.idade+"</td><td>"+elemento.sexo+"</td><td>"+elemento.nota+"</td><td>"+elemento.aprovado+"</td><td>"+'<a href="javascript:void(0)" onclick="alterarParticipante(\''+elemento.id+'\')">Editar Participante</a>'+' | '+'<a href="javascript:void(0)" onclick="excluirParticipante(\''+elemento.id+'\')">Excluir Participante</a>'+"</td></tr>";
    	});
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

function criticaCampo(){
	if(document.getElementById("nomeParticipante").value === "" || document.getElementById("sobrenomeParticipante").value === "" || document.getElementById("emailParticipante").value === "" || document.getElementById("idadeParticipante").value === "" || document.getElementById("notaParticipante").value === "")
	{
		return true;
	}
	else
		return false;
}

inicioProcesso();
var salvar = document.getElementById("salvarCadastro");
salvar.addEventListener('click', function(e){
	criticaCampo();
	if(criticaCampo())
		alert("Os campos não podem permanecer vazios!");
	else{
		if(edicao){
			checarRadio();
			sistema.editarParticipante(
				idParticipante,
				document.getElementById("nomeParticipante").value,
				document.getElementById("sobrenomeParticipante").value,
				document.getElementById("emailParticipante").value,
				document.getElementById("idadeParticipante").value,
				valorRadio,
				document.getElementById("notaParticipante").value
			)
			.then(function(){
				window.location.reload(true);
			});
		}
		else
		{
			checarRadio();
			sistema.adicionarParticipante(
				document.getElementById("nomeParticipante").value,
				document.getElementById("sobrenomeParticipante").value,
				document.getElementById("emailParticipante").value,
				document.getElementById("idadeParticipante").value,
				valorRadio,
				document.getElementById("notaParticipante").value
			)
			.then(function(){
				window.location.reload(true);
			})
			.catch(function(error){
				alert(error);
				window.location.reload(true);
			});
	}
	desabilitarEdicao();
	}
});