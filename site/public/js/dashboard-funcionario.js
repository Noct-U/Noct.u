let proximaAtualizacaoCpu;
let proximaAtualizacaoDisco;
let proximaAtualizacaoRam;

var cpuId = document.getElementById("corCpu");
var ramId = document.getElementById("corMemoria");
var discoId = document.getElementById("corDisco");


function obterDadosGrafico(idComputador) {
    

    //GRAFICO DISCO

    fetch("/computadores/consultarDados", {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
            body: JSON.stringify({
                // crie um atributo que recebe o valor recuperado aqui
                // Agora vá para o arquivo routes/usuario.js
                //Dados da primeira pag de cadastro
                idComputadorServer : idComputador,
                idHardwareServer : 3
            })
      }).then(function (ultimaCaptura) {
          console.log("ESTOU NO THEN DO NOVA FUnCTIONS()!")

          if (ultimaCaptura.ok) {

              ultimaCaptura.json().then(ultimaCaptura => {
                // var campeao = jsonMelhoresQuiz[0].nome;
                // var menorPontuacao = jsonMelhoresQuiz[jsonMelhoresQuiz.length - 1].nome;
                // info1.innerHTML = "Líder : "+ campeao;
                // info2.innerHTML = "Menor desempenho do ranking no torneio: "+menorPontuacao;
                console.log(ultimaCaptura);

                var capacidade = ultimaCaptura[0].capacidade;
                var uso = ultimaCaptura[0].valor;
                var simbolo = ultimaCaptura[0].simbolo;

                console.log(capacidade,uso)
                plotarGrafico(capacidade,uso,simbolo);
              });

          } else {


              ultimaCaptura.text().then(texto => {
                  console.error(texto);
                  // finalizarAguardar(texto);
              });
          }

      })
      .catch(function (erro) {
          console.log(erro);
      })


     

      
}


function obterDadosGraficoRam(idComputador){
     //GRAFICO RAM

     fetch("/computadores/consultarDados", {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
            body: JSON.stringify({
                // crie um atributo que recebe o valor recuperado aqui
                // Agora vá para o arquivo routes/usuario.js
                //Dados da primeira pag de cadastro
                idComputadorServer : sessionStorage.ID_COMPUTADOR,
                idHardwareServer : 2
            })
      }).then(function (ultimaCaptura) {
          console.log("ESTOU NO THEN DO NOVA FUnCTIONS()!")

          if (ultimaCaptura.ok) {

              ultimaCaptura.json().then(ultimaCaptura => {
                // var campeao = jsonMelhoresQuiz[0].nome;
                // var menorPontuacao = jsonMelhoresQuiz[jsonMelhoresQuiz.length - 1].nome;
                // info1.innerHTML = "Líder : "+ campeao;
                // info2.innerHTML = "Menor desempenho do ranking no torneio: "+menorPontuacao;
                console.log(ultimaCaptura);

                var capacidade = ultimaCaptura[0].capacidade;
                var uso = ultimaCaptura[0].valor;
                var simbolo = ultimaCaptura[0].simbolo;
                
                
                plotarGraficoRam(capacidade,uso,simbolo)
              });

          } else {


              ultimaCaptura.text().then(texto => {
                  console.error(texto);
                  // finalizarAguardar(texto);
              });
          }

      })
      .catch(function (erro) {
          console.log(erro);
      })

} 

//Plotar grafico Disco
function plotarGrafico(capacidade,uso,simbolo) {

    var disponivel = capacidade - uso;

    var dados = {
        labels: [`${simbolo} em uso`, `${simbolo} Disponível`],
        datasets: [
            {
                label: [],
                data: [],
                backgroundColor: ['rgb(96, 116, 188)','rgb(9, 19, 56)'],
                borderWidth: 1,
            }

        ]
    };
    if(disponivel < 10){
        discoId.style.backgroundColor = "#FF3C3C";
        estado_disco.innerHTML = "Urgente";
        estado_disco.style.color = "#FF3C3C";
    }
    else if(disponivel < 50){
        discoId.style.backgroundColor = "#E0CB11";
        estado_disco.innerHTML = "Atenção";
        estado_disco.style.color = "#E0CB11";
    }
    else{
        discoId.style.backgroundColor = "#DFDFDF";
        estado_disco.innerHTML = "Bom";
        estado_disco.style.color = "#DFDFDF";
    }

    dados.datasets[0].data.push(uso);
    dados.datasets[0].data.push(disponivel);
   
        const config = {
            type: 'pie',
            data: dados,
            options: {
                plugins: {
                legend: {
                    display: false
                   
                },
                },
            },
            };

        // Adicionando gráfico criado em div na tela
        let myChart = new Chart(
            document.getElementById(`myChartCanvasGeral`),
            config
        );
        proximaAtualizacaoDisco = setTimeout(() => atualizarGraficoDisco(myChart,dados), 30000);

    // setTimeout(() => atualizarGrafico(idAquario, dados, myChart), 2000);
}


