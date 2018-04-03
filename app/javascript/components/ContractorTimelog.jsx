import React, { Component } from 'react'

export default class ContractorTimelog extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            fetching: false,
            timelogs: [],
            tabLeftOpen: true
        }
    }
    
    componentDidMount(){
        this.setState({ fetching: true })
        $.ajax({
            url: '/api/timelogs.json',
            method: 'GET',
            success: (data) => {
                this.setState({
                    timelogs: data.timelogs, fetching: false
                })
            }
        })
    }

    render(){
        return( 
            <div className='panel-body'>
                <div className='row ml15 pb20'>
                    <div className='col-md-12'>
                        <div className="tab">
                            <button className={`tablinks${this.state.tabLeftOpen ? ' active' : ''}`} onClick={() => this.setState({ tabLeftOpen: true })}>All Timelogs</button>
                            <button className={`tablinks${this.state.tabLeftOpen ? '' : ' active'}`} onClick={() => this.setState({ tabLeftOpen: false })}>Timelogs by months</button>
                        </div>
                    </div>
                </div>
                <div className='row pb20'>
                    <div className='col-md-12'>
                        <table id='timelog' className='table table-bordered table-striped table-dark'>
                            <thead>
                                <th scope="col">Date</th>
                                <th scope="col">Time in</th>
                                <th scope="col">Break Out</th>
                                <th scope="col">Break In</th>
                                <th scope="col">Total Break Hours</th>
                                <th scope="col">Time Out</th>
                                <th scope="col">Overtime In</th>
                                <th scope="col">Overtime Out</th>
                                <th scope="col">Overtime Hours</th>
                                <th scope="col">Overtime Pay</th>
                                <th scope="col">Total Hours Rendered</th>
                                <th scope="col">Gross Pay</th>
                                <th scope="col">Total Pay</th>
                            </thead>
                            {this.renderTimelogs()}
                        </table>
                    {this.renderWarning()}
                    </div>
                </div>
            </div> 
        )
    }

    renderWarning(){
        if(this.state.fetching){
            return(
                <div className='row pb20 pt20'>
                    <center><i className="fa fa-spinner fa-spin fa-2x fa-fw with-color"></i></center>                
                </div>
            )
        }
        if(this.state.timelogs === 0){
            return(
                <div className='row pb20 pt20'>
                    <center><i className="fa fa-spinner fa-spin fa-2x fa-fw with-color"></i></center>                
                </div>
            )
        }
    }

    renderTimelogs(){
        if(this.state.fetching) { return }
        if(this.state.tabLeftOpen){
            return(
                <tbody>
                    {
                    this.state.timelogs.map((timelog, index) => 
                            <tr key={index}>
                                <td className='timelog-date'>{timelog.date}</td>
                                <td>{timelog.login}</td>
                                <td>{timelog.break_out}</td>
                                <td>{timelog.break_in}</td>
                                <td>{timelog.total_break_hours}</td>
                                <td>{timelog.logout}</td>
                                <td>{timelog.overtime_in}</td>
                                <td>{timelog.overtime_out}</td>
                                <td>{timelog.overtime}</td>
                                <td>{timelog.overtime_pay}</td>
                                <td>{timelog.total_hours}</td>
                                <td>{timelog.gross_pay}</td>
                                <td>{timelog.total_pay}</td>
                            </tr>
                        )
                    }
                </tbody>
            
            )
        }
        else{
            return
        }
    }
}