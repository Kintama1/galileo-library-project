import React from "react";
import Layout from "../Layout/Layout";
import { useParams, Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";


function AdvancedSearch(){

    return (
        <Layout>
              <div className="navigation-bar">
                <Link to="/library/page/1" className="back-button">
                  ← Back to Library
                </Link>
              </div>
              <SearchBar/>
        </Layout>
    )

}

export default AdvancedSearch;