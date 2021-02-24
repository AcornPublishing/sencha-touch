//
//  SecondViewController.m
//  myTab
//
//  Created by 성민 최 on 11. 9. 4..
//  Copyright 2011 IBKSYSTEM. All rights reserved.
//

#import "SecondViewController.h"


@implementation SecondViewController


- (IBAction) OnButtonDown2: (id)sender
{
    [txtOut2 setText: @"두번째 탭바버튼"];
}


/*
// Implement viewDidLoad to do additional setup after loading the view, typically from a nib.
- (void)viewDidLoad
{
    [super viewDidLoad];
}
*/

- (BOOL)shouldAutorotateToInterfaceOrientation:(UIInterfaceOrientation)interfaceOrientation
{
    // Return YES for supported orientations
    return (interfaceOrientation == UIInterfaceOrientationPortrait);
}


- (void)didReceiveMemoryWarning
{
    // Releases the view if it doesn't have a superview.
    [super didReceiveMemoryWarning];
    
    // Release any cached data, images, etc. that aren't in use.
}


- (void)viewDidUnload
{
    [super viewDidUnload];

    // Release any retained subviews of the main view.
    // e.g. self.myOutlet = nil;
}


- (void)dealloc
{
    [super dealloc];
}

@end
