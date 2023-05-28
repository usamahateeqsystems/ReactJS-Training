import SignUp from "./signUp";
import Login from "./login";
import React, { useState } from "react"

function CryptoMain(){
    const userList = [
        {
            username: "admin",
            password: "admin",
            address: "admin",
            email: "admin@admin.com",
            cnic: "myfile",
    
        }
    ];

    const [users, setUsers] = useState(userList);
    
    const handleAddUser = (user) => {
        for (const [key, value] of Object.entries(users)) {
            if (value["username"] == user["username"])
            {
                return false;
            }
        }
        setUsers([...users, user]);
        return true;
    }

    const handleLoginUser = (user, password) => {
        for (const [key, value] of Object.entries(users)) {
            if (value["username"] == user && value["password"] == password)
            {
                return true;
            }
        }
        return false;
    }

    return (
        <>
        {/* <SignUp createUser={handleAddUser} /> */}
        <Login loginUser={handleLoginUser} />
        </>
    );
}

export default CryptoMain;