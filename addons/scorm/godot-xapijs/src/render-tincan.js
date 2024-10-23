const fs = require('fs');
const path = require('path');
const pug = require('pug');

// Paths
const projectPath = path.resolve(__dirname, '../../../../project.godot');
const templatePath = path.resolve(__dirname, '../../scorm_templates/tincan.pug');
const outputPath = path.resolve(__dirname, '../../../../export/web/tincan.xml');

// Read the project.godot file
const projectContent = fs.readFileSync(projectPath, 'utf-8');

// Extract the application config name
const configNameMatch = projectContent.match(/config\/name="([^"]+)"/);
if (!configNameMatch) {
  console.error('Application config name not found in project.godot');
  process.exit(1);
}
const activityName = configNameMatch[1];

// Extract the application description
let configDescMatch = projectContent.match(/config\/description="([^"]+)"/);
if (!configDescMatch) {
  console.error('Application config description not found in project.godot');
  configDescMatch = ['Description of the activity'];
}
const activityDesc = configDescMatch[1];

// Render the Pug template
const renderedxml = pug.renderFile(templatePath, {
  activityId: 'http://edu.com/activities/course/'+activityName.toLowerCase().replaceAll(" ", "-") ,
  activityName: activityName,
  activityDesc: activityDesc
});

// Ensure the output directory exists
fs.mkdirSync(path.dirname(outputPath), { recursive: true });

// Save the rendered output
fs.writeFileSync(outputPath, renderedxml);

console.log(`Rendered output saved to ${outputPath}`);