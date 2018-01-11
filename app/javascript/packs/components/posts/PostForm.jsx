import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField';
import Dropzone from 'react-dropzone'
import ImageAddAPhoto from 'material-ui/svg-icons/image/add-a-photo'
import { Row, Col } from 'react-flexbox-grid'
import ContentRemoveCircle from 'material-ui/svg-icons/content/remove-circle'

export default class PostForm extends Component {

  render() {
    const { setPostDialog, open, createPost, photos, onDrop, deletePreview, previewsMax } = this.props
    return (
          <form id="post-form" onSubmit={(e) => createPost(e, photos)}>
            <Row>
              <TextField
                id = 'post'
                name="post[content]"
                multiLine={true}
                rowsMax={4}
                fullWidth={true}
              />
            </Row>
            <Row>
            {  photos.map((photo,n) => {
              return(
                <Col xs={2} key={n}>
                  <div onClick={() => deletePreview(n)} className="preview-photo">
                    <ContentRemoveCircle />
                    <img src={photo.preview} />
                  </div>
                </Col>)})
            }
            </Row>
            {previewsMax? <p>10 photos max</p> : null}
            <Row>
              <Col xs={8}>
                <Dropzone className="dropzone" name="photos" onDrop={onDrop}>
                 <ImageAddAPhoto />
                </Dropzone>
              </Col>
              <Col xs={4}>
                <RaisedButton type="submit">Post</RaisedButton>
              </Col>
            </Row>
          </form>
    );
  }
}
