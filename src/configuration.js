window.addEventListener("load", () => {
    Menu.load();
    Controls.load();
});
var Menu = {
    navAndPages: undefined,
    current: undefined,
    setMenu: (div, nav) => {
        Menu.navAndPages[nav].addEventListener("click", () => {
            if (Menu.current['nav'] != Menu.navAndPages[nav]) {
                Menu.current['page'].style.display = "none";
                Menu.current['page'] = Menu.navAndPages[div];
                Menu.current['page'].style.display = "block";
                Menu.current['nav'].classList.toggle("activePage");
                Menu.current['nav'] = Menu.navAndPages[nav];
                Menu.current['nav'].classList.toggle("activePage");
            }
        });
    },
    load: () => {
        Menu.navAndPages = {
            "flashCards": document.getElementById("F1"),
            "flashCardsNav": document.getElementById("FC"),
            "study": document.getElementById("N1"),
            "studyNav": document.getElementById("NC"),
            "test": document.getElementById("T1"),
            "testNav": document.getElementById("TC"),
            "collections": document.getElementById("Z1"),
            "collectionsNav": document.getElementById("ZC")
        }

        Menu.current = {
            "page": Menu.navAndPages["collections"],
            "nav": Menu.navAndPages["collectionsNav"],
        }

        Menu.current['nav'].classList.toggle("activePage");

        Menu.setMenu("flashCards", "flashCardsNav");
        Menu.setMenu("study", "studyNav");
        Menu.setMenu("test", "testNav");
        Menu.setMenu("collections", "collectionsNav");
    }
}
var Controls = {
    buttonL: undefined,
    buttonR: undefined,
    innerCard: undefined,
    openPathButt: undefined,
    animationDiv: (name) => {
        var div = document.getElementById('Ci');
        div.classList.add(name);
        setTimeout(() => {
            div.classList.remove(name);
        }, 500);
    },
    load: () => {
        Controls.buttonL = document.getElementById("Bl");
        Controls.buttonR = document.getElementById("Br");
        Controls.innerCard = document.getElementById("Ci");
        Controls.openPathButt = document.getElementById("Butt1");

        Controls.innerCard.addEventListener("click", () => {
            Controls.innerCard.classList.toggle("cardTg");
        });
 
        Controls.buttonL.addEventListener("click", () => {
            if (App.currIndex != 0 && App.currCollection.length > 0) {
                if (Controls.innerCard.classList.contains("cardTg")) {
                    console.log(Controls.innerCard.classList);
                    Controls.innerCard.classList.toggle("cardTg");
                }
                Controls.animationDiv("animL");
                Card.frontText.innerHTML = App.currCollection[App.currIndex - 1].frontText;
                Card.backText.innerHTML = App.currCollection[--App.currIndex].backText;
            }
        });

        Controls.buttonR.addEventListener("click", () => {
            if (App.currIndex != App.currCollection.length - 1 && App.currCollection.length > 0) {
                if (Controls.innerCard.classList.contains("cardTg")) {
                    Controls.innerCard.classList.toggle("cardTg");
                }
                Controls.animationDiv("animR");
                Card.frontText.innerHTML = App.currCollection[App.currIndex + 1].frontText;
                Card.backText.innerHTML = App.currCollection[++App.currIndex].backText;
            }
        });

        Controls.openPathButt.addEventListener("click", () => {
            window.electronAPI.openPath();
        });
    }
}
