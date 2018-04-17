import React, { Component } from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'

export default class ContractorTimelog extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            fetching: false,
            timelogs: [],
            tabLeftOpen: true,
            totalHours: 0,
            totalPay: 0.00,
            dateFrom: null,
            dateTo: null,
            searching: false,
            class: 'col-md-8'
        }
    }
    
    componentDidMount(){
        this.fetchData()
    }

    handleChangeEnd(date){
        if (this.state.startDate){
            if (date < this.state.startDate) { 
                $.notify("Invalid Date Range. Please check your entries.", { className: 'error', position: 'top center' } )  
                $("#to").val('');
            }
            this.setState({ endDate: date, fetching: true })
            $.ajax({
                url: `/api/timelogs/generate_timelogs.json?date_from=${moment(this.state.startDate).format('MM/DD/YYYY')}&date_to=${moment(date).format('MM/DD/YYYY')}`,
                method: 'GET',
                success: (data) => {
                    this.setState({
                        searching: true, timelogs: data.timelogs, totalHours: data.total_hours_rendered, totalPay: data.total_pay_for_the_week, fetching: false, dateFrom: data.from, dateTo: data.to
                    })
                }
            })
        }
        this.setState({ endDate: date })
    }

    handleChangeStart(date){
        if(this.state.endDate){
            if(date > this.state.endDate) { 
                $.notify("Invalid Date Range. Please check your entries.", { className: 'error', position: 'top center' } )
                $("#from").val('');
            }
            this.setState({ startDate: date, fetching: true })
            $.ajax({
                url: `/api/timelogs/generate_timelogs.json?date_from=${moment(date).format('MM/DD/YYYY')}&date_to=${moment(this.state.endDate).format('MM/DD/YYYY')}`,
                method: 'GET',
                success: (data) => {
                    this.setState({
                        searching: true, timelogs: data.timelogs, totalHours: data.total_hours_rendered, totalPay: data.total_pay_for_the_week, fetching: false, dateFrom: data.from, dateTo: data.to
                    })
                }
            })
        }
        this.setState({ startDate: date })
    }

    handleReset(){
        this.fetchData()
        this.setState({ searching: false, endDate: null, startDate: null })
    }

    render(){
        return( 
            <div className='panel-body'>
                <div className='row pb20'>
                    <div className='col-md-12'>
                        <div className="tab">
                            <button className={`tablinks${this.state.tabLeftOpen ? ' active' : ''}`} onClick={() => this.setState({ tabLeftOpen: true })}>All Timelogs</button>
                            <button className={`tablinks${this.state.tabLeftOpen ? '' : ' active'}`} onClick={() => this.setState({ tabLeftOpen: false })}>Timelogs by months</button>
                        </div>
                    </div>
                </div>
                <div className='pull-right'>         
                    <div className='row pb20'>  
                        <div className='row'>            
                            <div className='col-md-12'>                          
                                <div className='col-md-6'>
                                    <DatePicker  
                                        id='from'                                 
                                        className='form-control'
                                        selected={this.state.startDate}
                                        selectsStart
                                        startDate={this.state.startDate}
                                        endDate={this.state.endDate}
                                        onChange={this.handleChangeStart.bind(this)}
                                        placeholderText='Timelog From'
                                    />
                                </div>
                                <div className='col-md-6'>                               
                                    <DatePicker
                                        id='to'
                                        className='form-control'
                                        selected={this.state.endDate}
                                        selectsEnd
                                        startDate={this.state.startDate}
                                        endDate={this.state.endDate}
                                        onChange={this.handleChangeEnd.bind(this)}
                                        placeholderText='Timelog To'
                                    />                                      
                                </div>                                             
                            </div>
                        </div>
                        <div className='row pt10 mr15 ml15'>
                            {this.renderSearchButton()} 
                            {this.renderReset()}
                        </div>     
                    </div>                                                                                          
                </div>
                <div className='row pb20'>
                    <div className='col-md-12'>
                        <table id='timelog' className='table table-bordered table-striped table-dark'>
                            <thead>
                                <tr>
                                    <th className='row-header' scope="col">Date</th>
                                    <th className='row-header' scope="col">Time in</th>
                                    <th className='row-header' scope="col">Break Out</th>
                                    <th className='row-header' scope="col">Break In</th>
                                    <th className='row-header' scope="col">Total Break Hours</th>
                                    <th className='row-header' scope="col">Time Out</th>
                                    <th className='row-header' scope="col">Overtime In</th>
                                    <th className='row-header' scope="col">Overtime Out</th>
                                    <th className='row-header' scope="col">Overtime Hours</th>
                                    <th className='row-header' scope="col">Overtime Pay</th>
                                    <th className='row-header' scope="col">Total Hours Rendered</th>
                                    <th className='row-header' scope="col">Gross Pay</th>
                                    <th className='row-header' scope="col">Total Pay</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderTimelogs()}
                                {this.renderTotalHours()}
                                {this.renderTotalPay()}
                            </tbody>
                        </table>
                        {this.renderWarning()}
                    </div>
                </div>
            </div> 
        )
    }

    renderSearchButton(){
        if(this.state.searching && this.state.timelogs.length > 0){
            return(
                <div className={this.state.searching ? this.state.class : 'col-md-10 col-md-offset-1'}>  
                    <a disabled={this.state.timelogs.length === 0} target="_blank" href={`/api/timelogs/export_timesheet.xlsx?date_from=${moment(this.state.startDate).format('MM/DD/YYYY')}&date_to=${moment(this.state.endDate).format('MM/DD/YYYY')}`} className='btn btn-primary download'><i className="fas fa-arrow-alt-circle-down fa-lg pr1"></i>{this.renderLabel()}</a>
                </div>
            )
        }else{
            return(
                <div className={this.state.searching ? this.state.class : 'col-md-10 col-md-offset-1'}>  
                    <center><i>No Timelogs Found</i></center>
                </div>
            )
        }
    }

    renderReset(){
        if(this.state.searching){
            return(
                <div className='col-md-4'> 
                    <button onClick={this.handleReset.bind(this)} className="btn btn-primary reset">Reset</button> 
                </div>
            )
        }
    }

    renderLabel(){
        if(this.state.fetching){ return }
        if(this.state.timelogs.length === 0 ){
            return 'No timelogs found'
        }
        return `${this.state.dateFrom} - ${this.state.dateTo}`
    }
    renderTotalHours(){
        if(this.state.timelogs.length === 0 || this.state.fetching) { return }
        if(this.state.tabLeftOpen){
            return(
                <tr>
                    <td style={{ paddingRight: '10px', textAlign: 'right', fontSize: '13px', fontWeight: '900'}} colSpan='11'>Total Hours</td>
                    <td colSpan='2' style={{fontSize: '13px', fontWeight: '900'}} >{this.state.totalHours}</td>
                </tr>
            )
        }
    }

    renderTotalPay(){
        if(this.state.timelogs.length === 0 || this.state.fetching) { return }
        if(this.state.tabLeftOpen){
            return(
                <tr>
                    <td style={{ paddingRight: '10px', textAlign: 'right', fontSize: '13px', fontWeight: '900'}} colSpan='11'>Total Amount</td>
                    <td colSpan='2' style={{fontSize: '13px', fontWeight: '900'}} >{this.state.totalPay}</td>
                </tr>
            )
        }
    }

    renderWarning(){
        if(this.state.fetching){
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
                this.state.timelogs.map((timelog, index) => 
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
        else{
            return
        }
    }

    fetchData(){
        this.setState({ fetching: true })
        $.ajax({
            url: '/api/timelogs.json',
            method: 'GET',
            success: (data) => {
                this.setState({
                    timelogs: data.timelogs, fetching: false, totalHours: data.total_hours_rendered, totalPay: data.total_pay_for_the_week, dateFrom: data.from, dateTo: data.to
                })
            }
        })
    }
}