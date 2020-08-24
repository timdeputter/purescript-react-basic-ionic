const fs = require('fs');
const util = require('util');


var generateIonicTypes = async (isJs) => {
    // await generateComponent("Alert", isJs);
    // await generateComponent("ActionSheet", isJs);
    // await generateComponent("Loading", isJs);
    await generateComponent("Modal", isJs);
    // await generateComponent("Picker", isJs);
    // await generateComponent("Popover", isJs);
};


const generateComponent = async (componentName, isJs) => {
    var lowerName = `ion${componentName}`;
    var upperName = `Ion${componentName}`;
    var fileWriter = await getFileWriter(upperName, isJs);
    await printHeader(isJs, componentName, fileWriter);
    if(isJs){
        await genJavascriptCode(lowerName, fileWriter);
        return;
    }
    var lines = (await withFileDo(`./node_modules/@ionic/react/dist/types/components/${upperName}.d.ts`)).split("\n");
    var subTypes = [];
    var pickers = getPickers(lines, componentName);
    await printRowType(`${upperName}Props`, flatten([], [
        await parseInterfaceOptions(componentName, lines, subTypes, pickers), 
        await parseReactProps('Controller', lines, subTypes, pickers), 
        await parseReactProps('Overlay', lines, subTypes, pickers),
        parseRefAttributes(lines)]), fileWriter);
    for (let index = 0; index < subTypes.length; index++) {
        const element = subTypes[index];
        await printRowType(element.type, element.rows, fileWriter);
    }
    await generateComponentFunc(lowerName, fileWriter);
};

const getPickers = (lines, type) => {
    var s = lines.filter(l => l.includes(`Pick<${type}Options`))[0];
    var e = [];
    if(s){
        extractPickers(e, s)
    }
    return e;
};

const extractPickers = (pickers, s) => {
    var match = /("\w+"|'\w+')( \||>)/g.exec(s);
    if(match) {
        pickers.push(match[1].slice(1).slice(0,-1));
        extractPickers(pickers, s.substring(match.index + match[0].length))
    }
};

const getFileWriter = async (componentName, isJs) => {
    const extension = isJs ? ".js" : ".purs";
    const path = `./src/${componentName}${extension}`;
    await fs.writeFileSync(path,"");
    return async data => await fs.appendFileSync(path, data + "\n");
};

const parseReactProps = async (name, lines, writeOutput, pickers) => {
    if(lines.some(l => l.includes(`import(\"./create${name}Component\").React${name}Props`))){
        var data = await withFileDo(`./node_modules/@ionic/react/dist/types/components/create${name}Component.d.ts`);    
        return await getRowTypeElements(`React${name}Props`, getLineData(data), pickers, writeOutput);
    }
    return [];
};

const parseRefAttributes = (lines) => {
    if(lines.some(l => l.includes(".RefAttributes<"))){
        return ["    key :: String |+| Number"];
    }
    return [];
};

const generateComponentFunc = async (name, writeOutput) => {
    return await writeOutput(`
foreign import _${name} :: ReactComponent ${upperFist(name)}Props

${name} :: forall r. Coercible r ${upperFist(name)}Props => r -> JSX
${name} = element _${name} <<< coerce
`);    
};

const parseInterfaceOptions = async (componentName, lines, writeOutput, pickers) => {
    var componentPathName = getPathName(componentName);
    var r = await sequence(lines.map(async line => {
        var s = `import {((\\w|\\s|,)*)${componentName}Options( as (\\w)+OptionsCore)? } from '@ionic\\/core';`;
        if(line.match(s)){
            var sublines = getLineData(await withFileDo(
                `./node_modules/@ionic/core/dist/types/components/${componentPathName}/${componentPathName}-interface.d.ts`));
            return await getRowTypeElements(`${componentName}Options`, sublines, pickers, writeOutput);
        }
        return [];
    }));
    return flatten([], r);
};

const getPathName = (name) => {
    var indizes = findUppercaseLetters(name);
    return indizes.reduce((a, i) => i == 0 ? lowerFist(a) : `${a.substring(0,i)}-${lowerFist(a.substring(i))}`, name);
};


const getBaseTypeName = (lines, type) => {
    var extensionDef = `export interface ${type} extends JSXBase.`;
    return lines.filter(l => l.includes(extensionDef)).map(l => {
        var start = l.indexOf(extensionDef)+extensionDef.length;
        return l.slice(start,l.indexOf("<",start))
    })[0];
};

const getLineData = (data) => {
    return data.split(/\r?\n/).map(l => l.trim()).map(e => removeEndOfLineComment(e));
};

const getStatements = (data) => {
    return data.split(";").map(l => l.trim()).map(e => removeEndOfLineComment(e));
};

const printRowType = async (type, rowTypeElements, writeOutput) => {
    await writeOutput(`type ${type} = {\n${rowTypeElements.join(",\n")}\n}\n`);
};

const getRowTypeElements = async (type, lines, pickers, writeOutput) => {
    var baseName = getBaseTypeName(lines, type);
    if(baseName != undefined) {
        var data = await withFileDo("./node_modules/@ionic/core/dist/types/stencil-public-runtime.d.ts");
        return (await getRowTypesFromRegion(type, lines, pickers, writeOutput)).concat(
            await getRowTypeElements(baseName, getLineData(data), pickers, writeOutput));
    }
    return await getRowTypesFromRegion(type, lines, pickers, writeOutput);
};

