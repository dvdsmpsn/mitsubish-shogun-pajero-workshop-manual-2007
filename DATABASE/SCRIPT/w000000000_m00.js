//****************************************************************
//	Script for 5KOMA/MUT3 (New Directory) 20021011 Update MCOR
//										  20030129 Update MCOR
//										  20030206 Update MCOR
//										  20030421 Update MCOR
//										  20030526 Update MCOR
//										  20030702 Update MCOR 20030422�ɑΉ������͂��̃R�[�h��ǉ�
//										  20050823 Update RKK  CD�P�̂�MUT3�̋���
//										  20051130 Update RKK  CD�P�̊ȈՕ\���Ŏg�p�����Ȃ����[�U�̃C���X�g�Y�|���Ή�
//****************************************************************
var MainFilePath;
var OBJ_RKKDLL;
var LangID;
var Zoom = 100;
var ImgWidth = 0;
var ImgHeight = 0;
var INI_ListName = "listname.ini";
var CheckActiveXFlg;
var CheckAccessFlg;

//--------------------------------------------------------------->
// Javascript functions for ITVFILE version 1.01
var butTgt = new Array(2);
butTgt[0] = "";
butTgt[1] = "";
//****************************************************************
function ButInit(pPrev, pNext) {
  butTgt[0] = pPrev;
  butTgt[1] = pNext;
  //  var args = GetArgs ("but=");
  //  if (args != "")
  //  {
  //     var i = args.indexOf(",");
  //     if (i > 0)
  //     {
  //       butTgt[0] = args.substr(0,i);
  //       butTgt[1] = args.substr(i+1);
  //     }
  //  }
  ButCheck(0);
  ButCheck(1);
}
//****************************************************************
function GetArgs(Key) {
  var args = location.search;
  var ans = "";
  if (args.substr(0, 1) == "?") {
    var i = args.indexOf(Key);
    if (i > 0) {
      args = args.substr(i + Key.length);
      i = args.indexOf(";");
      if (i > 0) {
        ans = args.substr(0, i);
      }
    }
  }
  return ans;
}
//****************************************************************
function ButCheck(nBut) {
  if (butTgt[nBut] == "" || butTgt[nBut].charAt(0) == "@") {
    butTgt[nBut] = "";
    var pSrc = document.images["BUT" + nBut].src;
    var i = pSrc.lastIndexOf(".");
    pSrc = pSrc.substr(0, i) + "G" + pSrc.substr(i);
    document.images["BUT" + nBut].src = pSrc;
    document.images["BUT" + nBut].style.cursor = "default";
  }
  var i = butTgt[nBut].toUpperCase().indexOf(".HTM");
  if (i > 0) {
    butTgt[nBut] = butTgt[nBut].substr(0, i);
  }
}
//****************************************************************
function ButShow(nBut, bShow) {
  if (bShow == "1" && butTgt[nBut] != "") {
    window.status = butTgt[nBut] + ".HTM";
  } else {
    window.status = "";
  }
  return true;
}

// //****************************************************************20050815
// function ButLink(nBut) {
//   var cstr;
//   cstr = unescape(document.cookie);
//   if (cstr == "SMVCD=1") {
//     ButLink_pc(nBut);
//   } else {
//     ButLink_mut3(nBut);
//   }
// }

// //****************************************************************
// function ButLink_mut3(nBut) {
//   if (butTgt[nBut] != "") {
//     parent.location.href = butTgt[nBut] + ".HTM";
//   }
//   return false;
// }

// //****************************************************************20050815(ButLink func for pc)
// function ButLink_pc(nBut) {
//   if (butTgt[nBut] != "") {
//     //    parent.location.href = butTgt[nBut] + ".HTM";
//     JumpPage(butTgt[nBut] + ".HTM");
//   }
//   return false;
// }

