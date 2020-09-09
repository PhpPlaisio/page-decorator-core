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
