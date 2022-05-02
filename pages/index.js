import FileUpload from '../components/file-upload/FileUpload'

export default function Home() {
  return (
    <div className='flex flex-col items-center'>
      <div className='text-center mt-6'>
        <h1 className='text-5xl font-bold'>Temporary File Hosting</h1>
        <h3 className='text-base mt-3.5'>Files expire after 24hrs</h3>
      </div>
      <FileUpload />
        <div className='footer'>
            <a href={`${process.env.clientUrl}/terms-of-use`}>Terms of Service</a>
        </div>
    </div>
  )
}
