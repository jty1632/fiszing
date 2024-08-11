window.addEventListener("load", () => {
    var question = document.getElementById("Fi1");
    var definition = document.getElementById("Fi2");
    document.getElementById("Fb1").addEventListener("click", () => {
        if (question.value != "" && definition.value != "") {
            Form.newColl.push(new FlashCard(question.value, definition.value));
            question.value = "";
            definition.value = "";
        }
        else {
            alert("Uzupełnij dane!");
        }

    });
    document.getElementById("Fb2").addEventListener("click", async (e) => {
        if (Form.newColl.length != 0) {
            var name = document.getElementById("Fi0").value;
            App.collections[name] = Form.newColl;
            App.collectionsNames.push(name);
            Data.createTr(name);
            console.log(name);
            console.log(name, Form.newColl)
            window.electronAPI.saveJSONfile(name, Form.newColl);
            Form.newColl = [];
            e.value = "";
            alert("Zestaw stworzony prawidłowo");
        }
        else {
            alert("Dodaj fiszki do zestawu!");
        }
    });

    Data.openAllJSON();
    let dir = document.getElementById("Id1");
    dir.addEventListener("input", () => {
        Data.readJSON();
    });
});
var Form = {
    newColl: []
};
var Data = {
    readJSON: async () => {
        var fileInput = document.getElementById('Id1');
        var file = fileInput.files[0];
        var fileName;
        var fileUrl = file.path;

        fileName = ((file.name).split(".", 1));
        if (Data.checkName(fileName)) {
            var response = await fetch(fileUrl);
            var jsonData = await response.json();
            App.collections[fileName] = jsonData.map(item => new FlashCard(item.frontText, item.backText));;
            App.collectionsNames.push(fileName);

            Data.createTr(fileName);
            window.electronAPI.saveJSONfile(fileName, App.collections[fileName]);
        }

    },
    openAllJSON: async () => {
        var fileName2;
        var names = await window.electronAPI.loadJSONfiles();

        for (var fileName of names) {
            try {
                if (Data.checkName(fileName)) {
                    var fileUrl = `JSONfiles/${fileName}`;
                    fileName2 = ((fileName).split(".", 1));
                    var response = await fetch(fileUrl);
                    var jsonData = await response.json();
                    App.collections[fileName2] = jsonData.map(item => new FlashCard(item.frontText, item.backText));
                    App.collectionsNames.push(fileName2);

                    Data.createTr(fileName2);
                }

            } catch (error) {

            }

        }
    },
    createTr: (fileName2) => {
        var table = document.getElementById("Tb1");
        var tr = document.createElement("tr");
        tr.addEventListener("click", () => {
            if (App.currTr)
                App.currTr.style.backgroundColor = "transparent";
            tr.style.backgroundColor = "darkgreen";
            App.checkedColl = tr.innerHTML;
            App.currTr = tr;
            App.currCollection = App.collections[tr.innerText];
            Data.shuffle(App.currCollection);
            if (App.currCollection.length != 0) {
                Card.frontText.innerHTML = App.currCollection[0].frontText;
                Card.backText.innerHTML = App.currCollection[0].backText;
                App.currIndex = 0;
                Study.active();
                document.getElementById("Tp1").innerText = "Wybrany zestaw: " + fileName2;
                document.getElementById("Dres1").style.display = "none";
                document.getElementById("Dtest1").style.display = "none";
                document.getElementById("Dstud1").style.display = "block";
            }

        });
        tr.appendChild(document.createElement("td"));
        table.appendChild(tr);
        tr.setAttribute("id", "Tr" + App.collectionsNames.length);
        tr.firstChild.innerHTML = fileName2;
    },
    shuffle: (array) => {
        return array.sort(() => Math.random() - .5);
    },
    checkName: (name) => {
        for (i = 0; i < App.collectionsNames.length; i++) {
            if (name == App.collectionsNames[i][0]) {
                return false;
            }
        }
        return true;
    }

};