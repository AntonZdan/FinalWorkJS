const title = document.querySelector('#title');
const note = document.querySelector('#note');
const addBtn = document.querySelector('#addBtn');
const cancelBtn = document.querySelector('#cancelBtn');
const output = document.querySelector('#output');
const form = document.querySelector('form');
const body = document.querySelector('body');
const emptyNoteBook = document.createElement('h1');

window.addEventListener('load', ()=>{ // Kai nera nei vieno priminimo, per viduri atsiranda uzrasas.
        emptyNoteBook.textContent = 'Oops! Your Notebook is empty!...'
        body.appendChild(emptyNoteBook);
        emptyNoteBook.style.cssText = 'text-align: center; margin-top: 5em; color: red; font-family: normal; font-weight: 800; font-size: 24px';
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
            emptyValue.style.cssText = 'color: #ff2200; text-align: center; font-family: normal';
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
        emptyNoteBook.remove();

        //Styliai div konteineriui
        div.style.cssText = 'background-image: url(https://t4.ftcdn.net/jpg/10/27/08/31/360_F_1027083125_CctAY0dbkVkVi1D8dYnoGJayzHtMmFR8.jpg); background-size: cover; display: flex; flex-direction: column; flex-wrap: wrap; background-position: center; width: 200px; height: 200px; margin: 10px; padding: 10px; border-radius: 7px; box-shadow: #7e3d33 0px 60px 40px -7px';
        //CSS Title 
        titleText.style.cssText = 'display: flex; justify-content: space-between;';
        //CSS Ikonele(istrinti)
        icon.style.cursor = 'pointer';
        //Idedu viska i konteineri
        titleText.append(h4);
        titleText.append(icon)
        div.append(titleText);
        div.append(p);
        //Idedu viska i outputa
        output.append(div);
        
        let savedNotes = JSON.parse(localStorage.getItem('savedNotes') || '[]'); // sukuriu masyva localstorage ir saugoju tuos notes;
        const noteId = Date.now();
        savedNotes.push({
            id: noteId,
            title: titleValue,
            note: noteValue
        })

        localStorage.setItem('savedNotes', JSON.stringify(savedNotes));

        icon.onclick = function() { // KAI PASPAUDZIU ANT IKONELES, ISTRINA NOTE IR PASALINA INFO IS LOCALSTORAGE
            div.remove();
            let savedNotes = JSON.parse(localStorage.getItem('savedNotes') || '[]');

            savedNotes = savedNotes.filter(noteObj => noteObj.id !== noteId );
            localStorage.setItem('savedNotes', JSON.stringify(savedNotes));

            if(savedNotes.length === 0){
                localStorage.removeItem('savedNotes');
                body.appendChild(emptyNoteBook);
            }else{
                localStorage.setItem('savedNotes', JSON.stringify(savedNotes));
            }
            
        }

        p.onclick = function() { // KAI PASPAUDZIU ANT DESCRIPTION, UZBRAUKIA JI IR ATVIRKSCIAI.

            const ifNoteIsDone = getComputedStyle(p).textDecorationLine === 'line-through'; //GOOGLINAU
            if(ifNoteIsDone){
                p.style.textDecoration = 'none';
                h4.style.textDecoration = 'none';
                
            }else{
                p.style.cssText = 'text-decoration: line-through; text-decoration-color: red; text-decoration-thickness: 3px';
                h4.style.cssText = 'text-decoration: line-through; text-decoration-color: red; text-decoration-thickness: 3px';
            }
        }


    }
    // po paspaudimo, istrina texta inputuose, kad butu patogiau.
    title.value = '';
    note.value = '';

})