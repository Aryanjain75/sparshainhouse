import bcrypt from 'bcryptjs';
import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/Registration";
import Address from "@/models/Address";
import {billItems} from "@/models/billing";
import orders from "@/models/orders";
import seatUser from "@/models/Resturent";

import { sendmail } from '@/helper/mailer';
import { NextRequest, NextResponse } from "next/server";
connect();
export async function GET(request: NextRequest) {
    try {
        // Fetch users and addresses from the database
        const users = await User.countDocuments();
        const order=(await orders.countDocuments())+(await seatUser.countDocuments());
        const totalearning= (await billItems.find({}));
        let earn=0;
        let myearn=0;
        totalearning.map((Data)=>{
            Data.bill.map((val:any)=>{
                earn+=val.total;
            })
            Data.bill.filter((a:any)=>a.isPaid==true).map((val:any)=>{
                myearn+=val.total;
            })
        })
        const data = { customer: users,order:order,earn:earn,myearn:myearn };

        return NextResponse.json({ message: data }, { status: 201 });
    } catch (e: any) {
        console.error(e);
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}