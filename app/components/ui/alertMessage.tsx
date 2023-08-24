import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'
type PropsTypes = {
  children: React.ReactNode
  classes: string
  isSuccess?: boolean
  handleClose: () => void
}

const AlertMessage = ({children, classes, isSuccess, handleClose}: PropsTypes) => {
  return (
    <div className={`relative border ${isSuccess ? "border-green-600 bg-green-300" : "border-red-600 bg-red-300"} p-3 rounded-md ${classes ? classes : ""}`}>
      <AiOutlineClose className={`absolute top-1 right-1 text-red-700 cursor-pointer text-sm`} onClick={handleClose}/>
      {children}
    </div>
  )
}

export default AlertMessage