module FunctorPractice (applyFmap1, applyFmap2, applyFmap3, applyFmap4 )  where

replaceWithX = const 'x'

lms = [Just "Hello", Nothing, Just "World"]

-- [Maybe [Char]]
-- List of Maybe of List of Char


applyFmap1 = replaceWithX lms -- 'x'  Replaces outer List with Char
applyFmap2 = fmap replaceWithX lms -- "xxx"  Replaces Maybe values inside outer list to make [Char]
applyFmap3 = (fmap . fmap) replaceWithX lms -- [Just 'x',Nothing,Just 'x']   Replaces the [Char] values inside Maybe
applyFmap4 = (fmap . fmap . fmap) replaceWithX lms
-- [Just "xxxxx",Nothing,Just "xxxxx"]
-- Replaces the Char values inside the String values inside Maybe values
