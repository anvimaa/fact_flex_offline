import { av as head, _ as derived, an as ensure_array_like, aB as stringify, aw as attr, az as attr_class, ah as sanitize_props, ai as spread_props, ap as slot } from './index-DPRpZFUH.js';
import { g as goto } from './client2-CcJ2Tk7F.js';
import { B as Button } from './button-DjcfiVkK.js';
import { C as Card } from './card-ChfkAej9.js';
import { C as Card_header, a as Card_title, b as Card_content } from './card-title-DxB_j2nk.js';
import { C as Card_description } from './card-description-BQA4H5z9.js';
import { q as getTipoLabel, r as getStatusBadge, f as formatCurrency, u as Circle_check, d as getPrintUrl, I as Icon, v as getCambio, w as getFirstAndLastName } from './utils3-DjmiJAAD.js';
import { B as Badge } from './badge-D-ySjlTn.js';
import { S as Separator } from './separator-DYGMnC9J.js';
import { T as Table$1, a as Table_header, b as Table_row, d as Table_head, c as Table_body, e as Table_cell } from './table-row-B-9FJQyf.js';
import { e as escape_html } from './escaping-CqgfEcN3.js';
import './Toaster.svelte_svelte_type_style_lang-OM98s5RX.js';
import { C as CERTIFICATE_NUMBER } from './constants-DhttDS3t.js';
import { E } from './jspdf.es.min-tD8vcH26.js';
import { Q as QRCodeStyling } from './qr-code-styling-Cv8cjKyf.js';
import { A as Arrow_left } from './arrow-left-B04jSFwd.js';
import { F as File_text } from './file-text-BeaU1KrO.js';
import { U as User } from './user-D18r-fvg.js';
import { D as Dollar_sign } from './dollar-sign-oLGOq175.js';
import { R as Refresh_cw } from './refresh-cw-Cx_TEc4q.js';
import { P as Printer } from './printer-Byrp_rev.js';
import { H as History } from './history-DbDPS9Da.js';
import './root-B0ubZxsu.js';
import './events-GtUqDgmb.js';
import './index2-Cz2gv4fD.js';
import './state.svelte-BwryGJJV.js';
import './index-r8oPdwp5.js';
import './public-B844qK3e.js';
import './use-id-BeJs9ypc.js';
import './attrs-mduo83PF.js';
import './_commonjsHelpers-BFTU3MAI.js';
import 'module';

/**
 * Improved text function with halign and valign support
 * Inspiration from: http://stackoverflow.com/questions/28327510/align-text-right-using-jspdf/28433113#28433113
 */
function autoTableText (text, x, y, styles, doc) {
    styles = styles || {};
    var PHYSICAL_LINE_HEIGHT = 1.15;
    var k = doc.internal.scaleFactor;
    var fontSize = doc.internal.getFontSize() / k;
    var lineHeightFactor = doc.getLineHeightFactor
        ? doc.getLineHeightFactor()
        : PHYSICAL_LINE_HEIGHT;
    var lineHeight = fontSize * lineHeightFactor;
    var splitRegex = /\r\n|\r|\n/g;
    var splitText = '';
    var lineCount = 1;
    if (styles.valign === 'middle' ||
        styles.valign === 'bottom' ||
        styles.halign === 'center' ||
        styles.halign === 'right') {
        splitText = typeof text === 'string' ? text.split(splitRegex) : text;
        lineCount = splitText.length || 1;
    }
    // Align the top
    y += fontSize * (2 - PHYSICAL_LINE_HEIGHT);
    if (styles.valign === 'middle')
        y -= (lineCount / 2) * lineHeight;
    else if (styles.valign === 'bottom')
        y -= lineCount * lineHeight;
    if (styles.halign === 'center' || styles.halign === 'right') {
        var alignSize = fontSize;
        if (styles.halign === 'center')
            alignSize *= 0.5;
        if (splitText && lineCount >= 1) {
            for (var iLine = 0; iLine < splitText.length; iLine++) {
                doc.text(splitText[iLine], x - doc.getStringUnitWidth(splitText[iLine]) * alignSize, y);
                y += lineHeight;
            }
            return doc;
        }
        x -= doc.getStringUnitWidth(text) * alignSize;
    }
    if (styles.halign === 'justify') {
        doc.text(text, x, y, { maxWidth: styles.maxWidth || 100, align: 'justify' });
    }
    else {
        doc.text(text, x, y);
    }
    return doc;
}

var globalDefaults = {};
var DocHandler = /** @class */ (function () {
    function DocHandler(jsPDFDocument) {
        this.jsPDFDocument = jsPDFDocument;
        this.userStyles = {
            // Black for versions of jspdf without getTextColor
            textColor: jsPDFDocument.getTextColor
                ? this.jsPDFDocument.getTextColor()
                : 0,
            fontSize: jsPDFDocument.internal.getFontSize(),
            fontStyle: jsPDFDocument.internal.getFont().fontStyle,
            font: jsPDFDocument.internal.getFont().fontName,
            // 0 for versions of jspdf without getLineWidth
            lineWidth: jsPDFDocument.getLineWidth
                ? this.jsPDFDocument.getLineWidth()
                : 0,
            // Black for versions of jspdf without getDrawColor
            lineColor: jsPDFDocument.getDrawColor
                ? this.jsPDFDocument.getDrawColor()
                : 0,
        };
    }
    DocHandler.setDefaults = function (defaults, doc) {
        if (doc === void 0) { doc = null; }
        if (doc) {
            doc.__autoTableDocumentDefaults = defaults;
        }
        else {
            globalDefaults = defaults;
        }
    };
    DocHandler.unifyColor = function (c) {
        if (Array.isArray(c)) {
            return c;
        }
        else if (typeof c === 'number') {
            return [c, c, c];
        }
        else if (typeof c === 'string') {
            return [c];
        }
        else {
            return null;
        }
    };
    DocHandler.prototype.applyStyles = function (styles, fontOnly) {
        // Font style needs to be applied before font
        // https://github.com/simonbengtsson/jsPDF-AutoTable/issues/632
        var _a, _b, _c;
        if (fontOnly === void 0) { fontOnly = false; }
        if (styles.fontStyle && this.jsPDFDocument.setFontStyle) {
            this.jsPDFDocument.setFontStyle(styles.fontStyle);
        }
        var _d = this.jsPDFDocument.internal.getFont(), fontStyle = _d.fontStyle, fontName = _d.fontName;
        if (styles.font)
            fontName = styles.font;
        if (styles.fontStyle) {
            fontStyle = styles.fontStyle;
            var availableFontStyles = this.getFontList()[fontName];
            if (availableFontStyles &&
                availableFontStyles.indexOf(fontStyle) === -1 &&
                this.jsPDFDocument.setFontStyle) {
                // Common issue was that the default bold in headers
                // made custom fonts not work. For example:
                // https://github.com/simonbengtsson/jsPDF-AutoTable/issues/653
                this.jsPDFDocument.setFontStyle(availableFontStyles[0]);
                fontStyle = availableFontStyles[0];
            }
        }
        this.jsPDFDocument.setFont(fontName, fontStyle);
        if (styles.fontSize)
            this.jsPDFDocument.setFontSize(styles.fontSize);
        if (fontOnly) {
            return; // Performance improvement
        }
        var color = DocHandler.unifyColor(styles.fillColor);
        if (color)
            (_a = this.jsPDFDocument).setFillColor.apply(_a, color);
        color = DocHandler.unifyColor(styles.textColor);
        if (color)
            (_b = this.jsPDFDocument).setTextColor.apply(_b, color);
        color = DocHandler.unifyColor(styles.lineColor);
        if (color)
            (_c = this.jsPDFDocument).setDrawColor.apply(_c, color);
        if (typeof styles.lineWidth === 'number') {
            this.jsPDFDocument.setLineWidth(styles.lineWidth);
        }
    };
    DocHandler.prototype.splitTextToSize = function (text, size, opts) {
        return this.jsPDFDocument.splitTextToSize(text, size, opts);
    };
    /**
     * Adds a rectangle to the PDF
     * @param x Coordinate (in units declared at inception of PDF document) against left edge of the page
     * @param y Coordinate (in units declared at inception of PDF document) against upper edge of the page
     * @param width Width (in units declared at inception of PDF document)
     * @param height Height (in units declared at inception of PDF document)
     * @param fillStyle A string specifying the painting style or null. Valid styles include: 'S' [default] - stroke, 'F' - fill, and 'DF' (or 'FD') - fill then stroke.
     */
    DocHandler.prototype.rect = function (x, y, width, height, fillStyle) {
        // null is excluded from fillStyle possible values because it isn't needed
        // and is prone to bugs as it's used to postpone setting the style
        // https://rawgit.com/MrRio/jsPDF/master/docs/jsPDF.html#rect
        return this.jsPDFDocument.rect(x, y, width, height, fillStyle);
    };
    DocHandler.prototype.getLastAutoTable = function () {
        return this.jsPDFDocument.lastAutoTable || null;
    };
    DocHandler.prototype.getTextWidth = function (text) {
        return this.jsPDFDocument.getTextWidth(text);
    };
    DocHandler.prototype.getDocument = function () {
        return this.jsPDFDocument;
    };
    DocHandler.prototype.setPage = function (page) {
        this.jsPDFDocument.setPage(page);
    };
    DocHandler.prototype.addPage = function () {
        return this.jsPDFDocument.addPage();
    };
    DocHandler.prototype.getFontList = function () {
        return this.jsPDFDocument.getFontList();
    };
    DocHandler.prototype.getGlobalOptions = function () {
        return globalDefaults || {};
    };
    DocHandler.prototype.getDocumentOptions = function () {
        return this.jsPDFDocument.__autoTableDocumentDefaults || {};
    };
    DocHandler.prototype.pageSize = function () {
        var pageSize = this.jsPDFDocument.internal.pageSize;
        // JSPDF 1.4 uses get functions instead of properties on pageSize
        if (pageSize.width == null) {
            pageSize = { width: pageSize.getWidth(), height: pageSize.getHeight() };
        }
        return pageSize;
    };
    DocHandler.prototype.scaleFactor = function () {
        return this.jsPDFDocument.internal.scaleFactor;
    };
    DocHandler.prototype.getLineHeightFactor = function () {
        var doc = this.jsPDFDocument;
        return doc.getLineHeightFactor ? doc.getLineHeightFactor() : 1.15;
    };
    DocHandler.prototype.getLineHeight = function (fontSize) {
        return (fontSize / this.scaleFactor()) * this.getLineHeightFactor();
    };
    DocHandler.prototype.pageNumber = function () {
        var pageInfo = this.jsPDFDocument.internal.getCurrentPageInfo();
        if (!pageInfo) {
            // Only recent versions of jspdf has pageInfo
            return this.jsPDFDocument.internal.getNumberOfPages();
        }
        return pageInfo.pageNumber;
    };
    return DocHandler;
}());

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

var HtmlRowInput = /** @class */ (function (_super) {
    __extends(HtmlRowInput, _super);
    function HtmlRowInput(element) {
        var _this = _super.call(this) || this;
        _this._element = element;
        return _this;
    }
    return HtmlRowInput;
}(Array));
// Base style for all themes
function defaultStyles(scaleFactor) {
    return {
        font: 'helvetica', // helvetica, times, courier
        fontStyle: 'normal', // normal, bold, italic, bolditalic
        overflow: 'linebreak', // linebreak, ellipsize, visible or hidden
        fillColor: false, // Either false for transparent, rbg array e.g. [255, 255, 255] or gray level e.g 200
        textColor: 20,
        halign: 'left', // left, center, right, justify
        valign: 'top', // top, middle, bottom
        fontSize: 10,
        cellPadding: 5 / scaleFactor, // number or {top,left,right,left,vertical,horizontal}
        lineColor: 200,
        lineWidth: 0,
        cellWidth: 'auto', // 'auto'|'wrap'|number
        minCellHeight: 0,
        minCellWidth: 0,
    };
}
function getTheme(name) {
    var themes = {
        striped: {
            table: { fillColor: 255, textColor: 80, fontStyle: 'normal' },
            head: { textColor: 255, fillColor: [41, 128, 185], fontStyle: 'bold' },
            body: {},
            foot: { textColor: 255, fillColor: [41, 128, 185], fontStyle: 'bold' },
            alternateRow: { fillColor: 245 },
        },
        grid: {
            table: {
                fillColor: 255,
                textColor: 80,
                fontStyle: 'normal',
                lineWidth: 0.1,
            },
            head: {
                textColor: 255,
                fillColor: [26, 188, 156],
                fontStyle: 'bold',
                lineWidth: 0,
            },
            body: {},
            foot: {
                textColor: 255,
                fillColor: [26, 188, 156],
                fontStyle: 'bold',
                lineWidth: 0,
            },
            alternateRow: {},
        },
        plain: { head: { fontStyle: 'bold' }, foot: { fontStyle: 'bold' } },
    };
    return themes[name];
}

function getStringWidth(text, styles, doc) {
    doc.applyStyles(styles, true);
    var textArr = Array.isArray(text) ? text : [text];
    var widestLineWidth = textArr
        .map(function (text) { return doc.getTextWidth(text); })
        .reduce(function (a, b) { return Math.max(a, b); }, 0);
    return widestLineWidth;
}
function addTableBorder(doc, table, startPos, cursor) {
    var lineWidth = table.settings.tableLineWidth;
    var lineColor = table.settings.tableLineColor;
    doc.applyStyles({ lineWidth: lineWidth, lineColor: lineColor });
    var fillStyle = getFillStyle(lineWidth, false);
    if (fillStyle) {
        doc.rect(startPos.x, startPos.y, table.getWidth(doc.pageSize().width), cursor.y - startPos.y, fillStyle);
    }
}
function getFillStyle(lineWidth, fillColor) {
    var drawLine = lineWidth > 0;
    var drawBackground = fillColor || fillColor === 0;
    if (drawLine && drawBackground) {
        return 'DF'; // Fill then stroke
    }
    else if (drawLine) {
        return 'S'; // Only stroke (transparent background)
    }
    else if (drawBackground) {
        return 'F'; // Only fill, no stroke
    }
    else {
        return null;
    }
}
function parseSpacing(value, defaultValue) {
    var _a, _b, _c, _d;
    value = value || defaultValue;
    if (Array.isArray(value)) {
        if (value.length >= 4) {
            return {
                top: value[0],
                right: value[1],
                bottom: value[2],
                left: value[3],
            };
        }
        else if (value.length === 3) {
            return {
                top: value[0],
                right: value[1],
                bottom: value[2],
                left: value[1],
            };
        }
        else if (value.length === 2) {
            return {
                top: value[0],
                right: value[1],
                bottom: value[0],
                left: value[1],
            };
        }
        else if (value.length === 1) {
            value = value[0];
        }
        else {
            value = defaultValue;
        }
    }
    if (typeof value === 'object') {
        if (typeof value.vertical === 'number') {
            value.top = value.vertical;
            value.bottom = value.vertical;
        }
        if (typeof value.horizontal === 'number') {
            value.right = value.horizontal;
            value.left = value.horizontal;
        }
        return {
            left: (_a = value.left) !== null && _a !== void 0 ? _a : defaultValue,
            top: (_b = value.top) !== null && _b !== void 0 ? _b : defaultValue,
            right: (_c = value.right) !== null && _c !== void 0 ? _c : defaultValue,
            bottom: (_d = value.bottom) !== null && _d !== void 0 ? _d : defaultValue,
        };
    }
    if (typeof value !== 'number') {
        value = defaultValue;
    }
    return { top: value, right: value, bottom: value, left: value };
}
function getPageAvailableWidth(doc, table) {
    var margins = parseSpacing(table.settings.margin, 0);
    return doc.pageSize().width - (margins.left + margins.right);
}

