You are looking to buy a house. You want to know what your monthly expenses would be, and you decide to build a loan amortization schedule. 

Expectations
- Your application should allow the user to enter: 
    - total loan amount
    - length of the loan (months) 
    - loan's interest rate.
- With this information it should generate the following information on a month-by-month basis. 
    - principle amount remaining
    - interest amount paid
    - principle amount paid
    - total monthly payment

- How you choose to display the data is entirely up to you as long as it conveys the above information. Traditionally, this information is displayed in tables as depicted below.
- There are no language or framework requirements.
- The project should be published on GitHub with regular commit check-ins.
- You are expected to be able to present your project and answer basic questions about your implementation. Come ready to talk about your implementation, and the different considerations you made at each step.

Things I did external research on:
- .toLocaleString() for comma placement.
    - This replaces .toFixed() and allows for a decimal precision of exactly 2. 
    - Places commas in the correct space depending on the user's location settings.
- placeholders with forms in HTML
    - Allows a placeholder value in the form input field to guide the user
- CSS styling
    - Biggest one was flexbox which allowed me to vertically and horizontally align elements
- Formula for monthly Payment in js 
    - Orginally my values after calculation were off so I did research and found a corrected formula online that solved the issue.
    - https://stackoverflow.com/questions/57911510/mortgage-amortization-payment-calculations


