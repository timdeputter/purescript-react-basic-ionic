
module Ionic.IonTabs where

import Ionic.Basic (ionElement)
import Literals.Undefined (Undefined)
import React.Basic (JSX, ReactComponent)
import React.Basic.Events (EventHandler)
import Untagged.Coercible (class Coercible)
import Untagged.Union (type (|+|))
    
    
type IonTabsProps = {
    children :: Array JSX |+| Undefined,
    getRouteId :: EventHandler |+| Undefined,
    getSelected :: EventHandler |+| Undefined,
    getTab :: String |+| Undefined,
    select :: String |+| Undefined,
    setRouteId :: String |+| Undefined,
    useRouter :: Boolean |+| Undefined
}


foreign import _ionTabs :: ReactComponent IonTabsProps

ionTabs :: forall r. Coercible r IonTabsProps => r -> JSX
ionTabs = ionElement _ionTabs

ionTabs_ :: Array JSX -> JSX
ionTabs_ children = ionTabs {children}

