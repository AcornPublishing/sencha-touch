//
//  myHelloWorldViewController.m
//  myHelloWorld
//
//  Created by 성민 최 on 11. 9. 11..
//  Copyright 2011 IBKSYSTEM. All rights reserved.
//

#import "myHelloWorldViewController.h"

@implementation myHelloWorldViewController

-(IBAction)hello:(id)sender{
    NSLog(@"Hello 메소드 호출됨");
    lblHello.text = @"헬로우 월드 아이폰";
    NSLog(@"lblHello에 문자를 셋팅함");
}

- (void)dealloc
{
    [super dealloc];
}

- (void)didReceiveMemoryWarning
{
    // Releases the view if it doesn't have a superview.
    [super didReceiveMemoryWarning];
    
    // Release any cached data, images, etc that aren't in use.
}

#pragma mark - View lifecycle

/*
// Implement viewDidLoad to do additional setup after loading the view, typically from a nib.
- (void)viewDidLoad
{
    [super viewDidLoad];
}
*/

- (void)viewDidUnload
{
    [super viewDidUnload];
    // Release any retained subviews of the main view.
    // e.g. self.myOutlet = nil;
}

- (BOOL)shouldAutorotateToInterfaceOrientation:(UIInterfaceOrientation)interfaceOrientation
{
    // Return YES for supported orientations
    return (interfaceOrientation == UIInterfaceOrientationPortrait);
}

@end
