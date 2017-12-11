var React = require("react")
var PropTypes = require("prop-types")

class EducationBackground extends React.Component{
    constructor(props){
        super(props)
        this.state = { userEducations: [] }
    }

    componentWillMount(){
        $.ajax({
            url: '/api/educations.json',
            method: 'GET',
            dataType: 'JSON',
            success: (data)=>{
                this.setState({ userEducations: data.educations })
            }
        })
        //$.getJSON('/api/educations.json', (response) => { this.setState({ userEducations: response }) });
    }

    render(){
        return(
            <div className="panel-body">
            {this.state.userEducations.map ((educ) => 
                <div className='row ml15' key={educ.id}>
                    <div class='col-lg-offset-1 col-md-offset-1 col-sm-offset-1 col-xs-offset-1 col-lg-1 col-md-1 col-sm-1 col-xs-1'>
                        <i className="fa fa-university fa-2x" aria-hidden="true"></i>
                    </div>
                    <div className='col-lg-10 col-md-10 col-sm-10 col-xs-10'>
                        <p>{educ.education_attainment} {educ.graduate ? 'Graduate' : 'Undergraduate'}{educ.course === null ? '':<b>{` ${educ.course}`}</b> }</p>
                        <p>{educ.school_name} ( {educ.attend_from} - {educ.attend_to} )</p>
                    </div>                   
                </div>
            )}
                
            </div>
        )
    }
}

module.exports = EducationBackground