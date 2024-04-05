let container = ''
function start() {
    container = document.getElementById('container')
    for (i = 0; i < 3; i++) {
        for (z = 0; z < 4; z++) {
            pos = getPos(i, z)
            document.getElementById('animations').innerHTML += `@keyframes a${i}${z} {from {top: 0px; left: 0; position: absolute} to {top: ${pos[1]}px; left: calc(${pos[0]}% - 70px); position: absolute}}\n`
        }
    }
}
function getPos(x, y) {
    return [(100 / 3 * x + 100 / 3 * (x + 1)) / 2, 150 * y + 25]
}
function draw(rows, cards = []) {
    while (cards.length < rows * 3) {
        cards.push({ shape: 'oval', color: [255, 0, 0], opac: 0.5, num: 1 })
    }
    container.innerHTML = ''
    for (i = 0; i < rows; i++) {
        let rowCards = ''
        for (z = 0; z < 3; z++) {
            let card = cards[i * 3 + z]
            cardINH = `<div class="shape ${card.shape}" style="background-color: rgba(${card.color[0]},${card.color[1]},${card.color[2]},${card.opac}); border-color: rgb(${card.color[0]},${card.color[1]},${card.color[2]})"></div>`
            rowCards += `<div class="card" style="animation: a${i}${z} 3s">`
            for (j = 0; j < card.num; j++) {
                rowCards += cardINH
            }
            rowCards += '</div>'
        }
        container.innerHTML += `<div id="row${i + 1}" class="row">${rowCards}</div>`
    }
}