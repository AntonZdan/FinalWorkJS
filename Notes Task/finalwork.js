const title = document.querySelector('#title');
const note = document.querySelector('#note');
const addBtn = document.querySelector('#addBtn');
const cancelBtn = document.querySelector('#cancelBtn');
const output = document.querySelector('#output');
const form = document.querySelector('form');

window.addEventListener('load', ()=>{
    const emptyNoteBook = document.createElement('h1');
    emptyNoteBook.textContent = 'Your Notebook is empty. You can add some notes.'
    body.appendChild(emptyNoteBook);
})

addBtn.addEventListener('click', (event) => {
    event.preventDefault();
    titleValue = title.value;
    noteValue = note.value;

    if (!titleValue || !noteValue) {
        if (!form.querySelector('#error-message')) {
            const emptyValue = document.createElement('p')
            emptyValue.setAttribute('id', 'error-message')
            emptyValue.textContent = 'Please write Title and Note to add them in your NoteBook!';
            emptyValue.style.color = '#ff2200';
            emptyValue.style.fontFamily = 'normal';
            emptyValue.style.textAlign = 'center';
            form.append(emptyValue);
        }
    }
    else {
        const existingError = document.querySelector('#error-message');
        if (existingError) {
            existingError.remove();
        }
        const div = document.createElement('div');
        const titleText = document.createElement('div');
        const h4 = document.createElement('h4');
        const p = document.createElement('p');
        const icon = document.createElement('i');
        icon.setAttribute('class', 'fas fa-trash-alt');
        h4.textContent = titleValue;
        p.textContent = noteValue;

        //Styliai div konteineriui
        div.style.backgroundImage = 'url(https://t4.ftcdn.net/jpg/10/27/08/31/360_F_1027083125_CctAY0dbkVkVi1D8dYnoGJayzHtMmFR8.jpg)';
        div.style.backgroundSize = 'cover';
        div.style.display = 'flex';
        div.style.flexDirection = 'column';
        div.style.flexWrap = 'wrap';
        div.style.backgroundPosition = 'center';
        div.style.width = '200px';
        div.style.height = '200px';
        div.style.margin = '10px';
        div.style.padding = '10px';
        div.style.borderRadius = '7px';
        div.style.boxShadow = '#7e3d33 0px 60px 40px -7px';
        titleText.style.display = 'flex';
        titleText.style.justifyContent = 'space-between';
        icon.style.cursor = 'pointer';
        //Idedu viska i konteineri
        titleText.append(h4);
        titleText.append(icon)
        div.append(titleText);
        div.append(p);
        //Idedu viska i outputa
        output.append(div);

        icon.onclick = function() { // KAI PASPAUDZIU ANT IKONELES, ISTRINA NOTE IR PASALINA INFO IS LOCALSTORAGE
            div.remove();
            const savedNotes = JSON.parse(localStorage.getItem('savedNotes') || '[]');
            
        }

        p.onclick = function() { // KAI PASPAUDZIU ANT DESCRIPTION, UZBRAUKIA JI IR ATVIRKSCIAI.

            const ifNoteIsDone = getComputedStyle(p).textDecorationLine === 'line-through'; //GOOGLINAU
            if(ifNoteIsDone){
                p.style.textDecoration = 'none';
                h4.style.textDecoration = 'none';
                
            }else{
                p.style.textDecoration = 'line-through';
                p.style.textDecorationColor ='red';
                p.style.textDecorationThickness = '5px';
                h4.style.textDecoration = 'line-through';
                h4.style.textDecorationColor ='red';
                h4.style.textDecorationThickness = '5px';
            }
        }

        const savedNotes = JSON.parse(localStorage.getItem('savedNotes') || '[]');
        
        savedNotes.push({
            title: titleValue,
            note: noteValue
        })

        localStorage.setItem('savedNotes', JSON.stringify(savedNotes));

    }

})