//
//  myHybridProjectAppDelegate.m
//  myHybridProject
//
//  Created by 성민 최 on 11. 9. 18..
//  Copyright 2011 IBKSYSTEM. All rights reserved.
//

#import "myHybridProjectAppDelegate.h"

@implementation myHybridProjectAppDelegate


@synthesize window=_window;
@synthesize uiWebView, activityIndicator;


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
    NSString *htmlFile = [[NSBundle mainBundle] pathForResource:@"index" ofType:@"html"];	// index.html의 경로를 갖고옴
    
    NSURL *url = [NSURL fileURLWithPath:htmlFile];
    NSURLRequest *request = [NSURLRequest requestWithURL:url];
    [uiWebView loadRequest:request];
    
    //viewController = [[UIViewController alloc] init];
    
    [self.window makeKeyAndVisible];
    return YES;
}

// 요청 프로토콜 분석

- (BOOL)webView:(UIWebView*)webView shouldStartLoadWithRequest:(NSURLRequest*)request
 navigationType:(UIWebViewNavigationType)navigationType {
	//CAPTURE USER LINK-CLICK.
	NSString *requestString = [[request URL] absoluteString];
	
    NSLog(@"shouldStartLoadWithRequest");
    
	requestString = [requestString stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding];
	
    // 파싱할 문자가 없을경우 일반 웹페이지 요청으로 인식하고 YES를 리턴함ㅣ
	NSArray *components = [requestString componentsSeparatedByString:@"app:"];
    
	if([components count] <= 1){
		return YES;
	}
	
	// Param 으로 명령어 분석하기
	//NSString *param0 = [components objectAtIndex:0];
	NSString *param1 = [components objectAtIndex:1];
    
	NSArray *components2 = [param1 componentsSeparatedByString:@":"];
	NSString *valid = [components2 objectAtIndex:0];
    
	// 어플리케이션에 요청함
    // 명령어 분석 및 수행
    if([valid isEqualToString:@"tel"]){ //전화걸기
        NSArray *val = [param1 componentsSeparatedByString:@"tel:"];
        NSString *call = [NSString stringWithFormat:@"telprompt:%@",[val objectAtIndex:1]];
        [[UIApplication sharedApplication] openURL:[NSURL URLWithString:call]];
        return NO;
    }else if ([valid isEqualToString:@"sms"]){ //문자보내기
        NSArray *val = [param1 componentsSeparatedByString:@"sms:"];
        [self sendSMS:[val objectAtIndex:1]];            
        return NO;
    }else if([valid isEqualToString:@"camera"]){ //카메라
        [self showCamera];
        return NO;
    }else if([valid isEqualToString:@"location"]){ //gps정보
        
        [self locationMan];
        return NO;
    }else if([valid isEqualToString:@"mp3"]){ //mp3, 동영상실행하기
        NSArray *val = [param1 componentsSeparatedByString:@"mp3:"];
        [self showMp3:[NSURL URLWithString:[val objectAtIndex:1]]];
        return NO;
    }
    
	return YES;   
}


// 문자보내기
- (void) sendSMS:(NSString*)sms{
    NSString *sendsms = [[NSString stringWithFormat:@"sms:%@",sms]
                         stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding];
    [[UIApplication sharedApplication] openURL:[NSURL URLWithString:sendsms]];
}


// 카메라 보여주기
-(void) showCamera {
    if (viewController == nil)
        viewController = [[UIViewController alloc] init];
    
    [viewController.view addSubview:uiWebView];
    [self.window addSubview:viewController.view];
    
    UIImagePickerController *imagePicker = [[UIImagePickerController alloc] init];
    imagePicker.sourceType = UIImagePickerControllerSourceTypeCamera;
    
    [viewController presentModalViewController:imagePicker animated:NO];
    [imagePicker release];
}

// GPS 위치정보 갖고옴
- (void) locationMan{
    if(locationManager == nil)
        locationManager = [[CLLocationManager alloc]init];  //초기화
	
	locationManager.delegate =self;
	locationManager.distanceFilter = kCLDistanceFilterNone; // 기본값. 필터값 지정 안해서 전력 많이 먹음.
	locationManager.desiredAccuracy = kCLLocationAccuracyBest; // 몇 미터? 이동후 위치 정보 갱신, 여기선 한번만.
	
	[locationManager startUpdatingLocation]; // 스타트 
}

// 위치정보 수신
- (void)locationManager:(CLLocationManager *)manager didUpdateToLocation:(CLLocation *)newLocation fromLocation:(CLLocation *)oldLocation     // CLLocation *)newLocation 여기에 위도경도가 변수에 들어가 있다.
{
	double latitude;  //더블형
	double longitude;
	latitude = newLocation.coordinate.latitude; //위도정보
	longitude =newLocation.coordinate.longitude;//경도 정보
    
	NSString *strScript = [NSString stringWithFormat:
                           @"menu.panel_menu.receiveLocationPos(%@, %@);", [NSString stringWithFormat:@"%g",latitude], [NSString stringWithFormat:@"%g",longitude]];
    
    [uiWebView stringByEvaluatingJavaScriptFromString:strScript];
    [locationManager stopUpdatingLocation]; 
}

// 위치 정보 갖고오기 에러
- (void)locationManager:(CLLocationManager *)manager didFailWithError:(NSError *)error
{
    NSLog(@"위치정보 갖고오기 에러");
} 

// mp3, 동영상 플레이하기
-(void) showMp3:(NSURL *) url{
    self.uiWebView = [[[UIWebView alloc] initWithFrame:[[UIScreen mainScreen] applicationFrame]] autorelease];
    NSURLRequest *request = [NSURLRequest requestWithURL:url];
    [uiWebView loadRequest:request];
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
    [uiWebView release];
    [activityIndicator release];
    [locationManager release];
    
    [_window release];
    [super dealloc];
}

@end
