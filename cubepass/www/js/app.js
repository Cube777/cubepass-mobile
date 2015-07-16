var app = {
  //Member functions
  initialize : function() {
    this.bindEvents();
  },

  bindEvents : function() {
    if (this.isCordova) {
      console.log('Binding app events');
      document.addEventListener('deviceready', this.deviceReady, false);
    }
  },

  deviceReady : function() {
    console.log('Cordova ready');
    FastClick.attach(document.body);
    strEncrypt = Module.cwrap('strEncrypt', 'string', ['string', 'string']);
    strDecrypt = Module.cwrap('strDecrypt', 'string', ['string', 'string']);
    app.divrender = $('#render');

    if (window.localStorage.getItem('user-password') == null) {
      app.render('src/newuser.html');
    } else {
      app.render('src/login.html');
    }
  },

  render : function(page) {
    this.divrender.load(page);
  },

  entity : function (ename, user, psswd, nts) {
    this.entName = ename;
    this.username = user;
    this.password = psswd;
    this.notes = nts;
  },

  entities : [
    //To be filled
  ],

  userPassword : "",
  isCordova : typeof cordova !== 'undefined'
};

app.initialize();
