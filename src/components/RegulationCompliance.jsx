import React from 'react'
import './RegulationCompliance.css'
import tiradePdf from '../assets/Labels/Tirade-1-Dust-Insecticide-Specimen.pdf'
import vendettaPdf from '../assets/Labels/Vendetta Nitro label.pdf'
import suspendPdf from '../assets/Labels/101563-143 - Suspend PolyZone - Specimen Label 221216AV1.pdf'
import nectusPdf from '../assets/Labels/Nectus Soft Bait Rodenticide.pdf'
import firstStrikePdf from '../assets/Labels/258-FirstStrike-10g-Specimen-ENG-061020.pdf'
import ridescoPdf from '../assets/Labels/Ridesco WG Label.pdf'
import talakPdf from '../assets/Labels/Talak-7.9-F-Specimen.pdf'
import devitoPdf from '../assets/Labels/DeVito-with-EnduraCap-Tech-Specimen.pdf'

const pdfItems = [
  { title: 'Tirade 1 Dust Insecticide', file: tiradePdf, filename: 'Tirade-1-Dust-Insecticide.pdf' },
  { title: 'Vendetta Nitro', file: vendettaPdf, filename: 'Vendetta-Nitro.pdf' },
  { title: 'Suspend PolyZone', file: suspendPdf, filename: 'Suspend-PolyZone.pdf' },
  { title: 'Nectus Soft Bait Rodenticide', file: nectusPdf, filename: 'Nectus-Soft-Bait-Rodenticide.pdf' },
  { title: 'First Strike', file: firstStrikePdf, filename: 'First-Strike.pdf' },
  { title: 'Ridesco WG', file: ridescoPdf, filename: 'Ridesco-WG.pdf' },
  { title: 'Talak 7.9', file: talakPdf, filename: 'Talak-7.9.pdf' },
  { title: 'DeVito EnduraCap', file: devitoPdf, filename: 'DeVito-EnduraCap.pdf' }
]

const RegulationCompliance = () => {
  return (
    <section id="labels-sds" className="regulation-compliance">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Labels/SDS</h2>
        </div>
        <div className="regulation-compliance-grid">
          {pdfItems.map((item) => (
            <div key={item.title} className="compliance-item">
              <h3 className="compliance-item-title">{item.title}</h3>
              <div className="pdf-buttons">
                <a
                  href={item.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="compliance-btn compliance-btn-view"
                >
                  View
                </a>
                <a
                  href={item.file}
                  download={item.filename}
                  className="compliance-btn compliance-btn-download"
                >
                  Download
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default RegulationCompliance
