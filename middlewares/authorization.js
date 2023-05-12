import * as jose from 'jose'

export async function middleware(req,res) {

    const token = req.headers?.authorization
    if (token)
    {
        const secret = new TextEncoder().encode(
            process.env.ACCESS_TOKEN_SECRET
        );
        try {
            const {payload,protectedHeader}= await jose.jwtVerify(token,secret)
            if (payload===null) {
                return res.status(401).json({ status:false,  message: 'Authentication not valid' })
            }
            return payload
        } catch (error) {
            return res.status(401).json({ status:false,  message: 'Authentication not valid',response:error })
        }
    }
    return res.status(401).json({ status:false,  message: 'Authentication not valid' })

}
