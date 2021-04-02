import template from "../lib/template.js"


// 목표 추가 모달창 내 기간 설정 셀렉트 박스에 옵션값 넣기(7~30일)
const period = (() => {
    let options = '<select name="goal_period" id="goal_period">';
    for (var i = 7; i < 31; i++) {
        options = options + `<option value='${i}'>${i}</option>`;
    }
    options = options + '</select>';
    return options;
})();

// 목표 추가 위한 모달창
const addBtn = document.querySelector('#add_btn');
addBtn.addEventListener('click', function () {
    const $modal = template.addModal(period);
    openModal($modal);
    closeModal();
})


// 목표 세부내용 모달창
const $goalItem = document.getElementsByClassName('list-item');
for (let i = 0; i < $goalItem.length; i++) {
    $goalItem[i].addEventListener('click', () => {
        const savedGoalTitle = $goalItem[i].firstChild.innerText;
        const savedGoalPeriod = Number($goalItem[i].lastChild.children[1].innerText);
        const currentDay = $goalItem[i].lastChild.children[0].innerText;
        const goalID = $goalItem[i].lastChild.lastChild.innerText;

        // 달력 아이템 : DB에 저장된 체크내역이 없으면, 'N'상태로 초기 배열 만들어 준다.
        const chkDayArray = $goalItem[i].children[1].value.split(",");
        if (chkDayArray == '') {
            for (let a = 0; a < savedGoalPeriod; a++) {
                chkDayArray.push('N');
            }
            chkDayArray.splice(0, 1);
        }

        const calendarItem = makeCalendar(savedGoalPeriod, chkDayArray);
        const $modal_detail = template.detail(savedGoalTitle, currentDay, savedGoalPeriod, calendarItem, goalID);
        const $form = document.getElementsByClassName('goal_detail_form');

        openModal($modal_detail);
        closeModal();


        // 달력 아이템 : 클릭시, 체크 상태 구분 (체크되면 Y , 아니면 N)
        const chkItem = document.getElementsByName('chk');
        for (let chk = 0; chk < chkItem.length; chk++) {
            chkItem[chk].addEventListener('click', function () {
                if (this.value === 'N') {
                    this.setAttribute('value', 'Y');
                    this.previousElementSibling.disabled = true;
                } else if (this.value === 'Y') {
                    this.setAttribute('value', 'N');
                    this.previousElementSibling.disabled = false;
                }
            })
        }

        // 달력 아이템 : 체크된 상태 표시
        for (let chk = 0; chk < chkItem.length; chk++) {
            if (chkItem[chk].value === 'Y') {
                chkItem[chk].previousElementSibling.disabled = true;
                chkItem[chk].checked = true;
            }
        }
        // 목표일수 지났을 때는 'end' 표기
        if ($form[0].children[2].children[0].innerHTML === '') {
            $form[0].children[2].innerHTML = 'end!';
        }
    })
}

// 모달창 열기
const bg = document.querySelector('.bg_black');

function openModal(modal) {
    bg.style.display = 'block';
    bg.innerHTML = modal;
}
// 모달창 닫기
function closeModal() {
    const closeBtn = document.querySelector('.close_btn');
    if (!!closeBtn) {
        closeBtn.addEventListener('click', () =>{
            bg.style.display = 'none';
            bg.innerHTML = '';
        })
    }
}

//모달창 내 달력 만들기
function makeCalendar(goalPeriod, chkDayArray) {
    let items = '<ul class="day-list">';
    for (let n = 0; n < goalPeriod; n++) {
        items = items + `<li class="item${n}">
                            <p>day${n+1}</p>
                            <input type="hidden" value="N" name="chk">
                            <input type="checkbox" id="check${n}" class="check-goal" value="${chkDayArray[n]}" name="chk">
                            <label for="check${n}" class="check-goal-label"></label>
                         </li>`;
    }
    items = items + '</ul>';
    return items;
};