
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
        type: "Compra",
        id: 6
    }
]
localStorage.setItem("dados", JSON.stringify(dados));


function loadData () {
    const dadosString = localStorage.getItem("dados");
    let dados = dadosString != "undefined" ? JSON.parse(dadosString) : [];
    return dados;
}

function saveData (dados) {
    localStorage.setItem("dados", JSON.stringify(dados));
}

//Screens scripts
//{id, title, price, description, room_count, bath_count}, passar objeto como parâmetro, gerar apenas o html.
function loadMainScreen() {
    loadData()

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
                    <button id="editar" onclick="btnEditInfo(${index.id})">Editar</button>
                    <button id="excluir" onclick="btnDelete(${index.id})">Excluir</button>
                    <button id="detalhes" onclick="showPropertyDetails(${index.id})">Detalhes</button>
                </div>
            </div>
        `).join("")

    document.getElementById("imoveis_html").innerHTML = Array.isArray(dados) && dados.length > 0 ? html : "Nenhum imovel encontrado";

}

function editModalScreen(dataId) {

    const html = dataId.map(index =>
        `

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
                <button class="close" id="close" onclick="btnCloseModal()">Cancelar</button>
                <button type="submit" id="edit" onclick="submitEditedInfo(${index.id})">Alterar</button>
            </div>
        `

    ).join("")

    document.getElementById("modal").innerHTML = html
}

function searchScreen(dataType) {
    html = dataType.map(index =>
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
                    <button id="excluir" onclick="btnDelete(${index.id})">Excluir</button>
                    <button id="detalhes" onclick="show_details(${index.id})">Detalhes</button>
                </div>
            </div>
        `
    ).join("")
    document.getElementById("imoveis_html").innerHTML = html
}

function registerProperty(newInfo) {
    const html = 
        `
            <h1>Cadastrar novo imóvel</h1>

            <div class="edit-form">
                <label>Título</label>
                <input type="text" id="new_title" placeholder="Inserir Título do imóvel.">
            </div>

            <div class="edit-form">
                <label>Valor</label>
                <input type="text" id="new_price" placeholder="Inserir valor do imóvel.">
            </div>

            <div class="edit-form">
                <label>Modalidade</label>
                <input type="text" id="new_modalidade" placeholder="Aluguel ou Compra?">
            </div>

            <div class="edit-form">
                <label>Descrição do imóvel</label>
                <input type="text" id="new_desc" placeholder="Uma breve descrição do imóvel.">
            </div>

            <div class="edit-form">
                <label>Quartos</label>
                <input type="text" id="new_room" placeholder="Número de quartos.">
            </div>

            <div class="edit-form">
                <label>Banheiros</label>
                <input type="text" id="new_bath" placeholder="Número de banheiros.">
            </div>

            <div class="edit-button">
                <button class="close" id="close" onclick="btnCloseAndDelete(${newInfo.id})">Cancelar</button>
                <button id="add" onclick="addData(${newInfo.id})">Cadastrar</button>
            </div>
        `

    document.getElementById("modal").innerHTML = html
}

function loadModalEditScreen(dado) {

    const modal = document.getElementById('janela-modal')
    modal.classList.add('abrir')

    const dataId = dados.filter(({id}) => id == dado)

    editModalScreen(dataId)
}

function showPropertyDetails() {
    console.log("Detalhes")
}

//On load event
document.addEventListener('DOMContentLoaded', () => {
    loadMainScreen();
})

//Buttons
function btnDelete(id) {
    loadData()

    const dado_delete = dados.findIndex(index => index.id == id);
    
    dados.splice(dado_delete, 1);

    saveData()

    loadMainScreen()
}

function btnEditInfo(id) {

    let dado_info = dados.findIndex(index => index.id == id);

    if (dado_info < id) {
       let dif = id - dado_info
       dado_info += dif
       loadModalEditScreen(dado_info);
    }

}

function btnSearchInfo() {
    loadData()
    const option = document.getElementById("modalidade")
    const searchButton = document.getElementById("searchButton")
    
    let dataType = dados.filter(index => index.type.toLowerCase() == option.value.toLowerCase());
    console.log(dataType)
    
    if(dataType.length > 0) {
        searchScreen(dataType)
        saveData()
    }else{
        saveData()
        loadMainScreen()
    }
}

function submitEditedInfo(dado) {

    let title = document.getElementById("edit_title").value
    let price = document.getElementById("edit_price").value
    let type = document.getElementById("edit_modalidade").value
    let description = document.getElementById("edit_desc").value
    let editRoom = document.getElementById("edit_room").value
    let editBath = document.getElementById("edit_bath").value
    

    dados = dados.map(index => {
        if(index.id == dado){
            index.title = title,
            index.price = price,
            index.type = type,
            index.description = description,
            index.edit_room = editRoom,
            index.edit_bath = editBath
        }
        return index
    })

    console.log(dados)
    saveData()
    btnCloseModal()

    loadMainScreen(dados)
}

function btnCloseModal () {
    const close_btn = document.getElementById("janela-modal")
    close_btn.classList.toggle("abrir")
}

function generateNewProperty() {
    loadData()

    const dado =  {
        id: dados.length + 1,
        title: `Imovel ${dados.length + 1}`,
        description: `Descricao ${dados.length + 1}`,
        price: gerarValorMonetario(),
        bath_count: 1,
        room_count: 1,
        type: "Aluguel",
    };

    dados = dados.concat(dado);

    saveData()
    return dado
}

function btnNewProperty() {
    loadData()
    const modal = document.getElementById('janela-modal')
    modal.classList.add('abrir')

    const newInfo = generateNewProperty()

    console.log("Teste "+newInfo.title)
    
    registerProperty(newInfo)

    saveData()
}

function btnCloseAndDelete(id) {
    const close_btn = document.getElementById("janela-modal")
    close_btn.classList.toggle("abrir")

    loadData()

    const dado_delete = dados.findIndex(index => index.id == id);
    
    dados.splice(dado_delete, 1);

    saveData()

    loadMainScreen()
}

//Metodo salva imoveis no banco de dados.
async function addData(id) {
    let title = document.getElementById("new_title").value
    let price = document.getElementById("new_price").value
    let type = document.getElementById("new_modalidade").value
    let description = document.getElementById("new_desc").value
    let new_room = document.getElementById("new_room").value
    let new_bath = document.getElementById("new_bath").value

    const data = {
        title,
        price,
        type,
        description,
        newRoom: new_room,
        newBath: new_bath
    }
    console.log(data)

    await createPropertie(data)

    btnCloseModal ()
    //load()
}

//Generate random numbers function
function gerarValorMonetario() {
    // Gerar um número aleatório entre 1 e 100 (pode ajustar conforme necessário)
    let valor = Math.floor(Math.random() * 100) + 1;

    // Formatar o número como um valor monetário (adicionando cifrão e duas casas decimais)
    let valorMonetario = `${valor.toFixed(2)}`;

    return valorMonetario;
}