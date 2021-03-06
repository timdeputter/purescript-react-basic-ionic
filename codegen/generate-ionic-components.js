const fs = require('fs');
const util = require('util');


var generateIonicTypes = async (isJs) => {
    var exports = flatten([], [[await generateComponent("Alert", {isJs}),
    await generateComponent("ActionSheet", {isJs}),
    await generateComponent("Loading", {isJs}),
    await generateComponent("Modal", {isJs}),
    await generateComponent("Picker", {isJs}),
    await generateComponent("Popover", {isJs}),
    await generateComponent("Icon", {isJs}),
    await generateComponent("Page", {isJs}),
    await generateComponent("Toast", {isJs}),
    await generateComponent("ReactRouter", {isJs, basePath: './node_modules/@ionic/react-router/dist/types/ReactRouter', module:"@ionic/react-router", hasDefaultChildren: true}),
    await generateComponent("RouterOutlet", {isJs, hasDefaultChildren: true}),
    await generateComponent("Tabs", {isJs, basePath: './node_modules/@ionic/react/dist/types/components/navigation', hasDefaultChildren:true}),
    await generateComponent("TabBar", {isJs, basePath: './node_modules/@ionic/react/dist/types/components/navigation'}),
    await generateComponent("TabButton", {isJs, basePath: './node_modules/@ionic/react/dist/types/components/navigation', hasDefaultChildren: true}),
    await generateComponentPure("Route", [
        "path :: String |+| Undefined",
        "component :: (ReactComponent {}) |+| Undefined",
        "render :: (Unit -> JSX) |+| Undefined",
        "exact :: Boolean |+| Undefined"
    ], {isJs, module: "react-router-dom"}),
    await generateComponentPure("Redirect", [
        "to :: String |+| Undefined",
        "push :: Boolean |+| Undefined",
        "path :: String |+| Undefined",
        "exact :: Boolean |+| Undefined",
        "strict :: Boolean |+| Undefined",
        "from :: String |+| Undefined"
    ], {isJs, module: "react-router-dom"})],
    await generateProxyComponents(isJs)]);
    await createIonicExports(exports, isJs);
};

const createIonicExports = async (exports, isJs) => {
    if(isJs) return;
    const path = `./src/Ionic.purs`;
    var exp = exports.map(e => `import Ionic.${e.module} (${e.exports.join(", ")}) as Exports`).join("\n\n");
    await fs.writeFileSync(path,
`module Ionic (module Exports) where

${exp}`);
};

const generateComponentPure = async (componentName, props, opts) => {
    ({isJs = false, module = "@ionic/react"} = opts);
    const lowerName = lowerFist(componentName);
    var fileWriter = await getFileWriter(componentName, isJs);
    await printHeader(isJs, componentName, module, props, fileWriter);
    if(isJs){
        await genJavascriptCode(lowerName, fileWriter);
        return;
    }
    await printRowType(`${componentName}Props`, props, fileWriter);
    await generateComponentFunc(lowerName, fileWriter, hasChildren(props));
    const exports = props.some(p => p.includes("children")) 
        ? [lowerName, lowerName + "_"] : [lowerName];
    return {module: componentName, exports};
}


const generateProxyComponents = async (isJs) => {
    var modules = [];
    var statements = getStatements(await withFileDo(`./node_modules/@ionic/react/dist/types/components/proxies.d.ts`));
    for (let index = 0; index < statements.length; index++) {
        const s = statements[index];
        var componentName = getComponentName(s);
        if(componentName){
            modules.push(await createProxyComponent(componentName, s, isJs));
        }        
    }
    return modules;
};

const createProxyComponent = async (componentName, s, isJs) => {
    const lowerName = lowerFist(componentName);
    var fileWriter = await getFileWriter(componentName, isJs);
    var pickers = getPickers([s], `Pick<import("react").HTMLAttributes<`);
    var data = await withFileDo(`./node_modules/@types/react/index.d.ts`);    
    var subTypes = [];
    var props = flatten([], [await getRowTypeElements(`HTMLAttributes`, getLineData(data), pickers, subTypes),
        await parseLocalJSXProps(componentName, subTypes)]);
    await printHeader(isJs, componentName, "@ionic/react", props, fileWriter);
    if(isJs){
        await genJavascriptCode(lowerName, fileWriter);
        return;
    }
    await printRowType(`${componentName}Props`, props, fileWriter);
    for (let index = 0; index < subTypes.length; index++) {
        const element = subTypes[index];
        await printRowType(element.type, element.rows, fileWriter);
    }
    await generateComponentFunc(lowerName, fileWriter, hasChildren(props));
    const exports = props.some(p => p.includes("children")) 
        ? [lowerName, lowerName + "_"] : [lowerName];
    return {module: componentName, exports};
};



const getComponentName = (statement) => {
    var match = (/export declare const (\w+):/g.exec(statement));
    if(match) return match[1];
    return null;
};


