/**

 * 공통 javascript

 *

 * @author  Haejeon Lee (leehj@onycom.com)

 * @version 0.2

 * @date    2011/06/09

**/


if (undefined === window.jQuery) {
    alert('jQuery가 로드되어 있어야 합니다.');
}

(function(){
	$(document).ready( function() {
		console.log('document ready');
	});

	$(window).load( function() {
		console.log('window load');
	});

	$(document).bind('pagebeforeshow', function() {
		console.log('page before show');
	});

	$(document).bind('pagebeforehide', function() {
		console.log('page before hide');
	});

	$(document).bind('pageshow', function() {
		console.log('page show');
	});

	$(document).bind('pagehide', function() {
		console.log('page hide');
	});

	$(document).bind('pagebeforecreate', function() {
		console.log('page before create');
	});

	$(document).bind('pagecreate', function() {
		console.log('page create');
	});
})();

// release 시 삭제할 내용
var isDev = true;

function isMobile(){
	var mobileCheckArr = ['samsung', 'iphone', 'ipod', 'ipad', 'blackberry', 'android', 'windows ce', 'lg', 'mot', 'sonyericsson'];
	for(var i=0; i<mobileCheckArr.length; i++){
		if(navigator.userAgent.toLowerCase().match(mobileCheckArr[i]) != null){
			return true;
		}
	}
	return false;
}

//수지센터 개발서버
var sempIp = "192.168.224.70";	
var sempPort = "5402";
var attachIp = '192.168.224.68';
var attachPort = '8002';

//운영서버
//var sempIp = "192.168.6.12";
//var sempPort = "5442";
//var attachIp = '192.168.6.13';
//var attachPort = '8002';


