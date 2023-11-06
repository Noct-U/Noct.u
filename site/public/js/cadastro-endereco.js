verificarDados();
// Função para fazer a requisição AJAX
function buscarCep() {
    var cep = ipt_cep_empresa.value;
    var apiUrl = `https://viacep.com.br/ws/${cep}/json/`;

    // URL da API do Via CEP
    fetch(apiUrl).then(response => response.json())
    .then(data => {
        if (!data.erro) {
        ipt_cidade_empresa.value = data.localidade;
        ipt_bairro_empresa.value = data.bairro;
        ipt_uf_empresa.value = data.uf;
        ipt_logradouro_empresa.value = data.logradouro;


        console.log("CEP: " + data.cep);
        console.log("Logradouro: " + data.logradouro);
        console.log("Bairro: " + data.bairro);
        console.log("Cidade: " + data.localidade);
        console.log("Estado: " + data.uf);
        } else {
        console.log("CEP não encontrado");
        }
    })
    .catch(error => {
        console.error("Erro na requisição: " + error);
    });
  }

    function avancar(){

        var cep = ipt_cep_empresa.value;
        var cidade = ipt_cidade_empresa.value;
        var bairro = ipt_bairro_empresa.value;
        var uf = ipt_uf_empresa.value;
        var logradouro = ipt_logradouro_empresa.value;
        var num = ipt_num_empresa.value;
        var andar = ipt_andar_empresa.value;
        var sala = ipt_sala_empresa.value;
        var complemento = ipt_comp_empresa.value;

        var dadosEndereco = [cep,cidade,bairro,uf,logradouro,num,andar,sala,complemento];
        var jsonDadosEndereco = JSON.stringify(dadosEndereco);
        localStorage.setItem('dadosEndereco',jsonDadosEndereco);
      
    
        window.location.href = "cadastro-usuario.html";
    }
    

    function voltar(){

        var cep = ipt_cep_empresa.value;
        var cidade = ipt_cidade_empresa.value;
        var bairro = ipt_bairro_empresa.value;
        var uf = ipt_uf_empresa.value;
        var logradouro = ipt_logradouro_empresa.value;
        var num = ipt_num_empresa.value;
        var andar = ipt_andar_empresa.value;
        var sala = ipt_sala_empresa.value;
        var complemento = ipt_comp_empresa.value;

        var dadosEndereco = [cep,cidade,bairro,uf,logradouro,num,andar,sala,complemento];
        var jsonDadosEndereco = JSON.stringify(dadosEndereco);
        localStorage.setItem('dadosEndereco',jsonDadosEndereco);
      
    
        window.location.href = "cadastro-empresa.html";
    }
    
    function verificarDados(){

            //caso o usuário volte da tela 2, essa verificação devolve os dados que ele digitou
        if(typeof localStorage.getItem("dadosEndereco") != 'undefined'){

            var jsonDadosEndereco = localStorage.getItem('dadosEndereco');
            var dadosEndereco = JSON.parse(jsonDadosEndereco);
            

            ipt_cep_empresa.value = dadosEndereco[0];
            ipt_cidade_empresa.value = dadosEndereco[1];
            ipt_bairro_empresa.value = dadosEndereco[2];
            ipt_uf_empresa.value = dadosEndereco[3]
            ipt_logradouro_empresa.value = dadosEndereco[4];
            ipt_num_empresa.value = dadosEndereco[5];
            ipt_andar_empresa.value = dadosEndereco[6];
            ipt_sala_empresa.value = dadosEndereco[7];
            ipt_comp_empresa.value = dadosEndereco[8];


        }
    }