//****************************************************************
function scrlSet(xPos, yPos) {
  var pImg = document.images["I0"];
  var x0, y0, cx, cy;
  var args = location.search;
  var args = GetArgs("scroll=");
  if (args != "") {
    var i = args.indexOf(",");
    if (i > 0) {
      xPos = args.substr(0, i);
      yPos = args.substr(i + 1);
    }
  }
  if (xPos > 0 || yPos > 0) {
    if (pImg.offsetLeft) {
      // IE
      x0 = pImg.offsetLeft;
      y0 = pImg.offsetTop;
      cx = document.body.offsetWidth;
      cy = document.body.offsetHeight;
    } else {
      // NN
      x0 = pImg.x;
      y0 = pImg.y;
      cx = window.innerWidth;
      cy = window.innerHeight;
    }
    xPos = x0 + Math.floor((xPos * pImg.width) / 1000 - cx / 2);
    yPos = y0 + Math.floor((yPos * pImg.height) / 1000 - cy / 2);
    window.scrollBy(xPos, yPos);
  }
}
//****************************************************************
function LinkArgs(evt, elem, Mag, buts, top) {
  var pTgt;
  if (evt.offsetX) {
    // IE
    pTgt = document.activeElement.href;
  } else {
    // NN
    pTgt = evt.target;
  }
  pTgt += "?";
  if (Mag != 0) {
    Mag *= 10;
    var pImg = document.images["I" + elem];
    var Cx = pImg.width;
    var Cy = pImg.height;
    var xPos, yPos, pTgt;
    if (evt.offsetX) {
      // IE
      xPos = evt.offsetX;
      yPos = evt.offsetY;
    } else {
      // NN
      xPos = evt.pageX - pImg.x;
      yPos = evt.pageY - pImg.y;
    }
    xPos = Math.floor((xPos * Mag) / Cx);
    yPos = Math.floor((yPos * Mag) / Cy);
    pTgt += "scroll=" + xPos + "," + yPos + ";";
    // alert (pTgt);
  }
  if (buts == "1") {
    //    pTgt += "but=" + butTgt[0] + "," + butTgt[1] + ";";
    //  alert (pTgt);
  }
  window.status = pTgt;
  if (top != "0") {
    parent.location.href = pTgt;
  } else {
    location.href = pTgt;
  }
  return false;
}
//****************************************************************
function scrlTgt(evt, elem, Mag) {
  Mag *= 10;
  var pImg = document.images["I" + elem];
  var Cx = pImg.width;
  var Cy = pImg.height;
  var xPos, yPos, pTgt;
  if (evt.offsetX) {
    // IE
    xPos = evt.offsetX;
    yPos = evt.offsetY;
    pTgt = document.activeElement.href;
  } else {
    // NN
    xPos = evt.pageX - pImg.x;
    yPos = evt.pageY - pImg.y;
    pTgt = evt.target;
  }
  xPos = Math.floor((xPos * Mag) / Cx);
  yPos = Math.floor((yPos * Mag) / Cy);
  pTgt = pTgt + "?scroll=" + xPos + "," + yPos + ";";
  // alert (pTgt);
  window.status = pTgt;
  location.href = pTgt;
  return false;
}
//****************************************************************
function cWidth(cols) {
  var cx = 800;
  if (window.innerWidth) {
    cx = window.innerWidth;
  } else if (document.body.offsetWidth) {
    cx = document.body.offsetWidth;
  }
  return Math.floor((cx * cols) / 1000);
}

//****************************************************************20050815/20051130
function enlarge(image_f) {
  // @dvdsmpsn
  window.open(image_f);
}

//****************************************************************20050815
function SetCharset() {
  //   var cstr;
  //   cstr = unescape(document.cookie);
  //   if (cstr == "SMVCD=1") {
  //     SetCharset_pc();
  //   } else {
  //     SetCharset_mut3();
  //   }
}

//****************************************************************
function SetCharset_mut3() {
  var i;
  for (i = 0; i < window.document.images.length; i++) {
    window.document.images[i].galleryImg = "no";
  }
  // Display ID
  var myname = self.name;
  //	alert(myname);
  //	if(myname = 'main'){
  //		DispID();//20020731 m.n �^�C�g��Frame�폜
  //	}

  var pKey1 = "";
  var pKey2 = "";
  var ret = "";

  MainFilePath = "";
  LangID = "";

  // Get MUT3 Path(from Registry)
  //-->2002/09/13 MainFilePath�߽���擾�����֐���
  //	pKey1 = "Software\\Mmc\\Mut3\\Common\\Build";
  //	pKey2 = "path";
  //
  //	OBJ_RKKDLL = new ActiveXObject("m03.m03");
  //	ret = OBJ_RKKDLL.Get_Registry(pKey1,pKey2);
  //	if(ret == ""){
  //		return;
  //	}
  //	MainFilePath = ret;
  //
  SetMainFilePath();
  //<--2002/09/13

  //-->2002/09/24 LangID�擾�����֐���
  //	// Get LanguageID(from Vhicle.dat)
  //	ret = "";
  //	ret = OBJ_RKKDLL.Get_Information(MainFilePath + "\\mut3\\Temp\\Vehicle.dat","ENV","LANGUAGEID","");
  //	if(ret == ""){
  //		return;
  //	}
  //	LangID = ret;
  SetLangID();
  //==>2002/09/25
  if (LangID == "") {
    return;
  }
  //<==2002/09/25
  //<--2002/09/24
  // Get Character Code(from Registry)
  ret = "";
  pKey1 = "Software\\Mmc\\Mut3\\Mut\\App\\Language";
  pKey2 = LangID;
  ret = OBJ_RKKDLL.Get_Registry(pKey1, pKey2);
  if (ret == "") {
    return;
  }

  //Set Charcter Code
  //	alert(ret);
  window.document.charset = ret;
  window.resizeBy(1, 0); // for
}

