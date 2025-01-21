import { NextResponse, NextRequest } from "next/server";
import { connect } from "@/dbconfig/dbconfig";
import orders from "@/models/orders";
import shortid from "shortid";
import {billItems} from "@/models/billing";
// Connect to the database
connect();

// Create new item
export async function POST(request: NextRequest) {
  try {
    const req = await request.json();
    const data = req;
    if(!data.orderid ||!data.bill)
    {
        return NextResponse.json({message:"Details incomplete"},{status:404})
    }
    const uploads={
        orderid:data.orderid,
        bill:data.bill
    }
    let result;
    const existingBill = await billItems.findOne({orderid: data.orderid});
    if(!existingBill)
    {
        result = new billItems(uploads);
        await result.save();
    }
    else{
        result = await billItems.findOneAndUpdate({orderid: data.orderid}, uploads, {new: true});
    }
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

    const deletedItem = await billItems.findByIdAndDelete(id);

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

