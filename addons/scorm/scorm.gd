extends Node


func _enter_tree():
	if Engine.has_singleton("SCORM"):
		return
	Engine.register_singleton("SCORM", self)
	JavaScriptBridge.eval("console.log('SCORM entered tree');")
	get_tree().root.connect("ready", _on_scene_ready)


func _exit_tree():
	Engine.unregister_singleton("SCORM")
	get_tree().root.disconnect("ready", _on_scene_ready)


func _on_scene_ready():
	JavaScriptBridge.eval("console.log('Scene Ready');")
	var osname = OS.get_name()
	JavaScriptBridge.eval("console.log('Platform: "+osname+"');" )
	if OS.get_name() == "Web":
		JavaScriptBridge.eval("console.log('SCORM initializing');")
		self.scorm_initialize()


# SCORM Functions
func scorm_initialize():
	JavaScriptBridge.eval("API.initialize();")
	JavaScriptBridge.eval("console.log('SCORM initialized');")	


func scorm_terminate():
	if OS.get_name() == "Web":
		JavaScriptBridge.eval("unloadHandler();")


func scorm_set_value(element: String, value: String):
	if OS.get_name() == "Web":
		var js_code = "API.setValue('%s', '%s');" % [element, value]
		JavaScriptBridge.eval(js_code)


func scorm_get_value(element: String) -> String:
	if OS.get_name() == "Web":
		var result = JavaScriptBridge.eval("API.getValue('%s');" % element)
		return result
	return ""


func scorm_commit():
	if OS.get_name() == "Web":
		JavaScriptBridge.eval("API.commit();")


func scorm_get_last_error() -> int:
	if OS.get_name() == "Web":
		var result = JavaScriptBridge.eval("API.getLastError();")
		return int(result)
	return -1
