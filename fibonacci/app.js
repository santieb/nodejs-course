//Serie de Fibonacci
// 1 1 2 3 5 8 13 21 34...

const serie = require('./serie');

let cantidad = 5;

serie.crearSerie(cantidad)
	.then(mensaje => console.log(mensaje))
  .catch(mensaje => console.log(mensaje))