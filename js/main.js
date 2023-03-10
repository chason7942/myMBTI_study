const main = document.querySelector("#main");
const qna = document.querySelector("#qna");
const result = document.querySelector("#result");
const startBtn = document.querySelector ("#btnStart");
const endPoint = 12;
const select = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
const resultName = document.querySelector(".result_name");
const imgDiv = document.querySelector("#resultImg");
const resultDesc = document.querySelector('.result_desc');
// 결과 화면 type 계산된 숫자
let point = calcResult();

// 시작버튼
startBtn.addEventListener("click",function(){
    init();
});
function calcResult(){
    let result = select.indexOf(Math.max(...select));
    return result;
}
function setResult(){
    
    let resultImg = document.createElement("img");
    // infoList의 이름 가져옴.
    resultName.innerHTML = infoList[point].name;
    //url 가져옴
    let imgURL = 'img/image-' + point + '.png';
    resultImg.src = imgURL;
    resultImg.alt = point;
    imgDiv.appendChild(resultImg);
    // 설명 추가
    resultDesc.innerHTML = infoList[point].desc;
}
// 결과화면 이동
function goResult(){
    qna.classList.add("animate_fadeOut");
    setTimeout(()=>{
        //최초 0.45초 후 qna Fade-in 등장
        result.classList.add("animate_fadeIn");
        setTimeout(()=>{
            qna.style.display = "none";
            result.style.display = "block";
        }, 450)
    },450);
    setResult();
}
// 답변을 버튼으로 만들고, 내용을 뿌려주는 함수
function addAnswer(answerText, qIdx, idx){
    let a = document.querySelector(".aBox");
    let btnAnswer = document.createElement("button");

    btnAnswer.classList.add("answer_list");
    btnAnswer.classList.add("animate_fadeIn");
    // .aBox 태그 안에 button 태그 추가
    a.appendChild(btnAnswer);
    // 텍스트 뿌려주기
    btnAnswer.innerHTML = answerText;
    // 버튼에 클릭 이벤트 추가
    btnAnswer.addEventListener("click",function(){
        let children = document.querySelectorAll(".answer_list");
        // button 클릭 시 모든 버튼을 disabled 되고, 사라짐.
        for(let i = 0; i < children.length; i++){
            children[i].disabled = true;
            children[i].classList.add("animate_fadeOut");
        }
        // 사라지는 효과 추가
        setTimeout(() => {
            let target = qnaList[qIdx].a[idx].type;
            for(let i = 0; i < target.length;i++){
                select[target[i]] += 1;
            }
            for(let i = 0; i < children.length; i++){
                children[i].style.display = 'none';
            }
            goNext(++qIdx);
        },450)
    }, false);
}
// 다음 문항으로 넘기는 함수
function goNext(qIdx){
    let qBox = document.querySelector(".qBox");
    let status = document.querySelector(".status_bar");
    // 마지막 항목일 경우 결과 페이지 이동
    if(qIdx === endPoint){
        goResult();
        return
    }
    // .qBox 안에 data.js 안에 있는 리스트를 뿌려줌
    qBox.innerHTML = qnaList[qIdx].q;
    // qnaList 안에 있는 답변을 갯수만큼 불러옴
    for(let i in qnaList[qIdx].a){
        addAnswer(qnaList[qIdx].a[i].answer, qIdx, i);
    }
    status.style.width = (100 / endPoint) * (qIdx + 1) + "%";
}

function init(){
    main.classList.add("animate_fadeOut");
    setTimeout(()=>{
        //최초 0.45초 후 qna Fade-in 등장
        qna.classList.add("animate_fadeIn");
        setTimeout(()=>{
            // 0.45초 중 0.45초 후 main Fade-Out 사라짐
            main.style.display = "none";
            qna.style.display = "block";
        }, 450)
        // 화면 전환 뒤, goNext 함수를 불러온다.
        let qIdx = 0;
        goNext(qIdx);
    },450);
}
