function calculateAmortizationSchedule(loanAmount, numMonths, interestRate) {
    const monthlyInterestRate = interestRate / 12 / 100;
    const monthlyPayment = loanAmount * monthlyInterestRate / (1 - Math.pow(1 + monthlyInterestRate, -numMonths));

    let balance = loanAmount;
    // Use array to hold the information for each month 
    let amortizationSchedule = [];

    // loop throuch each month 
    for (let month = 1; month <= numMonths; month++) {
        const interestPaid = balance * monthlyInterestRate;
        const principalPaid = monthlyPayment - interestPaid;

        // Upadte balance by subtracting the principal
        // (Caused issues)
        balance -= principalPaid;

        amortizationSchedule.push({
            month: month,
            // Ensure remaining payment cannot be less than 0
            principalRemaining: balance > 0 ? balance : 0,
            interestPaid: interestPaid,
            principalPaid: principalPaid,
            totalMonthlyPayment: monthlyPayment
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
    tableBody.innerHTML = '';

    amortizationSchedule.forEach((data) => {
        const row = tableBody.insertRow(); 
        row.insertCell().textContent = data.month;
        row.insertCell().textContent = data.principalRemaining.toFixed(2);
        row.insertCell().textContent = data.principalPaid.toFixed(2);
        row.insertCell().textContent = data.interestPaid.toFixed(2);
        row.insertCell().textContent = data.totalMonthlyPayment.toFixed(2);
    });

}