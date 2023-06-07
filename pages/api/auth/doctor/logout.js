
import { serialize } from "cookie"

export default async function handler(req, res) {

    const { bloodforall } = req.cookies;
    console.log(req.cookies)

    if(!bloodforall) {
        return res.status(401).json({message: "Not logged in"});
    }

    const token = "";

    const serialized = serialize("bloodforall", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 0,
        path: "/",
    });

    res.setHeader("Set-Cookie", serialized);
    return res.status(200).json({
        message: "Logout successful",
    });
}