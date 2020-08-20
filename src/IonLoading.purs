
module Ionic where

import Prelude

import Literals.Undefined (Undefined)
import React.Basic (JSX, ReactComponent, element)
import React.Basic.Events (EventHandler)
import Untagged.Coercible (class Coercible, coerce)
import Untagged.Union (type (|+|))
    
    
type IonLoadingProps = {
    spinner :: String |+| String |+| Undefined,
    message :: String |+| String |+| Undefined,
    cssClass :: Array String |+| String |+| Undefined,
    showBackdrop :: Boolean |+| Undefined,
    duration :: Number |+| Undefined,
    translucent :: Boolean |+| Undefined,
    animated :: Boolean |+| Undefined,
    backdropDismiss :: Boolean |+| Undefined,
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


foreign import _ionLoading :: ReactComponent IonLoadingProps

ionLoading :: forall r. Coercible r IonLoadingProps => r -> JSX
ionLoading = element _ionLoading <<< coerce