//Plotar Grafico Ram
function plotarGraficoRam(capacidade,uso,simbolo) {           


        var dados3 = {
        labels: [ `${simbolo} Disponível`,`${simbolo} em uso`],
        datasets: [
            {
                label: [],
                data: [],
                backgroundColor: ['rgb(96, 116, 188)','rgb(9, 19, 56)'],
                borderWidth: 1,
            }

        ]
        };

        //convertendo em porcentagem
        uso = parseInt((uso / capacidade) * 100);
        var disponivel = parseInt(100 - uso);

        //calculo em porcentagem
        if(disponivel < 10){
            ramId.style.backgroundColor = "#FF3C3C";
            estado_memoria.innerHTML = "Urgente";
            estado_memoria.style.color = "#FF3C3C";

        }
        else if(disponivel < 50){
            ramId.style.backgroundColor = "#E0CB11";
            estado_memoria.innerHTML = "Atenção";
            estado_memoria.style.color = "#E0CB11";
        }
        else{
            ramId.style.backgroundColor = "#DFDFDF";
            estado_memoria.innerHTML = "Bom";
            estado_memoria.style.color = "#DFDFDF";
        }
        dados3.datasets[0].data.push(uso);
        dados3.datasets[0].data.push(disponivel);
        const config3 = {
            type: 'pie',
            data: dados3,
            options: {
                plugins: {
                legend: {
                    display: false
                   
                },
                },
            },
            };

        // Adicionando gráfico criado em div na tela
        let myChart3 = new Chart(
            document.getElementById(`myChartCanvasGeral3`),
            config3
        );

        proximaAtualizacaoRam = setTimeout(() => atualizarGraficoRam(myChart3,dados3,capacidade), 3000);
    }




    //GRAFICO CPU
    function obterDadosGraficoCpu(idComputador){

     fetch("/computadores/consultarDadosCPU", {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
            body: JSON.stringify({
                // crie um atributo que recebe o valor recuperado aqui
                // Agora vá para o arquivo routes/usuario.js
                //Dados da primeira pag de cadastro
                idComputadorServer : sessionStorage.ID_COMPUTADOR,
                idHardwareServer : 1
            })
      }).then(function (ultimaCaptura) {
          console.log("ESTOU NO THEN DO NOVA FUnCTIONS()!")

          if (ultimaCaptura.ok) {

              ultimaCaptura.json().then(ultimaCaptura => {
                console.log(ultimaCaptura);

                
                
                var simbolo = ultimaCaptura[0].simbolo;
                plotarGraficoCpu(ultimaCaptura,simbolo)

                
              });

          } else {


              ultimaCaptura.text().then(texto => {
                  console.error(texto);
                  // finalizarAguardar(texto);
              });
          }

      })
      .catch(function (erro) {
          console.log(erro);
      })

} 

