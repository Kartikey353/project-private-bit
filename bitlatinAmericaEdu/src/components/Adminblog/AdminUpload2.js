import React, { useMemo, useRef, useState } from 'react'
import { useEffect, useContext } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
const AdminUpload2 = () => {
    const [state, setState] = useState({ value: null });
    const [topimagefile, settopimagefile] = useState();
    const [title, settitle] = useState(null);
    const [imagelinks, setimagelinks] = useState(
        [{
            id: null,
            url: null
        }]
    );
    const handleChange = value => {
        setState({ value });
        console.log(state.value);
    };
    const handelimagedelete = async (item) => {
        const items = JSON.parse(localStorage.getItem('logininfo'));
        let headersList = {
            "Authorization": `token ${items.token}`
        }
        let response = await fetch(`http://127.0.0.1:8000/delete/${item}/`, {
            method: "DELETE",
            headers: headersList
        });
        const data = await response.text();
        console.log(data);
    }

    function getimagelinks() {
        var m,
            urls = [],
            str = state.value,
            rex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
        while (m = rex.exec(str)) {
            urls.push(`http://127.0.0.1:8000/media/custom/${m[0]}`);
        }
        console.log(urls);
        let array3 = imagelinks.filter(entry1 => !urls.some(entry2 => entry1.url === entry2));
        if (array3.length !== 0) {
            array3.map((item, idx) => {
                if (idx !== 0) {
                    setimagelinks((current) =>
                        current.filter((fruit) => fruit.id !== item.id)
                    );
                    handelimagedelete(item.id);
                }
            })
        }
    }

    useEffect(() => {
        getimagelinks();
    }, [state.value]);

    const handeltopimage = () => {
        const input = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/*");
        input.click();

        input.onchange = async () => {
            const file = input.files[0];
            if (/^image\//.test(file.type)) {
                console.log(file);
                settopimagefile(file);
            } else {
                alert('You could only upload images.');
            }
        };
    }
    const quillRef = useRef();
    const imageHandler = (e) => {
        const editor = quillRef.current.getEditor();
        const input = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/*");
        input.click();

        input.onchange = async () => {
            const items = JSON.parse(localStorage.getItem('logininfo'));
            const file = input.files[0];
            if (/^image\//.test(file.type)) {
                console.log(file);
                const formData = new FormData();
                formData.append("image", file);
                let headersList = {
                    "Authorization": `token ${items.token}`
                }
                let response = await fetch("http://127.0.0.1:8000/upload/", {
                    method: "POST",
                    body: formData,
                    headers: headersList
                });
                if (response.ok === true) {
                    let data = await response.text();
                    data = JSON.parse(data);
                    editor.insertEmbed(editor.getSelection(), "image", data.url);
                    let obj = {
                        id: data.id,
                        url: data.url
                    }
                    setimagelinks(prevState => ([...prevState, obj]));
                } else {
                    alert("Error While adding image try again!!!");
                }
            } else {
                // ErrorToast('You could only upload images.');
            }
        };
    }
    const posthandler = async () => {
        const items = JSON.parse(localStorage.getItem('logininfo'));
        let headersList = {
            "Authorization": `token ${items.token}`
        }

        let bodyContent = new FormData();
        bodyContent.append("title", `${title}`);
        bodyContent.append("content", state.value);
        bodyContent.append("author_id", `${items.user_id}`);
        bodyContent.append("heading_image", topimagefile);

        let response = await fetch("http://127.0.0.1:8000/posts/create/", {
            method: "POST",
            body: bodyContent,
            headers: headersList
        });

        if (response.ok === true) {
            let data = await response.text();
            console.log(data);
            window.localStorage.removeItem('blogdata');
        } else {
            alert("error while saving post");
        }
    }
    const modules = useMemo(() => ({
        toolbar: {
            container: [
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                ['bold', 'italic', 'underline', "strike"],
                [{ 'list': 'ordered' }, { 'list': 'bullet' },
                { 'indent': '-1' }, { 'indent': '+1' }],
                ['image', "link",],
                [{ 'color': ['#000000', '#e60000', '#ff9900', '#ffff00', '#008a00', '#0066cc', '#9933ff', '#ffffff', '#facccc', '#ffebcc', '#ffffcc', '#cce8cc', '#cce0f5', '#ebd6ff', '#bbbbbb', '#f06666', '#ffc266', '#ffff66', '#66b966', '#66a3e0', '#c285ff', '#888888', '#a10000', '#b26b00', '#b2b200', '#006100', '#0047b2', '#6b24b2', '#444444', '#5c0000', '#663d00', '#666600', '#003700', '#002966', '#3d1466'] }]
            ],
            handlers: {
                image: imageHandler
            }
        },
    }), []);

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
                            onChange={(e) => {
                                settitle(e.target.value);
                            }}
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
                            placeholder="name@flowbite.com"
                            required=""
                        />
                    </div>
                    <div>
                        <label
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
                            onClick={handeltopimage}
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
                        <ReactQuill style={{ color: "black" }} theme="snow" ref={quillRef} modules={modules} value={state.value}
                            onChange={handleChange} />
                    </div>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            posthandler();
                        }}
                        style={{ marginLeft: "auto", marginRight: "auto", marginTop: "2rem" }} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Post</button>
                </div>
            </div>
        </>
    )
}

export default AdminUpload2;