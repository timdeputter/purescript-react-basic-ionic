
"use strict";
    
exports.unsafeTransformProps = props => {
    var newProps = {};
    Object.entries(props).forEach(function(entry) {
        newProps[getName(entry[0])] = entry[1];
    });
    return newProps;
};

const getName = name => {
    if(name.startsWith("aria")){
        return name.slice(0,4) + "-" + name.slice(4);
    }
    return name;
};