//
//  myWebViewAppDelegate.h
//  myWebView
//
//  Created by 성민 최 on 11. 9. 5..
//  Copyright 2011 IBKSYSTEM. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface myWebViewAppDelegate : NSObject <UIApplicationDelegate> {
    IBOutlet UIActivityIndicatorView *activityIndicator;   // 인디케이터 
    IBOutlet UITextField *addressBar;           // 주소창 텍스트박스
    
    IBOutlet UIBarButtonItem *goButton;         // 주소로 이동
    IBOutlet UIBarButtonItem *backButton;       // 뒤로가기
    IBOutlet UIBarButtonItem *forwardButton;    // 앞으로가기
    IBOutlet UIBarButtonItem *reloadButton;     // 새로고침
    IBOutlet UIBarButtonItem *stopButton;       // 멈춤
    
    IBOutlet UIWebView *uiWebView;              // 웹뷰
}

@property (nonatomic, retain) UIActivityIndicatorView *activityIndicator; // 인디케이터
@property (nonatomic, retain) UITextField *addressBar;          // 주소창 텍스트박스

@property (nonatomic, retain) UIBarButtonItem *goButton;        // 주소로 이동
@property (nonatomic, retain) UIBarButtonItem *backButton;      // 뒤로가기
@property (nonatomic, retain) UIBarButtonItem *forwardButton;   // 앞으로가기
@property (nonatomic, retain) UIBarButtonItem *reloadButton;    // 새로고침
@property (nonatomic, retain) UIBarButtonItem *stopButton;      // 멈춤

@property (nonatomic, retain) UIWebView *uiWebView;             // 웹뷰

-(IBAction) gotoAddress:(id)sender; // 주소로 이동
-(IBAction) goBack:(id)sender;      // 뒤로가기
-(IBAction) goForward:(id)sender;   // 앞으로가기
-(IBAction) goRefresh:(id)sender;   // 새로고침
-(IBAction) stop:(id)sender;        // 멈춤

@property (nonatomic, retain) IBOutlet UIWindow *window;

@end
