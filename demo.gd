extends Control


func _ready():
	pass


func _process(delta):
	pass


func win_game():
	SCORM.scorm_initialize()
	var score = self.get_node("TextEdit").text
	if OS.get_name() == "Web":
		SCORM.scorm_set_value("score", "10")
		SCORM.scorm_commit()
		SCORM.scorm_terminate()
	get_tree().quit()


func _on_button_pressed():
	win_game()
