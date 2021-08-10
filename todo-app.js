(function() {
    // Создаём и возвращаем заголовок приложения
    function createAppTitle(title) {
        let appTitle = document.createElement('h2');

        appTitle.innerHTML = title;

        return appTitle;
    };

    // Создаём и возвращаем форму для создания дела
    function createTodoItemForm() {
        let form = document.createElement('form');
        let input = document.createElement('input');
        let buttonWrapper = document.createElement('div');
        let button = document.createElement('button');

        form.classList.add('input-group', 'mb-3');
        input.classList.add('form-control');
        input.placeholder = 'Введите название нового дела';
        buttonWrapper.classList.add('input-group-append');
        button.classList.add('btn', 'btn-primary');
        button.textContent = 'Добавить дело';
        button.disabled = true;

        buttonWrapper.append(button);
        form.append(input);
        form.append(buttonWrapper);

        return {
            form,
            input,
            button,
        };
    };
    
    // Создаём и возвращаем список элементов
    function createTodoList() {
        let list = document.createElement('ul');
        
        list.classList.add('list-group');

        return list;
    };

    function createTodoItem(name) {
        let item = document.createElement('li');
        // Кнопки помещаем в элемент, который красиво покажет их в одной группе
        let buttonGroup = document.createElement('div');
        let doneButton = document.createElement('button');
        let deleteButton = document.createElement('button');
 
        // Устанавливаем стили для элемента списка, а также для размещения кнопок
        // В его правой части с помощью flex
        item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        item.textContent = name;

        buttonGroup.classList.add('btn-group', 'btn-group-sm');
        doneButton.classList.add('btn', 'btn-success');
        doneButton.textContent = 'Готово';
        deleteButton.classList.add('btn', 'btn-danger');
        deleteButton.textContent = 'Удалить';

        // Вкладываем кнопки в отдельный элемент, чтобы они объядинились в один блок
        buttonGroup.append(doneButton);
        buttonGroup.append(deleteButton);
        item.append(buttonGroup);

        // Приложению нужен доступ к самому элементу и кнопкам, чтобы обрабатывать события нажатия
        return {
            item, 
            doneButton,
            deleteButton,
        };
    };

    function createTodoApp(container, title = 'Список дел', whoseCases) {
     
        let todoAppTitle = createAppTitle(title);
        let todoItemForm = createTodoItemForm();
        let todoList = createTodoList();

        todoAppTitle.classList.add('mb-3');
        
        container.append(todoAppTitle);
        container.append(todoItemForm.form);
        container.append(todoList);

        let initialCasesArray;

        if (whoseCases == 'myCases') {
            initialCasesArray = JSON.parse(localStorage.getItem('myCasesStorage'));
        } else if (whoseCases == 'momCases') {
            initialCasesArray = JSON.parse(localStorage.getItem('momCasesStorage'));
        } else if (whoseCases == 'dadCases') {
            initialCasesArray = JSON.parse(localStorage.getItem('dadCasesStorage'));
        };

        if (initialCasesArray != null) { // Если массив первоначальных данных существует, то производится его обработка
            // Обработка массива первоначальных данных
            
            // Трансформируем данные из первоначального массива
            function transformArray() {
                let nameArray = [];
                let doneArray = [];

                for (let i = 0; i < initialCasesArray.length; i++) {
                    if (initialCasesArray[i] == null) {
                        nameArray.push(null)
                    } else {
                         nameArray.push(initialCasesArray[i]['name'])
                    };
                };
                
                for (let i = 0; i < initialCasesArray.length; i++) {
                    if (initialCasesArray[i] == null) {
                        doneArray.push(null)
                    } else {
                        doneArray.push(initialCasesArray[i]['done'])
                    };
                };

                return {
                    nameArray,
                    doneArray,
                };
            };

            let todoItemNameArray = transformArray().nameArray;
            let todoItemDoneArray = transformArray().doneArray;
       
            // Создаём элементы из заданного массива
            for (let i = 0; i < initialCasesArray.length; i++) {
                if (initialCasesArray[i] == null) {
                    continue;
                };

                let initialTodo = createTodoItem(todoItemNameArray[i]);

                todoList.append(initialTodo.item);

                if (todoItemDoneArray[i]) { // Если элемент в localstorage имеет done = true, то добавляем ему соответствующий класс
                    initialTodo.item.classList.add('list-group-item-success');
                };

                //   Добавляем обработчики на кнопки
                initialTodo.doneButton.addEventListener('click', function() {
                    initialTodo.item.classList.toggle('list-group-item-success');

                    let initialCasesArrayDone;

                    if (whoseCases == 'myCases') {
                        initialCasesArrayDone = JSON.parse(localStorage.getItem('myCasesStorage'));
                    } else if (whoseCases == 'momCases') {
                        initialCasesArrayDone = JSON.parse(localStorage.getItem('momCasesStorage'));
                    } else if (whoseCases == 'dadCases') {
                        initialCasesArrayDone = JSON.parse(localStorage.getItem('dadCasesStorage'));
                    };

                    // Изменение свойства done элемента
                    if (initialTodo.item.classList.contains('list-group-item-success')) {
                        initialCasesArrayDone[i]['done'] = true;

                        if (whoseCases == 'myCases') {
                            localStorage.setItem('myCasesStorage', JSON.stringify(initialCasesArrayDone));
                        } else if (whoseCases == 'momCases') {
                            localStorage.setItem('momCasesStorage', JSON.stringify(initialCasesArrayDone));
                        } else if (whoseCases == 'dadCases') {
                            localStorage.setItem('dadCasesStorage', JSON.stringify(initialCasesArrayDone));
                        };

                    } else {
                        initialCasesArrayDone[i]['done'] = false;

                        if (whoseCases == 'myCases') {
                            localStorage.setItem('myCasesStorage', JSON.stringify(initialCasesArrayDone));
                        } else if (whoseCases == 'momCases') {
                            localStorage.setItem('momCasesStorage', JSON.stringify(initialCasesArrayDone));
                        } else if (whoseCases == 'dadCases') {
                            localStorage.setItem('dadCasesStorage', JSON.stringify(initialCasesArrayDone));
                        };
                    };   
                });
                
                // Удаление элементов
                initialTodo.deleteButton.addEventListener('click', function() {
                    if (confirm('Вы уверены?')) {
                        let initialCasesArrayDelete;
            
                        if (whoseCases == 'myCases') {
                            initialCasesArrayDelete = JSON.parse(localStorage.getItem('myCasesStorage'));
                        } else if (whoseCases == 'momCases') {
                            initialCasesArrayDelete = JSON.parse(localStorage.getItem('momCasesStorage'));
                        } else if (whoseCases == 'dadCases') {
                            initialCasesArrayDelete = JSON.parse(localStorage.getItem('dadCasesStorage'));
                        };

                        initialTodo.item.remove();

                        // Удаление объекта
                        delete initialCasesArrayDelete[i];

                        if (whoseCases == 'myCases') {
                            localStorage.setItem('myCasesStorage', JSON.stringify(initialCasesArrayDelete));
                        } else if (whoseCases == 'momCases') {
                            localStorage.setItem('momCasesStorage', JSON.stringify(initialCasesArrayDelete));
                        } else if (whoseCases == 'dadCases') {
                            localStorage.setItem('dadCasesStorage', JSON.stringify(initialCasesArrayDelete));
                        };
                    };
                });
            };
        };

        // Браузер создаёт событие submit на форме по нажатию Enter или на кнопку создания дела
        todoItemForm.form.addEventListener('submit', function(evt) {
            // Эта строчка необходима, чтобы предотвратить стандартное действие браузера
            // В данном случае мы не хотим, чтобы страница перезагружалась при отправке формы
            evt.preventDefault();

            // Игнорируем создание элемента, если пользователь ничего не ввёл в поле
            if (!todoItemForm.input.value) {
                return;
            };
      
            let todoItem = createTodoItem(todoItemForm.input.value);

            let newItemArray = {name: todoItemForm.input.value, done: false};

            let indexItem;

            let arraySubmit;

            if (whoseCases == 'myCases') {
                arraySubmit = JSON.parse(localStorage.getItem('myCasesStorage'));
            } else if (whoseCases == 'momCases') {
                arraySubmit = JSON.parse(localStorage.getItem('momCasesStorage'));
            } else if (whoseCases == 'dadCases') {
                arraySubmit = JSON.parse(localStorage.getItem('dadCasesStorage'));
            };

            if (arraySubmit == null) {
                arraySubmit = [];

                arraySubmit.push(newItemArray);

                indexItem = arraySubmit.indexOf(newItemArray);

                if (whoseCases == 'myCases') {
                    localStorage.setItem('myCasesStorage', JSON.stringify(arraySubmit));
                } else if (whoseCases == 'momCases') {
                    localStorage.setItem('momCasesStorage', JSON.stringify(arraySubmit));
                } else if (whoseCases == 'dadCases') {
                    localStorage.setItem('dadCasesStorage', JSON.stringify(arraySubmit));
                };

            } else {
                arraySubmit.push(newItemArray);

                indexItem = arraySubmit.indexOf(newItemArray);

                if (whoseCases == 'myCases') {
                    localStorage.setItem('myCasesStorage', JSON.stringify(arraySubmit));
                } else if (whoseCases == 'momCases') {
                    localStorage.setItem('momCasesStorage', JSON.stringify(arraySubmit));
                } else if (whoseCases == 'dadCases') {
                    localStorage.setItem('dadCasesStorage', JSON.stringify(arraySubmit));
                };
            };

            // Добавляем обработчики на кнопки
            todoItem.doneButton.addEventListener('click', function() {
                todoItem.item.classList.toggle('list-group-item-success');
                
                let arraySubmitDone;

                if (whoseCases == 'myCases') {
                    arraySubmitDone = JSON.parse(localStorage.getItem('myCasesStorage'));
                } else if (whoseCases == 'momCases') {
                    arraySubmitDone = JSON.parse(localStorage.getItem('momCasesStorage'));
                } else if (whoseCases == 'dadCases') {
                    arraySubmitDone = JSON.parse(localStorage.getItem('dadCasesStorage'));
                };

                // Изменение значения свойства done элемента
                if (todoItem.item.classList.contains('list-group-item-success')) {
                    arraySubmitDone[indexItem]['done'] = true;

                    if (whoseCases == 'myCases') {
                        localStorage.setItem('myCasesStorage', JSON.stringify(arraySubmitDone));
                    } else if (whoseCases == 'momCases') {
                        localStorage.setItem('momCasesStorage', JSON.stringify(arraySubmitDone));
                    } else if (whoseCases == 'dadCases') {
                        localStorage.setItem('dadCasesStorage', JSON.stringify(arraySubmitDone));
                    };

                } else {
                    arraySubmitDone[indexItem]['done'] = false;

                    if (whoseCases == 'myCases') {
                        localStorage.setItem('myCasesStorage', JSON.stringify(arraySubmitDone));
                    } else if (whoseCases == 'momCases') {
                        localStorage.setItem('momCasesStorage', JSON.stringify(arraySubmitDone));
                    } else if (whoseCases == 'dadCases') {
                        localStorage.setItem('dadCasesStorage', JSON.stringify(arraySubmitDone));
                    };
                }; 
            });

            todoItem.deleteButton.addEventListener('click', function() {
                if (confirm('Вы уверены?')) {
                    let arraySubmitDelete;

                    if (whoseCases == 'myCases') {
                        arraySubmitDelete = JSON.parse(localStorage.getItem('myCasesStorage'));
                    } else if (whoseCases == 'momCases') {
                        arraySubmitDelete = JSON.parse(localStorage.getItem('momCasesStorage'));
                    } else if (whoseCases == 'dadCases') {
                        arraySubmitDelete = JSON.parse(localStorage.getItem('dadCasesStorage'));
                    };

                    todoItem.item.remove();

                    // Удаление объекта 
                    delete arraySubmitDelete[indexItem];

                    if (whoseCases == 'myCases') {
                        localStorage.setItem('myCasesStorage', JSON.stringify(arraySubmitDelete));
                    } else if (whoseCases == 'momCases') {
                        localStorage.setItem('momCasesStorage', JSON.stringify(arraySubmitDelete));
                    } else if (whoseCases == 'dadCases') {
                        localStorage.setItem('dadCasesStorage', JSON.stringify(arraySubmitDelete));
                    };
                };   
            });

            // Создаём и добавляем в список новое дело с названием из поля для ввода
            todoList.append(todoItem.item);

            // Обнуляем значение в поле, чтобы не пришлось стрирать его вручную
            todoItemForm.input.value = '';

            todoItemForm.button.disabled = true;
        });
        
        todoItemForm.input.addEventListener('input', () => {
            if (todoItemForm.input.value) {
                todoItemForm.button.disabled = false;

            } else {
                todoItemForm.button.disabled = true;
            };
        });
    };
    
    window.createTodoApp = createTodoApp;
})(); 



