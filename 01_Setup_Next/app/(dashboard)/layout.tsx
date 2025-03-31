import React from 'react'

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div>Header</div>
      {children}
      <div>Footer</div>
    </>
  )
}

export default layout