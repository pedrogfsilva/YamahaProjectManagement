let xmlh2 = new XMLHttpRequest();
const urlid = new URLSearchParams(window.location.search); 
let projid = urlid.get('id');
let attFunc = [];
console.log(attFunc);


xmlh2.open('GET', `/alteraratt?id=${projid}`, true); 
xmlh2.onreadystatechange = () => {
    if(xmlh2.status === 200 && xmlh2.readyState === 4) {
        let response = JSON.parse(xmlh2.responseText); 
        for(let i = 0; i < response.length; i++) {
            $('#no_status').append(
            `
                <div class="todo" draggable="true">
                <button id="add_btn" class="${response[i].FuncionarioID}" data-target-modal="#todo_form${response[i].FuncionarioID}" value="${response[i].FuncionarioID}">${response[i].Nome} ${response[i].Sobrenome}</button>
                <input id="idaloc" name="idaloc" type="hidden" value="${response[i].AlocacaoID}" > 
                <input id="idproj" name="idproj" type="hidden" value="${response[i].ProjetoID}" > 
                </div>
            `
            );
            $('#modal').append(
                `
                <form action="/updatealloc" method="post">
                <div class="modal" id="todo_form${response[i].FuncionarioID}">
                <div class="header">
                    <h1>${response[i].Nome} ${response[i].Sobrenome}</h1>
                </div>
                <div class="body">
                    <h4>Participação no Projeto</h4>
                    <input id="idfunc" name="idfunc" type="hidden" value="${response[i].FuncionarioID}" >
                    <input id="idaloc" name="idaloc" type="hidden" value="${response[i].AlocacaoID}" > 
                    <input id="idproj" name="idproj" type="hidden" value="${response[i].ProjetoID}" > 
                    <div id="datas">
                <div class="datai">
                  <p>Data de Início</p>
                  <input type="date" id="inicial" name="inicial">
                </div>
                <div class="dataf">
                <p>Data de Fim</p>
                <input type="date" id="final" name="final">
              </div>
              </div>
              <h4>Horas Mensais neste Projeto</h4>
              <div id="meses">
                <div class="hrs">
                  <p>Janeiro</p>
                  <input type="number" name="hrjan" class="hr jan" value="${response[i].HorasJaneiro}">
                </div>
                <div class="hrs">
                  <p>Fevereiro</p>
                  <input type="number" name="hrfev" class="hr fev" value="${response[i].HorasFevereiro}">
                </div>
                <div class="hrs">
                  <p>Março</p>
                  <input type="number" name="hrmar" class="hr mar" value="${response[i].HorasMarco}">
                </div>
                <div class="hrs">
                  <p>Abril</p>
                  <input type="number" name="hrabr" class="hr abr" value="${response[i].HorasAbril}">
                </div>
                <div class="hrs">
                  <p>Maio</p>
                  <input type="number" name="hrmai" class="hr mai" value="${response[i].HorasMaio}">
                </div>
                <div class="hrs">
                  <p>Junho</p>
                  <input type="number" name="hrjun" class="hr jun" value="${response[i].HorasJunho}">
                </div>
                <div class="hrs">
                  <p>Julho</p>
                  <input type="number" name="hrjul" class="hr jul" value="${response[i].HorasJulho}">
                </div>
                <div class="hrs">
                  <p>Agosto</p>
                  <input type="number" name="hrago" class="hr ago" value="${response[i].HorasAgosto}">
                </div>
                <div class="hrs">
                  <p>Setembro</p>
                  <input type="number" name="hrset" class="hr set" value="${response[i].HorasSetembro}">
                </div>
                <div class="hrs">
                  <p>Outubro</p>
                  <input type="number" name="hrout" class="hr out" value="${response[i].HorasOutubro}">
                </div>
                <div class="hrs">
                  <p>Novembro</p>
                  <input type="number" name="hrnov" class="hr nov" value="${response[i].HorasNovembro}">
                </div>
                <div class="hrs">
                  <p>Dezembro</p>
                  <input type="number" name="hrdez" class="hr dez" value="${response[i].HorasDezembro}">
                </div>
              </div>
              <div class="save">
              <button class="btn modal-btn" data-target-modal="#todo_form${response[i].FuncionarioID}">Salvar Alterações</button>
              </div>
                </div>
                </form>
                `);
            attFunc.push(response[i].FuncionarioID);
            console.log(attFunc);
        }
    }
};

xmlh2.send();

