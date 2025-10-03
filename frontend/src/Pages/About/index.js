import React from 'react';


const AboutPage = () => {
  return (
    <div className="about-page">
      <div className="container">
        <h1 className="heading">About Us</h1>

        <p className="intro">
          <strong>TOPICWISE INSTITUTE</strong> is a premier educational platform built since 2016 of  rich teaching experience. We are committed to delivering topic-wise, concept-driven learning for students from all streams and backgrounds.
        </p>

        <p className="intro">
          Our core belief is simple: <em>Understanding every topic deeply leads to long-term success.</em> Thousands of learners have benefited from our foundation-building approach to academic and competitive excellence.
        </p>

        <section className="section">
          <h2 className="subheading">Our Academic Offerings</h2>

          <div className="stream">
            <h3>🔬 Science Stream (With Live Experiments)</h3>
            <ul>
              <li><strong>Chemistry:</strong> Reactions, mechanisms, and applications.</li>
              <li><strong>Physics:</strong> Experiment-based teaching to build analytical skills.</li>
              <li><strong>Biology:</strong> Visual and practical understanding of life sciences.</li>
            </ul>
          </div>

          <div className="stream">
            <h3>💼 Commerce Stream</h3>
            <ul>
              <li><strong>Accountancy</strong></li>
              <li><strong>Economics</strong></li>
              <li><strong>Business Studies</strong></li>
            </ul>
          </div>

          <div className="stream">
            <h3>🌍 Humanities Stream</h3>
            <ul>
              <li><strong>History:</strong> Chronological clarity and conceptual connections.</li>
              <li><strong>Geography:</strong> Map-based learning and relevance.</li>
              <li><strong>Political Science:</strong> Real-world examples and deep analysis.</li>
              <li><strong>Economics:</strong> Micro & macro topics explained clearly.</li>
            </ul>
          </div>
        </section>

        <section className="section">
          <h2 className="subheading">🎯 Government Exam Preparation</h2>
          <ul>
            <li>UPSC (Prelims, Mains & Interview)</li>
            <li>State PCS Exams</li>
            <li>SSC (CGL, CHSL, etc.)</li>
            <li>Bank PO & Clerk Exams</li>
          </ul>
        </section>

        <section className="section">
          <h2 className="subheading">Why Choose Us?</h2>
          <ul>
            <li>Experienced Faculty with proven results</li>
            <li>Interactive & Practical Learning through demos and examples</li>
            <li>Topic-wise Coverage to ensure concept mastery</li>
            <li>Regular Assessments & Feedback</li>
            <li>Customized Strategies for boards & government exams</li>
          </ul>
        </section>

        <div className="conclusion">
          <p>We don't just teach subjects — we build thinkers, achievers, and leaders.</p>
          <p><strong>Join TOPICWISE INSTITUTE and transform the way you learn.</strong></p>
          <p><em>Every topic mastered is a step closer to your goal.</em></p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