// Limitations
// - No support for border spacing
// - No support for transparency
function parseCss(supportedFonts, element, scaleFactor, style, window) {
    var result = {};
    var pxScaleFactor = 96 / 72;
    var backgroundColor = parseColor(element, function (elem) {
        return window.getComputedStyle(elem)['backgroundColor'];
    });
    if (backgroundColor != null)
        result.fillColor = backgroundColor;
    var textColor = parseColor(element, function (elem) {
        return window.getComputedStyle(elem)['color'];
    });
    if (textColor != null)
        result.textColor = textColor;
    var padding = parsePadding(style, scaleFactor);
    if (padding)
        result.cellPadding = padding;
    var borderColorSide = 'borderTopColor';
    var finalScaleFactor = pxScaleFactor * scaleFactor;
    var btw = style.borderTopWidth;
    if (style.borderBottomWidth === btw &&
        style.borderRightWidth === btw &&
        style.borderLeftWidth === btw) {
        var borderWidth = (parseFloat(btw) || 0) / finalScaleFactor;
        if (borderWidth)
            result.lineWidth = borderWidth;
    }
    else {
        result.lineWidth = {
            top: (parseFloat(style.borderTopWidth) || 0) / finalScaleFactor,
            right: (parseFloat(style.borderRightWidth) || 0) / finalScaleFactor,
            bottom: (parseFloat(style.borderBottomWidth) || 0) / finalScaleFactor,
            left: (parseFloat(style.borderLeftWidth) || 0) / finalScaleFactor,
        };
        // Choose border color of first available side
        // could be improved by supporting object as lineColor
        if (!result.lineWidth.top) {
            if (result.lineWidth.right) {
                borderColorSide = 'borderRightColor';
            }
            else if (result.lineWidth.bottom) {
                borderColorSide = 'borderBottomColor';
            }
            else if (result.lineWidth.left) {
                borderColorSide = 'borderLeftColor';
            }
        }
    }
    var borderColor = parseColor(element, function (elem) {
        return window.getComputedStyle(elem)[borderColorSide];
    });
    if (borderColor != null)
        result.lineColor = borderColor;
    var accepted = ['left', 'right', 'center', 'justify'];
    if (accepted.indexOf(style.textAlign) !== -1) {
        result.halign = style.textAlign;
    }
    accepted = ['middle', 'bottom', 'top'];
    if (accepted.indexOf(style.verticalAlign) !== -1) {
        result.valign = style.verticalAlign;
    }
    var res = parseInt(style.fontSize || '');
    if (!isNaN(res))
        result.fontSize = res / pxScaleFactor;
    var fontStyle = parseFontStyle(style);
    if (fontStyle)
        result.fontStyle = fontStyle;
    var font = (style.fontFamily || '').toLowerCase();
    if (supportedFonts.indexOf(font) !== -1) {
        result.font = font;
    }
    return result;
}
function parseFontStyle(style) {
    var res = '';
    if (style.fontWeight === 'bold' ||
        style.fontWeight === 'bolder' ||
        parseInt(style.fontWeight) >= 700) {
        res = 'bold';
    }
    if (style.fontStyle === 'italic' || style.fontStyle === 'oblique') {
        res += 'italic';
    }
    return res;
}
function parseColor(element, styleGetter) {
    var cssColor = realColor(element, styleGetter);
    if (!cssColor)
        return null;
    var rgba = cssColor.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d*\.?\d*))?\)$/);
    if (!rgba || !Array.isArray(rgba)) {
        return null;
    }
    var color = [
        parseInt(rgba[1]),
        parseInt(rgba[2]),
        parseInt(rgba[3]),
    ];
    var alpha = parseInt(rgba[4]);
    if (alpha === 0 || isNaN(color[0]) || isNaN(color[1]) || isNaN(color[2])) {
        return null;
    }
    return color;
}
function realColor(elem, styleGetter) {
    var bg = styleGetter(elem);
    if (bg === 'rgba(0, 0, 0, 0)' ||
        bg === 'transparent' ||
        bg === 'initial' ||
        bg === 'inherit') {
        if (elem.parentElement == null) {
            return null;
        }
        return realColor(elem.parentElement, styleGetter);
    }
    else {
        return bg;
    }
}
function parsePadding(style, scaleFactor) {
    var val = [
        style.paddingTop,
        style.paddingRight,
        style.paddingBottom,
        style.paddingLeft,
    ];
    var pxScaleFactor = 96 / (72 / scaleFactor);
    var linePadding = (parseInt(style.lineHeight) - parseInt(style.fontSize)) / scaleFactor / 2;
    var inputPadding = val.map(function (n) {
        return parseInt(n || '0') / pxScaleFactor;
    });
    var padding = parseSpacing(inputPadding, 0);
    if (linePadding > padding.top) {
        padding.top = linePadding;
    }
    if (linePadding > padding.bottom) {
        padding.bottom = linePadding;
    }
    return padding;
}

function parseHtml(doc, input, window, includeHiddenHtml, useCss) {
    var _a, _b;
    if (includeHiddenHtml === void 0) { includeHiddenHtml = false; }
    if (useCss === void 0) { useCss = false; }
    var tableElement;
    if (typeof input === 'string') {
        tableElement = window.document.querySelector(input);
    }
    else {
        tableElement = input;
    }
    var supportedFonts = Object.keys(doc.getFontList());
    var scaleFactor = doc.scaleFactor();
    var head = [], body = [], foot = [];
    if (!tableElement) {
        console.error('Html table could not be found with input: ', input);
        return { head: head, body: body, foot: foot };
    }
    for (var i = 0; i < tableElement.rows.length; i++) {
        var element = tableElement.rows[i];
        var tagName = (_b = (_a = element === null || element === void 0 ? void 0 : element.parentElement) === null || _a === void 0 ? void 0 : _a.tagName) === null || _b === void 0 ? void 0 : _b.toLowerCase();
        var row = parseRowContent(supportedFonts, scaleFactor, window, element, includeHiddenHtml, useCss);
        if (!row)
            continue;
        if (tagName === 'thead') {
            head.push(row);
        }
        else if (tagName === 'tfoot') {
            foot.push(row);
        }
        else {
            // Add to body both if parent is tbody or table
            body.push(row);
        }
    }
    return { head: head, body: body, foot: foot };
}
function parseRowContent(supportedFonts, scaleFactor, window, row, includeHidden, useCss) {
    var resultRow = new HtmlRowInput(row);
    for (var i = 0; i < row.cells.length; i++) {
        var cell = row.cells[i];
        var style_1 = window.getComputedStyle(cell);
        if (includeHidden || style_1.display !== 'none') {
            var cellStyles = void 0;
            if (useCss) {
                cellStyles = parseCss(supportedFonts, cell, scaleFactor, style_1, window);
            }
            resultRow.push({
                rowSpan: cell.rowSpan,
                colSpan: cell.colSpan,
                styles: cellStyles,
                _element: cell,
                content: parseCellContent(cell),
            });
        }
    }
    var style = window.getComputedStyle(row);
    if (resultRow.length > 0 && (includeHidden || style.display !== 'none')) {
        return resultRow;
    }
}
function parseCellContent(orgCell) {
    // Work on cloned node to make sure no changes are applied to html table
    var cell = orgCell.cloneNode(true);
    // Remove extra space and line breaks in markup to make it more similar to
    // what would be shown in html
    cell.innerHTML = cell.innerHTML.replace(/\n/g, '').replace(/ +/g, ' ');
    // Preserve <br> tags as line breaks in the pdf
    cell.innerHTML = cell.innerHTML
        .split(/<br.*?>/) //start with '<br' and ends with '>'.
        .map(function (part) { return part.trim(); })
        .join('\n');
    // innerText for ie
    return cell.innerText || cell.textContent || '';
}

function validateInput(global, document, current) {
    for (var _i = 0, _a = [global, document, current]; _i < _a.length; _i++) {
        var options = _a[_i];
        if (options && typeof options !== 'object') {
            console.error('The options parameter should be of type object, is: ' + typeof options);
        }
        if (options.startY && typeof options.startY !== 'number') {
            console.error('Invalid value for startY option', options.startY);
            delete options.startY;
        }
    }
}

/* eslint-disable @typescript-eslint/no-unused-vars */
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
function assign(target, s, s1, s2, s3) {
    if (target == null) {
        throw new TypeError('Cannot convert undefined or null to object');
    }
    var to = Object(target);
    for (var index = 1; index < arguments.length; index++) {
        // eslint-disable-next-line prefer-rest-params
        var nextSource = arguments[index];
        if (nextSource != null) {
            // Skip over if undefined or null
            for (var nextKey in nextSource) {
                // Avoid bugs when hasOwnProperty is shadowed
                if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                    to[nextKey] = nextSource[nextKey];
                }
            }
        }
    }
    return to;
}

function parseInput(d, current) {
    var doc = new DocHandler(d);
    var document = doc.getDocumentOptions();
    var global = doc.getGlobalOptions();
    validateInput(global, document, current);
    var options = assign({}, global, document, current);
    var win;
    if (typeof window !== 'undefined') {
        win = window;
    }
    var styles = parseStyles(global, document, current);
    var hooks = parseHooks(global, document, current);
    var settings = parseSettings(doc, options);
    var content = parseContent$1(doc, options, win);
    return { id: current.tableId, content: content, hooks: hooks, styles: styles, settings: settings };
}
function parseStyles(gInput, dInput, cInput) {
    var styleOptions = {
        styles: {},
        headStyles: {},
        bodyStyles: {},
        footStyles: {},
        alternateRowStyles: {},
        columnStyles: {},
    };
    var _loop_1 = function (prop) {
        if (prop === 'columnStyles') {
            var global_1 = gInput[prop];
            var document_1 = dInput[prop];
            var current = cInput[prop];
            styleOptions.columnStyles = assign({}, global_1, document_1, current);
        }
        else {
            var allOptions = [gInput, dInput, cInput];
            var styles = allOptions.map(function (opts) { return opts[prop] || {}; });
            styleOptions[prop] = assign({}, styles[0], styles[1], styles[2]);
        }
    };
    for (var _i = 0, _a = Object.keys(styleOptions); _i < _a.length; _i++) {
        var prop = _a[_i];
        _loop_1(prop);
    }
    return styleOptions;
}
function parseHooks(global, document, current) {
    var allOptions = [global, document, current];
    var result = {
        didParseCell: [],
        willDrawCell: [],
        didDrawCell: [],
        willDrawPage: [],
        didDrawPage: [],
    };
    for (var _i = 0, allOptions_1 = allOptions; _i < allOptions_1.length; _i++) {
        var options = allOptions_1[_i];
        if (options.didParseCell)
            result.didParseCell.push(options.didParseCell);
        if (options.willDrawCell)
            result.willDrawCell.push(options.willDrawCell);
        if (options.didDrawCell)
            result.didDrawCell.push(options.didDrawCell);
        if (options.willDrawPage)
            result.willDrawPage.push(options.willDrawPage);
        if (options.didDrawPage)
            result.didDrawPage.push(options.didDrawPage);
    }
    return result;
}
function parseSettings(doc, options) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    var margin = parseSpacing(options.margin, 40 / doc.scaleFactor());
    var startY = (_a = getStartY(doc, options.startY)) !== null && _a !== void 0 ? _a : margin.top;
    var showFoot;
    if (options.showFoot === true) {
        showFoot = 'everyPage';
    }
    else if (options.showFoot === false) {
        showFoot = 'never';
    }
    else {
        showFoot = (_b = options.showFoot) !== null && _b !== void 0 ? _b : 'everyPage';
    }
    var showHead;
    if (options.showHead === true) {
        showHead = 'everyPage';
    }
    else if (options.showHead === false) {
        showHead = 'never';
    }
    else {
        showHead = (_c = options.showHead) !== null && _c !== void 0 ? _c : 'everyPage';
    }
    var useCss = (_d = options.useCss) !== null && _d !== void 0 ? _d : false;
    var theme = options.theme || (useCss ? 'plain' : 'striped');
    var horizontalPageBreak = !!options.horizontalPageBreak;
    var horizontalPageBreakRepeat = (_e = options.horizontalPageBreakRepeat) !== null && _e !== void 0 ? _e : null;
    return {
        includeHiddenHtml: (_f = options.includeHiddenHtml) !== null && _f !== void 0 ? _f : false,
        useCss: useCss,
        theme: theme,
        startY: startY,
        margin: margin,
        pageBreak: (_g = options.pageBreak) !== null && _g !== void 0 ? _g : 'auto',
        rowPageBreak: (_h = options.rowPageBreak) !== null && _h !== void 0 ? _h : 'auto',
        tableWidth: (_j = options.tableWidth) !== null && _j !== void 0 ? _j : 'auto',
        showHead: showHead,
        showFoot: showFoot,
        tableLineWidth: (_k = options.tableLineWidth) !== null && _k !== void 0 ? _k : 0,
        tableLineColor: (_l = options.tableLineColor) !== null && _l !== void 0 ? _l : 200,
        horizontalPageBreak: horizontalPageBreak,
        horizontalPageBreakRepeat: horizontalPageBreakRepeat,
        horizontalPageBreakBehaviour: (_m = options.horizontalPageBreakBehaviour) !== null && _m !== void 0 ? _m : 'afterAllRows',
    };
}
function getStartY(doc, userStartY) {
    var previous = doc.getLastAutoTable();
    var sf = doc.scaleFactor();
    var currentPage = doc.pageNumber();
    var isSamePageAsPreviousTable = false;
    if (previous && previous.startPageNumber) {
        var endingPage = previous.startPageNumber + previous.pageNumber - 1;
        isSamePageAsPreviousTable = endingPage === currentPage;
    }
    if (typeof userStartY === 'number') {
        return userStartY;
    }
    else if (userStartY == null || userStartY === false) {
        if (isSamePageAsPreviousTable && (previous === null || previous === void 0 ? void 0 : previous.finalY) != null) {
            // Some users had issues with overlapping tables when they used multiple
            // tables without setting startY so setting it here to a sensible default.
            return previous.finalY + 20 / sf;
        }
    }
    return null;
}
function parseContent$1(doc, options, window) {
    var head = options.head || [];
    var body = options.body || [];
    var foot = options.foot || [];
    if (options.html) {
        var hidden = options.includeHiddenHtml;
        if (window) {
            var htmlContent = parseHtml(doc, options.html, window, hidden, options.useCss) || {};
            head = htmlContent.head || head;
            body = htmlContent.body || head;
            foot = htmlContent.foot || head;
        }
        else {
            console.error('Cannot parse html in non browser environment');
        }
    }
    var columns = options.columns || parseColumns(head, body, foot);
    return { columns: columns, head: head, body: body, foot: foot };
}
function parseColumns(head, body, foot) {
    var firstRow = head[0] || body[0] || foot[0] || [];
    var result = [];
    Object.keys(firstRow)
        .filter(function (key) { return key !== '_element'; })
        .forEach(function (key) {
        var colSpan = 1;
        var input;
        if (Array.isArray(firstRow)) {
            input = firstRow[parseInt(key)];
        }
        else {
            input = firstRow[key];
        }
        if (typeof input === 'object' && !Array.isArray(input)) {
            colSpan = (input === null || input === void 0 ? void 0 : input.colSpan) || 1;
        }
        for (var i = 0; i < colSpan; i++) {
            var id = void 0;
            if (Array.isArray(firstRow)) {
                id = result.length;
            }
            else {
                id = key + (i > 0 ? "_".concat(i) : '');
            }
            var rowResult = { dataKey: id };
            result.push(rowResult);
        }
    });
    return result;
}

