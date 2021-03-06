//****************************************************************
//	Script for 5KOMA/MUT3 (New Directory) 20021011 Update MCOR
//										  20030129 Update MCOR
//										  20030206 Update MCOR
//										  20030421 Update MCOR
//										  20030526 Update MCOR
//										  20030702 Update MCOR 20030422に対応したはずのコードを追加
//										  20050823 Update RKK  CD単体とMUT3の共存
//										  20051130 Update RKK  CD単体簡易表示で使用権限なしユーザのイラストズ−ム対応
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
function ButInit (pPrev,pNext)
{
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
  ButCheck (0);
  ButCheck (1);
}
//****************************************************************
function GetArgs (Key)
{
  var args = location.search;
  var ans = "";
  if (args.substr(0,1) == "?")
  {
    var i = args.indexOf(Key);
    if (i > 0)
    {
      args = args.substr(i + Key.length);
      i = args.indexOf(";");
      if (i > 0)
      {
        ans = args.substr(0,i);
      }
    }
  }
  return ans;
}
//****************************************************************
function ButCheck (nBut)
{
  if ( (butTgt[nBut] == "") || (butTgt[nBut].charAt(0) == "@"))
  {
    butTgt[nBut] = "";
    var pSrc = document.images["BUT" + nBut].src;
    var i = pSrc.lastIndexOf (".");
    pSrc = pSrc.substr(0,i) + "G" + pSrc.substr(i);
    document.images["BUT" + nBut].src = pSrc;
    document.images["BUT" + nBut].style.cursor = "default";
  }
  var i = butTgt[nBut].toUpperCase().indexOf(".HTM");
  if (i > 0)
  {
    butTgt[nBut] = butTgt[nBut].substr(0,i);
  }
}
//****************************************************************
function ButShow (nBut,bShow)
{
  if ((bShow == "1")&&(butTgt[nBut] != ""))
  {
    window.status = butTgt[nBut] + ".HTM";
  }
  else
  {
    window.status = "";
  }
  return true;
}

//****************************************************************20050815
function ButLink(nBut)
{
var cstr 
	cstr = unescape(document.cookie);
	if( cstr == "SMVCD=1" ) {
		ButLink_pc(nBut);
	}
	else{
		ButLink_mut3(nBut);
	}
}

//****************************************************************
function ButLink_mut3(nBut)
{
  if (butTgt[nBut] != "")
  {
    parent.location.href = butTgt[nBut] + ".HTM";
  }
  return false;
}

//****************************************************************20050815(ButLink func for pc)
function ButLink_pc(nBut)
{
  if (butTgt[nBut] != "")
  {
//    parent.location.href = butTgt[nBut] + ".HTM";
	JumpPage(butTgt[nBut] + ".HTM");
  }
  return false;
}

//****************************************************************
function scrlSet (xPos,yPos)
{
  var pImg = document.images["I0"];
  var x0, y0, cx, cy;
  var args = location.search;
  var args = GetArgs ("scroll=");
  if (args != "")
  {
     var i = args.indexOf(",");
     if (i > 0)
     {
       xPos = args.substr(0,i);
       yPos = args.substr(i+1);
     }
  }
  if ( (xPos > 0) || (yPos > 0))
  {
     if (pImg.offsetLeft)
     { // IE
        x0 = pImg.offsetLeft;
        y0 = pImg.offsetTop;
        cx = document.body.offsetWidth;
        cy = document.body.offsetHeight;
     }
     else
     { // NN
        x0 = pImg.x;
        y0 = pImg.y;
        cx = window.innerWidth;
        cy = window.innerHeight;
     }
     xPos = x0 + Math.floor( (xPos*pImg.width/1000) - (cx/2) );
     yPos = y0 + Math.floor( (yPos*pImg.height/1000) - (cy/2) );
     window.scrollBy (xPos, yPos);
  }
}
//****************************************************************
function LinkArgs(evt,elem,Mag,buts,top)
{
  var pTgt;
  if (evt.offsetX)
  {  // IE
    pTgt = document.activeElement.href;
  }
  else
  {  // NN
    pTgt = evt.target;
  }
  pTgt += "?";
  if (Mag != 0)
  {
    Mag *= 10;
    var pImg = document.images["I"+elem];
    var Cx = pImg.width;
    var Cy = pImg.height;
    var xPos, yPos, pTgt;
    if (evt.offsetX)
    {  // IE
      xPos = evt.offsetX;
      yPos = evt.offsetY;
    }
    else
    {  // NN
      xPos = evt.pageX - pImg.x;
      yPos = evt.pageY - pImg.y;
    }
    xPos = Math.floor (xPos * Mag / Cx);
    yPos = Math.floor (yPos * Mag / Cy);
    pTgt += "scroll=" + xPos + "," + yPos + ";";
    // alert (pTgt);
  }
  if (buts == "1")
  {
//    pTgt += "but=" + butTgt[0] + "," + butTgt[1] + ";";
//  alert (pTgt);
  }
  window.status = pTgt;
  if (top != "0")
  {
    parent.location.href = pTgt;
  }
  else
  {
    location.href = pTgt;
  }
  return false;
}
//****************************************************************
function scrlTgt(evt,elem,Mag)
{
  Mag *= 10;
  var pImg = document.images["I"+elem];
  var Cx = pImg.width;
  var Cy = pImg.height;
  var xPos, yPos, pTgt;
  if (evt.offsetX)
  {  // IE
     xPos = evt.offsetX;
     yPos = evt.offsetY;
     pTgt = document.activeElement.href;
  }
  else
  {  // NN
     xPos = evt.pageX - pImg.x;
     yPos = evt.pageY - pImg.y;
     pTgt = evt.target;
  }
  xPos = Math.floor (xPos * Mag / Cx);
  yPos = Math.floor (yPos * Mag / Cy);
  pTgt = pTgt + "?scroll=" + xPos + "," + yPos + ";";
// alert (pTgt);
  window.status = pTgt;
  location.href = pTgt;
  return false;
}
//****************************************************************
function cWidth (cols)
{
  var cx=800;
  if (window.innerWidth)
  {
     cx=window.innerWidth;
  }
  else if (document.body.offsetWidth)
  {
    cx=document.body.offsetWidth;
  }
  return Math.floor(cx*cols/1000);
}
//****************************************************************
// Javascript functions for ITVFILE version 1.01
//<---------------------------------------------------------------
//-->2002/09/13
//function SetInit(pFileName, pAppName, pKeyName, pDefvalue)
function SetInit(pFileName, pAppName, pKeyName, pDefvalue, pItemNo)
//<--2002/09/13
{
	var ret;
	var obj_getInfo = new ActiveXObject("m03.m03");
//-->2002/09/13 MainFilePathがﾌﾞﾗﾝｸだったらﾊﾟｽ名取得処理
	if( MainFilePath == "" ) {
		SetMainFilePath();
	}
//<--2002/09/13
	ret = obj_getInfo.Set_Information(MainFilePath + "\\mut3\\temp\\Vehicle.dat",pAppName,pKeyName, pDefvalue);
//-->2002/09/13 Item番号ｾｯﾄ処理追加
	ret = obj_getInfo.Set_Information(MainFilePath + "\\mut3\\temp\\Vehicle.dat",pAppName,"ITEMNO", pItemNo);
//<--2002/09/13
	var retPara;
	retPara = GetWinPara();
//==>2002/08/06 m.n 故障診断用HTMLがインストールドライブと違う場所へ登録された場合の対応
//	window.open("../../../../menu/html/mut_mode.HTM","",retPara);
//	window.open("../../../../../menu/html/mut_mode.HTM","",retPara);//20020731 m.n ディレクトリを1階層up
	window.open(MainFilePath + "/mut3/menu/html/mut_mode.HTM","",retPara);
//<==2002/08/06 m.n 
	return;
}

