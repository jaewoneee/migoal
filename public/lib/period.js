// 날짜 세기

(function () {
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    var startDay = document.getElementsByClassName('start-day');
    var totalDays = '';
    var now = new Date();
    var $nowDate = {
        year: now.getFullYear(),
        month: now.getMonth(),
        days: now.getDate()
    }
    var daysArray = leapYearOrNot($nowDate.year);
    var totalNowDays = totalDaysCalc($nowDate.year, $nowDate.month, $nowDate.days);

    // Day Count해서 요소에 결과값 넣기
    for (var idx = 0; idx < startDay.length; idx++) {
        var $target = startDay[idx].innerText;
        var $deadline = Number(startDay[idx].parentNode.children[1].innerText);
        var $startDate = {
            year: ($target.slice(11, 16).trim()),
            month: months.indexOf($target.slice(4, 8).trim()),
            days: Number($target.slice(8, 11).trim().replace(/(^0+)/, ""))
        }
        var totalSavedDays = totalDaysCalc($startDate.year, $startDate.month, $startDate.days);
        var result = totalNowDays - totalSavedDays + 1;

        // 목표일수 지났을 때는 'end'표기 / 아닐 때는 현재일수 넣기
        if ($deadline < result) {
            startDay[idx].parentNode.style.display = "none";
            startDay[idx].parentNode.parentNode.children[1].style.display = "block";
        } else {
            startDay[idx].parentNode.firstChild.innerHTML = result;
        }

    }

    // 현재 날짜 & 저장된 날짜의 총 일 수 구하기
    function totalDaysCalc(year, month, day) {
        totalDays = year * 365;
        for (var d = 0; d < month; d++) {
            totalDays = totalDays + daysArray[d];
        }
        return totalDays + day;
    }

    // 윤년 체크
    function leapYearOrNot() {
        if (($nowDate.year % 4 == 0) && ($nowDate.year % 100 != 0) || ($nowDate.year % 400 == 0)) {
            return daysArray = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        } else {
            return daysArray = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        }
    }


})();