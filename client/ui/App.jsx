/**
 * Created by ianli on 3/10/17.
 */
import React, { Component } from 'react';
import ImageHolder from './ImageHolder';
import Dropzone from 'react-dropzone';
import gifshot from 'gifshot';

var images = [];
var input = '';

function downloadURI(uri, name) {
    var link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    delete link;
}

var DropzoneDemo = React.createClass({
    getInitialState: function () {
        return {
            files: [],
            index: 0
        };
    },
    onDrop: function (acceptedFiles) {
        console.log(this.state.index);
        console.log(this.state.files);
        console.log(acceptedFiles);
        var newfiles = this.state.files;
        acceptedFiles.map(function (file, index) {
            newfiles.push(file);
        })
        console.log(newfiles)
        this.setState({
            files: newfiles,
            index: this.state.index+1,
        });
    },
    onOpenClick: function () {
        this.dropzone.open();
    },
    onDownload: function () {
         img = document.getElementById('gif');
         //var url = img.src.replace(/^data:image\/[^;]/, 'data:application/octet-stream');

         downloadURI(img.src, "sample_gif.gif");
    },
    onShowClick: function () {
        console.log('hihihihihihihih')
        gifshot.createGIF({
            'interval': input.value*0.001,
            'images': images,
        },function(obj) {
            if(!obj.error) {
                var image = obj.image,
                    animatedImage = document.createElement('img');
                animatedImage.src = image;
                document.body.appendChild(animatedImage);
            }
        });

        console.log(input.value)



    },
    render: function () {
        return (
            <div>
                <ImageHolder images={this.state.files} />

                <Dropzone ref={(node) => { this.dropzone = node; }} onDrop={this.onDrop}
                    style={{
                        border: '4px dashed black',
                        borderRadius: '25px',
                        backgroundRepeat: 'no-repeat',
                        height: '300px',
                        width: '95%',
                        textAlign: 'center',
                        marginTop: '15px',
                        marginLeft: '20px',
                    }}
                >
                    <h1 style={{
                        marginTop: '100px',
                    }}>Try dropping some files here, or click to select files to upload.</h1>

                    {this.state.files.length > 0 ? <div>
                            <h2>Uploaded {this.state.files.length} files...</h2>
                            {this.state.files.map(
                                function(file,index){
                                    images.push(file.preview)
                                }
                            )}

                        </div> : null}

                </Dropzone>
                <br />

                <div style={{
                    textAlign: 'center',
                }}>

                    Enter Parameters:
                    <input ref={node => {
                        input = node
                    }} style={{
                        position: 'relative',
                        top: '-5px',
                        marginRight: '15px',
                        height: '32px',
                        fontSize: '8pt',
                    }}
                           placeholder="Example:500=>500ms"
                    />


                <button type="button" onClick={this.onShowClick} style={{
                    fontSize: '20pt',
                }}>
                    Generate Gif
                </button>
                <button type="button" onClick={this.onOpenClick}
                        style={{
                            marginLeft: '20px',
                            fontSize: '20pt',
                        }}
                >
                    Choose Files
                </button>
                    <button id="gif" type="button" onClick={this.onDownload}
                            style={{
                                marginLeft: '20px',
                                fontSize: '20pt',
                            }}
                    >
                        Download
                    </button>
                </div>
            </div>
        );
    }
});

// App component - represents the whole app
export default class App extends Component {

    render() {
        return (
            <div className="container">
                <DropzoneDemo />
            </div>
        );
    }
}