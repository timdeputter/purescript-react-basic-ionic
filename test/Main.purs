module Test.Main where

import Prelude (Unit, discard)

import Effect (Effect)
import Effect.Class.Console (log)

main :: Effect Unit
main = do
  log "🍝"
  log "You should add some tests."
