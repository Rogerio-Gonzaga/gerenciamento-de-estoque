const Venda = require('../models/venda');

exports.create = (req, res) => {
  Venda.create(req.body, (err, id) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id });
  });
};

exports.getAll = (req, res) => {
  Venda.findAll((err, vendas) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(vendas);
  });
};

exports.delete = (req, res) => {
  const { id } = req.params;
  Venda.delete(id, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ message: 'Venda deletada com sucesso' });
  });
};
