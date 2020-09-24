document.addEventListener('DOMContentLoaded', () => {

    /**
     * ----------------------
     * Variable Declarations
     * ----------------------
     * 
     * All DOM elements needed are selected and manipulated.
     */
    
    const form = document.querySelector('form');

    // selected name so that the first input element on the document is focused on load
    const userName = document.querySelector('#name');
    userName.focus();

    const userMail = document.querySelector('#mail');

    // Hid other job role input.
    const otherJobRole = document.querySelector('#other-title');
    otherJobRole.style.display = 'none';
    const jobList = document.querySelector('#title');

    // color selection div will not show until design option is selected
    const shirtDesign = document.querySelector('#design');
    const shirtColorList = document.querySelector('#color');
    const shirtColorDiv = shirtColorList.parentNode;
    shirtColorDiv.hidden = 'true';
    const colors = shirtColorList.children;

    // This hides the first option 'select design' from appearing
    shirtDesign.firstElementChild.style.display = 'none';

    // selected elements needed to interact with the activities section
    const checkboxes = document.querySelectorAll('.activities input');
    const activities = document.querySelector('.activities');

    // totalCost holds the price of all activities selected
    let totalCost = 0;
    const totalMsg = `<p id="total" hidden="true"></p>`;
    activities.insertAdjacentHTML('beforeend', totalMsg);

    // The next block selects and manipulates the elements for the payment options
    const creditCardDiv = document.querySelector('#credit-card');
    const paypalDiv = document.querySelector('#paypal');
    const bitcoinDiv = document.querySelector('#bitcoin');
    // Hide the other payment boxes so that credit card is the one shown
    paypalDiv.hidden = 'true';
    bitcoinDiv.hidden = 'true';
    const paymentList = document.querySelector('#payment')
    const paymentListOptions = paymentList.children;
    paymentListOptions[0].hidden = 'true';
    paymentListOptions[1].selected = 'true';
    const cardNum = document.querySelector('#cc-num');
    const zipCode = document.querySelector('#zip');
    const cvv = document.querySelector('#cvv');

    /**
     * ---------
     * Functions
     * ---------
     */
    
    // This function validates user data with a regex and returns a boolean value
    function validator(regex, data, inputErrMsg) {
        // If the error message exists, this selects it
        const errorMessage = document.querySelector(`#${data.getAttribute('id')}-err`);
        if (regex.test(data.value)) {
            data.style.borderColor = ''
            // If the error message exists, this removes the message.
            if (errorMessage) {
                errorMessage.remove();
            }
            return true;
        } else {
            data.style.borderColor = 'red';
            // The conditional statement checks if the error exists and updates the message if there are conditional error messages.
            if (errorMessage) {
                errorMessage.innerHTML = `${inputErrMsg}`;
            } else if (!(errorMessage) && inputErrMsg) {
                data.insertAdjacentHTML('afterend', `<p class="error-msg" id="${data.getAttribute('id')}-err">${inputErrMsg}</p>`);
            }
            return false;
        }
    }

    // The following functions serve as validators using the validator method declared above and a custom RegExp.
    const nameValidator = () => {
        const nameRegex = /^[\w\s\-]{2,}$/
        const conditionalErrMsg = () => {
            if (userName.value.length == 0) {
                return `Name cannot be empty.`;
            } else if (userName.value.length = 1) {
                return `Name cannot be less than 2`;
            } else if (!(nameRegex.test(userName.value))) {
                return 'Invalid name';
            }
        }
        return validator(nameRegex, userName, conditionalErrMsg());
    };

    const mailValidator = () => {
        const mailRegex = /^([\w\-\_\.]+)@([\w\-\_\.]+)\.\w{3,}$/;
        return validator(mailRegex, userMail, `You need to input a valid email format (example@mail.me).`);
    };

    const activitiesValidator = () => {
        const activitiesErrMsg = document.querySelector('#activites-err');
        for (let i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked) {;
                if(activitiesErrMsg) {
                    activitiesErrMsg.remove();
                }
                return true;
            }
        }
        if (!(activitiesErrMsg)) {
            document.querySelector('fieldset.activities').insertAdjacentHTML('beforeend', `<p class="error-msg" id="activites-err">You need to select at least 1 activity.</p>`);
        }
        return false;
    };

    const cardNumValidator = () => {
        const cardNumRegex = /^[\s\-]?(\d{4})[\s\-]?(\d{4})[\s\-]?(\d{4})[\s\-]?\d{1,4}\s*$/;
        const conditionalErrMsg = () => {
            if (cardNum.value.length > 0) {
                return `The number needs to be between 13 to 16 digits.`;
            } else if (cardNum.value.length == 0) {
                return `The card number is missing.`;
            }
        }

        return validator(cardNumRegex, cardNum, conditionalErrMsg());
    }

    const zipCodeValidator = () => {
        const zipCodeRegex = /^(\d{5})[\s\-]?(\d{4})?$/;
        const conditionalErrMsg = () => {
            if (zipCode.value.length > 0) {
                return `The zip code needs to be 5 or 9 digits.`;
            } else if (zipCode.value.length == 0) {
                return `The zip code is missing.`;
            }
        }
        
        return validator(zipCodeRegex, zipCode, conditionalErrMsg());
    }

    const cvvValidator = () => {
        const cvvRegex = /^\d{3}$/;
        const conditionalErrMsg = () => {
            if (cvv.value.length > 0) {
                return `The CVV number needs to be 3 digits.`;
            } else if (cvv.value.length == 0) {
                return `The CVV number is missing.`;
            }
        }

        return validator(cvvRegex, cvv, conditionalErrMsg());
    }

    // This validator calls the other credit card validators for the form submit event
    const creditCardValidator = () => {
        // This saves each boolean value in variables so that ALL the validators run before being tested
        const isCardValid = cardNumValidator();
        const isZipValid = zipCodeValidator();
        const isCVVValid = cvvValidator();

        // If all validators return true, the function itself returns true
        if (isCardValid && isZipValid && isCVVValid) {
            return true;
        }
        return false;
    };

    /**
     * ---------------
     * Event Listeners
     * ---------------
     */

    userName.addEventListener('keyup', nameValidator);

    userMail.addEventListener('keyup', mailValidator);

    // This event listener checks if the job chosen is other. If selected, the input field will appear. if deselected, it will disappear
    jobList.addEventListener('change', event => {
        const chosenJob = event.target.value;
        if (chosenJob === 'other') {
            otherJobRole.style.display = '';
            otherJobRole.focus();
        } else {
            otherJobRole.style.display = 'none';
        }
    });

    // When users select a design, the color div will appear and selections will be filtered by choice.
    shirtDesign.addEventListener('change', event => {
        shirtColorDiv.hidden = '';
        colors[0].selected = 'true'
        colors[0].textContent = 'Please select a color';
        const selection = event.target.value;

        // this function checks which design the user chose and displays the appropriate colors.
        const displayDesigns = () => {
            const designs = [{type: 'js puns', regex: /JS Puns/}, {type: 'heart js', regex: /JS shirt only/}];
            for (design in designs) {
                if (selection === designs[design].type) {
                    for (let i = 0; i < colors.length; i++) {
                        if (designs[design].regex.test(colors[i].textContent)) {
                            colors[i].hidden = '';
                        } else {
                            colors[i].hidden = 'true';
                        }
                    }
                    break;
                }
            }
        }
        displayDesigns();
    });

    // this event listener adds/subtracts the price from totalCost and disables/enables conflicting activies.
    activities.addEventListener('change', event => {
        const selectedBox = event.target;
        const selectedDNT = selectedBox.getAttribute('data-day-and-time');
        const selectedCost = selectedBox.getAttribute('data-cost');
        const total = document.querySelector('#total');

        // If the box has been checked, it will add the price and disable other conflicting activites.
        // If the box was unchecked, it will reduce the price and enable conflicting activities.
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
        
        // If the total is 0, totalCost is hidden
        if (totalCost !== 0) {
            total.hidden = '';
            total.textContent = `Total: $${totalCost}`;
        } else {
            total.hidden = 'true';
        }

        // If the user deselects all activities, it will throw an error message.
        activitiesValidator();
    });

    // The next three add real-time validation to the credit card input fields
    cardNum.addEventListener('keyup', cardNumValidator);
    zipCode.addEventListener('keyup', zipCodeValidator);
    cvv.addEventListener('keyup', cvvValidator);

    // This event listener checks which payment type has been selected and displays the appropiate div.
    paymentList.addEventListener('change', event => {
        const selectedPayment = event.target.value;
        const paymentTypes = [
            {
                type: 'credit card',
                div: creditCardDiv
            },
            {
                type: 'paypal',
                div: paypalDiv
            },
            {
                type: 'bitcoin',
                div: bitcoinDiv
            }
        ];

        for (let i = 0; i < paymentTypes.length; i++) {
            if (selectedPayment === paymentTypes[i].type) {
                paymentTypes[i].div.hidden = '';
            } else {
                paymentTypes[i].div.hidden = 'true';
            }
        }
    });

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

        // If the credit card payment option is selected, it validates it.
        if (paymentListOptions[1].selected) {
            if (!(creditCardValidator())) {
                event.preventDefault();
            }
        }
        
    });
});