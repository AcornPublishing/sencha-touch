//
//  myiPhoneAppDelegate.h
//  myiPhone
//
//  Created by 성민 최 on 11. 9. 3..
//  Copyright 2011 IBKSYSTEM. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface myiPhoneAppDelegate : NSObject <UIApplicationDelegate> {
    IBOutlet UITextField *txtOut;
    IBOutlet UIButton *btnPress;
    IBOutlet UIImageView *img;
}

- (IBAction) OnButtonClick:(id)sender;

@property (nonatomic, retain) IBOutlet UIWindow *window;

@end
