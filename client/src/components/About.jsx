import "./styles.css";


const About = () => {
const styles = {
    body: {
      fontFamily: 'Arial, sans-serif',
      margin: 0,
      padding: 0,
    },
    header: {
      backgroundColor: '#3498db',
      color: '#fff',
      textAlign: 'center',
      padding: '1em 0',
    },
    nav: {
      backgroundColor: '#ecf0f1',
      padding: '0.5em',
    },
    aboutSection: {
      margin: '2em 0',
    },
    h2: {
      color: '#3498db',
    },
    ul: {
      listStyleType: 'none',
      padding: 0,
    },
    footer: {
      backgroundColor: '#3498db',
      color: '#fff',
      textAlign: 'center',
      padding: '1em 0',
      position: 'fixed',
      bottom: 0,
      width: '100%',
    },
  };

  return (
    <div style={styles.body}>
      <header style={styles.header}>
        <h1>Welcome to FundHelp</h1>
      </header>

      <nav style={styles.nav}>
        {/* Navigation links can be added here if needed */}
      </nav>

      <section style={styles.aboutSection}>
        <h2 style={styles.h2}>Our Mission</h2>
        <p>Empowering Dreams, Transforming Lives</p>
      </section>

      <section style={styles.aboutSection}>
        <h2 style={styles.h2}>What Sets Us Apart?</h2>
        <ul style={styles.ul}>
          <li>User-Centric Crowdfunding</li>
          <li>Transparency and Trust</li>
          <li>Seamless Experience</li>
        </ul>
      </section>

      <section style={styles.aboutSection}>
        <h2 style={styles.h2}>Join the FundHelp Community</h2>
        <p>FundHelp is more than just a crowdfunding platform; it's a community of dreamers, doers, and changemakers...</p>
      </section>

      <section style={styles.aboutSection}>
        <h2 style={styles.h2}>Contact Us</h2>
        <p>Have questions, suggestions, or just want to say hello? Reach out to us at <a href="mailto:contact@fundhelp.com">contact@fundhelp.com</a></p>
      </section>

      <footer style={styles.footer}>
        <p>Thank you for being a part of FundHelp - where small actions lead to big changes!</p>
      </footer>
    </div>
  )};


export default About;
