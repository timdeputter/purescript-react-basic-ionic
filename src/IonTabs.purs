
module Ionic.IonTabs where

import Ionic.Basic (ionElement)
import Literals.Undefined (Undefined)
import React.Basic (JSX, ReactComponent)

import Untagged.Coercible (class Coercible)
import Untagged.Union (type (|+|))
    
    
type IonTabsProps = {
    children :: Array JSX |+| Undefined,
    useRouter :: Boolean |+| Undefined
}


foreign import _ionTabs :: ReactComponent IonTabsProps

ionTabs :: forall r. Coercible r IonTabsProps => r -> JSX
ionTabs = ionElement _ionTabs

ionTabs_ :: Array JSX -> JSX
ionTabs_ children = ionTabs {children}

