
module Ionic.IonModal where

import Ionic.Basic (ionElement)
import Literals.Undefined (Undefined)
import React.Basic (JSX, ReactComponent)
import React.Basic.Events (EventHandler)
import Untagged.Coercible (class Coercible)
import Untagged.Union (type (|+|))
    
    
type IonModalProps = {
    presentingElement :: String |+| Undefined,
    showBackdrop :: Boolean |+| Undefined,
    backdropDismiss :: Boolean |+| Undefined,
    cssClass :: String |+| Array String |+| Undefined,
    delegate :: String |+| Undefined,
    animated :: Boolean |+| Undefined,
    swipeToClose :: Boolean |+| Undefined,
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
    keyboardClose :: Boolean |+| Undefined,
    leaveAnimation :: String |+| Undefined,
    mode :: String |+| Undefined,
    onDidDismiss :: EventHandler |+| Undefined,
    onWillDismiss :: EventHandler |+| Undefined,
    overlayIndex :: Number |+| Undefined,
    present :: EventHandler |+| Undefined,
    presentingElement :: String |+| Undefined,
    showBackdrop :: Boolean |+| Undefined,
    swipeToClose :: Boolean |+| Undefined,
    children :: Array JSX |+| Undefined,
    isOpen :: Boolean |+| Undefined,
    onDidDismiss :: EventHandler |+| Undefined,
    onDidPresent :: EventHandler |+| Undefined,
    onWillDismiss :: EventHandler |+| Undefined,
    onWillPresent :: EventHandler |+| Undefined,
    key :: String |+| Number |+| Undefined
}


foreign import _ionModal :: ReactComponent IonModalProps

ionModal :: forall r. Coercible r IonModalProps => r -> JSX
ionModal = ionElement _ionModal

ionModal_ :: Array JSX -> JSX
ionModal_ children = ionModal {children}

