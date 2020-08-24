
module Ionic.Toast where

import Prelude

import Literals.Undefined (Undefined)
import React.Basic (JSX, ReactComponent, element)
import React.Basic.Events (EventHandler)
import Untagged.Coercible (class Coercible, coerce)
import Untagged.Union (type (|+|))
    
    
type IonToastProps = {
    header :: String |+| Undefined,
    message :: String |+| String |+| Undefined,
    cssClass :: Array String |+| String |+| Undefined,
    duration :: Number |+| Undefined,
    buttons :: Array (ToastButton |+| String) |+| Undefined,
    position :: String |+| String |+| String |+| Undefined,
    translucent :: Boolean |+| Undefined,
    animated :: Boolean |+| Undefined,
    color :: String |+| Undefined,
    mode :: String |+| Undefined,
    keyboardClose :: Boolean |+| Undefined,
    id :: String |+| Undefined,
    enterAnimation :: String |+| Undefined,
    leaveAnimation :: String |+| Undefined,
    isOpen :: Boolean |+| Undefined,
    onDidDismiss :: EventHandler |+| Undefined,
    onDidPresent :: EventHandler |+| Undefined,
    onWillDismiss :: EventHandler |+| Undefined,
    onWillPresent :: EventHandler |+| Undefined,
    key :: String |+| Number
}

type ToastButton = {
    text :: String |+| Undefined,
    icon :: String |+| Undefined,
    side :: String |+| String |+| Undefined,
    role :: String |+| String |+| Undefined,
    cssClass :: Array String |+| String |+| Undefined,
    handler :: EventHandler |+| Undefined
}


foreign import _ionToast :: ReactComponent IonToastProps

ionToast :: forall r. Coercible r IonToastProps => r -> JSX
ionToast = element _ionToast <<< coerce

