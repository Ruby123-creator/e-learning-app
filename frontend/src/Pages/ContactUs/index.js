
import EnquiryForm from "../Home/enquiryForm";

const ContactPage = () => {
  return (
    <div className="contact-page">
      <div className="container">
        <h1 className="heading">Contact Us</h1>

        <div className="contact-info">
          <div className="info-box">
            <h3>📞 Phone</h3>
            <p> <a href="tel:+919717073123">+91-97170 73123</a></p>
          </div>
          <div className="info-box">
            <h3>📧 Email</h3>
           <a href="mailto:topicwiseinstitute@gmail.com">topicwiseinstitute@gmail.com</a>
          </div>
          <div className="info-box">
            <h3>📍 Address</h3>
            <p>
             Chotpur Rd, Sector 63, Noida, UP 201307
            </p>
          </div>
        </div>

        <div className="map-form-wrapper">
          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5889.870673775433!2d77.39445872667393!3d28.625624165931853!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cef0c36f4663b%3A0xf5f2b01bd4d6c75a!2sTOPICWISE%20INSTITUTE!5e0!3m2!1sen!2sin!4v1750437649770!5m2!1sen!2sin"
             width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
           
          </div>

        <EnquiryForm/>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
