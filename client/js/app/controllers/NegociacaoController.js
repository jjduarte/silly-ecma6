class NegociacaoController {
	constructor() {
		let $ = document.querySelector.bind(document);

		this._data = $('#data');
		this._quantidade = $('#quantidade');
		this._valor = $('#valor');
		this._ordemAtual = '';
		
		this._listaNegociacoes = new Bind(
				new ListaNegociacoes(), 
				new NegociacoesView($('#negociacoesView')),
				'adiciona', 'esvazia', 'ordena', 'inverteOrdem'
			);

		this._mensagem = new Bind(new Mensagem(), new MensagemView($('#mensagemView')), 'texto');
		
	}

	apaga(){
		event.preventDefault();

		this._listaNegociacoes.esvazia();

		this._mensagem.texto = "Lista esvaziada com sucesso."
	}

	adiciona(envet){		
		event.preventDefault();

		this._listaNegociacoes.adiciona(this._criaNegociacao());

		this._mensagem.texto = "Negociacao adicionada com sucesso."

		this._limpaFormulario();
	}

	importaNegociacoes() {
		let service = new NegociacaoService();

		service.obterTodasNegociacoes()
			.then(negociacoes => {
				negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
				this._mensagem.texto = "Negociações importadas com sucesso!"
			})
			.catch(erro => this._mensagem.texto = erro);

	}

	_criaNegociacao(){
		console.log("Criando negociacao");
		return new Negociacao(
			DateHelper.textoParaData(this._data.value),
			this._quantidade.value,
			this._valor.value
		);
	}

	ordena(coluna) {
        if(this._ordemAtual == coluna) {
            this._listaNegociacoes.inverteOrdem();
        } else {
            this._listaNegociacoes.ordena((a, b) => a[coluna] - b[coluna]);
        }
        this._ordemAtual = coluna;
    }

	_limpaFormulario(){
		this._data.value = '';
		this._valor.value = 0.0;
		this._quantidade.value = 1;

		this._data.focus();
	}
}