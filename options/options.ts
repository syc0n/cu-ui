/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

module KeyBindings {
    function handleKeyBind(container, jsonDict, item) {
        var itemDiv = $('<div/>');
        $('<div/>').addClass('binding-name').text(item).appendTo(itemDiv);
        var itemVal = $('<div/>').addClass('binding-value').text(keyCode.dxKeyCodeMap[jsonDict[item]]).appendTo(itemDiv);
        itemDiv.addClass('binding-item').click(function () {
            itemVal.text('Press a key');
            $(document).unbind('keyup').on('keyup', function (e) {
                $(document).unbind('keyup');
                var value = keyCode.getValueByEvent(e);
                cu.ChangeConfigVar(item, value.toString());
                itemVal.text(keyCode.dxKeyCodeMap[value]);
            });
        });
        itemDiv.appendTo(container);
    }

    cu.Listen('HandleReceiveConfigVars', function (configs) {
        if (configs) {
            var jsonDict = $.parseJSON(configs);

            var container = $('#binding-container');
            container.empty();
            for (var item in jsonDict) {
                handleKeyBind(container, jsonDict, item);
            }
        }
    });

    cu.OnInitialized(function () {
        cu.GetConfigVars(cu.keyBindingTag);
    });

    $('#btn-apply').click(function () {
        cuAPI.SaveConfigChanges();
    });

    $('#btn-save').click(function () {
        cuAPI.SaveConfigChanges();
        cuAPI.CloseUI('options');
    });

    $('#btn-defaults').click(function () {
        cuAPI.RestoreConfigDefaults(cu.keyBindingTag);
        cuAPI.GetConfigVars(cu.keyBindingTag);
    });

    $('#btn-cancel').click(function () {
        cuAPI.CancelAllConfigChanges(cu.keyBindingTag);
        cuAPI.CloseUI('options');
    });
}


