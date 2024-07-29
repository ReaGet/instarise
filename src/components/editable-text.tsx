import React from 'react'

interface EditableTextProps {
  children: React.ReactNode;
  text?: string;
}

const EditableText = ({ children }: EditableTextProps) => {
  return (
    <div>{children}</div>
  )
}

export const EditableContent = () => {}

export const EditableField = () => {}

export default EditableText