import Address from '@/models/Address';
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { connect } from '@/dbconfig/dbconfig';
import user from '@/models/Registration';
import bcrypt from "bcryptjs";

connect();

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('Token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Token not found' }, { status: 401 });
    }

    const decoded: any = jwt.decode(token);
    const userDetails = await user.findOne({ _id: decoded.id });
    const address = await Address.find({ user: decoded.id });
    
    if (!userDetails) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const details = {
      image: userDetails.url,
      isAdmin: userDetails.isAdmin,
    };

    return NextResponse.json({ message: details }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}
