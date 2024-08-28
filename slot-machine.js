var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var ASlotMachine = /** @class */ (function () {
    function ASlotMachine() {
        this.rtpRates = {
            jackpot: 43,
            threeOfKind: 7,
            twoOfKind: 3,
        };
        this.profit = 0;
        this.totalWinCount = 0;
        this.jackpotCount = 0;
        this.threeOfKindCount = 0;
        this.twoOfKindCount = 0;
        this.playedCount = 0;
        this.investAmt = 0;
        this.returnAmt = 0;
    }
    return ASlotMachine;
}());
var SlotMachine = /** @class */ (function (_super) {
    __extends(SlotMachine, _super);
    function SlotMachine(spinRange, potAmt, betAmt) {
        var _this = _super.call(this) || this;
        _this.spinRange = spinRange;
        _this.potAmt = potAmt;
        _this.betAmt = betAmt;
        var result;
        for (var i = 0; i < _this.spinRange; i++) {
            result = _this.spin();
        }
        // @ts-ignore
        var totalInvestment = result.totalInvestment, returnAmt = result.returnAmt;
        var nresult = _this.houseProfit(totalInvestment, returnAmt);
        // @ts-ignore
        result.companyProfit = nresult;
        // @ts-ignore
        console.log(result);
        var r = _this.rtpEvaluator();
        console.log(r);
        return _this;
    }
    SlotMachine.prototype.randomValueGenerator = function () {
        return Math.floor(Math.random() * 10);
    };
    SlotMachine.prototype.spin = function () {
        var v1 = this.randomValueGenerator();
        var v2 = this.randomValueGenerator();
        var v3 = this.randomValueGenerator();
        this.investAmt += this.betAmt;
        this.playedCount++;
        if (v1 === v2 && v2 === v3 && v1 == 7) {
            /*jackpot 777*/
            this.jackpotCount++;
            this.totalWinCount++;
            this.returnAmt += this.betAmt * this.rtpRates.jackpot;
        }
        else if (v1 === v2 && v2 === v3 && v1 !== 7) {
            /*threeOfKind 111,222...,!777*/
            this.threeOfKindCount++;
            this.totalWinCount++;
            this.returnAmt += this.betAmt * this.rtpRates.threeOfKind;
        }
        else if (v1 === v2 || v2 === v3 || v3 === v1) {
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
    };
    SlotMachine.prototype.houseProfit = function (invst, rtrn) {
        return invst - rtrn;
    };
    SlotMachine.prototype.rtpEvaluator = function () {
        return this.returnAmt / this.investAmt;
    };
    return SlotMachine;
}(ASlotMachine));
var slot = new SlotMachine(1000000, 100, 10);
