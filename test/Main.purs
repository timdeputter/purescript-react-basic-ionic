module Test.Main where

import Effect (Effect)
import Effect.Class.Console (log)
import Ionic.IonApp (ionApp)
import Ionic.IonButton (ionButton)
import Prelude (Unit, discard)

main :: Effect Unit
main = do
  let l = ionApp {color: "red", children: [
    ionButton {}
  ]}
  log "🍝"
  log "You should add some tests."
