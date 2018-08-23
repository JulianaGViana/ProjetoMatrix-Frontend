function armazenamentoHTTP(){

	obterTodosOsElementos();

	function obterElemento(atributo, elemento){
		var elementos = obterTodosOsElementos();
		return elementos.find(function(objeto){
			return objeto[atributo] === elemento;
		});
	}

	function obterElementos(atributo, elemento){
		var elementos = obterTodosOsElementos();
		return elementos.filter(function(objeto){
			return objeto[atributo] === elemento;
		});
	}

	function obterTodosOsElementos(){
		var dados = [];
		$.ajax({
			type: "GET",
			url: 'http://matrix.avalie.net/api/participantes/',
			dataType: "json",
			async: false,
			success: function(data){
				dados = data;
			}
		});
		return dados;
	}

	function adicionar(elemento){
		var arrayJSON = JSON.stringify(elemento);
		$.ajax({
			type: "POST",
			url: 'http://matrix.avalie.net/api/participantes/',
			contentType: "application/json",
			dataType: "json",
			data: arrayJSON,
			async: false,
			success: function() {
				console.log("Participante adicionado com sucesso!");
			}
		});
	}

	function editar(atributo, elemento){
		var arrayJSON = JSON.stringify(elemento);
		$.ajax({
			type: "PUT",
			url: 'http://matrix.avalie.net/api/participantes/'+elemento.id, 
			contentType: "application/json",
			dataType: "json", 
			data: arrayJSON,
			async: false,
			success: function(){
				console.log("Participante editado com sucesso!");
			}
		});
	}

	function remover(atributo, elemento){
		var pessoa = obterElemento(atributo, elemento);
		$.ajax({
			type: "DELETE",
			url: 'http://matrix.avalie.net/api/participantes/'+pessoa.id,
			dataType: "json",
			async: true,
		});
	}

	return {
		obterElemento,
		obterElementos,
		obterTodosOsElementos,
		adicionar,
		editar,
		remover
	};
}