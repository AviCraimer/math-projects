-- type NatTrans f g = forall a. f a -> g a


-- Safe head is a natural transformation between the functor [] and the functor Maybe
safeHead :: [a] -> Maybe a
safeHead [] = Nothing
safeHead (a : _) = Just a

