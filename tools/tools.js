var { settings, path, conf, site, page } = require('../core/settings.js');

// Test
function test () {
  return 'Hello traveler! Answer is 42.'
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




formatPrice = function(val, n, x, s, c) {
  var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
      val = val.toFixed(Math.max(0, ~~n));

  return (c ? val.replace('.', c) : val).replace(new RegExp(re, 'g'), '$&' + (s || ','));
};


function getRandom( min = 100, max = 2000) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min);
}




class fakeData  {

  // priceRaw: hodnota včetně dph, např 2340
  constructor(priceRaw = this.random()) {
    this.priceRaw = priceRaw;
  }

  /**
   * format(val, n, x, s, c)
   * 
   * @param integer n: length of decimal
   * @param integer x: length of whole part
   * @param mixed   s: sections delimiter
   * @param mixed   c: decimal delimiter
   */

  format = function(val, n = 2, x = 3, s = ' ', c = ',') {
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
        val = val.toFixed(Math.max(0, ~~n));
    return (c ? val.replace('.', c) : val).replace(new RegExp(re, 'g'), '$&' + (s || ','));
  };
  

  random( min = 100, max = 2000 ) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  round(num ,round= 100) {
    return Math.round(num / round) * round
  }

  // Formated price 2 560,00
  price(decimal = 0) {
    return this.format(this.round(this.priceRaw), decimal)
  }
}



module.exports = {
  test,
  isDev,
  isFunc,
  getPermalink,
  getAttachedFile,
  fakeData,
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

