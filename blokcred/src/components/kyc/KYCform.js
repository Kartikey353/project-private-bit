import KycScript from "./kycScript";
import Dialog from "@mui/material/Dialog";
import { useState } from "react";

import EnglishSampleForm from "./assets/BITsampleNote.docx";


export const KYCform = (props) => {
  const [approverDialog, setApproverDialog] = useState(false);
  

  
 

  const {
    status,
    isuploading,
    name,
    setName,
    description,
    setdescription,
    website,
    setwebsite,
    email,
    setemail,
    contact,
    setcontact,
    regId,
    setregId,
    idProof,
    setidProof,
    handleSubmit,
    approvers,
    setApprovers,
    issuerName,
    setIssuerName,
    country,
    setcountry,
    issuerJobDesignation,
    setIssuerJobDesignation,
    idProofApprovers,
    setIdProofApprovers,
    noteSignByHigherAuth,
    setNoteSignByHigherAuth,
    approversDocument,
    setApproversDocument,
    issuerLastName,
    setIssuerLastName,

  } = KycScript(props.setForm);

  return (
    <div className="individualpage">
      <div className="individualformcontainer">
        <h1>Enter Your KYC Details</h1>
        <label htmlFor="name">Name of the Company/Institution*</label>
        <input
          type="text"
          id="name"
          value={name}
          name="name"
          onChange={(e) => setName(e.target.value)}
          placeholder="Name of the Organization"
        />
        <label htmlFor="name">Description*</label>
        <input
          type="text"
          id="name"
          value={description}
          name="description"
          onChange={(e) => setdescription(e.target.value)}
          placeholder="Description of the Organization"
        />
        <label htmlFor="email">Country*</label>
        <input 
          type="text"
          id="email"
          value={country}
          name="country"
          placeholder="Country"
          onChange={(e) => setcountry(e.target.value)}
        />
        <label htmlFor="email">Official Website*</label>
        <input
          type="email"
          id="email"
          value={website}
          name="website"
          placeholder="Official Website"
          onChange={(e) => setwebsite(e.target.value)}
        /><label htmlFor="email">CIN*</label>
        <input
          type="email"
          id="email"
          value={regId}
          name="website"
          placeholder="CIN"
          onChange={(e) => setregId(e.target.value)}
        />
        <h4 
        style={{
          color: "#fff",
          fontSize: "1.2rem",
          fontWeight: "500",
          marginTop: "2rem",
          textDecoration: "underline",
        }}
        >Information about the representative</h4>
        <label htmlFor="Official website">Name*</label>
        <input
          type="text"
          id="phone_num"
          value={issuerName}
          name="name"
          placeholder="Name"
          onChange={(e) => setIssuerName(e.target.value)}
        />
        <label htmlFor="Official website">Surname</label>
        <input
          type="text"
          id="phone_num"
          value={issuerLastName}
          name="name"
          placeholder="Surname"
          onChange={(e) => setIssuerLastName(e.target.value)}
        />
        <label htmlFor="Official website">Designation*</label>
        <input
          type="text"
          id="phone_num"
          value={issuerJobDesignation}
          name="name"
          placeholder="Designation"
          onChange={(e) => setIssuerJobDesignation(e.target.value)}
        />
        <label htmlFor="Official website">Official email ID*</label>
        <input
          type="text"
          id="phone_num"
          value={email}
          name="email"
          placeholder="Official email ID"
          onChange={(e) => setemail(e.target.value)}
        />
        <label htmlFor="website">Official Phone Number*</label>
        <input
          type="number"
          id="website"
          name="phone"
          value={contact}
          placeholder="Official Phone Number"
          onChange={(e) => setcontact(e.target.value)}
        />
        {/* <label htmlFor="website">CIN*</label>
        <input
          type="text"
          id="website"
          name="CIN"
          value={regId}
          placeholder="CIN"
          onChange={(e) => setregId(e.target.value)}
        /> */}
        <label htmlFor="fileselectorinput">
        ID Proof of the Representative*
        </label>
        {idProof.name}
        <input
          type="file"
          id="fileselectorinput"
          onChange={(e) => {
            setidProof(e.target.files[0]);
          }}
        />
        <h4 
        style={{
          color: "#fff",
          fontSize: "1.2rem",
          fontWeight: "500",
          marginTop: "2rem",
          //underLine
          textDecoration: "underline",
        }}
        >Information about the approving authority</h4>
        <label htmlFor="fileselectorinput">
        Upload the Note(signed by highest authorities)*
            </label>
            {noteSignByHigherAuth.name}
        <input
            type="file"
            id="fileselectorinput"
            onChange={(e) => {
              setNoteSignByHigherAuth(e.target.files[0]);
             }}
          />
        <p>Sample Form </p>
        
        <a
          // href="https://docs.google.com/document/d/1G1HBTYJRi643Kf2c2BfqRzS0Kc-AW7pJ/edit?usp=sharing&ouid=115709414771697699891&rtpof=true&sd=true"
          href={EnglishSampleForm}
          style={{
            color: "white",
            cursor: "context-menu",
          }}
          // onClick={() => getCSV()}
          download
        >
          Download Form Sample 
        </a>
       

        

        <div
          style={{
            marginTop: "20px",
            border: "1px solid white",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Add Approving Authority
          <h5>
          Approving authorities have to approve any document issuance via email
          </h5>
          {approvers?.map((person, index) => (
            <div
              key={"approver-" + person.email}
              style={{
                width: "100%",
                display: "grid",
                gridTemplateColumns: "1fr 3fr 1fr",
                alignItems: "center",
                borderBottom: "1px solid black",
                margin: "10px 0px",
                padding: "10px 0px",
              }}
            >
              {index + 1}.
              <div style={{ textAlign: "left" }}>
                <div
                  style={{
                    width: "100%",
                    display: "grid",
                    gridTemplateColumns: "1fr 2fr",
                  }}
                >
                  Name
                  <span>{person.name}</span>
                </div>
                <div
                  style={{
                    width: "100%",
                    display: "grid",
                    gridTemplateColumns: "1fr 2fr",
                  }}
                >
                  Designation
                  <span>{person.designation}</span>
                </div>
                <div
                  style={{
                    width: "100%",
                    display: "grid",
                    gridTemplateColumns: "1fr 2fr",
                  }}
                >
                 Email
                  <span>{person.email}</span>
                </div>
              </div>
              <button
                onClick={() =>
                  setApprovers((prev) => {
                    let newArray = [];
                    prev.map((app, i) => {
                      if (i !== index) {
                        newArray.push(app);
                      }
                    });
                    return newArray;
                  })
                }
              >
                Remove
              </button>
            </div>
          ))}
          <button onClick={() => setApproverDialog(true)}>Add Approver</button>
        </div>

        <div className="status">{status}</div>
        {isuploading ? (
          <button>Uploading.....</button>
        ) : (
          <button
            onClick={handleSubmit}
            style={{
              background: "var(--secondary)",
              color: "var(--primary)",
            }}
          >
            Submit
          </button>
        )}
      </div>
      <Dialog onClose={() => setApproverDialog(false)} open={approverDialog}>
        <div
          style={{
            padding: "40px",
            background: "var(--primary)",
            color: "var(--secondary)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "20px",
          }}
        >
          <h2>Add Approver</h2>
          <div
            style={{
              width: "100%",
              display: "grid",
              gridTemplateColumns: "1fr 2fr",
            }}
          >
            <label htmlFor="add-approver-name">Name : </label>
            <input type="text" id="add-approver-name" />
          </div>
          <div
            style={{
              width: "100%",
              display: "grid",
              gridTemplateColumns: "1fr 2fr",
            }}
          >
            <label htmlFor="add-approver-last-name">Surname: </label>
            <input type="text" id="add-approver-last-name" />
          </div>
          <div
            style={{
              width: "100%",
              display: "grid",
              gridTemplateColumns: "1fr 2fr",
            }}
          >
            <label htmlFor="add-approver-designation">Designation </label>
            <input type="text" id="add-approver-designation" />
          </div>
          <div
            style={{
              width: "100%",
              display: "grid",
              gridTemplateColumns: "1fr 2fr",
            }}
          >
            <label htmlFor="add-approver-email">Email : </label>
            <input type="text" id="add-approver-email" />
            
          </div>
          <div
            style={{
              width: "100%",
              display: "grid",
              gridTemplateColumns: "1fr 2fr",
            }}
          >
            <label htmlFor="fileselectorinput">
            ID Proof of the Approving Authority*
            </label>
            {idProofApprovers.name}
            <input
            type="file"
            id="fileselectorinput"
            onChange={(e) => {
              setIdProofApprovers(e.target.files[0]);
             }}
            />
            
          </div>
          <div
            style={{
              width: "100%",
              display: "grid",
              gridTemplateColumns: "1fr 2fr",
            }}
          >
            
          </div>
          <button
            onClick={() => {
              setApprovers((prev) => [
                ...prev,
                {
                  name: document.getElementById("add-approver-name").value,
                  lastName: document.getElementById(
                    "add-approver-last-name"
                  ).value,
                  designation: document.getElementById(
                    "add-approver-designation"
                  ).value,
                  email: document.getElementById("add-approver-email").value,

                },
              ]);
              setApproversDocument((prev) => [
                ...prev,
                {
                  idProofApprovers: idProofApprovers,
                },
              ]);
              setApproverDialog(false);
            }}
          >
            Add
          </button>
        </div>
      </Dialog>
    </div>
  );
};