//****************************************************************20050815/20051130
function enlarge(image_f)
{
	// @dvdsmpsn 
	window.open(image_f);
	
	
	// CheckActiveX();
	// if( CheckActiveXFlg == "OK" ) {
	// 	SetMainFilePath();
	// 	if( MainFilePath == "" ) {
	// 		enlarge_pc(image_f);
	// 	}else{
	// 		CheckAccess();
	// 		if( CheckAccessFlg == "OK" ) {
	// 			enlarge_mut3(image_f);
	// 		}else{
	// 			enlarge_pc_not_admin(image_f);
	// 		}
	// 	}
	// }else{
	// 		enlarge_pc_not_admin(image_f);
	// }
}

//****************************************************************
function enlarge_mut3(image_f)
{
//==本ﾌｧﾝｸｼｮﾝに　INIﾌｧｲﾙのﾃﾞｰﾀ取得及び　ﾌﾟﾘﾝﾄｽｲｯﾁの判定を追加しました　　BY 向井//==以下　2行がそうです
//
//-->2002/09/13 MainFilePathがﾌﾞﾗﾝｸだったらﾊﾟｽ名取得処理
	if( MainFilePath == "" ) {
		SetMainFilePath();
	}
//<--2002/09/13
//-->2003/11/18 MainFilePathがブランクだったらスクリプト終了
	if( MainFilePath == "" ) {
		return;
	}
//<--2003/11/18

     var P_SW = OBJ_RKKDLL.Get_Information(MainFilePath + "\\mut3\\ini\\S02MUT.INI", "ENV", "PRT_SW", "");

	if(P_SW == "1"){
		return;
	}

	// Get File Path
//==>2001/09/07 update m.n
//	var curpath = parent.main.location.pathname;
	var curpath = self.location.pathname;
//<==2001/09/07 update m.n
	var iPos = curpath.lastIndexOf("\\");
	var curfd = curpath.substr(1,iPos);	
	// File Check for ImageHTML
//	var fso = new ActiveXObject("Scripting.FileSystemObject");
//	alert("check point through");
//	if(fso.FileExists("ImgMain.HTM")){
//		fso.DeleteFile("ImgMain.HTM",true);
//	}

//	var imgf = fso.CreateTextFile(curfd + "ImgMain.HTM");
	
//	imgf.WriteLine("<HTML><BODY><P>");
//	imgf.WriteLine("<IMG SRC = '" + image_f + "'><P>");
//	imgf.WriteLine("</BODY></HTML>");
//	imgf.Close();

//	alert(curfd);
//********** 画面ｻｲｽﾞを100として表示する方法 ***********
//	Zoom = 25;
//	OBJ_RKKDLL.Make_ImgHtm(curfd,image_f,Zoom);
//******************************************************
//********** 画像ｻｲｽﾞを100として表示する方法 ***********
	iPos = image_f.lastIndexOf("/",image_f.length-2);
	var imgfl1 = image_f.substr(iPos+1,image_f.length - iPos);
	var imgfl2;

	var imgh = 0;
	var imgw = 0;
//==>2001/09/07 update m.n
//	for(i=0;i<parent.main.document.images.length;i++){
//		imgfl = parent.main.document.images[i].src;
	for(i=0;i<self.document.images.length;i++){
		imgfl = self.document.images[i].src;
//<==2001/09/07 update m.n
		iPos = imgfl.lastIndexOf("/",imgfl.length-2);
		imgfl2 = imgfl.substr(iPos+1,imgfl.length-iPos);
		if(imgfl1==imgfl2){
//==>2001/09/07 update m.n
//			ImgHeight = parent.main.document.images[i].height;
//			ImgWidth = parent.main.document.images[i].width;
			ImgHeight = self.document.images[i].height;
			ImgWidth = self.document.images[i].width;
//<==2001/09/07 update m.n
//			alert("ImgWidth >> " + ImgWidth);
//			alert("ImgHeight >> " + ImgHeight);
			break;
		}
	}
//	alert(curfd);
	// Get MUT3 Path(from Registry)
//----->2002/10/07
//	pKey1 = "Software\\Mmc\\Mut3\\Common\\Build";
//	pKey2 = "path";
//
//	OBJ_RKKDLL = new ActiveXObject("m03.m03");
//	ret = OBJ_RKKDLL.Get_Registry(pKey1,pKey2);
//	if(ret == ""){
//		return;
//	}
//	MainFilePath = ret;
//	if( MainFilePath == "" ) {
//		SetMainFilePath();
//	}
//	if( MainFilePath == "" ) {
//		return;
//	}
//<-----2002/10/07

	path = MainFilePath + "\\mut3\\menu";

	imgh = 0;
	imgw = 0;

	var imgfp;
//	imgfp = OBJ_RKKDLL.Make_ImgHtm3(curfd,imgfl,imgw,imgh);
//	imgfp = OBJ_RKKDLL.Make_ImgHtm4(curfd,imgfl,imgw,imgh,"");

	// *** Start ****** 2003/10/31
	// PDF/SVG Demo Version
	var imgflfull = imgfl.replace(imgfl2, imgfl1);
	imgflfull = imgflfull.replace("%20", " ");
	imgfp = OBJ_RKKDLL.Make_ImgHtm4(curfd, imgflfull, imgw, imgh, path);
	// *** End ******

//******************************************************

	var retPara;
	retPara = GetWinPara();
	ImgWnd = window.open(path+"\\Html\\03IMGPRN.HTM","",retPara);
//---------->2002/10/03 Make 03IMGPRN.htm file
//---->2002/10/11 Make_ImgHtml4内で行うためコメントに
//	Make_ImageFrame( ImgWnd, path+"\\Html\\", imgfl );
//<----2002/10/11
//<----------2002/10/03

}

