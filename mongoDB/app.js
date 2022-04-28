const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/demo', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conecting to MongoDB...'))
  .catch(err => console.log('Error in MongoDB', err))

const cursoSchema = new mongoose.Schema({
  nombre: { type: String },
  autor: { type: String },
  etiquetas: [{ type: String }],
  fecha: { type: Date, default: Date.now },
  publicado: { type: Boolean, default: false }
});

const Curso = mongoose.model('Curso', cursoSchema)

async function crearCurso() {
  const curso = new Curso({
    nombre: 'Angular para principiantes',
    autor: 'Pedro Ruiz',
    etiquetas: ['desarrollo web', 'front end'],
    publicado: true
  });
  const resultado = await curso.save()
  return console.log(resultado)
}

//crearCurso()

const listarCursos = async () => {
  // eq (equal, igual)
  // ne (not equal, no igual)
  // gt (greater than, mayor que)
  // gte (greater than or egual to, mayor o igual que)
  // lt (less than, menor que)
  // lte (less than or equal to, menor o igual que)
  // in
  // nin (not in)
  // or
  // and
  const numPage = 2
  const sizePage = 10
  // api/cursos?numPage=4&sizePage=10
  const cursos = await Curso
    //.find({ precio: {$gte:10, $lte:30}})
    //.find({precio: {$in: [10, 15, 25]}})
    //.and([{autor:'Grover'}, {publicado: false}])
    //.find({ autor: /^Gro/ }) empiece con la palabra Gro
    .find({ autor: /.*ro.* / }) //cuando termina en una palabra o expresion 
    .skip((numPage - 1) * sizePage) //paginación
    .limit(sizePage)
    .sort({ autor: -1 }) //ordenamiento decendente
    .select({ autor: 1, nombre: 1, etiquetas: 1 })
  console.log(cursos)
}

//listarCursos();

const actualizarCurso = async (id) => {
  const resultado = await Curso.findByIdAndUpdate(id, {
    $set: {
      autor: 'Luiz',
      publicado: true
    }
  }, { new: true })
  return console.log(resultado)
}

//actualizarCurso('5f4f8f8f9b9d8b1b8c8b8b8b')

const eliminarDocumento = async(id) => {
  const result = await Curso.findByIdAndDelete(id)
  return console.log(result)
}
//eliminarDocumento('5da52e69b7d451b75d924eac')
