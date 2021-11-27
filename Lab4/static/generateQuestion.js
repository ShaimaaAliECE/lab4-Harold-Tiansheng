function getContent() {
    let xReq = new XMLHttpRequest();
    xReq.onreadystatechange = displayContent;
    xReq.open("GET", "/quizInJson", true);
    xReq.send();
}

function displayContent() {
    if (this.readyState == 4 && this.status == 200) {
        const contentDiv = document.getElementById("quizContent");
        let questionList = JSON.parse(this.responseText);
        let content = "";
        let qNo = 0;
        for (q of questionList) {
            let name = "Q.no";
            qNo = qNo + 1;
            name = name + qNo;
            content += `<div>${qNo + ". " + q.stem}</div>`;

            let opIndex = 0;
            for (o of q.options) {
                content += `
                    <input type = 'radio' name = '${name}' qNo = '${qNo}' id ='${opIndex}' onclick = checkingResult(${qNo},${opIndex})>${o}</input></br>
                           `;
                opIndex++;
            }
            content += `<div id = '${name}' name = 'question'></div>`;
        }
        content += `</br><input type = 'submit' onclick = showGrades()></br>
                    <div id = 'grade'></div>`;
        contentDiv.innerHTML = content;
    }
}

function checkingResult(qNo, opIndex) {
    console.log("button clicked");
    //console.log(qNo + ", " + opIndex);
    let xReq = new XMLHttpRequest();
    xReq.onreadystatechange = displayInform;
    xReq.open("GET", `/checkResult?question=${qNo}&answer=${opIndex}`, true);
    xReq.send();
}

function displayInform() {
    if (this.readyState == 4 && this.status == 200) {
        console.log("display result");
        let reply = this.responseText.split(" ");
        let contentDiv = document.getElementById("Q.no" + reply[1]);
        contentDiv.innerHTML = reply[0];
    }
}

function showGrades() {
    console.log("show grades");
    let selected = document.getElementsByName("question");
    let xReq = new XMLHttpRequest();
    xReq.onreadystatechange = displayGrades;
    xReq.open(
        "GET",
        `/showGrades?q1=${selected[0].innerHTML}&q2=${selected[1].innerHTML}&q3=${selected[2].innerHTML}&q4=${selected[3].innerHTML}&q5=${selected[4].innerHTML}`,
        true
    );
    xReq.send();
}

function displayGrades() {
    if (this.readyState == 4 && this.status == 200) {
        console.log("grade shown");
        let contentDiv = document.getElementById("grade");
        contentDiv.innerHTML = "you grade is: " + this.responseText;
    }
}