function plotarGraficoCpu(ultimaCaptura,simbolo) {           

    var dados2 = {
        labels: [],
        datasets: [
            {
            label: `Desempenho em ${simbolo}`,
            data: [],
            backgroundColor: ['rgb(96, 116, 188)'],
            borderWidth: 1,
            borderColor: '#4F64B0'
            }

    ]
    };

    for(var i = (ultimaCaptura.length - 1); i >= 0; i-- ){
        
        const dataObj = new Date(ultimaCaptura[i].dtCaptura);
        const agora = new Date();

        var diferenca = agora - dataObj;

        var mensagem;

        const segundo = Math.floor(diferenca / 1000);

        if (segundo < 60) {
            mensagem = `Há ${segundo} segundo${segundo > 1 ? 's' : ''}`;
        } else if (segundo < 3600) {
            const minutos = Math.floor(segundo / 60);
            mensagem = `Há ${minutos} minuto${minutos > 1 ? 's' : ''}`;
        } else if (segundo < 86400) {
            const horas = Math.floor(segundo / 3600);
            mensagem = `Há ${horas} hora${horas > 1 ? 's' : ''}`;
        } else {
            const dias = Math.floor(segundo / 86400);
            const horasRestantes = Math.floor((segundo % 86400) / 3600);
            mensagem = `Há ${dias} dia${dias > 1 ? 's' : ''} e ${horasRestantes} hora${horasRestantes > 1 ? 's' : ''}`;
        }

        dados2.labels.push(mensagem);
        dados2.datasets[0].data.push(ultimaCaptura[i].valor);

    }
 

    const config2 = {
        type: 'line',
        data: dados2,
        options: {
            plugins: {
                legend: {
                    display: false
                },
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: Math.max(...dados2.datasets[0].data) + 20
                }
            }
        }
    };

        
            
            // Adicionando gráfico criado em div na tela
            let myChart2 = new Chart(
                document.getElementById(`myChartCanvasGeral2`),
                config2
            );
            if(ultimaCaptura[0].valor >= (ultimaCaptura[0].capacidade - 10)){
                cpuId.style.backgroundColor = "#FF3C3C";
                estado_cpu.innerHTML = "Urgente";
                estado_cpu.style.color = "#FF3C3C";
            }
            else if(ultimaCaptura[0].valor >= (ultimaCaptura[0].capacidade - 20)){
                cpuId.style.backgroundColor = "#E0CB11";
                estado_cpu.innerHTML = "Atenção";
                estado_cpu.style.color = "#E0CB11";
            }
            else{
                cpuId.style.backgroundColor = "#DFDFDF";
                estado_cpu.innerHTML = "Bom";
                estado_cpu.style.color = "#DFDFDF";
            }
        
            proximaAtualizacaoCpu = setTimeout(() => atualizarGraficoCpu(myChart2,dados2), 2000);

    // setTimeout(() => atualizarGrafico(idAquario, dados, myChart), 2000);
    }

    function buscarJanelas(){
        var janela = document.getElementById("janelas");
        fetch("/computadores/consultarJanelas", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
              body: JSON.stringify({

                  idComputadorServer : sessionStorage.ID_COMPUTADOR

              })
        }).then(function (resultado) {

            if (resultado.ok) {
                
                resultado.json().then(resultado => {
                
                    janela.innerHTML = resultado[0].valor;
                });
  
            } else {
  
  
                resultado.text().then(texto => {
                    console.error(texto);
                    // finalizarAguardar(texto);
                });
            }
  
        })
        .catch(function (erro) {
            console.log(erro);
        })

    }



    //alertas 
    function buscarAlertas(){
        var divNotificacao = document.getElementById("noticacao");
        fetch("/alertas/consultarAlertasComputador", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
              body: JSON.stringify({

                  idComputadorServer : sessionStorage.ID_COMPUTADOR

              })
        }).then(function (ultimosAlertas) {
            divNotificacao.innerHTML = "";
            if (ultimosAlertas.ok) {
                
                ultimosAlertas.json().then(ultimosAlertas => {

                    

                    for(var i = 0; i < ultimosAlertas.length; i++){
                        

                    // Converte a data em um objeto Date
                    const dataObj = new Date(ultimosAlertas[i].dataAlerta);

                    // Obtém os valores dos componentes da data
                    const dia = dataObj.getDate();
                    const mes = dataObj.getMonth() + 1;
                    const ano = dataObj.getFullYear();
                    const hora = dataObj.getHours();
                    const minuto = dataObj.getMinutes();
                    const segundo = dataObj.getSeconds();

                    // Formata a data no formato "19/11/2023 23:52:18"
                    const dataFormatada = `${dia}/${mes}/${ano} ${hora}:${minuto}:${segundo}`;

                    console.log(dataFormatada);
                        console.log(ultimosAlertas[i].idAlerta)
                        if(ultimosAlertas[i].descricao == "Urgente"){
                            divNotificacao.innerHTML += `
                                <div class="div-caixa-mensagem">
                                    <div class="caixa-mensagem perigo">
                                        <p>${ultimosAlertas[i].descricaoAlerta}</p>
                                        <p>Hardware: ${ultimosAlertas[i].tipoHardware} ${ultimosAlertas[i].valorCaptura} ${ultimosAlertas[i].unidadeMedida}</p>
                                        <p>Data: ${dataFormatada}</p>
                                    </div>
                                </div>
                            `;
                        }
                    }
                    for(var i = 0; i < ultimosAlertas.length; i++){

                        // Converte a data em um objeto Date
                        const dataObj = new Date(ultimosAlertas[i].dataAlerta);

                        // Obtém os valores dos componentes da data
                        const dia = dataObj.getDate();
                        const mes = dataObj.getMonth() + 1;
                        const ano = dataObj.getFullYear();
                        const hora = dataObj.getHours();
                        const minuto = dataObj.getMinutes();
                        const segundo = dataObj.getSeconds();

                        // Formata a data no formato "19/11/2023 23:52:18"
                        const dataFormatada = `${dia}/${mes}/${ano} ${hora}:${minuto}:${segundo}`;
                        
                        if(ultimosAlertas[i].descricao == "Atenção"){
                            divNotificacao.innerHTML += `
                                <div class="div-caixa-mensagem">
                                    <div class="caixa-mensagem cuidado">
                                        <p>${ultimosAlertas[i].descricaoAlerta}</p>
                                        <p>Hardware: ${ultimosAlertas[i].tipoHardware} ${ultimosAlertas[i].valorCaptura} ${ultimosAlertas[i].unidadeMedida}</p>
                                        <p>Data: ${dataFormatada}</p>
                                    </div>
                                </div>
                                `;
                        }
                    }
                    
                });
  
            } else {
  
  
                ultimosAlertas.text().then(texto => {
                    console.error(texto);
                    // finalizarAguardar(texto);
                });
            }
  
        })
        .catch(function (erro) {
            console.log(erro);
        })

    }

    function verListaComputador(){
        window.location.href = "lista-computador.html"
    }

    
