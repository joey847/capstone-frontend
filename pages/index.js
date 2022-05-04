import FileUpload from '../components/file-upload/FileUpload'
import React from "react";

export default function Home() {
  return (
    <div className='flex flex-col items-center'>
      <div className='text-center mt-16'>
        <h1 className='text-5xl font-bold'>Temporary File Hosting</h1>
        <h3 className='text-base mt-5'>Files are deleted after download or after 24hrs</h3>
      </div>
      <FileUpload />
    </div>
  )
}
