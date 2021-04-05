const $form = document.querySelector('form');

//입력칸 빈값 처리
$form.lastElementChild.addEventListener('click', () => {
    if (document.getElementById("email").value == "") {
        alert("아이디를 입력해주세요");
        return false;
    } else if (document.getElementById("pwd").value == "") {
        alert("비밀번호를 입력해주세요");
        return false;
    }  else {
        alert("W E L C O M E");
        $form.lastElementChild.type = "submit";
    }
})