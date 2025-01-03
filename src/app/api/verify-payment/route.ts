import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { validatePaymentVerification } from 'razorpay/dist/utils/razorpay-utils';

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || '',
  key_secret: process.env.RAZORPAY_KEY_SECRET || '',
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderId, razorpayPaymentId, razorpaySignature } = body;
    // Validate payment verification
    const isValid = validatePaymentVerification(
      {
        order_id: orderId,
        payment_id: razorpayPaymentId,
      },
      razorpaySignature,
      process.env.RAZORPAY_KEY_SECRET || ''
    );

    if (isValid) {
      return NextResponse.json({ verified: true }, { status: 200 });
    } else {
      return NextResponse.json({ verified: false, message: 'Invalid signature' }, { status: 400 });
    }
  } catch (error) {
    console.error('Payment verification error:', error);
    return NextResponse.json({ error: 'Error verifying payment',m:error }, { status: 500 });
  }
}
