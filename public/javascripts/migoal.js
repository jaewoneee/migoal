import template from "../lib/template.js"


// 모달창 내 기간 설정 셀렉트 박스에 옵션값 넣기(7~30일)
var period = (function () {
    var options = '<select name="goal_period" id="goal_period">';
    for (var i = 7; i < 31; i++) {
        options = options + `<option value='${i}'>${i}</option>`;
    }
    options = options + '</select>';
    return options;
})();

// 목표 추가 위한 모달창
var addBtn = document.querySelector('#add_btn');
addBtn.addEventListener('click', function () {
    var $modal = template.addModal(period);
    openModal($modal);
    closeModal();
})


// 목표 세부내용 모달창
var $goalItem = document.getElementsByClassName('list-item');
for (var i = 0; i < $goalItem.length; i++) {
    $goalItem[i].addEventListener('click', function () {
        var savedGoalTitle = this.firstChild.innerText;
        var savedGoalPeriod = Number(this.lastChild.children[1].innerText);
        var currentDay = this.lastChild.children[0].innerText;
        var goalID = this.lastChild.lastChild.innerText;


        var calendarItem = makeCalendar(savedGoalPeriod);
        var $modal_detail = template.detail(savedGoalTitle, currentDay, savedGoalPeriod, calendarItem, goalID);
        var $form = document.getElementsByClassName('goal_detail_form');

        openModal($modal_detail);
        closeModal();

        // 일별 체크 유무 (체크되면 Y , 아니면 = N)
        var chkItem = document.getElementsByClassName('check-goal');
        for (var chk = 0; chk < chkItem.length; chk++) {
            chkItem[chk].addEventListener('click', function () {
                console.log(this.previousElementSibling);
                this.previousElementSibling.disabled = true;
            })
        }

        // 목표일수 지났을 때는 'end' 표기
        if ($form[0].children[3].children[0].innerHTML === '') {
            $form[0].children[3].innerHTML = 'end!';
        }

        console.log(savedGoalTitle, '+', savedGoalPeriod);
        console.log(this);

    })



}
var bg = document.querySelector('.bg_black');
// 모달창 열기
function openModal(modal) {
    bg.style.display = 'block';
    bg.innerHTML = modal;
}
// 모달창 닫기
function closeModal() {
    var closeBtn = document.querySelector('.close_btn');
    if (!!closeBtn) {
        closeBtn.addEventListener('click', function () {
            bg.style.display = 'none';
            bg.innerHTML = '';
        })
    }
}

//모달창 내 달력 만들기
function makeCalendar(goalPeriod) {
    var items = '<ul class="day-list">';
    for (var n = 1; n < goalPeriod + 1; n++) {
        items = items + `<li class="item${n}">
                            <p>day${n}</p>
                            <input type="hidden" class="check-goal-hidden" value="N" name="chk">
                            <input type="checkbox" id="check${n}" class="check-goal" value="Y" name="chk">
                            <label for="check${n}" class="fr"></label>
                         </li>`;
    }
    items = items + '</ul>';
    return items;
};