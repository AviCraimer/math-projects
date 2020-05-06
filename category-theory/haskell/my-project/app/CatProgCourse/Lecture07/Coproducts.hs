module CatProgCourse.Lecture07.Coproducts  (myEither, coBimap, coprodTestFn1,
coprodTestFn2, coBimapTest1, coBimapTest2, dist, undist ) where





myEither :: ( (a->x), (b->x) ) -> ((Either a b) -> x)
myEither (f,g) (Left a) = f a
myEither (f,g) (Right b) = g b

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


dist :: (a ,  Either b c) -> Either (a,b) (a,c)
dist (a , Left b )   = Left (a, b)
dist (a , Right c )   = Right (a, c)


undist :: Either (a,b) (a,c)  -> (a ,  Either b c)
undist (Left (a, b)) =  (a , Left b )
undist  (Right (a, c)) =  (a , Right c )