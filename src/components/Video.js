import React from "react";
import Component from "./Component";



class Video extends Component {
    constructor(props) {
        super();
        navigator.getUserMedia({ audio: true, video: true }, stream => {
            this.setState({ stream });

        }, error => {
            this.setState({ error });
        })
    }
    render() {

        let { stream } = this.props;

        let src = webkitURL.createObjectURL(stream);

        return <div>
            <video 
                className={this.props.className}
                src={src}
                autoPlay 
                muted
            />
        </div>

    }
}
