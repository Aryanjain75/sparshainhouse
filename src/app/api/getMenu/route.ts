import { connect } from "@/dbconfig/dbconfig";
import { Items } from "@/models/Menu";
import { NextRequest, NextResponse } from "next/server";
import APIFilter from "@/app/api/utils/APIfilters";
connect();
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const search = searchParams.get('search') || "";
        const rating = searchParams.get('rating') ? parseInt(searchParams.get('rating')!) : null;
        const tags = searchParams.get('tags') ? searchParams.get('tags')!.split(',') : [];
        const cuisine = searchParams.get('cuisine') || "";
        const minPrice = searchParams.get('minPrice') ? parseFloat(searchParams.get('minPrice')!) : null;
        const maxPrice = searchParams.get('maxPrice') ? parseFloat(searchParams.get('maxPrice')!) : null;

        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '10');
        const skip = (page - 1) * limit;

        const allItems = await Items.find({});
        const filteredItems = new APIFilter({ search, rating, tags, cuisine, minPrice, maxPrice }, allItems).applyAllFilters();
        const data = filteredItems.slice(skip, skip + limit);
        const totalItems = filteredItems.length;
        const totalPages = Math.ceil(totalItems / limit);

        return NextResponse.json({ data, totalItems, totalPages, currentPage: page }, { status: 200 });
    } catch (e: any) {
        return NextResponse.json({ error: "Sorry, server is down", details: e.message }, { status: 500 });
    }
}