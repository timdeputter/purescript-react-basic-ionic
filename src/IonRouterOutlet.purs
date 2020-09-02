
module Ionic.RouterOutlet where

import Ionic.Basic (ionElement)
import Literals.Undefined (Undefined)
import React.Basic (JSX, ReactComponent)
import React.Basic.Events (EventHandler)
import Untagged.Coercible (class Coercible)
import Untagged.Union (type (|+|))
    
    
type IonRouterOutletProps = {
    children :: Array JSX |+| Undefined,
    class :: String |+| Undefined,
    className :: String |+| Undefined,
    style :: String |+| Undefined,
    animated :: Boolean |+| Undefined,
    animation :: String |+| Undefined,
    commit: (enteringEl: HTMLElement, leavingEl: HTMLElement | undefined, opts :: EventHandler |+| Undefined,
    delegate :: String |+| Undefined,
    getRouteId :: EventHandler |+| Undefined,
    mode :: String |+| Undefined,
    setRouteId: (id: string, params: ComponentProps | undefined, direction: RouterDirection, animation :: EventHandler |+| Undefined,
    swipeHandler :: String |+| Undefined,
    key :: String |+| Number |+| Undefined
}


foreign import _ionRouterOutlet :: ReactComponent IonRouterOutletProps

ionRouterOutlet :: forall r. Coercible r IonRouterOutletProps => r -> JSX
ionRouterOutlet = ionElement _ionRouterOutlet

ionRouterOutlet_ :: Array JSX -> JSX
ionRouterOutlet_ children = ionRouterOutlet {children}

