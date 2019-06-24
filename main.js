//Game board
let gameBoard = (() => {
    let array = [
    [,,],
    [,,],
    [,,]
    ];
    
    const move = (sign, xPosition, yPosition) => {
        if (array[yPosition][xPosition]) {
            return;
        }
        gameHandler.moves++;
        array[yPosition][xPosition] = sign;
        gameHandler.updateBoard();
        if (gameHandler.winChek(array, xPosition, yPosition))
        gameHandler.endGame(false);
        else
        if (gameHandler.moves < 9)
        gameHandler.nextTurn();
        else
        {
        gameHandler.endGame(true);
        }
    };

    let gameBoardDisplay = document.getElementById("gameBoard");

    let gameBoardList = document.createElement("ul");

    const start = () => {
        gameBoardDisplay.appendChild(gameBoardList);
        gameHandler.updateBoard();
    };

    const cleanBoardDisplay = () => {
        while (gameBoardList.firstChild) {
            gameBoardList.removeChild(gameBoardList.firstChild);
        }
    }

    return {
        array,
        gameBoardList,
        move,
        start,
        cleanBoardDisplay
    }
})();


let gameHandler = (() => {
    let isAiTurn = false;
    let isPlaying = true;
    let playerSign = "x";
    let curPlayer = "Player 1";
    let moves = 0;
    let playerCircle = document.getElementById("circle");
    const updateBoard = () => {
        gameBoard.cleanBoardDisplay();
        //Populating board with cells
        for (i = 0; i <= 2; i++) {
            for (j = 0; j <= 2; j++)
            {
                let gameBoardCell = document.createElement("li");
                gameBoardCell.textContent = gameBoard.array[i][j];
                gameBoardCell.dataset.yPosition = i;
                gameBoardCell.dataset.xPosition = j;
                gameBoardCell.onclick = () => {
                    if (isPlaying)
                    gameBoard.move(playerSign, gameBoardCell.dataset.xPosition, gameBoardCell.dataset.yPosition);
                }
                gameBoard.gameBoardList.appendChild(gameBoardCell);
            }
        };
    }

    newGameButton = document.getElementById("newGameButton");

    const newGame = () => {
        for (i = 0; i <= 2; i++) {
            for (j = 0; j <= 2; j++)
            {
                gameBoard.array[i][j] = null;
            }
        };
        updateBoard();
        playerSign = "x";
        feedBack.textContent = "Player 1 turn";
        isPlaying = true;
        gameHandler.moves = 0;
        if (playerCircle.checked)
        {
            isAiTurn = false;
            aiTurn();
        }
    }

    let feedBack = document.getElementById("feedBack");

    const nextTurn = () => {
        if ( playerSign == "x") {
            curPlayer = "Player 2";
            playerSign = "o";
            feedBack.textContent = curPlayer + " turn";
        } else 
        {
            curPlayer = "Player 1";
            playerSign = "x";
            feedBack.textContent = curPlayer + " turn";
        }
        aiTurn();
    };
    const aiTurn = () => {
        isAiTurn = !isAiTurn;
        if (isAiTurn == 1) {
            let x = AI.selectMove();
            let y = AI.selectMove();
            while (gameBoard.array[y][x] != null)
            {
                x = AI.selectMove();
                y = AI.selectMove();
            }
            gameBoard.move(playerSign, x, y);
        }
    }
    const winChek = (array, xPosition, yPosition) => {
        // vertical line on which last sign was placed
        haveWon = true;
        for (i = 0; i <= 2; i++) {
            if (array[i][xPosition] != playerSign)
            haveWon = false;
        }

        // horizontal line on which last sign was placed
        if (haveWon) return haveWon;
        haveWon = true;
        for (i = 0; i <= 2; i++) {
            if (array[yPosition][i] != playerSign)
            haveWon = false;
        }
        // both diagonals
        if (haveWon) return haveWon;
        haveWon = true;
        for (i = 0; i <= 2; i++) {
            if (array[i][i] != playerSign)
            haveWon = false;
        }
        if (haveWon) return haveWon;
        haveWon = true;
        for (i = 0; i <= 2; i++) {
            if (array[i][2-i] != playerSign)
            haveWon = false;
        }
        if (haveWon) return haveWon;
        // if nothing was found continue playing the game
        return false;
    }

    const endGame = (draw) => {
        if (draw) {
        feedBack.textContent = "Draw";
        isPlaying = false;
        
        } else
        {
        isPlaying = false;
        feedBack.textContent = curPlayer + " won!";
        }
    }
    return {
      moves,
      updateBoard,
      newGame,
      nextTurn,
      winChek,
      endGame
    };
  })();
  
  let AI = (() => {
    const selectMove = () => {
        let x = 0;
        x = Math.floor(Math.random()*3);
        return x;
    }
    return {
        selectMove,
    }
  })();

gameBoard.start();