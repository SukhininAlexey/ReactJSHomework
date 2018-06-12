export default class Developer{
    constructor(id, firstName, lastName){
        this.firstName = firstName;
        this.lastName = lastName;
        this.id = id;
    }
    
    render(){
        let list = document.createElement('ul');
        
        let developerId = document.createElement('li');
        developerId.textContent = `ID разработчика: ${this.id}`;
        let firstName = document.createElement('li');
        firstName.textContent = `Имя: ${this.firstName}`;
        let lastName = document.createElement('li');
        lastName.textContent = `Фамилия: ${this.lastName}`;
        
        list.appendChild(developerId);
        list.appendChild(firstName);
        list.appendChild(lastName);
        
        return list;
    }
}