const app = new PIXI.Application({
    view: document.getElementById('canvas'),
    width: 800,
    height: 600,
    backgroundColor: 0xAAAAAA
});

// Hráč
const player = new PIXI.Sprite(PIXI.Texture.from('B_witch_idle.png'));
player.anchor.set(0.5);
player.x = app.screen.width / 4;
player.y = app.screen.height / 2;
app.stage.addChild(player);

// Skóre
let score = 0;
const scoreText = new PIXI.Text(`Score: ${score}`, { fontFamily: 'Arial', fontSize: 24, fill: 0xFFFFFF });
scoreText.position.set(10, 10);
app.stage.addChild(scoreText);

// Překážky
const obstacles = [];
const obstacleGap = 150; // Mezera mezi překážkami
const gravity = 1; // Gravitace
let isGameOver = false;

function spawnObstacle() {
    const obstacle = new PIXI.Sprite(PIXI.Texture.from('krabice.png'));
    obstacle.anchor.set(0.5);
    obstacle.x = app.screen.width + Math.random() * 200;
    obstacle.y = app.screen.height / 2;
    app.stage.addChild(obstacle);
    obstacles.push(obstacle);
}

// Hlavní herní smyčka
app.ticker.add((delta) => {
    if (isGameOver) {
        return;
    }



    // Generování překážek
    if (Math.random() < 0.1 + score * 0.001) {
        spawnObstacle();
    }

    // Pohyb překážek a detekce kolizí
    for (let i = obstacles.length - 1; i >= 0; i--) {
        const obstacle = obstacles[i];
        obstacle.x -= 5;

        // Detekce kolize s hráčem
        if (player.x < obstacle.x + obstacle.width / 2 &&
            player.x + player.width / 2 > obstacle.x &&
            player.y < obstacle.y + obstacle.height / 2 &&
            player.y + player.height / 2 > obstacle.y) {
            gameOver();
        }

        // Odstranění překážek, které opustily obrazovku
        if (obstacle.x + obstacle.width < 0) {
            obstacles.splice(i, 1);
            app.stage.removeChild(obstacle);
        }
    }

    // Přidání skóre pouze jednou za každou překážku
    score += obstacles.length * 0.01;
    scoreText.text = `Score: ${score}`;
});

// Funkce pro ukončení hry
function gameOver() {
    isGameOver = true;
    alert(`Game Over! Your Score: ${score}`);
    // Zde můžete přidat další akce po skončení hry
}
