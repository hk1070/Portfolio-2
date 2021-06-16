/////////// 서브 페이지 JS ////////////////

// 모바일 여부 코드(1-모바일, 0-일반)
let mob = 0;
let winW = $(window).width(); // 윈도우가로크기
if (winW <= 500) mob = 1;
console.log("모바일:" + mob);

$(function () { /// jQB ///////////////////
    $(window).resize(function () {

        location.reload();

    }); ////// resize////////////////

    if (mob) {

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

    } /////// if /////////////////
    else {
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

    } ///////// else //////////////

}); ////////////// jQB ///////////////////
