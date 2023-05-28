import SignUp from "./signUp";
import Login from "./login";
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
        for (const [key, value] of Object.entries(users)) {
            console.log(value.username);
            console.log(user.username);
            if (value["username"] == user["username"])
            {
                console.log(user.username);
                console.log(value["username"]);
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
        {/* <SignUp createUser={handleAddUser}/> */}
        <Login loginUser={handleLoginUser}/>
        </>
    );
}

export default CryptoMain;