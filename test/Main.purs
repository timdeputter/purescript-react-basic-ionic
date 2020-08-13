module Test.Main where

import Prelude (Unit, discard, (==))
import Untagged.Coercible (class Coercible)

import Effect (Effect)
import Effect.Class.Console (log)

main :: Effect Unit
main = do
  log "🍝"
  log "You should add some tests."

figo :: Number -> Boolean
figo n = n == 3.0

data Figo = Figo

instance coercibleFigoString  :: Coercible Figo String
