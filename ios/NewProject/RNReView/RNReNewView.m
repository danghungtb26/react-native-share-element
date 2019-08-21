//
//  RNReViewView.m
//  NewProject
//
//  Created by HungDV on 8/14/19.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "RNReNewView.h"
#import "React/RCTEventDispatcher.h"
#import <React/RCTLog.h>
#import <React/RCTUtils.h>
#import <React/UIView+React.h>
#import "React/RCTConvert.h"
#import <React/RCTBridgeModule.h>

@implementation RNReNewView {
  RCTEventDispatcher *_eventDispatcher;
}


-(instancetype) initWithEventDispatcher:(RCTEventDispatcher *)eventDispatcher {
  if(self = [super init]) {
    _eventDispatcher = eventDispatcher;
    UIView *_view = [[[NSBundle mainBundle] loadNibNamed:@"RNReNew" owner:self options:nil] objectAtIndex:0];
    _view.frame = CGRectMake(0, 0, 100, 100);
    [_view setTranslatesAutoresizingMaskIntoConstraints:NO];
    [self addSubview:_view];
  }
  return self;
}


-(void)layoutSubviews {
  [super layoutSubviews];
  
}

@end
