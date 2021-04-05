window.onload = function () {
  //글자수 제한
  limitChar()
  //번역할 내용 보내는 코드
  const KRcontentForm = document.getElementById('KRcontent')
  const EngBtn = KRcontentForm.addEventListener('submit', function (event) {
    event.preventDefault()
    //submit 버튼 클릭 시 나올 내용
    get_1ndTranslation(event.target)
      .then(function (EngButton) {
        //when eng button click
        if (!EngButton) {
          throw new Error('No exist Button')
        }
        ;[].forEach.call(EngButton, function (btn) {
          btn.addEventListener('click', function (e) {
            e.preventDefault()
            //Find the Selected languege
            const langueges = document.getElementsByName('lang')
            const SelectedLang = FindLanguege(langueges)

            //make object for request
            const body = JSON.stringify({
              text: this.innerText,
            })

            get_2ndTranslation(body, SelectedLang)
          })
        })
      })
      .catch((error) => console.log(error))
  })
}
