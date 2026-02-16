import React, { useState, useRef, useEffect } from 'react'
import './Services.css'
import apexporch from '../assets/apexporch.jpg'
import holes from '../assets/holes.jpg'
import pestvideo from '../assets/pestvideo.mp4'

const Services = () => {
  const [activeTab, setActiveTab] = useState(0)
  const [videoStillUrl, setVideoStillUrl] = useState(null)
  const [expandedMobileCards, setExpandedMobileCards] = useState(new Set())
  const videoRef = useRef(null)
  const capturingForStillRef = useRef(false)
  const mobileCardRefs = useRef([])

  const TRIM_SECONDS = 2 / 3

  const captureVideoStill = (video) => {
    if (!video || video.readyState < 2) return
    const canvas = document.createElement('canvas')
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    const ctx = canvas.getContext('2d')
    ctx.drawImage(video, 0, 0)
    setVideoStillUrl(canvas.toDataURL('image/jpeg', 0.9))
  }

  const handleVideoLoadedMetadata = (e) => {
    const video = e.target
    if (video.duration && !isNaN(video.duration)) {
      video.currentTime = TRIM_SECONDS
    }
  }

  const handleVideoTimeUpdate = (e) => {
    const video = e.target
    if (!video.duration || isNaN(video.duration)) return
    const trimEnd = Math.max(TRIM_SECONDS, video.duration - TRIM_SECONDS)
    if (video.currentTime >= trimEnd) {
      video.pause()
      capturingForStillRef.current = true
      video.currentTime = video.duration * 0.5
    }
  }

  const handleVideoSeeked = (e) => {
    if (!capturingForStillRef.current) return
    capturingForStillRef.current = false
    const video = e.target
    requestAnimationFrame(() => {
      requestAnimationFrame(() => captureVideoStill(video))
    })
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index, 10)
            if (!isNaN(index)) {
              setExpandedMobileCards((prev) => new Set([...prev, index]))
            }
          }
        })
      },
      { threshold: 0.2, rootMargin: '0px' }
    )
    mobileCardRefs.current.forEach((el) => {
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const services = [
    {
      title: 'General Pest Management',
      description: 'Comprehensive pest control for ants, roaches, spiders, and other common pests. Safe, professional treatments that protect your family and pets.',
      price: 'Starting at $175',
      image: apexporch
    },
    {
      title: 'Mosquito & Tick Control',
      description: 'Reduce mosquitoes and ticks in your yard with barrier treatments and ongoing control. Enjoy your outdoor space with fewer bites and lower risk of tick- and mosquito-borne illness.',
      price: 'Starting at $65/month',
      image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&h=600&fit=crop',
      video: pestvideo
    },
    {
      title: 'Weed & Vegetation Management',
      description: 'Targeted applications to remove unwanted plants and weeds from business and residential properties, to improve street appeal.',
      price: 'Starting at $65/month',
      image: 'https://images.unsplash.com/photo-1563241527-3004b7be0dff?w=800&h=600&fit=crop'
    },
    {
      title: 'Bed Bug Extermination',
      description: 'Complete bed bug elimination using heat treatment and targeted applications. We ensure thorough removal and provide follow-up inspections.',
      price: 'Starting at $450',
      image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&h=600&fit=crop'
    },
    {
      title: 'Rodent Removal',
      description: 'Comprehensive rodent control including mice, rats, and squirrels. We identify entry points, remove existing pests, and prevent future infestations.',
      price: 'Starting at $300',
      image: holes
    }
  ]

  const activeService = services[activeTab]

  return (
    <section id="services" className="services">
      {/* Preload mosquito video so it's ready when the tab is clicked */}
      <video
        src={pestvideo}
        preload="auto"
        muted
        playsInline
        aria-hidden="true"
        style={{ position: 'absolute', width: 0, height: 0, opacity: 0, pointerEvents: 'none' }}
      />
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Our Services</h2>
          <p className="section-subtitle">Expert pest control solutions tailored to your needs</p>
        </div>
        
        {/* Mobile Grid Layout - expand on scroll */}
        <div className="services-grid">
          {services.map((service, index) => (
            <div
              key={index}
              ref={(el) => { mobileCardRefs.current[index] = el }}
              data-index={index}
              className={`service-card service-card-mobile ${expandedMobileCards.has(index) ? 'mobile-expanded' : 'mobile-collapsed'}`}
            >
              <div className="service-card-header">
                <h3 className="service-title">{service.title}</h3>
                <p className="service-price">{service.price}</p>
              </div>
              <div className="service-card-expandable">
                <p className="service-description">{service.description}</p>
                {expandedMobileCards.has(index) && (
                  <div className="service-card-media">
                    {service.video ? (
                      videoStillUrl ? (
                        <img src={videoStillUrl} alt={service.title} className="service-video-still" />
                      ) : (
                        <video
                          ref={videoRef}
                          src={service.video}
                          autoPlay
                          muted
                          playsInline
                          controls
                          className="service-video"
                          onLoadedMetadata={handleVideoLoadedMetadata}
                          onTimeUpdate={handleVideoTimeUpdate}
                          onSeeked={handleVideoSeeked}
                        />
                      )
                    ) : (
                      <img src={service.image} alt={service.title} loading="eager" />
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Tabbed Layout */}
        <div className="services-tabbed">
          <div className="services-tabs">
            {services.map((service, index) => (
              <button
                key={index}
                className={`service-tab ${activeTab === index ? 'active' : ''}`}
                onClick={() => setActiveTab(index)}
              >
                {service.title}
              </button>
            ))}
          </div>
          <div className="services-content">
            <div className="service-content-info">
              <div className="service-content-header">
                <h3 className="service-content-title">{activeService.title}</h3>
                <p className="service-content-price">{activeService.price}</p>
              </div>
              <p className="service-content-description">{activeService.description}</p>
            </div>
            <div className="service-content-image">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="service-image-wrap"
                  style={{ display: index === activeTab ? 'block' : 'none' }}
                  aria-hidden={index !== activeTab}
                >
                  {service.video ? (
                    videoStillUrl ? (
                      <img src={videoStillUrl} alt={service.title} className="service-video-still" />
                    ) : (
                      <video
                        ref={videoRef}
                        src={service.video}
                        autoPlay
                        muted
                        playsInline
                        controls
                        className="service-video"
                        onLoadedMetadata={handleVideoLoadedMetadata}
                        onTimeUpdate={handleVideoTimeUpdate}
                        onSeeked={handleVideoSeeked}
                      />
                    )
                  ) : (
                    <img src={service.image} alt={service.title} loading="eager" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Services

