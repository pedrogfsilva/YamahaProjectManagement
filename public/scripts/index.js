// SERGJAO

    // Adicionar classe "Selecionado" na div atual

    let list = document.querySelectorAll('.navbar li');

    function activeLink(){
        list.forEach((item) =>
        item.classList.remove('hovered'));
        this.classList.add('hovered')
    }
    list.forEach((item) =>
    item.addEventListener('mouseover', activeLink));

    // Esconder o menu da navbar

    let toggle = document.querySelector('.toggle');
    let navbar = document.querySelector('.navbar');
    let main = document.querySelector('.main');

    toggle.onclick = function(){
        navbar.classList.toggle('active');
        main.classList.toggle('active');
    }

    // Desabilitar a Data

    function disable() {
        if (document.getElementById('ignorainicial').checked == true) {
            document.getElementById('inicial').disabled = true
        }
        else {
            document.getElementById('inicial').disabled = false
        }
        if (document.getElementById('ignorafinal').checked == true) {
            document.getElementById('final').disabled = true
        }
        else {
            document.getElementById('final').disabled = false
        }
    }

    /* ATRIBUIR FUNCIONÁRIOS*/
    // Drag Tasks

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
    console.log(this);
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