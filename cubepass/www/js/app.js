var app = {
  //Member functions
  initialize : function() {
    this.bindEvents();
  },

  bindEvents : function() {
    document.addEventListener('deviceready',this.deviceReady,false);

    //Element events
    document.getElementById('btnLogin').addEventListener('touchstart',this.rLogin,false);
  },

  deviceReady : function() {

  },

  rLogin : function() {
  }

};

app.initialize();
function foo(){};
