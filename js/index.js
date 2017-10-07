//current bug: using a handler that relinks to the channel's proper name will show the channel as offline. For example the API call for Dyrus stream will return null but the channel API call relinks to the channel for the proper ID TSM_Dyrus. Possible solution: Call channel API first then stream 



$(document).ready(function() {
  var kappa = "<img class=kappa title='Close' src=images/kappa.png>";
  var streamers = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "habathcx", "RobotCaleb", "noobs2ninjas", "nightblue3"];
  var clientID = "?client_id=9kpvmpl0li44j8x54q75ch1hxzfutm";
  var status;
  $("#showOnline").on("click", function() {
    $(this).addClass("clicked");
    $("#showOffline").removeClass("clicked");
    $("#showAll").removeClass("clicked");
    $(".offline").hide();
    $(".online").show();
  });
  $("#showOffline").on("click", function() {
    $(this).addClass("clicked");
    $("#showOnline").removeClass("clicked");
    $("#showAll").removeClass("clicked");
    $(".online").hide();
    $(".offline").show();
  });

  $("#showAll").on("click", function() {
    $(this).addClass("clicked");
    $("#showOnline").removeClass("clicked");
    $("#showOffline").removeClass("clicked");
    $(".online").show();
    $(".offline").show();
  });
  $(document).on("click", ".kappa", function() {
    $(this).closest("div").remove();
  });

  for (let a = 0; a < streamers.length; a++) {
    $.getJSON('https://api.twitch.tv/kraken/streams/' + streamers[a] + clientID, function(json) {
      var profilePic;
      var status;
        if (json.stream) {
          if (json.stream.channel.status) {
            status = "";
          }
          status += json.stream.channel.status;
          var url = "";
          url += json.stream.channel.url;
          if (json.stream.channel.logo) {
            profilePic = '<img class=profilePic src=' + json.stream.channel.logo + '>'
          } else {
            profilePic = '<img class=profilePic src =https://ih1.redbubble.net/image.139973808.1307/flat,800x800,075,f.u3.jpg> '
          };
          var name = "";
          name += json.stream.channel.display_name;
          $("#resultWell").append("<a href=" + url + " target = blank><div class=online>" + profilePic + name + "<br> " + "<div>" + status + "</div></a>" + kappa + "</div>");

        } else {
          $.getJSON('https://api.twitch.tv/kraken/channels/' + streamers[a] + clientID, function(json1) {
              if (json1.error) {
                var errorMessage = "Could not find streamer: " + JSON.stringify(streamers[a]);
                alert(errorMessage);
              } else {
                var status = "";

                if (json1.status) {
                  status += json1.status;
                }
                var url = "";
                url += json1.url;
                if (json1.logo) {
                  var profilePic = '<img class=profilePic src=' + json1.logo + '>'
                } else {
                  var profilePic = '<img class=profilePic src =https://ih1.redbubble.net/image.139973808.1307/flat,800x800,075,f.u3.jpg> '
                };
                var name = "";
                name += json1.display_name;
                $("#resultWell").append("<a href=" + url + " target = blank><div class = offline>" + profilePic + name + "<br> " + "<div>" + status + "</div></a>" + kappa + "</div>");
              }

            }); //end of channel json
        }

      }); //end of stream json
  }

  $("#searchbox").keyup(function(e) {
    if (e.which == 13) {
      $("#add").click();
    }
  });

  $("#add").on("click", function() {
    var value = "";
    value += $("#searchbox").val();
    $("#searchbox").val("");

    $.getJSON('https://api.twitch.tv/kraken/streams/' + value + clientID, function(json) {
      var profilePic;
        if (json.stream) {
          if (json.stream.channel.status) {
            var status = "";

            status += json.stream.channel.status;
          }
          var url = "";
          url += json.stream.channel.url;
          if (json.stream.channel.logo) {
            profilePic = '<img class=profilePic src=' + json.stream.channel.logo + '>'
          } else {
             profilePic = '<img class=profilePic src =https://ih1.redbubble.net/image.139973808.1307/flat,800x800,075,f.u3.jpg> '
          }
          var name = "";
          name += json.stream.channel.display_name;
          $("#resultWell").append("<a href=" + url + " target = blank><div class = online>" + profilePic + name + "<br> " + status + "</a>" + kappa + "</div>")

        } else {
          $.getJSON('https://api.twitch.tv/kraken/channels/' + value + clientID, function(json1) {
              if (json1.error) {
                var errorMessage = "Could not find streamer: " + JSON.stringify(value);
                alert(errorMessage);
              } else {
                var status = "";

                if (json1.status) {
                  status += json1.status;
                }
                var url = "";
                url += json1.url;
                if (json1.logo) {
                  var profilePic = '<img class=profilePic src=' + json1.logo + '>'
                } else {
                  var profilePic = '<img class=profilePic src =https://ih1.redbubble.net/image.139973808.1307/flat,800x800,075,f.u3.jpg> '
                }
                var name = "";
                name += json1.display_name;
                $("#resultWell").append("<a href=" + url + " target = blank><div class=offline>" + profilePic + name + "<br> " + "<div>" + status + "</div></a>" + kappa + "</div>");
              }

            }); //end of channel json
        }

      }); //end of stream json
  });

});