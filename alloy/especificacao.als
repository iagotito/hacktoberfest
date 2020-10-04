/*
						Tema 5: Locadora de Carros
	
	( V )	 Existem carros nacionais e importados
	( V )	 Existem clientes vips e clientes nao vips
	( V )  Clientes podem alugar ate 3 carros
	( V )  Se um cliente tem duas locacoes no seu nome simultaneamente ele vira um cliente VIP
	( ? )  Apenas clientes vip podem alugar carros importados
	( ? )  As devolucoes em dia e atrasadas devem ser registradas no sistema
	( ? )	 Um cliente deixa de ser vip se apresentar alguma devolucao em atraso
	( V )	Cliente precisa ter nome e telefone para poder fazer a locacao ou reserva de um carro
	( V ) Quando um cliente aluga um carro tanto a locadora quando o cliente detem a informacao.
	( X )	 Deve ser possivel reservar um carro que esteja alugado no momento.
	( V ) Existe um numero limitado de veiculos e esse numero eh menor que o numero de clientes
	( V ) Um veiculo so pode ser alugado por um unico cliente por vez
	( ? ) Depois que o carro eh devolvido ele passa por uma limpeza antes de ser alugado novamente.
	
*/

one sig Locadora {
	carros: set Carro,
	devolucoes: set Devolucao,
	alugueis: set Aluguel,
	clientes: set ClienteCadastrado
}

sig Reserva {
	reservado: one Carro
}

abstract sig Devolucao{
	carro: one Carro,
	cliente: one ClienteCadastrado
}
sig DevolucaoEmDia extends Devolucao{}
sig DevolucaoAtrasada extends Devolucao{}


abstract sig Carro {
	limpo: lone Limpo
}
sig CarroImportado extends Carro{}
sig CarroNacional extends Carro{}

sig Cliente{
	cadastrar: lone Cadastrar
}

sig ClienteCadastrado extends Cliente{
	nome: one Nome,
	telefone: one Telefone,
	alugados: set Aluguel,
	reservas: set Reserva
}
sig ClienteVip extends ClienteCadastrado{
}

sig Aluguel{
	carro: one Carro
}

sig AluguelAtrasado extends Aluguel{}

sig Nome {}
sig Telefone {}

one sig Cadastrar{}
one sig Limpo{}


fact {
	--Todos os carros estao ligados a locadora
	all c:Carro | one c.~carros

	--Todos os alugueis estao ligados a locadora

	--Todos os clientes estao ligados a locadora
	all c:ClienteCadastrado | one c.~clientes

	--Cada cliente so pode ter 3 carros alugados
	all a:ClienteCadastrado | #(a.alugados) <= 3
	
	--Cada cliente tem um nome unico
	all n:Nome | one n.~nome

	--Carro so pode ser alugado por um cliente ou nenhum
	//all c:Carro | lone c.~alugados

	--Numero de carros eh menor que o numero de Clientes
	(#(Locadora.carros)) < (#ClienteCadastrado)

	/*nao tenho ctz se isso ta funcionando como deveria, mas eh para garantir que todos os carros importados
	so sao alugados por clientes vip.*/
	//all c:Carro | (ehImportado[c] and estaAlugado[c]) implies ehVip[c.~alugados]

	--Um Cliente eh VIP se, e somente se, tiver mais de dois carros alugados.
	all c:ClienteCadastrado | #(c.alugados) >= 2 iff ehVip[c]

	--Apenas clientes nao cadastrados podem se cadastrar, e clientes ja cadastrados nao podem se cadastrar
	all c:Cliente | (ehCadastrado[c]) implies (#(c.cadastrar) = 0)
	all c:Cliente | (naoEhCadastrado[c]) implies (#c.cadastrar = 1)

	--A ideia aqui eh que se ele ja esta reservado, entao significa que ele esta alugado no momento e que o carro não está mais limpo
	//all c:Carro | some c.~reservado implies (estaAlugado[c] and (#(c.limpo) = 0))

	--Dessa forma se o cliente apresenta uma devolucao atrasada, ele nao eh mais Vip
	all d:DevolucaoAtrasada | !ehVip[d.cliente]

	//all c:ClienteCadastrado | (#c.~solicitante != 0 and !ehVip[c]) implies naoEhReservaDeImportado[c.~solicitante]

	--Quando o carro é devolvido ele é limpo
	all d:Devolucao | (#(d.carro.limpo) = 1)

}

pred naoEhReservaDeImportado[reserva: Reserva]{
	#(reserva.reservado & CarroImportado) = 0
}

pred naoEhCadastrado[cliente: Cliente]{
	!ehCadastrado[cliente]
}

pred ehCadastrado [cliente : Cliente]{
	#(cliente & ClienteCadastrado) = 1
}

pred ehVip[cliente : ClienteCadastrado]{

	#(cliente & ClienteVip) = 1

}
//
//pred estaAlugado[carro : Carro]{
//	#(carro.~alugados) >= 1
//	#(carro.limpo) = 1
//}

pred ehImportado[carro : Carro]{

	#(carro & CarroImportado) = 1

}


pred show[]{}
run show for 9
