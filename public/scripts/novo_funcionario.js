if(localStorage.getItem('message')){
    if(localStorage.getItem('message') == 'created employee'){
        toastShow();
        localStorage.removeItem('message');
    }
};

// requisição ajax que retorna todas as funções cadastradas no banco de dados
let ajax = new XMLHttpRequest();
ajax.open('GET', '/role', true);

ajax.onreadystatechange = () =>{
    if(ajax.status === 200 && ajax.readyState === 4){
        let response = JSON.parse(ajax.responseText);
        console.log(response);
        for(let i = 0; i < response.length; i++){
            $('#funcaoID').append(`
            <option value="${response[i].FuncaoID}">${response[i].Titulo}</option>
            `);
        }
    }
}
ajax.send();


// requisição ajax que retorna todas as governanças cadastradas no banco de dados
let funcajax = new XMLHttpRequest();
funcajax.open('GET', '/governance', true);
funcajax.onreadystatechange = () =>{
    if(funcajax.status === 200 && funcajax.readyState === 4){
        let response = JSON.parse(funcajax.responseText);
        console.log(response);
        for(let i = 0; i < response.length; i++){
            $('.governanca').append(`
            <option value="${response[i].GovernancaID}">${response[i].Estado}</option>
            `);
        }
    }
}
funcajax.send();

function addToast(){
    localStorage.setItem('message', 'created employee')
}

function toastShow(){
    swal("Funcionário(a) cadastrado com sucesso!", '', "success", {
        dangerMode: true,
    });
}