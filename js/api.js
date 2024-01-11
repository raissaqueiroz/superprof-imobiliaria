const url = "http://localhost:3333"

//Listar imoveis


//Cadastrar imoveis
async function createPropertie(dados) {
    axios.post(`${url}/imoveis`, dados)
    .then(response => {
        loadData()
        dados = dados.concat(response.data);
        console.log(dados);
        saveData(dados);
        console.log(dados);
        return JSON.stringify(response.data);
    })
    .catch(error => console.log(error.message))
}

//Editar imoveis


//Excluir imoveis