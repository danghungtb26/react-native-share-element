//
//  RNImageFilterView.m
//  NewProject
//
//  Created by HungDV on 7/31/19.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "RNImageFilterView.h"
#import "React/RCTEventDispatcher.h"
#import <React/RCTLog.h>
#import <React/RCTUtils.h>
#import <React/UIView+React.h>
#import "React/RCTConvert.h"
#import <React/RCTBridgeModule.h>

@implementation RNImageFilterView {
  RCTEventDispatcher *_eventDispatcher;
  UIView *_view;
  UIImageView *_imageView;
  CIImage *_image;
  NSString *_filterName;
}

-(instancetype) initWithEventDispatcher:(RCTEventDispatcher *)eventDispatcher {
  if((self = [super init])) {
    _eventDispatcher = eventDispatcher;
    
    _imageView = [UIImageView new];
  }
  return self;
}

-(void) setSource:(NSDictionary *) source {
  NSString *uri = [RCTConvert NSString:[source objectForKey:@"uri"]];
  NSURL *url = [NSURL URLWithString:uri];
  CIImage* originalCIImage = [CIImage imageWithContentsOfURL:url];
  _image = originalCIImage;
  [self applyFilterImage];
}

-(void) setFilter:(NSDictionary *) filter {
  NSString *name = [RCTConvert NSString:[filter objectForKey:@"name"]];
  _filterName = name;
  [self applyFilterImage];
}

-(void) applyFilterImage {
  if(_filterName == nil) {
    _imageView.image = [UIImage imageWithCIImage:_image];
  }
  else {
    CIFilter *filter = [CIFilter filterWithName:_filterName];
    [filter setValue:_image forKey:kCIInputImageKey];
    _imageView.image = [UIImage imageWithCIImage:filter.outputImage];
  }
}

-(void) setCircle: (NSNumber *) number {
  _imageView.layer.cornerRadius = [RCTConvert CGFloat:number];
}

-(void)layoutSubviews {
  [super layoutSubviews];
  if(_view == nil) {
    _view = [[UIView alloc] initWithFrame:self.reactContentFrame];
    _imageView.frame = self.reactContentFrame;
    _imageView.layer.masksToBounds = YES;
    [self addSubview:_imageView];
  }
}


- (void)insertReactSubview:(UIView *)view atIndex:(NSInteger)atIndex
{
  [_imageView insertSubview:view atIndex:atIndex];
}

- (void)removeReactSubview:(UIView *)subview
{
  [subview removeFromSuperview];
}


@end