var HookData = /** @class */ (function () {
    function HookData(doc, table, cursor) {
        this.table = table;
        this.pageNumber = table.pageNumber;
        this.settings = table.settings;
        this.cursor = cursor;
        this.doc = doc.getDocument();
    }
    return HookData;
}());
var CellHookData = /** @class */ (function (_super) {
    __extends(CellHookData, _super);
    function CellHookData(doc, table, cell, row, column, cursor) {
        var _this = _super.call(this, doc, table, cursor) || this;
        _this.cell = cell;
        _this.row = row;
        _this.column = column;
        _this.section = row.section;
        return _this;
    }
    return CellHookData;
}(HookData));

var Table = /** @class */ (function () {
    function Table(input, content) {
        this.pageNumber = 1;
        this.id = input.id;
        this.settings = input.settings;
        this.styles = input.styles;
        this.hooks = input.hooks;
        this.columns = content.columns;
        this.head = content.head;
        this.body = content.body;
        this.foot = content.foot;
    }
    Table.prototype.getHeadHeight = function (columns) {
        return this.head.reduce(function (acc, row) { return acc + row.getMaxCellHeight(columns); }, 0);
    };
    Table.prototype.getFootHeight = function (columns) {
        return this.foot.reduce(function (acc, row) { return acc + row.getMaxCellHeight(columns); }, 0);
    };
    Table.prototype.allRows = function () {
        return this.head.concat(this.body).concat(this.foot);
    };
    Table.prototype.callCellHooks = function (doc, handlers, cell, row, column, cursor) {
        for (var _i = 0, handlers_1 = handlers; _i < handlers_1.length; _i++) {
            var handler = handlers_1[_i];
            var data = new CellHookData(doc, this, cell, row, column, cursor);
            var result = handler(data) === false;
            // Make sure text is always string[] since user can assign string
            cell.text = Array.isArray(cell.text) ? cell.text : [cell.text];
            if (result) {
                return false;
            }
        }
        return true;
    };
    Table.prototype.callEndPageHooks = function (doc, cursor) {
        doc.applyStyles(doc.userStyles);
        for (var _i = 0, _a = this.hooks.didDrawPage; _i < _a.length; _i++) {
            var handler = _a[_i];
            handler(new HookData(doc, this, cursor));
        }
    };
    Table.prototype.callWillDrawPageHooks = function (doc, cursor) {
        for (var _i = 0, _a = this.hooks.willDrawPage; _i < _a.length; _i++) {
            var handler = _a[_i];
            handler(new HookData(doc, this, cursor));
        }
    };
    Table.prototype.getWidth = function (pageWidth) {
        if (typeof this.settings.tableWidth === 'number') {
            return this.settings.tableWidth;
        }
        else if (this.settings.tableWidth === 'wrap') {
            var wrappedWidth = this.columns.reduce(function (total, col) { return total + col.wrappedWidth; }, 0);
            return wrappedWidth;
        }
        else {
            var margin = this.settings.margin;
            return pageWidth - margin.left - margin.right;
        }
    };
    return Table;
}());
var Row = /** @class */ (function () {
    function Row(raw, index, section, cells, spansMultiplePages) {
        if (spansMultiplePages === void 0) { spansMultiplePages = false; }
        this.height = 0;
        this.raw = raw;
        if (raw instanceof HtmlRowInput) {
            this.raw = raw._element;
            this.element = raw._element;
        }
        this.index = index;
        this.section = section;
        this.cells = cells;
        this.spansMultiplePages = spansMultiplePages;
    }
    Row.prototype.getMaxCellHeight = function (columns) {
        var _this = this;
        return columns.reduce(function (acc, column) { var _a; return Math.max(acc, ((_a = _this.cells[column.index]) === null || _a === void 0 ? void 0 : _a.height) || 0); }, 0);
    };
    Row.prototype.hasRowSpan = function (columns) {
        var _this = this;
        return (columns.filter(function (column) {
            var cell = _this.cells[column.index];
            if (!cell)
                return false;
            return cell.rowSpan > 1;
        }).length > 0);
    };
    Row.prototype.canEntireRowFit = function (height, columns) {
        return this.getMaxCellHeight(columns) <= height;
    };
    Row.prototype.getMinimumRowHeight = function (columns, doc) {
        var _this = this;
        return columns.reduce(function (acc, column) {
            var cell = _this.cells[column.index];
            if (!cell)
                return 0;
            var lineHeight = doc.getLineHeight(cell.styles.fontSize);
            var vPadding = cell.padding('vertical');
            var oneRowHeight = vPadding + lineHeight;
            return oneRowHeight > acc ? oneRowHeight : acc;
        }, 0);
    };
    return Row;
}());
var Cell = /** @class */ (function () {
    function Cell(raw, styles, section) {
        var _a;
        this.contentHeight = 0;
        this.contentWidth = 0;
        this.wrappedWidth = 0;
        this.minReadableWidth = 0;
        this.minWidth = 0;
        this.width = 0;
        this.height = 0;
        this.x = 0;
        this.y = 0;
        this.styles = styles;
        this.section = section;
        this.raw = raw;
        var content = raw;
        if (raw != null && typeof raw === 'object' && !Array.isArray(raw)) {
            this.rowSpan = raw.rowSpan || 1;
            this.colSpan = raw.colSpan || 1;
            content = (_a = raw.content) !== null && _a !== void 0 ? _a : raw;
            if (raw._element) {
                this.raw = raw._element;
            }
        }
        else {
            this.rowSpan = 1;
            this.colSpan = 1;
        }
        // Stringify 0 and false, but not undefined or null
        var text = content != null ? '' + content : '';
        var splitRegex = /\r\n|\r|\n/g;
        this.text = text.split(splitRegex);
    }
    Cell.prototype.getTextPos = function () {
        var y;
        if (this.styles.valign === 'top') {
            y = this.y + this.padding('top');
        }
        else if (this.styles.valign === 'bottom') {
            y = this.y + this.height - this.padding('bottom');
        }
        else {
            var netHeight = this.height - this.padding('vertical');
            y = this.y + netHeight / 2 + this.padding('top');
        }
        var x;
        if (this.styles.halign === 'right') {
            x = this.x + this.width - this.padding('right');
        }
        else if (this.styles.halign === 'center') {
            var netWidth = this.width - this.padding('horizontal');
            x = this.x + netWidth / 2 + this.padding('left');
        }
        else {
            x = this.x + this.padding('left');
        }
        return { x: x, y: y };
    };
    // TODO (v4): replace parameters with only (lineHeight)
    Cell.prototype.getContentHeight = function (scaleFactor, lineHeightFactor) {
        if (lineHeightFactor === void 0) { lineHeightFactor = 1.15; }
        var lineCount = Array.isArray(this.text) ? this.text.length : 1;
        var lineHeight = (this.styles.fontSize / scaleFactor) * lineHeightFactor;
        var height = lineCount * lineHeight + this.padding('vertical');
        return Math.max(height, this.styles.minCellHeight);
    };
    Cell.prototype.padding = function (name) {
        var padding = parseSpacing(this.styles.cellPadding, 0);
        if (name === 'vertical') {
            return padding.top + padding.bottom;
        }
        else if (name === 'horizontal') {
            return padding.left + padding.right;
        }
        else {
            return padding[name];
        }
    };
    return Cell;
}());
var Column = /** @class */ (function () {
    function Column(dataKey, raw, index) {
        this.wrappedWidth = 0;
        this.minReadableWidth = 0;
        this.minWidth = 0;
        this.width = 0;
        this.dataKey = dataKey;
        this.raw = raw;
        this.index = index;
    }
    Column.prototype.getMaxCustomCellWidth = function (table) {
        var max = 0;
        for (var _i = 0, _a = table.allRows(); _i < _a.length; _i++) {
            var row = _a[_i];
            var cell = row.cells[this.index];
            if (cell && typeof cell.styles.cellWidth === 'number') {
                max = Math.max(max, cell.styles.cellWidth);
            }
        }
        return max;
    };
    return Column;
}());

/**
 * Calculate the column widths
 */
function calculateWidths(doc, table) {
    calculate(doc, table);
    var resizableColumns = [];
    var initialTableWidth = 0;
    table.columns.forEach(function (column) {
        var customWidth = column.getMaxCustomCellWidth(table);
        if (customWidth) {
            // final column width
            column.width = customWidth;
        }
        else {
            // initial column width (will be resized)
            column.width = column.wrappedWidth;
            resizableColumns.push(column);
        }
        initialTableWidth += column.width;
    });
    // width difference that needs to be distributed
    var resizeWidth = table.getWidth(doc.pageSize().width) - initialTableWidth;
    // first resize attempt: with respect to minReadableWidth and minWidth
    if (resizeWidth) {
        resizeWidth = resizeColumns(resizableColumns, resizeWidth, function (column) {
            return Math.max(column.minReadableWidth, column.minWidth);
        });
    }
    // second resize attempt: ignore minReadableWidth but respect minWidth
    if (resizeWidth) {
        resizeWidth = resizeColumns(resizableColumns, resizeWidth, function (column) { return column.minWidth; });
    }
    resizeWidth = Math.abs(resizeWidth);
    if (!table.settings.horizontalPageBreak &&
        resizeWidth > 0.1 / doc.scaleFactor()) {
        // Table can't get smaller due to custom-width or minWidth restrictions
        // We can't really do much here. Up to user to for example
        // reduce font size, increase page size or remove custom cell widths
        // to allow more columns to be reduced in size
        resizeWidth = resizeWidth < 1 ? resizeWidth : Math.round(resizeWidth);
        console.log("Of the table content, ".concat(resizeWidth, " units width could not fit page"));
    }
    applyColSpans(table);
    fitContent(table, doc);
    applyRowSpans(table);
}
function calculate(doc, table) {
    var sf = doc.scaleFactor();
    var horizontalPageBreak = table.settings.horizontalPageBreak;
    var availablePageWidth = getPageAvailableWidth(doc, table);
    table.allRows().forEach(function (row) {
        for (var _i = 0, _a = table.columns; _i < _a.length; _i++) {
            var column = _a[_i];
            var cell = row.cells[column.index];
            if (!cell)
                continue;
            var hooks = table.hooks.didParseCell;
            table.callCellHooks(doc, hooks, cell, row, column, null);
            var padding = cell.padding('horizontal');
            cell.contentWidth = getStringWidth(cell.text, cell.styles, doc) + padding;
            // Using [^\S\u00A0] instead of \s ensures that we split the text on all
            // whitespace except non-breaking spaces (\u00A0). We need to preserve
            // them in the split process to ensure correct word separation and width
            // calculation.
            var longestWordWidth = getStringWidth(cell.text.join(' ').split(/[^\S\u00A0]+/), cell.styles, doc);
            cell.minReadableWidth = longestWordWidth + cell.padding('horizontal');
            if (typeof cell.styles.cellWidth === 'number') {
                cell.minWidth = cell.styles.cellWidth;
                cell.wrappedWidth = cell.styles.cellWidth;
            }
            else if (cell.styles.cellWidth === 'wrap' ||
                horizontalPageBreak === true) {
                // cell width should not be more than available page width
                if (cell.contentWidth > availablePageWidth) {
                    cell.minWidth = availablePageWidth;
                    cell.wrappedWidth = availablePageWidth;
                }
                else {
                    cell.minWidth = cell.contentWidth;
                    cell.wrappedWidth = cell.contentWidth;
                }
            }
            else {
                // auto
                var defaultMinWidth = 10 / sf;
                cell.minWidth = cell.styles.minCellWidth || defaultMinWidth;
                cell.wrappedWidth = cell.contentWidth;
                if (cell.minWidth > cell.wrappedWidth) {
                    cell.wrappedWidth = cell.minWidth;
                }
            }
        }
    });
    table.allRows().forEach(function (row) {
        for (var _i = 0, _a = table.columns; _i < _a.length; _i++) {
            var column = _a[_i];
            var cell = row.cells[column.index];
            // For now we ignore the minWidth and wrappedWidth of colspan cells when calculating colspan widths.
            // Could probably be improved upon however.
            if (cell && cell.colSpan === 1) {
                column.wrappedWidth = Math.max(column.wrappedWidth, cell.wrappedWidth);
                column.minWidth = Math.max(column.minWidth, cell.minWidth);
                column.minReadableWidth = Math.max(column.minReadableWidth, cell.minReadableWidth);
            }
            else {
                // Respect cellWidth set in columnStyles even if there is no cells for this column
                // or if the column only have colspan cells. Since the width of colspan cells
                // does not affect the width of columns, setting columnStyles cellWidth enables the
                // user to at least do it manually.
                // Note that this is not perfect for now since for example row and table styles are
                // not accounted for
                var columnStyles = table.styles.columnStyles[column.dataKey] ||
                    table.styles.columnStyles[column.index] ||
                    {};
                var cellWidth = columnStyles.cellWidth || columnStyles.minCellWidth;
                if (cellWidth && typeof cellWidth === 'number') {
                    column.minWidth = cellWidth;
                    column.wrappedWidth = cellWidth;
                }
            }
            if (cell) {
                // Make sure all columns get at least min width even though width calculations are not based on them
                if (cell.colSpan > 1 && !column.minWidth) {
                    column.minWidth = cell.minWidth;
                }
                if (cell.colSpan > 1 && !column.wrappedWidth) {
                    column.wrappedWidth = cell.minWidth;
                }
            }
        }
    });
}
/**
 * Distribute resizeWidth on passed resizable columns
 */
