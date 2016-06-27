class ContaPoupanca extends Conta{

	atualiza(taxa){
		this._saldo = this._saldo + 2 * taxa; 
	}
}