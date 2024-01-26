import React from 'react'
import Form from 'react-bootstrap/Form';
// import './FileUploadScreen.scss'
import ListenVoice from '../ListenVoice';
import Dictaphone from '../Dictaphone';
import IdentifyVoice from '../IdentifyVoice';

const FileUploadScreen = () => {

  return (
    <div className='p-5'>
     <header className='page-header'>
      <h2>
        Documents 
      </h2>
     </header>
     <hr/>
     {/* <Form.Group controlId="formFileLg" className="mb-3 px-3">
        <Form.Control type="file" size="lg" />
      </Form.Group> */}
      {/* <div className='mt-4'>
        <ListenVoice />
      </div> */}
      <div className='mt-4'>
        {/* <Dictaphone /> */}
        <IdentifyVoice />
      </div>
    </div>
  )
}

export default FileUploadScreen
