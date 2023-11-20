
    nomeEmpresa.innerHTML = sessionStorage.NOME_EMPRESA;


    function quantidadeAlertas(){
        var quantidadeAlertas = document.getElementById("numero_alertas");
        var dataAnalise = document.getElementById("data_analise");

        fetch("/alertas/quantidadeAlertas", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({

                idEmpresaServer : sessionStorage.ID_EMPRESA,
            }),
        
        })
            .then(function (resposta) {
                if (resposta.ok){
                    resposta.json().then(json => {
                        const dataAtual = new Date();

                        const dia = String(dataAtual.getDate()).padStart(2, '0');
                        const mes = String(dataAtual.getMonth() + 1).padStart(2, '0'); // Mês é baseado em zero
                        const ano = dataAtual.getFullYear();

                        var data = `${dia}/${mes}/${ano}`;

                        console.log(json);
                        quantidadeAlertas.innerHTML = json[0].quantidadeAlerta;
                        dataAnalise.innerHTML = `Data Análise: ${data}`;
                    })
                }
                
            })
            .catch(function (resposta) {
                console.log(`#ERRO: ${resposta}`);
            });
    }

    function quantidadeAlertasPorEmpresa(){
        var divEmpresaAlertas = document.getElementById("alertas_empresas");

        fetch("/alertas/quantidadeAlertasPorEmpresa", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({

                idEmpresaServer : sessionStorage.ID_EMPRESA,
                nomeAlertaServer: "Urgente"
            }),
        
        })
            .then(function (resposta) {
                if (resposta.ok){
                    resposta.json().then(json => {

                        for(var i = 0; i < json.length; i++ ){
                            divEmpresaAlertas.innerHTML +=
                            `
                                <div class="label-kpi3">
                                    <label for="">${json[i].nomeLocataria}</label>
                                    <div>
                                        <label class="num-vermelho" for="">${json[i].quantidadeAlerta}</label>
                                    </div>
                                </div>
                            `;
                        }
                        
                })
                }
            })
            .catch(function (resposta) {
                console.log(`#ERRO: ${resposta}`);
            });
    }

    //obter dados do grafico irregularidade por modelo
    function dadosIrregularidadesModelo(){
        

        fetch("/alertas/consultaIrregularidadesModelo", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({

                idEmpresaServer : sessionStorage.ID_EMPRESA,
            }),
        
        })
            .then(function (resposta) {
                if (resposta.ok){
                    resposta.json().then(json => {

                        console.log(JSON.stringify(json))
                        console.log(json)

                        plotarGraficoIrregularidadesModelo(json)
                })
                }
            })
            .catch(function (resposta) {
                console.log(`#ERRO: ${resposta}`);
            });
    }


   

function plotarGraficoIrregularidadesModelo(Irregularidades){


    var dados = {
        labels: [],
        datasets: [
            {
                label: 'Irregularidades',
                data: [],
                backgroundColor: ['rgb(96, 116, 188)', 'rgb(9, 19, 56)'],
                borderWidth: 1,
            }

        ]
    };

    for(var i = 0; i < Irregularidades.length; i++ ){
        dados.labels.push(Irregularidades[i].modelo)
        dados.datasets[0].data.push(Irregularidades[i].quantidadeAlertas)
    }
    
    const config = {
        type: 'bar',
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
}




    //obter dados do grafico irregularidade por empresa
    function dadosIrregularidadesEmpresa(){
        

        fetch("/alertas/consultaIrregularidadesEmpresa", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({

                idEmpresaServer : sessionStorage.ID_EMPRESA,
            }),
        
        })
            .then(function (resposta) {
                if (resposta.ok){
                    resposta.json().then(json => {

                        console.log(JSON.stringify(json))
                        console.log(json)

                        plotarGraficoIrregularidadesEmpresa(json)
                })
                }
            })
            .catch(function (resposta) {
                console.log(`#ERRO: ${resposta}`);
            });
    }


   

function plotarGraficoIrregularidadesEmpresa(Irregularidades){


    var dados3 = {
        labels: [],
        datasets: [
            {
                label: 'Irregularidades',
                data: [],
                backgroundColor: ['rgb(96, 116, 188)', 'rgb(9, 19, 56)'],
                borderWidth: 1,
            }

        ]
    };

    for(var i = 0; i < Irregularidades.length; i++ ){
        dados3.labels.push(Irregularidades[i].modelo)
        dados3.datasets[0].data.push(Irregularidades[i].quantidadeAlertas)
    }
    
    const config3 = {
        type: 'bar',
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
}



    
  //obter dados do grafico irregularidade ultima hora
  function dadosIrregularidadesUltimasHoras(){
        

    fetch("/alertas/consultaIrregularidadesUltimasHoras", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({

            idEmpresaServer : sessionStorage.ID_EMPRESA,
        }),
    
    })
        .then(function (resposta) {
            if (resposta.ok){
                resposta.json().then(json => {

                    console.log(JSON.stringify(json))
                    console.log(json)

                    plotarGraficoIrregularidadesUltimasHoras(json)
            })
            }
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
}




function plotarGraficoIrregularidadesUltimasHoras(Irregularidades){


var dados2 = {
    labels: [],
    datasets: [
        {
            label: 'Irregularidades',
            data: [],
            backgroundColor: 'red',
            borderColor: 'red', 
            borderWidth: 2 
        }

    ]
};

for(var i = 0; i < Irregularidades.length; i++ ){
    dados2.labels.push("h"+Irregularidades[i].hora+":00")
    dados2.datasets[0].data.push(Irregularidades[i].qtd_alertas)
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
                max: 5
            }
        },
        backgroundColor:'rgb(96, 116, 188)'
    },
};


// Adicionando gráfico criado em div na tela
let myChart2 = new Chart(
    document.getElementById(`myChartCanvasGeral2`),
    config2

);
}