var IBKJS = function(){
	var _hybrid = function(){
		// private variable

		// private method
		var _deviceInfo = function(){
			var deviceInfoObj = {
				osInformation : '',
				uuid : '',
				phoneNumber : '',
				modelInfo : '',
				ownerInfo : '',
				imei : '',
				actualWidth : '',
				actualHeight : '',
				actualStatusBarHeight : ''
			};
			if(isMobile()){
				MDHInfo.Device.getDeviceInfo(
					function(deviceInfo){
						deviceInfoObj = deviceInfo;
					},
					function(error){
						console.log('error code : '+error);
					}
				);
			}

			return {
				set:function(key, val){
					if(val === undefined){
						deviceInfoObj = key;
					}
					else{
						deviceInfoObj[key] = val;
					}
				},
				get:function(key){
					return deviceInfoObj[key];
				}
			};
		}();

		var _platformInfo = function(){
			var platformInfoObj = {
				Hybrid : '',
				SEMP : '',
				Mobiledesk : '',
				Launcher : ''
			};
			if(isMobile()){
				MDHInfo.Platform.getVersions(
					function(platformInfo){
						platformInfoObj = platformInfo;
					},
					function(error){
						console.log('error code : '+error);
					}
				);
			}

			return {
				set:function(key, val){
					if(val === undefined){
						platformInfoObj = key;
					}
					else{
						platformInfoObj[key] = val;
					}
				},
				get:function(key){
					return platformInfoObj[key];
				}
			};
		}();

		var _csError = function(errorCode, errorCallback){
			switch(errorCode){
				case '-10001' :
					alert('올바른 전화번호가 아닙니다.');
					break;
				case '-10200' :
					alert('SIM이 삽입되어 있지 않습니다.');
					break;
				case '-10201' :
					alert('현재 비행기 모드입니다.');
					break;
				case '-10202' :
					alert('통화중입니다.');
					break;
				default :
					alert('시스템에 오류가 발생하였습니다. 관리자에게 문의 바랍니다.');
					break;
			}
			errorCallback(errorCode);
		};

		var _checkStr = function(val){
			return val ? val : '';
		};

		// public method
		var _getTrxNo = function(){
			if(!window.sessionStorage['trxNo']){
				var trxNo;
				var d = new Date();
				var timeStamp = convert(d.getFullYear())+
				convert(d.getMonth() + 1)+
				convert(d.getDate())+
				convert(d.getHours())+
				convert(d.getMinutes())+
				convert(d.getSeconds()) + "0001";
				
				function convert(n, digits) {
					n = n.toString();
					if(n.length > 2){
						n = n.substr(n.length-2, 2);
					} else if(n.length == 1){
						n = "0" + n;
					}
					return n;
				}
				
				window.sessionStorage['trxNo'] = timeStamp;
			}
			// TODO Iphone용 고유 식별값 정의 필요
			trxNo = _getMobileNo() + window.sessionStorage['trxNo'];
			window.sessionStorage['trxNo'] = Number(window.sessionStorage['trxNo']) + 1;

			return trxNo; 
		};

		var _getId = function(){
			var id = window.sessionStorage['sabun'] || /* temp test id */ '22120';
			return id;
		};
		
		//jbclCd : 직급코드
		var _getJbclCd = function(){
			return _getSsoData("jbclCd");
		};
		
		//jrsdHdqrCd : 관할부점코드
		var _getJrsdHdqrCd = function(){
			return _getSsoData("jrsdHdqrCd");
		};

		//blngBrcd : 소속부점코드
		var _getBlngBrcd = function(){
			return _getSsoData("blngBrcd");
		};

		var _getChannelCode = function(){
			return 'SKT';
		};
		
		/*
		Function: IBKJS.hybrid.getSsoData
			Hybrid SSO에 저장된 Data를 얻어 온다. 

		Parameter:
			- key [String] - 지정된 Key만 사용가능 

		Returns:
			- key matching Data [String] - key에 해당되는 SSO의 Data 값

		Examples:
			:   > IBKJS.hybrid.getSsoData('emNo');
			
		Notes:
			- emNo			> 직원번호	
			- emplNm		> 직원명
			- blngBrcd		> 영업점코드(부점코드)
			- jbclCd		> 직급코드
			- blngNm		> 영업점명(부점명)
			- blngTeamCd	> 소속팀코드
		*/
		
		var _getSsoData = function(key){
			var ssoDataMap;
			//if(isMobile()){
			if(false){
				MDHBasic.SSO.getInfo(
					function(ssoKeys){
						ssoDataMap = ssoKeys;
					}, 
					function(error){
						console.log('MDHBasic.SSO.getInfo error code : ' + error);
					} 
					/*,[MDHBasic.SSO.EMNO, MDHBasic.SSO.EMPLNM, MDHBasic.SSO.BLNGNM]*/
				);
				return ssoDataMap[key];
				
			} else {
				switch(key){
			        case "emNo" :
			        	return "057727";
			          break;
			        case "emplNm" :
			        	return "손이슬";
			          break;
			        case "blngBrcd" :
			        	return "0529";
			          break;
			        case "jbclCd" :
			        	return "0";
			          break;
			        case "blngNm" :
			        	return "서산";
			          break;
			        case "blngTeamCd" :
			        	return "0529";
			          break;
			        default :
			          return null;
				}
			}
		};
		
		// For Test
		var _getSsoData2 = function(){
			var ssoDataMap;
			MDHBasic.SSO.getInfo(
				function(ssoKeys){
					//ssoDataMap = ssoKeys;
					for(var key in ssoKeys){
						console.log("IBKJS.hybrid.getSsoData2() : " + "[" + key + "]"  + ssoKeys[key]);
	                }
				}, 
				function(error){
					console.log('IBKJS.hybrid.getSsoData2() error code : ' + error);
					console.log('MDHBasic.SSO.getInfo2 error code : ' + error);
				} 
				/*,[MDHBasic.SSO.EMNO, MDHBasic.SSO.EMPLNM, MDHBasic.SSO.BLNGNM]*/
			);
		};
		
		// For Test
		var _getSsoData3 = function(){
			var ssoDataMap;
			MDHBasic.SSO.getInfo(
				function(ssoKeys){
					//ssoDataMap = ssoKeys;
					for(var key in ssoKeys){
						console.log("IBKJS.hybrid.getSsoData3() : "+"["+key+"]"  + ssoKeys[key]);
	                }
				}, 
				function(error){
					console.log('IBKJS.hybrid.getSsoData3() : ' + error);
					console.log('MDHBasic.SSO.getInfo3 error code : ' + error);
				} 
				,[MDHBasic.SSO.NICKNAME, MDHBasic.SSO.FULLNAME]
			);
		};

	/*
		Function: IBKJS.hybrid.getAppVer
			Hybrid Platform 버전값

		Parameter:
			- 없음

		Returns:
			- version information [string] - Hybrid platform의 버전 값
	
		Examples:
			:   > IBKJS.hybrid.getAppVer();
			ver.1.2.1
	 */
		var _getAppVer = function(){
			return _checkStr(_platformInfo.get('Hybrid'));
		};

	/*
		Function: IBKJS.hybrid.getMobileNo
			사용자의 전화번호를 얻는다.

		Parameter:
			- 없음

		Returns:
			- phone number [string] - 해당 단말기의 전화번호 값

		Examples:
			:   > IBKJS.hybrid.getMobileNo();
			010-1234-5678

		Notes:
			- 현재 SEMP(v2.1)로는 android에서만 값을 얻을 수 있다.

		See Also:
		<IBKJS.hybrid.getMobileNm>
		<IBKJS.hybrid.getOsVer>
		<IBKJS.hybrid.getUuid>
	 */
		var _getMobileNo = function(){
			// android only
			return _checkStr(_deviceInfo.get('phoneNumber'));
		};

	/*
		Function: IBKJS.hybrid.getMobileNm
			해당 단말기의 모델 정보를 얻는다.

		Parameter:
			- 없음

		Returns:
			- model information [string] - 해당 단말기의 모델 정보

		Examples:
			:   > IBKJS.hybrid.getMobileNm();
			MC605KH

		See Also:
		<IBKJS.hybrid.getMobileNo>
		<IBKJS.hybrid.getOsVer>
		<IBKJS.hybrid.getUuid>
	 */
		var _getMobileNm = function(){
			return _checkStr(_deviceInfo.get('modelInfo'));
		};

	/*
		Function: IBKJS.hybrid.getOsVer
			해당 단말기의 OS 정보를 얻는다.

		Parameter:
			- 없음

		Returns:
			- OS information [string] - 해당 단말기의 OS 정보

		Examples:
			:   > IBKJS.hybrid.getOsVer();
			iPhone OS 4.2.1

		See Also:
		<IBKJS.hybrid.getMobileNo>
		<IBKJS.hybrid.getMobileNm>
		<IBKJS.hybrid.getUuid>
	 */
		var _getOsVer = function(){
			return _checkStr(_deviceInfo.get('osInformation'));
		};

	/*
		Function: IBKJS.hybrid.getUuid
			해당 단말기의 uuid 값을 얻는다.

		Parameter:
			- 없음

		Returns:
			- uuid [string] - 해당 단말기의 uuid 값

		Examples:
			:   > IBKJS.hybrid.getUuid();
			uuid

		Notes:
			- 현재 SEMP(v2.1)로는 IOS에서만 값을 얻을 수 있다.

		See Also:
		<IBKJS.hybrid.getMobileNo>
		<IBKJS.hybrid.getMobileNm>
		<IBKJS.hybrid.getOsVer>
	 */
		var _getUuid = function(){
			// iphone only
			return _checkStr(_deviceInfo.get('uuid'));
		};

		var _getIpAddr = function(){
			return '127.0.0.1';
		};

	/*
		Function: IBKJS.hybrid.vibrator
			단말기에 진동일 발생시킬 때 사용한다.

		Parameter:
			- duration [string] - 바이브레이션 기간

		Returns:
			- 없음

		Examples:
			:   > IBKJS.hybrid.vibrator('1');

		Notes:
			- iOS 바이브레이션 기간 지정 안 됨(대략 1초정도 바이브레이션 됨), 터치 피드백등에 사용한다.
	 */
		var _vibrator = function(val){
			MDHDevice.Vibrator.run(
				function(result){
				},
				function(error){
					console.log(error);
				},
				{duration : val}
			);
		};

	/*
		Function: IBKJS.hybrid.sendCall
			전화를 걸 때 사용한다.

		Parameter:
			- phoneNum [string] - 수신측 전화번호
			- successCallback [function] - 전화가 성공적으로 연결된 후 실행될 callback 함수.
			- errorCallback [function] - 발신이 실패했을 경우의 callback 함수.

		Returns:
			- successCallback [function] - 전화가 성공적으로 연결된 후 실행될 callback 함수.
			- errorCallback [function] - 발신이 실패했을 경우의 callback 함수.

		Examples:
			:   > IBKJS.hybrid.sendCall('010-1234-5678', function(){}, function(){});

		Notes:
			- 예상되는 오류의 경우(전화번호 체크, SIM 삽입여부, 비행기 모드, 통화중)의 경우 alert을 띄운 후 error callback이 실행된다.

		See Also:
		<IBKJS.hybrid.sendSms>
	 */
		var _sendCall = function(phoneNum, successCallback, errorCallback){
			MDHPhone.Telephony.call(successCallback, errorCallback, {phoneNumber : phoneNum});
		};

	/*
		Function: IBKJS.hybrid.sendSms
			SMS를 보낼 때 사용한다.

		Parameter:
			- param [Object] - 수신측 전화번호(array), 본문(string), 즉시 보내기 여부(boolean)
			- successCallback [function] - SMS가 성공적으로 송신된 후 실행될 callback 함수.
			- errorCallback [function] - SMS 송신이 실패했을 경우의 callback 함수.

		Returns:
			- successCallback [function] - SMS가 성공적으로 송신된 후 실행될 callback 함수.
			- errorCallback [function] - SMS 송신이 실패했을 경우의 callback 함수.

		Examples:
			:   > IBKJS.hybrid.sendSms({phoneNumber:["010-1234-5678","010-2222-2222"],message:"hello",direct:true}, function(){}, function(){});

		Notes:
			- 예상되는 오류의 경우(전화번호 체크, SIM 삽입여부, 비행기 모드, 통화중)의 경우 alert을 띄운 후 error callback이 실행된다.

		See Also:
		<IBKJS.hybrid.sendCall>
	 */
		var _sendSms = function(param, successCallback, errorCallback){
			MDHPhone.Telephony.sendSMS(successCallback, errorCallback, param);
		};

	/*
		Function: IBKJS.hybrid.viewAttachment
			첨부파일을 열 때 사용한다.

		Parameter:
			- fileAddress [string] - 첨부파일 주소
			- fileName [string] - 첨부파일 이름

		Returns:
			- 없음

		Examples:
			:   > IBKJS.hybrid.viewAttachment('http://134.102.9.109:8080/trans/a.png', 'a.png');
	 */
		var _viewAttachment = function(fileAddress, fileName){
			var _attachIp = window.sessionStorage['attachIp'] ? window.sessionStorage['attachIp'] : attachIp;
			var _attachPort = window.sessionStorage['attachPort'] ? window.sessionStorage['attachPort'] : attachPort;
			
			MDHBasic.Attachment.load(function(status){},function(error){/*alert('시스템에 문제가 발생하였습니다. 잠시 후 다시 시도해 주세요.');*/},{
				id: " ",
				password: " ",
				group: " ",
				email_address: " ",
				phonenumber: " ",
				server_address: _attachIp,
				port: _attachPort,
				file_address: fileAddress,
				file_name: fileName
			});
		};

	/*
		Function: IBKJS.hybrid.appFinish
			하이브리드 어플리케이션을 종료하는 함수.

		Parameter:
			- 없음

		Returns:
			- 없음

		Examples:
			:   > IBKJS.hybrid.appFinish();
	 */
		var _appFinish = function(){
			MDHUtil.Browser.terminateApp();
		};

		return {
			getTrxNo : _getTrxNo,
			getId : _getId,
			getChannelCode : _getChannelCode,
			getAppVer : _getAppVer,
			getMobileNo : _getMobileNo,
			getMobileNm : _getMobileNm,
			getOsVer : _getOsVer,
			getUuid : _getUuid,
			getIpAddr : _getIpAddr,
			getJbclCd : _getJbclCd,
			getJrsdHdqrCd : _getJrsdHdqrCd,
			getBlngBrcd : _getBlngBrcd,
			getSsoData : _getSsoData,
			getSsoData2 : _getSsoData2,
			getSsoData3 : _getSsoData3,
			vibrator : _vibrator,
			sendCall : _sendCall,
			sendSms : _sendSms,
			viewAttachment : _viewAttachment,
			appFinish : _appFinish
		};
	}();

	var _util = function(){
		// private variable
		var webStoragePreKey = 'IBK_mobile';
		/////////////////////////////////////////////////////////////////////////////////////////
		// storageKeyMap은 중복되지 않게 사용하며 값 앞에는 해당 업무 분류 코드를 붙이도록 한다.
		// ex)BM_folder_list -> BM_+원하는 문구
		/////////////////////////////////////////////////////////////////////////////////////////
		var storageKeyMap = {
			'index'               : 'index',
			// SNS
			'SN_Employee_List'    : 'SN_Employee_List',		//SNS 임직원 리스트 기억(업무3팀 SNS)
			'SN_profile_uid'      : 'SN_profile_uid',		//SNS 프로피일 아이디 기억(업무3팀 SNS)
			'SN_Group_List'       : 'SN_Group_List',		//SNS 그룹리스트 기억(업무3팀 SNS)
			'SN_Group_id'         : 'SN_Group_id',			//SNS 그룹아이디 기억(업무3팀 SNS)
			'SN_Group_Member'     : 'SN_Group_Member',		//SNS 그룹멤버 기억(업무3팀 SNS)
			'SN_Feed_obj' 		  : 'SN_Feed_obj',          //SNS 피드정보 기억(업무3팀 SNS)
			'SN_Feed_seq' 		  : 'SN_Feed_seq',          //SNS 피드정보 기억(업무3팀 SNS)
			'SN_TwtInfo_Param' 	  : 'SN_TwtInfo_Param',     //SNS 트윗정보(업무3팀 SNS)
			'SN_ListsInfo_Param'  : 'SN_ListsInfo_Param',   //SNS 리스트정보(업무3팀 SNS)
			'SN_ListsInfo_Info'   : 'SN_ListsInfo_Info',   //SNS 리스트정보(업무3팀 SNS)
			// 포탈
			'PT_0401_folder_name' : 'PT_0401_folder_name',	//행내메일 폴더 이름을 리스트에 넘겨줄 때(업무1팀)
			'PT_0401_mail_list'   : 'PT_0401_mail_list',	//행내메일 메일 리스트 기억(업무1팀)
			'PT_0401_mailId'      : 'PT_0401_mailId',		//행내메일 메일 아이디 넘길 때 사용(업무1팀)
			'PT_0101_list'        : 'PT_0101_list',			// 주요뉴스 리스트(업무1팀)
			'PT_0102_id'          : 'PT_0102_id',			// 주요뉴스 ID(업무1팀)
			'PT_0103_dataObj'     : 'PT_0103_dataObj',		// 선물 환율  데이타(업무1팀)
			'PT_0104_dataObj'     : 'PT_0104_dataObj',		// 환율  데이타(업무1팀)
			'PT_0105_detail'      : 'PT_0105_detail',		// 주가조회(시장동향) (업무1팀)
			'PT_0106_dataObj'     : 'PT_0106_dataObj',		// 국고채 금리  데이타(업무1팀)
			'PT_0107_list'        : 'PT_0107_list',			// 국내외 시장동향 리스트(업무1팀)
			'PT_0108_id'          : 'PT_0108_id',			// 국내외 시장동향 id(업무1팀)
			'PT_0201_detail'      : 'PT_0201_detail',		// 주가정보조회(현재가) (업무1팀)
			'PT_0203_list'        : 'PT_0203_list',			// 은행장메일 리스트(업무1팀)
			'PT_0204_id'          : 'PT_0204_id',			// 은행장메일 디테일 아이디(업무1팀)
			'PT_0205_list'        : 'PT_0205_list',			// 은행장메일 리스트(업무1팀)
			'PT_0206_id'          : 'PT_0206_id',			// 은행장메일 디테일 아이디(업무1팀)
			'PT_0207_list'        : 'PT_0207_list',			// 언론스크랩 리스트(업무1팀)
			'PT_0208_id'          : 'PT_0208_id',			// 언론스크랩 디테일 아이디(업무1팀)
			'CM_depom_knd'	      : 'CM_depom_knd',			// 공통코드(예금상품종류)
			'CM_history_storage'  : 'CM_history_storage',	// 공통 URL히스토리 데이터정보
			// CRM
			'CR_0101_enpr_list'   : 'CR_0101_enpr_list',    // 크래탑정보 기업목록 조회 항목 기억(업무2팀)
			'CR_0102_enpr_Info'   : 'CR_0102_enpr_Info',    // 크래탑정보 기업정보 항목 기억(업무2팀)
			'CR_0101_curPageCnt'  : 'CR_0101_curPageCnt',   // 크래탑정보 기업목록 페이지개수 기억(업무2팀)
			'CR_0101_searchList'  : 'CR_0101_searchList',   // list정보 세션
			'CR_0101_searchParam' : 'CR_0101_searchParam',	// param정보 세션
			'CR_0101_curPageCnt'  : 'CR_0101_curPageCnt',	//크래탑 현재페이지
			'CR_0201_list'        : 'CR_0201_list',			// 잠재고객목록 기억 (업무2팀)
			'CR_0201_search'      : 'CR_0201_search',		// 잠재고객 파라미터 기억(업무2팀)
			'CR_0201_moreList'    : 'CR_0201_moreList',		// 잠재고객  더보기 리스트  (업무2팀)
			'CR_0201_lcuno'       : 'CR_0201_lcuno',		// 잠재고객  상세이동 key (업무2팀)
			'CR_0203_list'        : 'CR_0203_list',			// 잠재고객용 상담접촉 리스트 (업무2팀)
			'CR_0203_moreList'    : 'CR_0203_moreList',		// 잠재고객용 상담접촉 더보기  (업무2팀)
			'CR_0416_searchParam' : 'CR_0416_searchParam',	// 당행고객 조회 파라미터 (업무2팀)
			'CR_0416_searchList'  : 'CR_0416_searchList',   // 당행고객 조회 리스트  (업무2팀)
			'CR_0416_moreList'    : 'CR_0416_moreList',   	// 당행고객 더보기 리스트  (업무2팀)
			'CR_0417_searchParam' : 'CR_0417_searchParam',	// 고액입출금 조회 파라미터 (업무2팀)
			'CR_0417_searchList'  : 'CR_0417_searchList',   // 고액입출금 조회 리스트  (업무2팀)
			'CR_0417_moreList'    : 'CR_0417_moreList',   	// 당행고객 더보기 리스트  (업무2팀)
			'CR_0418_searchParam' : 'CR_0418_searchParam',	// 고객기념일 조회 파라미터 (업무2팀)
			'CR_0418_searchList'  : 'CR_0418_searchList',   // 고객기념일 조회 리스트  (업무2팀)
			'CR_0418_moreList'    : 'CR_0418_moreList',   	// 당행고객 더보기 리스트  (업무2팀)
			'CR_0702_data_list'   : 'CR_0702_data_list',	// 주변고객위치list (업무2팀)
			'CR_0701_mapData'     : 'CR_0701_mapData',		// 지도정보
			'CR_1001_returnCnt'   : 'CR_1001_returnCnt', 	// 500리포트 목록 반환갯수 (업무2팀)
			'CR_1002_kor_csnm'    : 'CR_1002_kor_csnm',	 	// 500리포트 발송 한글고객명  (업무2팀)
			'CR_1002_fund_cd'     : 'CR_1002_fund_cd', 		// 500리포트 발송 펀드코드명  (업무2팀)
			'CR_1002_fund_name'   : 'CR_1002_fund_name', 	// 500리포트 발송 펀드명 (업무2팀)
			'CR_1002_elec_Mail_id': 'CR_1002_elec_Mail_id', // 500리포트 발송 펀드고객 메일주소 (업무2팀)
			'CR_1003_view_fund_cd': 'CR_1003_view_fund_cd', // 500리포트 상세 펀드코드 (업무2팀)
			'CR_0301_list'        : 'CR_0301_list',			// 전담고객 List 기억(업무2팀)
			'CR_0301_search'      : 'CR_0301_search',		// 전담고객 파라미터 기억(업무2팀)
			'CR_0301_moreList'    : 'CR_0301_moreList',		// 전담고객  더보기 리스트  (업무2팀)
			'CR_0407_list'        : 'CR_0407_list',			// 상담접촉이력 List 기억(업무2팀)
			'CR_0407_moreList'    : 'CR_0407_moreList',		// 상담접촉이력  더보기 리스트  (업무2팀)
			'CR_0410_list'        : 'CR_0410_list',			// 거래성향 List 기억(업무2팀)
			'CR_0410_moreList'    : 'CR_0410_moreList',		// 거래성향  더보기 리스트  (업무2팀)
			'CR_0413_list'        : 'CR_0413_list',			// 특이사항 List 기억(업무2팀)
			'CR_0413_moreList'    : 'CR_0413_moreList',		// 특이사항  더보기 리스트  (업무2팀)
			'CR_strWcuno'         : 'CR_strWcuno',			// 전행고객번호  (업무2팀)
			'CR_info_key'		  : 'CR_info_key',			// 고객기본정보 구분 key(업무2팀)
			'CR_cust_type'		  : 'CR_cust_type',			// 고객구분(I:개인, C:CEO, E:기업)(업무2팀)
			// 지캠프
			'GC_0351_CategoryList' : 'GC_0351_CategoryList',  // 규정세칙카테고리조회 (업무2팀)
			'GC_0352_ListSearch'   : 'GC_0352_ListSearch',  // 규정세칙내규목록조회 (업무2팀)
			'GC_0352_Param'        : 'GC_0352_Param',        // 규정세칙내규목록조회 파라미터 (업무2팀)
			'GC_0353_ArticleList'  : 'GC_0353_ArticleList',  // 규정세칙조목록조회 (업무2팀)
			'GC_0353_Param'        : 'GC_0353_Param',        // 규정세칙조목록조회 파라미터 (업무2팀)
			'GC_0354_Text'         : 'GC_0354_Text',        // 규정세칙본문조회 (업무2팀)
			'GC_0354_Param'        : 'GC_0354_Param',        // 규정세칙본문조회 파라미터 (업무2팀)
			'GC_0355_Search'       : 'GC_0355_Search',        // 규정세칙본문조회 (업무2팀)
			'GC_0355_Param'        : 'GC_0355_Param',        // 규정세칙본문조회 파라미터 (업무2팀)
			'GC_rule_tpCd'         : 'GC_rule_tpCd',        // 규정세칙내규코드 (업무2팀)
			'GC_rule_tpNm'         : 'GC_rule_tpNm',        // 규정세칙내규명 (업무2팀)
			'GC_rule_lawId'        : 'GC_rule_lawId',       // 규정세칙 법규아이디 (업무2팀)
			'GC_rule_lawNm'        : 'GC_rule_lawNm',       // 규정세칙 법규명 (업무2팀)
			'GC_rule_promNo'       : 'GC_rule_promNo',       // 규정세칙 공포번호 (업무2팀)
			'GC_rule_promDt'       : 'GC_rule_promDt',       // 규정세칙 공포일자 (업무2팀)
			'GC_rule_jjNo'         : 'GC_rule_jjNo',         // 규정세칙 장번호 (업무2팀)
			'GC_rule_joNo'         : 'GC_rule_joNo',         // 규정세칙 조번호 (업무2팀)
			'GC_rule_query'        : 'GC_rule_query',         // 규정세칙 검색어 (업무2팀)
			'GC_rule_coll'         : 'GC_rule_coll',         // 규정세칙 검색조건 (업무2팀)
			// 결재(근태,예산),알림
			'GC_0701_Apply_List'  : 'GC_0701_Apply_List',	// 근태신청목록 (업무2팀)
			'GC_0702_Appr_List'   : 'GC_0702_Appr_List',	// 근태결재목록 (업무2팀)
			'GC_0703_Detail'      : 'GC_0703_Detail',	    // 근태결재목록 (업무2팀)
			'GC_0711_Appr_List'   : 'GC_0711_Appr_List',	// 예산목록 (업무2팀)
			'GC_0712_Detail'      : 'GC_0712_Detail',	    // 예산상세내역 (업무2팀)
			'GC_0801_OpRisk_List' : 'GC_0801_OpRisk_List',	// 운영리스크목록 (업무2팀)
			'GC_AppSeq'           : 'GC_AppSeq',		    // 근태결재목록 근태일련번호 (업무2팀)
			'GC_AppBudSeq'        : 'GC_AppBudSeq',		    // 예산일련번호 (업무2팀)
			'GC_BizGu'            : 'GC_BizGu',	   	        // 목록에서 상세 이동시 사용 (R: 신청목록 , A : 결재목록)
			'GC_DetailDesc'       : 'GC_DetailDesc',	    // 운영리스크목록에서 상세 이동시 사용
			// 상품포탈
			'MS_LoanList' 		  : 'MS_LoanList',          //상품포탈(업무2팀)
			'CM_cstm_fetr' 		  : 'CM_cstm_fetr',         //공통코드-상품포탈(업무2팀)
			'CM_intr_type' 		  : 'CM_intr_type',         //공통코드-상품포탈(업무2팀)
			'CM_fnds_dscd' 		  : 'CM_fnds_dscd',         //공통코드-상품포탈(업무2팀)
			'CM_depom_knd' 		  : 'CM_depom_knd',         //공통코드-상품포탈(업무2팀)
			'CM_loanm_knd' 		  : 'CM_loanm_knd',         //공통코드-상품포탈(업무2팀)
			'MS_DepositList' 	  : 'MS_DepositList',		//대출(업무2팀)
			'MS_ForexId'		  : 'MS_ForexId',			//외화예금 ID(업무2팀)
			// 마케팅지원
			'MS_productMainList'  : 'MS_productMainList', 	//상품포탈 메인  (업무2팀)
			//직원조회
			'GC_Staff_No'  		: 'GC_Staff_No', 	//직원조회 (업무2팀)	
			'GC_Search_Gubun'   : 'GC_Search_Gubun', 	//직원조회   (업무2팀)
			'GC_Shop_No'  		: 'GC_Shop_No', 	//직원조회   (업무2팀)
			'GC_Staff_Search'   : 'GC_Staff_Search', 	//직원조회  (업무2팀)
			'GC_Page_No'   		: 'GC_Page_No', 	//직원조회  (업무2팀)
			'GC_More_List'   	: 'GC_More_List', 	//직원조회  (업무2팀)
			'GC_Shop_Gubun'   	: 'GC_Shop_Gubun', 	//직원조회  (업무2팀)
			'GC_StaffList'   	: 'GC_StaffList', 	//직원조회  (업무2팀)
			'GC_TeamCode'   	: 'GC_TeamCode' 	//직원조회  (업무2팀)
		};

		// private method
		var _localStorageCheck = function(){
			if(('localStorage' in window) && window['localStorage'] !== null){
				return true;
			}
			else{
				alert("현재 브라우저는 WebStorage를 지원하지 않습니다");
				return false;
			}
		};

		var _getTagName = function(domObj){
			return domObj.tagName.toLowerCase();
		};

		var _setTagValue = function($el, val){
			var domObj = $el[0];
			var tagName = _getTagName(domObj);
			switch(tagName){
				case 'span' :
				case 'div' :
				case 'p' :
				case 'pre' :
				case 'xmp' :
					domObj.innerHTML = val;
					break;
				case 'img' :
					if(val){
						$el.attr('src', val);
					}
					else{
						$el.hide();
					}
					break;
				case 'input' :
					if(domObj.type.toLowerCase() == 'text'){
						$el.val(val);
					}
					break;
				case 'textarea' :
					$el.html(val);
					break;
				default :
					domObj.innerHTML = val;
					break;
			}
		};

		// public method
	/*
		Function: IBKJS.util.sessionStorage
			html5의 sessionStorage 사용할 때 적용한다.

		Parameter:
			- key [string] - sessionStorage 저장할 데이터의 키값
			- value [string] - sessionStorage 해당 키값으로 저장할 데이터의 값

		Returns:
			- value [string] - value를 지정하지 않은 경우 getter로서 해당 값이 리턴된다.

		Examples:
			:   > // setter
			:   > IBKJS.util.sessionStorage('id', 'testId');
			:   > // getter
			:   > IBKJS.util.sessionStorage('id');
			testId

		Notes:
			- 다른 프로그램과의 충돌을 막기위해 키값 앞에 IBK_mobile를 자동으로 붙여준다.
			- 사용할 키값을 ibk_common.js의 storageKeyMap 변수에 먼저 선언을 해주어야 한다.(다른 값과의 충돌을 막기 위함)

		See Also:
		<IBKJS.util.localStorage>
	 */
		var _sessionStorage = function(k, value){
			var storageKeyVal = storageKeyMap[k];
			var key;
			if(storageKeyVal === undefined){
				alert('키값을 먼저 지정해 주세요. error key : '+k);
				return;
			}
			key = webStoragePreKey + storageKeyMap[k];
			if(_localStorageCheck()){
				if(_typeCheck(value, 'undefined')){
					return window.sessionStorage[key];
				}
				else{
					window.sessionStorage[key] = value;
				}
			}
		};

	/*
		Function: IBKJS.util.localStorage
			html5의 localStorage를 사용할 때 적용한다.

		Parameter:
			- key [string] - localStorage에 저장할 데이터의 키값
			- value [string] - localStorage에 해당 키값으로 저장할 데이터의 값

		Returns:
			- value [string] - value를 지정하지 않은 경우 getter로서 해당 값이 리턴된다.

		Examples:
			:   > // setter
			:   > IBKJS.util.localStorage('id', 'testId');
			:   > // getter
			:   > IBKJS.util.localStorage('id');
			testId

		Notes:
			- 다른 프로그램과의 충돌을 막기위해 키값 앞에 IBK_mobile를 자동으로 붙여준다.
			- 사용할 키값을 ibk_common.js의 storageKeyMap 변수에 먼저 선언을 해주어야 한다.(다른 값과의 충돌을 막기 위함)

		See Also:
		<IBKJS.util.sessionStorage>
	 */
		var _localStorage = function(key, value){
			var storageKeyVal = storageKeyMap[k];
			var key;
			if(storageKeyVal === undefined){
				alert('키값을 먼저 지정해 주세요. error key : '+k);
				return;
			}
			key = webStoragePreKey + storageKeyMap[k];
			if(_localStorageCheck()){
				if(_typeCheck(value, 'undefined')){
					return window.localStorage[key];
				}
				else{
					window.localStorage[key] = value;
				}
			}
		};

	/*
		Function: IBKJS.util.touchEffect
			원하는 태그에 터치 효과를 줄 때 사용한다.

		Parameter:
			- $el [object] - 적용할 DOM object를 jqeury object로 만든 값
			- activeClass [string] - 해당 태그를 눌렀을 때 적용될 css class

		Returns:
			- 없음

		Examples:
			:   > IBKJS.util.touchEffect($target, 'touch_active');

		Notes:
			- 적용될 클래스가 디폴트 값보다 우선순위가 높아야 한다.
	 */
		var _touchEffect = function($el, activeClass){
			$el.bind({
				touchstart : function(){
					$(this).addClass(activeClass);
				},
				mousedown : function(){
					$(this).addClass(activeClass);
				},
				touchend : function(){
					$(this).removeClass(activeClass);
				},
				mouseup : function(){
					$(this).removeClass(activeClass);
				}
			});
		};

	/*
		Function: IBKJS.util.setList
			html에 리스트를 적용할 경우 사용한다.

		Parameter:
			- target [object] - 적용할 리스트가 적용될 ul DOM object를 jqeury object로 만든 값
			- template [object] - 각 리스트에 적용될 li DOM object를 jqeury object로 만든 값
			- map [object] - 각 html tag와 data 쌍
			- data [object] - html에 적용할 data
			- callback [function] - 해당 함수를 진행한 후 실행할 함수.

		Returns:
			- callback [function] - 해당 함수를 진행한 후 실행할 함수.

		Examples:
			:   > // data를 설정.
			:   > var data = {'title':'제목', 'detailAuthor':'홍길동'};
			:   > // html과 data 쌍을 설정.
			:   > var map = {'#_mail_detail_title':'title', '#_mail_detail_sender':'detailAuthor'};
			:   > // 함수 요청.
			:   > IBKJS.util.setList(target, template, map, data, function(){});

		Notes:
			- 각 리스트의 데이터는 li에 dataObj 이름으로 저장된다. 원하는 값이 있을 경우 $('li').data('dataObj')로 값을 얻어 사용한다.

		See Also:
		<IBKJS.util.setHtml>
	 */
		var _setList = function(target, template, map, data, callback){
			var $target = target;
			var $template = template;
			var mapObj = map;
			var data = data;
			var $clone;
			var obj;
			var value;
			var paramCheck = true;
			paramCheck = paramCheck && _typeCheck($target, 'object', 'target');
			paramCheck = paramCheck && _typeCheck($template, 'object', 'template');
			paramCheck = paramCheck && _typeCheck(mapObj, 'object', 'map');
			paramCheck = paramCheck && _typeCheck(data, 'object', 'data');
			paramCheck = paramCheck && _typeCheck(callback, 'function', 'callback');

			if(!paramCheck){
				return;
			}

			for(var i=0; i<data.length; i++){
				obj = data[i];
				$clone = $template.clone(true).hide();
				$clone.data('dataObj', obj);
				_setHtml($clone, mapObj, obj, function(){
					$target.append($clone);
				});
			}

			setTimeout(function(){
				$target.listview('refresh');
				$($template[0].tagName.toLowerCase(), $target).show();
			},1);

			callback();
		};

	/*
		Function: IBKJS.util.setHtml
			데이터를 html에 적용할 때 사용한다.

		Parameter:
			- $el [object] - 적용할 html tag들을 포함하고 있는 DOM object를 jqeury object로 만든 값
			- mapObj [object] - 각 html tag와 data 쌍
			- dataObj [object] - html에 적용할 data
			- callback [function] - 해당 함수를 진행한 후 실행할 함수.

		Returns:
			- callback [function] - 해당 함수를 진행한 후 실행할 함수.

		Examples:
			:   > // data를 설정.
			:   > var dataObj = {'title':'제목', 'detailAuthor':'홍길동'};
			:   > // html과 data 쌍을 설정.
			:   > var mapObj = {'#_mail_detail_title':'title', '#_mail_detail_sender':'detailAuthor'};
			:   > // 함수 요청.
			:   > IBKJS.util.setHtml($detailContainer, mapObj, dataObj, function(){});

		Notes:
			- callback 함수는 생략 가능하다.

		See Also:
		<IBKJS.util.setList>
	 */
		var _setHtml = function($el, mapObj, dataObj, callback){
			var value;
			var paramCheck = true;
			paramCheck = paramCheck && _typeCheck($el, 'object', 'container');
			paramCheck = paramCheck && _typeCheck(mapObj, 'object', 'map');
			paramCheck = paramCheck && _typeCheck(dataObj, 'object', 'data');
			paramCheck = paramCheck && _typeCheck(callback, 'function', 'callback');

			if(!paramCheck){
				return;
			}

			for(var key in mapObj){
				value = dataObj[mapObj[key]];
				_setTagValue($(key, $el), value);
			}
			if(callback){
				callback();
			}
		};

	/*
		Function: IBKJS.util.typeCheck
			파라미터의 타입이 원하는 타입인지 체크할 때 사용한다.

		Parameter:
			- val [all] - 체크하고자하는 변수
			- type [stirng] - val의 예상되는 타입
			- item [string] - val의 이름

		Returns:
			- isMatch [boolean] - 체크하고자하는 변수와 예상값의 일치 여부

		Examples:
			:   > IBKJS.util.typeCheck(callback, 'function', 'callback');

		Notes:
			- 세번째 파라미터인 item은 사용하지 않을 수 있다.
	 */
		var _typeCheck = function(val, type, item){
			var valType = typeof(val); //number, string, boolean, object, function, undefined
			var isMatch = valType.toLowerCase() == type.toLowerCase();
			if(item != undefined && !isMatch){
				console.log(item + ' type error. ' + item + ' type is ' + valType + '. It has to be ' + type);
			}
			return isMatch;
		};

	/*
		Function: IBKJS.util.finish
			html page가 닫힐 때 실행해야 할 기능이 있을 경우 사용한다.

		Parameter:
			- callback [function] - 페이지가 닫힐 때 실행할 함수

		Returns:
			- callback [function] - 요청 시 넘겼던 callback 함수

		Examples:
			:   > IBKJS.util.finish(function(){alert('finish event');});

		Notes:
			- 동일 html file 내에서 data-role=page 속성으로 페이지가 닫히는 경우에는 사용할 수 없다.

		See Also:
		<IBKJS.util.finishOnSameHtml>
	 */
		var _finish = function(fn){
			$(window).bind('unload', fn);
		};

	/*
		Function: IBKJS.util.finishOnSameHtml
			동일 html에서 data-role=page가 닫힐 때 실행해야 할 기능이 있을 경우 사용한다.

		Parameter:
			- callback [function] - 페이지가 닫힐 때 실행할 함수

		Returns:
			- callback [function] - 요청 시 넘겼던 callback 함수

		Examples:
			:   > IBKJS.util.finishOnSameHtml(function(){alert('finish event');});

		Notes:
			- html file이 닫히는 경우에는 사용할 수 없다.

		See Also:
		<IBKJS.util.finish>
	 */
		var _finishOnSameHtml = function(fn){
			$(document).bind('pagehide', fn);
		};

	/*
		Function: IBKJS.util.log
			로그를 확인할 때 사용한다.

		Parameter:
			- val [all] - 확인하고자하는 값

		Returns:
			- 없음

		Examples:
			:   > IBKJS.util.log('test log');

		Notes:
			- isDev를 false로 설정하면 로그를 찍지 않는다.
	 */
		var _log = function(val){
			if(isDev){
				console.log(val);
			}
		};
		
	/*
		Function: IBKJS.util.loadingBar
			로딩바를 띄울때 사용한다.

		Parameter:
			- flag [boolean] - 띄울때 true, 없앨때 false
			- option [json] - {title: "title", content:"Loading..."} 
		Returns:
			- 없음

		Examples:
			:   > IBKJS.util.loadingBar(true, option) -> option은  mobile의 경우만 지원( iphone 미지원)

		Notes:
			- 모바일일때 Hybrid LoadingBar, 웹일때 jQuery Mobile LoadingBar를 표시한다.  
	 */
		var _loadingBar = function(flag, option){
			if(isMobile()){
				if(flag){
					MDHUtil.Browser.startLoadingBar(option);
				} else {
					MDHUtil.Browser.stopLoadingBar();
				}
			} else {
				if(flag){
					$.mobile.pageLoading();
				} else {
					$.mobile.pageLoading(true);
				}
			}
		};
		
		/*
		Function: IBKJS.util.chgDateDelimiter
			date format String의 구분자 를 변경한다.

		Parameter:
			- date [String] "2011.07.12" or "20110712"
			- DelimiterFormat [String] ".", "/", "-", ......
		Returns:
			- 없음

		Examples:
			:   > IBKJS.util.chgDateDelimiter(date, ".");
	    */
		var _chgDateDelimiter = function(date, delimiter){
			if(date && date.length == 10){
				return date.substr(0, 4) + delimiter + 
					   date.substr(5, 2) + delimiter + date.substr(8, 2);
			} else if(date && date.length == 8){
				return date.substr(0, 4) + delimiter + 
				   date.substr(4, 2) + delimiter + date.substr(6, 2);
				
			} else {
				return false;
			}
		};
		
		/*
		Function: IBKJS.util.chgDateDeli2Point
			date format String의 구분자 를 "."으로 변경한다.

		Parameter:
			- date [String] "2011-07-12" or "20110712"
			
		Returns:
			- changed date [String] "2011.07.12"

		Examples:
			:   > IBKJS.util.chgDateDeli2Point(date);
	    */
		var _chgDateDeli2Point = function(date){
			if(date && date.length == 10){
				return date.substr(0, 4) + "." + 
					   date.substr(5, 2) + "." + date.substr(8, 2);
			} else if(date && date.length == 8){
				return date.substr(0, 4) + "." + 
				   date.substr(4, 2) + "." + date.substr(6, 2);
			} else {
				return false;
			}
		};
		
		/*
		Function: IBKJS.util.setFooterMoreMenu
			Footer 더보기 Menu에 버튼을 추가한다. 

		Parameter:
			- jMenuData [Json Type] [{"title": "TEMP_TITLE","action" : "linkOrMethod"}...]
		Returns:
			- 없음

		Examples:
			:   > IBKJS.util.setFooterMoreMenu(jMenuData);
	   
		var _setFooterMoreMenu = function(jMenuData){
			alert("in : " + jMenuData.length + ", " + jMenuData[0].title);
			if(jMenuData){
				$('.option_menu').each(function(){
					for(var i = 0; i < jMenuData.length; i++){
					//for(var i = jMenuData.length; i == 0; i--){
						alert('li add');
						
						var contents = 
							'<li><a rel="external" href="#" ' + 
							'data-form="btn1" class="type4">' + jMenuData[i].title + '</a></li>';
						$(this).find('ul').prepend(contents);
						
					}
					
					for(var j = 0; j < jMenuData.length; j++){
					//for(var j = jMenuData.length-1; j <= 0; j--){
						
						$(this).find('li').eq(j).bind('click', function(){
						
							jMenuData[j].action();
						});
						
					}
				});
			}
		};
		*/
		
		/*
		Function: IBKJS.util.confirm
			confirm Dialog를 표시한다. 

		Parameter:
			- message [String] Confirm Dialog Message
			- title [String] Confirm Dialog title
		Returns:
			- 사용자 선택값 [Boolean]

		Examples:
			:   > IBKJS.util.confirm(message, title);
	    */
		var _confirm = function(message, title){
			return confirm(message);
		};
		
		/*
		Function: IBKJS.util.alert
			alert Dialog를 표시한다. 

		Parameter:
			- message [String] Alert Dialog Message
			- title [String] Alert Dialog title
		Returns:
			- 없음

		Examples:
			:   > IBKJS.util.alert(message, title);
	    */
		var _alert = function(message, title){
			return alert(message);
		};
		
		
		return {
			sessionStorage : _sessionStorage,
			localStorage : _localStorage,
			touchEffect : _touchEffect,
			setList : _setList,
			setHtml : _setHtml,
			typeCheck : _typeCheck,
			finish : _finish,
			finishOnSameHtml : _finishOnSameHtml,
			log : _log,
			loadingBar : _loadingBar,
			chgDateDelimiter : _chgDateDelimiter,
			chgDateDeli2Point : _chgDateDeli2Point,
			alert : _alert,
			confirm : _confirm
			//,setFooterMoreMenu : _setFooterMoreMenu
		};
	}();

	/*
	    Function: IBKJS.semp
	        인터페이스를 위한 설정 및 액션이 설정되어 있다.
			common parameter의 값을 설정하며 인터페이스의 parameter 값을 체크하여 오류가 있을 경우 console.log로 알려준다.
			PC로 ajax를 요청할 경우 _requestForPC이 실행되며 Mobile로 ajax를 요청할 경우 _requestForMobile이 실행된다.

	    Parameter:
	        - Request
	        commonParam [object] - svcCode, screenId 값을 설정 한다.
	            : svcCode: 해당 요청의 서비스코드
	            : screenId: 해당 기능의 화면아이디
	        contentParam [object] - 각 요청에 따른 content 부분을 설정한다. 값이 없을 경우 {}을 넘겨준다.
	        successCallback [function] - ajax가 성공적으로 실행되었을 경우의 callback 함수.
			errorCallback [function] - ajax가 성공이지만 request의 결과가 에러인 경우의 callback 함수.
			ajaxErrorCallback [function] - ajax가 실패했을 경우의 callback 함수.
			completeCallback [function] - success, fail에 상관없이 모든 액션이 끝난 후 실행되는 함수. 이 값은 생략될 수 있다.

	    Returns:
	        - success
			data [object] - 각 인터페이스에 따른 JSON object
			successCallback [function] - 요청 시 넘겼던 successCallback
			completeCallback [function] - 요청 시 넘겼던 completeCallback
			ajaxErrorCallback [function] - 요청 시 넘겼던 ajaxErrorCallback
	        - fail
			errorMsg[string] - 공통에서 정의한 에러 메세지
			completeCallback [function] - 요청 시 넘겼던 completeCallback

	    Examples:
	        :   > // 데모에 사용된 게시판 리스트.
			:   > // common parameter를 설정.
	        :   > var commonParam = {'svcCode' : 'DemoTcpList',	'screenId' : '0001'};
			:   > // content parameter를 설정.
	        :   > var contentParam = {'pageNo' : '1', 'listCnt' : listCnt};
			:   > // semp request 요청.
			:   > IBKJS.semp.request(commonParam, contentParam, function(response){_listSuccessCallback(response);}, function(errorCode, errorMsg){_listErrorCallback(errorCode, errorMsg);}, function(errorCode){_ajaxErrorCallback();}, function(){_ajaxCompleteCallback();});

	    Notes:
	        - uagent에 ['samsung', 'iphone', 'ipod', 'ipad', 'blackberry', 'android', 'windows ce', 'lg', 'mot', 'sonyericsson']이 포함되어 있지 않은 모바일이 생길 경우 공통팀에 변경을 요청해주세요.
	 */

	var _semp = function(){
		// private variable
		var timeout = 30000;
		var ipAddr = sempIp;
		var port = sempPort;

		// private method
		var _successCallbackAction = function(data, successCallback, errorCallback, completeCallback){
			var resCode = data.common.resCode;
			var resultObj = data.content;
			var errorCode = (resultObj.errorCode) ? resultObj.errorCode : '';
			var errorMsg = (resultObj.errorMsg) ? resultObj.errorMsg : '';

			if(resCode == '111'){
				successCallback(data);
			} else {
				if(errorCallback){
					errorCallback(errorCode, errorMsg);
				}
			}
			if(completeCallback){
				completeCallback();
			}
		};

		var _ajaxErrorCallBackAction = function(errorCode, ajaxErrorCallBack, completeCallback){
			alert('errorCode : ' + errorCode);
			ajaxErrorCallBack(errorCode);
			if(completeCallback){
				completeCallback();
			}
		};

		var _requestForPC = function(fullParam, successCallback, errorCallback, ajaxErrorCallBack, completeCallback){
			$.ajax({
				url : "http://"+ipAddr+":"+port+"/semp/ws/ws/getService/"+fullParam.common.svcCode+"/ibkMsg="+JSON.stringify(fullParam),
				dataType : "jsonp",
				contentType : "application/json",
				cache : false,
				timeout : timeout,
				success : function(data,text,xhqr){
					console.log(data);
					_successCallbackAction(data, successCallback, errorCallback);
				},
				error : function(xhr, textStatus, errorThrown){
					_ajaxErrorCallBackAction(textStatus, ajaxErrorCallBack);
				},
				complete : function(){
					if(completeCallback){
						completeCallback();
					}
				}
			});
		};

		var _requestForMobile = function(fullParam, successCallback, errorCallback, ajaxErrorCallBack, completeCallback){
			MDHBasic.SEMP.request(
				function(status) {
					_successCallbackAction(status, successCallback, errorCallback, completeCallback);
				},
				function(error) {
					_ajaxErrorCallBackAction(error, ajaxErrorCallBack, completeCallback);
				},
				{
					connectionType:"http",
					ipAddress:ipAddr,
					portNumber:port,
					userId:"",
					contextUrl:"semp",
					dataType:'json',
					sType:"ws",
					sCode:fullParam.common.svcCode,
					parameter:"ibkMsg="+JSON.stringify(fullParam)
				}
			);
		};

		var _requestParamCheck = function(commonParam){
			if(commonParam.svcCode === undefined || commonParam.svcCode === '' || commonParam.svcCode === null){
				console.log('common parameter [svcCode] error');
				return false;
			}
			else if(commonParam.screenId === undefined || commonParam.screenId === '' || commonParam.screenId === null){
				console.log('common parameter [screenId] error');
				return false;
			}
			else{
				return true;
			}
		};

		// public method
		var _request = function(commonParam, contentParam, successCallback, errorCallback, ajaxErrorCallBack, completeCallback){
			var param;
			var commonParamValid = _requestParamCheck(commonParam);

			if(!commonParamValid){
				return;
			}

			ipAddr = window.sessionStorage['sempIp'] || sempIp;
			port = window.sessionStorage['sempPort'] || sempPort;

			param = {
				'common' : {
					'trxNo':_hybrid.getTrxNo(),
					'id':_hybrid.getId(),
					'svcCode':commonParam.svcCode,
					'screenId':commonParam.screenId,
					'resCode': commonParam.resCode ? commonParam.resCode : '111',
					'channelCode':_hybrid.getChannelCode(),
					'appVer':_hybrid.getAppVer(),
					'mobileNo':_hybrid.getMobileNo(),
					'mobileNm':_hybrid.getMobileNm(),
					'osVer':_hybrid.getOsVer(),
					'uuid':_hybrid.getUuid(),
					'ipAddr':_hybrid.getIpAddr(),
					'jbclCd':_hybrid.getJbclCd(),
					'jrsdHdqrCd':_hybrid.getJrsdHdqrCd(),
					'blngBrcd':_hybrid.getBlngBrcd()
				}
			};
			param.content = contentParam;

			if(isMobile()){
				_requestForMobile(param, successCallback, errorCallback, ajaxErrorCallBack, completeCallback);
			}
			else{
				_requestForPC(param, successCallback, errorCallback, ajaxErrorCallBack, completeCallback);
			}
		};

		return {
			request : _request
		};
	}();
	
	var _history = function (){
		
		var _init = false;
		var _historyNotAdded = true;
	    // //////////////
	    // Class : _historyStorage
	    // //////////////
		
		var _historyStorage = function () {
			this.used = false;
			this.direction = 0;
			this.historyIndex = 0;
	    	this.historyData = {};
	    }
		
		_historyStorage.prototype.init = function(historyIndex, arrHistoryData) {
	        if (historyIndex) {
	        	this.historyIndex = historyIndex;
	        }
	        if (arrHistoryData) {
	        	this.historyData = arrHistoryData;
	        }
	    }
		
	    var _historyData = function () {
	    	this.url = location.href;
	    	this.scrollY = 0;
	        this.extraData = {};
	    }
	    
	    _historyData.prototype.init = function(url, extraData) {
	        if (url) {
	            this.url = url;
	        }
	        if (extraData) {
	        	this.extraData = {};
	        }
	    }

	    _historyData.prototype.getUrl = function () {
	        return this.url;
	    }

	    _historyData.prototype.putExtra = function (key, value) {
	        if ( undefined !== value ) {
	            if (key) {
	                this.extraData[key] = value;
	            } else {
	                this.extraData = value;
	            }
	        }
	    }

	    _historyData.prototype.getExtra = function (key) {
	        if ( key ) {
	            return this.extraData[key];
	        }
	    }

	    function _inithistoryStorage(){
	    	_init = true;
	    	var historyStorage = new _historyStorage();
	    	var arrHistoryData = [];
	    	arrHistoryData.push(new _historyData());
	    	historyStorage.historyData = arrHistoryData;
	    	_setHistoryStorage(historyStorage);
	    	return historyStorage;
	    }
	
	    function _getHistoryStorage(){
	    	var session_historyStorage = IBKJS.util.sessionStorage('CM_history_storage');
	        if (session_historyStorage) {
	        	return JSON.parse(session_historyStorage);
	        } else {
	        	return _inithistoryStorage();
	        }	
	    }
	    
	    function _setHistoryStorage(historyStorage){
	    	if (historyStorage) {
	    		IBKJS.util.sessionStorage('CM_history_storage', JSON.stringify(historyStorage));
	    		return true;
	        } else {
	        	return false;
	        }	
	    }
	    
	    function _getArrHistoryData(){
	    	var jsonHistoryStorage = _getHistoryStorage();
	        if (jsonHistoryStorage) {
	        	var arrHistoryData = [];
	        	var length = jsonHistoryStorage.historyData.length;
	        	for (var i = 0 ; i < length; ++i) {
	            	arrHistoryData.push(jsonHistoryStorage.historyData[i]);
	            }
	        	return arrHistoryData;
	        } else {
	        	return false;
	        }	
	    }
	    
	    function _setArrHistoryData(arrHistoryData) {
	    	var jsonHistoryStorage = _getHistoryStorage();
    		jsonHistoryStorage.historyData = arrHistoryData;
    		_setHistoryStorage(jsonHistoryStorage);
	    }
	    
	    function _getHistoryIndex(){
	    	var jsonHistoryStorage = _getHistoryStorage();
	        if (jsonHistoryStorage) {
	        	return jsonHistoryStorage.historyIndex;
	        } else {
	        	return false;
	        }	
	    }
	    
	    function _setHistoryIndex(historyIndex) {
	    	var jsonHistoryStorage = _getHistoryStorage();
    		jsonHistoryStorage.historyIndex = historyIndex;
    		_setHistoryStorage(jsonHistoryStorage);
	    }
	    
	    /*
		Function: IBKJS.histories.getHistoryisUsed
			histories의 movePrevious(), moveNext() 사용여부를 판단하는 Flag

		Parameter:
			- 

		Returns:
			- isUsed [boolean] - movePrevious(), moveNext() 사용여부판단

		Examples:
			:   > IBKJS.histories.historyisUsed();

		Notes:
			- 

		See Also:		
	    */
	    function _getHistoryIsUsed() {
	    	var jsonHistoryStorage = _getHistoryStorage();
	    	return jsonHistoryStorage.used;
	    }
	    
	    function _setHistoryIsUsed(flag) {
    		var jsonHistoryStorage = _getHistoryStorage();
    		jsonHistoryStorage.used = flag;
    		_setHistoryStorage(jsonHistoryStorage);
	    }
	    
	    function _getHistoryDirection() {
	    	var jsonHistoryStorage = _getHistoryStorage();
	    	return jsonHistoryStorage.direction;
	    }
	    
	    function _setHistoryDirection(val) {
	    	var jsonHistoryStorage = _getHistoryStorage();
    		jsonHistoryStorage.direction = val;
    		_setHistoryStorage(jsonHistoryStorage);
	    }
	    
	    // history index 현재 페이지 정보
	    function _getCurrentHistoryData() {
	    	var arrHistoryData = _getArrHistoryData();
	    	var historyIndex = _getHistoryIndex();
	    	if (arrHistoryData) {
	        	var length = arrHistoryData.length;
		        if (0 < length && historyIndex < length) {
		            return arrHistoryData[historyIndex];
		        } else {
		        	return false;
		        }
	        }
	    }
	   
	    /*
		Function: IBKJS.histories.historyScrolling
			 현제 페이지의 historyData에 스크롤 위치값이 있는 경우
			 해당 위치로 스크롤 시킨다. 

		Parameter:
			- 없음

		Returns:
			- 없음

		Examples:
			:   > IBKJS.histories.historyScrolling();
		
		Notes: 모든 데이터가 로드된 후 사용한다. 	
	    */
	    function _historyScrolling() {
	    	var arrHistoryData = _getArrHistoryData();
	    	if (arrHistoryData) {
	        	var length = arrHistoryData.length;
	        	var historyIndex = _getHistoryIndex();
		        if (0 < length && historyIndex < length) {
		        	var historyData = arrHistoryData[historyIndex];
		        	$(document).scrollTop(historyData.scrollY);
		        }
	        }
	    }
	    
	    function _setHistoryScrollY() {
	    	var arrHistoryData = _getArrHistoryData();
	    	if (arrHistoryData) {
	        	var length = arrHistoryData.length;
	        	var historyIndex = _getHistoryIndex();
		        if (0 < length && historyIndex < length) {
		        	if(_getHistoryDirection() < 0){//prev Click
		        		historyIndex = historyIndex + 1;
		        	} else if(_getHistoryDirection() > 0){//next Click
		        		historyIndex = historyIndex - 1;
		        	}
		        	var historyData = arrHistoryData[historyIndex];
		        	historyData.scrollY = $(document).scrollTop();
		        	arrHistoryData[historyIndex] = historyData;
		        	_setArrHistoryData(arrHistoryData);
		        	return true;
		        } else {
		        	return false;
		        }
	        }
	    }
	    
	    /*
		Function: IBKJS.histories.getHistoryExtraData
			현재 페이지에 저장한 ExtraData를 얻는다.  

		Parameter:
			- key [String]

		Returns:
			- value [Object]

		Examples:
			:   > IBKJS.histories.getHistoryExtraData('key');

	    */
	    function _getHistoryExtraData(key) {
	    	var historyData = _getCurrentHistoryData();
	    	if (historyData) {
	        	return historyData.extraData[key];
	        } else {
	        	//return false; 값이 False일수 있음
	        }
	    }
	    
	    /*
		Function: IBKJS.histories.setHistoryExtraData
			history스토리지에  ExtraData를 저장한다.  

		Parameter:
			- key [String]
			- value [Object]

		Returns:
			- 성공여부 [Boolean]

		Examples: > IBKJS.histories.setHistoryExtraData('key', Object);
		
		Note : "pageshow" 이벤트 이전에 setHistoryExtraData를 사용하는 경우
				historiesPageInit()을 호출한 후 사용한다. 
		
		See Also : 
			<IBKJS.histories.historiesPageInit>	

	    */
	    function _setHistoryExtraData(key, value) {
	    	var arrHistoryData = _getArrHistoryData();
	    	if (arrHistoryData) {
	        	var length = arrHistoryData.length;
	        	var historyIndex = _getHistoryIndex();
		        if (0 < length && historyIndex < length) {
		        	if(_getHistoryDirection() < 0	){//prev Click
		        		historyIndex = historyIndex + 1;
		        	} else if(_getHistoryDirection() > 0){//next Click
		        		historyIndex = historyIndex - 1;
		        	}
		        	var historyData = arrHistoryData[historyIndex];
		        	historyData.extraData[key] = value;
		        	arrHistoryData[historyIndex] = historyData;
		        	_setArrHistoryData(arrHistoryData);
		        	return true;
		        } else {
		        	return false;
		        }
	        }
	    }
	    
	    /*
	    function _setHistoryExtraDataOnfinish(key, value) {
	    	console.log('_setHistoryExtraDataOnfinish!!!');
	    	$(document).one('pagebeforehide', function(){_setHistoryExtraData(key, value);});
	     	$(window).one('unload', function(){_setHistoryExtraData(key, value);});
	    }
	    */
	    
	    /*
		Function: IBKJS.histories.movePrevious
			history스토리지의 index를 1만큼 감소시키고
		    history스토리지에 저장된 이전페이지의 Url로 이동한다. 

		Parameter:
			- 없음

		Returns:
			- 없음

		Examples:
			:   > IBKJS.histories.movePrevious();

	    */
	    function _movePrevious() {
	    	var arrHistoryData = _getArrHistoryData();
	    	if (arrHistoryData) {
	        	var length = arrHistoryData.length;
	        	var historyIndex = _getHistoryIndex();
	        	if (1 < length && historyIndex < length && 0 < historyIndex) {
	        		_setHistoryIndex(historyIndex - 1);
	        		_setHistoryIsUsed(true);
	        		_setHistoryDirection(-1);
	            	location.href = arrHistoryData[historyIndex - 1].url;
	            	return true;
	            } else {
	            	return false;
	            }
	        }
	    }
	    
	    /*
		Function: IBKJS.histories.moveNext
			history스토리지의 index를 1만큼 증가시키고
		    history스토리지에 저장된 다음페이지의 Url로 이동한다. 

		Parameter:
			- 없음

		Returns:
			- 없음

		Examples:
			:   > IBKJS.histories.moveNext();

	    */
	    function _moveNext() {
	    	var arrHistoryData = _getArrHistoryData();
	    	if (arrHistoryData) {
	        	var length = arrHistoryData.length;
	        	var historyIndex = _getHistoryIndex();
	        	if (1 < length && historyIndex + 1 < length) {
	        		_setHistoryIndex(historyIndex + 1);
	        		_setHistoryIsUsed(true);
	        		_setHistoryDirection(1);
	            	location.href = arrHistoryData[historyIndex + 1].url;
	            	return true;
	            } else {
	            	return false;
	            }
	        }
	    }
	    
	    //현재 페이지 히스토리 추가
	    function _addHistory(){
	    	if(!_getHistoryIsUsed()){
		    	if(_init){
	    			_init = false;
		    	} else {	
			    	var arrHistoryData = _getArrHistoryData();
			    	var historyIndex = _getHistoryIndex();
			    	if (arrHistoryData) {
			    		var length = arrHistoryData.length;
			    		//if (!(location.href == arrHistoryData[historyIndex].url)) {
			    			if(historyIndex + 1 == length){
		    					arrHistoryData.push(new _historyData());
		    					_setHistoryIndex(historyIndex + 1);
		    					_setArrHistoryData(arrHistoryData);
			    			} else if(historyIndex + 1 < length){
		    					arrHistoryData.length = historyIndex + 1;
		    					arrHistoryData.push(new _historyData());
		    					_setHistoryIndex(historyIndex + 1);
		    					_setArrHistoryData(arrHistoryData);
			    			}
			    		//}
			    	}
			    }
	    	}
	    	_setHistoryIsUsed(false);
	    }
	    
	    /*
		Function: IBKJS.histories.hasPrevious
			history에 이전 페이지가 있는지 확인한다.

		Parameter:
			- 없음

		Returns:
			- hasPrevious [Boolean]

		Examples:
			:   > IBKJS.histories.hasPrevious();

	    */
	    function _hasPrevious(){
	    	var arrHistoryData = _getArrHistoryData();
	    	var historyIndex = _getHistoryIndex();
	    	if (arrHistoryData) { 
	    		var length = arrHistoryData.length;
	    		if(historyIndex != 0){
	    			return true;
	    		} else {
	    			return false;
	    		}
	    	}
	    }
	    
	    /*
		Function: IBKJS.histories.hasNext
			history에 이전 페이지가 있는지 확인한다.

		Parameter:
			- 없음

		Returns:
			- hasNext [Boolean]

		Examples:
			:   > IBKJS.histories.hasNext();

	    */
	    function _hasNext(){
	    	var arrHistoryData = _getArrHistoryData();
	    	var historyIndex = _getHistoryIndex();
	    	if (arrHistoryData) { 
	    		var length = arrHistoryData.length;
	    		if(historyIndex + 1 == length){
	    			return false;
	    		} else {
	    			return true; 
	    		}
	    	}
	    }
	    
	    /*
		Function: IBKJS.histories.clearNext
			현재 페이지를 기준으로  history의 Next를  모두 삭제한다.  

		Parameter:
			- 없음

		Returns:
			- 없음

		Examples:
			:   > IBKJS.histories.clearNext();

	    */
	    function _clearNext(){
	    	var arrHistoryData = _getArrHistoryData();
	    	var historyIndex = _getHistoryIndex();
	    	if (arrHistoryData) { 
	    		arrHistoryData.length = historyIndex + 1;
				arrHistoryData.push(new _historyData());
				_setHistoryIndex(historyIndex + 1);
				_setArrHistoryData(arrHistoryData);
	    	}
	    }
	    
	    function _footerMenuBtnAction(){
	    	//Next Btn
	    	var arrHistoryData = _getArrHistoryData();
	    	if (arrHistoryData) {
	        	var length = arrHistoryData.length;
	        	var historyIndex = _getHistoryIndex();
	        	$('footer[data-role="footer"]').each(function(){
	        		var $nextBtn = $(this).find('.next').parent();
	        		if(historyIndex + 1 == length){
	        			$nextBtn.addClass('hover_no');
	        		} else {
	        			$nextBtn.removeClass('hover_no');
	        		}
	        	});
	    	}
	    	
	    	//Top Btn
	    	topBtnAction();
	    	$(document).scrollstop(topBtnAction);
	    	
	    	$('footer[data-role="footer"]').find('.top').click(function(){
	    		var headerFooter = $('[data-role="header"],[data-role="footer"]');
	    		headerFooter.addClass('block_none');
	    		$('html, body').animate({scrollTop:0}, '0', function(){
	    			headerFooter.removeClass('block_none');
		    		$(window).trigger('resize');
	    		});	    		
	    	});
	    	
	    	function topBtnAction(){
	    		console.log("############  scrollstop3  #################");
	    		//setTimeout(function(){
	    			$('footer[data-role="footer"]').each(function(){
	    				var $topBtn = $(this).find('.top').parent();
						if($(document).scrollTop() == 0){
							console.log("############  scrollstop3  addClass #################");
							$topBtn.addClass('hover_no');
						} else {
							console.log("############  scrollstop3  removeClass	 #################");
							$topBtn.removeClass('hover_no');
						}
	    			});
	    			$(window).trigger('resize');
				//},100);
	    	}
	    	
	    	//More Btn
	    	$('.option_menu').each(function(){
	    		$(this).find('li:last-child').bind('click', function(){
	    			IBKJS.hybrid.appFinish();
	    		});
	    		
	    		// 현재 마이메뉴가 구현되어 있지 않으므로 ..
	    		$(this).find('li:last-child').prev().hide();
	    		/*
	    		$(this).find('li:last-child').prev().bind('click', function(){
	    			alert("My 메뉴");
	    		});
	    		*/	
	    	});
	    	
	    	$('.footer_menu').each(function(){
	    		$(this).find('.more').click(function(){
	    			$('.footer_menu').hide();
	    			$('.option_menu').show();
	    			$('div[data-role="page"]').addClass('content_hidden').find('iframe').hide();
	    			$(window).trigger('resize');
	    			$.fixedToolbars.show(null, $.mobile.activePage);
	    		});	    		
	    	});
	    	
	    	$('a[data-option="bg"]').each(function(){
	    		$(this).click(function(){
	    			$('.option_menu').hide();
	    			$('.footer_menu').show();
	    			$('div[data-role="page"]').removeClass('content_hidden').find('iframe').show();
	    			$(window).trigger('resize');
	    			$.fixedToolbars.show(null, $.mobile.activePage);
	    		});	    		
	    	});
	    }
	    
	    function _pageUnload(){
	    	_setHistoryScrollY();
	    	if(_getHistoryDirection() == 0){
	    		_setHistoryIsUsed(false);
	    	}
	    	_historyNotAdded = true;
	    }
	    
	    /*
		Function: IBKJS.histories.historiesPageInit
			history에 현재 페이지를 추가한다.

		Parameter:
			- 없음

		Returns:
			- 없음

		Examples:
			:   > IBKJS.histories.historiesPageInit();
		
		Note : "pageshow" 이벤트 이전에 setHistoryExtraData를 사용하는 경우
				historiesPageInit()을 호출한 후 사용한다. 
		
		See Also : 
			<IBKJS.histories.setHistoryExtraData>		
	    
	    */
	    function _historiesPageInit(){
	    	if(_historyNotAdded){
		    	_setHistoryDirection(0);
		    	_historyNotAdded = false;
		    	_addHistory();
	    	}
	    }
	    
	    $(document).bind('pageshow', function() {
	    	_historiesPageInit();
	    	_footerMenuBtnAction();
	    	
	    	//Test getSSoData
	    	IBKJS.hybrid.getSsoData2();
	    	IBKJS.hybrid.getSsoData3();
	    	console.log(JSON.parse(IBKJS.util.sessionStorage('CM_history_storage')));
	    });
	   	
	    $(document).bind('pagebeforehide', _pageUnload);
    	$(window).bind('unload', _pageUnload);
	    
	    return {
	    	historyIsUsed: _getHistoryIsUsed,
	    	setHistoryExtraData : _setHistoryExtraData,
	    	getHistoryExtraData : _getHistoryExtraData,
	    	historyScrolling : _historyScrolling,
	    	historiesPageInit: _historiesPageInit,
	    	moveNext: _moveNext,
	    	movePrevious: _movePrevious,
	    	hasPrevious : _hasPrevious,
	    	hasNext : _hasNext,
	    	clearNext : _clearNext
	    	
	    	//,setHistoryExtraDataOnfinish : _setHistoryExtraDataOnfinish
	    };
	}();
	
	return {
		hybrid : _hybrid,
		util : _util,
		semp : _semp,
		histories : _history
	};
}();