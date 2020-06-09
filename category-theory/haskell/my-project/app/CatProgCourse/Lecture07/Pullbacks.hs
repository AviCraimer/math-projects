module CatProgCourse.Lecture07.Pullbacks  () where
-- import Data.Set as Set
-- import qualified Data.Map as Map

-- type Character = String

-- type SabreWeilders = Set Character

-- type LightSabreColour =  String
-- type LightSabreColours = Set LightSabreColour


-- characters = fromList ["Darth Maul", "Obiwan", "Anikan", "Luke", "Rey", "Ezra", "Asoka", "Han", "Sabine", "Rex"] :: Set Character

-- type ForceUsers = Set Character
-- forceUsers = fromList ["Darth Maul", "Obiwan", "Anikan", "Luke", "Rey", "Ezra", "Asoka"] :: ForceUsers

-- type LightForceUsers = Set Character
-- lightForceUsers = fromList ["Obiwan", "Luke", "Rey", "Ezra", "Asoka"] :: LightForceUsers



-- sabreWeilders = fromList ["Darth Maul", "Obiwan", "Anikan", "Luke", "Rey", "Ezra", "Asoka"] :: SabreWeilders

-- lightSabreColour = fromList ["red", "yellow", "green", "blue", "black"] :: Set LightSabreColour


-- getColour :: SabreWeilders -> Character -> Maybe LightSabreColour
-- getColour sabreWeilders name = if (member name sabreWeilders) then  Map.lookup name characterSabreColour else Nothing where
--     characterSabreColour  = Map.fromList [("Darth Maul","red"), ("Obiwan","blue"), ("Anikan","red"), ("Luke","green"), ("Rey","yellow"), ("Ezra","green"), ("Asoka","yellow")] :: Map.Map Character LightSabreColour

-- getColourAll = getColour sabreWeilders

-- getColourLightSide = getColour (intersection lightForceUsers sabreWeilders)

-- type SetFunction =  (Set a) -> (Set b) ->  a  -> Maybe b

-- -- With added requirment that function implementation must check that a is in Set a, and return Nothing if not, and it must check if output is in Set b

-- setFunction :: Set a -> Set b ->  a ->  Maybe a ->  Maybe b


-- setMember :: Set a -> a -> Maybe a
-- setMember set el =  if (member el  set) then Just el else Nothing


-- setCodomain ::  Maybe a -> Maybe b ->  Set b -> Maybe



