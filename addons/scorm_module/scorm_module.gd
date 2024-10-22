extends EditorPlugin

var scorm_api = null

func _enter_tree():
    # Initialize SCORM when the scene starts
    if Engine.has_singleton("SCORMModule"):
        return
    Engine.register_singleton("SCORMModule", self)
    # Connect to the scene tree's "ready" signal
    get_tree().root.connect("ready", _on_scene_ready)

func _exit_tree():
    Engine.unregister_singleton("SCORMModule")
    get_tree().root.disconnect("ready", _on_scene_ready)

func _on_scene_ready():
    # Initialize SCORM API via JavaScript
    if OS.get_name() == "WEB":
        JavaScriptBridge.eval("console.log('Scene Ready');")
        scorm_initialize()

# SCORM Functions
func scorm_initialize():
    if OS.get_name() == "WEB":
        JavaScriptBridge.eval("window.API.initialize();")

func scorm_terminate():
    if OS.get_name() == "WEB":
        JavaScriptBridge.eval("unloadHandler();")

func scorm_set_value(element: String, value: String):
    if OS.get_name() == "WEB":
        var js_code = "window.API.setValue('%s', '%s');" % [element, value]
        JavaScriptBridge.eval(js_code)

func scorm_get_value(element: String) -> String:
    if OS.get_name() == "WEB":
        var result = JavaScriptBridge.eval("window.API.getValue('%s');" % element)
        return result
    return ""

func scorm_commit():
    if OS.get_name() == "WEB":
        JavaScriptBridge.eval("window.API.commit();")

func scorm_get_last_error() -> int:
    if OS.get_name() == "WEB":
        var result = JavaScriptBridge.eval("window.API.getLastError();")
        return int(result)
    return -1