setTimeout(() => {
  let xmlh = new XMLHttpRequest();
  xmlh.open('GET', '/employees', true);
  xmlh.onreadystatechange = () => {
      if(xmlh.status === 200 && xmlh.readyState === 4){
          let response = JSON.parse(xmlh.responseText);
          for(let i = 0; i < response.length; i++){
              let funcAtt = response[i].FuncionarioID; 
              console.log('loop');
              console.log(attFunc);
              if (attFunc.includes(funcAtt)) {
                 console.log('já tem');
              } else {
                  $('#funcdisponiveis').append(`
                  <div class="todo" draggable="true">
                  <button id="add_btn" data-target-modal="#todo_form" value="${response[i].Nome}">${response[i].Nome} ${response[i].Sobrenome}</button>
                  <input id="idfunc" name="idfunc" type="hidden" value="${response[i].FuncionarioID}" > 
                  <input id="idaloc" name="idaloc" type="hidden" value="${response[i].AlocacaoID}" > 
                  </div>
                  `);
              }
          }
          const todos = document.querySelectorAll('.todo'); 
          const all_status = document.querySelectorAll('.status');
          let draggableTodo = null; 
      
          todos.forEach(
              (todo) => {
                  todo.addEventListener('dragstart', dragStart);
                  todo.addEventListener('dragend', dragEnd);
              });
      
          function dragStart(){
              draggableTodo = this; 
              console.log();
              setTimeout(() => {
                  this.style.display = 'none'; 
              }, 0);
          }
      
          function dragEnd(){
              draggableTodo = null; 
              setTimeout(() => {
                  this.style.display = 'block'; 
              }, 0);
          }
      
          all_status.forEach(status => {
              status.addEventListener('dragover', dragOver);
              status.addEventListener('dragenter', dragEnter);
              status.addEventListener('dragleave', dragLeave);
              status.addEventListener('drop', dragDrop);
          }); 
      
          function dragOver(e){
              e.preventDefault(); 
          }
      
          function dragEnter(){
              this.style.border = '1px dashed #ccc';
          }
      
          function dragLeave(){
              this.style.border = 'none';
          }
      
          function dragDrop(){
              this.style.border = 'none';
              this.appendChild(draggableTodo);
          
              if (this == document.querySelector("#no_status")) {
                showAttribute(draggableTodo.childNodes[3].value);
              } else {
                deleteAttribute(draggableTodo.childNodes[3].value);
                console.log(draggableTodo.childNodes[3].value);
              }
          }
      
          // Modal 
      
          const btns = document.querySelectorAll("[data-target-modal]");
          const close_modals = document.querySelectorAll(".modal-btn"); 
          const overlay = document.querySelector("#overlay");
      
          btns.forEach(btn => {
              btn.addEventListener('click', () => {
                  document.querySelector(btn.dataset.targetModal).classList.add('active');
                  overlay.classList.add("active");
              })
          });
      
          close_modals.forEach(btn => {
              btn.addEventListener('click', () => {
                  //Duas maneiras de remover o Modal.
                  document.querySelector(btn.dataset.targetModal).classList.remove('active');
                  // btn.closest(".modal").classList.remove("active"); 
                  overlay.classList.remove("active"); 
              })
          });
      
          window.onclick = (e) => {
              if (e.target == overlay) {
                  const modals = document.querySelectorAll('.modal');
                  modals.forEach(modal => modal.classList.remove('active'));
                  overlay.classList.remove("active");  
              }
          }
          }
  }
  
  xmlh.send();
  
}, 100);



if(localStorage.getItem('message')){
    if(localStorage.getItem('message') == 'updated project'){
        toastShow();
        localStorage.removeItem('message');
    }
}

function addToastUpdate(){
    localStorage.setItem('message', 'updated project');
}

function toastShow(){
    swal("Projeto atualizado com sucesso!", '', "success", {
        dangerMode: true,
    });
}


function showAttribute (id){
    swal({
        title: `Deseja atribuir este funcionário a este projeto?`,
        icon: "info",
        buttons: [
            'Cancelar', 'Atribuir'
        ],
        dangerMode: false,
      })
      .then((willAtt) => {
        if (willAtt) {
            let url = '/alocation';
            $.ajax({
                type: 'POST',
                url: url,
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                data: JSON.stringify({
                    'funcionario': id,
                    'projeto' : projid
                })
            });
          swal("Funcionário atribuido com sucesso", {
            icon: "success",
            dangerMode: false
          }).then((ok) =>{
            if(ok){
                location.reload();
            }
          })
         }
      });
}


function deleteAttribute (id){
    swal({
        title: `Deseja remover o funcionário?`,
        icon: "info",
        buttons: [
            'Cancelar', 'Remover'
        ],
        dangerMode: true,
      })
      .then((willAtt) => {
        if (willAtt) {
            let url = '/deleteatt';
            $.ajax({
                type: 'POST',
                url: url,
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                data: JSON.stringify({
                    'alocacao': id
                })
            });
          swal("Funcionário desatribuido com sucesso", {
            icon: "success",
            dangerMode: false
          }).then((ok) =>{
            if(ok){
                location.reload();
            }
          })
         }
      });
}

