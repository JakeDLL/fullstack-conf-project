window.addEventListener('load', () => {
    const userName = document.querySelector('#name');
    userName.focus();

    const otherJobRole = document.querySelector('#other-title');
    otherJobRole.style.display = 'none';

    const jobList = document.querySelector('#title');
    jobList.addEventListener('change', event => {
        const chosenJob = event.target.value;
        if (chosenJob === 'other') {
            otherJobRole.style.display = '';
            otherJobRole.focus();
        } else {
            otherJobRole.style.display = 'none';
        }
    })

    const shirtDesign = document.querySelector('#design');
    const shirtColorList = document.querySelector('#color');
    const colors = shirtColorList.children;
    for (let i = 0; i < colors.length; i++) {
        colors[i].hidden = 'true';
    }
    
    shirtDesign.firstElementChild.style.display = 'none';
    shirtDesign.addEventListener('change', event => {
        colors[0].selected = 'true'
        const selection = event.target.value;
        // This repeats. Create a function for it.
        if (selection === "js puns") {
            const testRegex = /JS Puns/;
            for (let i = 1; i < colors.length; i++){
                if (testRegex.test(colors[i].textContent)) {
                    colors[i].hidden = '';
                } else {
                    colors[i].hidden = 'true';
                }
            }
        } else if (selection === "heart js") {
            const testRegex = /JS shirt only/;
            for (let i = 1; i < colors.length; i++) {
                if (testRegex.test(colors[i].textContent)) {
                    colors[i].hidden = '';
                } else {
                    colors[i].hidden = 'true';
                }
            }
        }
    });

    const checkboxes = document.querySelectorAll('.activities input');
    const activities = document.querySelector('.activities');
    let totalCost = 0;
    const costParagraph = `<p id="total" hidden="true">Total: </p>`;
    activities.insertAdjacentHTML('beforeend', costParagraph);
    const total = document.querySelector('#total');
    
    activities.addEventListener('change', event => {
        const selectedBox = event.target;
        const selectedDNT = selectedBox.getAttribute('data-day-and-time');
        const selectedCost = selectedBox.getAttribute('data-cost');

        if (selectedBox.checked) {
            totalCost += +selectedCost;
            for (let i = 0; i < checkboxes.length; i++) {
                if (selectedBox !== checkboxes[i] && selectedDNT === checkboxes[i].getAttribute('data-day-and-time')) {
                    checkboxes[i].disabled = 'true';
                }
            }
        } else {
            totalCost -= +selectedCost;
            for (let i = 0; i < checkboxes.length; i++) {
                if (selectedDNT === checkboxes[i].getAttribute('data-day-and-time')) {
                    checkboxes[i].disabled = '';
                }
            }
        }
        
        if (totalCost !== 0) {
            total.hidden = '';
            total.textContent = `Total: $${totalCost}`;
        } else {
            total.hidden = 'true';
        }
        
    });

    const creditCardDiv = document.querySelector('#credit-card');
    const paypalDiv = document.querySelector('#paypal');
    paypalDiv.hidden = 'true';
    const bitcoinDiv = document.querySelector('#bitcoin');
    bitcoinDiv.hidden = 'true';
    const paymentList = document.querySelector('#payment')
    const paymentListOptions = paymentList.children;
    paymentListOptions[0].hidden = 'true';
    paymentListOptions[1].selected = 'true';

    paymentList.addEventListener('change', event => {
        const selectedPayment = event.target.value;

        if (selectedPayment === 'credit card') {
            creditCardDiv.hidden = '';
            paypalDiv.hidden = 'true';
            bitcoinDiv.hidden = 'true';
        }
        if (selectedPayment === 'paypal') {
            paypalDiv.hidden = '';
            creditCardDiv.hidden = 'true';
            bitcoinDiv.hidden = 'true';
        }
        if (selectedPayment === 'bitcoin') {
            bitcoinDiv.hidden = '';
            creditCardDiv.hidden = 'true';
            paypalDiv.hidden = 'true';
        }
    });
});