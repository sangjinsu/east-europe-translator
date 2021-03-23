//글자수 제한
function limitChar(){
    const text = document.getElementById('text');
    text.addEventListener('keyup',function(e){
        e.preventDefault();
        var content = this.value;
        var counter = document.getElementById('text_cnt');

        counter.innerHTML = "("+content.length+" / 3000)";

        if(content.length > 3000) {
            alert("3000자를 초과하였습니다.");
            this.value = content.substring(0, 3000);
            counter.innerHTML = "(3000 / 3000)";
        }
    })
};

//번역할 내용 보내는 코드
const getTraslation = async (body, url) => {
    const response = await fetch(url, {
                        method: 'POST',
                        headers: {
                        'Content-Type': 'application/json',
                        },
                        mode: 'cors',
                        body,
                    });
                    
    if (response.status >= 400 && response.status < 600) {
        alert("Error(check your console)");
        throw new Error("Bad response from server");
    }
    return response.text();
}

function strTOarr(data) {
    //string to array
    const start = data.indexOf("[");
    const end = data.indexOf("]", start+1);

    const str = data.substring(start+1, end); 
    const tmpList = str.replace(/"/gi,' ').split(",");
    const list = tmpList.map(x=>x.trim());
    return list;
}
function removeNode(node) {
    while (node.firstChild) {
        node.removeChild(node.firstChild);
    };
}
function makeButton(arr){
    //make refresh
    const parentNode = document.querySelector(".eng");
    removeNode(parentNode);
    //string to button
    const tags = arr.map(x=>"<button>"+x+"</button>");
    tags.forEach(function(tag){
        document.querySelector(".eng").insertAdjacentHTML('beforeend',tag);
    });
    const EngButton = document.querySelectorAll('.eng button');
    return EngButton;
}

const get_1ndTranslation = async (form) => {
    const body = JSON.stringify(
        Object.fromEntries(new FormData(form))
    );

    const traslation = await getTraslation(body, form.action);
    const arr = await strTOarr(traslation);
    const btn = await makeButton(arr);

    return btn;
}
//////////////////////////////////////////////////////////////////////////
//Find the Selected languege
function FindLanguege(langueges){
    const lang_length = langueges.length;
    for (let i = 0; i<lang_length; i++) {
        if (langueges[i].checked === true) {
            const SelectedLang= langueges[i].value;
            return SelectedLang;
        }
    }
}

//Select URL acorrding to languege
function GetURL (SelectedLang) {
    if(SelectedLang === "romania") {
        return "http://localhost:3000/v1/translate/en-ro";
    }
    else if(SelectedLang === "Ukraine"){
        return "http://localhost:3000/v1/translate/en-uk";
    }
    else {
        alert("번역할 언어를 선택해주세요.");
    }
}
function makeResultTag(arr){
    //make refresh
    const parentNode = document.querySelector(".result");
    removeNode(parentNode);
    const tags = arr.map(x=>"<div>"+x+"</div>");
    tags.forEach(function(tag){
        document.querySelector(".result").insertAdjacentHTML('beforeend',tag);
    });
}
const get_2ndTranslation = async (body, SelectedLang) => {
    const traslation = await getTraslation(body, GetURL(SelectedLang));
    const arr = await strTOarr(traslation);
    await makeResultTag(arr);
}