module CompanyHelper
    def avatar_for_company(company, options = { size: 40 })
        size = options[:size]
        style = options[:style]
        if company.avatar?
            if size <= 40
                image_tag company.avatar.url(:thumb), width: size, height: size, alt: company.name, class: 'avatar-image', style: style
            else
                image_tag company.avatar.url, width: size, height: size, alt: company.name, class: 'avatar-image', style: style
            end
        else
            image_tag company.avatar.url, width: size, height: size, alt: 'avatar image', class: 'avatar-image', style: style
        end
    end
end