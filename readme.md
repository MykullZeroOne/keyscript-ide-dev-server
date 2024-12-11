# Keyscript Development Server

## Description
This is a ***node.js*** server implementation designed as an alternative to Corelation's
provided Keyscript IDE. The server is completely standalone and has no installation
requirements beyond the dependencies specified in the package.json file. It also 
does not have any additional/external runtime dependencies, e.g. it does not rely
on Tomcat.

## Benefits
Why might you want to use this IDE rather than Corelation's?
1. You don't have to install or configure Tomcat.
2. You can run scripts against any valid Keystone instance (Test, Training, etc.) 
just by specifying the instance in the url.
3. You can bypass the IDE and run your code directly by specifying the script name
in the url. This makes it possible to launch your code in a Chrome or MS Edge debug session
directly from VS Code. You'll be able to set breakpoints, inspect variables, examine
the call stackstep, etc. from within VS Code rather than the browser's Dev Tools
panel.
4. The server utilizes Corelation's IDE implementation under the hood so all of those
features are still available. 

## Usage

***Note***: All examples below assume you are running the server on port ***3000***.

### Install node dependencies...

    npm install

### Configure Environment Values...

Rename .env-sample to .env. Assign values appropriate to your environment.

    PORT={any-available-local-port} 
    PROXY_ENDPOINT={your-keystone-ip-address-or-hostname}:8443
    SUPPORTED_INSTANCES={pipe-delimited-list-of-keystone-database-instances}

See .env-sample for example values    

### Build the project...

    npm run build

### Start the server...

    npm run server

### Access the IDE...

    http://localhost:3000/Test/KeyscriptIDE

    - or -

    http://localhost:3000/Some_Other_Instance/KeyscriptIDE

### Launch scripts directly...

Copy your script to the ./public/scripts folder of the project, then...

    http://localhost:3000/Test/my-script.js

    - or -

    http://localhost:3000/Some_Other_Instance/my-script.js
    