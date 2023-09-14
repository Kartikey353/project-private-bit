import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


export default function QuestionBox(props) {
  
//   const appuser = useContext(UserContext);
//   const [expanded, setExpanded] = React.useState(false);
//   const [isRejecting, setIsRejecting] = React.useState(false);
//   const { users, filter, update } = props;

//   const handleChange = (panel) => (event, isExpanded) => {
//     setExpanded(isExpanded ? panel : false);
//     console.log("panel", panel);
//     // setExpanded(!expanded);
//   };

//   const handleClick = (e) => {
//     console.log("e", e);
//     console.log("expanded", expanded);
//     setExpanded(!expanded);
//     console.log("expanded", expanded);

//     };

const variableOptions2 = [
  {
    question:"What is BitMemoir Latam and what services does it offer?",
    answer:"BitMemoir Latam is a subsidiary of the BitMemoir firm, based in Dubai, that facilitates the issuance of blockchain certifications and diplomas for educational institutions, ensuring authenticity, transparency, and security. We offer customized solutions tailored to the specific needs of each organization, including the issuance of micro-credentials, certifications for courses or programs, registration of non-curricular activities, recognitions and awards, proof of participation in events, and systems to provide transparency in scholarship and funding programs."
  },
  {
    question:"How does blockchain ensure the authenticity of issued certifications?",
    answer:"BitMemoir Latam verifies and validates the authenticity of educational institutions before allowing them to issue certifications on the blockchain. Additionally, in the case of university degrees or school diplomas, the issuance process includes a second validation key, where a person designated by the institution authorizes the issuance of the certificates."
  },
  {
    question:"What are the advantages of using blockchain for issuing certifications and diplomas?",
    answer:"Blockchain-issued certifications and diplomas are easily verifiable and contrasting, ensuring their authenticity and preventing forgery. Additionally, it provides transparency and security to the issuance process and enables an immutable and accessible historical record over time."
  },
  {
    question:"How can educational institutions start issuing blockchain certifications with BitMemoir Latam?",
    answer:"To start issuing blockchain certifications with BitMemoir Latam, institutions must follow these steps :",
    subAnswer: ["A) Choose the plan that best suits their needs.",
                  "B) Complete the validation steps to corroborate their authenticity.",
                  "C) BitMemoir verifies the documentation and validates the institution.",
                  "D) Select the certification model or upload their own diploma template on the platform.",
                  "E) Complete the forms with the data of the recipients of the certification or diploma.",
                  "F) In the case of university or school degrees and diplomas, activate the second validation key to authorize the issuance.",
                  "G) Issue the blockchain certificates and send them to the recipients."
                ]
  },{ 
    question:"How can recipients of blockchain certifications access and manage their documents?",
    answer:"Recipients of blockchain certifications can access and manage their documents through the BitMemoir web application or BIT-Wallet. They will receive the document with the integrated QR code and the digital badge in their virtual wallet."
  },{
    question:"What types of certifications can be issued on the blockchain?",
    answer:"BitMemoir Latam allows the issuance of various types of certifications on the blockchain, including university or school degrees, micro-credentials, certifications for courses or programs, recognitions and awards, proof of participation in events, and transparency in scholarship and funding programs."
  },{
    question:"Is it safe to use BitMemoir Latam to issue blockchain certifications?",
    answer:"Yes, BitMemoir Latam ensures security in the process of issuing blockchain certifications. We verify and validate the authenticity of educational institutions and use blockchain technology to guarantee the authenticity, transparency, and security of the issued documents."
  },{
    question:"What payment options are available for purchasing certificate packages in BitMemoir Latam?",
    answer:"BitMemoir Latam offers various payment options for purchasing certificate packages, including Mercado Pago, PayPal, and bank transfer. Institutions can buy packages with a specific number of certificates and start issuing until the purchased quantity is exhausted."
  },{
    question:"What is the cost of certificates in BitMemoir Latam?                    ",
    answer:"The base cost per certificate in BitMemoir Latam is 1 dollar. For university degrees, which require a second security and validation key, the cost is 2 dollars per certificate."
  },{
    question:"Can institutions use their own certificate templates, or do they have to use those provided by BitMemoir Latam?", 
    answer:"Institutions can choose between using the certificate templates provided by BitMemoir Latam on their platform or uploading and designing their own templates. The platform allows for customization and adaptation of templates according to the needs and preferences of each educational institution."
  }
]

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      // width: "70%",
    }}>
      {variableOptions2.map((question, index) => (
        <Accordion key={index}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography sx={{
              fontSize: "1.1rem",
              fontFamily:"'Google Sans', 'Google Sans Text', Roboto, sans-serif"
            }}>{question.question}</Typography>
          </AccordionSummary>
          <AccordionDetails 
          style={{
            backgroundColor: "#D8E4F7",
          }}
          >
            <Typography
             sx={{
              marginBottom: "10px",
             }}
            >
              {question.answer}
            </Typography>
            {
              question.subAnswer && question.subAnswer.map((subAnswer, index) => (
                <Typography 
                sx={{
                  margin: "10px",
                 }}
                key={index}>
                  {subAnswer}
                </Typography>
              ))

            }
          </AccordionDetails>
        </Accordion>
      ))}
    </div>

    //   <div>
    //   <Accordion>
    //     <AccordionSummary
    //       expandIcon={<ExpandMoreIcon />}
    //       aria-controls="panel1a-content"
    //       id="panel1a-header"
    //     >
    //       <Typography>Accordion 1</Typography>
    //     </AccordionSummary>
    //     <AccordionDetails>
    //       <Typography>
    //         Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
    //         malesuada lacus ex, sit amet blandit leo lobortis eget.
    //       </Typography>
    //     </AccordionDetails>
    //   </Accordion>
    //   <Accordion>
    //     <AccordionSummary
    //       expandIcon={<ExpandMoreIcon />}
    //       aria-controls="panel2a-content"
    //       id="panel2a-header"
    //     >
    //       <Typography>Accordion 2</Typography>
    //     </AccordionSummary>
    //     <AccordionDetails>
    //       <Typography>
    //         Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
    //         malesuada lacus ex, sit amet blandit leo lobortis eget.
    //       </Typography>
    //     </AccordionDetails>
    //   </Accordion>
    //   <Accordion disabled>
    //     <AccordionSummary
    //       expandIcon={<ExpandMoreIcon />}
    //       aria-controls="panel3a-content"
    //       id="panel3a-header"
    //     >
    //       <Typography>Disabled Accordion</Typography>
    //     </AccordionSummary>
    //   </Accordion>
    // </div>
  );
}
