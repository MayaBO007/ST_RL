// move to main function
function timeline() {
    platform.getAllSessions().then((data) => {
        console.log(data);
        studySessionData = data[0];
        let updatedDates = updateDates();
        if (updatedDates.fullDate.getDate() == Number(dayDate())) {
            deleteFromSessionData();
            studySessionData.doneDay1 = "startDayOne";
            platform.saveSession(studySessionData, false);
            let goOne = async function () {
                let doneDay1 = await trainingDay(); // add promise and resolve
                if (doneDay1 == "done") {
                    studySessionData.doneDay1 = "doneDayOne";
                    studySessionData.expDaysDate = updatedDates.fullDate;
                    platform.saveSession(studySessionData, true)
                    document.getElementById("endDayMsg").style.display = "inline";
                    document.getElementById("endDayMsg").addEventListener("click", function () {
                        showWinnings()
                        setTimeout(() => {
                            platform.goToUrl("days/dayTwo/dayTwo.html");
                        }, 7000)
                    })
                }
            }
            goOne();
        } else {
            document.getElementById("endOfGame").style.display = "inline";
        }
    })
}

