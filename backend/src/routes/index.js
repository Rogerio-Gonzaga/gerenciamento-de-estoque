const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtoController');
const vendaController = require('../controllers/vendaController');

// Rotas para produtos
router.post('/produtos', produtoController.create);    // Criação de produto
router.get('/produtos', produtoController.getAll);     // Listagem de produtos
router.get('/produtos/:id', produtoController.getById); // Buscar produto por id
router.put('/produtos/:id', produtoController.update);  // Atualizar produto
router.delete('/produtos/:id', produtoController.delete); // Deletar produto

// Rotas para vendas
router.post('/vendas', vendaController.create);   // Registrar venda
router.get('/vendas', vendaController.getAll);    // Listar vendas
router.delete('/vendas/:id', vendaController.delete); // Deletar venda

module.exports = router;
