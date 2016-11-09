json.vip_users @vip_users do |budget|
  json.id vip_user.id
  json.first_name vip_user.first_name
  json.last_name vip_user.last_name
  json.phone_number vip_user.phone_number
  json.college vip_user.college
  json.party vip_user.party
end