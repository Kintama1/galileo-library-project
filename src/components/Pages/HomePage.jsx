import React from "react";
import "./css/HomePage.css";
import { Link } from "react-router-dom";
import Layout from "../Layout/Layout";

function HomePage() {
  return (
    <Layout>
      <div className="home-page">
        <section className="hero-section">
          <h1>Galileo's Library</h1>
          <p className="subtitle">
            Welcome/Benvenut to the website that accompanies the book <em>Galileo's Library: Data, Methods, and the Humanities</em> (forthcoming) by Professor Crystal Hall
          </p>
        </section>
        
        <div className="library-button-container">
          <Link to="/library/page/1" className="library-button">
            Explore the Library
          </Link>
        </div>
        
        <section className="main-content-section">
          <p className="content-paragraph">
            This site is a space for exploring the data, visualizations, and code that inform the arguments 
            and narrative in the chapters of the book. Sections of the site dedicated to student research, 
            vignettes, and analytical experiments are an extension of and supplement to the materials 
            presented in the book.
          </p>
          
          <p className="content-paragraph">
            <em>Galileo's Library</em> makes the argument that each representation of the collection of 
            books and manuscripts in the Galilei family homes deserves its own method of interpretation. 
            The digital representation found here is no different. What differs is the level to which the 
            missing books and the missing or conflicting information about them is made visible.
          </p>
          
          <p className="content-paragraph">
            Site visitors are encouraged to sort, filter, and search within the documentation related to 
            the books and manuscripts that were created by Galileo, sent to him or requested by him, 
            contain his annotations, were cited in or inspirational for what he wrote, and were 
            inventoried among his family members' possessions. While many years of research have 
            informed this version of the site, it is a work in progress. You are currently viewing 
            version 1.0 (May 2025).
          </p>
        </section>
        
        <section className="explore-section">
          <h2>Explore the Project</h2>
          <div className="links-container">
            <a href="https://example.com/data" className="project-link" target="_blank" rel="noopener noreferrer">
              <span className="link-text">Data</span>
              <span className="external-icon">↗</span>
            </a>
            <a href="https://example.com/visualizations" className="project-link" target="_blank" rel="noopener noreferrer">
              <span className="link-text">Visualizations</span>
              <span className="external-icon">↗</span>
            </a>
            <a href="https://example.com/code" className="project-link" target="_blank" rel="noopener noreferrer">
              <span className="link-text">Code</span>
              <span className="external-icon">↗</span>
            </a>
            <a href="https://example.com/student-research" className="project-link" target="_blank" rel="noopener noreferrer">
              <span className="link-text">Student Research</span>
              <span className="external-icon">↗</span>
            </a>
            <a href="https://example.com/vignettes" className="project-link" target="_blank" rel="noopener noreferrer">
              <span className="link-text">Vignettes</span>
              <span className="external-icon">↗</span>
            </a>
            <a href="https://example.com/experiments" className="project-link" target="_blank" rel="noopener noreferrer">
              <span className="link-text">Analytical Experiments</span>
              <span className="external-icon">↗</span>
            </a>
          </div>
        </section>
        
        <section className="credits-section">
          <h2>Credits</h2>
          <div className="credits-content">
            <p>
              This companion site for <em>Galileo's Library</em> has been a team effort of 
              Professor Hall's conceptual framing, technical implementation by Yassine Khayati 
              (Bowdoin Class of 2025), and the consultation of Professor Stephen Houser 
              (Bowdoin College Computer Science and Academic Technology & Consulting).
            </p>
            <p>
              We are grateful for the funding support from Bowdoin's Faculty Development 
              Committee to pay for the labor to create the site. The process for creating the 
              data that informs both the site and the book involved even more individuals, 
              credited on the page for <a href="/contributors">contributors</a>.
            </p>
          </div>
          <div className="citation-info">
            <h3>How to cite this project:</h3>
            <p>
              Hall, Crystal. <em>Galileo's Library: Data, Methods, and the Humanities</em> 
              (companion website). Version 1.0, May 2025.
            </p>
          </div>
        </section>
      </div>
    </Layout>
  );
}

export default HomePage;