//****************************************************************20050815(SetCharset func for pc)
function SetCharset_pc() {
  var i;
  for (i = 0; i < window.document.images.length; i++) {
    window.document.images[i].galleryImg = "no";
  }
}

//Right-clicking prohibition
if (document.all) {
  // DHTML/IE?
  document.onmousedown = myEventIE;
}
if (document.layers) {
  // DHTML/NN?
  document.captureEvents(Event.MOUSEDOWN);
  document.onmousedown = myEventNN;
}

function myEventIE() {
  // Right-click on IE
  if (event.button == 2) {
    // Right-click?
    //      alert("Right-clicking prohibition"); //2001/11/26
    //---------------->20020924
    ////-------------->20020820
    ////	alert("�E�N���b�N�͖����ł�");
    //	var htmlpath = parent.main.location.href;
    //	var iPos = htmlpath.lastIndexOf(".");
    //	if( htmlpath.substr(iPos-3,3) == "JPN" ){
    //	      alert("�E�N���b�N�͖����ł�");
    //	}
    //	else{
    //	      alert("Right-clicking prohibition");
    //	}
    //
    //   }
    //<--------------20020820
    if (LangID == "") {
      SetLangID();
    }
    if (LangID == "J") {
      alert("�E�N���b�N�͖����ł�");
    } else {
      alert("Right-clicking prohibition");
    }
  }
  //<----------------20020924
}

function myEventNN(myEvent) {
  // Right-click on NN
  if (myEvent.which == 3) {
    // Right-click?
    //      alert("Right-clicking prohibition"); //2001/11/26 M.N comment out
    //---------------->20020924
    ////-------------->20020820
    ////	alert("�E�N���b�N�͖����ł�");
    //		var htmlpath = parent.main.location.href;
    //		var iPos = htmlpath.lastIndexOf(".");
    //	 	if( htmlpath.substr(iPos-3,3) == "JPN" ){
    //			alert("�E�N���b�N�͖����ł�");
    //		}
    //		else{
    //	      alert("Right-clicking prohibition");
    //		}
    ////<--------------20020820
    if (LangID == "") {
      SetLangID();
    }
    if (LangID == "J") {
      alert("�E�N���b�N�͖����ł�");
    } else {
      alert("Right-clicking prohibition");
    }
    //<----------------20020924
    return false;
  }
}

//Scroll
var wt = 0;
var cx = 0;
var cy = 0;
var mp = 250;

function Scroll(mode) {
  cx = parent.main.document.body.scrollLeft;
  cy = parent.main.document.body.scrollTop;
  // �t���[���T�C�Y�ɂ��A�X�N���[���ʂ𒲐�����
  if ((mode == 1) | (mode == 2)) {
    mp = parent.main.document.body.clientWidth / 2;
  } else {
    mp = parent.main.document.body.clientHeight / 2;
  }
  //	alert("X�ʒu >> " + cx);
  //	alert("Y�ʒu >> " + cy);
  //	alert("�ړ��� >> " + mp);

  //* Left
  if (mode == 1) {
    cx = cx - mp;
    if (cx < 0) {
      cx = 0;
    }
  }
  //* Right
  if (mode == 2) {
    cx = cx + mp;
    if (cx < 0) {
      cx = 0;
    }
  }
  //* Up
  if (mode == 3) {
    cy = cy - mp;
    if (cy < 0) {
      cy = 0;
    }
  }
  //* Down
  if (mode == 4) {
    cy = cy + mp;
    if (cy < 0) {
      cy = 0;
    }
  }

  parent.main.scroll(cx, cy);
}

