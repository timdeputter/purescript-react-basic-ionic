
module Ionic where

import Prelude

import Literals.Undefined (Undefined)
import React.Basic (JSX, ReactComponent, element)
import React.Basic.Events (EventHandler)
import Untagged.Coercible (class Coercible, coerce)
import Untagged.Union (type (|+|))
    
    
type IonActionSheetProps = {
    header :: String |+| Undefined,
    subHeader :: String |+| Undefined,
    cssClass :: Array String |+| String |+| Undefined,
    buttons :: Array (ActionSheetButton |+| String) |+| Undefined,
    backdropDismiss :: Boolean |+| Undefined,
    translucent :: Boolean |+| Undefined,
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

type ActionSheetButton = {
    text :: String |+| Undefined,
    role :: String |+| String |+| String |+| String |+| Undefined,
    icon :: String |+| Undefined,
    cssClass :: Array String |+| String |+| Undefined,
    handler :: EventHandler |+| Undefined
}


foreign import _ionActionSheet :: ReactComponent IonActionSheetProps

ionActionSheet :: forall r. Coercible r IonActionSheetProps => r -> JSX
ionActionSheet = element _ionActionSheet <<< coerce

