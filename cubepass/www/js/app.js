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
    console.log('Rendering "' + page + '"');

    this.divrender.fadeOut(150, function() {
      app.divrender.load(page);
    });
    this.divrender.fadeIn(150);
  },

  item : function (iname, user, psswd, nts) {
    this.iname = iname;
    this.username = user;
    this.password = psswd;
    this.notes = nts;
  },

  items : [],

  saveData : function() {
    console.log("Saving and encrypting data");
    if (!this.loginSafe) {
      console.log("Aborting save (login unsafe)");
      return;
    }
    var i;
    var temp = [];
    for (i = 0; i < app.items.length; i++) {
      temp[i] = {};
      temp[i].iname = strEncrypt(app.items[i].iname, app.userPassword);
      temp[i].username = strEncrypt(app.items[i].username, app.userPassword);
      temp[i].password = strEncrypt(app.items[i].password, app.userPassword);
      if (app.items[i].notes != undefined) {
        temp[i].notes = strEncrypt(app.items[i].notes, app.userPassword);
      }
    }
    var data = {user_data : temp};
    data = JSON.stringify(data);
    window.localStorage.setItem('user-data', data);
  },

  loadData : function() {
    console.log("Loading data");
    var temp = JSON.parse(window.localStorage.getItem('user-data'));
    app.items = temp.user_data;

    var i;
    for (i = 0; i < app.items.length; i++) {
      app.items[i].iname = strDecrypt(app.items[i].iname, app.userPassword);
      app.items[i].username = strDecrypt(app.items[i].username, app.userPassword);
      app.items[i].password = strDecrypt(app.items[i].password, app.userPassword);
      if (app.items[i].notes != undefined) {
        app.items[i].notes = strDecrypt(app.items[i].notes, app.userPassword);
      }
    }
  },

  logout : function() {
    app.saveData();
		app.userPassword = "";
    app.loginSafe = false;
		var i;
		for (i = 0; i < app.items; i++) {
			app.items[i] = undefined;
		}
		app.render('src/login.html');
  },

  updateHome : function () {
    console.log("Updating home");
    this.homeItems = [];
    var i;
    for (i = 0; i < this.items.length; i++) {
      if (this.items[i].iname.toLowerCase().indexOf(this.homeSrchQ.toLowerCase()) != -1) {
        this.homeItems.push(this.items[i].iname);
      }
    }

    this.homeItems.sort(function(arg1, arg2) {
      if (arg1 == arg2) {
        return 0;
      }
      arg1 = arg1.toLowerCase();
      arg2 = arg2.toLowerCase();
      var temp = [arg1, arg2];
      temp.sort();
      if (arg1 == temp[0]) {
        return -1;
      } else {
        return 1;
      }
    });
  },

  homeSrchQ : "",
  homeCompiled : false,
  homeTpl : "",
  homeItems : [],
  userPassword : "",
  currentItem : "",
  loginSafe : false,
  isCordova : typeof cordova !== 'undefined'
};

app.initialize();
