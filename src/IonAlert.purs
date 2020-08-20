
module Ionic where

import Prelude

import Literals.Undefined (Undefined)
import React.Basic (JSX, ReactComponent, element)
import React.Basic.Events (EventHandler)
import Untagged.Coercible (class Coercible, coerce)
import Untagged.Union (type (|+|))
    
    
type AlertButton = {
    text :: String |+| Undefined,
    role :: String |+| Undefined,
    cssClass :: Array String |+| String |+| Undefined,
    handler :: EventHandler |+| Undefined
}

type AlertInputAttributes = {
type AlertTextareaAttributes = {
    accept :: String |+| Undefined,
    allowdirs :: Boolean |+| Undefined,
    alt :: String |+| Undefined,
    autoCapitalize :: String |+| Number |+| Boolean |+| (Array String) |+| (Array Boolean) |+| (Array Number) |+| Undefined,
    autocapitalize :: String |+| Number |+| Boolean |+| (Array String) |+| (Array Boolean) |+| (Array Number) |+| Undefined,
    autoComplete :: String |+| Undefined,
    autocomplete :: String |+| Undefined,
    autoFocus :: Boolean |+| Undefined,
    autofocus :: Boolean |+| String |+| Undefined,
    capture :: String |+| Undefined,
    checked :: Boolean |+| Undefined,
    crossOrigin :: String |+| Undefined,
    crossorigin :: String |+| Undefined,
    defaultChecked :: Boolean |+| Undefined,
    defaultValue :: String |+| Undefined,
    dirName :: String |+| Undefined,
    disabled :: Boolean |+| Undefined,
    files :: String |+| Number |+| Boolean |+| (Array String) |+| (Array Boolean) |+| (Array Number) |+| Undefined,
    form :: String |+| Undefined,
    formAction :: String |+| Undefined,
    formaction :: String |+| Undefined,
    formEncType :: String |+| Undefined,
    formenctype :: String |+| Undefined,
    formMethod :: String |+| Undefined,
    formmethod :: String |+| Undefined,
    formNoValidate :: Boolean |+| Undefined,
    formnovalidate :: Boolean |+| Undefined,
    formTarget :: String |+| Undefined,
    formtarget :: String |+| Undefined,
    height :: Number |+| String |+| Undefined,
    indeterminate :: Boolean |+| Undefined,
    list :: String |+| Undefined,
    max :: Number |+| String |+| Undefined,
    maxLength :: Number |+| Undefined,
    maxlength :: Number |+| String |+| Undefined,
    min :: Number |+| String |+| Undefined,
    minLength :: Number |+| Undefined,
    minlength :: Number |+| String |+| Undefined,
    multiple :: Boolean |+| Undefined,
    name :: String |+| Undefined,
    pattern :: String |+| Undefined,
    placeholder :: String |+| Undefined,
    readOnly :: Boolean |+| Undefined,
    readonly :: Boolean |+| String |+| Undefined,
    required :: Boolean |+| Undefined,
    selectionStart :: Number |+| String |+| Undefined,
    selectionEnd :: Number |+| String |+| Undefined,
    selectionDirection :: String |+| Undefined,
    size :: Number |+| Undefined,
    src :: String |+| Undefined,
    step :: Number |+| String |+| Undefined,
    type :: String |+| Undefined,
    value :: String |+| Array String |+| Number |+| Undefined,
    valueAsDate :: String |+| Number |+| Boolean |+| (Array String) |+| (Array Boolean) |+| (Array Number) |+| Undefined,
    valueAsNumber :: String |+| Number |+| Boolean |+| (Array String) |+| (Array Boolean) |+| (Array Number) |+| Undefined,
    webkitdirectory :: Boolean |+| Undefined,
    webkitEntries :: String |+| Number |+| Boolean |+| (Array String) |+| (Array Boolean) |+| (Array Number) |+| Undefined,
    width :: Number |+| String |+| Undefined
    autoFocus :: Boolean |+| Undefined,
    autofocus :: Boolean |+| String |+| Undefined,
    cols :: Number |+| Undefined,
    disabled :: Boolean |+| Undefined,
    form :: String |+| Undefined,
    maxLength :: Number |+| Undefined,
    maxlength :: Number |+| String |+| Undefined,
    minLength :: Number |+| Undefined,
    minlength :: Number |+| String |+| Undefined,
    name :: String |+| Undefined,
    placeholder :: String |+| Undefined,
    readOnly :: Boolean |+| Undefined,
    readonly :: Boolean |+| String |+| Undefined,
    required :: Boolean |+| Undefined,
    rows :: Number |+| Undefined,
    value :: String |+| Array String |+| Number |+| Undefined,
    wrap :: String |+| Undefined
}

}

type AlertInput = {
    type :: String |+| String |+| String |+| String |+| Undefined,
    name :: String |+| Undefined,
    placeholder :: String |+| Undefined,
    value :: String |+| Number |+| Boolean |+| (Array String) |+| (Array Boolean) |+| (Array Number) |+| Undefined,
    label :: String |+| Undefined,
    checked :: Boolean |+| Undefined,
    disabled :: Boolean |+| Undefined,
    id :: String |+| Undefined,
    handler :: EventHandler |+| Undefined,
    min :: String |+| Number |+| Undefined,
    max :: String |+| Number |+| Undefined,
    cssClass :: Array String |+| String |+| Undefined,
    attributes :: AlertInputAttributes |+| AlertTextareaAttributes |+| Undefined
}

type IonAlertProps = {

foreign import _ionAlert :: ReactComponent IonAlertProps

ionAlert :: forall r. Coercible r IonAlertProps => r -> JSX
ionAlert = element _ionAlert <<< coerce

    header :: String |+| Undefined,
    subHeader :: String |+| Undefined,
    message :: String |+| String |+| Undefined,
    cssClass :: Array String |+| String |+| Undefined,
    inputs :: Array AlertInput |+| Undefined,
    buttons :: Array (AlertButton |+| String) |+| Undefined,
    backdropDismiss :: Boolean |+| Undefined,
    translucent :: Boolean |+| Undefined,
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
    key :: String |+| Number
}

