//
//  myHybridLocalAppDelegate.m
//  myHybridLocal
//
//  Created by 성민 최 on 11. 9. 18..
//  Copyright 2011 IBKSYSTEM. All rights reserved.
//

#import "myHybridLocalAppDelegate.h"

#import "Reachability.h"

// 네트워크 
#import <SystemConfiguration/SystemConfiguration.h>
#import <netinet/in.h>

@implementation myHybridLocalAppDelegate


@synthesize window=_window;
@synthesize uiWebView, activityIndicator;

NSString * homeUrl = @"http://pscapps.com/index.html"; 

// 웹페이지 로딩시작
- (void)webViewDidStartLoad:(UIWebView *)webView {
    // 인디케이터 나타내고 동작시킴
    [activityIndicator setHidden:NO];
	[activityIndicator startAnimating];
}

// 웹페이지로딩완료
- (void)webViewDidFinishLoad:(UIWebView *)webView {
    
    // 인디케이터 보이지 않게하고 멈춤
    [activityIndicator setHidden:YES];
	[activityIndicator stopAnimating];
}

// 어플리케이션로딩완료
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
    NSString *htmlFile = [[NSBundle mainBundle] pathForResource:@"index" ofType:@"html"];
    NSData *htmlData = [NSData dataWithContentsOfFile:htmlFile];
    [uiWebView loadData:htmlData MIMEType:@"text/html" textEncodingName:@"EUC-KR" baseURL:[NSURL URLWithString:@""]];
    
    [self.window makeKeyAndVisible];
    return YES;
}


- (BOOL)webView:(UIWebView*)webView shouldStartLoadWithRequest:(NSURLRequest*)request
 navigationType:(UIWebViewNavigationType)navigationType {
	//CAPTURE USER LINK-CLICK.
	NSString *requestString = [[request URL] absoluteString];
	
    NSLog(@"shouldStartLoadWithRequest");
    
	requestString = [requestString stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding];
	
    // 파싱할 문자가 없을경우 일반 웹페이지 요청으로 인식하고 YES를 리턴함ㅣ
	NSArray *components = [requestString componentsSeparatedByString:@":"];
    
	if([components count] <= 1){
		return YES;
	}
	
	// Param 으로 명령어 분석하기
	NSString *param0 = (@"%@",[components objectAtIndex:0]);
	NSString *param1 = (@"%@",[components objectAtIndex:1]);
    
    NSLog(@"%@", param0);
    NSLog(@"%@", param1);
    
	// 어플리케이션에 요청함
	if([param0 isEqualToString:@"app"]){
		// 명령어 분석 및 수행
		if([param1 isEqualToString:@"tel"]){ //전화걸기
            NSString *param2 = (@"%@",[components objectAtIndex:2]);
            NSLog(@"%@", param2);
            NSString *call = [NSString stringWithFormat:@"telprompt:%@",param2];
            [[UIApplication sharedApplication] openURL:[NSURL URLWithString:call]];
			return NO;
        }else if ([param1 isEqualToString:@"callScript"]){ //웹 스크립트 호출하기
            [self callScript];            
			return NO;
		}else if ([param1 isEqualToString:@"sms"]){ //문자보내기
            [self sendSMS];            
			return NO;
		}else if([param1 isEqualToString:@"camera"]){ //카메라
            [self showCamera];
            return NO;
		}else if([param1 isEqualToString:@"networkstate"]){ //네트워크상태
            [self networkstate];
            return NO;
        }else if([param1 isEqualToString:@"location"]){ //gps정보
            
            [self locationMan];
            return NO;
        }else if([param1 isEqualToString:@"mp3"]){ //mp3실행하기
            
            NSString *param2 = (@"%@",[components objectAtIndex:2]);
            NSString *param3 = (@"%@",[components objectAtIndex:3]);
            NSLog(@"%@", param2);
            NSLog(@"%@", param3);
            NSString *s = [param2 stringByAppendingFormat:@":%@",param3];
            NSLog(@"%@", s);
            NSURL *url = [NSURL URLWithString:s];//http://www.pscapps.com/urman.mp3
            [self showMp3:url];
            return NO;
        }else if([param1 isEqualToString:@"movie"]){ // 유튜브 동영상 실행하기
            
            [self embedYouTube:@"http://www.youtube.com/watch?v=I6UagGzvCUE&feature=topvideos_entertainment" frame:CGRectMake(195,295,80,38)];
            //[[UIApplication sharedApplication] openURL:[NSURL URLWithString:@"http://www.youtube.com/v/I6UagGzvCUE&feature=topvideos_entertainment"]];// 직접 실행하나 어플리케이션 밖으로 나감
            return NO;
        }else if([param1 isEqualToString:@"fileupload"]){ // 파일 업로드
            
            return NO;
        }
	}
    
	return YES;   
}

