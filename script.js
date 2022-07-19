let selecaoPrato, selecaoBebida, selecaoSobremesa = false;
let prato, bebida, sobremesa = null;
let valorPrato, valorBebida, valorSobremesa = 0;

function selecionaPrato(item) {
  //verificar se tem algum item selecionado
  const itemSelecionado = document.querySelector(".opcoes-pratos .borda"); // se algum item tem borda
  const iconeSelecionado = document.querySelector(".opcoes-pratos .selecionado"); // se algum item tem check
  const icone = item.querySelector(".opcoes-pratos .check");

  //se tiver, tira a borda e o check
  if (itemSelecionado !== null) {
    itemSelecionado.classList.remove("borda");
    iconeSelecionado.classList.remove("selecionado");
  }

  //se não tiver, adiciona borda e check
  item.classList.toggle("borda");
  icone.classList.toggle("selecionado");

  //pega nome e valor do prato selecionado
  let nomePrato = item.querySelector(".item .nome");
  valorPrato = item.querySelector(".item .valor");
  prato = nomePrato.innerHTML;
  valorPrato = transformaValor(valorPrato.innerHTML);

  selecaoPrato = true;
}


function selecionaBebida(item) {
  const itemSelecionado = document.querySelector(".opcoes-bebidas .borda"); // se algum item tem borda
  const iconeSelecionado = document.querySelector(".opcoes-bebidas .selecionado"); // se algum item tem check
  const icone = item.querySelector(".opcoes-bebidas .check");

  if (itemSelecionado !== null) {
    itemSelecionado.classList.remove("borda");
    iconeSelecionado.classList.remove("selecionado");
  }

  item.classList.toggle("borda");
  icone.classList.toggle("selecionado");

  let nomeBebida = item.querySelector(".item .nome");
  valorBebida = item.querySelector(".item .valor");
  bebida = nomeBebida.innerHTML;
  valorBebida = transformaValor(valorBebida.innerHTML)

  selecaoBebida = true;
}

function selecionaSobremesas(item) {
  const itemSelecionado = document.querySelector(".opcoes-sobremesas .borda"); // se algum item tem borda
  const iconeSelecionado = document.querySelector(".opcoes-sobremesas .selecionado"); // se algum item tem check
  const icone = item.querySelector(".opcoes-sobremesas .check");

  if (itemSelecionado !== null) {
    itemSelecionado.classList.remove("borda");
    iconeSelecionado.classList.remove("selecionado");
  }

  item.classList.toggle("borda");
  icone.classList.toggle("selecionado");

  let nomeSobremesa = item.querySelector(".item .nome");
  valorSobremesa = item.querySelector(".item .valor");
  sobremesa = nomeSobremesa.innerHTML;
  valorSobremesa = transformaValor(valorSobremesa.innerHTML)

  selecaoSobremesa = true;

  habilitarBotao();
}

// habilita o botão quando os itens são selecionados
function habilitarBotao() {
  const botao = document.querySelector("button");
  const textoBotao = document.querySelector("button span");

  if (selecaoPrato && selecaoBebida && selecaoSobremesa) {
    botao.classList.add("botaoContinuar");
    botao.disabled = false;
    textoBotao.innerHTML = "Fechar pedido";
  }
}

function finalizaPedido() {
  const link = document.querySelector(".link");
  let valorTotal = calculaValorTotal();
  const texto = mensagem(valorTotal);

  let textofinal = "https://wa.me/?text=" + texto;

  link.setAttribute('href', textofinal);
  link.setAttribute("target", "_blank");
}

// prepara a mensagem para enviar por WhatsApp
function mensagem(valorTotal) {
  const texto = "Olá, gostaria de fazer o pedido: \n - Prato: " + prato + "\n - Bebida: " + bebida + "\n - Sobremesa: " + sobremesa + "\n Total: R$ " + valorTotal + "";
  return encodeURIComponent(texto);
}

function transformaValor(string) {
  let valor = parseFloat(string.replace(',', '.'));
  return valor.toFixed(2);
}

function calculaValorTotal() {
  let valor = parseFloat(valorPrato) + parseFloat(valorBebida) + parseFloat(valorSobremesa);
  valor = valor.toFixed(2);
  return (valor.replace('.', ","));
}