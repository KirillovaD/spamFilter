const button = document.querySelector('.btn');
const textarea = document.querySelector('textarea');
const comments = document.querySelector('div');

let arrComments = []; //создаем массив куда будем складывать комментарии

//Вставка на страницу
button.addEventListener('click', function(){
  let text = textarea.value;//считываем то, что вводим
  textarea.value = '';//сбрасываем поле ввода

  arrComments.push(text); // заводим комментарий в массив

  comments.innerHTML = '';//сбрасываем поле комментариев
  render(comments, arrComments); //вызываем функцию создания элемента положив в аргументы (куда креплю и что креплю)

})

//Отрисовка/создание 
function render(parentNode, data){ //универсальная функция создания элемента div для каждого нового элемента (Куда крепим, Что крепим - в аргументах)
  for(let i = 0; i < data.length; i++){
    let item = data[i];
    
    //чтобы входящая строка сохранялась отфильтровываем во время отрисовка(если входящие данные сохранять не надо фильтруем во время вставки)
    const filterWords = ['viagra','xxx']; //создаем массив слов фильтрации
    let filteredText = item; //переменная для хранения отфильтрованных слов

    for(let word of filterWords){
      let reg = new RegExp(word, 'ig'); //создаем регулярку для фильтрующих слов для того, чтобы находить их везде
      filteredText = filteredText.replace(reg, '***');
    }


    let node = document.createElement('div');//создаем для каждого комментария свой div
    node.classList.add('comment');//добавляем названия классов новых div
    node.textContent = filteredText; //кладем в созданный div отильтрованный коммент
    parentNode.append(node); //через метод append вставляем div его в наш DOM


    let deleteButton = document.createElement('button');// создаем кнопку для удаления комментария
    deleteButton.classList.add('btn__delete');
    deleteButton.textContent = "x";
    node.append(deleteButton); // прикреплям кнопку к комментарию 

    deleteButton.addEventListener('click', function(){//вешаем на кнопку обработчик события для удаления комментария
      node.remove();
      data.splice(i, 1); //чтобы удалить и из массива элемент исп метод splice
    })


    

    
  }
  

}