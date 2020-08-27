
module Ionic.ActionSheet where

import Ionic.Basic (ionElement)
import Literals.Undefined (Undefined)
import React.Basic (JSX, ReactComponent)
import React.Basic.Events (EventHandler)
import Untagged.Coercible (class Coercible)
import Untagged.Union (type (|+|))
    
    
type IonActionSheetProps = {
    header :: String |+| Undefined,
    subHeader :: String |+| Undefined,
    cssClass :: String |+| Array String |+| Undefined,
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
    key :: String |+| Number |+| Undefined
}

type ActionSheetButton = {
    text :: String |+| Undefined,
    role :: String |+| Undefined,
    icon :: String |+| Undefined,
    cssClass :: String |+| Array String |+| Undefined,
    handler :: EventHandler |+| Undefined
}


foreign import _ionActionSheet :: ReactComponent IonActionSheetProps

ionActionSheet :: forall r. Coercible r IonActionSheetProps => r -> JSX
ionActionSheet = ionElement _ionActionSheet

ionActionSheet_ :: Array JSX -> JSX
ionActionSheet_ children = ionActionSheet {children}

