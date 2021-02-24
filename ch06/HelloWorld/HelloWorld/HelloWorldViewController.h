//
//  HelloWorldViewController.h
//  HelloWorld
//
//  Created by 성민 최 on 11. 8. 27..
//  Copyright 2011 IBKSYSTEM. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface HelloWorldViewController : UIViewController {
    IBOutlet UITextField *txtOut;
    IBOutlet UIButton *btnPress;   
    IBOutlet UIImageView *img;    
}
- (IBAction) OnButtonClick:(id)sender;

@end
