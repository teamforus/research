function createGreeting(name: string) {
    return 'Hi, ' + name + '!';
}

function printString(string: string) {
    console.log(string);
}

export class greettingClass {
    private greeting: string;
    constructor(name: string) {
        this.greeting = createGreeting(name);
    }
    public doGreet(): void {
        printString(this.greeting);
    }
}