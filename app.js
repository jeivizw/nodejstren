
const inventario = [];
let proximoId = 1; 



function adicionarProduto(nome, quantidade) {

    if (!nome || typeof quantidade !== 'number' || quantidade < 0) {
        console.log("ERRO: Nome e quantidade válida (>= 0) são obrigatórios.");
        return;
    }
    const novoProduto = {
        id: proximoId++,
        nome: nome,
        quantidade: quantidade
    };

    inventario.push(novoProduto);
    console.log(`\n✅ Produto adicionado: ID ${novoProduto.id} - ${nome} (${quantidade} em estoque)`);
}

function listarInventario() {
    console.log('\n--- INVENTÁRIO ATUAL ---');
    if (inventario.length === 0) {
        console.log('O inventário está vazio.');
        return;
    }


    console.log('ID\t| Nome\t\t\t| Qtd');
    console.log('---------------------------------');


    inventario.forEach(produto => {
        console.log(`${produto.id}\t| ${produto.nome.padEnd(20)}\t| ${produto.quantidade}`);
    });
    console.log('---------------------------------');
    console.log(`Total de produtos diferentes: ${inventario.length}`);
}

function atualizarQuantidade(id, novaQuantidade) {

    if (typeof id !== 'number' || typeof novaQuantidade !== 'number' || novaQuantidade < 0) {
        console.log("ERRO: ID e Nova Quantidade válida (>= 0) são obrigatórios.");
        return;
    }


    const produtoIndex = inventario.findIndex(p => p.id === id);

    if (produtoIndex === -1) {
        console.log(`\n❌ ERRO: Produto com ID ${id} não encontrado.`);
        return;
    }

    const produtoAntigo = inventario[produtoIndex];
    const quantidadeAnterior = produtoAntigo.quantidade;

 
    inventario[produtoIndex].quantidade = novaQuantidade;

    console.log(`\n🔄 Estoque atualizado para ID ${id} (${produtoAntigo.nome}):`);
    console.log(`   Quantidade anterior: ${quantidadeAnterior}`);
    console.log(`   Nova quantidade: ${novaQuantidade}`);
}

function removerProduto(id) {
    const indiceInicial = inventario.length;
    
    const novoInventario = inventario.filter(p => p.id !== id);

    if (novoInventario.length < indiceInicial) {
       
        inventario.length = 0; 
        inventario.push(...novoInventario); 
        console.log(`\n🗑️ Produto com ID ${id} removido com sucesso.`);
    } else {
        console.log(`\n❌ ERRO: Produto com ID ${id} não encontrado para remoção.`);
    }
}




console.log('*** INICIANDO GERENCIADOR DE INVENTÁRIO SIMPLES ***');


adicionarProduto("Caneta Azul", 150);
adicionarProduto("Caderno A4", 45);
adicionarProduto("Clips Gigante", 2000);


listarInventario();


atualizarQuantidade(2, 50);


removerProduto(3); 


listarInventario();