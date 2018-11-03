module Types.Core where

import Prelude
import Data.Foreign.Class (class Decode, class Encode)
import Data.Foreign.Generic (defaultOptions, genericDecode, genericEncode)
import Data.Generic.Rep (class Generic)

type UserName = String
type Path = String
data SocketMsg = ActiveUser String | NotifyUser | SubscribeConsole UserName String String

derive instance genericSocketMsg :: Generic SocketMsg _
instance decodeSocketMsg :: Decode SocketMsg where
  decode x = genericDecode (defaultOptions { unwrapSingleConstructors = true }) x
instance encodeSocketMsg :: Encode SocketMsg where
  encode x = genericEncode (defaultOptions { unwrapSingleConstructors = true }) x
