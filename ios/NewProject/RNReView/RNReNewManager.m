//
//  RNReViewManager.m
//  NewProject
//
//  Created by HungDV on 8/14/19.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "RNReNewManager.h"
#import "React/RCTBridge.h"
#import <React/RCTLog.h>

#import "React/RCTEventDispatcher.h"
#import "React/UIView+React.h"
#import "RNReNewView.h"

@implementation RNReNewManager


- (dispatch_queue_t)methodQueue
{
  return dispatch_get_main_queue();
}

- (UIView *) view {
  return [[RNReNewView alloc] initWithEventDispatcher:self.bridge.eventDispatcher];
}

RCT_EXPORT_MODULE();

+ (BOOL)requiresMainQueueSetup
{
  return YES;
}

@end
