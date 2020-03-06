import React, { useState, useRef, useEffect } from "react"
import { messages } from "../i18n"
const language = localStorage.getItem("i18nextLng") ? localStorage.getItem("i18nextLng") : "ru"
export const DragAndDrop = props => {
  const [drag, setDrag] = useState(false)
  let dragCounter = 0 //, setDragCounter] = useState(0)
  const dropRef = useRef()
  // const
  useEffect(() => {
    let div: any = dropRef.current
    div.addEventListener("dragenter", handleDragIn)
    div.addEventListener("dragleave", handleDragOut)
    div.addEventListener("dragover", handleDrag)
    div.addEventListener("drop", handleDrop)

    return () => {
      let div: any = dropRef.current
      div.removeEventListener("dragenter", handleDragIn)
      div.removeEventListener("dragleave", handleDragOut)
      div.removeEventListener("dragover", handleDrag)
      div.removeEventListener("drop", handleDrop)
    }
  }, [])
  const handleDrag = e => {
    e.preventDefault()
    e.stopPropagation()
  }
  const handleDragIn = e => {
    e.preventDefault()
    e.stopPropagation()
    dragCounter++
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setDrag(true)
    }
  }
  const handleDragOut = e => {
    e.preventDefault()
    e.stopPropagation()
    dragCounter--
    if (dragCounter - 1 === 0) {
      setDrag(false)
    }
  }
  const handleDrop = e => {
    e.preventDefault()
    e.stopPropagation()
    setDrag(false)
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      props.handleDrop(e)
      e.dataTransfer.clearData()
      dragCounter = 0
    }
  }

  return (
    <div style={{ display: "inline-block", width: "100%", position: "relative" }} ref={dropRef}>
      {drag && (
        <div
          style={{
            // border: "dashed grey 4px",
            backgroundColor: "rgba(255,255,255,.8)",
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 9999
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "dinpro-med",
              color: "#666666",
              fontSize: "16px",
              height: "100%"
            }}
          >
            <div>{messages[language].dropHere}</div>
          </div>
        </div>
      )}
      {props.children}
    </div>
  )
}
