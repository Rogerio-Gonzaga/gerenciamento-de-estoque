const db = require('../database/database');

const Venda = {
  create: (venda, callback) => {
    const query = `INSERT INTO vendas (produto_id, quantidade, total, data_venda) VALUES (?, ?, ?, ?)`;
    const dataVenda = new Date().toISOString();
    db.run(query, [venda.produto_id, venda.quantidade, venda.total, dataVenda], function (err) {
      callback(err, this?.lastID);
    });
  },

  findAll: (callback) => {
    const query = `SELECT * FROM vendas`;
    db.all(query, [], (err, rows) => {
      callback(err, rows);
    });
  },

  delete: (id, callback) => {
    const query = `DELETE FROM vendas WHERE id = ?`;
    db.run(query, [id], (err) => {
      callback(err);
    });
  },
};

module.exports = Venda;
