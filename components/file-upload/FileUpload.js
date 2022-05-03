import React from 'react';
import axios from 'axios';
import DateValue from './DateValue';
import toast from 'react-hot-toast';

class FileUpload extends React.Component {
    
    static getInitialProps() {
        return { }
    }

    state = {
        selectedFile: null,
        loading: false,
        uploadedFiles: []
    }
    
    fileHandler = async (event) => {
        this.setState({
            selectedFile: event.target.files[0]
        });
    }

    // Called when the user presses the upload button
    fileUploadHandler = () => {

        // The file that we want to upload
        const formData = new FormData();
        
        if (this.state.selectedFile === null) {
            toast.error('File is required', { id: 'no-file-toast' },);
            return;
        }
        
        formData.append('file', this.state.selectedFile, this.state.selectedFile.name);

        this.setState({
            loading: true
        });

        // POST request using our form data.
        axios.post(process.env.serverUrl + '/api/file/upload', formData)

        // Success
        .then(res => {
            console.log(res);
            toast.success('File uploaded successfully', { id: 'successful-upload-toast' },);

            this.state.uploadedFiles.push({
                filename: res.data.data.filename,
                secretKey: res.data.data.secretKey,
                size: res.data.data.size,
            });

            this.setState({
                loading: false,
                selectedFile: null
            });
        })
        
        // Failure
        .catch((error) => {
            console.log("error", error);
            toast.error('Something went wrong. Please try again', { id: 'error-upload-toast' },);

            this.setState({
                loading: false
            });
        });
    }

    render() {
        return (
            <>

            <div className='xs:w-full sm:w-full mt-14 p-8 border border-black bg-red-50 border-2 border-dashed lg:1/4 md:w-2/5 flex justify-center item-center'>
                <div className='flex flex-col'>
                    
                    <DateValue />
                    
                    <label className="max-w-sm border border-black hover:bg-gray-50 hover:border-gray-300">
                        <div className="max-w-sm flex flex-col items-center justify-center pt-7">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-gray-400 group-hover:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                            <p id="file-upload-text" className="max-w-xs truncate pt-1 text-black text-lg text-center group-hover:text-gray-600">{this.state.selectedFile?.name ?? 'Select Files to Upload'}</p>
                        </div>
                        
                        <input type="file" onChange={this.fileHandler} className="opacity-0" />
                    </label>
                    
                    <button disabled={this.state.loading} onClick={this.fileUploadHandler} className='max-w-sm bg-white border border-black text-black font-semibold py-2 px-4 mt-8 inline-flex justify-center items-center drop-shadow hover:drop-shadow-none hover:bg-gray-50 hover:border-gray-300'>
                        <span>{this.state.loading ? 'Uploading...' : 'Upload'}</span>
                    </button>
                </div>
            </div>

            
            { /* File table */ }
            <h1 className='text-2xl font-bold mt-20' style={{display: this.state.uploadedFiles.length === 0 ? 'none' : 'initial'}}>Your Uploaded Files</h1>
            <div className="relative overflow-x-auto mt-5" style={{display: this.state.uploadedFiles.length === 0 ? 'none' : 'initial'}}>

                <table className="w-full text-sm text-left text-gray-500" id="file-table">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Uploaded File
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Details
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Download
                            </th>
                            <th>

                            </th>
                        </tr>
                    </thead>


                    <tbody id="file-row">
                    {this.state.uploadedFiles.map((f, idx) => {
                        return (
                            <tr key={idx} className="bg-white hover:bg-gray-50">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    {f.filename}
                                </th>
                                <td className="px-6 py-4 text-right">
                                    <a href={process.env.clientUrl + "/details?file=" + f.secretKey}
                                       className="font-medium text-blue-600 hover:underline">Details</a>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <a href={process.env.serverUrl + "/api/file/download/" + f.secretKey} download
                                       className="font-medium text-blue-600 hover:underline">Download</a>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button onClick={ () => {
                                        navigator.clipboard.writeText( process.env.clientUrl + "/details?file=" + f.secretKey);
                                        toast.success('Copied Link to Clipboard', { id: 'successful-link-copied-toast' },);
                                    }} >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 ml-2" viewBox="0 0 384 512">
                                            <path d="M336 64h-53.88C268.9 26.8 233.7 0 192 0S115.1 26.8 101.9 64H48C21.5 64 0 85.48 0 112v352C0 490.5 21.5 512 48 512h288c26.5 0 48-21.48 48-48v-352C384 85.48 362.5 64 336 64zM192 64c17.67 0 32 14.33 32 32c0 17.67-14.33 32-32 32S160 113.7 160 96C160 78.33 174.3 64 192 64zM272 224h-160C103.2 224 96 216.8 96 208C96 199.2 103.2 192 112 192h160C280.8 192 288 199.2 288 208S280.8 224 272 224z"/>
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
            </>
        );
    }
}

export default FileUpload;
