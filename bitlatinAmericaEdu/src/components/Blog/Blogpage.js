import React from 'react'
import "./blog.css"
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useState } from 'react'
import { Markup } from 'interweave';

const Blogpage = () => {

    const navigate = useNavigate();
    const [data, setdata] = useState([
        {
            "id": 1,
            "title": "loading",
            "heading_image": "/media/posts/None/house",
            "author": {
                "id": 1,
                "username": "kartikey",
                "email": "kartikey@gmail.com",
                "first_name": "Kartikey",
                "last_name": "Bhardwaj",
                "groups": [],
                "user_permissions": []
            },
            "content": "<p>loading<p>",
            "created_at": "2023-05-12T18:54:25.266877Z"
        }
    ]);

    const fetchdata = async () => {

        let response = await fetch("http://127.0.0.1:8000/posts/", {
            method: "GET",
        });

        let data = await response.text();
        data = JSON.parse(data);
        setdata(data);

    }
    function extractContent(s) {
        var span = document.createElement('span');
        span.innerHTML = s;
        var data = span.textContent || span.innerText;
        if(data.length > 100) data = data.substring(0, 100); 
        return data;
    };
    useEffect(() => {
        fetchdata();
    }, []);
    return (
        <>
            <div style={{ color: "white", textAlign: "center", fontSize: "30px", fontWeight: "600" }} className="">
                Blog
            </div>
            <div className="verifypage">
                <div className="container">
                    {
                        data.slice(0).reverse().map((item, idx) => {
                            return (
                                <motion.div
                                    whileHover={{
                                        scale: 0.95
                                    }}
                                    onClick={() => {
                                        navigate(`/blogs/${item.id}`);
                                    }}
                                    style={{ color: "black" }} className="card">
                                    <div className="card__header">
                                        <img
                                            src={`http://127.0.0.1:8000${item.heading_image}`}
                                            alt="card__image"
                                            className="card__image"
                                            style={{ borderRadius: "10px", height: "400px", width: "100%", objectFit: "cover" }}
                                        />
                                    </div>
                                    <div className="card__body">
                                        <span className="tag tag-blue">Technology</span>
                                        <h4>{item.title}</h4>
                                        {/* <p>
                                            <Markup content={item.content} />
                                        </p> */}
                                        <p className="">{extractContent(item.content)}</p>
                                        <h5 style={{ color: "blue", textDecoration: "underline", cursor: "pointer" }}>Read More</h5>
                                    </div>
                                    <div style={{ color: "black" }} className="card__footer">
                                        <div className="user">
                                            <div className="user__info">
                                                <small>2h ago</small>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default Blogpage