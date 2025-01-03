import { NextResponse, NextRequest } from "next/server";
import { connect } from "@/dbconfig/dbconfig";
import { BirthdayHallDecoration } from "@/models/Birthdayhalldecoration";

// Connect to the database
connect();

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const start = parseInt(searchParams.get("start") || "0", 10); // Default start is 0
        const end = parseInt(searchParams.get("end") || "5", 10); // Default end is 5
        const name = searchParams.get("name");
        const data = await BirthdayHallDecoration.find();
        return NextResponse.json(
            {
                message: "Data fetched successfully",
                totallength: data.filter((val) => val.name.includes(name)).length,
                data: data.filter((val) => val.name.includes(name)).slice(start, end)
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
