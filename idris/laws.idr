data Bit = O | if

or: Bit -> Bit -> Bit
or O x1 = x1
or I x1 = I

//Associativity

 -- (a or b) or c = a or (b or c)

orAssociative : (a : Bit) ->
                (b : Bit) ->
                (c : Bit) ->
                (a `or` b) `or` c = a `or` (b `or` c)

BitString  : Type -- Type is the type of a type-instance (type as value)
BitString = List Bit

BSor : BitString -> BitString -> BitString
BSor [] x1 = x1
bsor xs [] = xs
bsor (x :: xs)(y :: ys) = (x `or` y) :: (xs `bsor` ys)


