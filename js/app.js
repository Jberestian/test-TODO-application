function createTodoItem(title) {                            //4 функция создания тасков
    const checkbox = document.createElement('input');       //4.1 создаем елемент чекбокс
    checkbox.type = 'checkbox';                             //4.1.1 добавляем чекбоксу тип
    checkbox.className = 'checkbox';                        //4.1.2 добавляем чекбоксу класс

    const label = document.createElement('label');          //4.2 создаем елемент label
    label.innerText = title;                                //4.2.1 добавляем ему текст(параметр,который                                                                             принимает функция)
    label.className = 'title';                              //4.2.2 добавляем ему класс

    const editInput = document.createElement('input');      //4.3 создаем елемент инпут текст
    editInput.type = 'text';                                //4.3.1 добавляем ему тип
    editInput.className = 'textfield';                      //4.3.2 добавляем ему класс

    const editButton = document.createElement('button');    //4.4 создаем елемент button для изменения текста таска
    editButton.innerText = 'изменить';                      //4.4.1 добавляем ему текст
    editButton.className = 'edit';                          //4.4.2 добавляем ему класс

    const deleteButton = document.createElement('button');  //4.5 создаем елемент button для удаления текста таска
    deleteButton.innerText = 'удалить';                     //4.5.1 добавляем ему текст
    deleteButton.className = 'delete';                      //4.5.2 добавляем ему класс

    const listItem = document.createElement('li');          //4.6 создаем таск в DOM(основной елемент)
    listItem.className ='todo-item';                        //4.6.1 добавляем ему класс

    listItem.appendChild(checkbox);                         //4.6.2 добавляем таску елемент checkbox
    listItem.appendChild(label);                            //4.6.3 добавляем таску елемент label
    listItem.appendChild(editInput);                        //4.6.4 добавляем таску елемент editInput
    listItem.appendChild(editButton);                       //4.6.5 добавляем таску елемент editButton
    listItem.appendChild(deleteButton);                     //4.6.6 добавляем таску елемент deleteButton

    bindEvents(listItem);                                   //8 привязываем события

    return listItem;                                        //4.6.7 возвращаем созданный таск
}

function bindEvents(todoItem) {                                   //7 функция для привязки событий при создании таска
    const checkbox = todoItem.querySelector('.checkbox');         //7.1 получаем доступ к checkbox
    const editButton = todoItem.querySelector('button.edit');     //7.2 получаем доступ к кнопке editButton
    const deleteButton = todoItem.querySelector('button.delete'); //7.3 получаем доступ к кнопке deleteButton

    checkbox.addEventListener('change', toggleTodoItem);          //7.4 подписываемся на события у елементов таска
    editButton.addEventListener('click', editTodoItem);
    deleteButton.addEventListener('click', deleteTodoItem);
}


function addTodoItem(event) {                //3 функция-обработчик для создания елемента
    event.preventDefault();                  //3.1 остановка отправки данных на сервер.Иначе страница  перезагрузится

    if (addInput.value === '') {             //3.2 проверка на значение в addInput
        return alert('Необходимо ввести название задачи');
    }

    const todoItem = createTodoItem(addInput.value);     //3.3 функция для создания таска
    todoList.appendChild(todoItem);          //5 добавляем таск в список todo-list
    addInput.value = '';                     //6 обнуляем значение add-input в todo-form
    
}

// функция-обработчик  при this всегда ссылается на сам елемент

function toggleTodoItem() {                           //8 функция принимает события
   const listItem = this.parentNode;                  //8.1 доступ к елементу li получаем через parent.= this.parentElement
   listItem.classList.toggle('completed');            //8.2 меняем визуально состояние таска при активации checkbox
                                                      // .classList - выбирает все классы,
                                                      // .toggle - если есть класс,то уберет его,если нет - добавит
}

function editTodoItem() {                                       //9 функция 'изменить' таска
    const listItem = this.parentNode;                           //9.1 доступ к елементу li получаем через parent
    const title = listItem.querySelector('.title');             //9.2 получаем доступ к названию таска
    const editInput = listItem.querySelector('.textfield');     //9.3 получаем доступ к полю для редактирования задачи
    const isEditing = listItem.classList.contains('editing');   //9.4 проверяем наличие свойства у таска

    if (isEditing) {                                  //9.5 проверяем наличие свойства
        title.innerText = editInput.value;            //9.6 если находимся в режиме редактирования то из поля                                                                  для редактирования присваеваем новое название таска
        this.innerText = 'Изменить';                  //9.7 доступ к кнопке editButton
    } else {                                          //9.8 если не находимся в режиме редактирование ,то заходим в него
        editInput.value = title.innerText;            //9.9 делаем обратное 9.6
        this.innerText = 'Сохранить';                 //

    }

    listItem.classList.toggle('editing');             //9.10 убираем класс 'editing'

}

function deleteTodoItem() {                                 //10 пишем функцию удаления таска
    const listItem = this.parentNode;                       //10.1 получаем доступ к таску (li) через родителя элемента
    todoList.removeChild(listItem);                         //10.2 удаляем таск
}

const todoForm = document.getElementById('todo-form');      //1  доступ к форме
const addInput = document.getElementById('add-input');      //   доступ к
const todoList = document.getElementById('todo-list');      //   доступ к списку задач
const todoItems = document.querySelectorAll('.todo-item');  //   доступ к таскам // (елементам) вовращает массив

function main() {                                           //11 пишем основную функцию
    todoForm.addEventListener('submit', addTodoItem);       //11.1 делаем подписку на форму
    todoItems.forEach(item => bindEvents(item));            //11.2 добавляем обработчики на елементы таска
}

main();

// todoForm.addEventListener('submit', addTodoItem);          //2  привязывем обработчик события на отправку форм
                                                              // создаем DOM елемент при клике на кнопку 'submit'


