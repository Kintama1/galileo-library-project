import React from "react";
import "./css/HomePage.css"
import { Link } from "react-router-dom";
import Layout from "../Layout/Layout";



function HomePage(){
    return (
        <Layout>
        <div className="home-page">
            <h1>Welcome to Gallileo Library</h1>
            <Link to="/library/page/1" className="library-link">Go to Library
            <button className="go-to-library" ></button>
            </Link>
        </div>
        </Layout>
    )
}
export default HomePage;