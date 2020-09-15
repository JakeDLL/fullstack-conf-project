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
        } else {
            otherJobRole.style.display = 'none';
        }
    })

    const shirtDesign = document.querySelector('#design');
    const shirtColorList = document.querySelector('#color');
    const colors = shirtColorList.children;
    for (let i = 1; i < colors.length; i++) {
        colors[i].hidden = 'true';
    }
    
    shirtDesign.firstElementChild.style.display = 'none';
    shirtDesign.addEventListener('change', () => {
        for (let i = 1; i < colors.length; i++) {
            colors[i].hidden = 'false';
        }
    })

});