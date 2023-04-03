function timeline() {
    let startDayTwo = async function () {
        platform.getAllSessions().then((data) => {
            getIndexSessionData(data).then((i) => {
                studySessionData = data[i];
                let updatedDates = updateDates();
                if (updatedDates.fullDate.getDate() == updatedDates.yesterday.getDate()) { //|| yesterdayPlusOne.getDate() - fullDate.getDate() > 25 ) {
                    if (window.matchMedia("(orientation: landscape)").matches) {
                        document.getElementById("fiveAM").style.display = "inline";
                    } else {
                        document.getElementById("fiveAM_hor").style.display = "inline";
                    }
                    setTimeout(() => {
                        moveToDay();
                    }, timeToFive());
                }
                else if (updatedDates.fullDate.getDate() == updatedDates.yesterdayPlusOne.getDate()) { //|| yesterdayPlusOne.getDate() - fullDate.getDate() > 25 ) {)
                    if (0 <= updatedDates.fullDate.getHours() & updatedDates.fullDate.getHours() < 5) {
                        document.getElementById("fiveAM").style.display = "inline";
                        setTimeout(() => {
                            moveToDay();
                        }, timeToFiveSameDay());
                    } else {
                        let goTwo = async function () {
                            let my_awesome_script = document.createElement('script');
                            my_awesome_script.setAttribute('src', '../../functions/orientation.js');
                            // my_awesome_script.src = "../functions/orientation.js";
                            document.body.appendChild(my_awesome_script);
                            deleteFromSessionData();
                            document.getElementById("startButton").style.display = "inline";
                            document.getElementById("redButton").style.display = "inline";
                            document.getElementById("blueButton").style.display = "inline";
                            document.getElementById("gameScreen").style.display = "inline";
                            document.getElementById("startButton").onclick = function () {
                                document.getElementById("startButton").style.display = "none";
                                studySessionData.doneDay2 = "stratDayTwo";
                                platform.saveSession(studySessionData);
                                getMillisec();
                                // msCount();
                                let startTwoTests = async function () {
                                    deleteFromSessionData();
                                    let doneDay2 = await start2tests(); // add promise and resolve
                                    if (doneDay2 == "done") {
                                        studySessionData.doneDay2 = "doneDayTwo";
                                        studySessionData.expDaysDate = updatedDates.fullDate;
                                        platform.saveSession(studySessionData, true)
                                        document.getElementById("endDayMsg").style.display = "inline";
                                        document.getElementById("endDayMsg").addEventListener("click", function () {
                                            showWinnings()
                                            setTimeout(() => {
                                                platform.goToUrl("days/dayThree/devTest.html");
                                            }, 7000)
                                        })
                                    }
                                }
                                startTwoTests()
                            }
                            startIntervalTest();
                        }
                        goTwo()
                    }
                } else {
                    document.getElementById("endOfGame").style.display = "inline";
                }
            })
        }
        )
        startDayTwo();
    }
}
