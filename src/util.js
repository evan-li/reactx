
const deepCopy = function(source){
    let copy = {};
    if (source === null || typeof source !== 'object') {
        return source
    }
    Object.keys(source).forEach((key) => {
        if(typeof source[key] === 'object'){
            copy[key] = deepCopy(source[key])
        }else {
            copy[key] = source[key]
        }
    });
};

const deepMerge = function(target, source){
    if (source === null || typeof source !== 'object') {
        return target
    }
    Object.keys(source).forEach((key) => {
        if(typeof source[key] === 'object'){
            deepMerge(target[key], source[key])
        }else {
            target[key] = source[key]
        }
    });
};

export default {
    deepCopy,
    deepMerge
}