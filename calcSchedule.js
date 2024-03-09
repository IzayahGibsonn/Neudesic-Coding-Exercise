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
        // (Caused issues)
        balance -= principalPaid;

        totalInterestPaid += interestPaid;
        totalAmountPaid += monthlyPayment;


        amortizationSchedule.push({
            month: month,
            // Ensure remaining payment cannot be less than 0
            principalRemaining: balance > 0 ? balance : 0,
            interestPaid: interestPaid,
            principalPaid: principalPaid,
            totalMonthlyPayment: monthlyPayment,
            totalInterestPaid: totalInterestPaid,
            totalAmountPaid: totalAmountPaid
        });
    }
    return amortizationSchedule;
}

function updateAmortizationTable() {
    const loanAmount = parseFloat(document.getElementById('loanAmount').value);
    const interestRate = parseFloat(document.getElementById('interestRate').value);
    const numMonths = parseInt(document.getElementById('numMonths').value);

    const schedule = calculateAmortizationSchedule(loanAmount, numMonths, interestRate);

    const tableBody = document.getElementById('amortizationSchedule');
    // Clear dataset
    tableBody.innerHTML = '';

    schedule.forEach((month) => {
        const row = tableBody.insertRow(); 
        row.insertCell().textContent = month.month;
        // .toFixed rounds to nearest hundreth place an
        row.insertCell().textContent = `$${month.principalRemaining.toFixed(2)}`;
        row.insertCell().textContent = `$${month.principalPaid.toFixed(2)}`;
        row.insertCell().textContent = `$${month.interestPaid.toFixed(2)}`;
        row.insertCell().textContent = `$${month.totalMonthlyPayment.toFixed(2)}`;
        row.insertCell().textContent = `$${month.totalInterestPaid.toFixed(2)}`;
        row.insertCell().textContent = `$${month.totalAmountPaid.toFixed(2)}`;
    });
}

// Upon clicking 'calculate' call updateAmortizationTable
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('calculateButton').addEventListener('click', updateAmortizationTable);
});

// Upon clicking 'clear' reset all input fields
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("clearButton").onclick = function() {
        document.getElementById("loanCalculatorForm").reset();
    };
});