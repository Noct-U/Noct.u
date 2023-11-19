    var lista = document.getElementById("lista");
    var fundoModal = document.getElementById("fundo_modal");



    function abrirModal(num,locataria,modelo){

        var modal = document.getElementById(`modal${num}`);

        fundoModal.style.display = "flex"
        modal.style.display = "flex"
        lista.style.display = "none"

        // exibirEmpresasModal(num,locataria)
        // exibirModelosModal(num,modelo)

        exibirEmpresasModal(num,locataria)
        exibirModelosModal(num,modelo)

    }

    function fecharModal(num){


        var modal = document.getElementById(`modal${num}`);

        fundoModal.style.display = "none"
        modal.style.display = "none"
        lista.style.display = "flex"
        
    }


    function novoModelo(){

    }

    function abrirInputsCadastro(num){
        var btnModelo = document.getElementById(`btnModelo${num}`);
        var iptsAlterar = document.getElementById(`escolhaModelo${num}`);
        var iptsCadastro = document.getElementById(`cadastroModelo${num}`); 

        if(iptsAlterar.style.display == "flex"){
            btnModelo.innerHTML = "Alterar Modelo"
            iptsAlterar.style.display = "none"
            iptsCadastro.style.display = "flex"
        }
        else{
            btnModelo.innerHTML = "Novo Modelo"
            iptsAlterar.style.display = "flex"
            iptsCadastro.style.display = "none"
        }
    }