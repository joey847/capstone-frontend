import React from 'react';
import axios from 'axios';
import DateValue from '../file-upload/DateValue';

class Test extends React.Component {
    
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

<div class="max-w-sm rounded overflow-hidden shadow-lg">
  <img class="w-full" src="sunset.gif" alt="Sunset in the mountains" />
  <div class="px-6 py-4">
    <div class="font-bold text-xl mb-2">The Coldest Sunset</div>
    <p class="text-gray-700 text-base">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
    </p>
  </div>
  <div class="px-6 pt-4 pb-2">
    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
  </div>
</div>
        );
    }
}

export default Test;
