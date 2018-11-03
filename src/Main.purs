module Main where

import Prelude
import Control.Alt ((<|>))
import Control.Monad.Aff (Aff, ParAff(..), launchAff, makeAff)
import Control.Monad.Eff.Class (liftEff)
import Control.Monad.Eff.Console (CONSOLE, log)
import Control.Monad.Except (runExcept)
import Data.Either (Either(..))
import Data.Foreign.Generic (decodeJSON, encodeJSON)
import Data.Function.Uncurried (runFn1, runFn2)
import Data.Maybe (Maybe(..))
import Data.String (Pattern(..), stripPrefix)
import Prelude (bind, discard, pure, unit, ($), (<>))
import Utils (logAny, post, showUI, updateState, getRecord, sendUpdatedState, showToast, getSavedState, getGuestLogin)

init state = do
  _ <- showUI "INIT_UI" {screen: "INIT"}
  handleStateChange (getGuestLogin {})

handleStateChange state = do
  case state.action of
    "INIT_UI"             -> showUI state.action state >>= handleStateChange
    "HOME"                -> (loadScreenFromState $ updateState state {screen: "MyResumeScreen"}) >>= handleStateChange
    _                     -> liftEff $ log $ "Action yet to be implemented " <> state.action


loadScreenFromState state = do
  state <- showUI state.screen state
  pure $ state

main = launchAff $ init (getSavedState)
