"use client";

import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "@/context/CartContext";
import { BirthdayhallContext } from "@/context/Birthdayhall";
import { Cartcontext } from "@/context/MoviesFoodContext";
import Link from "next/link";
import Cart from "@/components/cart/cart";
import axios from "axios";
import { UsernameContext } from '@/context/UserContext';
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import Moviecart from "@/components/cart/Moviecart";
import Birthdayhallcart from "@/components/cart/Birthdayhallcart";
import { FinalCheckoutContext } from "@/context/FinalContext";
import { toast } from "react-toastify";
import Razorpay from "razorpay";
import shortid from "shortid";
export default function Page() {
  const {addItemsToCart: FoodaddItemsToCart,deleteItemFromCart: FooddeleteItemFromCart,cart: Foodcart,clearCart: foodclear,quantity} = useContext(CartContext);
  const { username, PhoneNumber, Email,Address } = useContext(UsernameContext);
  const [Method, setMethod] = useState("Online");
  const {cart: Birthdayhall,addItemsToCart: BirthdayaddItemToCart,clearCart: clearBirthdayCart,deleteItemFromCart: deleteBirthdayItem,} = useContext(BirthdayhallContext);
  const { moviedata: Movie, addItemsToCart: MovieaddItemsToCart, clearCart: clearMovieItemsCart, deleteItemFromCart: deleteMovieItem, Theaters,} = useContext(Cartcontext);
  const [Moviebillingdata, setMovieBillingData] = useState<any[]>([]);
  const [Birthdayhalldata, setBirthdayhalldata] = useState<any[]>([]);
  const [movieamount,setmovieamount]=useState(0);
  const [Birthdayamount,setBirthdayamount]=useState(0);
  const [BirthdayDiscountamount,setBirthdayDiscountamount]=useState(0);
  const {bill,setbill}=useContext(FinalCheckoutContext);
  const router = useRouter();
  

  const populatemoviebilllayout = async () => {
    const Movies = [];
    for (const data of Movie?.cartItems || []) {
      try {
        const { data: moviedata } = await axios.get(
          `https://movieapi-rook.onrender.com/in/getmovie/${data.movieId}`
        );
        const m={ ...Theaters[data.SeatingArrangement], additionalEquipment: data.additionalEquipment, address: data.address, contactNumber: data.contactNumber, customerName: data.customerName, dateTime: data.dateTime, movieduration: data.duration, email: data.email, Refid: data.id, movieName: data.movieName, notes: data.notes, numberOfSeats: data.numberOfSeats, specialRequests: data.specialRequests, staffHandling: data.staffHandling, ...moviedata,};
        setmovieamount(movieamount+Number(m.Price)*Number(m.numberOfSeats)+100);
        Movies.push(m);
      } catch (error) {
        console.error("Error fetching movie data:", error);
      }
    }
    setMovieBillingData(Movies);
  };
  const populatepartyhalllayout = async () => {
    const Movies = [];
    for (const data of Birthdayhall?.newCartItems || []) {
      try {
        const m=data;
        Movies.push(m);
      } catch (error) {
        console.error("Error fetching movie data:", error);
      }
    }
    setBirthdayamount(1000*Birthdayhall?.newCartItems.length);
    setBirthdayhalldata(Movies);
  };
  useEffect(() => {
    if (Movie?.cartItems?.length > 0) {
      populatemoviebilllayout();
    }
    if(Birthdayhall?.newCartItems.length>0)
    {
      populatepartyhalllayout();
    }
    console.log(Birthdayhall);
  }, [Movie?.cartItems, Birthdayhall?.newCartItems]);

  const FoodamountWithoutTax = Foodcart?.cartItems?.reduce(
    (acc: any, item: any) => acc + item.quantity * item.PRICE,
    0
  ) || 0;

  const FoodamountWithDiscount = Foodcart?.cartItems?.reduce(
    (acc: any, item: any) => acc + item.quantity * item.DISCOUNTED_PRICE,
    0
  ) || 0;
  const amountWithDiscount=FoodamountWithDiscount+movieamount+Number(Birthdayamount||0);
  const amountWithoutTax=FoodamountWithoutTax+movieamount+Birthdayamount;

  const taxAmount = (amountWithDiscount * 0.15).toFixed(2);
  const shipping = 0;
  const totalAmount = (Number(amountWithDiscount) + Number(taxAmount) + shipping).toFixed(2);

  const checkout = async () => {
    try {
      if(!username)
      {
        router.push("/login");
        
      }else{
      // Load Razorpay script dynamically if not already loaded
      if (!(window as any).Razorpay) {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);
  
        await new Promise((resolve, reject) => {
          script.onload = resolve;
          script.onerror = () => reject(new Error("Failed to load Razorpay SDK"));
        });
      }
  
      const date = new Date().toISOString().split("T")[0];
      const time = new Date().toLocaleTimeString();
  
      const orderId = shortid.generate();
      const billDetails = {
        Fooditems:Foodcart?.cartItems || [],
        MovieItems: Moviebillingdata || [],
        birthdayhallitems: Birthdayhalldata || [],
        subtotal: amountWithoutTax,
        shipping,
        shippingAddressStreet: "123456",
        shippingAddressState: "India",
        tax: taxAmount,
        total: totalAmount,
      };
  
      console.log(billDetails);
  
      const amount = Number(billDetails.total) * 100; 
      const res = await axios.post("/api/create-order", { amount:Math.floor(amount/100) });
      if (res.status !== 200) {
        throw new Error("Failed to create order. Please try again.");
      }
  
      const { id: razorpayOrderId } = res.data;
      const data = {
        orderid: orderId,
        customername: username,
        date,
        amount: totalAmount,
        method: Method,
        status: "Processing...",
        phone: PhoneNumber,
        email: Email,
        payments:res.data,
        time,
        billDetails,
      };
  
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Razorpay Key ID
        amount,
        currency: "INR",
        name: username,
        description: "Test Transaction",
        image: "https://example.com/your_logo",
        order_id: razorpayOrderId, // Razorpay order ID from backend
        callback_url: "/api/verify-payment", // Your server endpoint to verify payments
        prefill: {
          name: username,
          email: Email,
          contact: PhoneNumber,
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
        handler: async (response: any) => {
          try {
            // Verify payment on the backend
            const verifyRes = await axios.post("/api/verify-payment", {
              orderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
            });
  
            if (verifyRes.data.verified) {
              // Save order details on server
              const orderSaveRes = await axios.post("/api/orders/", data);
              if (orderSaveRes.status > 199 && orderSaveRes.status < 300) {
                foodclear();
                clearMovieItemsCart();
                clearBirthdayCart();
                console.log(orderSaveRes);
                toast.success("Payment successful! Order has been placed.");
              } else {
                throw new Error("Failed to save order details. Please contact support.");
              }
            } else {
              alert("Payment verification failed. Please contact support.");
            }
          } catch (err) {
            console.error("Error during order submission:", err);
            alert("Failed to save order details. Please try again."+err);
          }
        },
      };
  
      const paymentGateway = new (window as any).Razorpay(options);
      paymentGateway.open();
      toast.success("We will call you within 30 mins when we schedule your mention things our accuracy is 99.99% otherwise we will give your money back with 5% interest")
    }
    } catch (error) {
      console.error("Error during checkout:", error);
      alert("An error occurred during checkout. Please try again.");
    }
  };
  
  return (
    <>
      <section className="sm:py-13 bg-blue-100 pt-20">
        <div className="container max-w-screen-xl mx-auto px-4 pt-4">
          <h2 className="text-3xl font-semibold mb-2">
            { 0} Item(s) in Cart
          </h2>
        </div>
      </section>
      <div className="p-5 flex flex-col md:flex-row gap-5">
        <div className="w-full md:w-[75vw]">
          <div className="join join-vertical w-full">
            <div className="collapse collapse-arrow join-item border-base-300 border">
              <input type="radio" name="my-accordion-4" defaultChecked />
              <div className="collapse-title text-xl font-medium">
                <section className="sm:py-13 bg-blue-100">
                  <div className="container max-w-screen-xl mx-auto px-4 pt-4">
                    <h2 className="text-3xl font-semibold mb-2">
                      {Moviebillingdata.length || 0} Item(s) in Private Theater booking Cart
                    </h2>
                  </div>
                </section>
              </div>
              <div className="collapse-content">
              {Moviebillingdata?.length > 0 && (
                  <section className="py-10">
                    <div className="container max-w-screen-xl mx-auto px-4">
                      <div className="flex flex-col gap-4">
                        <Moviecart addItemsToCart={MovieaddItemsToCart}  deleteItemFromCart={deleteMovieItem} cart={Moviebillingdata} clearcart={clearMovieItemsCart} populatemoviebilllayout={populatemoviebilllayout}/>
                      </div>
                    </div>
                  </section>
                )}
              </div>
            </div>
            <div className="collapse collapse-arrow join-item border-base-300 border">
              <input type="radio" name="my-accordion-4" />
              <div className="collapse-title text-xl font-medium">
                <section className="sm:py-13 bg-blue-100">
                  <div className="container max-w-screen-xl mx-auto px-4 pt-4">
                    <h2 className="text-3xl font-semibold mb-2">
                      {Birthdayhall?.newCartItems.length|| 0} Item(s) in Birhtday hall Cart
                    </h2>
                  </div>
                </section>
              </div>
              <div className="collapse-content">
              {Birthdayhall?.newCartItems?.length > 0 && (
                  <section className="py-10">
                    <div className="container max-w-screen-xl mx-auto px-4">
                      <div className="flex flex-col gap-4">
                        {Birthdayhall?.newCartItems.map((data:any,index:any)=>{
                                                <Birthdayhallcart formData={data} index={index} deleteBirthdayItem={deleteBirthdayItem}/>
                        })}
                       </div>
                    </div>
                  </section>
                )}
              </div>
            </div>
            <div className="collapse collapse-arrow join-item border-base-300 border">
              <input type="radio" name="my-accordion-4" />
              <div className="collapse-title text-xl font-medium">
                <section className="sm:py-13 bg-blue-100">
                  <div className="container max-w-screen-xl mx-auto px-4 pt-4">
                    <h2 className="text-3xl font-semibold mb-2">
                      {quantity || 0} Item(s) in Food Cart
                    </h2>
                  </div>
                </section>
              </div>
              <div className="collapse-content">
                {Foodcart?.cartItems?.length > 0 && (
                  <section className="py-10">
                    <div className="container max-w-screen-xl mx-auto px-4">
                      <div className="flex flex-col gap-4">
                        <Cart addItemsToCart={FoodaddItemsToCart}  deleteItemFromCart={FooddeleteItemFromCart} cart={Foodcart} quantity={quantity} />
                      </div>
                    </div>
                  </section>
                )}
              </div>
            </div>
          </div>
        </div>
        <aside className="w-full md:w-1/4">
          <article className="border border-gray-200 bg-white shadow-sm rounded mb-5 p-3 lg:p-5">
            <ul className="mb-5">
              <li className="flex justify-between text-gray-600 mb-1">
                <span>Amount before Tax:</span>
                <span>₹{amountWithoutTax}</span>
              </li>
              <li className="flex justify-between text-gray-600 mb-1">
                <span>Amount After Discount:</span>
                <span>₹{amountWithDiscount}</span>
              </li>
              <li className="flex justify-between text-gray-600 mb-1">
                <span>Total Units:</span>
                <span className="text-green-500">
                  {Foodcart?.cartItems?.reduce(
                    (acc:any, item:any) => acc + item.quantity,
                    0
                  )}{" "}
                  (Units)
                </span>
              </li>
              <li className="flex justify-between text-gray-600 mb-1">
                <span>TAX:</span>
                <span>₹{taxAmount}</span>
              </li>
              <li className="text-lg font-bold border-t flex justify-between mt-3 pt-3">
                <span>Total price:</span>
                <span>₹{totalAmount}</span>
              </li>
            </ul>

            <button onClick={checkout} className="px-4 py-3 mb-2 inline-block text-lg w-full text-center font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 cursor-pointer">
              Continue
            </button>

            <Link
              href="/Menu"
              className="px-4 py-3 inline-block text-lg w-full text-center font-medium text-green-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100"
            >
              Back to shop
            </Link>
          </article>
        </aside>
      </div>
    </>
  );
}
