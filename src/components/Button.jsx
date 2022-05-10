import React from 'react'

export const Button = ({title, onClick}) => {
  const styles = {
    padding: "0.5rem",
    textAlign: "center",
    backgroundColor: "#71C314",
    color: "white"
  }
  return (
    <div style={styles} onClick={onClick}>{title}</div>
  )
}
