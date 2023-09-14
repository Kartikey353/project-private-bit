import React, { useState, useContext } from 'react'
import "./Adminlogin.css"
import { loginadmin } from '../Scripts/apiCalls';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
const Adminlogin = () => {
    const [username, setusername] = useState();
    const [password, setpassword] = useState();
    const [details, setdetails] = useState(null);
    const navigate = useNavigate();

    async function onlogin() {
        let bodyContent = new FormData();
        bodyContent.append("username", username);
        bodyContent.append("password", password);

        let response = await fetch("http://127.0.0.1:8000/api/login/", {
            method: "POST",
            body: bodyContent,
        });

        if (response.ok === true) {
            let data = await response.text();
            data = JSON.parse(data);
            const obj = {
                token: data.token,
                user_id: data.user_id,
                isSignedIn: true
            }
            console.log(obj);
            setdetails(obj);
            window.localStorage.setItem('logininfo', JSON.stringify(obj));
            navigate("/blog/adminUpload");

        } else {
            alert("Error While login");
            const obj = {
                isSignedIn: false
            }
            console.log(obj);
            setdetails(obj);
            window.localStorage.setItem('logininfo', JSON.stringify(obj));
        }
    }
    return (

        <>
            <div className="verifypageadmin">
                <div style={{ color: "white", textAlign: "center", fontSize: "30px", fontWeight: "600" }} className="">
                    Admin Login
                </div>
                <form style={{ marginLeft: "auto", marginRight: "auto", width: "40%", marginTop: "5%" }}>
                    <div style={{ marginBottom: "1.5rem" }}>
                        <label
                            htmlFor="email"
                            style={{
                                display: "block",
                                marginBottom: "0.5rem",
                                color: "white",
                                fontSize: "0.875rem",
                                lineHeight: "1.25rem",
                                fontWeight: "500",
                            }}
                        >
                            Your email
                        </label>
                        <input
                            type="email"
                            id="email"
                            style={{
                                display: "block",
                                padding: "0.625rem",
                                backgroundColor: "#F9FAFB",
                                color: "black",
                                fontSize: "0.875rem",
                                lineHeight: "1.25rem",
                                width: "100%",
                                borderRadius: "0.5rem",
                                borderWidth: "1px",
                                borderColor: "#D1D5DB",
                            }}
                            onChange={(e) => {
                                setusername(e.target.value);
                            }}
                            placeholder="name@flowbite.com"
                            required=""
                        />
                    </div>
                    <div style={{ marginBottom: "1.5rem" }}>
                        <label
                            htmlFor="password"
                            style={{
                                display: "block",
                                marginBottom: "0.5rem",
                                color: "black",
                                fontSize: "0.875rem",
                                lineHeight: "1.25rem",
                                fontWeight: "500"
                            }}
                        >
                            Your password
                        </label>
                        <input
                            type="password"
                            id="password"
                            style={{
                                display: "block",
                                padding: "0.625rem",
                                backgroundColor: "#F9FAFB",
                                color: "#111827",
                                fontSize: "0.875rem",
                                lineHeight: "1.25rem",
                                width: "100%",
                                borderRadius: "0.5rem",
                                borderWidth: "1px",
                                borderColor: "#D1D5DB",
                            }}
                            onChange={(e) => {
                                setpassword(e.target.value);
                            }}
                            required=""
                        />
                    </div>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            onlogin();
                        }}
                        type="submit"
                    >
                        Login
                    </button>
                </form>
            </div>

        </>

    )
}

export default Adminlogin