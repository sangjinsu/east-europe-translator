//글자수 제한
function limitChar() {
  const text = document.getElementById('text')
  text.addEventListener('keyup', function (e) {
    e.preventDefault()
    var content = this.value
    var counter = document.getElementById('text_cnt')

    counter.innerHTML = '(' + content.length + ' / 1000)'

    if (content.length > 1000) {
      alert('1000자를 초과하였습니다.')
      this.value = content.substring(0, 1000)
      counter.innerHTML = '(1000 / 1000)'
    }
  })
}

//번역할 내용 보내는 코드
const getTraslation = async (body, url) => {
  try {
    if (!url) {
      throw new Error('Can not request to server(url)')
    }
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      body,
    })

    if (response.status >= 400 && response.status < 600) {
      throw new Error('Bad response from server')
    }
    return response.text()
  } catch (error) {
    console.log(error)
  }
}

function strTOarr(data) {
  //string to array
  const start = data.indexOf('[')
  const end = data.indexOf(']', start + 1)

  const str = data.substring(start + 2, end - 1)
  let tmpList = str.split('","')
  const list = tmpList.map((x) => x.trim().replace(/\\r\\n|\\n|\\r/gm, '<br>'))

  return list
}

function removeNode(node) {
  while (node.firstChild) {
    node.removeChild(node.firstChild)
  }
}
function makeButton(arr) {
  //make refresh
  const parentNode = document.querySelector('.eng')
  removeNode(parentNode)
  //string to button
  const tags = arr.map((x) => '<button>' + x + '</button>')
  tags.forEach(function (tag) {
    document.querySelector('.eng').insertAdjacentHTML('beforeend', tag)
  })
  const EngButton = document.querySelectorAll('.eng button')
  return EngButton
}

const get_1ndTranslation = async (form) => {
  const body = JSON.stringify(Object.fromEntries(new FormData(form)))
  try {
    //Empty character ERROR
    const text = document.getElementById('text').value.trim();
    if(!text) {
      throw new Error("can't not POST empty string");
    }

    const traslation = await getTraslation(body, form.action)
    if (!traslation) {
      throw new Error("can't not get response object")
    }
    const arr = await strTOarr(traslation)
    const btn = await makeButton(arr)

    return btn
  } catch (error) {
    console.log(error)
  }
}
//////////////////////////////////////////////////////////////////////////
//Find the Selected languege
function FindLanguege(langueges) {
  const lang_length = langueges.length
  for (let i = 0; i < lang_length; i++) {
    if (langueges[i].checked === true) {
      const SelectedLang = langueges[i].value
      return SelectedLang
    }
  }
}

//Select URL acorrding to languege
function GetURL(SelectedLang) {
  if (SelectedLang === 'romania') {
    return 'https://example.com/v1/translate/en-ro'
  } else if (SelectedLang === 'Ukraine') {
    return 'https://example.com/v1/translate/en-uk'
  } else {
    alert('번역할 언어를 선택해주세요.')
    return false
  }
}
function makeResultTag(arr) {
  //make refresh
  const parentNode = document.querySelector('.result')
  removeNode(parentNode)
  const tags = arr.map((x) => '<div>' + x + '</div>')
  tags.forEach(function (tag) {
    document.querySelector('.result').insertAdjacentHTML('beforeend', tag)
  })
}
const get_2ndTranslation = async (body, SelectedLang) => {
  try {
    const traslation = await getTraslation(body, GetURL(SelectedLang))
    if (!traslation) {
      throw new Error("can't not get response object")
    }
    const arr = await strTOarr(traslation)
    await makeResultTag(arr)
  } catch (error) {
    console.log(error)
  }
}
