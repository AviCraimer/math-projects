module CatProgCourse.Lecture11.FixCataAlgebra  (cata, Fix, fix,  unFix, Algebra, ExprF, evalExprF, recursiveEval, testExp1, testExp1Result) where


newtype Fix f = MkFix (f  (Fix f))  -- a = Fix f

unFix :: Fix f -> f (Fix f)
unFix (MkFix x) = x

fix :: f (Fix f) -> Fix f
fix x =  MkFix x

type Algebra f a = f a -> a
--             ^        ^
--           carrier   structure map


--      f(Fix f) ---fmap (cata alg) --> f a
--        ^ |                           |
--        | |                           |
--  unfix | | MkFix                     | alg
--        | |                           |
--        | |                           |
--        | v                           v
--        Fix f   ---- cata alg ------> a

cata :: Functor f => (f b -> b) -> Fix f -> b
cata alg = alg . fmap (cata alg) . unFix

-- One step at a time
-- 1. unFix - unraps the outer layer from MkFix
-- 2. fmap(cata alg) -  this recursively calls cata alg for every value inside the functor (using the functor's fmap definition). However,the "leaf" values do not have the functor type variable and therefore, the fmap cannot apply the functon to them. This is what stops the recursion. In other words you can define all the base cases for the recursion simply by defining values that don't use the functor's free type variable.
-- 3. alg - This applies the algebra to the now completely unwrapped functor value. This would be a tree of depth one. It completes the recursion with the final step that resolves the evaluation.


data ExprF a =
  Const Double
  | Plus a a
  | Times a a

instance Functor ExprF  where
  fmap g (Const x) = Const ( x) -- Error when I apply g to x here
  fmap g (Plus l r) = Plus (g l) ( g r)
  fmap g (Times l r) = Times (g l) (g r)


evalExprF ::  Algebra ExprF Double
-- This type signature is equiv to  ::  ExprF Double -> Double
evalExprF (Const x) = x
evalExprF (Plus x y) = x + y
evalExprF (Times x y ) = x * y

type Ex = Fix ExprF --  iso to (f (Fix f))  => ExprF (Fix Expr F)

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

-- Expanded this looks like:
-- MkFix ( Times (MkFix Const 2) (MkFix Plus (MkFix Const 4) (MkFix Const 6 )  )   )

testExp1Result = recursiveEval testExp1 -- 20.0