import {
  basicRateLimitValue,
  higherRateLimitValue,
  basicRateTaxPercentage,
  personalAllowanceValue,
  reducedPersonalAllowanceThreshold,
  reducedPersonalAllowanceRatio,
  higherRateTaxPercentage,
  additionalRateTaxPercentage,
  nationalInsurancePrimaryThreshold,
  nationalInsuranceUpperThreshold,
  nationalInsurance8pcnt,
  nationalInsurance2pcnt,
  studentLoanPlan1Threshold,
  studentLoanPlan1Percentage,
  studentLoanPlan2Threshold,
  studentLoanPlan2Percentage,
  studentLoanPostGradThreshold,
  studentLoanPostGradPercentage,
} from "../constants/tax";

export const calculateTax = (
  grossIncome: number,
  studentLoanPlan: number,
  pensionPercentage: number,
  hasPostgraduateLoan: boolean
): number => {
  //Calculate Income Tax
  let personalAllowance = personalAllowanceValue;

  if (grossIncome > reducedPersonalAllowanceThreshold) {
    const reducedAllowance =
      grossIncome -
      reducedPersonalAllowanceThreshold / reducedPersonalAllowanceRatio;
    personalAllowance = Math.max(0, personalAllowance - reducedAllowance);
  }

  const taxableIncome = Math.max(0, grossIncome - personalAllowance);

  let basicRateTax = 0,
    higherRateTax = 0,
    additionalRateTax = 0;

  if (taxableIncome <= basicRateLimitValue) {
    basicRateTax = taxableIncome * basicRateTaxPercentage;
  } else {
    basicRateTax =
      (basicRateLimitValue - personalAllowance) * basicRateTaxPercentage;
  }

  if (
    taxableIncome > basicRateLimitValue &&
    taxableIncome <= higherRateLimitValue
  ) {
    higherRateTax =
      (taxableIncome - basicRateLimitValue) * higherRateTaxPercentage;
  } else if (taxableIncome > higherRateLimitValue) {
    higherRateTax =
      (higherRateLimitValue - basicRateLimitValue) * higherRateTaxPercentage;
    additionalRateTax =
      (taxableIncome - higherRateLimitValue) * additionalRateTaxPercentage;
  }

  const totalIncomeTax = basicRateTax + higherRateTax + additionalRateTax;

  //Calculate National Insurance

  let ni8Percent = 0,
    ni2Percent = 0;

  if (
    grossIncome > nationalInsurancePrimaryThreshold &&
    grossIncome <= nationalInsuranceUpperThreshold
  ) {
    ni8Percent =
      (grossIncome - nationalInsurancePrimaryThreshold) *
      nationalInsurance8pcnt;
  } else if (grossIncome > nationalInsuranceUpperThreshold) {
    ni8Percent =
      (nationalInsuranceUpperThreshold - nationalInsurancePrimaryThreshold) *
      nationalInsurance8pcnt;
    ni2Percent =
      (grossIncome - nationalInsuranceUpperThreshold) * nationalInsurance2pcnt;
  }

  const totalNI = ni8Percent + ni2Percent;

  //Calculate Student Loan
  let studentLoanRepayment = 0;
  if (studentLoanPlan === 1 && grossIncome > studentLoanPlan1Threshold) {
    studentLoanRepayment =
      (grossIncome - studentLoanPlan1Threshold) * studentLoanPlan1Percentage;
  } else if (studentLoanPlan === 2 && grossIncome > studentLoanPlan2Threshold) {
    studentLoanRepayment =
      (grossIncome - studentLoanPlan2Threshold) * studentLoanPlan2Percentage;
  }

  //PostGraduate
  let postgraduateLoanRepayment = 0;
  if (hasPostgraduateLoan && grossIncome > studentLoanPostGradThreshold) {
    postgraduateLoanRepayment =
      (grossIncome - studentLoanPostGradThreshold) *
      studentLoanPostGradPercentage;
  }

  //Pension
  const pensionContribution = grossIncome * (pensionPercentage / 100);

  const takeHomePay =
    grossIncome -
    totalIncomeTax -
    totalNI -
    studentLoanRepayment -
    postgraduateLoanRepayment -
    pensionContribution;

  console.log("Total Income Tax = " + totalIncomeTax);
  console.log("Total Student Loan Repayment = " + studentLoanRepayment);
  console.log(
    "Total Post Graduate Loan Repayment = " + postgraduateLoanRepayment
  );
  console.log("Total National Insurance = " + totalNI);
  console.log("Total Pension Contribution = " + pensionContribution);
  console.log("Take Home Pay = " + takeHomePay);

  return takeHomePay;
};

// calculateTax(50000, 1, 2, true);
