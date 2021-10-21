// Write Javascript code!
// ООП. Инкапсуляция.
// Полиморфизм.
// Наследование ES6 (классы)

//////////////////////////////////////////
// Задание №1
// Реализуйте класс Programmer (Программист),
// который будет иметь следующие свойства:
// name (имя),
// surname (фамилия),
// programming_language (язык програмирования).
// Также класс должен иметь метод introduceYourself(),
// который будет выводить информацию о работнике.

class Programmer {
  constructor(name, lastname, programming_language) {
    this.name = name;
    this.lastname = lastname;
    this.programming_language = programming_language;
  }
  introduceYourself() {
    return `Name: ${this.name}, Lastname: ${this.lastname}, programming language: ${this.programming_language}`;
  }
}

// Вот так должен работать наш класс:
let programmer = new Programmer("Иван", "Иванов", "Python");
console.log(programmer.name); //выведет 'Иван'
console.log(programmer.lastname); //выведет 'Иванов'
console.log(programmer.programming_language); //выведет 'Python'
console.log(programmer.introduceYourself()); //выведет 'Меня зовут Иван Иванов и пишу код на языке Python'
console.log("***********************");

//////////////////////////////////////////
// Задание №2
// Модифицируйте класс Worker из предыдущей задачи
// следующим образом: сделайте все его свойства
// приватными, а для их чтения сделайте методы-геттеры.

class Worker {
  #name = "hz";
  #lastname = "hz";
  #programming_language = "js";

  constructor(name, lastname, programming_language) {
    this.#name = name;
    this.#lastname = lastname;
    this.#programming_language = programming_language;
  }
  introduceYourself() {
    return `Name: ${this.#name}, Lastname: ${
      this.#lastname
    }, programming language: ${this.#programming_language}`;
  }
  getName() {
    return this.#name;
  }

  getLastName() {
    return this.#lastname;
  }

  getPLanguage() {
    return this.#programming_language;
  }
}

let worker = new Worker("Иван", "Иванов", "Python");
console.log(worker.getName()); //выведет 'Иван'
console.log(worker.getLastName()); //выведет 'Иванов'
console.log(worker.getPLanguage()); //выведет 'Python'
console.log(worker.introduceYourself()); //выведет 'Меня зовут Иван
console.log("***********************");

//////////////////////////////////////////
// Задание №3
// Реализуйте класс MyString, который будет иметь следующие методы: метод reverse(),
// который параметром принимает строку, а возвращает ее в перевернутом виде, метод ucFirst(),
// который параметром принимает строку, а возвращает эту же строку, сделав ее первую букву
// заглавной и метод ucWords, который принимает строку и делает
// заглавной первую букву каждого слова этой строки.

class MyString {
  constructor() {
    //this.str = str;
  }
  getReverse(str) {
    let res = "";
    for (let i = str.length - 1; i >= 0; i--) {
      res += str[i];
    }
    return res;
  }

  ucFirst(str) {
    return str[0].toUpperCase() + str.slice(1);
  }

  ucWords(str) {
    let words = str.split(" ");
    for (let i = 0; i < words.length; i++) {
      words[i] = words[i][0].toUpperCase() + words[i].slice(1);
    }
    return words.join(" ");
  }
}

let str = new MyString();

// Наш класс должен работать так:

console.log(str.getReverse("abcde")); //выведет 'edcba'
console.log(str.ucFirst("abcde")); //выведет 'Abcde'
console.log(str.ucWords("abcde abcde abcde")); //выведет 'Abcde Abcde Abcde'
console.log("***********************");

//////////////////////////////////////////
// Задание №4
// Реализуйте класс Student (Студент), который будет наследовать от класса User.
// Этот класс должен еть следующие свойства: name (имя, наследуется от User),
// surname (фамилия, наследуется от User), year (год поступления в вуз).
// Класс должен иметь метод getFullName() (наследуется от User),
// с помощью которого можно вывести одновременно имя и фамилию студента.
// Также класс должен иметь метод getCourse(), который будет выводить
// текущий курс студента (от 1 до 5).
// Курс вычисляется так: нужно от текущего года отнять год поступления в вуз.
// Текущий год получите самостоятельно.
class User {
  constructor(name, surname) {
    this.name = name;
    this.surname = surname;
  }
}

