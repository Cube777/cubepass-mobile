var main {
  init : function(psswd){
    this.password = psswd.toString();
    this.bindEvents();

  }

  bindEvents : function(){
    document.getElementById('newItem').addEventListener('touchstart', this.newItem_ , false);
  }

  //Event handlers
  newItem_ : function(){
    //Code
    navigator.notification.alert('asd', null;
  }

  //Member properties
  password : ""
};
