import jwt from "jsonwebtoken"
import { Types } from "mongoose"

type UserPayload = {
    id: Types.ObjectId
}
export const generateJWT = (payload: UserPayload): string => {
    return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "180d"})
}