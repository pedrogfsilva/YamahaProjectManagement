if(localStorage.getItem('message')){
    if(localStorage.getItem('message') == 'created role'){
        toastShow();
        localStorage.removeItem('message');
    }
}

function addToast(){
    localStorage.setItem('message', 'created role');
}

function toastShow(){
    swal("Função cadastrada com sucesso!", '', "success", {
        dangerMode: true,
    });
}