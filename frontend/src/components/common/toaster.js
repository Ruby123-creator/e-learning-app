import React from 'react'
import { Bounce, toast } from 'react-toastify'

const toaster = (message) => {
  return (
    toast(message, {
position: "top-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: false,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "dark",
transition: Bounce,
})
  )
}

export default toaster