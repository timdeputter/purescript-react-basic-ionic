
module Ionic.IonPopover where

import Ionic.Basic (ionElement)
import Literals.Undefined (Undefined)
import React.Basic (JSX, ReactComponent)
import React.Basic.Events (EventHandler)
import Untagged.Coercible (class Coercible)
import Untagged.Union (type (|+|))
    
    
type IonPopoverProps = {
    showBackdrop :: Boolean |+| Undefined,
    backdropDismiss :: Boolean |+| Undefined,
    translucent :: Boolean |+| Undefined,
    cssClass :: String |+| Array String |+| Undefined,
    event :: String |+| Undefined,
    delegate :: String |+| Undefined,
    animated :: Boolean |+| Undefined,
    mode :: String |+| Undefined,
    keyboardClose :: Boolean |+| Undefined,
    id :: String |+| Undefined,
    enterAnimation :: String |+| Undefined,
    leaveAnimation :: String |+| Undefined,
    animated :: Boolean |+| Undefined,
    backdropDismiss :: Boolean |+| Undefined,
    component :: String |+| Undefined,
    componentProps :: String |+| Undefined,
    cssClass :: String |+| Array String |+| Undefined,
    delegate :: String |+| Undefined,
    dismiss: (data :: String |+| Undefined,
    enterAnimation :: String |+| Undefined,
    event :: String |+| Number |+| Boolean |+| (Array String) |+| (Array Boolean) |+| (Array Number) |+| Undefined,
    keyboardClose :: Boolean |+| Undefined,
    leaveAnimation :: String |+| Undefined,
    mode :: String |+| Undefined,
    onDidDismiss :: EventHandler |+| Undefined,
    onWillDismiss :: EventHandler |+| Undefined,
    overlayIndex :: Number |+| Undefined,
    present :: EventHandler |+| Undefined,
    showBackdrop :: Boolean |+| Undefined,
    translucent :: Boolean |+| Undefined,
    children :: Array JSX |+| Undefined,
    isOpen :: Boolean |+| Undefined,
    onDidDismiss :: EventHandler |+| Undefined,
    onDidPresent :: EventHandler |+| Undefined,
    onWillDismiss :: EventHandler |+| Undefined,
    onWillPresent :: EventHandler |+| Undefined,
    key :: String |+| Number |+| Undefined
}


foreign import _ionPopover :: ReactComponent IonPopoverProps

ionPopover :: forall r. Coercible r IonPopoverProps => r -> JSX
ionPopover = ionElement _ionPopover

ionPopover_ :: Array JSX -> JSX
ionPopover_ children = ionPopover {children}

