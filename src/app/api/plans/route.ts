import { NextResponse, NextRequest } from "next/server";
import { connect } from "@/dbconfig/dbconfig";
import orders from "@/models/orders";
import shortid from "shortid";
import {Items} from "@/models/plans";
// Connect to the database
connect();

// Create new item
export async function POST(request: NextRequest) {
  try {
    const req = await request.json();
    const data = req;
    if(!data.orderid ||!data.plan)
    {
        return NextResponse.json({message:"Details incomplete"},{status:404})
    }
    const uploads={
        orderid:data.orderid,
        plan:data.plan
    }
    const result=new Items(uploads);
    await result.save();
    // Respond with success
    return NextResponse.json(
      { message: "Order created successfully", data: result },
      { status: 201 }
    );
  } catch (e: any) {
    console.error(e);
    // Handle errors
    return NextResponse.json(
      { error: e.message || e.toString() },
      { status: 500 }
    );
  }
}

// Get all items
export async function GET() {
  try {
    const items = await Items.find({});
    return NextResponse.json(
      { message: "Items fetched successfully", data: items },
      { status: 200 }
    );
  } catch (e: any) {
    console.error(e);
    return NextResponse.json(
      { error: e.message || e.toString() },
      { status: 500 }
    );
  }
}

// Update item by ID
export async function PUT(request: NextRequest) {
  try {
    const req = await request.json();
    const { id, ...updateData } = req;

    if (!id) {
      return NextResponse.json(
        { message: "Item ID is required" },
        { status: 400 }
      );
    }

    const updatedItem = await Items.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedItem) {
      return NextResponse.json(
        { message: "Item not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Item updated successfully", data: updatedItem },
      { status: 200 }
    );
  } catch (e: any) {
    console.error(e);
    return NextResponse.json(
      { error: e.message || e.toString() },
      { status: 500 }
    );
  }
}

// Delete item by ID
export async function DELETE(request: NextRequest) {
  try {
    const req = await request.json();
    const { id } = req;

    if (!id) {
      return NextResponse.json(
        { message: "Item ID is required" },
        { status: 400 }
      );
    }

    const deletedItem = await Items.findByIdAndDelete(id);

    if (!deletedItem) {
      return NextResponse.json(
        { message: "Item not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Item deleted successfully" },
      { status: 200 }
    );
  } catch (e: any) {
    console.error(e);
    return NextResponse.json(
      { error: e.message || e.toString() },
      { status: 500 }
    );
  }
}
