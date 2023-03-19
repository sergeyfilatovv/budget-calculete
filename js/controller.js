
var Controller = (function(budgetCtrl, uiCtrl){



var setupEventListener = function(){
    // Запускаем возврат объекта с элементами DOM
    var DOM = uiCtrl.getDomStrings();
    // Находим Форму и обрабатываем событие submit, после чего запускаем функцию ctrlAddItem, которая описана ниже
    document.querySelector(DOM.form).addEventListener('submit', ctrlAddItem);
    // Клик по таблице с доходами и расходами
    document.querySelector(DOM.budgetTable).addEventListener('click', ctrlDeleteItem);
}

// Функция изменения процента каждого расхода в зависимости от общего дохода
function updatePercentage(){
    // Посчитать проценты для каждой записи типа expense
    budgetCtrl.calculatePrecentage();
    budgetCtrl.test();
    // Получить данные по процентам с модели
    var idsAndPercents = budgetCtrl.getAllIdsAndPercentages();
    //  Обновить UI с новыми процентами
    uiCtrl.updateItemsPercentage(idsAndPercents);
};

// Функция, запускающаяся по событию submit
function ctrlAddItem(e){
    // Отменяем стандартное поведение формы
    e.preventDefault ();
    console.log('budget')
    // Получение данных формы
    var input = uiCtrl.getInput();
    // Проверка на то, что поля не пустые
    if(input.description !== "" && !isNaN(input.value) && input.value > 0){
        // Запись полученный данных в массив
        var newItem = budgetCtrl.addItem(input.type, input.description, input.value);
        
        // Запуск шблона
        budgetCtrl.test();
        // Добавление данных в UI
        uiCtrl.renderListItem(newItem, input.type);
        // Чистим поля 
        uiCtrl.clearFields();
        // Прересчитали бюджет
        upDate();
        // Пересчитали проценты
        updatePercentage();

        // generalTestData.init();
    }
    else{
        alert("Проверьте поля на корректность")
    }
    
}

// Функция удаления блоков расхода или дохода
function ctrlDeleteItem(e){
    var itemID, splitID, type, ID;

    // Находим ID которую надо удалить
    if(e.target.closest('.item__remove')){
    itemID = e.target.closest('li.budget-list__item').id;
    splitID = itemID.split("-") ; // "inc-0" => ["inc", "0"]
    type = splitID[0];
    ID = parseInt(splitID[1]);
    // Удаляем запись из модели
    budgetCtrl.deleteItem(type, ID);
    // Удаляем запись из шаблона
    uiCtrl.deleteListItem(itemID);
    // Пересчитать бюджет
    upDate();
    // Пересчитали проценты
    updatePercentage();
    
    }
}
//Функция  расчета и отображения бюджета в UI
function upDate(){
    // Расчитать бюджет в модели
    budgetCtrl.calculateBudget();
    // Получить расчитанный бюджет из модели
    var budgetObj = budgetCtrl.getBudget();
    // Отобразить бюджет в шаблоне
    uiCtrl.updateBudget(budgetObj);

}

return {
    init: function(){
        console.log("App started")
        uiCtrl.displayMonth();
        setupEventListener();
        uiCtrl.updateBudget({
            budget: 0,
            totalInc: 0,
            totalExp: 0,
            percentage: 0
        }   
        ); 
    }
}



})(modelController, viewController);

Controller.init();