//****************************************************************20050823(enlarge func for pc) 
function enlarge_pc(image_f)
{
	var path = "";
//==>2001/09/07 update m.n
	var curpath = self.location.pathname;
//<==2001/09/07 update m.n
	var iPos = curpath.lastIndexOf("\\");
	var curfd = curpath.substr(1,iPos);	

//********** 画像ｻｲｽﾞを100として表示する方法 ***********
	iPos = image_f.lastIndexOf("/",image_f.length-2);
	var imgfl1 = image_f.substr(iPos+1,image_f.length - iPos);
	var imgfl2;

	var imgh = 0;
	var imgw = 0;
//==>2001/09/07 update m.n
	for(i=0;i<self.document.images.length;i++){
		imgfl = self.document.images[i].src;
//<==2001/09/07 update m.n
		iPos = imgfl.lastIndexOf("/",imgfl.length-2);
		imgfl2 = imgfl.substr(iPos+1,imgfl.length-iPos);
		if(imgfl1==imgfl2){
//==>2001/09/07 update m.n
			ImgHeight = self.document.images[i].height;
			ImgWidth = self.document.images[i].width;
//<==2001/09/07 update m.n
			break;
		}
	}
//<-----2002/10/07

	path = GetTempFile();
	if ( path == "" ){
		return;
	}else{
	path = path + "\\mut3";
	}

	imgh = 0;
	imgw = 0;

	var imgfp;

	// *** Start ****** 2003/10/31
	// PDF/SVG Demo Version
	var imgflfull = imgfl.replace(imgfl2, imgfl1);
	imgflfull = imgflfull.replace("%20", " ");
	OBJ_RKKDLL = new ActiveXObject("m03.m03");
	imgfp = OBJ_RKKDLL.Make_ImgHtm4(curfd, imgflfull, imgw, imgh, path);
	// *** End ******

//******************************************************

	var retPara;
	retPara = GetWinPara();
	ImgWnd = window.open(path+"\\Html\\03IMGPRN.HTM","",retPara);

}

//****************************************************************20051130(enlarge func for pc by not admin user) 
function enlarge_pc_not_admin(image_f)
{
	var	retPara, new_win;
	var	new_win
	
	retPara = GetWinPara_pc();
	new_win = window.open("", "new_win", retPara);
	new_win.document.open();
	new_win.document.write("<HTML><BODY><P>");
	new_win.document.write("<FORM>");
	new_win.document.write("<INPUT TYPE='button' VALUE='CLOSE' NAME='btn_close' onclick='Javascript:top.close()'>")
	new_win.document.write("</FORM>");
	new_win.document.write("<HR><IMG SRC='" + image_f + "' width=800><P>");
	new_win.document.write("</BODY></HTML>");
	new_win.document.close();
	var i;
	for(i = 0; i < new_win.document.images.length; i++){
		new_win.document.images[i].galleryImg = 'no';
	}
}

//****************************************************************
function GetWinPara()
{
     var w0;
     var h0;
     var  StrParam;

     w0 = screen.availWidth - 10;
     h0 = screen.availHeight - 28;

     StrParam = "top = 0, left = 0, width = " + w0 + ", height = " + h0 + ", directories = no, ";
     StrParam = StrParam + "location = no, menubar = no, scrollbars = no, status = no, ";
     StrParam = StrParam + "toolbar = no, resizable = no";

     return(StrParam);
}

//****************************************************************20050815(GetWinPara func for pc) 
function GetWinPara_pc()
{
	var w0;
	var h0;
	var  StrParam;

	w0 = screen.availWidth - 10;
	h0 = screen.availHeight - 120;

	//Browser Check
	if(navigator.appName.substr(0, 1) == "M"){
		//Microsoft Internet Explorer
		StrParam = "top = 0, left = 0, width = " + w0 + ", height = " + h0 + ", directories = no, ";
		StrParam = StrParam + "location = no, menubar = yes, scrollbars = yes, status = no, ";
		StrParam = StrParam + "toolbar = yes, resizable = yes";
	} else {
		//Netscape 
		StrParam = "top=0,left=0,Width=" + w0 + ",Height=" + h0 + ",directories=no,";
		StrParam = StrParam + "location=no,menubar=yes,scrollbars=yes,status=no,";
		StrParam = StrParam + "toolbar=Yes,resizable=yes";
	}

	return(StrParam);
}

