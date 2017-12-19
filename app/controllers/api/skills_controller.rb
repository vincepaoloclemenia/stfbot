class Api::SkillsController < Api::BaseController
    before_action :authenticate_user!
    def index
        @skills = current_user.skills.all
        @last_skill = current_user.skills.last.id
    end

    def create
        params[:skills].each do |skill|
            current_user.skills.create(name: skill['name'], literacy_level: skill['literacy_level'])
        end
        current_user.skills.where(id: params[:ids]).destroy_all
    end

    private

    def skill_params
        params.require(:skills).permit!
    end

end