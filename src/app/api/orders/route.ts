import { NextResponse, NextRequest } from "next/server";
import { connect } from "@/dbconfig/dbconfig";
import orders from "@/models/orders";
import shortid from "shortid";

// Connect to the database
connect();

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const req = await request.json();
    const data = req;

    // Validate required fields
    if (!data.customername) {
      return NextResponse.json(
        { error: "Customer name is required" },
        { status: 400 }
      );
    }
    if (!data.date) {
      return NextResponse.json({ error: "Date is required" }, { status: 400 });
    }
    if (!data.amount) {
      return NextResponse.json(
        { error: "Amount is required" },
        { status: 400 }
      );
    }
    if (!data.time) {
      return NextResponse.json({ error: "Time is required" }, { status: 400 });
    }
    if (!data.method) {
      return NextResponse.json({ error: "Method is required" }, { status: 400 });
    }
    if (!data.status) {
      return NextResponse.json({ error: "Status is required" }, { status: 400 });
    }
    if (!data.phone) {
      return NextResponse.json(
        { error: "Phone number is required" },
        { status: 400 }
      );
    }
    if (!data.email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }
    if (!data.billDetails) {
      return NextResponse.json(
        { error: "Bill details are required" },
        { status: 400 }
      );
    }
    if (
      !data.billDetails.Fooditems ||
      !Array.isArray(data.billDetails.Fooditems)
    ) {
      return NextResponse.json(
        { error: "Food items are required" },
        { status: 400 }
      );
    }
    // Optional validation for empty arrays
    if (!data.billDetails.MovieItems) {
      data.billDetails.MovieItems = [];
    }
    if (!data.billDetails.birthdayhallitems) {
      data.billDetails.birthdayhallitems = [];
    }
    if (!data.billDetails.shippingAddressStreet) {
      return NextResponse.json(
        { error: "Shipping address street is required" },
        { status: 400 }
      );
    }
    if (!data.billDetails.shippingAddressState) {
      return NextResponse.json(
        { error: "Shipping address state is required" },
        { status: 400 }
      );
    }

    // Generate a unique order ID
    const orderid = shortid.generate();

    // Prepare the new order object
    const newOrder = new orders({
      orderid,
      customername: data.customername,
      date: data.date,
      amount: data.amount,
      method: data.method,
      status: data.status,
      phone: data.phone,
      email: data.email,
      billDetails: {
        Fooditems: data.billDetails.Fooditems.map((item: any) => ({
          itemid: item._id,
          CloudanaryImageId: item.CloudanaryImageId,
          DISCOUNT: item.DISCOUNT,
          CUSSINE: item.CUSSINE,
          FOODNAME: item.FOODNAME,
          PRICE: item.PRICE,
          RATINGS: item.RATINGS,
          TAGS: item.TAGS,
          quantity:item.quantity
        })),
        MovieItems: data.billDetails.MovieItems, // No need to map if empty
        birthdayhallitems: data.billDetails.birthdayhallitems, // No need to map if empty
        shipping: data.billDetails.shipping,
        shippingAddressStreet: data.billDetails.shippingAddressStreet,
        shippingAddressState: data.billDetails.shippingAddressState,
        subtotal: data.billDetails.subtotal,
        tax: data.billDetails.tax,
        total: data.billDetails.total,
      },
      payments: {
        amount: data.payments.amount,
        amount_due: data.payments.amount_due,
        amount_paid: data.payments.amount_paid,
        attempts: data.payments.attempts,
        created_at: data.payments.created_at,
        currency: data.payments.currency,
        entity: data.payments.entity,
        id: data.payments.id,
        notes: data.payments.notes || [],
        offer_id: data.payments.offer_id || null,
        receipt: data.payments.receipt,
        status: data.payments.status,
      },
      time: data.time,
    });

    // Save the order to the database
    await newOrder.save();

    // Respond with success
    return NextResponse.json(
      { message: "Order created successfully", data: newOrder },
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
