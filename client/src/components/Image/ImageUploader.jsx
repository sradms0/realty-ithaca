import React, { Component } from 'react';
import { Divider, Input, Label, Button } from 'semantic-ui-react';
import axios from 'axios';

import ImageList from './ImageList';

export default class ImageUpload extends Component {
  state = {
    srcs: [],
    files: [],
    uploading: false
  }

  toggleUploadStatus = () => this.setState(prevState => ({
    uploading: !prevState.uploading
  }));
  
  hasFiles = () => this.state.files.length > 0;

  // update srcs for preview
  // update files for upload prep to server
  onChange = e => {
    const newFiles = [...e.target.files];
    const newSrcs = newFiles.map(blob => URL.createObjectURL(blob));

    this.setState(prevState => ({ 
      srcs: [...prevState.srcs, ...newSrcs],
      files: [...prevState.files, ...newFiles]
    }));
  }

  removeAll = () => this.setState({ srcs: [], files: [] })

  // remove single src/file by blob name in srcs
  removeForUpload = src => {
    const idx = (this.state.srcs.indexOf(src));
    this.setState(prevState => ({ 
      srcs: [...prevState.srcs.slice(0,idx), ...prevState.srcs.slice(idx+1)], 
      files: [...prevState.files.slice(0,idx), ...prevState.files.slice(idx+1)]
    }));
  }

  disableRemoveButtons = () => {
    document.querySelectorAll('.remove')
      .forEach(i => i.disabled = true);
  }

  // upload all selected files to server
  onFormSubmit = async e => {
    e.preventDefault();
    if (this.hasFiles()) {
      // create form data for multer to accept and parse
      const formData = new FormData();
      this.state.files.forEach(file => formData.append('image', file));
      const config = { headers:{'Content-Type': 'multipart/form-data'} };
      try {
        this.toggleUploadStatus();
        this.disableRemoveButtons()
        await axios.post(
          '/api/image', 
          formData,
          config
        );
        this.toggleUploadStatus();
        this.removeAll();
        console.log('success');
      } catch(err) {
          console.log(`failed....${err}`);
      }
    }
  }

  // show current list of files to upload
  previewList = () => (
    <ImageList 
      srcs={this.state.srcs} 
      size='tiny' 
      edit={ {remove: this.removeForUpload} }
    />
  );

  // semantic doesn't have any Input components 
  // specifically for file input, so to avoid an ugly 'browse'
  // button, input is hidden, and a Label component is used
  render() {
    return (
      <div>
        <form onSubmit={this.onFormSubmit}>
          <Label
            as='label'
            basic
            htmlFor='upload'
            icon='plus'
            content='Add Images'
          />
          <input
            hidden
            id='upload'
            multiple
            type='file'
            onChange={this.onChange}
          />
          <Button 
            color='green' 
            icon='upload' 
            size='mini' 
            content='Upload'
            type='submit'
          />
        </form>
        <Divider>
          {this.state.uploading 
            ? 'uploading.....'
            : `ready for upload: ${this.state.files.length}`
          }
          {this.hasFiles() ? (this.previewList()) : null}
        </Divider>
      </div>
    );
  }
}
