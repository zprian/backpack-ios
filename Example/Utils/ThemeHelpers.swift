/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2018-2019 Skyscanner Ltd
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import Foundation
import Backpack.Theme

class ThemeHelpers: NSObject {

    @objc
    enum ThemeName: Int {
        case none = 0, london, hongKong, doha, silver
    }

    @objc
    class func applyAllThemes() {
        Theme.apply(DefaultTheme())
        Theme.apply(LondonTheme())
        Theme.apply(HongKongTheme())
        Theme.apply(DohaTheme())
        Theme.apply(SilverTheme())
    }

    @objc
    class func themeDefinition(forTheme: ThemeName) -> BPKThemeDefinition {
        switch forTheme {
        case .none:
            return DefaultTheme()
        case .london:
            return LondonTheme()
        case .hongKong:
            return HongKongTheme()
        case .doha:
            return DohaTheme()
        case .silver:
            return SilverTheme()
        }
    }
}
