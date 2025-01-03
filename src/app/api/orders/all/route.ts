import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/dbconfig/dbconfig'; // Assuming you have a file to handle MongoDB connection
import Order from '@/models/orders';

// Database connection
connect();

export async function GET(req: NextRequest) {
  try {
   
    const orders = await Order.find({});
    console.log(orders);
    if (!orders.length) {
      console.log(orders);

      return NextResponse.json({ message: 'No orders yet' }, { status: 404 });
    }

    return NextResponse.json({ orders, message: "Success" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
