def parse_pic(filepath):
	pic = SlavedriverPicQuake.from_file(filepath)
	if pic:
		name = f"{self.current_file_tuple[0]}{self.current_file_tuple[1]}"
		# tell user it's loaded
		self.send_message(message="Found: SlaveDriver Bitmap")
		# fill out information
		self.add_file_info(message=f"File Name: {name}")
		self.add_file_info(message="File Type: SlaveDriver Bitmap")
		self.add_file_info(message="")
		self.add_file_info(message=f"Resolution: {self.pic.width}x{self.pic.height}")
		# add action buttons
		self.add_action_button(text="Convert to PNG", command=self.pic_convert_png)
	else:
		clear_slate(console_message=text_error_unknownext, action_message=text_action_none, bClearFiles=False)