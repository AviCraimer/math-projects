-- data FinSet :  (a: Type) -> List a ->  Type where
--     FSet :   (list: List a)  -> FinSet a list

-- getSet : Prelude.Interfaces.Ord a => (list: List a) -> FinSet a (getUniques list)
-- getSet xs = FSet (getUniques xs)


data DynamicSet :  (a -> Bool)  -> Type where
    DSet : (membershipTest:  (a -> Bool) ) -> DynamicSet membershipTest

moreThanThreeWords : String -> Bool
moreThanThreeWords = (>3) . length . words

-- getPullback : (a -> Bool)