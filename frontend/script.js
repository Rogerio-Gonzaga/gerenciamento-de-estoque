const API_URL = "http://localhost:3000/api";
const productForm = document.getElementById("productForm");
const saleForm = document.getElementById("saleForm");
const productTable = document.getElementById("productTable");
const saleTable = document.getElementById("saleTable");
const saleProduct = document.getElementById("saleProduct");
const totalFaturado = document.getElementById("totalFaturado"); // Referência para o campo Total Faturado

let productForResponse;

// Carregar produtos no dropdown e tabela
async function loadProducts() {
  const response = await fetch(`${API_URL}/produtos`);
  const products = await response.json();

  // Atualizar dropdown
  saleProduct.innerHTML = "";
  products.forEach((product) => {
    const option = document.createElement("option");
    option.value = product.id;
    option.textContent = `${product.nome} (Estoque: ${product.quantidade})`;
    saleProduct.appendChild(option);
  });

  // Atualizar tabela de produtos
  productTable.innerHTML = "";
  products.forEach((product, index) => {
    const row = `
      <tr>
        <td style="display: none;">${index + 1}</td>
        <td>${product.nome}</td>
        <td>R$ ${product.preco.toFixed(2)}</td>
        <td>${product.quantidade}</td>
        <td>
          <button class="btn btn-warning btn-sm" onclick="editProduct(${
            product.id
          })">Editar</button>
          <button class="btn btn-danger btn-sm" onclick="deleteProduct(${
            product.id
          })">Excluir</button>
        </td>
      </tr>`;
    productTable.innerHTML += row;
  });
}

async function getProductbyId(id) {
    const response = await fetch(`${API_URL}/produtos/${id}`);
    const product = await response.json();// Espera a resposta ser convertida para JSON
    
    return product; // Retorna o produto
  }

// Carregar vendas na tabela e calcular total faturado
async function loadSales() {
  const response = await fetch(`${API_URL}/vendas`);
  const sales = await response.json();

  

  saleTable.innerHTML = "";
  let total = 0;

  // Loop para cada venda, buscando o produto correspondente
  for (const sale of sales) {
    const product = await getProductbyId(sale.produto_id); // Espera o produto ser carregado

    const row = `
      <tr>
        <td style="display: none;">${sale.id}</td>
        <td>${product.nome}</td> <!-- Exibe o nome do produto -->
        <td>${sale.quantidade}</td>
        <td>R$ ${sale.total.toFixed(2)}</td>
        <td>${new Date(sale.data_venda).toLocaleString()}</td>
        <td>
          <button class="btn btn-danger btn-sm" onclick="deleteSale(${sale.id})">Excluir</button>
        </td>
      </tr>`;

    saleTable.innerHTML += row;

    total += sale.total; // Soma o total da venda
  }

  // Exibir o total faturado
  totalFaturado.textContent = `R$ ${total.toFixed(2)}`;
}

// Cadastrar produto
productForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const productId = document.getElementById("productId").value;
  const newProduct = {
    nome: document.getElementById("productName").value,
    preco: parseFloat(document.getElementById("productPrice").value),
    quantidade: parseInt(document.getElementById("productQuantity").value, 10),
  };

  if (productId) {
    // Atualizar produto
    await fetch(`${API_URL}/produtos/${productId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    });
  } else {
    // Criar produto
    await fetch(`${API_URL}/produtos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    });
  }

  productForm.reset();
  loadProducts();
});

// Editar produto
function editProduct(id) {
  fetch(`${API_URL}/produtos/${id}`)
    .then((response) => response.json())
    .then((product) => {
      document.getElementById("productId").value = product.id;
      document.getElementById("productName").value = product.nome;
      document.getElementById("productPrice").value = product.preco;
      document.getElementById("productQuantity").value = product.quantidade;
    });
}

// Excluir produto
async function deleteProduct(id) {
  if (confirm("Tem certeza que deseja excluir este produto?")) {
    await fetch(`${API_URL}/produtos/${id}`, { method: "DELETE" });
    loadProducts();
  }
}

// Registrar venda
saleForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const selectedProductId = saleProduct.value;
  const saleQuantity = parseInt(
    document.getElementById("saleQuantity").value,
    10
  );

  const products = await fetch(`${API_URL}/produtos`).then((res) => res.json());
  const product = products.find((p) => p.id == selectedProductId);

  if (!product || product.quantidade < saleQuantity) {
    alert("Estoque insuficiente!");
    return;
  }

  const newSale = {
    produto_id: product.id,
    quantidade: saleQuantity,
    total: product.preco * saleQuantity,
  };

  await fetch(`${API_URL}/vendas`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newSale),
  });

  // Atualizar estoque após venda
  await fetch(`${API_URL}/produtos/${product.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      nome: product.nome,
      preco: product.preco,
      quantidade: product.quantidade - saleQuantity,
    }),
  });

  loadProducts();
  loadSales();
  saleForm.reset();
});

// Excluir venda
async function deleteSale(id) {
  if (confirm("Tem certeza que deseja excluir esta venda?")) {
    await fetch(`${API_URL}/vendas/${id}`, { method: "DELETE" });
    loadSales();
  }
}

// Inicializar
loadProducts();
loadSales();