// 앱에서 웹페이지를 자바스크립트로 사용하기
- (void) callScript{
    NSString *strScript = [NSString stringWithFormat:
                           @"var appcall = document.getElementById('appcall');\
                           appcall.value = '어플에서 셋팅한 값';\
                           alert('어플에서 호출함');"];
    [uiWebView stringByEvaluatingJavaScriptFromString:strScript];
}

// 문자보내기
- (void) sendSMS{
    NSString *sms = [[NSString stringWithFormat:@"sms:010-7354-2690"]
                     stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding];
    [[UIApplication sharedApplication] openURL:[NSURL URLWithString:sms]];
}

// GPS 위치정보 갖고옴
- (void) locationMan{
    locationManager = [[CLLocationManager alloc]init];  //초기화
	
	locationManager.delegate =self;
	locationManager.distanceFilter = kCLDistanceFilterNone; // 기본값. 필터값 지정 안해서 전력 많이 먹음.
	locationManager.desiredAccuracy = kCLLocationAccuracyBest; // 몇 미터? 이동후 위치 정보 갱신, 여기선 10m 단위
	
	[locationManager startUpdatingLocation]; // 스타트 
}

- (void) networkstate{
    
    int status = [[Reachability reachabilityForInternetConnection] currentReachabilityStatus];
    NSString *resultStr = [NSString stringWithFormat:@"%i",status];
    NSString *printStr = @"";
    if([resultStr isEqualToString:@"0"]){
        printStr = (@"네트워크 접속불가");
    }else if([resultStr isEqualToString:@"1"]){
        printStr = (@"WIFI 접속");
    }else if([resultStr isEqualToString:@"2"]){
        printStr = (@"3G 접속");
    }
    
    UIAlertView *alert = [[UIAlertView alloc] initWithTitle:(@"네트워크상태")
                                                    message:(printStr)
                                                   delegate:self
                                          cancelButtonTitle:(@"확인")
                                          otherButtonTitles:nil];
    [alert show];
    
}

// 위치정보 수신
- (void)locationManager:(CLLocationManager *)manager didUpdateToLocation:(CLLocation *)newLocation fromLocation:(CLLocation *)oldLocation     // CLLocation *)newLocation 여기에 위도경도가 변수에 들어가 있다.
{
	double latitude;  //더블형
	double longitude;
	latitude = newLocation.coordinate.latitude; //위도정보
	longitude =newLocation.coordinate.longitude;//경도 정보
	
	NSString *lati = [NSString stringWithFormat:@"위도는 : %g",latitude];
	NSString *longi = [NSString stringWithFormat:@"경도는 : %g",longitude];
    
	NSLog(@"%@",longi);
    
    NSString *loc = [NSString stringWithFormat:[lati stringByAppendingString:longi]];
    
	NSString *strScript = [NSString stringWithFormat:
                           @"var loc = document.getElementById('loc');\
                           loc.value = '%@';", loc];
    [uiWebView stringByEvaluatingJavaScriptFromString:strScript];
    
	
}

// 위치 정보 갖고오기 에러
- (void)locationManager:(CLLocationManager *)manager didFailWithError:(NSError *)error
{
	NSString *strScript = [NSString stringWithFormat:
                           @"var loc = document.getElementById('loc');\
                           loc.value = '값을 갖고올수 없습니다.';"];
    [uiWebView stringByEvaluatingJavaScriptFromString:strScript];
} 




