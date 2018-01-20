import React from 'react'

export class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {file: '',imagePreviewUrl: '', data_uri: ''};
  }

  _handleSubmit(e) {
    e.preventDefault();
    // TODO: do something with -> this.state.file
    console.log('handle uploading-', this.state.file);
    console.log('handle uploading-', this.state.data_uri);
  }

  _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = (upload) => {
      this.setState({
        data_uri: upload.target.result,
        file: file,
        imagePreviewUrl: reader.result
      });
    }

    reader.readAsDataURL(file)
  }

  render() {
    let {imagePreviewUrl} = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img src={imagePreviewUrl} />);
    } else {
      $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
    }

    return (
      <div className="previewComponent">
        
          <input className="fileInput" 
            type="file" 
            onChange={(e)=>this._handleImageChange(e)} />
          <button className="submitButton" 
            type="submit" 
            onClick={(e)=>this._handleSubmit(e)}>Upload Image</button>          
          <button className="submitButton" 
            
            onClick={(e)=>{this.props.onChange(this.state.file); }}>Upload Image2</button>
        <div className="imgPreview">
          {$imagePreview}
          <img src={this.props.value} />
        </div>
      </div>
    )
  }
}