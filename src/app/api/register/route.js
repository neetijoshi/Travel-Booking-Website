import db from '@/lib/db'
import { NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';
import { register } from 'swiper/element';

export async function POST(req) {
    try {
        const body =await req.json()

        const{
            email,
            username,
            password
        }= body
        const isExisting = await db.user.findUnique({
            where: {
                email
            }
        })
        if(isExisting){
            return NextResponse.json({ message: "You are already registered"} , {status: 409} )
        }
        const hashedPassword = await bcryptjs.hash(password, 10)
        await db.user.create({
            data: {
                email,
                username,
                password: hashedPassword
            }
        })
        return NextResponse.json({ message: "User registered successfully"} , {status: 201} )
    } catch (error) {
        return NextResponse.error(error)
    }
}