import { program } from 'commander';
import fs from 'fs';
import readline from 'readline';

// Read stub files
const modelStub = fs.readFileSync('./src/console/stubs/model.stub', 'utf-8');
const controllerStub = fs.readFileSync('./src/console/stubs/controller.stub', 'utf-8');
const serviceStub = fs.readFileSync('./src/console/stubs/service.stub', 'utf-8');
const routesStub = fs.readFileSync('./src/console/stubs/routes.stub', 'utf-8');
const requestStub = fs.readFileSync('./src/console/stubs/request.stub', 'utf-8');

const replacePlaceholders = (template, placeholders) => {
  let modifiedTemplate = template;
  for (const [placeholder, value] of Object.entries(placeholders)) {
    const regex = new RegExp(`{{${placeholder}}}`, 'g');
    modifiedTemplate = modifiedTemplate.replace(regex, value);
  }
  return modifiedTemplate;
};

program
  .option('-m, --model <modelName>', 'Model name')
  .parse(process.argv);

const { model } = program;

if (!model) {
  // If model name is not provided as a command-line argument, prompt the user
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question('Enter model name: ', (modelName) => {
    rl.close();
    if (modelName && modelName.trim()) {
      const fields = {}; 
      generateFiles(modelName.trim(), fields);
    } else {
      console.error('Model name is required');
      process.exit(1);
    }
  });
} else {
  const fields = {}; 
  generateFiles(modelName.trim(), fields);
}

const generateFiles = (modelName, fields) => {
  if (!modelName) {
    console.error('Model name is required');
    process.exit(1);
  }

  // Generate model file
  generateModelFile(modelName, fields);

  // Generate controller file
  generateControllerFile(modelName);

  // Generate service file
  generateServiceFile(modelName);

  // Generate routes file
  generateRoutesFile(modelName);

  // Generate request file
  generateRequestFile(modelName);
};

const generateModelFile = (modelName) => {
  // Replace placeholders with actual model name
  const modelTemplate = modelStub.replace(/{{modelName}}/g, modelName);

  // Write the model template to a file
  fs.writeFileSync(`./src/models/${modelName}.js`, modelTemplate);
  console.log(`Model file for ${modelName} created successfully`);
};

const generateControllerFile = (modelName) => {
  // Replace placeholders with actual model name and its lowercase version
  const controllerTemplate = controllerStub
      .replace(/{{modelName}}/g, modelName)
      .replace(/{{pluralModelName}}/g, modelName + 's')
      .replace(/{{modelNameLowerCase}}/g, modelName.toLowerCase());

  // Write the controller template to a file
  fs.writeFileSync(`./src/http/controllers/${modelName}Controller.js`, controllerTemplate);
  console.log(`Controller file for ${modelName} created successfully`);
};

const generateServiceFile = (modelName) => {
  // Replace placeholders with actual model name and its lowercase version
  const serviceTemplate = serviceStub
      .replace(/{{modelName}}/g, modelName)
      .replace(/{{pluralModelName}}/g, modelName + 's')
      .replace(/{{modelNameLowerCase}}/g, modelName.toLowerCase());

  // Write the service template to a file
  fs.writeFileSync(`./src/http/services/${modelName}Service.js`, serviceTemplate);
  console.log(`Service file for ${modelName} created successfully`);
};

const generateRoutesFile = (modelName) => {
  // Replace placeholders with actual model name and its lowercase version
  const routesTemplate = routesStub
      .replace(/{{modelName}}/g, modelName)
      .replace(/{{pluralModelName}}/g, modelName + 's')
      .replace(/{{modelNameLowerCase}}/g, modelName.toLowerCase());

  // Write the routes template to a file
  fs.writeFileSync(`./src/routes/${modelName}.js`, routesTemplate);
  console.log(`Routes file for ${modelName} created successfully`);
};

const generateRequestFile = (modelName) => {
  // Replace placeholders with actual model name and its lowercase version
  const requestTemplate = requestStub
      .replace(/{{modelName}}/g, modelName)
      .replace(/{{pluralModelName}}/g, modelName + 's')
      .replace(/{{modelNameLowerCase}}/g, modelName.toLowerCase());

  // Write the request template to a file
  fs.writeFileSync(`./src/http/requests/${modelName.toLowerCase()}Request.js`, requestTemplate);
  console.log(`Request file for ${modelName} created successfully`);
};
