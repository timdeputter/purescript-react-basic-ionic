
module Ionic.Icon where

import Prelude

import Literals.Undefined (Undefined)
import React.Basic (JSX, ReactComponent, element)
import React.Basic.Events (EventHandler)
import Untagged.Coercible (class Coercible, coerce)
import Untagged.Union (type (|+|))
    
    
type IonIconProps = {
    class :: String |+| Undefined,
    className :: String |+| Undefined,
    style :: String |+| Undefined,
    ariaLabel :: String |+| Undefined,
    color :: String |+| Undefined,
    flipRtl :: Boolean |+| Undefined,
    icon :: String |+| Undefined,
    ios :: String |+| Undefined,
    lazy :: Boolean |+| Undefined,
    md :: String |+| Undefined,
    mode :: String |+| String |+| Undefined,
    name :: String |+| Undefined,
    size :: String |+| Undefined,
    src :: String |+| Undefined,
    key :: String |+| Number
}


foreign import _ionIcon :: ReactComponent IonIconProps

ionIcon :: forall r. Coercible r IonIconProps => r -> JSX
ionIcon = element _ionIcon <<< coerce

