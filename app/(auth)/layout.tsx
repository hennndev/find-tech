import React from 'react'

const AuthLayout = ({children}: {children: React.ReactNode}) => {
    return (
      <main className="flex min-h-screen bg-gray-100">
        {children}
      </main>
    )
}

export default AuthLayout