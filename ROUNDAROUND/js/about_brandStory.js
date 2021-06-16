//////////////////////////////////////////////////
//////// 원 페이지 자동 스크롤 JS - 브랜드 스토리 /////
//////////////////////////////////////////////////

// 현재 페이지 번호
let pno = 0; // 현재 페이지 번호
// 전체 페이지 수(상수로 변경불가!)
const totnum = 7;
// 광스크롤 막기(0-허용,1-불허용)
let psts = 0;
// 전체 윈도우 높이값(페이지이동시 사용!)
let winH = $(window).height();
// 모바일 여부 코드(1-모바일, 0-일반)
let mob = 0;
let winW = $(window).width(); // 윈도우가로크기
if (winW <= 500) mob = 1;
console.log("모바일:" + mob);
//////////////////////////////////////////////////

$(function () { ///////////jQB//////////////////////////

    $(window).resize(function () {

        console.log("리사이즈!");

        location.reload();

    }); ////// resize /////////////////

    //// 터치방향을 위한 변수 ////
    let tcd1, tcd2;

    if (mob) {

        ///// 1.터치시작시 화면 터치위치값 변수에 넣기 //////
        // 대상: document
        // 사용위치속성: screenY 
        $(document).on("touchstart", function (e) {

            // 모바일 터치 위치값 변수에 할당
            tcd1 = e.originalEvent.touches[0].screenY;
            //console.log("터치시작:" + tcd1);

        }); ////// touchstart 함수 /////////////////////
        ///////////////////////////////////////////////

        ///// 2.터치가 끝날때 화면 터치위치값 변수에 넣기 //////
        // 대상: document
        // 사용위치속성: screenY
        $(document).on("touchend", function (e) {

            // 모바일 터치 위치값 변수에 할당
            tcd2 = e.originalEvent.changedTouches[0].screenY;
            //console.log("터치끝:" + tcd2);

            /// 방향 판별하기 ///////
            let delta = tcd1 - tcd2;
            //console.log("차:" + delta);

            // 1. 양수: 윗쪽방향 스와이프 -> 스크롤 아래로 -> 페이지번호증가
            if (delta > 0) {
                pno++;
                if (pno === totnum) pno = totnum - 1; //끝번호고정
            } /////////// if ////////////////////////////////////

            // 2. 음수: 아래쪽방향 스와이프 -> 스크롤 위로 -> 페이지번호감소
            else {
                pno--;
                if (pno < 0) pno = 0; //첫번호고정
            } /////////// else //////////////////////////////////

            //console.log("페이지번호:" + pno);

            // 3. 이동할 페이지(.page)의 위치값 알아내기
            let pgpos = winH * pno;

            // 4. 실제 이동위치로 스크롤 애니메이션 이동
            $("html,body").stop().animate({
                scrollTop: pgpos + "px"
            }, 1200, "easeOutQuint"); /// animate ///



        }); ////// touchstart 함수 /////////////////////
        ///////////////////////////////////////////////

        $(".btn,.btn2").css({
            display: "none"
        }); /////////// css ////////


        //// 모바일 메뉴///////////////////////

        $("#ham").click(function () {

            $("#mclose").css({
                display: "block"
            });

            $("#momenu").css({
                display: "block"
            });

        }); //////// click ////////////////////////////////

        $("#mclose").click(function () {

            $(this).css({
                display: "none"
            });

            $("#momenu").css({
                display: "none"
            });

        }); /////// click //////////////

        $(".sub").hide();

        $(".mtitle").click(function () {

            $(this).next() // 서브메뉴
                .stop().slideToggle(300)
                // 슬라이드 다운/업 하여 보이기
                .parent() // 상위 li
                .siblings() // 다른 li들
                .find(".sub") // 하위 서브메뉴
                .slideUp(300); // 슬라이드 업하여 사라짐

        }); //////// click ///////////////

    } /////// if (모바일)//////////////////////////////////////
    else {
        ////// 자동스크롤 구현////////////
        $(document).on("mousewheel DOMMouseScroll", function (e) {


            // 광스크롤 막기 //////////////////////////////////////
            if (psts === 1) return true;

            psts = 1; // 잠금
            setTimeout(function () {
                psts = 0;
            }, 1200); // setTimeout ////
            /////////////////////////////////////////////////////


            // 1. 마우스휠 방향 알아내기
            e = window.event || e;

            let delta = e.detail ? e.detail : e.wheelDelta;
            // 변수에 유효한 설정이 적용되어 할당됨


            if (/Firefox/i.test(navigator.userAgent)) {
                delta = -delta; //변수앞에 마이너스쓰면 부호가 반대
            } ///// if ////////


            // 2. 마우스 휠 방향에 따라 페이지 번호 증감!
            if (delta < 0) { // 아랫방향 스크롤(다음페이지)
                pno++;
                if (pno === totnum) pno = totnum - 1; // 끝번호 고정!
            } //////// if /////////////////////////////////
            else { // 윗방향 스크롤(이전페이지)
                pno--;
                if (pno < 0) pno = 0; // 첫번호 고정
            } ///////// else ///////////////////////////////

            //console.log("페이지번호:" + pno);

            // 기존 위치값 읽어오기 변경
            let pgpos = winH * pno;


            ////console.log("이동위치:"+pgpos);

            // 4. 실제 이동위치로 스크롤 애니메이션 이동
            $("html,body").stop().animate({
                scrollTop: pgpos + "px"
            }, 1200, "easeInOutQuint"); /////// animate ///////


        }); ////////// mousewheel /////////////////////////
        ///////////////////////////////////////////////////


        ////// 버튼 클릭시 이동 ////////
        $(".btn").click(function () {

            //console.log("now:"+pno);
            pno++;

            let pgpos = winH * pno;

            // 실제 이동위치로 스크롤 애니메이션 이동
            $("html,body").stop().animate({
                scrollTop: pgpos + "px"
            }, 1200, "easeInOutQuint"); /////// animate ///////


        }); //////// click ///////////////// 



        //// 햄버거 버튼 클릭시 전체메뉴 보이기/숨기기
        // 대상: #ham
        // 보이기////////////
        $("#ham").click(function () {

            // 메뉴 보이기/숨기기 위한 햄버거 버튼 class="on"여부
            let isHAM = $(this).is(".on");

            if (!isHAM) {
                // 햄버거 버튼에 class="on" 넣기
                $(this).addClass("on");
                // gnb 메뉴 보이기
                $(".gnb").fadeIn(400);
                // 커버박스 보이기
                $(".top").append('<div class="cvbx"></div>');

                // 커버셋팅
                $(".cvbx").css({
                    position: "fixed",
                    top: "0",
                    left: "0",
                    width: "100vw",
                    height: "100vh",
                    backgroundColor: "#000",
                    opacity: ".5",
                    zIndex: "99" // 상단영역보다 위
                }); ///////// css /////////////

            } /////////// if /////////////
            else {
                // 햄버거 버튼에 class="on" 지우기
                $(this).removeClass("on");
                // gnb 메뉴 숨기기
                $(".gnb").fadeOut(100);
                // 커버박스 지우기
                $(".cvbx").remove();

            } //// else //////////////

        }); /////////// click ///////////////////////



        // 서브메뉴에 마우스오버시 리스트 나오게 하기
        $(".glist:has('ul')").hover(
            function () { // over
                $(".gnb").stop().animate({
                    width: "600px"
                }, "300");
            },
            function () { // out
                $(".gnb").stop().animate({
                    width: "300px"
                }, "300");
            }); //// hover ///////////

        $(".product_sm > li").hover(
            function () { // over
                $(".gnb").stop().animate({
                    width: "1000px"
                }, "300");
            },
            function () { // out
                $(".gnb").stop().animate({
                    width: "600px"
                }, "300");
            }); //// hover ///////////




    } ////////////// else ///////////////////



}); ///////////jQB/////////////////////////////////////
