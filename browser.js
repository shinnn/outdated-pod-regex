window.outdatedPodRegex = function outdatedPodRegex() {
  'use strict';
  // https://github.com/CocoaPods/Core/blob/0.39.0/lib/cocoapods-core/specification/linter.rb#L187-L202
  return /^- ([^\.\s\/][^\s\/]*) (\(unused\)|\d[\d.]+) -> (\(unused\)|\d[\d.]+) \(latest version (.+)\)$/gm;
};
