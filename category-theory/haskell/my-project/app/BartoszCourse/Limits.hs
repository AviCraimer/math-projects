module BartoszCourse.Limits (getListProduct, testTriples)  where
import  Data.Dynamic
-- newtype Dynamic a = Dyna a

getBinaryProduct :: [a] ->  [b]  ->  [(a,b)]
getBinaryProduct list1 list2 = [(x,y) | x <- list1, y <- list2   ]

flattenTuple :: Either ((a,b),c) (a, (b,c)) -> (a,b,c)
flattenTuple (Left ((x,y),z)) = (x,y,z)
flattenTuple (Right (x, (y, z))) = (x, y, z)

flattenRightTuples :: [(a, (b,c))] -> [(a,b,c)]
flattenRightTuples = fmap (flattenTuple . Right)


-- getProductMany :: [[Dynamic]] -> [Dynamic]
-- getProductMany [] = []
-- getProductMany (set1 : []) = set1
-- getProductMany (set1 : set2 : rest) =  getBinaryProduct set1 set2 : rest

testTriples =  flattenRightTuples $ ( getBinaryProduct ["c","d"] $  getBinaryProduct [1,2,3] ["a", "b"])

