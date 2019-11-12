function listN (n) {
    let list = [];
    for (let i = 0; i < n; i++) {list.push(i);}
    return list;
}


//factorial
const fac = (n, acc = 1) => (n === 1) ? acc : fac(n-1, acc * n);

const randomElement  = (arr) => arr[ Math.floor(Math.random()*arr.length)];


module.exports = {
    listN,
    fac,
    randomElement
}
