import { connect } from "@/dbconfig/dbconfig";
import Agent from "@/models/Agent";
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";

// Initialize database connection
connect();

// Type definition for agent data
interface AgentData {
    orderId: string;
    agentName: string;
    contactNumber: string;
    email: string;
    agencyName: string;
    agentId: string;
    specialization: string;
    address: string;
    experience: string;
}

// Validate required fields
const validateFields = (data: Partial<AgentData>): boolean => {
    const requiredFields = ['orderId', 'agentName', 'contactNumber', 'email', 'agencyName', 'agentId', 'specialization', 'address', 'experience'];
    return requiredFields.every(field => !!data[field as keyof AgentData]);
};

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const orderId = searchParams.get('orderId');

        if (orderId) {
            // Get specific agent by orderId
            const agent = await Agent.findOne({ orderId });
            
            if (!agent) {
                return NextResponse.json({
                    message: "Agent not found"
                }, { status: 404 });
            }

            return NextResponse.json(agent);
        }

        // Get all agents if no orderId provided
        const agents = await Agent.find({});
        return NextResponse.json({data:agents});

    } catch (e: any) {
        console.error('Error in GET /agent:', e);
        return NextResponse.json({
            error: "Failed to fetch agents",
            details: e.message
        }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const agentData: AgentData = await request.json();
        
        if (!validateFields(agentData)) {
            return NextResponse.json({ message: "All fields are required" }, { status: 400 });
        }

        const agent = new Agent(agentData);
        await agent.save();

        return NextResponse.json({ 
            message: "Agent successfully appointed",
            agent: agent 
        }, { status: 201 });

    } catch (e: any) {
        console.error('Error in POST /agent:', e);
        return NextResponse.json({ 
            error: "Failed to create agent",
            details: e.message 
        }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const { orderId } = await request.json();
        
        if (!orderId) {
            return NextResponse.json({ message: "Order ID is required" }, { status: 400 });
        }

        const deletedAgent = await Agent.findOneAndDelete({ orderId });
        
        if (!deletedAgent) {
            return NextResponse.json({ 
                message: "Agent not found with provided Order ID" 
            }, { status: 404 });
        }

        return NextResponse.json({ 
            message: "Agent deleted successfully",
            deletedAgent 
        }, { status: 200 });

    } catch (e: any) {
        console.error('Error in DELETE /agent:', e);
        return NextResponse.json({ 
            error: "Failed to delete agent",
            details: e.message 
        }, { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    try {
        const agentData: AgentData = await request.json();
        
        if (!validateFields(agentData)) {
            return NextResponse.json({ message: "All fields are required" }, { status: 400 });
        }

        const { orderId, ...updateData } = agentData;

        const updatedAgent = await Agent.findOneAndUpdate(
            { orderId },
            updateData,
            { 
                new: true,
                runValidators: true 
            }
        );

        if (!updatedAgent) {
            return NextResponse.json({ 
                message: "Agent not found with provided Order ID" 
            }, { status: 404 });
        }

        return NextResponse.json({ 
            message: "Agent updated successfully",
            agent: updatedAgent 
        }, { status: 200 });

    } catch (e: any) {
        console.error('Error in PUT /agent:', e);
        return NextResponse.json({ 
            error: "Failed to update agent",
            details: e.message 
        }, { status: 500 });
    }
}
