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

    if (window.localStorage.getItem('user-password') == null) {
      app.render('src/newuser.html');
    } else {
      app.render('src/login.html');
    }
  },

  render : function(page) {
    this.divrender.fadeOut(100, function() {
      app.divrender.load(page);
    });
    this.divrender.fadeIn(100);
  },

  item : function (ename, user, psswd, nts) {
    this.entName = ename;
    this.username = user;
    this.password = psswd;
    this.notes = nts;
  },

  items : [],

  saveData : function() {
    var i;
    var temp = [];
    for (i = 0; i < app.items.length; i++) {
      temp[i] = {};
      temp[i].entName = strEncrypt(app.items[i].entName, app.userPassword);
      temp[i].username = strEncrypt(app.items[i].username, app.userPassword);
      temp[i].password = strEncrypt(app.items[i].password, app.userPassword);
      temp[i].notes = strEncrypt(app.items[i].notes, app.userPassword);
    }
    var data = {user_data : temp};
    data = JSON.stringify(data);
    window.localStorage.setItem('user-data', data);
  },

  loadData : function() {
    var temp = JSON.parse(window.localStorage.getItem('user-data'));
    app.items = temp.user_data;

    var i;
    for (i = 0; i < app.items.length; i++) {
      app.items[i].entName = strDecrypt(app.items[i].entName, app.userPassword);
      app.items[i].username = strDecrypt(app.items[i].username, app.userPassword);
      app.items[i].password = strDecrypt(app.items[i].password, app.userPassword);
      app.items[i].notes = strDecrypt(app.items[i].notes, app.userPassword);
    }
  },

  userPassword : "",
  currentItem : "",
  isCordova : typeof cordova !== 'undefined'
};

app.initialize();
