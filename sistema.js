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

    function adicionarParticipante(nome, sobrenome, email, idade, sexo, nota) {
        //implemente o código necessário
            var p = new Participante();
            p.nome = nome;
            p.sobrenome = sobrenome;
            p.email = email;
            p.idade = idade;
            p.sexo = sexo;
            p.nota = nota;
            p.aprovado = p.nota >= 70;

            return armazenamento.adicionar(p);                       
    }

    function removerParticipante(id) {
        //implemente o código necessário
            return armazenamento.remover(id);
    }

    function editarParticipante(id, nome, sobrenome, email, idade, sexo, nota){
        return obterParticipante(id)
        .then(function(participante){
            participante.nome = nome;
            participante.sobrenome = sobrenome;
            participante.idade = idade;
            participante.sexo = sexo;
            participante.nota = nota;
            participante.aprovado = participante.nota >= 70;
            return armazenamento.editar(participante);
        });
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
    
    function obterParticipante(id){
        //implemente o código necessário
        return armazenamento.obterElemento(id);
    }

    function obterParticipantes(){
        return armazenamento.obterTodosOsElementos();
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
    
    function verificarSeParticipanteEstaAprovado(id){
        //implemente o código necessário
        var participante = obterParticipante(id);
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
        obterMediaDasNotasDosParticipantes,
        obterTotalDeParticipantes,
        verificarSeParticipanteEstaAprovado,
        obterQuantidadeDeParticipantesPorSexo     
    };
}
