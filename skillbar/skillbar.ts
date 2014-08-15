/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/// <reference path="../vendor/jquery.d.ts" />
/// <reference path="../cu/cu.ts" />

module Skillbar {
    var $skillButtons: JQuery;

    cu.OnServerConnected(() => {
        $skillButtons = cu.FindElement('#skillButtons');

        cu.RequestAllAbilities(abilities => {
            abilities.sort((a, b) => a.id.localeCompare(b.id));

            abilities.forEach((ability, i) => {
                var button = ability.MakeButton();

                var elem = button.rootElement.css({ left: (i * 55) + 'px', top: '0' });

                elem.attr('data-tooltip-title', ability.name).attr('data-tooltip-content', ability.tooltip);

                $skillButtons.append(elem);
            });

            Tooltip.init('.abilityButton', { leftOffset: -5, topOffset: -25 });
        });
    });

    cu.SetDebugServer();
}