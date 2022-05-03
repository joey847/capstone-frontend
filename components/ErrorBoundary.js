import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props)
    
      // Define a state variable to track whether is an error or not
      this.state = { hasError: false }
    }
    static getDerivedStateFromError(error) {
      // Update state so the next render will show the fallback UI
      return { hasError: true }
    }
    
    componentDidCatch(error, errorInfo) {
      console.log({ error, errorInfo })
    }
    
    render() {
    
      // Check if the error is thrown
      if (this.state.hasError) {
        return (
          <div className='w-screen text-center'>
            <h2>There was an error!</h2>
            <button
              type="button"
              className='bg-white border border-black text-black font-semibold py-2 px-4 mt-2 inline-flex justify-center items-center drop-shadow hover:drop-shadow-none hover:bg-gray-50 hover:border-gray-300'
              onClick={() => this.setState({ hasError: false })}
            >
              <span>Try again?</span>
            </button>
          </div>
        )
      }
      // Return children components in case of no error
      return this.props.children
    }
}

export default ErrorBoundary
