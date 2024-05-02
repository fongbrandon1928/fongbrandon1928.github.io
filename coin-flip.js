function flipCoin() {
    const coin = document.getElementById('coin');
    const result = document.getElementById('result');

    const headsImage = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/2006_Quarter_Proof.png/609px-2006_Quarter_Proof.png';
    const tailsImage = 'https://upload.wikimedia.org/wikipedia/commons/5/5a/98_quarter_reverse.png';
    let isHeads = Math.random() < 0.5;

    coin.style.backgroundImage = `url(${isHeads ? headsImage : tailsImage})`;
    result.textContent = `Result: ${isHeads ? 'Heads' : 'Tails'}`;
}
