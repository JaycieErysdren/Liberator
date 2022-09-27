module.exports = {
	item: function(id, parent, text, icon, bStartOpen) {
		return { "id": id, "parent": parent, "text": text, "icon": icon, "state": { "opened": bStartOpen } }
	}
}
