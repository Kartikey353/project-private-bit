import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Editortoolbar, modules, formats } from './Editortoolbar';
const AdminUpload = () => {
    const [state, setState] = useState({ value: null });
    const handleChange = value => {
        setState({ value });
        console.log(state.value);
    };
    return (
        <>
            <div style={{ color: "white", textAlign: "center", fontSize: "30px", fontWeight: "600" }} className="">
                Add Post
            </div>
            <div style={{ display: "block", minWidth: "100%", background: "white" }} className="verifypage">
                <form style={{ marginLeft: "auto", marginRight: "auto", width: "40%", paddingTop: "3%" }}>
                    <div>
                        <label
                            htmlFor="email"
                            style={{
                                display: "block",
                                marginBottom: "0.5rem",
                                color: "black",
                                fontSize: "0.875rem",
                                lineHeight: "1.25rem",
                                fontWeight: "500",
                            }}
                        >
                            Title
                        </label>
                        <input
                            type="email"
                            id="email"
                            style={{
                                display: "block",
                                padding: "0.625rem",
                                backgroundColor: "#F9FAFB",
                                color: "white",
                                fontSize: "0.875rem",
                                lineHeight: "1.25rem",
                                width: "100%",
                                borderRadius: "0.5rem",
                                borderWidth: "1px",
                                borderColor: "#D1D5DB",
                            }}
                            placeholder="name@flowbite.com"
                            required=""
                        />
                    </div>
                    <div>
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
                            Upload Top Image
                        </label>
                        <input
                            type="file"
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
                            required=""
                        />
                    </div>
                </form>
                <div style={{ width: "80%", marginLeft: "auto", marginRight: "auto", marginTop: "7rem" }} className="">
                    <div className="text-editor">
                        <Editortoolbar />
                        <ReactQuill
                            style={{ color: "black" }}
                            theme="snow"
                            value={state.value}
                            onChange={handleChange}
                            placeholder={"Write something awesome..."}
                            modules={modules}
                            formats={formats}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminUpload;