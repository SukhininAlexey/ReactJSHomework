import User from './user';
import Developer from './developer';
import DateButton from './date_button';

let main = document.getElementById('index-main');
const developer = new Developer(1, 'Lex', 'Black');
main.appendChild(developer.render());

const button = new DateButton('Время - в консоль');
main.appendChild(button.render());
