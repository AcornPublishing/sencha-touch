
var activityData = function(){
	var privateData = {};
	var publicData = {
		'intrTabCd'		: 'false',
		'listKey'		: ''
	};

	// private method

	// public method
	var _getData = function(key){
		if(key === undefined){
			return publicData;
		}else{
			return publicData[key];
		}
	};

	var _setData = function(key, val){
		if(val === undefined){
			publicData = key;
		}else{
			publicData[key] = val;
		}
	};

	var _addItems = function(key, arr){
		publicData[key] = publicData[key].concat(arr);
	};

	var _removeItem = function(key, index){
		data_public[key].splice(index, 1);
	};

	return {
		getData		: _getData,
		setData		: _setData,
		addItems	: _addItems
	};
}();

var view = function(){

	//private variable
	var $btnBack			= $("#_back");				//BACK
	var $main				= $('#_main');				//상품포탈메인버튼
	var $tabPrdcInfo		= $('#_prdcInfo');			//상품안내TAB
	var $tabPrdcRate		= $('#_prdcRate');			//금리TAB
	var $footer				= $('#footer');				//Footer

	//event handler
	(function (){

		$main.click(function(){
			IBKJS.util.sessionStorage('MS_DepositList','');
			window.location.href = 'ms0001.html';
		});

		//상단BACK버튼
		$btnBack.click(function(){
			history.go(-1);
		});

		//상품안내TAB 클릭 이벤트
		$tabPrdcInfo.live('click', function(){

			var $this = $(this);
			if($this.hasClass('on')){

			}else{
				$this.addClass('on');
				$('#_tab1').removeClass('block_none');

				//금리TAB 적용
				if(activityData.getData("intrTabCd") == "true"){
					$('#_prdcRate').removeClass('on');
					$('#_tab2').addClass('block_none');
				}
			}
			//footer셋팅
			_setFooter();

		});

		//금리TAB 클릭 이벤트
		$tabPrdcRate.live('click', function(){

			var $this = $(this);
			if($this.hasClass('on')){

			}else{
				$this.addClass('on');
				$('#_tab2').removeClass('block_none');

				//상품안내TAB 적용
				$('#_prdcInfo').removeClass('on');
				$('#_tab1').addClass('block_none');
			}
			//footer셋팅
			_setFooter();
		});
	})();

	var _setFooter = function(){
		$footer.addClass('block_none');
		$footer.removeClass('block_none');
		$.fixedToolbars.show(null, $.mobile.activePage);
		$(window).trigger('resize');
	}

	//public method
	var _init = function(){

		//activity  setting
		activityData.setData(JSON.parse(IBKJS.util.sessionStorage('MS_DepositList')));
	};

	//화면그리기
	var _setDepositDetail = function(arr){

		/********************************************
		 * 세부항목들을 조건에 맞게 동적으로 구현한다.
		 ********************************************/
		$("._prdcNm").text(arr.prdcNm);
		var newYn = arr.newYn;
		var hotYn = arr.hotYn;
		var saleYn = arr.saleYn;
		var chatYn = arr.chatYn;
		var prdcOpt1 = arr.prdcOpt1;
		var prdcOpt2 = arr.prdcOpt2;
		var prdcOpt3 = arr.prdcOpt3;
		var prdcOpt4 = arr.prdcOpt4;
		var prdcOpt5 = arr.prdcOpt5;
		var prdcOpt6 = arr.prdcOpt6;
		var prdcOpt7 = arr.prdcOpt7;
		var prdcOpt8 = arr.prdcOpt8;

		var detailIcon = "";
		if(arr.newYn == '1') 	detailIcon = detailIcon + '<em data-icon="product" class="p_icon1">NEW</em>';
		if(arr.hotYn == '1') 	detailIcon = detailIcon + '<em data-icon="product" class="p_icon2">HOT</em>';
		if(arr.chatYn == '1')	detailIcon = detailIcon + '<em data-icon="product" class="p_icon3">채팅상담</em>';
		if(arr.prdcOpt1 == 'C') detailIcon = detailIcon + '<em data-icon="product" class="p_icon4">개인</em>';
		if(arr.prdcOpt2 == 'C') detailIcon = detailIcon + '<em data-icon="product" class="p_icon5">기업</em>';
		if(arr.prdcOpt3 == 'C') detailIcon = detailIcon + '<em data-icon="product" class="p_icon6">개인사업자</em>';
		if(arr.prdcOpt4 == 'C') detailIcon = detailIcon + '<em data-icon="product" class="p_icon7">인터넷가입</em>';
		if(arr.prdcOpt5 == 'C') detailIcon = detailIcon + '<em data-icon="product" class="p_icon8">인터넷전용가입</em>';
		if(arr.prdcOpt6 == 'C') detailIcon = detailIcon + '<em data-icon="product" class="p_icon9">예금자보호</em>';
		if(arr.prdcOpt7 == 'C') detailIcon = detailIcon + '<em data-icon="product" class="p_icon10">세금우대</em>';
		if(arr.prdcOpt8 == 'C')	detailIcon = detailIcon + '<em data-icon="product" class="p_icon11">비과세</em>';
		if(arr.prdcOpt9 == 'C')	detailIcon = detailIcon + '<em data-icon="product" class="p_icon12">전화가입</em>';

		$("#_prdcBrf").html(arr.prdcBrf);
		$("._detailIcon").html(detailIcon);

		/***************************
		 * 상단항목 setting
		 ***************************/
		var inrnIntr = Number(arr.inrnIntr);
		var prnlIntrYn = Number(arr.prnlIntrYn);
		var bscIntr = Number(arr.bscIntr);
		var maxIntr = Number(arr.maxIntr);

		if(arr.prdcOpt4 == "C" || arr.prdcOp5 == "C"){

			//inrnIntr 인터넷가입금리  prnlIntrYn 우대금리여부   bscIntr 기준금리  maxIntr 최고금리
			if(String(inrnIntr) != "" & String(inrnIntr) != "0"){
				$("#inrnIntr").html("연최고 "+ String(inrnIntr) + "%");

			}else if(String(prnlIntrYn) == "1" & String(bscIntr) != "0"){
				var intr = Number((bscIntr + maxIntr).toFixed(2));
				$("#inrnIntr").html("최고 "+ String(intr) + "%");

			}else if(String(maxIntr) != "" & String(maxIntr) != "0"){
				$("#inrnIntr").html("최고 "+ String(maxIntr) + "%");

			}else if(String(bscIntr) != "" & String(bscIntr) != "0"){
				$("#inrnIntr").html("기본 "+ String(bscIntr) + "%");

			}else{
				$("#inrnIntr").html("-");
			}

		}else{

			if(String(prnlIntrYn) == "1" & String(bscIntr) != "0"){
				var intr = Number((bscIntr + maxIntr).toFixed(2));
				$("#inrnIntr").html("최고 "+ String(intr) + "%");

			}else if(String(maxIntr) != "" & String(maxIntr) != "0"){
				$("#inrnIntr").html("최고 "+ String(maxIntr) + "%");

			}else if(String(bscIntr) != "" & String(bscIntr) != "0"){
				$("#inrnIntr").html("기본 "+ String(bscIntr) + "%");
			}else{
				$("#inrnIntr").html("-");
			}
		}

		//intrTabCd=1 이면 금리탭 붙이기.
		var sHtml = "";
		if(arr.intrTabCd == "1"){
			 sHtml +='<nav>'
			 	    +'	<ul>'
			 		+'		<li class="on" id="_prdcInfo"><a rel="external" href="#">상품안내</a></li>'
			 		+'		<li id="_prdcRate"><a rel="external" href="#">금리</a></li>'
			 		+'	</ul>'
			 		+'</nav>';

			 $('#_tab').append(sHtml);
		}else{
			 sHtml +='<nav>'
			 	    +'	<ul>'
			 		+'		<li class="on" id="_prdcInfo"><a rel="external" href="#">상품안내</a></li>'
			 		+'	</ul>'
			 		+'</nav>';

			 $('#_tab').append(sHtml);
		}

		//우대금리
		var prnlIntrYn = (arr.prnlIntrYn == "1") ? "제공" : "제공하지않음" ;
		$("#prnlIntrYn").html(prnlIntrYn);

		//예금예금종류
		var prdcKnd = "";
		if(arr.prdcKnd1 == 'C') prdcKnd = prdcKnd + '<em>일시예치식</em>';
		else if(arr.prdcKnd2 == 'C') prdcKnd = prdcKnd + '<em>정액적립식</em>';
		else if(arr.prdcKnd3 == 'C') prdcKnd = prdcKnd + '<em>자유적립식</em>';
		else if(arr.prdcKnd4 == 'C') prdcKnd = prdcKnd + '<em>수시입출금식</em>';
		else if(arr.prdcKnd5 == 'C') prdcKnd = prdcKnd + '<em>혼합식</em>';
		else if(arr.prdcKnd6 == 'C') prdcKnd = prdcKnd + '<em>채권</em>';
		else if(arr.prdcKnd7 == 'C') prdcKnd = prdcKnd + '<em>정기적립식</em>';
		$("#prdcKnd").html(prdcKnd);

		/***************************
		 * 상품안내 하단 상세항목 setting
		 ***************************/
		//상품특징
		if($.trim(arr.prdcChrc) != ''){
			$("._prdcChrc").html(arr.prdcChrc);
			$("._viewPrdcChrc").show();
		}
		//상품종류
		if(prdcKnd != ''){

			prdcKnd = "";
			if(arr.prdcKnd1 == 'C') prdcKnd = prdcKnd + '<em>일시예치식</em>';
			if(arr.prdcKnd2 == 'C') prdcKnd = prdcKnd + '<em>정액적립식</em>';
			if(arr.prdcKnd3 == 'C') prdcKnd = prdcKnd + '<em>자유적립식</em>';
			if(arr.prdcKnd4 == 'C') prdcKnd = prdcKnd + '<em>수시입출금식</em>';
			if(arr.prdcKnd5 == 'C') prdcKnd = prdcKnd + '<em>혼합식</em>';
			if(arr.prdcKnd6 == 'C') prdcKnd = prdcKnd + '<em>채권</em>';
			if(arr.prdcKnd7 == 'C') prdcKnd = prdcKnd + '<em>정기적립식</em>';

			$("._prdcKnd").html(prdcKnd);
			$("._viewPrdcKnd").show();
		}
		//가입금액
		if($.trim(arr.jnamt) != ''){
			$("._jnamt").html(arr.jnamt);
			$("._viewJnamt").show();
		}
		//가입기간
		if($.trim(arr.jnte) != ''){
			$("._jnte").html(arr.jnte);
			$("._viewJnte").show();
		}
		//중도해지이율
		if($.trim(arr.htfInrt) != ''){
			$("._htfInrt").html(arr.htfInrt);
			$("._viewHtfInrt").show();
		}
		//만기후이율
		if($.trim(arr.expiInrt) != ''){
			$("._expiInrt").html(arr.expiInrt);
			$("._viewExpiInrt").show();
		}
		//금리코멘트
		if($.trim(arr.intrCmnt) != ''){
			$("._intrCmnt").html(arr.intrCmnt);
			$("._viewIntrCmnt").show();
		}
		//가입대상
		if($.trim(arr.jntg) != ''){
			$("._jntg").html(arr.jntg);
			$("._viewJntg").show();
		}
		//거래방법
		if($.trim(arr.trnsWay) != ''){
			$("._trnsWay").html(arr.trnsWay);
			$("._viewTrnsWay").show();
		}
		//상품내용
		if($.trim(arr.prdcCntn) != ''){
			$("._prdcCntn").html(arr.prdcCntn);
			$("._viewPrdcCntn").show();
		}
		//세금우대혜택
		if($.trim(arr.feePrnl) != ''){
			$("._feePrnl").html(arr.feePrnl);
			$("._viewFeePrnl").show();
		}
		//이자지급방법
		if($.trim(arr.inpmtWay) != ''){
			$("._inpmtWay").html(arr.inpmtWay);
			$("._viewInpmtWay").show();
		}
		//이자지급주기
		if($.trim(arr.intsPamtCycl) != ''){
			$("._intsPamtCycl").html(arr.intsPamtCycl);
			$("._viewIntsPamtCycl").show();
		}
		//금리안내
		if($.trim(arr.intrAnno) != ''){
			$("._intrAnno").html(arr.intrAnno);
			$("._viewIntrAnno").show();
		}
		//유의사항
		if($.trim(arr.uncg) != ''){
			$("._uncg").html(arr.uncg);
			$("._viewUncg").show();
		}
		//혜택 및 부가서비스
		if($.trim(arr.prdcSvc) != ''){
			$("._prdcSvc").html(arr.prdcSvc);
			$("._viewPrdcSvc").show();
		}
		//예금자보호안내문구
		if($.trim(arr.prdcOpt6) == 'C'){
			$("._prdcOpt6").show();
		}

		/***************************
		 * 금리 하단 상세항목 setting
		 ***************************/
		if(arr.intrTabCd == "1"){
			activityData.setData('intrTabCd', 'true');

			//독도는 우리땅 통장 관련 RATE_NM4 추가
			if($.trim(arr.rateInfoNm) != ''){
				$("._rateInfoNm").html(arr.rateInfoNm);
				$("._rateInfoCntn").html(arr.rateInfoCntn);
				$("._viewRateInfoNm").show();
			}
			if($.trim(arr.rateNm) != ''){
				$("._rateNm").html(arr.rateNm);
				$("._rateCntn").html(arr.rateCntn);
				$("._viewRateNm").show();
			}
			if($.trim(arr.rateNm2) != ''){
				$("._rateNm2").html(arr.rateNm2);
				$("._rateCntn2").html(arr.rateCntn2);
				$("._viewRateNm2").show();
			}
			if($.trim(arr.rateNm3) != ''){
				$("._rateNm3").html(arr.rateNm3);
				$("._rateCntn3").html(arr.rateCntn3);
				$("._viewRateNm3").show();
			}
			if(arr.prdcCd == "PD0000000146" || arr.prdcCd == "DP0000000221" ){

				if($.trim(arr.rateNm4) != ''){
					$("._rateNm4").html(arr.rateNm4);
					$("._rateCntn4").html(arr.rateCntn4);
					$("._viewRateNm4").show();
				}
			}
		}
		setTimeout(function(){
			$footer.removeClass('block_none');
//			IBKJS.util.loadingBar(false);
			$.fixedToolbars.show(null, $.mobile.activePage);
			$(window).trigger('resize');
		},1);
	};

	//기타정보
	var _setEtcDetail = function(arr){
		var sHtml = "";
		//한행씩 반복문으로 html 동적 생성
		for(var i=0; i < arr.length ; i++){
		   sHtml +='<header><h1 data-portal="h1">'+arr[i].ttl+'</h1></header>'
				  +'	<ul data-portal="foreign-text">'
				  +'		<li>'+arr[i].cntn.replace(/\r\n/gi,'<br/>')+'</li>'
				  +'</ul>' ;
		}
		$('#_etcDetail').append(sHtml);

		if(arr.length > 0)			$('#_etcDetail').show();
	};

	//거치식 (E-끌림통장)
	var _setEdraw = function(arr,arr1,arr2){

		var sHtml = "";
		var tsDflt = "";

		//정기예금식 금리셋팅
		for(var i=0; i < arr.length ; i++){
			tsDflt +='<td>'+parseFloat(arr[i].tsDflt).toFixed(2)+'%</td>';
		}
		//자유적금식,입출금식 금리셋팅
		var freeBscIntr = "";
		var bscIntr = "";
		freeBscIntr = parseFloat(arr2[0].bscIntr).toFixed(2);
		bscIntr = parseFloat(arr1[0].bscIntr).toFixed(2);

		var date = controller.getDate();

		sHtml +='	<div data-portal="foreign-text2">('+date+' 현재) </div> '
			   +'	<table cellspacing="0" cellpadding="0" summary="메일정보">'
			   +'		<caption>메일정보</caption>	'
			   +'		<colgroup>	'
			   +'			<col width="*%%" />	'
			   +'			<col width="15%" />	'
			   +'			<col width="15%" />	'
			   +'			<col width="15%" />	'
			   +'			<col width="15%" />	'
			   +'		</colgroup>	'
			   +'		<thead>	'
			   +'			<tr>	'
			   +'				<th scope="col">구분</th>	'
			   +'				<th scope="col">1개월</th>	'
			   +'				<th scope="col">3개월</th>	'
			   +'				<th scope="col">6개월</th>	'
			   +'				<th scope="col">12개월</th>	'
			   +'			</tr>	'
			   +'		</thead>	'
			   +'		<tbody>	'
			   +'			<tr>	'
			   +'				<td>정기예금식</td>	'
			   + tsDflt
			   +'			</tr>	'
			   +'			<tr>	'
			   +'				<td>자유적금식</td>	'
			   +'				<td colspan="4">연 '+freeBscIntr+'% (1년제)</td>	'
			   +'			</tr>	'
			   +'			<tr>	'
			   +'				<td>입출금식</td>	'
			   +'				<td colspan="4">연 '+bscIntr+'% </td>	'
			   +'			</tr>	'
			   +'		</tbody>	'
			   +'	</table> ';

		$('#_rateTable').append(sHtml);
	};

	//퇴직연금정기예금
	var _setPension = function(arr,arr1){

		var sHtml = "";
		var thTitle = "";
		var fixPension = "";
		var fixPension1 = "";

		//타이틀과 확정급여형(DB) 셋팅
		for(var i=0; i < arr.length ; i++){
			var terms = "";
			if(arr[i].terms == "１개월고시"){
				terms = "1개월";
			}else if(arr[i].terms == "３개월변동"){
				terms = "3개월";
			}else{
				terms = arr[i].terms;
			}

			thTitle +='<th scope="col">'+terms+'</th>';
			fixPension +='<td>'+parseFloat(arr[i].tsDflt).toFixed(2)+'%</td>';
		}

		//확정기여형(DC)=개인퇴직계좌  셋팅
		for(var i=0; i < arr1.length ; i++){
			fixPension1 +='<td>'+parseFloat(arr1[i].tsDflt).toFixed(2)+'%</td>';
		}

		var date = controller.getDate();
		sHtml +='	<div data-portal="foreign-text2">('+date+' 현재) </div> '
			   +'	<table cellspacing="0" cellpadding="0" summary="메일정보">'
			   +'		<caption>메일정보</caption>	'
			   +'		<colgroup>	'
			   +'			<col width="*%%" />	'
			   +'			<col width="15%" />	'
			   +'			<col width="15%" />	'
			   +'			<col width="15%" />	'
			   +'			<col width="15%" />	'
			   +'			<col width="15%" />	'
			   +'			<col width="15%" />	'
			   +'		</colgroup>	'
			   +'		<thead>	'
			   +'			<tr>	'
			   +'				<th scope="col">구분</th>	'
			   + thTitle
			   +'			</tr>	'
			   +'		</thead>	'
			   +'		<tbody>	'
			   +'			<tr>	'
			   +'				<td>확정급여형(DB)</td>	'
			   + fixPension
			   +'			</tr>	'
			   +'			<tr>	'
			   +'				<td>확정기여형(DC)</td>	'
			   + fixPension1
			   +'			</tr>	'
			   +'			<tr>	'
			   +'				<td>개인퇴직계좌(IRA)</td>	'
			   + fixPension1
			   +'			</tr>	'
			   +'		</tbody>	'
			   +'	</table> '
			   +'	<div data-portal="foreign-text2">확정급여형(DB) : 예금보험료 납부 제외대상 고객  <br/>확정기여형(DC), 개인퇴직계좌(IRA) : 예금보험료 납부 고객 </div> ';

		$('#_rateTable').append(sHtml);
	};

	//회전금리
	var _setTurning = function(arr,arr1,arr2){

		var sHtml = "";
		var thTitle = "";
		var turning1 = "";
		var turning2 = "";
		var turning3 = "";

		//타이틀과 월이자지급식 셋팅
		for(var i=0; i < arr.length ; i++){
			thTitle +='<th scope="col">'+arr[i].terms+'</th>';
			turning1 +='<td>'+parseFloat(arr[i].tsDflt).toFixed(2)+'%</td>';
		}
		//회전기간이자지급식  셋팅
		for(var i=0; i < arr1.length ; i++){
			turning2 +='<td>'+parseFloat(arr1[i].tsDflt).toFixed(2)+'%</td>';
		}
		//만기일시지급식  셋팅
		for(var i=0; i < arr2.length ; i++){
			turning3 +='<td>'+parseFloat(arr2[i].tsDflt).toFixed(2)+'%</td>';
		}

		var date = controller.getDate();
		sHtml +='	<div data-portal="foreign-text2">('+date+' 현재) </div> '
			   +'	<table cellspacing="0" cellpadding="0" summary="메일정보">'
			   +'		<caption>메일정보</caption>	'
			   +'		<colgroup>	'
			   +'			<col width="*%%" />	'
			   +'			<col width="15%" />	'
			   +'			<col width="15%" />	'
			   +'			<col width="15%" />	'
			   +'			<col width="15%" />	'
			   +'			<col width="15%" />	'
			   +'		</colgroup>	'
			   +'		<thead>	'
			   +'			<tr>	'
			   +'				<th scope="col">구분</th>	'
			   + thTitle
			   +'			</tr>	'
			   +'		</thead>	'
			   +'		<tbody>	'
			   +'			<tr>	'
			   +'				<td>월이자지급식</td>	'
			   + turning1
			   +'			</tr>	'
			   +'			<tr>	'
			   +'				<td>회전기간이자지급식</td>	'
			   + turning2
			   +'			</tr>	'
			   +'			<tr>	'
			   +'				<td>만기일시지급식</td>	'
			   + turning3
			   +'			</tr>	'
			   +'		</tbody>	'
			   +'	</table> ';

		$('#_rateTable').append(sHtml);
	};

	//실세금리정기예금
	var _setInternet = function(arr){

		var sHtml = "";
		var internet = "";

		for(var i=0; i < arr.length ; i++){
			if(arr.length % 2 == 0){
				internet +='<tr>	';
				  +'	<td>'+arr[i].termCntn+'</td>';
				  +'	<td>'+arr[i].custType+'</td>';
				  +'	<td>'+parseFloat(arr[i].tsDflt).toFixed(2)+'%</td>';
				  +'</tr>';
			}
		}

		var date = controller.getDate();
		sHtml +='	<div data-portal="foreign-text2">('+date+' 현재) </div> '
			   +'	<table cellspacing="0" cellpadding="0" summary="메일정보">'
			   +'		<caption>메일정보</caption>	'
			   +'		<colgroup>	'
			   +'			<col width="*%%" />	'
			   +'			<col width="20%" />	'
			   +'			<col width="20%" />	'
			   +'		</colgroup>	'
			   +'		<thead>	'
			   +'			<tr>	'
			   +'				<th scope="col">금액/기간별 조건</th>	'
			   +'				<th scope="col">개인/법인</th>	'
			   +'				<th scope="col">금리</th>	'
			   +'			</tr>	'
			   +'		</thead>	'
			   +'		<tbody>	'
			   +'			<tr>	'
			   + internet
			   +'			</tr>	'
			   +'		</tbody>	'
			   +'	</table> ';

		$('#_rateTable').append(sHtml);
	};


	return {
		init				: _init,
		setEtcDetail		: _setEtcDetail,
		setEdraw			: _setEdraw,
		setPension			: _setPension,
		setTurning			: _setTurning,
		setInternet			: _setInternet,
		setDepositDetail	: _setDepositDetail

	};
}();
view.init();

