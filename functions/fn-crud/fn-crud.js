//utils
let {
    output,
    log
} = require("../../utils/utils");
//database
let  connectDB = require("../../config/database");


exports.handler = async (event, context) => {
    let {
        httpMethod: method,
        queryStringParameters:p
    } = event;

    let client = await connectDB(); 
    const colUsers = client.db().collection('usuarios');

    if (method == "POST") {
        try {
            await colUsers.insertOne({
                correo: "qux@qux.com",
                nombre: "qux",
            });
            return output("usuario creado...")
        } catch (error) {
            log(error)
        }
    }

    if (method == "GET") {
        let {correo} = p;
        try {
            let r = await colUsers.find({correo}).toArray();
            return output(r);
        } catch (error) {
            log(error)
        }
    }
    
    if (method == "DELETE") {
        try {
            await colUsers.deleteOne({correo:"qux@qux.com"});
            return output("usuario eliminado...");
        } catch (error) {
            log(error)
        }
    }

    if (method == "PUT") {
        try {
            await colUsers.updateOne({correo:"bar@bar.com"}, {$set:{
                nombre:"barkzi"
            }});
            return output("usuario modificado...");
        } catch (error) {
            log(error)
        }
    }
}