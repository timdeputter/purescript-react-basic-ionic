const fs = require('fs');
const util = require('util');


var generateIonicTypes = (isJs) => {
    printHeader(isJs);
    withFileDo('./node_modules/@types/react/index.d.ts', generateGenericRowTypes(isJs));
};

const generateGenericRowTypes = (isJs) => (data) => {
    generateGenericRowType(isJs, data, "HTMLAttributes", 1);
    generateGenericRowType(isJs, data, "AriaAttributes", 1);
    generateGenericRowType(isJs, data, "DOMAttributes", 2);
    console.log("type IonicBaseAttributes r = HTMLAttributes + AriaAttributes + DOMAttributes + r");
};


const generateGenericRowType = (isJs, data, type, closingBracesCount) => {
    var lines = data.split(/\r?\n/).map(l => l.trim()).map(e => removeEndOfLineComment(e));
    var region = limitToRegion(lines, type, closingBracesCount);
    var rowTypeElements = getRowTypeElements(region);
    printTypeDefs(rowTypeElements);
    printRowType(type, rowTypeElements);
};

const printRowType = (type, rowTypeElements) => {
    console.log(`type ${type} r = (`)
    console.log(rowTypeElements.map(e => e.el).join("\n"));
    console.log("| r )");
};


const printTypeDefs = (rowTypeElements) => {
    var defs = rowTypeElements.reduce((acc, c) => acc.concat(c.typeDefs), []);
    console.log(defs.map(d => {
        var name = upperFist(d);
        return `
data ${name} = ${name}
instance coercible${name}String  :: Coercible ${name} String
`;
    }).join("\n"));
}


const getRowTypeElements = (region) => {
    return region.filter(
        l => !isEmptyOrSpaces(l)).filter(
            e => !isComment(e)).filter(e => e.includes("?:")).map(
                e => parseGenereicRowTypeElement(e)).map(generateRowTypeElement);
};

const generateRowTypeElement = (rowEl) => {
    const rowElementType = generateType(rowEl.type);
    return {el: `    ${rowEl.name} :: ${rowElementType.type} |+| Undefined`, typeDefs: rowElementType.typeDefs };
}

const generateType = (typeScriptType) => {
    if(["string", "CSSProperties", "{"].includes(typeScriptType)) return {type: "String", typeDefs: []};
    if(["Booleanish", "boolean"].includes(typeScriptType)) return {type: "Boolean", typeDefs: []};
    if(typeScriptType == "number") return {type: "Number", typeDefs: []}
    if(typeScriptType == "any") return {type: "String |+| Number |+| Boolean |+| (Array String) |+| (Array Boolean) |+| (Array Number)", typeDefs: []}
    if(typeScriptType.includes("EventHandler<T>")) return {type:"EventHandler", typeDefs: []};
    if(typeScriptType == "ReactNode") return {type: "Array JSX", typeDefs: []};
    if(typeScriptType.includes("|")) return generateSumType(typeScriptType);
    return {type: typeScriptType, typeDefs: [typeScriptType.replace(/\'/g,'')]};
};

const generateSumType = (typeScriptType) => {
    const res = typeScriptType.split("|").map(
        e => e.trim()).filter(
            e => e != "inherit").map(
                e => generateType(e)).reduce(
                    (acc, val) => {
                        return {type: acc.type.concat([val.type]), typeDefs: acc.typeDefs.concat(val.typeDefs).filter(e => !e.includes("inherit")) }
                    }, {type:[], typeDefs:[]});
    return {type: res.type.join(" |+| "), typeDefs: res.typeDefs};
};

const parseGenereicRowTypeElement = (codeline) =>  {
    var s = codeline.split("?:").map(s => s.trim());
    return {name: s[0], type: s[1].replace(';','') };
}

const isComment = (codeLine) => {
    return codeLine.startsWith("/") || codeLine.startsWith("*");
};

const removeEndOfLineComment = (codeline) => {
    return codeline.split("//")[0];
};

const limitToRegion = (lines, marker, closingBracesCount) => {
    lines = lines.slice(lines.findIndex(l => l.includes(`interface ${marker}`))+1);
    return lines.slice(0, findIndexOfNthClosingBrace(lines, closingBracesCount, 0));
};

const findIndexOfNthClosingBrace = (lines, closingBraceNo, idx) => {
    if(closingBraceNo == 0) return idx;
    return findIndexOfNthClosingBrace(lines, closingBraceNo-1, 
        lines.findIndex((l, i) => i > idx && l.includes("}")));
};

const withFileDo = (name, action) => {
    fs.readFile(name, 'utf8', function (err,data) {
        if (err) {
          return console.log(err);
        }
        action(data);
      });
};

const isEmptyOrSpaces = (str) => {
    return str === null || str.match(/^ *$/) !== null;
}

const printHeader = (isJs) => {
    console.log(isJs ? `
    "use strict";
    var Ionic = require("@ionic/react");
    `:`
module Ionic where
import Prelude

import React.Basic (JSX, ReactComponent, element)
import React.Basic.Events (EventHandler)
import Untagged.Coercible (class Coercible, coerce)
import Type.Row (type (+))
import Untagged.Union (UndefinedOr, type (|+|))  
    `);  
}

const genJavascriptCode = (data) => {
    var compDefName =data.name;
    var ionicName = upperFist(data.name);
    return `exports._${compDefName} = Ionic.${ionicName};  
`;
};

function upperFist(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


generateIonicTypes(process.argv[2] == "js");