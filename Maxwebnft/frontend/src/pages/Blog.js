import React from 'react'
import "./Blog.css"
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import { AiOutlineHeart } from "react-icons/ai"
const Blog = () => {
    return (
        <>
            <Navbar />
            <div className="container">
                <div style={{ color: "black" }} className="card">
                    <div className="card__header">
                        <img
                            src="https://source.unsplash.com/600x400/?computer"
                            alt="card__image"
                            className="card__image"
                            width={600}
                        />
                    </div>
                    <div className="card__body">
                        <span className="tag tag-blue">Technology</span>
                        <h4>What's new in 2022 Tech</h4>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi
                            perferendis molestiae non nemo doloribus. Doloremque, nihil! At ea atque
                            quidem!
                        </p>
                        <h5 style={{ color: "blue", textDecoration: "underline", cursor: "pointer" }}>Read More</h5>
                    </div>
                    <div style={{ color: "black" }} className="card__footer">
                        <div className="user">
                            <div className="user__info">
                                <div style={{display:"flex"}} className="space-x-2">
                                    <AiOutlineHeart style={{marginTop:"auto",marginBottom:"auto"}} />{"  "} 
                                    <h5 style={{display:"flex",marginTop:"auto",marginBottom:"auto"}}>2</h5>
                                </div>
                                <small>2h ago</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Blog