function resizeColumns(columns, resizeWidth, getMinWidth) {
    var initialResizeWidth = resizeWidth;
    var sumWrappedWidth = columns.reduce(function (acc, column) { return acc + column.wrappedWidth; }, 0);
    for (var i = 0; i < columns.length; i++) {
        var column = columns[i];
        var ratio = column.wrappedWidth / sumWrappedWidth;
        var suggestedChange = initialResizeWidth * ratio;
        var suggestedWidth = column.width + suggestedChange;
        var minWidth = getMinWidth(column);
        var newWidth = suggestedWidth < minWidth ? minWidth : suggestedWidth;
        resizeWidth -= newWidth - column.width;
        column.width = newWidth;
    }
    resizeWidth = Math.round(resizeWidth * 1e10) / 1e10;
    // Run the resizer again if there's remaining width needs
    // to be distributed and there're columns that can be resized
    if (resizeWidth) {
        var resizableColumns = columns.filter(function (column) {
            return resizeWidth < 0
                ? column.width > getMinWidth(column) // check if column can shrink
                : true; // check if column can grow
        });
        if (resizableColumns.length) {
            resizeWidth = resizeColumns(resizableColumns, resizeWidth, getMinWidth);
        }
    }
    return resizeWidth;
}
function applyRowSpans(table) {
    var rowSpanCells = {};
    var colRowSpansLeft = 1;
    var all = table.allRows();
    for (var rowIndex = 0; rowIndex < all.length; rowIndex++) {
        var row = all[rowIndex];
        for (var _i = 0, _a = table.columns; _i < _a.length; _i++) {
            var column = _a[_i];
            var data = rowSpanCells[column.index];
            if (colRowSpansLeft > 1) {
                colRowSpansLeft--;
                delete row.cells[column.index];
            }
            else if (data) {
                data.cell.height += row.height;
                colRowSpansLeft = data.cell.colSpan;
                delete row.cells[column.index];
                data.left--;
                if (data.left <= 1) {
                    delete rowSpanCells[column.index];
                }
            }
            else {
                var cell = row.cells[column.index];
                if (!cell) {
                    continue;
                }
                cell.height = row.height;
                if (cell.rowSpan > 1) {
                    var remaining = all.length - rowIndex;
                    var left = cell.rowSpan > remaining ? remaining : cell.rowSpan;
                    rowSpanCells[column.index] = { cell: cell, left: left, row: row };
                }
            }
        }
    }
}
function applyColSpans(table) {
    var all = table.allRows();
    for (var rowIndex = 0; rowIndex < all.length; rowIndex++) {
        var row = all[rowIndex];
        var colSpanCell = null;
        var combinedColSpanWidth = 0;
        var colSpansLeft = 0;
        for (var columnIndex = 0; columnIndex < table.columns.length; columnIndex++) {
            var column = table.columns[columnIndex];
            // Width and colspan
            colSpansLeft -= 1;
            if (colSpansLeft > 1 && table.columns[columnIndex + 1]) {
                combinedColSpanWidth += column.width;
                delete row.cells[column.index];
            }
            else if (colSpanCell) {
                var cell = colSpanCell;
                delete row.cells[column.index];
                colSpanCell = null;
                cell.width = column.width + combinedColSpanWidth;
            }
            else {
                var cell = row.cells[column.index];
                if (!cell)
                    continue;
                colSpansLeft = cell.colSpan;
                combinedColSpanWidth = 0;
                if (cell.colSpan > 1) {
                    colSpanCell = cell;
                    combinedColSpanWidth += column.width;
                    continue;
                }
                cell.width = column.width + combinedColSpanWidth;
            }
        }
    }
}
function fitContent(table, doc) {
    var rowSpanHeight = { count: 0, height: 0 };
    for (var _i = 0, _a = table.allRows(); _i < _a.length; _i++) {
        var row = _a[_i];
        for (var _b = 0, _c = table.columns; _b < _c.length; _b++) {
            var column = _c[_b];
            var cell = row.cells[column.index];
            if (!cell)
                continue;
            doc.applyStyles(cell.styles, true);
            var textSpace = cell.width - cell.padding('horizontal');
            if (cell.styles.overflow === 'linebreak') {
                // Add one pt to textSpace to fix rounding error
                cell.text = doc.splitTextToSize(cell.text, textSpace + 1 / doc.scaleFactor(), { fontSize: cell.styles.fontSize });
            }
            else if (cell.styles.overflow === 'ellipsize') {
                cell.text = ellipsize(cell.text, textSpace, cell.styles, doc, '...');
            }
            else if (cell.styles.overflow === 'hidden') {
                cell.text = ellipsize(cell.text, textSpace, cell.styles, doc, '');
            }
            else if (typeof cell.styles.overflow === 'function') {
                var result = cell.styles.overflow(cell.text, textSpace);
                if (typeof result === 'string') {
                    cell.text = [result];
                }
                else {
                    cell.text = result;
                }
            }
            cell.contentHeight = cell.getContentHeight(doc.scaleFactor(), doc.getLineHeightFactor());
            var realContentHeight = cell.contentHeight / cell.rowSpan;
            if (cell.rowSpan > 1 &&
                rowSpanHeight.count * rowSpanHeight.height <
                    realContentHeight * cell.rowSpan) {
                rowSpanHeight = { height: realContentHeight, count: cell.rowSpan };
            }
            else if (rowSpanHeight && rowSpanHeight.count > 0) {
                if (rowSpanHeight.height > realContentHeight) {
                    realContentHeight = rowSpanHeight.height;
                }
            }
            if (realContentHeight > row.height) {
                row.height = realContentHeight;
            }
        }
        rowSpanHeight.count--;
    }
}
function ellipsize(text, width, styles, doc, overflow) {
    return text.map(function (str) { return ellipsizeStr(str, width, styles, doc, overflow); });
}
function ellipsizeStr(text, width, styles, doc, overflow) {
    var precision = 10000 * doc.scaleFactor();
    width = Math.ceil(width * precision) / precision;
    if (width >= getStringWidth(text, styles, doc)) {
        return text;
    }
    while (width < getStringWidth(text + overflow, styles, doc)) {
        if (text.length <= 1) {
            break;
        }
        text = text.substring(0, text.length - 1);
    }
    return text.trim() + overflow;
}

function createTable(jsPDFDoc, input) {
    var doc = new DocHandler(jsPDFDoc);
    var content = parseContent(input, doc.scaleFactor());
    var table = new Table(input, content);
    calculateWidths(doc, table);
    doc.applyStyles(doc.userStyles);
    return table;
}
function parseContent(input, sf) {
    var content = input.content;
    var columns = createColumns(content.columns);
    // If no head or foot is set, try generating it with content from columns
    if (content.head.length === 0) {
        var sectionRow = generateSectionRow(columns, 'head');
        if (sectionRow)
            content.head.push(sectionRow);
    }
    if (content.foot.length === 0) {
        var sectionRow = generateSectionRow(columns, 'foot');
        if (sectionRow)
            content.foot.push(sectionRow);
    }
    var theme = input.settings.theme;
    var styles = input.styles;
    return {
        columns: columns,
        head: parseSection('head', content.head, columns, styles, theme, sf),
        body: parseSection('body', content.body, columns, styles, theme, sf),
        foot: parseSection('foot', content.foot, columns, styles, theme, sf),
    };
}
function parseSection(sectionName, sectionRows, columns, styleProps, theme, scaleFactor) {
    var rowSpansLeftForColumn = {};
    var result = sectionRows.map(function (rawRow, rowIndex) {
        var skippedRowForRowSpans = 0;
        var cells = {};
        var colSpansAdded = 0;
        var columnSpansLeft = 0;
        for (var _i = 0, columns_1 = columns; _i < columns_1.length; _i++) {
            var column = columns_1[_i];
            if (rowSpansLeftForColumn[column.index] == null ||
                rowSpansLeftForColumn[column.index].left === 0) {
                if (columnSpansLeft === 0) {
                    var rawCell = void 0;
                    if (Array.isArray(rawRow)) {
                        rawCell =
                            rawRow[column.index - colSpansAdded - skippedRowForRowSpans];
                    }
                    else {
                        rawCell = rawRow[column.dataKey];
                    }
                    var cellInputStyles = {};
                    if (typeof rawCell === 'object' && !Array.isArray(rawCell)) {
                        cellInputStyles = (rawCell === null || rawCell === void 0 ? void 0 : rawCell.styles) || {};
                    }
                    var styles = cellStyles(sectionName, column, rowIndex, theme, styleProps, scaleFactor, cellInputStyles);
                    var cell = new Cell(rawCell, styles, sectionName);
                    // dataKey is not used internally no more but keep for
                    // backwards compat in hooks
                    cells[column.dataKey] = cell;
                    cells[column.index] = cell;
                    columnSpansLeft = cell.colSpan - 1;
                    rowSpansLeftForColumn[column.index] = {
                        left: cell.rowSpan - 1,
                        times: columnSpansLeft,
                    };
                }
                else {
                    columnSpansLeft--;
                    colSpansAdded++;
                }
            }
            else {
                rowSpansLeftForColumn[column.index].left--;
                columnSpansLeft = rowSpansLeftForColumn[column.index].times;
                skippedRowForRowSpans++;
            }
        }
        return new Row(rawRow, rowIndex, sectionName, cells);
    });
    return result;
}
function generateSectionRow(columns, section) {
    var sectionRow = {};
    columns.forEach(function (col) {
        if (col.raw != null) {
            var title = getSectionTitle(section, col.raw);
            if (title != null)
                sectionRow[col.dataKey] = title;
        }
    });
    return Object.keys(sectionRow).length > 0 ? sectionRow : null;
}
function getSectionTitle(section, column) {
    if (section === 'head') {
        if (typeof column === 'object') {
            return column.header || null;
        }
        else if (typeof column === 'string' || typeof column === 'number') {
            return column;
        }
    }
    else if (section === 'foot' && typeof column === 'object') {
        return column.footer;
    }
    return null;
}
function createColumns(columns) {
    return columns.map(function (input, index) {
        var _a;
        var key;
        if (typeof input === 'object') {
            key = (_a = input.dataKey) !== null && _a !== void 0 ? _a : index;
        }
        else {
            key = index;
        }
        return new Column(key, input, index);
    });
}
function cellStyles(sectionName, column, rowIndex, themeName, styles, scaleFactor, cellInputStyles) {
    var theme = getTheme(themeName);
    var sectionStyles;
    if (sectionName === 'head') {
        sectionStyles = styles.headStyles;
    }
    else if (sectionName === 'body') {
        sectionStyles = styles.bodyStyles;
    }
    else if (sectionName === 'foot') {
        sectionStyles = styles.footStyles;
    }
    var otherStyles = assign({}, theme.table, theme[sectionName], styles.styles, sectionStyles);
    var columnStyles = styles.columnStyles[column.dataKey] ||
        styles.columnStyles[column.index] ||
        {};
    var colStyles = sectionName === 'body' ? columnStyles : {};
    var rowStyles = sectionName === 'body' && rowIndex % 2 === 0
        ? assign({}, theme.alternateRow, styles.alternateRowStyles)
        : {};
    var defaultStyle = defaultStyles(scaleFactor);
    var themeStyles = assign({}, defaultStyle, otherStyles, rowStyles, colStyles);
    return assign(themeStyles, cellInputStyles);
}

// get columns can be fit into page
function getColumnsCanFitInPage(doc, table, config) {
    var _a;
    if (config === void 0) { config = {}; }
    // Get page width
    var remainingWidth = getPageAvailableWidth(doc, table);
    // Get column data key to repeat
    var repeatColumnsMap = new Map();
    var colIndexes = [];
    var columns = [];
    var horizontalPageBreakRepeat = [];
    if (Array.isArray(table.settings.horizontalPageBreakRepeat)) {
        horizontalPageBreakRepeat = table.settings.horizontalPageBreakRepeat;
        // It can be a single value of type string or number (even number: 0)
    }
    else if (typeof table.settings.horizontalPageBreakRepeat === 'string' ||
        typeof table.settings.horizontalPageBreakRepeat === 'number') {
        horizontalPageBreakRepeat = [table.settings.horizontalPageBreakRepeat];
    }
    // Code to repeat the given column in split pages
    horizontalPageBreakRepeat.forEach(function (field) {
        var col = table.columns.find(function (item) { return item.dataKey === field || item.index === field; });
        if (col && !repeatColumnsMap.has(col.index)) {
            repeatColumnsMap.set(col.index, true);
            colIndexes.push(col.index);
            columns.push(table.columns[col.index]);
            remainingWidth -= col.wrappedWidth;
        }
    });
    var first = true;
    var i = (_a = config === null || config === void 0 ? void 0 : config.start) !== null && _a !== void 0 ? _a : 0; // make sure couter is initiated outside the loop
    while (i < table.columns.length) {
        // Prevent duplicates
        if (repeatColumnsMap.has(i)) {
            i++;
            continue;
        }
        var colWidth = table.columns[i].wrappedWidth;
        // Take at least one column even if it doesn't fit
        if (first || remainingWidth >= colWidth) {
            first = false;
            colIndexes.push(i);
            columns.push(table.columns[i]);
            remainingWidth -= colWidth;
        }
        else {
            break;
        }
        i++;
    }
    return { colIndexes: colIndexes, columns: columns, lastIndex: i - 1 };
}
function calculateAllColumnsCanFitInPage(doc, table) {
    var allResults = [];
    for (var i = 0; i < table.columns.length; i++) {
        var result = getColumnsCanFitInPage(doc, table, { start: i });
        if (result.columns.length) {
            allResults.push(result);
            i = result.lastIndex;
        }
    }
    return allResults;
}

