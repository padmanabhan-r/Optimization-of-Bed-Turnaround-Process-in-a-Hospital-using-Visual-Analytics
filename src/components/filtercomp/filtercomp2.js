import React, { Component } from 'react';
import {Checkbox, Divider, DatePicker } from 'antd';
import moment from 'moment';
// import { DatePicker } from 'antd';


import 'antd/dist/antd.css';
import './view3.css';

const CheckboxGroup = Checkbox.Group;
const { RangePicker } = DatePicker;
const dateFormat = 'DD-MMM';

// const plainOptions = ['1N', '1S', '1W', 'BP', 'SCU'];
const defaultCheckedList = ['1N', '1S', '1W', 'BP', 'SCU'];

class FilterComp2 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            checkedList: defaultCheckedList,
            indeterminate: true,
            checkAll: false,
        };
    }

    // onChangeCheckbox = checkedList => {
    //     this.setState({
    //         checkedList,
    //         indeterminate: !!checkedList.length && checkedList.length < plainOptions.length,
    //         checkAll: checkedList.length === plainOptions.length,
    //     });
    //     this.props.changeIncludedUnit(checkedList);
    // };

    // onCheckAllChange = e => {
    //     const checkedList = e.target.checked ? plainOptions : [];
    //     this.setState({
    //         checkedList: checkedList,
    //         indeterminate: false,
    //         checkAll: e.target.checked,
    //     });
    //     this.props.changeIncludedUnit(checkedList);
    // };

    // onChangeSilder = value => {
    //     this.props.changeDate(value);
    // };

    onDatePickerChange = (value, dateString) => {
        this.props.changeDate(dateString);
    };



    render() {
        return (
            <div>
                <div className="check-header fadeInUp" style={{ animationDelay: '1.3s' }}>Select Date Range</div>
                <div className="fadeInUp check-header-content" style={{ width: 470, height: 45, animationDelay: '1.3s' }}>
                    <RangePicker
                        defaultValue={[moment('01-Jan', dateFormat), moment('31-Dec', dateFormat)]}
                        format="DD-MMM"
                        onChange={this.onDatePickerChange}
                        style={{ width: 450}}
                    />
                </div>
            </div>
        )
    }
}

export default FilterComp2