import React, {Component} from 'react'
import Edit from 'components/PreferenceEdit.jsx'

export default class PreferenceJob extends React.Component{
    constructor(props){
        super(props)
        this.state = { edit: false, salary: '', location: '', preference: {}, functions: [], levels: [], positions: [], titles: [] }
    }

    componentDidMount(){
        this.fetcthPreference()
    }

    handleEdit(data){
        this.setState({ edit: false })
        this.fetcthPreference()
        if(data){
            $.notify(data.message, { className: 'error', position: 'top center'})            
        }else{
            $.notify("Job Preferece successfully saved!", { className: 'success', position: 'top center'})
        }
    }

    render(){
        if(this.state.edit){
            return(
                    <div className="row m70">
                        <div className='col-lg-8 col-md-10 col-sm-10 col-xs-12 col-lg-offset-2 col-md-offset-1 col-sm-offset-1'>
                            <div className='row pb15'>
                                <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
                                    <Edit onSave={this.handleEdit.bind(this) } preference={this.state.preference} onCloseForm={() => this.setState({ edit: false })}/>
                                </div>
                            </div>
                        </div>
                    </div>
                )
        }
        return(
            <div className="row m70">
                <div className='col-lg-8 col-md-10 col-sm-10 col-xs-12 col-lg-offset-2 col-md-offset-1 col-sm-offset-1'>
                    <div className='row pb15'>
                        <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
                            <div className='panel'>
                                <div className="panel-heading ml15 mr15">
                                    <h4>Job Preferences
                                        <div className='pull-right'>
                                            <button type='button' onClick={() => this.setState({ edit: true })} className='btn btn-primary table-btn'><i className="fa fa-pencil-square-o pr1" aria-hidden="true"></i>Edit</button>
                                            <span className='gap1'></span>
                                            <button onClick={() => this.props.closePreference()} className='btn btn-primary table-btn'><i className="fa fa-arrow-circle-left pr1" aria-hidden="true"></i>Back</button> 
                                        </div>
                                    </h4>
                                </div>
                                <div className="panel-body mb25">
                                    <div className='row pt20 pb20 bordered'>
                                        <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
                                            <div className='label-for-preference'><h5>Job Function</h5></div>
                                            {this.state.functions.map( (func, index) => 
                                                <div className='row pb20' key={index}>
                                                    <div className='col-lg-12 col-md-12 col-sm-12'>
                                                        <li className='list-item'>{func}</li>
                                                    </div>
                                                </div> 
                                            )}
                                        </div>
                                    </div>
                                    <div className='row pt20 pb20 bordered-bottom'>
                                        <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
                                            <div className='label-for-preference'><h5>Job Title</h5></div>
                                            {this.state.titles.map( (title, index) => 
                                                <div className='row pb20' key={index}>
                                                    <div className='col-lg-12 col-md-12 col-sm-12'>
                                                        <li className='list-item'>{title}</li>
                                                    </div>
                                                </div> 
                                            )}
                                        </div>
                                    </div>
                                    <div className='row pt20 pb20 bordered-bottom'>
                                        <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
                                            <div className='label-for-preference'><h5>Job Level</h5></div>
                                            {this.state.levels.map( (level, index) => 
                                                <div className='row pb20' key={index}>
                                                    <div className='col-lg-12 col-md-12 col-sm-12'>
                                                        <li className='list-item'>{level}</li>
                                                    </div>
                                                </div> 
                                            )}
                                        </div>
                                    </div>
                                    <div className='row pt20 pb20 bordered-bottom'>
                                        <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
                                            <div className='label-for-preference'><h5>Type of Employment</h5></div>
                                            {this.state.positions.map( (pos, index) => 
                                                <div className='row pb20' key={index}>
                                                    <div className='col-lg-12 col-md-12 col-sm-12'>
                                                        <li className='list-item'>{pos}</li>
                                                    </div>
                                                </div> 
                                            )}
                                        </div>
                                    </div>
                                    <div className='row pt20 pb20 bordered-bottom'>
                                        <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
                                            <div className='label-for-preference'><h5>Shift</h5></div>
                                            <div className='preference'>{this.state.preference.shift}</div>
                                        </div>
                                    </div>
                                    <div className='row pt20 pb20 bordered-bottom'>
                                        <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
                                            <div className='label-for-preference'><h5>Salary</h5></div>
                                            <div className='preference'>{this.state.salary}</div>
                                        </div>
                                    </div>
                                    <div className='row pt20 pb20'>
                                        <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
                                            <div className='label-for-preference'><h5>Location</h5></div>
                                            <div className='preference'>{this.state.location}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )

    }

    fetcthPreference(){
        $.ajax({
            url: '/api/preferences.json',
            method: 'GET',
            dataType: 'JSON',
            success: (data) => {
                this.setState({
                    preference: {
                        id: data.id,
                        user_id: data.user_id,
                        location: data.location,
                        shift: data.shift,
                        salary: data.salary,
                        titles: data.titles,
                        functions: data.functions,
                        levels: data.levels,
                        positions: data.positions
                    },
                    salary: data.salary.split(" | ").join(" "),
                    location: data.location.split(" | ").join(", "),                   
                    positions: data.positions,
                    levels: data.levels,
                    titles: data.titles,
                    functions: data.functions,
                })
            }
        })
    }
}