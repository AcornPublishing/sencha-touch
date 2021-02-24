//
//  FirstViewController.h
//  myTab
//
//  Created by 성민 최 on 11. 9. 4..
//  Copyright 2011 IBKSYSTEM. All rights reserved.
//

#import <UIKit/UIKit.h>


@interface FirstViewController : UIViewController {
    IBOutlet UITextField *txtOut;
    IBOutlet UIButton *btnPress;
}

- (IBAction) OnButtonDown: (id)sender;

@end