function atualizarGraficoCpu(myChart2,dados2){
    console.log("teste")
    fetch("/computadores/atualizarGraficoCpu", {
        method: "POST",
        headers: {
              "Content-Type": "application/json"
        },
        body: JSON.stringify({
                // crie um atributo que recebe o valor recuperado aqui
                // Agora vá para o arquivo routes/usuario.js
                //Dados da primeira pag de cadastro
            idComputadorServer : sessionStorage.ID_COMPUTADOR,
            idHardwareServer : 1
        })
    
    })
        .then(function (resposta) {
            if (resposta.ok){
                resposta.json().then(json => {
                        const dataObj = new Date(json[0].dtCaptura);
                        const agora = new Date();

                        var diferenca = agora - dataObj;

                        var mensagem;

                        const segundo = Math.floor(diferenca / 1000);

                        if (segundo < 60) {
                            mensagem = `Há ${segundo} segundo${segundo > 1 ? 's' : ''}`;
                        } else if (segundo < 3600) {
                            const minutos = Math.floor(segundo / 60);
                            mensagem = `Há ${minutos} minuto${minutos > 1 ? 's' : ''}`;
                        } else if (segundo < 86400) {
                            const horas = Math.floor(segundo / 3600);
                            mensagem = `Há ${horas} hora${horas > 1 ? 's' : ''}`;
                        } else {
                            const dias = Math.floor(segundo / 86400);
                            const horasRestantes = Math.floor((segundo % 86400) / 3600);
                            mensagem = `Há ${dias} dia${dias > 1 ? 's' : ''} e ${horasRestantes} hora${horasRestantes > 1 ? 's' : ''}`;
                        }

                    if(json[0].valor != dados2.datasets[0].data[dados2.datasets[0].data.length - 1] || mensagem == dados2.labels[dados2.labels.length - 1]){

                        if(json[0].valor >= (json[0].capacidade - 10)){
                            cpuId.style.backgroundColor = "#FF3C3C";
                        }
                        else if(json[0].valor >= (json[0].capacidade - 20)){
                            cpuId.style.backgroundColor = "#E0CB11";
                        }
                        else{
                            cpuId.style.backgroundColor = "#DFDFDF";
                        }
                        dados2.labels.shift();
                        dados2.labels.push(mensagem);
                        dados2.datasets[0].data.shift();
                        dados2.datasets[0].data.push(json[0].valor);

                        const novoMaximoY = Math.max(...dados2.datasets[0].data) + 5;
                        myChart2.options.scales.y.max = novoMaximoY;
                        myChart2.options.scales.y.ticks.max = novoMaximoY;
                        myChart2.update();
                    }
                    proximaAtualizacaoCpu = setTimeout(() => atualizarGraficoCpu(myChart2,dados2), 1000);

            })
            }
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
    
 
   
    }



    function atualizarGraficoDisco(myChart,dados){
        console.log("teste")
        fetch("/computadores/consultarDados", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
              body: JSON.stringify({
                  // crie um atributo que recebe o valor recuperado aqui
                  // Agora vá para o arquivo routes/usuario.js
                  //Dados da primeira pag de cadastro
                  idComputadorServer : sessionStorage.ID_COMPUTADOR,
                  idHardwareServer : 3
              })
        
        })
            .then(function (resposta) {
                if (resposta.ok){
                    resposta.json().then(json => {
                        if(json[0].valor != dados.datasets[0].data[dados.datasets[0].data.length - 1]){
                        

                            var capacidade = json[0].capacidade;
                            var uso = json[0].valor;
                            uso = parseInt((uso / capacidade) * 100);
                            var disponivel = parseInt(100 - uso);
                            
                            if(disponivel <= 10){
                                discoId.style.backgroundColor = "#FF3C3C";
                            }
                            else if(disponivel <= 50){
                                discoId.style.backgroundColor = "#E0CB11";
                            }
                            else{
                                discoId.style.backgroundColor = "#DFDFDF";
                            }

                            dados.datasets[0].data.length = 0;
                            dados.datasets[0].data.push(uso);
                            dados.datasets[0].data.push(disponivel);

                            myChart.update();
                        }
                        proximaAtualizacaoDisco = setTimeout(() => atualizarGraficoDisco(myChart,dados), 30000);
    
                })
                }
            })
            .catch(function (resposta) {
                console.log(`#ERRO: ${resposta}`);
            });
        
     
       
        }


        function atualizarGraficoRam(myChart3,dados3,capacidade){
            console.log("teste")
            fetch("/computadores/consultarDados", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                  body: JSON.stringify({
                      // crie um atributo que recebe o valor recuperado aqui
                      // Agora vá para o arquivo routes/usuario.js
                      //Dados da primeira pag de cadastro
                      idComputadorServer : sessionStorage.ID_COMPUTADOR,
                      idHardwareServer : 2
                  })
            })
                .then(function (resposta) {
                    
                    if (resposta.ok){
                        resposta.json().then(json => {
                            if(json[0].valor != dados3.datasets[0].data[dados3.datasets[0].data.length - 1]){
                                

                                var capacidade = json[0].capacidade;
                                var uso = json[0].valor;
                                uso = parseInt((uso / capacidade) * 100);
                                var disponivel = parseInt(100 - uso);
                                
                                if(disponivel < 10){
                                    ramId.style.backgroundColor = "#FF3C3C";
                                }
                                else if(disponivel < 50){
                                    ramId.style.backgroundColor = "#E0CB11";
                                }
                                else{
                                    ramId.style.backgroundColor = "#DFDFDF";
                                }
                                dados3.datasets[0].data.length = 0;
                                dados3.datasets[0].data.push(uso);
                                dados3.datasets[0].data.push(disponivel);
    
                                myChart3.update();
                            }
                            proximaAtualizacaoRam = setTimeout(() => atualizarGraficoRam(myChart3,dados3,capacidade), 30000);
        
                    })
                    }
                })
                .catch(function (resposta) {
                    console.log(`#ERRO: ${resposta}`);
                });
            
         
           
            }




