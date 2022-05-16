import { ExponentialCost, FreeCost, LinearCost } from "./api/Costs";
import { Localization } from "./api/Localization";
import { BigNumber } from "./api/BigNumber";
import { theory } from "./api/Theory";
import { Utils } from "./api/Utils";

var id = "my_custom_theory_id";
var name = "Diarctions";
var description = "A basic theory.";
var authors = "Karen";
var version = 1;

var currency, currency_A, currency_M;
var c1, c2, w1, w2, w3, w4, p1;
var c1Exp, c2Exp, w1Exp, w2Exp, w3Exp, w4Exp, q1Exp;

var achievement1, achievement2;
var chapter1, chapter2;

var init = () => {
    currency = theory.createCurrency();
    currency_A = theory.createCurrency("A", "A");
    currency_M = theory.createCurrency("M", "M");

    ///////////////////
    // Regular Upgrades

    // c1
    {
        let getDesc = (level) => "c_1=" + getC1(level).toString(0);
        c1 = theory.createUpgrade(0, currency, new FirstFreeCost(new ExponentialCost(15, Math.log2(2))));
        c1.getDescription = (_) => Utils.getMath(getDesc(c1.level));
        c1.getInfo = (amount) => Utils.getMathTo(getDesc(c1.level), getDesc(c1.level + amount));
    }

    // c2
    {
        let getDesc = (level) => "c_2=2^{" + level + "}";
        let getInfo = (level) => "c_2=" + getC2(level).toString(0);
        c2 = theory.createUpgrade(1, currency, new ExponentialCost(5, Math.log2(10)));
        c2.getDescription = (_) => Utils.getMath(getDesc(c2.level));
        c2.getInfo = (amount) => Utils.getMathTo(getInfo(c2.level), getInfo(c2.level + amount));
    }
   
    // w1
    {
        let getDesc = (level) => "w_1=" + getW1(level).toString(0);
        w1 = theory.createUpgrade(2, currency, new FirstFreeCost(new ExponentialCost(5000, Math.log2(2))));
        w1.getDescription = (_) => Utils.getMath(getDesc(w1.level));
        w1.getInfo = (amount) => Utils.getMathTo(getDesc(w1.level), getDesc(w1.level + amount));
    }
  
    // w2
    {
        let getDesc = (level) => "w_2=" + getW2(level).toString(0);
        w2 = theory.createUpgrade(3, currency_A, new FirstFreeCost(new ExponentialCost(200, Math.log2(2))));
        w2.getDescription = (_) => Utils.getMath(getDesc(w2.level));
        w2.getInfo = (amount) => Utils.getMathTo(getDesc(w2.level), getDesc(w2.level + amount));
    }
  
    // w3
    {
        let getDesc = (level) => "w_3=2^{" + level + "}";
        let getInfo = (level) => "w_3=" + getW3(level).toString(0);
        w3 = theory.createUpgrade(4, currency_A, new ExponentialCost(99999, Math.log2(10)));
        w3.getDescription = (_) => Utils.getMath(getDesc(w3.level));
        w3.getInfo = (amount) => Utils.getMathTo(getInfo(w3.level), getInfo(w3.level + amount));
    }
  
    // w4
    {
        let getDesc = (level) => "w_4=2^{" + level + "}";
        let getInfo = (level) => "w_4=" + getW4(level).toString(0);
        w4 = theory.createUpgrade(5, currency_A, new ExponentialCost(1e20, Math.log2(10)));
        w4.getDescription = (_) => Utils.getMath(getDesc(w4.level));
        w4.getInfo = (amount) => Utils.getMathTo(getInfo(w4.level), getInfo(w4.level + amount));
    }
  
    // p1
    {
        let getDesc = (level) => "p_1=" + getP1(level).toString(0);
        p1 = theory.createUpgrade(6, currency_A, new FirstFreeCost(new ExponentialCost(1e80, Math.log2(100))));
        p1.getDescription = (_) => Utils.getMath(getDesc(p1.level));
        p1.getInfo = (amount) => Utils.getMathTo(getDesc(p1.level), getDesc(p1.level + amount));
    }
  
    /////////////////////
    // Permanent Upgrades
    theory.createPublicationUpgrade(0, currency, 1000);
    theory.createBuyAllUpgrade(1, currency, 1e160);
    theory.createAutoBuyerUpgrade(2, currency, 0);

    ///////////////////////
    //// Milestone Upgrades
    theory.setMilestoneCost(new LinearCost(5, 5));

    {
        c1Exp = theory.createMilestoneUpgrade(0, 3);
        c1Exp.description = Localization.getUpgradeIncCustomExpDesc("c_1", "0.05");
        c1Exp.info = Localization.getUpgradeIncCustomExpInfo("c_1", "0.05");
        c1Exp.boughtOrRefunded = (_) => theory.invalidatePrimaryEquation();
    }

    {
        c2Exp = theory.createMilestoneUpgrade(1, 3);
        c2Exp.description = Localization.getUpgradeIncCustomExpDesc("c_2", "0.05");
        c2Exp.info = Localization.getUpgradeIncCustomExpInfo("c_2", "0.05");
        c2Exp.boughtOrRefunded = (_) => theory.invalidatePrimaryEquation();
    }
  
  {
        w1Exp = theory.createMilestoneUpgrade(2, 3);
        w1Exp.description = Localization.getUpgradeIncCustomExpDesc("w_1", "10");
        w1Exp.info = Localization.getUpgradeIncCustomExpInfo("w_1", "10");
        w1Exp.boughtOrRefunded = (_) => theory.invalidatePrimaryEquation();
    }
  
    {
        w2Exp = theory.createMilestoneUpgrade(3, 3);
        w2Exp.description = Localization.getUpgradeIncCustomExpDesc("w_2", "10");
        w2Exp.info = Localization.getUpgradeIncCustomExpInfo("w_2", "10");
        w2Exp.boughtOrRefunded = (_) => theory.invalidatePrimaryEquation();
    }
  
  {
        w3Exp = theory.createMilestoneUpgrade(4, 3);
        w3Exp.description = Localization.getUpgradeIncCustomExpDesc("w_3", "10");
        w3Exp.info = Localization.getUpgradeIncCustomExpInfo("w_3", "10");
        w3Exp.boughtOrRefunded = (_) => theory.invalidatePrimaryEquation();
    }
  
  {
        w4Exp = theory.createMilestoneUpgrade(5, 3);
        w4Exp.description = Localization.getUpgradeIncCustomExpDesc("w_4", "10");
        w4Exp.info = Localization.getUpgradeIncCustomExpInfo("w_4", "10");
        w4Exp.boughtOrRefunded = (_) => theory.invalidatePrimaryEquation();
    }
  
   {
        p1Exp = theory.createMilestoneUpgrade(6, 3);
        p1Exp.description = Localization.getUpgradeIncCustomExpDesc("p_1", "10");
        p1Exp.info = Localization.getUpgradeIncCustomExpInfo("p_1", "10");
        p1Exp.boughtOrRefunded = (_) => theory.invalidatePrimaryEquation();
    }
    
    /////////////////
    //// Achievements
    achievement1 = theory.createAchievement(0, "Achievement 1", "Description 1", () => c1.level > 1);
    achievement2 = theory.createSecretAchievement(1, "Achievement 2", "Description 2", "Maybe you should buy two levels of c2?", () => c2.level > 1);

    ///////////////////
    //// Story chapters
    chapter1 = theory.createStoryChapter(0, "My First Chapter", "This is line 1,\nand this is line 2.\n\nNice.", () => c1.level > 0);
    chapter2 = theory.createStoryChapter(1, "My Second Chapter", "This is line 1 again,\nand this is line 2... again.\n\nNice again.", () => c2.level > 0);

    updateAvailability();
}

