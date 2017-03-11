
import React, { Component } from 'react';

export default class ImageHolder extends Component {
    render() {
        console.log('hihihi')
        console.log(this.props)

        console.log(document.getElementById('holder'))
        return (
            <div
                id="holder"
                style={{
                    height: '100%',
                    width: '100%',
                    backgroundColor: 'pink',
                }}
            >
                {this.props.images.length > 0 ? <div>
                        <div>{this.props.images.map(
                            function(image,index){
                                return (
                                    <img key={index} src={image.preview} style={{
                                        height: '120px',
                                        width: '160px',
                                        marginTop: '15px',
                                        marginLeft: '15px',
                                        marginBottom: '15px',
                                    }} />
                                )
                            }
                        )}</div>
                    </div> : null}
            </div>
        );
    }
}