module CatProgCourse.Lecture06.Products  (fnPair, hToFns, fn1, fn2, fn3, fn1', fn2', bimap,  reversePair, toLeftAssoc, toRightAssoc, myTuple ) where

data Pair a b = MkPair a b

myPair :: Pair String Char
myPair = MkPair "cat" 'a'

myTuple :: (String, Char)
myTuple = ("cat",'a')
-- We'll just use a 2-tuple for a pair instead of making a special data type.


fnPair  :: ((c -> a), (c->b)) -> (c-> (a, b) )
fnPair (f, g) = \c -> ( (f c), (g c) )
tuple = fnPair

hToFns  :: (c -> (a,b) ) -> ( (c->a), (c->b)  )
hToFns h = (fst.h, snd.h)
untuple = hToFns

fn1 :: String -> Int
fn1 str = length str

fn2 :: String -> Float
fn2 str = (fromIntegral (length str)) / 4.0

fn3 :: String -> (Int, Float)
fn3 = fnPair (fn1, fn2)

fn1' :: String -> Int
fn1' = fst  (hToFns fn3)

fn2' :: String -> Float
fn2' =  snd  (hToFns fn3)

bimap :: (a->a' , b->b') -> ( (a,b) -> (a',b')  )
bimap (f,g) = fnPair ((f.fst), (g.snd))


-- Exercises

-- Function  (a,b) -> (b,a)

reversePair :: (a,b) -> (b,a)
reversePair = fnPair (snd, fst)

-- a -> ((), a )  and  a -> (a, () )

toSnd ::  a ->  ((), a )
toSnd x = ((), x)


toFst ::  a -> ( a, () )
toFst x = (x, ())

-- (a, (b,c)) -> ((a,b),c   )
toLeftAssoc :: (a, (b,c)) -> ((a,b),c  )
-- toLeftAssoc (x, (y,z))  = ((x,y), z )
--It is easy to implement using pattern matching (above) , but from the diagram you can do it using function composition. This way puts it in direct correspondance with the category theory product diagram.
toLeftAssoc  =  fnPair (  fnPair (fst , fst.snd ), snd.snd   )


toRightAssoc :: ((a, b),c) -> (a,(b,c ) )
-- toRightAssoc ((x, y),z)  = (x, (y, z) )
toRightAssoc = fnPair (fst.fst,  fnPair (snd.fst, snd) )



-- data TripleFromPair a b c  = LeftAssoc  ((a,b),c) | RightAssoc (a,(b,c)) deriving (Show, Eq)
-- switchAssoc :: TripleFromPair a b c -> TripleFromPair a b c
-- switchAssoc (LeftAssoc triple) = RightAssoc (toRightAssoc triple)
-- switchAssoc (RightAssoc triple) = LeftAssoc (toLeftAssoc triple)
