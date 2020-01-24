module CatProgCourse.Lecture05.DataBasics  (Person)  where


data Person  = Person  { firstName :: String
                     , lastName :: String
                     , age :: Int
                     , height :: Float
                     } deriving (Show)

frank = Person "Frank" "Miller" 62 5.9

data Author  = Author {
    authorPerson :: Person,
    booksWritten :: [String]
} deriving (Show)

frankAuth = Author frank ["The Dark Knight Returns"]