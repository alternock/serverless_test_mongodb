let middy = require("middy");
//utils
let {
    output,
    log
} = require("../../utils/utils");
//database
let connectDB = require("../../config/database");


const customMiddleware = () =>{
   return {
      before:(handler, next)=>{
        let {correo} = handler.event.queryStringParameters;

        log("before ",correo);
        next()
    },
    after:(handler, next)=>{
        let {correo} = handler.event.queryStringParameters;
    
        log("after ",correo);
        next()
      },
      onError:(handler, next)=>{
         next()
      },
   } 
}


const fnUsers = async (event, context) => {
    let {
        httpMethod: method,
        queryStringParameters: p
    } = event;

    let client = await connectDB();
    const colUsers = client.db().collection('usuarios');

    let {
        correo
    } = p;

    try {
        let r = await colUsers.find({correo}).toArray();
        return output(r);
    } catch (error) {
        log(error)
    }
}

exports.handler = middy(fnUsers)
                  .use(customMiddleware());