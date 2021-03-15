export default {
    modal(period) {
        return `<form action="/goal/add_goal" method="get" class="goal_set_form">
                    <h2>Set The Goal</h2>
                    <button class="close_btn" type="button">X</button>
                    <div class="goal_set1">
                        <p>set the title of goal</p>
                        <input type="text" name="goal_title" />
                    </div>
                    <div class="goal_set2">
                        <p>set dates</p>
                        ${period}
                    </div>
                    <input type="submit" id="goal_btn" value="complete">
                </form>`;
    },
    detail(goalTitle, currentDay, leftDay, goalCalendar, goalID) {
        return `<form action="/goal/check_goal" method="get" class="goal_detail_form">
                    <button class="close_btn" type="button">X</button>
                    <h2>${goalTitle}</h2>
                    <input type="hidden" name="goal_id" value=${goalID}>
                    <div class="goal-days">
                        <div class="current-day">${currentDay}</div>
                        <div class="left-day">${leftDay}</div>
                    </div>
                    ${goalCalendar}
                    <input type="submit" id="save_btn" value="save">
                    <input type="submit" id="delete_btn" formaction="/goal/delete_goal" onsubmit="return confirm('Are you sure?');" value="delete this goal">
                </form>`;
    }

}