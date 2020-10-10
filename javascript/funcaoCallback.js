const comidas = ["arroz", "feijao", "kitkat", "cheetos"];

const imprimir = (nome, indice) => console.log(`${indice + 1}: ${nome}`);

comidas.forEach(imprimir);

comidas.forEach((nome, indice) => {
	console.log(`${indice + 1}: ${nome}`);
});

//funcao usada varias vezes dentro de outra funcao
