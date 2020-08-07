const fs = require('fs');
const util = require('util');

var boolProps = [ 'allowFullScreen',
'allowTransparency',
'autoFocus',
'autoPlay',
'capture',
'contentEditable',
'draggable',
'formNoValidate',
'hidden',
'itemScope',
'noValidate',
'readOnly',
'scoped',
'seamless',
'spellCheck',
'suppressContentEditableWarning',
'unselectable',
'controls',
'loop',
'muted',
'disabled',
'open',
'checked',
'multiple',
'required',
'reversed',
'selected',
'async',
'defer',
'default',
'playsInline' ];

var arrayJSXPorps = ['children'];

var stringProps = [ 'about',
'acceptCharset',
'accessKey',
'cellPadding',
'cellSpacing',
'charSet',
'classID',
'className',
'contextMenu',
'coords',
'crossOrigin',
'dangerouslySetInnerHTML',
'datatype',
'dateTime',
'dir',
'download',
'encType',
'formAction',
'formEncType',
'formMethod',
'formTarget',
'frameBorder',
'href',
'hrefLang',
'htmlFor',
'httpEquiv',
'icon',
'id',
'inlist',
'inputMode',
'is',
'itemID',
'itemProp',
'itemRef',
'itemType',
'key',
'keyParams',
'keyType',
'lang',
'marginHeight',
'marginWidth',
'mediaGroup',
'name',
'prefix',
'property',
'radioGroup',
'rel',
'resource',
'role',
'security',
'shape',
'srcLang',
'srcSet',
'target',
'title',
'type',
'typeof',
'useMap',
'vocab',
'wmode',
'alt',
'preload',
'src',
'cite',
'form',
'value',
'height',
'width',
'accept',
'action',
'autoComplete',
'method',
'profile',
'size',
'manifest',
'sandbox',
'scrolling',
'sizes',
'autoCapitalize',
'autoCorrect',
'autoSave',
'defaultChecked',
'defaultValue',
'list',
'max',
'min',
'pattern',
'placeholder',
'results',
'step',
'challenge',
'color',
'integrity',
'media',
'nonce',
'scope',
'content',
'high',
'low',
'optimum',
'data',
'label',
'summary',
'headers',
'wrap',
'kind',
'poster' ];

var eventhandlerProps = [ 'onAnimationEnd',
'onAnimationIteration',
'onAnimationStart',
'onBlur',
'onClick',
'onCompositionEnd',
'onCompositionStart',
'onCompositionUpdate',
'onContextMenu',
'onCopy',
'onCut',
'onDoubleClick',
'onDrag',
'onDragEnd',
'onDragEnter',
'onDragExit',
'onDragLeave',
'onDragOver',
'onDragStart',
'onDrop',
'onFocus',
'onGotPointerCapture',
'onInvalid',
'onKeyDown',
'onKeyPress',
'onKeyUp',
'onLostPointerCapture',
'onMouseDown',
'onMouseEnter',
'onMouseLeave',
'onMouseMove',
'onMouseOut',
'onMouseOver',
'onMouseUp',
'onPaste',
'onPointerCancel',
'onPointerDown',
'onPointerEnter',
'onPointerLeave',
'onPointerMove',
'onPointerOut',
'onPointerOver',
'onPointerUp',
'onSelect',
'onSubmit',
'onTouchCancel',
'onTouchEnd',
'onTouchMove',
'onTouchStart',
'onTransitionEnd',
'onWheel',
'onAbort',
'onCanPlay',
'onCanPlayThrough',
'onDurationChange',
'onEmptied',
'onEncrypted',
'onEnded',
'onError',
'onLoadStart',
'onLoadedData',
'onLoadedMetadata',
'onPause',
'onPlay',
'onPlaying',
'onProgress',
'onRateChange',
'onScroll',
'onSeeked',
'onSeeking',
'onStalled',
'onSuspend',
'onTimeUpdate',
'onVolumeChange',
'onWaiting',
'onChange',
'onInput',
'onLoad' ];


fs.readFile('./codegen/ionic-types.txt', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  var lines = data.split(/\r?\n/);
  console.log(process.argv[2] == 'js' ? `
  "use strict";
  var Ionic = require("@ionic/react");
  `:`
module Ionic where
import Prelude

import React.Basic (JSX, ReactComponent, element)
import React.Basic.Events (EventHandler)
import Untagged.Coercible (class Coercible, coerce)
import Untagged.Union (UndefinedOr)  
  `);
  var r = lines.map(l => parseLine(l)).filter(l => l.name.trim().length > 0).map(d => genCode(d)).join("\n");
  console.log(r);
});

var parseLine = function(line) {
    var n = line.split(":")[0];
    return {name: n.replace(/-/g,'_'), props: parseProps(line.split(":")[1])};
};

var parseProps = function(str) {
    if(str === undefined) return [];
    return str.split("|").map(e => e.trim().replace(/\"/g,'').replace(/-/g,'_'));
}

var genPurscriptCode = function(data){
    var propsName = `Props_${data.name}`;
    var compDefName = lowerFist(data.name);
    return `
type ${propsName} = 
    { ${data.props.map(p => getPropDefs(p)).join(",\n")}
    }

foreign import _${compDefName} :: ReactComponent ${propsName}

${compDefName} :: forall r. Coercible r ${propsName} => r -> JSX
${compDefName} = element _${compDefName} <<< coerce
`;
}

var genJavascriptCode = function(data){
    var compDefName = lowerFist(data.name);
    return `exports._${compDefName} = Ionic.${data.name};  
`;
};

var getPropDefs = function(prop) {
    return `      ${prop} :: UndefinedOr ${getPropType(prop)}`;
}

var getPropType = function(prop) {
    if(boolProps.includes(prop)) return "Boolean";
    if(arrayJSXPorps.includes(prop)) return "(Array JSX)";
    if(stringProps.includes(prop)) return "String";
    if(eventhandlerProps.includes(prop) || prop.startsWith("on")) return "EventHandler";
    return "String";
}

function lowerFist(string) {
    return string.charAt(0).toLowerCase() + string.slice(1);
}

var genCode = process.argv[2] == "js" ? genJavascriptCode : genPurscriptCode;
