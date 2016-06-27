class NegociacaoService {

	constructor() {
		this._service = new HttpService();
	}

	_obterNegociacoesDaSemana(){

		return new Promise((resolve, reject) =>{
					this._service.get('negociacoes/semana')
					.then(negociacoes => {
						resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
					})
					.catch(error => {
						console.log('Requisicao com problema');
						reject('Não foi possível recuperar as negociacoes da semana');
					});
				});
	}

	_obterNegociacoesDaSemanaAnterior(){

		return new Promise((resolve, reject) =>{
					this._service.get('negociacoes/anterior')
					.then(negociacoes => {
						resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
					})
					.catch(error => {
						console.log('Requisicao com problema');
						reject('Não foi possível recuperar as negociacoes da semana anterior');
					});
				});
	}
	_obterNegociacoesDaSemanaRetrasada(){

		return new Promise((resolve, reject) =>{
					this._service.get('negociacoes/retrasada')
					.then(negociacoes => {
						resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
					})
					.catch(error => {
						console.log('Requisicao com problema');
						reject('Não foi possível recuperar as negociacoes da semana retrasada');
					});
				});
	}

	obterTodasNegociacoes() {
		return new Promise((resolve, reject) => {
			Promise.all([
			this._obterNegociacoesDaSemana(),
			this._obterNegociacoesDaSemanaAnterior(),
			this._obterNegociacoesDaSemanaRetrasada()
			])
		.then(periodos => {
			let negociacoes = periodos
			.reduce((arrayAchatado, array) => arrayAchatado.concat(array), [])
			resolve(negociacoes);
		})
		.catch(erro => reject(erro));
		});
	}


}