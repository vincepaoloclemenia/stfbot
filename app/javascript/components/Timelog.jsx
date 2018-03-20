import React, { Component } from 'react'

export default class Timelog extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            allTimelogs: [],
            unvalidatedTimelogs: [],
            fetching: false,
            tabLeftOpen: true
        }
    }

    componentDidMount(){
        this.setState({ fetching: true })
        $.ajax({
            url: `/api/employees/timelogs.json?id=${this.props.user.id}`,
            method: 'GET',
            success: (data) =>{
                this.setState({
                    fetching: false,
                    allTimelogs: data.timelogs,
                    unvalidatedTimelogs: data.unvalidated_timelogs
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
                            <button className={`tablinks${this.state.tabLeftOpen ? '' : ' active'}`} onClick={() => this.setState({ tabLeftOpen: false })}>Timelogs w/ Unvalidated Overtime</button>
                        </div>
                    </div>
                </div>
                <div className='row pb20'>
                    <div className='col-md-12'>
                    {this.renderTimelogs()}
                    </div>
                </div>
            </div>
        )
    }

    renderTimelogs(){
        if (this.state.tabLeftOpen){
            return(
                <table className='table table-striped table-dark'>
                    <thead>
                        <tr>
                            <th scope="col">Date</th>
                            <th scope="col">Time in</th>
                            <th scope="col">Break Out</th>
                            <th scope="col">Break In</th>
                            <th scope="col">Total Break Hours</th>
                            <th scope="col">Time Out</th>
                            <th scope="col">Overtime In</th>
                            <th scope="col">Overtime Out</th>
                            <th scope="col">Overtime Hours</th>
                            <th scope="col">Total Hours Rendered</th>
                            <th scope="col">Total Pay</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderAllTimelogs()}
                    </tbody>
                </table>
            )
        }else{
            return(
                <table className='table table-striped table-dark'>
                    <thead>
                        <tr>
                            <th scope="col">Date</th>
                            <th scope="col">Time in</th>
                            <th scope="col">Break Out</th>
                            <th scope="col">Break In</th>
                            <th scope="col">Total Break Hours</th>
                            <th scope="col">Time Out</th>
                            <th scope="col">Overtime In</th>
                            <th scope="col">Overtime Out</th>
                            <th scope="col">Overtime Hours</th>
                            <th scope="col">Total Hours Rendered</th>
                            <th scope="col">Total Pay</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderUnvalidatedTimeogs()}
                    </tbody>
                </table>
            )
        }
    }

    renderUnvalidatedTimeogs(){
        if(this.state.unvalidatedTimelogs.length === 0){
            return(
                <tr>
                    <td colSpan='11'><center><i>No timelogs to show</i></center></td>
                </tr>
            )
        }
        return(
            this.state.unvalidatedTimelogs.map((timelog, index) => 
                <tr key={index}>
                    <td>{timelog.date}</td>
                    <td>{timelog.login}</td>
                    <td>{timelog.break_out}</td>
                    <td>{timelog.break_in}</td>
                    <td>{timelog.total_break_hours}</td>
                    <td>{timelog.logout}</td>
                    <td>{timelog.overtime_in}</td>
                    <td>{timelog.overtime_out}</td>
                    <td>{timelog.overtime}</td>
                    <td>{timelog.total_hours}</td>
                    <td>{timelog.total_pay}</td>
                </tr>
            )
        )
    }

    renderAllTimelogs(){
        if(this.state.allTimelogs.length === 0){
            return(
                <tr>
                    <td colSpan='11'><center><i>No timelogs to show</i></center></td>
                </tr>
            )
        }
        return(
            this.state.allTimelogs.map((timelog, index) => 
                <tr key={index}>
                    <td>{timelog.date}</td>
                    <td>{timelog.login}</td>
                    <td>{timelog.break_out}</td>
                    <td>{timelog.break_in}</td>
                    <td>{timelog.total_break_hours}</td>
                    <td>{timelog.logout}</td>
                    <td>{timelog.overtime_in}</td>
                    <td>{timelog.overtime_out}</td>
                    <td>{timelog.overtime}</td>
                    <td>{timelog.total_hours}</td>
                    <td>{timelog.total_pay}</td>
                </tr>
            )
        )
    }
}