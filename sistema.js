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
    const armazenamento = new armazenamentoHTTP();

    function adicionarParticipante(nome, sobrenome, email, idade, sexo) {
        //implemente o código necessário
        if(obterParticipante(email) === undefined){
            var p = new Participante();
            p.nome = nome;
            p.sobrenome = sobrenome;
            p.email = email;
            p.idade = idade;
            p.sexo = sexo;

            armazenamento.adicionar(p); 
        }
        else
        {
            throw new Error('O email já existe no sistema.');
        }                       
    }

    function removerParticipante(email) {
        //implemente o código necessário
            armazenamento.remover("email", email);
    }

    function editarParticipante(nome, sobrenome, email, idade, sexo, nota){
        var participante = obterParticipante(email);
        participante.nome = nome;
        participante.sobrenome = sobrenome;
        participante.idade = idade;
        participante.sexo = sexo;
        alterarNotaDoParticipante(participante, nota);
        armazenamento.editar("email", participante);
    }
    
    function buscarParticipantesPorNome(nome){
        //implemente o código necessário
        return armazenamento.obterElementos("nome", nome);
    }
    
    function buscarParticipantesPorSexo(sexo){
        //implemente o código necessário
        return armazenamento.obterElementos("sexo", sexo);
    }
    
    function buscarParticipantesAprovados(){
        //implemente o código necessário
        return armazenamento.obterElementos("aprovado", true);
    }
    
    function buscarParticipantesReprovados(){
        //implemente o código necessário
        return armazenamento.obterElementos("aprovado", false);
    }
    
    function obterParticipante(email){
        //implemente o código necessário
        return armazenamento.obterElemento("email", email);
    }

    function obterParticipantes(){
        return armazenamento.obterTodosOsElementos();
    }
    
    function alterarNotaDoParticipante(participante, nota){
        participante.nota = nota;
        participante.aprovado = participante.nota >= 70;
    }
    

    function adicionarNotaAoParticipante(email, nota){
        //implemente o código necessário
        var participante = obterParticipante(email);
        alterarNotaDoParticipante(participante, nota);
        armazenamento.editar("email", participante);
    }

    function obterMediaDasNotasDosParticipantes(){
        //implemente o código necessário
        var participantes = armazenamento.obterTodosOsElementos();
        function somar(soma, elemento){
            return soma + elemento.nota;
        }
        var resultado = participantes.reduce(somar, 0);
        return resultado/participantes.length;
    }
    
    function obterTotalDeParticipantes(){
        return armazenamento.obterTodosOsElementos().length;
    }
    
    function verificarSeParticipanteEstaAprovado(email){
        //implemente o código necessário
        var participante = obterParticipante(email);
        if(participante)
            return participante.aprovado;
    }
    
    function obterQuantidadeDeParticipantesPorSexo(sexo){
        //implemente o código necessário
        return buscarParticipantesPorSexo(sexo).length;
    }

    return {
        adicionarParticipante,
        removerParticipante,
        editarParticipante,
        buscarParticipantesPorNome,
        buscarParticipantesPorSexo,
        buscarParticipantesAprovados,
        buscarParticipantesReprovados,
        obterParticipante,
        obterParticipantes,
        adicionarNotaAoParticipante,
        obterMediaDasNotasDosParticipantes,
        obterTotalDeParticipantes,
        verificarSeParticipanteEstaAprovado,
        obterQuantidadeDeParticipantesPorSexo     
    };
}
