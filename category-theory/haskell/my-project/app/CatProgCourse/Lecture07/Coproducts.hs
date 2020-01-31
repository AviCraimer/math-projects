module CatProgCourse.Lecture07.Coproducts  (myEither, coBimap, coprodTestFn1,
coprodTestFn2, coBimapTest1, coBimapTest2 ) where

myEither :: ( (a->x), (b->x) ) -> ((Either a b) -> x)
myEither (f,g) (Left x) = f x
myEither (f,g) (Right y) = g y

coBimap :: ((c->c'),(d->d')) -> (Either c d) -> (Either c' d')
coBimap (f,g) = myEither (f',g') where
    f' = Left . f
    g' = Right . g

coprodTestFn1 :: Int -> [Int]
coprodTestFn1 n = [0..(abs  n)]

coprodTestFn2 :: String -> [String]
coprodTestFn2 str = [str, (str ++ str)]

coprodTestFnPair = (coprodTestFn1, coprodTestFn2)

coBimapTest1 =  h (Left 6)  where
    h = coBimap coprodTestFnPair

coBimapTest2 =  h (Right "Hi ")  where
    h = coBimap coprodTestFnPair

