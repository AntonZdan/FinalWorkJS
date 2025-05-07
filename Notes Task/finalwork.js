const title = document.querySelector('#title');
const note = document.querySelector('#note');
const addBtn = document.querySelector('#addBtn');
const cancelBtn = document.querySelector('#cancelBtn');
const output = document.querySelector('#output');
const form = document.querySelector('form');
const body = document.querySelector('body');
const emptyNoteBook = document.createElement('h1');
emptyNoteBook.classList.add('notification');

note.onclick = function() {
    title.style.cssText = 'display: block';
    cancelBtn.style.cssText = 'display: block';
}

cancelBtn.onclick = function() {
    title.style.cssText = 'display: none';
    cancelBtn.style.cssText = 'display: none';
    title.value = '';
    note.value = '';
}

window.addEventListener('load', ()=>{ // Kai nera nei vieno priminimo, per viduri atsiranda uzrasas.
    emptyNoteBook.textContent = 'Oops! Your Notebook is empty!...'
    body.appendChild(emptyNoteBook);
    
})

form.addEventListener('submit', (event) => {
    event.preventDefault();
   const titleValue = title.value;
   const noteValue = note.value;
    
    if (!titleValue || !noteValue) {
        if (!form.querySelector('#error-message')) {
            const emptyValue = document.createElement('p')
            emptyValue.setAttribute('id', 'error-message')
            emptyValue.textContent = 'Please write Title and Note to add them in your NoteBook!';
            form.insertBefore(emptyValue, addBtn);
        }
    }
    else {
        const existingError = document.querySelector('#error-message');
        if (existingError) {
            existingError.remove();
        }
        const div = document.createElement('div');
        div.setAttribute('id', 'main-container');
        const titleText = document.createElement('div');
        titleText.classList.add('titleText');
        const h4 = document.createElement('h4');
        const p = document.createElement('p');
        const icon = document.createElement('i');
        icon.setAttribute('class', 'fas fa-trash-alt');
        h4.textContent = titleValue;
        p.textContent = noteValue;
        emptyNoteBook.remove();
        //Idedu viska i konteineri
        titleText.append(h4);
        titleText.append(icon)
        div.append(titleText);
        div.append(p);
        //Idedu viska i outputa
        output.prepend(div);
        
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