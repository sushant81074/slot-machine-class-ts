interface IRtp {
  jackpot: number;
  threeOfKind: number;
  twoOfKind: number;
}

interface ISpinResult {
  timesPlayed: number;
  jackpot: number;
  threeOfKindCount: number;
  twoOfKindCount: number;
  totalWinCount: number;
  totalInvestment: number;
  returnAmt: number;
  companyProfit: number;
}

abstract class ASlotMachine {
  rtpRates: IRtp = {
    jackpot: 43,
    threeOfKind: 7,
    twoOfKind: 3,
  };

  protected profit: number = 0;

  protected spinRange: number;
  protected potAmt: number;
  protected betAmt: number;

  protected totalWinCount: number = 0;
  protected jackpotCount: number = 0;
  protected threeOfKindCount: number = 0;
  protected twoOfKindCount: number = 0;

  protected playedCount: number = 0;
  protected investAmt: number = 0;
  protected returnAmt: number = 0;

  abstract randomValueGenerator(): number;
  abstract spin(): object;
  abstract houseProfit(x: number, y: number): number;
  abstract rtpEvaluator(): number;
}

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
    // @ts-ignore
    let { totalInvestment, returnAmt } = result;

    let nresult = this.houseProfit(totalInvestment, returnAmt);

    // @ts-ignore
    result.companyProfit = nresult;
    // @ts-ignore

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
      /*jackpot 777*/

      this.jackpotCount++;
      this.totalWinCount++;

      this.returnAmt += this.betAmt * this.rtpRates.jackpot;
    } else if (v1 === v2 && v2 === v3 && v1 !== 7) {
      /*threeOfKind 111,222...,!777*/

      this.threeOfKindCount++;
      this.totalWinCount++;

      this.returnAmt += this.betAmt * this.rtpRates.threeOfKind;
    } else if (v1 === v2 || v2 === v3 || v3 === v1) {
      /*twoOfKind 112,221,121,212...*/

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

let slot = new SlotMachine(1000000, 100, 10);