//****************************************************************20050815
function SetCharset()
{
var cstr 
	cstr = unescape(document.cookie);
	if( cstr == "SMVCD=1" ) {
		SetCharset_pc();
	}
	else{
		SetCharset_mut3();
	}
}

//****************************************************************
function SetCharset_mut3()
{
	var i;
	for(i = 0; i < window.document.images.length; i++){
		window.document.images[i].galleryImg = 'no';
	}
	// Display ID
	var myname = self.name;
//	alert(myname);
//	if(myname = 'main'){
//		DispID();//20020731 m.n タイトルFrame削除
//	}

	var	pKey1 = "";
	var	pKey2 = "";
	var 	ret = "";
	
	MainFilePath = "";
	LangID = "";

	// Get MUT3 Path(from Registry)
//-->2002/09/13 MainFilePathﾊﾟｽ名取得処理関数化
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


//-->2002/09/24 LangID取得処理関数化
//	// Get LanguageID(from Vhicle.dat)
//	ret = "";
//	ret = OBJ_RKKDLL.Get_Information(MainFilePath + "\\mut3\\Temp\\Vehicle.dat","ENV","LANGUAGEID","");
//	if(ret == ""){
//		return;
//	}
//	LangID = ret;
	SetLangID();
//==>2002/09/25
	if(LangID == ""){
		return;
	}
//<==2002/09/25
//<--2002/09/24
	// Get Character Code(from Registry)
	ret = "";
	pKey1 = "Software\\Mmc\\Mut3\\Mut\\App\\Language";
	pKey2 = LangID;
	ret = OBJ_RKKDLL.Get_Registry(pKey1,pKey2);
	if(ret == ""){
		return;
	}

	//Set Charcter Code
//	alert(ret);
	window.document.charset = ret;
	window.resizeBy(1,0);	// for 


}

//****************************************************************20050815(SetCharset func for pc) 
function SetCharset_pc()
{
	var i;
	for(i = 0; i < window.document.images.length; i++){
		window.document.images[i].galleryImg = 'no';
	}
}

//Right-clicking prohibition
if(document.all){      // DHTML/IE?
   document.onmousedown = myEventIE ;
}
if(document.layers){   // DHTML/NN?
   document.captureEvents(Event.MOUSEDOWN);
   document.onmousedown = myEventNN ;
}

function myEventIE(){         // Right-click on IE
   if(event.button == 2){     // Right-click?
//      alert("Right-clicking prohibition"); //2001/11/26
//---------------->20020924
////-------------->20020820 
////	alert("右クリックは無効です");
//	var htmlpath = parent.main.location.href;
//	var iPos = htmlpath.lastIndexOf(".");
//	if( htmlpath.substr(iPos-3,3) == "JPN" ){
//	      alert("右クリックは無効です");
//	}
//	else{
//	      alert("Right-clicking prohibition");
//	}
//
//   }
//<--------------20020820 
		if( LangID == "" ) {
			SetLangID();
		}
		if( LangID == "J" ) {
	    	alert("右クリックは無効です");
		}
		else{
	    	alert("Right-clicking prohibition");
		}
    }
//<----------------20020924
}

