class Api::SkillsController < Api::BaseController
    before_action :authenticate_user!
    def index
        respond_with current_user.skills.all
    end

    def create
        current_user.skills.create(skill_params)
    end

    def destroy
        respond_with current_user.skills.destroy(params[:id])
    end

    def update 
        skill = current_user.skills.find(params['id'])
        skill.update_attributes(skill_params)
        respond_with skill, json: skill
    end

    private

    def skill_params
        params.require(:skill).permit(:name, :literacy_level)
    end

end