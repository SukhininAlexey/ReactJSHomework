window.onload = function (){
    
    // Проверка задания 5
    console.log('Задание 5:');
    console.log(myRequester('https://jsonplaceholder.typicode.com/users/', 1, 10));
    
    
    
    
    // Проверка задания 4
    //console.log('Задание 4:');
    //console.log(asker([
    //    'Как вас зовут?',
    //    'Сколько вам лет?',
    //    'Какой ваш любимый цвет?',
    //    'Какую музыку вы предпочетаете?'
    //]));
    
    
    
    // Проверка задания 3
    console.log('Задание 3:');
    let d_yan = new Developer('Yan', 28, '10.08.1989', 90000, 'Half-Life 3 reserch center');
    let d_alice = new Developer('Alice', 25, '10.08.1992', 90000, 'Half-Life 3 reserch center');
    let m_gaben = new Manager('Gabe Newell', 55, '03.11.1962', 9999999999, 'Half-Life 3 reserch center');
    
    d_yan.manager = m_gaben;
    d_alice.manager = m_gaben;
    m_gaben.setSubordinate(d_yan);
    m_gaben.setSubordinate(d_alice);
    
    console.log(d_yan.displayInfo());
    console.log(d_alice.displayInfo());
    console.log(m_gaben.displayInfo());
    
    console.log(d_yan);
    console.log(d_alice);
    console.log(m_gaben);

    
    // Проверка задания 2
    console.log('Задание 2:');
    let rectangle = new Rectangle(10, 20);
    let area = calculateArea(rectangle);
    console.log(area);
    
    
    // Проверка задания 1
    console.log('Задание 1:');
    loop(5, getMonarch('Иван', 'Грозный'));
}



// Решение задания 1
//------------------
function loop(times, callback = null){
    if(!callback){
        console.log('Функция не передана');
    }
    
    let prom = new Promise((resolve, reject)=>{
        console.log('Всего монархов: ', times);
        resolve('держава');
    });
    
    
    for(var i = 0; i < times; ++i){
        prom = prom.then((macGuffin)=>{
            return new Promise((resolve, reject)=>{
                let name = callback();
                console.log(`Я - ${name} и теперь ${macGuffin} у меня!`)
                resolve(macGuffin);
            });     
        });
    }
}

function getMonarch(name, nickname = ''){
    let i = 0;
    function getName(){
        return name + ' ' + ++i + ' ' + nickname;
    }
    return getName; // решил освежить в голове замыкания
}



// Решение задания 2
//------------------
function calculateArea(figure){
    if(!(figure instanceof Figure)){
        return {};
    }
    
    let {type: type, ...input} = figure
    
    return {
        figure: type,
        area: figure.getArea(),
        input: input
    }
}

class Figure {
    constructor(type){
        this.type = type;
    }
    
    getArea(){
        return 'Area formula was not set';
    }
}

class Rectangle extends Figure {
    constructor(width = 0, height = 0){
        super('rectangle');
        this.width = width;
        this.height = height;
    }
    
    getArea(){
        return this.width * this.height;
    }
}



// Решение задания 3
//------------------
class Human{
    constructor(name, age, dateOfBirth){
        this.name = name;
        this.age = age;
        this.dateOfBirth = dateOfBirth;
    }
    
    displayInfo(){
        return `${this.name} is ${this.age} years old and was born on ${this.dateOfBirth}.`;
    }
}

class Employee extends Human{
    constructor(name, age, dateOfBirth, salary, department){
        super(name, age, dateOfBirth);
        this.salary = salary;
        this.department = department;
    }
    
    displayInfo(){
        return super.displayInfo() + ` Department: ${this.department}; salary ${this.salary}.`;
    }
}

class Developer extends Employee{
    constructor(name, age, dateOfBirth, salary, department){
        super(name, age, dateOfBirth, salary, department);
        this.managerObj = {};
    }
    
    set manager(newValue){
        if(newValue instanceof Employee){
           this.managerObj = newValue;
        }
    }
    
    get manager(){
        return this.managerObj;
    }
}

class Manager extends Employee{
    constructor(name, age, dateOfBirth, salary, department){
        super(name, age, dateOfBirth, salary, department);
        this.subordinates = [];
    }
    
    getSubordinate(idNum){
        return this.subordinates[idNum];
    }
    
    setSubordinate(employee){
        if(!(employee instanceof Employee)){
            return false;
        }
        
        this.subordinates.push(employee);
        return true;
    }
}




// Решение задания 4
//------------------
function *generateQuestions(questionsArray){
    let qtty = questionsArray.length - 1;
    for(let i = 0; i < qtty; ++i){
        yield prompt(questionsArray[i]);
    }
    return prompt('Какую музыку вы предпочетаете?');
}

function asker(questionsArray){
    let generator = generateQuestions(questionsArray);
    let done = false;
    let answers = {};
    let result = {};
    for(let i = 0; !done; ++i){
        result = generator.next();
        answers['Question ' + i] = {
            'question': questionsArray[i],
            'answer': result.value
        }
        done = result.done;
    }
    return answers;
}





// Решение задания 5
//------------------
function myRequest(url, itemId, outer_resolve){
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url + itemId, true);
    
    xhr.timeout = 10000;
    xhr.ontimeout = function(){
        return false;
    }
    
    xhr.send();
    
    xhr.onreadystatechange = function(){
        if(xhr.readyState === XMLHttpRequest.DONE){
            if(xhr.status === 200){
                outer_resolve(JSON.parse(xhr.responseText));
            }
            return false;
        }
        return false;
    }
}

function myRequester(url, minId, maxId){
    let resultsArray = [];
    let promiseArray = [];
    let result = {}
    
    promiseArray[0] = new Promise((resolve, reject)=>{
        result = myRequest(url, minId, resolve);
    });
    
    for(let id = minId + 1, pNum = 0; id <= maxId; ++id, ++pNum){
        promiseArray[pNum+1] = promiseArray[pNum].then((result)=>{
            resultsArray[id-1] = result;
            return new Promise((resolve, reject) => {
                myRequest(url, id, resolve);
            });
        });
    }
    return resultsArray;
}























