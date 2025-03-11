import { Router } from "express";
import authRouter from "./auth.router.js";
const router = Router();

// Health Status Route
router.get( "/health", ( req, res ) =>
{
    return res.json( 200 ).json( {
        success: true, 
        message: "API is running correctly"
    })
} )

// Other Route Definitions
router.use( '/auth', authRouter );


//  Not Found Route
router.all( "*", ( req, res ) =>
{
    return res.status( 404 ).json( {
        success: false, 
        message: `The requested route ${req.originalUrl} does not exist on this server or is not available for the ${req.method.toLowerCase()} method`
    })
})

const appRouter = router;
export default appRouter;