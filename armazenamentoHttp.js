function armazenamentoHTTP(){
	
	obterTodosOsElementos();

	function obterElemento(id){
		return axios.get('http://matrix.avalie.net/api/participantes/'+id)
			.then(function(res){
				return res.data;
			});
	}

	function obterElementos(atributo, elemento){
		var elementos = obterTodosOsElementos();
		return elementos.filter(function(objeto){
			return objeto[atributo] === elemento;
		});
	}

	function obterTodosOsElementos(){
		return axios.get('http://matrix.avalie.net/api/participantes/')
			.then(function(res){
				return res.data;
			});
	}
	
	function adicionar(elemento){
		return axios.post('http://matrix.avalie.net/api/participantes/', elemento)
			.then(function(res){
				return res.data;
			}).catch(function(error){
				throw error.response.data.message;
			});
	}

	function editar(elemento){
		return axios.put('http://matrix.avalie.net/api/participantes/'+elemento.id, elemento)	
			.then(function(data){
				console.log(data);
			});
	}

	function remover(id){
		return axios.delete('http://matrix.avalie.net/api/participantes/'+id)
			.then(function(data) {
				console.log(data);
			});
	}

	return {
		obterElemento,
		obterElementos,
		obterTodosOsElementos,
		adicionar,
		editar,
		remover,
	};
}