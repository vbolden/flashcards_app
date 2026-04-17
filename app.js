const newDeckBtn = document.getElementById('newDeckBtn');
const decksList = document.getElementById('decksList');
const cardsList = document.getElementById('cards-container');


newDeckBtn.addEventListener('click', () => {
    const newDeckName = document.createElement('li');
    newDeckName.classList.add('modal');
    newDeckName.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2>Create New Deck</h2>
            <input type="text" id="deckNameInput" placeholder="Enter deck name">
            <button id="createDeckBtn" aria-label="Create Deck">Create</button>
        </div>
    `;
    document.body.appendChild(newDeckName);

    const closeBtn = newDeckName.querySelector('.close');
    closeBtn.addEventListener('click', () => {
        document.body.removeChild(newDeckName);
    });

    const createDeckBtn = newDeckName.querySelector('#createDeckBtn');
    createDeckBtn.addEventListener('click', () => {
        const deckName = document.getElementById('deckNameInput').value.trim().toUpperCase();
        if (deckName) {
            const deckItem = document.createElement('li');
            deckItem.innerHTML = `
            <div id="deckView" class="deck-view">
                    <div class="deck-header">
                        <div>
                            <h2 id="deckTitle">${deckName}</h2>
                            <p id="deckCardCount" class="card-count"></p>
                        </div>
                        <div class="deck-actions">
                            <button id="editDeckBtn" aria-label="Edit Deck">Edit</button>
                            <button id="studyBtn" aria-label="Study Deck">Study</button>
                            <button id="deleteDeckBtn" aria-label="Delete Deck">Delete</button>
                            <button id="newCardBtn" aria-label="New Card">+ New Card</button>
                        </div>
                    </div>
                </div>`;
            decksList.appendChild(deckItem);
            document.body.removeChild(newDeckName);
        }

        const newCardBtn = document.getElementById('newCardBtn');

        newCardBtn.addEventListener('click', () => {
            const newCardModal = document.createElement('div');
            newCardModal.classList.add('modal');
            newCardModal.innerHTML = `
                <div class="modal-content">
                    <span class="close">&times;</span>
                    <h2>Create New Card</h2>
                    <input type="text" id="frontInput" placeholder="Front of card">
                    <input type="text" id="backInput" placeholder="Back of card">
                    <button id="createCardBtn">Create</button>
                </div>
            `;
            document.body.appendChild(newCardModal);

            const closeBtn = newCardModal.querySelector('.close');
            closeBtn.addEventListener('click', () => {
                document.body.removeChild(newCardModal);
            });

            const createCardBtn = newCardModal.querySelector('#createCardBtn');
            createCardBtn.addEventListener('click', () => {
                const frontText = document.getElementById('frontInput').value.trim();
                const backText = document.getElementById('backInput').value.trim();
                if (frontText && backText) {
                    const cardItem = document.createElement('div');
                    cardItem.classList.add('card-item');
                    cardItem.innerHTML = `
                        <div class="card-front">${frontText}</div>
                        <div class="card-back" hidden>${backText}</div>
                    `;

                    cardsList.appendChild(cardItem);
                    document.body.removeChild(newCardModal);
                }
            });
        });

    });
});
// Delegate card flip functionality
document.addEventListener('click', (e) => {
    if (e.target.closest('.card-item')) {
        const cardItem = e.target.closest('.card-item');
        const front = cardItem.querySelector('.card-front');
        const back = cardItem.querySelector('.card-back');
        front.hidden = !front.hidden;
        back.hidden = !back.hidden;
    }
});

// Delegate deck button events
decksList.addEventListener('click', (e) => {
    const deckItem = e.target.closest('li');
    if (!deckItem) return;

    if (e.target.id === 'deleteDeckBtn') {
        decksList.removeChild(deckItem);
    }

    if (e.target.id === 'editDeckBtn') {
        const newTitle = prompt('Enter new deck name:');
        if (newTitle) {
            deckItem.querySelector('#deckTitle').textContent = newTitle.toUpperCase();
        }
    }

    if(e.target.id === 'studyBtn') {
        document.getElementById('studyMode').hidden = false;
    }
});