//
//  myHybridProjectAppDelegate.h
//  myHybridProject
//
//  Created by 성민 최 on 11. 9. 18..
//  Copyright 2011 IBKSYSTEM. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <CoreLocation/CoreLocation.h>

@interface myHybridProjectAppDelegate : NSObject <UIApplicationDelegate> {
    IBOutlet UIActivityIndicatorView *activityIndicator;    // 인디케이터
    IBOutlet UIWebView *uiWebView;                          // 웹뷰  
    UIViewController *viewController;                       // 카메라용 뷰 컨트롤러
    CLLocationManager *locationManager;                     // 위치정보
}

- (void) sendSMS;       //sms메소드
- (void) showCamera;    //카메라 호출
- (void) locationMan;   //위치정보
- (void) showMp3 : (NSURL *)url;//동영상, mp3

@property (nonatomic, retain) UIActivityIndicatorView *activityIndicator; // 인디케이터
@property (nonatomic, retain) UIWebView *uiWebView;         // 웹뷰

@property (nonatomic, retain) IBOutlet UIWindow *window;

@end
