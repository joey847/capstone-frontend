import React from 'react';
import axios from 'axios';

function Details({ file }) {
    return (
        
        <div className='flex flex-col items-center'>
            {console.log(file)}
            <div className='text-center mt-6'>
                <h1 className='text-5xl font-bold'>File Details</h1>
            </div>
            
            {
                (Object.keys(file).length === 0 && Object.getPrototypeOf(file) === Object.prototype) && <>
                    <h1 className='text-xl mt-6'>File Not Found</h1>
                </>
            }

            {
                (Object.keys(file).length > 0) && <>
                    <div className='mt-14 p-8 border border-black bg-red-50 border-2 border-dashed w-1/3 flex justify-center item-center'>
                        <div className='flex flex-col'>

                            <label className="border border-black px-10 py-2">
                                <div className="flex flex-col items-center justify-center p-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" className="w-8 h-8 text-gray-400">
                                        <path d="M144 480C64.47 480 0 415.5 0 336C0 273.2 40.17 219.8 96.2 200.1C96.07 197.4 96 194.7 96 192C96 103.6 167.6 32 256 32C315.3 32 367 64.25 394.7 112.2C409.9 101.1 428.3 96 448 96C501 96 544 138.1 544 192C544 204.2 541.7 215.8 537.6 226.6C596 238.4 640 290.1 640 352C640 422.7 582.7 480 512 480H144zM303 392.1C312.4 402.3 327.6 402.3 336.1 392.1L416.1 312.1C426.3 303.6 426.3 288.4 416.1 279C407.6 269.7 392.4 269.7 383 279L344 318.1V184C344 170.7 333.3 160 320 160C306.7 160 296 170.7 296 184V318.1L256.1 279C247.6 269.7 232.4 269.7 223 279C213.7 288.4 213.7 303.6 223 312.1L303 392.1z"/>
                                    </svg>
                                    <p className="pt-1 text-black text-lg text-center group-hover:text-gray-600">{ file.filename }</p>
                                    <p className="pt-1 text-black text-base text-center group-hover:text-gray-600">{ file.size } Bytes</p>
                                </div>
                            </label>

                            <button className='bg-white border border-black text-black font-semibold py-2 px-4 mt-8 inline-flex justify-center items-center drop-shadow hover:drop-shadow-none hover:bg-gray-50 hover:border-gray-300'>
                                <a href={`/api/file/download/` + file.secretKey} download>Download</a>
                            </button>
                        </div>
                    </div>
            
                    <div className="mt-5">
                        <label className='flex'>
                            <p>Share this file with others:</p>
                            <button onClick={ () => navigator.clipboard.writeText('/app/file/' + file.secretKey) } >
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 ml-2" viewBox="0 0 384 512">
                                    <path d="M336 64h-53.88C268.9 26.8 233.7 0 192 0S115.1 26.8 101.9 64H48C21.5 64 0 85.48 0 112v352C0 490.5 21.5 512 48 512h288c26.5 0 48-21.48 48-48v-352C384 85.48 362.5 64 336 64zM192 64c17.67 0 32 14.33 32 32c0 17.67-14.33 32-32 32S160 113.7 160 96C160 78.33 174.3 64 192 64zM272 224h-160C103.2 224 96 216.8 96 208C96 199.2 103.2 192 112 192h160C280.8 192 288 199.2 288 208S280.8 224 272 224z"/>
                                </svg>
                            </button>
                        </label>
                    </div>
                </>
            }

        </div>
    )
}

export async function getStaticProps({ params }) {

    const { key } = params;

    let file = {}

    const res = await axios.get(`/api/file/details/${key}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        file = response.data.data
        console.log('success', response)
    })
    .catch((error) => {
        console.log('error', error);
    });

    return {
        props: { file }
    }
}

export async function getStaticPaths() {
    return {
        paths: [],
        fallback: "blocking",
    };
}

export default Details