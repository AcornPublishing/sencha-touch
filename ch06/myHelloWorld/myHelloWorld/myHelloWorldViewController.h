//
//  myHelloWorldViewController.h
//  myHelloWorld
//
//  Created by 성민 최 on 11. 9. 11..
//  Copyright 2011 IBKSYSTEM. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface myHelloWorldViewController : UIViewController {
    IBOutlet UILabel *lblHello;
}
-(IBAction)hello:(id)sender;
@end
