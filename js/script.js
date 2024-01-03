
let dados = [
    {
        title: "Imovel 1",
        description: "Descrição 1",
        price: 2000,
        bath_count: 2,
        room_count: 2,
        type: "Aluguel",
        id: 1
    },
    {
        title: "Imovel 2",
        description: "Descrição 2",
        price: 200000,
        bath_count: 1,
        room_count: 2,
        type: "Compra",
        id: 2
    },
    {
        title: "Imovel 3",
        description: "Descrição 3",
        price: 350000,
        bath_count: 1,
        room_count: 1,
        type: "Compra",
        id: 3
    },
    {
        title: "Imovel 4",
        description: "Descrição 4",
        price: 2500,
        bath_count: 2,
        room_count: 3,
        type: "Aluguel",
        id: 4
    },
    {
        title: "Imovel 5",
        description: "Descrição 5",
        price: 3000,
        bath_count: 1,
        room_count: 2,
        type: "Aluguel",
        id: 5
    },
    {
        title: "Imovel 6",
        description: "Descrição 6",
        price: 400000,
        bath_count: 2,
        room_count: 2,
        type: "Venda",
        id: 6
    }
]
localStorage.setItem("dados", JSON.stringify(dados));

//Deletar dados

console.log(dados)

function btn_delete (id) {
    const dado_delete = dados.findIndex(index => index.id == id);
    
    dados.splice(dado_delete, 1);

    load();
}

//Carregar imóveis na página

function load () {
    const dadosString = localStorage.getItem("dados");
    dados = dadosString ? JSON.parse(dadosString):[];

    const html = (Array.isArray(dados) && dados.length > 0) && dados.map(index => 
        `
            <div class="imoveis-info">
                <div class="picture">
        
                </div>
        
                <div class="imovel-desc-size">
                    <div class="imovel-desc">
                        <div class="imovel-nome-valor">
                            <div>
                                <h4 id="nome_imovel">${index.title}</h6>
                                <p id="valor">R$ ${index.price}</p>
                            </div>
                            <div class="status">
                                <label id="modalidade">${index.type}</label>
                            </div>
                        </div>
                        
                        <div class="imovel-desc-label">
                            <p id="imovel_desc">${index.description}</p>
                        </div>
                    </div>
                </div>
        
                <div class="imovel-icons">
                    <img src="images/bed-solid 1.png" alt="Quartos">
                    <p id="numero_de_quartos">${index.room_count}</p>
                    <img src="images/bath-solid 1.png" alt="Banheiros">
                    <p id="numero_de_banheiros">${index.bath_count}</p>
                </div>
        
                <div class="details">
                    <button id="editar" onclick="edit_info(${index.id})">Editar</button>
                    <button id="excluir" onclick="btn_delete(${index.id})">Excluir</button>
                    <button id="detalhes" onclick="show_details(${index.id})">Detalhes</button>
                </div>
            </div>
        `).join("")

    document.getElementById("imoveis_html").innerHTML = Array.isArray(dados) && dados.length > 0 ? html : "Nenhum imovel encontrado";

}

//Carregar junto a página

document.addEventListener('DOMContentLoaded', () => {
    load();
})

//Editar-Modal

function edit_info (id) {

    let dado_info = dados.findIndex(index => index.id == id);

    if (dado_info < id) {
       let dif = id - dado_info
       dado_info += dif
       load_info(dado_info);
    }

}

//Carregar informação na janela modal

function load_info (dado) {

    const modal = document.getElementById('janela-modal')
    modal.classList.add('abrir')

    const dados_id = dados.filter(({id}) => id == dado)

    const html = dados_id.map(index =>
        `
            <button class="close" id="close" onclick="close_modal()">X</button>
            <h1>Editar informações</h1>

            <div class="edit-form">
                <label>Título</label>
                <input type="text" value="${index.title}" id="edit_title">
            </div>

            <div class="edit-form">
                <label>Valor</label>
                <input type="text" value="${index.price}" id="edit_price">
            </div>

            <div class="edit-form">
                <label>Modalidade</label>
                <input type="text" value="${index.type}" id="edit_modalidade">
            </div>

            <div class="edit-form">
                <label>Descrição do imóvel</label>
                <input type="text" value="${index.description}" id="edit_desc">
            </div>

            <div class="edit-form">
                <label>Quartos</label>
                <input type="text" value="${index.room_count}" id="edit_room">
            </div>

            <div class="edit-form">
                <label>Banheiros</label>
                <input type="text" value="${index.bath_count}" id="edit_bath">
            </div>

            <div class="edit-button">
                <button type="submit" id="edit" onclick="submit_info(${index.id})">Alterar</button>
            </div>
        `

    ).join("")

    document.getElementById("modal").innerHTML = html
    
    

}

//onclick="submit_info(${index.id})"

//Editar dados do imóvel

function submit_info(dado) {

    //let dado_info = dados.findIndex(index => index.id == id);
    let titulo = document.getElementById("edit_title").value
    

    dados = dados.map(index => {
        if(index.id == dado){
            index.title = titulo
        }
        return index
    })

    console.log(dados)
    localStorage.setItem("dados", JSON.stringify(dados));
    close_modal()

    load(dados)
}



//Fechar Modal

function close_modal () {
    const close_btn = document.getElementById("janela-modal")
    close_btn.classList.toggle("abrir")
}




//Adicionar imoveis

function newData () {
    const dadosString = localStorage.getItem("dados");
    dados = dadosString ? JSON.parse(dadosString) : [];

    const dado =  {
        title: `Imovel ${dados.length + 1}`,
        description: `Descricao ${dados.length + 1}`,
        price: gerarValorMonetario(),
        bath_count: 1,
        room_count: 1,
        type: "Aluguel"
    };

    dados = dados.concat(dado);

    localStorage.setItem("dados", JSON.stringify(dados));

    load()
}

function addData () {
    console.log("Ok")
}

function gerarValorMonetario() {
    // Gerar um número aleatório entre 1 e 100 (pode ajustar conforme necessário)
    let valor = Math.floor(Math.random() * 100) + 1;

    // Formatar o número como um valor monetário (adicionando cifrão e duas casas decimais)
    let valorMonetario = `${valor.toFixed(2)}`;

    return valorMonetario;
}

function show_details () {
    console.log("Detalhes")
}