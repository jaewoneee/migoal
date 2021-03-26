export default {
    addModal(period) {
        return `<form action="/goal/add_goal" method="get" class="goal_set_form">
                    <div class="goal_top">
                        <h2>Set The Goal</h2>
                        <button class="close_btn" type="button" aria-label="닫기 버튼" ></button>
                    </div>
                    <div class="goal_set1">
                        <p>set the title of goal</p>
                        <input type="text" name="goal_title" />
                    </div>
                    <div class="goal_set2">
                        <p>set dates</p>
                        ${period}
                    </div>
                    <input type="submit" id="goal_btn" aria-label="목표추가 저장 버튼" value="complete">
                </form>`;
    },
    detail(goalTitle, currentDay, leftDay, goalCalendar, goalID) {
        return `<form action="/goal/check_goal" method="get" class="goal_detail_form">
                    <div class="detail_inner">
                        <div class="goal_top">
                            <h2>${goalTitle}</h2>
                            <button class="close_btn" type="button" aria-label="닫기 버튼"></button>
                        </div>
                        <input type="hidden" name="goal_id" value=${goalID}>
                        <div class="goal-days">
                            <div class="current-day">${currentDay}</div>
                            <div class="left-day">${leftDay}</div>
                        </div>
                        ${goalCalendar}
                        <input type="submit" id="save_btn" aria-label="내용 저장 버튼" value="save">
                        <input type="submit" id="delete_btn" formaction="/goal/delete_goal" aria-label="목표삭제 버튼" value="delete the goal">
                    </div>
                </form>`;
    }

}