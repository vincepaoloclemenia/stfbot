var React = require("react")
var PropTypes = require("prop-types")

class WorkExperience extends React.Component{
    constructor(props){
        super(props)
        this.state = { userExperiences: [], fetching: false }
    }

    componentWillMount(){
        $.ajax({
            url: '/api/work_experiences.json',
            method: 'GET',
            dataType: 'JSON',
            success: (data) => {
                this.setState({
                    userExperiences: data.experiences
                })
            }
        })
    }

    render(){
        return(
            <div className="panel-body">
                <div className='panel-body'>
                    {this.state.userExperiences.map ((exp) => 
                        <div className='row pb20' key={exp.id}>
                            <div className='col-lg-5'>
                                <p>{exp.employment_from} - {exp.employment_to}</p>
                            </div>
                            <div className='col-lg-7'>
                                <p className='job-title'>{exp.job_title} at {exp.company_name}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

module.exports = WorkExperience