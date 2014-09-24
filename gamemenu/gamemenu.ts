/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

module GameMenu {
    $('#btn-options').click(function () {
        cuAPI.OpenUI('options.ui');
        cuAPI.CloseUI('gamemenu');
    });

    $('#btn-quit').click(function () {
        cuAPI.Quit();
    });

    $('#btn-cancel').click(function () {
        cuAPI.CloseUI('gamemenu');
    });
}