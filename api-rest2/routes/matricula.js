const express = require('express')
const Curso = require('../models/curso_model')
const Usuario = require('../models/usuario_model')
const verificarToken = require('../middlewares/auth')
const router = express.Router()

router.put('/:id', verificarToken, (req, res) => {
  let resultado = matricular(req.params.id, req)
  resultado.then(curso => {
    res.json(curso)
  }).catch(error => {
    res.status(400).json(error)
  })
});

const matricular = async (id, req) => {
  let curso = Curso.findById(id)
  curso.alumnos.push(req.usuario)
  return await curso.save()
}

module.exports = router
