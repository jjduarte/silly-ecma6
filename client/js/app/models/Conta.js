class Conta {
	constructor(saldo) {
		this._saldo  = saldo;
	}

	get saldo() {
		return this._saldo;
	}

	atualiza(taxa) {
		throw new Error('Este método precisa ser implementado na classe filha')
	}
}