var controller = function(){
	//private method

	//대출상세정보 SEMP 호출 후 이벤트
	var _listSuccessCallback = function(response){
		var obj = response.content;						//상세정보
		var etcArr = obj.addTextItem; 					//기타정보
		var edraw = obj.edrawInterest; 					//거치식 (E-끌림통장) 예금금리(정기예금식)
		var edraw1 = obj.edrawInterest1; 				//거치식 (E-끌림통장) 예금금리(입출금식)
		var edraw2 = obj.edrawInterest2; 				//거치식 (E-끌림통장) 예금금리(자유적금식)
		var pension = obj.pensionInterest; 				//퇴직연금 정기예금 금리(예보료제외)-확정급여형(DB)
		var pension1 = obj.pensionInterest1; 			//퇴직연금 정기예금 금리(예보료대상)-확정기여형(DC), 개인퇴직계좌(IRA) 조회
		var turning1 = obj.turningInterest1; 			//회전금리(월이자)
		var turning2 = obj.turningInterest2; 			//회전금리(회전기간)
		var turning3 = obj.turningInterest3; 			//회전금리(만기이자)
		var internet = obj.internetInterest; 			//실세금리정기예금 금리 조회

		view.setDepositDetail(obj);
		view.setEtcDetail(etcArr);

		if(obj.prdcCd=="PD0000000240"||obj.prdcCd=="PD0000000241"||obj.prdcCd=="PD0000000242"||obj.prdcCd=="PD0000000243"){
			view.setEdraw(edraw,edraw1,edraw2);
		}else if(obj.prdcCd=="DP0000000253"){
			view.setPension(pension,pension1);
		}else if(obj.prdcCd=="DP0000000306"){
			view.setTurning(turning1,turning2,turning3);
		}
		if(obj.prdcCd=="DP0000000341"){
			if(internet.length > 0)     view.setInternet(internet);
		}
	};

    var _listErrorCallback = function(errorCode, errorMsg){
		IBKJS.util.loadingBar(false);
        IBKJS.util.alert(errorCode + ":" + errorMsg , "알림");
//      window.location.href = 'ms0001.html';
        IBKJS.histories.movePrevious();
    };

	var _ajaxErrorCallback = function(){
		IBKJS.util.loadingBar(false);
        IBKJS.util.alert(errorCode + ":" + "잠시 후 다시 시도해 주세요" , "알림");
//        window.location.href = 'ms0001.html';
        IBKJS.histories.movePrevious();
	};

	var _ajaxCompleteCallback = function(){
//		$.mobile.pageLoading(true);
		IBKJS.util.loadingBar(false);
	};

	//상세정보조회
	var _getDepositDetail = function(){
		var commonParam = {"svcCode" : "MSDepositDetail",	"screenId" : "ms0102"};
		var contentParam = {"prdcCd":activityData.getData('listKey')};

		IBKJS.util.loadingBar(true, {title:"로딩중입니다", content:"Loading...."});	//Loading
		IBKJS.semp.request(commonParam, contentParam
				, function(response){_listSuccessCallback(response);}
		  		, function(errorCode, errorMsg){_listErrorCallback(errorCode, errorMsg);}
				, function(errorCode){_ajaxErrorCallback(errorCode);}
				, function(){_ajaxCompleteCallback();
		});
	}
	//public method
	var _init = function(){
		_getDepositDetail();
	};


	var _getDate = function(){

		var now = new Date();

	    var year= now.getFullYear();
	    var mon = (now.getMonth()+1)>9 ? ''+(now.getMonth()+1) : '0'+(now.getMonth()+1);
	    var day = now.getDate()>9 ? ''+now.getDate() : '0'+now.getDate();

	    var date = year + '-' + mon + '-' + day;
	    return date;
	};

	return {
		init		: _init,
		getDate		: _getDate
	};
}();
controller.init();