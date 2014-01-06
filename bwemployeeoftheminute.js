if (Meteor.isClient) {
  Template.hello.greeting = function () {
    return "Welcome to bwemployeeoftheminute.";
  };

  Template.hello.events({
    'click input' : function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        console.log("You pressed the button");
    }
  });
}

if (Meteor.isServer) {

  Meteor.methods({checkTwitter: function (userId) {
    check(userId, String);
    this.unblock();
    try {
      var result = HTTP.call("GET", "https://api.twitter.com/1.1/users/show.json?screen_name=lynnhait");
      console.log(result);
      console.log(userId);
      return true;
    } catch (e) {
      // Got a network error, time-out or HTTP error in the 400 or 500 range.
      return false;
    }
  }});

  Meteor.startup(function () {
    // code to run on server at startup
    Meteor.call("checkTwitter", "lynnhait", function (error, result) { console.log(error + result); });
  });

}
