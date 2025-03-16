const chai = require('chai');
global.expect = chai.expect;

const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');
const babel = require('@babel/core');

// Load HTML content
const html = fs.readFileSync(path.resolve(__dirname, '..', 'index.html'), 'utf-8');

// Transform JavaScript using Babel
const { code: transformedScript } = babel.transformFileSync(
  path.resolve(__dirname, '..', 'src/index.js'),
  { presets: ['@babel/preset-env'] }
);

// Initialize JSDOM
const dom = new JSDOM(html, {
  runScripts: "dangerously",
  resources: "usable"
});

// Inject transformed JavaScript into JSDOM
const scriptElement = dom.window.document.createElement("script");
scriptElement.textContent = transformedScript;
dom.window.document.body.appendChild(scriptElement);

// Expose JSDOM globals
global.window = dom.window;
global.document = dom.window.document;
global.navigator = dom.window.navigator;
global.HTMLElement = dom.window.HTMLElement;
global.Node = dom.window.Node;
global.Text = dom.window.Text;
global.XMLHttpRequest = dom.window.XMLHttpRequest;

// Test suite for form submission
describe('Handling form submission', () => {
  let form;
  let formInput;
  let taskList;

  before(() => {
    global.document = dom.window.document;
    global.window = dom.window;
  
    // Manually execute the script to attach event listeners
    require('../src/index.js');  // Adjust the path if necessary
  
    // Manually trigger DOMContentLoaded
    const event = new dom.window.document.defaultView.Event('DOMContentLoaded', { bubbles: true, cancelable: true });
    document.dispatchEvent(event);
  
    form = document.querySelector('#create-task-form');
    formInput = document.querySelector('#new-task-description');
    taskList = document.querySelector('#tasks');
  });
  

  it('should add an event to the form and add input to webpage', (done) => {
    formInput.value = 'Wash the dishes';
  
    // Dispatch submit event
    const event = new dom.window.document.defaultView.Event('submit', { bubbles: true, cancelable: true });
    form.dispatchEvent(event);
  
    // Wait for DOM update before asserting
    setTimeout(() => {
      console.log('Task List:', taskList.textContent);  // Debugging
      expect(taskList.textContent).to.include('Wash the dishes');
      done();
    }, 50); // Increase timeout to ensure DOM updates
  });
  
});
