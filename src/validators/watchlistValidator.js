import { z } from "zod";

const addtowatchlistSchema = z.object({
    movieId: z.string().uuid(),
    status: z.enum([ "PLANNED","WATCHING","COMPLETED","DROPPED"],{
        error:() => ({
            message: "Status must be one of :  PLANNED, WATCHING, COMPLETED, DROPPED"
        })
    }).optional(),
    rating: z.coerce.number().int().min(1).max(10).optional(),
    notes: z.string().optional(),
})

export {addtowatchlistSchema};