import { greettingClass } from "./app_greetings";

console.log('%cTypeScript - connected', 'color: green;');

let gc = new greettingClass('Earthling');

gc.doGreet();