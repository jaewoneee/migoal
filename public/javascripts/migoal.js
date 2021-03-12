import template from "./template.js"

// 모달창 내 기간 설정 셀렉트 박스에 옵션값 넣기(7~30일)
var period = (function () {
    var options = '<select name="goal_period" id="goal_period">';
    for (var i = 7; i < 31; i++) {
        options = options + `<option value='${i}'>${i}</option>`;
    }
    options = options + '</select>';
    return options;
})();

// 목표 추가 위한 모달창 띄우기
var $bg = document.querySelector('.bg_black'); //검정배경
document.querySelector('#add_btn').addEventListener('click', function () {
    var $modal = template.modal(period); //모달창 템플릿

    //모달창 열기
    $bg.style.display = "block";
    $bg.innerHTML = $modal;

    // 모달창 닫기
    var $close = document.querySelector('.close_btn');
    $close.addEventListener('click', function () {
        $bg.style.display = 'none';
        $bg.innerHTML = '';
    })
})

// 목표 세부내용 모달창 띄우기
var $goalItem = document.getElementsByClassName('list-item');
for (var i = 0; i < $goalItem.length; i++) {
    $goalItem[i].addEventListener('click', function () {

        var savedGoalTitle = this.firstChild.innerText;
        var savedGoalPeriod = Number(this.lastChild.children[1].innerText);
        var currentDay = this.lastChild.children[0].innerText;
        var goalID = this.lastChild.lastChild.innerText;

        //모달창 내 달력 만들기
        function makeCalendar(goalPeriod) {
            var items = '<ul class="day-list">';
            for (var n = 1; n < goalPeriod + 1; n++) {
                items = items + `<li class="item${n}"><p>day${n}</p></li>`;
            }
            items = items + '</ul>';
            console.log(items);
            return items;
        };
        var calendarItem = makeCalendar(savedGoalPeriod);
        var $modal_detail = template.detail(savedGoalTitle, currentDay, savedGoalPeriod, calendarItem, goalID);
        var $form = document.getElementsByClassName('goal_detail_form');

        $bg.style.display = "block";
        $bg.innerHTML = $modal_detail;

        // 목표일수 지났을 때는 'end' 표기
        if ($form[0].children[3].children[0].innerHTML === '') {
            $form[0].children[3].innerHTML = 'end';
        }

        console.log(savedGoalTitle, '+', savedGoalPeriod);
        console.log(this);

        // 모달창 닫기
        var $close = document.querySelector('.close_btn');
        $close.addEventListener('click', function () {
            $bg.style.display = 'none';
            $bg.innerHTML = '';
        })


    })
}