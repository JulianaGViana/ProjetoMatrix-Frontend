//Objeto Participante
function Participante() {
    this.nome = "";
    this.sobrenome = "";
    this.email = "";
    this.idade = 0
    this.sexo = 0
    this.nota = 0
    this.aprovado = false
}

/***********************
 * Representa o sistema
 * Uma vez instanciado, deve-se usar essa mesma
 * instancia em todas as operações.
 */
function SistemaCadastro() {

    //Onde os participantes ficarão armazenados
    var participantes = [];

    function adicionarParticipante(nome, sobrenome, email, idade, sexo) {
	    //implemente o código necessário

	    if(obterParticipante(email) === undefined){
		    var p = new Participante();
		    p.nome = nome;
		    p.sobrenome = sobrenome;
		    p.email = email;
		    p.idade = idade;
		    p.sexo = sexo;

		    participantes.push(p);
	    }
	    else
	    {
		    throw new Error("O email já existe no sistema.");
	    }										
    }

    function removerParticipante(email) {
	    //implemente o código necessário
	    function encontrarIndice(elemento){
		    return elemento.email === email;
	    }
	    var index = 0;
	    index = participantes.findIndex(encontrarIndice);
	    participantes.splice(index, 1);
    }
	
    function buscarParticipantesPorNome(nome){
	    //implemente o código necessário
		function buscar(elemento){
			return elemento.nome === nome;
		}
	    return participantes.filter(buscar);
    }
	
    function buscarParticipantesPorSexo(sexo){
	    //implemente o código necessário
		function buscar(elemento){
			return elemento.sexo === sexo;
		}
	    return participantes.filter(buscar);
    }
	
    function buscarParticipantesAprovados(){
	    //implemente o código necessário
		function buscar(elemento){
			return elemento.aprovado;
		}
	    return participantes.filter(buscar);
    }
	
    function buscarParticipantesReprovados(){
	    //implemente o código necessário
		function buscar(elemento){
			return !elemento.aprovado;
		}
	    return participantes.filter(buscar);
    }
	
    function obterParticipante(email){
	    //implemente o código necessário
		function encontrarParticipante(elemento){
			return elemento.email === email;
		}
	    return participantes.find(encontrarParticipante);
    }
	
    function adicionarNotaAoParticipante(email, nota){
	    //implemente o código necessário
		function buscarParticipante(elemento){
			return elemento.email === email;
		}
	    var index = participantes.findIndex(buscarParticipante);
	    participantes[index].nota = nota;
	    return participantes[index].nota >= 70 ? participantes[index].aprovado = true : participantes[index].aprovado = false;
    }
	
    function obterMediaDasNotasDosParticipantes(){
	    //implemente o código necessário
		function somar(soma, elemento){
			return soma + elemento.nota;
		}
	    var resultado = participantes.reduce(somar, 0);
	    return resultado/participantes.length;
    }
	
    function obterTotalDeParticipantes(){
	    return participantes.length;
    }
	
    function verificarSeParticipanteEstaAprovado(email){
	    //implemente o código necessário
		function verificar(elemento){
			return elemento.email === email ? elemento.aprovado : false;
		}
	    return participantes.find(verificar);
    }
	
    function obterQuantidadeDeParticipantesPorSexo(sexo){
	    //implemente o código necessário
		var quantidade = 0;
		function processarQuantidade(elemento){
			if(elemento.sexo === sexo){
				quantidade++;
			}
		}
	    participantes.forEach(processarQuantidade);
	    return quantidade;
    }

    return {
        adicionarParticipante,
        removerParticipante,
        buscarParticipantesPorNome,
        buscarParticipantesPorSexo,
        buscarParticipantesAprovados,
        buscarParticipantesReprovados,
        obterParticipante,
        adicionarNotaAoParticipante,
        obterMediaDasNotasDosParticipantes,
        obterTotalDeParticipantes,
        verificarSeParticipanteEstaAprovado,
        obterQuantidadeDeParticipantesPorSexo    
    };
}
