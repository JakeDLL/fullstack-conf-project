document.addEventListener('DOMContentLoaded', () => {
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
        // This repeats. Create a function for it.0
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
    const totalMsg = `<p id="total" hidden="true"></p>`;
    activities.insertAdjacentHTML('beforeend', totalMsg);

    activities.addEventListener('change', event => {
        const selectedBox = event.target;
        const selectedDNT = selectedBox.getAttribute('data-day-and-time');
        const selectedCost = selectedBox.getAttribute('data-cost');
        const total = document.querySelector('#total');

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

    const activitiesValidator = () => {
        for (let i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                console.log(`${checkboxes[i].value} is checked`);
                return true;
            }
        }
        return false;
    };

    const creditCardValidator = () => {
        const cardNumValidator = () => {
            const cardNumRegex = /^[\s\-]?(\d{4})[\s\-]?(\d{4})[\s\-]?(\d{4})[\s\-]?\d{1,4}\s*$/;
            const cardNum = document.querySelector('#cc-num');

            if (cardNumRegex.test(cardNum.value)) {
                cardNum.style.borderColor = '';
            } else {
                cardNum.style.borderColor = 'red';
                return false;
            }
        }

        const zipCodeValidator = () => {
            const zipCodeRegex = /^(\d{5})[\s\-]?(\d{4})?$/;
            const zipCode = document.querySelector('#zip');
            
            if (zipCodeRegex.test(zipCode.value)) {
                zipCode.style.borderColor = '';
            } else  {
                zipCode.style.borderColor = 'red';
                return false;
            }
        }

        const cvvValidator = () => {
            const cvvRegex = /^\d{3}$/;
            const cvv = document.querySelector('#cvv');

            if (cvvRegex.test(cvv.value)) {
                cvv.style.borderColor = '';
            } else {
                cvv.style.borderColor = 'red'
                return false;
            }
        }

        const isCardValid = cardNumValidator();
        const isZipValid = zipCodeValidator();
        const isCVVValid = cvvValidator();

        if (isCardValid && isZipValid && isCVVValid) {
            return true;
        }
        return false;
    };

    const nameValidator = () => {
        const nameValue = userName.value; 
        if (nameValue.length == 0) {
            userName.style.borderColor = 'red';
            return false;
        } else {
            userName.style.borderColor = 'white';
            return true;
        }
    };

    const mailValidator = () => {
        const userMail = document.querySelector('#mail');
        const mailRegex = /^([\w\-\_\.]+)@([\w\-\_\.]+)\.\w+$/;

        if (mailRegex.test(userMail.value)) {
            userMail.style.borderColor = '';
            return true;
        } else {
            userMail.style.borderColor = 'red';
            return false;
        }
    };


    const form = document.querySelector('form');
    form.addEventListener('submit', event => {
        if (!(nameValidator())) {
            event.preventDefault();
        }
        if (!(mailValidator())) {
            event.preventDefault();
        }
        if (!(activitiesValidator())) {
            event.preventDefault();
        }
        if (paymentListOptions[1].selected) {
            if (!(creditCardValidator())) {
                event.preventDefault();
            }
        }
        
    });
});