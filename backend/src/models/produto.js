const db = require('../database/database');

const Produto = {
  create: (produto, callback) => {
    const query = `INSERT INTO produtos (nome, preco, quantidade) VALUES (?, ?, ?)`;
    db.run(query, [produto.nome, produto.preco, produto.quantidade], function (err) {
      callback(err, this?.lastID);
    });
  },

  findAll: (callback) => {
    const query = `SELECT * FROM produtos`;
    db.all(query, [], (err, rows) => {
      callback(err, rows);
    });
  },

  findById: (id, callback) => {
    const query = `SELECT * FROM produtos WHERE id = ?`;
    db.get(query, [id], (err, row) => {
      callback(err, row);
    });
  },

  update: (id, produto, callback) => {
    const query = `UPDATE produtos SET nome = ?, preco = ?, quantidade = ? WHERE id = ?`;
    db.run(query, [produto.nome, produto.preco, produto.quantidade, id], (err) => {
      callback(err);
    });
  },

  delete: (id, callback) => {
    const query = `DELETE FROM produtos WHERE id = ?`;
    db.run(query, [id], (err) => {
      callback(err);
    });
  },
};

module.exports = Produto;
