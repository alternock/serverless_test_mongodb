let {log} = require("../utils/utils");


const myMiddleware = opts => {
    return {
        before: (handler, next) => {
            let {queryStringParameters:p} = handler.event;
            
            if(p.email === "") {
                opts.error = true;
            }

            log("before ", p.email) 
            log("before ", typeof p.email) 
            next()
        },
        after: (handler, next) => {
            let {queryStringParameters:p} = handler.event;
            log("after ", p.email) 
            next()
        },
        onError: (handler, next) => {
            log("onError") 
            next()
        },
    }
}

module.exports = myMiddleware;