function myEventNN(myEvent){  // Right-click on NN
   if(myEvent.which == 3){    // Right-click?
//      alert("Right-clicking prohibition"); //2001/11/26 M.N comment out
//---------------->20020924
////-------------->20020820 
////	alert("右クリックは無効です");
//		var htmlpath = parent.main.location.href;
//		var iPos = htmlpath.lastIndexOf(".");
//	 	if( htmlpath.substr(iPos-3,3) == "JPN" ){
//			alert("右クリックは無効です");
//		}
//		else{
//	      alert("Right-clicking prohibition");
//		}
////<--------------20020820       
		if( LangID == "" ) {
			SetLangID();
		}
		if( LangID == "J" ) {
	    	alert("右クリックは無効です");
		}
		else{
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

function Scroll(mode){

	cx = parent.main.document.body.scrollLeft;
	cy = parent.main.document.body.scrollTop;
	// フレームサイズにより、スクロール量を調整する
	if(mode == 1|mode == 2){
		mp = parent.main.document.body.clientWidth / 2;
	}
	else{
		mp = parent.main.document.body.clientHeight / 2;
	}
//	alert("X位置 >> " + cx);
//	alert("Y位置 >> " + cy);
//	alert("移動量 >> " + mp);

	//* Left
	if(mode == 1){
		cx = cx - mp;
		if(cx < 0){
			cx = 0;
		}
	}
	//* Right
	if(mode == 2){
		cx = cx + mp;
		if(cx < 0){
			cx = 0;
		}
	}
	//* Up
	if(mode == 3){
		cy = cy - mp;
		if(cy < 0){
			cy = 0;
		}
	}
	//* Down
	if(mode == 4){
		cy = cy + mp;
		if(cy < 0){
			cy = 0;
		}
	}

	parent.main.scroll(cx,cy);
}

//PrintImage(PNG)
function PrintImage(){

// *** ↓ IE4.0では動くが、IE5.5では動作せず
//	var WebBrowser = '<OBJECT ID="WebBrowser1" WIDTH=0 HEIGHT=0 CLASSID="CLSID:8856F961-340A-11D0-A96B-00C04FD705A2"></OBJECT>';
//    	document.body.insertAdjacentHTML('beforeEnd', WebBrowser);
//    	WebBrowser1.ExecWB(6, 2);
// ***********************

// *** ↓ RKK 提供 ｻﾝﾌﾟﾙより引用
//	OBJ_RKKDLL.Prn_Screen(1,1);	
// ***********************


// ***** START SAMPLE *****
//	parent.main.print();		// ｻﾝﾌﾟﾙです 	'01/05/16 ※ PrintDialogが出てしまいますが...
//	parent <--- 親ﾌﾚｰﾑｵﾌﾞｼﾞｪｸﾄ
//	main   <--- 子ﾌﾚｰﾑ名
//	ﾌﾚｰﾑに対してprint()ﾒｿｯﾄﾞを発行するやり方ですが、このやり方だとﾌﾟﾘﾝﾄﾀﾞｲｱﾛｸﾞが出力されてしまいます。	
// ************************

//==>20020820 m.n 印刷ダイアログ復活のため修正
//	var prnfl = parent.main.location.href;
//	alert(prnfl);
//	var fname = prnfl.substr(8,prnfl.length);
//	alert(fname);
//	OBJ_RKKDLL.Prn_Image(fname);	// '01/05/18 現行版

//==>20020930 m.n 印刷ダイアログの「選択したフレームを…」が画像になるよう修正
	parent.main.focus();
//<==20020930 m.n
	parent.main.print();

//<==20020820 m.n ダイアログ復活

}

// Close Button
function CloseWin(){
	
//	alert(parent.location.href);
	parent.close();

}

//****************************************************************20050815
function JumpPage(filename)
{
	// // @dvdsmpsn - didn't work - need to find the relavive path, which is somewhere else.
	filename = filename.replace('.HTM','.htm');
	console.log(' ++ ' + filename, window.location);
	window.location.href = filename;
	
	
	
// var cstr
// 	cstr = unescape(document.cookie);
// 	if( cstr == "SMVCD=1" ) {
// 		JumpPage_pc(file);
// 	}
// 	else{
// 		JumpPage_mut3(file);
// 	}
}

//JumpPage
function JumpPage_mut3(file){
     var  HTML_DIR  = "Html\\";
     var  MENU_DIR  = "Menu\\"

     // Input S02MUT.INI '01/05/16 update

//-->2002/09/13 MainFilePathがﾌﾞﾗﾝｸだったらﾊﾟｽ名取得処理
	if( MainFilePath == "" ) {
		SetMainFilePath();
	}
//<--2002/09/13
	var mode = OBJ_RKKDLL.Get_Information(MainFilePath + "\\mut3\\ini\\S02MUT.INI", "ENV", "MODE", "");
//==>20020910 RKK & MCOR
	var P_SW = OBJ_RKKDLL.Get_Information(MainFilePath + "\\mut3\\ini\\S02MUT.INI", "ENV", "PRT_SW", "");
//<==20020910 RKK & MCOR

     // 01/11/12 update
	if(mode == "S"){
//-----------------------------------------------------------alert("viewer mode");
//==>20020910 RKK & MCOR
		if(P_SW != "1"){
//<==20020910 RKK & MCOR

			var infoid = file.substring(0,file.length - 4)
			ret = OBJ_RKKDLL.Set_Information(MainFilePath + "\\mut3\\ini\\S02MUT.INI","ENV","NEXT_INFO", infoid);

			var htmpath = OBJ_RKKDLL.Get_Information(MainFilePath + "\\mut3\\ini\\S02MUT.INI", "ENV", "S_PATH2", "");
//			self.location.href = htmpath + "\\" + file;
//-->20021009 RKK
//			self.location.href = htmpath + file;
//<--20021009 RKK

			var h_file ="S150000000_F00.HTM";
			top.location.replace(MainFilePath + "\\mut3\\" + MENU_DIR + HTML_DIR + h_file );

//==>20020910 RKK & MCOR
		}
//<==20020910 RKK & MCOR
	}
	else{
//-----------------------------------------------------------alert("mut-3 mode");
//	2003/01/29 listname.ini廃止。
//			　 過去のSourceは2002/10/11付けscript参照
//             分割ﾌｧｲﾙの有無をﾁｪｯｸ（CheckFileExist）。有→分割用、無→Viewer用
//	2003/02/06 listname.ini処理関数化して復活。使用は未定
//             page遷移時ｸﾞﾙｰﾌﾟが変わったらﾒｯｾｰｼﾞ表示
//
		var spath = parent.main.location.href;				//DLL用ﾊﾟｽ名
		var grpdir = file.substr(2, 2);						//次ﾍﾟｰｼﾞHTMLｸﾞﾙｰﾌﾟ名（ｻﾌﾞﾃﾞｨﾚｸﾄﾘ）
		var ipos;											//検索位置
		var repflg = 1;										//置換ﾙｰﾌﾟ終了ﾌﾗｸﾞ
		var htmlpath = "../../" + grpdir + "/html/";		//HTMLﾊﾟｽ名
		var myfilename = "";								//自身のﾌｧｲﾙ名
		var orgfile = file;									//ｵﾘｼﾞﾅﾙﾌｧｲﾙ名
		var sptfile = "";									//分割ﾌｧｲﾙ名
		var opnfile = "";									//次のﾌｧｲﾙ名

//　ｶﾚﾝﾄHTMLﾌｧｲﾙ名取得
		var mainfl = parent.main.location.href;
//		var list = CheckListName(mainfl);					//一覧表ﾁｪｯｸが必要なときはｺﾒﾝﾄはずす
		ipos = mainfl.lastIndexOf("/");
		myfilename = mainfl.substr(ipos+1,mainfl.length-ipos);
//  ﾒｲﾝｸﾞﾙｰﾌﾟIDﾁｪｯｸ
		if( grpdir != myfilename.substr(2,2)) {
		//groupが違う
			switch( grpdir ) {
			case "13"	:
			case "23"	:
			case "27"	: //20030422 追加 m.n マルチセレクト<4WD>
			case "35"	:
			case "37"	:
			case "42"	: //20040726 追加 H.K パワーゲート
			case "52"	:
			case "54"	:
			case "55"	:
				if( LangID == "J" ) {
					alert("他グループの整備解説書を表示します。\nデータ取得をする場合はMUT-IIIの\n選択システムを変更してください。");
				}
				//==>20030526 m.n 英語メッセージ追加（暫定対策のはずなのに英語も？）
				else{
					alert("Other system's troubleshooting will be displayed.\nIf getting data, change selected system.");
				}
				//<==20030526 m.n
				break;
			default :
				break;
			}
		}
//	HTMLﾌｧｲﾙﾊﾟｽ名取得
		ipos = spath.lastIndexOf("/");
		spath = spath.substr(8,ipos -8);
		ipos = spath.length;
//	年式までのﾊﾟｽ名に編集
		for( var i=1; i<3; i++)
		{
			ipos = spath.lastIndexOf("/",ipos);
			ipos--;
		} 
		spath = spath.substr(0,ipos+1);
//	"/"→"\\"に置換（DLL用）
		while(repflg > 0){
			if(spath.indexOf("/") == -1){
				repflg = 0;
			}
			spath = spath.replace("/","\\");
		}
		spath = spath + "\\" + grpdir + "\\html";
//  分割ﾌｧｲﾙ名編集
		ipos = file.lastIndexOf(".");
		sptfile = file.substr(0,ipos) + "_01_00.HTM";
//  分割ﾌｧｲﾙ存在ﾁｪｯｸ
		var ret;
		var openmode;
	    openmode =  OBJ_RKKDLL.Check_FileExist(spath, sptfile);
		if( openmode == 0 ) {
		//分割ﾌｧｲﾙあり
			opnfile = htmlpath + sptfile;
		}
		else {
		//分割ﾌｧｲﾙなし
			opnfile = htmlpath + orgfile;
		}
//	画面遷移
		location.href= opnfile; 
	}
}

//****************************************************************20050815(JumpPage func for pc) 
function JumpPage_pc(file){
	var	CodeDir;
	
	CodeDir = file.substr(2, 2);
//==>2002/08/02 m.n コンバータ適用後、このコードを復活させる
//	parent.location.href= "../../" + CodeDir + "/html/" + file; 
	location.href= "../../" + CodeDir + "/html/" + file; 
//	location.href= file; 

}

//==>20030421 m.n 関数追加ここから
//            故障診断時(MUTモードの時)
//            page遷移時サブグループが変わっても警告メッセージ表示するための専用関数です。
//            使用方法は当面HTML側を手修正して本関数名を呼ぶように対応します(暫定仕様とのこと)
//            JumpPage()をコピーし作成していますがメンテナンス性を考慮し制御構造を変えていません。
//            変更箇所はメイングループチェックをはずし必ず警告メッセージ表示するようにしたことです。
//JumpPage2
function JumpPage2(file){
     var  HTML_DIR  = "Html\\";
     var  MENU_DIR  = "Menu\\"

     // Input S02MUT.INI '01/05/16 update

//-->2002/09/13 MainFilePathがﾌﾞﾗﾝｸだったらﾊﾟｽ名取得処理
	if( MainFilePath == "" ) {
		SetMainFilePath();
	}
//<--2002/09/13
	var mode = OBJ_RKKDLL.Get_Information(MainFilePath + "\\mut3\\ini\\S02MUT.INI", "ENV", "MODE", "");
//==>20020910 RKK & MCOR
	var P_SW = OBJ_RKKDLL.Get_Information(MainFilePath + "\\mut3\\ini\\S02MUT.INI", "ENV", "PRT_SW", "");
//<==20020910 RKK & MCOR

     // 01/11/12 update
	if(mode == "S"){
//-----------------------------------------------------------alert("viewer mode");
//==>20020910 RKK & MCOR
		if(P_SW != "1"){
//<==20020910 RKK & MCOR

			var infoid = file.substring(0,file.length - 4)
			ret = OBJ_RKKDLL.Set_Information(MainFilePath + "\\mut3\\ini\\S02MUT.INI","ENV","NEXT_INFO", infoid);

			var htmpath = OBJ_RKKDLL.Get_Information(MainFilePath + "\\mut3\\ini\\S02MUT.INI", "ENV", "S_PATH2", "");
//			self.location.href = htmpath + "\\" + file;
//-->20021009 RKK
//			self.location.href = htmpath + file;
//<--20021009 RKK

			var h_file ="S150000000_F00.HTM";
			top.location.replace(MainFilePath + "\\mut3\\" + MENU_DIR + HTML_DIR + h_file );

//==>20020910 RKK & MCOR
		}
//<==20020910 RKK & MCOR
	}
	else{
//-----------------------------------------------------------alert("mut-3 mode");
//	2003/01/29 listname.ini廃止。
//			　 過去のSourceは2002/10/11付けscript参照
//             分割ﾌｧｲﾙの有無をﾁｪｯｸ（CheckFileExist）。有→分割用、無→Viewer用
//	2003/02/06 listname.ini処理関数化して復活。使用は未定
//             page遷移時ｸﾞﾙｰﾌﾟが変わったらﾒｯｾｰｼﾞ表示
//
		var spath = parent.main.location.href;				//DLL用ﾊﾟｽ名
		var grpdir = file.substr(2, 2);						//次ﾍﾟｰｼﾞHTMLｸﾞﾙｰﾌﾟ名（ｻﾌﾞﾃﾞｨﾚｸﾄﾘ）
		var ipos;											//検索位置
		var repflg = 1;										//置換ﾙｰﾌﾟ終了ﾌﾗｸﾞ
		var htmlpath = "../../" + grpdir + "/html/";		//HTMLﾊﾟｽ名
		var myfilename = "";								//自身のﾌｧｲﾙ名
		var orgfile = file;									//ｵﾘｼﾞﾅﾙﾌｧｲﾙ名
		var sptfile = "";									//分割ﾌｧｲﾙ名
		var opnfile = "";									//次のﾌｧｲﾙ名

//　ｶﾚﾝﾄHTMLﾌｧｲﾙ名取得
		var mainfl = parent.main.location.href;
//		var list = CheckListName(mainfl);					//一覧表ﾁｪｯｸが必要なときはｺﾒﾝﾄはずす
		ipos = mainfl.lastIndexOf("/");
		myfilename = mainfl.substr(ipos+1,mainfl.length-ipos);
//  ﾒｲﾝｸﾞﾙｰﾌﾟIDﾁｪｯｸ
//		if( grpdir != myfilename.substr(2,2)) {
		//groupが違う
			switch( grpdir ) {
			case "13"	:
			case "23"	:
			case "27"	: //20030422 追加 m.n マルチセレクト<4WD>
			case "35"	:
			case "37"	:
			case "42"	: //20040726 追加 H.K パワーゲート
			case "52"	:
			case "54"	:
			case "55" 	:
				if( LangID == "J" ) {
					alert("他グループの整備解説書を表示します。\nデータ取得をする場合はMUT-IIIの\n選択システムを変更してください。");
				}
				//==>20030526 m.n 英語メッセージ追加（暫定対策のはずなのに英語も？）
				else{
					alert("Other system's troubleshooting will be displayed.\nIf getting data, change selected system.");
				}
				//<==20030526 m.n
				break;
			default :
				break;
			}
//		}
//	HTMLﾌｧｲﾙﾊﾟｽ名取得
		ipos = spath.lastIndexOf("/");
		spath = spath.substr(8,ipos -8);
		ipos = spath.length;
//	年式までのﾊﾟｽ名に編集
		for( var i=1; i<3; i++)
		{
			ipos = spath.lastIndexOf("/",ipos);
			ipos--;
		} 
		spath = spath.substr(0,ipos+1);
//	"/"→"\\"に置換（DLL用）
		while(repflg > 0){
			if(spath.indexOf("/") == -1){
				repflg = 0;
			}
			spath = spath.replace("/","\\");
		}
		spath = spath + "\\" + grpdir + "\\html";
//  分割ﾌｧｲﾙ名編集
		ipos = file.lastIndexOf(".");
		sptfile = file.substr(0,ipos) + "_01_00.HTM";
//  分割ﾌｧｲﾙ存在ﾁｪｯｸ
		var ret;
		var openmode;
	    openmode =  OBJ_RKKDLL.Check_FileExist(spath, sptfile);
		if( openmode == 0 ) {
		//分割ﾌｧｲﾙあり
			opnfile = htmlpath + sptfile;
		}
		else {
		//分割ﾌｧｲﾙなし
			opnfile = htmlpath + orgfile;
		}
//	画面遷移
		location.href= opnfile; 
	}
}
//<==20030421 m.n 関数追加ここまで

//---------------->	2003/02/06 add
//****************************************************************
//	iniﾌｧｲﾙﾊﾟｽ名取得
function GetInifilePath(fname, inifilename) {
	var repflg = 1;							//終了ﾌﾗｸﾞ
	var inifl = fname;
	var ipos = inifl.lastIndexOf("/");
	if( ipos == -1 ) {						
	//ﾌｧｲﾙ名のみの場合path名取得
		inifl = parent.main.location.href;
		ipos = inifl.lastIndexOf("/");
	}
	inifl = inifl.substr(8,ipos -8);
	ipos = inifl.length;
	for( var i=1; i<4; i++)
	{
		ipos = inifl.lastIndexOf("/",ipos);
		ipos--;
	} 
	inifl = inifl.substr(0,ipos+1) + "/script/" + inifilename;
	while(repflg > 0){
		if(inifl.indexOf("/") == -1){
			repflg = 0;
		}
		inifl = inifl.replace("/","\\");
	}
	return inifl;
}
//****************************************************************
//	listname.iniﾁｪｯｸ（一覧表HTMLﾁｪｯｸ）
function CheckListName(fname) {
		var ret = false;
//listname.iniﾊﾟｽ名編集
		var inifl = GetInifilePath(fname, INI_ListName);
//listname.iniﾃﾞｰﾀ取得
	//一覧表件数取得
		var filecnt = OBJ_RKKDLL.Get_Information(inifl, "LIST", "CNT", "");
		var key;
		if( filecnt == "" || filecnt == "0") {	//一覧表無し
			filecnt = 0;
			filename = new Array(filecnt);
		} else	{								//一覧表あり
			filename = new Array(filecnt - 1);
		}
	//一覧表ﾌｧｲﾙ名取得
		for(var i=0;i<=filecnt - 1;i++){
			key = "NO" + (i + 1);
			filename[i] = OBJ_RKKDLL.Get_Information(inifl, "LIST", key, "");
		}
		
//ｶﾚﾝﾄHTMLﾌｧｲﾙ名取得
		var	grpdir;							//ｸﾞﾙｰﾌﾟID
		var mainfl = fname;
		var myfilename = "";
		var ipos = mainfl.lastIndexOf("/");
		if( ipos > -1 ) {
			myfilename = mainfl.substr(ipos+1,mainfl.length-ipos);
		} else {
			myfilename = mainfl;
		}
		ipos = myfilename.indexOf(".");
		myfilename = myfilename.substr(0,ipos);
		//一覧表示かどうか
		for(i=0;i<=filecnt - 1;i++){
			if(myfilename==filename[i]){
				ret = true;
				break;
			}
		}
		return ret;

}
//<----------------	2003/02/06 add

function ImgZoom(mode){

	var img = "";
	var imgw = 0;
	var imgh = 0;
	var preZoom = 0;	
	for(var i=1;i<= parent.main.document.images.length;i++){
		if(parent.main.document.images[i-1].src != ""){
			img=parent.main.document.images[i-1].src;
			imgw = parent.main.document.images[i-1].width;
			imgh = parent.main.document.images[i-1].height;
			break;
		}
	}	

	preZoom = Zoom;
	if(mode == 0){
		Zoom = Zoom + 25;
		if(Zoom > 100){
			Zoom = 100;
		}
	}
	else{
		Zoom = Zoom - 25;
		if(Zoom < 25){
			Zoom = 25;
		}
	}

	var curpath = parent.message.location.pathname;
	var iPos = curpath.lastIndexOf("\\");
//	curpath = curpath.substr(1,iPos - 1);
//	iPos = curpath.lastIndexOf("\\");
	var curfd = curpath.substr(1,iPos);	

	var iw = Zoom * imgw / preZoom;
	var ih = Zoom * imgh / preZoom;

//	alert("Zoom >> " + Zoom);
//	alert("imgw >> " + imgw);
//	alert("imgh >> " + imgh);
//	alert("iw >> " + iw);
//	alert("ih >> " + ih);

//	OBJ_RKKDLL.Make_ImgHtm(curfd,img,Zoom);

	var imgfp;
	imgfp = OBJ_RKKDLL.Make_ImgHtm3(curfd,img,iw,ih);

//	parent.location.reload();
	parent.main.location.reload();
//	parent.title.location.reload();

}
function DispButton(mode){

	switch(mode){
		case 1:
			parent.button.location.href = "W000000000_B01.HTM";
			break;
		case 2:
			parent.button.location.href = "W000000000_B02.HTM";
			break;
	}

}

//--------------->2002/09/13 add
function SetMainFilePath(){

	var pKey1 = "Software\\Mmc\\Mut3\\Common\\Build";
	var pKey2 = "path";

	MainFilePath = "";
	OBJ_RKKDLL = new ActiveXObject("m03.m03");
	ret = OBJ_RKKDLL.Get_Registry(pKey1,pKey2);
	if(ret == ""){
		return;
	}
	MainFilePath = ret;
}
//<---------------2002/09/13 add


//--------------->2002/09/24 add
function SetLangID(){

// Get LanguageID(from Vhicle.dat)
	var ret = "";
//	var htmlpath = parent.location.href;
//	var iPos;
//	iPos =  htmlpath.lastIndexOf("S150000000_F00");
//	if( iPos > 0 ) 
//	{
		if( MainFilePath=="") 
		{
			SetMainFilePath();
		}
		ret = OBJ_RKKDLL.Get_Information(MainFilePath + "\\mut3\\Temp\\Vehicle.dat","ENV","LANGUAGEID","");
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

//--------------->2002/10/03 add  イラスト拡大Frame作成
//				  2002/10/04 拡張子はずす。イラストIDに丸括弧付加
//				  2002/10/11 mut3.dll内で行うので使用しない（ネットワークでエラーとなるため廃止）
function  Make_ImageFrame( ImgWnd, htmlpath, imgfl ) {
	//image file name get
	var imagename;
	var ipos = imgfl.lastIndexOf("/");
	imagename = imgfl.substr(ipos+1);
	ipos = imagename.lastIndexOf(".");
	imagename = imagename.substr(0,ipos);

	//write 03IMGPRN.htm
	ImgWnd.document.open();				//←ネットワーク上だとここでエラーに
	ImgWnd.document.writeln("<HTML>");
        ImgWnd.document.writeln("<HEAD>");
	ImgWnd.document.writeln("<TITLE>(" + imagename + ")</TITLE>");
	ImgWnd.document.writeln("</HEAD>");
	ImgWnd.document.writeln("<FRAMESET ROWS='*,4%,10%' FRANEBORDER='0' FRAMESPACING='1'>");
	ImgWnd.document.writeln("<FRAME NAME='main' SRC='" + htmlpath + "ImgMain.htm' SCROLLING='auto' NORESIZE>");
	ImgWnd.document.writeln("<FRAME NAME='message' SRC='" + htmlpath + "03IMGMSG.htm' SCROLLING='no' NORESIZE>");
	ImgWnd.document.writeln("<FRAME NAME='button' SRC='" + htmlpath + "03IMG_B01.htm' SCROLLING='no' NORESIZE>");
	ImgWnd.document.writeln("</FRAMESET>");
	ImgWnd.document.writeln("</HTML>");
	ImgWnd.document.close();
}
//<---------------2002/10/03 add

//****************************************************************2005/8/23 
function GetTempFile()
{
var pKey1 = "Software\\MMC\\CD";
var pKey2 = "TEMP";
var TempPath = "";

	OBJ_RKKDLL = new ActiveXObject("m03.m03");
	TempPath = OBJ_RKKDLL.Get_HURegistry(pKey1,pKey2);
	if(TempPath == ""){
		return("");
	}
	return(TempPath);
}

//****************************************************************2005/11/30
function CheckActiveX()
{
var pKey1 = "Software\\Mmc\\Mut3\\Common\\Build";
var pKey2 = "DATE";
var InstDate = "";

	CheckActiveXFlg = "OK";
	try{
		OBJ_RKKDLL = new ActiveXObject("m03.m03");
		InstDate = OBJ_RKKDLL.Get_Registry(pKey1,pKey2);
	}catch(e){
		CheckActiveXFlg = "NG";
		return(CheckActiveXFlg);
	}
	return(CheckActiveXFlg);
}

//****************************************************************2005/11/30
function CheckAccess()
{

	if( MainFilePath == "" ) {
		SetMainFilePath();
	}
	OBJ_RKKDLL = new ActiveXObject("m03.m03");
	OBJ_RKKDLL.Set_Information(MainFilePath + "\\mut3\\TEMP\\S02CHECK.DAT","ENV","STATUS", "OK");
	CheckAccessFlg = OBJ_RKKDLL.Get_Information(MainFilePath + "\\mut3\\TEMP\\S02CHECK.DAT","ENV","STATUS", "NG");
	if ( CheckAccessFlg == "OK"){
		OBJ_RKKDLL.Set_Information(MainFilePath + "\\mut3\\TEMP\\S02CHECK.DAT","ENV","STATUS", "NG");
		return(CheckAccessFlg);
	}else{
		return(CheckAccessFlg);
	}
}

