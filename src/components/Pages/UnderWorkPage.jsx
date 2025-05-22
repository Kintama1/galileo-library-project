// src/components/Pages/UnderWorkPage.jsx
import React from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "../Layout/Layout";
import "./css/UnderWorkPage.css";

function UnderWorkPage() {
  // Get the page type from URL parameters
  const { pageType } = useParams();
  
  // Function to format the page title
  const formatTitle = (type) => {
    if (!type) return "Page";
    
    // Convert hyphens to spaces and capitalize words
    return type
      .split("-")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };
  
  return (
    <Layout>
      <div className="under-work-page">
        <div className="navigation-bar">
          <Link to="/" className="back-button">
            ← Back to Home
          </Link>
        </div>
        
        <div className="under-work-content">
          <h1>{formatTitle(pageType)} - Coming Soon</h1>
          <div className="construction-icon">🚧</div>
          <p className="message">
            We're actively working on this section. Check back soon for updates!
          </p>
          <p className="subtitle">
            This page will contain information about {formatTitle(pageType).toLowerCase()}.
          </p>
        </div>
      </div>
    </Layout>
  );
}

export default UnderWorkPage;