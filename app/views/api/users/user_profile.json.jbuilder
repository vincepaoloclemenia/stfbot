json.id  current_user.id
json.first_name current_user.first_name
json.last_name current_user.last_name
json.full_name current_user.full_name
json.email current_user.email
json.avatar avatar_for(current_user, size: 100)
json.contact current_user.contact
json.country current_user.address.country
json.state current_user.address.state
json.city current_user.address.city
json.street current_user.address.street
json.birthdate current_user.birthdate.strftime('%B %d %Y')
json.gender current_user.gender

