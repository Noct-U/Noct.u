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

    // setTimeout(() => atualizarGrafico(idAquario, dados, myChart), 2000);
}


//Plotar Grafico Ram
function plotarGraficoRam(capacidade,uso,simbolo) {           

        var dados3 = {
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

        //convertendo em porcentagem
        uso = parseInt((uso / capacidade) * 100);
        var disponivel = parseInt(100 - uso);

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

    // setTimeout(() => atualizarGrafico(idAquario, dados, myChart), 2000);
    }




    function obterDadosGraficoCpu(idComputador){
     //GRAFICO RAM

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
        var minutosCaptura = dataObj.getMinutes()
        var segundosCaptura = dataObj.getSeconds()


        const dataAtual = new Date();
        var minutosAtual = dataAtual.getMinutes();
        var segundosAtual = dataAtual.getSeconds();


        var minutos = 60 * (minutosAtual - minutosCaptura);
        var segundos = minutos + (segundosAtual - segundosCaptura);



        dados2.labels.push("Há " + segundos + " segs");
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
            },
            };

        // Adicionando gráfico criado em div na tela
        let myChart2 = new Chart(
            document.getElementById(`myChartCanvasGeral2`),
            config2
        );

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