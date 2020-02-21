module CatProgCourse.Lecture05.MakingFunctors  (
    createIdentity
    ,testIdentityFmap
    ,initializeBTree
    ,bTreeInsert
    ,testTreeInt
    ,testBTreeFmap
    ,makeLeafyTree
    ,testLeafyTree1
    ,testLeafyTree2
    ,leafyFmapTest2
    ,leafyFmapTest1
    )  where

-- Example given in the lecture.

data Id anyType  = IdentityOf anyType deriving (Show, Eq);
--1  2     3            4         5        6

-- Syntax explanation (with reference to numbers below data declaration)
-- 1. data keyword is used to define a new type
-- 2. Id is the name of our new data type which we will make into a functor. This could be anything. I didn't use Identity since that is already part of the standard library.
-- 3. anyType is a type parameter for Id. It must start with a lowercase letter but otherwise we can name it what we like.
-- 4. IdentityOf is called a data constructor or value constructor. This is a value level function, that creates new value instances.  Here we are defined the type structure of this function. Since all it does it construct values from existing types, we don't need to define a function implementation separate from it's type structure.
-- 5. anyType here is a type parameter. When you actually call IdentityOf you will feed it a value argument, not a a type argument, e.g., IdentityOf "foo" not IdentityOf String, but here we put the type of value argument the data constructor takes. In this case it is a type variable anyType, which means that the data constructor can take any type. This means it is essentially a box for values.
-- 6. deriving (Show, Eq) is Haskell magic that allows you to print the new values to the console with the show function, and to compare for deep equality with  (==)


instance Functor Id where -- 1
    fmap g (IdentityOf someValue )  = IdentityOf (g someValue)
--     2 3             4               5           6

-- 1. We are saying that our new type Id is an instance of the typeclass functor.
-- 2. To be an instance of the Functor typeclass we must provide an implementation of fmap. If we check the type signature of fmap in the console we see that it is :: Functor f => (a -> b) -> f a -> f b . We can add brackets and explicit type variable names to make this clearer:
--           Functor functorType =>  (a -> b) -> (functorType a -> functorType b)
--    So fmap is a function that takes as input, a function between any two types (a -> b), and returns a new function that goes from the functor image of a to the functor image of b. Notice that this type signature embodies the first of the functor laws, namely that a functor mapping preserves arrow structure. However, this does not gaurentee that the other two functor laws are followed (preserving identities and compositions). As programmers we have to ensure that our Functor typeclass instances adhere to all three functor laws.
-- 3. The first parameter of fmap is a function g. I used the parameter name g rather than f so we wouldn't confuse g for a functor which in the lecture is also called f! If we only give fmap one argument, it will return a function with the type signature (Id gSourceType -> Id gTargetType)

-- 4. The second parameter of fmap or equivalently the single parameter of the function returned by fmap g. This must be of the type Id, so here we construct a value of that type using the data constructor IdentityOf defined in our data declaration.  IdentityOf has one parameter someValue, which must be of the type that g expects as an input.
-- 5. We must return an Id type so we invoke the IdentityOf data constructor again.
-- 6. Notice that here g is applied inside IdentityOf. This is the crucial move that makes this whole thing useful. It means that fmap allows g to operate transparently on the values inside of IdentityOf. We don't need to write special Id specific functions to pattern match into those values in order to do apply functions to them.


createIdentity :: a -> Id a
createIdentity  x = IdentityOf x

testIdentityFmap :: Id Int
testIdentityFmap = fmap (+ 100)  (IdentityOf 5)
-- Returns:  IdentityOf 105




--Binary Tree
data BTree a = EmptyBTree | BTreeNode a (BTree a) (BTree a)  deriving (Show, Eq)

initializeBTree :: (Ord a) =>  a -> BTree a
initializeBTree value = BTreeNode value EmptyBTree EmptyBTree

