import React from 'react';
import axios from 'axios';
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
        axios.post('/api/file/upload', formData)

        // Success
        .then(res => {
            console.success(res);
            toast.success('File uploaded successfully', { id: 'successful-upload-toast' },);
        })
        
        // Failure
        .catch((error) => {
            console.error("error", error.response.data.message);
            toast.error('Something went wrong. Please try again', { id: 'error-upload-toast' },);
        });
    }

    render() {
        return (
            <div className='mt-14 p-8 border border-black bg-red-50 border-2 border-dashed w-1/3 flex justify-center item-center'>
                <div className='flex flex-col'>
                    
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
        );
    }
}

export default FileUpload;
