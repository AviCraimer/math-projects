module CatProgCourse.Lecture07.ExponentialObjs  (curry1, curry2, eval, exponentialTranspose1, exponentialTranspose2) where
import CatProgCourse.Lecture06.Products
curry1 ::  ((a,b) -> c) -> (a->b->c)
curry2 ::  ((a,b) -> c) -> (a->b->c)


-- Three equivalent ways to implement curry.
-- The first using lambda notation
curry1 f = \a -> (\b -> (f(a,b)) )

-- The second using pattern matching
(curry2 f) a b = f(a,b)


-- Universal Property Diagram for Exponential Objects

--                gHat
-- (c, a)  ---------------> (a->b, a)
--   |                     /
--   |                    /
--   |                   /
--   | g                /  eval
--   |                 /
--   |                /
--   V               /
--   b  <-----------/

-- In the universal property diagram, there is an arrow "eval".
type Eval a b = ((a->b),a) -> b
eval :: Eval a b
eval (f, a) = f a

-- A function g of type G goes from a product to any type
type G a b c  = (c, a) -> b

--  A function GHat goes from the same product to the product of the exponential object with the second type in the original prodcut.
type GHat a b c  = (c,a) -> (a -> b, a)


-- Given any function g in the diagram above we can find a unique function gHat (univesal property of exponential objects)
exponentialTranspose1 ::  (G a b c -> GHat a b c )
exponentialTranspose1 g  = gHat where
    gHat =  bimap ( (curry  g), id )

-- From this we can also see that the left side of the bimap is just the curried version of g. This is why the universal property of exponential objects is so closely linked with the concept of currying.
-- The interesting this is that from a categorical point of view, currying is used to define exponential objects (which is the type that contains all functions from type a to b), rather than the other way around.

-- This is also reversable, and hence the transpose functions are isomorphisms between functions that go directly from products and functions that go through the exponential object.
exponentialTranspose2 ::  (GHat a b c  -> G a b c  )
exponentialTranspose2 gHat = eval . gHat

-- Now we can state the definition of the exponential object in category theory
-- An exponential object is an object b^a such that exponentialTranspose1 and exponentialTranspose2 are valid for every type c, and all functions of the form G and GHat  (as those function types are defined above).

