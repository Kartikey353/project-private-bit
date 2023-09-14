import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Markup } from 'interweave';
import "./blog.css"
const Blog = () => {
    const { id } = useParams();
    const [blogdata, setblogdata] = useState(null);
    const fetchdetails = async () => {

        let response = await fetch(`http://127.0.0.1:8000/posts/${id}/`, {
            method: "GET",
        });

        let data = await response.text();
        data = JSON.parse(data);
        setblogdata(data);
    }
    useEffect(() => {
        fetchdetails();
    }, [])

    return (
        <>
            {
                blogdata === null ?
                    <div style={{
                        display: "flex",
                        paddingTop: "1rem",
                        backgroundColor: "#ffffff",
                        flexDirection: "column",
                        alignItems: "center",
                        borderRadius: "0.5rem",
                        borderWidth: "1px",
                        borderColor: "#E5E7EB",
                        boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
                    }} className="">
                        Loading
                    </div>
                    :
                    <div

                        style={{
                            display: "flex",
                            paddingTop: "1rem",
                            backgroundColor: "#ffffff",
                            flexDirection: "column",
                            alignItems: "center",
                            borderRadius: "0.5rem",
                            borderWidth: "1px",
                            borderColor: "#E5E7EB",
                            boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
                        }}
                        className='blogcontent'
                    >

                        <h1 style={{ textAlign: "center" }} className="">{blogdata.title}</h1>
                        <img
                            style={{
                                height: "300px",
                                width: "80vw",
                                objectFit: "cover",
                                borderTopLeftRadius: "0.5rem",
                                borderTopRightRadius: "0.5rem",
                            }}
                            className="blogimg"
                            src={`http://127.0.0.1:8000${blogdata.heading_image}`}
                            alt=""
                        />
                        <div style={{
                            display: "flex",
                            padding: "1rem",
                            lineHeight: "1.5",
                            flexDirection: "column",
                        }}
                            className='customstyle'
                        >
                            {/* <p className="">{extractContent(blogdata.content)}</p> */}
                            <Markup content={blogdata.content} />
                        </div>
                    </div>
            }

        </>
    )
}

export default Blog