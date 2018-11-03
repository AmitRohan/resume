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
import Types.Core (SocketMsg(..))
import Utils (logAny, post, showUI, updateState, getRecord, sendUpdatedState, showToast, getSavedState, getGuestLogin)

init state = do
  _ <- showUI "INIT_UI" {screen: "INIT"}
  handleStateChange (getGuestLogin {})

handleStateChange state = do
  case state.action of
    "INIT_UI"             -> showUI state.action state >>= handleStateChange
    "HOME"                -> (loginFlow $ updateState state {screen: "MyResumeScreen"}) >>= handleStateChange
    _                     -> liftEff $ log $ "Action yet to be implemented " <> state.action


loginFlow state = do
  state <- showUI state.screen state
  pure $ state



getParAff state =
  let uiAff = ParAff $ showUI state.screen state
      -- wsReceiver = ParAff $ fromSocket
      ParAff a = uiAff -- <|> wsReceiver
      in a


main = launchAff $ init (getSavedState)
