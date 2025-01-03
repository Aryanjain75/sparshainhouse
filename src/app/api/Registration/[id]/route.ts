import { NextResponse, NextRequest } from "next/server";
import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/Registration";
import Address from "@/models/Address"; // Corrected the import

connect();

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id } = params;
        const userData = await User.findById(id);
        if (!userData) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const userAddresses = await Address.find({ user: id });
        const message = { data: userData, users: userAddresses };

        return NextResponse.json({ message }, { status: 200 });
    } catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id } = params;
        const requestData = await request.json();

        // Find the user by ID and update with new data
        const updatedUser = await User.findByIdAndUpdate(id, requestData, { new: true });
        if (!updatedUser) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // If there are address updates, handle them
        if (requestData.addresses) {
            for (const address of requestData.addresses) {
                if (address._id) {
                    // Update existing address
                    await Address.findByIdAndUpdate(address._id, address, { new: true });
                } else {
                    // Add new address
                    const newAddress = new Address({ ...address, user: id });
                    await newAddress.save();
                }
            }
        }

        return NextResponse.json({ message: "User updated successfully", data: updatedUser }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
