module CatProgCourse.Lecture05.LeafyTree  (makeLeafyTree, leafyFmapTest1, leafyFmapTest2)  where


data LeafyTree elements =  LeafyTree [LeafyTree elements] [elements] deriving (Show, Eq)

instance Functor LeafyTree where
    fmap g (LeafyTree trees elements) = LeafyTree ( (fmap . fmap)  g trees)  (fmap g elements)


makeLeafyTree :: [LeafyTree el] ->  [el] -> LeafyTree el
makeLeafyTree trees elements   = LeafyTree trees elements



testTree1 :: LeafyTree [Char]
testTree1 = makeLeafyTree [makeLeafyTree [] ["Hi", "Hey", "Howdey"], makeLeafyTree [] ["Olla", "Chao"] ]   ["Yo", "Greetings"]

testTree2 :: LeafyTree Int
testTree2 = makeLeafyTree [makeLeafyTree [] [1,2,3], makeLeafyTree [] [4,5,6]  ] [7,8,9]


leafyFmapTest1 = fmap (++ " Avi") testTree1
leafyFmapTest2 = fmap (+ 10) testTree2
