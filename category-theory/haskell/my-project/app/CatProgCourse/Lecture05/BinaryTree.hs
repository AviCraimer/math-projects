module CatProgCourse.Lecture05.BinaryTree  (singletonBTree, bTreeInsert, testTreeInt)  where

--Binary Tree
data BTree a = EmptyBTree | BTreeNode a (BTree a) (BTree a)  deriving (Show, Eq)


singletonBTree :: (Ord a) =>  a -> BTree a
singletonBTree value = BTreeNode value EmptyBTree EmptyBTree

bTreeInsert :: (Ord a) => a -> BTree a -> BTree a
bTreeInsert value EmptyBTree = singletonBTree value
bTreeInsert value (BTreeNode nodeValue leftTree rightTree)
    | (value == nodeValue) = BTreeNode nodeValue leftTree rightTree
    | (value < nodeValue) = BTreeNode nodeValue (bTreeInsert value leftTree) rightTree
    | (value > nodeValue) = BTreeNode nodeValue leftTree (bTreeInsert value rightTree)


nums = [4,20,5,6,12, 10] :: [Int]

testTreeInt :: BTree Int
testTreeInt = foldr bTreeInsert EmptyBTree nums


instance Functor BTree where
    fmap g EmptyBTree = EmptyBTree
    fmap g (BTreeNode value leftTree rightTree) = BTreeNode (g value) (fmap g rightTree) (fmap g leftTree)