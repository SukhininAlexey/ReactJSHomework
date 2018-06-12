import './user.css';

export default class User{
    constructor(firstName, lastName){
        this.firstName = firstName;
        this.lastName = lastName;
    }
    
    sayHi(){
        console.log(`Hi, ${this.firstName} ${this.lastName}`);
    }
}