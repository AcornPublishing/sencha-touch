//
//  myHelloWorldAppDelegate.h
//  myHelloWorld
//
//  Created by 성민 최 on 11. 9. 11..
//  Copyright 2011 IBKSYSTEM. All rights reserved.
//

#import <UIKit/UIKit.h>

@class myHelloWorldViewController;

@interface myHelloWorldAppDelegate : NSObject <UIApplicationDelegate> {

}

@property (nonatomic, retain) IBOutlet UIWindow *window;

@property (nonatomic, retain) IBOutlet myHelloWorldViewController *viewController;

@end
