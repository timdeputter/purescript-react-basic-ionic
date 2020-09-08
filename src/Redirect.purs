
module Ionic.Redirect where

import Ionic.Basic (ionElement)
import Literals.Undefined (Undefined)
import React.Basic (JSX, ReactComponent)

import Untagged.Coercible (class Coercible)
import Untagged.Union (type (|+|))
    
    
type RedirectProps = {
to :: String |+| Undefined,
push :: Boolean |+| Undefined,
path :: String |+| Undefined,
exact :: Boolean |+| Undefined,
strict :: Boolean |+| Undefined,
from :: String |+| Undefined
}


foreign import _redirect :: ReactComponent RedirectProps

redirect :: forall r. Coercible r RedirectProps => r -> JSX
redirect = ionElement _redirect

