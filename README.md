# SlotMachine Simulation

## Overview

This project simulates a slot machine game using TypeScript. It provides a basic slot machine class with functionality to handle spins, calculate returns, and evaluate RTP (Return to Player). The code uses abstract classes and interfaces to define the structure and behavior of the slot machine and provides industrial desired standard RTP rate of 0.91.

## Features

- **Random Value Generation**: Simulates slot machine spins with random values.
- **Spin Mechanics**: Calculates payouts for different combinations: Jackpot, Three of a Kind, and Two of a Kind.
- **Profit Calculation**: Computes the total profit for the house based on investments and returns.
- **RTP Evaluation**: Evaluates the return-to-player ratio.

## Interface Definitions

### `IRtp`

Defines the RTP (Return to Player) rates for different combinations.

```typescript
interface IRtp {
  jackpot: number; // RTP rate for jackpot wins
  threeOfKind: number; // RTP rate for three-of-a-kind wins
  twoOfKind: number; // RTP rate for two-of-a-kind wins
}
```

### `ISpinResult`

Describes the result of a spin, including various statistics and financial metrics.

```typescript
interface ISpinResult {
  timesPlayed: number; // Number of spins
  jackpot: number; // Number of jackpot wins
  threeOfKindCount: number; // Number of three-of-a-kind wins
  twoOfKindCount: number; // Number of two-of-a-kind wins
  totalWinCount: number; // Total number of winning spins
  totalInvestment: number; // Total investment made
  returnAmt: number; // Total amount returned to the player
  companyProfit: number; // Total profit for the house
}
```

## Abstract Class

### `ASlotMachine`

An abstract class defining the base structure and behavior for slot machines.

```typescript
abstract class ASlotMachine {
  rtpRates: IRtp;
  protected profit: number;
  protected spinRange: number;
  protected potAmt: number;
  protected betAmt: number;
  protected totalWinCount: number;
  protected jackpotCount: number;
  protected threeOfKindCount: number;
  protected twoOfKindCount: number;
  protected playedCount: number;
  protected investAmt: number;
  protected returnAmt: number;

  abstract randomValueGenerator(): number;
  abstract spin(): ISpinResult;
  abstract houseProfit(x: number, y: number): number;
  abstract rtpEvaluator(): number;
}
```

## Concrete Implementation

### `SlotMachine`

A concrete implementation of `ASlotMachine` with defined spin mechanics, profit calculation, and RTP evaluation.

```typescript
class SlotMachine extends ASlotMachine {
  constructor(spinRange: number, potAmt: number, betAmt: number) {
    super();
    this.spinRange = spinRange;
    this.potAmt = potAmt;
    this.betAmt = betAmt;

    let result: ISpinResult;
    for (let i = 0; i < this.spinRange; i++) {
      result = this.spin();
    }

    let { totalInvestment, returnAmt } = result;
    let nresult = this.houseProfit(totalInvestment, returnAmt);
    result.companyProfit = nresult;

    console.log(result);

    let r: number = this.rtpEvaluator();
    console.log(r);
  }

  randomValueGenerator(): number {
    return Math.floor(Math.random() * 10);
  }

  spin(): ISpinResult {
    let v1: number = this.randomValueGenerator();
    let v2: number = this.randomValueGenerator();
    let v3: number = this.randomValueGenerator();

    this.investAmt += this.betAmt;
    this.playedCount++;

    if (v1 === v2 && v2 === v3 && v1 == 7) {
      this.jackpotCount++;
      this.totalWinCount++;
      this.returnAmt += this.betAmt * this.rtpRates.jackpot;
    } else if (v1 === v2 && v2 === v3 && v1 !== 7) {
      this.threeOfKindCount++;
      this.totalWinCount++;
      this.returnAmt += this.betAmt * this.rtpRates.threeOfKind;
    } else if (v1 === v2 || v2 === v3 || v3 === v1) {
      this.totalWinCount++;
      this.twoOfKindCount++;
      this.returnAmt += this.betAmt * this.rtpRates.twoOfKind;
    }

    return {
      timesPlayed: this.playedCount,
      jackpot: this.jackpotCount,
      threeOfKindCount: this.threeOfKindCount,
      twoOfKindCount: this.twoOfKindCount,
      totalWinCount: this.totalWinCount,
      totalInvestment: this.investAmt,
      returnAmt: this.returnAmt,
      companyProfit: this.profit,
    };
  }

  houseProfit(invst: number, rtrn: number): number {
    return invst - rtrn;
  }

  rtpEvaluator(): number {
    return this.returnAmt / this.investAmt;
  }
}
```

## Usage

Create an instance of `SlotMachine` to simulate spins and view results.

```typescript
let slot = new SlotMachine(1000000, 100, 10);
```

- `spinRange`: Number of spins to simulate.
- `potAmt`: The amount in the pot.
- `betAmt`: The amount bet per spin.

## Conclusion

This implementation provides a basic simulation of a slot machine, including essential features such as random value generation, spin mechanics, profit calculation, and RTP evaluation. Adjust the `rtpRates` and other parameters to fit specific requirements or test different scenarios.
