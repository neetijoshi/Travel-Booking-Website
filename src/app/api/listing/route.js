import { getCurrentUser } from "@/lib/currentUser";
import db from "@/lib/db";
import { NextResponse } from "next/server";

// export async function GET(req){
//     try {
//         const listings = await db.listing.findMany({
//             take: 10
//         })

//         return NextResponse.json(listings)
//     } catch (error) {
//         return NextResponse.error(error)
//     }
// }

export async function POST(req) {
    try {
        // await isAdminUser()

        const currentUser = await getCurrentUser()
        console.log("Current User:", currentUser);
        if(!currentUser?.isAdmin){
            return NextResponse.error({ message: "Only admin users can create listings!" })
        }
        const body= await req.json()
        Object.values(body).forEach((v) => {
            if (v === "") return NextResponse.error({ message: "Fill all fields!" })
        })

        const {
            name,
            location,
            desc,
            type,
            pricePerNight,
            beds,
            hasFreeWifi,
            imageUrls
        } = body

        const newListing = await db.listing.create({
            data: {
                name,
                location,
                desc,
                type,
                pricePerNight,
                beds,
                hasFreeWifi,
                imageUrls: imageUrls || []
            }
        })

        return NextResponse.json(newListing)
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}