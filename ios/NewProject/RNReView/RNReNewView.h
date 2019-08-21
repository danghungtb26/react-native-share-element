//
//  RNReViewView.h
//  NewProject
//
//  Created by HungDV on 8/14/19.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>
#import "React/RCTComponent.h"
#import "React/RCTEventDispatcher.h"
#import "React/RCTView.h"

NS_ASSUME_NONNULL_BEGIN

@interface RNReNewView : UIView

- (instancetype)initWithEventDispatcher:(RCTEventDispatcher *)eventDispatcher NS_DESIGNATED_INITIALIZER;

@end

NS_ASSUME_NONNULL_END
