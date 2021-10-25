// Задание №1

// Используя API списка всех стран выведите таблицу
// с информацией о всех странах:
// API: https://restcountries.eu/rest/v2/all

fetch("https://restcountries.com/v3.1/all")
  .then((res) => res.json())
  .then((results) =>
    results.forEach((item) => {
      $("tbody").append(
        `<tr><td>${item.name.common}</td><td>${item.capital}</td><td>${item.flag}</td><td>${item.population}</td></tr>`
      );
    })
  );

// Задание 2

// Создайте' класс Student, конструктор которого имеет
// параметры name, lastName, department, yearOfEntrance.
// Добавьте метод getStudentInfo, который возвращает имя,
// фамилию, год поступления и факультет в отформатированном виде: “Вася Иванов поступил в 2017 г. на факультет: Программирование.”

class Student {
  constructor(name, lastName, department, yearOfEntrance) {
    this.name = name;
    this.lastName = lastName;
    this.department = department;
    this.yearOfEntrance = yearOfEntrance;
  }

  getStudentInfo() {
    return `${this.name} ${this.lastName} поступил в ${this.yearOfEntrance}г. на факультет: ${this.department}`;
  }
}

let vasya = new Student("Vasya", "Ivanov", "Engineering", 2017);
console.log(vasya.getStudentInfo());

// Задание 3

// Реализуйте класс Student (Студент),
// который будет наследоваться от класса User.
// Этот класс должен иметь следующие свойства:
// ● name (имя, наследуется от User),
// ● surname (фамилия, наследуется от User),
// ● birthday (год рождения, наследуется от User),
// ● isAdult (совершеннолетний, по умолчанию undefined).
// Класс должен иметь метод getFullName()
// (наследуется от User), с помощью которого можно
// вывести одновременно имя и фамилию студента.
// Также класс должен иметь метод getAge(),
// который будет выводить возраст студента.
// Возраст вычисляется так: от текущего года отнять год рождения.
// И в случае, если студент совершеннолетний менять поле isAdult на true
// (в противном случае false)

class User {
  constructor(name, lastname, birthday) {
    this.name = name;
    this.lastname = lastname;
    this.birthday = birthday;
  }

  getFullName() {
    return `${this.name} ${this.lastname}`;
  }
}

class Student1 extends User {
  isAdult = undefined;

  constructor(name, lastname, birthday, isAduld) {
    super();
    this.name = name;
    this.lastname = lastname;
    this.birthday = birthday;
    this.isAduld = isAduld;
  }

  getAge() {
    return new Date().getFullYear() - this.birthday;
  }
}

let vasya1 = new Student1("Vasya", "Ivanov", 1994, true);
console.log(vasya1.getFullName());
console.log(vasya1.isAduld);
console.log(vasya1.getAge());
