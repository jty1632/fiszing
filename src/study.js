window.addEventListener("load", () => {
    Study.load();
});

var Study = {
    startDiv: undefined,
    contentDiv: undefined,
    question: undefined,
    area: undefined,
    input: undefined,
    definition: undefined,
    index: 0,
    load: () => {
        Study.startDiv = document.getElementById("Sd1");
        Study.contentDiv = document.getElementById("Sd2");
        Study.question = document.getElementById("Sh1");
        Study.area = document.getElementById("SdCon1");
        Study.input = document.getElementById("Si1");

        Study.input.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                if (App.currCollection[Study.index].backText.toUpperCase() == Study.input.value.toUpperCase()) {
                    if (Study.index < App.currCollection.length)
                        Study.index++;
                    if (Study.index >= App.currCollection.length)
                        Study.index = 0;
                    Study.nextFlashcard();
                    Study.input.value = "";
                }
                else {
                    Study.input.classList.add("animI");
                    setTimeout(() => {
                        Study.input.classList.remove("animI");
                    }, 500);
                    Study.hint(5);
                }
            }
        });
    },
    active: async () => {
        Study.startDiv.style.display = "none";
        Study.contentDiv.style.display = "block";
        Study.index = 0;
        Study.nextFlashcard();
    },
    nextFlashcard: () => {
        Study.question.innerText = App.currCollection[Study.index].frontText;
        Study.definition = App.currCollection[Study.index].backText;
        Study.definition = Study.definition.replace(/ /g, '  ');
        Study.definition = Study.definition.replace(/[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ0-9]/g, '- ');
        Study.area.innerText = Study.definition;
    },
    hint: (num) => {
        var tab = Study.area.innerText.split(' ');
        tab = tab.filter(item => item != '');
        console.log(tab);
        var defWithoutSpace = App.currCollection[Study.index].backText.split('');
        defWithoutSpace = defWithoutSpace.filter(item => !item.includes(' '));
        console.log(defWithoutSpace);
        var indexesOfSpace = Study.getAllIndexes(App.currCollection[Study.index].backText, " ");

        while (num > 0) {
            var randomI = Math.floor(Math.random() * tab.length);
            if (tab[randomI] == '-') {
                tab[randomI] = defWithoutSpace[randomI];
                num--;
            }
            else if (!tab.includes('-'))
                break;
        }
        for (i = 0; i < indexesOfSpace.length; i++){
            tab.splice(indexesOfSpace[i], 0, " ");
        }
        var result = tab.join(' ');
        Study.area.innerText = result;
    },
    getAllIndexes: (str, char) => {
        let indexes = [];
        for(let i = 0; i < str.length; i++) {
            if(str[i] === char) {
                indexes.push(i);
            }
        }
        return indexes;
    }

};