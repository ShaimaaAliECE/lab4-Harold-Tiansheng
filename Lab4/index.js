const express = require("express");
const questionList = require("./questions.json");

const app = express();

app.use(express.static("static"));

app.use(
    express.urlencoded({
        extended: true,
    })
);

//no need for this part if generate question from client side, comment it
/*app.get("/quiz", (req, res) => {
    let content = "";
    content += `<h1>quiz</h1>`;
    let qNo = 0;
    for (q of questionList) {
        let name = "Q.no";
        qNo = qNo + 1;
        name = name + qNo;
        content += `<div>${qNo + ". " + q.stem}</div>`;
        for (o of q.options) {
            content += `<input type = 'radio' name = '${name}'>${o}</input></br>`;
        }
    }
    content += `</br><input type = 'submit'>`;
    res.send(content);
});*/

//transport json file database to client
app.get("/quizInJson", (req, res) => {
    res.json(questionList);
});

//check whether the result is right and transport it to client
app.get("/checkResult", (req, res) => {
    let qNo = req.query.question;
    let opIndex = req.query.answer;
    let answer = [];
    let num = 0;
    for (q of questionList) {
        answer[num] = q.answerIndex;
        //console.log(answer[num]);
        num = num + 1;
    }
    if (answer[qNo - 1] == opIndex) {
        res.send("correct " + qNo);
    } else {
        res.send("wrong " + qNo);
    }
});

app.get("/showGrades", (req, res) => {
    let selected = [
        req.query.q1,
        req.query.q2,
        req.query.q3,
        req.query.q4,
        req.query.q5,
    ];
    let grades = 0;
    for (s of selected) {
        if (s == "correct") {
            grades = grades + 1;
        }
    }
    res.status(200).send(grades.toString());
});

app.listen(80);
