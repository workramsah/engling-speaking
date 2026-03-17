import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(){
    const users = await prisma.user.findMany();
    return NextResponse.json(users)
}

export async function POST(request:NextRequest){
    try {
      const body = await request.json()
const values = await prisma.user.create({
    data:{
        age:body.age,
        name:body.name,
        point:body.point
    }
})

return NextResponse.json(values)  
    } catch (error) {
     return NextResponse.json({error:"thisi"})   
    }

}