//
//  RNImageFilterManager.m
//  NewProject
//
//  Created by HungDV on 7/31/19.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "RNImageFilterManager.h"
#import "React/RCTBridge.h"
#import <React/RCTLog.h>

#import "React/RCTEventDispatcher.h"
#import "React/UIView+React.h"

#import "RNImageFilterView.h"

@implementation RNImageFilterManager

- (dispatch_queue_t)methodQueue
{
  return dispatch_get_main_queue();
}

- (UIView *) view {
  return [[RNImageFilterView alloc] initWithEventDispatcher:self.bridge.eventDispatcher];
}

RCT_EXPORT_MODULE();
RCT_EXPORT_VIEW_PROPERTY(source, NSDictionary);
RCT_EXPORT_VIEW_PROPERTY(filter, NSDictionary);
RCT_EXPORT_VIEW_PROPERTY(circle, NSNumber);

+ (BOOL)requiresMainQueueSetup
{
  return YES;
}

@end
