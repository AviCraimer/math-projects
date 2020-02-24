module CatProgCourse.Lecture09.RecursiveDataTypes  ( testEx, evaluator) where
import Data.Void as Void
data Ex =
  Const Double
  | Var String
  | Plus Ex Ex
  | Times Ex Ex

-- data Ex1 a =
--   Const Double
--   | Var String
--   | Plus  (Ex a) (Ex a)
--   | Times  (Ex a) (Ex a)

-- data ExN  =  NextEx  (Ex1 Void) | NextEx (ExN)


-- type ExN =  Either (Ex1 Void)  (Ex1 ExN)

evaluator ::  Ex -> Double
evaluator (Const x) = x
evaluator (Var x) = 2
evaluator (Plus ex1 ex2) = evaluator (ex1) +  evaluator (ex2)
evaluator (Times ex1 ex2) = evaluator (ex1) * evaluator (ex2)

-- 2 x + 3
testEx = ((Const 2) `Times` (Var "x")) `Plus` Const 3





