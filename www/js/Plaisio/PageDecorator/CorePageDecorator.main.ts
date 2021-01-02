requirejs.config({
  baseUrl: '/js',
  paths: {
    'jquery': 'jquery/jquery',
    'jquery.cookie': 'js-cookie/js.cookie',
    'js-cookie': 'js-cookie/js.cookie'
  }
});

require(['Plaisio/PageDecorator/CorePageDecorator'],
  function (CorePageDecorator: any)
  {
    CorePageDecorator.init();
  });

// Plaisio\Console\Helper\TypeScript\TypeScriptMarkHelper::md5: a62ddd496fa2b98340d852094f7e7ce8
