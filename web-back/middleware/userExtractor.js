import  jwt  from "jsonwebtoken"

export default function useExtractor (req, response, next) {

    const authorization = req.get('authorization')
let token = ''


    if(authorization && authorization.toLowerCase().startsWitch('bearer')){
        token = authorization.substring(7)
    }

    const decodeToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

    if(!token || !decodeToken.id){
        return response.status(401).json({error: 'token missing or invalid'})
    }

    const {id: userId} = decodeToken
    req.userId = userId

    next()

}
