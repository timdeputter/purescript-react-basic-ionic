
module Ionic.IonIcon where

import Ionic.Basic (ionElement)
import Literals.Undefined (Undefined)
import React.Basic (JSX, ReactComponent)
import React.Basic.Events (EventHandler)
import Untagged.Coercible (class Coercible)
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
    mode :: String |+| Undefined,
    name :: String |+| Undefined,
    size :: String |+| Undefined,
    src :: String |+| Undefined,
    defaultChecked :: Boolean |+| Undefined,
    defaultValue :: String |+| Number |+| (Array String) |+| Undefined,
    suppressContentEditableWarning :: Boolean |+| Undefined,
    suppressHydrationWarning :: Boolean |+| Undefined,
    accessKey :: String |+| Undefined,
    className :: String |+| Undefined,
    contentEditable :: Boolean |+| String |+| Undefined,
    contextMenu :: String |+| Undefined,
    dir :: String |+| Undefined,
    draggable :: Boolean |+| Undefined,
    hidden :: Boolean |+| Undefined,
    id :: String |+| Undefined,
    lang :: String |+| Undefined,
    placeholder :: String |+| Undefined,
    slot :: String |+| Undefined,
    spellCheck :: Boolean |+| Undefined,
    tabIndex :: Number |+| Undefined,
    title :: String |+| Undefined,
    translate :: String |+| Undefined,
    radioGroup :: String |+| Undefined,
    role :: String |+| Undefined,
    about :: String |+| Undefined,
    datatype :: String |+| Undefined,
    inlist :: String |+| Number |+| Boolean |+| (Array String) |+| (Array Boolean) |+| (Array Number) |+| Undefined,
    prefix :: String |+| Undefined,
    property :: String |+| Undefined,
    resource :: String |+| Undefined,
    typeof :: String |+| Undefined,
    vocab :: String |+| Undefined,
    autoCapitalize :: String |+| Undefined,
    autoCorrect :: String |+| Undefined,
    autoSave :: String |+| Undefined,
    color :: String |+| Undefined,
    itemProp :: String |+| Undefined,
    itemScope :: Boolean |+| Undefined,
    itemType :: String |+| Undefined,
    itemID :: String |+| Undefined,
    itemRef :: String |+| Undefined,
    results :: Number |+| Undefined,
    security :: String |+| Undefined,
    unselectable :: String |+| Undefined,
    inputMode :: String |+| Undefined,
    is :: String |+| Undefined,
    children :: Array JSX |+| Undefined,
    dangerouslySetInnerHTML :: String |+| Undefined,
    onCopy :: EventHandler |+| Undefined,
    onCopyCapture :: EventHandler |+| Undefined,
    onCut :: EventHandler |+| Undefined,
    onCutCapture :: EventHandler |+| Undefined,
    onPaste :: EventHandler |+| Undefined,
    onPasteCapture :: EventHandler |+| Undefined,
    onCompositionEnd :: EventHandler |+| Undefined,
    onCompositionEndCapture :: EventHandler |+| Undefined,
    onCompositionStart :: EventHandler |+| Undefined,
    onCompositionStartCapture :: EventHandler |+| Undefined,
    onCompositionUpdate :: EventHandler |+| Undefined,
    onCompositionUpdateCapture :: EventHandler |+| Undefined,
    onFocus :: EventHandler |+| Undefined,
    onFocusCapture :: EventHandler |+| Undefined,
    onBlur :: EventHandler |+| Undefined,
    onBlurCapture :: EventHandler |+| Undefined,
    onChange :: EventHandler |+| Undefined,
    onChangeCapture :: EventHandler |+| Undefined,
    onBeforeInput :: EventHandler |+| Undefined,
    onBeforeInputCapture :: EventHandler |+| Undefined,
    onInput :: EventHandler |+| Undefined,
    onInputCapture :: EventHandler |+| Undefined,
    onReset :: EventHandler |+| Undefined,
    onResetCapture :: EventHandler |+| Undefined,
    onSubmit :: EventHandler |+| Undefined,
    onSubmitCapture :: EventHandler |+| Undefined,
    onInvalid :: EventHandler |+| Undefined,
    onInvalidCapture :: EventHandler |+| Undefined,
    onLoad :: EventHandler |+| Undefined,
    onLoadCapture :: EventHandler |+| Undefined,
    onError :: EventHandler |+| Undefined,
    onErrorCapture :: EventHandler |+| Undefined,
    onKeyDown :: EventHandler |+| Undefined,
    onKeyDownCapture :: EventHandler |+| Undefined,
    onKeyPress :: EventHandler |+| Undefined,
    onKeyPressCapture :: EventHandler |+| Undefined,
    onKeyUp :: EventHandler |+| Undefined,
    onKeyUpCapture :: EventHandler |+| Undefined,
    onAbort :: EventHandler |+| Undefined,
    onAbortCapture :: EventHandler |+| Undefined,
    onCanPlay :: EventHandler |+| Undefined,
    onCanPlayCapture :: EventHandler |+| Undefined,
    onCanPlayThrough :: EventHandler |+| Undefined,
    onCanPlayThroughCapture :: EventHandler |+| Undefined,
    onDurationChange :: EventHandler |+| Undefined,
    onDurationChangeCapture :: EventHandler |+| Undefined,
    onEmptied :: EventHandler |+| Undefined,
    onEmptiedCapture :: EventHandler |+| Undefined,
    onEncrypted :: EventHandler |+| Undefined,
    onEncryptedCapture :: EventHandler |+| Undefined,
    onEnded :: EventHandler |+| Undefined,
    onEndedCapture :: EventHandler |+| Undefined,
    onLoadedData :: EventHandler |+| Undefined,
    onLoadedDataCapture :: EventHandler |+| Undefined,
    onLoadedMetadata :: EventHandler |+| Undefined,
    onLoadedMetadataCapture :: EventHandler |+| Undefined,
    onLoadStart :: EventHandler |+| Undefined,
    onLoadStartCapture :: EventHandler |+| Undefined,
    onPause :: EventHandler |+| Undefined,
    onPauseCapture :: EventHandler |+| Undefined,
    onPlay :: EventHandler |+| Undefined,
    onPlayCapture :: EventHandler |+| Undefined,
    onPlaying :: EventHandler |+| Undefined,
    onPlayingCapture :: EventHandler |+| Undefined,
    onProgress :: EventHandler |+| Undefined,
    onProgressCapture :: EventHandler |+| Undefined,
    onRateChange :: EventHandler |+| Undefined,
    onRateChangeCapture :: EventHandler |+| Undefined,
    onSeeked :: EventHandler |+| Undefined,
    onSeekedCapture :: EventHandler |+| Undefined,
    onSeeking :: EventHandler |+| Undefined,
    onSeekingCapture :: EventHandler |+| Undefined,
    onStalled :: EventHandler |+| Undefined,
    onStalledCapture :: EventHandler |+| Undefined,
    onSuspend :: EventHandler |+| Undefined,
    onSuspendCapture :: EventHandler |+| Undefined,
    onTimeUpdate :: EventHandler |+| Undefined,
    onTimeUpdateCapture :: EventHandler |+| Undefined,
    onVolumeChange :: EventHandler |+| Undefined,
    onVolumeChangeCapture :: EventHandler |+| Undefined,
    onWaiting :: EventHandler |+| Undefined,
    onWaitingCapture :: EventHandler |+| Undefined,
    onAuxClick :: EventHandler |+| Undefined,
    onAuxClickCapture :: EventHandler |+| Undefined,
    onClick :: EventHandler |+| Undefined,
    onClickCapture :: EventHandler |+| Undefined,
    onContextMenu :: EventHandler |+| Undefined,
    onContextMenuCapture :: EventHandler |+| Undefined,
    onDoubleClick :: EventHandler |+| Undefined,
    onDoubleClickCapture :: EventHandler |+| Undefined,
    onDrag :: EventHandler |+| Undefined,
    onDragCapture :: EventHandler |+| Undefined,
    onDragEnd :: EventHandler |+| Undefined,
    onDragEndCapture :: EventHandler |+| Undefined,
    onDragEnter :: EventHandler |+| Undefined,
    onDragEnterCapture :: EventHandler |+| Undefined,
    onDragExit :: EventHandler |+| Undefined,
    onDragExitCapture :: EventHandler |+| Undefined,
    onDragLeave :: EventHandler |+| Undefined,
    onDragLeaveCapture :: EventHandler |+| Undefined,
    onDragOver :: EventHandler |+| Undefined,
    onDragOverCapture :: EventHandler |+| Undefined,
    onDragStart :: EventHandler |+| Undefined,
    onDragStartCapture :: EventHandler |+| Undefined,
    onDrop :: EventHandler |+| Undefined,
    onDropCapture :: EventHandler |+| Undefined,
    onMouseDown :: EventHandler |+| Undefined,
    onMouseDownCapture :: EventHandler |+| Undefined,
    onMouseEnter :: EventHandler |+| Undefined,
    onMouseLeave :: EventHandler |+| Undefined,
    onMouseMove :: EventHandler |+| Undefined,
    onMouseMoveCapture :: EventHandler |+| Undefined,
    onMouseOut :: EventHandler |+| Undefined,
    onMouseOutCapture :: EventHandler |+| Undefined,
    onMouseOver :: EventHandler |+| Undefined,
    onMouseOverCapture :: EventHandler |+| Undefined,
    onMouseUp :: EventHandler |+| Undefined,
    onMouseUpCapture :: EventHandler |+| Undefined,
    onSelect :: EventHandler |+| Undefined,
    onSelectCapture :: EventHandler |+| Undefined,
    onTouchCancel :: EventHandler |+| Undefined,
    onTouchCancelCapture :: EventHandler |+| Undefined,
    onTouchEnd :: EventHandler |+| Undefined,
    onTouchEndCapture :: EventHandler |+| Undefined,
    onTouchMove :: EventHandler |+| Undefined,
    onTouchMoveCapture :: EventHandler |+| Undefined,
    onTouchStart :: EventHandler |+| Undefined,
    onTouchStartCapture :: EventHandler |+| Undefined,
    onPointerDown :: EventHandler |+| Undefined,
    onPointerDownCapture :: EventHandler |+| Undefined,
    onPointerMove :: EventHandler |+| Undefined,
    onPointerMoveCapture :: EventHandler |+| Undefined,
    onPointerUp :: EventHandler |+| Undefined,
    onPointerUpCapture :: EventHandler |+| Undefined,
    onPointerCancel :: EventHandler |+| Undefined,
    onPointerCancelCapture :: EventHandler |+| Undefined,
    onPointerEnter :: EventHandler |+| Undefined,
    onPointerEnterCapture :: EventHandler |+| Undefined,
    onPointerLeave :: EventHandler |+| Undefined,
    onPointerLeaveCapture :: EventHandler |+| Undefined,
    onPointerOver :: EventHandler |+| Undefined,
    onPointerOverCapture :: EventHandler |+| Undefined,
    onPointerOut :: EventHandler |+| Undefined,
    onPointerOutCapture :: EventHandler |+| Undefined,
    onGotPointerCapture :: EventHandler |+| Undefined,
    onGotPointerCaptureCapture :: EventHandler |+| Undefined,
    onLostPointerCapture :: EventHandler |+| Undefined,
    onLostPointerCaptureCapture :: EventHandler |+| Undefined,
    onScroll :: EventHandler |+| Undefined,
    onScrollCapture :: EventHandler |+| Undefined,
    onWheel :: EventHandler |+| Undefined,
    onWheelCapture :: EventHandler |+| Undefined,
    onAnimationStart :: EventHandler |+| Undefined,
    onAnimationStartCapture :: EventHandler |+| Undefined,
    onAnimationEnd :: EventHandler |+| Undefined,
    onAnimationEndCapture :: EventHandler |+| Undefined,
    onAnimationIteration :: EventHandler |+| Undefined,
    onAnimationIterationCapture :: EventHandler |+| Undefined,
    onTransitionEnd :: EventHandler |+| Undefined,
    onTransitionEndCapture :: EventHandler |+| Undefined,
    ariaactivedescendant :: String |+| Undefined,
    ariaatomic :: Boolean |+| String |+| Undefined,
    ariaautocomplete :: String |+| Undefined,
    ariabusy :: Boolean |+| String |+| Undefined,
    ariachecked :: Boolean |+| String |+| Undefined,
    ariacolcount :: Number |+| Undefined,
    ariacolindex :: Number |+| Undefined,
    ariacolspan :: Number |+| Undefined,
    ariacontrols :: String |+| Undefined,
    ariacurrent :: Boolean |+| String |+| Undefined,
    ariadescribedby :: String |+| Undefined,
    ariadetails :: String |+| Undefined,
    ariadisabled :: Boolean |+| String |+| Undefined,
    ariadropeffect :: String |+| Undefined,
    ariaerrormessage :: String |+| Undefined,
    ariaexpanded :: Boolean |+| String |+| Undefined,
    ariaflowto :: String |+| Undefined,
    ariagrabbed :: Boolean |+| String |+| Undefined,
    ariahaspopup :: Boolean |+| String |+| Undefined,
    ariahidden :: Boolean |+| String |+| Undefined,
    ariainvalid :: Boolean |+| String |+| Undefined,
    ariakeyshortcuts :: String |+| Undefined,
    arialabel :: String |+| Undefined,
    arialabelledby :: String |+| Undefined,
    arialevel :: Number |+| Undefined,
    arialive :: String |+| Undefined,
    ariamodal :: Boolean |+| String |+| Undefined,
    ariamultiline :: Boolean |+| String |+| Undefined,
    ariamultiselectable :: Boolean |+| String |+| Undefined,
    ariaorientation :: String |+| Undefined,
    ariaowns :: String |+| Undefined,
    ariaplaceholder :: String |+| Undefined,
    ariaposinset :: Number |+| Undefined,
    ariapressed :: Boolean |+| String |+| Undefined,
    ariareadonly :: Boolean |+| String |+| Undefined,
    ariarelevant :: String |+| Undefined,
    ariarequired :: Boolean |+| String |+| Undefined,
    ariaroledescription :: String |+| Undefined,
    ariarowcount :: Number |+| Undefined,
    ariarowindex :: Number |+| Undefined,
    ariarowspan :: Number |+| Undefined,
    ariaselected :: Boolean |+| String |+| Undefined,
    ariasetsize :: Number |+| Undefined,
    ariasort :: String |+| Undefined,
    ariavaluemax :: Number |+| Undefined,
    ariavaluemin :: Number |+| Undefined,
    ariavaluenow :: Number |+| Undefined,
    ariavaluetext :: String |+| Undefined,
    key :: String |+| Number |+| Undefined
}


foreign import _ionIcon :: ReactComponent IonIconProps

ionIcon :: forall r. Coercible r IonIconProps => r -> JSX
ionIcon = ionElement _ionIcon

ionIcon_ :: Array JSX -> JSX
ionIcon_ children = ionIcon {children}

