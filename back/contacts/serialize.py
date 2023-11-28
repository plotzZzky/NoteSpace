def serialize_contact(item):
    contact_id = item.id
    firstname = item.firstname
    lastname = item.lastname
    telephone = item.telephone
    email = item.email
    social = item.social
    color = item.color
    item_dict = {
        'id': contact_id, 'firstname': firstname, 'lastname': lastname, 'telephone': telephone,
        'email': email, 'social': social, 'color': color,
    }
    return item_dict