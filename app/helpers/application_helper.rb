module ApplicationHelper

    def which_link?(controller_name)
        controller.controller_name == controller_name ? 'active-link' : ''
    end

    def is_your_company?(id)
        if id.present?
            current_user.company == Company.friendly.find(params[:id]) ? 'active-link' : ''
        else
            return ''
        end
    end

    def your_page?(name, action)
        controller.controller_name == name && controller.action_name == action ? 'active-link' : ''
    end

    def link_to_add_fields(name, f, association)
        new_object = f.object.send(association).klass.new
        id = new_object.object_id
        fields = f.fields_for(association, new_object, child_index: id) do |builder|
          render(association.to_s.singularize + "_fields", f: builder)
        end
        link_to(name, '#', class: "btn btn-primary add_fields", data: {id: id, fields: fields.gsub("\n", "")} )
    end
    
    def current_company? (company)
        current_user.company.id == company.id
    end

    def to_peso(num)
		num = 0 if num == 0 || num.nil?
		number_to_currency(num, unit: "₱ ")
	end
end
