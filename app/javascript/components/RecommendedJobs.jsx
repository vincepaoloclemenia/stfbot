import React, { Component } from 'react'
import Preference from 'components/PreferenceJob.jsx'

export default class RecommendedJobs extends React.Component{
    constructor(props){
        super(props)
        this.state = { showPreference: false }
    }

    render(){
        if(this.state.showPreference){
            return(
                <Preference closePreference={() => this.setState({ showPreference: false })}/>
            )
        }else{
            return(
                <div className="row m70">
                    <div className='col-lg-8 col-md-10 col-sm-10 col-xs-12 col-lg-offset-2 col-md-offset-1 col-sm-offset-1'>
                        <div className='row pb15'>
                            <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
                                <div className='panel'>
                                    <div className="panel-heading ml15 mr15 with-border">
                                        <h4>Recommended Jobs
                                            <div className='pull-right'>
                                                <button onClick={() => this.setState({ showPreference: true })} className='btn btn-primary pull-right table-btn'><i className="fa fa-eye pr1" aria-hidden="true"></i>Show Job Preferences</button> 
                                            </div>
                                        </h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        
    }
}