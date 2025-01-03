import { connect } from "@/dbconfig/dbconfig";
import Address from "@/models/Address";
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";

connect();

export async function POST(request: NextRequest) {
  try {
    const { userId, Street, City, State, ZipCode, Country } = await request.json();
    if (!userId || !Street || !City || !State || !ZipCode || !Country) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    const newAddress = new Address({
      userId,
      Street,
      City,
      State,
      ZipCode,
      Country,
    });

    await newAddress.save();

    return NextResponse.json({ message: "ADDRESS SAVED" }, { status: 201 });
  } catch (e: any) {
    console.error(e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();
    if (!id) {
      return NextResponse.json({ message: "Address ID is required" }, { status: 400 });
    }

    const deletedAddress = await Address.findByIdAndDelete(id);
    if (!deletedAddress) {
      return NextResponse.json({ message: "Address not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Address deleted" }, { status: 200 });
  } catch (e: any) {
    console.error(e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

// New PUT endpoint for updating an address
export async function PUT(request: NextRequest) {
  try {
    const { user,id, street, city, state, zipCode, phoneNo, country } = await request.json();
    if (!id || !street || !city || !state || !zipCode || !phoneNo || !country) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    const updatedAddress = await Address.findByIdAndUpdate(
      id,
      {
        street,
        city,
        state,
        zipCode,
        phoneNo,
        country,
        user,
      },
      { new: true } // This option returns the updated document
    );

    if (!updatedAddress) {
      return NextResponse.json({ message: "Address not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Address updated successfully" }, { status: 200 });
  } catch (e: any) {
    console.error(e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
