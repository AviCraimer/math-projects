module Milewski.Chap07 (myfmap)  where
-- data Maybe a = Nothing | Just a

-- f :: a -> b

-- f' ::  Maybe a -> Maybe b
-- f' Nothing = Nothing
-- f' (Just x) = Just (f x)


-- fmap generalizes over the relationship between f and f'
myfmap :: (a -> b) -> (Maybe a -> Maybe b)
myfmap _ Nothing = Nothing
myfmap f (Just x) = Just(f x)

class MyFunctor typeConstructor where
    fmap :: (a -> b) -> typeConstructor a -> typeConstructor b

instance MyFunctor Maybe where
    fmap _ Nothing = Nothing
    fmap f (Just x) = Just(f x)



