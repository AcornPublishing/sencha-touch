//
//  myNavigationAppDelegate.h
//  myNavigation
//
//  Created by 성민 최 on 11. 9. 4..
//  Copyright 2011 IBKSYSTEM. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface myNavigationAppDelegate : NSObject <UIApplicationDelegate> {

}

@property (nonatomic, retain) IBOutlet UIWindow *window;

@property (nonatomic, retain) IBOutlet UINavigationController *navigationController;

@end
