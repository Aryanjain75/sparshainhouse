import bcrypt from 'bcryptjs';
import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/Registration";
import Address from "@/models/Address";
import { sendmail } from '@/helper/mailer';
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
    try {
        const { Name, Email, Password, PhoneNumber, Street, City, State, ZipCode, Country } = await request.json();
        
        if (!Name || !Email || !Password || !PhoneNumber || !Street || !City || !State || !ZipCode || !Country) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }

        const exists = await User.findOne({ Email });
        if (exists) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(Password, salt);
        
        const newUser = new User({
            Name,
            Email,
            Password: hashedPassword,
            PhoneNumber,
            url:"https://res.cloudinary.com/devj7oonz/image/upload/v1721205831/blank-profile-picture-973460_960_720_t570pe.png",
            isVerified: false
        });

        const result = await newUser.save();

        const newAddress = new Address({
            user: result._id,
            street:Street,
            city:City,
            phoneNo:PhoneNumber,
            state:State,
            zipCode:ZipCode,
            country:Country
        });

        await newAddress.save();

        await sendmail({ email: Email, emailType: "VERIFY", userId: result._id });

        return NextResponse.json({ message: "USER CREATED", userId: result._id }, { status: 201 });
    } catch (e:any) {
        console.error(e);
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}
export async function GET(request: NextRequest) {
    try {
        // Fetch users and addresses from the database
        const users = await User.find({});
        const addresses = await Address.find({});

        // Map addresses to their corresponding users
        const userMap = users.map(user => {
            // Filter addresses that belong to the current user
            const userAddresses = addresses.filter(address => address.user.toString() === user._id.toString());

            // Return the user object with their addresses
            return {
                ...user.toObject(), // Convert Mongoose document to plain JS object
                addresses: userAddresses
            };
        });
        const data = { users: userMap };

        return NextResponse.json({ message: data }, { status: 201 });
    } catch (e: any) {
        console.error(e);
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}
export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        
        if (!id) {
            return NextResponse.json({ error: "User ID is required" }, { status: 400 });
        }

        // Delete user
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Delete associated addresses
        await Address.deleteMany({ user: id });

        return NextResponse.json({ message: "User deleted successfully" }, { status: 200 });
    } catch (e: any) {
        console.error(e);
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}