import React, { Component } from 'react';
import { Slider } from 'antd';
import 'antd/dist/antd.css';
import './view3.css';

const marks = {
    0: '00',
    24:'24'
  };

class HourSlider extends Component {

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         checkedList: defaultCheckedList,
    //         indeterminate: true,
    //         checkAll: false,
    //     };
    // }

    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    

    onChangeSilder = value => {
        this.props.changeHour(value);
    }


    render() {
        return (
            <div>
                <div className="check-header fadeInUp" style={{ animationDelay: '1.3s' }}>Select Hour</div>
                <div className="fadeInUp check-header-content" style={{ width: 469, height: 46,paddingTop:-5, paddingBottom:25 ,paddingRight:10,animationDelay: '1.3s' }}>
                    <Slider
                        range
                        min={0}
                        max={24}
                        marks={marks}
                        defaultValue={[0, 24]}
                        onChange={this.onChangeSilder}
                    />
                    <br/>
                </div>
            </div>
        )
    }
}

export default HourSlider