{-# LANGUAGE DeriveFunctor #-}

module Ideation.Sketches.Sketch01  () where



newtype Person p = Person p deriving (Functor, Show)
newtype Job j = Job j deriving (Functor, Show)
data Employee p j e =  Employee (Person p) (Job j) e deriving (Functor, Show)

type Description = String

data Department p j e = Department Description  [Employee p j e]



