size = 100;
offsetx = 0//size * -0.75
offsety = 0
function hex(color, left, top) {
    return '<div style="position: absolute;top: ' + top + "px;left: " + left + 'px;"><a style="position:absolute;width: 0;height: 0;border-top: ' + size * 0.435 + "px solid transparent;border-bottom: " + size * 0.435 + "px solid transparent;border-right: " + size * 0.25 + "px solid " + color + ';"></a><a style="position:absolute;left: ' + size * 0.25 + "px;width: " + size * 0.5 + "px;height: " + size * 0.87 + "px;background-color: " + color + ';"></a><a style="position:absolute;left:' + size * 0.75 + "px;width: 0;height: 0;border-bottom: " + size * 0.435 + "px solid transparent;border-top: " + size * 0.435 + "px solid transparent;border-left: " + size * 0.25 + "px solid " + color + ';"></a></div>'
}
let arr = [];
function grid(x, y, color) {
    arr = []
    for (i = 0; i < x; i++) {
        arr.push([])
        for (z = 0; z < y; z++) {
            arr[i].push(color)
        }
    }
}
function display(target, between = 1) {
    target.innerHTML = "";
    for (i = 0; i < arr.length; i++) {
        for (z = 0; z < arr[i].length; z++) {
            tempOffsetx = offsetx;
            tempOffsety = offsety;
            if (i % 2 == 0) {
                tempOffsetx += size * 0.75 * between;
            }
            target.innerHTML += hex(
                arr[i][z],
                size * 1.5 * between * z + tempOffsetx,
                size * 0.43 * between * i + tempOffsety
            );
        }
    }
}