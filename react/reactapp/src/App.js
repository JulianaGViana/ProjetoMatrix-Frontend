import React, { Component } from "react";
import axios from "axios";

class App extends Component {
  constructor() {
    super();
    this.state = {
      participantes: [],
      edicao: false
    };
  }

  elemento = {
    nome: null,
    sobrenome: null,
    email: null,
    idade: null,
    sexo: null,
    nota: null,
    aprovado: null
  };

  setNomeParticipante(event) {
    this.elemento.nome = event.target.value;
  }

  setSobrenomeParticipante(event) {
    this.elemento.sobrenome = event.target.value;
  }

  setEmailParticipante(event) {
    this.elemento.email = event.target.value;
  }

  setIdadeParticipante(event) {
    this.elemento.idade = event.target.value;
  }

  setNotaParticipante(event) {
    this.elemento.nota = event.target.value;
    this.elemento.aprovado = event.target.value >= 70;
  }

  setSexoParticipante(event) {
    this.elemento.sexo = event.target.value;
  }

  componentDidMount() {
    axios.get("http://matrix.avalie.net/api/participantes/").then(res => {
      const participantes = res.data;
      this.setState({ participantes });
    });
  }

  render() {
    return (
      <div>
        {this.criarForm()}
        {this.criarTabela()}
      </div>
    );
  }

  criarForm() {
    return (
      <form onSubmit={event => this.salvarParticipante(event)}>
        <div>
          <h1>Cadastro de Participantes</h1>
        </div>
        <div className="form-group row col-md-5">
          <label className="col-sm-2 col-form-label">Nome:</label>
          <div className="col-sm-10">
            <input
              ref="entradaNome"
              id="nome"
              type="text"
              name="nome"
              className="form-control"
              value={this.state.nomeParticipante}
              onInput={e => {
                this.setNomeParticipante(e);
              }}
            />
          </div>
        </div>

        <div className="form-group row col-md-5">
          <label className="col-sm-2 col-form-label">Sobrenome:</label>
          <div className="col-sm-10">
            <input
              ref="entradaSobrenome"
              id="sobrenome"
              type="text"
              name="sobrenome"
              className="form-control"
              value={this.state.sobrenomeParticipante}
              onInput={e => {
                this.setSobrenomeParticipante(e);
              }}
            />
          </div>
        </div>

        <div className="form-group row col-md-5">
          <label className="col-sm-2 col-form-label">Email:</label>
          <div className="col-sm-10">
            <input
              ref="entradaEmail"
              id="email"
              type="text"
              name="email"
              className="form-control"
              value={this.state.emailParticipante}
              onInput={e => {
                this.setEmailParticipante(e);
              }}
            />
          </div>
        </div>

        <div className="form-group row col-md-5">
          <label className="col-sm-2 col-form-label">Idade:</label>
          <div className="col-sm-10">
            <input
              ref="entradaIdade"
              id="idade"
              type="number"
              name="idade"
              className="form-control"
              value={this.state.idadeParticipante}
              onInput={e => {
                this.setIdadeParticipante(e);
              }}
            />
          </div>
        </div>

        <div className="form-group row col-md-5">
          <label className="col-sm-2 col-form-label">Nota:</label>
          <div className="col-sm-10">
            <input
              ref="entradaNota"
              id="nota"
              type="number"
              className="form-control"
              value={this.state.notaParticipante}
              onInput={e => {
                this.setNotaParticipante(e);
              }}
            />
          </div>
        </div>

        <div className="form-group row col-md-5">
          <label className="col-form-label col-sm-2 pt-0">Sexo:</label>
          <div className="col-sm-10">
            <div className="form-check form-check-inline">
              <input
                ref="sexoMasculino"
                className="form-check-input"
                type="radio"
                name="inlineRadioOptions"
                id="sexoMasculino"
                value="1"
                onInput={event => {
                  this.setSexoParticipante(event);
                }}
              />
              <label className="form-check-label"> Masculino </label>
            </div>

            <div className="form-check form-check-inline">
              <input
                ref="sexoFeminino"
                className="form-check-input"
                type="radio"
                name="inlineRadioOptions"
                id="sexoFeminino"
                value="2"
                onInput={event => {
                  this.setSexoParticipante(event);
                }}
              />
              <label className="form-check-label"> Feminino </label>
            </div>
          </div>
        </div>

        <div className="form-group row col-md-5">
          <div className="col-sm-10">
            <button
              type="submit"
              className="btn btn-primary"
              id="salvarCadastro"
            >
              Salvar
            </button>
          </div>
        </div>
      </form>
    );
  }

  criarTabela() {
    return (
      <div>
        <table className="table" id="tabela">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Nº</th>
              <th scope="col">Nome Completo</th>
              <th scope="col">Idade</th>
              <th scope="col">Sexo</th>
              <th scope="col">Nota</th>
              <th scope="col">Aprovado</th>
              <th scope="col">#</th>
            </tr>
          </thead>
          {this.setarInformacoes()}
        </table>
      </div>
    );
  }

  setarInformacoes() {
    return (
      <tbody id="tabela">
        {this.state.participantes.map(elemento => {
          var aprovacao = elemento.aprovado ? "Aprovado" : "Reprovado";
          return (
            <tr>
              <td>{elemento.id}</td>
              <td>
                {elemento.nome} {elemento.sobrenome}
              </td>
              <td>{elemento.idade}</td>
              <td>{elemento.sexo}</td>
              <td>{elemento.nota}</td>
              <td>{aprovacao}</td>
              <td>
                <a
                  href="javascript:void(0)"
                  onClick={event => {
                    this.alterarParticipante(elemento.id);
                  }}
                >
                  Editar Participante
                </a>
                |
                <a
                  href="javascript:void(0)"
                  onClick={event => {
                    this.excluirParticipante(elemento.id);
                  }}
                >
                  Excluir Participante
                </a>
              </td>
            </tr>
          );
        })}
      </tbody>
    );
  }

  salvarParticipante(event) {
    event.preventDefault();

    if (this.state.edicao) {
      console.log("No IF");
      console.log(this.elemento);
      axios
        .put(
          "http://matrix.avalie.net/api/participantes/" + this.elemento.id,
          this.elemento
        )
        .then(res => {
          console.log(res.data);
          alert("Participante editado com sucesso!");
          window.location.reload(true);
        });
    } else {
      console.log("No ELSE");
      axios
        .post("http://matrix.avalie.net/api/participantes/", this.elemento)
        .then(res => {
          alert("Participante adicionado com sucesso!");
        })
        .catch(error => {
          alert(error);
        })
        .then(function() {
          window.location.reload(true);
        });
    }
  }

  obterElemento(id) {
    return axios
      .get("http://matrix.avalie.net/api/participantes/" + id)
      .then(res => {
        return res.data;
      });
  }

  alterarParticipante(id) {
    this.obterElemento(id).then(participante => {
      this.state.edicao = true;
      this.elemento = participante;
      console.log(this.elemento);
      (this.refs.entradaNome.value = participante.nome),
        (this.refs.entradaSobrenome.value = participante.sobrenome),
        (this.refs.entradaEmail.value = participante.email),
        (this.refs.entradaIdade.value = participante.idade),
        (this.refs.entradaNota.value = participante.nota),
        participante.sexo === 1
          ? (this.refs.sexoMasculino.checked = true)
          : (this.refs.sexoFeminino.checked = true);
    });
  }

  excluirParticipante(id) {
    axios
      .delete("http://matrix.avalie.net/api/participantes/" + id)
      .then(function() {
        alert("Excluído!");
      })
      .then(function() {
        window.location.reload(true);
      });
  }
}

export default App;
