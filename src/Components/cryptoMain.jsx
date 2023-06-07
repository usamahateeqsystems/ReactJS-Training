import SignUp from "./signUp";
import Login from "./login";
import Header from "./header";
import Footer from "./footer";
import React, { useState } from "react"

function CryptoMain(){

    const userList = [
        {
            name: "admin",
            password: "admin",
            address: "admin",
            email: "admin@admin.com",
            cnic: "myfile",
    
        }
    ];

    const [users, setUsers] = useState(userList);
    const [userStatus, setUserStatus] = useState("signin");
    
    const handleAddUser = (user) => {
        for (const [key, value] of Object.entries(users)) {
            if (value["email"] == user["email"])
            {
                return false;
            }
        }
        setUsers([...users, user]);
        return true;
    }

    const handlerLogout = () => {
        setUserStatus("signin");
    }

    const handlerLogin = () => {
        setUserStatus("login");
    }


    const handleLoginUser = (email, password) => {
        for (const [key, value] of Object.entries(users)) {
            if (value["email"] == email && value["password"] == password)
            {
                setUserStatus("logged");
                return true;
            }
        }
        return false;
    }

    return (
        <>
        <Header userStatus={userStatus} handlerLogout={handlerLogout} handlerLogin={handlerLogin} />
        <SignUp createUser={handleAddUser} userStatus={userStatus}/>
        <Login loginUser={handleLoginUser} userStatus={userStatus}/>
        <Footer />
        </>
    );
}

export default CryptoMain;