var updateAvailability = () => {
    c2Exp.isAvailable = c1Exp.level > 0;
}

var tick = (elapsedTime, multiplier) => {
    let dt = BigNumber.from(elapsedTime * multiplier);
    let bonus = theory.publicationMultiplier;
    currency.value += dt * bonus * getC1(c1.level).pow(getC1Exponent(c1Exp.level)) *
                                   getC2(c2.level).pow(getC2Exponent(c2Exp.level));
                                   getW1(w1.level).pow(getW1Exponent(w1Exp.level));
                                   getW2(w2.level).pow(getW2Exponent(w2Exp.level));
                                   getW3(w3.level).pow(getW3Exponent(w3Exp.level));
                                   getW4(w4.level).pow(getW4Exponent(w4Exp.level));
                                   getP1(p1.level).pow(getP1Exponent(p1Exp.level));
}

var getPrimaryEquation = () => {
    let result = "\\dot{\\rho} = c_1";
    let result = "A = w_1"
    let result = "M = p_1

    if (c1Exp.level == 1) result += "^{1.05}";
    if (c1Exp.level == 2) result += "^{1.1}";
    if (c1Exp.level == 3) result += "^{1.15}";

    result += "c_2";

    if (c2Exp.level == 1) result += "^{1.05}";
    if (c2Exp.level == 2) result += "^{1.1}";
    if (c2Exp.level == 3) result += "^{1.15}";
  
    result += "w_1";

    if (w1Exp.level == 1) result += "^{10}";
    if (w1Exp.level == 2) result += "^{20}";
    if (w1Exp.level == 3) result += "^{30}";
  
    result += "w_2";

    if (w2Exp.level == 1) result += "^{10}";
    if (w2Exp.level == 2) result += "^{20}";
    if (w2Exp.level == 3) result += "^{30}";
  
    result += "w_3";

    if (w3Exp.level == 1) result += "^{10}";
    if (w3Exp.level == 2) result += "^{20}";
    if (w3Exp.level == 3) result += "^{30}";
  
    result += "w_4";

    if (w4Exp.level == 1) result += "^{10}";
    if (w4Exp.level == 2) result += "^{20}";
    if (w4Exp.level == 3) result += "^{30}";
  
   result += "p_1";

    if (p1Exp.level == 1) result += "^{10}";
    if (p1Exp.level == 2) result += "^{20}";
    if (p1Exp.level == 3) result += "^{30}";


    return result;
}

