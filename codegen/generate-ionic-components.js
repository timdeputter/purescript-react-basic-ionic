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
    printRowType(type, rowTypeElements);
};

const printRowType = (type, rowTypeElements) => {
    console.log(`type ${type} r = (`)
    console.log(rowTypeElements.join(",\n"));
    console.log("| r )");
};




const getRowTypeElements = (region) => {
    return region.filter(
        l => !isEmptyOrSpaces(l)).filter(
            e => !isComment(e)).filter(e => e.includes("?:")).map(
                e => parseGenereicRowTypeElement(e)).map(generateRowTypeElement);
};

const generateRowTypeElement = (rowEl) => {
    return `    ${fixName(rowEl.name)} :: ${generateType(rowEl.type)} |+| Undefined`;
};

const fixName = (name) => {
    return name.replace(/-/g,"").replace(/\'/g,"");
};

const generateType = (typeScriptType) => {
    if(["string", "CSSProperties", "{"].includes(typeScriptType)) return "String";
    if(["Booleanish", "boolean"].includes(typeScriptType)) return "Boolean";
    if(typeScriptType == "ReadonlyArray<string>") return "(Array String)";
    if(typeScriptType == "number") return "Number"
    if(typeScriptType == "any") return "String |+| Number |+| Boolean |+| (Array String) |+| (Array Boolean) |+| (Array Number)"
    if(typeScriptType.includes("EventHandler<T>")) return "EventHandler";
    if(typeScriptType == "ReactNode") return "Array JSX";
    if(typeScriptType.includes("|")) return generateSumType(typeScriptType);
    return "String";
};

const generateSumType = (typeScriptType) => {
    const res = distinct(typeScriptType.split("|").map(
        e => e.trim()).filter(e => e != "inherit").map(e => generateType(e)));
    return res.join(" |+| ");
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

const distinct = (a) => {
    return a.filter((value, index, self) => self.indexOf(value) === index);
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
import React.Basic (JSX)
import React.Basic.Events (EventHandler)
import Type.Row (type (+))
import Untagged.Union (type (|+|))  
import Literals.Undefined (Undefined)
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