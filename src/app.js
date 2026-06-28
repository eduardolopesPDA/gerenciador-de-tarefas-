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
                "1. DARK/Light mode: Altera a cor de fundo.\n" +
                "2. Configs: Permite editar as tarefas da coluna selecionada.\n" +
                "3. Criar tarefa: Adiciona uma nova tarefa na ordem de chegada (de cima para baixo).\n" +
                "4. Salvar: Salva o quadro atual em formato PDF (abre a tela de impressão).\n" +
                "5. Deletar: Apaga todas as tarefas do quadro após confirmação."
            );
        }

        // Função para criar tarefa
        function createTask(listId) {
            const title = prompt("Digite o título da tarefa:");
            if (!title) return; // Cancela se não colocar título
            
            const description = prompt("Digite a descrição da tarefa:");
            
            const taskList = document.getElementById(listId);
            const taskDiv = document.createElement('div');
            taskDiv.className = 'task';
            taskDiv.innerHTML = `<h3>${title}</h3><p>${description}</p>`;
            
            // Adiciona no final da lista (ordem de chegada: primeira no topo, próxima embaixo)
            taskList.appendChild(taskDiv); 
        }

        // Função do botão Configs (Editar tarefas da coluna)
        function configColumn(listId) {
            const taskList = document.getElementById(listId);
            if (taskList.children.length === 0) {
                alert("Não há tarefas nesta coluna para configurar.");
                return;
            }
            
            // Simplificação para o Front-end: Pergunta qual tarefa editar (pelo índice)
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
            }
        }