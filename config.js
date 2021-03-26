let HOST = process.env.HOST || "localhost";
let PORT = process.env.PORT || 81;
module.exports={
    MONGO_URI:`mongodb+srv://judy127:<password>@cluster0.cfgze.mongodb.net/CHATTER?retryWrites=true&w=majority`,
    HOST,
    PORT}
