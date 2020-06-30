var getTime = new XMLHttpRequest();

getTime.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    const data = JSON.parse(this.responseText);

    for (i in data) {
      if (data[i]["fields"]["Type"] == "Standard") {
        var standdiv = document.getElementById("standard");

        var newcontent = document.createElement("div");

        newcontent.className = "col-3";

        newcontent.innerHTML =
          '<div class="col-3"><div class="card-container"><div id="front' +
          data[i]["fields"]["Name"] +
          '"><button style="float:right;top:0;" onclick="document.getElementById(\'front' +
          data[i]["fields"]["Name"] +
          "').style.display = 'none'; document.getElementById('back" +
          data[i]["fields"]["Name"] +
          "').style.display = '';\">Enter</button><h4 style=\"float:left;top:0;\"><b>" +
          data[i]["fields"]["Name"] +
          "</b></h4><br /><br /><p>" +
          data[i]["fields"]["Description"] +
          "<hr><br><i>Last submissions on " +
          data[i]["fields"]["Formatted Date"] +
          '</i></p></p></div><div id="back' +
          data[i]["fields"]["Name"] +
          '"style = "display:none"><button style="float:right;top:0;" onclick="submitProject(' +
          "'" +
          data[i]["fields"]["Name"] +
          "'" +
          ");document.getElementById('back" +
          data[i]["fields"]["Name"] +
          "').style.display = 'none'; document.getElementById('front" +
          data[i]["fields"]["Name"] +
          "').style.display = '';\">Submit</button><h4 style=\"float:left;top:0;\"><b>" +
          data[i]["fields"]["Name"] +
          '</b></h4><br /><br /><input type="text" id="name' +
          data[i]["fields"]["Name"] +
          '" placeholder="Slack Username" /><br /><input type="text" id="url' +
          data[i]["fields"]["Name"] +
          '" placeholder="Project Link" style="margin-bottom: 1em!important;"/><br /></div></div>';

        while (newcontent.firstChild) {
          standdiv.appendChild(newcontent.firstChild);
        }
      } else if (data[i]["fields"]["Type"] == "Temporary") {
        var standdiv = document.getElementById("limited-time");

        var newcontent = document.createElement("div");

        newcontent.className = "col-3";

        newcontent.innerHTML =
          '<div class="col-3"><div class="card-container"><div id="front' +
          data[i]["fields"]["Name"] +
          '"><button style="float:right;top:0;" onclick="document.getElementById(\'front' +
          data[i]["fields"]["Name"] +
          "').style.display = 'none'; document.getElementById('back" +
          data[i]["fields"]["Name"] +
          "').style.display = '';\">Enter</button><h4 style=\"float:left;top:0;\"><b>" +
          data[i]["fields"]["Name"] +
          "</b></h4><br /><br /><p>" +
          data[i]["fields"]["Description"] +
          "<hr><br><i>Last submissions on " +
          data[i]["fields"]["Formatted Date"] +
          '</i></p></p></div><div id="back' +
          data[i]["fields"]["Name"] +
          '"style = "display:none"><button style="float:right;top:0;" onclick="submitProject(' +
          "'" +
          data[i]["fields"]["Name"] +
          "'" +
          ");document.getElementById('back" +
          data[i]["fields"]["Name"] +
          "').style.display = 'none'; document.getElementById('front" +
          data[i]["fields"]["Name"] +
          "').style.display = '';\">Submit</button><h4 style=\"float:left;top:0;\"><b>" +
          data[i]["fields"]["Name"] +
          '</b></h4><br /><br /><input type="text" id="name' +
          data[i]["fields"]["Name"] +
          '" placeholder="Slack Username" /><br /><input type="text" id="url' +
          data[i]["fields"]["Name"] +
          '" placeholder="Project Link" style="margin-bottom: 1em!important;"/><br /></div></div>';

        while (newcontent.firstChild) {
          standdiv.appendChild(newcontent.firstChild);
        }
      }

      console.log(data[i]["fields"]["Type"]);
    }
  }
};

getTime.open(
  "GET",
  "https://sphericallatecygwin--sampoder.repl.co/content",
  true
);

getTime.send();

function validURL(str) {
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return !!pattern.test(str);
}

function submitProject(category) {
  var name = String(document.getElementById("name" + category).value);

  var url = String(document.getElementById("url" + category).value);

  if (name == "" || url == "") {
    alert("Please fill out all the fields for the form.");
  }
  else if (validURL(url) == false){
    alert("Please fill out the form with a valid URL.");
  }
  else {
    var xhttp = new XMLHttpRequest();

    xhttp.open(
      "POST",
      "https://SphericalLateCygwin--sampoder.repl.co/post",
      true
    );

    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.send(
      String('{"name":"').concat(
        name,
        '", "url":"',
        url,
        '", "category":"',
        category,
        '"}'
      )
    );
  }
}
