//
//  HelloWorldAppDelegate.h
//  HelloWorld
//
//  Created by 성민 최 on 11. 8. 27..
//  Copyright 2011 IBKSYSTEM. All rights reserved.
//

#import <UIKit/UIKit.h>

@class HelloWorldViewController;

@interface HelloWorldAppDelegate : NSObject <UIApplicationDelegate> {

}

@property (nonatomic, retain) IBOutlet UIWindow *window;

@property (nonatomic, retain) IBOutlet HelloWorldViewController *viewController;


@end
