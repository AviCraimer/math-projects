

const {cartesianProductSym} = require('./symbols' )


function cartesianProduct (list1, list2) {
    let el0Wrap = false, el1Wrap = false;
    if (  !(Array.isArray(list1) && list1[cartesianProductSym] )) {
        //If it isn't already a cartisian product, then wrap it in an array.
        el0Wrap = true;
    }
    if (  !(Array.isArray(list2) && list2[cartesianProductSym] )) {
        el1Wrap = true;
    }
    // if (!el1Wrap || !el)
    const productList = []
    list1.forEach(el0 => {
        el0 = (el0Wrap) ? [el0] : el0;
        list2.forEach(el1 => {
            el1 = (el1Wrap) ? [el1] : el1;

            const orderedList = [...el0, ...el1];
            productList.push(orderedList);
        } );
    } );

    productList[cartesianProductSym] = true;
    return productList;
}


//Should be able to make this so it doesn't nest arrays with repeated direct products. That'll be tricky.
function operationDirectProduct (func1, func2) {
    // console.log("func1 and 2", func1, func2)

    let func1Size = 1, func2Size = 1;
    if ( func1[cartesianProductSym]) {
        func1Size = func1.size;
    }
    if ( func2[cartesianProductSym]) {
        func2Size = func2.size;
    }

    const prodFunc =  function (input1,input2) {
        // console.log("input1, input2", input1, input2);
        // console.log(func1, func2)
        // console.log(func1Size,func2Size )
        // console.log( input1.slice(0,func1Size), input2.slice(0,func1Size))
        let res1 =   func1 (input1.slice(0,func1Size), input2.slice(0,func1Size)) ;
        let res2 = func2(input1.slice(func1Size), input2.slice(func1Size)) ;

        if (func1Size === 1) {
            res1 = [res1]
        }
        if (func2Size === 1) {
            res2 = [res2]
        }

        // console.log("res1 and 2:",   res1, res2)
        const combined =  [...res1, ...res2] ;
        prodFunc.size = combined.length;
        return combined;
    }
    Object.defineProperty(prodFunc, "name", { value:  func1.name + "_X_" + func2.name });
    prodFunc[cartesianProductSym] = true;
    return prodFunc;
}

//Tests
const a = ['a','b','c'];
const b  = [1,2,3,4];
// const nested = [ ['x1','y1'], ['x2','y2']  ]

// const product1 = cartesianProduct(a,b);
// console.log('product1',  product1);

// const product2 = cartesianProduct(product1, b);
// console.log('product2', product2);

// const product3 = cartesianProduct(product1, nested);
// console.log('product3', product3);

// const identProduct = cartesianProduct( a, [] );
// console.log('identProduct', identProduct);





module.exports = {
    cartesianProduct,
    operationDirectProduct
}