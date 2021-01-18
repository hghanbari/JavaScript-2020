gamePlast = document.getElementById("gamePlast");

var numberOfCards = 18;
createHolder();
createFrontHolder();

function createHolder() {
    for (var i = 0; i < numberOfCards; i++) {
        var holder = document.createElement("div");
        holder.className = "holder";
        gamePlast.appendChild(holder);
    }
}

function createFrontHolder() {
    holder = document.getElementsByClassName("holder");
    var imgIndex = 1;
    for (var i = 0; i < holder.length; i++) {
        var picFront = createImage("img/p" + imgIndex + ".jpg");
        imgIndex++;
        if (imgIndex > (numberOfCards / 2)) {
            imgIndex = 1;
        }
        holder[i].appendChild(picFront);
    }

}

function createImage(realImageAddress) {
    var img = document.createElement("img");
    img.className = "picFront";
    img.src = "img/none.jpg";
    img.dataset.realImg = realImageAddress;

    img.addEventListener('click', function () {
        flipCard(img);
    });

    return img;
}


var previousImg = null;
var round = 0;

function flipCard(img) {
    if (img === previousImg || img.dataset.done) {
        return;
    }
    if (previousImg === null) {
        previousImg = img;
    } else {
        if (previousImg.dataset.realImg !== img.dataset.realImg) {
            // When the player chooses an incorrect card
            previousImg.src = 'img/none.jpg'
            previousImg = null;
            return;
        }

        // When the player choose correct cards
        previousImg.dataset.done = true;
        img.dataset.done = true;
        round++;
        previousImg = null;

        if (round === 9) {
            alert("You Won!")
        }
    }
    img.src = img.dataset.realImg;
}

// setTimeout()