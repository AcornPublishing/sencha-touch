//
//  myWebViewAppDelegate.m
//  myWebView
//
//  Created by 성민 최 on 11. 9. 5..
//  Copyright 2011 IBKSYSTEM. All rights reserved.
//

#import "myWebViewAppDelegate.h"

@implementation myWebViewAppDelegate


@synthesize window=_window;

@synthesize activityIndicator, addressBar, uiWebView 
            ,goButton, backButton, forwardButton, reloadButton, stopButton;

// 주소로 이동
-(IBAction) gotoAddress:(id)sender{	
    NSURL *url = [NSURL URLWithString:[addressBar text]];
    [uiWebView loadRequest:[NSURLRequest requestWithURL:url]];
}

// 뒤로가기
-(IBAction) goBack:(id)sender{
	[uiWebView goBack];
}

// 앞으로가기
-(IBAction) goForward:(id)sender{
	[uiWebView goForward];    
}

// 새로고침
-(IBAction) goRefresh:(id)sender{
	[uiWebView reload];
}

// 멈춤
-(IBAction) stop:(id)sender{
    [uiWebView stopLoading];
}

// 웹페이지 로딩
- (BOOL)webView:(UIWebView*)webView shouldStartLoadWithRequest:(NSURLRequest*)request
 navigationType:(UIWebViewNavigationType)navigationType {
	// 웹 URL 이동
	if (navigationType == UIWebViewNavigationTypeLinkClicked) {
        [addressBar setText:[[request URL] absoluteString]];
    }
    return YES;   
}

// 웹페이지 로딩시작
- (void)webViewDidStartLoad:(UIWebView *)webView {
    // 인디케이터 나타내고 동작시킴
    [activityIndicator setHidden:NO];
	[activityIndicator startAnimating];
}

// 웹페이지로딩완료
- (void)webViewDidFinishLoad:(UIWebView *)webView {
    // 키보드 감추기
    [self.window makeKeyAndVisible];
    // 앞뒤로 가기 버튼 활성
    forwardButton.enabled = webView.canGoForward;
    backButton.enabled = webView.canGoBack;
    
    // 인디케이터 보이지 않게하고 멈춤
    [activityIndicator setHidden:YES];
	[activityIndicator stopAnimating];
}

// 어플리케이션로딩완료
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
    NSString *urlAddress = @"http://m.daum.net/";
	
	NSURL *url = [NSURL URLWithString:urlAddress];
	NSURLRequest *requestObj = [NSURLRequest requestWithURL:url];
	
	[uiWebView loadRequest:requestObj];
	[addressBar setText:urlAddress];

    [self.window makeKeyAndVisible];
    return YES;
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
    [_window release];
    [super dealloc];
}

@end
