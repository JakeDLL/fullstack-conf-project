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
    const costParagraph = `<p id="total">Total: ${totalCost}</p>`;
    activities.insertAdjacentHTML('beforeend', costParagraph);
    const total = document.querySelector('#total');
    total.style.display = 'none';
    
    activities.addEventListener('change', event => {
        const selectedBox = event.target;
        const selectedDNT = selectedBox.getAttribute('data-day-and-time');
        const selectedCost = selectedBox.getAttribute('data-cost');

        if (selectedBox.checked) {
            totalCost += selectedCost;
            for (let i = 0; i < checkboxes.length; i++) {
                if (selectedDNT === checkboxes[i].getAttribute('data-day-and-time')) {
                    checkboxes[i].disabled = 'true';
                }
            }
        } else {
            totalCost -= selectedCost;
            for (let i = 0; i < checkboxes.length; i++) {
                if (selectedDNT === checkboxes[i].getAttribute('data-day-and-time')) {
                    checkboxes[i].disabled = '';
                }
            }
        }
        
        if (totalCost !== 0) {
            total.style.display = '';
        } else {
            total.style.display = 'none';
        }
        
    })
});