{-# LANGUAGE DeriveFunctor #-}

module Ideation.Sketches.Sketch01  () where



-- newtype Person p = Person p deriving (Functor, Show)
-- newtype Job j = Job j deriving (Functor, Show)
-- data Employee p j e =  Employee (Person p) (Job j) e deriving (Functor, Show)

-- type Description = String

-- data Department p j e = Department Description  [Employee p j e]



-- module Ideation.Sketches.Sketch01 ()  where
--     import qualified Data.Set
--     import qualified Data.Map

--     type UniqueId = String

--     data Object a = Ob UniqueId a

--     instance Show Object where
--         show Ob id _ = id


--     data Morphism a =  Morpism  UniqueId  (Object a --> Object a)

--     instance Show Morphism where
--         show Morphism  id  (obj1 --> obj2)  = show obj1 ++ "-" ++ id ++ "->" ++ show obj2


-- -- If the string version is equal the morphisms are equal since it is assuemd the objects have a unique id
--     instance Eq Morphism where
--         m1 == m2 = show m1 == show m2


--     type Path = Either Morphism [Morphism] -- List of morphisms that are compatible to matchup tip to tail. In order from left to right.  [a-->b, b-->c]

--     type PathEquivalence =  Data.Set.Set Path   --A set of paths that are equivalent. They must match in their start and end points.

--     type MorphismString = String


--     data Category a  = Category (Data.Set.Set (Object  a) )  (Data.Map.Map Morphism PathEquivalence)

