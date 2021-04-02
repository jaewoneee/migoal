// 날짜 세기

(() => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    const startDay = document.getElementsByClassName('start-day');
    const now = new Date();
    const $nowDate = {
        year: now.getFullYear(), //number
        month: now.getMonth(), //number
        days: now.getDate() //number
    }
    const totalNowDays = totalDaysCalc($nowDate.year, $nowDate.month, $nowDate.days);


    // Day Count해서 요소에 결과값 넣기
    for (idx = 0; idx < startDay.length; idx++) {
        const $target = startDay[idx].innerText;
        const $deadline = Number(startDay[idx].parentNode.children[1].innerText);
        const $startDate = {
            year: Number($target.slice(11, 16).trim()),
            month: months.indexOf($target.slice(4, 8).trim()),
            days: Number($target.slice(8, 11).trim().replace(/(^0+)/, ""))
        }
        const totalSavedDays = totalDaysCalc($startDate.year, $startDate.month, $startDate.days);
        const result = totalNowDays - totalSavedDays + 1;

        // 목표일수 지났을 때는 'end'표기 / 아닐 때는 현재일수 넣기
        if ($deadline < result) {
            startDay[idx].parentNode.style.display = "none";
            startDay[idx].parentNode.parentNode.children[2].style.display = "block";
        } else {
            startDay[idx].parentNode.firstChild.innerHTML = result;
        }

    }
    // 현재 날짜 & 저장된 날짜의 총 일 수 구하기
    function totalDaysCalc(year, month, day) {
        let monthToDay = 0;
        const monthArray = LeapYearOrNot(year);
        for (d = 0; d < month; d++) {
            monthToDay += monthArray[d];
        }
        return (year * 365) + monthToDay + day;
    }

    // 윤년 체크
    function LeapYearOrNot(value) {
        if ((value % 4 == 0) && (value % 100 != 0) || (value % 400 == 0)) {
            return [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        } else {
            return [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        }
    }

})();