//PrintImage(PNG)
function PrintImage() {
  // *** �� IE4.0�ł͓������AIE5.5�ł͓��삹��
  //	var WebBrowser = '<OBJECT ID="WebBrowser1" WIDTH=0 HEIGHT=0 CLASSID="CLSID:8856F961-340A-11D0-A96B-00C04FD705A2"></OBJECT>';
  //    	document.body.insertAdjacentHTML('beforeEnd', WebBrowser);
  //    	WebBrowser1.ExecWB(6, 2);
  // ***********************

  // *** �� RKK �� ����ق����p
  //	OBJ_RKKDLL.Prn_Screen(1,1);
  // ***********************

  // ***** START SAMPLE *****
  //	parent.main.print();		// ����قł� 	'01/05/16 �� PrintDialog���o�Ă��܂��܂���...
  //	parent <--- �e�ڰѵ�޼ު��
  //	main   <--- �q�ڰі�
  //	�ڰтɑ΂���print()ҿ��ނ𔭍s��������ł����A���̂�������������޲�۸ނ��o�͂���Ă��܂��܂��B
  // ************************

  //==>20020820 m.n ����_�C�A���O�����̂��ߏC��
  //	var prnfl = parent.main.location.href;
  //	alert(prnfl);
  //	var fname = prnfl.substr(8,prnfl.length);
  //	alert(fname);
  //	OBJ_RKKDLL.Prn_Image(fname);	// '01/05/18 ���s��

  //==>20020930 m.n ����_�C�A���O�́u�I�������t���[�����c�v���摜�ɂȂ�悤�C��
  parent.main.focus();
  //<==20020930 m.n
  parent.main.print();

  //<==20020820 m.n �_�C�A���O����
}

// Close Button
function CloseWin() {
  //	alert(parent.location.href);
  parent.close();
}

//<==20030421 m.n �֐��ǉ������܂�

//---------------->	2003/02/06 add
//****************************************************************
//	ini̧���߽���擾
function GetInifilePath(fname, inifilename) {
  var repflg = 1; //�I���׸�
  var inifl = fname;
  var ipos = inifl.lastIndexOf("/");
  if (ipos == -1) {
    //̧�ٖ��݂̂̏ꍇpath���擾
    inifl = parent.main.location.href;
    ipos = inifl.lastIndexOf("/");
  }
  inifl = inifl.substr(8, ipos - 8);
  ipos = inifl.length;
  for (var i = 1; i < 4; i++) {
    ipos = inifl.lastIndexOf("/", ipos);
    ipos--;
  }
  inifl = inifl.substr(0, ipos + 1) + "/script/" + inifilename;
  while (repflg > 0) {
    if (inifl.indexOf("/") == -1) {
      repflg = 0;
    }
    inifl = inifl.replace("/", "\\");
  }
  return inifl;
}

//--------------->2002/09/13 add
function SetMainFilePath() {
  var pKey1 = "Software\\Mmc\\Mut3\\Common\\Build";
  var pKey2 = "path";

  MainFilePath = "";
  OBJ_RKKDLL = new ActiveXObject("m03.m03");
  ret = OBJ_RKKDLL.Get_Registry(pKey1, pKey2);
  if (ret == "") {
    return;
  }
  MainFilePath = ret;
}
//<---------------2002/09/13 add

//--------------->2002/09/24 add
function SetLangID() {
  // Get LanguageID(from Vhicle.dat)
  var ret = "";
  //	var htmlpath = parent.location.href;
  //	var iPos;
  //	iPos =  htmlpath.lastIndexOf("S150000000_F00");
  //	if( iPos > 0 )
  //	{
  if (MainFilePath == "") {
    SetMainFilePath();
  }
  ret = OBJ_RKKDLL.Get_Information(
    MainFilePath + "\\mut3\\Temp\\Vehicle.dat",
    "ENV",
    "LANGUAGEID",
    ""
  );
  //	}
  //	else
  //	{
  //		var iPos = htmlpath.lastIndexOf(".");
  //		var sLang=""
  //		if( htmlpath.substr(iPos-1,1) == "F" )
  //		{//MUT-III mode
  //			sLang = htmlpath.substr(iPos-4,3);
  //		}
  //		else
  //		{//non Frame or other html
  //			sLang = htmlpath.substr(iPos-3,3);
  //		}
  //		switch( sLang)
  //		{
  //			case "JPN":
  //				ret = "J";
  //				break;
  //			case "USA":
  //				ret = "N";
  //				break;
  //			default:
  //			ret = sLang.substr(1,1);
  //		}
  //	}
  LangID = ret;
}
//<---------------2002/09/24 add

