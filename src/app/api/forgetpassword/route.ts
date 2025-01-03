import { sendmail } from "@/helper/mailer"; // Ensure this path is correct
import { NextResponse, NextRequest } from "next/server";
import {connect} from "@/dbconfig/dbconfig";
connect();
import User from "@/models/Registration";
export async function POST(request: NextRequest) {
    try {
        const rs=await request.json();
        const {email}=rs;
        const user=await User.findOne({Email:email});
        if(!user){
            return NextResponse.json({error:"User not exist"},{status:404});
        }
        await sendmail({email,emailType:'RESET',userId:user._id});
        return NextResponse.json({ message: "Password reset link sent to your email" }, { status: 200 });
    } catch (e: any) {
        console.log(e);
        return NextResponse.json({
            error: e.message
        }, { status: 500 });
    }
}
