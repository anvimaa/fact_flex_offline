function getDataOpenClosed(condition) {
  return condition ? "open" : "closed";
}
function getDataChecked(condition) {
  return condition ? "checked" : "unchecked";
}
function getAriaDisabled(condition) {
  return condition ? "true" : "false";
}
function getAriaExpanded(condition) {
  return condition ? "true" : "false";
}
function getDataDisabled(condition) {
  return condition ? "" : void 0;
}
function getAriaRequired(condition) {
  return condition ? "true" : "false";
}
function getAriaSelected(condition) {
  return condition ? "true" : "false";
}
function getAriaChecked(checked, indeterminate) {
  if (indeterminate) {
    return "mixed";
  }
  return checked ? "true" : "false";
}
function getAriaOrientation(orientation) {
  return orientation;
}
function getAriaHidden(condition) {
  return condition ? "true" : void 0;
}
function getDataOrientation(orientation) {
  return orientation;
}
function getDataRequired(condition) {
  return condition ? "" : void 0;
}
function getHidden(condition) {
  return condition ? true : void 0;
}
function getDisabled(condition) {
  return condition ? true : void 0;
}
function getRequired(condition) {
  return condition ? true : void 0;
}

export { getDataOpenClosed as a, getAriaExpanded as b, getAriaOrientation as c, getAriaDisabled as d, getDataOrientation as e, getAriaHidden as f, getDataDisabled as g, getDataRequired as h, getDataChecked as i, getAriaRequired as j, getAriaChecked as k, getDisabled as l, getRequired as m, getHidden as n, getAriaSelected as o };
//# sourceMappingURL=attrs-mduo83PF.js.map
