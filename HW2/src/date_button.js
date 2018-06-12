export default class DateButton{
    constructor(name){
        this.name = name;
    }
    
    render(){
        let button = document.createElement('button');
        button.textContent = this.name;
        
        button.addEventListener('click',function(){
            let now = new Date;
            console.log(now);
        });
        
        return button;
    }
}