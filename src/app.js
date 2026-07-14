// Variável global para armazenar o elemento que está sendo arrastado
let draggedElement = null;

// Só executa se estiver no ambiente do navegador
if (typeof document !== 'undefined') {
    
    document.addEventListener('dragover', (e) => {
        // Verifica se o usuário está arrastando algo por cima de uma lista de tarefas
        const list = e.target.closest('.task-list');
        if (!list || !draggedElement) return;

        e.preventDefault(); // Obrigatório para permitir o "drop" 
        
        const afterElement = getDragAfterElement(list, e.clientY);
        if (afterElement == null) {
            list.appendChild(draggedElement);
        } else {
            list.insertBefore(draggedElement, afterElement);
        }
    });
}

// Função para descobrir em qual posição da lista o item deve entrar
function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.task:not(.dragging)')];
    
    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}

// Função para mudar o tema (Dark / Light Mode)
function toggleTheme() {
    const body = document.body;
    const btn = document.getElementById('theme-toggle');
    body.classList.toggle('light-mode');
    
    if (body.classList.contains('light-mode')) {
        btn.textContent = 'Light mode';
    } else {
        btn.textContent = 'DARK';
    }
}

// Função do Tutorial
function showTutorial() {
    alert(
        "--- TUTORIAL DO GERENCIADOR ---\n\n" +
        "1. Arrastar e Soltar: Clique e segure em uma tarefa para movê-la entre as colunas.\n" +
        "2. DARK/Light mode: Altera a cor de fundo.\n" +
        "3. Configs: Permite editar as tarefas daquela coluna.\n" +
        "4. Criar tarefa: Adiciona uma nova tarefa na base da coluna escolhida.\n" +
        "5. Salvar: Abre a tela de impressão para salvar em PDF.\n" +
        "6. Deletar: Apaga todas as tarefas após confirmação."
    );
}

// Função para criar tarefa com eventos de arrastar inclusos
function createTask(listId) {
    const title = prompt("Digite o título da tarefa:");
    if (!title) return;
    
    const description = prompt("Digite a descrição da tarefa:");
    
    const taskList = document.getElementById(listId);
    const taskDiv = document.createElement('div');
    taskDiv.className = 'task';
    taskDiv.setAttribute('draggable', 'true'); // Torna o elemento arrastável
    taskDiv.innerHTML = `<h3>${title}</h3><p>${description}</p>`;
    
    // Eventos de arrastar acoplados diretamente ao novo card criado
    taskDiv.addEventListener('dragstart', () => {
        draggedElement = taskDiv;
        taskDiv.classList.add('dragging');
    });

    taskDiv.addEventListener('dragend', () => {
        taskDiv.classList.remove('dragging');
        draggedElement = null;
    });
    
    taskList.appendChild(taskDiv); 
}

// Função do botão Configs (Editar tarefas da coluna)
function configColumn(listId) {
    const taskList = document.getElementById(listId);
    if (taskList.children.length === 0) {
        alert("Não há tarefas nesta coluna para configurar.");
        return;
    }
    
    const index = prompt(`Existem ${taskList.children.length} tarefas nesta coluna.\nQual delas você quer editar? (Digite um número de 1 a ${taskList.children.length})`);
    
    if (index && !isNaN(index) && index > 0 && index <= taskList.children.length) {
        const taskToEdit = taskList.children[index - 1];
        const currentTitle = taskToEdit.querySelector('h3').innerText;
        const currentDesc = taskToEdit.querySelector('p').innerText;
        
        const newTitle = prompt("Novo título:", currentTitle);
        const newDesc = prompt("Nova descrição:", currentDesc);
        
        if (newTitle !== null) taskToEdit.querySelector('h3').innerText = newTitle;
        if (newDesc !== null) taskToEdit.querySelector('p').innerText = newDesc;
    } else {
        if(index) alert("Número inválido.");
    }
}

// Função Salvar (Utiliza a impressão do navegador para gerar PDF)
function saveBoard() {
    window.print();
}

// Função Deletar (com confirmação)
function deleteAllTasks() {
    const confirmDelete = confirm("CUIDADO!\nVocê tem certeza que deseja apagar TODAS as tarefas de todos os quadros?");
    
    if (confirmDelete) {
        document.getElementById('todo-list').innerHTML = '';
        document.getElementById('progress-list').innerHTML = '';
        document.getElementById('done-list').innerHTML = '';
    }  //teste da esteira do git hub actions
}