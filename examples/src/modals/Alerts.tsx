import React from "react"

export const Alert = ({ theme, description, header = "Внимание" }) => {
  return (
    <div className={`mad-alert mad-alert--${theme}`}>
      <span className="mad-alert__icon">!</span>
      <div className="mad-alert__content">
        <span className="mad-alert__header">{header}</span>
        <span className="mad-alert__description">{description}</span>
      </div>
    </div>
  )
}
