window.addEventListener("load", () => {
    document.getElementById("ButtT1").addEventListener("click", () => {
        Test.checkColl("T1");
    });
    document.getElementById("ButtT2").addEventListener("click", () => {
        Test.checkColl("T2");
    });
    document.getElementById("ButtT3").addEventListener("click", () => {
        Test.checkColl("T3");
    });
    document.getElementById("Tres1").addEventListener("click", () => {
        document.getElementById("Dres1").style.display = "none";
        document.getElementById("Dstud1").style.display = "block";
        shuffle(App.currCollection);
    });

    Test.questionH = document.getElementById("Th1");
    Test.answerI = document.getElementById("Ti1");
    Test.questionDiv = document.getElementById("TdP1");
    document.getElementById("Ti1").addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            var answer, corrAnswer;
            answer = e.target.value.toUpperCase();
            corrAnswer = App.currCollection[Test.currI].backText.toUpperCase();
            if (answer == corrAnswer) {
                Test.points++;
            }
            Test.currI++;
            if (Test.currI < Test.lengthI) {
                Test.questionH.innerText = App.currCollection[Test.currI].frontText;
                e.target.value = "";
            }
            if (Test.currI >= Test.lengthI) {
                document.getElementById("Dres1").style.display = "block";
                document.getElementById("Dtest1").style.display = "none";
                document.getElementById("Pres1").innerText = `Test zakończony \n prawidłowe odpowiedzi: ${Test.points} / ${Test.lengthI}`;
                Test.points = 0;
                Test.lengthI = 0;
                Test.currI = 0;
            }
            Test.questionDiv.innerText = `Pytanie: ${Test.currI + 1} / ${Test.lengthI}`;
        }

    })

});
var Test = {
    questionH: undefined,
    answerI: undefined,
    questionDiv: undefined,
    points: 0,
    lengthI: 0,
    currI: 0,
    checkColl: (type) => {
        if (App.currCollection.length > 0) {
            document.getElementById("Dstud1").style.display = "none";
            document.getElementById("Dtest1").style.display = "block";
        }
        var i;
        switch (type) {
            case "T1":
                if (App.currCollection.length <= 10) {
                    i = App.currCollection.length;
                }
                else if (App.currCollection.length <= 30) {
                    i = 5;
                }
                else {
                    i = 10;
                }
                break;
            case "T2":
                if (App.currCollection.length <= 20) {
                    i = App.currCollection.length;
                }
                else if (App.currCollection.length <= 50) {
                    i = 20;
                }
                else {
                    i = 30;
                }
                break;
            case "T3":
                i = App.currCollection.length;
                break;
            default:
                break;

        }
        Test.lengthI = i;
        Test.questionH.innerText = App.currCollection[Test.currI].frontText;
        document.getElementById("Dtest1").style.display = "block";
        Test.questionDiv.innerText = `Pytanie: ${Test.currI + 1} / ${Test.lengthI}`;
    }
};