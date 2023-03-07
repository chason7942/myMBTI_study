const main = document.querySelector("#main");
const qna = document.querySelector("#qna");
const result = document.querySelector("#result");
const startBtn = document.querySelector ("#btnStart");
const endPoint = 12;

// 시작버튼
startBtn.addEventListener("click",function(){
    init();
});

// 다음 문항으로 넘기는 함수
function goNext(qIdx){
    let qBox = document.querySelector(".qBox");
    // .qBox 안에 data.js 안에 있는 리스트를 뿌려줌
    qBox.innerHTML = qnaList[qIdx].q;
    // qnaList 안에 있는 답변을 갯수만큼 불러옴
    // for(let i in qnaList[qIdx].a){
    //     addAnswer(qnaList[qIdx].a[i].answer, qIdx, i);
    // }
    let status = document.querySelector(".status_bar");
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
