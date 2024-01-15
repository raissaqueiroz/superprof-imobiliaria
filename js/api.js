const url = "http://localhost:3333"

//Listar imoveis


//Cadastrar imoveis
async function createPropertie(request) {
    try {
        const response = await axios.post(`${url}/imoveis`, request);
        let result = loadData();
        result.push(response.data);
        saveData(result);
        load()
    } catch (error) {
        console.error("Erro na requisição:", error.message);
    }
    return;
}

//Editar imoveis


//Excluir imoveis