const generateComponent = async (componentName, opts) => {
    var isJs, basePath, hasDefaultChildren;
    ({isJs = false, basePath = './node_modules/@ionic/react/dist/types/components', module = "@ionic/react", hasDefaultChildren = false} = opts);
    var lowerName = `ion${componentName}`;
    var upperName = `Ion${componentName}`;
    var fileWriter = await getFileWriter(upperName, isJs);
    var lines = (await withFileDo(`${basePath}/${upperName}.d.ts`)).split("\n");
    var subTypes = [];
    var props = flatten(hasDefaultChildren ? ["    children :: Array JSX |+| Undefined"] : [], [
        await parseInterfaceOptions(componentName, lines, subTypes), 
        await parseBasicReactProps(lines, subTypes),
        await parseLocalJSXProps(upperName, subTypes),
        await parseBrowserRouterProps(lines, subTypes),
        await parseComponentProps(componentName, lines, subTypes),
        await parseHtmlAttributes(lines, subTypes), 
        await parseReactProps('Controller', lines, subTypes), 
        await parseReactProps('Overlay', lines, subTypes),
        parseRefAttributes(lines)]).filter(e => !e.includes("commit") && !e.includes("(id: string, params: ComponentProps | undefined, direction: RouterDirection, animation :: "));
    await printHeader(isJs, upperName, module, props, fileWriter);
    if(isJs){
        await genJavascriptCode(lowerName, fileWriter);
        return;
    }
    await printRowType(`${upperName}Props`, props, fileWriter);
    for (let index = 0; index < subTypes.length; index++) {
        const element = subTypes[index];
        await printRowType(element.type, element.rows, fileWriter);
    }
    await generateComponentFunc(lowerName, fileWriter, hasChildren(props));
    const exports = hasDefaultChildren || props.some(p => p.includes("children")) 
        ? [lowerName, lowerName + "_"] : [lowerName];
    return {module: upperName, exports};
};

const hasChildren = (props) => {
    return props.some(p => p.includes("children :: Array JSX |+| Undefined"));
}

const getPickers = (lines, pickIndicator) => {
    var s = lines.filter(l => l.includes(pickIndicator))[0];
    var e = [];
    if(s){
        extractPickers(e, s)
    }
    return e;
};

