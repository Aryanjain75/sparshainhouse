import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/dbconfig/dbconfig'; // Assuming you have a file to handle MongoDB connection
import Order from '@/models/orders';

// Database connection
connect();

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = req.nextUrl.pathname.split('/').pop(); // Extracting the id from the URL

    if (!id) {
      return NextResponse.json({ message: 'Email is required' }, { status: 400 });
    }

    const orders = await Order.find({ email: id });
    console.log(orders);
    if (!orders.length) {
      console.log(orders);

      return NextResponse.json({ message: 'No orders found for this email' }, { status: 404 });
    }

    return NextResponse.json({ orders, message: "Success" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
