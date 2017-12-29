json.id  current_user.id
json.first_name current_user.first_name
json.last_name current_user.last_name
json.full_name current_user.full_name
json.email current_user.email
json.avatar current_user.avatar
json.contact current_user.contact
json.country current_user.address.present? ? current_user.address.country : nil
json.state current_user.address.present? ? current_user.address.state : nil
json.city current_user.address.present? ? current_user.address.city : nil
json.street current_user.address.present? ? current_user.address.street : nil
json.birthdate current_user.birthdate.present? ? current_user.birthdate.strftime('%B %d %Y') : nil
json.gender current_user.gender