const getRowTypesFromRegion = async (type, lines, pickers, writeOutput) => {
    var region = limitToRegion(lines, type);
    var statements = getStatements(flatten("", region));
    return await sequence(statements.filter(l => !isEmptyOrSpaces(l)).filter(
        e => !isComment(e)).filter(e => e.includes(":")).map(e => parseGenereicRowTypeElement(e)).filter(
            e => isPicked(e, pickers)).map(generateRowTypeElement(lines, pickers, writeOutput)));
};

const isPicked = (e, pickers) => {
    if(pickers && pickers.length > 0)
        return pickers.includes(e.name)
    return true;
}


const generateRowTypeElement = (lines, pickers, writeOutput) => async (rowEl) => {
    return `    ${fixName(rowEl.name)} :: ${await generateType(rowEl.type, lines, pickers, writeOutput)} |+| Undefined`;
};

const fixName = (name) => {
    return name.replace(/-/g,"").replace(/\'/g,"");
};

const generateType = async (typeScriptType, lines, pickers, writeOutput) => {
    if(typeScriptType.includes("=>")) return "EventHandler";
    if(typeScriptType.endsWith("[]")) return await generateArrayType(typeScriptType, lines, pickers, writeOutput);
    if(lines.some(l => l.includes(`export interface ${typeScriptType}`))) {
        writeOutput.push({type: typeScriptType, rows: await getRowTypeElements(typeScriptType, lines, pickers, writeOutput)});
        return typeScriptType;
    }
    if(["string", "CSSProperties", "{"].includes(typeScriptType)) return "String";
    if(["Booleanish", "boolean"].includes(typeScriptType)) return "Boolean";
    if(typeScriptType == "ReadonlyArray<string>") return "(Array String)";
    if(typeScriptType == "number") return "Number"
    if(typeScriptType == "any") return "String |+| Number |+| Boolean |+| (Array String) |+| (Array Boolean) |+| (Array Number)"
    if(typeScriptType.includes("EventHandler<T>")) return "EventHandler";
    if(typeScriptType.includes("ReactNode")) return "Array JSX";
    if(typeScriptType.includes("|")) return await generateSumType(typeScriptType, lines, pickers, writeOutput);
    return "String";
};


const generateArrayType = async (typeScriptType, lines, pickers, writeOutput) => {
    typeScriptType = typeScriptType.slice(0,-2);
    if(typeScriptType.startsWith("(") && typeScriptType.endsWith(")")) {
        typeScriptType = typeScriptType.slice(1,typeScriptType.length).slice(0,-1);
        return `Array (${await generateType(typeScriptType, lines, pickers, writeOutput)})`;
    };
    return `Array ${await generateType(typeScriptType, lines, pickers, writeOutput)}`;
};

const generateSumType = async (typeScriptType, lines, pickers, writeOutput) => {
    const res = await sequence(distinct(typeScriptType.split("|").map(
        e => e.trim()).filter(e => e != "inherit").map(async e => await generateType(e, lines, pickers, writeOutput))));
    return res.join(" |+| ");
};

const parseGenereicRowTypeElement = (codeline) =>  {
    var elements = codeline.split("?:");
    if(elements.length == 1) elements = codeline.split(":");
    var s = elements.map(s => s.trim());
    return {name: s[0], type: s[1].replace(';','') };
}

const isComment = (codeLine) => {
    return codeLine.startsWith("/") || codeLine.startsWith("*");
};

const removeEndOfLineComment = (codeline) => {
    return codeline.split("//")[0];
};

const limitToRegion = (lines, marker) => {
    lines = lines.slice(lines.findIndex(l => l.includes(`interface ${marker}`))+1);
    if(lines.length > 0 && lines[0].includes('}')) return [];
    return lines.slice(0, findIndexOfNthClosingBrace(lines, 1, 0));
};

const findIndexOfNthClosingBrace = (lines, closingBraceNo, idx) => {
    if(closingBraceNo == 0) return idx;
    return findIndexOfNthClosingBrace(lines, closingBraceNo-1, 
        lines.findIndex((l, i) => i > idx && l.includes("}")));
};


const printHeader = async (isJs, name, writeOutput) => {
    await writeOutput(isJs ? `
    "use strict";
    var Ionic = require("@ionic/react");
    `:`
module Ionic.${name} where

import Prelude

import Literals.Undefined (Undefined)
import React.Basic (JSX, ReactComponent, element)
import React.Basic.Events (EventHandler)
import Untagged.Coercible (class Coercible, coerce)
import Untagged.Union (type (|+|))
    
    `);  
}

const genJavascriptCode = async (name, writeOutput) => {
    var compDefName =name;
    var ionicName = upperFist(name);
    await writeOutput(`exports._${compDefName} = Ionic.${ionicName};  
`);
};

function upperFist(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function lowerFist(string) {
    return string.charAt(0).toLowerCase() + string.slice(1);
}

const findUppercaseLetters = (name) => {
    const res = [];
    for (let index = 0; index < name.length; index++) {
        const c = name[index];
        if(c == c.toUpperCase()) res.push(index);
    }
    return res;
};

const sequence = async (array) => {
    var r = [];
    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        r.push(await element);
    }
    return r;
};

const flatten = (initialVal, arr) => {
    var res = initialVal;
    arr.forEach(subArr => {
        res = res.concat(subArr);
    });
    return res;
};

const withFileDo = async (name) => {
    return await fs.readFileSync(name, 'utf8');
};

const distinct = (a) => {
    return a.filter((value, index, self) => self.indexOf(value) === index);
};

const isEmptyOrSpaces = (str) => {
    return str === null || str.match(/^ *$/) !== null;
}

generateIonicTypes(process.argv[2] == "js");
