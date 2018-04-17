import React, { Component } from 'react'

export default class Timelog extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            allTimelogs: [],
            unvalidatedTimelogs: [],
            fetching: false,
            tabLeftOpen: true,
            toBeValidatedTimelogs: [],
            sending: false
        }
    }

    handleCheck(event){  
      if(event.target.checked){
          this.setState({ toBeValidatedTimelogs: [...this.state.toBeValidatedTimelogs, event.target.value] })
      }else{
        var timelogs = this.state.toBeValidatedTimelogs
        var index = timelogs.indexOf(event.target.value)
        timelogs.splice(index, 1)
        this.setState({ toBeValidatedTimelogs: timelogs })
      }
    }

    handleUpdateTimelogs(){
        this.setState({ sending: true })
        $.ajax({
            url: `/api/timelogs/validate_overtime_hours?id=${this.props.user.id}`,
            method: 'PUT',
            data: {
                timelogs: this.state.toBeValidatedTimelogs
            },
            success: (message) => {
                this.setState({ toBeValidatedTimelogs: [] })
                if(message){
                    $.notify(message, { className: 'error', position: 'top center' } );
                }else{
                    $.notify("Timelogs successfully updated", { className: 'success', position: 'top center' } );
                    this.fetchTimelogs()
                }
            }
        })
    }

    handleCheckAll(){

    }

    componentDidMount(){
        this.fetchTimelogs()
    }

    render(){
        return(
            <div className='panel-body'>
                <div className='row ml15 pb20'>
                    <div className='col-md-12'>
                        <div className="tab">
                            <button className={`tablinks${this.state.tabLeftOpen ? ' active' : ''}`} onClick={() => this.setState({ tabLeftOpen: true, toBeValidatedTimelogs: [] })}>All Timelogs</button>
                            <button className={`tablinks${this.state.tabLeftOpen ? '' : ' active'}`} onClick={() => this.setState({ tabLeftOpen: false, toBeValidatedTimelogs: [] })}>Timelogs w/ Unvalidated Overtime</button>
                        </div>
                    </div>
                </div>
                <div className='row pb20'>
                    <div className='col-md-12'>
                    {this.renderTimelogs()}
                    {this.renderSpinner()}
                    </div>
                </div>
            </div>
        )
    }

    renderSpinner(){
        if(this.state.fetching){
            return(
                <div className='row pb20 pt20'>
                    <center><i className="fa fa-spinner fa-spin fa-2x fa-fw with-color"></i></center>                
                </div>
            )
        }
        if(this.state.tabLeftOpen){
            if(this.state.allTimelogs.length === 0){
                return(
                    <div className='row pb20 pt20'>
                        <center><i className="fa fa-spinner fa-spin fa-2x fa-fw with-color"></i></center>                
                    </div>
                )
            }
        }else{
            if(this.state.unvalidatedTimelogs === 0){
                return(
                    <div className='row pb20 pt20'>
                        <center><i className="fa fa-spinner fa-spin fa-2x fa-fw with-color"></i></center>                
                    </div>
                )
            }
        }
    }

    renderUpdateButton(){
        if(this.state.toBeValidatedTimelogs.length === 0) { return }
        return(
            <div className='pull-right'>
                <div className='row'>
                    <div className='col-md-6'>
                        <button onClick={this.handleUpdateTimelogs.bind(this)} className='btn btn-primary update-timelogs'>Validate Overtime</button>
                    </div>
                    <div className='col-md-6'>
                        <button className='btn btn-primary modal-cancel'>Delete Selected</button>
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
                <div>
                    <table id='timesheet' className='table table-bordered table-striped table-dark'>
                        <thead>
                            <tr>
                                <th scope="col">Select All</th>
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
                                <th scope="col">Total Amount</th>                          
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderUnvalidatedTimelogs()}
                            {this.showTotalUnpaidOvertime()}
                        </tbody>
                    </table>
                    {this.renderUpdateButton()}
                </div>
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

    renderUnvalidatedTimelogs(){
        if(this.state.unvalidatedTimelogs.length === 0){ return }
        return(
            this.state.unvalidatedTimelogs.map((timelog, index) => 
                <tr className={timelog.what_day ? `weekend` : ''} key={index}>
                    <td><input type='checkbox' value={timelog.id} onChange={this.handleCheck.bind(this)} /></td>
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
                    <td>{timelog.total_adjustments}</td>
                </tr>
            )
        )
    }

    showTotalUnpaidOvertime(){
        if(this.state.unvalidatedTimelogs.length === 0){ return }
        return(
            <tr>
                <td style={{ textAlign: 'right', fontSize: '13px', fontWeight: '900'}} colSpan='10'>Total Payment</td>
                <td colSpan='2' style={{fontSize: '13px', fontWeight: '900'}}>{this.state.unpaidOvertime}</td>
            </tr>
        )
    }

    renderAllTimelogs(){
        if(this.state.allTimelogs.length === 0){ return }
        return(
            this.state.allTimelogs.map((timelog, index) => 
                <tr className={timelog.what_day ? `weekend` : ''} key={index}>
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

    fetchTimelogs(){
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
}