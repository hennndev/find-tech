import React, { SyntheticEvent } from 'react'

type PropsTypes = {
  children: React.ReactNode,
  handleClose: (e: SyntheticEvent) => void
}

const Modal = ({children, handleClose}: PropsTypes) => {
  return (
    <div className="fixed top-0 right-0 bottom-0 left-0 w-full h-full flex-center px-3 bg-[rgba(0,0,0,0.3)]" onClick={(e) => handleClose(e)}> 
      <div className="max-w-[500px] dark:bg-gray-800 bg-gray-200 rounded-lg ">
        {children}
      </div>
    </div>
  )
}

export default Modal