function drawTable(jsPDFDoc, table) {
    var settings = table.settings;
    var startY = settings.startY;
    var margin = settings.margin;
    var cursor = { x: margin.left, y: startY };
    var sectionsHeight = table.getHeadHeight(table.columns) + table.getFootHeight(table.columns);
    var minTableBottomPos = startY + margin.bottom + sectionsHeight;
    if (settings.pageBreak === 'avoid') {
        var rows = table.body;
        var tableHeight = rows.reduce(function (acc, row) { return acc + row.height; }, 0);
        minTableBottomPos += tableHeight;
    }
    var doc = new DocHandler(jsPDFDoc);
    if (settings.pageBreak === 'always' ||
        (settings.startY != null && minTableBottomPos > doc.pageSize().height)) {
        nextPage(doc);
        cursor.y = margin.top;
    }
    table.callWillDrawPageHooks(doc, cursor);
    var startPos = assign({}, cursor);
    table.startPageNumber = doc.pageNumber();
    if (settings.horizontalPageBreak) {
        // managed flow for split columns
        printTableWithHorizontalPageBreak(doc, table, startPos, cursor);
    }
    else {
        // normal flow
        doc.applyStyles(doc.userStyles);
        if (settings.showHead === 'firstPage' ||
            settings.showHead === 'everyPage') {
            table.head.forEach(function (row) {
                return printRow(doc, table, row, cursor, table.columns);
            });
        }
        doc.applyStyles(doc.userStyles);
        table.body.forEach(function (row, index) {
            var isLastRow = index === table.body.length - 1;
            printFullRow(doc, table, row, isLastRow, startPos, cursor, table.columns);
        });
        doc.applyStyles(doc.userStyles);
        if (settings.showFoot === 'lastPage' || settings.showFoot === 'everyPage') {
            table.foot.forEach(function (row) {
                return printRow(doc, table, row, cursor, table.columns);
            });
        }
    }
    addTableBorder(doc, table, startPos, cursor);
    table.callEndPageHooks(doc, cursor);
    table.finalY = cursor.y;
    jsPDFDoc.lastAutoTable = table;
    doc.applyStyles(doc.userStyles);
}
function printTableWithHorizontalPageBreak(doc, table, startPos, cursor) {
    // calculate width of columns and render only those which can fit into page
    var allColumnsCanFitResult = calculateAllColumnsCanFitInPage(doc, table);
    var settings = table.settings;
    if (settings.horizontalPageBreakBehaviour === 'afterAllRows') {
        allColumnsCanFitResult.forEach(function (colsAndIndexes, index) {
            doc.applyStyles(doc.userStyles);
            // add page to print next columns in new page
            if (index > 0) {
                // When adding a page here, make sure not to print the footers
                // because they were already printed before on this same loop
                addPage(doc, table, startPos, cursor, colsAndIndexes.columns, true);
            }
            else {
                // print head for selected columns
                printHead(doc, table, cursor, colsAndIndexes.columns);
            }
            // print body & footer for selected columns
            printBody(doc, table, startPos, cursor, colsAndIndexes.columns);
            printFoot(doc, table, cursor, colsAndIndexes.columns);
        });
    }
    else {
        var lastRowIndexOfLastPage_1 = -1;
        var firstColumnsToFitResult = allColumnsCanFitResult[0];
        var _loop_1 = function () {
            // Print the first columns, taking note of the last row printed
            var lastPrintedRowIndex = lastRowIndexOfLastPage_1;
            if (firstColumnsToFitResult) {
                doc.applyStyles(doc.userStyles);
                var firstColumnsToFit = firstColumnsToFitResult.columns;
                if (lastRowIndexOfLastPage_1 >= 0) {
                    // When adding a page here, make sure not to print the footers
                    // because they were already printed before on this same loop
                    addPage(doc, table, startPos, cursor, firstColumnsToFit, true);
                }
                else {
                    printHead(doc, table, cursor, firstColumnsToFit);
                }
                lastPrintedRowIndex = printBodyWithoutPageBreaks(doc, table, lastRowIndexOfLastPage_1 + 1, cursor, firstColumnsToFit);
                printFoot(doc, table, cursor, firstColumnsToFit);
            }
            // Check how many rows were printed, so that the next columns would not print more rows than that
            var maxNumberOfRows = lastPrintedRowIndex - lastRowIndexOfLastPage_1;
            // Print the next columns, never exceding maxNumberOfRows
            allColumnsCanFitResult.slice(1).forEach(function (colsAndIndexes) {
                doc.applyStyles(doc.userStyles);
                // When adding a page here, make sure not to print the footers
                // because they were already printed before on this same loop
                addPage(doc, table, startPos, cursor, colsAndIndexes.columns, true);
                printBodyWithoutPageBreaks(doc, table, lastRowIndexOfLastPage_1 + 1, cursor, colsAndIndexes.columns, maxNumberOfRows);
                printFoot(doc, table, cursor, colsAndIndexes.columns);
            });
            lastRowIndexOfLastPage_1 = lastPrintedRowIndex;
        };
        while (lastRowIndexOfLastPage_1 < table.body.length - 1) {
            _loop_1();
        }
    }
}
function printHead(doc, table, cursor, columns) {
    var settings = table.settings;
    doc.applyStyles(doc.userStyles);
    if (settings.showHead === 'firstPage' || settings.showHead === 'everyPage') {
        table.head.forEach(function (row) { return printRow(doc, table, row, cursor, columns); });
    }
}
function printBody(doc, table, startPos, cursor, columns) {
    doc.applyStyles(doc.userStyles);
    table.body.forEach(function (row, index) {
        var isLastRow = index === table.body.length - 1;
        printFullRow(doc, table, row, isLastRow, startPos, cursor, columns);
    });
}
function printBodyWithoutPageBreaks(doc, table, startRowIndex, cursor, columns, maxNumberOfRows) {
    doc.applyStyles(doc.userStyles);
    maxNumberOfRows = maxNumberOfRows !== null && maxNumberOfRows !== void 0 ? maxNumberOfRows : table.body.length;
    var endRowIndex = Math.min(startRowIndex + maxNumberOfRows, table.body.length);
    var lastPrintedRowIndex = -1;
    table.body.slice(startRowIndex, endRowIndex).forEach(function (row, index) {
        var isLastRow = startRowIndex + index === table.body.length - 1;
        var remainingSpace = getRemainingPageSpace(doc, table, isLastRow, cursor);
        if (row.canEntireRowFit(remainingSpace, columns)) {
            printRow(doc, table, row, cursor, columns);
            lastPrintedRowIndex = startRowIndex + index;
        }
    });
    return lastPrintedRowIndex;
}
function printFoot(doc, table, cursor, columns) {
    var settings = table.settings;
    doc.applyStyles(doc.userStyles);
    if (settings.showFoot === 'lastPage' || settings.showFoot === 'everyPage') {
        table.foot.forEach(function (row) { return printRow(doc, table, row, cursor, columns); });
    }
}
function getRemainingLineCount(cell, remainingPageSpace, doc) {
    var lineHeight = doc.getLineHeight(cell.styles.fontSize);
    var vPadding = cell.padding('vertical');
    var remainingLines = Math.floor((remainingPageSpace - vPadding) / lineHeight);
    return Math.max(0, remainingLines);
}
function modifyRowToFit(row, remainingPageSpace, table, doc) {
    var cells = {};
    row.spansMultiplePages = true;
    row.height = 0;
    var rowHeight = 0;
    for (var _i = 0, _a = table.columns; _i < _a.length; _i++) {
        var column = _a[_i];
        var cell = row.cells[column.index];
        if (!cell)
            continue;
        if (!Array.isArray(cell.text)) {
            cell.text = [cell.text];
        }
        var remainderCell = new Cell(cell.raw, cell.styles, cell.section);
        remainderCell = assign(remainderCell, cell);
        remainderCell.text = [];
        var remainingLineCount = getRemainingLineCount(cell, remainingPageSpace, doc);
        if (cell.text.length > remainingLineCount) {
            remainderCell.text = cell.text.splice(remainingLineCount, cell.text.length);
        }
        var scaleFactor = doc.scaleFactor();
        var lineHeightFactor = doc.getLineHeightFactor();
        cell.contentHeight = cell.getContentHeight(scaleFactor, lineHeightFactor);
        if (cell.contentHeight >= remainingPageSpace) {
            cell.contentHeight = remainingPageSpace;
            remainderCell.styles.minCellHeight -= remainingPageSpace;
        }
        if (cell.contentHeight > row.height) {
            row.height = cell.contentHeight;
        }
        remainderCell.contentHeight = remainderCell.getContentHeight(scaleFactor, lineHeightFactor);
        if (remainderCell.contentHeight > rowHeight) {
            rowHeight = remainderCell.contentHeight;
        }
        cells[column.index] = remainderCell;
    }
    var remainderRow = new Row(row.raw, -1, row.section, cells, true);
    remainderRow.height = rowHeight;
    for (var _b = 0, _c = table.columns; _b < _c.length; _b++) {
        var column = _c[_b];
        var remainderCell = remainderRow.cells[column.index];
        if (remainderCell) {
            remainderCell.height = remainderRow.height;
        }
        var cell = row.cells[column.index];
        if (cell) {
            cell.height = row.height;
        }
    }
    return remainderRow;
}
function shouldPrintOnCurrentPage(doc, row, remainingPageSpace, table) {
    var pageHeight = doc.pageSize().height;
    var margin = table.settings.margin;
    var marginHeight = margin.top + margin.bottom;
    var maxRowHeight = pageHeight - marginHeight;
    if (row.section === 'body') {
        // Should also take into account that head and foot is not
        // on every page with some settings
        maxRowHeight -=
            table.getHeadHeight(table.columns) + table.getFootHeight(table.columns);
    }
    var minRowHeight = row.getMinimumRowHeight(table.columns, doc);
    var minRowFits = minRowHeight < remainingPageSpace;
    if (minRowHeight > maxRowHeight) {
        console.log("Will not be able to print row ".concat(row.index, " correctly since it's minimum height is larger than page height"));
        return true;
    }
    if (!minRowFits) {
        return false;
    }
    var rowHasRowSpanCell = row.hasRowSpan(table.columns);
    var rowHigherThanPage = row.getMaxCellHeight(table.columns) > maxRowHeight;
    if (rowHigherThanPage) {
        if (rowHasRowSpanCell) {
            console.log("The content of row ".concat(row.index, " will not be drawn correctly since drawing rows with a height larger than the page height and has cells with rowspans is not supported."));
        }
        return true;
    }
    if (rowHasRowSpanCell) {
        // Currently a new page is required whenever a rowspan row don't fit a page.
        return false;
    }
    if (table.settings.rowPageBreak === 'avoid') {
        return false;
    }
    // In all other cases print the row on current page
    return true;
}
function printFullRow(doc, table, row, isLastRow, startPos, cursor, columns) {
    var remainingSpace = getRemainingPageSpace(doc, table, isLastRow, cursor);
    if (row.canEntireRowFit(remainingSpace, columns)) {
        // The row fits in the current page
        printRow(doc, table, row, cursor, columns);
    }
    else if (shouldPrintOnCurrentPage(doc, row, remainingSpace, table)) {
        // The row gets split in two here, each piece in one page
        var remainderRow = modifyRowToFit(row, remainingSpace, table, doc);
        printRow(doc, table, row, cursor, columns);
        addPage(doc, table, startPos, cursor, columns);
        printFullRow(doc, table, remainderRow, isLastRow, startPos, cursor, columns);
    }
    else {
        // The row get printed entirelly on the next page
        addPage(doc, table, startPos, cursor, columns);
        printFullRow(doc, table, row, isLastRow, startPos, cursor, columns);
    }
}
function printRow(doc, table, row, cursor, columns) {
    cursor.x = table.settings.margin.left;
    for (var _i = 0, columns_1 = columns; _i < columns_1.length; _i++) {
        var column = columns_1[_i];
        var cell = row.cells[column.index];
        if (!cell) {
            cursor.x += column.width;
            continue;
        }
        doc.applyStyles(cell.styles);
        cell.x = cursor.x;
        cell.y = cursor.y;
        var result = table.callCellHooks(doc, table.hooks.willDrawCell, cell, row, column, cursor);
        if (result === false) {
            cursor.x += column.width;
            continue;
        }
        drawCellRect(doc, cell, cursor);
        var textPos = cell.getTextPos();
        autoTableText(cell.text, textPos.x, textPos.y, {
            halign: cell.styles.halign,
            valign: cell.styles.valign,
            maxWidth: Math.ceil(cell.width - cell.padding('left') - cell.padding('right')),
        }, doc.getDocument());
        table.callCellHooks(doc, table.hooks.didDrawCell, cell, row, column, cursor);
        cursor.x += column.width;
    }
    cursor.y += row.height;
}
function drawCellRect(doc, cell, cursor) {
    var cellStyles = cell.styles;
    // https://github.com/simonbengtsson/jsPDF-AutoTable/issues/774
    // TODO (v4): better solution?
    doc.getDocument().setFillColor(doc.getDocument().getFillColor());
    if (typeof cellStyles.lineWidth === 'number') {
        // Draw cell background with normal borders
        var fillStyle = getFillStyle(cellStyles.lineWidth, cellStyles.fillColor);
        if (fillStyle) {
            doc.rect(cell.x, cursor.y, cell.width, cell.height, fillStyle);
        }
    }
    else if (typeof cellStyles.lineWidth === 'object') {
        // Draw cell background
        if (cellStyles.fillColor) {
            doc.rect(cell.x, cursor.y, cell.width, cell.height, 'F');
        }
        // Draw cell individual borders
        drawCellBorders(doc, cell, cursor, cellStyles.lineWidth);
    }
}
/**
 * Draw all specified borders. Borders are centered on cell's edge and lengthened
 * to overlap with neighbours to create sharp corners.
 * @param doc
 * @param cell
 * @param cursor
 * @param fillColor
 * @param lineWidth
 */
function drawCellBorders(doc, cell, cursor, lineWidth) {
    var x1, y1, x2, y2;
    if (lineWidth.top) {
        x1 = cursor.x;
        y1 = cursor.y;
        x2 = cursor.x + cell.width;
        y2 = cursor.y;
        if (lineWidth.right) {
            x2 += 0.5 * lineWidth.right;
        }
        if (lineWidth.left) {
            x1 -= 0.5 * lineWidth.left;
        }
        drawLine(lineWidth.top, x1, y1, x2, y2);
    }
    if (lineWidth.bottom) {
        x1 = cursor.x;
        y1 = cursor.y + cell.height;
        x2 = cursor.x + cell.width;
        y2 = cursor.y + cell.height;
        if (lineWidth.right) {
            x2 += 0.5 * lineWidth.right;
        }
        if (lineWidth.left) {
            x1 -= 0.5 * lineWidth.left;
        }
        drawLine(lineWidth.bottom, x1, y1, x2, y2);
    }
    if (lineWidth.left) {
        x1 = cursor.x;
        y1 = cursor.y;
        x2 = cursor.x;
        y2 = cursor.y + cell.height;
        if (lineWidth.top) {
            y1 -= 0.5 * lineWidth.top;
        }
        if (lineWidth.bottom) {
            y2 += 0.5 * lineWidth.bottom;
        }
        drawLine(lineWidth.left, x1, y1, x2, y2);
    }
    if (lineWidth.right) {
        x1 = cursor.x + cell.width;
        y1 = cursor.y;
        x2 = cursor.x + cell.width;
        y2 = cursor.y + cell.height;
        if (lineWidth.top) {
            y1 -= 0.5 * lineWidth.top;
        }
        if (lineWidth.bottom) {
            y2 += 0.5 * lineWidth.bottom;
        }
        drawLine(lineWidth.right, x1, y1, x2, y2);
    }
    function drawLine(width, x1, y1, x2, y2) {
        doc.getDocument().setLineWidth(width);
        doc.getDocument().line(x1, y1, x2, y2, 'S');
    }
}
function getRemainingPageSpace(doc, table, isLastRow, cursor) {
    var bottomContentHeight = table.settings.margin.bottom;
    var showFoot = table.settings.showFoot;
    if (showFoot === 'everyPage' || (showFoot === 'lastPage' && isLastRow)) {
        bottomContentHeight += table.getFootHeight(table.columns);
    }
    return doc.pageSize().height - cursor.y - bottomContentHeight;
}
function addPage(doc, table, startPos, cursor, columns, suppressFooter) {
    if (columns === void 0) { columns = []; }
    if (suppressFooter === void 0) { suppressFooter = false; }
    doc.applyStyles(doc.userStyles);
    if (table.settings.showFoot === 'everyPage' && !suppressFooter) {
        table.foot.forEach(function (row) { return printRow(doc, table, row, cursor, columns); });
    }
    // Add user content just before adding new page ensure it will
    // be drawn above other things on the page
    table.callEndPageHooks(doc, cursor);
    var margin = table.settings.margin;
    addTableBorder(doc, table, startPos, cursor);
    nextPage(doc);
    table.pageNumber++;
    cursor.x = margin.left;
    cursor.y = margin.top;
    startPos.y = margin.top;
    // call didAddPage hooks before any content is added to the page
    table.callWillDrawPageHooks(doc, cursor);
    if (table.settings.showHead === 'everyPage') {
        table.head.forEach(function (row) { return printRow(doc, table, row, cursor, columns); });
        doc.applyStyles(doc.userStyles);
    }
}
function nextPage(doc) {
    var current = doc.pageNumber();
    doc.setPage(current + 1);
    var newCurrent = doc.pageNumber();
    if (newCurrent === current) {
        doc.addPage();
        return true;
    }
    return false;
}

function applyPlugin(jsPDF) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    jsPDF.API.autoTable = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var options = args[0];
        var input = parseInput(this, options);
        var table = createTable(this, input);
        drawTable(this, table);
        return this;
    };
    // Assign false to enable `doc.lastAutoTable.finalY || 40` sugar
    jsPDF.API.lastAutoTable = false;
    jsPDF.API.autoTableText = function (text, x, y, styles) {
        autoTableText(text, x, y, styles, this);
    };
    jsPDF.API.autoTableSetDefaults = function (defaults) {
        DocHandler.setDefaults(defaults, this);
        return this;
    };
    jsPDF.autoTableSetDefaults = function (defaults, doc) {
        DocHandler.setDefaults(defaults, doc);
    };
    jsPDF.API.autoTableHtmlToJson = function (tableElem, includeHiddenElements) {
        var _a;
        if (includeHiddenElements === void 0) { includeHiddenElements = false; }
        if (typeof window === 'undefined') {
            console.error('Cannot run autoTableHtmlToJson in non browser environment');
            return null;
        }
        var doc = new DocHandler(this);
        var _b = parseHtml(doc, tableElem, window, includeHiddenElements, false), head = _b.head, body = _b.body;
        var columns = ((_a = head[0]) === null || _a === void 0 ? void 0 : _a.map(function (c) { return c.content; })) || [];
        return { columns: columns, rows: body, data: body };
    };
}

