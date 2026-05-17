import React, { useState, useEffect } from 'react'
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook } from 'react-icons/fa'
import './Contact.css'

const FACEBOOK_PAGE_URL = 'https://www.facebook.com/apexofpestservices'

const Contact = () => {
  // Set to true to enable the contact form
  const ENABLE_FORM = false
  const [facebookBlocked, setFacebookBlocked] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  })

  useEffect(() => {
    fetch('https://connect.facebook.net/en_US/sdk.js', { mode: 'no-cors' })
      .then(() => setFacebookBlocked(false))
      .catch(() => setFacebookBlocked(true))
  }, [])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted:', formData)
    alert('Thank you for your message! We will get back to you soon.')
    setFormData({
      name: '',
      email: '',
      phone: '',
      service: '',
      message: ''
    })
  }

  return (
    <section id="contact" className="contact">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Contact Us</h2>
          <p className="section-subtitle">Get in touch to book your appointment</p>
        </div>
        <div className={`contact-content ${!ENABLE_FORM ? 'form-disabled' : ''}`}>
          <div className="contact-info">
            <div className="info-card">
              <FaPhone className="info-icon" />
              <h3>Phone</h3>
              <p><a href="tel:+16076249569" className="phone-link">(607) 624-9569</a></p>
            </div>
            <div className="info-card">
              <FaEnvelope className="info-icon" />
              <h3>Email</h3>
              <p>apexpest607@gmail.com</p>
            </div>
            <div className="info-card">
              <FaMapMarkerAlt className="info-icon" />
              <h3>Address</h3>
              <p>7 Scott St, Bainbridge, NY 13733</p>
            </div>
          </div>
          {!ENABLE_FORM && (
            <div className="contact-facebook-embed">
              <h3 className="contact-facebook-title">Follow us on Facebook</h3>
              {facebookBlocked ? (
                <div className="facebook-blocked-fallback">
                  <p>Facebook is blocked by your browser or network.</p>
                  <a
                    href={FACEBOOK_PAGE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="facebook-blocked-btn"
                  >
                    <FaFacebook className="facebook-blocked-btn-icon" />
                    Visit our Facebook Page
                  </a>
                </div>
              ) : (
                <iframe
                  src={`https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(FACEBOOK_PAGE_URL)}&tabs=timeline&width=340&height=500&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=true${import.meta.env.VITE_FACEBOOK_APP_ID ? `&appId=${import.meta.env.VITE_FACEBOOK_APP_ID}` : ''}`}
                  width="340"
                  height="500"
                  style={{ border: 'none', overflow: 'hidden', flex: 1, minHeight: 0 }}
                  scrolling="no"
                  frameBorder="0"
                  allowFullScreen={true}
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  title="Apex Pest Solutions Facebook"
                />
              )}
            </div>
          )}
          {ENABLE_FORM && (
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="service">Service Interest</label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                >
                  <option value="">Select a service</option>
                  <option value="general-pest">General Pest Management</option>
                  <option value="mosquito-tick">Mosquito & Tick Control</option>
                  <option value="termite">Termite Treatment</option>
                  <option value="bedbug">Bed Bug Extermination</option>
                  <option value="rodent">Rodent Removal</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary">Send Message</button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

export default Contact

