// Import the `jsonwebtoken` package to handle JWT authentication
import jwt from 'jsonwebtoken'

// Middleware function to authenticate an admin user
const adminAuth= async (req,res,next) =>{
    try {
         // Extract the token from the request headers
        const {token} = req.headers
        // If no token is provided, return an unauthorized response
        if(!token){
            return res.json({success:false, message: 'Unauthorized User '})
        }

        // Verify the token using the secret key stored in environment variables
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
          // Check if the decoded token matches the admin's credentials (email + password)
        if(token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
            return res.json({success:false, message: 'User not authorizes'})
        }
         // If authentication is successful, proceed to the next middleware or route handler
        next()
    } catch (error) {
        return res.json({success:false, message:error.message})
        
    }
}
// Export the `adminAuth` middleware so it can be used in protected routes
export default adminAuth