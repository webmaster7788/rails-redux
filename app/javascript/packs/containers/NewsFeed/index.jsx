import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getPostsList, createPost } from '../../actions/posts'
import { setPostDialog, uploadPhotos, deletePreview } from '../../actions/pages'
import PostForm from '../../components/posts/PostForm'
import PostsList from '../../components/posts/PostsList'
import { goToPage } from '../../helpers/application_helper'
import { Row, Col } from 'react-flexbox-grid'

export class NewsFeed extends Component {

    render() {
        const { postsList, getPostsList, setPostDialog, pages, createPost, goToPage,
            uploadPhotos, deletePreview } = this.props
        return(
            <Row>
                <Col
                    xs={12}
                    sm={8}
                    md={6}
                    lg={4}
                >
                    <PostForm
                        setPostDialog={setPostDialog}
                        open={pages.get('postDialog')}
                        createPost={createPost}
                        onDrop={uploadPhotos}
                        deletePreview={deletePreview}
                        photos={pages.get('photos')}
                        previewsMax={pages.get('previewsMax')}
                    />
                </Col>
                <Col xs={12}>
                    <PostsList
                        postsList={postsList}
                        goToPage={goToPage}
                        getPostsList={getPostsList}
                        listEnd={pages.get('postsListEnd')}
                    />
                </Col>
            </Row>
        )
    }
}
const mapStateToProps = state => ({
    postsList: state.postsList,
    pages: state.pages
})

const mapDispatchToProps = dispatch => ({
    getPostsList: page => dispatch(getPostsList(page)),
    setPostDialog: value => dispatch(setPostDialog(value)),
    goToPage: url => dispatch(goToPage(url)),
    uploadPhotos: photos => dispatch(uploadPhotos(photos)),
    deletePreview: n => dispatch(deletePreview(n)),
    createPost: (e, photos) => {
        e.preventDefault()
        const post = new FormData(document.getElementById('post-form'))
        if (photos.count() <= 10)
            photos.map(photo => {
                post.append('images[]', photo)
            })
        document.getElementById('post').value = ""
        dispatch(createPost(post))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(NewsFeed)
