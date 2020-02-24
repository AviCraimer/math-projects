module CatProgCourse.Lecture11.FixCataAlgebra  (cata, Fix, fix,  unFix, Algebra, ExprF, evalExprF, recursiveEval, testExp1, testExp1Result) where


newtype Fix f = MkFix (f (Fix f))

unFix :: Fix f -> f (Fix f)
unFix (MkFix x) = x

fix :: f (Fix f) -> Fix f
fix x =  MkFix x

type Algebra f a = f a -> a
--             ^        ^
--           carrier   structure map


--  f(Fix f) ---fmap (cata alg) --> f a
--      |                           |
--      |                           |
--      | MkFix                     | alg
--      |                           |
--      |                           |
--      v                           v
--    Fix f   ---- cata alg ------> a

cata :: Functor f => (f b -> b) -> Fix f -> b
cata alg = alg . fmap (cata alg) . unFix


data ExprF a =
  Const Double
  | Plus a a
  | Times a a

instance Functor ExprF  where
  fmap g (Const x) = Const (x) -- Error when I apply g to x here
  fmap g (Plus l r) = Plus (g l) ( g r)
  fmap g (Times l r) = Times (g l) (g r)


evalExprF ::  Algebra ExprF Double
-- This type signature is equiv to  ::  ExprF Double -> Double
evalExprF (Const x) = x
evalExprF (Plus x y) = x + y
evalExprF (Times x y ) = x * y

type Ex = Fix ExprF

-- Smart constructor functions.
num :: Double -> Ex
num x = MkFix (Const x)

add :: Ex -> Ex -> Ex
add ex1 ex2 = MkFix (Plus ex1 ex2)

mult :: Ex -> Ex -> Ex
mult ex1 ex2 = MkFix (Times ex1 ex2)

recursiveEval :: Ex -> Double
recursiveEval = cata evalExprF

testExp1 =  num 2 `mult`  add (num 4) (num 6) --  2 * (4 + 6)
testExp1Result = recursiveEval testExp1 -- 20.0