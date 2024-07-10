import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function PUT(req: NextRequest) {
    const { id, name, email, address, country } = await req.json();
    console.log("Updating user: ", { id, name, email, address, country });

    if (!name || !email || !address || !country) {
        return NextResponse.json(
            { message: 'Missing required fields'},
            { status: 400}
        );
    }

    try {
        const updatedUser = await prisma.user.update({
            where: { id },
            data: {
                name,
                email,
                address,
                country,
            },
            select: {
                id: true,
            },
        });

        const userWithConvertedId = {
            ...updatedUser,
            id: updatedUser.id.toString(),
          };

        return NextResponse.json(
            { message: 'User profile is updated successfully', user: userWithConvertedId },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error updating user profile: ', error);
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }
}

