var generalTestData = (function(){
    var ExampleItem = function(type, desc, sum){
        this.type = type;
        this.desc = desc;
        this.sum = sum;
    }
    
    var testData = [
        new ExampleItem("inc", "Зарплата", 1245),
        new ExampleItem("inc", "Фриланс", 820),
        new ExampleItem("inc", "Партнерская программа", 110),
        new ExampleItem("inc", "Продажи digital", 90),
        new ExampleItem("exp", "Рента", 400),
        new ExampleItem("exp", "Бензин", 60),
        new ExampleItem("exp", "Продукты", 300),
        new ExampleItem("exp", "Развлечения", 100)
    ];
    
    function getRandomInt(max){
        return Math.floor(Math.random() * max);
    }
    
    function insertInUI(){
        var random = getRandomInt(testData.length);
        var randomItem = testData[random];
    
        document.querySelector("#input__type").value = randomItem.type;
        document.querySelector("#input__description").value = randomItem.desc;
        document.querySelector("#input__value").value = randomItem.sum;
    
    }
    
    return {
        init: insertInUI
    }
    
})()

// generalTestData.init();