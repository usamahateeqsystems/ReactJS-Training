import SignUp from "./signUp";
import ListView from "./userList";
import React, { useState } from "react"

function CryptoMain(){
    const userList = [
        {
            username: "admin",
            password: "myPass",
            address: "myaddress",
            email: "myemail",
            cnic: "myfile",
    
        }
    ];
    
    const [users, setUsers] = useState(userList);
    
    const handleAddUser = (user) => {
        setUsers([...users, user]);
    }

    return (
        <>
        <SignUp createUser={handleAddUser}/>
        <ListView users={users}/>
        </>
    );
}

export default CryptoMain;