import React from "react";
import styles from '../styles/About.module.css'

function About({ credits , data1 }){ return(

<div className={styles.container}>
    <h2 className={styles.title}>Dashboard</h2>
    <p className={styles.description}>{ data1.Sum_OffsetCount }</p>
    <p className={styles.description}>{ data1.Sum_used }</p>
    <p className={styles.description}>{ data1.Sum_difference }</p>
    <ul>
      {credits.map((credit) => (
        <li>
            <div>{credit._id}</div>
            <div>{credit.providerId}</div>
            <div>{credit.product}</div>
            <div>{credit.created}</div>
            <div>{credit.updated}</div>
            <div>{credit.recorded}</div>
            <div>{credit.recordedId}</div>
            <div>{credit.offsetCount}</div>
            <div>{credit.used}</div>
            <div>{credit.depleted}</div>
            <div>{credit.ledgerId}</div>
            <div>&nbsp;</div>
        </li>
        
      ))}
    </ul>
</div>

)}



export async function getServerSideProps(context) {
   


    const bodydata = {}
    const res1 = await fetch("http://localhost:3000/users/get_stats", {
        method: "POST", 
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify(bodydata)
    });
    const data1 = await res1.json()

    const res_credits = await fetch("http://localhost:3000/users/issued_credits", {
        method: "POST", 
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify(bodydata)
    });
    

    const credits = await res_credits.json()
    console.log(credits)

    if (!data1){ return{notFound: true,}}
    if (!credits){ return{notFound: true,}}

    return { props: {credits, data1,},}
}

export default About