const fs = require('fs');
const util = require('util');


var generateIonicTypes = async (isJs) => {
    await generateComponent("Alert", isJs);
    await generateComponent("ActionSheet", isJs);
};


const generateComponent = async (componentName, isJs) => {
    var lowerName = `ion${componentName}`;
    var upperName = `Ion${componentName}`;
    var fileWriter = await getFileWriter(upperName, isJs);
    await printHeader(isJs, fileWriter);
    if(isJs){
        await genJavascriptCode(lowerName, fileWriter);
        return;
    }
    var lines = (await withFileDo(`./node_modules/@ionic/react/dist/types/components/${upperName}.d.ts`)).split("\n");
    await printRowType(`${upperName}Props`, flatten([], [
        await parseInterfaceOptions(componentName, lines, fileWriter), 
        await parseReactProps('Controller', lines, fileWriter), 
        await parseReactProps('Overlay', lines, fileWriter),
        parseRefAttributes(lines)]), false, fileWriter);
    await generateComponentFunc(lowerName, fileWriter);
};

const getFileWriter = async (componentName, isJs) => {
    const extension = isJs ? ".js" : ".purs";
    const path = `./src/${componentName}${extension}`;
    await fs.writeFileSync(path,"");
    return async data => await fs.appendFileSync(path, data + "\n");
};

const parseReactProps = async (name, lines, writeOutput) => {
    if(lines.some(l => l.includes(`import(\"./create${name}Component\").React${name}Props`))){
        var data = await withFileDo(`./node_modules/@ionic/react/dist/types/components/create${name}Component.d.ts`);    
        return await getRowTypeElements(`React${name}Props`, getLineData(data), 1, writeOutput);
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

const parseInterfaceOptions = async (componentName, lines, writeOutput) => {
    var componentPathName = getPathName(componentName);
    var r = await sequence(lines.map(async line => {
        var s = `import {((\\w|\\s|,)*)${componentName}Options( as (\\w)+OptionsCore)? } from '@ionic\\/core';`;
        if(line.match(s)){
            var sublines = getLineData(await withFileDo(
                `./node_modules/@ionic/core/dist/types/components/${componentPathName}/${componentPathName}-interface.d.ts`));
            return await getRowTypeElements(`${componentName}Options`, sublines, 1, writeOutput);
        }
        return [];
    }));
    return flatten([], r);
};

const getPathName = (name) => {
    var indizes = findUppercaseLetters(name);
    return indizes.reduce((a, i) => i == 0 ? lowerFist(a) : `${a.substring(0,i)}-${lowerFist(a.substring(i))}`, name);
};

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


const printRowType = async (type, rowTypeElements, generateOpenRow, writeOutput) => {
    if(generateOpenRow) await writeOutput(`type ${type} r = (`);
    else await writeOutput(`type ${type} = {`);
    await writeOutput(rowTypeElements.join(",\n"));
    if(generateOpenRow) await writeOutput("| r )\n");
    else  await writeOutput("}\n");
};

const getRowTypeElements = async (type, lines, closingBracesCount, writeOutput) => {
    var baseName = getBaseTypeName(lines, type);
    if(baseName != undefined) {
        var data = await withFileDo("./node_modules/@ionic/core/dist/types/stencil-public-runtime.d.ts");
        return (await getRowTypesFromRegion(type, lines, closingBracesCount, writeOutput)).concat(
            await getRowTypeElements(baseName, getLineData(data), 1, writeOutput));
    }
    return await getRowTypesFromRegion(type, lines, closingBracesCount, writeOutput);
};

const getRowTypesFromRegion = async (type, lines, closingBracesCount, writeOutput) => {
    var region = getStatements(flatten("", limitToRegion(lines, type, closingBracesCount)));
    return await sequence(region.filter(
        l => !isEmptyOrSpaces(l)).filter(
            e => !isComment(e)).filter(e => e.includes(":")).map(
                e => parseGenereicRowTypeElement(e)).map(generateRowTypeElement(lines, writeOutput)));

};

const generateRowTypeElement = (lines, writeOutput) => async (rowEl) => {
    return `    ${fixName(rowEl.name)} :: ${await generateType(rowEl.type, lines, writeOutput)} |+| Undefined`;
};

const fixName = (name) => {
    return name.replace(/-/g,"").replace(/\'/g,"");
};

const generateType = async (typeScriptType, lines, writeOutput) => {
    if(typeScriptType.includes("=>")) return "EventHandler";
    if(typeScriptType.endsWith("[]")) return await generateArrayType(typeScriptType, lines, writeOutput);
    if(lines.some(l => l.includes(`export interface ${typeScriptType}`))) {
        await generateRowType(lines, typeScriptType, 1, false, writeOutput);
        return typeScriptType;
    }
    if(["string", "CSSProperties", "{"].includes(typeScriptType)) return "String";
    if(["Booleanish", "boolean"].includes(typeScriptType)) return "Boolean";
    if(typeScriptType == "ReadonlyArray<string>") return "(Array String)";
    if(typeScriptType == "number") return "Number"
    if(typeScriptType == "any") return "String |+| Number |+| Boolean |+| (Array String) |+| (Array Boolean) |+| (Array Number)"
    if(typeScriptType.includes("EventHandler<T>")) return "EventHandler";
    if(typeScriptType.includes("ReactNode")) return "Array JSX";
    if(typeScriptType.includes("|")) return await generateSumType(typeScriptType, lines, writeOutput);
    return "String";
};

const generateRowType = async (lines, type, closingBracesCount, generateOpenRow, writeOutput) => {
    await printRowType(type, await getRowTypeElements(type, lines, closingBracesCount, writeOutput), generateOpenRow, writeOutput);
};

const generateArrayType = async (typeScriptType, lines, writeOutput) => {
    typeScriptType = typeScriptType.slice(0,-2);
    if(typeScriptType.startsWith("(") && typeScriptType.endsWith(")")) {
        typeScriptType = typeScriptType.slice(1,typeScriptType.length).slice(0,-1);
        return `Array (${await generateType(typeScriptType, lines, writeOutput)})`;
    };
    return `Array ${await generateType(typeScriptType, lines, writeOutput)}`;
};

const generateSumType = async (typeScriptType, lines, writeOutput) => {
    const res = await sequence(distinct(typeScriptType.split("|").map(
        e => e.trim()).filter(e => e != "inherit").map(async e => await generateType(e, lines, writeOutput))));
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

const limitToRegion = (lines, marker, closingBracesCount) => {
    lines = lines.slice(lines.findIndex(l => l.includes(`interface ${marker}`))+1);
    if(lines.length > 0 && lines[0].includes('}')) return [];
    return lines.slice(0, findIndexOfNthClosingBrace(lines, closingBracesCount, 0));
};

const findIndexOfNthClosingBrace = (lines, closingBraceNo, idx) => {
    if(closingBraceNo == 0) return idx;
    return findIndexOfNthClosingBrace(lines, closingBraceNo-1, 
        lines.findIndex((l, i) => i > idx && l.includes("}")));
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

const printHeader = async (isJs, writeOutput) => {
    await writeOutput(isJs ? `
    "use strict";
    var Ionic = require("@ionic/react");
    `:`
module Ionic where

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

generateIonicTypes(process.argv[2] == "js");