const extractPickers = (pickers, s) => {
    var match = /("(\w|-)+"|'(\w|-)+')( \||>)/g.exec(s);
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

const parseComponentProps = async (componentName, lines, writeOutput) => {
    return await getRowTypeElements(`Ion${componentName}Props`, lines, [], writeOutput);
};


const parseLocalJSXProps = async (componentName,  writeOutput) => {
        var data = await withFileDo(`./node_modules/@ionic/core/dist/types/components.d.ts`);    
        return await getRowTypeElements(componentName, getLineData(data), [], writeOutput);
};


const parseBrowserRouterProps = async (lines, writeOutput) => {
    if(lines.some(l => l.includes("import { BrowserRouterProps } from 'react-router-dom';"))){
        var data = await withFileDo(`./node_modules/@types/react-router-dom/index.d.ts`);    
        return await getRowTypeElements("BrowserRouterProps", getLineData(data), [], writeOutput);
    }
    return [];
};

const parseBasicReactProps = async (lines, writeOutput) => {
    if(lines.some(l => l.includes("import { IonicReactProps } from './IonicReactProps';"))){
        var data = await withFileDo(`./node_modules/@ionic/react/dist/types/components/IonicReactProps.d.ts`);    
        return await getRowTypeElements("IonicReactProps", getLineData(data), [], writeOutput);
    }
    return [];
};

const parseHtmlAttributes = async (lines, writeOutput) => {
    if(lines.some(l => l.includes("Pick<React.HTMLAttributes"))){
        var pickers = getPickers(lines, "Pick<React.HTMLAttributes");
        var data = await withFileDo(`./node_modules/@types/react/index.d.ts`);    
        return await getRowTypeElements(`HTMLAttributes`, getLineData(data), pickers, writeOutput);
    }
    return [];
};

const parseReactProps = async (name, lines, writeOutput) => {
    if(lines.some(l => l.includes(`import(\"./create${name}Component\").React${name}Props`))){
        var data = await withFileDo(`./node_modules/@ionic/react/dist/types/components/create${name}Component.d.ts`);    
        return await getRowTypeElements(`React${name}Props`, getLineData(data), [], writeOutput);
    }
    return [];
};

const parseRefAttributes = (lines) => {
    if(lines.some(l => l.includes(".RefAttributes<"))){
        return ["    key :: String |+| Number |+| Undefined"];
    }
    return [];
};

const generateComponentFunc = async (name, writeOutput, hasChildren) => {
    return await writeOutput(`
foreign import _${name} :: ReactComponent ${upperFist(name)}Props

${name} :: forall r. Coercible r ${upperFist(name)}Props => r -> JSX
${name} = ionElement _${name}
${convinientChildFunc(name, hasChildren)}`);    
};

const convinientChildFunc = (name, hasChildren) => {
    return hasChildren ? `
${name}_ :: Array JSX -> JSX
${name}_ children = ${name} {children}
` : "";
};

const parseInterfaceOptions = async (componentName, lines, writeOutput) => {
    var pickers = getPickers(lines, `Pick<${componentName}Options`);
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

const getRowTypeElements = async (type, lines, pickers, writeOutput, depths = 1) => {
    var baseName = getBaseTypeName(lines, type);
    if(type == 'HTMLAttributes'){
        return (await getRowTypesFromRegion(type, lines, pickers, writeOutput, depths)).concat(
            await getRowTypeElements("DOMAttributes", lines, pickers, writeOutput, 2)).concat(
                await getRowTypeElements("AriaAttributes", lines, pickers, writeOutput));
    } else if(baseName != undefined) {
        var data = await withFileDo("./node_modules/@ionic/core/dist/types/stencil-public-runtime.d.ts");
        return (await getRowTypesFromRegion(type, lines, pickers, writeOutput, depths)).concat(
            await getRowTypeElements(baseName, getLineData(data), pickers, writeOutput));
    }
    return await getRowTypesFromRegion(type, lines, pickers, writeOutput, depths);
};

const getRowTypesFromRegion = async (type, lines, pickers, writeOutput, depths) => {
    var region = limitToRegion(lines, type, depths).filter(l => !isEmptyOrSpaces(l)).filter(
        e => !isComment(e));
    var statements = getStatements(flatten("", region));
    return await sequence(statements.filter(e => e.includes(":")).map(e => parseGenereicRowTypeElement(e)).filter(
            e => isPicked(e, pickers)).filter(e => !isMethod(e)).map(generateRowTypeElement(lines, pickers, writeOutput)));
};

const isMethod = (e) => {
    return e.type.includes("=> Promise<") && !e.type.includes("=> Promise<OverlayEventDetail<T>>");
}

const isPicked = (e, pickers) => {
    if(pickers && pickers.length > 0)
        return pickers.includes(e.name)
    return true;
}


const generateRowTypeElement = (lines, pickers, writeOutput) => async (rowEl) => {
    return `    ${fixName(rowEl.name)} :: ${await generateType(rowEl.type, lines, pickers, writeOutput)} |+| Undefined`;
};

const fixName = (name) => {
    return name.replace(/-/g,"").replace(/\'/g,"").replace(/\"/g,"");
}

const generateType = async (typeScriptType, lines, pickers, writeOutput) => {
    if(typeScriptType.includes("=>")) return "EventHandler";
    if((!typeScriptType.includes("|") && typeScriptType.endsWith("[]"))
    || (typeScriptType.startsWith("(")&& typeScriptType.endsWith("[]")) ) 
        return await generateArrayType(typeScriptType, lines, pickers, writeOutput);
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
    const res = await sequence(typeScriptType.split("|").map(
        e => e.trim()).filter(e => e != "inherit").map(async e => await generateType(e, lines, pickers, writeOutput)));
    return distinct(res).join(" |+| ");
};

const parseGenereicRowTypeElement = (codeline) =>  {
    
    var elements = splitFirst(codeline, "?:");
    if(elements.length <= 1) elements = splitFirst(codeline, ":");
    var s = elements.map(s => s.trim());
    return {name: s[0].replace(/'/g, ""), type: s[1].replace(';','') };
}

const isComment = (codeLine) => {
    return codeLine.startsWith("/") || codeLine.startsWith("*");
};

const removeEndOfLineComment = (codeline) => {
    return codeline.split("//")[0];
};

const limitToRegion = (lines, marker, depths) => {
    lines = lines.slice(lines.findIndex(l => l.includes(`interface ${marker}`))+1);
    if(lines.length > 0 && lines[0].includes('}')) return [];
    return lines.slice(0, findIndexOfNthClosingBrace(lines, depths, 0));
};

const findIndexOfNthClosingBrace = (lines, closingBraceNo, idx) => {
    if(closingBraceNo == 0) return idx;
    return findIndexOfNthClosingBrace(lines, closingBraceNo-1, 
        lines.findIndex((l, i) => i > idx && l.includes("}")));
};


const printHeader = async (isJs, name, module, props, writeOutput) => {
    await writeOutput(isJs ? `
"use strict";
var Ionic = require("${module}");
    `:`
module Ionic.${name} where
${props.some(p => p.includes("Unit")) ? "\nimport Prelude\n\n" : ""}
import Ionic.Basic (ionElement)
import Literals.Undefined (Undefined)
import React.Basic (JSX, ReactComponent)
${props.some(p => p.includes("EventHandler")) ? "import React.Basic.Events (EventHandler)" : ""}
import Untagged.Coercible (class Coercible)
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

const splitFirst = (string, separator) => {
	const separatorIndex = string.indexOf(separator);

	if (separatorIndex === -1) {
		return [];
	}

	return [
		string.slice(0, separatorIndex),
		string.slice(separatorIndex + separator.length)
	];
};


generateIonicTypes(process.argv[2] == "js");
