const form = document.querySelector('form');
const passwordLength = document.querySelector('#psw-length');
const includeNumbers = document.querySelector('#numbers');
const includeUpperCase = document.querySelector('#uppercase');
const includeSymbols = document.querySelector('#symbols');
const btn = document.querySelector('button');
const container = document.querySelector('.my-password');
const generatedPsw = document.querySelector('.generated-password');
const output = document.querySelector('.output');
const errorDiv = document.querySelector('.errorDiv');
const copyBtn = document.querySelector('.copyBtn');

const error = document.createElement('p');
error.setAttribute('id', 'error-message');
error.textContent = 'Password length is required!';

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const passwordLengthValue = passwordLength.value;
    const includeNumbersValue = includeNumbers.checked;
    const includeUpperCaseValue = includeUpperCase.checked;
    const includeSymbolsValue = includeSymbols.checked;

    

    const existError = document.querySelector('#error-message');
    if (existError) {
        existError.remove();
    }
    if (!passwordLengthValue) {
        errorDiv.appendChild(error);
    }
    const existCopyError = document.querySelector('#copy-error');
    if(existCopyError){
        existCopyError.remove();
    }


    const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numbersChars = '1234567890';
    const symbolsChars = '!@#$%^&*()_+~`|}{[]\\:;?><,./-=';

    let chars = lowerCaseChars;
    if (includeNumbersValue) { // jeigu true, prideda skaicius.
        chars += numbersChars;
    }
    if (includeUpperCaseValue) {
        chars += upperCaseChars;
    }
    if (includeSymbolsValue) {
        chars += symbolsChars;
    }

    let password = '';
    for (let i = 0; i < passwordLengthValue; i++) { // kartos cikla, tiek kartu, koks irasytas skaicius
        const randomIndex = Math.floor(Math.random() * chars.length);
        password += chars[randomIndex];
    }

    generatedPsw.textContent = password;
})

copyBtn.addEventListener('click', () => {
    const copyPsw = generatedPsw.textContent;

    
    const existCopyError = document.querySelector('#copy-error');
    if (existCopyError) {
        existCopyError.remove();
    }

    const copyError = document.createElement('p');
    copyError.setAttribute('id', 'copy-error');
    copyError.textContent = 'Cannot copy an empty value!';

    if (!copyPsw) {
        errorDiv.appendChild(copyError);
        const existError = document.querySelector('#error-message');
    if (existError) {
        existError.remove();
    }
    } else {
        navigator.clipboard.writeText(copyPsw);
        copyBtn.textContent = 'Copied!';
        setTimeout(() => {
            copyBtn.textContent = 'Copy';
        }, 2000);
    }
});