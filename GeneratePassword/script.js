const form = document.querySelector('form');
const passwordLength = document.querySelector('#psw-length');
const includeNumbers = document.querySelector('#numbers');
const includeUpperCase = document.querySelector('#uppercase');
const includeSymbols = document.querySelector('#symbols');
const btn = document.querySelector('button');
const container = document.querySelector('.my-password');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const passwordLengthValue = passwordLength.value;
    const includeNumbersValue = includeNumbers.checked;
    const includeUpperCaseValue = includeUpperCase.checked;
    const includeSymbolsValue = includeSymbols.checked;

    const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numbersChars = '1234567890';
    const symbolsChars = '!@#$%^&*()_+~`|}{[]\\:;?><,./-=';
    
    let chars = lowerCaseChars;
    if (includeNumbersValue) {
        chars += numbersChars;
    }
    if (includeUpperCaseValue) {
        chars += upperCaseChars;
    }
    if (includeSymbolsValue) {
        chars += symbolsChars;
    }

    let password = '';
    for (let i = 0; i < passwordLengthValue; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        password += chars[randomIndex];
    }
    
    const output = document.createElement('div')
    output.setAttribute('id', 'generated-password');
    container.append(output);
    output.textContent = password;
})