
module Ionic.Popover where

import Prelude

import Literals.Undefined (Undefined)
import React.Basic (JSX, ReactComponent, element)
import React.Basic.Events (EventHandler)
import Untagged.Coercible (class Coercible, coerce)
import Untagged.Union (type (|+|))
    
    
type IonPopoverProps = {
    showBackdrop :: Boolean |+| Undefined,
    backdropDismiss :: Boolean |+| Undefined,
    translucent :: Boolean |+| Undefined,
    cssClass :: Array String |+| String |+| Undefined,
    event :: String |+| Undefined,
    delegate :: String |+| Undefined,
    animated :: Boolean |+| Undefined,
    mode :: String |+| Undefined,
    keyboardClose :: Boolean |+| Undefined,
    id :: String |+| Undefined,
    enterAnimation :: String |+| Undefined,
    leaveAnimation :: String |+| Undefined,
    children :: Array JSX |+| Undefined,
    isOpen :: Boolean |+| Undefined,
    onDidDismiss :: EventHandler |+| Undefined,
    onDidPresent :: EventHandler |+| Undefined,
    onWillDismiss :: EventHandler |+| Undefined,
    onWillPresent :: EventHandler |+| Undefined,
    key :: String |+| Number
}


foreign import _ionPopover :: ReactComponent IonPopoverProps

ionPopover :: forall r. Coercible r IonPopoverProps => r -> JSX
ionPopover = element _ionPopover <<< coerce

