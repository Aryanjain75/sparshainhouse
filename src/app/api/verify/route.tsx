import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/Registration"; // Correct import
import { sendmail } from "@/helper/mailer"; 

connect();

export async function POST(request: NextRequest) {
    try {
        const res = await request.json();
        const { Email } = res;
        const details = await User.findOne({ Email }); // Using findOne to get a single user

        if (!details) {
            return NextResponse.json({ error: "User does not exist" });
        }

        await sendmail({ email: details.Email, emailType: "VERIFY", userId: details._id });

        return NextResponse.json({ message: "Verification email sent successfully" });
    } catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}
