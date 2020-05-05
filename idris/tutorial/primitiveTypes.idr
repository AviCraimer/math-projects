module Main

x : Int
x = 42

foo : String
foo = "Blah"

bar: Char
bar = 't'

quux : Bool
quux = False


data MyNat = Z | S MyNat

getNext : MyNat -> MyNat
getNext n = S n

zero : MyNat
zero = Z

myPlus : Nat -> Nat -> Nat
myPlus Z y = y
myPlus (S k) y = S (plus k y)

myReverse : List a -> List a
myReverse xs = reverseAccumulator [] xs where
    reverseAccumulator : List a -> List a -> List a
    reverseAccumulator acc [] = acc
    reverseAccumulator acc (x :: xs) = reverseAccumulator (x :: acc) xs

-- This is a crazy example of intertwined function definition
even : Nat -> Bool
even Z = True
even (S k) = odd k where
    odd Z = False
    odd (S k) = even k


main : IO ()
main = putStrLn  "Hello world"