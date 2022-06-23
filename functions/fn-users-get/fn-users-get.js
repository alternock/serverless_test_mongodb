//utils
let {
    output,
    log
} = require("../../utils/utils");
//database
let connectDB = require("../../config/database");


exports.handler = async (event, context) => {
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