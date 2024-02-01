# Dart 学习日志

## 文档

- [Dart官方-zh](https://dart.cn/)
- [Dart编程语言概览](https://dart.cn/samples)

## 总结

### 2023-04-01

基础语法学习，参考[Dart编程语言概览](https://dart.cn/samples)

学习概览，
基本数据类型、流程控制、函数、枚举、类、继承、mixins、接口、抽象类、async/await、异常处理

```dart
void main() {
  print('hello world!');

  var i = 'let variable';
  print('$i'.runtimeType); // String
  print('$i'); // let variable

  var $i = 'let variable 2';
  print($i.runtimeType); // String
  print($i); // let variable 2
  // i = 111111; // error
  // print(i.runtimeType);

  for (var a = 0; a < 10; a++) {
    print('a: $a');
  }

  var b = 1;

  do {
    b++;
    print('b do: $b');
  } while (b < 5);

  while (b > 0) {
    print('b: $b');
    b--;
  }

  var c = 1;
  switch (c) {
    case 1:
      print(c);
      break;
    case 2:
      print(c);
      break;
    default:
      print('default');
  }

  int funcTest(String str) {
    return str.isEmpty ? 0 : 1;
  }

  print(funcTest('some str'));

  var ii = () => '1111'.length;
  print(ii()); // 4
  print((() => 4)()); // 4

  var space = Spacecraft('name', DateTime(1999, 1, 1));
  print(space.dateYear);
  space.printInfo();

  var orbiter = Orbiter('name', DateTime.now(), 0.12);
  print(orbiter.toString());

  var orbiter2 = Orbiter2('name', DateTime.now(), 0.12);
  orbiter2.printInfo();

  print(PlanetType.type2);

  print(Planet.enum1.value1);
  print(Planet.enum1.isMax);


  const onSucc = Duration(seconds: 2);
  Future<void> input(String name) async {
    try {
      if (name != 'jack') {
        throw StateError('error reason');
      } else {
        await Future.delayed(onSucc);
      }
      print('name $name');
    } on StateError catch (e) {
      print('catch $e');
    } finally {
      print('finally');
    }
  }

  input('name');
  input('jack');
}

class Spacecraft {
  String name;
  DateTime dateTime;
  int? get dateYear => dateTime.year;
  Spacecraft(this.name, this.dateTime) {}
  void printInfo() {
    print(this.name + ' ' + this.dateTime.toString());
  }
}

class Orbiter extends Spacecraft {
  double dob;
  Orbiter(super.name, super.dateTime, this.dob);

  @override
  String toString() {
    // TODO: implement toString
    return this.name + ' ' + this.dateTime .toString()+ ' ' + this.dob.toString();
  }
}

mixin addNum {
  int num = 10;
  void printInfo() {
    print('num $num');
  }
}

class Orbiter2 extends Spacecraft with addNum{
  double dob;
  Orbiter2(super.name, super.dateTime, this.dob);

  @override
  String toString() {
    // TODO: implement toString
    return this.name + ' ' + this.dateTime .toString()+ ' ' + this.dob.toString();
  }
}

enum PlanetType {
  type1, type2, type3
}

enum Planet {
  enum1(planetType: PlanetType.type1, value1: 1, value2: false),
  enum2(planetType: PlanetType.type2, value1: 2, value2: false),
  enum3(planetType: PlanetType.type3, value1: 3, value2: false);

  const Planet(
      {required this.planetType,required this.value1,required this.value2});

  final PlanetType planetType;
  final int value1;
  final bool value2;

  bool get isMax => this.value1 > 1;
}

```