var _a;
function autoTable(d, options) {
    var input = parseInput(d, options);
    var table = createTable(d, input);
    drawTable(d, table);
}
try {
    if (typeof window !== 'undefined' && window) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var anyWindow = window;
        var jsPDF = anyWindow.jsPDF || ((_a = anyWindow.jspdf) === null || _a === void 0 ? void 0 : _a.jsPDF);
        if (jsPDF) {
            applyPlugin(jsPDF);
        }
    }
}
catch (error) {
    console.error('Could not apply autoTable plugin', error);
}

function Link($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  /**
   * @license lucide-svelte v0.454.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const iconNode = [
    [
      "path",
      {
        "d": "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"
      }
    ],
    [
      "path",
      {
        "d": "M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"
      }
    ]
  ];
  Icon($$renderer, spread_props([
    { name: "link" },
    $$sanitized_props,
    {
      /**
       * @component @name Link
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMTAgMTNhNSA1IDAgMCAwIDcuNTQuNTRsMy0zYTUgNSAwIDAgMC03LjA3LTcuMDdsLTEuNzIgMS43MSIgLz4KICA8cGF0aCBkPSJNMTQgMTFhNSA1IDAgMCAwLTcuNTQtLjU0bC0zIDNhNSA1IDAgMCAwIDcuMDcgNy4wN2wxLjcxLTEuNzEiIC8+Cjwvc3ZnPgo=) - https://lucide.dev/icons/link
       * @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
       *
       * @param {Object} props - Lucide icons props and any valid SVG attribute
       * @returns {FunctionalComponent} Svelte component
       *
       */
      iconNode,
      children: ($$renderer2) => {
        $$renderer2.push(`<!--[-->`);
        slot($$renderer2, $$props, "default", {}, null);
        $$renderer2.push(`<!--]-->`);
      },
      $$slots: { default: true }
    }
  ]));
}
function Share($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  /**
   * @license lucide-svelte v0.454.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const iconNode = [
    ["path", { "d": "M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" }],
    ["polyline", { "points": "16 6 12 2 8 6" }],
    ["line", { "x1": "12", "x2": "12", "y1": "2", "y2": "15" }]
  ];
  Icon($$renderer, spread_props([
    { name: "share" },
    $$sanitized_props,
    {
      /**
       * @component @name Share
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNNCAxMnY4YTIgMiAwIDAgMCAyIDJoMTJhMiAyIDAgMCAwIDItMnYtOCIgLz4KICA8cG9seWxpbmUgcG9pbnRzPSIxNiA2IDEyIDIgOCA2IiAvPgogIDxsaW5lIHgxPSIxMiIgeDI9IjEyIiB5MT0iMiIgeTI9IjE1IiAvPgo8L3N2Zz4K) - https://lucide.dev/icons/share
       * @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
       *
       * @param {Object} props - Lucide icons props and any valid SVG attribute
       * @returns {FunctionalComponent} Svelte component
       *
       */
      iconNode,
      children: ($$renderer2) => {
        $$renderer2.push(`<!--[-->`);
        slot($$renderer2, $$props, "default", {}, null);
        $$renderer2.push(`<!--]-->`);
      },
      $$slots: { default: true }
    }
  ]));
}
function exportarRecibo(documento) {
  const { empresa, cliente, itens } = documento;
  const margin = 5;
  const pageWidth = 80;
  const headerHeight = 10;
  const centerX = pageWidth / 2;
  const draw = (doc2) => {
    let y = headerHeight;
    doc2.setFont("helvetica", "bold");
    doc2.setFontSize(8);
    doc2.text((empresa.nome || "").toUpperCase(), centerX, y, { align: "center" });
    y += 5;
    doc2.setFont("helvetica", "normal");
    doc2.setFontSize(8);
    if (empresa.nif) {
      doc2.text(`NIF: ${empresa.nif}`, centerX, y, { align: "center" });
      y += 4;
    }
    doc2.text(empresa.endereco, centerX, y, { align: "center" });
    y += 4;
    if (empresa.telefone) {
      doc2.text(`Tel: ${empresa.telefone}`, centerX, y, { align: "center" });
      y += 4;
    }
    doc2.setLineWidth(0.1);
    doc2.line(margin, y, pageWidth - margin, y);
    y += 5;
    doc2.setFont("helvetica", "bold");
    doc2.setFontSize(8);
    doc2.text("FACTURA RECIBO", centerX, y, { align: "center" });
    y += 5;
    doc2.setFont("helvetica", "normal");
    doc2.setFontSize(8);
    doc2.text(`Nº: ${documento.numero}`, margin, y);
    y += 4;
    const dataEmissao = /* @__PURE__ */ new Date();
    doc2.text(
      `Data: ${dataEmissao.toLocaleDateString("pt-PT")}  Hora: ${dataEmissao.toLocaleTimeString("pt-PT")}`,
      margin,
      y
    );
    y += 4;
    doc2.line(margin, y, pageWidth - margin, y);
    y += 5;
    doc2.text(`Cliente: ${getFirstAndLastName(cliente?.nome) || "Consumidor Final"}`, margin, y);
    y += 4;
    if (cliente?.nif) {
      doc2.text(`NIF: ${cliente.nif}`, margin, y);
      y += 4;
    }
    doc2.line(margin, y, pageWidth - margin, y);
    y += 5;
    const columns = [
      { header: "#", dataKey: "numero" },
      { header: "Desc", dataKey: "descricao" },
      { header: "Pu", dataKey: "preco" },
      { header: "Qt", dataKey: "quantidade" },
      { header: "T/D %", dataKey: "txdc" },
      { header: "Total", dataKey: "total" }
    ];
    const tableData = itens.map((item, index) => ({
      numero: (index + 1).toString(),
      descricao: item.descricao || item.produto?.descricao || "Item",
      preco: formatCurrency(item.precoUnitario),
      quantidade: item.quantidade.toString(),
      txdc: `${item.taxa.toString()}/${item.desconto.toString()}`,
      total: formatCurrency(item.quantidade * item.precoUnitario)
    }));
    autoTable(doc2, {
      head: [columns.map((col) => col.header)],
      body: tableData.map((row) => columns.map((col) => row[col.dataKey])),
      startY: y,
      theme: "grid",
      // Tema simples para térmica
      styles: {
        fontSize: 6,
        cellPadding: 1,
        overflow: "linebreak",
        halign: "left",
        font: "helvetica"
      },
      headStyles: {
        fontStyle: "bold",
        fillColor: void 0,
        // Sem cor de fundo
        textColor: 20
        // Quase preto
      },
      columnStyles: {
        0: { cellWidth: 4 },
        // Nº
        1: { cellWidth: "auto" },
        // DESC - Auto para ocupar espaço
        2: { cellWidth: 12, halign: "right" },
        // PU
        3: { cellWidth: 6, halign: "center" },
        // QTD
        4: { cellWidth: 10, halign: "center" },
        // TX/DC
        5: { cellWidth: 15, halign: "right" }
        // TOTAL
      },
      margin: { left: margin, right: margin },
      didDrawPage: (data) => {
      }
    });
    y = doc2.lastAutoTable.finalY + 5;
    doc2.setFontSize(8);
    const labelX = 45;
    const valueX = pageWidth - margin;
    doc2.text("Subtotal:", labelX, y, { align: "right" });
    doc2.text(formatCurrency(documento.subtotal), valueX, y, { align: "right" });
    y += 4;
    doc2.text("IVA (14%):", labelX, y, { align: "right" });
    doc2.text(formatCurrency(documento.totalImpostos), valueX, y, { align: "right" });
    y += 4;
    if (documento.totalDesconto > 0) {
      doc2.text("Desconto:", labelX, y, { align: "right" });
      doc2.text(`-${formatCurrency(documento.totalDesconto)}`, valueX, y, { align: "right" });
      y += 4;
    }
    doc2.setFont("helvetica", "bold");
    doc2.setFontSize(8);
    doc2.text("TOTAL:", labelX, y, { align: "right" });
    doc2.text(formatCurrency(documento.total), valueX, y, { align: "right" });
    y += 6;
    doc2.setFont("helvetica", "normal");
    doc2.setFontSize(8);
    doc2.text("Valor Entregue:", labelX, y, { align: "right" });
    doc2.text(formatCurrency(documento.total), valueX, y, { align: "right" });
    y += 4;
    doc2.text("Troco:", labelX, y, { align: "right" });
    doc2.text("0.00", valueX, y, { align: "right" });
    y += 6;
    doc2.line(margin, y, pageWidth - margin, y);
    y += 5;
    doc2.setFontSize(7);
    doc2.text(`Regime de IVA: Geral`, centerX, y, {
      align: "center"
    });
    y += 4;
    doc2.setFont("helvetica", "normal");
    doc2.setFontSize(6);
    const legalText1 = "Os bens e serviços foram colocados à disposição do adquirente na data e local do documento.";
    const splitLegal1 = doc2.splitTextToSize(legalText1, pageWidth - margin * 2);
    doc2.text(splitLegal1, centerX, y, { align: "center" });
    y += splitLegal1.length * 3 + 1;
    const legalText2 = `Processado por programa validado nº${CERTIFICATE_NUMBER} - FACT FLEX`;
    doc2.text(legalText2, centerX, y, { align: "center" });
    y += 4;
    doc2.setFont("helvetica", "italic");
    doc2.setFontSize(7);
    doc2.text("Obrigado pela preferência!", centerX, y, { align: "center" });
    return y + 10;
  };
  const dummyDoc = new E({ unit: "mm", format: [pageWidth, 2e3] });
  const finalHeight = draw(dummyDoc);
  const doc = new E({
    orientation: "portrait",
    unit: "mm",
    format: [pageWidth, finalHeight]
  });
  draw(doc);
  doc.autoPrint();
  const blob = doc.output("blob");
  const url = URL.createObjectURL(blob);
  window.open(url, "_blank");
}
async function gerarReciboAGT(documento) {
  const doc = new E();
  const { empresa, cliente, itens } = documento;
  const dataEmissao = /* @__PURE__ */ new Date();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const cambio = await getCambio();
  doc.setFontSize(36);
  doc.setFont("helvetica", "bold");
  doc.text("RECIBO", 15, 25);
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text(`Data de emissão: ${dataEmissao.toLocaleDateString("pt-PT")} - ${dataEmissao.toLocaleTimeString("pt-PT")}`, 15, 32);
  const logoX = pageWidth - 65;
  const logoY = 8;
  const logoURL = "/agt_logo.png";
  const logoImg = new Image();
  logoImg.crossOrigin = "Anonymous";
  logoImg.src = logoURL;
  logoImg.onload = async function() {
    doc.addImage(logoImg, "PNG", logoX, logoY, 55, 20);
    await continuarDocumento();
  };
  logoImg.onerror = async function() {
    doc.setTextColor(37, 64, 143);
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("AGT", logoX + 15, logoY + 5);
    doc.setFontSize(7);
    doc.setFont("helvetica", "normal");
    doc.text("ADMINISTRAÇÃO", logoX + 15, logoY + 10);
    doc.text("GERAL", logoX + 15, logoY + 14);
    doc.text("TRIBUTÁRIA", logoX + 15, logoY + 18);
    doc.setTextColor(0, 0, 0);
    await continuarDocumento();
  };
  async function continuarDocumento() {
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.text(empresa.nome, 15, 42);
    doc.text(`Nº de Contribuinte: ${empresa.nif}`, 15, 46);
    doc.text(empresa.telefone, 15, 50);
    doc.text(empresa.endereco, 15, 54);
    let currentY = 68;
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.text("Contribuinte: ", 15, currentY);
    doc.setFont("helvetica", "normal");
    doc.text(cliente.nome, 42, currentY);
    currentY += 5;
    doc.setFont("helvetica", "bold");
    doc.text("Localização: ", 15, currentY);
    doc.setFont("helvetica", "normal");
    doc.text(cliente.endereco || "", 42, currentY);
    currentY += 5;
    doc.setFont("helvetica", "bold");
    doc.text("Contacto: ", 15, currentY);
    doc.setFont("helvetica", "normal");
    doc.text(cliente.telefone || "", 42, currentY);
    currentY += 5;
    doc.setFont("helvetica", "bold");
    doc.text("NIF: ", 15, currentY);
    doc.setFont("helvetica", "normal");
    doc.text(cliente.nif || "", 42, currentY);
    doc.setFontSize(8);
    doc.setFont("helvetica", "bold");
    doc.text("Documento de Cobrança", pageWidth - 60, currentY - 10);
    doc.setFont("helvetica", "normal");
    doc.text(`Data emissão: ${dataEmissao.toLocaleDateString("pt-PT")}`, pageWidth - 60, currentY - 6);
    currentY += 10;
    autoTable(doc, {
      startY: currentY,
      head: [[
        { content: "Nº Factura ou documento relevante", rowSpan: 2, styles: { halign: "center", cellWidth: 28, valign: "middle" } },
        { content: "Tipo de documento", styles: { halign: "center", cellWidth: 28, valign: "middle" }, rowSpan: 2 },
        { content: "Total sem imposto e desconto", rowSpan: 2, styles: { halign: "center", cellWidth: 28, valign: "middle" } },
        { content: "Valor de Imposto", colSpan: 3, styles: { halign: "center" } },
        { content: "Valor de descontos", styles: { halign: "center", cellWidth: 28, valign: "middle" }, rowSpan: 2 },
        { content: "Total", styles: { halign: "center", cellWidth: 20, valign: "middle" }, rowSpan: 2 }
      ], [
        { content: "IEC", styles: { halign: "center", cellWidth: 18 } },
        { content: "IVA", styles: { halign: "center", cellWidth: 18 } },
        { content: "IS", styles: { halign: "center", cellWidth: 18 } }
      ]],
      body: [
        [
          documento.referenciaOriginal,
          documento.tipoDocumento,
          formatCurrency(documento.subtotal),
          formatCurrency(0),
          formatCurrency(documento.totalImpostos),
          formatCurrency(0),
          formatCurrency(documento.totalDesconto),
          formatCurrency(documento.total)
        ]
      ],
      theme: "grid",
      styles: {
        fontSize: 7,
        cellPadding: 2,
        lineColor: [0, 0, 0],
        lineWidth: 0.1
      },
      headStyles: {
        fillColor: [255, 255, 255],
        textColor: [0, 0, 0],
        fontStyle: "bold",
        lineWidth: 0.1,
        lineColor: [0, 0, 0],
        halign: "center",
        valign: "middle"
      },
      bodyStyles: {
        minCellHeight: 12,
        fillColor: [255, 255, 255]
      },
      margin: { left: 15, right: 15 }
    });
    const tableEndY = doc.lastAutoTable.finalY + 8;
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.text("Valores totais", 15, tableEndY);
    doc.text("Valores em Kwanzas", pageWidth - 75, tableEndY);
    autoTable(doc, {
      startY: tableEndY + 3,
      body: [
        [{ content: "Divisas", styles: { fontStyle: "normal", halign: "right" } }, "USD"],
        [{ content: "Taxa de Câmbios", styles: { fontStyle: "normal", halign: "right" } }, `${cambio} Kz`],
        [{ content: "Valor em divisas", styles: { fontStyle: "normal", halign: "right" } }, formatCurrency(documento.total / cambio, "USD")]
      ],
      theme: "plain",
      styles: {
        fontSize: 8,
        cellPadding: 1.5,
        lineColor: [200, 200, 200],
        lineWidth: 0.1
      },
      columnStyles: {
        0: { cellWidth: 40 },
        1: { cellWidth: 50, fillColor: [245, 245, 245] }
      },
      margin: { left: 15 }
    });
    autoTable(doc, {
      startY: tableEndY + 3,
      body: [
        [{ content: "Totais sem impostos", styles: { fontStyle: "normal", halign: "right" } }, formatCurrency(documento.subtotal)],
        [{ content: "Valor de impostos", styles: { fontStyle: "normal", halign: "right" } }, formatCurrency(documento.totalImpostos)],
        [{ content: "Valor de descontos", styles: { fontStyle: "normal", halign: "right" } }, formatCurrency(documento.totalDesconto)],
        [{ content: "Valor total a pagar", styles: { fontStyle: "bold", fillColor: [220, 220, 220], halign: "right" } }, { content: formatCurrency(documento.total), styles: { fontStyle: "bold", fillColor: [220, 220, 220] } }]
      ],
      theme: "plain",
      styles: {
        fontSize: 8,
        cellPadding: 1.5,
        lineColor: [200, 200, 200],
        lineWidth: 0.1
      },
      columnStyles: {
        0: { cellWidth: 45 },
        1: { cellWidth: 30, fillColor: [245, 245, 245] }
      },
      // Row-specific styling is applied directly in cell data
      // bodyStyles applies to all rows, so we remove the numeric key
      margin: { left: pageWidth - 90 }
    });
    const qrY = doc.lastAutoTable.finalY + 15;
    const qrSize = 35;
    const qrX = (pageWidth - qrSize) / 2;
    let qrURL = "";
    const qrCode = new QRCodeStyling({
      width: 350,
      height: 350,
      data: `https://quiosqueagt.minfin.gov.ao/facturacao-eletronica/consultar-fe?emissor=${empresa.nif}&document=${documento.numero}`,
      image: "/agt_logo.png",
      dotsOptions: { color: "#000", type: "dots" },
      imageOptions: { crossOrigin: "anonymous", margin: 10 }
    });
    const blob = await qrCode.getRawData("png");
    if (!blob) {
      qrURL = "https://images.squarespace-cdn.com/content/v1/5d3f241fa4e0350001fa20d5/1636491460338-AIZAXV2978MGIDQE0GT7/qr-code.png";
    }
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      qrURL = reader.result;
      doc.addImage(qrURL, "PNG", qrX, qrY, qrSize, qrSize);
      finalizarRodape();
    };
    function finalizarRodape() {
      const footerY = pageHeight - 25;
      doc.setLineWidth(1);
      doc.setDrawColor(0, 0, 0);
      doc.rect(15, footerY, pageWidth - 30, 12);
      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      const footerText = "DOCUMENTO EMITIDO PELO PORTAL DO CONTRIBUINTE";
      const textWidth = doc.getTextWidth(footerText);
      doc.text(footerText, (pageWidth - textWidth) / 2, footerY + 7.5);
      doc.setFontSize(7);
      doc.setFont("helvetica", "normal");
      doc.text("Pág. 1/1", 15, pageHeight - 8);
      doc.autoPrint();
      const blob2 = doc.output("blob");
      const url = URL.createObjectURL(blob2);
      window.open(url, "_blank");
    }
  }
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data, form } = $$props;
    const documento = derived(() => data.documento);
    let statusInfo = derived(() => getStatusBadge(documento().status));
    let reenviando = false;
    let consultando = false;
    let convertendo = false;
    let showShareDialog = false;
    let metodoCompartilhamento = "whatsapp";
    let destinatario = derived(
      () => documento().cliente?.telefone || ""
    );
    head("1psohkq", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>${escape_html(documento().numero)} | FACT FLEXI</title>`);
      });
    });
    $$renderer2.push(`<div class="container mx-auto max-w-6xl space-y-6 py-6"><div class="flex items-center justify-between"><div class="flex items-center gap-4">`);
    Button($$renderer2, {
      variant: "ghost",
      size: "sm",
      onclick: () => history.back(),
      children: ($$renderer3) => {
        Arrow_left($$renderer3, { class: "h-4 w-4" });
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----> <div><h1 class="text-3xl font-bold tracking-tight">${escape_html(documento().numero)}</h1> <p class="text-muted-foreground">${escape_html(getTipoLabel(documento().tipoDocumento))}</p></div></div> `);
    Badge($$renderer2, {
      variant: statusInfo().variant,
      class: "gap-2",
      children: ($$renderer3) => {
        if (statusInfo.icon) {
          $$renderer3.push("<!--[-->");
          statusInfo.icon($$renderer3, { class: "h-4 w-4" });
          $$renderer3.push("<!--]-->");
        } else {
          $$renderer3.push("<!--[!-->");
          $$renderer3.push("<!--]-->");
        }
        $$renderer3.push(` ${escape_html(statusInfo().label)}`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----></div> <div class="grid gap-6 lg:grid-cols-3"><div class="space-y-6 lg:col-span-2">`);
    Card($$renderer2, {
      children: ($$renderer3) => {
        Card_header($$renderer3, {
          children: ($$renderer4) => {
            Card_title($$renderer4, {
              class: "flex items-center gap-2",
              children: ($$renderer5) => {
                File_text($$renderer5, { class: "h-5 w-5" });
                $$renderer5.push(`<!----> Informações do Documento`);
              },
              $$slots: { default: true }
            });
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!----> `);
        Card_content($$renderer3, {
          class: "space-y-4",
          children: ($$renderer4) => {
            $$renderer4.push(`<div class="grid gap-4 md:grid-cols-2"><div><p class="text-sm text-muted-foreground">Número</p> <p class="font-medium">${escape_html(documento().numero)}</p></div> <div><p class="text-sm text-muted-foreground">Série</p> <p class="font-medium">${escape_html(documento().serie)}</p></div> <div><p class="text-sm text-muted-foreground">Data de Emissão</p> <p class="font-medium">${escape_html(new Date(documento().dataEmissao).toLocaleString("pt-AO"))}</p></div> `);
            if (documento().dataOperacao) {
              $$renderer4.push("<!--[-->");
              $$renderer4.push(`<div><p class="text-sm text-muted-foreground">Data da Operação</p> <p class="font-medium">${escape_html(new Date(documento().dataOperacao).toLocaleString("pt-AO"))}</p></div>`);
            } else {
              $$renderer4.push("<!--[!-->");
            }
            $$renderer4.push(`<!--]--> <div><p class="text-sm text-muted-foreground">Moeda</p> <p class="font-medium">${escape_html(documento().moeda)}</p></div> <div><p class="text-sm text-muted-foreground">Regime Fiscal</p> <p class="font-medium">${escape_html(documento().regimeFiscal)}</p></div></div> `);
            if (documento().codigoValidacaoAGT) {
              $$renderer4.push("<!--[-->");
              Separator($$renderer4, {});
              $$renderer4.push(`<!----> <div><p class="text-sm text-muted-foreground">Código de Validação AGT</p> <p class="font-mono text-sm font-medium">${escape_html(documento().codigoValidacaoAGT)}</p></div>`);
            } else {
              $$renderer4.push("<!--[!-->");
            }
            $$renderer4.push(`<!--]-->`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!---->`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----> `);
    if (documento().cliente) {
      $$renderer2.push("<!--[-->");
      Card($$renderer2, {
        children: ($$renderer3) => {
          Card_header($$renderer3, {
            children: ($$renderer4) => {
              Card_title($$renderer4, {
                class: "flex items-center gap-2",
                children: ($$renderer5) => {
                  User($$renderer5, { class: "h-5 w-5" });
                  $$renderer5.push(`<!----> Cliente`);
                },
                $$slots: { default: true }
              });
            },
            $$slots: { default: true }
          });
          $$renderer3.push(`<!----> `);
          Card_content($$renderer3, {
            children: ($$renderer4) => {
              $$renderer4.push(`<div class="space-y-2"><p class="font-medium">${escape_html(documento().cliente.nome)}</p> `);
              if (documento().cliente.nif) {
                $$renderer4.push("<!--[-->");
                $$renderer4.push(`<p class="text-sm text-muted-foreground">NIF: ${escape_html(documento().cliente.nif)}</p>`);
              } else {
                $$renderer4.push("<!--[!-->");
              }
              $$renderer4.push(`<!--]--> `);
              if (documento().cliente.endereco) {
                $$renderer4.push("<!--[-->");
                $$renderer4.push(`<p class="text-sm text-muted-foreground">${escape_html(documento().cliente.endereco)}</p>`);
              } else {
                $$renderer4.push("<!--[!-->");
              }
              $$renderer4.push(`<!--]--></div>`);
            },
            $$slots: { default: true }
          });
          $$renderer3.push(`<!---->`);
        },
        $$slots: { default: true }
      });
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    Card($$renderer2, {
      children: ($$renderer3) => {
        Card_header($$renderer3, {
          children: ($$renderer4) => {
            Card_title($$renderer4, {
              children: ($$renderer5) => {
                $$renderer5.push(`<!---->Itens`);
              },
              $$slots: { default: true }
            });
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!----> `);
        Card_content($$renderer3, {
          children: ($$renderer4) => {
            Table$1($$renderer4, {
              children: ($$renderer5) => {
                Table_header($$renderer5, {
                  children: ($$renderer6) => {
                    Table_row($$renderer6, {
                      children: ($$renderer7) => {
                        Table_head($$renderer7, {
                          children: ($$renderer8) => {
                            $$renderer8.push(`<!---->Descrição`);
                          },
                          $$slots: { default: true }
                        });
                        $$renderer7.push(`<!----> `);
                        Table_head($$renderer7, {
                          class: "text-right",
                          children: ($$renderer8) => {
                            $$renderer8.push(`<!---->Qtd`);
                          },
                          $$slots: { default: true }
                        });
                        $$renderer7.push(`<!----> `);
                        Table_head($$renderer7, {
                          class: "text-right",
                          children: ($$renderer8) => {
                            $$renderer8.push(`<!---->Preço Unit.`);
                          },
                          $$slots: { default: true }
                        });
                        $$renderer7.push(`<!----> `);
                        Table_head($$renderer7, {
                          class: "text-right",
                          children: ($$renderer8) => {
                            $$renderer8.push(`<!---->Desc.`);
                          },
                          $$slots: { default: true }
                        });
                        $$renderer7.push(`<!----> `);
                        Table_head($$renderer7, {
                          class: "text-right",
                          children: ($$renderer8) => {
                            $$renderer8.push(`<!---->Taxa`);
                          },
                          $$slots: { default: true }
                        });
                        $$renderer7.push(`<!----> `);
                        Table_head($$renderer7, {
                          class: "text-right",
                          children: ($$renderer8) => {
                            $$renderer8.push(`<!---->Total`);
                          },
                          $$slots: { default: true }
                        });
                        $$renderer7.push(`<!---->`);
                      },
                      $$slots: { default: true }
                    });
                  },
                  $$slots: { default: true }
                });
                $$renderer5.push(`<!----> `);
                Table_body($$renderer5, {
                  children: ($$renderer6) => {
                    $$renderer6.push(`<!--[-->`);
                    const each_array = ensure_array_like(documento().itens);
                    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
                      let item = each_array[$$index];
                      Table_row($$renderer6, {
                        children: ($$renderer7) => {
                          Table_cell($$renderer7, {
                            children: ($$renderer8) => {
                              $$renderer8.push(`<div><p class="font-medium">${escape_html(item.descricao)}</p> <p class="text-xs text-muted-foreground">${escape_html(item.codigo)}</p></div>`);
                            },
                            $$slots: { default: true }
                          });
                          $$renderer7.push(`<!----> `);
                          Table_cell($$renderer7, {
                            class: "text-right",
                            children: ($$renderer8) => {
                              $$renderer8.push(`<!---->${escape_html(item.quantidade)}`);
                            },
                            $$slots: { default: true }
                          });
                          $$renderer7.push(`<!----> `);
                          Table_cell($$renderer7, {
                            class: "text-right",
                            children: ($$renderer8) => {
                              $$renderer8.push(`<!---->${escape_html(formatCurrency(item.precoUnitario))}`);
                            },
                            $$slots: { default: true }
                          });
                          $$renderer7.push(`<!----> `);
                          Table_cell($$renderer7, {
                            class: "text-right",
                            children: ($$renderer8) => {
                              $$renderer8.push(`<!---->${escape_html(item.desconto)}%`);
                            },
                            $$slots: { default: true }
                          });
                          $$renderer7.push(`<!----> `);
                          Table_cell($$renderer7, {
                            class: "text-right",
                            children: ($$renderer8) => {
                              $$renderer8.push(`<!---->${escape_html(item.taxa)}%`);
                            },
                            $$slots: { default: true }
                          });
                          $$renderer7.push(`<!----> `);
                          Table_cell($$renderer7, {
                            class: "text-right font-medium",
                            children: ($$renderer8) => {
                              $$renderer8.push(`<!---->${escape_html(formatCurrency(item.total))}`);
                            },
                            $$slots: { default: true }
                          });
                          $$renderer7.push(`<!---->`);
                        },
                        $$slots: { default: true }
                      });
                    }
                    $$renderer6.push(`<!--]-->`);
                  },
                  $$slots: { default: true }
                });
                $$renderer5.push(`<!---->`);
              },
              $$slots: { default: true }
            });
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!---->`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----> `);
    Card($$renderer2, {
      children: ($$renderer3) => {
        Card_header($$renderer3, {
          children: ($$renderer4) => {
            Card_title($$renderer4, {
              class: "flex items-center gap-2",
              children: ($$renderer5) => {
                Dollar_sign($$renderer5, { class: "h-5 w-5" });
                $$renderer5.push(`<!----> Totais`);
              },
              $$slots: { default: true }
            });
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!----> `);
        Card_content($$renderer3, {
          children: ($$renderer4) => {
            $$renderer4.push(`<div class="space-y-2"><div class="flex justify-between text-sm"><span class="text-muted-foreground">Subtotal:</span> <span>${escape_html(formatCurrency(documento().subtotal))}</span></div> `);
            if (documento().totalDesconto > 0) {
              $$renderer4.push("<!--[-->");
              $$renderer4.push(`<div class="flex justify-between text-sm text-orange-600"><span>Desconto Total:</span> <span>-${escape_html(formatCurrency(documento().totalDesconto))}</span></div>`);
            } else {
              $$renderer4.push("<!--[!-->");
            }
            $$renderer4.push(`<!--]--> `);
            if (documento().totalImpostos > 0) {
              $$renderer4.push("<!--[-->");
              $$renderer4.push(`<div class="flex justify-between text-sm text-blue-600"><span>Impostos Total:</span> <span>+${escape_html(formatCurrency(documento().totalImpostos))}</span></div>`);
            } else {
              $$renderer4.push("<!--[!-->");
            }
            $$renderer4.push(`<!--]--> `);
            Separator($$renderer4, {});
            $$renderer4.push(`<!----> <div class="flex justify-between text-lg font-bold"><span>Total:</span> <span class="text-primary">${escape_html(formatCurrency(documento().total))}</span></div></div>`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!---->`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----> `);
    if (documento().documentoOriginal || documento().documentosRelacionados.length > 0) {
      $$renderer2.push("<!--[-->");
      Card($$renderer2, {
        children: ($$renderer3) => {
          Card_header($$renderer3, {
            children: ($$renderer4) => {
              Card_title($$renderer4, {
                class: "flex items-center gap-2",
                children: ($$renderer5) => {
                  Link($$renderer5, { class: "h-5 w-5" });
                  $$renderer5.push(`<!----> Documentos Relacionados`);
                },
                $$slots: { default: true }
              });
            },
            $$slots: { default: true }
          });
          $$renderer3.push(`<!----> `);
          Card_content($$renderer3, {
            class: "space-y-4",
            children: ($$renderer4) => {
              if (documento().documentoOriginal) {
                $$renderer4.push("<!--[-->");
                $$renderer4.push(`<div><p class="mb-2 text-sm font-medium">Documento Original:</p> `);
                Button($$renderer4, {
                  variant: "outline",
                  size: "sm",
                  href: `/documentos/fiscais/${stringify(documento().documentoOriginal.id)}`,
                  children: ($$renderer5) => {
                    $$renderer5.push(`<!---->${escape_html(documento().documentoOriginal.numero)} - ${escape_html(formatCurrency(documento().documentoOriginal.total))}`);
                  },
                  $$slots: { default: true }
                });
                $$renderer4.push(`<!----></div>`);
              } else {
                $$renderer4.push("<!--[!-->");
              }
              $$renderer4.push(`<!--]--> `);
              if (documento().documentosRelacionados.length > 0) {
                $$renderer4.push("<!--[-->");
                $$renderer4.push(`<div><p class="mb-2 text-sm font-medium">Documentos Derivados:</p> <div class="space-y-2"><!--[-->`);
                const each_array_1 = ensure_array_like(documento().documentosRelacionados);
                for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
                  let relacionado = each_array_1[$$index_1];
                  Button($$renderer4, {
                    variant: "outline",
                    size: "sm",
                    href: `/documentos/fiscais/${stringify(relacionado.id)}`,
                    class: "w-full justify-start",
                    children: ($$renderer5) => {
                      Badge($$renderer5, {
                        variant: "outline",
                        class: "mr-2",
                        children: ($$renderer6) => {
                          $$renderer6.push(`<!---->${escape_html(getTipoLabel(relacionado.tipoDocumento))}`);
                        },
                        $$slots: { default: true }
                      });
                      $$renderer5.push(`<!----> ${escape_html(relacionado.numero)} - ${escape_html(formatCurrency(relacionado.total))}`);
                    },
                    $$slots: { default: true }
                  });
                }
                $$renderer4.push(`<!--]--></div></div>`);
              } else {
                $$renderer4.push("<!--[!-->");
              }
              $$renderer4.push(`<!--]-->`);
            },
            $$slots: { default: true }
          });
          $$renderer3.push(`<!---->`);
        },
        $$slots: { default: true }
      });
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div> <div class="space-y-6">`);
    Card($$renderer2, {
      children: ($$renderer3) => {
        Card_header($$renderer3, {
          children: ($$renderer4) => {
            Card_title($$renderer4, {
              class: "flex items-center gap-2",
              children: ($$renderer5) => {
                Link($$renderer5, { class: "h-5 w-5" });
                $$renderer5.push(`<!----> Ações Rápidas`);
              },
              $$slots: { default: true }
            });
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!----> `);
        Card_content($$renderer3, {
          class: "space-y-2",
          children: ($$renderer4) => {
            if (documento().status !== "VALIDADO_AGT") {
              $$renderer4.push("<!--[-->");
              $$renderer4.push(`<form method="POST" action="?/reenviar">`);
              Button($$renderer4, {
                type: "submit",
                class: "w-full",
                disabled: reenviando,
                children: ($$renderer5) => {
                  Refresh_cw($$renderer5, { class: "mr-2 h-4 w-4" });
                  $$renderer5.push(`<!----> ${escape_html("Reenviar para AGT")}`);
                },
                $$slots: { default: true }
              });
              $$renderer4.push(`<!----></form>`);
            } else {
              $$renderer4.push("<!--[!-->");
            }
            $$renderer4.push(`<!--]--> `);
            if (documento().status !== "ANULADO" && documento().tipoDocumento === "FACTURA_PROFORMA" && !documento().documentosRelacionados.some((d) => d.tipoDocumento === "FACTURA")) {
              $$renderer4.push("<!--[-->");
              $$renderer4.push(`<form method="POST" action="?/converter">`);
              Button($$renderer4, {
                type: "submit",
                variant: "default",
                class: "w-full",
                disabled: convertendo,
                children: ($$renderer5) => {
                  Refresh_cw($$renderer5, { class: "mr-2 h-4 w-4" });
                  $$renderer5.push(`<!----> ${escape_html("Converter em Factura")}`);
                },
                $$slots: { default: true }
              });
              $$renderer4.push(`<!----></form>`);
            } else {
              $$renderer4.push("<!--[!-->");
            }
            $$renderer4.push(`<!--]--> `);
            if (documento().codigoValidacaoAGT) {
              $$renderer4.push("<!--[-->");
              $$renderer4.push(`<form method="POST" action="?/consultarStatus">`);
              Button($$renderer4, {
                type: "submit",
                variant: "outline",
                class: "w-full",
                disabled: consultando,
                children: ($$renderer5) => {
                  Circle_check($$renderer5, { class: "mr-2 h-4 w-4" });
                  $$renderer5.push(`<!----> ${escape_html("Consultar Status AGT")}`);
                },
                $$slots: { default: true }
              });
              $$renderer4.push(`<!----></form>`);
            } else {
              $$renderer4.push("<!--[!-->");
            }
            $$renderer4.push(`<!--]--> `);
            if (documento().tipoDocumento === "FACTURA" && documento().status !== "ANULADO") {
              $$renderer4.push("<!--[-->");
              Button($$renderer4, {
                variant: "outline",
                class: "w-full",
                onclick: () => goto(`/documentos/recibos/nova?factura=${documento().id}`),
                children: ($$renderer5) => {
                  File_text($$renderer5, { class: "h-5 w-5" });
                  $$renderer5.push(`<!----> Emitir Recibo`);
                },
                $$slots: { default: true }
              });
              $$renderer4.push(`<!----> `);
              Button($$renderer4, {
                variant: "outline",
                class: "w-full",
                onclick: () => goto(`/documentos/notas-credito/nova?factura=${documento().id}`),
                children: ($$renderer5) => {
                  File_text($$renderer5, { class: "h-5 w-5" });
                  $$renderer5.push(`<!----> Emitir Nota de Crédito`);
                },
                $$slots: { default: true }
              });
              $$renderer4.push(`<!---->`);
            } else {
              $$renderer4.push("<!--[!-->");
            }
            $$renderer4.push(`<!--]--> `);
            if (documento().tipoDocumento === "FACTURA_RECIBO") {
              $$renderer4.push("<!--[-->");
              Button($$renderer4, {
                variant: "outline",
                class: "w-full",
                onclick: () => exportarRecibo(documento()),
                children: ($$renderer5) => {
                  Printer($$renderer5, { class: "mr-2 h-4 w-4" });
                  $$renderer5.push(`<!----> Imprimir Factura Recibo`);
                },
                $$slots: { default: true }
              });
            } else if (documento().tipoDocumento === "RECIBO") {
              $$renderer4.push("<!--[1-->");
              Button($$renderer4, {
                variant: "outline",
                class: "w-full",
                onclick: async () => await gerarReciboAGT(documento()),
                children: ($$renderer5) => {
                  Printer($$renderer5, { class: "mr-2 h-4 w-4" });
                  $$renderer5.push(`<!----> Imprimir Recibo`);
                },
                $$slots: { default: true }
              });
            } else {
              $$renderer4.push("<!--[!-->");
              Button($$renderer4, {
                variant: "outline",
                class: "w-full",
                href: `/reports/${stringify(getPrintUrl(documento().tipoDocumento))}/${stringify(documento().id)}`,
                children: ($$renderer5) => {
                  Printer($$renderer5, { class: "mr-2 h-4 w-4" });
                  $$renderer5.push(`<!----> Imprimir documento`);
                },
                $$slots: { default: true }
              });
            }
            $$renderer4.push(`<!--]--> `);
            Button($$renderer4, {
              variant: "outline",
              class: "w-full",
              onclick: () => showShareDialog = true,
              children: ($$renderer5) => {
                Share($$renderer5, {});
                $$renderer5.push(`<!----> Compartilhar`);
              },
              $$slots: { default: true }
            });
            $$renderer4.push(`<!---->`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!---->`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----> `);
    Card($$renderer2, {
      children: ($$renderer3) => {
        Card_header($$renderer3, {
          children: ($$renderer4) => {
            Card_title($$renderer4, {
              class: "flex items-center gap-2",
              children: ($$renderer5) => {
                History($$renderer5, { class: "h-5 w-5" });
                $$renderer5.push(`<!----> Logs de Auditoria`);
              },
              $$slots: { default: true }
            });
            $$renderer4.push(`<!----> `);
            Card_description($$renderer4, {
              children: ($$renderer5) => {
                $$renderer5.push(`<!---->Últimas 20 ações <br/> `);
                Button($$renderer5, {
                  variant: "outline",
                  size: "sm",
                  href: `/documentos/fiscais/${stringify(documento().id)}/logs`,
                  children: ($$renderer6) => {
                    $$renderer6.push(`<!---->Clique aqui para ver tudo `);
                    History($$renderer6, { class: "h-4 w-4" });
                    $$renderer6.push(`<!---->`);
                  },
                  $$slots: { default: true }
                });
                $$renderer5.push(`<!---->`);
              },
              $$slots: { default: true }
            });
            $$renderer4.push(`<!---->`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!----> `);
        Card_content($$renderer3, {
          children: ($$renderer4) => {
            $$renderer4.push(`<div class="space-y-4"><!--[-->`);
            const each_array_2 = ensure_array_like(documento().logs);
            for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
              let log = each_array_2[$$index_2];
              $$renderer4.push(`<div class="border-l-2 border-primary pl-4"><p class="text-sm font-medium">${escape_html(log.acao)}</p> <p class="text-xs text-muted-foreground">${escape_html(log.descricao)}</p> <div class="mt-1 flex items-center gap-2 text-xs text-muted-foreground"><span>${escape_html(log.usuario.name)}</span> <span>•</span> <span>${escape_html(new Date(log.createdAt).toLocaleString("pt-AO"))}</span></div></div>`);
            }
            $$renderer4.push(`<!--]--> `);
            if (documento().logs.length === 0) {
              $$renderer4.push("<!--[-->");
              $$renderer4.push(`<p class="text-sm text-muted-foreground">Nenhum histórico disponível</p>`);
            } else {
              $$renderer4.push("<!--[!-->");
            }
            $$renderer4.push(`<!--]--></div>`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!---->`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----> `);
    if (documento().observacao) {
      $$renderer2.push("<!--[-->");
      Card($$renderer2, {
        children: ($$renderer3) => {
          Card_header($$renderer3, {
            children: ($$renderer4) => {
              Card_title($$renderer4, {
                children: ($$renderer5) => {
                  $$renderer5.push(`<!---->Observações`);
                },
                $$slots: { default: true }
              });
            },
            $$slots: { default: true }
          });
          $$renderer3.push(`<!----> `);
          Card_content($$renderer3, {
            children: ($$renderer4) => {
              $$renderer4.push(`<p class="text-sm">${escape_html(documento().observacao)}</p>`);
            },
            $$slots: { default: true }
          });
          $$renderer3.push(`<!---->`);
        },
        $$slots: { default: true }
      });
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (documento().motivoAnulacao) {
      $$renderer2.push("<!--[-->");
      Card($$renderer2, {
        children: ($$renderer3) => {
          Card_header($$renderer3, {
            children: ($$renderer4) => {
              Card_title($$renderer4, {
                children: ($$renderer5) => {
                  $$renderer5.push(`<!---->Motivo de Anulação`);
                },
                $$slots: { default: true }
              });
            },
            $$slots: { default: true }
          });
          $$renderer3.push(`<!----> `);
          Card_content($$renderer3, {
            children: ($$renderer4) => {
              $$renderer4.push(`<p class="text-sm">${escape_html(documento().motivoAnulacao)}</p>`);
            },
            $$slots: { default: true }
          });
          $$renderer3.push(`<!---->`);
        },
        $$slots: { default: true }
      });
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div></div></div> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (showShareDialog) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"><div class="w-full max-w-md rounded-lg bg-white p-6 shadow-xl dark:bg-gray-800"><div class="flex items-center gap-3"><div class="rounded-full bg-blue-100 p-2 dark:bg-blue-900/20">`);
      Share($$renderer2, {});
      $$renderer2.push(`<!----></div> <div><h3 class="text-lg font-semibold text-gray-900 dark:text-white">Compartilhar Documento</h3> <p class="text-sm text-gray-500 dark:text-gray-400">Escolha como compartilhar este documento</p></div></div> <form method="post" action="?/compartilhar"><input type="hidden" name="metodo"${attr("value", metodoCompartilhamento)}/> <div class="mt-6 space-y-4"><div class="space-y-2"><label for="metodoCompartilhamento" class="text-sm font-medium text-gray-700 dark:text-gray-300">Método de Compartilhamento</label> <div class="flex gap-2"><button type="button"${attr_class(`flex-1 rounded-lg border p-3 ${"border-blue-500 bg-blue-50 text-blue-600 dark:border-blue-400 dark:bg-blue-900/20 dark:text-blue-400"}`)}>WhatsApp</button> <button type="button"${attr_class(`flex-1 rounded-lg border p-3 ${"border-gray-300 bg-transparent text-gray-700 dark:border-gray-600 dark:text-gray-300"}`)}>Email</button></div></div> <div class="space-y-2"><label for="destinatario" class="text-sm font-medium text-gray-700 dark:text-gray-300">${escape_html("Número de Telefone")} *</label> <input id="destinatario" name="destinatario"${attr("type", "tel")}${attr("value", destinatario())}${attr("placeholder", "+244 9XX XXX XXX")} class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"/></div> <div class="space-y-2"><label for="mensagemCompartilhamento" class="text-sm font-medium text-gray-700 dark:text-gray-300">Mensagem Personalizada (opcional)</label> <textarea id="mensagemCompartilhamento" name="mensagem" rows="3" placeholder="Adicione uma mensagem personalizada..." class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"></textarea></div> <div class="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/10"><p class="text-sm text-blue-600 dark:text-blue-400"><strong>Documento:</strong> ${escape_html(documento().numero)} (${escape_html(getTipoLabel(documento().tipoDocumento))})</p> <p class="text-sm text-blue-600 dark:text-blue-400"><strong>Valor:</strong> ${escape_html(formatCurrency(documento().total))}</p></div></div> <div class="mt-6 flex justify-end gap-3">`);
      Button($$renderer2, {
        variant: "outline",
        onclick: () => {
          showShareDialog = false;
        },
        children: ($$renderer3) => {
          $$renderer3.push(`<!---->Cancelar`);
        },
        $$slots: { default: true }
      });
      $$renderer2.push(`<!----> `);
      Button($$renderer2, {
        variant: "default",
        type: "submit",
        children: ($$renderer3) => {
          Share($$renderer3, {});
          $$renderer3.push(`<!----> Compartilhar`);
        },
        $$slots: { default: true }
      });
      $$renderer2.push(`<!----></div></form></div></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
  });
}

export { _page as default };
//# sourceMappingURL=_page.svelte-L-E4MeLz.js.map
