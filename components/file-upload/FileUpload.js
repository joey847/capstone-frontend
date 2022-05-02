import React from 'react';
import axios from 'axios';
import DateValue from './DateValue';
import toast from 'react-hot-toast';

class FileUpload extends React.Component {
    
    static getInitialProps() {
        return { }
    }

    state = {
        selectedFile: null
    }
    
    fileHandler = async (event) => {
        this.setState({
            selectedFile: event.target.files[0]
        })
    }

    fileName = "";
    secretKey = "";
    fileSize = "";
    fileDetailsURL = "";
    fileDownloadURL = "";

    addFileRow = () => {
        console.log("File Name: ", this.fileName);
        console.log("Secret Key: ", this.secretKey);
        console.log("File Size in Bytes: ", this.fileSize);

        this.fileDetailsURL = process.env.clientUrl + "/details?file=" + JSON.parse(this.secretKey);
        this.fileDownloadURL = process.env.serverUrl + "/api/file/download/" + JSON.parse(this.secretKey);
        
        document.getElementById("file-row").innerHTML +=
        `<tr class="bg-white hover:bg-gray-50">
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                ${JSON.parse(this.fileName)}
            </th>
            <td class="px-6 py-4 text-right">
                <a href="${this.fileDetailsURL}" class="font-medium text-blue-600 hover:underline">Details</a>
            </td>
            <td class="px-6 py-4 text-right">
                <a href="${this.fileDownloadURL}" download class="font-medium text-blue-600 hover:underline">Download</a>
            </td>
        </tr>`
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

        // POST request using our form data.
        axios.post(process.env.serverUrl + '/api/file/upload', formData)

        // Success
        .then(res => {
            console.log(res);
            toast.success('File uploaded successfully', { id: 'successful-upload-toast' },);

            this.fileName = JSON.stringify(res.data.data.filename);
            this.secretKey = JSON.stringify(res.data.data.secretKey);
            this.fileSize = JSON.stringify(res.data.data.size);

            // Create row for file table
            this.addFileRow();
        })
        
        // Failure
        .catch((error) => {
            console.log("error", error);
            toast.error('Something went wrong. Please try again', { id: 'error-upload-toast' },);
        });
    }

    render() {
        return (
            <>

            {/* I added some responsive elements to the form to improve breakpoints */}
            <div className='xs:w-full sm:w-full mt-14 p-8 border border-black bg-red-50 border-2 border-dashed lg:1/4 md:w-2/5 flex justify-center item-center'>
                <div className='flex flex-col'>
            <DateValue/>
                    
                    <label className="border border-black hover:bg-gray-50 hover:border-gray-300">
                        <div className="flex flex-col items-center justify-center pt-7">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-gray-400 group-hover:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                            <p className="pt-1 text-black text-lg text-center group-hover:text-gray-600">Select Files to Upload</p>
                        </div>
                        
                        <input type="file" onChange={this.fileHandler} className="opacity-0" />
                    </label>
                    
                    <button onClick={this.fileUploadHandler} className='bg-white border border-black text-black font-semibold py-2 px-4 mt-8 inline-flex justify-center items-center drop-shadow hover:drop-shadow-none hover:bg-gray-50 hover:border-gray-300'>
                        <span>Upload</span>
                    </button>
                </div>
            </div>

            
            { /* File table */ }
            <div className="relative overflow-x-auto mt-5">
                <table className="w-full text-sm text-left text-gray-500" id="file-table">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                File name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Details
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Download
                            </th>
                        </tr>
                    </thead>


                    <tbody id="file-row"></tbody>
                </table>
            </div>
            </>
        );
    }
}

export default FileUpload;
