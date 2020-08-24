
module Ionic.Modal where

import Prelude

import Literals.Undefined (Undefined)
import React.Basic (JSX, ReactComponent, element)
import React.Basic.Events (EventHandler)
import Untagged.Coercible (class Coercible, coerce)
import Untagged.Union (type (|+|))
    
    
type IonModalProps = {
    presentingElement :: String |+| Undefined,
    showBackdrop :: Boolean |+| Undefined,
    backdropDismiss :: Boolean |+| Undefined,
    cssClass :: Array String |+| String |+| Undefined,
    delegate :: String |+| Undefined,
    animated :: Boolean |+| Undefined,
    swipeToClose :: Boolean |+| Undefined,
    mode :: String |+| Undefined,
    keyboardClose :: Boolean |+| Undefined,
    id :: String |+| Undefined,
    enterAnimation :: String |+| Undefined,
    leaveAnimation :: String |+| Undefined,
    key :: String |+| Number
}


foreign import _ionModal :: ReactComponent IonModalProps

ionModal :: forall r. Coercible r IonModalProps => r -> JSX
ionModal = element _ionModal <<< coerce

