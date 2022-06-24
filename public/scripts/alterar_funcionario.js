if(localStorage.getItem('message')){
    if(localStorage.getItem('message') == 'updated employee'){
        toastShow();
        localStorage.removeItem('message');
    }
}

function addToastUpdate(){
    localStorage.setItem('message', 'updated employee');
}

function toastShow(){
    swal("Funcionário(a) atualizado com sucesso!", '', "success", {
        dangerMode: true,
    });
}