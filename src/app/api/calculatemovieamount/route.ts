import { connect } from "@/dbconfig/dbconfig";
import { Items } from "@/models/Menu";
import { NextRequest, NextResponse } from "next/server";

connect();

interface Quantities {
  [key: string]: number;
}

interface data {
  additionalEquipment: string;
  address: string;
  contactNumber: string;
  customerName: string;
  dateTime: string;
  duration: string;
  email: string;
  movieName: string;
  movieprice: number;
  notes: string;
  numberOfSeats: string;
  quantities: Quantities;
  seatingArrangement: string;
  selectedRows: {
    [key: string]: boolean;
  };
  specialRequests: string;
  staffHandling: string;
}

interface RequestBody {
  movieId: any;
  quantities: any;
  movieprice: number;
  customerName: any;
  contactNumber: any;
  email: any;
  movieName: any;
  numberOfSeats: any;
  seatingArrangement: any;
  additionalEquipment: any;
  address: any;
  dateTime: any;
  duration: any;
  notes: any;
  specialRequests: any;
  staffHandling: any;
  data: {
    additionalEquipment: string;
  address: string;
  contactNumber: string;
  customerName: string;
  dateTime: string;
  duration: string;
  email: string;
  movieName: string;
  movieprice: number;
  notes: string;
  numberOfSeats: string;
  quantities: Quantities;
  seatingArrangement: string;
  selectedRows: {
    [key: string]: boolean;
  };
  specialRequests: string;
  staffHandling: string;
  }
}

interface Item {
  _id: string;
  CloudanaryImageId: string;
  DISCOUNT: string;
  CUSSINE: string;
  FOODNAME: string;
  PRICE: string;
  DISCOUNTED_PRICE: string;
  RATINGS: number;
  TAGS: string[];
  __v: number;
}

interface DetailedFoodItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  totalCost: number;
  image: string;
  discount: number;
  discountedPrice: number;
  ratings: number;
  tags: string[];
  cuisine: string;
}

export async function POST(request: NextRequest) {
  try {
    const data: RequestBody = await request.json();

    // Check if quantities are defined
    if (!data.quantities) {
      throw new Error("Quantities are not defined");
    }

    const quantities: Quantities = data.quantities;
    const moviePrice: number = data.movieprice;

    // Fetch all items to get their prices and details
    const allItems: Item[] = await Items.find({});

    // Create a map for quick lookup of item details by their IDs
    const foodDetails: { [key: string]: Item } = {};
    allItems.forEach(item => {
      foodDetails[item._id] = item; // Ensure the ID is a string for consistency
    });

    // Calculate total food cost and generate detailed food items list
    let totalFoodCost = 0;
    const detailedFoodItems: DetailedFoodItem[] = [];
    for (const [foodId, quantity] of Object.entries(quantities)) {
      if (foodDetails[foodId] !== undefined) {
        const item = foodDetails[foodId];
        const itemTotalCost = parseFloat(item.PRICE) * quantity;
        totalFoodCost += itemTotalCost;

        detailedFoodItems.push({
          id: item._id,
          name: item.FOODNAME,
          price: parseFloat(item.PRICE),
          quantity: quantity,
          totalCost: itemTotalCost,
          image: item.CloudanaryImageId,
          discount: parseFloat(item.DISCOUNT),
          discountedPrice: parseFloat(item.DISCOUNTED_PRICE),
          ratings: item.RATINGS,
          tags: item.TAGS,
          cuisine: item.CUSSINE
        });
      } else {
        console.warn(`Item with ID ${foodId} not found`);
      }
    }

    // Calculate total cost
    const totalCost = moviePrice + totalFoodCost;
    const billDetails = {
      movieId:data.movieId,
      customerName: data.customerName,
      contactNumber: data.contactNumber,
      email: data.email,
      movieName: data.movieName,
      moviePrice: moviePrice,
      numberOfSeats: data.numberOfSeats,
      seatingArrangement: data.seatingArrangement,
      totalFoodCost: totalFoodCost,
      totalCost: totalCost,
      detailedFoodItems: detailedFoodItems, // Include detailed food items in the response
      additionalEquipment: data.additionalEquipment,
      address: data.address,
      dateTime: data.dateTime,
      duration: data.duration,
      notes: data.notes,
      specialRequests: data.specialRequests,
      staffHandling: data.staffHandling
    };

    return NextResponse.json({data:billDetails}, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ error: "Sorry, server is down", details: e.data }, { status: 500 });
  }
}
