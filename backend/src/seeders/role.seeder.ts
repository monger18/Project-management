import mongoose from "mongoose";
import "dotenv/config";
import connectToDatabase from "../config/database.config";
import RoleModel from "../models/roles-permission.model";
import { RolePermissions } from "../utils/role-permission";

const seedRole = async () => {
    console.log("Seeding roles...");
    try {
        await connectToDatabase();
        const sessions = await mongoose.startSession();
        sessions.startTransaction();
        console.log("Clearing existing roles...");
        await RoleModel.deleteMany({}, { session: sessions });

        for(const roleName in RolePermissions) {
            const role = roleName as keyof typeof RolePermissions;
            const permissions = RolePermissions[role];

            const existingRole = await RoleModel.findOne({ name: role }).session(sessions);
            if (!existingRole) {
                const newRole = new RoleModel({
                    name: role,
                    permissions: permissions,
                });
                await newRole.save({ session: sessions });
                console.log(`Role ${role} created with permissions: ${permissions.join(", ")}`);
            } else {
                console.log(`Role ${role} already exists, skipping creation.`);
            }
        }
        await sessions.commitTransaction();
        console.log("Transaction committed successfully.");
        sessions.endSession();
        console.log("Session ended successfully.");
        console.log("Roles seeded successfully.");

    } catch (error) {
        console.error("Error seeding roles:", error);
        
    }
};

seedRole().catch((error) => {
   console.error("Error running seeding script:", error); 
});