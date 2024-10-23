extends Node


func _enter_tree():
	JavaScriptBridge.eval("console.log('Platform: "+OS.get_name()+"');" )
	JavaScriptBridge.eval("console.log('*SCORM*\t Registering ...');")
	if Engine.has_singleton("SCORM"):
		return
	Engine.register_singleton("SCORM", self)
	JavaScriptBridge.eval("console.log('*SCORM*\t Registered !');")
	get_tree().root.connect("ready", _on_scene_ready)


func _exit_tree():
	JavaScriptBridge.eval("console.log('*SCORM*\t Unregistering ...');")
	Engine.unregister_singleton("SCORM")
	get_tree().root.disconnect("ready", _on_scene_ready)
	if OS.get_name() == "Web":
		self.scorm_terminate()
	JavaScriptBridge.eval("console.log('*SCORM*\t Unregistered !');")	


func _on_scene_ready():
	JavaScriptBridge.eval("console.log('*SCORM*\t Scene Ready !');")
	if OS.get_name() == "Web":
		self.scorm_initialize()


# SCORM Functions
func scorm_initialize():
	JavaScriptBridge.eval("console.log('*SCORM*\t Initializing ...');")
	JavaScriptBridge.eval("console.log('*SCORM*\t Initialized !');")


func scorm_terminate():
	JavaScriptBridge.eval("console.log('*SCORM*\t Terminating ...');")
	JavaScriptBridge.eval("console.log('*SCORM*\t Terminated !');")


func scorm_set_value(element: String, value: String):
	if OS.get_name() == "Web":
		var msg = "Set Value: ('%s', '%s')" % [element, value]
		JavaScriptBridge.eval("console.log('*SCORM*\t" + msg + "');")


func scorm_get_value(element: String) -> String:
	if OS.get_name() == "Web":
		var msg = "Get Value: ('%s')" % [element]
		var result = JavaScriptBridge.eval("console.log('*SCORM*\t" + msg + "');")
		return result
	return ""


func scorm_commit():
	if OS.get_name() == "Web":
		JavaScriptBridge.eval("console.log('*SCORM*\t Commit');")