class Student extends User {
  constructor(name, surname, year) {
    super(name, surname);
    this.year = year;
    this.name = name;
    this.surname = surname;
  }

  getFullName() {
    return this.name + " " + this.surname;
  }

  getCourse() {
    return Data.year();
  }

  getCourse() {
    let course = new Date().getFullYear() - this.year;
    if (course > 5) {
      return "Student graduated";
    } else {
      return course;
    }
  }
}

// Вот так должен работать наш класс:

var student = new Student("Иван", "Иванов", 2018);

console.log(student.name); //выведет 'Иван'
console.log(student.surname); //выведет 'Иванов'
console.log(student.getFullName()); //выведет 'Иван Иванов'
console.log(student.year); //выведет 2018c
console.log(student.getCourse()); //выведет 3 - третий курс, так как текущий год 2021
// Вот так должен выглядеть класс User, от которого наследуется наш Student:
console.log("***********************");

//////////////////////////////////////////
// Задание №5
// Реализуйте класс Rectangle.
// У него должны быть следующие свойства: ширина width, высота height. Также у него должны быть
// следующие методы: получить ширину getWidth, установить ширину setWidth, получить высоту getHeight,
// установить высоту setHeight.

class Rectangle {
  #width;
  #height;

  constructor(width, height) {
    this.#width = width;
    this.#height = height;
  }

  getWidth() {
    return this.#width;
  }

  setWidth(width) {
    this.#width = width;
  }

  getHeight() {
    return this.#height;
  }

  setHeight(height) {
    this.#height = height;
  }
}

let regt = new Rectangle(200, 100);
console.log(regt.getHeight());
console.log(regt.getWidth());
regt.setHeight(300);
regt.setWidth(400);
console.log(regt.getHeight());
console.log(regt.getWidth());
console.log("***********************");

//////////////////////////////////////////
// Задание №6
// Реализуйте класс Worker (Работник),
// который будет иметь следующие свойства:
// name (имя),
// surname (фамилия),
// rate (ставка за день работы),
// days (количество отработанных дней).
// Также класс должен иметь метод getSalary(),
// который будет выводить зарплату работника.
// Зарплата - это произведение (умножение)
// ставки rate на количество отработанных дней days.

class Worker1 {
  constructor(name, surname, rate, days) {
    (this.name = name),
      (this.surname = surname),
      (this.rate = rate),
      (this.days = days);
  }

  getSalary() {
    return this.rate * this.days;
  }
}

// Вот так должен работать наш класс:
var worker1 = new Worker1("Иван", "Иванов", 10, 31);

console.log(worker1.name); //выведет 'Иван'
console.log(worker1.surname); //выведет 'Иванов'
console.log(worker1.rate); //выведет 10
console.log(worker1.days); //выведет 31
console.log(worker1.getSalary()); //выведет 310 - то есть 10*31
console.log("***********************");

//////////////////////////////////////////
// Задание №7
// Модифицируйте класс Worker из предыдущей задачи
// следующим образом: для свойства rate и для
// свойства days сделайте еще и методы-сеттеры.
// Наш класс теперь будет работать так:

class Worker2 extends Worker1 {
  constructor(name, surname, rate, days) {
    super(name, surname, days, rate);
    this.name = name;
    this.surname = surname;
    this.days = days;
    this.rate = rate;
  }

  getRate() {
    return this.rate;
  }

  getDays() {
    return this.days;
  }

  setRate(rate) {
    this.rate = rate;
  }

  setDays(days) {
    this.days = days;
  }
}

var worker2 = new Worker2("Иван", "Иванов", 10, 31);

console.log(worker2.getRate()); //выведет 10
console.log(worker2.getDays()); //выведет 31
console.log(worker2.getSalary()); //выведет 310 - то есть 10*31

//Теперь используем сеттер:
worker2.setRate(20); //увеличим ставку
worker2.setDays(10); //уменьшим дни
console.log(worker2.getSalary()); //выведет 200 - то есть 20*10
console.log("***********************");
