// requisição ajax que retorna todos os projetos cadastrados no banco de dados
let ajax = new XMLHttpRequest();
ajax.open('GET', '/projects', true);
ajax.onreadystatechange = () =>{
    if(ajax.status === 200 && ajax.readyState === 4){
        let response = JSON.parse(ajax.responseText);
        console.log(response);
        for(let i = 0; i < response.length; i++){
            $('#tableProjects').append(
                `<tr>
                    <td>${response[i].ProjetoID}</td>
                    <td>${response[i].NomeProjeto}</td>
                    <td>${response[i].PrincipalResponsavel}</td>
                    <td>${response[i].Estado}</td>
                    <td><a href="/alterarprojeto?id=${response[i].ProjetoID}"><i class="fa-solid fa-pen-to-square"></i></a></td>
                    <td><i class="fa-solid fa-trash-can" onclick="showDeleteToastProject(${response[i].ProjetoID})"></i></td>
                </tr>`
            );
        }
    }
}

ajax.send();


// requisição ajax que retorna todos os funcionários cadastrados no banco de dados
let ajax2 = new XMLHttpRequest();
    ajax2.open('GET', '/employees', true);
    ajax2.onreadystatechange = () =>{
    if(ajax2.status === 200 && ajax2.readyState === 4){
        let response = JSON.parse(ajax2.response);
        console.log(response);
        for(let i = 0; i < response.length; i++){
            $('#tableEmployees').append(
            `<tr>
                <td>${response[i].Registro}</td>
                <td>${response[i].Nome}</td>
                <td>${response[i].Titulo}</td>
                <td>${response[i].HorasProjetos}</td>
                <td>${response[i].Estado}</td>
                <td>
                  <span >13</span>
                </td>
                <td><a href="/alterarfuncionario?id=${response[i].FuncionarioID}"><i class="fa-solid fa-pen-to-square"></i></a></td>
                <td><i class="fa-solid fa-trash-can" onclick="showDeleteToastEmployee(${response[i].FuncionarioID})"></i></td>
             </tr>`
            );
        }
    }
}

ajax2.send();

let ajax3 = new XMLHttpRequest();
    ajax3.open('GET', '/role', true);
    ajax3.onreadystatechange = () =>{
    if(ajax3.status === 200 && ajax3.readyState === 4){
        let response = JSON.parse(ajax3.response);
        console.log(response);
        for(let i = 0; i < response.length; i++){
            $('#tableFunctions').append(
            `<tr>
                <td>${response[i].FuncaoID}</td>
                <td>${response[i].Titulo}</td>
                <td>${response[i].Area}</td>
                <td><a href="/alterarfunc?id=${response[i].FuncaoID}"><i class="fa-solid fa-pen-to-square"></i></a></td>
                <td><i class="fa-solid fa-trash-can" onclick="showDeleteToastFunction(${response[i].FuncaoID})"></i></td>
             </tr>`
            );
        }
    }
}

ajax3.send();

let ajax4 = new XMLHttpRequest();
    ajax4.open('GET', '/governance', true);
    ajax4.onreadystatechange = () =>{
    if(ajax4.status === 200 && ajax4.readyState === 4){
        let response = JSON.parse(ajax4.response);
        console.log(response);
        for(let i = 0; i < response.length; i++){
            $('#tableGovernances').append(
            `<tr>
                <td>${response[i].GovernancaID}</td>
                <td>${response[i].Pais}</td>
                <td>${response[i].Estado}</td>
                <td>${response[i].Endereco}</td>
                <td><a href="/alterargov?id=${response[i].GovernancaID}"><i class="fa-solid fa-pen-to-square"></i></i></a></td>
                <td><i class="fa-solid fa-trash-can" onclick="showDeleteToastGovernance(${response[i].GovernancaID})"></i></td>
             </tr>`
            );
        }
    }
}

ajax4.send();


function showDeleteToastProject(id){
    swal({
        title: "Deseja excluir esse projeto?",
        icon: "info",
        buttons: [
            'Cancelar', 'Excluir'
        ],
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
            let url = '/deleteproject';
            $.ajax({
                type: 'POST',
                url: url,
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                data: JSON.stringify({
                    'id': id
                })
            })
          swal("Projeto deletado com sucesso!", {
            icon: "success",
            dangerMode: true
          }).then((ok) =>{
            if(ok){
               location.reload();
            }
          })
         }
      });
}


function showDeleteToastEmployee(id){
    swal({
        title: "Deseja excluir esse funcionário(a)?",
        icon: "info",
        buttons: [
            'Cancelar', 'Excluir'
        ],
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
            let url = '/deleteemployee';
            $.ajax({
                type: 'POST',
                url: url,
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                data: JSON.stringify({
                    'id': id
                })
            })
          swal("Funcionário(a) deletado com sucesso!", {
            icon: "success",
            dangerMode: true
          }).then((ok) =>{
            if(ok){
               location.reload();
            }
          })
         }
      });
}

function showDeleteToastFunction(id){
    swal({
        title: "Deseja excluir essa função?",
        icon: "info",
        buttons: [
            'Cancelar', 'Excluir'
        ],
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
            let url = '/deletefunc';
            $.ajax({
                type: 'POST',
                url: url,
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                data: JSON.stringify({
                    'id': id
                })
            })
          swal("Função deletada com sucesso!", {
            icon: "success",
            dangerMode: true
          }).then((ok) =>{
            if(ok){
                location.reload();
            }
          })
         }
      });
}

function showDeleteToastGovernance(id){
    swal({
        title: "Deseja excluir essa governança?",
        icon: "info",
        buttons: [
            'Cancelar', 'Excluir'
        ],
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
            let url = '/deletegov';
            $.ajax({
                type: 'POST',
                url: url,
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                data: JSON.stringify({
                    'id': id
                })
            })
          swal("Governança deletada com sucesso!", {
            icon: "success",
            dangerMode: true
          }).then((ok) =>{
            if(ok){
               location.reload();
            }
          })
         }
      });
}