// Import required dependencies
import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/Resturent";
import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import shortid from "shortid";

// Connect to database
connect();

// PUT route handler to update user status to "Confirmed"
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id } = params;
        if (!id) {
            return NextResponse.json(
                { error: "ID is required" },
                { status: 400 }
            );
        }

        const user = await User.findById(id);
        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        // Create update object with confirmed status
        const newdata = {
            orderid:user.orderid,
            userid:user.userid,
            name:user.name,
            email:user.email,
            phone:user.phone,
            date:user.date,
            time:user.time,
            noOfPeople:user.noOfPeople,
            message:user.message,
            status:"confirmed"}

    // Update user in database
    const Editeduser = await User.findByIdAndUpdate(id, newdata);

    // Return success response
    return NextResponse.json({
        message: "User updated successfully",
        data: Editeduser
    });

} catch (error: any) {
    // Return error response if operation fails
    return NextResponse.json(
        { error: error.message },
        { status: 500 }
    );
}
}

// DELETE route handler to remove user from database
export async function DELETE(request: NextRequest) {
    try {
        // Get id from URL search params
        const id = request.nextUrl.pathname.split('/').pop();

        // Validate id exists
        if (!id) {
            return NextResponse.json(
                { error: "ID is required" },
                { status: 400 }
            );
        }

        // Delete user from database
        const deletedUser = await User.findByIdAndDelete(id);

        // Return error if user not found
        if (!deletedUser) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        // Return success response
        return NextResponse.json({
            message: "User deleted successfully",
            data: deletedUser
        });

    } catch (error: any) {
        // Return error response if operation fails
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}
