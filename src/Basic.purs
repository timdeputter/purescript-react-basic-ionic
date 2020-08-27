module Ionic.Basic where

import Prelude
import React.Basic (JSX, ReactComponent, element)


ionElement :: forall r p. ReactComponent (Record p) -> r -> JSX
ionElement comp props = element comp $ unsafeTransformProps props

foreign import unsafeTransformProps :: forall a b. a -> Record (|b)