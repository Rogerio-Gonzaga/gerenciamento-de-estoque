const Produto = require('../models/produto');

exports.create = (req, res) => {
  Produto.create(req.body, (err, id) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id });
  });
};

exports.getAll = (req, res) => {
  Produto.findAll((err, produtos) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(produtos);
  });
};

exports.getById = (req, res) => {
  const { id } = req.params;
  Produto.findById(id, (err, produto) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!produto) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }
    res.json(produto);
  });
};

exports.update = (req, res) => {
  const { id } = req.params;
  Produto.update(id, req.body, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ message: 'Produto atualizado com sucesso' });
  });
};

exports.delete = (req, res) => {
  const { id } = req.params;
  Produto.delete(id, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ message: 'Produto deletado com sucesso' });
  });
};
