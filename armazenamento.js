function Armazenamento(key){
    if(window.localStorage.getItem(key) === null)
        window.localStorage.setItem(key, "[]"); 

    function serializar(elementosProcessados){
        var array = JSON.stringify(elementosProcessados);
        window.localStorage.setItem(key, array);
    }

    function deserializar(){
        return JSON.parse(window.localStorage.getItem(key));
    }

    function obterElemento(atributo, elemento){
        var elementos = deserializar();
        return elementos.find(function(objeto){
            return objeto[atributo] === elemento;
        });
    }

    function obterElementos(atributo, elemento){
        var elementos = deserializar();
        return elementos.filter(function(objeto){
            return objeto[atributo] === elemento;
        });
    }

    function obterTodosOsElementos(){
        return deserializar();
    }
    
    function adicionar(objeto){
        var elementos = deserializar();
        elementos.push(objeto); 
        serializar(elementos);
    }

    function remover(atributo, elemento){
        var elementos = deserializar();
        var index = elementos.findIndex(function(objeto){
            return objeto[atributo] === elemento;
        });
        elementos.splice(index, 1);
        serializar(elementos);
    }

    function editar(atributo, objetoRecebido){
        var elementos = deserializar();
        var index = elementos.findIndex(function(objeto){
            return objeto[atributo] === objetoRecebido[atributo];
        });
        elementos[index] = objetoRecebido;
        serializar(elementos);
    }

    return{
        serializar,
        deserializar,
        obterElemento,
        obterElementos,
        obterTodosOsElementos,
        adicionar,
        remover,
        editar
    };
}