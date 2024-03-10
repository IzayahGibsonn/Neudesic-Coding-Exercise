function calculateAmortizationSchedule(loanAmount, numMonths, interestRate) {
    const monthlyInterestRate = interestRate / 12 / 100;
    const monthlyPayment = loanAmount * monthlyInterestRate / (1 - Math.pow(1 + monthlyInterestRate, -numMonths));

    let balance = loanAmount;
    let totalInterestPaid = 0;
    let totalAmountPaid = 0;
    // Use array to hold the information for each month 
    let amortizationSchedule = [];

    // loop throuch each month 
    for (let month = 1; month <= numMonths; month++) {
        const interestPaid = balance * monthlyInterestRate;
        const principalPaid = monthlyPayment - interestPaid;

        // Upadte balance by subtracting the principal
        balance -= principalPaid;
        // Keep running total
        totalInterestPaid += interestPaid;
        totalAmountPaid += monthlyPayment;


        amortizationSchedule.push({
            month: month,
            // Ensure remaining payment cannot be less than 0
            principalRemaining: balance > 0 ? balance : 0,
            interestPaid: interestPaid,
            principalPaid: principalPaid,
        });
    }
    return {
        amortizationSchedule, monthlyPayment, totalInterestPaid, totalAmountPaid
    }; 

}

function updateAmortizationTable() {
    const loanAmount = parseFloat(document.getElementById('loanAmount').value);
    const interestRate = parseFloat(document.getElementById('interestRate').value);
    const numMonths = parseInt(document.getElementById('numMonths').value);


    const { amortizationSchedule, monthlyPayment, totalInterestPaid, totalAmountPaid } =
    calculateAmortizationSchedule(loanAmount, numMonths, interestRate);

    const table = document.getElementById('amortizationSchedule');
    // Clear dataset
    table.innerHTML = '';

    amortizationSchedule.forEach((month) => {
        const row = table.insertRow(); 
        row.insertCell().textContent = month.month;
        // .toFixed rounds to nearest hundreth place
        row.insertCell().textContent = `$${month.principalRemaining.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
        row.insertCell().textContent = `$${month.principalPaid.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
        row.insertCell().textContent = `$${month.interestPaid.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    });

    document.getElementById("monthlyPayment").textContent = `$${monthlyPayment.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    document.getElementById("totalInterestPaid").textContent = `$${totalInterestPaid.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    document.getElementById("totalAmountPaid").textContent = `$${totalAmountPaid.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
}

function initializeBlankTableRows() {
    const table = document.getElementById('amortizationSchedule');
    table.innerHTML = ''; 

    for (let i = 0; i < 4; i++) {
        const row = table.insertRow();
        for (let j = 0; j < 4; j++) { 
            row.insertCell().innerHTML = "&nbsp;"; 
        }
    }
}

// Upon clicking 'calculate' call updateAmortizationTable
// Upon clicking 'clear' reset all input fields and reinitialize table
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('calculateButton').addEventListener('click', updateAmortizationTable);
    document.getElementById("clearButton").onclick = function() {
        document.getElementById("loanCalculatorForm").reset();
        initializeBlankTableRows();
    };
    initializeBlankTableRows(); 
});
