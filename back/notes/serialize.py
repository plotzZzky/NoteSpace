
def serialize_note(item):
    note_id = item.id
    title = item.title
    text = item.text
    date = item.date
    color = item.color
    item_dict = {'id': note_id, 'title': title, 'text': text, 'date': date, "color": color}
    print(item_dict)
    return item_dict
