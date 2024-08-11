window.addEventListener("load", () => {
    Card.frontText = document.getElementById("Cf");
    Card.backText = document.getElementById("Cb");
});

class FlashCard {
    constructor(front, back) {
        this.frontText = front;
        this.backText = back;
    }
}

var App = {
    collections: [],
    collectionsNames: [],
    currCollection: [],
    checkedColl: undefined,
    currTr: undefined,
    currIndex: 0
};

var Card = {
    frontText: undefined,
    backText: undefined
};



