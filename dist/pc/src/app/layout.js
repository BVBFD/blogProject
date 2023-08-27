"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.metadata = void 0;
var Navbar_1 = __importDefault(require("@/components/Navbar/Navbar"));
require("./globals.css");
var google_1 = require("next/font/google");
var ThemeContext_1 = require("@/context/ThemeContext");
var didot = (0, google_1.GFS_Didot)({ subsets: ['greek'], weight: '400' });
exports.metadata = {
    title: 'Blog Project By NextJS App Router Version',
    description: 'Generated by NextJS App Router',
};
function RootLayout(_a) {
    var children = _a.children;
    return (React.createElement("html", { lang: "en" },
        React.createElement("body", { className: didot.className },
            React.createElement(ThemeContext_1.ThemeContextProvider, null,
                React.createElement("div", { className: "container" },
                    React.createElement(Navbar_1.default, null),
                    children)))));
}
exports.default = RootLayout;
//# sourceMappingURL=layout.js.map