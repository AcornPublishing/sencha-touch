//
//  myHybridWebAppDelegate.h
//  myHybridWeb
//
//  Created by 성민 최 on 11. 9. 14..
//  Copyright 2011 IBKSYSTEM. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <MediaPlayer/MediaPlayer.h>
#import <MessageUI/MessageUI.h>
#import <CoreLocation/CoreLocation.h>
@interface myHybridWebAppDelegate : NSObject <UIApplicationDelegate,UIImagePickerControllerDelegate> {
    IBOutlet UIActivityIndicatorView *activityIndicator;    // 인디케이터
    IBOutlet UIWebView *uiWebView;                          // 웹뷰
    UIViewController *viewController;                       // 카메라용 뷰 컨트롤러
    CLLocationManager *locationManager;
}

- (void) callScript;
- (void) locationMan;
- (void) networkstate;
- (void) showCamera;
- (void) showMp3 : (NSURL *)url;
- (void) sendSMS;
- (void)embedYouTube:(NSString *)urlString frame:(CGRect)frame;

@property (nonatomic, retain) UIActivityIndicatorView *activityIndicator; // 인디케이터
@property (nonatomic, retain) UIWebView *uiWebView;         // 웹뷰

@property (nonatomic, retain) IBOutlet UIWindow *window;

@end
