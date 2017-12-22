var React = require("react")
var PropTypes = require("prop-types")
import UserEdit from 'components/UserEdit.jsx'

export default class User extends React.Component{
    constructor(props){
        super(props)
        this.state = { userData: null, user: null, id: null, fullName: '', contact: '', email: '', edit: false, fetching: false, months: [], years: [], days: [], genders: [] }
    }

    componentDidMount(){
        this.setState({ fetching: true })
        $.ajax({
            url: '/api/users/user_profile.json',
            method: 'GET',
            dataType: 'JSON',
            success: (data) => {                
                this.setState({ 
                    id: data.id,
                    fullName: data.full_name,
                    contact: data.contact,
                    email: data.email,
                    country: data.country,
                    city: data.city,
                    state: data.state,
                    street: data.street,
                    avatar: data.avatar,
                    userData: data,
                    fetching: false
                })
            }
        })

        $.ajax({
            url: '/api/users/get_date.json',
            method: 'GET',
            dataType: 'JSON',
            success: (data) => {
                this.setState({ 
                    months: data.months,
                    years: data.years,
                    days: data.days,
                    genders: data.genders
                })
            }
        })
    }

    handleEdit(){
        this.setState({ edit: true, user: this.state.userData })
    }

    handleClose(){
        this.setState({ edit: false })
    }

    handleSave(){
        this.setState({ fetching: true, edit: false })
        $.ajax({
            url: '/api/users/user_profile.json',
            method: 'GET',
            dataType: 'JSON',
            success: (data) => {                
                this.setState({ 
                    id: data.id,
                    fullName: data.full_name,
                    contact: data.contact,
                    email: data.email,
                    country: data.country,
                    city: data.city,
                    state: data.state,
                    street: data.street,
                    avatar: data.avatar,
                    userData: data,
                    fetching: false
                })
            }
        })
    }

    render(){
        if(this.state.fetching){
            return(
                <div className='panel'>
                    <div className='panel-body mb25 mt25'>
                        <center><i className="fa fa-spinner fa-spin fa-2x fa-fw with-color"></i></center>
                    </div>
                </div>
            )
        }
        if(this.state.edit){
            return(
                <div className='panel'>
                    <UserEdit 
                        onCloseForm={this.handleClose.bind(this)} 
                        onSave={this.handleSave.bind(this)}
                        user={this.state.user} months={this.state.months} 
                        years={this.state.years} 
                        days={this.state.days}
                        genders={this.state.genders} 
                    />
                </div>
            )
        }
        return(
            <div className='panel'>
                <div className="panel-body mr20 mb25 mt25">
                    <div className="row ml20">
                        <div className="col-lg-4">
                            <span dangerouslySetInnerHTML={{ __html: this.state.avatar}} />
                        </div>
                        <div className="col-lg-8">
                            <p className='user-name'>{this.state.fullName}</p> 
                            <ul className='user-credentials'>
                                <li className='user-location'><i className="fa fa-map-marker fa-lg color-green stay-left" aria-hidden="true"></i><span className='gap1'>{this.state.city}, {this.state.state}, {this.state.country}</span></li>
                                <li className='user-email'><i className="fa fa-address-card-o fa-lg with-color stay-left" aria-hidden="true"></i><span className='gap1'>{this.state.email}</span></li>
                                <li className='user-contact'><i className="fa fa-envelope-o fa-lg with-color stay-left" aria-hidden="true"></i><span className='gap1'>{this.renderContact(this.state.contact)}</span></li>
                            </ul>                              
                        </div>
                    </div>
                </div>
                <button type='button' onClick={this.handleEdit.bind(this)} className='btn btn-primary full-width'>Edit Information</button>
            </div>
        )
    }

    renderContact(contact){
        if(contact){
            return(
                contact
            )
        }
        return(
            <i className='null'>No contact yet</i> 
        )
    }
}