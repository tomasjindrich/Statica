// Základní moduly pro můj framework Statica
var appRoot = require('app-root-path');    
var { settings, path, conf, site, page } = require('statica/core/settings.js');
var { test, root } =  require('statica/tools/tools.js');


console.log(test())
console.log(root())
console.log(site('url'))
console.log(path('dist',true))

// console.log(site('og_title'))
console.log(conf('host_prod'))
// console.log(conf('host'))
console.log( path('dist',true) + '/**/*.' + conf('page_file_ext') )

      
  

