
// Payment routes for Razor Pay integration
import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { validatePaymentVerification } from 'razorpay/dist/utils/razorpay-utils';

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || '',
  key_secret: process.env.RAZORPAY_KEY_SECRET || ''
});

// Create order
export async function POST(req: NextRequest, res: NextResponse) {
    try {
      const body = await req.json();
      const options = {
        amount: body.amount * 100, 
        currency: "INR",
        receipt: `order_${Date.now()}`
      };

      const order = await razorpay.orders.create(options);
      return Response.json(order);
    } catch (error) {
      return Response.json({ error: 'Error creating order',m:error }, { status: 500 });
    }
 
}
