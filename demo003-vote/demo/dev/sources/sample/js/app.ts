/**
 * TypeScript
 */

interface CanGreetInterface {
    greet;
}

class DinKorlack implements CanGreetInterface {
    name;

    constructor(name: String) {
        this.name = name;
    }

    greet() {
        console.log.apply(this, [
            "Greetings %c" + this.name + "%c!",
            "color: red; font-weight: bold;",
            'color: black'
        ]);
    }
}

(new DinKorlack("Earth Clan")).greet();