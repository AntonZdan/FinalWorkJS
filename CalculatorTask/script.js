const calculator = document.querySelector('.calculator');
const buttons = document.querySelectorAll('button');
const display = document.querySelector('.display');


buttons.forEach(button => {
    button.addEventListener('click', () =>{
        const btnValue = button.textContent;
        display.textContent += btnValue;
    })
});


