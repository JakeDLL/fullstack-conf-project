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

});