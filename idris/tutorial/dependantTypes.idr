import Data.Vect

-- Dependant type, Here we are calculating the type
natOrList : Bool -> Type
natOrList True = Nat
natOrList False = List Nat

--Now we use our type generating function in the type signature of another function!
mkSingle : (x : Bool) -> natOrList x
mkSingle True = 0
mkSingle False =  []

--Returns sum of list of Nats or nat itself
sum : (single : Bool) -> natOrList single -> Nat
sum True x = x
sum False [] = 0
sum False (x :: xs) = x + sum False xs


aVect : Vect 3 Nat
aVect = [1,2,3]



data MyVect : Nat -> Type -> Type where
    EmptyVect : MyVect Z a
    VectCons : a -> MyVect k a -> MyVect (S k) a
    -- This says, each time we add an element of the type a to the vector, the length of the vector does up one.

x : MyVect 2 String
x =    VectCons  "Dog" $  VectCons  "Cat"  EmptyVect

(++) : MyVect n a -> MyVect m a -> MyVect (n+m) a
(++) EmptyVect someVect = someVect
(++) (VectCons  x  xs) ys = VectCons x $ xs ++ ys




-- Dependant type examples from Type Driven Development
data PowerSource = Petrol | Pedal

data Vehicle : PowerSource -> Type where
    Bicycle: Vehicle Pedal
    Car: (fuel : Nat) -> Vehicle Petrol
    Bus: (fuel : Nat) -> Vehicle Petrol

-- data Fin : Nat -> Type where
--     FZ : Fin (S k)
--     FS : Fin k -> Fin (S k)


myToList : a -> List a
myToList x = [x]


getUniques : Prelude.Interfaces.Ord a => List a -> List a
getUniques list = sort (unions [] (toSingletonList list)) where
    toSingletonList : List a -> List (List a)
    toSingletonList = map myToList
    unions:  List a ->  List (List a) -> List a
    unions xs [] = xs
    unions xs  (y :: ys)   =  unions (union xs y) ys


data FinSet :  (a: Type) -> List a ->  Type where
    FSet :   (list: List a)  -> FinSet a list

getSet : Prelude.Interfaces.Ord a => (list: List a) -> FinSet a (getUniques list)
getSet xs = FSet (getUniques xs)


setToList : Ord a => FinSet a list -> List a
setToList (FSet list) = list

setUnion : Ord a => (set1:  FinSet a list1)  -> (set2:  FinSet a list2) ->  FinSet a (getUniques (list1 ++ list2 )  )
setUnion (FSet list1) (FSet list2) = FSet (getUniques (list1 ++ list2))

notEmpty : List String
notEmpty =  ["a"]


myLast :  (default: a) -> List a -> a
myLast default xs  =  unwrap (last' xs) where
    unwrap : Maybe a -> a
    unwrap Nothing  = default
    unwrap (Just a) = a


cycleList : List a -> List a
cycleList [] = []
cycleList (x :: xs) =  myLast x xs :: take (length (x :: xs) - 1) (x :: xs)


allCyclePositions : List a -> List (List a)
allCyclePositions [] = [[]]
allCyclePositions (x :: xs) = accum ([(x :: xs)] ) where
    accum : List (List a) -> List (List a)
    accum [] = []
    accum (list :: cyclePositions)  =
        if (length (list :: cyclePositions) == length list)
        then  (list :: cyclePositions)
        else ( accum (cycleList list  :: list :: cyclePositions))

mergeLists : List (List a) -> List a
mergeLists [] = []
mergeLists (list :: []) = list
mergeLists (list1 :: list2 :: tail) =  mergeLists ((list1 ++ list2) :: tail)


getPairs :  List a -> List b -> List (a, b)
getPairs [] [] = []
getPairs list1 list2 =  mergeLists  (map (zip list1) (allCyclePositions list2))


listToLefts : List a -> (b: Type) -> List (Either a b)
listToLefts list typeB  = (map Left) list

listToRights : (a: Type) ->  List b -> List (Either a b)
listToRights typeA list   = (map Right) list

disjointUnion :  {a:Type} -> {b:Type} ->  List a -> List b -> List (Either a b)
disjointUnion [] [] = []
disjointUnion {a} {b} list1 list2 = (listToLefts list1 b) ++ ( listToRights a list2)

setProduct : Ord (a,b) => (set1:  FinSet a list1) -> (set2:  FinSet b list2) -> FinSet (a,b) (sort $  getPairs list1 list2)
setProduct (FSet list1) (FSet list2) = FSet (sort $ getPairs list1 list2)

setCoproduct : (set1:  FinSet a list1) -> (set2:  FinSet b list2) -> FinSet (Either a b) (disjointUnion list1 list2)
setCoproduct (FSet list1) (FSet list2)  = FSet (disjointUnion list1 list2)

setA : FinSet String  ["a","b"]
setA = getSet  ["a","b", "b"]

setB : FinSet  String  ["a","c"]
setB = getSet ["a","c", "c"]

setAB : FinSet  (String,String)  [("a","c"),("b","c")]
setAB = getSet [("a","c"),("b","c")]

mapping : Eq a => Eq b => Eq (a,b)  =>  {els1: List a} -> {els2: List b} -> {pairs: List (a, b)} -> Ord (a,b) =>  (domain: FinSet a els1) -> (codomain: FinSet b els2) -> (FinSet (a,b) pairs) ->  Bool
mapping {els1} {els2} {pairs}  (FSet els1 ) (FSet els2) (FSet pairs) = isTotal where
    isTotal = (map fst pairs) ==  els1


getListProduct : List a -> List b  ->  List (a,b)
getListProduct list1 list2 = [(x,y) | x <- list1, y <- list2   ]


-- data Function : (domain: FinSet a elements1) -> (codomain: FinSet b elements2) -> (mapping: FinSet (a,b) elements3) -> Type where
--     Fn :


