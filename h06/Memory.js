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

    var random = 0;
    var randomNum1 = [];
    var randomNum2 = [];
    while (randomNum1.length < 9) {
        random = Math.floor(Math.random() * 9) + 1;
        if (randomNum1.lastIndexOf(random) === -1) {
            randomNum1.push(random);
        }
    }
    while (randomNum2.length < 9) {
        random = Math.floor(Math.random() * 9) + 1;
        if (randomNum2.lastIndexOf(random) === -1) {
            randomNum2.push(random);
        }
    }
    for (var i = 0; i < randomNum1.length; i++) {
        var picFront = createImage("img/p" + randomNum1[i] + ".jpg");
        holder[i].appendChild(picFront);
    }
    for (var i = 0; i < randomNum2.length; i++) {
        var picFront = createImage("img/p" + randomNum2[i] + ".jpg");
        holder[i + 9].appendChild(picFront);
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

    var player1 = {
        name: 'Player1',
        points: 0
    };
    var player2 = {
        name: 'Player2',
        points: 0
    };
    var previousImg = null;
    var round = 0;
    var Changeplayer = 1;

    var currentPlayer = null;

    function setCurrentPlayer(player) {
        currentPlayer = player;
        document.getElementById("current-player").innerText = player.name;
        document.getElementById("player1").value = player1.points;
        document.getElementById("player2").value = player2.points;
    }

    var wait = false;

    function flipCard(img) {
        if (round === 9) {
            alert("End of the game!")

        }

        if (img === previousImg || img.dataset.done || wait) {
            return;
        }

        if (previousImg === null) {
            previousImg = img;
        } else {
            if (previousImg.dataset.realImg !== img.dataset.realImg) {
                // When the player chooses an incorrect card
                wait = true;
                if (currentPlayer === player1) {
                    setCurrentPlayer(player2);
                } else {
                    setCurrentPlayer(player1);
                }

                img.src = img.dataset.realImg;

                setTimeout(function () {
                    img.src = 'img/none.jpg';
                    previousImg.src = 'img/none.jpg';
                    previousImg = null;
                    wait = false;
                }, 1000);
                return;
            } else {
                // When the player choose correct cards

                previousImg.dataset.done = true;
                img.dataset.done = true;
                round++;
                previousImg = null;
                currentPlayer.points++;
                if (currentPlayer === player1) {
                    setCurrentPlayer(player2);
                } else {
                    setCurrentPlayer(player1);
                }
            }


        }
        img.src = img.dataset.realImg;



    }

    setCurrentPlayer(player1);
}