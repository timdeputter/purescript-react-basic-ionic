
module Ionic.IonReactRouter where

import Ionic.Basic (ionElement)
import Literals.Undefined (Undefined)
import React.Basic (JSX, ReactComponent)
import React.Basic.Events (EventHandler)
import Untagged.Coercible (class Coercible)
import Untagged.Union (type (|+|))
    
    
type IonReactRouterProps = {
    children :: Array JSX |+| Undefined,
    basename :: String |+| Undefined,
    getUserConfirmation :: EventHandler |+| Undefined,
    forceRefresh :: Boolean |+| Undefined,
    keyLength :: Number |+| Undefined,
    history :: String |+| Undefined
}


foreign import _ionReactRouter :: ReactComponent IonReactRouterProps

ionReactRouter :: forall r. Coercible r IonReactRouterProps => r -> JSX
ionReactRouter = ionElement _ionReactRouter

ionReactRouter_ :: Array JSX -> JSX
ionReactRouter_ children = ionReactRouter {children}

