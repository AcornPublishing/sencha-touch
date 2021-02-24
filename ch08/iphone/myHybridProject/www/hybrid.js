
function callPhone(phoneNum)//전화걸기
{
    alert("전화걸기"+ phoneNum);
    location.href = "app:tel:" + phoneNum;
}
function callSms(phoneNum, smsCont)// SMS문자보내기
{
    alert("SMS문자보내기"+ phoneNum);
    location.href = "app:sms:" + phoneNum;
}
function callCamera() // 카메라 호출
{
    alert("카메라 호출");
    location.href = "app:camera";
}
function callNetworkState(callbackFunc) // 네트워크상태체크
{
    alert("네트워크상태체크");
    location.href = "app:networkstate";
}		
function callLocationPos(callbackFunc) // 위도경도 갖고오기
{
    alert("위도경도 갖고오기");
    location.href = "app:location";
}
function callMoviePlayer(movieUrl)// mp3, 동영상플레이
{
    location.href = "app:mp3:"+movieUrl ;
}	
function callUtubePlayer(movieUrl)//유튜브 플레이어
{
    alert("app:movie:"+movieUrl);
    location.href = "app:movie:"+movieUrl ;
}	
