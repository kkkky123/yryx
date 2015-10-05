var arr = [
    [1, 2, 3, 4, 5],
    [6, 7, 8, 9, 10],
    [11, 12, 13, 14, 15],
    [16, 17, 18, 19, 20],
    [21, 22, 23, 24, 25]
];

function matrixOut(arr) {
    var res = [];
    var rows = arr.length;
    var cols = arr[0].length;
    var x = 0;
    var y = 0;
    var cur = 0;
    while (x < rows && y < cols) {
        var i = x,
            j = y;
        for (; j < cols; j++) {
            res.push(arr[i][j]);
        }
        j--;
        for (i++; i < rows; i++) {
            res.push(arr[i][j]);
        }
        i--;
        for (j--; j >= y && i != x; j--) {
            res.push(arr[i][j]);
        }
        j++;
        for (i--; i > x && j != cols - 1; i--) {
            res.push(arr[i][j]);
        }
        x++;
        y++;
        rows--;
        cols--;
    }
    return res;
}
console.log(matrixOut(arr));