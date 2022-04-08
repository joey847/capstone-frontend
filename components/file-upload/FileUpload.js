import React from 'react';
import axios from 'axios';
import DateValue from '../file-upload/DateValue';

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

    fileUploadHandler = () => {
        const formData = new FormData();
        formData.append('file', this.state.selectedFile, this.state.selectedFile.name);
        axios.post('http://localhost:8082/api/file/upload', formData)
        .then(res => {
            console.log(res);
        });
    }

    render() {
        return (

            // I added more box shadow to the main form box
            <div className='lg:w-5/12 sm:w-3/4 border border-blue-200 w-96 h-96 p-8 flex shadow-[0_25px_30px_-15px_rgba(0,0,0,0.3)] justify-center item-center drop-shadow-sm'>
                

                <div className='w-7/12 h-full flex flex-col justify-center'>
                    <h1 class="font-bold pb-4 text-2xl">Upload Your File Here:</h1>
                        {/* Date display */}

                        <p classname="h-full justify flex-col text-center row-span-full ">
                        <DateValue/>
                   </p>

                    <label className="flex flex-col w-full h-32 border-2 border-slate-300 border-dashed hover:bg-gray-100 hover:border-gray-300">

        
                        <div className="flex flex-col items-center justify-center pt-7">
                            
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-gray-400 group-hover:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>

{/* Added some transition delay on the hover selector */}
                            <p className="pt-1 text-sm transition delay-35 text-gray-400 group-hover:text-gray-600 ">Click here to Upload a File</p>

                                <br></br>
                            <p class="text-xs text-gray-400 ">Any file, PDF, PNG, JPG, GIF up to 10MB</p>


                
                        </div>

                        <input type="file" onChange={this.fileHandler} className="opacity-0" />
                    </label>

                    {/* Below I added an animation delay to the submit button.*/}

                    <button className='bg-black transition delay-25 hover:bg-blue-700 rounded-lg text-white font-bold py-2 px-4 mt-8 inline-flex items-center drop-shadow hover:drop-shadow-none' onClick={this.fileUploadHandler}>
                        <span className="">Submit</span>
                    </button>
                </div>
            </div>
        );
    }
}

export default FileUpload;
