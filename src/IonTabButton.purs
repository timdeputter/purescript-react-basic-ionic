
module Ionic.IonTabButton where

import Ionic.Basic (ionElement)
import Literals.Undefined (Undefined)
import React.Basic (JSX, ReactComponent)
import React.Basic.Events (EventHandler)
import Untagged.Coercible (class Coercible)
import Untagged.Union (type (|+|))
    
    
type IonTabButtonProps = {
    disabled :: Boolean |+| Undefined,
    download :: String |+| Undefined,
    href :: String |+| Undefined,
    layout :: String |+| Undefined,
    mode :: String |+| Undefined,
    rel :: String |+| Undefined,
    selected :: Boolean |+| Undefined,
    tab :: String |+| Undefined,
    target :: String |+| Undefined
}


foreign import _ionTabButton :: ReactComponent IonTabButtonProps

ionTabButton :: forall r. Coercible r IonTabButtonProps => r -> JSX
ionTabButton = ionElement _ionTabButton

