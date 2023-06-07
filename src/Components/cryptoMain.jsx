import { BrowserRouter, Routes, Route } from "react-router-dom";

import SignUp from "./signUp";
import Login from "./login";
import Layout from "./layout";
import Footer from "./footer";
import React, { useState } from "react"
import Home from './home';
import AboutUs from './aboutUs';
import BlogsList from './blogsList'


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
        <Layout />
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/about" element={<AboutUs/>}/>
            <Route path="/signUp" element={<SignUp createUser={handleAddUser} userStatus={"signin"}/>}/>
            <Route path="/login" element={<Login loginUser={handleLoginUser} userStatus={"login"}/>}/>
            <Route path="/blogs" element={<BlogsList />}/>
        </Routes>
        </BrowserRouter>
        <Footer />
        </>
    );
}

export default CryptoMain;