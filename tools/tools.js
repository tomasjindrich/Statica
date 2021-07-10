const appRoot = require('app-root-path');
var { settings, path, conf, site, page } = require(appRoot + '/modules/core/settings.js');

// Test
function test () {
  return 'Hello traveler! Answer is 42.'
}

// Project Dir
function root (root = appRoot) {
  return root ? root : null;
}

// Framework Path
function isDev () {
  return process.env.NODE_ENV == "development" ? true : false
}

// If is Val Function Then return True
function isFunc (val) {
  return (typeof val === 'function') ? true : false
}

function resolveNiceUrls () {
  // ignoruj config.nice_urls pokud...
  // je host_dev prázdný a env je development
  if (!conf('host_dev') && isDev()) return false;
  else return conf('nice_urls');
}

// Skládá cestu/url ke stránkám a souborům
function pathAssemble( path_before, base_before, base, base_after, path_after ) {
  // path_before + [ base_before + BASE + base_after ] + path_after
  var path = "";
  if (path_before) path += path_before; // https://www.tomasjindrich.cz/wp-content/plugins/wpt/
  if (base_before) path += base_before; // prefix-
  if (base)        path += base;        // nazev-souboru
  if (base_after)  path += base_after;  // .html
  if (path_after)  path += path_after;  // ?v3.2
  //- return path;
  return path;
};

// Generuje url ke stránkám/odkazům
function getPermalink(base_input) {

  // path_before + [ base_before + BASE + base_after ] + path_after
  var path_before = conf('host');
  var base_before = false;
  var base = base_input;
  var base_after = resolveNiceUrls(conf('nice_urls')) ? '/' : conf('page_link_ext');
  var path_after = null;

  return pathAssemble( path_before, base_before, base, base_after, path_after );
}

// generuje cestu/url k souborům (img, css, js atd...)
function getAttachedFile(base_input, version) {
  // path_before + [ base_before + BASE + base_after ] + path_after
  var path_before = conf('host');
  var base_before = "";
  var base = base_input;
  var base_after = "";
  var path_after = version;

  if (conf('file_path_before')) {
    path_before += conf('file_path_before'); 
  };

  return pathAssemble( path_before, base_before, base, base_after, path_after );
};


module.exports = {
  test,
  root,
  isDev,
  isFunc,
  getPermalink,
  getAttachedFile
}













  
//   
// };

// // generuje cestu/url k souborům (img, css, js atd...)
// function get_attached_file(base_input, version) {
//   // path_before + [ base_before + BASE + base_after ] + path_after
//   var path_before = conf('host');
//   var base_before = "";
//   var base = base_input;
//   var base_after = "";
//   var path_after = version;

//   if (conf('file_path_before')) {
//     path_before += conf('file_path_before'); 
//   };

//   return path_assemble( path_before, base_before, base, base_after, path_after );
// };


// // Seznam souborů z daného adresáře
// function get_filenames(folder_path) {
//   const fs = require('fs');
//   var files = fs.readdirSync(settings.path.project + folder_path);
//   return files;
// }


// function get_file_content(path_to_file) {

//   const fs = require('fs');
//   const path = require("path");
//   var file = fs.readFileSync(path.resolve(__dirname, path_to_file));
    
//   return file;
// }
// function active_menu_class(group) {
//   return group == page('group') ? conf('active_menu_item_class') : ''
// }

