
module Ionic.Picker where

import Ionic.Basic (ionElement)
import Literals.Undefined (Undefined)
import React.Basic (JSX, ReactComponent)
import React.Basic.Events (EventHandler)
import Untagged.Coercible (class Coercible)
import Untagged.Union (type (|+|))
    
    
type IonPickerProps = {
    columns :: Array PickerColumn |+| Undefined,
    buttons :: Array PickerButton |+| Undefined,
    cssClass :: String |+| Array String |+| Undefined,
    showBackdrop :: Boolean |+| Undefined,
    backdropDismiss :: Boolean |+| Undefined,
    animated :: Boolean |+| Undefined,
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

type PickerColumnOption = {
    text :: String |+| Undefined,
    value :: String |+| Number |+| Boolean |+| (Array String) |+| (Array Boolean) |+| (Array Number) |+| Undefined,
    disabled :: Boolean |+| Undefined,
    duration :: Number |+| Undefined,
    transform :: String |+| Undefined,
    selected :: Boolean |+| Undefined
}

type PickerButton = {
    text :: String |+| Undefined,
    role :: String |+| Undefined,
    cssClass :: String |+| Array String |+| Undefined,
    handler :: EventHandler |+| Undefined
}

type PickerColumn = {
    name :: String |+| Undefined,
    align :: String |+| Undefined,
    selectedIndex :: Number |+| Undefined,
    prevSelected :: Number |+| Undefined,
    prefix :: String |+| Undefined,
    suffix :: String |+| Undefined,
    options :: Array PickerColumnOption |+| Undefined,
    cssClass :: String |+| Array String |+| Undefined,
    columnWidth :: String |+| Undefined,
    prefixWidth :: String |+| Undefined,
    suffixWidth :: String |+| Undefined,
    optionsWidth :: String |+| Undefined,
    refresh :: EventHandler |+| Undefined
}


foreign import _ionPicker :: ReactComponent IonPickerProps

ionPicker :: forall r. Coercible r IonPickerProps => r -> JSX
ionPicker = ionElement _ionPicker

