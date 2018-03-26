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
                    unvalidatedTimelogs: data.unvalidated_timelogs,
                    unpaidOvertime: data.total_unpaid_overtime,
                    totalHours: data.total_hours_rendered,
                    totalPay: data.total_pay_for_the_week
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
                <table id='timelog' className='table table-bordered table-striped table-dark'>
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
                            <th scope="col">Overtime Pay</th>
                            <th scope="col">Total Hours Rendered</th>
                            <th scope="col">Gross Pay</th>
                            <th scope="col">Total Pay</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderAllTimelogs()}
                        {this.renderTotalHours()}
                        {this.renderTotalPay()}
                    </tbody>
                </table>
            )
        }else{
            return(
                <table id='timelog' className='table table-bordered table-striped table-dark'>
                    <thead>
                        <tr>
                            <th scope="col">Date</th>
                            <th scope="col">Time in</th>                           
                            <th scope="col">Time Out</th>
                            <th scope="col">Overtime In</th>
                            <th scope="col">Overtime Out</th>
                            <th scope="col">Total Hours Rendered</th>
                            <th scope="col">Overtime Hours</th>
                            <th scope="col">Hours to Offset</th>
                            <th scope="col">Adjustments</th>
                            <th scope="col">Overtime Pay</th>                           
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderUnvalidatedTimeogs()}
                        {this.showTotalUnpaidOvertime()}
                    </tbody>
                </table>
            )
        }
    }

    renderTotalHours(){
        if(this.state.allTimelogs.length === 0) { return }
        return(
            <tr>
                <td style={{ textAlign: 'right', fontSize: '13px', fontWeight: '900'}} colSpan='11'>Total Hours</td>
                <td colSpan='2' style={{fontSize: '13px', fontWeight: '900'}} >{this.state.totalHours}</td>
            </tr>
        )
    }

    renderTotalPay(){
        if(this.state.allTimelogs.length === 0) { return }
        return(
            <tr>
                <td style={{ textAlign: 'right', fontSize: '13px', fontWeight: '900'}} colSpan='11'>Total Amount</td>
                <td colSpan='2' style={{fontSize: '13px', fontWeight: '900'}} >{this.state.totalPay}</td>
            </tr>
        )
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
                    <td className='timelog-date'>{timelog.date}</td>
                    <td>{timelog.login}</td>
                    <td>{timelog.logout}</td>
                    <td>{timelog.overtime_in}</td>
                    <td>{timelog.overtime_out}</td>
                    <td>{timelog.total_hours}</td>
                    <td>{timelog.total_overtime_hours}</td>
                    <td>{timelog.offset}</td>
                    <td>{timelog.adjustments}</td>
                    <td>{timelog.unpaid_overtime}</td>
                </tr>
            )
        )
    }

    showTotalUnpaidOvertime(){
        if(this.state.unvalidatedTimelogs.length === 0){ return }
        return(
            <tr>
                <td style={{ textAlign: 'right', fontSize: '13px', fontWeight: '900'}} colSpan='8'>Total Payment</td>
                <td colSpan='2' style={{fontSize: '13px', fontWeight: '900'}}>{this.state.unpaidOvertime}</td>
            </tr>
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
        )
    }
}