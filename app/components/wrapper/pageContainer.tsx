"use client"
import React from 'react'

type PropsTypes = {
    children: React.ReactNode
    classes?: string
}
const PageContainer = ({children, classes = ""}: PropsTypes) => {
    return (
        <section className={classes}>
            {children}
        </section>
    )
}
export default PageContainer