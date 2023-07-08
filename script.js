$(document).ready(function () {
    const randomNum = (set) => set[Math.floor(Math.random() * set.length)];
    const itemsIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
    let imageUrl, startTimer, checkResult, mm;

    // BUILD GAME FUNCTION START
    const buildGame = function () {
        $('.item-box').empty();
        $('#right').empty();
        let arrCopy = [];
        for (let a = 0; a < itemsIds.length; a++) arrCopy[a] = itemsIds[a];
        for (let i = 0; i < 16; i++) {
            if (arrCopy.length > 0) {
                let selectElem = arrCopy.splice(arrCopy.indexOf(randomNum(arrCopy)), 1);
                let innerContent = `<div class="item" value="${selectElem}" id="item-num_${selectElem}"></div>`;
                $('.item-box').eq(i).html(innerContent);
            }
        }
        $('#item-num_1').css({ backgroundPosition: `0px 0px` })
        $('#item-num_2').css({ backgroundPosition: `300px 0px` })
        $('#item-num_3').css({ backgroundPosition: `200px 0px` })
        $('#item-num_4').css({ backgroundPosition: `100px 0px` })
        $('#item-num_5').css({ backgroundPosition: `0px 300px` })
        $('#item-num_6').css({ backgroundPosition: `300px 300px` })
        $('#item-num_7').css({ backgroundPosition: `200px 300px` })
        $('#item-num_8').css({ backgroundPosition: `100px 300px` })
        $('#item-num_9').css({ backgroundPosition: `0px 200px` })
        $('#item-num_10').css({ backgroundPosition: `300px 200px` })
        $('#item-num_11').css({ backgroundPosition: `200px 200px` })
        $('#item-num_12').css({ backgroundPosition: `100px 200px` })
        $('#item-num_13').css({ backgroundPosition: `0px 100px` })
        $('#item-num_14').css({ backgroundPosition: `300px 100px` })
        $('#item-num_15').css({ backgroundPosition: `200px 100px` })
        $('#item-num_16').css({ backgroundPosition: `100px 100px` })
        $('.item').css({ backgroundImage: `url('${imageUrl}')` })
    }

    imageUrl = './Images/image.jpg';
    buildGame();

    $('#closeResultModal').click(function () {
        $('.modal-container').css({ display: 'none' });
        $('.modal-box').css({ padding: '40px 0' });
    })
    // BUILD GAME FUNCTION END

    // START NEW GAME START
    $('.start').click(function () {
        imageUrl = './Images/image.jpg';
        $('.check').attr('disabled', false);
        $('.start').attr('disabled', true);
        startCountDown();
        $('.item-box').sortable({
            connectWith: '#left, #right',
            containment: ".bottomer",
            tolerance: "pointer"
        });
        $('.item-box').sortable('enable');
    })
    // START NEW GAME END

    // CHECK RESULT START
    $('.check').click(function () {
        $('.item-box').sortable('disable');
        $('.modal-result').css({ display: 'none' });
        $('.modal-setImage').css({ display: 'none' });
        $('.modal-check').css({ display: 'flex' });
        $('.modal-container').css({ display: 'flex' });
        $('#modalBtnCheck').click(function () {
            checkWin();
        })
        $('#closeCheckModal').click(function () {
            $('.modal-container').css({ display: 'none' });
        })
    })
    // CHECK RESULT END

    // CREATE NEW GAME START
    $('.new').click(function () {
        buildGame();
        clearInterval(startTimer);
        $('.timer').text(`01:00`);
        $('.check').attr('disabled', true);
        $('.start').attr('disabled', false);
    })
    // CREATE NEW GAME END

    // CHANGE IMAGE START
    $('.change').click(function () {
        $('.modal-check').css({ display: 'none' });
        $('.modal-result').css({ display: 'none' });
        $('.modal-setImage').css({ display: 'flex' });
        $('.modal-container').css({ display: 'flex' });
        let check = true;
        // check custom image start
        $('#customImage').change(function () {
            imageUrl = $('#customImage').val();
            if (/^https:\/\/.+$/.test(imageUrl)) {
                let checkImgSizes = new Image();
                checkImgSizes.onload = function () {
                    let height = checkImgSizes.height;
                    let width = checkImgSizes.width;
                    if (height != width) {
                        check = false;
                        $('#modalBtnSet').attr('disabled', true);
                        $('#errMess').text(`Your image has to be square form (width and height should be equal). Current sizes are ${width}x${height}`);
                        $('#errMess').css({ backgroundColor: 'red', color: "white", display: 'flex' });
                    }
                    if (height === width) {
                        check = true;
                        $('#modalBtnSet').attr('disabled', false);
                        $('#errMess').text(`You have selected great image. Its sizes are ${width}x${height}`);
                        $('#errMess').css({ backgroundColor: 'chartreuse', color: "black", display: 'flex' });
                    }
                }
                checkImgSizes.src = imageUrl;
            }
            else {
                check = false;
                $('#customImage').val('');
                $('#errMess').text(`Paste link (in the "https://..." format) only`);
                $('#errMess').css({ backgroundColor: 'red', color: "white", display: 'flex' });
            }
        })
        // check custom image end

        // set button start
        $('#modalBtnSet').click(function () {
            if (check) {
                imageUrl = $('#customImage').val();
                buildGame();
                $('.modal-container').css({ display: 'none' });
                $('.check').attr('disabled', true);
                $('.start').attr('disabled', false);
            }
            else {
                $('#customImage').val('');
                $('#errMess').text(`Your image has to be square form (width and height should be equal).`);
                $('#errMess').css({ backgroundColor: 'red', color: "white", display: 'flex' });
            }
        })
        // set button end

        // close button start
        $('#closeSetModal').click(function () {
            $('.modal-container').css({ display: 'none' });
        })
        // close button end
    })
    // CHANGE IMAGE END

    // CHECK WIN FUNCTION START
    const checkWin = function () {
        checkResult = true;
        let res = "";
        console.log($(`#right>.item`).html());
        if (checkResult) {
            for (let i = 0; i < itemsIds.length; i++) {
                let getElemValAttr = $(`#right>.item`).eq(i).attr("value");
                if (getElemValAttr != i + 1) checkResult = false;
                res += getElemValAttr + " ";
            }
        }
        if (checkResult) {
            $('.modal-check').css({ display: 'none' });
            $('.modal-setImage').css({ display: 'none' });
            $('.modal-result').css({ display: 'flex' });
            $('.modal-container').css({ display: 'flex' });
            $('.modal-result>h2').text(`Woohoo, well done, you did it!`);
            clearInterval(startTimer);
            $('.timer').text(`01:00`);
            $('.check').attr('disabled', true);
            $('.start').attr('disabled', false);
        }
        else {
            $('.modal-check').css({ display: 'none' });
            $('.modal-setImage').css({ display: 'none' });
            $('.modal-container').css({ display: 'flex' });
            $('.modal-result').css({ display: 'flex' });
            $('.modal-result>h2').text(`It's a pity, but you lost`);
            clearInterval(startTimer);
            $('.timer').text(`01:00`);
            $('.check').attr('disabled', true);
            $('.start').attr('disabled', false);
        }
    }
    // CHECK WIN FUNCTION END

    // CLOCK FUNCTION START
    const startCountDown = function () {
        mm = 60;
        startTimer = setInterval(function () {
            mm--;
            if (mm > -1) {
                (mm < 10) ? $('.timer').text(`00:0${mm}`) : $('.timer').text(`00:${mm}`);
                (mm < 10) ? $('.timer-mes').text(`00:0${mm}`) : $('.timer-mes').text(`00:${mm}`);
            }
            if (mm == 0) {
                clearInterval(startTimer);
                checkWin();
            }
        }, 1000)
    }
    // CLOCK FUNCTION END
})