// 카메라 보여주기
-(void) showCamera {
    
    [viewController.view addSubview:uiWebView];
    [self.window addSubview:viewController.view];
    
    UIImagePickerController *imagePicker = [[UIImagePickerController alloc] init];
    imagePicker.sourceType = UIImagePickerControllerSourceTypeCamera;
    
    //imagePicker.delegate = self;
    [viewController presentModalViewController:imagePicker animated:NO];
    [imagePicker release];
}

// 카메라로 찍은 이미지 선택 완료
- (void)imagePickerController:(UIImagePickerController *)picker didFinishPickingMediaWithInfo:(NSDictionary *)info {
    UIImage* image = [info objectForKey:UIImagePickerControllerOriginalImage];
    NSData *img = UIImageJPEGRepresentation (image, 0.5);
    
    NSString *strScript = [NSString stringWithFormat:
                           @"var fromApp = document.getElementById('imgsrc');\
                           fromApp.src = '';"];
    [uiWebView stringByEvaluatingJavaScriptFromString:strScript];
    [uiWebView loadData:img MIMEType:@"image/jpeg" textEncodingName:@"UTF-8" baseURL:nil];
    
}

// mp3플레이하기
-(void) showMp3:(NSURL *) url{
    self.uiWebView = [[[UIWebView alloc] initWithFrame:[[UIScreen mainScreen] applicationFrame]] autorelease];
    NSURLRequest *request = [NSURLRequest requestWithURL:url];
    [uiWebView loadRequest:request];
}

// 동영상 보여주기
- (void)embedYouTube:(NSString *)urlString frame:(CGRect)frame {
    NSString *embedHTML = @"\
    <html><head>\
    <style type=\"text/css\">\
    body {\
    background-color: transparent;\
    color: white;\
    }\
    </style>\
    </head>\
    <body style=\"margin:0\">\
    <embed id=\"yt\" src=\"%@\" type=\"application/x-shockwave-flash\" \
    width=\"%0.0f\" height=\"%0.0f\"></embed>\
    </body>\
    </html>";
    NSString *html = [NSString stringWithFormat:embedHTML, urlString, frame.size.width, frame.size.height];
    UIWebView *videoView = [[UIWebView alloc] initWithFrame:frame];
    [videoView loadHTMLString:html baseURL:nil];
    [self.uiWebView addSubview:videoView];
    [videoView release];
    
}


- (void)applicationWillResignActive:(UIApplication *)application
{
    /*
     Sent when the application is about to move from active to inactive state. This can occur for certain types of temporary interruptions (such as an incoming phone call or SMS message) or when the user quits the application and it begins the transition to the background state.
     Use this method to pause ongoing tasks, disable timers, and throttle down OpenGL ES frame rates. Games should use this method to pause the game.
     */
}

- (void)applicationDidEnterBackground:(UIApplication *)application
{
    /*
     Use this method to release shared resources, save user data, invalidate timers, and store enough application state information to restore your application to its current state in case it is terminated later. 
     If your application supports background execution, this method is called instead of applicationWillTerminate: when the user quits.
     */
}

- (void)applicationWillEnterForeground:(UIApplication *)application
{
    /*
     Called as part of the transition from the background to the inactive state; here you can undo many of the changes made on entering the background.
     */
}

- (void)applicationDidBecomeActive:(UIApplication *)application
{
    /*
     Restart any tasks that were paused (or not yet started) while the application was inactive. If the application was previously in the background, optionally refresh the user interface.
     */
}

- (void)applicationWillTerminate:(UIApplication *)application
{
    /*
     Called when the application is about to terminate.
     Save data if appropriate.
     See also applicationDidEnterBackground:.
     */
}

- (void)dealloc
{
    [locationManager release];
    [viewController release];
    [activityIndicator release];
    [uiWebView release];
    [_window release];
    [super dealloc];
}

@end
