var lista = document.getElementById("lista");
var fundoModal = document.getElementById("fundo_modal");



function abrirModal(num,locataria){

    
    var modal = document.getElementById(`modal${num}`);

    fundoModal.style.display = "flex"
    modal.style.display = "flex"
    lista.style.display = "none"

    exibirEmpresasModal(num,locataria)
}

function fecharModal(num){


    var modal = document.getElementById(`modal${num}`);

    fundoModal.style.display = "none"
    modal.style.display = "none"
    lista.style.display = "flex"
}