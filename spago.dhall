{-
Welcome to a Spago project!
You can edit this file as you like.
-}
{ name = "react-basic-ionic"
, license = "MIT"
, repository = "https://github.com/timdeputter/purescript-react-basic-ionic"
, dependencies =
  [ "console", "effect", "psci-support", "react-basic-hooks", "untagged-union" ]
, packages = ./packages.dhall
, sources = [ "src/**/*.purs", "test/**/*.purs" ]
}
