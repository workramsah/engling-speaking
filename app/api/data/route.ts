import prisma from "@/lib/prisma";
import { Prisma } from "@/app/generated/prisma/client";
import { NextResponse } from "next/server";

export async function GET(){
    try {
        const users = await prisma.user.findMany();
    return NextResponse.json(users)
        
    } catch (error) {
        return NextResponse.json({error:"thisis errror"})
    }
    
}