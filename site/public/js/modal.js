    var lista = document.getElementById("lista");
    var fundoModal = document.getElementById("fundo_modal");



    function abrirModal(num,locataria,modelo){

        
        var modal = document.getElementById(`modal${num}`);

        fundoModal.style.display = "flex"
        modal.style.display = "flex"
        lista.style.display = "none"

        exibirEmpresasModal(num,locataria)
        exibirModelosModal(num,modelo)

    }

    function fecharModal(num){


        var modal = document.getElementById(`modal${num}`);

        fundoModal.style.display = "none"
        modal.style.display = "none"
        lista.style.display = "flex"
        // Remover o atributo disabled dos campos de entrada
        var camposDeEntrada = document.querySelectorAll(`
        #listaModelos${num},
        #ipt_modelo_nome${num},
        #ipt_min${num},
        #ipt_max${num},
        #listaEmpresa${num}
        `);
        camposDeEntrada.forEach(campo => campo.removeAttribute("disabled"));
    }

    function bloquearCampos(idComputador,conjuntoCampos){

    
        //modelo da lista
        var listaModelo = 'listaModelos'+idComputador;
        listaModelo = document.getElementById(listaModelo);
        var modeloSelect = listaModelo.value;


        //Modelo input
        var inputModelo = 'ipt_modelo_nome'+idComputador;
        inputModelo = document.getElementById(inputModelo);
        var modeloInput = inputModelo.value;

        // minimo e maximo
        var inputMin = 'ipt_min'+idComputador;
        inputMin = document.getElementById(inputMin);
        var min = inputMin.value;

        var inputMax = 'ipt_max'+idComputador;
        inputMax = document.getElementById(inputMax);
        var max = inputMax.value;


        //empresa da lista
        var listaEmpresa = 'listaEmpresa'+idComputador;
        listaEmpresa = document.getElementById(listaEmpresa);
        var empresaSelect = listaEmpresa.value;

        if(conjuntoCampos == "Listas"){
            inputMin.disabled = true;
            inputMax.disabled = true;
            inputModelo.disabled = true;
        }
        else{
            listaModelo.disabled = true;
            listaEmpresa.disabled = true;
        }

    }

    function desbloquearCampos(idComputador){

        //modelo da lista
        var listaModelo = 'listaModelos'+idComputador;
        listaModelo = document.getElementById(listaModelo);
        var modeloSelect = listaModelo.value;


        //Modelo input
        var inputModelo = 'ipt_modelo_nome'+idComputador;
        inputModelo = document.getElementById(inputModelo);
        var modeloInput = inputModelo.value;

        // minimo e maximo
        var inputMin = 'ipt_min'+idComputador;
        inputMin = document.getElementById(inputMin);
        var min = inputMin.value;

        var inputMax = 'ipt_max'+idComputador;
        inputMax = document.getElementById(inputMax);
        var max = inputMax.value;


        //empresa da lista
        var listaEmpresa = 'listaEmpresa'+idComputador;
        listaEmpresa = document.getElementById(listaEmpresa);
        var empresaSelect = listaEmpresa.value;


        inputMin.disabled = false;
        inputMax.disabled = false;
        inputModelo.disabled = false;
        listaModelo.disabled = false;
        listaEmpresa.disabled = false;

        inputMin.value = "";
        inputMax.value = "";
        inputModelo.value = "";
        listaModelo.value = "";
        listaEmpresa.value = "";

    }