//--------------->2002/10/03 add  �C���X�g�g��Frame�쐬
//				  2002/10/04 �g���q�͂����B�C���X�gID�Ɋۊ��ʕt��
//				  2002/10/11 mut3.dll���ōs���̂Ŏg�p���Ȃ��i�l�b�g���[�N�ŃG���[�ƂȂ邽�ߔp�~�j
function Make_ImageFrame(ImgWnd, htmlpath, imgfl) {
  //image file name get
  var imagename;
  var ipos = imgfl.lastIndexOf("/");
  imagename = imgfl.substr(ipos + 1);
  ipos = imagename.lastIndexOf(".");
  imagename = imagename.substr(0, ipos);

  //write 03IMGPRN.htm
  ImgWnd.document.open(); //���l�b�g���[�N�ゾ�Ƃ����ŃG���[��
  ImgWnd.document.writeln("<HTML>");
  ImgWnd.document.writeln("<HEAD>");
  ImgWnd.document.writeln("<TITLE>(" + imagename + ")</TITLE>");
  ImgWnd.document.writeln("</HEAD>");
  ImgWnd.document.writeln(
    "<FRAMESET ROWS='*,4%,10%' FRANEBORDER='0' FRAMESPACING='1'>"
  );
  ImgWnd.document.writeln(
    "<FRAME NAME='main' SRC='" +
      htmlpath +
      "ImgMain.htm' SCROLLING='auto' NORESIZE>"
  );
  ImgWnd.document.writeln(
    "<FRAME NAME='message' SRC='" +
      htmlpath +
      "03IMGMSG.htm' SCROLLING='no' NORESIZE>"
  );
  ImgWnd.document.writeln(
    "<FRAME NAME='button' SRC='" +
      htmlpath +
      "03IMG_B01.htm' SCROLLING='no' NORESIZE>"
  );
  ImgWnd.document.writeln("</FRAMESET>");
  ImgWnd.document.writeln("</HTML>");
  ImgWnd.document.close();
}
//<---------------2002/10/03 add

//****************************************************************2005/8/23
function GetTempFile() {
  var pKey1 = "Software\\MMC\\CD";
  var pKey2 = "TEMP";
  var TempPath = "";

  OBJ_RKKDLL = new ActiveXObject("m03.m03");
  TempPath = OBJ_RKKDLL.Get_HURegistry(pKey1, pKey2);
  if (TempPath == "") {
    return "";
  }
  return TempPath;
}

//****************************************************************2005/11/30
function CheckActiveX() {
  var pKey1 = "Software\\Mmc\\Mut3\\Common\\Build";
  var pKey2 = "DATE";
  var InstDate = "";

  CheckActiveXFlg = "OK";
  try {
    OBJ_RKKDLL = new ActiveXObject("m03.m03");
    InstDate = OBJ_RKKDLL.Get_Registry(pKey1, pKey2);
  } catch (e) {
    CheckActiveXFlg = "NG";
    return CheckActiveXFlg;
  }
  return CheckActiveXFlg;
}

//****************************************************************2005/11/30
function CheckAccess() {
  if (MainFilePath == "") {
    SetMainFilePath();
  }
  OBJ_RKKDLL = new ActiveXObject("m03.m03");
  OBJ_RKKDLL.Set_Information(
    MainFilePath + "\\mut3\\TEMP\\S02CHECK.DAT",
    "ENV",
    "STATUS",
    "OK"
  );
  CheckAccessFlg = OBJ_RKKDLL.Get_Information(
    MainFilePath + "\\mut3\\TEMP\\S02CHECK.DAT",
    "ENV",
    "STATUS",
    "NG"
  );
  if (CheckAccessFlg == "OK") {
    OBJ_RKKDLL.Set_Information(
      MainFilePath + "\\mut3\\TEMP\\S02CHECK.DAT",
      "ENV",
      "STATUS",
      "NG"
    );
    return CheckAccessFlg;
  } else {
    return CheckAccessFlg;
  }
}
