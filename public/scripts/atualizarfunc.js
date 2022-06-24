if(localStorage.getItem('message')){
    if(localStorage.getItem('message') == 'created governance'){
        toastShow();
        localStorage.removeItem('message');
    }
}

function addToast(){
    localStorage.setItem('message', 'created governance');
}

function toastShow(){
    swal("Função Atualizada com Sucesso!", '', "success", {
        dangerMode: true,
    });
}