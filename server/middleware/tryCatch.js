export const TryCatch = (handler)=>{
    return async (req, res, next)=>{
        try {
           await handler(req,res,next);
        } catch (error) {
           res.send({
            status: 500,
            message: "Database Error",
            error: error.message
           }) 
        }
    }
}