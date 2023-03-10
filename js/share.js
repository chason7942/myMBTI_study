let resultImg = document.querySelector("#resultImg");
let resultAlt = point;
const url = "https://chason7942.github.io/myMBTI_study/"
const shareTit = "십이지 동물 연애유형 결과";
const shareDesc = infoList[resultAlt].name;
const shareImg = url + "img/image-" + resultAlt + ".png";
const shareURL = url + "page/result-" + resultAlt + ".html";

function shareMessage() {
    Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: shareTit,
        description: shareDesc,
        imageUrl: shareImg,
        link: {
          // [내 애플리케이션] > [플랫폼] 에서 등록한 사이트 도메인과 일치해야 함
          mobileWebUrl: shareURL,
          webUrl: shareURL,
        },
      },
      buttons: [
        {
          title: '결과 확인 하기',
          link: {
            mobileWebUrl: shareURL,
            webUrl: shareURL,
          },
        },
      ],
    });
  }