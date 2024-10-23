# SCORM Integration Plugin for Godot

This plugin integrates SCORM (Sharable Content Object Reference Model) functionality into your Godot projects, allowing your games or applications to communicate with Learning Management Systems (LMS) via xAPI (Experience API), also known as Tin Can API.

## Features

- **xAPI Communication**: Send xAPI statements from your Godot project to an LMS.
- **SCORM Initialization and Termination**: Manage SCORM sessions directly within Godot.
- **tincan.xml Generation**: Automatically generate the `tincan.xml` file required for SCORM packages.
- **JavaScript Bindings**: Utilize JavaScript code for advanced SCORM interactions.
- **Export Packaging**: Prepare your project for deployment as a SCORM-compliant package.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Building the xAPI JavaScript Bundle](#building-the-xapi-javascript-bundle)
- [Exporting the Godot Project with Custom HTML Template](#exporting-the-godot-project-with-custom-html-template)
- [Preparing the SCORM Package](#preparing-the-scorm-package)
- [Configuration](#configuration)
- [Requirements](#requirements)
- [License](#license)
- [Author](#author)

## Installation

1. **Copy the Plugin**:

   Copy the `addons/scorm` directory into your Godot project's `addons` directory.

2. **Enable the Plugin**:

   In the Godot Editor, navigate to **Project > Project Settings > Plugins** and activate the **SCORM** plugin.

## Usage

### SCORM Singleton

Once enabled, the plugin registers a singleton named `SCORM` accessible throughout your project.

### Add SCORM to Autoload

To ensure the `SCORM` singleton is globally available and initializes correctly, add it to your project's Autoload settings:

1. **Navigate to Autoload Settings**:

   In the Godot Editor, go to **Project > Project Settings > Autoload**.

2. **Add the SCORM Script**:

   - Click the **Add** button.
   - Set the **Path** to `res://addons/scorm/scorm.gd`.
   - Set the **Node Name** to `SCORM`.
   - Ensure the **Singleton** checkbox is checked.

3. **Save the Settings**:

   Click **Add** to confirm and save the autoload settings.

### GDScript Methods

You can use the following methods provided by the plugin:

- **Initialize SCORM Session**:

  ```gdscript
  SCORM.scorm_initialize()
  ```

- **Terminate SCORM Session**:

  ```gdscript
  SCORM.scorm_terminate()
  ```

- **Set SCORM Value**:

  ```gdscript
  SCORM.scorm_set_value(element: String, value: String)
  ```

- **Get SCORM Value**:

  ```gdscript
  var value = SCORM.scorm_get_value(element: String)
  ```

- **Commit SCORM Data**:

  ```gdscript
  SCORM.scorm_commit()
  ```

### Example

```gdscript
func _ready():
    SCORM.scorm_initialize()
    SCORM.scorm_set_value("cmi.score.raw", "85")
    SCORM.scorm_commit()
```

## Building the xAPI JavaScript Bundle

The plugin includes a JavaScript bundle that handles xAPI communication.

1. **Navigate to the Directory**:

   ```bash
   cd addons/scorm/godot-xapijs
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Build the Bundle**:

   ```bash
   npm run build
   ```

   The compiled `bundle.js` and updated `html_shell.html` will be located in the `dist` directory.

## Exporting the Godot Project with Custom HTML Template

After building the JavaScript bundle, you need to export your Godot project using the custom HTML template generated during the build process.

1. **Set Custom HTML Template**:

   In the Godot Editor:

   - Go to **Project > Export...**
   - Select the **Web (HTML5)** export preset or create one if it doesn't exist.
   - In the **Export** settings, find the **Custom HTML Shell** option.
   - Click on the folder icon next to **Custom HTML Shell** and navigate to the `addons/scorm/godot-xapijs/dist/html_shell.html` file.
     - If you can't find `html_shell.html`, ensure you have completed the **Building the xAPI JavaScript Bundle** step.

2. **Export the Project**:

   - Set the **Export Path** to your desired output directory, e.g., `export/web/index.html`.
   - Click **Export Project** to export your project using the custom HTML template.

3. **Verify the Export**:

   - The exported project should now include the custom `index.html` that integrates the SCORM and xAPI functionality.
   - Ensure that the exported files are located in the `export/web` directory (or the directory you specified).

## Preparing the SCORM Package

To package your project as a SCORM-compliant ZIP file:

1. **Render `tincan.xml` and Package**:

   ```bash
   npm run prepare-scorm
   ```

   This script performs the following:

   - Renders the `tincan.xml` file using your project's `project.godot` configuration.
   - Zips the contents of `export/web` into `export/scorm.zip`.

2. **Result**:

   The SCORM package `scorm.zip` will be ready for deployment to an LMS.

## Configuration

Ensure your `project.godot` file contains the following fields:

- **Application Name**:

  ```ini
  config/name="Your Application Name"
  ```

- **Application Description** (optional):

  ```ini
  config/description="A brief description of your application."
  ```

These fields are used to generate the `tincan.xml` file required for SCORM packaging.

## Requirements

- **Godot Engine**: Compatible with Godot 3.x or higher.
- **Node.js and npm**: For building the JavaScript bundle and preparing the SCORM package.
- **Web Export Template**: Ensure you have the HTML5 export templates installed for Godot.

## License

This project is licensed under the [MIT License](LICENSE).

## Author

- **George Gabra**
- Email: [george.gabra.jr@outlook.com](mailto:george.gabra.jr@outlook.com)

Feel free to contact me if you have any questions or need assistance with the plugin.

---

*Happy developing! Integrate SCORM into your Godot projects seamlessly with this plugin.*