var getSecondaryEquation = () => theory.latexSymbol + "=\\max\\rho";
var getPublicationMultiplier = (tau) => tau.pow(0.436) / BigNumber.THREE;
var getPublicationMultiplierFormula = (symbol) => "\\frac{{" + symbol + "}^{0.436}}{3}";
var getTau = () => currency.value;
var get2DGraphValue = () => currency.value.sign * (BigNumber.ONE + currency.value.abs()).log10().toNumber();

var getC1 = (level) => Utils.getStepwisePowerSum(level, 2, 10, 0);
var getC2 = (level) => BigNumber.TWO.pow(level);
var getW1 = (level) => Utils.getStepwisePowerSum(level, 2, 10, 0)
var getW2 = (level) => BigNumber.TWO.pow(level);
var getW3 = (level) => BigNumber.TWO.pow(level);
var getW4 = (level) => BigNumber.TWO.pow(level);
var getP1 = (level) => Utils.getStepwisePowerSum(level, 2, 10, 0)
var getC1Exponent = (level) => BigNumber.from(1 + 0.05 * level);
var getC2Exponent = (level) => BigNumber.from(1 + 0.05 * level);
var getW1Exponent = (level) => BigNumber.from(1 + 10 * level);
var getW2Exponent = (level) => BigNumber.from(1 + 10 * level);
var getW3Exponent = (level) => BigNumber.from(1 + 10 * level);
var getW4Exponent = (level) => BigNumber.from(1 + 10 * level);
var getP1Exponent = (level) => BigNumber.from(1 + 10 * level);

init();
