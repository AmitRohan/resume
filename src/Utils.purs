module Utils where

import Prelude
import Data.Array
import Control.Monad.Eff
import Control.Monad.Aff (Aff, makeAff)
import Control.Monad.Eff.Exception (Error)
import Network.HTTP.StatusCode
import Network.HTTP.RequestHeader
import Data.HTTP.Method (Method(..))
import Data.Argonaut.Core as A
import Data.StrMap as StrMap
import Data.Tuple
import Control.Monad.Except.Trans

getMoonshotLocation = "http://moonshot.ap-south-1.elasticbeanstalk.com"


type State a = {screen :: String |a}
type AffError e = (Error -> Eff e Unit)
type AffSuccess s e = (s -> Eff e Unit)
type ApiResponse json = {status :: String, statusCode :: Int, response :: json}

foreign import _showUI :: forall e a b. (AffSuccess (State a) e) -> (AffError e) -> (State b) -> Boolean -> Eff e Unit
foreign import _callAPI :: forall e body header resultJson. (AffSuccess (ApiResponse resultJson) e) -> (AffError e) -> Method -> String -> body -> header -> Eff e Unit
foreign import _updateState :: forall a b c. a -> b -> c
foreign import toJson :: String -> A.Json
foreign import logAny :: forall a. a -> Unit
foreign import getRecord :: forall a b. a -> {|b}
foreign import sendUpdatedState :: forall a b.(State a)-> b
foreign import showToast :: forall a. a -> Unit
foreign import getSavedState :: forall a. a
foreign import setSavedState :: forall a. a -> Unit
foreign import getGuestLogin :: forall a b. a -> b

get path headers =
  makeAff(\error success -> _callAPI success error GET (getMoonshotLocation <> path) {} headers)

post path headers body =
  makeAff(\error success -> _callAPI success error POST (getMoonshotLocation <> path) body headers)

showUI screen state =
  let updatedState = state {screen = screen} in
  makeAff (\error success -> _showUI success error updatedState false)

updateState :: forall a b c. a -> b -> c
updateState currentState newState = do
  let state = _updateState currentState newState
      _     = setSavedState state 
  state
