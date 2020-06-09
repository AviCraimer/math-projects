{-# LANGUAGE MultiParamTypeClasses #-}
module BartoszCourse.Part1.Lecture07.BifunctorsProfunctors (Contravariant, Bifunctor, pair, testFn1, testFn2, testFn3, testFn4, result, testDimap ) where
--testFn1, testFn2, testFn3
import Data.Bifunctor
import Data.Functor.Contravariant

data Pair a b = Pair a b deriving Show

pair :: a -> b -> Pair a b
pair a b = Pair a b

fnPair  :: (c -> a) -> (c->b) -> (c-> Pair a b)
fnPair f g = \c -> Pair  (f c) (g c)
tuple = fnPair

myFst (Pair x y) = x
mySnd (Pair x y) = y


-- bimap :: (a->a' , b->b') -> ( (a,b) -> (a',b')  )
-- bimap (f,g) = fnPair ((f.fst), (g.snd))

instance Bifunctor Pair where
  -- bimap :: (a -> b) -> (c -> d) -> p a c -> p b d
  bimap f g = fnPair  (f.myFst) (g.mySnd)




data Reader  c a = Reader (c -> a)
data ReaderOp c a  = ReaderOp (a -> c)

instance Functor (Reader c) where
  fmap f (Reader g ) = Reader (f . g)

instance Contravariant (ReaderOp c) where
  contramap f (ReaderOp g) = ReaderOp (g . f)

class Profunctor p where
  -- f :: Contravariant f => f
  -- g :: Functor g => g
  dimap :: (a' -> a) -> (b -> b') -> p a b -> p a' b'
  dimap f g = lmap f . rmap g
  lmap :: (a' -> a) -> p a b -> p a' b
  lmap f = dimap f id
  rmap :: (b -> b') -> p a' b -> p a' b'
  rmap g = dimap id g

instance Profunctor (->) where
  dimap f g = flip (.) f . (.) g
  lmap f g = g . f
  rmap f g = f . g

  testFn1  ::  Int -> [Int]
  testFn1 = take 3 . repeat

  testFn2 :: String -> [String]
  testFn2 = take 7 . repeat

  testFn3 :: Pair Int String -> Pair [Int] [String]
  testFn3 =  bimap testFn1 testFn2

  -- used for testing dimap
  testFn4 :: [Int] -> String
  testFn4 = foldr ((++) . show) ""


testDimap :: Int -> [String]
testDimap = dimap testFn1 testFn2 testFn4


--Testing pairs
p :: Pair Int String
p = Pair 7 "car"

result =  bimap testFn1 testFn2 p