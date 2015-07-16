var app = {
  //Member functions
  initialize : function() {
    this.bindEvents();
  },

  bindEvents : function() {
    if (this.isCordova) {
      console.log('Binding app events');
      document.addEventListener('deviceready', this.deviceReady(),false);
    }
  },

  deviceReady : function() {
    console.log('Cordova ready');
    FastClick.attach(document.body);

    //Compile templates
    this.maketpl('login');
    this.maketpl('home');
    this.maketpl('newitem')

    this.rendertpl('home');
  },

  maketpl : function(foo) {
    console.log('Compiling and saving template ' + foo);
    this.screens[foo] = Handlebars.compile($('#tpl-' + foo).html());
  },

  rendertpl : function(foo) {
    console.log("Rendering " + foo);
    $('.render').html(this.screens[foo]());
  },

  screens : {
  },

  isCordova : typeof cordova !== 'undefined'
};

app.initialize();
