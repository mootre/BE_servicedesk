const jwt = require('jsonwebtoken');

class token_manager{
    static getToken(){
        return require('crypto').randomBytes(64).toString('hex');
    }
    static generateToken(playload){
        return jwt.sign(playload,process.env.TOKEN_KEY,{expiresIn: '10s' })
    }
    static checkAuthToken(request){
        try{
            let accessToken = request.headers.authorization.split(" ")[1];
            let response = jwt.verify(String(accessToken),process.env.TOKEN_KEY);
            return response;
        }catch(err){
            return false;
        }
    }
}


module.exports={token_manager}