def serialize_website(item):
    site_id = item.id
    title = item.title
    url = item.url
    color = item.color
    item_dict = {'id': site_id, 'title': title, 'url': url, 'color': color}
    return item_dict