var keyCode = {

    getKeyCode: function (e) {
        var keycode = null;
        if (window.event) {
            keycode = window.event.keyCode;
        } else if (e) {
            keycode = e.which;
        }
        return keycode;
    },

    getKeyCodeValue: function (keyCode) {
        return this.jsKeyCodeMap[keyCode];
    },

    getValueByEvent: function (e) {
        return this.getKeyCodeValue(this.getKeyCode(e));
    },

    dxKeyCodeMap: {
        0x01: 'ESCAPE', 0x02: '1', 0x03: '2', 0x04: '3', 0x05: '4', 0x06: '5', 0x07: '6', 0x08: '7',
        0x0B: '0', 0x0C: '-', 0x0D: '=', 0x0E: 'BACK', 0x0F: 'TAB', 0x10: 'Q', 0x11: 'W', 0x12: 'E',
        0x15: 'Y', 0x16: 'U', 0x17: 'I', 0x18: 'O', 0x19: 'P', 0x1A: 'LBRACKET', 0x1B: 'RBRACKET', 0x1C: 'RETURN',
        0x1D: 'CONTROL', 0x1E: 'A', 0x1F: 'S', 0x20: 'D', 0x21: 'F', 0x22: 'G', 0x23: 'H', 0x24: 'J',
        0x27: 'SEMICOLON', 0x28: 'APOSTROPHE', 0x29: 'GRAVE', 0x2A: 'SHIFT', 0x2B: 'BACKSLASH', 0x2C: 'Z', 0x2D: 'X', 0x14: 'T',
        0x2E: 'C', 0x2F: 'V', 0x30: 'B', 0x31: 'N', 0x32: 'M', 0x33: 'COMMA', 0x34: 'PERIOD', 0x35: 'SLASH',
        0x37: 'MULTIPLY', 0x38: 'ALT', 0x39: 'SPACE', 0x3A: 'CAPITAL', 0x3B: 'F1', 0x3C: 'F2', 0x3D: 'F3', 0x3E: 'F4',
        0x3F: 'F5', 0x40: 'F6', 0x41: 'F7', 0x42: 'F8', 0x43: 'F9', 0x44: 'F10', 0x45: 'NUMLOCK', 0x46: 'SCROLL',
        0x48: 'NUMPAD8', 0x49: 'NUMPAD9', 0x4A: 'SUBTRACT', 0x4B: 'NUMPAD4', 0x4C: 'NUMPAD5', 0x4D: 'NUMPAD6', 0x4E: 'ADD', 0xDC: 'RWIN',
        0x4F: 'NUMPAD1', 0x50: 'NUMPAD2', 0x51: 'NUMPAD3', 0x52: 'NUMPAD0', 0x53: 'DECIMAL', 0x56: 'OEM_102', 0x57: 'F11', 0x47: 'NUMPAD7',
        0x58: 'F12', 0x64: 'F13', 0x65: 'F14', 0x66: 'F15', 0x70: 'KANA', 0x73: 'ABNT_C1', 0x79: 'CONVERT', 0x7B: 'NOCONVERT',
        0x7D: 'YEN', 0x7E: 'ABNT_C2', 0x8D: 'NUMPADEQUALS', 0x90: 'PREVTRACK', 0x91: 'AT', 0x92: 'COLON', 0x93: 'UNDERLINE', 0x36: 'SHIFT',
        0x94: 'KANJI', 0x95: 'STOP', 0x96: 'AX', 0x97: 'UNLABELED', 0x99: 'NEXTTRACK', 0x9C: 'NUMPADENTER', 0x9D: 'CONTROL', 0x26: 'L',
        0xA0: 'MUTE', 0xA1: 'CALCULATOR', 0xA2: 'PLAYPAUSE', 0xA4: 'MEDIASTOP', 0xAE: 'VOLUMEDOWN', 0xB0: 'VOLUMEUP', 0xB2: 'WEBHOME', 0x25: 'K',
        0xB3: 'NUMPADCOMMA', 0xB5: 'DIVIDE', 0xB7: 'SYSRQ', 0xB8: 'ALT', 0xC5: 'PAUSE', 0xC7: 'HOME ', 0xC8: 'UP', 0xC9: 'PRIOR',
        0xCB: 'LEFT', 0xCD: 'RIGHT', 0xCF: 'END', 0xD0: 'DOWN', 0xD1: 'NEXT', 0xD2: 'INSERT', 0xD3: 'DELETE', 0xDB: 'LWIN',
        0xDD: 'APPS', 0xDE: 'POWER', 0xDF: 'SLEEP', 0xE3: 'WAKE', 0xE5: 'WEBSEARCH', 0xE6: 'WEBFAVORITES', 0xE7: 'WEBREFRESH', 0xE8: 'WEBSTOP',
        0xE9: 'WEBFORWARD', 0xEA: 'WEBBACK', 0xEB: 'MYCOMPUTER', 0xEC: 'MAIL', 0xED: 'MEDIASELECT', 0x09: '8', 0x13: 'R', 0x0A: '9',
    },

    jsKeyCodeMap: {
        8: 0x0E,
        9: 0x0F,
        13: 0x1C,
        16: 0x2A | 0x36, // javascript only detects 'Shift' so we OR lshift and rshift
        17: 0x1D | 0x9D, // CTRL
        18: 0x38 | 0xB8, // ALT
        19: 0xC5,
        20: 0x3A,
        27: 0x01,
        32: 0x39,
        //PAGE_UP: 33,     // also NUM_NORTH_EAST
        //PAGE_DOWN: 34,   // also NUM_SOUTH_EAST
        35: 0xCF,
        36: 0xC7,
        37: 0xCB,
        38: 0xC8,
        39: 0xCD,
        40: 0xD0,
        //PRINT_SCREEN: 44,
        45: 0xD2,
        46: 0xD3,
        //0 - 9
        48: 0x0B,
        49: 0x02,
        50: 0x03,
        51: 0x04,
        52: 0x05,
        53: 0x06,
        54: 0x07,
        55: 0x08,
        56: 0x09,
        57: 0x0A,
        //A - Z
        65: 0x1E,
        66: 0x30,
        67: 0x2E,
        68: 0x20,
        69: 0x12,
        70: 0x21,
        71: 0x22,
        72: 0x23,
        73: 0x17,
        74: 0x24,
        75: 0x25,
        76: 0x26,
        77: 0x32,
        78: 0x31,
        79: 0x18,
        80: 0x19,
        81: 0x10,
        82: 0x13,
        83: 0x1F,
        84: 0x14,
        85: 0x16,
        86: 0x2F,
        87: 0x11,
        88: 0x2D,
        89: 0x15,
        90: 0x2C,
        91: 0xDB,
        92: 0xDC,
        //CONTEXT_MENU: 93,
        // NUMPAD0-9
        96: 0x52,
        97: 0x4F,
        98: 0x50,
        99: 0x51,
        100: 0x4B,
        101: 0x4C,
        102: 0x4D,
        103: 0x47,
        104: 0x48,
        105: 0x49,
        // NUMPAD special keys
        106: 0x37,
        107: 0x4E,
        109: 0x4A,
        110: 0x53,
        111: 0xB5,
        // f1-f12
        112: 0x3B,
        113: 0x3C,
        114: 0x3D,
        115: 0x3E,
        116: 0x3F,
        117: 0x40,
        118: 0x41,
        119: 0x42,
        120: 0x43,
        121: 0x44,
        122: 0x57,
        123: 0x58,
        144: 0x45,
        145: 0x46,

        // OS-specific media keys like volume controls and browser controls.
        0xA6: 0xEA, // WEB_BACK
        0xA7: 0xE9, // WEB_FORWARD
        0xA8: 0xE7, // WEB_REFRESH
        0xA9: 0xE8, // WEB_STOP
        0xAA: 0xE5, // WEB_SEARCH
        0xAB: 0xE6, // WEB_FAVORITES
        0xAC: 0xB2, // WEB_HOME
        0xAD: 0xA0, // WEB_MUTE
        0xAE: 0xAE, // Volume Down key
        0xAF: 0xB0, // Volume Up key
        0xB0: 0x99, // Next Track key
        0xB1: 0x90, // Previous Track key
        0xB2: 0xA4, // Stop Media key
        0xB3: 0xA2, // Play/Pause Media key
        0xB4: 0xEC, // Start Mail key
        0xB5: 0xED, // Select Media key
        //    0xB6: ????, // Start Application 1 key
        //    0xB7: ????, // Start Application 2 key

        186: 0x27,
        189: 0x0C,
        187: 0x0D,
        188: 0x33,
        190: 0x34,
        191: 0x35,
        192: 0x29,
        222: 0x28,
        219: 0x1A,
        220: 0x2B,
        221: 0x1B,
    },

    jsModifiedByShift: {
        192: '~', 48: ')', 49: '!', 50: '@', 51: '#', 52: '$', 53: '%', 54: '^', 55: '&', 56: '*', 57: '(', 109: '_', 61: '+',
        219: '{', 221: '}', 220: '|', 59: ':', 222: '\'', 188: '<', 189: '>', 191: '?',
        96: 'insert', 97: 'end', 98: 'down', 99: 'pagedown', 100: 'left', 102: 'right', 103: 'home', 104: 'up', 105: 'pageup'
    }
}