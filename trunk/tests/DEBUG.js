function DEBUG(id,s) {
	console.log("[" + id + "] " + s);
	function setText(cell, text) {
		cell["textContent" in cell ? "textContent" : "innerText"] = text;
	}
	while (results.rows.length <= id) {
		var row = results.insertRow(-1);
		setText(row.insertCell(-1), results.rows.length);
		row.insertCell(-1);
	}
	setText(results.rows[id].cells[1], s);
}
