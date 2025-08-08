import React from "react";
import { useState } from "react";


export default function User() {
    return (
        <div className="user-container">
            <h1 className="text-2xl font-bold mb-4">User Profile</h1>
            <p className="text-gray-600">This is the user profile page.</p>
            {/* Additional user profile content can be added here */}
        </div>
    );
}