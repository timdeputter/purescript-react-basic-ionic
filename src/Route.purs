
module Ionic.Route where

import Ionic.Basic (ionElement)
import Literals.Undefined (Undefined)
import React.Basic (JSX, ReactComponent)
import React.Basic.Events (EventHandler)
import Untagged.Coercible (class Coercible)
import Untagged.Union (type (|+|))
    
    
type RouteProps = {
path :: String |+| Undefined,
component :: (ReactComponent {}) |+| Undefined,
exact :: Boolean |+| Undefined
}


foreign import _route :: ReactComponent RouteProps

route :: forall r. Coercible r RouteProps => r -> JSX
route = ionElement _route