bTreeInsert :: (Ord a) => a -> BTree a -> BTree a
bTreeInsert value EmptyBTree = initializeBTree value
bTreeInsert value (BTreeNode nodeValue leftTree rightTree)
    | (value == nodeValue) = BTreeNode nodeValue leftTree rightTree
    | (value < nodeValue) = BTreeNode nodeValue (bTreeInsert value leftTree) rightTree
    | (value > nodeValue) = BTreeNode nodeValue leftTree (bTreeInsert value rightTree)


-- We we define a more complex data structure. The binary tree. We also define functions to create a brand new tree as well as one to insert a value into an existing tree.

nums = [4,20,5,6,12, 10] :: [Int]

testTreeInt :: BTree Int
testTreeInt = foldr bTreeInsert EmptyBTree nums

-- Here we quickly create a test tree using the foldr (fold to the right) list function.
-- In the console it prints to this:
-- BTreeNode 10 (BTreeNode 6 (BTreeNode 5 (BTreeNode 4 EmptyBTree EmptyBTree) EmptyBTree) EmptyBTree) (BTreeNode 12 EmptyBTree (BTreeNode 20 EmptyBTree EmptyBTree))
-- A bit ugly, but gets the job done.

-- Your challenge is to write an instance declaration for the Functor type class for BTree. The fmap should apply g to every value inside the Btree and return a new tree with the transformed values.
-- This fmap will have two cases. The first case is when the second fmap parameter is EmptyTree, this is rather trival. The second more interesting case, is when the BTree parameter has some values in it.

-- Here is the start of it.  See if you can finish it off.
instance Functor BTree where
    fmap g EmptyBTree = EmptyBTree
    fmap g (BTreeNode value leftTree rightTree) = BTreeNode (g value) ( (fmap g) leftTree) ( (fmap g) rightTree)


-- When you are ready you can test fmap. Comment in the line below and the module export line at the top of the file.

testBTreeFmap = fmap (+ 100) testTreeInt

-- If you implmented fmap correctly, you should get:
-- BTreeNode 110 (BTreeNode 106 (BTreeNode 105 (BTreeNode 104 EmptyBTree EmptyBTree) EmptyBTree) EmptyBTree) (BTreeNode 112 EmptyBTree (BTreeNode 120 EmptyBTree EmptyBTree))


-- Now, make your own custom data type and write an Functor instance declaration for it. Or if you want to try another semi-cooked example. See below:


data LeafyTree elements =  LeafyTree [LeafyTree elements] [elements] deriving (Show, Eq)

-- You want to apply g to all the elements in leafy tree regardless of how nested they are.
-- Hint: At one point you will have to use the composition of fmap with itself (fmap.fmap). Check the type signature of this in the console to see what it does.
-- Also, remember that List is already a Functor instance with its own fmap.

instance Functor LeafyTree where
    fmap g (LeafyTree treeList elementList) = LeafyTree  ( (fmap.fmap) g treeList)  (fmap g elementList)

makeLeafyTree :: [LeafyTree el] ->  [el] -> LeafyTree el
makeLeafyTree trees elements   = LeafyTree trees elements

testLeafyTree1 :: LeafyTree [Char]
testLeafyTree1 = makeLeafyTree [makeLeafyTree [] ["Hi", "Hey", "Howdey"], makeLeafyTree [] ["Olla", "Chao"] ]   ["Yo", "Greetings"]

testLeafyTree2 :: LeafyTree Int
testLeafyTree2 = makeLeafyTree [makeLeafyTree [] [1,2,3], makeLeafyTree [] [4,5,6]  ] [7,8,9]

-- Add these to the exports at top of the file to call them in the console.
leafyFmapTest1 = fmap (++ " Gala") testLeafyTree1
leafyFmapTest2 = fmap (+ 10) testLeafyTree2

-- newtype LeafyTree2 a = LeafyTree2 (LeafyTree a)

-- instance Functor LeafyTree2 where
--     fmap g (LeafyTree2  (LeafyTree treeList elementList)) = LeafyTree2 x where
--       x = LeafyTree treeList ((fmap g) elementList)

