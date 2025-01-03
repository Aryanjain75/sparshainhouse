import { NextResponse, NextRequest } from "next/server";
import { connect } from "@/dbconfig/dbconfig";
import { BirthdayHallDecoration } from "@/models/Birthdayhalldecoration";

connect();

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id } = params;
        const data = await BirthdayHallDecoration.find();
        return NextResponse.json(
            {
                message: "Data fetched successfully",
                data: data.filter((val) => val._id==id)
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching data:", error);
        // Return error response
        return NextResponse.json(
            {
                errorMessage: "Internal Server Error",
                error: error,
            },
            { status: 500 }
        );
    }
}
