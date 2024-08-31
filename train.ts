export class Person {
    //private properties
    private firstname: string
    private lastname: string
    private age: number

    //public property
    public email: string

    constructor(firstname: string, lastname: string, age: number) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.age = age;


    }
}