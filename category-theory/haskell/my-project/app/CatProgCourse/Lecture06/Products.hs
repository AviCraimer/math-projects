module CatProgCourse.Lecture06.Products  (fnsToH, hToFns, fn1, fn2, fn3, fn1', fn2', bimap,  reversePair, toLeftAssoc, toRightAssoc ) where

-- data Pair a b = MkPair a b
-- We'll just use a 2-tuple for a pair instead of making a special data type.

fnsToH  :: ((c -> a), (c->b)) -> (c-> (a, b) )
fnsToH (f, g) = \c -> ( (f c), (g c) )
tuple = fnsToH

hToFns  :: (c -> (a,b) ) -> ( (c->a), (c->b)  )
hToFns h = (fst.h, snd.h)
untuple = hToFns

fn1 :: String -> Int
fn1 str = length str

fn2 :: String -> Float
fn2 str = (fromIntegral (length str)) / 4.0

fn3 :: String -> (Int, Float)
fn3 = fnsToH (fn1, fn2)

fn1' :: String -> Int
fn1' = fst  (hToFns fn3)

fn2' :: String -> Float
fn2' =  snd  (hToFns fn3)

bimap :: (a->a' , b->b') -> ( (a,b) -> (a',b')  )
bimap (f,g) = fnsToH ((f.fst), (g.snd))


-- Exercises

-- Function  (a,b) -> (b,a)

reversePair :: (a,b) -> (b,a)
reversePair = fnsToH (snd, fst)

-- a -> ((), a )  and  a -> (a, () )

toSnd ::  a ->  ((), a )
toSnd x = ((), x)


toFst ::  a -> ( a, () )
toFst x = (x, ())

-- (a, (b,c)) -> ((a,b),c   )
toLeftAssoc :: (a, (b,c)) -> ((a,b),c  )
-- toLeftAssoc (x, (y,z))  = ((x,y), z )
--It is easy to implement using pattern matching (above) , but from the diagram you can do it using function composition. This way puts it in direct correspondance with the category theory product diagram.
toLeftAssoc  =  fnsToH (  fnsToH (fst , fst.snd ), snd.snd   )


toRightAssoc :: ((a, b),c) -> (a,(b,c ) )
-- toRightAssoc ((x, y),z)  = (x, (y, z) )
toRightAssoc = fnsToH (fst.fst,  fnsToH (snd.fst, snd) )



-- data TripleFromPair a b c  = LeftAssoc  ((a,b),c) | RightAssoc (a,(b,c)) deriving (Show, Eq)
-- switchAssoc :: TripleFromPair a b c -> TripleFromPair a b c
-- switchAssoc (LeftAssoc triple) = RightAssoc (toRightAssoc triple)
-- switchAssoc (RightAssoc triple) = LeftAssoc (toLeftAssoc triple)
