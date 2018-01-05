import React, { Component } from 'react'

export default class JobsContainer extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            class: 'col-lg-12 col-md-12 col-sm-12 col-xs-12'
        }
    }

    componentDidMount(){

    }

    render(){
        return(
            <div className='row m70'>
                <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
                    <div className='row pb20'>
                        <div className={this.state.class} >
                            <div className='panel'>
                                <div className="panel-heading ml15 mr15 with-border">
                                    <h5>List of Jobs</h5>
                                </div>
                                <div className='panel-body'>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}