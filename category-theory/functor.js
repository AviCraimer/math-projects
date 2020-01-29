

/*
Here is an example to illustrate the idea that in Javascript, the .map method on arrays is a functor.
        toHex
    Int -----> String
     |     |     |
     |     |     |  .map
     |     |     |
     V     V     V
   [Int] -----> [String]
        toHexMapped
    Here we consider Javascript's .map method on an array. Although Javscript does't have types, if it did, we can see that it maps the source type X of the callback to the type which is an array of Xs. It maps the target type Y of the callback to an array of Ys.
    In the example, we have a function toHex, which maps integer values to a hexidecimal string for that value.
    In this example, .map takes the source type Int to [Int], and the target type String to [String]. It also takes the function toHex, to a new function toHexMapped. While toHex only works on integer inputs, toHexMapped works on arrays of integers.
    .map is truly a functor because whatever source and target type the callback function has, .map will take those types to the appropriate Array-ified versions. So it works on every object and every morphism in the category of simple types and functions.
    However, it's important to note that .map is only one functor, there is nothing in the functor laws that says the mapping of types and morphisms  has to behave in the way that .map works.
    For example, we could define a functor .reverseMap. This works the same as .map in terms of how it maps types to types, but it picks out a different morphism in the target category.
            f
   Type1 -----> Type2
     |     |     |
     |     |     |  .reverseMap
     |     |     |
     V     V     V
  [Type1] -----> [Type2]
      fReverseMapped
    fReversedMapped is the function that applies f to each element in the list [Type1] and then returns the new list with the elements in reverse order.
    To check if this is a valid functor we would have to make sure that it preseverse identities and function composition (we already know that it preserve arrow connection structure based on the diagram).

*/

