function init(max,idname) {
  var mno = max - 0;
  for(no=0;no<=mno;no++){
    document.all(idname).item(no).style.display="none";
  }
}

function menuclick(obj,idname) {
  var no = obj.id - 0;
  var st = document.all(idname).item(no).style.display;
  if(st == "none") {
    document.all(idname).item(no).style.display="block";
  }
  else {
    document.all(idname).item(no).style.display="none";
  }
}

function menuover(obj) {
  obj.style.cursor="hand";
}

function menuout(obj) {
  obj.style.cursor="auto";
}

function Setcookie() {
  document.cookie = "SMVCD=1";
}

function clearCookie() {
  document.cookie = "SMVCD=clr; expires=Thu, 01-Jan-1980 00:00:00 GMT;";
}
