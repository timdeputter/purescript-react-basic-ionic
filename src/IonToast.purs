
module Ionic.IonToast where

import Ionic.Basic (ionElement)
import Literals.Undefined (Undefined)
import React.Basic (JSX, ReactComponent)
import React.Basic.Events (EventHandler)
import Untagged.Coercible (class Coercible)
import Untagged.Union (type (|+|))
    
    
type IonToastProps = {
    header :: String |+| Undefined,
    message :: String |+| Undefined,
    cssClass :: String |+| Array String |+| Undefined,
    duration :: Number |+| Undefined,
    buttons :: Array (ToastButton |+| String) |+| Undefined,
    position :: String |+| Undefined,
    translucent :: Boolean |+| Undefined,
    animated :: Boolean |+| Undefined,
    color :: String |+| Undefined,
    mode :: String |+| Undefined,
    keyboardClose :: Boolean |+| Undefined,
    id :: String |+| Undefined,
    enterAnimation :: String |+| Undefined,
    leaveAnimation :: String |+| Undefined,
    animated :: Boolean |+| Undefined,
    buttons :: Array (String) |+| Undefined,
    color :: String |+| Undefined,
    cssClass :: String |+| Array String |+| Undefined,
    dismiss: (data :: String |+| Undefined,
    duration :: Number |+| Undefined,
    enterAnimation :: String |+| Undefined,
    header :: String |+| Undefined,
    keyboardClose :: Boolean |+| Undefined,
    leaveAnimation :: String |+| Undefined,
    message :: String |+| Undefined,
    mode :: String |+| Undefined,
    onDidDismiss :: EventHandler |+| Undefined,
    onWillDismiss :: EventHandler |+| Undefined,
    overlayIndex :: Number |+| Undefined,
    position :: String |+| Undefined,
    present :: EventHandler |+| Undefined,
    translucent :: Boolean |+| Undefined,
    isOpen :: Boolean |+| Undefined,
    onDidDismiss :: EventHandler |+| Undefined,
    onDidPresent :: EventHandler |+| Undefined,
    onWillDismiss :: EventHandler |+| Undefined,
    onWillPresent :: EventHandler |+| Undefined,
    key :: String |+| Number |+| Undefined
}

type ToastButton = {
    text :: String |+| Undefined,
    icon :: String |+| Undefined,
    side :: String |+| Undefined,
    role :: String |+| Undefined,
    cssClass :: String |+| Array String |+| Undefined,
    handler :: EventHandler |+| Undefined
}


foreign import _ionToast :: ReactComponent IonToastProps

ionToast :: forall r. Coercible r IonToastProps => r -> JSX
ionToast = ionElement _ionToast

