//
//  HelloWorldViewController.m
//  HelloWorld
//
//  Created by 성민 최 on 11. 8. 27..
//  Copyright 2011 IBKSYSTEM. All rights reserved.
//

#import "HelloWorldViewController.h"

@implementation HelloWorldViewController


- (IBAction) OnButtonClick: (id) sender
{
    [txtOut setText: @"Hello 버튼클릭"];
    [img setImage:[UIImage imageNamed:@"lion.png"]];
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
