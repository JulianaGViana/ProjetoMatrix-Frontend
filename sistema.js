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
	    var check = -1;
	    for(var i = 0; i < participantes.length; i++){
		    if(participantes[i].email === email){
			    check = 1;
		    }
	    }
	    
	    if(check === -1){
		    var p = new Participante();
		    p.nome = nome;
		    p.sobrenome = sobrenome;
		    p.email = email;
		    p.idade = idade;
		    p.sexo = sexo;
		    
		    participantes.push(p);
	    }else{
		    throw new Participante();
	    }							
    }

    function removerParticipante(email) {
	    //implemente o código necessário
	    for(var i = 0; i < participantes.length; i++){
		    if(participantes[i].email === email){
			    participantes.splice(i,1);
		    }
	    }			
    }
	
    function buscarParticipantesPorNome(nome){
	    //implemente o código necessário
	    var array = [];
	    for(var i = 0; i < participantes.length; i++){
		    if(participantes[i].nome === nome){
			    array.push(participantes[i]);
		    }
	    }
	    return array;
    }
	
    function buscarParticipantesPorSexo(sexo){
	    //implemente o código necessário
	    var array = [];
	    for(var i = 0; i < participantes.length; i++){
		    if(participantes[i].sexo === sexo){
			    array.push(participantes[i]);
		    }
	    }
	    return array;
    }
	
    function buscarParticipantesAprovados(){
	    //implemente o código necessário
	    var aprovados = [];
	    for(var i = 0; i < participantes.length; i++){
		    if(participantes[i].aprovado){
			    aprovados[i] = participantes[i].aprovado;
		    }
	    }
	    return aprovados;			
    }
	
    function buscarParticipantesReprovados(){
	    //implemente o código necessário
	    var reprovados = [];
	    for(var i = 0; i < participantes.length; i++){
		    if(participantes[i].aprovado === false){
			    reprovados[i] = participantes[i].aprovado;
		    }
	    }
	    return reprovados;
    }
	
    function obterParticipante(email){
	    //implemente o código necessário
	    for(var i = 0; i < participantes.length; i++){
		    if(participantes[i].email === email){
			    return participantes[i];
		    }
	    }
    }
	
    function adicionarNotaAoParticipante(email, nota){
	    //implemente o código necessário
	    for(var i = 0; i < participantes.length; i++){
		    if(participantes[i].email === email){
			    participantes[i].nota = nota;
			    if(participantes[i].nota >= 70){
				    participantes[i].aprovado = true;
			    }
			    else{
				    participantes[i].aprovado = false;
			    }
		    }
	    }
    }
	
    function obterMediaDasNotasDosParticipantes(){
	    //implemente o código necessário
	    var soma = 0;
	    for(var i = 0; i < participantes.length; i++){
		    soma += participantes[i].nota;
	    }
	    return soma/participantes.length;
    }
	
    function obterTotalDeParticipantes(){
	    return participantes.length;
    }
	
    function verificarSeParticipanteEstaAprovado(email){
	    //implemente o código necessário
	    for(var i = 0; i < participantes.length; i++){
		    if(participantes[i].email === email){
			    return participantes[i].aprovado;
		    }
	    }
    }
	
    function obterQuantidadeDeParticipantesPorSexo(sexo){
	    //implemente o código necessário
	    var resultado = 0;
	    for(var i = 0; i < participantes.length; i++){
		    if(participantes[i].sexo === sexo){
			    resultado++;
		    }
	    }
	    return resultado;
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
