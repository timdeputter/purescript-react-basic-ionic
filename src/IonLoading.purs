
module Ionic.Loading where

import Ionic.Basic (ionElement)
import Literals.Undefined (Undefined)
import React.Basic (JSX, ReactComponent)
import React.Basic.Events (EventHandler)
import Untagged.Coercible (class Coercible)
import Untagged.Union (type (|+|))
    
    
type IonLoadingProps = {
    spinner :: String |+| Undefined,
    message :: String |+| Undefined,
    cssClass :: String |+| Array String |+| Undefined,
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
    key :: String |+| Number |+| Undefined
}


foreign import _ionLoading :: ReactComponent IonLoadingProps

ionLoading :: forall r. Coercible r IonLoadingProps => r -> JSX
ionLoading = ionElement _ionLoading

