import { Console, Random } from '@woowacourse/mission-utils';

class App {
  async run() {
    try {
      const carNames = await this.getCarNames();
      const tryCount = await this.getTryCount();
      const cars = this.createCars(carNames);
      this.startRace(cars, tryCount);
      this.printWinners(cars);
    } catch (error) {
      Console.print(error.message);
      throw error;
    }
  }

  async getCarNames() {
    const input = await Console.readLineAsync(
      '경주할 자동차 이름을 입력하세요.(이름은 쉼표(,) 기준으로 구분)\n',
    );
    const names = input.split(',');
    if (!this.validateNameLengths(names)) {
      throw new Error('[ERROR] 자동차 이름은 1자 이상 5자 이하만 가능합니다.');
    }

    // 빈 문자열 체크
    if (!this.validateNoEmptyNames(names)) {
      throw new Error('[ERROR] 자동차 이름은 빈 문자열일 수 없습니다.');
    }

    // 중복 이름 체크
    if (!this.validateNoDuplicateNames(names)) {
      throw new Error('[ERROR] 자동차 이름은 중복될 수 없습니다.');
    }

    return names;
  }

  async getTryCount() {
    const input = await Console.readLineAsync('시도할 횟수는 몇 회인가요?\n');
    const count = Number(input);
    if (this.validateTryCount(count)) {
      return count;
    } else {
      throw new Error('[ERROR] 시도 횟수는 1 이상의 숫자여야 합니다.');
    }
  }

  validateCarNames(names) {
    return names.every((name) => name.length > 0 && name.length <= 5);
  }

  validateTryCount(count) {
    return Number.isInteger(count) && count > 0;
  }

  createCars(names) {
    return names.map((name) => ({ name, position: 0 }));
  }

  startRace(cars, tryCount) {
    Console.print('\n실행 결과');
    for (let i = 0; i < tryCount; i += 1) {
      cars.forEach((car) => {
        const randomNumber = Random.pickNumberInRange(0, 9);
        if (randomNumber >= 4) {
          car.position += 1;
        }
        Console.print(`${car.name} : ${'-'.repeat(car.position)}`);
      });
      Console.print('');
    }
  }

  printWinners(cars) {
    const maxPosition = Math.max(...cars.map((car) => car.position));
    const winners = cars
      .filter((car) => car.position === maxPosition)
      .map((car) => car.name);
    Console.print(`최종 우승자 : ${winners.join(', ')}`);
  }
}

export default App;
