extends Control


func _ready():
	pass


func _process(delta):
	pass


func win_game():
	SCORM.scorm_initialize()
	var score = self.get_node("TextEdit").text
	SCORM.scorm_set_value("score", score)
	var res = SCORM.scorm_get_value("score")
	print(res)
	SCORM.scorm_commit()
	get_tree().quit()


func _on_button_pressed():
	win_game()
