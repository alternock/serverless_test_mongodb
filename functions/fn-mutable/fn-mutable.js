let middy = require("middy");
//
let myMiddleware = require("../../middlewares/my_middleware.js");
let {output} = require("../../utils/utils");


let opts = {
    error:false
}

const fnMain = async (event, context) => {
    let email = event.queryStringParameters.email;

    if(opts.error){
        return output("falta el email");
    }
    return output(email);
}

exports.handler = middy(fnMain)
                  .use(myMiddleware(opts));

