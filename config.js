System.config({
  "paths": {
    "*": "*.js",
    "github:*": "jspm_packages/github/*.js",
    "npm:*": "jspm_packages/npm/*.js"
  }
});

System.config({
  "map": {
    "github:components/jquery": "github:components/jquery@^2.1.1"
  }
});

System.config({
  "versions": {
    "github:components/jquery": "2.1.1"
  }
});

