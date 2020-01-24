module CatProgCourse.Lecture05.Svg  (makeCircle)  where
import CatProgCourse.Lecture05.LeafyTree

type Xcoord = Double
type Ycoord = Double
data Point = Point Xcoord Ycoord deriving (Show, Eq)
data CenterPoint = Center Point deriving (Show, Eq)

data Radius = Radius Double deriving (Show, Eq)
data Width = Width Double deriving (Show, Eq)
data Height = Height Double deriving (Show, Eq)
data Length = Length Double deriving (Show, Eq)

data Circle = Circle CenterPoint Radius deriving (Show, Eq)

data Rectangle = Rect CenterPoint Width Height deriving (Show, Eq)

type NumberOfSides = Int
type SideLength = Length
data RegularPolygon = Poly CenterPoint NumberOfSides SideLength deriving (Show, Eq)

makeCircle :: Xcoord -> Ycoord -> Double -> Circle
makeCircle x y r = Circle (Center (Point x y) ) (Radius r)



