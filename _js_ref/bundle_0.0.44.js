var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// server-only:server-stub.js
var require_server_stub = __commonJS({
  "server-only:server-stub.js"(exports, module2) {
    var circuitBreak = globalThis.circuitBreak;
    if (!circuitBreak) {
      let CircuitBreak2 = function(method) {
        const err = Error("ServerCallRequired");
        err.cause = { method, stack: err.stack };
        return err;
      };
      CircuitBreak = CircuitBreak2;
      circuitBreak = (method) => {
        throw CircuitBreak2(method);
      };
    }
    var CircuitBreak;
    var trap = () => {
      circuitBreak();
    };
    module2.exports = new Proxy(function() {
    }, {
      has: () => true,
      get: () => {
        return new Proxy(function() {
        }, {
          has: () => true,
          get: trap,
          apply: trap,
          construct: () => new Proxy({}, {
            has: () => true,
            get: trap,
            apply: trap
          })
        });
      },
      apply: trap,
      construct: trap
    });
  }
});

// node_modules/kind-of/index.js
var require_kind_of = __commonJS({
  "node_modules/kind-of/index.js"(exports, module2) {
    var toString = Object.prototype.toString;
    module2.exports = function kindOf(val) {
      if (val === void 0) return "undefined";
      if (val === null) return "null";
      var type = typeof val;
      if (type === "boolean") return "boolean";
      if (type === "string") return "string";
      if (type === "number") return "number";
      if (type === "symbol") return "symbol";
      if (type === "function") {
        return isGeneratorFn(val) ? "generatorfunction" : "function";
      }
      if (isArray(val)) return "array";
      if (isBuffer(val)) return "buffer";
      if (isArguments(val)) return "arguments";
      if (isDate(val)) return "date";
      if (isError(val)) return "error";
      if (isRegexp(val)) return "regexp";
      switch (ctorName(val)) {
        case "Symbol":
          return "symbol";
        case "Promise":
          return "promise";
        case "WeakMap":
          return "weakmap";
        case "WeakSet":
          return "weakset";
        case "Map":
          return "map";
        case "Set":
          return "set";
        case "Int8Array":
          return "int8array";
        case "Uint8Array":
          return "uint8array";
        case "Uint8ClampedArray":
          return "uint8clampedarray";
        case "Int16Array":
          return "int16array";
        case "Uint16Array":
          return "uint16array";
        case "Int32Array":
          return "int32array";
        case "Uint32Array":
          return "uint32array";
        case "Float32Array":
          return "float32array";
        case "Float64Array":
          return "float64array";
      }
      if (isGeneratorObj(val)) {
        return "generator";
      }
      type = toString.call(val);
      switch (type) {
        case "[object Object]":
          return "object";
        case "[object Map Iterator]":
          return "mapiterator";
        case "[object Set Iterator]":
          return "setiterator";
        case "[object String Iterator]":
          return "stringiterator";
        case "[object Array Iterator]":
          return "arrayiterator";
      }
      return type.slice(8, -1).toLowerCase().replace(/\s/g, "");
    };
    function ctorName(val) {
      return typeof val.constructor === "function" ? val.constructor.name : null;
    }
    function isArray(val) {
      if (Array.isArray) return Array.isArray(val);
      return val instanceof Array;
    }
    function isError(val) {
      return val instanceof Error || typeof val.message === "string" && val.constructor && typeof val.constructor.stackTraceLimit === "number";
    }
    function isDate(val) {
      if (val instanceof Date) return true;
      return typeof val.toDateString === "function" && typeof val.getDate === "function" && typeof val.setDate === "function";
    }
    function isRegexp(val) {
      if (val instanceof RegExp) return true;
      return typeof val.flags === "string" && typeof val.ignoreCase === "boolean" && typeof val.multiline === "boolean" && typeof val.global === "boolean";
    }
    function isGeneratorFn(name, val) {
      return ctorName(name) === "GeneratorFunction";
    }
    function isGeneratorObj(val) {
      return typeof val.throw === "function" && typeof val.return === "function" && typeof val.next === "function";
    }
    function isArguments(val) {
      try {
        if (typeof val.length === "number" && typeof val.callee === "function") {
          return true;
        }
      } catch (err) {
        if (err.message.indexOf("callee") !== -1) {
          return true;
        }
      }
      return false;
    }
    function isBuffer(val) {
      if (val.constructor && typeof val.constructor.isBuffer === "function") {
        return val.constructor.isBuffer(val);
      }
      return false;
    }
  }
});

// node_modules/shallow-clone/index.js
var require_shallow_clone = __commonJS({
  "node_modules/shallow-clone/index.js"(exports, module2) {
    "use strict";
    var valueOf = Symbol.prototype.valueOf;
    var typeOf = require_kind_of();
    function clone(val, deep) {
      switch (typeOf(val)) {
        case "array":
          return val.slice();
        case "object":
          return Object.assign({}, val);
        case "date":
          return new val.constructor(Number(val));
        case "map":
          return new Map(val);
        case "set":
          return new Set(val);
        case "buffer":
          return cloneBuffer(val);
        case "symbol":
          return cloneSymbol(val);
        case "arraybuffer":
          return cloneArrayBuffer(val);
        case "float32array":
        case "float64array":
        case "int16array":
        case "int32array":
        case "int8array":
        case "uint16array":
        case "uint32array":
        case "uint8clampedarray":
        case "uint8array":
          return cloneTypedArray(val);
        case "regexp":
          return cloneRegExp(val);
        case "error":
          return Object.create(val);
        default: {
          return val;
        }
      }
    }
    function cloneRegExp(val) {
      const flags = val.flags !== void 0 ? val.flags : /\w+$/.exec(val) || void 0;
      const re = new val.constructor(val.source, flags);
      re.lastIndex = val.lastIndex;
      return re;
    }
    function cloneArrayBuffer(val) {
      const res = new val.constructor(val.byteLength);
      new Uint8Array(res).set(new Uint8Array(val));
      return res;
    }
    function cloneTypedArray(val, deep) {
      return new val.constructor(val.buffer, val.byteOffset, val.length);
    }
    function cloneBuffer(val) {
      const len = val.length;
      const buf = Buffer.allocUnsafe ? Buffer.allocUnsafe(len) : Buffer.from(len);
      val.copy(buf);
      return buf;
    }
    function cloneSymbol(val) {
      return valueOf ? Object(valueOf.call(val)) : {};
    }
    module2.exports = clone;
  }
});

// node_modules/isobject/index.js
var require_isobject = __commonJS({
  "node_modules/isobject/index.js"(exports, module2) {
    "use strict";
    module2.exports = function isObject(val) {
      return val != null && typeof val === "object" && Array.isArray(val) === false;
    };
  }
});

// node_modules/is-plain-object/index.js
var require_is_plain_object = __commonJS({
  "node_modules/is-plain-object/index.js"(exports, module2) {
    "use strict";
    var isObject = require_isobject();
    function isObjectObject(o) {
      return isObject(o) === true && Object.prototype.toString.call(o) === "[object Object]";
    }
    module2.exports = function isPlainObject2(o) {
      var ctor, prot;
      if (isObjectObject(o) === false) return false;
      ctor = o.constructor;
      if (typeof ctor !== "function") return false;
      prot = ctor.prototype;
      if (isObjectObject(prot) === false) return false;
      if (prot.hasOwnProperty("isPrototypeOf") === false) {
        return false;
      }
      return true;
    };
  }
});

// node_modules/clone-deep/index.js
var require_clone_deep = __commonJS({
  "node_modules/clone-deep/index.js"(exports, module2) {
    "use strict";
    var clone = require_shallow_clone();
    var typeOf = require_kind_of();
    var isPlainObject2 = require_is_plain_object();
    function cloneDeep2(val, instanceClone) {
      switch (typeOf(val)) {
        case "object":
          return cloneObjectDeep(val, instanceClone);
        case "array":
          return cloneArrayDeep(val, instanceClone);
        default: {
          return clone(val);
        }
      }
    }
    function cloneObjectDeep(val, instanceClone) {
      if (typeof instanceClone === "function") {
        return instanceClone(val);
      }
      if (instanceClone || isPlainObject2(val)) {
        const res = new val.constructor();
        for (let key in val) {
          res[key] = cloneDeep2(val[key], instanceClone);
        }
        return res;
      }
      return val;
    }
    function cloneArrayDeep(val, instanceClone) {
      const res = new val.constructor(val.length);
      for (let i = 0; i < val.length; i++) {
        res[i] = cloneDeep2(val[i], instanceClone);
      }
      return res;
    }
    module2.exports = cloneDeep2;
  }
});

// node_modules/base64-js/index.js
var require_base64_js = __commonJS({
  "node_modules/base64-js/index.js"(exports) {
    "use strict";
    exports.byteLength = byteLength;
    exports.toByteArray = toByteArray;
    exports.fromByteArray = fromByteArray2;
    var lookup = [];
    var revLookup = [];
    var Arr = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
    var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    for (i = 0, len = code.length; i < len; ++i) {
      lookup[i] = code[i];
      revLookup[code.charCodeAt(i)] = i;
    }
    var i;
    var len;
    revLookup["-".charCodeAt(0)] = 62;
    revLookup["_".charCodeAt(0)] = 63;
    function getLens(b64) {
      var len2 = b64.length;
      if (len2 % 4 > 0) {
        throw new Error("Invalid string. Length must be a multiple of 4");
      }
      var validLen = b64.indexOf("=");
      if (validLen === -1) validLen = len2;
      var placeHoldersLen = validLen === len2 ? 0 : 4 - validLen % 4;
      return [validLen, placeHoldersLen];
    }
    function byteLength(b64) {
      var lens = getLens(b64);
      var validLen = lens[0];
      var placeHoldersLen = lens[1];
      return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
    }
    function _byteLength(b64, validLen, placeHoldersLen) {
      return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
    }
    function toByteArray(b64) {
      var tmp;
      var lens = getLens(b64);
      var validLen = lens[0];
      var placeHoldersLen = lens[1];
      var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
      var curByte = 0;
      var len2 = placeHoldersLen > 0 ? validLen - 4 : validLen;
      var i2;
      for (i2 = 0; i2 < len2; i2 += 4) {
        tmp = revLookup[b64.charCodeAt(i2)] << 18 | revLookup[b64.charCodeAt(i2 + 1)] << 12 | revLookup[b64.charCodeAt(i2 + 2)] << 6 | revLookup[b64.charCodeAt(i2 + 3)];
        arr[curByte++] = tmp >> 16 & 255;
        arr[curByte++] = tmp >> 8 & 255;
        arr[curByte++] = tmp & 255;
      }
      if (placeHoldersLen === 2) {
        tmp = revLookup[b64.charCodeAt(i2)] << 2 | revLookup[b64.charCodeAt(i2 + 1)] >> 4;
        arr[curByte++] = tmp & 255;
      }
      if (placeHoldersLen === 1) {
        tmp = revLookup[b64.charCodeAt(i2)] << 10 | revLookup[b64.charCodeAt(i2 + 1)] << 4 | revLookup[b64.charCodeAt(i2 + 2)] >> 2;
        arr[curByte++] = tmp >> 8 & 255;
        arr[curByte++] = tmp & 255;
      }
      return arr;
    }
    function tripletToBase64(num) {
      return lookup[num >> 18 & 63] + lookup[num >> 12 & 63] + lookup[num >> 6 & 63] + lookup[num & 63];
    }
    function encodeChunk(uint8, start, end) {
      var tmp;
      var output = [];
      for (var i2 = start; i2 < end; i2 += 3) {
        tmp = (uint8[i2] << 16 & 16711680) + (uint8[i2 + 1] << 8 & 65280) + (uint8[i2 + 2] & 255);
        output.push(tripletToBase64(tmp));
      }
      return output.join("");
    }
    function fromByteArray2(uint8) {
      var tmp;
      var len2 = uint8.length;
      var extraBytes = len2 % 3;
      var parts = [];
      var maxChunkLength = 16383;
      for (var i2 = 0, len22 = len2 - extraBytes; i2 < len22; i2 += maxChunkLength) {
        parts.push(encodeChunk(uint8, i2, i2 + maxChunkLength > len22 ? len22 : i2 + maxChunkLength));
      }
      if (extraBytes === 1) {
        tmp = uint8[len2 - 1];
        parts.push(
          lookup[tmp >> 2] + lookup[tmp << 4 & 63] + "=="
        );
      } else if (extraBytes === 2) {
        tmp = (uint8[len2 - 2] << 8) + uint8[len2 - 1];
        parts.push(
          lookup[tmp >> 10] + lookup[tmp >> 4 & 63] + lookup[tmp << 2 & 63] + "="
        );
      }
      return parts.join("");
    }
  }
});

// src/main.tsx
var main_exports = {};
__export(main_exports, {
  default: () => main_default
});
module.exports = __toCommonJS(main_exports);

// src/shared/polyfills/crypto-poly.ts
globalThis.crypto ?? (globalThis.crypto = {});
crypto.randomUUID ?? (crypto.randomUUID = () => {
  const bytes = new Uint8Array(16);
  for (let i = 0; i < 16; i++) bytes[i] = Math.trunc(Math.random() * 256);
  return (
    // biome-ignore lint/style/useTemplate:
    hex(bytes[0]) + hex(bytes[1]) + hex(bytes[2]) + hex(bytes[3]) + "-" + hex(bytes[4]) + hex(bytes[5]) + "-" + hex(bytes[6]) + hex(bytes[7]) + "-" + hex(bytes[8]) + hex(bytes[9]) + "-" + hex(bytes[10]) + hex(bytes[11]) + hex(bytes[12]) + hex(bytes[13]) + hex(bytes[14]) + hex(bytes[15])
  );
});
function hex(byte) {
  return byte.toString(16).padStart(2, "0");
}

// src/main.tsx
var import_driveLoad = require_server_stub();
var import_emitDeltas = require_server_stub();
var import_emitLiveConfig = require_server_stub();
var import_emitPartitions = require_server_stub();
var import_leaderboardUpdate = require_server_stub();
var import_commentsubmit = require_server_stub();
var import_install = require_server_stub();
var import_upgrade = require_server_stub();
var import_protos34 = require("@devvit/protos");

// node_modules/@devvit/shared-types/NonNull.js
function assertNonNull(val, msg) {
  if (val == null)
    throw Error(msg ?? "Expected nonnullish value.");
}

// node_modules/@devvit/shared-types/assert.js
function assert(condition, msg) {
  if (!condition)
    throw Error(msg);
}

// node_modules/@devvit/shared-types/tid.js
var T_PREFIX;
(function(T_PREFIX2) {
  T_PREFIX2["COMMENT"] = "t1_";
  T_PREFIX2["ACCOUNT"] = "t2_";
  T_PREFIX2["LINK"] = "t3_";
  T_PREFIX2["MESSAGE"] = "t4_";
  T_PREFIX2["SUBREDDIT"] = "t5_";
  T_PREFIX2["AWARD"] = "t6_";
})(T_PREFIX || (T_PREFIX = {}));
function isT1ID(id) {
  return id.startsWith(T_PREFIX.COMMENT);
}
function isT2ID(id) {
  return id.startsWith(T_PREFIX.ACCOUNT);
}
function isT3ID(id) {
  return id.startsWith(T_PREFIX.LINK);
}
function isT4ID(id) {
  return id.startsWith(T_PREFIX.MESSAGE);
}
function isT5ID(id) {
  return id.startsWith(T_PREFIX.SUBREDDIT);
}
function isT6ID(id) {
  return id.startsWith(T_PREFIX.AWARD);
}
function assertT1ID(id) {
  assert(isT1ID(id), `Expected comment id to start with ${T_PREFIX.COMMENT}, got ${id}}`);
}
function assertT2ID(id) {
  assert(isT2ID(id), `Expected account id to start with ${T_PREFIX.ACCOUNT}, got ${id}}`);
}
function assertT3ID(id) {
  assert(isT3ID(id), `Expected link id to start with ${T_PREFIX.LINK}, got ${id}}`);
}
function assertT4ID(id) {
  assert(isT4ID(id), `Expected message id to start with ${T_PREFIX.MESSAGE}, got ${id}}`);
}
function assertT5ID(id) {
  assert(isT5ID(id), `Expected subreddit id to start with ${T_PREFIX.SUBREDDIT}, got ${id}}`);
}
function assertT6ID(id) {
  assert(isT6ID(id), `Expected award id to start with ${T_PREFIX.AWARD}, got ${id}}`);
}
function asT1ID(id) {
  assertT1ID(id);
  return id;
}
function asT2ID(id) {
  assertT2ID(id);
  return id;
}
function asT3ID(id) {
  assertT3ID(id);
  return id;
}
function asT4ID(id) {
  assertT4ID(id);
  return id;
}
function asT5ID(id) {
  assertT5ID(id);
  return id;
}
function asT6ID(id) {
  assertT6ID(id);
  return id;
}
function asTID(id) {
  if (isT1ID(id)) {
    return asT1ID(id);
  }
  if (isT2ID(id)) {
    return asT2ID(id);
  }
  if (isT3ID(id)) {
    return asT3ID(id);
  }
  if (isT4ID(id)) {
    return asT4ID(id);
  }
  if (isT5ID(id)) {
    return asT5ID(id);
  }
  if (isT6ID(id)) {
    return asT6ID(id);
  }
  throw new Error(`Expected thing id to start with ${Object.values(T_PREFIX).join(", ")} got ${id}}`);
}
function isCommentId(id) {
  return isT1ID(id);
}

// node_modules/@devvit/public-api/devvit/Devvit.js
var protos = __toESM(require("@devvit/protos"), 1);

// node_modules/@devvit/shared-types/Actor.js
var Actor = class {
  constructor(config) {
  }
};

// node_modules/@devvit/public-api/types/form.js
var SettingScope;
(function(SettingScope2) {
  SettingScope2["Installation"] = "installation";
  SettingScope2["App"] = "app";
})(SettingScope || (SettingScope = {}));

// node_modules/@devvit/public-api/apis/ui/helpers/assertValidFormFields.js
function assertValidFormFields(fields, seenNames = /* @__PURE__ */ new Set()) {
  for (const field of fields) {
    if (field.type === "group") {
      assertValidFormFields(field.fields, seenNames);
      continue;
    }
    const fieldName = field.name;
    if (seenNames.has(fieldName)) {
      throw new Error(`Duplicate field name: ${fieldName}`);
    }
    seenNames.add(fieldName);
  }
  assertAppSecretsOnly(fields);
}
function assertAppSecretsOnly(fields) {
  for (const field of fields) {
    if (field.type === "string" && field.isSecret && field.scope !== SettingScope.App) {
      throw `Invalid setting: only app settings can be secrets. Add "scope: SettingScope.App" to field "${field.name}"`;
    }
  }
}

// node_modules/@devvit/public-api/types/hooks.js
var Hook = Object.freeze({
  INTERVAL: 0,
  // useInterval hook
  FORM: 1,
  // useForm hook
  STATE: 2,
  // useState hook
  CHANNEL: 3,
  // useChannel hook
  WEB_VIEW: 4
  // useWebView hook
});

// node_modules/@devvit/public-api/types/triggers.js
var import_protos = require("@devvit/protos");

// node_modules/@devvit/public-api/devvit/internals/app-settings.js
var import_protos9 = require("@devvit/protos");

// node_modules/@devvit/public-api/apis/ui/helpers/transformForm.js
var import_protos2 = require("@devvit/protos");
function transformFormFields(fields) {
  return fields.map((field) => {
    switch (field.type) {
      case "string":
        return transformStringField(field);
      case "image":
        return transformImageField(field);
      case "paragraph":
        return transformParagraphField(field);
      case "number":
        return transformNumberField(field);
      case "select":
        return transformSelectField(field);
      case "boolean":
        return transformBooleanField(field);
      case "group":
        return transformGroupField(field);
      default:
        throw new Error("Unknown field type.");
    }
  });
}
function transformStringField(field) {
  return {
    defaultValue: {
      fieldType: import_protos2.FormFieldType.STRING,
      stringValue: field.defaultValue
    },
    disabled: field.disabled,
    fieldConfig: {
      stringConfig: {
        placeholder: field.placeholder
      }
    },
    fieldId: field.name,
    fieldType: import_protos2.FormFieldType.STRING,
    helpText: field.helpText,
    label: field.label,
    required: field.required,
    isSecret: field.isSecret
  };
}
function transformImageField(field) {
  return {
    disabled: field.disabled,
    fieldId: field.name,
    fieldType: import_protos2.FormFieldType.IMAGE,
    helpText: field.helpText,
    label: field.label,
    required: field.required
  };
}
function transformParagraphField(field) {
  return {
    defaultValue: {
      fieldType: import_protos2.FormFieldType.PARAGRAPH,
      stringValue: field.defaultValue
    },
    disabled: field.disabled,
    fieldConfig: {
      paragraphConfig: {
        lineHeight: field.lineHeight,
        placeholder: field.placeholder
      }
    },
    fieldId: field.name,
    fieldType: import_protos2.FormFieldType.PARAGRAPH,
    helpText: field.helpText,
    label: field.label,
    required: field.required
  };
}
function transformNumberField(field) {
  return {
    defaultValue: {
      fieldType: import_protos2.FormFieldType.NUMBER,
      numberValue: field.defaultValue
    },
    disabled: field.disabled,
    fieldConfig: {
      numberConfig: {}
    },
    fieldId: field.name,
    fieldType: import_protos2.FormFieldType.NUMBER,
    helpText: field.helpText,
    label: field.label,
    required: field.required
  };
}
function transformSelectField(field) {
  return {
    defaultValue: {
      fieldType: import_protos2.FormFieldType.SELECTION,
      selectionValue: {
        values: field.defaultValue ?? []
      }
    },
    disabled: field.disabled,
    fieldConfig: {
      selectionConfig: {
        choices: field.options,
        multiSelect: field.multiSelect
      }
    },
    fieldId: field.name,
    fieldType: import_protos2.FormFieldType.SELECTION,
    helpText: field.helpText,
    label: field.label,
    required: field.required
  };
}
function transformBooleanField(field) {
  return {
    defaultValue: {
      fieldType: import_protos2.FormFieldType.BOOLEAN,
      boolValue: field.defaultValue
    },
    disabled: field.disabled,
    fieldId: field.name,
    fieldType: import_protos2.FormFieldType.BOOLEAN,
    helpText: field.helpText,
    label: field.label
  };
}
function transformGroupField(field) {
  return {
    fieldId: "",
    fieldType: import_protos2.FormFieldType.GROUP,
    fieldConfig: {
      groupConfig: {
        fields: transformFormFields(field.fields)
      }
    },
    label: field.label,
    helpText: field.helpText
  };
}

// node_modules/@devvit/public-api/devvit/internals/helpers/extendDevvitPrototype.js
function extendDevvitPrototype(key, value) {
  Devvit.prototype[key] = value;
}

// node_modules/@devvit/public-api/devvit/internals/helpers/settingsUtils.js
var import_protos8 = require("@devvit/protos");

// node_modules/@devvit/public-api/devvit/internals/blocks/useChannel.js
var import_protos3 = require("@devvit/protos");

// node_modules/@devvit/shared-types/Header.js
var Header = Object.freeze({
  Actor: "devvit-actor",
  App: "devvit-app",
  AppUser: "devvit-app-user",
  AppViewerAuthToken: "devvit-app-viewer-authorization",
  Caller: "devvit-caller",
  CallerPortID: "devvit-caller-port-id",
  Canary: "devvit-canary",
  Debug: "devvit-debug",
  GQLHost: "devvit-gql-host",
  Installation: "devvit-installation",
  ModPermissions: "devvit-mod-permissions",
  Post: "devvit-post",
  PostAuthor: "devvit-post-author",
  R2Auth: "devvit-sec-authorization",
  R2Host: "devvit-r2-host",
  RemoteHostname: "devvit-remote-hostname",
  SettingsUri: "devvit-sec-settings-uri",
  StreamID: "devvit-stream-id",
  Subreddit: "devvit-subreddit",
  SubredditName: "devvit-subreddit-name",
  TraceID: "devvit-trace-id",
  User: "devvit-user",
  Username: "devvit-user-name",
  UserAgent: "devvit-user-agent",
  Version: "devvit-version",
  Language: "devvit-accept-language",
  Timezone: "devvit-accept-timezone",
  Traceparent: "traceparent",
  AppDependencies: "devvit-app-dependencies"
});
var AppDebug;
(function(AppDebug2) {
  AppDebug2["Blocks"] = "blocks";
  AppDebug2["EmitSnapshots"] = "emitSnapshots";
  AppDebug2["EmitState"] = "emitState";
  AppDebug2["Realtime"] = "realtime";
  AppDebug2["Runtime"] = "runtime";
  AppDebug2["Surface"] = "surface";
  AppDebug2["UseAsync"] = "useAsync";
  AppDebug2["Payments"] = "payments";
  AppDebug2["Bootstrap"] = "bootstrap";
  AppDebug2["WebView"] = "webView";
})(AppDebug || (AppDebug = {}));

// node_modules/@devvit/public-api/types/realtime.js
var ChannelStatus;
(function(ChannelStatus2) {
  ChannelStatus2[ChannelStatus2["Unknown"] = 0] = "Unknown";
  ChannelStatus2[ChannelStatus2["Connecting"] = 1] = "Connecting";
  ChannelStatus2[ChannelStatus2["Connected"] = 2] = "Connected";
  ChannelStatus2[ChannelStatus2["Disconnecting"] = 3] = "Disconnecting";
  ChannelStatus2[ChannelStatus2["Disconnected"] = 4] = "Disconnected";
})(ChannelStatus || (ChannelStatus = {}));

// node_modules/@devvit/public-api/devvit/internals/blocks/useChannel.js
function makeUseChannelHook(reconciler) {
  function useChannel2(options) {
    const debug = false;
    const hookIndex = reconciler.currentHookIndex;
    const currentState = reconciler.getCurrentComponentState();
    const previousState = reconciler.getPreviousComponentState();
    const appId = reconciler.metadata[Header.App]?.values[0];
    assertNonNull(appId, "useChannel - app is missing from Context");
    const installationId = reconciler.metadata[Header.Installation]?.values[0];
    assertNonNull(installationId, "useChannel - installation is missing from Context");
    async function send(msg) {
      if (debug)
        console.debug("[realtime] sends", msg);
      const name = currentState[hookIndex].channel;
      if (currentState[hookIndex].active) {
        if (currentState[hookIndex].connected) {
          await reconciler.realtime.send(name, msg);
        } else {
          throw Error(`Failed to send to channel '${name}'; it is active but not yet connected`);
        }
      } else {
        throw Error(`Cannot send a message over inactive channel: ${name}`);
      }
    }
    function subscribe() {
      if (!currentState[hookIndex].active) {
        if (debug)
          console.debug("[realtime] subscribe");
        const name = currentState[hookIndex].channel;
        currentState[hookIndex].active = true;
        reconciler.addRealtimeChannel(name);
      }
    }
    function unsubscribe() {
      if (currentState[hookIndex].active) {
        if (debug)
          console.debug("[realtime] unsubscribe");
        const name = currentState[hookIndex].channel;
        currentState[hookIndex].active = false;
        reconciler.removeRealtimeChannel(name);
      }
    }
    function hook(event2) {
      return async () => {
        let result;
        switch (event2.status) {
          case import_protos3.RealtimeSubscriptionStatus.REALTIME_SUBSCRIBED:
            if (debug)
              console.debug("[realtime] onSubscribed()");
            currentState[hookIndex].connected = true;
            result = options.onSubscribed?.();
            break;
          case import_protos3.RealtimeSubscriptionStatus.REALTIME_UNSUBSCRIBED:
            if (debug)
              console.debug("[realtime] onUnsubscribed()");
            currentState[hookIndex].connected = false;
            result = options.onUnsubscribed?.();
            break;
          default:
            if (debug)
              console.debug("[realtime] receives", event2.event?.data);
            result = options.onMessage(event2.event?.data?.msg);
            break;
        }
        await result;
      };
    }
    let hookState = {
      channel: `${appId}:${installationId}:${options.name}`,
      active: false,
      connected: false,
      preventCallback: false,
      type: Hook.CHANNEL
    };
    if (hookIndex in currentState) {
      hookState = currentState[hookIndex];
    } else if (hookIndex in previousState) {
      hookState = previousState[hookIndex];
    }
    const event = reconciler.realtimeEvent;
    if (reconciler.isInitialRender) {
      hookState.active = false;
    } else if (event && hookState.active && event.event.channel === hookState.channel) {
      if (!hookState.preventCallback) {
        reconciler.runHook(hook(event));
      }
      reconciler.rerenderIn(0);
    }
    currentState[hookIndex] = hookState;
    reconciler.currentHookIndex++;
    let status = ChannelStatus.Unknown;
    if (hookState.active && hookState.connected) {
      status = ChannelStatus.Connected;
    } else if (hookState.active && !hookState.connected) {
      status = ChannelStatus.Connecting;
    } else if (!hookState.active && hookState.connected) {
      status = ChannelStatus.Disconnecting;
    } else if (!hookState.active && !hookState.connected) {
      status = ChannelStatus.Disconnected;
    }
    return {
      subscribe,
      unsubscribe,
      send,
      status
    };
  }
  return useChannel2;
}

// node_modules/@devvit/public-api/apis/ui/helpers/getFormValues.js
var import_protos4 = require("@devvit/protos");
function flattenFormFieldValue(value) {
  switch (value.fieldType) {
    case import_protos4.FormFieldType.STRING:
      return value.stringValue;
    case import_protos4.FormFieldType.IMAGE:
      return value.stringValue;
    case import_protos4.FormFieldType.PARAGRAPH:
      return value.stringValue;
    case import_protos4.FormFieldType.NUMBER:
      return value.numberValue;
    case import_protos4.FormFieldType.BOOLEAN:
      return value.boolValue;
    case import_protos4.FormFieldType.SELECTION:
      return value.selectionValue?.values ?? [];
    default:
      return void 0;
  }
}
function getFormValues(results) {
  return Object.keys(results).reduce((acc, key) => {
    const val = flattenFormFieldValue(results[key]);
    if (val !== void 0)
      acc[key] = val;
    return acc;
  }, {});
}

// node_modules/@devvit/public-api/devvit/internals/blocks/useForm.js
function makeUseFormHook(reconciler) {
  function useForm2(form, onSubmit) {
    const hookIndex = reconciler.currentHookIndex;
    const componentKey = reconciler.getCurrentComponentKey();
    const currentState = reconciler.getCurrentComponentState();
    const previousState = reconciler.getPreviousComponentState();
    const formKey = `form.hook.${componentKey}.${hookIndex}`;
    let hookState = {
      formKey,
      preventSubmit: false,
      type: Hook.FORM
    };
    if (hookIndex in currentState) {
      hookState = currentState[hookIndex];
    } else if (hookIndex in previousState) {
      hookState = previousState[hookIndex];
    }
    currentState[hookIndex] = hookState;
    reconciler.forms.set(formKey, form);
    const formSubmittedEvent = reconciler.formSubmittedEvent;
    if (formSubmittedEvent && !hookState.preventSubmit) {
      if (formSubmittedEvent.formId === formKey) {
        reconciler.runHook(async () => {
          const response = onSubmit(getFormValues(formSubmittedEvent.results));
          if (response && response instanceof Promise) {
            await response;
          }
          reconciler.rerenderIn(0);
        });
      }
    }
    currentState[hookIndex].preventSubmit = false;
    reconciler.currentHookIndex++;
    return formKey;
  }
  return useForm2;
}

// node_modules/@devvit/public-api/devvit/internals/blocks/useInterval.js
function makeUseIntervalHook(reconciler) {
  function useInterval2(callback, requestedDelayMs) {
    const hookIndex = reconciler.currentHookIndex;
    const currentState = reconciler.getCurrentComponentState();
    const previousState = reconciler.getPreviousComponentState();
    const minDelay = 100;
    const delayMs = Math.max(minDelay, requestedDelayMs);
    let hookState = {
      lastRun: void 0,
      running: false,
      preventCallback: false,
      type: Hook.INTERVAL
    };
    if (hookIndex in currentState) {
      hookState = currentState[hookIndex];
    } else if (hookIndex in previousState) {
      hookState = previousState[hookIndex];
    }
    function start() {
      if (requestedDelayMs < minDelay) {
        console.error(`useInterval delay must be at least ${minDelay}ms. Your interval of ${requestedDelayMs}ms was automatically extended.`);
      }
      for (const [i, stateItem] of Object.entries(currentState)) {
        if (i !== hookIndex.toString() && stateItem?.type === Hook.INTERVAL && stateItem?.running) {
          throw new Error("Only one useInterval hook may be running at a time");
        }
      }
      currentState[hookIndex] = {
        running: true,
        lastRun: currentState[hookIndex]?.lastRun ?? Date.now(),
        preventCallback: false,
        type: Hook.INTERVAL
      };
      reconciler.rerenderIn(delayMs);
    }
    function stop() {
      currentState[hookIndex].running = false;
      currentState[hookIndex].lastRun = void 0;
      currentState[hookIndex].preventCallback = false;
    }
    if (reconciler.isEffectRender && hookState.running) {
      if (!hookState.preventCallback) {
        if (hookState.lastRun === void 0 || hookState.lastRun + delayMs < Date.now()) {
          reconciler.runHook(async () => {
            const response = callback();
            if (response && response instanceof Promise) {
              await response;
            }
            hookState.lastRun = Date.now();
          });
        }
      }
      reconciler.rerenderIn(delayMs);
    }
    hookState.preventCallback = false;
    currentState[hookIndex] = hookState;
    reconciler.currentHookIndex++;
    return {
      start,
      stop
    };
  }
  return useInterval2;
}

// node_modules/@devvit/public-api/devvit/internals/blocks/useState.js
function makeUseStateHook(reconciler) {
  function useState3(initialState) {
    const hookIndex = reconciler.currentHookIndex;
    const currentState = reconciler.getCurrentComponentState();
    const previousState = reconciler.getPreviousComponentState();
    if (hookIndex in currentState) {
      reconciler.currentHookIndex++;
      return [currentState[hookIndex], stateSetter];
    }
    if (reconciler.isInitialRender || !(hookIndex in previousState)) {
      const value = initialState instanceof Function ? initialState() : initialState;
      if (value instanceof Promise) {
        const asyncResolver = async () => {
          currentState[hookIndex] = await value;
          reconciler.currentHookIndex = 0;
        };
        throw asyncResolver();
      }
      currentState[hookIndex] = value;
    } else {
      currentState[hookIndex] = previousState[hookIndex];
    }
    function stateSetter(valueOrFunction) {
      if (reconciler.isRendering) {
        throw new Error("Cannot call setState while rendering.");
      }
      currentState[hookIndex] = valueOrFunction instanceof Function ? valueOrFunction(currentState[hookIndex]) : valueOrFunction;
    }
    reconciler.currentHookIndex++;
    return [currentState[hookIndex], stateSetter];
  }
  return useState3;
}

// node_modules/@devvit/public-api/devvit/internals/promise_cache.js
var __classPrivateFieldSet = function(receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet = function(receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _PromiseCache_instances;
var _PromiseCache_redis;
var _PromiseCache_localCache;
var _PromiseCache_clock;
var _PromiseCache_state;
var _PromiseCache_localCachedAnswer;
var _PromiseCache_maybeRefreshCache;
var _PromiseCache_refreshCache;
var _PromiseCache_pollForCache;
var _PromiseCache_updateCache;
var _PromiseCache_calculateRamp;
var _PromiseCache_redisEntry;
var _PromiseCache_enforceTTL;
var SystemClock = {
  now() {
    return /* @__PURE__ */ new Date();
  }
};
function _namespaced(key) {
  return `__autocache__${key}`;
}
function _lock(key) {
  return `__lock__${key}`;
}
var pollEvery = 300;
var maxPollingTimeout = 1e3;
var minTtlValue = 5e3;
var retryLimit = 3;
var errorRetryProbability = 0.1;
var clientRetryDelay = 1e3;
var allowStaleFor = 3e4;
function _unwrap(entry) {
  if (entry.error) {
    throw new Error(entry.error);
  }
  return entry.value;
}
var PromiseCache = class {
  constructor(redis, state, clock = SystemClock) {
    _PromiseCache_instances.add(this);
    _PromiseCache_redis.set(this, void 0);
    _PromiseCache_localCache.set(this, {});
    _PromiseCache_clock.set(this, void 0);
    _PromiseCache_state.set(this, void 0);
    __classPrivateFieldSet(this, _PromiseCache_redis, redis, "f");
    __classPrivateFieldSet(this, _PromiseCache_state, state, "f");
    __classPrivateFieldSet(this, _PromiseCache_clock, clock, "f");
  }
  /**
   * This is the public API for the cache.  Call this method to cache a promise.
   *
   * @param closure
   * @param options
   * @returns
   */
  async cache(closure, options) {
    __classPrivateFieldSet(this, _PromiseCache_localCache, __classPrivateFieldGet(this, _PromiseCache_state, "f").__cache = __classPrivateFieldGet(this, _PromiseCache_state, "f").__cache ?? {}, "f");
    __classPrivateFieldGet(this, _PromiseCache_instances, "m", _PromiseCache_enforceTTL).call(this, options);
    const localCachedAnswer = __classPrivateFieldGet(this, _PromiseCache_instances, "m", _PromiseCache_localCachedAnswer).call(this, options.key);
    if (localCachedAnswer !== void 0) {
      return localCachedAnswer;
    }
    const existing = await __classPrivateFieldGet(this, _PromiseCache_instances, "m", _PromiseCache_redisEntry).call(this, options.key);
    const entry = await __classPrivateFieldGet(this, _PromiseCache_instances, "m", _PromiseCache_maybeRefreshCache).call(this, options, existing, closure);
    return _unwrap(entry);
  }
};
_PromiseCache_redis = /* @__PURE__ */ new WeakMap(), _PromiseCache_localCache = /* @__PURE__ */ new WeakMap(), _PromiseCache_clock = /* @__PURE__ */ new WeakMap(), _PromiseCache_state = /* @__PURE__ */ new WeakMap(), _PromiseCache_instances = /* @__PURE__ */ new WeakSet(), _PromiseCache_localCachedAnswer = function _PromiseCache_localCachedAnswer2(key) {
  const val = __classPrivateFieldGet(this, _PromiseCache_localCache, "f")[key];
  if (val) {
    const now = __classPrivateFieldGet(this, _PromiseCache_clock, "f").now().getTime();
    const hasRetryableError = val?.error && val?.errorTime && val.errorCount < retryLimit && Math.random() < errorRetryProbability && val.errorTime + clientRetryDelay < now;
    const expired = val?.expires && val.expires < now && val.checkedAt + clientRetryDelay < now;
    if (expired || hasRetryableError) {
      delete __classPrivateFieldGet(this, _PromiseCache_localCache, "f")[key];
      return void 0;
    } else {
      return _unwrap(val);
    }
  }
  return void 0;
}, _PromiseCache_maybeRefreshCache = /**
 * If we've bothered to check redis, we're already on the backend.  Let's see if the cache either (1) contains an error, (2)
 * is expired, (3) is missing, or (4) is about to expire.  If any of these are true, we'll refresh the cache based on heuristics.
 *
 * We'll always refresh if missing or expired, but its probabilistic if we'll refresh if about to expire or if we have an error.
 */
async function _PromiseCache_maybeRefreshCache2(options, entry, closure) {
  const expires = entry?.expires;
  const rampProbability = expires ? __classPrivateFieldGet(this, _PromiseCache_instances, "m", _PromiseCache_calculateRamp).call(this, expires) : 1;
  if (!entry || entry?.error && entry.errorCount < retryLimit && errorRetryProbability > Math.random() || rampProbability > Math.random()) {
    return __classPrivateFieldGet(this, _PromiseCache_instances, "m", _PromiseCache_refreshCache).call(this, options, entry, closure);
  } else {
    return entry;
  }
}, _PromiseCache_refreshCache = /**
 * The conditions for refreshing the cache are handled in the calling method, which should be
 * #maybeRefreshCache.
 *
 * If you don't win the lock, you'll poll for the cache.  If you don't get the cache within maxPollingTimeout, you'll throw an error.
 */
async function _PromiseCache_refreshCache2(options, entry, closure) {
  const lockKey = _lock(options.key);
  const now = __classPrivateFieldGet(this, _PromiseCache_clock, "f").now().getTime();
  const lockExpiration = new Date(now + options.ttl / 2);
  const lockObtained = await __classPrivateFieldGet(this, _PromiseCache_redis, "f").set(lockKey, "1", {
    expiration: lockExpiration,
    nx: true
  });
  if (lockObtained) {
    return __classPrivateFieldGet(this, _PromiseCache_instances, "m", _PromiseCache_updateCache).call(this, options.key, entry, closure, options.ttl);
  } else if (entry) {
    return entry;
  } else {
    const start = __classPrivateFieldGet(this, _PromiseCache_clock, "f").now();
    return __classPrivateFieldGet(this, _PromiseCache_instances, "m", _PromiseCache_pollForCache).call(this, start, options.key, options.ttl);
  }
}, _PromiseCache_pollForCache = async function _PromiseCache_pollForCache2(start, key, ttl) {
  const pollingTimeout = Math.min(ttl, maxPollingTimeout);
  const existing = await __classPrivateFieldGet(this, _PromiseCache_instances, "m", _PromiseCache_redisEntry).call(this, key);
  if (existing) {
    return existing;
  }
  if (__classPrivateFieldGet(this, _PromiseCache_clock, "f").now().getTime() - start.getTime() >= pollingTimeout) {
    throw new Error(`Cache request timed out trying to get data at key: ${key}`);
  }
  await new Promise((resolve) => setTimeout(resolve, pollEvery));
  return __classPrivateFieldGet(this, _PromiseCache_instances, "m", _PromiseCache_pollForCache2).call(this, start, key, ttl);
}, _PromiseCache_updateCache = /**
 * Actually update the cache.  This is the method that will be called if we have the lock.
 */
async function _PromiseCache_updateCache2(key, entry, closure, ttl) {
  const expires = __classPrivateFieldGet(this, _PromiseCache_clock, "f").now().getTime() + ttl;
  entry = entry ?? {
    value: null,
    expires,
    errorCount: 0,
    error: null,
    errorTime: null,
    checkedAt: 0
  };
  try {
    entry.value = await closure();
    entry.error = null;
    entry.errorCount = 0;
    entry.errorTime = null;
  } catch (e) {
    entry.value = null;
    entry.error = e.message ?? "Unknown error";
    entry.errorTime = __classPrivateFieldGet(this, _PromiseCache_clock, "f").now().getTime();
    entry.errorCount++;
  }
  __classPrivateFieldGet(this, _PromiseCache_localCache, "f")[key] = entry;
  await __classPrivateFieldGet(this, _PromiseCache_redis, "f").set(_namespaced(key), JSON.stringify(entry), {
    expiration: new Date(expires + allowStaleFor)
  });
  if (entry.error && entry.errorCount < retryLimit) {
    await __classPrivateFieldGet(this, _PromiseCache_redis, "f").del(_lock(key));
  }
  return entry;
}, _PromiseCache_calculateRamp = function _PromiseCache_calculateRamp2(expiry) {
  const now = __classPrivateFieldGet(this, _PromiseCache_clock, "f").now().getTime();
  const remaining = expiry - now;
  if (remaining < 0) {
    return 1;
  } else if (remaining < 1e3) {
    return 0.1;
  } else if (remaining < 2e3) {
    return 0.01;
  } else if (remaining < 3e3) {
    return 1e-3;
  } else {
    return 0;
  }
}, _PromiseCache_redisEntry = async function _PromiseCache_redisEntry2(key) {
  const val = await __classPrivateFieldGet(this, _PromiseCache_redis, "f").get(_namespaced(key));
  if (val) {
    const entry = JSON.parse(val);
    entry.checkedAt = __classPrivateFieldGet(this, _PromiseCache_clock, "f").now().getTime();
    __classPrivateFieldGet(this, _PromiseCache_localCache, "f")[key] = entry;
    return entry;
  }
  return void 0;
}, _PromiseCache_enforceTTL = function _PromiseCache_enforceTTL2(options) {
  if (options.ttl < minTtlValue) {
    console.warn(`Cache TTL cannot be less than ${minTtlValue} milliseconds! Updating ttl value of ${options.ttl} to ${minTtlValue}.`);
    options.ttl = minTtlValue;
  }
};

// node_modules/@devvit/public-api/devvit/internals/cache.js
function makeCache(redis, state, clock = SystemClock) {
  const pc = new PromiseCache(redis, state, clock);
  return pc.cache.bind(pc);
}

// node_modules/@devvit/public-api/apis/AssetsClient/AssetsClient.js
var __classPrivateFieldSet2 = function(receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet2 = function(receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _AssetsClient_instances;
var _AssetsClient_assetMap;
var _AssetsClient_webViewAssetMap;
var _AssetsClient_getURL;
var _AssetsClient_getURLs;
function assertValidUrl(path) {
  new URL(path.slice(0, path.indexOf(",")));
}
var AssetsClient = class {
  constructor() {
    _AssetsClient_instances.add(this);
    _AssetsClient_assetMap.set(this, {});
    _AssetsClient_webViewAssetMap.set(this, {});
    __classPrivateFieldSet2(this, _AssetsClient_assetMap, Devvit.assets, "f");
    __classPrivateFieldSet2(this, _AssetsClient_webViewAssetMap, Devvit.webViewAssets, "f");
  }
  /**
   * Takes one or more asset names, relative to the 'assets/' folder, and returns either the
   * public URL for that one asset, or a map of each asset name to its URL.
   * @param assetPathOrPaths - Either the path you need the public URL for, or an array of paths.
   * @param options
   * @returns Either the public URL for the one asset you asked for, or a map of assets to their URLs.
   */
  getURL(assetPathOrPaths, options) {
    if (typeof assetPathOrPaths === "string") {
      return __classPrivateFieldGet2(this, _AssetsClient_instances, "m", _AssetsClient_getURL).call(this, assetPathOrPaths, options ?? { webView: false });
    }
    return __classPrivateFieldGet2(this, _AssetsClient_instances, "m", _AssetsClient_getURLs).call(this, assetPathOrPaths, options ?? { webView: false });
  }
};
_AssetsClient_assetMap = /* @__PURE__ */ new WeakMap(), _AssetsClient_webViewAssetMap = /* @__PURE__ */ new WeakMap(), _AssetsClient_instances = /* @__PURE__ */ new WeakSet(), _AssetsClient_getURL = function _AssetsClient_getURL2(assetPath, options) {
  const localUrl = options.webView ? __classPrivateFieldGet2(this, _AssetsClient_webViewAssetMap, "f")[assetPath] : __classPrivateFieldGet2(this, _AssetsClient_assetMap, "f")[assetPath];
  if (localUrl) {
    return localUrl;
  }
  try {
    assertValidUrl(assetPath);
    return assetPath;
  } catch {
    return "";
  }
}, _AssetsClient_getURLs = function _AssetsClient_getURLs2(assetPaths, options) {
  const retval = {};
  let missingPaths = [];
  const cache = options.webView ? __classPrivateFieldGet2(this, _AssetsClient_webViewAssetMap, "f") : __classPrivateFieldGet2(this, _AssetsClient_assetMap, "f");
  if (cache) {
    for (const path of assetPaths) {
      if (cache[path]) {
        retval[path] = cache[path];
      } else {
        try {
          assertValidUrl(path);
          retval[path] = path;
        } catch {
          missingPaths.push(path);
        }
      }
    }
  } else {
    missingPaths = assetPaths;
  }
  if (missingPaths.length > 0) {
    throw new Error(`The following assets were missing from the assets list: ${missingPaths.join(", ")}`);
  }
  return retval;
};

// node_modules/@devvit/public-api/apis/key-value-storage/KeyValueStorage.js
var __classPrivateFieldSet3 = function(receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet3 = function(receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _KeyValueStorage_metadata;
var KeyValueStorage = class {
  constructor(metadata) {
    _KeyValueStorage_metadata.set(this, void 0);
    __classPrivateFieldSet3(this, _KeyValueStorage_metadata, metadata, "f");
  }
  async get(key) {
    const { messages } = await Devvit.kvStorePlugin.Get({ keys: [key] }, __classPrivateFieldGet3(this, _KeyValueStorage_metadata, "f"));
    try {
      if (messages[key]) {
        return JSON.parse(messages[key]);
      }
    } catch {
      return void 0;
    }
    return void 0;
  }
  async put(key, value) {
    const messages = {};
    messages[key] = JSON.stringify(value);
    await Devvit.kvStorePlugin.Put({ messages }, __classPrivateFieldGet3(this, _KeyValueStorage_metadata, "f"));
  }
  async delete(key) {
    await Devvit.kvStorePlugin.Del({ keys: [key] }, __classPrivateFieldGet3(this, _KeyValueStorage_metadata, "f"));
  }
  async list() {
    const { keys } = await Devvit.kvStorePlugin.List({ filter: "*" }, __classPrivateFieldGet3(this, _KeyValueStorage_metadata, "f"));
    return keys;
  }
};
_KeyValueStorage_metadata = /* @__PURE__ */ new WeakMap();

// node_modules/@devvit/public-api/apis/media/MediaClient.js
var __classPrivateFieldSet4 = function(receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet4 = function(receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _MediaClient_metadata;
var MediaClient = class {
  constructor(metadata) {
    _MediaClient_metadata.set(this, void 0);
    __classPrivateFieldSet4(this, _MediaClient_metadata, metadata, "f");
  }
  async upload(opts) {
    const response = await Devvit.mediaPlugin.Upload(opts, __classPrivateFieldGet4(this, _MediaClient_metadata, "f"));
    if (!response.mediaId) {
      throw new Error("unable to get mediaId via uploads");
    }
    return Promise.resolve({ mediaId: response.mediaId, mediaUrl: response.mediaUrl });
  }
};
_MediaClient_metadata = /* @__PURE__ */ new WeakMap();

// node_modules/@devvit/public-api/apis/modLog/ModLogClient.js
var __classPrivateFieldSet5 = function(receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet5 = function(receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _ModLogClient_metadata;
var ModLogClient = class {
  constructor(metadata) {
    _ModLogClient_metadata.set(this, void 0);
    __classPrivateFieldSet5(this, _ModLogClient_metadata, metadata, "f");
  }
  async add(options) {
    await Devvit.modLogPlugin.Add(options, __classPrivateFieldGet5(this, _ModLogClient_metadata, "f"));
  }
};
_ModLogClient_metadata = /* @__PURE__ */ new WeakMap();

// node_modules/@devvit/public-api/apis/realtime/RealtimeClient.js
var __classPrivateFieldSet6 = function(receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet6 = function(receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _RealtimeClient_metadata;
var RealtimeClient = class {
  constructor(metadata) {
    _RealtimeClient_metadata.set(this, void 0);
    __classPrivateFieldSet6(this, _RealtimeClient_metadata, metadata, "f");
  }
  async send(channel, msg) {
    await Devvit.realtimePlugin.Send({ channel, data: { msg } }, __classPrivateFieldGet6(this, _RealtimeClient_metadata, "f"));
  }
};
_RealtimeClient_metadata = /* @__PURE__ */ new WeakMap();

// node_modules/@devvit/public-api/apis/reddit/RedditAPIClient.js
var import_protos5 = require("@devvit/protos");
var __classPrivateFieldSet7 = function(receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet7 = function(receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _RedditAPIClient_metadata;
var _RedditAPIClient_modMailService;
var _RedditAPIClient_currentUser;
var _RedditAPIClient_currentUsername;
var RedditAPIClient = class {
  constructor(metadata) {
    _RedditAPIClient_metadata.set(this, void 0);
    _RedditAPIClient_modMailService.set(this, void 0);
    _RedditAPIClient_currentUser.set(this, void 0);
    _RedditAPIClient_currentUsername.set(this, void 0);
    __classPrivateFieldSet7(this, _RedditAPIClient_metadata, metadata, "f");
    __classPrivateFieldSet7(this, _RedditAPIClient_modMailService, new ModMailService(metadata), "f");
  }
  /**
   * Get ModMail API object
   *
   * @example
   * ```ts
   * await reddit.modMail.reply({
   *   body: "Here is my message",
   *   conversationId: "abcd42";
   * })
   * ```
   */
  get modMail() {
    return __classPrivateFieldGet7(this, _RedditAPIClient_modMailService, "f");
  }
  /**
   * Gets a {@link Subreddit} object by ID
   *
   * @deprecated Use {@link getSubredditInfoById} instead.
   * @param {string} id - The ID (starting with t5_) of the subreddit to retrieve. e.g. t5_2qjpg
   * @returns {Promise<Subreddit>} A Promise that resolves a Subreddit object.
   * @example
   * ```ts
   * const memes = await reddit.getSubredditById('t5_2qjpg');
   * ```
   */
  getSubredditById(id) {
    return Subreddit.getById(asTID(id), __classPrivateFieldGet7(this, _RedditAPIClient_metadata, "f"));
  }
  /**
   * Gets a {@link SubredditInfo} object by ID
   *
   * @param {string} id - The ID (starting with t5_) of the subreddit to retrieve. e.g. t5_2qjpg
   * @returns {Promise<SubredditInfo>} A Promise that resolves a SubredditInfo object.
   * @example
   * ```ts
   * const memes = await reddit.getSubredditInfoById('t5_2qjpg');
   * ```
   */
  getSubredditInfoById(id) {
    return getSubredditInfoById(id, __classPrivateFieldGet7(this, _RedditAPIClient_metadata, "f"));
  }
  /**
   * Gets a {@link Subreddit} object by name
   *
   * @deprecated Use {@link getSubredditInfoByName} instead.
   * @param {string} name The name of a subreddit omitting the r/. This is case insensitive.
   * @returns {Promise<Subreddit>} A Promise that resolves a Subreddit object.
   * @example
   * ```ts
   * const askReddit = await reddit.getSubredditByName('askReddit');
   * ```
   */
  getSubredditByName(name) {
    return Subreddit.getByName(name, __classPrivateFieldGet7(this, _RedditAPIClient_metadata, "f"));
  }
  /**
   * Gets a {@link SubredditInfo} object by name
   *
   * @param {string} name The name of a subreddit omitting the r/. This is case insensitive.
   * @returns {Promise<SubredditInfo>} A Promise that resolves a SubredditInfo object.
   * @example
   * ```ts
   * const askReddit = await reddit.getSubredditInfoByName('askReddit');
   * ```
   */
  getSubredditInfoByName(name) {
    return getSubredditInfoByName(name, __classPrivateFieldGet7(this, _RedditAPIClient_metadata, "f"));
  }
  /**
   * Add a removal reason to a subreddit
   *
   * @param subredditName Name of the subreddit being removed.
   * @param options Options.
   * @param options.title The title of the removal reason.
   * @param options.message The message associated with the removal reason.
   * @example
   * ```ts
   * const newReason = await reddit.addSubredditRemovalReasons(
   *   'askReddit',
   *   {
   *     title: 'Spam',
   *     message: 'This is spam!'
   *   }
   * );
   * console.log(newReason.id)
   * ```
   *
   * @returns {string} Removal Reason ID
   */
  addSubredditRemovalReason(subredditName, options) {
    return Subreddit.addRemovalReason(subredditName, options.title, options.message, __classPrivateFieldGet7(this, _RedditAPIClient_metadata, "f"));
  }
  /**
   * Get the list of subreddit's removal reasons (ordered)
   *
   * @param subredditName
   * @example
   * ```ts
   * const reasons = await reddit.getSubredditRemovalReasons('askReddit');
   *
   * for (let reason of reasons) {
   *   console.log(reason.id, reason.message, reason.title)
   * }
   * ```
   *
   * @returns Ordered array of Removal Reasons
   */
  getSubredditRemovalReasons(subredditName) {
    return Subreddit.getRemovalReasons(subredditName, __classPrivateFieldGet7(this, _RedditAPIClient_metadata, "f"));
  }
  /**
   * Retrieves the name of the current subreddit.
   *
   * @returns {Promise<string>} A Promise that resolves a string representing the current subreddit's name.
   * @example
   * ```ts
   * const currentSubredditName = await reddit.getCurrentSubredditName();
   * ```
   */
  async getCurrentSubredditName() {
    const nameFromMetadata = __classPrivateFieldGet7(this, _RedditAPIClient_metadata, "f")?.[Header.SubredditName]?.values[0];
    if (nameFromMetadata) {
      return nameFromMetadata;
    }
    const subredditId = __classPrivateFieldGet7(this, _RedditAPIClient_metadata, "f")?.[Header.Subreddit]?.values[0];
    const nameFromId = await getSubredditNameById(asT5ID(subredditId), __classPrivateFieldGet7(this, _RedditAPIClient_metadata, "f"));
    if (!nameFromId) {
      throw new Error("Couldn't get current subreddit's name");
    }
    return nameFromId;
  }
  /**
   * Retrieves the current subreddit.
   *
   * @returns {Promise<Subreddit>} A Promise that resolves a Subreddit object.
   * @example
   * ```ts
   * const currentSubreddit = await reddit.getCurrentSubreddit();
   * ```
   */
  async getCurrentSubreddit() {
    const currentSubreddit = await Subreddit.getFromMetadata(__classPrivateFieldGet7(this, _RedditAPIClient_metadata, "f"));
    if (!currentSubreddit) {
      throw new Error("Couldn't get current subreddit");
    }
    return currentSubreddit;
  }
  /**
   * Gets a {@link Post} object by ID
   *
   * @param id
   * @returns A Promise that resolves to a Post object.
   */
  getPostById(id) {
    return Post.getById(asTID(id), __classPrivateFieldGet7(this, _RedditAPIClient_metadata, "f"));
  }
  /**
   * Submits a new post to a subreddit.
   *
   * @param options - Either a self post or a link post.
   * @returns A Promise that resolves to a Post object.
   * @example
   * ```ts
   * const post = await reddit.submitPost({
   *   subredditName: 'devvit',
   *   title: 'Hello World',
   *   richtext: new RichTextBuilder()
   *     .heading({ level: 1 }, (h) => {
   *       h.rawText('Hello world');
   *     })
   *     .codeBlock({}, (cb) => cb.rawText('This post was created via the Devvit API'))
   *     .build()
   * });
   * ```
   */
  submitPost(options) {
    return Post.submit(options, __classPrivateFieldGet7(this, _RedditAPIClient_metadata, "f"));
  }
  /**
   * Crossposts a post to a subreddit.
   *
   * @param options - Options for crossposting a post
   * @param options.subredditName - The name of the subreddit to crosspost to
   * @param options.postId - The ID of the post to crosspost
   * @param options.title - The title of the crosspost
   * @returns - A Promise that resolves to a Post object.
   */
  crosspost(options) {
    return Post.crosspost(options, __classPrivateFieldGet7(this, _RedditAPIClient_metadata, "f"));
  }
  /**
   * Gets a {@link User} object by ID
   *
   * @param id - The ID (starting with t2_) of the user to retrieve. e.g. t2_1qjpg
   * @returns A Promise that resolves to a User object.
   * @example
   * ```ts
   * const user = await reddit.getUserById('t2_1qjpg');
   * ```
   */
  getUserById(id) {
    return User.getById(asTID(id), __classPrivateFieldGet7(this, _RedditAPIClient_metadata, "f"));
  }
  /**
   * Gets a {@link User} object by username
   *
   * @param username - The username of the user omitting the u/. e.g. 'devvit'
   * @returns A Promise that resolves to a User object or undefined if user is
   *          not found (user doesn't exist, account suspended, etc).
   * @example
   * ```ts
   * const user = await reddit.getUserByUsername('devvit');
   * if (user) {
   *   console.log(user)
   * }
   * ```
   */
  getUserByUsername(username) {
    return User.getByUsername(username, __classPrivateFieldGet7(this, _RedditAPIClient_metadata, "f"));
  }
  /**
   * Get the current calling user's username.
   * Resolves to undefined for logged-out custom post renders.
   *
   * @returns A Promise that resolves to a string representing the username or undefined
   * @example
   * ```ts
   * const username = await reddit.getCurrentUsername();
   * ```
   */
  async getCurrentUsername() {
    __classPrivateFieldSet7(this, _RedditAPIClient_currentUsername, __classPrivateFieldGet7(this, _RedditAPIClient_currentUsername, "f") ?? getCurrentUsernameFromMetadata(__classPrivateFieldGet7(this, _RedditAPIClient_metadata, "f")), "f");
    return __classPrivateFieldGet7(this, _RedditAPIClient_currentUsername, "f");
  }
  /**
   * Get the current calling user.
   * Resolves to undefined for logged-out custom post renders.
   *
   * @returns A Promise that resolves to a User object or undefined
   * @example
   * ```ts
   * const user = await reddit.getCurrentUser();
   * ```
   */
  async getCurrentUser() {
    __classPrivateFieldSet7(this, _RedditAPIClient_currentUser, __classPrivateFieldGet7(this, _RedditAPIClient_currentUser, "f") ?? this.getCurrentUsername().then((username) => username ? User.getByUsername(username, __classPrivateFieldGet7(this, _RedditAPIClient_metadata, "f")) : void 0), "f");
    return __classPrivateFieldGet7(this, _RedditAPIClient_currentUser, "f");
  }
  /**
   * Get the user that the app runs as on the provided metadata.
   *
   * @returns A Promise that resolves to a User object.
   * @example
   * ```ts
   * const user = await reddit.getAppUser(metadata);
   * ```
   */
  getAppUser() {
    return User.getFromMetadata(Header.AppUser, __classPrivateFieldGet7(this, _RedditAPIClient_metadata, "f"));
  }
  /**
   * Get the snoovatar URL for a given username.
   *
   * @param username - The username of the snoovatar to retrieve
   * @returns A Promise that resolves to a URL of the snoovatar image if it exists.
   */
  getSnoovatarUrl(username) {
    return User.getSnoovatarUrl(username, __classPrivateFieldGet7(this, _RedditAPIClient_metadata, "f"));
  }
  /**
   * Get a {@link Comment} object by ID
   *
   * @param id - The ID (starting with t1_) of the comment to retrieve. e.g. t1_1qjpg
   * @returns A Promise that resolves to a Comment object.
   * @example
   * ```ts
   * const comment = await reddit.getCommentById('t1_1qjpg');
   * ```
   */
  getCommentById(id) {
    return Comment.getById(asTID(id), __classPrivateFieldGet7(this, _RedditAPIClient_metadata, "f"));
  }
  /**
   * Get a list of comments from a specific post or comment.
   *
   * @param options - Options for the request
   * @param options.postId - The ID of the post e.g. 't3_1qjpg'
   * @param options.commentId - The ID of the comment e.g. 't1_1qjpg'
   * @param options.limit - The maximum number of comments to return. e.g. 1000
   * @param options.pageSize - The number of comments to return per request. e.g. 100
   * @param options.sort - The sort order of the comments. e.g. 'new'
   * @returns A Listing of Comment objects.
   * @example
   * ```ts
   * const comments = await reddit.getComments({
   *   postId: 't3_1qjpg',
   *   limit: 1000,
   *   pageSize: 100
   * }).all();
   * ```
   */
  getComments(options) {
    return Comment.getComments(options, __classPrivateFieldGet7(this, _RedditAPIClient_metadata, "f"));
  }
  /**
   * Get a list of comments by a specific user.
   *
   * @param options - Options for the request
   * @param options.username - The username of the user omitting the u/. e.g. 'spez'
   * @param options.sort - The sort order of the comments. e.g. 'new'
   * @param options.timeframe - The timeframe of the comments. e.g. 'all'
   * @param options.limit - The maximum number of comments to return. e.g. 1000
   * @param options.pageSize - The number of comments to return per request. e.g. 100
   * @returns A Listing of Comment objects.
   */
  getCommentsByUser(options) {
    return Comment.getCommentsByUser(options, __classPrivateFieldGet7(this, _RedditAPIClient_metadata, "f"));
  }
  /**
   * Submit a new comment to a post or comment.
   *
   * @param options - You must provide either `options.text` or `options.richtext` but not both.
   * @param options.id - The ID of the post or comment to comment on. e.g. 't3_1qjpg' for post and 't1_1qgif' for comment
   * @param options.text - The text of the comment
   * @param options.richtext - The rich text of the comment
   * @returns A Promise that resolves to a Comment object.
   */
  submitComment(options) {
    return Comment.submit({
      ...options,
      id: asTID(options.id)
    }, __classPrivateFieldGet7(this, _RedditAPIClient_metadata, "f"));
  }
  /**
   * Get a list of controversial posts from a specific subreddit.
   *
   * @param options - Options for the request
   * @param options.subredditName - The name of the subreddit to get posts from. e.g. 'memes'
   * @param options.timeframe - The timeframe to get posts from. e.g. 'day'
   * @param options.limit - The maximum number of posts to return. e.g. 1000
   * @param options.pageSize - The number of posts to return per request. e.g. 100
   * @returns A Listing of Post objects.
   * @example
   * ```ts
   * const posts = await reddit.getControversialPosts({
   *   subredditName: 'memes',
   *   timeframe: 'day',
   *   limit: 1000,
   *   pageSize: 100
   * }).all();
   * ```
   */
  getControversialPosts(options) {
    return Post.getControversialPosts(options, __classPrivateFieldGet7(this, _RedditAPIClient_metadata, "f"));
  }
  /**
   * Get a list of controversial posts from a specific subreddit.
   *
   * @param options - Options for the request
   * @param options.subredditName - The name of the subreddit to get posts from. e.g. 'memes'
   * @param options.timeframe - The timeframe to get posts from. e.g. 'day'
   * @param options.limit - The maximum number of posts to return. e.g. 1000
   * @param options.pageSize - The number of posts to return per request. e.g. 100
   * @returns A Listing of Post objects.
   * @example
   * ```ts
   * const posts = await reddit.getControversialPosts({
   *   subredditName: 'memes',
   *   timeframe: 'day',
   *   limit: 1000,
   *   pageSize: 100
   * }).all();
   * ```
   */
  getTopPosts(options) {
    return Post.getTopPosts(options, __classPrivateFieldGet7(this, _RedditAPIClient_metadata, "f"));
  }
  /**
   * Get a list of hot posts from a specific subreddit.
   *
   * @param options - Options for the request
   * @param options.subredditName - The name of the subreddit to get posts from. e.g. 'memes'
   * @param options.timeframe - The timeframe to get posts from. e.g. 'day'
   * @param options.limit - The maximum number of posts to return. e.g. 1000
   * @param options.pageSize - The number of posts to return per request. e.g. 100
   * @returns A Listing of Post objects.
   * @example
   * ```ts
   * const posts = await reddit.getHotPosts({
   *   subredditName: 'memes',
   *   timeframe: 'day',
   *   limit: 1000,
   *   pageSize: 100
   * }).all();
   * ```
   */
  getHotPosts(options) {
    return Post.getHotPosts(options, __classPrivateFieldGet7(this, _RedditAPIClient_metadata, "f"));
  }
  /**
   * Get a list of new posts from a specific subreddit.
   *
   * @param options - Options for the request
   * @param options.subredditName - The name of the subreddit to get posts from. e.g. 'memes'
   * @param options.limit - The maximum number of posts to return. e.g. 1000
   * @param options.pageSize - The number of posts to return per request. e.g. 100
   * @returns A Listing of Post objects.
   * @example
   * ```ts
   * const posts = await reddit.getNewPosts({
   *   subredditName: 'memes',
   *   limit: 1000,
   *   pageSize: 100
   * }).all();
   * ```
   */
  getNewPosts(options) {
    return Post.getNewPosts(options, __classPrivateFieldGet7(this, _RedditAPIClient_metadata, "f"));
  }
  /**
   * Get a list of hot posts from a specific subreddit.
   *
   * @param options - Options for the request
   * @param options.subredditName - The name of the subreddit to get posts from. e.g. 'memes'
   * @param options.timeframe - The timeframe to get posts from. e.g. 'day'
   * @param options.limit - The maximum number of posts to return. e.g. 1000
   * @param options.pageSize - The number of posts to return per request. e.g. 100
   * @returns A Listing of Post objects.
   * @example
   * ```ts
   * const posts = await reddit.getRisingPosts({
   *   subredditName: 'memes',
   *   timeframe: 'day',
   *   limit: 1000,
   *   pageSize: 100
   * }).all();
   * ```
   */
  getRisingPosts(options) {
    return Post.getRisingPosts(options, __classPrivateFieldGet7(this, _RedditAPIClient_metadata, "f"));
  }
  /**
   * Get a list of posts from a specific user.
   *
   * @param options - Options for the request
   * @param options.username - The username of the user omitting the u/. e.g. 'spez'
   * @param options.sort - The sort method to use. e.g. 'new'
   * @param options.timeframe - The timeframe to get posts from. e.g. 'day'
   * @param options.limit - The maximum number of posts to return. e.g. 1000
   * @param options.pageSize - The number of posts to return per request. e.g. 100
   * @returns A Listing of Post objects.
   */
  getPostsByUser(options) {
    return Post.getPostsByUser(options, __classPrivateFieldGet7(this, _RedditAPIClient_metadata, "f"));
  }
  /**
   * Get a list of posts and comments from a specific user.
   *
   * @param options - Options for the request
   * @param options.username - The username of the user omitting the u/. e.g. 'spez'
   * @param options.sort - The sort method to use. e.g. 'new'
   * @param options.timeframe - The timeframe to get posts from. e.g. 'day'
   * @param options.limit - The maximum number of posts to return. e.g. 1000
   * @param options.pageSize - The number of posts to return per request. e.g. 100
   * @returns A Listing of `Post` and `Comment` objects.
   */
  getCommentsAndPostsByUser(options) {
    return User.getOverview(options, __classPrivateFieldGet7(this, _RedditAPIClient_metadata, "f"));
  }
  /**
   * Get the moderation log for a subreddit.
   *
   * @param options - Options for the request
   * @param options.subredditName - The name of the subreddit to get the moderation log from. e.g. 'memes'
   * @param options.moderatorUsernames (optional) A moderator filter. Accepts an array of usernames
   * @param options.type (optional) Filter the entries by the type of the Moderator action
   * @param options.limit - (optional) The maximum number of ModActions to return. e.g. 1000
   * @param options.pageSize - (optional) The number of ModActions to return per request. e.g. 100
   * @returns A Listing of ModAction objects.
   * @example
   * ```ts
   * const modActions = await reddit.getModerationLog({
   *   subredditName: 'memes',
   *   moderatorUsernames: ['spez'],
   *   type: 'banuser',
   *   limit: 1000,
   *   pageSize: 100
   * }).all();
   * ```
   */
  getModerationLog(options) {
    return getModerationLog(options, __classPrivateFieldGet7(this, _RedditAPIClient_metadata, "f"));
  }
  /**
   * Get a list of users who have been approved to post in a subreddit.
   *
   * @param options - Options for the request
   * @param options.subredditName - The name of the subreddit to get the approved users from. e.g. 'memes'
   * @param options.username - Use this to see if a user is approved to post in the subreddit.
   * @param options.limit - The maximum number of users to return. e.g. 1000
   * @param options.pageSize - The number of users to return per request. e.g. 100
   * @returns A Listing of User objects.
   */
  getApprovedUsers(options) {
    return User.getSubredditUsersByType({
      type: "contributors",
      ...options
    }, __classPrivateFieldGet7(this, _RedditAPIClient_metadata, "f"));
  }
  /**
   * Approve a user to post in a subreddit.
   *
   * @param username - The username of the user to approve. e.g. 'spez'
   * @param subredditName - The name of the subreddit to approve the user in. e.g. 'memes'
   */
  approveUser(username, subredditName) {
    return User.createRelationship({
      username,
      subredditName,
      type: "contributor"
    }, __classPrivateFieldGet7(this, _RedditAPIClient_metadata, "f"));
  }
  /**
   * Remove a user's approval to post in a subreddit.
   *
   * @param username - The username of the user to remove approval from. e.g. 'spez'
   * @param subredditName - The name of the subreddit to remove the user's approval from. e.g. 'memes'
   */
  removeUser(username, subredditName) {
    return User.removeRelationship({
      username,
      subredditName,
      type: "contributor"
    }, __classPrivateFieldGet7(this, _RedditAPIClient_metadata, "f"));
  }
  /**
   * Get a list of users who are wiki contributors of a subreddit.
   *
   * @param options - Options for the request
   * @param options.subredditName - The name of the subreddit to get the wiki contributors from. e.g. 'memes'
   * @param options.username - Use this to see if a user is a wiki contributor for the subreddit.
   * @param options.limit - The maximum number of users to return. e.g. 1000
   * @param options.pageSize - The number of users to return per request. e.g. 100
   * @returns A Listing of User objects.
   */
  getWikiContributors(options) {
    return User.getSubredditUsersByType({
      type: "wikicontributors",
      ...options
    }, __classPrivateFieldGet7(this, _RedditAPIClient_metadata, "f"));
  }
  /**
   * Add a user as a wiki contributor for a subreddit.
   *
   * @param username - The username of the user to add as a wiki contributor. e.g. 'spez'
   * @param subredditName - The name of the subreddit to add the user as a wiki contributor. e.g. 'memes'
   */
  addWikiContributor(username, subredditName) {
    return User.createRelationship({
      username,
      subredditName,
      type: "wikicontributor"
    }, __classPrivateFieldGet7(this, _RedditAPIClient_metadata, "f"));
  }
  /**
   * Remove a user's wiki contributor status for a subreddit.
   *
   * @param username - The username of the user to remove wiki contributor status from. e.g. 'spez'
   * @param subredditName - The name of the subreddit to remove the user's wiki contributor status from. e.g. 'memes'
   */
  removeWikiContributor(username, subredditName) {
    return User.removeRelationship({
      username,
      subredditName,
      type: "wikicontributor"
    }, __classPrivateFieldGet7(this, _RedditAPIClient_metadata, "f"));
  }
  /**
   * Get a list of users who are banned from a subreddit.
   *
   * @param options - Options for the request
   * @param options.subredditName - The name of the subreddit to get the banned users from. e.g. 'memes'
   * @param options.username - Use this to see if a user is banned from the subreddit.
   * @param options.limit - The maximum number of users to return. e.g. 1000
   * @param options.pageSize - The number of users to return per request. e.g. 100
   * @returns A Listing of User objects.
   */
  getBannedUsers(options) {
    return User.getSubredditUsersByType({
      type: "banned",
      ...options
    }, __classPrivateFieldGet7(this, _RedditAPIClient_metadata, "f"));
  }
  /**
   * Ban a user from a subreddit.
   *
   * @param options - Options for the request
   * @param options.username - The username of the user to ban. e.g. 'spez'
   * @param options.subredditName - The name of the subreddit to ban the user from. e.g. 'memes'
   * @param options.note - A mod note for the ban. (optional)
   * @param options.duration - The number of days the user should be banned for. (optional)
   * @param options.message - A message to send to the user when they are banned. (optional)
   * @param options.context - The ID of the post or comment that caused the ban. (optional)
   * @param options.reason - The reason for the ban. (optional)
   */
  banUser(options) {
    return User.createRelationship({
      username: options.username,
      subredditName: options.subredditName,
      type: "banned",
      banReason: options.reason,
      banMessage: options.message,
      note: options.note,
      duration: options.duration,
      banContext: options.context
    }, __classPrivateFieldGet7(this, _RedditAPIClient_metadata, "f"));
  }
  /**
   * Unban a user from a subreddit.
   *
   * @param username - The username of the user to unban. e.g. 'spez'
   * @param subredditName - The name of the subreddit to unban the user from. e.g. 'memes'
   */
  unbanUser(username, subredditName) {
    return User.removeRelationship({
      username,
      subredditName,
      type: "banned"
    }, __classPrivateFieldGet7(this, _RedditAPIClient_metadata, "f"));
  }
  /**
   * Get a list of users who are banned from contributing to the wiki on a subreddit.
   *
   * @param options - Options for the request
   * @param options.subredditName - The name of the subreddit to get the banned wiki contributors from. e.g. 'memes'
   * @param options.username - Use this to see if a user is banned from contributing to the wiki on a subreddit.
   * @param options.limit - The maximum number of users to return. e.g. 1000
   * @param options.pageSize - The number of users to return per request. e.g. 100
   * @returns A Listing of User objects.
   */
  getBannedWikiContributors(options) {
    return User.getSubredditUsersByType({
      type: "wikibanned",
      ...options
    }, __classPrivateFieldGet7(this, _RedditAPIClient_metadata, "f"));
  }
  /**
   * Ban a user from contributing to the wiki on a subreddit.
   *
   * @param options - Options for the request
   * @param options.username - The username of the user to ban. e.g. 'spez'
   * @param options.subredditName - The name of the subreddit to ban the user from contributing to the wiki on. e.g. 'memes'
   * @param options.reason - The reason for the ban. (optional)
   * @param options.duration - The number of days the user should be banned for. (optional)
   * @param options.note - A mod note for the ban. (optional)
   */
  banWikiContributor(options) {
    return User.createRelationship({
      ...options,
      type: "wikibanned"
    }, __classPrivateFieldGet7(this, _RedditAPIClient_metadata, "f"));
  }
  /**
   *
   * @param username - The username of the user to unban. e.g. 'spez'
   * @param subredditName - The name of the subreddit to unban the user from contributing to the wiki on. e.g. 'memes'
   */
  unbanWikiContributor(username, subredditName) {
    return User.removeRelationship({
      username,
      subredditName,
      type: "wikibanned"
    }, __classPrivateFieldGet7(this, _RedditAPIClient_metadata, "f"));
  }
  /**
   * Get a list of users who are moderators for a subreddit.
   *
   * @param options - Options for the request
   * @param options.subredditName - The name of the subreddit to get the moderators from. e.g. 'memes'
   * @param options.username - Use this to see if a user is a moderator of the subreddit.
   * @param options.limit - The maximum number of users to return. e.g. 1000
   * @param options.pageSize - The number of users to return per request. e.g. 100
   * @returns A Listing of User objects.
   */
  getModerators(options) {
    return User.getSubredditUsersByType({
      type: "moderators",
      ...options
    }, __classPrivateFieldGet7(this, _RedditAPIClient_metadata, "f"));
  }
  /**
   * Invite a user to become a moderator of a subreddit.
   *
   * @param options - Options for the request
   * @param options.username - The username of the user to invite. e.g. 'spez'
   * @param options.subredditName - The name of the subreddit to invite the user to moderate. e.g. 'memes'
   * @param options.permissions - The permissions to give the user. (optional) Defaults to 'all'.
   */
  inviteModerator(options) {
    return User.createRelationship({
      type: "moderator_invite",
      subredditName: options.subredditName,
      username: options.username,
      permissions: options.permissions ?? []
    }, __classPrivateFieldGet7(this, _RedditAPIClient_metadata, "f"));
  }
  /**
   * Revoke a moderator invite for a user to a subreddit.
   *
   * @param username - The username of the user to revoke the invite for. e.g. 'spez'
   * @param subredditName - The name of the subreddit to revoke the invite for. e.g. 'memes'
   */
  revokeModeratorInvite(username, subredditName) {
    return User.removeRelationship({
      username,
      subredditName,
      type: "moderator_invite"
    }, __classPrivateFieldGet7(this, _RedditAPIClient_metadata, "f"));
  }
  /**
   * Remove a user as a moderator of a subreddit.
   *
   * @param username - The username of the user to remove as a moderator. e.g. 'spez'
   * @param subredditName - The name of the subreddit to remove the user as a moderator from. e.g. 'memes'
   */
  removeModerator(username, subredditName) {
    return User.removeRelationship({
      type: "moderator",
      subredditName,
      username
    }, __classPrivateFieldGet7(this, _RedditAPIClient_metadata, "f"));
  }
  /**
   * Update the permissions of a moderator of a subreddit.
   *
   * @param username - The username of the user to update the permissions for. e.g. 'spez'
   * @param subredditName - The name of the subreddit. e.g. 'memes'
   * @param permissions - The permissions to give the user. e.g ['posts', 'wiki']
   */
  setModeratorPermissions(username, subredditName, permissions) {
    return User.setModeratorPermissions(username, subredditName, permissions, __classPrivateFieldGet7(this, _RedditAPIClient_metadata, "f"));
  }
  /**
   * Get a list of users who are muted in a subreddit.
   *
   * @param options - Options for the request
   * @param options.subredditName - The name of the subreddit to get the muted users from. e.g. 'memes'
   * @param options.username - Use this to see if a user is muted in the subreddit.
   * @param options.limit - The maximum number of users to return. e.g. 1000
   * @param options.pageSize - The number of users to return per request. e.g. 100
   * @returns A listing of User objects.
   */
  getMutedUsers(options) {
    return User.getSubredditUsersByType({
      type: "muted",
      ...options
    }, __classPrivateFieldGet7(this, _RedditAPIClient_metadata, "f"));
  }
  /**
   * Mute a user in a subreddit. Muting a user prevents them from sending modmail.
   *
   * @param options - Options for the request
   * @param options.username - The username of the user to mute. e.g. 'spez'
   * @param options.subredditName - The name of the subreddit to mute the user in. e.g. 'memes'
   * @param options.note - A mod note on why the user was muted. (optional)
   */
  muteUser(options) {
    return User.createRelationship({
      ...options,
      type: "muted"
    }, __classPrivateFieldGet7(this, _RedditAPIClient_metadata, "f"));
  }
  /**
   * Unmute a user in a subreddit. Unmuting a user allows them to send modmail.
   *
   * @param username - The username of the user to unmute. e.g. 'spez'
   * @param subredditName - The name of the subreddit to unmute the user in. e.g. 'memes'
   */
  unmuteUser(username, subredditName) {
    return User.removeRelationship({
      username,
      subredditName,
      type: "muted"
    }, __classPrivateFieldGet7(this, _RedditAPIClient_metadata, "f"));
  }
  /**
   * Get a list of mod notes related to a user in a subreddit.
   *
   * @param options - Options for the request
   * @param options.subredditName - The name of the subreddit to get the mod notes from. e.g. 'memes'
   * @param options.username - The username of the user to get the mod notes for. e.g. 'spez'
   * @param options.filter - Filter the mod notes by type. e.g. 'NOTE', 'BAN', 'APPROVAL'
   * @param options.limit - The maximum number of mod notes to return. e.g. 1000
   * @param options.pageSize - The number of mod notes to return per request. e.g. 100
   * @returns A listing of ModNote objects.
   */
  getModNotes(options) {
    return ModNote.get(options, __classPrivateFieldGet7(this, _RedditAPIClient_metadata, "f"));
  }
  /**
   * Delete a mod note.
   *
   * @param options - Options for the request
   * @param options.subreddit - The name of the subreddit to delete the mod note from. e.g. 'memes'
   * @param options.noteId - The ID of the mod note to delete (should have a ModNote_ prefix).
   * @returns True if it was deleted successfully; false otherwise.
   */
  deleteModNote(options) {
    return ModNote.delete(options, __classPrivateFieldGet7(this, _RedditAPIClient_metadata, "f"));
  }
  /**
   * Add a mod note.
   *
   * @param options - Options for the request
   * @param options.subreddit - The name of the subreddit to add the mod note to. e.g. 'memes'
   * @param options.user - The username of the user to add the mod note to. e.g. 'spez'
   * @param options.redditId - (optional) The ID of the comment or post to add the mod note to. e.g. 't3_1234'
   * @param options.label - (optional) The label of the mod note. e.g. 'SPAM_WARNING'
   * @param options.note - The text of the mod note.
   * @returns A Promise that resolves if the mod note was successfully added.
   */
  addModNote(options) {
    const req = {
      ...options,
      redditId: options.redditId ? asTID(options.redditId) : void 0
    };
    return ModNote.add(req, __classPrivateFieldGet7(this, _RedditAPIClient_metadata, "f"));
  }
  /**
   * Add a mod note for why a post or comment was removed
   *
   * @param options.itemIds list of thing ids
   * @param options.reasonId id of a Removal Reason - you can leave this as an empty string if you don't have one
   * @param options.modNote the reason for removal (maximum 100 characters) (optional)
   */
  addRemovalNote(options) {
    return ModNote.addRemovalNote(options, __classPrivateFieldGet7(this, _RedditAPIClient_metadata, "f"));
  }
  /**
   * Sends a private message to a user.
   *
   * @param options - The options for sending the message.
   * @returns A Promise that resolves if the private message was successfully sent.
   */
  async sendPrivateMessage(options) {
    return PrivateMessage.send(options, __classPrivateFieldGet7(this, _RedditAPIClient_metadata, "f"));
  }
  /**
   * Sends a private message to a user on behalf of a subreddit.
   *
   * @param options - The options for sending the message as a subreddit.
   * @returns A Promise that resolves if the private message was successfully sent.
   */
  async sendPrivateMessageAsSubreddit(options) {
    return PrivateMessage.sendAsSubreddit(options, __classPrivateFieldGet7(this, _RedditAPIClient_metadata, "f"));
  }
  /**
   * Approve a post or comment.
   *
   * @param id - The id of the post (t3_) or comment (t1_) to approve.
   * @example
   * ```ts
   * await reddit.approve('t3_123456');
   * await reddit.approve('t1_123456');
   * ```
   */
  async approve(id) {
    if (isT1ID(id)) {
      return Comment.approve(id, __classPrivateFieldGet7(this, _RedditAPIClient_metadata, "f"));
    } else if (isT3ID(id)) {
      return Post.approve(id, __classPrivateFieldGet7(this, _RedditAPIClient_metadata, "f"));
    }
    throw new Error("id must start with either t1_ or t3_");
  }
  /**
   * Remove a post or comment.
   *
   * @param id - The id of the post (t3_) or comment (t1_) to remove.
   * @param isSpam - Is the post or comment being removed because it's spam?
   * @example
   * ```ts
   * await reddit.remove('t3_123456', false);
   * await reddit.remove('t1_123456', true);
   * ```
   */
  async remove(id, isSpam) {
    if (isT1ID(id)) {
      return Comment.remove(id, isSpam, __classPrivateFieldGet7(this, _RedditAPIClient_metadata, "f"));
    } else if (isT3ID(id)) {
      return Post.remove(id, isSpam, __classPrivateFieldGet7(this, _RedditAPIClient_metadata, "f"));
    }
    throw new Error("id must start with either t1_ or t3_");
  }
  /**
   * Get the list of post flair templates for a subreddit.
   *
   * @param subredditName - The name of the subreddit to get the post flair templates for.
   * @returns A Promise that resolves with an array of FlairTemplate objects.
   */
  async getPostFlairTemplates(subredditName) {
    return FlairTemplate.getPostFlairTemplates(subredditName, __classPrivateFieldGet7(this, _RedditAPIClient_metadata, "f"));
  }
  /**
   * Get the list of user flair templates for a subreddit.
   *
   * @param subredditName - The name of the subreddit to get the user flair templates for.
   * @returns A Promise that resolves with an array of FlairTemplate objects.
   */
  async getUserFlairTemplates(subredditName) {
    return FlairTemplate.getUserFlairTemplates(subredditName, __classPrivateFieldGet7(this, _RedditAPIClient_metadata, "f"));
  }
  /**
   * Create a post flair template for a subreddit.
   *
   * @param options - Options for the request
   * @param options.subredditName - The name of the subreddit to create the flair template for.
   * @param options.allowableContent - The content that is allowed to be used with this flair template. e.g. 'all' or 'text' or 'emoji'
   * @param options.backgroundColor - The background color of the flair template. e.g. '#ff0000' or 'transparent'
   * @param options.maxEmojis - The maximum number of emojis that can be used with this flair template.
   * @param options.modOnly - Whether or not this flair template is only available to mods.
   * @param options.text - The text of the flair template.
   * @param options.textColor - The text color of the flair template. Either 'dark' or 'light'.
   * @param options.allowUserEdits - Whether or not users can edit the flair template when selecting a flair.
   * @returns The created FlairTemplate object.
   */
  async createPostFlairTemplate(options) {
    return FlairTemplate.createPostFlairTemplate(options, __classPrivateFieldGet7(this, _RedditAPIClient_metadata, "f"));
  }
  /**
   * Create a user flair template for a subreddit.
   *
   * @param options - Options for the request
   * @param options.subredditName - The name of the subreddit to create the flair template for.
   * @param options.allowableContent - The content that is allowed to be used with this flair template. e.g. 'all' or 'text' or 'emoji'
   * @param options.backgroundColor - The background color of the flair template. e.g. '#ff0000' or 'transparent'
   * @param options.maxEmojis - The maximum number of emojis that can be used with this flair template.
   * @param options.modOnly - Whether or not this flair template is only available to mods.
   * @param options.text - The text of the flair template.
   * @param options.textColor - The text color of the flair template. Either 'dark' or 'light'.
   * @param options.allowUserEdits - Whether or not users can edit the flair template when selecting a flair.
   * @returns The created FlairTemplate object.
   */
  async createUserFlairTemplate(options) {
    return FlairTemplate.createUserFlairTemplate(options, __classPrivateFieldGet7(this, _RedditAPIClient_metadata, "f"));
  }
  /**
   * Edit a flair template for a subreddit. This can be either a post or user flair template.
   * Note: If you leave any of the options fields as undefined, they will reset to their default values.
   *
   * @param options - Options for the request
   * @param options.id - The ID of the flair template to edit.
   * @param options.subredditName - The name of the subreddit to create the flair template for.
   * @param options.allowableContent - The content that is allowed to be used with this flair template. e.g. 'all' or 'text' or 'emoji'
   * @param options.backgroundColor - The background color of the flair template. e.g. '#ff0000' or 'transparent'
   * @param options.maxEmojis - The maximum number of emojis that can be used with this flair template.
   * @param options.modOnly - Is this flair template only available to mods?
   * @param options.text - The text of the flair template.
   * @param options.textColor - The text color of the flair template. Either 'dark' or 'light'.
   * @param options.allowUserEdits - Can users can edit the flair template when selecting a flair?
   * @returns The edited FlairTemplate object.
   */
  async editFlairTemplate(options) {
    return FlairTemplate.editFlairTemplate(options, __classPrivateFieldGet7(this, _RedditAPIClient_metadata, "f"));
  }
  /**
   * Delete a flair template from a subreddit.
   *
   * @param subredditName - The name of the subreddit to delete the flair template from.
   * @param flairTemplateId - The ID of the flair template to delete.
   */
  async deleteFlairTemplate(subredditName, flairTemplateId) {
    return FlairTemplate.deleteFlairTemplate(subredditName, flairTemplateId, __classPrivateFieldGet7(this, _RedditAPIClient_metadata, "f"));
  }
  /**
   * Set the flair for a user in a subreddit.
   *
   * @param options - Options for the request
   * @param options.subredditName - The name of the subreddit to set the flair for.
   * @param options.username - The username of the user to set the flair for.
   * @param options.flairTemplateId - The ID of the flair template to use.
   * @param options.text - The text of the flair.
   * @param options.cssClass - The CSS class of the flair.
   * @param options.backgroundColor - The background color of the flair.
   * @param options.textColor - The text color of the flair.
   */
  async setUserFlair(options) {
    return Flair.setUserFlair(options, __classPrivateFieldGet7(this, _RedditAPIClient_metadata, "f"));
  }
  /**
   * Set the flair of multiple users in the same subreddit with a single API call.
   * Can process up to 100 entries at once.
   *
   * @param subredditName - The name of the subreddit to edit flairs in.
   * @param {SetUserFlairBatchConfig[]} flairs - Array of user flair configuration objects. If both text and cssClass are empty for a given user the flair will be cleared.
   * @param flairs[].username - The username of the user to edit the flair for.
   * @param flairs[].text - The text of the flair.
   * @param flairs[].cssClass - The CSS class of the flair.
   * @returns {FlairCsvResult[]} - Array of statuses for each entry provided.
   */
  async setUserFlairBatch(subredditName, flairs) {
    return Flair.setUserFlairBatch(subredditName, flairs, __classPrivateFieldGet7(this, _RedditAPIClient_metadata, "f"));
  }
  /**
   * Remove the flair for a user in a subreddit.
   *
   * @param subredditName - The name of the subreddit to remove the flair from.
   * @param username - The username of the user to remove the flair from.
   */
  async removeUserFlair(subredditName, username) {
    return Flair.removeUserFlair(subredditName, username, __classPrivateFieldGet7(this, _RedditAPIClient_metadata, "f"));
  }
  /**
   * Set the flair for a post in a subreddit.
   *
   * @param options - Options for the request
   * @param options.subredditName - The name of the subreddit to set the flair for.
   * @param options.postId - The ID of the post to set the flair for.
   * @param options.flairTemplateId - The ID of the flair template to use.
   * @param options.text - The text of the flair.
   * @param options.cssClass - The CSS class of the flair.
   * @param options.backgroundColor - The background color of the flair.
   * @param options.textColor - The text color of the flair.
   */
  async setPostFlair(options) {
    return Flair.setPostFlair(options, __classPrivateFieldGet7(this, _RedditAPIClient_metadata, "f"));
  }
  /**
   * Remove the flair for a post in a subreddit.
   *
   * @param subredditName - The name of the subreddit to remove the flair from.
   * @param postId - The ID of the post to remove the flair from.
   */
  async removePostFlair(subredditName, postId) {
    return Flair.removePostFlair(subredditName, asT3ID(postId), __classPrivateFieldGet7(this, _RedditAPIClient_metadata, "f"));
  }
  /**
   * Get the widgets for a subreddit.
   *
   * @param subredditName - The name of the subreddit to get the widgets for.
   * @returns - An array of Widget objects.
   */
  async getWidgets(subredditName) {
    return Widget.getWidgets(subredditName, __classPrivateFieldGet7(this, _RedditAPIClient_metadata, "f"));
  }
  /**
   * Delete a widget from a subreddit.
   *
   * @param subredditName - The name of the subreddit to delete the widget from.
   * @param widgetId - The ID of the widget to delete.
   */
  async deleteWidget(subredditName, widgetId) {
    return Widget.delete(subredditName, widgetId, __classPrivateFieldGet7(this, _RedditAPIClient_metadata, "f"));
  }
  /**
   * Add a widget to a subreddit.
   *
   * @param widgetData - The data for the widget to add.
   * @returns - The added Widget object.
   */
  async addWidget(widgetData) {
    return Widget.add(widgetData, __classPrivateFieldGet7(this, _RedditAPIClient_metadata, "f"));
  }
  /**
   * Reorder the widgets for a subreddit.
   *
   * @param subredditName - The name of the subreddit to reorder the widgets for.
   * @param orderByIds - An array of widget IDs in the order that they should be displayed.
   */
  async reorderWidgets(subredditName, orderByIds) {
    return Widget.reorder(subredditName, orderByIds, __classPrivateFieldGet7(this, _RedditAPIClient_metadata, "f"));
  }
  /**
   * Get a wiki page from a subreddit.
   *
   * @param subredditName - The name of the subreddit to get the wiki page from.
   * @param page - The name of the wiki page to get.
   * @returns The requested WikiPage object.
   */
  async getWikiPage(subredditName, page) {
    return WikiPage.getPage(subredditName, page, __classPrivateFieldGet7(this, _RedditAPIClient_metadata, "f"));
  }
  /**
   * Get the wiki pages for a subreddit.
   *
   * @param subredditName - The name of the subreddit to get the wiki pages from.
   * @returns A list of the wiki page names for the subreddit.
   */
  async getWikiPages(subredditName) {
    return WikiPage.getPages(subredditName, __classPrivateFieldGet7(this, _RedditAPIClient_metadata, "f"));
  }
  /**
   * Create a new wiki page for a subreddit.
   *
   * @param options - Options for the request
   * @param options.subredditName - The name of the subreddit the wiki is in.
   * @param options.page - The name of the wiki page to create.
   * @param options.content - The Markdown content of the wiki page.
   * @param options.reason - The reason for creating the wiki page.
   * @returns - The created WikiPage object.
   */
  async createWikiPage(options) {
    return WikiPage.createPage(options, __classPrivateFieldGet7(this, _RedditAPIClient_metadata, "f"));
  }
  /**
   * Update a wiki page.
   *
   * @param options - Options for the request
   * @param options.subredditName - The name of the subreddit the wiki is in.
   * @param options.page - The name of the wiki page to update.
   * @param options.content - The Markdown content of the wiki page.
   * @param options.reason - The reason for updating the wiki page.
   * @returns The updated WikiPage object.
   */
  async updateWikiPage(options) {
    return WikiPage.updatePage(options, __classPrivateFieldGet7(this, _RedditAPIClient_metadata, "f"));
  }
  /**
   * Get the revisions for a wiki page.
   *
   * @param options - Options for the request
   * @param options.subredditName - The name of the subreddit the wiki is in.
   * @param options.page - The name of the wiki page to get the revisions for.
   * @param options.limit - The maximum number of revisions to return.
   * @param options.after - The ID of the revision to start after.
   * @returns A Listing of WikiPageRevision objects.
   */
  getWikiPageRevisions(options) {
    return WikiPage.getPageRevisions(options, __classPrivateFieldGet7(this, _RedditAPIClient_metadata, "f"));
  }
  /**
   * Revert a wiki page to a previous revision.
   *
   * @param subredditName - The name of the subreddit the wiki is in.
   * @param page - The name of the wiki page to revert.
   * @param revisionId - The ID of the revision to revert to.
   */
  async revertWikiPage(subredditName, page, revisionId) {
    return WikiPage.revertPage(subredditName, page, revisionId, __classPrivateFieldGet7(this, _RedditAPIClient_metadata, "f"));
  }
  /**
   * Get the settings for a wiki page.
   *
   * @param subredditName - The name of the subreddit the wiki is in.
   * @param page - The name of the wiki page to get the settings for.
   * @returns A WikiPageSettings object.
   */
  async getWikiPageSettings(subredditName, page) {
    return WikiPage.getPageSettings(subredditName, page, __classPrivateFieldGet7(this, _RedditAPIClient_metadata, "f"));
  }
  /**
   * Update the settings for a wiki page.
   *
   * @param options - Options for the request
   * @param options.subredditName - The name of the subreddit the wiki is in.
   * @param options.page - The name of the wiki page to update the settings for.
   * @param options.listed - Whether the wiki page should be listed in the wiki index.
   * @param options.permLevel - The permission level required to edit the wiki page.
   * @returns A WikiPageSettings object.
   */
  async updateWikiPageSettings(options) {
    return WikiPage.updatePageSettings(options, __classPrivateFieldGet7(this, _RedditAPIClient_metadata, "f"));
  }
  /**
   * Add an editor to a wiki page.
   *
   * @param subredditName - The name of the subreddit the wiki is in.
   * @param page - The name of the wiki page to add the editor to.
   * @param username - The username of the user to add as an editor.
   */
  async addEditorToWikiPage(subredditName, page, username) {
    return WikiPage.addEditor(subredditName, page, username, __classPrivateFieldGet7(this, _RedditAPIClient_metadata, "f"));
  }
  /**
   * Remove an editor from a wiki page.
   *
   * @param subredditName - The name of the subreddit the wiki is in.
   * @param page - The name of the wiki page to remove the editor from.
   * @param username - The username of the user to remove as an editor.
   */
  async removeEditorFromWikiPage(subredditName, page, username) {
    return WikiPage.removeEditor(subredditName, page, username, __classPrivateFieldGet7(this, _RedditAPIClient_metadata, "f"));
  }
  /**
   * Get private messages sent to the currently authenticated user.
   *
   * @param options - Options for the request
   * @param options.type - The type of messages to get.
   */
  getMessages(options) {
    return PrivateMessage.getMessages(options, __classPrivateFieldGet7(this, _RedditAPIClient_metadata, "f"));
  }
  /**
   * Mark all private messages as read.
   */
  markAllMessagesAsRead() {
    return PrivateMessage.markAllAsRead(__classPrivateFieldGet7(this, _RedditAPIClient_metadata, "f"));
  }
  /**
   * Report a Post or Comment
   *
   * The report is sent to the moderators of the subreddit for review.
   *
   * @param thing Post or Comment
   * @param options Options
   * @param options.reason Why the thing is reported
   *
   * @example
   * ```ts
   * await reddit.report(post, {
   *  reason: 'This is spam!',
   * })
   * ```
   */
  report(thing, options) {
    const client = Devvit.redditAPIPlugins.LinksAndComments;
    return client.Report({
      reason: options.reason,
      thingId: thing.id,
      srName: thing.subredditName,
      usernames: thing.authorName
    }, __classPrivateFieldGet7(this, _RedditAPIClient_metadata, "f"));
  }
  getModQueue(options) {
    return Subreddit.aboutLocation({
      ...options,
      location: AboutLocations.Modqueue
    }, __classPrivateFieldGet7(this, _RedditAPIClient_metadata, "f"));
  }
  getReports(options) {
    return Subreddit.aboutLocation({
      ...options,
      location: AboutLocations.Reports
    }, __classPrivateFieldGet7(this, _RedditAPIClient_metadata, "f"));
  }
  getSpam(options) {
    return Subreddit.aboutLocation({
      ...options,
      location: AboutLocations.Spam
    }, __classPrivateFieldGet7(this, _RedditAPIClient_metadata, "f"));
  }
  getUnmoderated(options) {
    return Subreddit.aboutLocation({
      ...options,
      location: AboutLocations.Unmoderated
    }, __classPrivateFieldGet7(this, _RedditAPIClient_metadata, "f"));
  }
  getEdited(options) {
    return Subreddit.aboutLocation({
      ...options,
      location: AboutLocations.Edited
    }, __classPrivateFieldGet7(this, _RedditAPIClient_metadata, "f"));
  }
  /**
   * Gets a {@link Vault} for the specified address.
   *
   * @param {string} address - The address (starting with 0x) of the Vault.
   * @example
   * ```ts
   * const vault = await reddit.getVaultByAddress('0x205ee28744456bDBf180A0Fa7De51e0F116d54Ed');
   * ```
   */
  getVaultByAddress(address) {
    return getVaultByAddress(address, __classPrivateFieldGet7(this, _RedditAPIClient_metadata, "f"));
  }
  /**
   * Gets a {@link Vault} for the specified user.
   *
   * @param {string} userId - The ID (starting with t2_) of the Vault owner.
   * @example
   * ```ts
   * const vault = await reddit.getVaultByUserId('t2_1w72');
   * ```
   */
  getVaultByUserId(userId) {
    return getVaultByUserId(asTID(userId), __classPrivateFieldGet7(this, _RedditAPIClient_metadata, "f"));
  }
  /**
   * Returns a leaderboard for a given subreddit ID.
   *
   * @param subredditId ID of the subreddit for which the leaderboard is being queried.
   *
   * @returns {SubredditLeaderboard} Leaderboard for the given subreddit.
   */
  getSubredditLeaderboard(subredditId) {
    return getSubredditLeaderboard(subredditId, __classPrivateFieldGet7(this, _RedditAPIClient_metadata, "f"));
  }
  /**
   * Returns the styles for a given subreddit ID.
   *
   * @param subredditId ID of the subreddit from which to retrieve the styles.
   *
   * @returns {SubredditStyles} Styles for the given subreddit.
   */
  getSubredditStyles(subredditId) {
    return getSubredditStyles(subredditId, __classPrivateFieldGet7(this, _RedditAPIClient_metadata, "f"));
  }
  /**
   * Subscribes to the subreddit in which the app is installed. No-op if the user is already subscribed.
   * This method will execute as the app account by default.
   * To subscribe on behalf of a user, please contact Reddit.
   */
  async subscribeToCurrentSubreddit() {
    const currentSubreddit = await this.getCurrentSubreddit();
    const client = Devvit.redditAPIPlugins.Subreddits;
    await client.Subscribe({
      action: "sub",
      actionSource: "",
      srName: currentSubreddit.name,
      sr: "",
      skipInitialDefaults: true
    }, __classPrivateFieldGet7(this, _RedditAPIClient_metadata, "f"));
  }
  /**
   * Unsubscribes from the subreddit in which the app is installed. No-op if the user isn't subscribed.
   * This method will execute as the app account by default.
   * To unsubscribe on behalf of a user, please contact Reddit.
   */
  async unsubscribeFromCurrentSubreddit() {
    const currentSubreddit = await this.getCurrentSubreddit();
    const client = Devvit.redditAPIPlugins.Subreddits;
    await client.Subscribe({
      action: "unsub",
      actionSource: "",
      srName: currentSubreddit.name,
      sr: "",
      skipInitialDefaults: false
    }, __classPrivateFieldGet7(this, _RedditAPIClient_metadata, "f"));
  }
};
_RedditAPIClient_metadata = /* @__PURE__ */ new WeakMap(), _RedditAPIClient_modMailService = /* @__PURE__ */ new WeakMap(), _RedditAPIClient_currentUser = /* @__PURE__ */ new WeakMap(), _RedditAPIClient_currentUsername = /* @__PURE__ */ new WeakMap();

// node_modules/@devvit/public-api/apis/redis/RedisClient.js
var import_protos6 = require("@devvit/protos");
var __classPrivateFieldSet8 = function(receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet8 = function(receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _TxClient_storage;
var _TxClient_transactionId;
var _TxClient_metadata;
var _RedisClient_metadata;
var _RedisClient_storage;
function isRedisNilError(e) {
  if (e && typeof e === "object" && "message" in e && e.message !== void 0 && typeof e.message === "string") {
    return e.message.includes("redis: nil");
  } else {
    return false;
  }
}
var TxClient = class {
  constructor(storage, transactionId, metadata) {
    _TxClient_storage.set(this, void 0);
    _TxClient_transactionId.set(this, void 0);
    _TxClient_metadata.set(this, void 0);
    __classPrivateFieldSet8(this, _TxClient_storage, storage, "f");
    __classPrivateFieldSet8(this, _TxClient_transactionId, transactionId, "f");
    __classPrivateFieldSet8(this, _TxClient_metadata, metadata, "f");
  }
  async get(key) {
    await __classPrivateFieldGet8(this, _TxClient_storage, "f").Get({ key, transactionId: __classPrivateFieldGet8(this, _TxClient_transactionId, "f") }, __classPrivateFieldGet8(this, _TxClient_metadata, "f"));
    return this;
  }
  async multi() {
    await __classPrivateFieldGet8(this, _TxClient_storage, "f").Multi(__classPrivateFieldGet8(this, _TxClient_transactionId, "f"), __classPrivateFieldGet8(this, _TxClient_metadata, "f"));
  }
  async set(key, value, options) {
    let expiration;
    if (options?.expiration) {
      expiration = Math.floor((options.expiration.getTime() - Date.now()) / 1e3);
      if (expiration < 1) {
        expiration = 1;
      }
    }
    await __classPrivateFieldGet8(this, _TxClient_storage, "f").Set({
      key,
      value,
      nx: options?.nx === true,
      xx: options?.xx === true,
      expiration: expiration || 0,
      transactionId: __classPrivateFieldGet8(this, _TxClient_transactionId, "f")
    }, __classPrivateFieldGet8(this, _TxClient_metadata, "f"));
    return this;
  }
  async del(...keys) {
    await __classPrivateFieldGet8(this, _TxClient_storage, "f").Del({ keys, transactionId: __classPrivateFieldGet8(this, _TxClient_transactionId, "f") }, __classPrivateFieldGet8(this, _TxClient_metadata, "f"));
    return this;
  }
  async type(key) {
    await __classPrivateFieldGet8(this, _TxClient_storage, "f").Type({ key, transactionId: __classPrivateFieldGet8(this, _TxClient_transactionId, "f") }, __classPrivateFieldGet8(this, _TxClient_metadata, "f"));
    return this;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async exec() {
    const response = await __classPrivateFieldGet8(this, _TxClient_storage, "f").Exec(__classPrivateFieldGet8(this, _TxClient_transactionId, "f"), __classPrivateFieldGet8(this, _TxClient_metadata, "f"));
    let output = [];
    for (const result of response.response) {
      if (result.members) {
        output.push(result.members);
      } else if (result.nil !== void 0) {
        output.push(null);
      } else if (result.num !== void 0) {
        output.push(result.num);
      } else if (result.values !== void 0) {
        output.push(result.values.values);
      } else if (result.str !== void 0) {
        output.push(result.str);
      } else if (result.dbl !== void 0) {
        output.push(result.dbl);
      }
    }
    return output;
  }
  async discard() {
    await __classPrivateFieldGet8(this, _TxClient_storage, "f").Discard(__classPrivateFieldGet8(this, _TxClient_transactionId, "f"), __classPrivateFieldGet8(this, _TxClient_metadata, "f"));
  }
  async watch(...keys) {
    await __classPrivateFieldGet8(this, _TxClient_storage, "f").Watch({ keys, transactionId: __classPrivateFieldGet8(this, _TxClient_transactionId, "f") }, __classPrivateFieldGet8(this, _TxClient_metadata, "f"));
    return this;
  }
  async unwatch() {
    await __classPrivateFieldGet8(this, _TxClient_storage, "f").Unwatch(__classPrivateFieldGet8(this, _TxClient_transactionId, "f"), __classPrivateFieldGet8(this, _TxClient_metadata, "f"));
    return this;
  }
  async getRange(key, start, end) {
    await __classPrivateFieldGet8(this, _TxClient_storage, "f").GetRange({ key, start, end, transactionId: __classPrivateFieldGet8(this, _TxClient_transactionId, "f") }, __classPrivateFieldGet8(this, _TxClient_metadata, "f"));
    return this;
  }
  async setRange(key, offset, value) {
    await __classPrivateFieldGet8(this, _TxClient_storage, "f").SetRange({ key, offset, value, transactionId: __classPrivateFieldGet8(this, _TxClient_transactionId, "f") }, __classPrivateFieldGet8(this, _TxClient_metadata, "f"));
    return this;
  }
  async strlen(key) {
    return this.strLen(key);
  }
  async strLen(key) {
    await __classPrivateFieldGet8(this, _TxClient_storage, "f").Strlen({ key, transactionId: __classPrivateFieldGet8(this, _TxClient_transactionId, "f") }, __classPrivateFieldGet8(this, _TxClient_metadata, "f"));
    return this;
  }
  async mget(keys) {
    return this.mGet(keys);
  }
  async mGet(keys) {
    await __classPrivateFieldGet8(this, _TxClient_storage, "f").MGet({ keys, transactionId: __classPrivateFieldGet8(this, _TxClient_transactionId, "f") }, __classPrivateFieldGet8(this, _TxClient_metadata, "f"));
    return this;
  }
  async mset(keyValues) {
    return this.mSet(keyValues);
  }
  async mSet(keyValues) {
    const kv = Object.entries(keyValues).map(([key, value]) => ({ key, value }));
    await __classPrivateFieldGet8(this, _TxClient_storage, "f").MSet({ kv, transactionId: __classPrivateFieldGet8(this, _TxClient_transactionId, "f") }, __classPrivateFieldGet8(this, _TxClient_metadata, "f"));
    return this;
  }
  async incrBy(key, value) {
    await __classPrivateFieldGet8(this, _TxClient_storage, "f").IncrBy({ key, value, transactionId: __classPrivateFieldGet8(this, _TxClient_transactionId, "f") }, __classPrivateFieldGet8(this, _TxClient_metadata, "f"));
    return this;
  }
  async expire(key, seconds) {
    await __classPrivateFieldGet8(this, _TxClient_storage, "f").Expire({ key, seconds, transactionId: __classPrivateFieldGet8(this, _TxClient_transactionId, "f") }, __classPrivateFieldGet8(this, _TxClient_metadata, "f"));
    return this;
  }
  async expireTime(key) {
    await __classPrivateFieldGet8(this, _TxClient_storage, "f").ExpireTime({ key, transactionId: __classPrivateFieldGet8(this, _TxClient_transactionId, "f") }, __classPrivateFieldGet8(this, _TxClient_metadata, "f"));
    return this;
  }
  async zAdd(key, ...members) {
    await __classPrivateFieldGet8(this, _TxClient_storage, "f").ZAdd({ key, members, transactionId: __classPrivateFieldGet8(this, _TxClient_transactionId, "f") }, __classPrivateFieldGet8(this, _TxClient_metadata, "f"));
    return this;
  }
  async zScore(key, member) {
    await __classPrivateFieldGet8(this, _TxClient_storage, "f").ZScore({ key: { key, transactionId: __classPrivateFieldGet8(this, _TxClient_transactionId, "f") }, member }, __classPrivateFieldGet8(this, _TxClient_metadata, "f"));
    return this;
  }
  async zRank(key, member) {
    await __classPrivateFieldGet8(this, _TxClient_storage, "f").ZRank({ key: { key, transactionId: __classPrivateFieldGet8(this, _TxClient_transactionId, "f") }, member }, __classPrivateFieldGet8(this, _TxClient_metadata, "f"));
    return this;
  }
  async zIncrBy(key, member, value) {
    await __classPrivateFieldGet8(this, _TxClient_storage, "f").ZIncrBy({ key, member, value, transactionId: __classPrivateFieldGet8(this, _TxClient_transactionId, "f") }, __classPrivateFieldGet8(this, _TxClient_metadata, "f"));
    return this;
  }
  async zScan(key, cursor, pattern, count) {
    const request = {
      key,
      cursor,
      pattern,
      count,
      transactionId: __classPrivateFieldGet8(this, _TxClient_transactionId, "f")
    };
    await __classPrivateFieldGet8(this, _TxClient_storage, "f").ZScan(request, __classPrivateFieldGet8(this, _TxClient_metadata, "f"));
    return this;
  }
  async zCard(key) {
    await __classPrivateFieldGet8(this, _TxClient_storage, "f").ZCard({ key, transactionId: __classPrivateFieldGet8(this, _TxClient_transactionId, "f") }, __classPrivateFieldGet8(this, _TxClient_metadata, "f"));
    return this;
  }
  async zRange(key, start, stop, options) {
    let opts = { rev: false, byLex: false, byScore: false, offset: 0, count: 1e3 };
    if (options?.reverse) {
      opts.rev = options.reverse;
    }
    if (options?.by === "lex") {
      opts.byLex = true;
    } else if (options?.by === "score") {
      opts.byScore = true;
    }
    if (options?.limit) {
      if (opts.byLex || opts.byScore) {
        opts.offset = options.limit.offset;
        opts.count = options.limit.count;
      } else {
        throw new Error(`zRange parsing error: 'limit' only allowed when 'options.by' is 'lex' or 'score'`);
      }
    }
    await __classPrivateFieldGet8(this, _TxClient_storage, "f").ZRange({
      key: { key, transactionId: __classPrivateFieldGet8(this, _TxClient_transactionId, "f") },
      start: start + "",
      stop: stop + "",
      ...opts
    }, __classPrivateFieldGet8(this, _TxClient_metadata, "f"));
    return this;
  }
  async zRem(key, members) {
    await __classPrivateFieldGet8(this, _TxClient_storage, "f").ZRem({ key: { key, transactionId: __classPrivateFieldGet8(this, _TxClient_transactionId, "f") }, members }, __classPrivateFieldGet8(this, _TxClient_metadata, "f"));
    return this;
  }
  async zRemRangeByLex(key, min, max) {
    await __classPrivateFieldGet8(this, _TxClient_storage, "f").ZRemRangeByLex({ key: { key, transactionId: __classPrivateFieldGet8(this, _TxClient_transactionId, "f") }, min, max }, __classPrivateFieldGet8(this, _TxClient_metadata, "f"));
    return this;
  }
  async zRemRangeByRank(key, start, stop) {
    await __classPrivateFieldGet8(this, _TxClient_storage, "f").ZRemRangeByRank({ key: { key, transactionId: __classPrivateFieldGet8(this, _TxClient_transactionId, "f") }, start, stop }, __classPrivateFieldGet8(this, _TxClient_metadata, "f"));
    return this;
  }
  async zRemRangeByScore(key, min, max) {
    await __classPrivateFieldGet8(this, _TxClient_storage, "f").ZRemRangeByScore({ key: { key, transactionId: __classPrivateFieldGet8(this, _TxClient_transactionId, "f") }, min, max }, __classPrivateFieldGet8(this, _TxClient_metadata, "f"));
    return this;
  }
  async hgetall(key) {
    return this.hGetAll(key);
  }
  async hGetAll(key) {
    await __classPrivateFieldGet8(this, _TxClient_storage, "f").HGetAll({ key, transactionId: __classPrivateFieldGet8(this, _TxClient_transactionId, "f") }, __classPrivateFieldGet8(this, _TxClient_metadata, "f"));
    return this;
  }
  async hget(key, field) {
    return this.hGet(key, field);
  }
  async hGet(key, field) {
    await __classPrivateFieldGet8(this, _TxClient_storage, "f").HGet({ key, field, transactionId: __classPrivateFieldGet8(this, _TxClient_transactionId, "f") }, __classPrivateFieldGet8(this, _TxClient_metadata, "f"));
    return this;
  }
  async hMGet(key, fields) {
    await __classPrivateFieldGet8(this, _TxClient_storage, "f").HMGet({ key, fields, transactionId: __classPrivateFieldGet8(this, _TxClient_transactionId, "f") }, __classPrivateFieldGet8(this, _TxClient_metadata, "f"));
    return this;
  }
  async hset(key, fieldValues) {
    return this.hSet(key, fieldValues);
  }
  async hSet(key, fieldValues) {
    const fv = Object.entries(fieldValues).map(([field, value]) => ({ field, value }));
    await __classPrivateFieldGet8(this, _TxClient_storage, "f").HSet({ key, fv, transactionId: __classPrivateFieldGet8(this, _TxClient_transactionId, "f") }, __classPrivateFieldGet8(this, _TxClient_metadata, "f"));
    return this;
  }
  async hincrby(key, field, value) {
    return this.hIncrBy(key, field, value);
  }
  async hIncrBy(key, field, value) {
    await __classPrivateFieldGet8(this, _TxClient_storage, "f").HIncrBy({ key, field, value, transactionId: __classPrivateFieldGet8(this, _TxClient_transactionId, "f") }, __classPrivateFieldGet8(this, _TxClient_metadata, "f"));
    return this;
  }
  async hdel(key, fields) {
    return this.hDel(key, fields);
  }
  async hDel(key, fields) {
    await __classPrivateFieldGet8(this, _TxClient_storage, "f").HDel({ key, fields, transactionId: __classPrivateFieldGet8(this, _TxClient_transactionId, "f") }, __classPrivateFieldGet8(this, _TxClient_metadata, "f"));
    return this;
  }
  async hscan(key, cursor, pattern, count) {
    return this.hScan(key, cursor, pattern, count);
  }
  async hScan(key, cursor, pattern, count) {
    const request = {
      key,
      cursor,
      pattern,
      count,
      transactionId: __classPrivateFieldGet8(this, _TxClient_transactionId, "f")
    };
    await __classPrivateFieldGet8(this, _TxClient_storage, "f").HScan(request, __classPrivateFieldGet8(this, _TxClient_metadata, "f"));
    return this;
  }
  async hkeys(key) {
    return this.hKeys(key);
  }
  async hKeys(key) {
    await __classPrivateFieldGet8(this, _TxClient_storage, "f").HKeys({ key, transactionId: __classPrivateFieldGet8(this, _TxClient_transactionId, "f") }, __classPrivateFieldGet8(this, _TxClient_metadata, "f"));
    return this;
  }
  async hlen(key) {
    return this.hLen(key);
  }
  async hLen(key) {
    await __classPrivateFieldGet8(this, _TxClient_storage, "f").HLen({ key, transactionId: __classPrivateFieldGet8(this, _TxClient_transactionId, "f") }, __classPrivateFieldGet8(this, _TxClient_metadata, "f"));
    return this;
  }
};
_TxClient_storage = /* @__PURE__ */ new WeakMap(), _TxClient_transactionId = /* @__PURE__ */ new WeakMap(), _TxClient_metadata = /* @__PURE__ */ new WeakMap();
var RedisClient = class _RedisClient {
  constructor(metadata, storage = void 0, scope = import_protos6.RedisKeyScope.INSTALLATION) {
    _RedisClient_metadata.set(this, void 0);
    _RedisClient_storage.set(this, void 0);
    __classPrivateFieldSet8(this, _RedisClient_metadata, metadata, "f");
    __classPrivateFieldSet8(this, _RedisClient_storage, storage, "f");
    this.scope = scope;
    this.global = scope === import_protos6.RedisKeyScope.INSTALLATION ? new _RedisClient(__classPrivateFieldGet8(this, _RedisClient_metadata, "f"), __classPrivateFieldGet8(this, _RedisClient_storage, "f"), import_protos6.RedisKeyScope.GLOBAL) : this;
  }
  get storage() {
    return __classPrivateFieldGet8(this, _RedisClient_storage, "f") || Devvit.redisPlugin;
  }
  async watch(...keys) {
    const txId = await this.storage.Watch({ keys }, __classPrivateFieldGet8(this, _RedisClient_metadata, "f"));
    return new TxClient(this.storage, txId, __classPrivateFieldGet8(this, _RedisClient_metadata, "f"));
  }
  async get(key) {
    try {
      const response = await this.storage.Get({ key, scope: this.scope }, {
        ...__classPrivateFieldGet8(this, _RedisClient_metadata, "f"),
        "throw-redis-nil": { values: ["true"] }
      });
      return response !== null ? response.value ?? void 0 : response;
    } catch (e) {
      if (isRedisNilError(e)) {
        return void 0;
      }
      throw e;
    }
  }
  async getBuffer(key) {
    try {
      const response = await this.storage.GetBytes({ key, scope: this.scope }, {
        ...__classPrivateFieldGet8(this, _RedisClient_metadata, "f"),
        "throw-redis-nil": { values: ["true"] }
      });
      return response !== null ? Buffer.from(response.value) : response;
    } catch (e) {
      if (isRedisNilError(e)) {
        return void 0;
      }
      throw e;
    }
  }
  async set(key, value, options) {
    let expiration;
    if (options?.expiration) {
      expiration = Math.floor((options.expiration.getTime() - Date.now()) / 1e3);
      if (expiration < 1) {
        expiration = 1;
      }
    }
    const response = await this.storage.Set({
      key,
      value,
      nx: options?.nx === true && !options.xx,
      xx: options?.xx === true && !options.nx,
      expiration: expiration || 0,
      scope: this.scope
    }, __classPrivateFieldGet8(this, _RedisClient_metadata, "f"));
    return response.value;
  }
  async exists(...keys) {
    const response = await this.storage.Exists({ keys, scope: this.scope }, __classPrivateFieldGet8(this, _RedisClient_metadata, "f"));
    return response.existingKeys;
  }
  async del(...keys) {
    await this.storage.Del({ keys, scope: this.scope }, __classPrivateFieldGet8(this, _RedisClient_metadata, "f"));
  }
  async incrBy(key, value) {
    const response = await this.storage.IncrBy({ key, value, scope: this.scope }, __classPrivateFieldGet8(this, _RedisClient_metadata, "f"));
    return response.value;
  }
  async getRange(key, start, end) {
    const response = await this.storage.GetRange({ key, start, end, scope: this.scope }, __classPrivateFieldGet8(this, _RedisClient_metadata, "f"));
    return response !== null ? response.value : response;
  }
  async setRange(key, offset, value) {
    const response = await this.storage.SetRange({ key, offset, value, scope: this.scope }, __classPrivateFieldGet8(this, _RedisClient_metadata, "f"));
    return response.value;
  }
  async strlen(key) {
    return this.strLen(key);
  }
  async strLen(key) {
    const response = await this.storage.Strlen({ key, scope: this.scope }, __classPrivateFieldGet8(this, _RedisClient_metadata, "f"));
    return response.value;
  }
  async expire(key, seconds) {
    await this.storage.Expire({ key, seconds, scope: this.scope }, __classPrivateFieldGet8(this, _RedisClient_metadata, "f"));
  }
  async expireTime(key) {
    const response = await this.storage.ExpireTime({ key, scope: this.scope }, __classPrivateFieldGet8(this, _RedisClient_metadata, "f"));
    return response.value;
  }
  async zAdd(key, ...members) {
    return (await this.storage.ZAdd({ key, members, scope: this.scope }, __classPrivateFieldGet8(this, _RedisClient_metadata, "f"))).value;
  }
  async zRange(key, start, stop, options) {
    let opts = { rev: false, byLex: false, byScore: false, offset: 0, count: 1e3 };
    if (options?.reverse) {
      opts.rev = options.reverse;
    }
    if (options?.by === "lex") {
      opts.byLex = true;
    } else if (options?.by === "score") {
      opts.byScore = true;
    } else {
      opts.offset = 0;
      opts.count = 0;
    }
    if (options?.limit) {
      if (opts.byLex || opts.byScore) {
        opts.offset = options.limit.offset;
        opts.count = options.limit.count;
      } else {
        throw new Error(`zRange parsing error: 'limit' only allowed when 'options.by' is 'lex' or 'score'`);
      }
    }
    return (await this.storage.ZRange({ key: { key }, start: start + "", stop: stop + "", ...opts, scope: this.scope }, __classPrivateFieldGet8(this, _RedisClient_metadata, "f"))).members;
  }
  async zRem(key, members) {
    const response = await this.storage.ZRem({ key: { key }, members, scope: this.scope }, __classPrivateFieldGet8(this, _RedisClient_metadata, "f"));
    return response.value;
  }
  async zRemRangeByLex(key, min, max) {
    const response = await this.storage.ZRemRangeByLex({ key: { key }, min, max, scope: this.scope }, __classPrivateFieldGet8(this, _RedisClient_metadata, "f"));
    return response.value;
  }
  async zRemRangeByRank(key, start, stop) {
    const response = await this.storage.ZRemRangeByRank({ key: { key }, start, stop, scope: this.scope }, __classPrivateFieldGet8(this, _RedisClient_metadata, "f"));
    return response.value;
  }
  async zRemRangeByScore(key, min, max) {
    const response = await this.storage.ZRemRangeByScore({ key: { key }, min, max, scope: this.scope }, __classPrivateFieldGet8(this, _RedisClient_metadata, "f"));
    return response.value;
  }
  async zScore(key, member) {
    try {
      const response = await this.storage.ZScore({ key: { key }, member, scope: this.scope }, {
        ...__classPrivateFieldGet8(this, _RedisClient_metadata, "f"),
        "throw-redis-nil": { values: ["true"] }
      });
      return response !== null ? response.value : response;
    } catch (e) {
      if (isRedisNilError(e)) {
        return void 0;
      }
      throw e;
    }
  }
  async zRank(key, member) {
    try {
      const response = await this.storage.ZRank({ key: { key }, member, scope: this.scope }, {
        ...__classPrivateFieldGet8(this, _RedisClient_metadata, "f"),
        "throw-redis-nil": { values: ["true"] }
      });
      return response !== null ? response.value : response;
    } catch (e) {
      if (isRedisNilError(e)) {
        return void 0;
      }
      throw e;
    }
  }
  async zIncrBy(key, member, value) {
    const response = await this.storage.ZIncrBy({ key, member, value, scope: this.scope }, __classPrivateFieldGet8(this, _RedisClient_metadata, "f"));
    return response !== null ? response.value : response;
  }
  async mget(keys) {
    return this.mGet(keys);
  }
  async mGet(keys) {
    const response = await this.storage.MGet({ keys, scope: this.scope }, __classPrivateFieldGet8(this, _RedisClient_metadata, "f"));
    return response !== null ? response.values.map((value) => value || null) : response;
  }
  async mset(keyValues) {
    return this.mSet(keyValues);
  }
  async mSet(keyValues) {
    const kv = Object.entries(keyValues).map(([key, value]) => ({ key, value }));
    await this.storage.MSet({ kv, scope: this.scope }, __classPrivateFieldGet8(this, _RedisClient_metadata, "f"));
  }
  async zCard(key) {
    const response = await this.storage.ZCard({ key, scope: this.scope }, __classPrivateFieldGet8(this, _RedisClient_metadata, "f"));
    return response !== null ? response.value : response;
  }
  async zScan(key, cursor, pattern, count) {
    const request = { key, cursor, pattern, count, scope: this.scope };
    return await this.storage.ZScan(request, __classPrivateFieldGet8(this, _RedisClient_metadata, "f"));
  }
  async type(key) {
    const response = await this.storage.Type({ key, scope: this.scope }, __classPrivateFieldGet8(this, _RedisClient_metadata, "f"));
    return response !== null ? response.value : response;
  }
  async rename(key, newKey) {
    const response = await this.storage.Rename({ key, newKey, scope: this.scope }, __classPrivateFieldGet8(this, _RedisClient_metadata, "f"));
    return response.result;
  }
  async hget(key, field) {
    return this.hGet(key, field);
  }
  async hGet(key, field) {
    try {
      const response = await this.storage.HGet({ key, field, scope: this.scope }, {
        ...__classPrivateFieldGet8(this, _RedisClient_metadata, "f"),
        "throw-redis-nil": { values: ["true"] }
      });
      return response !== null ? response.value ?? void 0 : response;
    } catch (e) {
      if (isRedisNilError(e)) {
        return void 0;
      }
      throw e;
    }
  }
  async hMGet(key, fields) {
    const response = await this.storage.HMGet({ key, fields, scope: this.scope }, __classPrivateFieldGet8(this, _RedisClient_metadata, "f"));
    return response !== null ? response.values.map((value) => value || null) : response;
  }
  async hset(key, fieldValues) {
    return this.hSet(key, fieldValues);
  }
  async hSet(key, fieldValues) {
    const fv = Object.entries(fieldValues).map(([field, value]) => ({ field, value }));
    const response = await this.storage.HSet({ key, fv, scope: this.scope }, __classPrivateFieldGet8(this, _RedisClient_metadata, "f"));
    return response.value;
  }
  async hSetNX(key, field, value) {
    const response = await this.storage.HSetNX({ key, field, value, scope: this.scope }, __classPrivateFieldGet8(this, _RedisClient_metadata, "f"));
    return response.success;
  }
  async hgetall(key) {
    return this.hGetAll(key);
  }
  async hGetAll(key) {
    const response = await this.storage.HGetAll({ key, scope: this.scope }, __classPrivateFieldGet8(this, _RedisClient_metadata, "f"));
    return response !== null ? response.fieldValues : response;
  }
  async hdel(key, fields) {
    return this.hDel(key, fields);
  }
  async hDel(key, fields) {
    const response = await this.storage.HDel({ key, fields, scope: this.scope }, __classPrivateFieldGet8(this, _RedisClient_metadata, "f"));
    return response.value;
  }
  async hscan(key, cursor, pattern, count) {
    return this.hScan(key, cursor, pattern, count);
  }
  async hScan(key, cursor, pattern, count) {
    const request = { key, cursor, pattern, count, scope: this.scope };
    return await this.storage.HScan(request, __classPrivateFieldGet8(this, _RedisClient_metadata, "f"));
  }
  async hkeys(key) {
    return this.hKeys(key);
  }
  async hKeys(key) {
    const response = await this.storage.HKeys({ key, scope: this.scope }, __classPrivateFieldGet8(this, _RedisClient_metadata, "f"));
    return response !== null ? response.keys : response;
  }
  async hincrby(key, field, value) {
    return this.hIncrBy(key, field, value);
  }
  async hIncrBy(key, field, value) {
    const response = await this.storage.HIncrBy({ key, field, value, scope: this.scope }, __classPrivateFieldGet8(this, _RedisClient_metadata, "f"));
    return response.value;
  }
  async hlen(key) {
    return this.hLen(key);
  }
  async hLen(key) {
    const response = await this.storage.HLen({
      key,
      scope: this.scope
    });
    return response.value;
  }
  async bitfield(key, ...cmds) {
    const commands = [];
    for (let argIndex = 0; argIndex < cmds.length; ) {
      const currentArg = cmds[argIndex];
      const command = {};
      switch (currentArg) {
        case "get": {
          if (argIndex + 2 >= cmds.length) {
            throw Error(`bitfield command parse failed; not enough arguments for 'get' command`);
          }
          command.get = {
            encoding: cmds[argIndex + 1],
            offset: cmds[argIndex + 2].toString()
          };
          argIndex += 3;
          break;
        }
        case "set": {
          if (argIndex + 3 >= cmds.length) {
            throw Error(`bitfield command parse failed; not enough arguments for 'set' command`);
          }
          command.set = {
            encoding: cmds[argIndex + 1],
            offset: cmds[argIndex + 2].toString(),
            value: cmds[argIndex + 3].toString()
          };
          argIndex += 4;
          break;
        }
        case "incrBy": {
          if (argIndex + 3 >= cmds.length) {
            throw Error(`bitfield command parse failed; not enough arguments for 'incrBy' command`);
          }
          command.incrBy = {
            encoding: cmds[argIndex + 1],
            offset: cmds[argIndex + 2].toString(),
            increment: cmds[argIndex + 3].toString()
          };
          argIndex += 4;
          break;
        }
        case "overflow": {
          if (argIndex + 1 >= cmds.length) {
            throw Error(`bitfield command parse failed; not enough arguments for 'overflow' command`);
          }
          const behavior = cmds[argIndex + 1].toString();
          command.overflow = {
            behavior: toBehaviorProto(behavior)
          };
          argIndex += 2;
          break;
        }
        default: {
          throw Error(`bitfield command parse failed; ${currentArg} unrecognized (must be 'get', 'set', 'incrBy', or 'overflow')`);
        }
      }
      commands.push(command);
    }
    const response = await this.storage.Bitfield({
      key,
      commands
    });
    return response.results;
  }
};
_RedisClient_metadata = /* @__PURE__ */ new WeakMap(), _RedisClient_storage = /* @__PURE__ */ new WeakMap();
function toBehaviorProto(behavior) {
  const lowercase = behavior.toLowerCase();
  switch (lowercase) {
    case "wrap":
      return import_protos6.BitfieldOverflowBehavior.BITFIELD_OVERFLOW_BEHAVIOR_WRAP;
    case "sat":
      return import_protos6.BitfieldOverflowBehavior.BITFIELD_OVERFLOW_BEHAVIOR_SAT;
    case "fail":
      return import_protos6.BitfieldOverflowBehavior.BITFIELD_OVERFLOW_BEHAVIOR_FAIL;
    default:
      throw Error(`unknown bitfield overflow behavior: ${lowercase}`);
  }
}

// node_modules/@devvit/public-api/apis/scheduler/SchedulerClient.js
var __classPrivateFieldSet9 = function(receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet9 = function(receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _SchedulerClient_metadata;
var SchedulerClient = class {
  constructor(metadata) {
    _SchedulerClient_metadata.set(this, void 0);
    __classPrivateFieldSet9(this, _SchedulerClient_metadata, metadata, "f");
  }
  async runJob(job) {
    const response = await Devvit.schedulerPlugin.Schedule({
      action: {
        type: job.name,
        data: job.data
      },
      cron: "cron" in job ? job.cron : void 0,
      when: "runAt" in job ? job.runAt : void 0
    }, __classPrivateFieldGet9(this, _SchedulerClient_metadata, "f"));
    return response.id;
  }
  async cancelJob(jobId) {
    await Devvit.schedulerPlugin.Cancel({
      id: jobId
    }, __classPrivateFieldGet9(this, _SchedulerClient_metadata, "f"));
  }
  async listJobs() {
    const response = await Devvit.schedulerPlugin.List(
      /**
       * after and before are required for this API to work
       * so we hardcode after to Unix epoch and before to 10 years from now
       * https://reddit.atlassian.net/browse/DX-3060
       */
      {
        after: /* @__PURE__ */ new Date(0),
        before: new Date(Date.now() + 10 * 365 * 86400 * 1e3)
      },
      __classPrivateFieldGet9(this, _SchedulerClient_metadata, "f")
    );
    return response.actions.map((action) => {
      assertNonNull(action.request?.action, "Scheduled job is malformed");
      if ("when" in action.request && action.request.when != null) {
        return {
          id: action.id,
          name: action.request.action.type,
          runAt: action.request.when,
          data: action.request.action.data
        };
      }
      return {
        id: action.id,
        name: action.request.action.type,
        cron: action.request.cron ?? "",
        data: action.request.action
      };
    });
  }
};
_SchedulerClient_metadata = /* @__PURE__ */ new WeakMap();

// node_modules/@devvit/public-api/apis/settings/SettingsClient.js
var __classPrivateFieldSet10 = function(receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet10 = function(receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _SettingsClient_metadata;
var SettingsClient = class {
  constructor(metadata) {
    _SettingsClient_metadata.set(this, void 0);
    __classPrivateFieldSet10(this, _SettingsClient_metadata, metadata, "f");
  }
  async get(name) {
    const settings = await this.getAll();
    return settings[name];
  }
  async getAll() {
    const settingsClient = Devvit.settingsPlugin;
    const response = await settingsClient.GetSettings({}, __classPrivateFieldGet10(this, _SettingsClient_metadata, "f"));
    if (!response.installationSettings) {
      throw new Error("Could not get installation settings");
    }
    if (!response.appSettings) {
      throw new Error("Could not get app settings");
    }
    return {
      ...getSettingsValues(response.installationSettings.settings, Devvit.installationSettings),
      ...getSettingsValues(response.appSettings.settings, Devvit.appSettings)
    };
  }
};
_SettingsClient_metadata = /* @__PURE__ */ new WeakMap();
function getSettingsValues(results, settingsDefinitions) {
  const settingsValues = Object.keys(results).reduce((acc, key) => {
    acc[key] = flattenFormFieldValue(results[key]);
    return acc;
  }, {});
  if (settingsDefinitions) {
    setDefaultsIfNecessary(settingsValues, settingsDefinitions);
  }
  return settingsValues;
}
function setDefaultsIfNecessary(settingsValues, settingsDefinitions) {
  for (const definition of settingsDefinitions) {
    if (definition.type === "group") {
      setDefaultsIfNecessary(settingsValues, definition.fields);
    } else {
      if (!(definition.name in settingsValues) && "defaultValue" in definition) {
        settingsValues[definition.name] = definition.defaultValue;
      }
    }
  }
}

// node_modules/@devvit/public-api/apis/ui/UIClient.js
var import_protos7 = require("@devvit/protos");
var __classPrivateFieldSet11 = function(receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet11 = function(receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _UIClient_effects;
var _UIClient_reconciler;
var _UIClient_webViewClient;
var _UIClient_postMessage;
var UIClient = class {
  constructor(reconciler) {
    _UIClient_effects.set(this, []);
    _UIClient_reconciler.set(this, void 0);
    _UIClient_webViewClient.set(this, void 0);
    _UIClient_postMessage.set(this, (webViewIdOrMessage, message) => {
      const webViewId = message !== void 0 ? webViewIdOrMessage : "";
      const msg = message !== void 0 ? message : webViewIdOrMessage;
      __classPrivateFieldGet11(this, _UIClient_effects, "f").push({
        type: import_protos7.EffectType.EFFECT_WEB_VIEW,
        webView: {
          postMessage: {
            webViewId,
            app: { message: msg }
          }
        }
      });
    });
    __classPrivateFieldSet11(this, _UIClient_reconciler, reconciler, "f");
    __classPrivateFieldSet11(this, _UIClient_webViewClient, {
      postMessage: __classPrivateFieldGet11(this, _UIClient_postMessage, "f")
    }, "f");
  }
  get webView() {
    return __classPrivateFieldGet11(this, _UIClient_webViewClient, "f");
  }
  showForm(formKey, data) {
    let formDefinition = Devvit.formDefinitions.get(formKey);
    if (!formDefinition && __classPrivateFieldGet11(this, _UIClient_reconciler, "f")) {
      const hookForm = __classPrivateFieldGet11(this, _UIClient_reconciler, "f").forms.get(formKey);
      if (hookForm) {
        formDefinition = {
          form: hookForm,
          onSubmit: () => {
          }
          // no-op
        };
      }
    }
    if (!formDefinition) {
      throw new Error("Form does not exist. Make sure you have added it using Devvit.createForm at the root of your app.");
    }
    const formData = formDefinition.form instanceof Function ? formDefinition.form(data ?? {}) : formDefinition.form;
    const form = {
      fields: [],
      id: formKey,
      title: formData.title,
      acceptLabel: formData.acceptLabel,
      cancelLabel: formData.cancelLabel,
      shortDescription: formData.description
    };
    assertValidFormFields(formData.fields);
    form.fields = transformFormFields(formData.fields);
    __classPrivateFieldGet11(this, _UIClient_effects, "f").push({
      type: import_protos7.EffectType.EFFECT_SHOW_FORM,
      showForm: {
        form
      }
    });
  }
  showToast(textOrToast) {
    let toast;
    if (textOrToast instanceof Object) {
      toast = {
        text: textOrToast.text,
        appearance: textOrToast.appearance === "success" ? import_protos7.ToastAppearance.SUCCESS : import_protos7.ToastAppearance.NEUTRAL
      };
    } else {
      toast = {
        text: textOrToast
      };
    }
    __classPrivateFieldGet11(this, _UIClient_effects, "f").push({
      type: import_protos7.EffectType.EFFECT_SHOW_TOAST,
      showToast: {
        toast
      }
    });
  }
  navigateTo(thingOrUrl) {
    let url;
    if (typeof thingOrUrl === "string") {
      url = new URL(thingOrUrl).toString();
    } else {
      url = new URL(thingOrUrl.permalink, "https://www.reddit.com").toString();
    }
    __classPrivateFieldGet11(this, _UIClient_effects, "f").push({
      type: import_protos7.EffectType.EFFECT_NAVIGATE_TO_URL,
      navigateToUrl: {
        url
      }
    });
  }
  /** @internal */
  get __effects() {
    return __classPrivateFieldGet11(this, _UIClient_effects, "f");
  }
};
_UIClient_effects = /* @__PURE__ */ new WeakMap(), _UIClient_reconciler = /* @__PURE__ */ new WeakMap(), _UIClient_webViewClient = /* @__PURE__ */ new WeakMap(), _UIClient_postMessage = /* @__PURE__ */ new WeakMap();

// node_modules/@devvit/public-api/apis/makeAPIClients.js
function makeAPIClients({ metadata, ui, hooks, reconciler }) {
  const modLog = new ModLogClient(metadata);
  const kvStore = new KeyValueStorage(metadata);
  const redis = new RedisClient(metadata);
  const cache = makeCache(redis, reconciler ? reconciler.state : {});
  const reddit = new RedditAPIClient(metadata);
  const scheduler = new SchedulerClient(metadata);
  const settings = new SettingsClient(metadata);
  const uiClient = ui ? new UIClient(reconciler) : void 0;
  const media = new MediaClient(metadata);
  const assets = new AssetsClient();
  const realtime = new RealtimeClient(metadata);
  const useState3 = hooks && reconciler ? makeUseStateHook(reconciler) : void 0;
  const useInterval2 = hooks && reconciler ? makeUseIntervalHook(reconciler) : void 0;
  const useForm2 = hooks && reconciler ? makeUseFormHook(reconciler) : void 0;
  const useChannel2 = hooks && reconciler ? makeUseChannelHook(reconciler) : void 0;
  return {
    modLog,
    kvStore,
    redis,
    reddit,
    scheduler,
    settings,
    media,
    assets,
    realtime,
    get useForm() {
      return useForm2 ?? (() => {
        throw new Error("useForm() is unavailable");
      });
    },
    get cache() {
      return cache ?? (() => {
        throw new Error("cache() is unavailable");
      });
    },
    get useState() {
      return useState3 ?? (() => {
        throw new Error("useState() is unavailable");
      });
    },
    get useInterval() {
      return useInterval2 ?? (() => {
        throw new Error("useInterval() is unavailable");
      });
    },
    get useChannel() {
      return useChannel2 ?? (() => {
        throw new Error("useChannel() is unavailable");
      });
    },
    get ui() {
      if (!uiClient) {
        throw new Error("ui client is not available");
      }
      return uiClient;
    }
  };
}

// node_modules/@devvit/public-api/version.json
var version_default = {
  name: "@devvit/public-api",
  version: "0.11.12-dev",
  license: "BSD-3-Clause",
  repository: {
    type: "git",
    url: "https://developers.reddit.com/"
  },
  type: "module",
  exports: {
    ".": "./dist/index.js",
    "./package.json": "./package.json",
    "./*": "./dist/*"
  },
  main: "./dist/index.js",
  files: [
    "dist/**"
  ],
  scripts: {
    build: "yarn build:icon-types && yarn build:semantic-colors && tsc && cp -af devvit.tsconfig.json dist/ && yarn build:types && yarn build:min && yarn build:unmin",
    "build:icon-types": "make-icons src/types/icons.ts",
    "build:min": "esbuild --bundle --sourcemap=linked --target=es2020 --format=esm  --metafile=dist/meta.min.json --outfile=dist/public-api.min.js --external:@devvit/protos --minify src/index.ts",
    "build:semantic-colors": "node scripts/make-semantic-colors.js",
    "build:types": "api-extractor run && sed -ne '/declare global {/,$ p' src/devvit/Devvit.ts >> dist/public-api.d.ts",
    "build:unmin": "esbuild --bundle --sourcemap=inline --target=es2020 --format=iife --metafile=dist/meta.json     --outfile=dist/public-api.iife.js --global-name=devvitPublicAPI                    src/index.ts",
    clean: "rm -rf .turbo api-extractor coverage dist src/devvit/internals/semanticColors.ts src/types/icons.ts || :",
    clobber: "yarn clean && rm -rf node_modules",
    dev: "tsc -w",
    "dev:build": "chokidar ./src ../shared-types/dist --command 'yarn build' --ignore './src/types/icons.ts' --ignore './src/devvit/internals/semanticColors.ts'",
    lint: "redlint .",
    "lint:fix": "yarn lint --fix",
    prepublishOnly: "publish-package-json",
    test: "yarn test:unit && yarn test:types && yarn test:size",
    "test:size": "filesize",
    "test:types": "tsc --noEmit",
    "test:unit": "vitest run",
    "test:unit-with-coverage": "vitest run --coverage"
  },
  types: "./dist/index.d.ts",
  dependencies: {
    "@devvit/metrics": "0.11.12-dev",
    "@devvit/protos": "0.11.12-dev",
    "@devvit/shared-types": "0.11.12-dev",
    "base64-js": "1.5.1",
    "clone-deep": "4.0.1",
    moderndash: "4.0.0"
  },
  devDependencies: {
    "@ampproject/filesize": "4.3.0",
    "@devvit/repo-tools": "0.11.12-dev",
    "@devvit/tsconfig": "0.11.12-dev",
    "@microsoft/api-extractor": "7.41.0",
    "@reddit/faceplate-ui": "18.0.1",
    "@types/clone-deep": "4.0.1",
    "@vitest/coverage-c8": "0.32.0",
    "chokidar-cli": "3.0.0",
    esbuild: "0.23.0",
    eslint: "9.11.1",
    typescript: "5.3.2",
    vitest: "1.6.0"
  },
  publishConfig: {
    directory: "dist"
  },
  filesize: {
    "dist/public-api.min.js": {
      gzip: "61 KB",
      none: "215 KB"
    }
  },
  source: "./src/index.ts"
};

// node_modules/@devvit/public-api/devvit/internals/context.js
function getContextFromMetadata(metadata, postId, commentId) {
  const subredditId = metadata[Header.Subreddit]?.values[0];
  assertNonNull(subredditId, "subreddit is missing from Context");
  const subredditName = metadata[Header.SubredditName]?.values[0];
  const appAccountId = metadata[Header.AppUser]?.values[0];
  const appName = metadata[Header.App]?.values[0];
  const appVersion = metadata[Header.Version]?.values[0];
  const userId = metadata[Header.User]?.values[0];
  const debug = parseDebug(metadata);
  return {
    get appAccountId() {
      assertNonNull(appAccountId, "appAccountId is missing from Context");
      return appAccountId;
    },
    subredditId,
    subredditName,
    userId,
    postId,
    commentId,
    appName,
    appVersion,
    debug,
    toJSON() {
      return {
        appAccountId,
        appName,
        appVersion,
        subredditId,
        subredditName,
        userId,
        postId,
        commentId,
        debug
      };
    }
  };
}
function parseDebug(meta) {
  var _a6;
  const keyset = {
    blocks: void 0,
    emitSnapshots: void 0,
    emitState: void 0,
    realtime: void 0,
    runtime: void 0,
    surface: void 0,
    useAsync: void 0,
    payments: void 0,
    bootstrap: void 0,
    webView: void 0
  };
  const lowerKeyToKey = {};
  for (const key in keyset)
    lowerKeyToKey[key.toLowerCase()] = key;
  const debug = {};
  for (const kv of (meta[Header.Debug]?.values ?? []).join().split(",")) {
    let [k, v] = kv.split("=");
    if (!k)
      continue;
    k = k.trim();
    v = v?.trim();
    if (k.toLowerCase() in lowerKeyToKey)
      k = lowerKeyToKey[k.toLowerCase()];
    debug[_a6 = k] ?? (debug[_a6] = v || `${true}`);
  }
  if (meta[Header.Debug])
    console.info(`[api] @devvit/public-api v${version_default.version} ${Object.entries(debug).map(([k, v]) => `${k}=${v}`).join(" ")}`);
  return { ...debug, metadata: meta };
}

// node_modules/@devvit/public-api/devvit/internals/helpers/settingsUtils.js
function extractSettingsFields(settings) {
  return settings.flatMap((field) => {
    if (field.type === "group") {
      return extractSettingsFields(field.fields);
    }
    return field;
  });
}
async function onValidateFormHelper(req, settings, metadata) {
  if (!settings) {
    throw new Error("Settings were not defined.");
  }
  const response = {
    success: true,
    errors: {}
  };
  const formValues = getFormValues(req.fieldValues);
  const flattendFields = extractSettingsFields(settings);
  await Promise.all(flattendFields.map(async (field) => {
    const fieldName = field.name;
    if (fieldName && field.onValidate) {
      const value = formValues[fieldName];
      const validator = field.onValidate;
      const context = Object.assign(makeAPIClients({
        metadata
      }), getContextFromMetadata(metadata));
      const error = await validator({
        value,
        isEditing: req.editing
      }, context);
      if (error) {
        response.success = false;
        response.errors[fieldName] = error;
      }
    }
  }));
  return import_protos8.ValidateFormResponse.fromJSON(response);
}

// node_modules/@devvit/public-api/devvit/internals/app-settings.js
async function onGetSettingsFields() {
  if (!Devvit.appSettings) {
    throw new Error("App settings were not defined.");
  }
  return import_protos9.GetFieldsResponse.fromJSON({
    fields: {
      fields: transformFormFields(Devvit.appSettings)
    }
  });
}
async function onValidateForm(req, metadata) {
  return onValidateFormHelper(req, Devvit.appSettings, metadata);
}
function registerAppSettings(config) {
  config.provides(import_protos9.AppSettingsDefinition);
  extendDevvitPrototype("GetAppSettingsFields", onGetSettingsFields);
  extendDevvitPrototype("ValidateAppForm", onValidateForm);
}

// node_modules/@devvit/public-api/devvit/internals/custom-post.js
var import_protos14 = require("@devvit/protos");

// node_modules/@devvit/public-api/devvit/internals/blocks/BlocksReconciler.js
var import_protos13 = require("@devvit/protos");

// node_modules/@devvit/public-api/apis/ui/helpers/getEffectsFromUIClient.js
function getEffectsFromUIClient(ui) {
  return ui.__effects;
}

// node_modules/@devvit/public-api/devvit/internals/helpers/makeUniqueIdGenerator.js
function makeUniqueIdGenerator() {
  const seenActionIds = /* @__PURE__ */ new Set();
  return (id) => {
    let uniqueId = id;
    let counter = 1;
    while (seenActionIds.has(uniqueId)) {
      uniqueId = `${id}.${counter++}`;
    }
    seenActionIds.add(uniqueId);
    return uniqueId;
  };
}

// node_modules/@devvit/public-api/devvit/internals/blocks/BlocksTransformer.js
var import_protos12 = require("@devvit/protos");

// node_modules/@devvit/public-api/devvit/internals/semanticColors.js
var semanticColors = {
  "alienblue-100": "#DCE2FB",
  "alienblue-200": "#B8C5FC",
  "alienblue-25": "#F7F8FD",
  "alienblue-300": "#90A9FD",
  "alienblue-400": "#648EFC",
  "alienblue-50": "#EEF0FB",
  "alienblue-500": "#1870F4",
  "alienblue-600": "#115BCA",
  "alienblue-700": "#0A449B",
  "alienblue-75": "#E6E9FB",
  "alienblue-800": "#0A2F6C",
  "alienblue-900": "#0A1A3F",
  "alienblue-950": "#07102B",
  "berrypurple-100": "#F3DAFB",
  "berrypurple-200": "#EAB3FD",
  "berrypurple-25": "#FBF6FD",
  "berrypurple-300": "#DE8BFF",
  "berrypurple-400": "#CF5FFF",
  "berrypurple-50": "#F8EDFC",
  "berrypurple-500": "#BC0EFF",
  "berrypurple-600": "#9B00D4",
  "berrypurple-700": "#7600A3",
  "berrypurple-75": "#F6E4FB",
  "berrypurple-800": "#520472",
  "berrypurple-900": "#300643",
  "berrypurple-950": "#20042A",
  "black": "#000000",
  "black-opacity-0": "#00000000",
  "black-opacity-10": "#00000019",
  "black-opacity-15": "#00000026",
  "black-opacity-20": "#00000033",
  "black-opacity-25": "#0000003F",
  "black-opacity-33": "#00000054",
  "black-opacity-5": "#0000000C",
  "black-opacity-50": "#0000007F",
  "black-opacity-60": "#00000099",
  "black-opacity-67": "#000000AA",
  "black-opacity-80": "#000000CC",
  "black-opacity-90": "#000000E5",
  "brown-100": "#F1DFCF",
  "brown-200": "#E9BE95",
  "brown-25": "#FBF7F4",
  "brown-300": "#DC9D5D",
  "brown-400": "#BA854E",
  "brown-50": "#F7EFE9",
  "brown-500": "#9A6D3F",
  "brown-600": "#7B5631",
  "brown-700": "#5D4023",
  "brown-75": "#F4E7DC",
  "brown-800": "#3F2C19",
  "brown-900": "#221A11",
  "brown-950": "#15100A",
  "coolgray-100": "#DBE4E9",
  "coolgray-150": "#C9D7DE",
  "coolgray-200": "#B7CAD4",
  "coolgray-25": "#F6F8F9",
  "coolgray-250": "#A4BDCA",
  "coolgray-300": "#97AFBC",
  "coolgray-350": "#8BA2AD",
  "coolgray-400": "#7F949F",
  "coolgray-450": "#748791",
  "coolgray-50": "#EEF1F3",
  "coolgray-500": "#667780",
  "coolgray-525": "#576F76",
  "coolgray-550": "#5C6C74",
  "coolgray-600": "#536168",
  "coolgray-650": "#48545B",
  "coolgray-700": "#3D494E",
  "coolgray-75": "#E5EBEE",
  "coolgray-750": "#333D42",
  "coolgray-800": "#2A3236",
  "coolgray-850": "#21272A",
  "coolgray-900": "#181C1F",
  "coolgray-950": "#0E1113",
  "global-black": {
    "light": "#000000",
    "dark": "#000000"
  },
  "global-brand-orangered": {
    "light": "#FF4500",
    "dark": "#FF4500"
  },
  "global-white": {
    "light": "#FFFFFF",
    "dark": "#FFFFFF"
  },
  "kiwigreen-100": "#A8F5A0",
  "kiwigreen-200": "#58E15B",
  "kiwigreen-25": "#EBFDE7",
  "kiwigreen-300": "#00C61C",
  "kiwigreen-400": "#01A816",
  "kiwigreen-50": "#DDF8D7",
  "kiwigreen-500": "#008A10",
  "kiwigreen-600": "#016E0B",
  "kiwigreen-700": "#005306",
  "kiwigreen-75": "#CAF5C2",
  "kiwigreen-800": "#033902",
  "kiwigreen-900": "#0D2005",
  "kiwigreen-950": "#081404",
  "lightblue-100": "#CAE7FB",
  "lightblue-200": "#87D0FD",
  "lightblue-25": "#F3F9FD",
  "lightblue-300": "#02B9FB",
  "lightblue-400": "#029DD5",
  "lightblue-50": "#E6F3FC",
  "lightblue-500": "#007FAE",
  "lightblue-600": "#01668D",
  "lightblue-700": "#014D6B",
  "lightblue-75": "#D9EDFB",
  "lightblue-800": "#03354B",
  "lightblue-900": "#051E2B",
  "lightblue-950": "#04131A",
  "lime-100": "#B7F28E",
  "lime-200": "#90DA58",
  "lime-25": "#EEFDDC",
  "lime-300": "#6DBF01",
  "lime-400": "#5BA200",
  "lime-50": "#E0F8C8",
  "lime-500": "#4A8500",
  "lime-600": "#3A6A00",
  "lime-700": "#2A5000",
  "lime-75": "#CEF5AD",
  "lime-800": "#1E3702",
  "lime-900": "#151E05",
  "lime-950": "#0D1304",
  "mintgreen-100": "#9BF5D9",
  "mintgreen-200": "#00E2B7",
  "mintgreen-25": "#E7FDF5",
  "mintgreen-300": "#00C29D",
  "mintgreen-400": "#01A484",
  "mintgreen-50": "#D7F8EC",
  "mintgreen-500": "#01876D",
  "mintgreen-600": "#006C56",
  "mintgreen-700": "#015140",
  "mintgreen-75": "#C0F5E3",
  "mintgreen-800": "#00382B",
  "mintgreen-900": "#032019",
  "mintgreen-950": "#03140F",
  "orangered-100": "#FCDBCF",
  "orangered-200": "#FDB498",
  "orangered-25": "#FDF6F4",
  "orangered-300": "#FF895D",
  "orangered-400": "#FF4500",
  "orangered-50": "#FCEEE8",
  "orangered-500": "#D93900",
  "orangered-600": "#AE2C00",
  "orangered-700": "#842100",
  "orangered-75": "#FBE5DC",
  "orangered-800": "#591B02",
  "orangered-900": "#2F1405",
  "orangered-950": "#1C0D04",
  "periwinkle-100": "#E6DFFB",
  "periwinkle-200": "#CDBEFD",
  "periwinkle-25": "#F9F7FD",
  "periwinkle-300": "#B29FFF",
  "periwinkle-400": "#9580FF",
  "periwinkle-50": "#F2EFFC",
  "periwinkle-500": "#6A5CFF",
  "periwinkle-600": "#523DFF",
  "periwinkle-700": "#4001EA",
  "periwinkle-75": "#ECE7FB",
  "periwinkle-800": "#250AA6",
  "periwinkle-900": "#160E5B",
  "periwinkle-950": "#0C083F",
  "poopbrown-100": "#FEEEDD",
  "poopbrown-200": "#F6DDC3",
  "poopbrown-300": "#EECCAA",
  "poopbrown-400": "#CAA075",
  "poopbrown-50": "#FEF7EE",
  "poopbrown-500": "#9A6D3F",
  "poopbrown-600": "#6E4924",
  "poopbrown-700": "#54371A",
  "poopbrown-800": "#3B2510",
  "poopbrown-900": "#29190A",
  "poopbrown-950": "#110B04",
  "puregray-100": "#F2F2F2",
  "puregray-150": "#EBEBEB",
  "puregray-200": "#E4E4E4",
  "puregray-250": "#DDDDDD",
  "puregray-300": "#D6D6D6",
  "puregray-350": "#C3C3C3",
  "puregray-400": "#ACACAC",
  "puregray-450": "#919191",
  "puregray-50": "#F8F8F8",
  "puregray-500": "#767676",
  "puregray-550": "#5C5C5C",
  "puregray-600": "#434343",
  "puregray-650": "#393939",
  "puregray-700": "#303030",
  "puregray-750": "#272727",
  "puregray-800": "#1E1E1E",
  "puregray-850": "#181818",
  "puregray-900": "#131313",
  "puregray-950": "#080808",
  "red-100": "#FBDBD4",
  "red-200": "#FDB3A4",
  "red-25": "#FDF6F5",
  "red-300": "#FF8773",
  "red-400": "#FF4F40",
  "red-50": "#FCEEEA",
  "red-500": "#EB001F",
  "red-600": "#BC0117",
  "red-700": "#90000F",
  "red-75": "#FBE4DF",
  "red-800": "#650405",
  "red-900": "#340F05",
  "red-950": "#1F0B04",
  "sakurapink-100": "#FBD9EB",
  "sakurapink-200": "#FDAEDA",
  "sakurapink-25": "#FDF6F9",
  "sakurapink-300": "#FF7ECA",
  "sakurapink-400": "#FF38BB",
  "sakurapink-50": "#FCEDF4",
  "sakurapink-500": "#DE019F",
  "sakurapink-600": "#B2007F",
  "sakurapink-700": "#880060",
  "sakurapink-75": "#FBE3EF",
  "sakurapink-800": "#5F0443",
  "sakurapink-900": "#380626",
  "sakurapink-950": "#250419",
  "transparent": "transparent",
  "white": "#ffffff",
  "white-opacity-0": "#FFFFFF00",
  "white-opacity-10": "#FFFFFF19",
  "white-opacity-15": "#FFFFFF26",
  "white-opacity-20": "#FFFFFF33",
  "white-opacity-25": "#FFFFFF3F",
  "white-opacity-5": "#FFFFFF0C",
  "white-opacity-50": "#FFFFFF7F",
  "yellow-100": "#FFE284",
  "yellow-200": "#FFBF0B",
  "yellow-25": "#FFF9E0",
  "yellow-300": "#D8A100",
  "yellow-400": "#B78800",
  "yellow-50": "#FFF3C0",
  "yellow-500": "#977000",
  "yellow-600": "#785800",
  "yellow-700": "#5B4200",
  "yellow-75": "#FFEAA2",
  "yellow-800": "#3F2D00",
  "yellow-900": "#231A03",
  "yellow-950": "#161003",
  "yelloworange-100": "#FCDCC8",
  "yelloworange-200": "#FDB586",
  "yelloworange-25": "#FDF7F3",
  "yelloworange-300": "#FF8A35",
  "yelloworange-400": "#E46C00",
  "yelloworange-50": "#FCEEE6",
  "yelloworange-500": "#BD5800",
  "yelloworange-600": "#974500",
  "yelloworange-700": "#733300",
  "yelloworange-75": "#FBE5D7",
  "yelloworange-800": "#4E2402",
  "yelloworange-900": "#2A1705",
  "yelloworange-950": "#1A0E04",
  "action-downvote": {
    "light": "#6A5CFF",
    "dark": "#6A5CFF"
  },
  "action-upvote": {
    "light": "#D93900",
    "dark": "#D93900"
  },
  "ai-background-weaker": {
    "light": "#E7FDF5",
    "dark": "#00382B"
  },
  "ai-plain": {
    "light": "#006C56",
    "dark": "#01A484"
  },
  "ai-plain-hover": {
    "light": "#015140",
    "dark": "#00C29D"
  },
  "alert-caution": {
    "light": "#977000",
    "dark": "#977000"
  },
  "avatar-gradient": {
    "light": "",
    "dark": ""
  },
  "brand-background": {
    "light": "#D93900",
    "dark": "#D93900"
  },
  "brand-background-hover": {
    "light": "#AE2C00",
    "dark": "#AE2C00"
  },
  "brand-gradient-active": {
    "light": "",
    "dark": ""
  },
  "brand-gradient-active-highlight": {
    "light": "",
    "dark": ""
  },
  "brand-gradient-default": {
    "light": "",
    "dark": ""
  },
  "brand-gradient-default-highlight": {
    "light": "",
    "dark": ""
  },
  "brand-gradient-hover": {
    "light": "",
    "dark": ""
  },
  "brand-gradient-hover-highlight": {
    "light": "",
    "dark": ""
  },
  "brand-onBackground": {
    "light": "#FFFFFF",
    "dark": "#FFFFFF"
  },
  "category-live": {
    "light": "#D93900",
    "dark": "#D93900"
  },
  "category-nsfw": {
    "light": "#DE019F",
    "dark": "#DE019F"
  },
  "category-spoiler": {
    "light": "#131313",
    "dark": "#F2F2F2"
  },
  "caution-background": {
    "light": "#FFBF0B",
    "dark": "#D8A100"
  },
  "caution-background-hover": {
    "light": "#D8A100",
    "dark": "#FFBF0B"
  },
  "caution-onBackground": {
    "light": "#000000",
    "dark": "#000000"
  },
  "caution-plain": {
    "light": "#785800",
    "dark": "#FFBF0B"
  },
  "caution-plain-hover": {
    "light": "#5B4200",
    "dark": "#FFE284"
  },
  "danger-background": {
    "light": "#EB001F",
    "dark": "#BC0117"
  },
  "danger-background-disabled": {
    "light": "#FDB3A4",
    "dark": "#340F05"
  },
  "danger-background-hover": {
    "light": "#BC0117",
    "dark": "#EB001F"
  },
  "danger-background-weaker": {
    "light": "#FBDBD4",
    "dark": "#650405"
  },
  "danger-content": {
    "light": "#BC0117",
    "dark": "#FF4F40"
  },
  "danger-content-default": {
    "light": "#ffffff",
    "dark": "#ffffff"
  },
  "danger-content-hover": {
    "light": "#90000F",
    "dark": "#FF8773"
  },
  "danger-onBackground": {
    "light": "#FFFFFF",
    "dark": "#FFFFFF"
  },
  "danger-plain": {
    "light": "#BC0117",
    "dark": "#FF8773"
  },
  "danger-plain-hover": {
    "light": "#90000F",
    "dark": "#FDB3A4"
  },
  "downvote-background": {
    "light": "#6A5CFF",
    "dark": "#6A5CFF"
  },
  "downvote-background-disabled": {
    "light": "#6a5cff4d",
    "dark": "#6a5cff4d"
  },
  "downvote-background-hover": {
    "light": "#523DFF",
    "dark": "#523DFF"
  },
  "downvote-content": {
    "light": "#523DFF",
    "dark": "#9580FF"
  },
  "downvote-content-weak": {
    "light": "#6A5CFF",
    "dark": "#6A5CFF"
  },
  "downvote-disabled": {
    "light": "#523DFF4c",
    "dark": "#9580FF4c"
  },
  "downvote-onBackground": {
    "light": "#FFFFFF",
    "dark": "#FFFFFF"
  },
  "downvote-onStrongScrim": {
    "light": "#B29FFF",
    "dark": "#B29FFF"
  },
  "downvote-onStrongScrim-disabled": {
    "light": "#b29fff4d",
    "dark": "#b29fff4d"
  },
  "downvote-onStrongScrim-weaker": {
    "light": "#9580FF",
    "dark": "#9580FF"
  },
  "downvote-plain": {
    "light": "#523DFF",
    "dark": "#9580FF"
  },
  "downvote-plain-disabled": {
    "light": "#523dff4d",
    "dark": "#9580ff4d"
  },
  "downvote-plain-weaker": {
    "light": "#6A5CFF",
    "dark": "#6A5CFF"
  },
  "elevation-large1": {
    "light": "#0000003F",
    "dark": "#0000007F"
  },
  "elevation-large2": {
    "light": "#00000026",
    "dark": "#00000033"
  },
  "elevation-medium1": {
    "light": "#0000003F",
    "dark": "#0000007F"
  },
  "elevation-medium2": {
    "light": "#00000019",
    "dark": "#00000033"
  },
  "elevation-small": {
    "light": "#00000026",
    "dark": "#00000054"
  },
  "elevation-xsmall": {
    "light": "#0000003F",
    "dark": "#000000AA"
  },
  "favorite": {
    "light": "#977000",
    "dark": "#B78800"
  },
  "global-admin": {
    "light": "#D93900",
    "dark": "#D93900"
  },
  "global-alienblue": {
    "light": "#1870F4",
    "dark": "#1870F4"
  },
  "global-darkblue": {
    "light": "#2A3236",
    "dark": "#2A3236"
  },
  "global-focus": {
    "light": "#029DD5",
    "dark": "#007FAE"
  },
  "global-gold": {
    "light": "#B78800",
    "dark": "#D8A100"
  },
  "global-moderator": {
    "light": "#008A10",
    "dark": "#008A10"
  },
  "global-nsfw": {
    "light": "#DE019F",
    "dark": "#DE019F"
  },
  "global-offline": {
    "light": "#667780",
    "dark": "#667780"
  },
  "global-online": {
    "light": "#00C61C",
    "dark": "#00C61C"
  },
  "global-orangered": {
    "light": "#FF4500",
    "dark": "#FF4500"
  },
  "global-stars": {
    "light": "#977000",
    "dark": "#D8A100"
  },
  "gradient-media": {
    "light": "",
    "dark": ""
  },
  "gradient-media-strong": {
    "light": "",
    "dark": ""
  },
  "identity-admin": {
    "light": "#D93900",
    "dark": "#D93900"
  },
  "identity-coins": {
    "light": "#B78800",
    "dark": "#B78800"
  },
  "identity-moderator": {
    "light": "#008A10",
    "dark": "#008A10"
  },
  "identity-self": {
    "light": "#01876D",
    "dark": "#01876D"
  },
  "interactive-background-disabled": {
    "light": "#0000000C",
    "dark": "#FFFFFF0C"
  },
  "interactive-content-disabled": {
    "light": "#0000003F",
    "dark": "#FFFFFF3F"
  },
  "interactive-focused": {
    "light": "#007FAE",
    "dark": "#007FAE"
  },
  "interactive-pressed": {
    "light": "#00000026",
    "dark": "#FFFFFF26"
  },
  "inverted-interactive-background-disabled": {
    "light": "#FFFFFF0C",
    "dark": "#0000000C"
  },
  "inverted-interactive-content-disabled": {
    "light": "#FFFFFF3F",
    "dark": "#0000003F"
  },
  "inverted-interactive-pressed": {
    "light": "#FFFFFF26",
    "dark": "#00000026"
  },
  "inverted-neutral-background": {
    "light": "#0E1113",
    "dark": "#FFFFFF"
  },
  "inverted-neutral-background-hover": {
    "light": "#181C1F",
    "dark": "#F6F8F9"
  },
  "inverted-neutral-border": {
    "light": "#FFFFFF33",
    "dark": "#00000033"
  },
  "inverted-neutral-content": {
    "light": "#B7CAD4",
    "dark": "#333D42"
  },
  "inverted-neutral-content-strong": {
    "light": "#EEF1F3",
    "dark": "#181C1F"
  },
  "inverted-secondary-background": {
    "light": "#2A3236",
    "dark": "#E5EBEE"
  },
  "inverted-secondary-background-hover": {
    "light": "#333D42",
    "dark": "#DBE4E9"
  },
  "inverted-secondary-background-selected": {
    "light": "#3D494E",
    "dark": "#C9D7DE"
  },
  "inverted-secondary-onBackground": {
    "light": "#FFFFFF",
    "dark": "#000000"
  },
  "inverted-secondary-plain": {
    "light": "#DBE4E9",
    "dark": "#181C1F"
  },
  "inverted-secondary-plain-hover": {
    "light": "#FFFFFF",
    "dark": "#000000"
  },
  "media-background": {
    "light": "#00000099",
    "dark": "#00000099"
  },
  "media-background-hover": {
    "light": "#000000cc",
    "dark": "#000000cc"
  },
  "media-background-selected": {
    "light": "#000000cc",
    "dark": "#000000cc"
  },
  "media-border-selected": {
    "light": "#FFFFFF",
    "dark": "#FFFFFF"
  },
  "media-border-weak": {
    "light": "#FFFFFF19",
    "dark": "#FFFFFF19"
  },
  "media-onBackground": {
    "light": "#FFFFFF",
    "dark": "#FFFFFF"
  },
  "media-onBackground-disabled": {
    "light": "#FFFFFF3F",
    "dark": "#FFFFFF3F"
  },
  "media-onBackground-weak": {
    "light": "#E5EBEE",
    "dark": "#E5EBEE"
  },
  "media-onbackground": {
    "light": "#ffffff",
    "dark": "#ffffff"
  },
  "media-onbackground-disabled": {
    "light": "#ffffff3f",
    "dark": "#ffffff3f"
  },
  "media-onbackground-weak": {
    "light": "#B7CAD4",
    "dark": "#B7CAD4"
  },
  "neutral-background": {
    "light": "#FFFFFF",
    "dark": "#0E1113"
  },
  "neutral-background-container": {
    "light": "#F6F8F9",
    "dark": "#181C1F"
  },
  "neutral-background-container-hover": {
    "light": "#EEF1F3",
    "dark": "#21272A"
  },
  "neutral-background-container-strong": {
    "light": "#EEF1F3",
    "dark": "#21272A"
  },
  "neutral-background-container-strong-hover": {
    "light": "#E5EBEE",
    "dark": "#2A3236"
  },
  "neutral-background-gilded": {
    "light": "#FFF9E0",
    "dark": "#181C1F"
  },
  "neutral-background-gilded-hover": {
    "light": "#FFF3C0",
    "dark": "#21272A"
  },
  "neutral-background-hover": {
    "light": "#F6F8F9",
    "dark": "#181C1F"
  },
  "neutral-background-medium": {
    "light": "#F8F8F8",
    "dark": "#131313"
  },
  "neutral-background-pinned": {
    "light": "#FFFFFF",
    "dark": "#0E1113"
  },
  "neutral-background-selected": {
    "light": "#E5EBEE",
    "dark": "#2A3236"
  },
  "neutral-background-strong": {
    "light": "#FFFFFF",
    "dark": "#181C1F"
  },
  "neutral-background-strong-hover": {
    "light": "#F6F8F9",
    "dark": "#21272A"
  },
  "neutral-background-weak": {
    "light": "#F6F8F9",
    "dark": "#000000"
  },
  "neutral-background-weak-hover": {
    "light": "#EEF1F3",
    "dark": "#0E1113"
  },
  "neutral-border": {
    "light": "#00000033",
    "dark": "#FFFFFF33"
  },
  "neutral-border-medium": {
    "light": "#0000007F",
    "dark": "#FFFFFF7F"
  },
  "neutral-border-strong": {
    "light": "#181C1F",
    "dark": "#F6F8F9"
  },
  "neutral-border-weak": {
    "light": "#00000019",
    "dark": "#FFFFFF19"
  },
  "neutral-content": {
    "light": "#333D42",
    "dark": "#B7CAD4"
  },
  "neutral-content-disabled": {
    "light": "#D6D6D6",
    "dark": "#303030"
  },
  "neutral-content-strong": {
    "light": "#181C1F",
    "dark": "#EEF1F3"
  },
  "neutral-content-weak": {
    "light": "#5C6C74",
    "dark": "#8BA2AD"
  },
  "offline": {
    "light": "#767676",
    "dark": "#767676"
  },
  "online": {
    "light": "#01A816",
    "dark": "#01A816"
  },
  "opacity-08": {
    "light": "#13131314",
    "dark": "#13131314"
  },
  "opacity-50": {
    "light": "#0000007f",
    "dark": "#F2F2F27f"
  },
  "opacity-highlight": {
    "light": "",
    "dark": ""
  },
  "pizzaRed": {
    "light": "#ef5350",
    "dark": "#c62828"
  },
  "primary": {
    "light": "#115BCA",
    "dark": "#648EFC"
  },
  "primary-background": {
    "light": "#0A449B",
    "dark": "#115BCA"
  },
  "primary-background-hover": {
    "light": "#0A2F6C",
    "dark": "#1870F4"
  },
  "primary-background-selected": {
    "light": "#0A1A3F",
    "dark": "#648EFC"
  },
  "primary-border": {
    "light": "#0A449B",
    "dark": "#648EFC"
  },
  "primary-border-hover": {
    "light": "#0A2F6C",
    "dark": "#90A9FD"
  },
  "primary-hover": {
    "light": "#0A449B",
    "dark": "#90A9FD"
  },
  "primary-onBackground": {
    "light": "#FFFFFF",
    "dark": "#FFFFFF"
  },
  "primary-onBackground-selected": {
    "light": "#FFFFFF",
    "dark": "#000000"
  },
  "primary-plain": {
    "light": "#0A449B",
    "dark": "#648EFC"
  },
  "primary-plain-hover": {
    "light": "#0A2F6C",
    "dark": "#90A9FD"
  },
  "primary-plain-visited": {
    "light": "#7600A3",
    "dark": "#CF5FFF"
  },
  "primary-visited": {
    "light": "#9B00D4",
    "dark": "#CF5FFF"
  },
  "scrim": {
    "light": "#00000099",
    "dark": "#00000099"
  },
  "scrim-background": {
    "light": "#00000099",
    "dark": "#00000099"
  },
  "scrim-background-strong": {
    "light": "#000000CC",
    "dark": "#000000CC"
  },
  "scrim-gradient": {
    "light": "",
    "dark": ""
  },
  "scrim-strong": {
    "light": "#000000cc",
    "dark": "#000000cc"
  },
  "secondary": {
    "light": "#21272A",
    "dark": "#DBE4E9"
  },
  "secondary-background": {
    "light": "#E5EBEE",
    "dark": "#2A3236"
  },
  "secondary-background-hover": {
    "light": "#DBE4E9",
    "dark": "#333D42"
  },
  "secondary-background-selected": {
    "light": "#C9D7DE",
    "dark": "#3D494E"
  },
  "secondary-hover": {
    "light": "#000000",
    "dark": "#ffffff"
  },
  "secondary-onBackground": {
    "light": "#000000",
    "dark": "#FFFFFF"
  },
  "secondary-plain": {
    "light": "#181C1F",
    "dark": "#DBE4E9"
  },
  "secondary-plain-hover": {
    "light": "#000000",
    "dark": "#FFFFFF"
  },
  "secondary-plain-weak": {
    "light": "#5C6C74",
    "dark": "#8BA2AD"
  },
  "secondary-weak": {
    "light": "#576F76",
    "dark": "#748791"
  },
  "success-background": {
    "light": "#008A10",
    "dark": "#016E0B"
  },
  "success-background-hover": {
    "light": "#016E0B",
    "dark": "#008A10"
  },
  "success-content": {
    "light": "#016E0B",
    "dark": "#01A816"
  },
  "success-hover": {
    "light": "#005306",
    "dark": "#00C61C"
  },
  "success-onBackground": {
    "light": "#FFFFFF",
    "dark": "#FFFFFF"
  },
  "success-plain": {
    "light": "#016E0B",
    "dark": "#00C61C"
  },
  "success-plain-hover": {
    "light": "#005306",
    "dark": "#58E15B"
  },
  "tone-1": {
    "light": "#131313",
    "dark": "#F2F2F2"
  },
  "tone-2": {
    "light": "#434343",
    "dark": "#ACACAC"
  },
  "tone-3": {
    "light": "#ACACAC",
    "dark": "#434343"
  },
  "tone-4": {
    "light": "#E4E4E4",
    "dark": "#303030"
  },
  "tone-5": {
    "light": "#F2F2F2",
    "dark": "#1E1E1E"
  },
  "tone-6": {
    "light": "#F8F8F8",
    "dark": "#131313"
  },
  "tone-7": {
    "light": "#ffffff",
    "dark": "#080808"
  },
  "transparent-background-hover": {
    "light": "#74879119",
    "dark": "#66778019"
  },
  "ui-canvas": {
    "light": "#F2F2F2",
    "dark": "#080808"
  },
  "ui-modalbackground": {
    "light": "#FFFFFF",
    "dark": "#181C1F"
  },
  "upvote-background": {
    "light": "#D93900",
    "dark": "#D93900"
  },
  "upvote-background-disabled": {
    "light": "#d939004d",
    "dark": "#d939004d"
  },
  "upvote-background-hover": {
    "light": "#AE2C00",
    "dark": "#AE2C00"
  },
  "upvote-content": {
    "light": "#AE2C00",
    "dark": "#FF4500"
  },
  "upvote-content-weak": {
    "light": "#FF4500",
    "dark": "#FF4500"
  },
  "upvote-disabled": {
    "light": "#AE2C004c",
    "dark": "#FF45004c"
  },
  "upvote-onBackground": {
    "light": "#FFFFFF",
    "dark": "#FFFFFF"
  },
  "upvote-onStrongScrim": {
    "light": "#FF895D",
    "dark": "#FF895D"
  },
  "upvote-onStrongScrim-disabled": {
    "light": "#ff895d4d",
    "dark": "#ff895d4d"
  },
  "upvote-onStrongScrim-weaker": {
    "light": "#FF4500",
    "dark": "#FF4500"
  },
  "upvote-plain": {
    "light": "#AE2C00",
    "dark": "#FF895D"
  },
  "upvote-plain-disabled": {
    "light": "#ae2c004d",
    "dark": "#ff895d4d"
  },
  "upvote-plain-weaker": {
    "light": "#FF4500",
    "dark": "#FF4500"
  },
  "warning-background": {
    "light": "#B78800",
    "dark": "#B78800"
  },
  "warning-background-hover": {
    "light": "#977000",
    "dark": "#D8A100"
  },
  "warning-content": {
    "light": "#785800",
    "dark": "#B78800"
  },
  "warning-content-hover": {
    "light": "#5B4200",
    "dark": "#D8A100"
  },
  "warning-onBackground": {
    "light": "#000000",
    "dark": "#000000"
  }
};

// node_modules/@devvit/public-api/devvit/internals/helpers/color.js
var namedHTMLColorToHex = {
  aliceblue: "#f0f8ff",
  antiquewhite: "#faebd7",
  aqua: "#00ffff",
  aquamarine: "#7fffd4",
  azure: "#f0ffff",
  beige: "#f5f5dc",
  bisque: "#ffe4c4",
  black: "#000000",
  blanchedalmond: "#ffebcd",
  blue: "#0000ff",
  blueviolet: "#8a2be2",
  brown: "#a52a2a",
  burlywood: "#deb887",
  cadetblue: "#5f9ea0",
  chartreuse: "#7fff00",
  chocolate: "#d2691e",
  coral: "#ff7f50",
  cornflowerblue: "#6495ed",
  cornsilk: "#fff8dc",
  crimson: "#dc143c",
  cyan: "#00ffff",
  darkblue: "#00008b",
  darkcyan: "#008b8b",
  darkgoldenrod: "#b8860b",
  darkgray: "#a9a9a9",
  darkgreen: "#006400",
  darkgrey: "#a9a9a9",
  darkkhaki: "#bdb76b",
  darkmagenta: "#8b008b",
  darkolivegreen: "#556b2f",
  darkorange: "#ff8c00",
  darkorchid: "#9932cc",
  darkred: "#8b0000",
  darksalmon: "#e9967a",
  darkseagreen: "#8fbc8f",
  darkslateblue: "#483d8b",
  darkslategray: "#2f4f4f",
  darkslategrey: "#2f4f4f",
  darkturquoise: "#00ced1",
  darkviolet: "#9400d3",
  deeppink: "#ff1493",
  deepskyblue: "#00bfff",
  dimgray: "#696969",
  dimgrey: "#696969",
  dodgerblue: "#1e90ff",
  firebrick: "#b22222",
  floralwhite: "#fffaf0",
  forestgreen: "#228b22",
  fuchsia: "#ff00ff",
  gainsboro: "#dcdcdc",
  ghostwhite: "#f8f8ff",
  gold: "#ffd700",
  goldenrod: "#daa520",
  gray: "#808080",
  green: "#008000",
  greenyellow: "#adff2f",
  grey: "#808080",
  honeydew: "#f0fff0",
  hotpink: "#ff69b4",
  indianred: "#cd5c5c",
  indigo: "#4b0082",
  ivory: "#fffff0",
  khaki: "#f0e68c",
  lavender: "#e6e6fa",
  lavenderblush: "#fff0f5",
  lawngreen: "#7cfc00",
  lemonchiffon: "#fffacd",
  lightblue: "#add8e6",
  lightcoral: "#f08080",
  lightcyan: "#e0ffff",
  lightgoldenrodyellow: "#fafad2",
  lightgray: "#d3d3d3",
  lightgreen: "#90ee90",
  lightgrey: "#d3d3d3",
  lightpink: "#ffb6c1",
  lightsalmon: "#ffa07a",
  lightseagreen: "#20b2aa",
  lightskyblue: "#87cefa",
  lightslategray: "#778899",
  lightslategrey: "#778899",
  lightsteelblue: "#b0c4de",
  lightyellow: "#ffffe0",
  lime: "#00ff00",
  limegreen: "#32cd32",
  linen: "#faf0e6",
  magenta: "#ff00ff",
  maroon: "#800000",
  mediumaquamarine: "#66cdaa",
  mediumblue: "#0000cd",
  mediumorchid: "#ba55d3",
  mediumpurple: "#9370db",
  mediumseagreen: "#3cb371",
  mediumslateblue: "#7b68ee",
  mediumspringgreen: "#00fa9a",
  mediumturquoise: "#48d1cc",
  mediumvioletred: "#c71585",
  midnightblue: "#191970",
  mintcream: "#f5fffa",
  mistyrose: "#ffe4e1",
  moccasin: "#ffe4b5",
  navajowhite: "#ffdead",
  navy: "#000080",
  oldlace: "#fdf5e6",
  olive: "#808000",
  olivedrab: "#6b8e23",
  orange: "#ffa500",
  orangered: "#ff4500",
  orchid: "#da70d6",
  palegoldenrod: "#eee8aa",
  palegreen: "#98fb98",
  paleturquoise: "#afeeee",
  palevioletred: "#db7093",
  papayawhip: "#ffefd5",
  peachpuff: "#ffdab9",
  peru: "#cd853f",
  pink: "#ffc0cb",
  plum: "#dda0dd",
  powderblue: "#b0e0e6",
  purple: "#800080",
  rebeccapurple: "#663399",
  red: "#ff0000",
  rosybrown: "#bc8f8f",
  royalblue: "#4169e1",
  saddlebrown: "#8b4513",
  salmon: "#fa8072",
  sandybrown: "#f4a460",
  seagreen: "#2e8b57",
  seashell: "#fff5ee",
  sienna: "#a0522d",
  silver: "#c0c0c0",
  skyblue: "#87ceeb",
  slateblue: "#6a5acd",
  slategray: "#708090",
  slategrey: "#708090",
  snow: "#fffafa",
  springgreen: "#00ff7f",
  steelblue: "#4682b4",
  tan: "#d2b48c",
  teal: "#008080",
  thistle: "#d8bfd8",
  tomato: "#ff6347",
  turquoise: "#40e0d0",
  transparent: "#FFFFFF00",
  violet: "#ee82ee",
  wheat: "#f5deb3",
  white: "#ffffff",
  whitesmoke: "#f5f5f5",
  yellow: "#ffff00",
  yellowgreen: "#9acd32"
};
var isHexColor = (color) => Boolean(color.match(/^(#[0-9a-fA-F]{3,8}).*/));
var isRPLColor = (color) => color in semanticColors;
var isNamedHTMLColor = (color) => color in namedHTMLColorToHex;
var isRgbaColor = (color) => Boolean(color.match(/^rgba?\(.*/));
var isHslColor = (color) => Boolean(color.match(/^hsla?\(.*/));
var getHexFromRPLColor = (color, theme = "light") => {
  if (isNamedHTMLColor(color)) {
    return getHexFromNamedHTMLColor(color);
  }
  const colors = semanticColors;
  const finalColor = colors[color];
  return typeof finalColor === "string" ? finalColor : finalColor[theme];
};
var getHexFromNamedHTMLColor = (color) => namedHTMLColorToHex[color] ?? color;
var getHexFromRgbaColor = (color) => {
  const [r, g, b, a] = color.replace(/^rgba?\(|\s+|\)$/g, "").split(",");
  if (!r || !g || !b)
    return color;
  const rgbfloatValues = [r, g, b].map((val) => parseFloat(val));
  const convertedValues = [...rgbfloatValues];
  if (a) {
    const aFloat = parseFloat(a);
    const alphaNumberValue = Math.round(aFloat * 255);
    convertedValues.push(alphaNumberValue);
  }
  const finalHexValues = convertedValues.map((number) => number.toString(16).padStart(2, "0")).join("");
  return `#${finalHexValues}`;
};

// node_modules/@devvit/public-api/devvit/internals/blocks/transformContext.js
var import_protos10 = require("@devvit/protos");
var ROOT_STACK_TRANSFORM_CONTEXT = {
  stackParentLayout: {
    hasHeight: true,
    hasWidth: true,
    direction: import_protos10.BlockStackDirection.UNRECOGNIZED,
    alignment: void 0
  }
};
var ExpandDirection;
(function(ExpandDirection2) {
  ExpandDirection2[ExpandDirection2["NONE"] = 0] = "NONE";
  ExpandDirection2[ExpandDirection2["HORIZONTAL"] = 1] = "HORIZONTAL";
  ExpandDirection2[ExpandDirection2["VERTICAL"] = 2] = "VERTICAL";
})(ExpandDirection || (ExpandDirection = {}));
function makeStackDimensionsDetails(props, stackParentLayout, blockSizes) {
  if (!stackParentLayout)
    return { hasHeight: false, hasWidth: false };
  const { growDirection, stretchDirection } = makeBlockGrowStretchDetails(props?.grow, stackParentLayout.direction, stackParentLayout.alignment);
  const hasHeight = blockSizes?.height?.value?.value || blockSizes?.height?.min?.value || isExpandingOnConstrainedRespectiveAxis(ExpandDirection.VERTICAL, growDirection, stretchDirection, stackParentLayout.hasHeight);
  const hasWidth = blockSizes?.width?.value?.value || blockSizes?.width?.min?.value || isExpandingOnConstrainedRespectiveAxis(ExpandDirection.HORIZONTAL, growDirection, stretchDirection, stackParentLayout.hasWidth);
  return {
    hasHeight: Boolean(hasHeight),
    hasWidth: Boolean(hasWidth)
  };
}
function isExpandingOnConstrainedRespectiveAxis(axis, growDirection, stretchDirection, parentHasDimensionSet) {
  return growDirection === axis && parentHasDimensionSet || stretchDirection === axis && parentHasDimensionSet;
}
function makeBlockGrowStretchDetails(isGrowing, parentStackDirection, parentAlignment) {
  const parentIsVerticalOrRoot = parentStackDirection === import_protos10.BlockStackDirection.STACK_VERTICAL || parentStackDirection === import_protos10.BlockStackDirection.UNRECOGNIZED;
  const parentIsHoritzontal = parentStackDirection === import_protos10.BlockStackDirection.STACK_HORIZONTAL;
  let growDirection = ExpandDirection.NONE;
  if (parentIsHoritzontal && isGrowing) {
    growDirection = ExpandDirection.HORIZONTAL;
  } else if (parentIsVerticalOrRoot && isGrowing) {
    growDirection = ExpandDirection.VERTICAL;
  }
  const hnone = parentAlignment === void 0 || parentAlignment.horizontal === void 0;
  const vnone = parentAlignment === void 0 || parentAlignment.vertical === void 0;
  const isStretching = parentIsHoritzontal ? Boolean(vnone) : parentIsVerticalOrRoot ? Boolean(hnone) : false;
  let stretchDirection = ExpandDirection.NONE;
  if (parentIsHoritzontal && isStretching) {
    stretchDirection = ExpandDirection.VERTICAL;
  } else if (parentIsVerticalOrRoot && isStretching) {
    stretchDirection = ExpandDirection.HORIZONTAL;
  }
  return {
    growDirection,
    stretchDirection
  };
}

// node_modules/@devvit/public-api/devvit/internals/blocks/transformerUtils.js
var import_protos11 = require("@devvit/protos");
function parseSize(size) {
  if (size == null)
    return void 0;
  if (typeof size === "number") {
    return { value: size, unit: import_protos11.BlockSizeUnit.SIZE_UNIT_PERCENT };
  }
  const parts = size.match(/^(\d+(?:\.\d+)?)(px|%)?$/);
  if (parts == null) {
    return void 0;
  }
  let unit = import_protos11.BlockSizeUnit.SIZE_UNIT_PERCENT;
  if (parts.at(2) === "px") {
    unit = import_protos11.BlockSizeUnit.SIZE_UNIT_PIXELS;
  }
  const value = Number.parseFloat(parts[1]);
  return { value, unit };
}
function omitRelativeSizes(blockSizes, stackParentLayout) {
  if (blockSizes.width?.value?.unit === import_protos11.BlockSizeUnit.SIZE_UNIT_PERCENT || blockSizes.width?.min?.unit === import_protos11.BlockSizeUnit.SIZE_UNIT_PERCENT) {
    if (stackParentLayout.direction === import_protos11.BlockStackDirection.STACK_HORIZONTAL || stackParentLayout.direction === import_protos11.BlockStackDirection.STACK_DEPTH) {
      if (!stackParentLayout.hasWidth) {
        blockSizes.width = void 0;
      }
    }
  }
  if (blockSizes.height?.value?.unit === import_protos11.BlockSizeUnit.SIZE_UNIT_PERCENT || blockSizes.height?.min?.unit === import_protos11.BlockSizeUnit.SIZE_UNIT_PERCENT) {
    if (stackParentLayout.direction === import_protos11.BlockStackDirection.STACK_VERTICAL || stackParentLayout.direction === import_protos11.BlockStackDirection.STACK_DEPTH) {
      if (!stackParentLayout.hasHeight) {
        blockSizes.height = void 0;
      }
    }
  }
  return blockSizes;
}
function makeBlockSizes(props, transformContext) {
  if (props) {
    const hasWidth = props.width != null || props.minWidth != null || props.maxWidth != null;
    const hasHeight = props.height != null || props.minHeight != null || props.maxHeight != null;
    if (hasWidth || hasHeight || props.grow != null) {
      let blockSizes = {
        width: hasWidth ? {
          value: parseSize(props.width),
          min: parseSize(props.minWidth),
          max: parseSize(props.maxWidth)
        } : void 0,
        height: hasHeight ? {
          value: parseSize(props.height),
          min: parseSize(props.minHeight),
          max: parseSize(props.maxHeight)
        } : void 0,
        grow: props.grow
      };
      if (transformContext.stackParentLayout) {
        blockSizes = omitRelativeSizes(blockSizes, transformContext.stackParentLayout);
      }
      return blockSizes;
    }
  }
  return void 0;
}

// node_modules/@devvit/public-api/devvit/internals/blocks/BlocksTransformer.js
var __classPrivateFieldSet12 = function(receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet12 = function(receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _BlocksTransformer_assetsClient;
var DATA_PREFIX = "data-";
var ACTION_HANDLERS = /* @__PURE__ */ new Set(["onPress", "onMessage"]);
var ACTION_TYPES = /* @__PURE__ */ new Map([
  ["onPress", import_protos12.BlockActionType.ACTION_CLICK],
  ["onMessage", import_protos12.BlockActionType.ACTION_WEBVIEW]
]);
var BlocksTransformer = class {
  constructor(getAssetsClient = () => void 0) {
    _BlocksTransformer_assetsClient.set(this, void 0);
    __classPrivateFieldSet12(this, _BlocksTransformer_assetsClient, getAssetsClient, "f");
  }
  createBlocksElementOrThrow({ type, props, children }) {
    const block = this.createBlocksElement({ type, props, children }, ROOT_STACK_TRANSFORM_CONTEXT);
    if (!block) {
      throw new Error(`Could not create block of type ${type}`);
    }
    return block;
  }
  createBlocksElement({ type, props, children }, transformContext) {
    switch (type) {
      case "blocks":
        return this.makeRoot(props, ...children);
      case "hstack":
        return this.makeHStack(props, transformContext, ...children);
      case "vstack":
        return this.makeVStack(props, transformContext, ...children);
      case "zstack":
        return this.makeZStack(props, transformContext, ...children);
      case "text":
        return this.makeText(props, transformContext, ...children);
      case "button":
        return this.makeButton(props, transformContext, ...children);
      case "image":
        return this.makeImage(props, transformContext);
      case "spacer":
        return this.makeSpacer(props, transformContext);
      case "icon":
        return this.makeIcon(props, transformContext);
      case "avatar":
        return this.makeAvatar(props, transformContext);
      case "webview":
        return this.makeWebView(props, transformContext);
      case "__fragment":
        throw new Error("root fragment is not supported - use 'blocks' instead");
    }
    return void 0;
  }
  makeRootHeight(height) {
    switch (height) {
      case "regular":
        return 320;
      case "tall":
        return 512;
    }
  }
  makeBlockPadding(padding) {
    switch (padding) {
      case "none":
        return import_protos12.BlockPadding.PADDING_NONE;
      case "xsmall":
        return import_protos12.BlockPadding.PADDING_XSMALL;
      case "small":
        return import_protos12.BlockPadding.PADDING_SMALL;
      case "medium":
        return import_protos12.BlockPadding.PADDING_MEDIUM;
      case "large":
        return import_protos12.BlockPadding.PADDING_LARGE;
    }
    return void 0;
  }
  makeBlockRadius(radius) {
    switch (radius) {
      case "none":
        return import_protos12.BlockRadius.RADIUS_NONE;
      case "small":
        return import_protos12.BlockRadius.RADIUS_SMALL;
      case "medium":
        return import_protos12.BlockRadius.RADIUS_MEDIUM;
      case "large":
        return import_protos12.BlockRadius.RADIUS_LARGE;
      case "full":
        return import_protos12.BlockRadius.RADIUS_FULL;
    }
    return void 0;
  }
  makeBlockGap(gap) {
    switch (gap) {
      case "none":
        return import_protos12.BlockGap.GAP_NONE;
      case "small":
        return import_protos12.BlockGap.GAP_SMALL;
      case "medium":
        return import_protos12.BlockGap.GAP_MEDIUM;
      case "large":
        return import_protos12.BlockGap.GAP_LARGE;
    }
    return void 0;
  }
  makeBlockAlignment(alignment) {
    if (alignment === void 0)
      return void 0;
    let vertical = void 0;
    let horizontal = void 0;
    if (alignment.includes("top")) {
      vertical = import_protos12.BlockVerticalAlignment.ALIGN_TOP;
    } else if (alignment.includes("middle")) {
      vertical = import_protos12.BlockVerticalAlignment.ALIGN_MIDDLE;
    } else if (alignment.includes("bottom")) {
      vertical = import_protos12.BlockVerticalAlignment.ALIGN_BOTTOM;
    }
    if (alignment.includes("start")) {
      horizontal = import_protos12.BlockHorizontalAlignment.ALIGN_START;
    } else if (alignment.includes("center")) {
      horizontal = import_protos12.BlockHorizontalAlignment.ALIGN_CENTER;
    } else if (alignment.includes("end")) {
      horizontal = import_protos12.BlockHorizontalAlignment.ALIGN_END;
    }
    if (vertical !== void 0 || horizontal !== void 0) {
      return {
        vertical,
        horizontal
      };
    }
    return void 0;
  }
  makeBlockBorder(borderWidth, color, lightColor, darkColor) {
    if (!borderWidth && !color)
      return void 0;
    let width = void 0;
    switch (borderWidth) {
      case "none":
        width = import_protos12.BlockBorderWidth.BORDER_WIDTH_NONE;
        break;
      case "thin":
        width = import_protos12.BlockBorderWidth.BORDER_WIDTH_THIN;
        break;
      case "thick":
        width = import_protos12.BlockBorderWidth.BORDER_WIDTH_THICK;
        break;
      default:
        width = import_protos12.BlockBorderWidth.BORDER_WIDTH_THIN;
        break;
    }
    const borderColor = color ?? "neutral-border-weak";
    const colors = this.getThemedColors(borderColor, lightColor, darkColor);
    return {
      width,
      color: colors?.light,
      colors
    };
  }
  makeBlockTextSize(textSize) {
    switch (textSize) {
      case "xsmall":
        return import_protos12.BlockTextSize.TEXT_SIZE_XSMALL;
      case "small":
        return import_protos12.BlockTextSize.TEXT_SIZE_SMALL;
      case "medium":
        return import_protos12.BlockTextSize.TEXT_SIZE_MEDIUM;
      case "large":
        return import_protos12.BlockTextSize.TEXT_SIZE_LARGE;
      case "xlarge":
        return import_protos12.BlockTextSize.TEXT_SIZE_XLARGE;
      case "xxlarge":
        return import_protos12.BlockTextSize.TEXT_SIZE_XXLARGE;
    }
    return void 0;
  }
  makeBlockTextStyle(style) {
    switch (style) {
      case "body":
        return import_protos12.BlockTextStyle.TEXT_STYLE_BODY;
      case "metadata":
        return import_protos12.BlockTextStyle.TEXT_STYLE_METADATA;
      case "heading":
        return import_protos12.BlockTextStyle.TEXT_STYLE_HEADING;
    }
    return void 0;
  }
  makeBlockTextOutline(outline) {
    switch (outline) {
      case "none":
        return import_protos12.BlockTextOutline.TEXT_OUTLINE_NONE;
      case "thin":
        return import_protos12.BlockTextOutline.TEXT_OUTLINE_THIN;
      case "thick":
        return import_protos12.BlockTextOutline.TEXT_OUTLINE_THICK;
    }
    return void 0;
  }
  makeBlockTextWeight(weight) {
    switch (weight) {
      case "regular":
        return import_protos12.BlockTextWeight.TEXT_WEIGHT_REGULAR;
      case "bold":
        return import_protos12.BlockTextWeight.TEXT_WEIGHT_BOLD;
    }
    return void 0;
  }
  makeBlockTextOverflow(overflow) {
    switch (overflow) {
      case "clip":
        return import_protos12.BlockTextOverflow.TEXT_OVERFLOW_CLIP;
      case "ellipsis":
        return import_protos12.BlockTextOverflow.TEXT_OVERFLOW_ELLIPSE;
    }
    return import_protos12.BlockTextOverflow.TEXT_OVERFLOW_ELLIPSE;
  }
  makeBlockButtonAppearance(appearance) {
    switch (appearance) {
      case "secondary":
        return import_protos12.BlockButtonAppearance.BUTTON_APPEARANCE_SECONDARY;
      case "primary":
        return import_protos12.BlockButtonAppearance.BUTTON_APPEARANCE_PRIMARY;
      case "plain":
        return import_protos12.BlockButtonAppearance.BUTTON_APPEARANCE_PLAIN;
      case "bordered":
        return import_protos12.BlockButtonAppearance.BUTTON_APPEARANCE_BORDERED;
      case "media":
        return import_protos12.BlockButtonAppearance.BUTTON_APPEARANCE_MEDIA;
      case "destructive":
        return import_protos12.BlockButtonAppearance.BUTTON_APPEARANCE_DESTRUCTIVE;
      case "caution":
        return import_protos12.BlockButtonAppearance.BUTTON_APPEARANCE_CAUTION;
      case "success":
        return import_protos12.BlockButtonAppearance.BUTTON_APPEARANCE_SUCCESS;
    }
    return void 0;
  }
  makeBlockButtonSize(size) {
    switch (size) {
      case "small":
        return import_protos12.BlockButtonSize.BUTTON_SIZE_SMALL;
      case "medium":
        return import_protos12.BlockButtonSize.BUTTON_SIZE_MEDIUM;
      case "large":
        return import_protos12.BlockButtonSize.BUTTON_SIZE_LARGE;
    }
    return void 0;
  }
  makeBlockImageResizeMode(resize) {
    switch (resize) {
      case "none":
        return import_protos12.BlockImageResizeMode.IMAGE_RESIZE_NONE;
      case "fit":
        return import_protos12.BlockImageResizeMode.IMAGE_RESIZE_FIT;
      case "fill":
        return import_protos12.BlockImageResizeMode.IMAGE_RESIZE_FILL;
      case "cover":
        return import_protos12.BlockImageResizeMode.IMAGE_RESIZE_COVER;
      case "scale-down":
        return import_protos12.BlockImageResizeMode.IMAGE_RESIZE_SCALE_DOWN;
    }
    return void 0;
  }
  makeBlockSpacerSize(size) {
    switch (size) {
      case "xsmall":
        return import_protos12.BlockSpacerSize.SPACER_XSMALL;
      case "small":
        return import_protos12.BlockSpacerSize.SPACER_SMALL;
      case "medium":
        return import_protos12.BlockSpacerSize.SPACER_MEDIUM;
      case "large":
        return import_protos12.BlockSpacerSize.SPACER_LARGE;
    }
    return void 0;
  }
  makeBlockSpacerShape(size) {
    switch (size) {
      case "invisible":
        return import_protos12.BlockSpacerShape.SPACER_INVISIBLE;
      case "thin":
        return import_protos12.BlockSpacerShape.SPACER_THIN;
      case "square":
        return import_protos12.BlockSpacerShape.SPACER_SQUARE;
    }
    return void 0;
  }
  makeBlockIconSize(size) {
    switch (size) {
      case "xsmall":
        return import_protos12.BlockIconSize.ICON_SIZE_XSMALL;
      case "small":
        return import_protos12.BlockIconSize.ICON_SIZE_SMALL;
      case "medium":
        return import_protos12.BlockIconSize.ICON_SIZE_MEDIUM;
      case "large":
        return import_protos12.BlockIconSize.ICON_SIZE_LARGE;
    }
    return void 0;
  }
  makeBlockAvatarSize(size) {
    switch (size) {
      case "xxsmall":
        return import_protos12.BlockAvatarSize.AVATAR_SIZE_XXSMALL;
      case "xsmall":
        return import_protos12.BlockAvatarSize.AVATAR_SIZE_XSMALL;
      case "small":
        return import_protos12.BlockAvatarSize.AVATAR_SIZE_SMALL;
      case "medium":
        return import_protos12.BlockAvatarSize.AVATAR_SIZE_MEDIUM;
      case "large":
        return import_protos12.BlockAvatarSize.AVATAR_SIZE_LARGE;
      case "xlarge":
        return import_protos12.BlockAvatarSize.AVATAR_SIZE_XXLARGE;
      case "xxlarge":
        return import_protos12.BlockAvatarSize.AVATAR_SIZE_XXLARGE;
      case "xxxlarge":
        return import_protos12.BlockAvatarSize.AVATAR_SIZE_XXXLARGE;
    }
    return void 0;
  }
  makeBlockAvatarFacing(facing) {
    switch (facing) {
      case "left":
        return import_protos12.BlockAvatarFacing.AVATAR_FACING_LEFT;
      case "right":
        return import_protos12.BlockAvatarFacing.AVATAR_FACING_RIGHT;
    }
    return void 0;
  }
  makeBlockAvatarBackground(background) {
    switch (background) {
      case "dark":
        return import_protos12.BlockAvatarBackground.AVATAR_BG_DARK;
      case "light":
        return import_protos12.BlockAvatarBackground.AVATAR_BG_LIGHT;
    }
    return void 0;
  }
  getDataSet(props) {
    return Object.keys(props).filter((key) => key.startsWith(DATA_PREFIX)).reduce((p, c) => {
      p[c.substring(DATA_PREFIX.length)] = props[c];
      return p;
    }, {});
  }
  makeActions(_type, props) {
    const actions = [];
    const dataSet = this.getDataSet(props);
    ACTION_HANDLERS.forEach((action) => {
      if (action in props) {
        const id = props[action];
        actions.push({
          type: ACTION_TYPES.get(action) ?? import_protos12.BlockActionType.UNRECOGNIZED,
          id: id.toString(),
          data: dataSet
        });
      }
    });
    return actions;
  }
  blockColorToHex(color, theme = "light") {
    if (!color)
      return void 0;
    color = color.toLowerCase();
    if (isHexColor(color)) {
      return color;
    } else if (isRPLColor(color)) {
      return getHexFromRPLColor(color, theme);
    } else if (isNamedHTMLColor(color)) {
      return getHexFromNamedHTMLColor(color);
    } else if (isRgbaColor(color)) {
      return getHexFromRgbaColor(color);
    } else if (isHslColor(color)) {
      return color;
    }
    console.warn(`Could not parse color: ${color}.`);
    return getHexFromNamedHTMLColor("red");
  }
  childrenToBlocks(children, transformContext) {
    return children.flatMap((child) => (typeof child !== "string" ? this.createBlocksElement(child, transformContext) : void 0) ?? []);
  }
  getThemedColors(color, light, dark) {
    let lightColor = this.blockColorToHex(light, "light");
    let darkColor = this.blockColorToHex(dark, "dark");
    const tokens = [];
    if (color && (!lightColor || !darkColor)) {
      const matches = Array.from(color?.matchAll(/[\w#-]+(?:\([\w\t ,.#-]+\))?/g) ?? []);
      tokens.push(...matches.map((group) => group[0]));
    }
    if (!lightColor) {
      lightColor = this.blockColorToHex(tokens?.at(0), "light");
    }
    if (!darkColor) {
      darkColor = this.blockColorToHex(tokens?.at(1) ?? tokens?.at(0), "dark");
    }
    return lightColor || darkColor ? {
      light: lightColor,
      dark: darkColor
    } : void 0;
  }
  parsePixels(input) {
    if (typeof input === "string") {
      return Number(input.slice(0, -2));
    }
    return input;
  }
  resolveAssetUrl(url, options) {
    return __classPrivateFieldGet12(this, _BlocksTransformer_assetsClient, "f").call(this)?.getURL(url, options) ?? url;
  }
  childrenToString(children) {
    return children.map((c) => c.toString()).join("");
  }
  makeRoot(props, ...children) {
    return this.wrapRoot(props, this.childrenToBlocks(children, ROOT_STACK_TRANSFORM_CONTEXT));
  }
  wrapRoot(props, children) {
    return this.makeBlock(import_protos12.BlockType.BLOCK_ROOT, {}, {}, {
      rootConfig: {
        children,
        height: this.makeRootHeight(Devvit.customPostType?.height ?? props?.height ?? "regular")
      }
    });
  }
  makeStackBlock(direction, props, transformContext, children) {
    const backgroundColors = this.getThemedColors(props?.backgroundColor, props?.lightBackgroundColor, props?.darkBackgroundColor);
    const alignment = this.makeBlockAlignment(props?.alignment);
    const blockSizes = makeBlockSizes(props, transformContext);
    const blockDimensionsDetails = makeStackDimensionsDetails(props, transformContext.stackParentLayout, blockSizes);
    return this.makeBlock(import_protos12.BlockType.BLOCK_STACK, props, transformContext, {
      stackConfig: {
        alignment,
        backgroundColor: backgroundColors?.light,
        backgroundColors,
        border: this.makeBlockBorder(props?.border, props?.borderColor, props?.lightBorderColor, props?.darkBorderColor),
        children: this.childrenToBlocks(children, {
          stackParentLayout: { ...blockDimensionsDetails, direction, alignment }
        }),
        cornerRadius: this.makeBlockRadius(props?.cornerRadius),
        direction,
        gap: this.makeBlockGap(props?.gap),
        padding: this.makeBlockPadding(props?.padding),
        reverse: props?.reverse
      }
    });
  }
  makeHStack(props, transformContext, ...children) {
    return this.makeStackBlock(import_protos12.BlockStackDirection.STACK_HORIZONTAL, props, transformContext, children);
  }
  makeVStack(props, transformContext, ...children) {
    return this.makeStackBlock(import_protos12.BlockStackDirection.STACK_VERTICAL, props, transformContext, children);
  }
  makeZStack(props, transformContext, ...children) {
    return this.makeStackBlock(import_protos12.BlockStackDirection.STACK_DEPTH, props, transformContext, children);
  }
  makeText(props, transformContext, ...children) {
    const colors = this.getThemedColors(props?.color, props?.lightColor, props?.darkColor);
    return this.makeBlock(import_protos12.BlockType.BLOCK_TEXT, props, transformContext, {
      textConfig: {
        alignment: this.makeBlockAlignment(props?.alignment),
        color: colors?.light,
        colors,
        outline: this.makeBlockTextOutline(props?.outline),
        size: this.makeBlockTextSize(props?.size),
        style: this.makeBlockTextStyle(props?.style),
        text: this.childrenToString(children),
        weight: this.makeBlockTextWeight(props?.weight),
        selectable: props?.selectable,
        wrap: props?.wrap,
        overflow: this.makeBlockTextOverflow(props?.overflow)
      }
    });
  }
  makeButton(props, transformContext, ...children) {
    const textColors = this.getThemedColors(props?.textColor, props?.lightTextColor, props?.darkTextColor);
    return this.makeBlock(import_protos12.BlockType.BLOCK_BUTTON, props, transformContext, {
      buttonConfig: {
        buttonAppearance: this.makeBlockButtonAppearance(props?.appearance),
        // not available in all platforms yet
        // backgroundColor: props?.backgroundColor,
        icon: props?.icon,
        buttonSize: this.makeBlockButtonSize(props?.size),
        text: this.childrenToString(children),
        textColor: textColors?.light,
        textColors,
        disabled: props?.disabled
      }
    });
  }
  makeImage(props, transformContext) {
    return props && this.makeBlock(import_protos12.BlockType.BLOCK_IMAGE, props, transformContext, {
      imageConfig: {
        description: props?.description,
        resizeMode: this.makeBlockImageResizeMode(props.resizeMode),
        url: this.resolveAssetUrl(props.url),
        width: this.parsePixels(props.imageWidth),
        height: this.parsePixels(props.imageHeight)
      }
    });
  }
  makeSpacer(props, transformContext) {
    return this.makeBlock(import_protos12.BlockType.BLOCK_SPACER, props, transformContext, {
      spacerConfig: {
        size: this.makeBlockSpacerSize(props?.size),
        shape: this.makeBlockSpacerShape(props?.shape)
      }
    });
  }
  makeIcon(props, transformContext) {
    const colors = this.getThemedColors(props?.color, props?.lightColor, props?.darkColor);
    return props && this.makeBlock(import_protos12.BlockType.BLOCK_ICON, props, transformContext, {
      iconConfig: {
        icon: props.name,
        color: colors?.light,
        colors,
        size: this.makeBlockIconSize(props.size)
      }
    });
  }
  makeAvatar(props, transformContext) {
    return props && this.makeBlock(import_protos12.BlockType.BLOCK_AVATAR, props, transformContext, {
      avatarConfig: {
        thingId: props.thingId,
        size: this.makeBlockAvatarSize(props.size),
        facing: this.makeBlockAvatarFacing(props.facing),
        background: this.makeBlockAvatarBackground(props.background)
      }
    });
  }
  makeWebView(props, transformContext) {
    return props && this.makeBlock(import_protos12.BlockType.BLOCK_WEBVIEW, props, transformContext, {
      webviewConfig: {
        url: this.resolveAssetUrl(props.url, { webView: true })
      }
    });
  }
  makeBlock(type, props, transformContext, config) {
    return {
      type,
      sizes: makeBlockSizes(props, transformContext),
      config,
      actions: (props && this.makeActions(type, props)) ?? [],
      id: props?.id,
      key: props?.key
    };
  }
  ensureRootBlock(block) {
    let root;
    if (block.type === import_protos12.BlockType.BLOCK_ROOT) {
      if (block.config?.rootConfig && Devvit.customPostType?.height) {
        block.config.rootConfig.height = this.makeRootHeight(Devvit.customPostType?.height);
      }
      root = block;
    } else {
      root = this.wrapRoot(void 0, [block]);
    }
    if (!root) {
      throw new Error("Could not create root block");
    }
    return root;
  }
};
_BlocksTransformer_assetsClient = /* @__PURE__ */ new WeakMap();

// node_modules/@devvit/public-api/devvit/internals/blocks/BlocksReconciler.js
var __classPrivateFieldGet13 = function(receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet13 = function(receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var _BlocksReconciler_instances;
var _BlocksReconciler_reset;
var _BlocksReconciler_makeContextProps;
var _BlocksReconciler_flatten;
var _BlocksReconciler_rerenderAlreadyScheduled;
function assertNotString(reified) {
  if (typeof reified === "string") {
    throw new Error("Root element cannot be a string");
  }
}
var toXML = (node) => {
  let xml = "";
  const attributes = node.props ? Object.keys(node.props).map((key) => key === "onPress" ? "" : `${key}="${node.props[key]}"`).join(" ") : "";
  xml += `<${node.type}${attributes ? " " + attributes : ""}>`;
  for (const child of node.children) {
    if (typeof child === "string") {
      xml += child;
    } else {
      xml += toXML(child);
    }
  }
  xml += `</${node.type}>`;
  return xml;
};
function getIndentation(level) {
  return "  ".repeat(level);
}
function indentXML(xml) {
  let formatted = "";
  let indentLevel = 0;
  const xmlArr = xml.split(/>\s*</);
  for (let i = 0; i < xmlArr.length; i++) {
    let node = xmlArr[i];
    if (i === 0) {
      node = node.trim();
    }
    if (i === xmlArr.length - 1) {
      node = node.trim();
    }
    const isClosingTag = node.charAt(0) === "/";
    if (isClosingTag) {
      indentLevel--;
    }
    formatted += getIndentation(indentLevel);
    if (i !== 0) {
      formatted += "<";
    }
    formatted += node;
    if (i !== xmlArr.length - 1) {
      formatted += ">\n";
    }
    if (!isClosingTag && node.indexOf("</") === -1 && node.charAt(node.length - 1) !== "/") {
      indentLevel++;
    }
  }
  return formatted;
}
var BlocksReconciler = class {
  emitEffect(_dedupeKey, effect) {
    this.effects.push(effect);
  }
  constructor(component, event, state, metadata, dimensions) {
    _BlocksReconciler_instances.add(this);
    this.renderState = {};
    this.currentComponentKey = [];
    this.currentHookIndex = 0;
    this.actions = /* @__PURE__ */ new Map();
    this.forms = /* @__PURE__ */ new Map();
    this.realtimeChannels = [];
    this.realtimeUpdated = false;
    this.pendingHooks = [];
    this.isRendering = false;
    this.transformer = new BlocksTransformer(() => this.assets);
    this.effects = [];
    _BlocksReconciler_rerenderAlreadyScheduled.set(this, false);
    this.component = component;
    this.event = event;
    this.state = {
      __renderState: {},
      ...state
    };
    this.metadata = metadata;
    if (this.state.__realtimeChannels) {
      this.realtimeChannels = this.state.__realtimeChannels;
    }
    const apiClients = makeAPIClients({
      reconciler: this,
      hooks: true,
      ui: true,
      metadata
    });
    this.cache = apiClients.cache;
    this.modLog = apiClients.modLog;
    this.reddit = apiClients.reddit;
    this.kvStore = apiClients.kvStore;
    this.redis = apiClients.redis;
    this.settings = apiClients.settings;
    this.scheduler = apiClients.scheduler;
    this.media = apiClients.media;
    this.assets = apiClients.assets;
    this.realtime = apiClients.realtime;
    this.dimensions = dimensions;
    this.ui = apiClients.ui;
    this.hooks = {
      useState: apiClients.useState,
      useInterval: apiClients.useInterval,
      useForm: apiClients.useForm,
      useChannel: apiClients.useChannel
    };
  }
  async render() {
    await this.reconcile();
    this.isRendering = true;
    const results = await this.buildBlocksUI();
    this.isRendering = false;
    return results;
  }
  makeUniqueActionID(id) {
    let uniqueId = id;
    let counter = 1;
    while (this.actions.has(uniqueId)) {
      uniqueId = `${id}.${counter++}`;
    }
    return uniqueId;
  }
  async reconcile() {
    const ctx = __classPrivateFieldGet13(this, _BlocksReconciler_instances, "m", _BlocksReconciler_makeContextProps).call(this);
    const blockElement = {
      type: this.component,
      props: ctx,
      children: []
    };
    const reified = await this.processBlock(blockElement);
    assertNotString(reified);
    this.transformer.createBlocksElementOrThrow(reified);
    if (this.isUserActionRender && this.blockRenderEventId) {
      const handler = this.actions.get(this.blockRenderEventId);
      if (handler) {
        await handler(this.event.data);
      }
    }
    for (const hook of this.pendingHooks) {
      await hook();
    }
    this.buildNextState();
    __classPrivateFieldGet13(this, _BlocksReconciler_instances, "m", _BlocksReconciler_reset).call(this);
  }
  async buildBlocksUI() {
    const ctx = __classPrivateFieldGet13(this, _BlocksReconciler_instances, "m", _BlocksReconciler_makeContextProps).call(this);
    const rootBlockElement = {
      type: this.component,
      props: ctx,
      children: []
    };
    const block = await this.renderElement(ctx, rootBlockElement);
    return this.transformer.ensureRootBlock(block);
  }
  async renderElement(ctx, element) {
    const reified = await this.processBlock(element);
    assertNotString(reified);
    if (Devvit.debug.emitSnapshots || ctx.debug.emitSnapshots)
      console.debug(indentXML(toXML(reified)));
    if (Devvit.debug.emitState || ctx.debug.emitState)
      console.debug(JSON.stringify(this.state, void 0, 2));
    return this.transformer.createBlocksElementOrThrow(reified);
  }
  async processProps(block) {
    const props = block.props ?? {};
    const actionHandlers = ["onPress", "onMessage"];
    for (const action of actionHandlers) {
      if (action in props) {
        const handler = props[action];
        const name = handler?.name;
        const id = this.makeUniqueActionID(`${block.type}.${name ?? action}`);
        this.actions.set(id, handler);
        props[action] = id;
      }
    }
  }
  async processBlock(element, idGenerator = makeUniqueIdGenerator(), path = []) {
    const blockElement = element;
    if (typeof blockElement.type === "string") {
      const childrens = [];
      for (let i = 0; i < blockElement.children.length; i++) {
        const child = blockElement.children[i];
        if (child === void 0 || child === null)
          continue;
        childrens.push(await this.processBlock(child, idGenerator, [
          ...path,
          `${blockElement.type}.${i}`
        ]));
      }
      const children2 = childrens.flat();
      const collapsedChildren = __classPrivateFieldGet13(this, _BlocksReconciler_instances, "m", _BlocksReconciler_flatten).call(this, children2);
      await this.processProps(blockElement);
      const reified = {
        type: blockElement.type,
        props: blockElement.props,
        children: collapsedChildren
      };
      return reified;
    }
    if (typeof blockElement.type === "function") {
      const componentKey = idGenerator(`${path.length ? path.join(".") : "root"}.${blockElement.type.name.length ? blockElement.type.name : "anonymous"}`);
      this.currentComponentKey.push(componentKey);
      if (!this.renderState[componentKey]) {
        this.renderState[componentKey] = {};
      }
      const children2 = blockElement.children.flatMap((c) => c);
      const props = {
        ...__classPrivateFieldGet13(this, _BlocksReconciler_instances, "m", _BlocksReconciler_makeContextProps).call(this),
        ...blockElement.props,
        children: children2
      };
      let result;
      while (result === void 0) {
        try {
          result = await blockElement.type(props, __classPrivateFieldGet13(this, _BlocksReconciler_instances, "m", _BlocksReconciler_makeContextProps).call(this));
        } catch (promiseOrError) {
          if (promiseOrError instanceof Promise) {
            result = await promiseOrError;
          } else {
            throw promiseOrError;
          }
        }
      }
      if (!this.isInitialRender) {
        const previousState = this.getPreviousComponentState();
        const prevHookCount = Object.keys(previousState).length;
        if (prevHookCount !== this.currentHookIndex) {
          throw new Error("Invalid hook call. Hooks can only be called at the top-level of a function component. Make sure that you are not calling hooks inside loops, conditions, or nested functions.");
        }
      }
      this.currentComponentKey.pop();
      this.currentHookIndex = 0;
      if (typeof result === "object") {
        return this.processBlock(result, idGenerator, [...path, blockElement.type.name]);
      }
    }
    if (typeof blockElement === "string") {
      return blockElement;
    }
    if (typeof blockElement === "number") {
      return `${blockElement}`;
    }
    let children = [];
    let pathPrefix = "";
    if (Array.isArray(blockElement)) {
      children = blockElement;
    } else if (typeof blockElement.type === "undefined" && blockElement.children) {
      children = blockElement.children;
      pathPrefix = "fragmentChild.";
    }
    return {
      type: "__fragment",
      props: void 0,
      children: await Promise.all(children.flatMap(async (child, i) => await this.processBlock(child, idGenerator, [...path, `${pathPrefix}${i}`])))
    };
  }
  getCurrentComponentKey() {
    if (!this.currentComponentKey.at(-1)) {
      throw new Error("Current component key is missing");
    }
    return this.currentComponentKey;
  }
  getCurrentComponentState() {
    const componentKey = this.currentComponentKey.at(-1);
    if (!componentKey) {
      throw new Error("Current component key is missing");
    }
    return this.renderState[componentKey];
  }
  getPreviousComponentState() {
    const componentKey = this.currentComponentKey.at(-1);
    if (!componentKey) {
      throw new Error("Current component key is missing");
    }
    if (!this.state.__renderState[componentKey]) {
      this.state.__renderState[componentKey] = {};
    }
    return this.state.__renderState[componentKey];
  }
  get isInitialRender() {
    if (!this.event) {
      return false;
    }
    return this.event.type === import_protos13.BlockRenderEventType.RENDER_INITIAL;
  }
  get isUserActionRender() {
    if (!this.event) {
      return false;
    }
    return this.event.type === import_protos13.BlockRenderEventType.RENDER_USER_ACTION;
  }
  get isEffectRender() {
    if (!this.event) {
      return false;
    }
    return this.event.type === import_protos13.BlockRenderEventType.RENDER_EFFECT_EVENT;
  }
  get formSubmittedEvent() {
    if (!this.event) {
      return false;
    }
    return this.event.formSubmitted;
  }
  get blockRenderEventId() {
    if (!this.event) {
      return false;
    }
    return this.event.id;
  }
  get realtimeEvent() {
    if (!this.event) {
      return false;
    }
    const realtimeEvent = this.event.realtimeEvent;
    if (!realtimeEvent?.event?.channel) {
      return false;
    }
    return realtimeEvent;
  }
  runHook(hook) {
    this.pendingHooks.push(hook);
  }
  rerenderIn(delayMs) {
    if (__classPrivateFieldGet13(this, _BlocksReconciler_rerenderAlreadyScheduled, "f")) {
      return;
    }
    __classPrivateFieldSet13(this, _BlocksReconciler_rerenderAlreadyScheduled, true, "f");
    this.effects.push({
      type: import_protos13.EffectType.EFFECT_RERENDER_UI,
      rerenderUi: {
        delaySeconds: delayMs / 1e3
      }
    });
  }
  addRealtimeChannel(channel) {
    this.realtimeChannels.push(channel);
    this.realtimeUpdated = true;
  }
  removeRealtimeChannel(channel) {
    this.realtimeChannels = this.realtimeChannels.filter((c) => c !== channel);
    this.realtimeUpdated = true;
  }
  get realtimeEffect() {
    if (this.realtimeUpdated && this.realtimeChannels.length > 0) {
      return [
        {
          type: import_protos13.EffectType.EFFECT_REALTIME_SUB,
          realtimeSubscriptions: {
            subscriptionIds: this.realtimeChannels
          }
        }
      ];
    } else {
      return [];
    }
  }
  getEffects() {
    return [...getEffectsFromUIClient(this.ui), ...this.effects, ...this.realtimeEffect];
  }
  buildNextState() {
    for (const key of Object.keys(this.renderState)) {
      this.renderState[key] = Object.values(this.renderState[key]);
    }
    this.state = {
      __postData: this.state.__postData,
      __renderState: this.renderState,
      __cache: this.state.__cache,
      ...this.realtimeChannels.length > 0 ? { __realtimeChannels: this.realtimeChannels } : {}
    };
  }
};
_BlocksReconciler_rerenderAlreadyScheduled = /* @__PURE__ */ new WeakMap(), _BlocksReconciler_instances = /* @__PURE__ */ new WeakSet(), _BlocksReconciler_reset = function _BlocksReconciler_reset2() {
  this.actions.clear();
  this.currentComponentKey = [];
  this.currentHookIndex = 0;
  this.pendingHooks = [];
  this.realtimeChannels = [];
  this.realtimeUpdated = false;
}, _BlocksReconciler_makeContextProps = function _BlocksReconciler_makeContextProps2() {
  const props = {
    ...getContextFromMetadata(this.metadata, this.state.__postData?.thingId),
    modLog: this.modLog,
    reddit: this.reddit,
    cache: this.cache,
    kvStore: this.kvStore,
    redis: this.redis,
    settings: this.settings,
    scheduler: this.scheduler,
    media: this.media,
    assets: this.assets,
    realtime: this.realtime,
    ui: this.ui,
    dimensions: this.dimensions,
    uiEnvironment: {
      timezone: this.metadata[Header.Timezone]?.values[0],
      locale: this.metadata[Header.Language]?.values[0],
      dimensions: this.dimensions
    },
    ...this.hooks
  };
  props.debug.effects = this;
  return props;
}, _BlocksReconciler_flatten = function _BlocksReconciler_flatten2(arr) {
  const out = [];
  for (const child of arr) {
    if (typeof child === "string") {
      out.push(child);
    } else if (child.type === "__fragment") {
      out.push(...__classPrivateFieldGet13(this, _BlocksReconciler_instances, "m", _BlocksReconciler_flatten2).call(this, child.children));
    } else {
      out.push(child);
    }
  }
  return out;
};

// node_modules/@devvit/public-api/devvit/internals/custom-post.js
async function renderPost(req, metadata) {
  const customPostType = Devvit.customPostType;
  if (!customPostType) {
    throw new Error("Custom post type not registered");
  }
  const reconciler = new BlocksReconciler((_props, context) => customPostType.render(context), req.blocks, req.state, metadata, req.dimensions);
  const blocksUI = await reconciler.render();
  return import_protos14.RenderPostResponse.fromJSON({
    state: reconciler.state,
    blocks: {
      ui: blocksUI
    },
    effects: reconciler.getEffects()
  });
}
function registerCustomPost(config) {
  config.provides(import_protos14.CustomPostDefinition);
  extendDevvitPrototype("RenderPost", renderPost);
}

// node_modules/@devvit/public-api/devvit/internals/installation-settings.js
var import_protos15 = require("@devvit/protos");
async function onGetSettingsFields2() {
  if (!Devvit.installationSettings) {
    throw new Error("Installation settings were not defined.");
  }
  return import_protos15.GetFieldsResponse.fromJSON({
    fields: {
      fields: transformFormFields(Devvit.installationSettings)
    }
  });
}
async function onValidateForm2(req, metadata) {
  return onValidateFormHelper(req, Devvit.installationSettings, metadata);
}
function registerInstallationSettings(config) {
  config.provides(import_protos15.InstallationSettingsDefinition);
  extendDevvitPrototype("GetSettingsFields", onGetSettingsFields2);
  extendDevvitPrototype("ValidateForm", onValidateForm2);
}

// node_modules/@devvit/public-api/devvit/internals/menu-items.js
var import_protos16 = require("@devvit/protos");

// node_modules/@devvit/public-api/devvit/internals/csrf.js
function getUserHeader(context) {
  const userHeader = context.debug.metadata[Header.User].values[0];
  if (!userHeader) {
    throw new Error("User missing from context");
  }
  return userHeader;
}
function getSubredditHeader(context) {
  const subredditHeader = context.debug.metadata[Header.Subreddit].values[0];
  if (!subredditHeader) {
    throw new Error("Subreddit missing from context");
  }
  return subredditHeader;
}
async function addCSRFTokenToContext(context, req) {
  const userHeader = getUserHeader(context);
  const subredditHeader = getSubredditHeader(context);
  if (!userHeader || !subredditHeader) {
    throw new Error("User or subreddit missing from context");
  }
  const commentId = req.comment?.id && `t1_${req.comment.id}`;
  const postId = req.post?.id && `t3_${req.post.id}`;
  const subredditId = req.subreddit?.id && `t5_${req.subreddit.id}`;
  const targetId = commentId || postId || subredditId;
  if (!targetId) {
    throw new Error("targetId is missing from ContextActionRequest");
  }
  if (commentId) {
    const comment = await context.reddit.getCommentById(commentId);
    if (!comment) {
      throw new Error(`Comment ${commentId} not found`);
    }
    if (comment.subredditId !== subredditHeader) {
      throw new Error(`Comment does not belong to the subreddit`);
    }
  }
  if (postId) {
    const post = await context.reddit.getPostById(postId);
    if (!post) {
      throw new Error(`Post ${postId} not found`);
    }
    if (post.subredditId !== subredditHeader) {
      throw new Error(`Post does not belong to the subreddit`);
    }
  }
  if (subredditId && subredditId !== subredditHeader) {
    throw new Error(`Subreddit ${subredditId} ${subredditHeader} not found`);
  }
  const thisItem = getMenuItemById(req.actionId);
  if (!thisItem) {
    throw new Error("Action not found");
  }
  const needsModCheck = !!thisItem.forUserType?.includes("moderator");
  if (needsModCheck && !isModerator(context)) {
    throw new Error("User is not a moderator");
  }
  const val = {
    needsModCheck
  };
  await context.redis.set(`${userHeader}${subredditHeader}${targetId}${req.actionId}`, JSON.stringify(val));
  await context.redis.expire(`${userHeader}${subredditHeader}${targetId}${req.actionId}`, 600);
  console.debug("CSRF token added: " + JSON.stringify(val));
}
async function isModerator(context) {
  const userHeader = getUserHeader(context);
  const subredditHeader = getSubredditHeader(context);
  const subreddit = await context.reddit.getSubredditInfoById(subredditHeader);
  const mods = await context.reddit.getModerators({ subredditName: subreddit.name }).all();
  return !!mods.find((mod) => mod.id === userHeader);
}
async function validateCSRFToken(context, req) {
  const userHeader = getUserHeader(context);
  const subredditHeader = getSubredditHeader(context);
  const { actionId, thingId } = req.state?.__contextAction ?? {};
  const csrfData = await context.redis.get(`${userHeader}${subredditHeader}${thingId}${actionId}`);
  if (!csrfData) {
    throw new Error("CSRF token not found");
  }
  const csrf = JSON.parse(csrfData);
  if (csrf.needsModCheck && !await isModerator(context)) {
    throw new Error("User is not a moderator: " + userHeader + "; " + subredditHeader);
  }
  console.debug("CSRF token validated: " + csrfData);
}

// node_modules/@devvit/public-api/devvit/internals/menu-items.js
var getActionId = (index) => {
  return `menuItem.${index}`;
};
function getMenuItemById(id) {
  return Devvit.menuItems.find((_, index) => getActionId(index) === id);
}
async function getActions(_, _metadata) {
  const menuItems = Devvit.menuItems;
  if (!menuItems.length) {
    throw new Error("No menu items registered.");
  }
  const actions = menuItems.map((item, index) => {
    return {
      actionId: getActionId(index),
      name: item.label,
      description: item.description,
      contexts: {
        subreddit: item.location.includes("subreddit"),
        post: item.location.includes("post"),
        comment: item.location.includes("comment")
      },
      users: {
        loggedOut: item.forUserType?.includes("loggedOut"),
        moderator: item.forUserType?.includes("moderator")
      },
      postFilters: item.postFilter === "currentApp" ? { currentApp: true } : void 0
    };
  });
  return import_protos16.ContextActionList.fromJSON({ actions });
}
async function onAction(req, metadata) {
  const menuItem = getMenuItemById(req.actionId);
  if (!menuItem) {
    throw new Error(`MenuItem ${req.actionId} not found`);
  }
  const commentId = req.comment?.id && `t1_${req.comment.id}`;
  const postId = req.post?.id && `t3_${req.post.id}`;
  const subredditId = req.subreddit?.id && `t5_${req.subreddit.id}`;
  const targetId = commentId || postId || subredditId;
  assertNonNull(targetId, "targetId is missing from ContextActionRequest");
  const event = {
    targetId,
    location: req.comment ? "comment" : req.post ? "post" : "subreddit"
  };
  const context = Object.assign(makeAPIClients({
    ui: true,
    metadata
  }), getContextFromMetadata(metadata, postId, commentId), {
    uiEnvironment: {
      timezone: metadata[Header.Timezone]?.values[0],
      locale: metadata[Header.Language]?.values[0]
    }
  });
  await addCSRFTokenToContext(context, req);
  await menuItem.onPress(event, context);
  return import_protos16.ContextActionResponse.fromJSON({
    effects: getEffectsFromUIClient(context.ui)
  });
}
function registerMenuItems(config) {
  config.provides(import_protos16.ContextActionDefinition);
  extendDevvitPrototype("GetActions", getActions);
  extendDevvitPrototype("OnAction", onAction);
}

// node_modules/@devvit/public-api/devvit/internals/plugins.js
function pluginIsEnabled(settings) {
  if (!settings) {
    return false;
  }
  if (settings === true) {
    return true;
  }
  return settings.enabled;
}

// node_modules/@devvit/public-api/devvit/internals/scheduler.js
var import_protos17 = require("@devvit/protos");
async function handleScheduledAction(args, metadata) {
  const jobName = args.type;
  const scheduledJobHandler = Devvit.scheduledJobHandlers.get(jobName);
  if (!scheduledJobHandler) {
    throw new Error(`Job ${jobName} not found`);
  }
  const event = {
    name: jobName,
    data: args.data
  };
  const context = Object.assign(makeAPIClients({
    metadata
  }), getContextFromMetadata(metadata));
  await scheduledJobHandler(event, context);
}
function registerScheduler(config) {
  config.provides(import_protos17.SchedulerHandlerDefinition);
  extendDevvitPrototype("HandleScheduledAction", handleScheduledAction);
}

// node_modules/@devvit/public-api/devvit/internals/triggers.js
var import_protos18 = require("@devvit/protos");

// node_modules/@devvit/shared-types/StringUtil.js
var StringUtil;
(function(StringUtil2) {
  function ellipsize(str, limit) {
    return str.length <= limit ? str : `${str.slice(0, limit - 1)}\u2026`;
  }
  StringUtil2.ellipsize = ellipsize;
  function capitalize(str) {
    if (str[0] == null)
      return str;
    return `${str[0].toLocaleUpperCase()}${str.slice(1)}`;
  }
  StringUtil2.capitalize = capitalize;
  function isBlank(str) {
    return str == null || /^\s*$/.test(str);
  }
  StringUtil2.isBlank = isBlank;
  function caughtToString(val, preferredErrorProperty = "stack") {
    return val instanceof Error ? `${val[preferredErrorProperty] || val.stack || val.message || val.name}` : String(val);
  }
  StringUtil2.caughtToString = caughtToString;
  function caughtToStringUntyped(val, preferredErrorProperty = "stack") {
    return val instanceof Error ? (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      `${val[preferredErrorProperty] || val.stack || val.message || val.name}`
    ) : String(val);
  }
  StringUtil2.caughtToStringUntyped = caughtToStringUntyped;
})(StringUtil || (StringUtil = {}));

// node_modules/@devvit/public-api/devvit/internals/triggers.js
function createCombinedHandler(eventType, handlers) {
  assertNonNull(handlers);
  return async (arg, metadata) => {
    const event = {
      ...arg,
      type: eventType
    };
    const context = Object.assign(makeAPIClients({
      metadata
    }), getContextFromMetadata(metadata));
    const results = await Promise.allSettled(handlers.map((fn) => fn(event, context)));
    const errResult = joinSettledErrors(results);
    if (errResult)
      throw errResult.err;
    return {};
  };
}
function registerTriggers(config) {
  for (const event of Devvit.triggerOnEventHandlers.keys()) {
    switch (event) {
      case "PostSubmit":
        config.provides(import_protos18.OnPostSubmitDefinition);
        extendDevvitPrototype("OnPostSubmit", createCombinedHandler("PostSubmit", Devvit.triggerOnEventHandlers.get(event)));
        break;
      case "PostCreate":
        config.provides(import_protos18.OnPostCreateDefinition);
        extendDevvitPrototype("OnPostCreate", createCombinedHandler("PostCreate", Devvit.triggerOnEventHandlers.get(event)));
        break;
      case "PostUpdate":
        config.provides(import_protos18.OnPostUpdateDefinition);
        extendDevvitPrototype("OnPostUpdate", createCombinedHandler("PostUpdate", Devvit.triggerOnEventHandlers.get(event)));
        break;
      case "PostReport":
        config.provides(import_protos18.OnPostReportDefinition);
        extendDevvitPrototype("OnPostReport", createCombinedHandler("PostReport", Devvit.triggerOnEventHandlers.get(event)));
        break;
      case "PostDelete":
        config.provides(import_protos18.OnPostDeleteDefinition);
        extendDevvitPrototype("OnPostDelete", createCombinedHandler("PostDelete", Devvit.triggerOnEventHandlers.get(event)));
        break;
      case "PostFlairUpdate":
        config.provides(import_protos18.OnPostFlairUpdateDefinition);
        extendDevvitPrototype("OnPostFlairUpdate", createCombinedHandler("PostFlairUpdate", Devvit.triggerOnEventHandlers.get(event)));
        break;
      case "CommentSubmit":
        config.provides(import_protos18.OnCommentSubmitDefinition);
        extendDevvitPrototype("OnCommentSubmit", createCombinedHandler("CommentSubmit", Devvit.triggerOnEventHandlers.get(event)));
        break;
      case "CommentCreate":
        config.provides(import_protos18.OnCommentCreateDefinition);
        extendDevvitPrototype("OnCommentCreate", createCombinedHandler("CommentCreate", Devvit.triggerOnEventHandlers.get(event)));
        break;
      case "CommentUpdate":
        config.provides(import_protos18.OnCommentUpdateDefinition);
        extendDevvitPrototype("OnCommentUpdate", createCombinedHandler("CommentUpdate", Devvit.triggerOnEventHandlers.get(event)));
        break;
      case "CommentReport":
        config.provides(import_protos18.OnCommentReportDefinition);
        extendDevvitPrototype("OnCommentReport", createCombinedHandler("CommentReport", Devvit.triggerOnEventHandlers.get(event)));
        break;
      case "CommentDelete":
        config.provides(import_protos18.OnCommentDeleteDefinition);
        extendDevvitPrototype("OnCommentDelete", createCombinedHandler("CommentDelete", Devvit.triggerOnEventHandlers.get(event)));
        break;
      case "AppInstall":
        config.provides(import_protos18.OnAppInstallDefinition);
        extendDevvitPrototype("OnAppInstall", createCombinedHandler("AppInstall", Devvit.triggerOnEventHandlers.get(event)));
        break;
      case "AppUpgrade":
        config.provides(import_protos18.OnAppUpgradeDefinition);
        extendDevvitPrototype("OnAppUpgrade", createCombinedHandler("AppUpgrade", Devvit.triggerOnEventHandlers.get(event)));
        break;
      case "ModAction":
        config.provides(import_protos18.OnModActionDefinition);
        extendDevvitPrototype("OnModAction", createCombinedHandler("ModAction", Devvit.triggerOnEventHandlers.get(event)));
        break;
      case "ModMail":
        config.provides(import_protos18.OnModMailDefinition);
        extendDevvitPrototype("OnModMail", createCombinedHandler("ModMail", Devvit.triggerOnEventHandlers.get(event)));
        break;
      case "PostNsfwUpdate":
        config.provides(import_protos18.OnPostNsfwUpdateDefinition);
        extendDevvitPrototype("OnPostNsfwUpdate", createCombinedHandler("PostNsfwUpdate", Devvit.triggerOnEventHandlers.get(event)));
        break;
      case "PostSpoilerUpdate":
        config.provides(import_protos18.OnPostSpoilerUpdateDefinition);
        extendDevvitPrototype("OnPostSpoilerUpdate", createCombinedHandler("PostSpoilerUpdate", Devvit.triggerOnEventHandlers.get(event)));
        break;
      case "AutomoderatorFilterPost":
        config.provides(import_protos18.OnAutomoderatorFilterPostDefinition);
        extendDevvitPrototype("OnAutomoderatorFilterPost", createCombinedHandler("AutomoderatorFilterPost", Devvit.triggerOnEventHandlers.get(event)));
        break;
      case "AutomoderatorFilterComment":
        config.provides(import_protos18.OnAutomoderatorFilterCommentDefinition);
        extendDevvitPrototype("OnAutomoderatorFilterComment", createCombinedHandler("AutomoderatorFilterComment", Devvit.triggerOnEventHandlers.get(event)));
        break;
      default:
        throw new Error(`Unknown trigger event: ${event}`);
    }
  }
}
function joinSettledErrors(results) {
  const errs = results.reduce((sum, result) => result.status === "rejected" ? [...sum, result.reason] : sum, []);
  if (errs.length === 0)
    return;
  if (errs.length === 1)
    return { err: errs[0] };
  return { err: new Error(errs.map((err) => StringUtil.caughtToString(err)).join("\n")) };
}

// node_modules/@devvit/public-api/devvit/internals/ui-event-handler.js
var import_protos19 = require("@devvit/protos");
var import_clone_deep = __toESM(require_clone_deep(), 1);

// node_modules/moderndash/dist/index.js
function isPlainObject(value) {
  return value?.constructor === Object;
}
function isEqual(a, b) {
  if (Object.is(a, b)) return true;
  if (typeof a !== typeof b) return false;
  if (Array.isArray(a) && Array.isArray(b))
    return isSameArray(a, b);
  if (a instanceof Date && b instanceof Date)
    return a.getTime() === b.getTime();
  if (a instanceof RegExp && b instanceof RegExp)
    return a.toString() === b.toString();
  if (isPlainObject(a) && isPlainObject(b))
    return isSameObject(a, b);
  if (a instanceof ArrayBuffer && b instanceof ArrayBuffer)
    return dataViewsAreEqual(new DataView(a), new DataView(b));
  if (a instanceof DataView && b instanceof DataView)
    return dataViewsAreEqual(a, b);
  if (isTypedArray(a) && isTypedArray(b)) {
    if (a.byteLength !== b.byteLength) return false;
    return isSameArray(a, b);
  }
  return false;
}
function isSameObject(a, b) {
  const keys1 = Object.keys(a);
  const keys2 = Object.keys(b);
  if (!isEqual(keys1, keys2)) return false;
  for (const key of keys1) {
    if (!isEqual(a[key], b[key])) return false;
  }
  return true;
}
function isSameArray(a, b) {
  if (a.length !== b.length) return false;
  return a.every((element, index) => isEqual(element, b[index]));
}
function dataViewsAreEqual(a, b) {
  if (a.byteLength !== b.byteLength) return false;
  for (let offset = 0; offset < a.byteLength; offset++) {
    if (a.getUint8(offset) !== b.getUint8(offset)) return false;
  }
  return true;
}
function isTypedArray(value) {
  return ArrayBuffer.isView(value) && !(value instanceof DataView);
}

// node_modules/@devvit/public-api/devvit/internals/ui-event-handler.js
async function handleUIEvent(req, metadata) {
  const originalState = req.state ?? {};
  const state = (0, import_clone_deep.default)(originalState);
  const apiClients = makeAPIClients({
    ui: true,
    metadata
  });
  if (req.event?.formSubmitted && req.event.formSubmitted.formId) {
    const formKey = req.event.formSubmitted.formId;
    if (formKey.includes("form.hook.")) {
      if (Devvit.customPostType) {
        const blocksReconciler = new BlocksReconciler((_props, context2) => Devvit.customPostType?.render(context2) ?? null, req.event, req.state, metadata, void 0);
        await blocksReconciler.reconcile();
        return import_protos19.HandleUIEventResponse.fromJSON({
          state: blocksReconciler.state,
          effects: blocksReconciler.getEffects()
        });
      }
    }
    const formDefinition = Devvit.formDefinitions.get(formKey);
    if (!formDefinition) {
      throw new Error(`Form with key ${formKey} not found`);
    }
    let postId;
    let commentId;
    if (state.__contextAction) {
      const { actionId, thingId } = state.__contextAction;
      const menuItem = getMenuItemById(actionId);
      if (menuItem?.location === "post") {
        postId = thingId;
      } else if (menuItem?.location === "comment") {
        commentId = thingId;
      }
    }
    const context = Object.assign(apiClients, getContextFromMetadata(metadata, postId, commentId), {
      uiEnvironment: {
        timezone: metadata[Header.Timezone]?.values[0],
        locale: metadata[Header.Language]?.values[0]
      }
    });
    await validateCSRFToken(context, req);
    await formDefinition.onSubmit({
      values: getFormValues(req.event.formSubmitted.results)
    }, context);
  } else if (req.event?.realtimeEvent) {
    if (Devvit.customPostType) {
      const blocksReconciler = new BlocksReconciler((_props, context) => Devvit.customPostType?.render(context) ?? null, req.event, req.state, metadata, void 0);
      await blocksReconciler.reconcile();
      return import_protos19.HandleUIEventResponse.fromJSON({
        state: blocksReconciler.state,
        effects: blocksReconciler.getEffects()
      });
    }
  } else if (req.event?.toastAction) {
    throw new Error("Toast actions not yet implemented");
  }
  const stateWasUpdated = !isEqual(originalState, state);
  const uiEffects = getEffectsFromUIClient(apiClients.ui);
  const effects = stateWasUpdated ? [
    ...uiEffects,
    {
      type: import_protos19.EffectType.EFFECT_RERENDER_UI,
      rerenderUi: {
        delaySeconds: 0
      }
    }
  ] : uiEffects;
  return import_protos19.HandleUIEventResponse.fromJSON({
    state,
    effects
  });
}
function registerUIEventHandler(config) {
  config.provides(import_protos19.UIEventHandlerDefinition);
  extendDevvitPrototype("HandleUIEvent", handleUIEvent);
}

// node_modules/@devvit/public-api/devvit/internals/ui-request-handler.js
var import_protos26 = require("@devvit/protos");

// node_modules/@devvit/public-api/devvit/internals/blocks/handler/BlocksHandler.js
var import_protos25 = require("@devvit/protos");

// node_modules/@devvit/shared-types/CircuitBreaker.js
var CIRCUIT_BREAKER_MSG = "ServerCallRequired";
function isCircuitBreaker(err) {
  return err?.message === CIRCUIT_BREAKER_MSG;
}

// node_modules/@devvit/public-api/devvit/internals/blocks/handler/promise_cache.js
var __classPrivateFieldSet14 = function(receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet14 = function(receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _PromiseCache_instances2;
var _PromiseCache_redis2;
var _PromiseCache_localCache2;
var _PromiseCache_clock2;
var _PromiseCache_state2;
var _PromiseCache_localCachedAnswer3;
var _PromiseCache_maybeRefreshCache3;
var _PromiseCache_refreshCache3;
var _PromiseCache_pollForCache3;
var _PromiseCache_updateCache3;
var _PromiseCache_calculateRamp3;
var _PromiseCache_redisEntry3;
var _PromiseCache_enforceTTL3;
var SystemClock2 = {
  now() {
    return /* @__PURE__ */ new Date();
  }
};
function _namespaced2(key) {
  return `__autocache__${key}`;
}
function _lock2(key) {
  return `__lock__${key}`;
}
var pollEvery2 = 300;
var maxPollingTimeout2 = 1e3;
var minTtlValue2 = 5e3;
var retryLimit2 = 3;
var errorRetryProbability2 = 0.1;
var clientRetryDelay2 = 1e3;
var allowStaleFor2 = 3e4;
function _unwrap2(entry) {
  if (entry.error) {
    throw new Error(entry.error);
  }
  return entry.value;
}
var PromiseCache2 = class {
  constructor(redis, state, clock = SystemClock2) {
    _PromiseCache_instances2.add(this);
    _PromiseCache_redis2.set(this, void 0);
    _PromiseCache_localCache2.set(this, {});
    _PromiseCache_clock2.set(this, void 0);
    _PromiseCache_state2.set(this, void 0);
    __classPrivateFieldSet14(this, _PromiseCache_redis2, redis, "f");
    __classPrivateFieldSet14(this, _PromiseCache_state2, state, "f");
    __classPrivateFieldSet14(this, _PromiseCache_clock2, clock, "f");
  }
  /**
   * This is the public API for the cache.  Call this method to cache a promise.
   *
   * @param closure
   * @param options
   * @returns
   */
  async cache(closure, options) {
    var _a6;
    (_a6 = __classPrivateFieldGet14(this, _PromiseCache_state2, "f")).__cache ?? (_a6.__cache = {});
    __classPrivateFieldSet14(this, _PromiseCache_localCache2, __classPrivateFieldGet14(this, _PromiseCache_state2, "f").__cache, "f");
    __classPrivateFieldGet14(this, _PromiseCache_instances2, "m", _PromiseCache_enforceTTL3).call(this, options);
    const localCachedAnswer = __classPrivateFieldGet14(this, _PromiseCache_instances2, "m", _PromiseCache_localCachedAnswer3).call(this, options.key);
    if (localCachedAnswer !== void 0) {
      return localCachedAnswer;
    }
    const existing = await __classPrivateFieldGet14(this, _PromiseCache_instances2, "m", _PromiseCache_redisEntry3).call(this, options.key);
    const entry = await __classPrivateFieldGet14(this, _PromiseCache_instances2, "m", _PromiseCache_maybeRefreshCache3).call(this, options, existing, closure);
    return _unwrap2(entry);
  }
};
_PromiseCache_redis2 = /* @__PURE__ */ new WeakMap(), _PromiseCache_localCache2 = /* @__PURE__ */ new WeakMap(), _PromiseCache_clock2 = /* @__PURE__ */ new WeakMap(), _PromiseCache_state2 = /* @__PURE__ */ new WeakMap(), _PromiseCache_instances2 = /* @__PURE__ */ new WeakSet(), _PromiseCache_localCachedAnswer3 = function _PromiseCache_localCachedAnswer4(key) {
  const val = __classPrivateFieldGet14(this, _PromiseCache_localCache2, "f")[key];
  if (val) {
    const now = __classPrivateFieldGet14(this, _PromiseCache_clock2, "f").now().getTime();
    const hasRetryableError = val?.error && val?.errorTime && val.errorCount < retryLimit2 && Math.random() < errorRetryProbability2 && val.errorTime + clientRetryDelay2 < now;
    const expired = val?.expires && val.expires < now && val.checkedAt + clientRetryDelay2 < now;
    if (expired || hasRetryableError) {
      delete __classPrivateFieldGet14(this, _PromiseCache_localCache2, "f")[key];
      return void 0;
    } else {
      return _unwrap2(val);
    }
  }
  return void 0;
}, _PromiseCache_maybeRefreshCache3 = /**
 * If we've bothered to check redis, we're already on the backend.  Let's see if the cache either (1) contains an error, (2)
 * is expired, (3) is missing, or (4) is about to expire.  If any of these are true, we'll refresh the cache based on heuristics.
 *
 * We'll always refresh if missing or expired, but its probabilistic if we'll refresh if about to expire or if we have an error.
 */
async function _PromiseCache_maybeRefreshCache4(options, entry, closure) {
  const expires = entry?.expires;
  const rampProbability = expires ? __classPrivateFieldGet14(this, _PromiseCache_instances2, "m", _PromiseCache_calculateRamp3).call(this, expires) : 1;
  if (!entry || entry?.error && entry.errorCount < retryLimit2 && errorRetryProbability2 > Math.random() || rampProbability > Math.random()) {
    return __classPrivateFieldGet14(this, _PromiseCache_instances2, "m", _PromiseCache_refreshCache3).call(this, options, entry, closure);
  } else {
    return entry;
  }
}, _PromiseCache_refreshCache3 = /**
 * The conditions for refreshing the cache are handled in the calling method, which should be
 * #maybeRefreshCache.
 *
 * If you don't win the lock, you'll poll for the cache.  If you don't get the cache within maxPollingTimeout, you'll throw an error.
 */
async function _PromiseCache_refreshCache4(options, entry, closure) {
  const lockKey = _lock2(options.key);
  const now = __classPrivateFieldGet14(this, _PromiseCache_clock2, "f").now().getTime();
  const lockExpiration = new Date(now + options.ttl / 2);
  const lockObtained = await __classPrivateFieldGet14(this, _PromiseCache_redis2, "f").set(lockKey, "1", {
    expiration: lockExpiration,
    nx: true
  });
  if (lockObtained) {
    return __classPrivateFieldGet14(this, _PromiseCache_instances2, "m", _PromiseCache_updateCache3).call(this, options.key, entry, closure, options.ttl);
  } else if (entry) {
    return entry;
  } else {
    const start = __classPrivateFieldGet14(this, _PromiseCache_clock2, "f").now();
    return __classPrivateFieldGet14(this, _PromiseCache_instances2, "m", _PromiseCache_pollForCache3).call(this, start, options.key, options.ttl);
  }
}, _PromiseCache_pollForCache3 = async function _PromiseCache_pollForCache4(start, key, ttl) {
  const pollingTimeout = Math.min(ttl, maxPollingTimeout2);
  const existing = await __classPrivateFieldGet14(this, _PromiseCache_instances2, "m", _PromiseCache_redisEntry3).call(this, key);
  if (existing) {
    return existing;
  }
  if (__classPrivateFieldGet14(this, _PromiseCache_clock2, "f").now().getTime() - start.getTime() >= pollingTimeout) {
    throw new Error(`Cache request timed out trying to get data at key: ${key}`);
  }
  await new Promise((resolve) => setTimeout(resolve, pollEvery2));
  return __classPrivateFieldGet14(this, _PromiseCache_instances2, "m", _PromiseCache_pollForCache4).call(this, start, key, ttl);
}, _PromiseCache_updateCache3 = /**
 * Actually update the cache.  This is the method that will be called if we have the lock.
 */
async function _PromiseCache_updateCache4(key, entry, closure, ttl) {
  const expires = __classPrivateFieldGet14(this, _PromiseCache_clock2, "f").now().getTime() + ttl;
  entry = entry ?? {
    value: null,
    expires,
    errorCount: 0,
    error: null,
    errorTime: null,
    checkedAt: 0
  };
  try {
    entry.value = await closure();
    entry.error = null;
    entry.errorCount = 0;
    entry.errorTime = null;
  } catch (e) {
    entry.value = null;
    entry.error = e.message ?? "Unknown error";
    entry.errorTime = __classPrivateFieldGet14(this, _PromiseCache_clock2, "f").now().getTime();
    entry.errorCount++;
  }
  __classPrivateFieldGet14(this, _PromiseCache_localCache2, "f")[key] = entry;
  await __classPrivateFieldGet14(this, _PromiseCache_redis2, "f").set(_namespaced2(key), JSON.stringify(entry), {
    expiration: new Date(expires + allowStaleFor2)
  });
  if (entry.error && entry.errorCount < retryLimit2) {
    await __classPrivateFieldGet14(this, _PromiseCache_redis2, "f").del(_lock2(key));
  }
  return entry;
}, _PromiseCache_calculateRamp3 = function _PromiseCache_calculateRamp4(expiry) {
  const now = __classPrivateFieldGet14(this, _PromiseCache_clock2, "f").now().getTime();
  const remaining = expiry - now;
  if (remaining < 0) {
    return 1;
  } else if (remaining < 1e3) {
    return 0.1;
  } else if (remaining < 2e3) {
    return 0.01;
  } else if (remaining < 3e3) {
    return 1e-3;
  } else {
    return 0;
  }
}, _PromiseCache_redisEntry3 = async function _PromiseCache_redisEntry4(key) {
  const val = await __classPrivateFieldGet14(this, _PromiseCache_redis2, "f").get(_namespaced2(key));
  if (val) {
    const entry = JSON.parse(val);
    entry.checkedAt = __classPrivateFieldGet14(this, _PromiseCache_clock2, "f").now().getTime();
    __classPrivateFieldGet14(this, _PromiseCache_localCache2, "f")[key] = entry;
    return entry;
  }
  return void 0;
}, _PromiseCache_enforceTTL3 = function _PromiseCache_enforceTTL4(options) {
  if (options.ttl < minTtlValue2) {
    console.warn(`Cache TTL cannot be less than ${minTtlValue2} milliseconds! Updating ttl value of ${options.ttl} to ${minTtlValue2}.`);
    options.ttl = minTtlValue2;
  }
};

// node_modules/@devvit/public-api/devvit/internals/blocks/handler/cache.js
function makeCache2(redis, state, clock = SystemClock2) {
  const pc = new PromiseCache2(redis, state, clock);
  return pc.cache.bind(pc);
}

// node_modules/@devvit/public-api/devvit/internals/blocks/handler/UIClient.js
var import_protos20 = require("@devvit/protos");

// node_modules/@devvit/shared-types/useForm.js
function formKeyToHookId(formKey) {
  const match = formKey.match(/form\.hook\.(.+)\.0/);
  if (!match?.[1]) {
    return;
  }
  return match[1];
}

// node_modules/@devvit/public-api/devvit/internals/blocks/handler/useForm.js
var UseFormHook = class {
  constructor(params, form, onSubmit) {
    this.state = null;
    this.hookId = params.hookId;
    this.form = form;
    this.onSubmit = onSubmit;
    this.onUIEvent = async (event) => {
      if (event.formSubmitted) {
        await onSubmit(getFormValues(event.formSubmitted.results));
      }
    };
  }
};
function useForm(form, onSubmit) {
  const hook = registerHook({
    namespace: "useForm",
    initializer: (params) => new UseFormHook(params, form, onSubmit)
  });
  return hookRefToFormKey({ id: hook.hookId });
}
function hookRefToFormKey(hookRef) {
  return `form.hook.${hookRef.id}.0`;
}
function getFormDefinition(renderContext, formKey) {
  const hookId = formKeyToHookId(formKey);
  return renderContext.getHook({ id: hookId });
}

// node_modules/@devvit/public-api/devvit/internals/blocks/handler/UIClient.js
var __classPrivateFieldSet15 = function(receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet15 = function(receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _UIClient_renderContext;
var _UIClient_webViewMessageCount;
var _UIClient_webViewClient2;
var _UIClient_webViewPostMessage;
var UIClient2 = class {
  constructor(renderContext) {
    _UIClient_renderContext.set(this, void 0);
    _UIClient_webViewMessageCount.set(this, 0);
    _UIClient_webViewClient2.set(this, void 0);
    _UIClient_webViewPostMessage.set(this, (webViewIdOrMessage, message) => {
      var _a6, _b2;
      const webViewId = message !== void 0 ? webViewIdOrMessage : "";
      const msg = message !== void 0 ? message : webViewIdOrMessage;
      __classPrivateFieldGet15(this, _UIClient_renderContext, "f").emitEffect(`postMessage${__classPrivateFieldSet15(this, _UIClient_webViewMessageCount, (_b2 = __classPrivateFieldGet15(this, _UIClient_webViewMessageCount, "f"), _a6 = _b2++, _b2), "f"), _a6}`, {
        type: import_protos20.EffectType.EFFECT_WEB_VIEW,
        webView: {
          postMessage: {
            webViewId,
            app: {
              message: msg,
              // This is deprecated, but populated for backwards compatibility
              jsonString: JSON.stringify(msg)
              // Encode as JSON for consistency with the mobile clients
            }
          }
        }
      });
    });
    __classPrivateFieldSet15(this, _UIClient_renderContext, renderContext, "f");
    __classPrivateFieldSet15(this, _UIClient_webViewClient2, {
      postMessage: __classPrivateFieldGet15(this, _UIClient_webViewPostMessage, "f")
    }, "f");
  }
  get webView() {
    return __classPrivateFieldGet15(this, _UIClient_webViewClient2, "f");
  }
  showForm(formKey, data) {
    const formDefinition = getFormDefinition(__classPrivateFieldGet15(this, _UIClient_renderContext, "f"), formKey);
    if (!formDefinition) {
      throw new Error("Form does not exist. Make sure you have added it using useForm.");
    }
    const formData = formDefinition.form instanceof Function ? formDefinition.form(data ?? {}) : formDefinition.form;
    const form = {
      fields: [],
      id: formKey,
      title: formData.title,
      acceptLabel: formData.acceptLabel,
      cancelLabel: formData.cancelLabel,
      shortDescription: formData.description
    };
    assertValidFormFields(formData.fields);
    form.fields = transformFormFields(formData.fields);
    __classPrivateFieldGet15(this, _UIClient_renderContext, "f").emitEffect(formKey, {
      type: import_protos20.EffectType.EFFECT_SHOW_FORM,
      showForm: {
        form
      }
    });
  }
  showToast(textOrToast) {
    let toast;
    if (textOrToast instanceof Object) {
      toast = {
        text: textOrToast.text,
        appearance: textOrToast.appearance === "success" ? import_protos20.ToastAppearance.SUCCESS : import_protos20.ToastAppearance.NEUTRAL
      };
    } else {
      toast = {
        text: textOrToast
      };
    }
    __classPrivateFieldGet15(this, _UIClient_renderContext, "f").emitEffect(textOrToast.toString(), {
      type: import_protos20.EffectType.EFFECT_SHOW_TOAST,
      showToast: {
        toast
      }
    });
  }
  navigateTo(thingOrUrl) {
    let url;
    if (typeof thingOrUrl === "string") {
      url = new URL(thingOrUrl).toString();
    } else {
      url = new URL(thingOrUrl.permalink, "https://www.reddit.com").toString();
    }
    __classPrivateFieldGet15(this, _UIClient_renderContext, "f").emitEffect(url, {
      type: import_protos20.EffectType.EFFECT_NAVIGATE_TO_URL,
      navigateToUrl: {
        url
      }
    });
  }
};
_UIClient_renderContext = /* @__PURE__ */ new WeakMap(), _UIClient_webViewMessageCount = /* @__PURE__ */ new WeakMap(), _UIClient_webViewClient2 = /* @__PURE__ */ new WeakMap(), _UIClient_webViewPostMessage = /* @__PURE__ */ new WeakMap();

// node_modules/@devvit/public-api/devvit/internals/blocks/handler/useChannel.js
var import_protos21 = require("@devvit/protos");
var __classPrivateFieldSet16 = function(receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet16 = function(receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _ChannelHook_instances;
var _a;
var _ChannelHook_context;
var _ChannelHook_debug;
var _ChannelHook_invalidate;
var _ChannelHook_opts;
var _ChannelHook_emitSubscribed;
var ChannelHook = class {
  constructor(opts, params) {
    _ChannelHook_instances.add(this);
    _ChannelHook_context.set(this, void 0);
    _ChannelHook_debug.set(this, void 0);
    _ChannelHook_invalidate.set(this, void 0);
    _ChannelHook_opts.set(this, void 0);
    __classPrivateFieldSet16(this, _ChannelHook_context, params.context, "f");
    __classPrivateFieldSet16(this, _ChannelHook_debug, !!params.context._devvitContext?.debug.realtime, "f");
    __classPrivateFieldSet16(this, _ChannelHook_opts, opts, "f");
    __classPrivateFieldSet16(this, _ChannelHook_invalidate, params.invalidate, "f");
    const appID = params.context.meta[Header.App]?.values[0];
    if (!appID)
      throw Error("useChannel missing app ID metadata");
    const installID = params.context.meta[Header.Installation]?.values[0];
    if (!installID)
      throw Error("useChannel missing install ID from metadata");
    const channel = `${appID}:${installID}:${opts.name}`;
    const duplicate = Object.values(__classPrivateFieldGet16(this, _ChannelHook_context, "f")._hooks).filter((hook) => hook instanceof _a).some((hook) => hook.state.channel === channel);
    if (duplicate)
      throw Error(`useChannel channel names must be unique; "${channel}" duplicated`);
    this.state = {
      channel,
      connected: false,
      subscribed: false
    };
  }
  async onUIEvent(ev) {
    const realtime = ev.realtimeEvent;
    if (!realtime || !this.state.subscribed)
      return;
    switch (realtime.status) {
      case import_protos21.RealtimeSubscriptionStatus.REALTIME_SUBSCRIBED:
        if (__classPrivateFieldGet16(this, _ChannelHook_debug, "f"))
          console.debug(`[realtime] "${this.state.channel}" connected`);
        this.state.connected = true;
        __classPrivateFieldGet16(this, _ChannelHook_invalidate, "f").call(this);
        await __classPrivateFieldGet16(this, _ChannelHook_opts, "f").onSubscribed?.();
        break;
      case import_protos21.RealtimeSubscriptionStatus.REALTIME_UNSUBSCRIBED:
        if (__classPrivateFieldGet16(this, _ChannelHook_debug, "f"))
          console.debug(`[realtime] "${this.state.channel}" disconnected`);
        this.state.connected = false;
        __classPrivateFieldGet16(this, _ChannelHook_invalidate, "f").call(this);
        await __classPrivateFieldGet16(this, _ChannelHook_opts, "f").onUnsubscribed?.();
        break;
      default:
        if (__classPrivateFieldGet16(this, _ChannelHook_debug, "f"))
          console.debug(`[realtime] "${this.state.channel}" received message: ${JSON.stringify(ev, void 0, 2)}`);
        __classPrivateFieldGet16(this, _ChannelHook_opts, "f").onMessage(realtime.event?.data?.msg);
        break;
    }
  }
  async send(msg) {
    if (__classPrivateFieldGet16(this, _ChannelHook_debug, "f"))
      console.debug(`[realtime] "${this.state.channel}" send message: ${JSON.stringify(msg, void 0, 2)}`);
    if (!this.state.subscribed || !this.state.connected) {
      console.debug(`[realtime] "${this.state.channel}" send failed; channel not connected`);
      throw Error(`useChannel send failed; "${this.state.channel}" channel not connected`);
    }
    await __classPrivateFieldGet16(this, _ChannelHook_context, "f").devvitContext.realtime.send(this.state.channel, msg);
  }
  get status() {
    if (this.state.subscribed && this.state.connected)
      return ChannelStatus.Connected;
    else if (this.state.subscribed && !this.state.connected)
      return ChannelStatus.Connecting;
    else if (!this.state.subscribed && this.state.connected)
      return ChannelStatus.Disconnecting;
    return ChannelStatus.Disconnected;
  }
  subscribe() {
    if (this.state.subscribed)
      return;
    if (__classPrivateFieldGet16(this, _ChannelHook_debug, "f"))
      console.debug(`[realtime] "${this.state.channel}" subscribed`);
    this.state.subscribed = true;
    __classPrivateFieldGet16(this, _ChannelHook_invalidate, "f").call(this);
    __classPrivateFieldGet16(this, _ChannelHook_instances, "m", _ChannelHook_emitSubscribed).call(this);
  }
  unsubscribe() {
    if (!this.state.subscribed)
      return;
    if (__classPrivateFieldGet16(this, _ChannelHook_debug, "f"))
      console.debug(`[realtime] "${this.state.channel}" unsubscribed`);
    this.state.subscribed = false;
    __classPrivateFieldGet16(this, _ChannelHook_invalidate, "f").call(this);
    __classPrivateFieldGet16(this, _ChannelHook_instances, "m", _ChannelHook_emitSubscribed).call(this);
  }
};
_a = ChannelHook, _ChannelHook_context = /* @__PURE__ */ new WeakMap(), _ChannelHook_debug = /* @__PURE__ */ new WeakMap(), _ChannelHook_invalidate = /* @__PURE__ */ new WeakMap(), _ChannelHook_opts = /* @__PURE__ */ new WeakMap(), _ChannelHook_instances = /* @__PURE__ */ new WeakSet(), _ChannelHook_emitSubscribed = function _ChannelHook_emitSubscribed2() {
  const channels = Object.values(__classPrivateFieldGet16(this, _ChannelHook_context, "f")._hooks).filter((hook) => hook instanceof _a && hook.state.subscribed).map((hook) => hook.state.channel);
  __classPrivateFieldGet16(this, _ChannelHook_context, "f").emitEffect(this.state.channel, {
    type: import_protos21.EffectType.EFFECT_REALTIME_SUB,
    realtimeSubscriptions: { subscriptionIds: channels }
  });
};
function useChannel(opts) {
  if (!opts.name || /[^a-zA-Z0-9_]/.test(opts.name))
    throw Error(`useChannel error: The name "${opts.name}" you provided for the hook is invalid. Valid names can only contain letters, numbers, and underscores (_).`);
  const id = `useChannel:${opts.name}`;
  return registerHook({
    id,
    namespace: id,
    initializer: (params) => new ChannelHook(opts, params)
  });
}

// node_modules/@devvit/public-api/devvit/internals/blocks/handler/useInterval.js
var import_protos22 = require("@devvit/protos");

// node_modules/@devvit/public-api/devvit/internals/blocks/handler/RenderContext.js
var __classPrivateFieldSet17 = function(receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet17 = function(receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _RenderContext_state;
var _RenderContext_hooks;
function _isTombstone(value) {
  return typeof value === "object" && value !== null && "__deleted" in value;
}
var RenderContext = class _RenderContext {
  get devvitContext() {
    if (!this._devvitContext) {
      throw new Error("Devvit context not available");
    }
    return this._devvitContext;
  }
  set devvitContext(context) {
    this._devvitContext = context;
  }
  constructor(request, meta) {
    _RenderContext_state.set(this, void 0);
    this._segments = [];
    _RenderContext_hooks.set(this, {});
    this._prevHooks = {};
    this._prevHookId = "";
    this._effects = {};
    this._changed = {};
    this._touched = {};
    this._requeueEvents = [];
    this._rootProps = {};
    this._generated = {};
    this._undeliveredHandlers = {};
    this.request = request;
    this.meta = meta;
    __classPrivateFieldSet17(this, _RenderContext_state, request.state ?? {
      __cache: {}
    }, "f");
    this._rootProps = request.props ?? {};
  }
  /** The state delta new to this render. */
  get _changedState() {
    const changed = {
      __cache: __classPrivateFieldGet17(this, _RenderContext_state, "f").__cache ?? {}
    };
    for (const key in this._changed)
      changed[key] = this._state[key];
    const unmounted = new Set(Object.keys(this._state));
    Object.keys(__classPrivateFieldGet17(this, _RenderContext_hooks, "f")).forEach((key) => {
      if (key === "__cache") {
        return;
      }
      unmounted.delete(key);
    });
    unmounted.forEach((key) => {
      if (key === "__cache") {
        return;
      }
      const t = { __deleted: true };
      this._state[key] = changed[key] = t;
    });
    return changed;
  }
  get _hooks() {
    return __classPrivateFieldGet17(this, _RenderContext_hooks, "f");
  }
  set _hooks(hooks) {
    this._prevHooks = __classPrivateFieldGet17(this, _RenderContext_hooks, "f");
    __classPrivateFieldSet17(this, _RenderContext_hooks, hooks, "f");
  }
  /** The complete render state. */
  get _state() {
    return __classPrivateFieldGet17(this, _RenderContext_state, "f");
  }
  /** Replacing state resets the delta for the next render. */
  set _state(state) {
    __classPrivateFieldSet17(this, _RenderContext_state, state, "f");
  }
  push(options) {
    this._segments.push({ ...options, next: 0 });
  }
  pop() {
    this._segments.pop();
  }
  addUndeliveredEventHandler(id, handler) {
    this._undeliveredHandlers[id] = handler;
  }
  addGlobalUndeliveredEventHandler(id, handler) {
    _RenderContext.addGlobalUndeliveredEventHandler(id, handler);
  }
  getHook(ref) {
    return __classPrivateFieldGet17(this, _RenderContext_hooks, "f")[ref.id];
  }
  /** Catches events with no active handler and routes to the corresponding hook to detach/unsubscribe/etc **/
  static addGlobalUndeliveredEventHandler(id, handler) {
    _RenderContext._staticUndeliveredHandlers[id] = handler;
  }
  async handleUndeliveredEvent(ev) {
    const allHandlers = {
      ..._RenderContext._staticUndeliveredHandlers,
      ...this._undeliveredHandlers
    };
    for (const [_, handler] of Object.entries(allHandlers)) {
      await handler(ev, this);
    }
  }
  emitEffect(dedupeKey, effect) {
    this._effects[dedupeKey] = effect;
  }
  /**
   * Adds event that will re-enter the dispatcher queue.
   */
  addToRequeueEvents(...events) {
    if (this._devvitContext?.debug.blocks)
      console.debug("[blocks] requeueing events", events);
    const grouped = events.reduce((acc, event) => {
      if (event.retry) {
        acc.retry.push(event);
      } else {
        acc.normal.push(event);
      }
      return acc;
    }, { retry: [], normal: [] });
    this._requeueEvents = [...grouped.retry, ...this._requeueEvents, ...grouped.normal];
  }
  get effects() {
    return Object.values(this._effects);
  }
  nextHookId(options) {
    if (options.key === void 0) {
      options.key = this._segments[this._segments.length - 1].next++ + "";
    }
    this.push(options);
    try {
      const builder = [];
      for (let i = this._segments.length - 1; i >= 0; i--) {
        const segment = this._segments[i];
        if (segment.id) {
          builder.unshift(segment.id);
          break;
        }
        const tag = [];
        if (segment.namespace) {
          tag.push(segment.namespace);
        }
        if (segment.key !== void 0 && segment.key !== false) {
          tag.push(segment.key);
        }
        builder.unshift(tag.join("-"));
      }
      const id = builder.join(".");
      if (this._generated[id] && !options.shared) {
        throw new Error(`Hook id ${id} already used, cannot register another hook with the same id`);
      }
      this._generated[id] = true;
      this._prevHookId = id;
      return id;
    } finally {
      this.pop();
    }
  }
};
_RenderContext_state = /* @__PURE__ */ new WeakMap(), _RenderContext_hooks = /* @__PURE__ */ new WeakMap();
RenderContext._staticUndeliveredHandlers = {};

// node_modules/@devvit/public-api/devvit/internals/blocks/handler/useInterval.js
var __classPrivateFieldSet18 = function(receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet18 = function(receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _IntervalHook_hookId;
var _IntervalHook_invalidate;
var _IntervalHook_callback;
var _IntervalHook_context;
var intervals = {};
RenderContext.addGlobalUndeliveredEventHandler("intervals", async (event, context) => {
  if (event.timer && event.hook) {
    delete intervals[event.hook];
    context.emitEffect("timers", {
      type: import_protos22.EffectType.EFFECT_SET_INTERVALS,
      interval: { intervals }
    });
  }
});
var IntervalHook = class {
  constructor(callback, requestedDelayMs, params) {
    _IntervalHook_hookId.set(this, void 0);
    _IntervalHook_invalidate.set(this, void 0);
    _IntervalHook_callback.set(this, void 0);
    _IntervalHook_context.set(this, void 0);
    this.state = { duration: { seconds: 0, nanos: 0 }, running: false };
    __classPrivateFieldSet18(this, _IntervalHook_invalidate, params.invalidate, "f");
    __classPrivateFieldSet18(this, _IntervalHook_hookId, params.hookId, "f");
    __classPrivateFieldSet18(this, _IntervalHook_callback, callback, "f");
    __classPrivateFieldSet18(this, _IntervalHook_context, params.context, "f");
    const seconds = Math.floor(requestedDelayMs / 1e3);
    const nanos = requestedDelayMs % 1e3 * 1e6;
    this.state.duration = { seconds, nanos };
  }
  onStateLoaded() {
    if (this.state.running) {
      intervals[__classPrivateFieldGet18(this, _IntervalHook_hookId, "f")] = { duration: this.state.duration };
    } else {
      delete intervals[__classPrivateFieldGet18(this, _IntervalHook_hookId, "f")];
    }
  }
  async onUIEvent(_event) {
    await __classPrivateFieldGet18(this, _IntervalHook_callback, "f").call(this);
  }
  start() {
    intervals[__classPrivateFieldGet18(this, _IntervalHook_hookId, "f")] = { duration: this.state.duration };
    this.state.running = true;
    __classPrivateFieldGet18(this, _IntervalHook_invalidate, "f").call(this);
    __classPrivateFieldGet18(this, _IntervalHook_context, "f").emitEffect("timers", {
      type: import_protos22.EffectType.EFFECT_SET_INTERVALS,
      interval: { intervals }
    });
  }
  stop() {
    delete intervals[__classPrivateFieldGet18(this, _IntervalHook_hookId, "f")];
    this.state.running = false;
    __classPrivateFieldGet18(this, _IntervalHook_invalidate, "f").call(this);
    __classPrivateFieldGet18(this, _IntervalHook_context, "f").emitEffect("timers", {
      type: import_protos22.EffectType.EFFECT_SET_INTERVALS,
      interval: { intervals }
    });
  }
};
_IntervalHook_hookId = /* @__PURE__ */ new WeakMap(), _IntervalHook_invalidate = /* @__PURE__ */ new WeakMap(), _IntervalHook_callback = /* @__PURE__ */ new WeakMap(), _IntervalHook_context = /* @__PURE__ */ new WeakMap();
function useInterval(callback, requestedDelayMs) {
  const hook = registerHook({
    namespace: "useInterval",
    initializer: (params) => {
      return new IntervalHook(callback, requestedDelayMs, params);
    }
  });
  return {
    start: () => hook.start(),
    stop: () => hook.stop()
  };
}

// node_modules/@devvit/public-api/devvit/internals/blocks/handler/useState.js
var import_protos24 = require("@devvit/protos");

// node_modules/@devvit/public-api/devvit/internals/blocks/handler/types.js
var RenderInterruptError = class extends Error {
};

// node_modules/@devvit/public-api/devvit/internals/blocks/handler/useAsync.js
var import_protos23 = require("@devvit/protos");
var __classPrivateFieldSet19 = function(receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet19 = function(receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _AsyncHook_debug;
var _AsyncHook_hookId;
var _AsyncHook_invalidate;
var _AsyncHook_ctx;
var _AsyncHook_options;
function toSerializableErrorOrCircuitBreak(e) {
  if (e instanceof Error) {
    if (e.message === CIRCUIT_BREAKER_MSG) {
      throw e;
    }
    console.error(e);
    return { message: e.message, details: e.stack ?? "" };
  } else {
    console.error(e);
    return { message: "Unknown error", details: StringUtil.caughtToString(e) };
  }
}
var AsyncHook = class {
  constructor(initializer, options, params) {
    _AsyncHook_debug.set(this, void 0);
    _AsyncHook_hookId.set(this, void 0);
    _AsyncHook_invalidate.set(this, void 0);
    _AsyncHook_ctx.set(this, void 0);
    _AsyncHook_options.set(this, void 0);
    __classPrivateFieldSet19(this, _AsyncHook_debug, !!params.context.devvitContext.debug.useAsync, "f");
    if (__classPrivateFieldGet19(this, _AsyncHook_debug, "f"))
      console.debug("[useAsync] v1", options);
    this.state = { data: null, load_state: "initial", error: null, depends: null };
    __classPrivateFieldSet19(this, _AsyncHook_hookId, params.hookId, "f");
    this.initializer = initializer;
    __classPrivateFieldSet19(this, _AsyncHook_invalidate, params.invalidate, "f");
    __classPrivateFieldSet19(this, _AsyncHook_ctx, params.context, "f");
    this.localDepends = options.depends ?? null;
    __classPrivateFieldSet19(this, _AsyncHook_options, options, "f");
  }
  /**
   * After we look at our state, we need to decide if we need to dispatch a request to load the data.
   */
  onStateLoaded() {
    if (__classPrivateFieldGet19(this, _AsyncHook_debug, "f"))
      console.debug("[useAsync] async onLoad ", __classPrivateFieldGet19(this, _AsyncHook_hookId, "f"), this.state);
    if (__classPrivateFieldGet19(this, _AsyncHook_debug, "f"))
      console.debug("[useAsync] async onLoad have ", this.localDepends, "and", this.state.depends);
    if (!isEqual(this.localDepends, this.state.depends) || this.state.load_state === "initial") {
      if (__classPrivateFieldGet19(this, _AsyncHook_debug, "f"))
        console.debug(`[useAsync] attempting to resolve for hookId`, __classPrivateFieldGet19(this, _AsyncHook_hookId, "f"));
      this.state.load_state = "loading";
      this.state.depends = this.localDepends;
      __classPrivateFieldGet19(this, _AsyncHook_invalidate, "f").call(this);
      const requeueEvent = {
        scope: import_protos23.UIEventScope.ALL,
        hook: __classPrivateFieldGet19(this, _AsyncHook_hookId, "f"),
        async: true,
        asyncRequest: {
          requestId: __classPrivateFieldGet19(this, _AsyncHook_hookId, "f") + "-" + JSON.stringify(this.state.depends)
        }
      };
      if (__classPrivateFieldGet19(this, _AsyncHook_debug, "f"))
        console.debug("[useAsync] onLoad requeue");
      __classPrivateFieldGet19(this, _AsyncHook_ctx, "f").addToRequeueEvents(requeueEvent);
    }
  }
  async onUIEvent(event, context) {
    if (event.asyncRequest) {
      const asyncResponse = { requestId: event.asyncRequest.requestId };
      try {
        asyncResponse.data = {
          value: await this.initializer()
        };
      } catch (e) {
        asyncResponse.error = toSerializableErrorOrCircuitBreak(e);
      }
      const requeueEvent = {
        scope: import_protos23.UIEventScope.ALL,
        asyncResponse,
        hook: __classPrivateFieldGet19(this, _AsyncHook_hookId, "f")
      };
      if (__classPrivateFieldGet19(this, _AsyncHook_debug, "f"))
        console.debug("[useAsync] onReq requeue");
      context.addToRequeueEvents(requeueEvent);
    } else if (event.asyncResponse) {
      const anticipatedRequestId = __classPrivateFieldGet19(this, _AsyncHook_hookId, "f") + "-" + JSON.stringify(this.state.depends);
      if (event.asyncResponse.requestId === anticipatedRequestId) {
        this.state = {
          ...this.state,
          data: event.asyncResponse.data?.value ?? null,
          error: event.asyncResponse.error ?? null,
          load_state: event.asyncResponse.error ? "error" : "loaded"
        };
        if (__classPrivateFieldGet19(this, _AsyncHook_options, "f").finally) {
          await __classPrivateFieldGet19(this, _AsyncHook_options, "f").finally(this.state.data, this.state.error ? new Error(this.state.error?.message ?? "Unknown error") : null);
        }
        __classPrivateFieldGet19(this, _AsyncHook_invalidate, "f").call(this);
      } else {
        if (__classPrivateFieldGet19(this, _AsyncHook_debug, "f"))
          console.debug("[useAsync] onResp skip, stale event", event.asyncResponse.requestId, " !== ", anticipatedRequestId);
      }
    } else {
      throw new Error("Unknown event type");
    }
  }
};
_AsyncHook_debug = /* @__PURE__ */ new WeakMap(), _AsyncHook_hookId = /* @__PURE__ */ new WeakMap(), _AsyncHook_invalidate = /* @__PURE__ */ new WeakMap(), _AsyncHook_ctx = /* @__PURE__ */ new WeakMap(), _AsyncHook_options = /* @__PURE__ */ new WeakMap();
function useAsync(initializer, options = {}) {
  const hook = registerHook({
    namespace: "useAsync",
    initializer: (params) => {
      return new AsyncHook(initializer, options, params);
    }
  });
  return {
    data: hook.state.data,
    error: hook.state.error,
    loading: hook.state.load_state === "loading"
  };
}

// node_modules/@devvit/public-api/devvit/internals/blocks/handler/useState.js
var __classPrivateFieldSet20 = function(receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet20 = function(receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _UseStateHook_changed;
var _UseStateHook_ctx;
var _UseStateHook_initializer;
var _UseStateHook_hookId;
var UseStateHook = class {
  constructor(initializer, params) {
    this.state = { value: null, load_state: "initial", error: null };
    _UseStateHook_changed.set(this, void 0);
    _UseStateHook_ctx.set(this, void 0);
    _UseStateHook_initializer.set(this, void 0);
    _UseStateHook_hookId.set(this, void 0);
    __classPrivateFieldSet20(this, _UseStateHook_initializer, initializer, "f");
    __classPrivateFieldSet20(this, _UseStateHook_hookId, params.hookId, "f");
    __classPrivateFieldSet20(this, _UseStateHook_changed, params.invalidate, "f");
    __classPrivateFieldSet20(this, _UseStateHook_ctx, params.context, "f");
  }
  /**
   * For state initialized with a promise, this function is called when the promise resolves.  This should
   * happen inside the same event loop as the original call to useState, assuming circuit-breaking didn't happen.
   *
   * If circuit-breaking did happen, this function will be called on the server and the state will propagate to
   * the client.
   *
   * This is intended to be synchronous in the event loop, so will block and waterfall.  useAsync is the non-waterfalling
   * version, but this version is provided for backwards compatibility.
   */
  async onUIEvent() {
    if (this.state.load_state === "loading" && this._promise) {
      try {
        this.state.value = await this._promise;
        this.state.load_state = "loaded";
      } catch (e) {
        this.state.load_state = "error";
        this.state.error = toSerializableErrorOrCircuitBreak(e);
      }
      __classPrivateFieldGet20(this, _UseStateHook_changed, "f").call(this);
    } else {
      console.warn(`Invalid state for hook (${__classPrivateFieldGet20(this, _UseStateHook_hookId, "f")}):`, this.state.load_state, this._promise);
    }
  }
  setter(action) {
    this.state.value = action instanceof Function ? action(this.state.value) : action;
    this.state.load_state = "loaded";
    __classPrivateFieldGet20(this, _UseStateHook_changed, "f").call(this);
  }
  /**
   * After the existing state is loaded, we need to run the initializer if there was no state found.
   */
  onStateLoaded() {
    this._promise = __classPrivateFieldGet20(this, _UseStateHook_ctx, "f")._prevHooks[__classPrivateFieldGet20(this, _UseStateHook_hookId, "f")]?._promise;
    if (this.state.load_state === "loading") {
      throw new RenderInterruptError();
    }
    if (this.state.load_state === "error") {
      throw new Error(this.state.error?.message ?? "Unknown error");
    }
    if (this.state.load_state === "initial") {
      let initialValue;
      try {
        initialValue = __classPrivateFieldGet20(this, _UseStateHook_initializer, "f") instanceof Function ? __classPrivateFieldGet20(this, _UseStateHook_initializer, "f").call(this) : __classPrivateFieldGet20(this, _UseStateHook_initializer, "f");
      } catch (e) {
        console.log("error in loading async", e);
        this.state.load_state = "error";
        __classPrivateFieldGet20(this, _UseStateHook_changed, "f").call(this);
        return;
      }
      if (initialValue instanceof Promise) {
        this._promise = initialValue;
        this.state.load_state = "loading";
        const requeueEvent = {
          scope: import_protos24.UIEventScope.ALL,
          asyncRequest: { requestId: __classPrivateFieldGet20(this, _UseStateHook_hookId, "f") },
          hook: __classPrivateFieldGet20(this, _UseStateHook_hookId, "f")
        };
        __classPrivateFieldGet20(this, _UseStateHook_ctx, "f").addToRequeueEvents(requeueEvent);
        __classPrivateFieldGet20(this, _UseStateHook_changed, "f").call(this);
        throw new RenderInterruptError();
      } else {
        this.state.value = initialValue;
        this.state.load_state = "loaded";
      }
      __classPrivateFieldGet20(this, _UseStateHook_changed, "f").call(this);
    }
  }
};
_UseStateHook_changed = /* @__PURE__ */ new WeakMap(), _UseStateHook_ctx = /* @__PURE__ */ new WeakMap(), _UseStateHook_initializer = /* @__PURE__ */ new WeakMap(), _UseStateHook_hookId = /* @__PURE__ */ new WeakMap();
function useState(initialState) {
  const hook = registerHook({
    namespace: "useState",
    initializer: (params) => new UseStateHook(initialState, params)
  });
  return [hook.state.value, hook.setter.bind(hook)];
}

// node_modules/@devvit/public-api/devvit/internals/blocks/handler/ContextBuilder.js
var ContextBuilder = class {
  buildContext(renderContext, request, metadata) {
    const modLog = new ModLogClient(metadata);
    const kvStore = new KeyValueStorage(metadata);
    const redis = new RedisClient(metadata);
    const reddit = new RedditAPIClient(metadata);
    const scheduler = new SchedulerClient(metadata);
    const settings = new SettingsClient(metadata);
    const ui = new UIClient2(renderContext);
    const media = new MediaClient(metadata);
    const assets = new AssetsClient();
    const realtime = new RealtimeClient(metadata);
    const cache = makeCache2(redis, renderContext._state);
    const apiClients = {
      modLog,
      kvStore,
      redis,
      reddit,
      scheduler,
      settings,
      media,
      assets,
      realtime,
      ui,
      useState,
      useChannel,
      useInterval,
      useForm,
      cache,
      dimensions: request.env?.dimensions,
      uiEnvironment: {
        timezone: metadata[Header.Timezone]?.values[0],
        locale: metadata[Header.Language]?.values[0],
        dimensions: request.env?.dimensions,
        colorScheme: request.env?.colorScheme
      }
    };
    const baseContext = getContextFromMetadata(metadata, request.props?.postId);
    baseContext.debug.effects = renderContext;
    return { ...baseContext, ...apiClients };
  }
};

// node_modules/@devvit/public-api/devvit/internals/blocks/handler/BlocksHandler.js
var __classPrivateFieldGet21 = function(receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet21 = function(receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var _BlocksHandler_instances;
var _BlocksHandler_root;
var _BlocksHandler_contextBuilder;
var _BlocksHandler_blocksTransformer;
var _BlocksHandler_debug_get;
var _BlocksHandler_loadHooks;
var _BlocksHandler_handleAsyncQueues;
var _BlocksHandler_attemptHook;
var _BlocksHandler_handleMainQueue;
var _BlocksHandler_renderRoot;
var _BlocksHandler_render;
var _BlocksHandler_renderList;
var _BlocksHandler_renderElement;
var _BlocksHandler_reifyProps;
var _activeRenderContext = null;
function _structuredClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}
function assertValidNamespace(input) {
  const regex = /[-.]/;
  const valid = input !== "" && !regex.test(input);
  if (!valid) {
    throw new Error(`Hook with namespace '${input}' is invalid. Hook namespaces cannot be empty string or contain dashes/dots because they are used as delimiters internally. Please update the hook namespace and try again.`);
  }
}
function registerHook({ initializer, ...hookSegment }) {
  if (!_activeRenderContext) {
    throw new Error("Hooks can only be declared at the top of a component.  You cannot declare hooks outside of components or inside of event handlers.  It's almost always a mistake to declare hooks inside of loops or conditionals.");
  }
  assertValidNamespace(hookSegment.namespace);
  const hookId = _activeRenderContext.nextHookId(hookSegment);
  const context = _activeRenderContext;
  const params = {
    hookId,
    invalidate: () => {
      context._changed[hookId] = true;
      context._state[hookId] = context?._hooks[hookId]?.state;
    },
    context: _activeRenderContext
  };
  const fromNull = _activeRenderContext._state[hookId] === void 0 || _isTombstone(_activeRenderContext._state[hookId]);
  _activeRenderContext._hooks[hookId] = _activeRenderContext._hooks[hookId] ?? initializer(params);
  const hook = _activeRenderContext._hooks[hookId];
  if (!fromNull) {
    hook.state = _activeRenderContext._state[hookId];
  }
  hook.onStateLoaded?.();
  if (fromNull && hook.state !== void 0 && hook.state !== null) {
    params.invalidate();
  }
  return hook;
}
var _latestBlocksHandler = null;
var MaxIterations = 128;
var BlocksHandler = class {
  constructor(root) {
    _BlocksHandler_instances.add(this);
    _BlocksHandler_root.set(this, void 0);
    _BlocksHandler_contextBuilder.set(this, new ContextBuilder());
    _BlocksHandler_blocksTransformer.set(this, new BlocksTransformer(() => this._latestRenderContext?.devvitContext?.assets));
    this._latestRenderContext = null;
    if (__classPrivateFieldGet21(this, _BlocksHandler_instances, "a", _BlocksHandler_debug_get))
      console.debug("[blocks] BlocksHandler v1");
    __classPrivateFieldSet21(this, _BlocksHandler_root, root, "f");
    _latestBlocksHandler = this;
  }
  async handle(request, metadata) {
    const context = new RenderContext(request, metadata);
    const devvitContext = __classPrivateFieldGet21(this, _BlocksHandler_contextBuilder, "f").buildContext(context, request, metadata);
    context.devvitContext = devvitContext;
    let blocks;
    const drop = request.events.length - MaxIterations;
    let eventsToProcess = request.events;
    if (drop > 0) {
      eventsToProcess = [];
      {
        let dropped = 0;
        for (const ev of request.events) {
          if (dropped < drop && ev.realtimeEvent)
            dropped++;
          else
            eventsToProcess.push(ev);
        }
      }
      while (eventsToProcess.length > MaxIterations)
        eventsToProcess.shift();
      console.warn(`dropped ${drop} events`);
    }
    const noEvents = !eventsToProcess.length;
    const isMainQueue = noEvents || eventsToProcess.some((e) => !e.async);
    const isBlockingSSR = eventsToProcess.some((e) => e.blocking);
    let changed;
    let progress;
    let remaining = [...eventsToProcess];
    if (eventsToProcess.length === 0) {
      eventsToProcess.push({
        scope: import_protos25.UIEventScope.ALL
      });
    }
    if (__classPrivateFieldGet21(this, _BlocksHandler_instances, "a", _BlocksHandler_debug_get))
      console.debug("[blocks] starting processing events");
    let iterations = 0;
    while (eventsToProcess.length > 0) {
      if (iterations++ > MaxIterations) {
        throw new Error(`Exceeded maximum iterations of ${MaxIterations}`);
      }
      if (__classPrivateFieldGet21(this, _BlocksHandler_instances, "a", _BlocksHandler_debug_get))
        console.debug("[blocks] processing events loop iteration", eventsToProcess.length);
      const batch = [];
      if (!eventsToProcess[0].async) {
        batch.push(eventsToProcess.shift());
      } else {
        while (eventsToProcess[0]?.async) {
          batch.push(eventsToProcess.shift());
        }
      }
      if (!batch.length)
        throw Error("batch must have at least one event");
      try {
        if (batch[0].async) {
          const stateCopy = _structuredClone(context._state);
          await __classPrivateFieldGet21(this, _BlocksHandler_instances, "m", _BlocksHandler_handleAsyncQueues).call(this, context, ...batch);
          context._state = stateCopy;
        } else {
          await __classPrivateFieldGet21(this, _BlocksHandler_instances, "m", _BlocksHandler_handleMainQueue).call(this, context, ...batch);
        }
      } catch (e) {
        if (!isCircuitBreaker(e)) {
          throw e;
        }
        if (__classPrivateFieldGet21(this, _BlocksHandler_instances, "a", _BlocksHandler_debug_get))
          console.debug("[blocks] caught in handler", e);
        context._latestRenderContent = void 0;
        if (progress) {
          context._state = progress._state;
          context._changed = changed;
          context._effects = progress._effects;
          const requeueable = remaining.map((e2) => {
            const requeueEvent = { ...e2 };
            requeueEvent.retry = true;
            return requeueEvent;
          });
          context.addToRequeueEvents(...requeueable);
          break;
        } else {
          if (!isCircuitBreaker(e)) {
            console.error("[blocks] unhandled error in handler", e);
          }
          throw e;
        }
      }
      if (__classPrivateFieldGet21(this, _BlocksHandler_instances, "a", _BlocksHandler_debug_get))
        console.debug("[blocks] remaining events", context._requeueEvents);
      const remainingRequeueEvents = [];
      for (const event of context._requeueEvents) {
        if (!isMainQueue && !event.async) {
          if (__classPrivateFieldGet21(this, _BlocksHandler_instances, "a", _BlocksHandler_debug_get))
            console.debug("[blocks] NOT reprocessing event in BlocksHandler, sync mismatch A", event);
          remainingRequeueEvents.push(event);
          continue;
        }
        if (isMainQueue && event.async && !isBlockingSSR) {
          if (__classPrivateFieldGet21(this, _BlocksHandler_instances, "a", _BlocksHandler_debug_get))
            console.debug("[blocks] NOT reprocessing event in BlocksHandler, sync mismatch B", event);
          remainingRequeueEvents.push(event);
          continue;
        }
        if (__classPrivateFieldGet21(this, _BlocksHandler_instances, "a", _BlocksHandler_debug_get))
          console.debug("[blocks] reprocessing event in BlocksHandler", event);
        eventsToProcess.push(event);
      }
      context._requeueEvents = remainingRequeueEvents;
      if (eventsToProcess.length > 0) {
        changed = { ...context._changed };
        progress = {
          _state: _structuredClone(context._state),
          _effects: { ...context._effects }
        };
        remaining = [...eventsToProcess];
      }
    }
    if (isMainQueue) {
      if (!context._latestRenderContent) {
        context._latestRenderContent = __classPrivateFieldGet21(this, _BlocksHandler_instances, "m", _BlocksHandler_renderRoot).call(this, __classPrivateFieldGet21(this, _BlocksHandler_root, "f"), context.request.props ?? {}, context);
      }
      const tags = context._latestRenderContent;
      if (tags) {
        blocks = __classPrivateFieldGet21(this, _BlocksHandler_blocksTransformer, "f").createBlocksElementOrThrow(tags);
        blocks = __classPrivateFieldGet21(this, _BlocksHandler_blocksTransformer, "f").ensureRootBlock(blocks);
      }
    }
    return {
      state: context._changedState,
      effects: context.effects,
      blocks,
      events: context._requeueEvents
    };
  }
};
_BlocksHandler_root = /* @__PURE__ */ new WeakMap(), _BlocksHandler_contextBuilder = /* @__PURE__ */ new WeakMap(), _BlocksHandler_blocksTransformer = /* @__PURE__ */ new WeakMap(), _BlocksHandler_instances = /* @__PURE__ */ new WeakSet(), _BlocksHandler_debug_get = function _BlocksHandler_debug_get2() {
  return !!this._latestRenderContext?.devvitContext.debug.blocks;
}, _BlocksHandler_loadHooks = function _BlocksHandler_loadHooks2(context, ..._events) {
  context._hooks = {};
  __classPrivateFieldGet21(this, _BlocksHandler_instances, "m", _BlocksHandler_renderRoot).call(this, __classPrivateFieldGet21(this, _BlocksHandler_root, "f"), context.request.props ?? {}, context);
}, _BlocksHandler_handleAsyncQueues = /**
 * These can all run in parallel, because they only emit effects
 */
async function _BlocksHandler_handleAsyncQueues2(context, ...batch) {
  __classPrivateFieldGet21(this, _BlocksHandler_instances, "m", _BlocksHandler_loadHooks).call(this, context, ...batch);
  await Promise.all(batch.map(async (event) => {
    if (!event.async) {
      throw new Error("You can't mix main and other queues in one batch.  This is likely a platform bug.  Please file an issue in the Discord for someone to help! https://discord.com/channels/1050224141732687912/1115441897079574620");
    }
    await __classPrivateFieldGet21(this, _BlocksHandler_instances, "m", _BlocksHandler_attemptHook).call(this, context, event);
  }));
}, _BlocksHandler_attemptHook = async function _BlocksHandler_attemptHook2(context, event) {
  const hook = context._hooks[event.hook];
  if (hook?.onUIEvent) {
    try {
      await hook.onUIEvent(event, context);
    } catch (e) {
      if (isCircuitBreaker(e)) {
        if (__classPrivateFieldGet21(this, _BlocksHandler_instances, "a", _BlocksHandler_debug_get)) {
          console.error("Server call required", e);
        }
      } else {
        console.error("Error in event handler", e);
      }
      throw e;
    }
  } else {
    await context.handleUndeliveredEvent(event);
  }
}, _BlocksHandler_handleMainQueue = async function _BlocksHandler_handleMainQueue2(context, ...batch) {
  for (const event of batch) {
    if (__classPrivateFieldGet21(this, _BlocksHandler_instances, "a", _BlocksHandler_debug_get))
      console.log("[blocks] handling main queue event", event);
    if (__classPrivateFieldGet21(this, _BlocksHandler_instances, "a", _BlocksHandler_debug_get))
      console.log("[blocks] before", context._state);
    __classPrivateFieldGet21(this, _BlocksHandler_instances, "m", _BlocksHandler_loadHooks).call(this, context, event);
    await __classPrivateFieldGet21(this, _BlocksHandler_instances, "m", _BlocksHandler_attemptHook).call(this, context, event);
    if (__classPrivateFieldGet21(this, _BlocksHandler_instances, "a", _BlocksHandler_debug_get))
      console.log("[blocks] after", context._state);
  }
  __classPrivateFieldGet21(this, _BlocksHandler_instances, "m", _BlocksHandler_loadHooks).call(this, context);
}, _BlocksHandler_renderRoot = function _BlocksHandler_renderRoot2(component, props, context) {
  if (__classPrivateFieldGet21(this, _BlocksHandler_instances, "a", _BlocksHandler_debug_get))
    console.debug("[blocks] renderRoot");
  context._generated = {};
  _activeRenderContext = context;
  this._latestRenderContext = context;
  try {
    const roots = __classPrivateFieldGet21(this, _BlocksHandler_instances, "m", _BlocksHandler_render).call(this, component, props, context);
    if (roots.length !== 1) {
      throw new Error(`There can only be one root element, received: ${roots.length}. Please wrap these elements in a <vstack></vstack> or <hstack></hstack> to continue. Fragments cannot be used as a root element.`);
    }
    const root = roots[0];
    if (root === "[object Promise]") {
      throw new Error(`Root elements cannot be async. To use data from an async endpoint, please use "const [data] = useState(async () => {/** your async code */})".`);
    }
    if (typeof root === "string") {
      throw new Error(`The root element must return a valid block, not a string. Try wrapping the element in a <text>your content</text> tag to continue.`);
    }
    context._latestRenderContent = root;
    return root;
  } catch (e) {
    if (e instanceof RenderInterruptError) {
      return void 0;
    } else {
      throw e;
    }
  } finally {
    _activeRenderContext = null;
  }
}, _BlocksHandler_render = function _BlocksHandler_render2(component, props, context) {
  context.push({ namespace: component.name || "anonymous", ...props });
  try {
    const element = component(props, context.devvitContext);
    if (element instanceof Promise) {
      throw new Error(`Components (found: ${component.name ?? "unknown component"}) cannot be async. To use data from an async endpoint, please use "const [data] = useState(async () => {/** your async code */})".`);
    }
    return __classPrivateFieldGet21(this, _BlocksHandler_instances, "m", _BlocksHandler_renderElement).call(this, element, context);
  } finally {
    context.pop();
  }
}, _BlocksHandler_renderList = function _BlocksHandler_renderList2(list, context) {
  list = list.flat(Infinity);
  return list.flatMap((e, i) => {
    if (e && typeof e === "object" && "props" in e) {
      if (!e.props?.key) {
        e.props = e.props ?? {};
        e.props.key = `${i}`;
      }
    }
    return __classPrivateFieldGet21(this, _BlocksHandler_instances, "m", _BlocksHandler_renderElement).call(this, e, context);
  });
}, _BlocksHandler_renderElement = function _BlocksHandler_renderElement2(element, context) {
  if (Array.isArray(element)) {
    return __classPrivateFieldGet21(this, _BlocksHandler_instances, "m", _BlocksHandler_renderList).call(this, element, context);
  } else if (isBlockElement(element)) {
    if (element.type === void 0) {
      try {
        context.push({ namespace: "fragment", ...element.props });
        return __classPrivateFieldGet21(this, _BlocksHandler_instances, "m", _BlocksHandler_renderList).call(this, element.children, context);
      } finally {
        context.pop();
      }
    } else if (typeof element.type === "function") {
      const propsWithChildren = { ...element.props, children: element.children.flat(Infinity) };
      return __classPrivateFieldGet21(this, _BlocksHandler_instances, "m", _BlocksHandler_render).call(this, element.type, propsWithChildren, context);
    } else {
      try {
        context.push({ namespace: element.type, ...element.props });
        const reifiedChildren = __classPrivateFieldGet21(this, _BlocksHandler_instances, "m", _BlocksHandler_renderList).call(this, element.children, context);
        const reifiedProps = __classPrivateFieldGet21(this, _BlocksHandler_instances, "m", _BlocksHandler_reifyProps).call(this, element.props ?? {});
        return [{ type: element.type, children: reifiedChildren, props: reifiedProps }];
      } finally {
        context.pop();
      }
    }
  } else {
    return [(element ?? "").toString()];
  }
}, _BlocksHandler_reifyProps = function _BlocksHandler_reifyProps2(props) {
  const reifiedProps = {};
  for (const key in props) {
    if (typeof props[key] === "undefined") {
    } else if (typeof props[key] === "function") {
      const hook = registerHook({
        namespace: key,
        key: false,
        initializer: ({ hookId }) => ({
          hookId,
          state: null,
          onUIEvent: (event) => {
            if (event.userAction) {
              return props[key](event.userAction.data);
            } else if (event.webView?.postMessage) {
              return props[key](event.webView.postMessage.message);
            }
          }
        })
      });
      reifiedProps[key] = hook.hookId;
      if ("captureHookRef" in props[key]) {
        props[key].captureHookRef();
      }
    } else {
      const value = JSON.parse(JSON.stringify(props[key]));
      if (value !== void 0 && value !== null) {
        reifiedProps[key] = value;
      }
    }
  }
  return reifiedProps;
};
function isBlockElement(e) {
  return typeof e === "object" && e != null && "type" in e;
}

// node_modules/@devvit/public-api/devvit/internals/upgrade-app-shim.js
var getVersionNumberFromRawVersion = (rawVersion) => {
  const versionNumber = Number(rawVersion.trim().split(".").pop());
  return isNaN(versionNumber) ? void 0 : versionNumber;
};
var parseDevvitUserAgent = (input) => {
  const [company, platform, rawVersion] = input.trim().split(";");
  if (!company || !platform || !rawVersion) {
    console.warn(`Received a malformed devvit-user-agent! Received: '${input}'`);
    return;
  }
  if (company !== "Reddit") {
    console.warn(`Received unknown company name in user agent! Received: '${input}'`);
    return;
  }
  if (platform === "iOS") {
    const versionNumber = getVersionNumberFromRawVersion(rawVersion);
    if (versionNumber === void 0) {
      console.warn(`Could not parse version number from user agent! Received: '${input}'`);
      return;
    }
    return {
      company: "Reddit",
      platform: "iOS",
      rawVersion,
      versionNumber
    };
  }
  if (platform === "Android") {
    const versionNumber = getVersionNumberFromRawVersion(rawVersion);
    if (versionNumber === void 0) {
      console.warn(`Could not parse version number from user agent! Received: '${input}'`);
      return;
    }
    return {
      company: "Reddit",
      platform: "Android",
      rawVersion,
      versionNumber
    };
  }
  if (platform === "Shreddit") {
    return {
      company: "Reddit",
      platform: "Shreddit",
      rawVersion
    };
  }
  if (platform === "Play") {
    return {
      company: "Reddit",
      platform: "Play",
      rawVersion
    };
  }
  console.warn(`Received unknown platform:`, platform);
};
var shouldShowUpgradeAppScreen = (parsedDevvitUserAgent) => {
  if (!parsedDevvitUserAgent) {
    console.warn(`Could not parse devvit-user-agent! Received: '${JSON.stringify(parsedDevvitUserAgent)}'`);
    return false;
  }
  if (parsedDevvitUserAgent.platform === "Android") {
    return parsedDevvitUserAgent.versionNumber < 1875012;
  }
  if (parsedDevvitUserAgent.platform === "iOS") {
    return parsedDevvitUserAgent.versionNumber < 614973;
  }
  return false;
};
var getUpgradeLinkForPlatform = (platform) => {
  switch (platform) {
    case "Android":
      return "https://play.google.com/store/apps/details?id=com.reddit.frontpage";
    case "iOS":
      return "https://apps.apple.com/us/app/reddit/id1064216828";
    case "Play":
    case "Shreddit":
      break;
    default:
      console.error(`No upgrade link for platform: ${platform}`);
  }
};
var UpgradeAppComponent = ({ platform }, context) => {
  return Devvit.createElement(
    "blocks",
    null,
    Devvit.createElement(
      "vstack",
      { alignment: "middle center", height: 100, width: 100 },
      Devvit.createElement(
        "vstack",
        { maxWidth: "300px", gap: "large", alignment: "middle center" },
        Devvit.createElement(
          "vstack",
          { gap: "medium", alignment: "middle center" },
          Devvit.createElement("image", { imageHeight: 100, imageWidth: 100, url: "https://i.redd.it/p1vmc5ulmpib1.png" }),
          Devvit.createElement("text", { size: "large", weight: "bold", wrap: true, alignment: "center" }, "Uh oh, the app you're trying to use requires the latest version of Reddit. Please upgrade your app to continue.")
        ),
        Devvit.createElement(
          "hstack",
          { alignment: "middle center" },
          Devvit.createElement("button", { onPress: () => {
            const upgradeLink = getUpgradeLinkForPlatform(platform);
            if (upgradeLink) {
              context.ui.navigateTo(upgradeLink);
            } else {
              console.warn(`No upgrade link found for platform:`, platform);
            }
          } }, "Upgrade")
        )
      )
    )
  );
};
var makeUpgradeAppComponent = (platform) => () => Devvit.createElement(UpgradeAppComponent, { platform });

// node_modules/@devvit/public-api/devvit/internals/ui-request-handler.js
var FeatureUnavailable = () => Devvit.createElement(
  "vstack",
  { alignment: "center middle", width: "100%", height: "100%" },
  Devvit.createElement("text", null, "This feature is not available yet")
);
var UIComponentBindings = [
  [
    import_protos26.CustomPostDefinition,
    import_protos26.CustomPostDefinition.methods["renderPostContent"],
    (_props, context) => Devvit.customPostType?.render(context) ?? null
  ],
  [
    import_protos26.CustomPostDefinition,
    import_protos26.CustomPostDefinition.methods["renderPostComposer"],
    (_props, _context) => Devvit.createElement(FeatureUnavailable, null)
  ]
];
function makeHandler(component) {
  return async (req, metadata) => {
    const parsedUserAgent = parseDevvitUserAgent(metadata["devvit-user-agent"]?.values?.[0] ?? "");
    if (parsedUserAgent && shouldShowUpgradeAppScreen(parsedUserAgent)) {
      const handler2 = new BlocksHandler(makeUpgradeAppComponent(parsedUserAgent.platform));
      return import_protos26.UIResponse.fromJSON(await handler2.handle(req, metadata));
    }
    const handler = new BlocksHandler(component);
    return import_protos26.UIResponse.fromJSON(await handler.handle(req, metadata));
  };
}
function registerUIRequestHandlers(config) {
  for (const [definition, method, component] of UIComponentBindings) {
    config.provides(definition);
    extendDevvitPrototype(method.name, makeHandler(component));
  }
}

// node_modules/@devvit/public-api/devvit/Devvit.js
var __classPrivateFieldGet22 = function(receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet22 = function(receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var _a2;
var _Devvit_appSettings;
var _Devvit_assets;
var _Devvit_config;
var _Devvit_customPostType;
var _Devvit_formDefinitions;
var _Devvit_installationSettings;
var _Devvit_menuItems;
var _Devvit_scheduledJobHandlers;
var _Devvit_triggerOnEventHandlers;
var _Devvit_webViewAssets;
var _Devvit_additionallyProvides;
var _Devvit_uses;
var _Devvit_pluginClients;
var Devvit = class extends Actor {
  /**
   * To use certain APIs and features of Devvit, you must enable them using this function.
   *
   * @param config - The configuration object.
   * @param config.http - Enables the HTTP API.
   * @param config.redditAPI - Enables the Reddit API.
   * @param config.kvStore - Enables the Key Value Storage API.
   * @example
   * ```ts
   * Devvit.configure({
   *   http: true,
   *   redditAPI: true,
   *   redis: true,
   *   media: true
   * });
   * ```
   */
  static configure(config) {
    __classPrivateFieldSet22(this, _a2, { ...__classPrivateFieldGet22(this, _a2, "f", _Devvit_config), ...config }, "f", _Devvit_config);
    if (pluginIsEnabled(config.http)) {
      this.use(protos.HTTPDefinition);
    }
    const redisNotSpecified = config.redis === void 0;
    if (redisNotSpecified || pluginIsEnabled(config.kvStore) || pluginIsEnabled(config.redis)) {
      this.use(protos.KVStoreDefinition);
      this.use(protos.RedisAPIDefinition);
    }
    if (pluginIsEnabled(config.media)) {
      this.use(protos.MediaServiceDefinition);
    }
    if (pluginIsEnabled(config.modLog)) {
      this.use(protos.ModlogDefinition);
    }
    if (pluginIsEnabled(config.redditAPI)) {
      this.use(protos.FlairDefinition);
      this.use(protos.GraphQLDefinition);
      this.use(protos.LinksAndCommentsDefinition);
      this.use(protos.ListingsDefinition);
      this.use(protos.ModerationDefinition);
      this.use(protos.ModNoteDefinition);
      this.use(protos.NewModmailDefinition);
      this.use(protos.PrivateMessagesDefinition);
      this.use(protos.SubredditsDefinition);
      this.use(protos.UsersDefinition);
      this.use(protos.WidgetsDefinition);
      this.use(protos.WikiDefinition);
    }
    if (pluginIsEnabled(config.realtime)) {
      this.use(protos.RealtimeDefinition);
    }
  }
  /**
   * Add a menu item to the Reddit UI.
   * @param menuItem - The menu item to add.
   * @param menuItem.label - The label of the menu item.
   * @example
   * ```ts
   * Devvit.addMenuItem({
   *   label: 'My Menu Item',
   *   location: 'subreddit',
   *   onPress: (event, context) => {
   *     const location = event.location;
   *     const targetId = event.targetId;
   *     context.ui.showToast(`You clicked on ${location} ${targetId}`);
   *   }
   * });
   * ```
   */
  static addMenuItem(menuItem) {
    __classPrivateFieldGet22(this, _a2, "f", _Devvit_menuItems).push(menuItem);
  }
  /**
   * Add a custom post type for your app.
   * @param customPostType - The custom post type to add.
   * @param customPostType.name - The name of the custom post type.
   * @param customPostType.description - An optional description.
   * @param customPostType.height - An optional parameter to set post height, defaults to 'regular'.
   * @param customPostType.render - A function or `Devvit.CustomPostComponent` that returns the UI for the custom post.
   * @example
   * ```ts
   * import { Devvit, useState } from '@devvit/public-api';
   *
   * Devvit.addCustomPostType({
   *   name: 'Counter',
   *   description: 'A simple click counter post.',
   *   render: (context) => {
   *     const [counter, setCounter] = useState();
   *
   *     return (
   *       <vstack>
   *         <text>{counter}</text>
   *         <button onPress={() => setCounter((counter) => counter + 1)}>Click me!</button>
   *       </vstack>
   *     );
   *   },
   * });
   * ```
   */
  static addCustomPostType(customPostType) {
    __classPrivateFieldSet22(this, _a2, customPostType, "f", _Devvit_customPostType);
  }
  /**
   * Create a form that can be opened from menu items and custom posts.
   * @param form - The form or a function that returns the form.
   * @param onSubmit - The function to call when the form is submitted.
   * @returns A unique key for the form that can used with `ui.showForm`.
   */
  static createForm(form, onSubmit) {
    const formKey = `form.${__classPrivateFieldGet22(this, _a2, "f", _Devvit_formDefinitions).size}`;
    __classPrivateFieldGet22(this, _a2, "f", _Devvit_formDefinitions).set(formKey, {
      form,
      onSubmit
    });
    return formKey;
  }
  /**
   * Add a scheduled job type for your app. This will allow you to schedule jobs using the `scheduler` API.
   * @param job - The scheduled job type to add.
   * @param job.name - The name of the scheduled job type.
   * @param job.onRun - The function to call when the scheduled job is run.
   * @example
   * ```ts
   * Devvit.addSchedulerJob({
   *   name: 'checkNewPosts',
   *   onRun: async (event, context) => {
   *     const newPosts = await context.reddit.getNewPosts({ limit: 5 }).all();
   *     for (const post of newPosts) {
   *       if (post.title.includes('bad word')) {
   *         await post.remove();
   *       }
   *     }
   *   }
   * });
   *
   * Devvit.addMenuItem({
   *   label: 'Check for new posts',
   *   location: 'location',
   *   onPress: (event, context) => {
   *     const = await context.scheduler.runJob({
   *       name: 'checkNewPosts',
   *       when: new Date(Date.now() + 5000) // in 5 seconds
   *     });
   *   }
   * });
   * ```
   */
  static addSchedulerJob(job) {
    if (!__classPrivateFieldGet22(this, _a2, "f", _Devvit_pluginClients)[protos.SchedulerDefinition.fullName]) {
      this.use(protos.SchedulerDefinition);
    }
    if (__classPrivateFieldGet22(this, _a2, "f", _Devvit_scheduledJobHandlers).has(job.name)) {
      throw new Error(`Job ${job.name} is already defined`);
    }
    __classPrivateFieldGet22(this, _a2, "f", _Devvit_scheduledJobHandlers).set(job.name, job.onRun);
  }
  /**
   * Add settings that can be configured to customize the behavior of your app. There are two levels of settings: App settings (scope: 'app') and
   * install settings (scope: 'installation' or unspecified scope). Install settings are meant to be configured by the user that installs your app.
   * This is a good place to add anything that a user might want to change to personalize the app (e.g. the default city to show the weather for or a
   * specific sport team that a subreddit follows). Note that these are good for subreddit level customization but not necessarily good for things
   * that might be different for two users in a subreddit (e.g. setting the default city to show the weather for is only useful at a sub level if
   * the sub is for a specific city or region). Install settings can be viewed and configured here: https://developers.reddit.com/r/subreddit-name/apps/app-name.
   * App settings can be accessed and consumed by all installations of the app. This is mainly useful for developer secrets/API keys that your
   * app needs to function. They can only be changed/viewed by you via the CLI (devvit settings set and devvit settings list). This ensures secrets
   * are persisted in an encrypted store and don't get committed in the source code. You should never paste your actual key into any fields passed into
   * Devvit.addSettings - this is merely where you state what your API key's name and description are. You will be able to set the actual value of the key via CLI.
   * Note: setting names must be unique across all settings.
   * @param fields - Fields for the app and installation settings.
   * @example
   * ```ts
   * Devvit.addSettings([
   *   {
   *     type: 'string',
   *     name: 'weather-api-key',
   *     label: 'My weather.com API key',
   *     scope: SettingScope.App,
   *     isSecret: true
   *   },
   *   {
   *     type: 'string',
   *     name: 'Default City',
   *     label: 'Default city to show the weather for by default',
   *     scope: SettingScope.Installation,
   *     onValidate: ({ value }) => {
   *       if (!isValidCity(value)) {
   *         return 'You must ender a valid city: ${validCities.join(", ")}';
   *       }
   *     }
   *   },
   *   {
   *     type: 'number',
   *     name: 'Default Forecast Window (in days)',
   *     label: 'The number of days to show for forecast for by default',
   *     scope: SettingScope.Installation,
   *     onValidate: ({ value }) => {
   *       if (value > 10 || value < 1) {
   *         return 'Forecast window must be from 1 to 10 days';
   *       }
   *     }
   *   },
   * ]);
   * ```
   */
  static addSettings(fields) {
    assertValidFormFields(fields);
    const installSettings = fields.filter((field) => field.type === "group" || !field.scope || field.scope === SettingScope.Installation);
    const appSettings = fields.filter((field) => field.type !== "group" && field.scope === SettingScope.App);
    if (installSettings.length > 0) {
      __classPrivateFieldSet22(this, _a2, installSettings, "f", _Devvit_installationSettings);
    }
    if (appSettings.length > 0) {
      __classPrivateFieldSet22(this, _a2, appSettings, "f", _Devvit_appSettings);
    }
    if (!__classPrivateFieldGet22(this, _a2, "f", _Devvit_pluginClients)[protos.SettingsDefinition.fullName]) {
      this.use(protos.SettingsDefinition);
    }
  }
  static addTrigger(triggerDefinition) {
    if ("events" in triggerDefinition) {
      for (const eventType of triggerDefinition.events) {
        this.addTrigger({
          event: eventType,
          onEvent: (event, context) => triggerDefinition.onEvent(event, context)
        });
      }
      return this;
    }
    if (__classPrivateFieldGet22(this, _a2, "f", _Devvit_triggerOnEventHandlers).has(triggerDefinition.event)) {
      __classPrivateFieldGet22(this, _a2, "f", _Devvit_triggerOnEventHandlers).get(triggerDefinition.event)?.push(triggerDefinition.onEvent);
    } else {
      __classPrivateFieldGet22(this, _a2, "f", _Devvit_triggerOnEventHandlers).set(triggerDefinition.event, [
        triggerDefinition.onEvent
      ]);
    }
    return _a2;
  }
  /**
   * @internal
   * utility static method to register additional actor types without exposing an explicit
   * registration hook such as `addTrigger` or `addMenuItem`
   */
  static provide(def) {
    __classPrivateFieldGet22(this, _a2, "f", _Devvit_additionallyProvides).push(def);
  }
  /** @internal */
  static use(d, opts) {
    __classPrivateFieldGet22(this, _a2, "f", _Devvit_uses)[d.fullName] = {
      def: d,
      options: opts ?? {},
      handler: void 0
    };
    const wrapped = {};
    for (const method of Object.values(d.methods)) {
      wrapped[method.name] = (args, metadata) => __classPrivateFieldGet22(this, _a2, "f", _Devvit_uses)[d.fullName].handler?.[method.name]?.(
        // eslint-disable-next-line no-restricted-properties
        method.requestType?.fromPartial(args ?? {}),
        metadata
      );
    }
    __classPrivateFieldGet22(this, _a2, "f", _Devvit_pluginClients)[d.fullName] = wrapped;
    return wrapped;
  }
  /** @internal */
  static get redditAPIPlugins() {
    if (!pluginIsEnabled(__classPrivateFieldGet22(this, _a2, "f", _Devvit_config).redditAPI)) {
      throw new Error("Reddit API is not enabled. You can enable it by passing `redditAPI: true` to `Devvit.configure`.");
    }
    return {
      Flair: __classPrivateFieldGet22(this, _a2, "f", _Devvit_pluginClients)[protos.FlairDefinition.fullName],
      GraphQL: __classPrivateFieldGet22(this, _a2, "f", _Devvit_pluginClients)[protos.GraphQLDefinition.fullName],
      LinksAndComments: __classPrivateFieldGet22(this, _a2, "f", _Devvit_pluginClients)[protos.LinksAndCommentsDefinition.fullName],
      Listings: __classPrivateFieldGet22(this, _a2, "f", _Devvit_pluginClients)[protos.ListingsDefinition.fullName],
      Moderation: __classPrivateFieldGet22(this, _a2, "f", _Devvit_pluginClients)[protos.ModerationDefinition.fullName],
      ModNote: __classPrivateFieldGet22(this, _a2, "f", _Devvit_pluginClients)[protos.ModNoteDefinition.fullName],
      NewModmail: __classPrivateFieldGet22(this, _a2, "f", _Devvit_pluginClients)[protos.NewModmailDefinition.fullName],
      PrivateMessages: __classPrivateFieldGet22(this, _a2, "f", _Devvit_pluginClients)[protos.PrivateMessagesDefinition.fullName],
      Subreddits: __classPrivateFieldGet22(this, _a2, "f", _Devvit_pluginClients)[protos.SubredditsDefinition.fullName],
      Users: __classPrivateFieldGet22(this, _a2, "f", _Devvit_pluginClients)[protos.UsersDefinition.fullName],
      Widgets: __classPrivateFieldGet22(this, _a2, "f", _Devvit_pluginClients)[protos.WidgetsDefinition.fullName],
      Wiki: __classPrivateFieldGet22(this, _a2, "f", _Devvit_pluginClients)[protos.WikiDefinition.fullName]
    };
  }
  /** @internal */
  static get modLogPlugin() {
    const modLog = __classPrivateFieldGet22(this, _a2, "f", _Devvit_pluginClients)[protos.ModlogDefinition.fullName];
    if (!modLog) {
      throw new Error("ModLog is not enabled. You can enable it by passing `modLog: true` to `Devvit.configure`");
    }
    return modLog;
  }
  /** @internal */
  static get schedulerPlugin() {
    const scheduler = __classPrivateFieldGet22(this, _a2, "f", _Devvit_pluginClients)[protos.SchedulerDefinition.fullName];
    if (!scheduler) {
      throw new Error("Scheduler is not enabled. You can enable it by calling `Devvit.addSchedulerJob` at the top level of your app.");
    }
    return scheduler;
  }
  /** @internal */
  static get kvStorePlugin() {
    const kvStore = __classPrivateFieldGet22(this, _a2, "f", _Devvit_pluginClients)[protos.KVStoreDefinition.fullName];
    if (!kvStore) {
      throw new Error("Key Value Store is not enabled. You can enable it by passing `kvStore: true` to `Devvit.configure`");
    }
    return kvStore;
  }
  /** @internal */
  static get redisPlugin() {
    const redis = __classPrivateFieldGet22(this, _a2, "f", _Devvit_pluginClients)[protos.RedisAPIDefinition.fullName];
    if (!redis) {
      throw new Error("Redis is not enabled. You can enable it by passing `redis: true` to `Devvit.configure`");
    }
    return redis;
  }
  /** @internal */
  static get mediaPlugin() {
    const media = __classPrivateFieldGet22(this, _a2, "f", _Devvit_pluginClients)[protos.MediaServiceDefinition.fullName];
    if (!media) {
      throw new Error("MediaService is not enabled. You can enable it by passing `media: true` to `Devvit.configure`");
    }
    return media;
  }
  /** @internal */
  static get settingsPlugin() {
    const settings = __classPrivateFieldGet22(this, _a2, "f", _Devvit_pluginClients)[protos.SettingsDefinition.fullName];
    if (!settings) {
      throw new Error("Settings must first be configured with `Devvit.addSettings()` before they can be accessed");
    }
    return settings;
  }
  /** @internal */
  static get realtimePlugin() {
    const realtime = __classPrivateFieldGet22(this, _a2, "f", _Devvit_pluginClients)[protos.RealtimeDefinition.fullName];
    if (!realtime) {
      throw new Error("Realtime is not enabled. You can enable it by passing `realtime: true` to `Devvit.configure`");
    }
    return realtime;
  }
  /** @internal */
  static get menuItems() {
    return __classPrivateFieldGet22(this, _a2, "f", _Devvit_menuItems);
  }
  /** @internal */
  static get customPostType() {
    return __classPrivateFieldGet22(this, _a2, "f", _Devvit_customPostType);
  }
  /** @internal */
  static get formDefinitions() {
    return __classPrivateFieldGet22(this, _a2, "f", _Devvit_formDefinitions);
  }
  /** @internal */
  static get scheduledJobHandlers() {
    return __classPrivateFieldGet22(this, _a2, "f", _Devvit_scheduledJobHandlers);
  }
  /** @internal */
  static get installationSettings() {
    return __classPrivateFieldGet22(this, _a2, "f", _Devvit_installationSettings);
  }
  /** @internal */
  static get appSettings() {
    return __classPrivateFieldGet22(this, _a2, "f", _Devvit_appSettings);
  }
  /** @internal */
  static get triggerOnEventHandlers() {
    return __classPrivateFieldGet22(this, _a2, "f", _Devvit_triggerOnEventHandlers);
  }
  /** @internal */
  static get assets() {
    return __classPrivateFieldGet22(this, _a2, "f", _Devvit_assets);
  }
  /** @internal */
  static get webViewAssets() {
    return __classPrivateFieldGet22(this, _a2, "f", _Devvit_webViewAssets);
  }
  /** @internal */
  constructor(config) {
    super(config);
    __classPrivateFieldSet22(_a2, _a2, config.assets ?? {}, "f", _Devvit_assets);
    __classPrivateFieldSet22(_a2, _a2, config.webviewAssets ?? {}, "f", _Devvit_webViewAssets);
    for (const fullName in __classPrivateFieldGet22(_a2, _a2, "f", _Devvit_uses)) {
      const use = __classPrivateFieldGet22(_a2, _a2, "f", _Devvit_uses)[fullName];
      use.handler = config.use(use.def, use.options);
    }
    if (__classPrivateFieldGet22(_a2, _a2, "f", _Devvit_menuItems).length > 0) {
      registerMenuItems(config);
    }
    if (__classPrivateFieldGet22(_a2, _a2, "f", _Devvit_scheduledJobHandlers).size > 0) {
      registerScheduler(config);
    }
    if (__classPrivateFieldGet22(_a2, _a2, "f", _Devvit_customPostType)) {
      registerCustomPost(config);
      registerUIRequestHandlers(config);
    }
    if (__classPrivateFieldGet22(_a2, _a2, "f", _Devvit_customPostType) || __classPrivateFieldGet22(_a2, _a2, "f", _Devvit_formDefinitions).size > 0) {
      registerUIEventHandler(config);
    }
    if (__classPrivateFieldGet22(_a2, _a2, "f", _Devvit_installationSettings)) {
      registerInstallationSettings(config);
    }
    if (__classPrivateFieldGet22(_a2, _a2, "f", _Devvit_appSettings)) {
      registerAppSettings(config);
    }
    if (__classPrivateFieldGet22(_a2, _a2, "f", _Devvit_triggerOnEventHandlers).size > 0) {
      registerTriggers(config);
    }
    for (const provides of __classPrivateFieldGet22(_a2, _a2, "f", _Devvit_additionallyProvides)) {
      config.provides(provides);
    }
  }
};
_a2 = Devvit;
Devvit.debug = {};
_Devvit_appSettings = { value: void 0 };
_Devvit_assets = { value: {} };
_Devvit_config = { value: {} };
_Devvit_customPostType = { value: void 0 };
_Devvit_formDefinitions = { value: /* @__PURE__ */ new Map() };
_Devvit_installationSettings = { value: void 0 };
_Devvit_menuItems = { value: [] };
_Devvit_scheduledJobHandlers = { value: /* @__PURE__ */ new Map() };
_Devvit_triggerOnEventHandlers = { value: /* @__PURE__ */ new Map() };
_Devvit_webViewAssets = { value: {} };
_Devvit_additionallyProvides = { value: [] };
_Devvit_uses = { value: {} };
_Devvit_pluginClients = { value: {} };
(function(Devvit2) {
  function createElement(type, props, ...children) {
    const blockElement = {
      type,
      props,
      children
    };
    return blockElement;
  }
  Devvit2.createElement = createElement;
})(Devvit || (Devvit = {}));

// node_modules/@devvit/public-api/apis/reddit/common.js
var RunAs = {
  APP: 0,
  USER: 1
};

// node_modules/@devvit/public-api/apis/reddit/helpers/makeGettersEnumerable.js
function makeGettersEnumerable(obj) {
  const descriptors = Object.getOwnPropertyDescriptors(obj.constructor.prototype);
  for (const [key, descriptor] of Object.entries(descriptors)) {
    if (descriptor.get) {
      Object.defineProperty(obj, key, {
        ...descriptor,
        enumerable: true
      });
    }
  }
}

// node_modules/@devvit/shared-types/richtext/types.js
var FormattingFlag;
(function(FormattingFlag2) {
  FormattingFlag2[FormattingFlag2["bold"] = 1] = "bold";
  FormattingFlag2[FormattingFlag2["italic"] = 2] = "italic";
  FormattingFlag2[FormattingFlag2["underline"] = 4] = "underline";
  FormattingFlag2[FormattingFlag2["strikethrough"] = 8] = "strikethrough";
  FormattingFlag2[FormattingFlag2["subscript"] = 16] = "subscript";
  FormattingFlag2[FormattingFlag2["superscript"] = 32] = "superscript";
  FormattingFlag2[FormattingFlag2["monospace"] = 64] = "monospace";
})(FormattingFlag || (FormattingFlag = {}));
var TEXT_ELEMENT = "text";
var RAW_TEXT_ELEMENT = "raw";
var LINEBREAK_ELEMENT = "br";
var LINK_ELEMENT = "link";
var COMMENT_LINK_ELEMENT = "c/";
var POST_LINK_ELEMENT = "p/";
var SUBREDDIT_LINK_ELEMENT = "r/";
var USER_LINK_ELEMENT = "u/";
var USER_MENTION_ELEMENT = "@";
var SPOILER_TEXT_ELEMENT = "spoilertext";
var PARAGRAPH_ELEMENT = "par";
var HEADING_ELEMENT = "h";
var HORIZONTAL_RULE_ELEMENT = "hr";
var BLOCK_QUOTE_ELEMENT = "blockquote";
var CODE_BLOCK_ELEMENT = "code";
var LIST_ITEM_ELEMENT = "li";
var LIST_ELEMENT = "list";
var COLUMN_ALIGN_LEFT = "L";
var COLUMN_ALIGN_RIGHT = "R";
var COLUMN_ALIGN_CENTER = "C";
var TABLE_ELEMENT = "table";
var EMBED_ELEMENT = "embed";
var IMAGE_ELEMENT = "img";
var ANIMATED_IMAGE_ELEMENT = "gif";
var VIDEO_ELEMENT = "video";

// node_modules/@devvit/shared-types/richtext/elements.js
function makeAnimatedImage(opts) {
  return {
    e: ANIMATED_IMAGE_ELEMENT,
    id: opts.mediaId,
    ...opts.caption && { c: opts.caption },
    ...opts.blur && { o: opts.blur }
  };
}
function makeBlockQuote(opts, cb) {
  const context = {};
  const content = [];
  Object.assign(context, mixinBlockQuoteContext(context, content), mixinCodeBlockContext(context, content), mixinHeadingContext(context, content), mixinListContext(context, content), mixinParagraphContext(context, content), mixinTableContext(context, content));
  cb(context);
  return {
    e: BLOCK_QUOTE_ELEMENT,
    c: content,
    ...opts.author && { a: opts.author }
  };
}
function makeCodeBlock(opts, cb) {
  const context = {};
  const content = [];
  Object.assign(context, mixinRawTextContext(context, content));
  cb(context);
  return {
    e: CODE_BLOCK_ELEMENT,
    c: content,
    ...opts.language && { l: opts.language }
  };
}
function makeCommentLink(opts) {
  return {
    e: COMMENT_LINK_ELEMENT,
    t: opts.permalink
  };
}
function makeHeadingContext(opts, cb) {
  const context = {};
  const content = [];
  Object.assign(context, mixinRawTextContext(context, content), mixinLinkContext(context, content));
  cb(context);
  return {
    e: HEADING_ELEMENT,
    l: opts.level,
    c: content
  };
}
function makeEmbed(opts) {
  return {
    e: EMBED_ELEMENT,
    u: opts.sourceUrl,
    c: opts.contentUrl,
    x: opts.width,
    y: opts.height
  };
}
function makeHorizontalRule() {
  return { e: HORIZONTAL_RULE_ELEMENT };
}
function makeImage(opts) {
  return {
    e: IMAGE_ELEMENT,
    id: opts.mediaId,
    ...opts.caption && { c: opts.caption },
    ...opts.blur && { o: opts.blur }
  };
}
function makeLineBreak() {
  return {
    e: LINEBREAK_ELEMENT
  };
}
function makeLink(opts) {
  return {
    e: LINK_ELEMENT,
    t: opts.text,
    u: opts.url,
    ...opts.formatting && { f: opts.formatting },
    ...opts.tooltip && { a: opts.tooltip }
  };
}
function makeList(opts, cb) {
  const context = {};
  const content = [];
  Object.assign(context, mixinListItemContext(context, content));
  cb(context);
  return {
    e: LIST_ELEMENT,
    o: opts.ordered,
    c: content
  };
}
function makeListItem(cb) {
  const context = {};
  const content = [];
  Object.assign(context, mixinBlockQuoteContext(context, content), mixinCodeBlockContext(context, content), mixinHeadingContext(context, content), mixinHorizontalRuleContext(context, content), mixinListContext(context, content), mixinParagraphContext(context, content), mixinTableContext(context, content));
  cb(context);
  return {
    e: LIST_ITEM_ELEMENT,
    c: content
  };
}
function makeParagraph(cb) {
  const context = {};
  const content = [];
  Object.assign(context, mixinTextContext(context, content), mixinLinkContext(context, content), mixinLineBreakContext(context, content), mixinSpoilerContext(context, content), mixinImageContext(context, content));
  cb(context);
  return {
    e: PARAGRAPH_ELEMENT,
    c: content
  };
}
function makePostLink(opts) {
  return {
    e: POST_LINK_ELEMENT,
    t: opts.permalink
  };
}
function makeRawText(text) {
  return {
    e: RAW_TEXT_ELEMENT,
    t: text
  };
}
function makeSpoilerText(cb) {
  const context = {};
  const content = [];
  Object.assign(context, mixinTextContext(context, content), mixinLinkContext(context, content), mixinLineBreakContext(context, content));
  cb(context);
  return {
    e: SPOILER_TEXT_ELEMENT,
    c: content
  };
}
function makeSubredditLink(opts) {
  return {
    e: SUBREDDIT_LINK_ELEMENT,
    t: opts.subredditName,
    l: opts.showPrefix
  };
}
function makeTable(cb) {
  const context = {};
  const headerContent = [];
  const rowContent = [];
  Object.assign(context, mixinTableContentContext(context, headerContent, rowContent));
  cb(context);
  return {
    e: TABLE_ELEMENT,
    h: headerContent,
    c: rowContent
  };
}
function makeTableCell(cb) {
  const [context, content] = tableCellTextContext();
  cb(context);
  return {
    c: content
  };
}
function makeTableHeaderCell(opts, cb) {
  const [context, content] = tableCellTextContext();
  cb(context);
  let alignment;
  switch (opts.columnAlignment) {
    case "left":
      alignment = COLUMN_ALIGN_LEFT;
      break;
    case "right":
      alignment = COLUMN_ALIGN_RIGHT;
      break;
    case "center":
      alignment = COLUMN_ALIGN_CENTER;
      break;
  }
  return {
    ...alignment && { a: alignment },
    ...content && { c: content }
  };
}
function makeTableRow(cb) {
  const context = {};
  const content = [];
  Object.assign(context, mixinTableRowContext(context, content));
  cb(context);
  return content;
}
function makeText(opts) {
  return {
    e: TEXT_ELEMENT,
    t: opts.text,
    ...opts.formatting && { f: opts.formatting }
  };
}
function makeUserLink(opts) {
  return {
    e: USER_LINK_ELEMENT,
    t: opts.username,
    l: opts.showPrefix
  };
}
function makeUserMention(opts) {
  return {
    e: USER_MENTION_ELEMENT,
    t: opts.username,
    l: opts.showPrefix
  };
}
function makeVideo(opts) {
  return {
    e: VIDEO_ELEMENT,
    id: opts.mediaId,
    ...opts.caption && { c: opts.caption },
    ...opts.blur && { o: opts.blur },
    ...opts.thumbnail && { p: opts.thumbnail },
    ...opts.convertToGif && { gifify: opts.convertToGif }
  };
}
function tableCellTextContext() {
  const context = {};
  const content = [];
  Object.assign(context, mixinTextContext(context, content), mixinLinkContext(context, content), mixinSpoilerContext(context, content), mixinImageContext(context, content));
  return [context, content];
}

// node_modules/@devvit/shared-types/richtext/mixins.js
function mixinBlockQuoteContext(ctx, c) {
  return {
    blockQuote(opts, cb) {
      c.push(makeBlockQuote(opts, cb));
      return ctx;
    }
  };
}
function mixinCodeBlockContext(ctx, c) {
  return {
    codeBlock(opts, cb) {
      c.push(makeCodeBlock(opts, cb));
      return ctx;
    }
  };
}
function mixinEmbedContext(ctx, c) {
  return {
    embed(opts) {
      c.push(makeEmbed(opts));
      return ctx;
    }
  };
}
function mixinHeadingContext(ctx, c) {
  return {
    heading(opts, cb) {
      c.push(makeHeadingContext(opts, cb));
      return ctx;
    }
  };
}
function mixinHorizontalRuleContext(ctx, c) {
  return {
    horizontalRule() {
      c.push(makeHorizontalRule());
      return ctx;
    }
  };
}
function mixinImageContext(ctx, c) {
  return {
    image(opts) {
      c.push(makeImage(opts));
      return ctx;
    },
    animatedImage(opts) {
      c.push(makeAnimatedImage(opts));
      return ctx;
    }
  };
}
function mixinLineBreakContext(ctx, c) {
  return {
    linebreak() {
      c.push(makeLineBreak());
      return ctx;
    }
  };
}
function mixinLinkContext(ctx, c) {
  return {
    link(opts) {
      c.push(makeLink(opts));
      return ctx;
    },
    commentLink(opts) {
      c.push(makeCommentLink(opts));
      return ctx;
    },
    postLink(opts) {
      c.push(makePostLink(opts));
      return ctx;
    },
    subredditLink(opts) {
      c.push(makeSubredditLink(opts));
      return ctx;
    },
    userLink(opts) {
      c.push(makeUserLink(opts));
      return ctx;
    },
    userMention(opts) {
      c.push(makeUserMention(opts));
      return ctx;
    }
  };
}
function mixinListContext(ctx, c) {
  return {
    list(opts, cb) {
      c.push(makeList(opts, cb));
      return ctx;
    }
  };
}
function mixinListItemContext(ctx, c) {
  return {
    item(cb) {
      c.push(makeListItem(cb));
      return ctx;
    }
  };
}
function mixinParagraphContext(ctx, c) {
  return {
    paragraph(cb) {
      c.push(makeParagraph(cb));
      return ctx;
    }
  };
}
function mixinRawTextContext(ctx, c) {
  return {
    rawText(text) {
      c.push(makeRawText(text));
      return ctx;
    }
  };
}
function mixinSpoilerContext(ctx, c) {
  return {
    spoiler(cb) {
      c.push(makeSpoilerText(cb));
      return ctx;
    }
  };
}
function mixinTableContentContext(ctx, h, c) {
  return {
    headerCell(opts, cb) {
      h.push(makeTableHeaderCell(opts, cb));
      return ctx;
    },
    row(cb) {
      c.push(makeTableRow(cb));
      return ctx;
    }
  };
}
function mixinTableContext(ctx, c) {
  return {
    table(cb) {
      c.push(makeTable(cb));
      return ctx;
    }
  };
}
function mixinTableRowContext(ctx, c) {
  return {
    cell(cb) {
      c.push(makeTableCell(cb));
      return ctx;
    }
  };
}
function mixinTextContext(ctx, c) {
  return {
    text(opts) {
      c.push(makeText(opts));
      return ctx;
    }
  };
}
function mixinVideoContext(ctx, c) {
  return {
    video(opts) {
      c.push(makeVideo(opts));
      return ctx;
    }
  };
}

// node_modules/@devvit/shared-types/richtext/RichTextBuilder.js
var __classPrivateFieldSet23 = function(receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet23 = function(receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _RichTextBuilder_content;
var RichTextBuilder = class {
  constructor() {
    _RichTextBuilder_content.set(this, void 0);
    const content = [];
    Object.assign(this, mixinParagraphContext(this, content), mixinHeadingContext(this, content), mixinHorizontalRuleContext(this, content), mixinBlockQuoteContext(this, content), mixinCodeBlockContext(this, content), mixinEmbedContext(this, content), mixinListContext(this, content), mixinTableContext(this, content), mixinImageContext(this, content), mixinVideoContext(this, content));
    __classPrivateFieldSet23(this, _RichTextBuilder_content, {
      document: content
    }, "f");
  }
  /**
   * Serializes the document to a JSON string
   */
  build() {
    return JSON.stringify(__classPrivateFieldGet23(this, _RichTextBuilder_content, "f"));
  }
  // #region Empty interface methods
  /* These are here to satisfy the interfaces but are overwritten by the mixins in the constructor */
  paragraph(_cb) {
    return this;
  }
  heading(_opts, _cb) {
    return this;
  }
  horizontalRule() {
    return this;
  }
  blockQuote(_opts, _cb) {
    return this;
  }
  codeBlock(_opts, _cb) {
    return this;
  }
  embed(_opts) {
    return this;
  }
  list(_opts, _cb) {
    return this;
  }
  table(_cb) {
    return this;
  }
  image(_opts) {
    return this;
  }
  animatedImage(_opts) {
    return this;
  }
  video(_opts) {
    return this;
  }
};
_RichTextBuilder_content = /* @__PURE__ */ new WeakMap();

// node_modules/@devvit/public-api/apis/reddit/helpers/richtextToString.js
function richtextToString(richtext) {
  let richtextString;
  if (richtext instanceof RichTextBuilder) {
    richtextString = richtext.build();
  } else if (typeof richtext === "object") {
    richtextString = JSON.stringify(richtext);
  } else {
    richtextString = richtext;
  }
  return richtextString;
}

// node_modules/@devvit/public-api/apis/reddit/models/Listing.js
var __classPrivateFieldSet24 = function(receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet24 = function(receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Listing_instances;
var _Listing_before;
var _Listing_after;
var _Listing_more;
var _Listing_started;
var _Listing_next;
var DEFAULT_PAGE_SIZE = 100;
var DEFAULT_LIMIT = Infinity;
var Listing = class {
  /**
   * @internal
   */
  constructor(options) {
    _Listing_instances.add(this);
    _Listing_before.set(this, void 0);
    _Listing_after.set(this, void 0);
    _Listing_more.set(this, void 0);
    _Listing_started.set(this, false);
    this.pageSize = DEFAULT_PAGE_SIZE;
    this.limit = DEFAULT_LIMIT;
    this.children = [];
    makeGettersEnumerable(this);
    this._fetch = options.fetch;
    this.pageSize = options.pageSize ?? DEFAULT_PAGE_SIZE;
    this.limit = options.limit ?? DEFAULT_LIMIT;
    __classPrivateFieldSet24(this, _Listing_after, options.after, "f");
    __classPrivateFieldSet24(this, _Listing_before, options.before, "f");
    __classPrivateFieldSet24(this, _Listing_more, options.more, "f");
    if (options.children) {
      this.children = options.children;
    }
  }
  get hasMore() {
    return !__classPrivateFieldGet24(this, _Listing_started, "f") || Boolean(__classPrivateFieldGet24(this, _Listing_after, "f") || __classPrivateFieldGet24(this, _Listing_before, "f") || __classPrivateFieldGet24(this, _Listing_more, "f"));
  }
  async *[(_Listing_before = /* @__PURE__ */ new WeakMap(), _Listing_after = /* @__PURE__ */ new WeakMap(), _Listing_more = /* @__PURE__ */ new WeakMap(), _Listing_started = /* @__PURE__ */ new WeakMap(), _Listing_instances = /* @__PURE__ */ new WeakSet(), Symbol.asyncIterator)]() {
    let currentIndex = 0;
    while (true) {
      if (currentIndex === this.children.length) {
        if (this.hasMore) {
          const nextPage = await __classPrivateFieldGet24(this, _Listing_instances, "m", _Listing_next).call(this);
          if (nextPage.length === 0) {
            break;
          }
        } else {
          break;
        }
      }
      yield this.children[currentIndex];
      currentIndex++;
      if (currentIndex === this.limit) {
        break;
      }
    }
  }
  setMore(more) {
    __classPrivateFieldSet24(this, _Listing_more, more, "f");
  }
  preventInitialFetch() {
    __classPrivateFieldSet24(this, _Listing_started, true, "f");
  }
  async all() {
    while (this.hasMore && this.children.length < this.limit) {
      await __classPrivateFieldGet24(this, _Listing_instances, "m", _Listing_next).call(this);
    }
    return this.children.slice(0, this.limit);
  }
  async get(count) {
    const limit = count <= this.limit ? count : this.limit;
    while (this.hasMore && this.children.length < limit) {
      await __classPrivateFieldGet24(this, _Listing_instances, "m", _Listing_next).call(this);
    }
    return this.children.slice(0, limit);
  }
};
_Listing_next = async function _Listing_next2() {
  if (!this.hasMore) {
    throw new Error("This listing does not have any more items to load.");
  }
  const { children, before, after, more } = await this._fetch({
    before: __classPrivateFieldGet24(this, _Listing_before, "f"),
    after: __classPrivateFieldGet24(this, _Listing_after, "f"),
    limit: this.pageSize,
    more: __classPrivateFieldGet24(this, _Listing_more, "f")
  });
  this.children.push(...children);
  __classPrivateFieldSet24(this, _Listing_before, before, "f");
  __classPrivateFieldSet24(this, _Listing_after, after, "f");
  __classPrivateFieldSet24(this, _Listing_more, more, "f");
  __classPrivateFieldSet24(this, _Listing_started, true, "f");
  return children;
};

// node_modules/@devvit/public-api/apis/reddit/models/ModNote.js
var __classPrivateFieldGet25 = function(receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _a3;
var _ModNote_fromProto;
var ModNote = class {
  /**
   * @internal
   */
  constructor() {
  }
  /** @internal */
  static get(options, metadata) {
    const client = Devvit.redditAPIPlugins.ModNote;
    return new Listing({
      hasMore: true,
      before: options.before,
      limit: options.limit,
      pageSize: options.limit,
      fetch: async (fetchOptions) => {
        const protoRes = await client.GetNotes({
          subreddit: options.subreddit,
          user: options.user,
          filter: options.filter,
          before: fetchOptions.before,
          limit: fetchOptions.limit
        }, metadata);
        return {
          children: protoRes.modNotes?.map((protoModNote) => __classPrivateFieldGet25(this, _a3, "m", _ModNote_fromProto).call(this, protoModNote)) || [],
          // if the response says that there are no more pages, then we should set before to undefined
          // to prevent more requests from being made
          before: protoRes.hasNextPage ? protoRes.endCursor : void 0,
          hasMore: protoRes.hasNextPage
        };
      }
    });
  }
  /** @internal */
  static async delete(options, metadata) {
    const client = Devvit.redditAPIPlugins.ModNote;
    const { deleted } = await client.DeleteNotes(options, metadata);
    return !!deleted;
  }
  /** @internal */
  static async add(options, metadata) {
    const client = Devvit.redditAPIPlugins.ModNote;
    const res = await client.PostNotes(options, metadata);
    if (!res?.created) {
      throw new Error("Failed to create mod note");
    }
    return __classPrivateFieldGet25(this, _a3, "m", _ModNote_fromProto).call(this, res.created);
  }
  /** @internal */
  static async addRemovalNote(options, metadata) {
    const client = Devvit.redditAPIPlugins.ModNote;
    await client.PostRemovalNote(options, metadata);
  }
};
_a3 = ModNote, _ModNote_fromProto = function _ModNote_fromProto2(protoModNote) {
  assertNonNull(protoModNote.id, "Mod note ID is null or undefined");
  assertNonNull(protoModNote.createdAt, "Mod note createdAt is null or undefined");
  assertNonNull(protoModNote.type, "Mod note type is null or undefined");
  assertNonNull(protoModNote.subreddit, "Mod note subreddit is null or undefined");
  assertNonNull(protoModNote.subredditId, "Mod note subredditId is null or undefined");
  assertNonNull(protoModNote.operator, "Mod note operator is null or undefined");
  assertNonNull(protoModNote.operatorId, "Mod note operatorId is null or undefined");
  assertNonNull(protoModNote.user, "Mod note user is null or undefined");
  assertNonNull(protoModNote.userId, "Mod note userId is null or undefined");
  assertNonNull(protoModNote.userNoteData, "Mod note userNote is null or undefined");
  assertNonNull(protoModNote.modActionData, "Mod note modAction is null or undefined");
  return {
    id: protoModNote.id,
    user: {
      id: asT2ID(protoModNote.userId ?? ""),
      name: protoModNote.user
    },
    subreddit: {
      id: asT5ID(protoModNote.subredditId ?? ""),
      name: protoModNote.subreddit
    },
    operator: {
      id: asT2ID(protoModNote.operatorId ?? ""),
      name: protoModNote.operator
    },
    createdAt: new Date(protoModNote.createdAt * 1e3),
    // convert to ms
    userNote: {
      note: protoModNote.userNoteData?.note,
      redditId: protoModNote.userNoteData?.redditId ? asTID(protoModNote.userNoteData?.redditId) : void 0,
      label: protoModNote.userNoteData?.label
    },
    type: protoModNote.type
  };
};

// node_modules/@devvit/public-api/apis/reddit/graphql/GraphQL.js
var GraphQL = class {
  /** @internal */
  static queryWithQueryString(q, metadata) {
    return Devvit.redditAPIPlugins.GraphQL.Query({
      query: q
    }, metadata);
  }
  /** @internal */
  static query(operationName, id, variables, metadata) {
    return Devvit.redditAPIPlugins.GraphQL.PersistedQuery({
      operationName,
      id,
      variables
    }, metadata);
  }
};

// node_modules/@devvit/public-api/apis/reddit/helpers/permissions.js
var MODERATOR_PERMISSIONS = [
  "all",
  "wiki",
  "posts",
  "access",
  "mail",
  "config",
  "flair",
  "channels",
  "chat_config",
  "chat_operator",
  "community_chat"
];
function formatPermissions(permissions, allPermissions) {
  return allPermissions.map((permission) => (permissions.includes(permission) ? "+" : "-") + permission).join(",");
}
function formatModeratorPermissions(permissions) {
  return formatPermissions(permissions, MODERATOR_PERMISSIONS);
}
function validModPermissions(permissions) {
  return permissions.filter((permission) => MODERATOR_PERMISSIONS.includes(permission));
}

// node_modules/@devvit/public-api/apis/reddit/models/Flair.js
var import_protos27 = require("@devvit/protos");
var __classPrivateFieldSet25 = function(receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet26 = function(receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _a4;
var _FlairTemplate_id;
var _FlairTemplate_subredditName;
var _FlairTemplate_text;
var _FlairTemplate_textColor;
var _FlairTemplate_backgroundColor;
var _FlairTemplate_allowableContent;
var _FlairTemplate_modOnly;
var _FlairTemplate_maxEmojis;
var _FlairTemplate_allowUserEdits;
var _FlairTemplate_metadata;
var _FlairTemplate_createOrUpdateFlairTemplate;
var _b;
var _Flair_setFlair;
var _Flair_setUserFlairBatch;
var _Flair_removeFlair;
var FlairType;
(function(FlairType2) {
  FlairType2["User"] = "USER_FLAIR";
  FlairType2["Post"] = "LINK_FLAIR";
})(FlairType || (FlairType = {}));
var FlairTemplate = class {
  /**
   * @internal
   */
  constructor(data, subredditName, metadata) {
    _FlairTemplate_id.set(this, void 0);
    _FlairTemplate_subredditName.set(this, void 0);
    _FlairTemplate_text.set(this, void 0);
    _FlairTemplate_textColor.set(this, void 0);
    _FlairTemplate_backgroundColor.set(this, void 0);
    _FlairTemplate_allowableContent.set(this, void 0);
    _FlairTemplate_modOnly.set(this, void 0);
    _FlairTemplate_maxEmojis.set(this, void 0);
    _FlairTemplate_allowUserEdits.set(this, void 0);
    _FlairTemplate_metadata.set(this, void 0);
    makeGettersEnumerable(this);
    assertNonNull(data.id);
    assertNonNull(data.text);
    __classPrivateFieldSet25(this, _FlairTemplate_id, data.id, "f");
    __classPrivateFieldSet25(this, _FlairTemplate_subredditName, subredditName, "f");
    __classPrivateFieldSet25(this, _FlairTemplate_text, data.text, "f");
    __classPrivateFieldSet25(this, _FlairTemplate_textColor, asFlairTextColor(data.textColor), "f");
    __classPrivateFieldSet25(this, _FlairTemplate_backgroundColor, asFlairBackgroundColor(data.backgroundColor), "f");
    __classPrivateFieldSet25(this, _FlairTemplate_allowableContent, asAllowableContent(data.allowableContent), "f");
    __classPrivateFieldSet25(this, _FlairTemplate_modOnly, data.modOnly, "f");
    __classPrivateFieldSet25(this, _FlairTemplate_maxEmojis, data.maxEmojis, "f");
    __classPrivateFieldSet25(this, _FlairTemplate_allowUserEdits, data.textEditable, "f");
    __classPrivateFieldSet25(this, _FlairTemplate_metadata, metadata, "f");
  }
  /** The flair template's ID */
  get id() {
    return __classPrivateFieldGet26(this, _FlairTemplate_id, "f");
  }
  /** The flair template's text */
  get text() {
    return __classPrivateFieldGet26(this, _FlairTemplate_text, "f");
  }
  /** The flair template's text color. Either 'dark' or 'light'. */
  get textColor() {
    return __classPrivateFieldGet26(this, _FlairTemplate_textColor, "f");
  }
  /** The flair template's background color. Either 'transparent' or a hex color code. e.g. #FFC0CB */
  get backgroundColor() {
    return __classPrivateFieldGet26(this, _FlairTemplate_backgroundColor, "f");
  }
  /** The flair template's allowable content. Either 'all', 'emoji', or 'text'. */
  get allowableContent() {
    return __classPrivateFieldGet26(this, _FlairTemplate_allowableContent, "f");
  }
  /** Is the flair template only available to moderators? */
  get modOnly() {
    return __classPrivateFieldGet26(this, _FlairTemplate_modOnly, "f");
  }
  /** The flair template's maximum number of emojis. */
  get maxEmojis() {
    return __classPrivateFieldGet26(this, _FlairTemplate_maxEmojis, "f");
  }
  /** Does the flair template allow users to edit their flair? */
  get allowUserEdits() {
    return __classPrivateFieldGet26(this, _FlairTemplate_allowUserEdits, "f");
  }
  /** Delete this flair template */
  async delete() {
    return _a4.deleteFlairTemplate(__classPrivateFieldGet26(this, _FlairTemplate_id, "f"), __classPrivateFieldGet26(this, _FlairTemplate_subredditName, "f"), __classPrivateFieldGet26(this, _FlairTemplate_metadata, "f"));
  }
  /** Edit this flair template */
  async edit(options) {
    return _a4.editFlairTemplate({
      id: __classPrivateFieldGet26(this, _FlairTemplate_id, "f"),
      subredditName: __classPrivateFieldGet26(this, _FlairTemplate_subredditName, "f"),
      text: options.text ?? __classPrivateFieldGet26(this, _FlairTemplate_text, "f"),
      allowableContent: options.allowableContent ?? __classPrivateFieldGet26(this, _FlairTemplate_allowableContent, "f"),
      backgroundColor: options.backgroundColor ?? __classPrivateFieldGet26(this, _FlairTemplate_backgroundColor, "f"),
      maxEmojis: options.maxEmojis ?? __classPrivateFieldGet26(this, _FlairTemplate_maxEmojis, "f"),
      modOnly: options.modOnly ?? __classPrivateFieldGet26(this, _FlairTemplate_modOnly, "f"),
      textColor: options.textColor ?? __classPrivateFieldGet26(this, _FlairTemplate_textColor, "f"),
      allowUserEdits: options.allowUserEdits ?? __classPrivateFieldGet26(this, _FlairTemplate_allowUserEdits, "f")
    }, __classPrivateFieldGet26(this, _FlairTemplate_metadata, "f"));
  }
  /** @internal */
  static async createPostFlairTemplate(options, metadata) {
    return __classPrivateFieldGet26(_a4, _a4, "m", _FlairTemplate_createOrUpdateFlairTemplate).call(_a4, { ...options, flairType: FlairType.Post }, metadata);
  }
  /** @internal */
  static async createUserFlairTemplate(options, metadata) {
    return __classPrivateFieldGet26(_a4, _a4, "m", _FlairTemplate_createOrUpdateFlairTemplate).call(_a4, { ...options, flairType: FlairType.User }, metadata);
  }
  /** @internal */
  static async editFlairTemplate(editOptions, metadata) {
    return __classPrivateFieldGet26(_a4, _a4, "m", _FlairTemplate_createOrUpdateFlairTemplate).call(_a4, editOptions, metadata);
  }
  /** @internal */
  static async getPostFlairTemplates(subredditName, metadata) {
    const client = Devvit.redditAPIPlugins.Flair;
    const response = await client.LinkFlair({
      subreddit: subredditName
    }, metadata);
    return response.flair?.map((flair) => new _a4(flair, subredditName, metadata)) || [];
  }
  /** @internal */
  static async getUserFlairTemplates(subredditName, metadata) {
    const client = Devvit.redditAPIPlugins.Flair;
    const response = await client.UserFlair({
      subreddit: subredditName
    }, metadata);
    return response.flair?.map((flair) => new _a4(flair, subredditName, metadata)) || [];
  }
  /** @internal */
  static async deleteFlairTemplate(subredditName, flairTemplateId, metadata) {
    const client = Devvit.redditAPIPlugins.Flair;
    await client.DeleteFlairTemplate({
      subreddit: subredditName,
      flairTemplateId
    }, metadata);
  }
};
_a4 = FlairTemplate, _FlairTemplate_id = /* @__PURE__ */ new WeakMap(), _FlairTemplate_subredditName = /* @__PURE__ */ new WeakMap(), _FlairTemplate_text = /* @__PURE__ */ new WeakMap(), _FlairTemplate_textColor = /* @__PURE__ */ new WeakMap(), _FlairTemplate_backgroundColor = /* @__PURE__ */ new WeakMap(), _FlairTemplate_allowableContent = /* @__PURE__ */ new WeakMap(), _FlairTemplate_modOnly = /* @__PURE__ */ new WeakMap(), _FlairTemplate_maxEmojis = /* @__PURE__ */ new WeakMap(), _FlairTemplate_allowUserEdits = /* @__PURE__ */ new WeakMap(), _FlairTemplate_metadata = /* @__PURE__ */ new WeakMap(), _FlairTemplate_createOrUpdateFlairTemplate = async function _FlairTemplate_createOrUpdateFlairTemplate2(options, metadata) {
  const { subredditName: subreddit, allowableContent = "all", backgroundColor = "transparent", flairType = "", maxEmojis = 10, modOnly = false, text, textColor = "dark", allowUserEdits: textEditable = false, id: flairTemplateId = "" } = options;
  if (modOnly && textEditable) {
    throw new Error("Cannot have a mod only flair that is editable by users");
  }
  const client = Devvit.redditAPIPlugins.Flair;
  const response = await client.FlairTemplate({
    subreddit,
    allowableContent,
    backgroundColor,
    flairType,
    maxEmojis,
    modOnly,
    text,
    textColor,
    textEditable,
    flairTemplateId,
    cssClass: "",
    overrideCss: false
  }, metadata);
  return new _a4(response, subreddit, metadata);
};
function convertUserFlairProtoToAPI(userFlair) {
  return {
    flairCssClass: userFlair.flairCssClass,
    user: userFlair.user,
    flairText: userFlair.flairText
  };
}
var Flair = class {
  /**
   * Exposes the ListFlair API. This method will return the list of user flair for the subreddit. If name
   * is specified then it will return the user flair for the given user.
   *
   * @param { GetUserFlairBySubredditOptions } options See the interface
   * @param { Metadata | undefined } metadata See the interface
   *
   * @returns { Promise<GetUserFlairBySubredditResponse> }
   *
   * @example
   * ```ts
   * const response = await reddit.flair.getUserFlairBySubreddit({
   *      subreddit: "EyeBleach",
   *      name: "badapple"
   *   },
   *   metadata
   * );
   * ```
   * @internal
   */
  static async getUserFlairBySubreddit(options, metadata) {
    const client = Devvit.redditAPIPlugins.Flair;
    return client.FlairList(options, metadata);
  }
  /** @internal */
  static setUserFlair(options, metadata) {
    return __classPrivateFieldGet26(_b, _b, "m", _Flair_setFlair).call(_b, options, metadata);
  }
  /** @internal */
  static setUserFlairBatch(subredditName, flairs, metadata) {
    return __classPrivateFieldGet26(_b, _b, "m", _Flair_setUserFlairBatch).call(_b, subredditName, flairs, metadata);
  }
  /** @internal */
  static setPostFlair(options, metadata) {
    return __classPrivateFieldGet26(_b, _b, "m", _Flair_setFlair).call(_b, {
      ...options,
      postId: asT3ID(options.postId)
    }, metadata);
  }
  /** @internal */
  static async removePostFlair(subredditName, postId, metadata) {
    return __classPrivateFieldGet26(_b, _b, "m", _Flair_removeFlair).call(_b, subredditName, postId, void 0, metadata);
  }
  /** @internal */
  static async removeUserFlair(subredditName, username, metadata) {
    return __classPrivateFieldGet26(_b, _b, "m", _Flair_removeFlair).call(_b, subredditName, void 0, username, metadata);
  }
};
_b = Flair, _Flair_setFlair = async function _Flair_setFlair2(options, metadata) {
  const client = Devvit.redditAPIPlugins.Flair;
  await client.SelectFlair({
    subreddit: options.subredditName,
    flairTemplateId: options.flairTemplateId ?? "",
    text: options.text ?? "",
    name: options.username,
    link: options.postId,
    backgroundColor: options.backgroundColor ?? "",
    textColor: options.textColor ?? "dark",
    cssClass: options.cssClass ?? "",
    returnRtjson: "none"
  }, metadata);
}, _Flair_setUserFlairBatch = async function _Flair_setUserFlairBatch2(subredditName, flairs, metadata) {
  if (!flairs.length) {
    return [];
  }
  const maxFlairsPerRequest = 100;
  if (flairs.length > maxFlairsPerRequest) {
    throw new Error("Unexpected input: flairs array cannot be longer than 100 entries.");
  }
  const csvDelimiter = ",";
  const flairCsv = flairs.map((userConfig) => {
    for (const propertyName in userConfig) {
      if (userConfig[propertyName]?.includes(csvDelimiter)) {
        throw new Error(`Unexpected input: ${propertyName} cannot contain the "," character`);
      }
    }
    return [userConfig.username, userConfig.text || "", userConfig.cssClass || ""].join(csvDelimiter);
  }).join("\n");
  const client = Devvit.redditAPIPlugins.Flair;
  const response = await client.FlairCsv({
    subreddit: subredditName,
    flairCsv
  }, metadata);
  return response.result;
}, _Flair_removeFlair = async function _Flair_removeFlair2(subredditName, postId, username, metadata) {
  const client = Devvit.redditAPIPlugins.Flair;
  await client.SelectFlair({
    subreddit: subredditName,
    name: username ?? "",
    link: postId ?? "",
    flairTemplateId: "",
    backgroundColor: "",
    text: "",
    textColor: "",
    cssClass: "",
    returnRtjson: "none"
  }, metadata);
};
function asFlairTextColor(color) {
  assertNonNull(color, "Flair text color is required");
  if (color === "light" || color === "dark") {
    return color;
  }
  throw new Error(`Invalid flair text color: ${color}`);
}
function asFlairBackgroundColor(color) {
  if (!color || color.length === 0 || color === "transparent") {
    return "transparent";
  }
  if (/^#([A-Fa-f0-9]{6})$/.test(color)) {
    return color;
  }
  throw new Error(`Invalid flair background color: ${color}`);
}
function asAllowableContent(allowableContent) {
  if (allowableContent === "all" || allowableContent === "text" || allowableContent === "emoji") {
    return allowableContent;
  }
  throw new Error(`Invalid allowable content: ${allowableContent}`);
}

// node_modules/@devvit/public-api/apis/reddit/models/Post.js
var import_protos28 = require("@devvit/protos");
var import_protos29 = require("@devvit/protos");
var import_base64_js = __toESM(require_base64_js(), 1);

// node_modules/@devvit/public-api/apis/reddit/helpers/textFallbackToRichtext.js
var getCustomPostRichTextFallback = (textFallbackOptions) => "text" in textFallbackOptions ? textFallbackOptions.text : richTextToTextFallbackString(textFallbackOptions.richtext);
var richTextToTextFallbackString = (textFallback) => {
  if (textFallback instanceof RichTextBuilder) {
    return textFallback.build();
  } else if (typeof textFallback === "object") {
    return JSON.stringify(textFallback);
  }
  return textFallback;
};

// node_modules/@devvit/public-api/apis/reddit/models/Post.js
var __classPrivateFieldSet26 = function(receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet27 = function(receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Post_id;
var _Post_authorId;
var _Post_authorName;
var _Post_createdAt;
var _Post_subredditId;
var _Post_subredditName;
var _Post_permalink;
var _Post_title;
var _Post_body;
var _Post_bodyHtml;
var _Post_url;
var _Post_score;
var _Post_numberOfComments;
var _Post_numberOfReports;
var _Post_thumbnail;
var _Post_approved;
var _Post_approvedAtUtc;
var _Post_bannedAtUtc;
var _Post_spam;
var _Post_stickied;
var _Post_removed;
var _Post_removedBy;
var _Post_removedByCategory;
var _Post_archived;
var _Post_edited;
var _Post_locked;
var _Post_nsfw;
var _Post_quarantined;
var _Post_spoiler;
var _Post_hidden;
var _Post_ignoringReports;
var _Post_distinguishedBy;
var _Post_flair;
var _Post_secureMedia;
var _Post_modReportReasons;
var _Post_userReportReasons;
var _Post_metadata;
var SetCustomPostPreviewRequestBodyType = {
  NONE: 0,
  BLOCKS: 1,
  UNRECOGNIZED: -1
};
var Post = class _Post {
  /**
   * @internal
   */
  constructor(data, metadata) {
    _Post_id.set(this, void 0);
    _Post_authorId.set(this, void 0);
    _Post_authorName.set(this, void 0);
    _Post_createdAt.set(this, void 0);
    _Post_subredditId.set(this, void 0);
    _Post_subredditName.set(this, void 0);
    _Post_permalink.set(this, void 0);
    _Post_title.set(this, void 0);
    _Post_body.set(this, void 0);
    _Post_bodyHtml.set(this, void 0);
    _Post_url.set(this, void 0);
    _Post_score.set(this, void 0);
    _Post_numberOfComments.set(this, void 0);
    _Post_numberOfReports.set(this, void 0);
    _Post_thumbnail.set(this, void 0);
    _Post_approved.set(this, void 0);
    _Post_approvedAtUtc.set(this, void 0);
    _Post_bannedAtUtc.set(this, void 0);
    _Post_spam.set(this, void 0);
    _Post_stickied.set(this, void 0);
    _Post_removed.set(this, void 0);
    _Post_removedBy.set(this, void 0);
    _Post_removedByCategory.set(this, void 0);
    _Post_archived.set(this, void 0);
    _Post_edited.set(this, void 0);
    _Post_locked.set(this, void 0);
    _Post_nsfw.set(this, void 0);
    _Post_quarantined.set(this, void 0);
    _Post_spoiler.set(this, void 0);
    _Post_hidden.set(this, void 0);
    _Post_ignoringReports.set(this, void 0);
    _Post_distinguishedBy.set(this, void 0);
    _Post_flair.set(this, void 0);
    _Post_secureMedia.set(this, void 0);
    _Post_modReportReasons.set(this, void 0);
    _Post_userReportReasons.set(this, void 0);
    _Post_metadata.set(this, void 0);
    makeGettersEnumerable(this);
    assertNonNull(data.id, "Post is missing id");
    assertNonNull(data.title, "Post is missing title");
    assertNonNull(data.createdUtc, "Post is missing created date");
    assertNonNull(data.author, "Post is missing author name");
    assertNonNull(data.subreddit, "Post is missing subreddit name");
    assertNonNull(data.subredditId, "Post is missing subreddit id");
    assertNonNull(data.url, "Post is missing url");
    assertNonNull(data.permalink, "Post is missing permalink");
    __classPrivateFieldSet26(this, _Post_id, asT3ID(`t3_${data.id}`), "f");
    __classPrivateFieldSet26(this, _Post_authorName, data.author, "f");
    __classPrivateFieldSet26(this, _Post_authorId, data.authorFullname ? asT2ID(data.authorFullname) : void 0, "f");
    __classPrivateFieldSet26(this, _Post_subredditId, asT5ID(data.subredditId), "f");
    __classPrivateFieldSet26(this, _Post_subredditName, data.subreddit, "f");
    __classPrivateFieldSet26(this, _Post_score, data.score ?? 0, "f");
    __classPrivateFieldSet26(this, _Post_numberOfComments, data.numComments ?? 0, "f");
    __classPrivateFieldSet26(this, _Post_numberOfReports, data.numReports ?? 0, "f");
    const createdAt = /* @__PURE__ */ new Date(0);
    createdAt.setUTCSeconds(data.createdUtc);
    __classPrivateFieldSet26(this, _Post_createdAt, createdAt, "f");
    __classPrivateFieldSet26(this, _Post_title, data.title, "f");
    __classPrivateFieldSet26(this, _Post_body, data.selftext, "f");
    __classPrivateFieldSet26(this, _Post_bodyHtml, data.selftextHtml, "f");
    __classPrivateFieldSet26(this, _Post_url, data.url, "f");
    __classPrivateFieldSet26(this, _Post_permalink, data.permalink, "f");
    if (data.thumbnail && data.thumbnail !== "self" && data.thumbnail !== "nsfw" && data.thumbnailHeight != null && data.thumbnailWidth != null) {
      __classPrivateFieldSet26(this, _Post_thumbnail, {
        url: data.thumbnail,
        height: data.thumbnailHeight,
        width: data.thumbnailWidth
      }, "f");
    }
    __classPrivateFieldSet26(this, _Post_approved, data.approved ?? false, "f");
    __classPrivateFieldSet26(this, _Post_approvedAtUtc, data.approvedAtUtc ?? 0, "f");
    __classPrivateFieldSet26(this, _Post_bannedAtUtc, data.bannedAtUtc ?? 0, "f");
    __classPrivateFieldSet26(this, _Post_removed, data.removed ?? false, "f");
    __classPrivateFieldSet26(this, _Post_removedBy, data.removedBy, "f");
    __classPrivateFieldSet26(this, _Post_removedByCategory, data.removedByCategory, "f");
    __classPrivateFieldSet26(this, _Post_spam, data.spam ?? false, "f");
    __classPrivateFieldSet26(this, _Post_stickied, data.stickied ?? false, "f");
    __classPrivateFieldSet26(this, _Post_archived, data.archived ?? false, "f");
    __classPrivateFieldSet26(this, _Post_edited, data.edited ?? false, "f");
    __classPrivateFieldSet26(this, _Post_locked, data.locked ?? false, "f");
    __classPrivateFieldSet26(this, _Post_nsfw, data.over18 ?? false, "f");
    __classPrivateFieldSet26(this, _Post_quarantined, data.quarantine ?? false, "f");
    __classPrivateFieldSet26(this, _Post_spoiler, data.spoiler, "f");
    __classPrivateFieldSet26(this, _Post_hidden, data.hidden ?? false, "f");
    __classPrivateFieldSet26(this, _Post_ignoringReports, data.ignoreReports ?? false, "f");
    __classPrivateFieldSet26(this, _Post_distinguishedBy, data.distinguished, "f");
    __classPrivateFieldSet26(this, _Post_secureMedia, data.secureMedia, "f");
    __classPrivateFieldSet26(this, _Post_modReportReasons, (data.modReports ?? []).map(([reason]) => reason), "f");
    __classPrivateFieldSet26(this, _Post_userReportReasons, (data.userReports ?? []).map(([reason]) => reason), "f");
    __classPrivateFieldSet26(this, _Post_metadata, metadata, "f");
    if (data.linkFlairBackgroundColor || data.linkFlairCssClass || data.linkFlairText || data.linkFlairType || data.linkFlairTemplateId || data.linkFlairRichtext || data.linkFlairTextColor) {
      __classPrivateFieldSet26(this, _Post_flair, {
        backgroundColor: data.linkFlairBackgroundColor,
        cssClass: data.linkFlairCssClass,
        text: data.linkFlairText,
        type: data.linkFlairType,
        templateId: data.linkFlairTemplateId,
        // Map linkFlairRichtext[] into the objects with more user-friendly property names
        richtext: (data.linkFlairRichtext ?? []).map(({ e, t, a, u }) => ({
          elementType: e,
          text: t,
          emojiRef: a,
          url: u
        })),
        textColor: data.linkFlairTextColor
      }, "f");
    }
  }
  get id() {
    return __classPrivateFieldGet27(this, _Post_id, "f");
  }
  get authorId() {
    return __classPrivateFieldGet27(this, _Post_authorId, "f");
  }
  get authorName() {
    return __classPrivateFieldGet27(this, _Post_authorName, "f");
  }
  get subredditId() {
    return __classPrivateFieldGet27(this, _Post_subredditId, "f");
  }
  get subredditName() {
    return __classPrivateFieldGet27(this, _Post_subredditName, "f");
  }
  get permalink() {
    return __classPrivateFieldGet27(this, _Post_permalink, "f");
  }
  get title() {
    return __classPrivateFieldGet27(this, _Post_title, "f");
  }
  get body() {
    return __classPrivateFieldGet27(this, _Post_body, "f");
  }
  get bodyHtml() {
    return __classPrivateFieldGet27(this, _Post_bodyHtml, "f");
  }
  get url() {
    return __classPrivateFieldGet27(this, _Post_url, "f");
  }
  get thumbnail() {
    return __classPrivateFieldGet27(this, _Post_thumbnail, "f");
  }
  get createdAt() {
    return __classPrivateFieldGet27(this, _Post_createdAt, "f");
  }
  get score() {
    return __classPrivateFieldGet27(this, _Post_score, "f");
  }
  get numberOfComments() {
    return __classPrivateFieldGet27(this, _Post_numberOfComments, "f");
  }
  get numberOfReports() {
    return __classPrivateFieldGet27(this, _Post_numberOfReports, "f");
  }
  get approved() {
    return __classPrivateFieldGet27(this, _Post_approved, "f");
  }
  get approvedAtUtc() {
    return __classPrivateFieldGet27(this, _Post_approvedAtUtc, "f");
  }
  get bannedAtUtc() {
    return __classPrivateFieldGet27(this, _Post_bannedAtUtc, "f");
  }
  get spam() {
    return __classPrivateFieldGet27(this, _Post_spam, "f");
  }
  get stickied() {
    return __classPrivateFieldGet27(this, _Post_stickied, "f");
  }
  get removed() {
    return __classPrivateFieldGet27(this, _Post_removed, "f");
  }
  /**
   * Who removed this object (username)
   */
  get removedBy() {
    return __classPrivateFieldGet27(this, _Post_removedBy, "f");
  }
  /**
   * who/what removed this object. It will return one of the following:
   * - "anti_evil_ops": object is removed by a aeops member
   * - "author": object is removed by author of the post
   * - "automod_filtered": object is filtered by automod
   * - "community_ops": object is removed by a community team member
   * - "content_takedown": object is removed due to content violation
   * - "copyright_takedown": object is removed due to copyright violation
   * - "deleted": object is deleted
   * - "moderator": object is removed by a mod of the sub
   * - "reddit": object is removed by anyone else
   * - undefined: object is not removed
   */
  get removedByCategory() {
    return __classPrivateFieldGet27(this, _Post_removedByCategory, "f");
  }
  get archived() {
    return __classPrivateFieldGet27(this, _Post_archived, "f");
  }
  get edited() {
    return __classPrivateFieldGet27(this, _Post_edited, "f");
  }
  get locked() {
    return __classPrivateFieldGet27(this, _Post_locked, "f");
  }
  get nsfw() {
    return __classPrivateFieldGet27(this, _Post_nsfw, "f");
  }
  get quarantined() {
    return __classPrivateFieldGet27(this, _Post_quarantined, "f");
  }
  get spoiler() {
    return __classPrivateFieldGet27(this, _Post_spoiler, "f");
  }
  get hidden() {
    return __classPrivateFieldGet27(this, _Post_hidden, "f");
  }
  get ignoringReports() {
    return __classPrivateFieldGet27(this, _Post_ignoringReports, "f");
  }
  get distinguishedBy() {
    return __classPrivateFieldGet27(this, _Post_distinguishedBy, "f");
  }
  get comments() {
    return Comment.getComments({
      postId: this.id
    }, __classPrivateFieldGet27(this, _Post_metadata, "f"));
  }
  get flair() {
    return __classPrivateFieldGet27(this, _Post_flair, "f");
  }
  get secureMedia() {
    return __classPrivateFieldGet27(this, _Post_secureMedia, "f");
  }
  get userReportReasons() {
    return __classPrivateFieldGet27(this, _Post_userReportReasons, "f");
  }
  get modReportReasons() {
    return __classPrivateFieldGet27(this, _Post_modReportReasons, "f");
  }
  toJSON() {
    return {
      id: this.id,
      authorId: this.authorId,
      authorName: this.authorName,
      subredditId: this.subredditId,
      subredditName: this.subredditName,
      permalink: this.permalink,
      title: this.title,
      body: this.body,
      bodyHtml: this.bodyHtml,
      url: this.url,
      thumbnail: this.thumbnail,
      score: this.score,
      numberOfComments: this.numberOfComments,
      numberOfReports: this.numberOfReports,
      createdAt: this.createdAt,
      approved: this.approved,
      spam: this.spam,
      stickied: this.stickied,
      removed: this.removed,
      removedBy: __classPrivateFieldGet27(this, _Post_removedBy, "f"),
      removedByCategory: __classPrivateFieldGet27(this, _Post_removedByCategory, "f"),
      archived: this.archived,
      edited: this.edited,
      locked: this.locked,
      nsfw: this.nsfw,
      quarantined: this.quarantined,
      spoiler: this.spoiler,
      hidden: this.hidden,
      ignoringReports: this.ignoringReports,
      distinguishedBy: this.distinguishedBy,
      flair: this.flair,
      secureMedia: this.secureMedia,
      modReportReasons: __classPrivateFieldGet27(this, _Post_modReportReasons, "f"),
      userReportReasons: __classPrivateFieldGet27(this, _Post_userReportReasons, "f")
    };
  }
  isApproved() {
    return __classPrivateFieldGet27(this, _Post_approved, "f");
  }
  isSpam() {
    return __classPrivateFieldGet27(this, _Post_spam, "f");
  }
  isStickied() {
    return __classPrivateFieldGet27(this, _Post_stickied, "f");
  }
  isRemoved() {
    return __classPrivateFieldGet27(this, _Post_removed, "f");
  }
  isArchived() {
    return __classPrivateFieldGet27(this, _Post_archived, "f");
  }
  isEdited() {
    return __classPrivateFieldGet27(this, _Post_edited, "f");
  }
  isLocked() {
    return __classPrivateFieldGet27(this, _Post_locked, "f");
  }
  isNsfw() {
    return __classPrivateFieldGet27(this, _Post_nsfw, "f");
  }
  isQuarantined() {
    return __classPrivateFieldGet27(this, _Post_quarantined, "f");
  }
  isSpoiler() {
    return __classPrivateFieldGet27(this, _Post_spoiler, "f");
  }
  isHidden() {
    return __classPrivateFieldGet27(this, _Post_hidden, "f");
  }
  isIgnoringReports() {
    return __classPrivateFieldGet27(this, _Post_ignoringReports, "f");
  }
  isDistinguishedBy() {
    return __classPrivateFieldGet27(this, _Post_distinguishedBy, "f");
  }
  async edit(options) {
    const newPost = await _Post.edit({
      id: this.id,
      ...options
    }, __classPrivateFieldGet27(this, _Post_metadata, "f"));
    __classPrivateFieldSet26(this, _Post_body, newPost.body, "f");
    __classPrivateFieldSet26(this, _Post_edited, newPost.edited, "f");
  }
  /**
   * Set the suggested sort for comments on a Post.
   *
   * @throws {Error} Throws an error if the suggested sort could not be set.
   * @example
   * ```ts
   * const post = await reddit.getPostById(context.postId);
   * await post.setSuggestedCommentSort("NEW");
   * ```
   */
  async setSuggestedCommentSort(suggestedSort) {
    await _Post.setSuggestedCommentSort({ id: this.id, subredditId: __classPrivateFieldGet27(this, _Post_subredditId, "f"), suggestedSort }, __classPrivateFieldGet27(this, _Post_metadata, "f"));
  }
  /**
   * Set a lightweight UI that shows while the custom post renders
   *
   * @param {JSX.ComponentFunction} ui - A JSX component function that returns a simple ui to be rendered.
   * @throws {Error} Throws an error if the preview could not be set.
   * @example
   * ```ts
   * const preview = (
   *   <vstack height="100%" width="100%" alignment="middle center">
   *     <text size="large">An updated preview!</text>
   *   </vstack>
   * );
   * const post = await reddit.getPostById(context.postId);
   * await post.setCustomPostPreview(() => preview);
   * ```
   */
  async setCustomPostPreview(ui) {
    await _Post.setCustomPostPreview({
      id: this.id,
      ui
    }, __classPrivateFieldGet27(this, _Post_metadata, "f"));
  }
  /**
   * Set a text fallback for the custom post
   *
   * @param {CustomPostTextFallbackOptions} options - A text or a richtext to render in a fallback
   * @throws {Error} Throws an error if the fallback could not be set.
   * @example
   * ```ts
   * // from a menu action, form, scheduler, trigger, custom post click event, etc
   * const newTextFallback = { text: 'This is an updated text fallback' };
   * const post = await context.reddit.getPostById(context.postId);
   * await post.setTextFallback(newTextFallback);
   * ```
   */
  async setTextFallback(options) {
    const newPost = await _Post.setTextFallback(options, this.id, __classPrivateFieldGet27(this, _Post_metadata, "f"));
    __classPrivateFieldSet26(this, _Post_body, newPost.body, "f");
    __classPrivateFieldSet26(this, _Post_edited, newPost.edited, "f");
  }
  async addComment(options) {
    return Comment.submit({
      id: this.id,
      ...options
    }, __classPrivateFieldGet27(this, _Post_metadata, "f"));
  }
  async delete() {
    return _Post.delete(this.id, __classPrivateFieldGet27(this, _Post_metadata, "f"));
  }
  async approve() {
    await _Post.approve(this.id, __classPrivateFieldGet27(this, _Post_metadata, "f"));
    __classPrivateFieldSet26(this, _Post_approved, true, "f");
    __classPrivateFieldSet26(this, _Post_removed, false, "f");
  }
  async remove(isSpam = false) {
    await _Post.remove(this.id, isSpam, __classPrivateFieldGet27(this, _Post_metadata, "f"));
    __classPrivateFieldSet26(this, _Post_removed, true, "f");
    __classPrivateFieldSet26(this, _Post_spam, isSpam, "f");
    __classPrivateFieldSet26(this, _Post_approved, false, "f");
  }
  async lock() {
    await _Post.lock(this.id, __classPrivateFieldGet27(this, _Post_metadata, "f"));
    __classPrivateFieldSet26(this, _Post_locked, true, "f");
  }
  async unlock() {
    await _Post.unlock(this.id, __classPrivateFieldGet27(this, _Post_metadata, "f"));
    __classPrivateFieldSet26(this, _Post_locked, false, "f");
  }
  async hide() {
    await _Post.hide(this.id, __classPrivateFieldGet27(this, _Post_metadata, "f"));
    __classPrivateFieldSet26(this, _Post_hidden, true, "f");
  }
  async unhide() {
    await _Post.unhide(this.id, __classPrivateFieldGet27(this, _Post_metadata, "f"));
    __classPrivateFieldSet26(this, _Post_hidden, false, "f");
  }
  async markAsNsfw() {
    await _Post.markAsNsfw(this.id, __classPrivateFieldGet27(this, _Post_metadata, "f"));
    __classPrivateFieldSet26(this, _Post_nsfw, true, "f");
  }
  async unmarkAsNsfw() {
    await _Post.unmarkAsNsfw(this.id, __classPrivateFieldGet27(this, _Post_metadata, "f"));
    __classPrivateFieldSet26(this, _Post_nsfw, false, "f");
  }
  async markAsSpoiler() {
    await _Post.markAsSpoiler(this.id, __classPrivateFieldGet27(this, _Post_metadata, "f"));
    __classPrivateFieldSet26(this, _Post_spoiler, true, "f");
  }
  async unmarkAsSpoiler() {
    await _Post.unmarkAsSpoiler(this.id, __classPrivateFieldGet27(this, _Post_metadata, "f"));
    __classPrivateFieldSet26(this, _Post_spoiler, false, "f");
  }
  async sticky(position) {
    await _Post.sticky(this.id, position, __classPrivateFieldGet27(this, _Post_metadata, "f"));
  }
  async unsticky() {
    await _Post.unsticky(this.id, __classPrivateFieldGet27(this, _Post_metadata, "f"));
  }
  async distinguish() {
    const { distinguishedBy } = await _Post.distinguish(this.id, false, __classPrivateFieldGet27(this, _Post_metadata, "f"));
    __classPrivateFieldSet26(this, _Post_distinguishedBy, distinguishedBy, "f");
  }
  async distinguishAsAdmin() {
    const { distinguishedBy } = await _Post.distinguish(this.id, true, __classPrivateFieldGet27(this, _Post_metadata, "f"));
    __classPrivateFieldSet26(this, _Post_distinguishedBy, distinguishedBy, "f");
  }
  async undistinguish() {
    const { distinguishedBy } = await _Post.undistinguish(this.id, __classPrivateFieldGet27(this, _Post_metadata, "f"));
    __classPrivateFieldSet26(this, _Post_distinguishedBy, distinguishedBy, "f");
  }
  async ignoreReports() {
    await _Post.ignoreReports(this.id, __classPrivateFieldGet27(this, _Post_metadata, "f"));
    __classPrivateFieldSet26(this, _Post_ignoringReports, true, "f");
  }
  async unignoreReports() {
    await _Post.unignoreReports(this.id, __classPrivateFieldGet27(this, _Post_metadata, "f"));
    __classPrivateFieldSet26(this, _Post_ignoringReports, false, "f");
  }
  async getAuthor() {
    return User.getByUsername(__classPrivateFieldGet27(this, _Post_authorName, "f"), __classPrivateFieldGet27(this, _Post_metadata, "f"));
  }
  async crosspost(options) {
    return _Post.crosspost({
      ...options,
      postId: this.id
    }, __classPrivateFieldGet27(this, _Post_metadata, "f"));
  }
  /**
   * Add a mod note for why the post was removed
   *
   * @param options.reasonId id of a Removal Reason - you can leave this as an empty string if you don't have one
   * @param options.modNote the reason for removal (maximum 100 characters) (optional)
   * @returns
   */
  addRemovalNote(options) {
    return ModNote.addRemovalNote({ itemIds: [__classPrivateFieldGet27(this, _Post_id, "f")], ...options }, __classPrivateFieldGet27(this, _Post_metadata, "f"));
  }
  /**
   * Get a thumbnail that contains a preview image and also contains a blurred preview for
   * NSFW images. The thumbnail returned has higher resolution than Post.thumbnail.
   * Returns undefined if the post doesn't have a thumbnail
   *
   * @returns {EnrichedThumbnail | undefined}
   * @throws {Error} Throws an error if the thumbnail could not be fetched
   * @example
   * ```ts
   * // from a menu action, form, scheduler, trigger, custom post click event, etc
   * const post = await context.reddit.getPostById(context.postId);
   * const enrichedThumbnail = await post.getEnrichedThumbnail();
   * ```
   */
  async getEnrichedThumbnail() {
    return getThumbnailV2({ id: this.id }, __classPrivateFieldGet27(this, _Post_metadata, "f"));
  }
  // TODO: flair methods
  /** @internal */
  static async getById(id, metadata) {
    const client = Devvit.redditAPIPlugins.LinksAndComments;
    const postId = isT3ID(id) ? id : `t3_${id}`;
    const response = await client.Info({
      subreddits: [],
      thingIds: [postId]
    }, metadata);
    if (!response.data?.children?.length) {
      throw new Error("could not find post");
    }
    const postData = response.data.children[0];
    if (!postData?.data) {
      throw new Error("could not find post");
    }
    return new _Post(postData.data, metadata);
  }
  /** @internal */
  static async submit(options, metadata) {
    const client = Devvit.redditAPIPlugins.LinksAndComments;
    const runAs = RunAs.APP;
    let response;
    if ("preview" in options) {
      assertNonNull(metadata, "Missing metadata in `SubmitPostOptions`");
      const reconciler = new BlocksReconciler(() => options.preview, void 0, {}, metadata, void 0);
      const previewBlock = await reconciler.buildBlocksUI();
      const encodedCached = import_protos29.Block.encode(previewBlock).finish();
      const { textFallback, ...sanitizedOptions } = options;
      const richtextFallback = textFallback ? getCustomPostRichTextFallback(textFallback) : "";
      const submitRequest = {
        kind: "custom",
        sr: options.subredditName,
        richtextJson: (0, import_base64_js.fromByteArray)(encodedCached),
        richtextFallback,
        runAs,
        ...sanitizedOptions
      };
      response = await client.SubmitCustomPost(submitRequest, metadata);
    } else {
      response = await client.Submit({
        kind: "kind" in options ? options.kind : "url" in options ? "link" : "self",
        sr: options.subredditName,
        richtextJson: "richtext" in options ? richtextToString(options.richtext) : void 0,
        runAs,
        ...options
      }, metadata);
    }
    const isAllowedMediaType = "kind" in options && ["image", "video", "videogif"].includes(options.kind);
    if (isAllowedMediaType && !response.json?.data?.id) {
      if (options.kind === "image" && "imageUrls" in options) {
        throw new Error(`Image post type with ${options.imageUrls} is being created asynchronously and should be updated in the subreddit soon.`);
      } else if ("videoPosterUrl" in options) {
        throw new Error(`Post of ${options.kind} type with ${options.videoPosterUrl} is being created asynchronously and should be updated in the subreddit soon.`);
      }
    }
    if (!response.json?.data?.id || response.json?.errors?.length) {
      throw new Error(`failed to submit post - either post ID is empty or request failed with errors: ${response.json?.errors}`);
    }
    return _Post.getById(`t3_${response.json.data.id}`, metadata);
  }
  /** @internal */
  static async crosspost(options, metadata) {
    const client = Devvit.redditAPIPlugins.LinksAndComments;
    const { postId, subredditName, ...rest } = options;
    const response = await client.Submit({
      kind: "crosspost",
      sr: subredditName,
      crosspostFullname: asT3ID(postId),
      runAs: RunAs.APP,
      ...rest
    }, metadata);
    if (!response.json?.data?.id || response.json?.errors?.length) {
      throw new Error("failed to crosspost post");
    }
    return _Post.getById(`t3_${response.json.data.id}`, metadata);
  }
  /** @internal */
  static async edit(options, metadata) {
    const client = Devvit.redditAPIPlugins.LinksAndComments;
    const { id } = options;
    let richtextString;
    if ("richtext" in options) {
      richtextString = richtextToString(options.richtext);
    }
    const response = await client.EditUserText({
      thingId: id,
      text: "text" in options ? options.text : "",
      richtextJson: richtextString,
      runAs: RunAs.APP
    }, metadata);
    if (response.json?.errors?.length) {
      throw new Error("Failed to edit post");
    }
    return _Post.getById(id, metadata);
  }
  /** @internal */
  static async setSuggestedCommentSort(options, metadata) {
    const operationName = "SetSuggestedSort";
    const persistedQueryHash = "cf6052acc7fefaa65b710625b81dba8041f258313aafe9730e2a3dc855e5d10d";
    const response = await GraphQL.query(operationName, persistedQueryHash, {
      input: {
        subredditId: options.subredditId,
        postId: options.id,
        sort: options.suggestedSort
      }
    }, metadata);
    if (!response.data?.setSuggestedSort?.ok) {
      throw new Error("Failed to set suggested sort");
    }
  }
  /** @internal */
  static async setCustomPostPreview(options, metadata) {
    if (!metadata) {
      throw new Error("Failed to set custom post preview. Metadata not found");
    }
    const client = Devvit.redditAPIPlugins.LinksAndComments;
    const handler = new BlocksHandler(options.ui);
    const handlerResponse = import_protos29.UIResponse.fromJSON(await handler.handle({ events: [] }, metadata));
    const block = handlerResponse.blocks;
    const blocksRenderContent = (0, import_base64_js.fromByteArray)(import_protos29.Block.encode(block).finish());
    await client.SetCustomPostPreview({
      thingId: options.id,
      bodyType: SetCustomPostPreviewRequestBodyType.BLOCKS,
      blocksRenderContent
    }, metadata);
  }
  /** @internal */
  static async setTextFallback(options, postId, metadata) {
    if (!("text" in options) && !("richtext" in options)) {
      throw new Error(`No text fallback provided for post ${postId}.`);
    }
    const client = Devvit.redditAPIPlugins.LinksAndComments;
    const richtextFallback = getCustomPostRichTextFallback(options);
    const response = await client.EditCustomPost({
      thingId: postId,
      richtextFallback
    }, metadata);
    if (response.json?.errors?.length) {
      throw new Error("Failed to set post text fallback");
    }
    return _Post.getById(postId, metadata);
  }
  /** @internal */
  static async delete(id, metadata) {
    const client = Devvit.redditAPIPlugins.LinksAndComments;
    await client.Del({
      id
    }, metadata);
  }
  /** @internal */
  static async approve(id, metadata) {
    const client = Devvit.redditAPIPlugins.Moderation;
    await client.Approve({
      id
    }, metadata);
  }
  /** @internal */
  static async remove(id, isSpam = false, metadata) {
    const client = Devvit.redditAPIPlugins.Moderation;
    await client.Remove({
      id,
      spam: isSpam
    }, metadata);
  }
  /** @internal */
  static async hide(id, metadata) {
    const client = Devvit.redditAPIPlugins.LinksAndComments;
    await client.Hide({
      id
    }, metadata);
  }
  /** @internal */
  static async unhide(id, metadata) {
    const client = Devvit.redditAPIPlugins.LinksAndComments;
    await client.Unhide({
      id
    }, metadata);
  }
  /** @internal */
  static async markAsNsfw(id, metadata) {
    const client = Devvit.redditAPIPlugins.LinksAndComments;
    await client.MarkNSFW({
      id
    }, metadata);
  }
  /** @internal */
  static async unmarkAsNsfw(id, metadata) {
    const client = Devvit.redditAPIPlugins.LinksAndComments;
    await client.UnmarkNSFW({
      id
    }, metadata);
  }
  /** @internal */
  static async markAsSpoiler(id, metadata) {
    const client = Devvit.redditAPIPlugins.LinksAndComments;
    await client.Spoiler({
      id
    }, metadata);
  }
  /** @internal */
  static async unmarkAsSpoiler(id, metadata) {
    const client = Devvit.redditAPIPlugins.LinksAndComments;
    await client.Unspoiler({
      id
    }, metadata);
  }
  /** @internal */
  static async sticky(id, position, metadata) {
    const client = Devvit.redditAPIPlugins.LinksAndComments;
    await client.SetSubredditSticky({
      id,
      state: true,
      num: position
    }, metadata);
  }
  /** @internal */
  static async unsticky(id, metadata) {
    const client = Devvit.redditAPIPlugins.LinksAndComments;
    await client.SetSubredditSticky({
      id,
      state: false
    }, metadata);
  }
  /** @internal */
  static async lock(id, metadata) {
    const client = Devvit.redditAPIPlugins.LinksAndComments;
    await client.Lock({
      id
    }, metadata);
  }
  /** @internal */
  static async unlock(id, metadata) {
    const client = Devvit.redditAPIPlugins.LinksAndComments;
    await client.Unlock({
      id
    }, metadata);
  }
  /** @internal */
  static async distinguish(id, asAdmin, metadata) {
    const client = Devvit.redditAPIPlugins.Moderation;
    const response = await client.Distinguish({
      id,
      how: asAdmin ? "admin" : "yes",
      sticky: false
    }, metadata);
    const post = response.json?.data?.things?.[0]?.data;
    assertNonNull(post);
    return {
      distinguishedBy: post.distinguished
    };
  }
  /** @internal */
  static async undistinguish(id, metadata) {
    const client = Devvit.redditAPIPlugins.Moderation;
    const response = await client.Distinguish({
      id,
      how: "no",
      sticky: false
    }, metadata);
    const post = response.json?.data?.things?.[0]?.data;
    assertNonNull(post);
    return {
      distinguishedBy: post.distinguished
    };
  }
  /** @internal */
  static async ignoreReports(id, metadata) {
    const client = Devvit.redditAPIPlugins.Moderation;
    await client.IgnoreReports({
      id
    }, metadata);
  }
  /** @internal */
  static async unignoreReports(id, metadata) {
    const client = Devvit.redditAPIPlugins.Moderation;
    await client.UnignoreReports({
      id
    }, metadata);
  }
  /** @internal */
  static getControversialPosts(options = {}, metadata) {
    return this.getSortedPosts({
      ...options,
      sort: "controversial"
    }, metadata);
  }
  /** @internal */
  static getTopPosts(options = {}, metadata) {
    return this.getSortedPosts({
      ...options,
      sort: "top"
    }, metadata);
  }
  /** @internal */
  static getSortedPosts(options, metadata) {
    const client = Devvit.redditAPIPlugins.Listings;
    return new Listing({
      hasMore: true,
      before: options.before,
      after: options.after,
      pageSize: options.pageSize,
      limit: options.limit,
      fetch: async (fetchOptions) => {
        const response = await client.Sort({
          show: "all",
          sort: options.sort,
          t: options.timeframe,
          subreddit: options.subredditName,
          ...fetchOptions
        }, metadata);
        return listingProtosToPosts(response, metadata);
      }
    });
  }
  /** @internal */
  static getHotPosts(options = {
    location: "GLOBAL"
  }, metadata) {
    const client = Devvit.redditAPIPlugins.Listings;
    return new Listing({
      hasMore: true,
      before: options.before,
      after: options.after,
      pageSize: options.pageSize,
      limit: options.limit,
      fetch: async (fetchOptions) => {
        const response = await client.Hot({
          g: options.location,
          show: "all",
          subreddit: options.subredditName,
          ...fetchOptions
        }, metadata);
        return listingProtosToPosts(response, metadata);
      }
    });
  }
  /** @internal */
  static getNewPosts(options, metadata) {
    const client = Devvit.redditAPIPlugins.Listings;
    return new Listing({
      hasMore: true,
      before: options.before,
      after: options.after,
      pageSize: options.pageSize,
      limit: options.limit,
      fetch: async (fetchOptions) => {
        const response = await client.New({
          show: "all",
          subreddit: options.subredditName,
          ...fetchOptions
        }, metadata);
        return listingProtosToPosts(response, metadata);
      }
    });
  }
  /** @internal */
  static getRisingPosts(options, metadata) {
    const client = Devvit.redditAPIPlugins.Listings;
    return new Listing({
      hasMore: true,
      before: options.before,
      after: options.after,
      pageSize: options.pageSize,
      limit: options.limit,
      fetch: async (fetchOptions) => {
        const response = await client.Rising({
          show: "all",
          subreddit: options.subredditName,
          ...fetchOptions
        }, metadata);
        return listingProtosToPosts(response, metadata);
      }
    });
  }
  /** @internal */
  static getPostsByUser(options, metadata) {
    const client = Devvit.redditAPIPlugins.Users;
    return new Listing({
      hasMore: true,
      before: options.before,
      after: options.after,
      pageSize: options.pageSize,
      limit: options.limit,
      async fetch(fetchOptions) {
        const response = await client.UserWhere({
          username: options.username,
          where: "submitted",
          ...fetchOptions
        }, metadata);
        return listingProtosToPosts(response, metadata);
      }
    });
  }
};
_Post_id = /* @__PURE__ */ new WeakMap(), _Post_authorId = /* @__PURE__ */ new WeakMap(), _Post_authorName = /* @__PURE__ */ new WeakMap(), _Post_createdAt = /* @__PURE__ */ new WeakMap(), _Post_subredditId = /* @__PURE__ */ new WeakMap(), _Post_subredditName = /* @__PURE__ */ new WeakMap(), _Post_permalink = /* @__PURE__ */ new WeakMap(), _Post_title = /* @__PURE__ */ new WeakMap(), _Post_body = /* @__PURE__ */ new WeakMap(), _Post_bodyHtml = /* @__PURE__ */ new WeakMap(), _Post_url = /* @__PURE__ */ new WeakMap(), _Post_score = /* @__PURE__ */ new WeakMap(), _Post_numberOfComments = /* @__PURE__ */ new WeakMap(), _Post_numberOfReports = /* @__PURE__ */ new WeakMap(), _Post_thumbnail = /* @__PURE__ */ new WeakMap(), _Post_approved = /* @__PURE__ */ new WeakMap(), _Post_approvedAtUtc = /* @__PURE__ */ new WeakMap(), _Post_bannedAtUtc = /* @__PURE__ */ new WeakMap(), _Post_spam = /* @__PURE__ */ new WeakMap(), _Post_stickied = /* @__PURE__ */ new WeakMap(), _Post_removed = /* @__PURE__ */ new WeakMap(), _Post_removedBy = /* @__PURE__ */ new WeakMap(), _Post_removedByCategory = /* @__PURE__ */ new WeakMap(), _Post_archived = /* @__PURE__ */ new WeakMap(), _Post_edited = /* @__PURE__ */ new WeakMap(), _Post_locked = /* @__PURE__ */ new WeakMap(), _Post_nsfw = /* @__PURE__ */ new WeakMap(), _Post_quarantined = /* @__PURE__ */ new WeakMap(), _Post_spoiler = /* @__PURE__ */ new WeakMap(), _Post_hidden = /* @__PURE__ */ new WeakMap(), _Post_ignoringReports = /* @__PURE__ */ new WeakMap(), _Post_distinguishedBy = /* @__PURE__ */ new WeakMap(), _Post_flair = /* @__PURE__ */ new WeakMap(), _Post_secureMedia = /* @__PURE__ */ new WeakMap(), _Post_modReportReasons = /* @__PURE__ */ new WeakMap(), _Post_userReportReasons = /* @__PURE__ */ new WeakMap(), _Post_metadata = /* @__PURE__ */ new WeakMap();
function listingProtosToPosts(listingProto, metadata) {
  if (!listingProto.data?.children) {
    throw new Error("Listing response is missing children");
  }
  const children = listingProto.data.children.map((child) => new Post(child.data, metadata));
  return {
    children,
    before: listingProto.data.before,
    after: listingProto.data.after
  };
}
async function getThumbnailV2(options, metadata) {
  const operationName = "GetThumbnailV2";
  const persistedQueryHash = "81580ce4e23d748c5a59a1618489b559bf4518b6a73af41f345d8d074c8b2ce9";
  const response = await GraphQL.query(operationName, persistedQueryHash, {
    id: options.id
  }, metadata);
  const thumbnail = response.data?.postInfoById?.thumbnailV2;
  if (!thumbnail) {
    throw new Error("Failed to get thumbnail");
  } else if (!thumbnail.image) {
    return void 0;
  }
  return {
    attribution: thumbnail.attribution,
    image: {
      url: thumbnail.image.url,
      width: thumbnail.image.dimensions.width,
      height: thumbnail.image.dimensions.height
    },
    isObfuscatedDefault: thumbnail.isObfuscatedDefault,
    ...thumbnail.obfuscatedImage && {
      obfuscatedImage: {
        url: thumbnail.obfuscatedImage.url,
        width: thumbnail.obfuscatedImage.dimensions.width,
        height: thumbnail.obfuscatedImage.dimensions.height
      }
    }
  };
}

// node_modules/@devvit/public-api/apis/reddit/models/User.js
var __classPrivateFieldSet27 = function(receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet28 = function(receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _User_id;
var _User_username;
var _User_createdAt;
var _User_linkKarma;
var _User_commentKarma;
var _User_nsfw;
var _User_isAdmin;
var _User_modPermissionsBySubreddit;
var _User_url;
var _User_permalink;
var _User_hasVerifiedEmail;
var _User_metadata;
var SocialLinkType;
(function(SocialLinkType2) {
  SocialLinkType2["Custom"] = "CUSTOM";
  SocialLinkType2["Reddit"] = "REDDIT";
  SocialLinkType2["Instagram"] = "INSTAGRAM";
  SocialLinkType2["Twitter"] = "TWITTER";
  SocialLinkType2["Tiktok"] = "TIKTOK";
  SocialLinkType2["Twitch"] = "TWITCH";
  SocialLinkType2["Facebook"] = "FACEBOOK";
  SocialLinkType2["Youtube"] = "YOUTUBE";
  SocialLinkType2["Tumblr"] = "TUMBLR";
  SocialLinkType2["Spotify"] = "SPOTIFY";
  SocialLinkType2["Soundcloud"] = "SOUNDCLOUD";
  SocialLinkType2["Beacons"] = "BEACONS";
  SocialLinkType2["Linktree"] = "LINKTREE";
  SocialLinkType2["Discord"] = "DISCORD";
  SocialLinkType2["Venmo"] = "VENMO";
  SocialLinkType2["CashApp"] = "CASH_APP";
  SocialLinkType2["Patreon"] = "PATREON";
  SocialLinkType2["Kofi"] = "KOFI";
  SocialLinkType2["Paypal"] = "PAYPAL";
  SocialLinkType2["Cameo"] = "CAMEO";
  SocialLinkType2["Onlyfans"] = "ONLYFANS";
  SocialLinkType2["Substack"] = "SUBSTACK";
  SocialLinkType2["Kickstarter"] = "KICKSTARTER";
  SocialLinkType2["Indiegogo"] = "INDIEGOGO";
  SocialLinkType2["BuyMeACoffee"] = "BUY_ME_A_COFFEE";
  SocialLinkType2["Shopify"] = "SHOPIFY";
})(SocialLinkType || (SocialLinkType = {}));
var User = class _User {
  /**
   * @internal
   */
  constructor(data, metadata) {
    _User_id.set(this, void 0);
    _User_username.set(this, void 0);
    _User_createdAt.set(this, void 0);
    _User_linkKarma.set(this, void 0);
    _User_commentKarma.set(this, void 0);
    _User_nsfw.set(this, void 0);
    _User_isAdmin.set(this, void 0);
    _User_modPermissionsBySubreddit.set(this, /* @__PURE__ */ new Map());
    _User_url.set(this, void 0);
    _User_permalink.set(this, void 0);
    _User_hasVerifiedEmail.set(this, void 0);
    _User_metadata.set(this, void 0);
    makeGettersEnumerable(this);
    assertNonNull(data.id, "User ID is missing or undefined");
    assertNonNull(data.name, "Username is missing or undefined");
    assertNonNull(data.createdUtc, "User is missing created date");
    __classPrivateFieldSet27(this, _User_id, asT2ID(isT2ID(data.id) ? data.id : `t2_${data.id}`), "f");
    __classPrivateFieldSet27(this, _User_username, data.name, "f");
    __classPrivateFieldSet27(this, _User_nsfw, data.over18 ?? false, "f");
    __classPrivateFieldSet27(this, _User_isAdmin, data.isEmployee ?? false, "f");
    const createdAt = /* @__PURE__ */ new Date(0);
    createdAt.setUTCSeconds(data.createdUtc);
    __classPrivateFieldSet27(this, _User_createdAt, createdAt, "f");
    __classPrivateFieldSet27(this, _User_linkKarma, data.linkKarma ?? 0, "f");
    __classPrivateFieldSet27(this, _User_commentKarma, data.commentKarma ?? 0, "f");
    if (data.modPermissions) {
      for (const [subredditName, permissions] of Object.entries(data.modPermissions)) {
        __classPrivateFieldGet28(this, _User_modPermissionsBySubreddit, "f").set(subredditName, validModPermissions(permissions));
      }
    }
    __classPrivateFieldSet27(this, _User_url, new URL(data.subreddit?.url ?? "", "https://www.reddit.com").toString(), "f");
    __classPrivateFieldSet27(this, _User_permalink, data.subreddit?.url ?? "", "f");
    __classPrivateFieldSet27(this, _User_hasVerifiedEmail, data.hasVerifiedEmail ?? false, "f");
    __classPrivateFieldSet27(this, _User_metadata, metadata, "f");
  }
  /**
   * The ID (starting with t2_) of the user to retrieve.
   * @example 't2_1w72'
   */
  get id() {
    return __classPrivateFieldGet28(this, _User_id, "f");
  }
  /**
   * The username of the user omitting the u/.
   * @example 'spez'
   */
  get username() {
    return __classPrivateFieldGet28(this, _User_username, "f");
  }
  /**
   * The date the user was created.
   */
  get createdAt() {
    return __classPrivateFieldGet28(this, _User_createdAt, "f");
  }
  /**
   * The amount of link karma the user has.
   */
  get linkKarma() {
    return __classPrivateFieldGet28(this, _User_linkKarma, "f");
  }
  /**
   * The amount of comment karma the user has.
   */
  get commentKarma() {
    return __classPrivateFieldGet28(this, _User_commentKarma, "f");
  }
  /**
   * Whether the user's profile is marked as NSFW (Not Safe For Work).
   */
  get nsfw() {
    return __classPrivateFieldGet28(this, _User_nsfw, "f");
  }
  /**
   * Whether the user is admin.
   */
  get isAdmin() {
    return __classPrivateFieldGet28(this, _User_isAdmin, "f");
  }
  /**
   * The permissions the user has on the subreddit.
   */
  get modPermissions() {
    return __classPrivateFieldGet28(this, _User_modPermissionsBySubreddit, "f");
  }
  /**
   * Returns the HTTP URL for the user
   */
  get url() {
    return __classPrivateFieldGet28(this, _User_url, "f");
  }
  /**
   * Returns a permalink path relative to https://www.reddit.com
   */
  get permalink() {
    return __classPrivateFieldGet28(this, _User_permalink, "f");
  }
  /**
   * Indicates whether or not the user has verified their email address.
   */
  get hasVerifiedEmail() {
    return __classPrivateFieldGet28(this, _User_hasVerifiedEmail, "f");
  }
  toJSON() {
    return {
      id: this.id,
      username: this.username,
      createdAt: this.createdAt,
      linkKarma: this.linkKarma,
      commentKarma: this.commentKarma,
      nsfw: this.nsfw,
      modPermissionsBySubreddit: Object.fromEntries(this.modPermissions)
    };
  }
  /**
   * Get the mod permissions the user has on the subreddit if they are a moderator.
   *
   * @param subredditName - name of the subreddit
   * @returns the moderator permissions the user has on the subreddit
   */
  async getModPermissionsForSubreddit(subredditName) {
    if (__classPrivateFieldGet28(this, _User_modPermissionsBySubreddit, "f").has(subredditName)) {
      return __classPrivateFieldGet28(this, _User_modPermissionsBySubreddit, "f").get(subredditName);
    }
    const mods = await _User.getSubredditUsersByType({
      subredditName,
      type: "moderators",
      username: this.username
    }, __classPrivateFieldGet28(this, _User_metadata, "f")).all();
    if (mods.length === 0) {
      return [];
    }
    const permissions = mods[0].modPermissions.get(subredditName) ?? [];
    if (permissions.length > 0) {
      __classPrivateFieldGet28(this, _User_modPermissionsBySubreddit, "f").set(subredditName, permissions);
    }
    return permissions;
  }
  /**
   * Get the user's comments.
   *
   * @param options - Options for the request
   * @param options.sort - The sort order of the comments. e.g. 'new'
   * @param options.timeframe - The timeframe of the comments. e.g. 'all'
   * @param options.limit - The maximum number of comments to return. e.g. 1000
   * @param options.pageSize - The number of comments to return per request. e.g. 100
   * @returns A Listing of Comment objects.
   */
  getComments(options) {
    return Comment.getCommentsByUser({
      username: this.username,
      ...options
    }, __classPrivateFieldGet28(this, _User_metadata, "f"));
  }
  /**
   * Get the user's posts.
   *
   * @param options - Options for the request
   * @param options.sort - The sort order of the posts. e.g. 'new'
   * @param options.timeframe - The timeframe of the posts. e.g. 'all'
   * @param options.limit - The maximum number of posts to return. e.g. 1000
   * @param options.pageSize - The number of posts to return per request. e.g. 100
   * @returns A Listing of Post objects.
   */
  getPosts(options) {
    return Post.getPostsByUser({
      username: this.username,
      ...options
    }, __classPrivateFieldGet28(this, _User_metadata, "f"));
  }
  /**
   * Retrieve the user's flair for the subreddit.
   *
   * @param subreddit - The name of the subreddit associated with the user's flair.
   *
   * @example
   * ```ts
   * const username = "badapple"
   * const subredditName = "mysubreddit"
   * const user = await reddit.getUserByUsername(username);
   * const userFlair = await user.getUserFlairBySubreddit(subredditName);
   * ```
   */
  async getUserFlairBySubreddit(subreddit) {
    const userFlairs = await Flair.getUserFlairBySubreddit({
      subreddit,
      name: __classPrivateFieldGet28(this, _User_username, "f")
    }, __classPrivateFieldGet28(this, _User_metadata, "f"));
    return userFlairs.users[0] ? convertUserFlairProtoToAPI(userFlairs.users[0]) : void 0;
  }
  getSnoovatarUrl() {
    return _User.getSnoovatarUrl(this.username, __classPrivateFieldGet28(this, _User_metadata, "f"));
  }
  /**
   * Gets social links of the user
   *
   * @returns A Promise that resolves an Array of UserSocialLink objects
   * @example
   * ```ts
   * const socialLinks = await user.getSocialLinks();
   * ```
   */
  async getSocialLinks() {
    const operationName = "GetUserSocialLinks";
    const persistedQueryHash = "2aca18ef5f4fc75fb91cdaace3e9aeeae2cb3843b5c26ad511e6f01b8521593a";
    const response = await GraphQL.query(operationName, persistedQueryHash, { name: this.username }, __classPrivateFieldGet28(this, _User_metadata, "f"));
    if (!response.data?.user?.profile?.socialLinks) {
      return [];
    }
    return response.data.user.profile.socialLinks.map((link) => ({
      ...link,
      handle: link.handle ?? void 0
    }));
  }
  /** @internal */
  static async getById(id, metadata) {
    const username = await getUsernameById(id, metadata);
    return username == null ? void 0 : _User.getByUsername(username, metadata);
  }
  /** @internal */
  static async getByUsername(username, metadata) {
    const client = Devvit.redditAPIPlugins.Users;
    try {
      const response = await client.UserAbout({ username }, metadata);
      if (response.data?.id)
        return new _User(response.data, metadata);
    } catch (error) {
      if (error instanceof Error && error.message.includes("404 Not Found")) {
        return void 0;
      }
      throw error;
    }
  }
  /** @internal */
  static async getFromMetadata(key, metadata) {
    assertNonNull(metadata);
    const userId = metadata?.[key]?.values[0];
    return userId ? _User.getById(asT2ID(userId), metadata) : Promise.resolve(void 0);
  }
  /** @internal */
  static getSubredditUsersByType(options, metadata) {
    const client = Devvit.redditAPIPlugins.Subreddits;
    return new Listing({
      hasMore: true,
      pageSize: options.pageSize,
      limit: options.limit,
      after: options.after,
      before: options.before,
      fetch: async (fetchOptions) => {
        const response = await client.AboutWhere({
          where: options.type,
          user: options.username,
          subreddit: options.subredditName,
          show: "all",
          ...fetchOptions
        }, metadata);
        return listingProtosToUsers(response, options.subredditName, metadata);
      }
    });
  }
  /** @internal */
  static async createRelationship(options, metadata) {
    const client = Devvit.redditAPIPlugins.Users;
    const { type, subredditName, username, permissions, ...optionalFields } = options;
    const response = await client.Friend({
      type,
      subreddit: subredditName,
      name: username,
      permissions: permissions ? formatModeratorPermissions(permissions) : void 0,
      ...optionalFields
    }, metadata);
    if (response.json?.errors?.length) {
      throw new Error(response.json.errors.join("\n"));
    }
  }
  /** @internal */
  static async removeRelationship(options, metadata) {
    const client = Devvit.redditAPIPlugins.Users;
    await client.Unfriend({
      type: options.type,
      subreddit: options.subredditName,
      name: options.username
    }, metadata);
  }
  /** @internal */
  static async setModeratorPermissions(username, subredditName, permissions, metadata) {
    const client = Devvit.redditAPIPlugins.Users;
    const response = await client.SetPermissions({
      subreddit: subredditName,
      name: username,
      type: "moderator",
      permissions: formatModeratorPermissions(permissions)
    }, metadata);
    if (response.json?.errors?.length) {
      throw new Error(response.json.errors.join("\n"));
    }
  }
  /** @internal */
  static async getSnoovatarUrl(username, metadata) {
    const operationName = "GetSnoovatarUrlByName";
    const persistedQueryHash = "c47fd42345af268616d2d8904b56856acdc05cf61d3650380f539ad7d596ac0c";
    const response = await GraphQL.query(operationName, persistedQueryHash, { username }, metadata);
    return response.data?.redditorInfoByName?.snoovatarIcon?.url;
  }
  /** @internal */
  static getOverview(options, metadata) {
    const client = Devvit.redditAPIPlugins.Users;
    return new Listing({
      hasMore: true,
      before: options.before,
      after: options.after,
      pageSize: options.pageSize,
      limit: options.limit,
      async fetch(fetchOptions) {
        const response = await client.UserWhere({
          username: options.username,
          where: "overview",
          ...fetchOptions
        }, metadata);
        return listingProtosToPostsOrComments(response, metadata);
      }
    });
  }
};
_User_id = /* @__PURE__ */ new WeakMap(), _User_username = /* @__PURE__ */ new WeakMap(), _User_createdAt = /* @__PURE__ */ new WeakMap(), _User_linkKarma = /* @__PURE__ */ new WeakMap(), _User_commentKarma = /* @__PURE__ */ new WeakMap(), _User_nsfw = /* @__PURE__ */ new WeakMap(), _User_isAdmin = /* @__PURE__ */ new WeakMap(), _User_modPermissionsBySubreddit = /* @__PURE__ */ new WeakMap(), _User_url = /* @__PURE__ */ new WeakMap(), _User_permalink = /* @__PURE__ */ new WeakMap(), _User_hasVerifiedEmail = /* @__PURE__ */ new WeakMap(), _User_metadata = /* @__PURE__ */ new WeakMap();
function listingProtosToPostsOrComments(listingProto, metadata) {
  if (!listingProto.data?.children) {
    throw new Error("Listing response is missing children");
  }
  const children = listingProto.data.children.map((child) => {
    if (child.kind === "t3") {
      return new Post(child.data, metadata);
    } else if (child.kind === "t1") {
      return new Comment(child.data, metadata);
    }
    throw new Error(`Type ${child.kind} is not supported`);
  });
  return {
    children,
    before: listingProto.data.before,
    after: listingProto.data.after
  };
}
async function listingProtosToUsers(listingProto, subredditName, metadata) {
  const client = Devvit.redditAPIPlugins.Users;
  if (!listingProto.data?.children) {
    throw new Error("Listing response is missing children");
  }
  const userIds = listingProto.data.children.map((child) => {
    assertNonNull(child.data?.id, "User id is still from listing data");
    return child.data.id;
  });
  const chunkSize = 100;
  const userIdChunks = [];
  for (let i = 0; i < userIds.length; i += chunkSize) {
    userIdChunks.push(userIds.slice(i, i + chunkSize));
  }
  const usersMapResponses = await Promise.all(userIdChunks.map((userIds2) => client.UserDataByAccountIds({
    ids: userIds2.join(",")
  }, metadata)));
  const userDataById = usersMapResponses.reduce((allUsers, response) => ({ ...allUsers, ...response.users }), {});
  const children = listingProto.data.children.map((child) => {
    const id = child.data?.id;
    assertNonNull(id, "User id is missing from listing");
    const userData = userDataById[id];
    assertNonNull(userData, "User data is missing from response");
    return new User({
      id,
      name: userData.name,
      linkKarma: userData.linkKarma,
      commentKarma: userData.commentKarma,
      createdUtc: userData.createdUtc,
      over18: userData.profileOver18,
      snoovatarSize: [],
      modPermissions: {
        [subredditName]: child.data?.modPermissions ?? []
      }
    }, metadata);
  });
  return {
    children,
    before: listingProto.data.before,
    after: listingProto.data.after
  };
}
async function getUsernameById(id, metadata) {
  const client = Devvit.redditAPIPlugins.Users;
  const response = await client.UserDataByAccountIds({ ids: id }, metadata);
  return response?.users?.[id]?.name;
}
async function getCurrentUsernameFromMetadata(metadata) {
  assertNonNull(metadata);
  const username = metadata?.[Header.Username]?.values[0];
  if (username) {
    return username;
  }
  const userId = metadata?.[Header.User]?.values[0];
  if (!userId) {
    return void 0;
  }
  return getUsernameById(userId, metadata);
}

// node_modules/@devvit/public-api/apis/reddit/models/Comment.js
var __classPrivateFieldSet28 = function(receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet29 = function(receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _a5;
var _Comment_id;
var _Comment_authorId;
var _Comment_authorName;
var _Comment_body;
var _Comment_createdAt;
var _Comment_parentId;
var _Comment_postId;
var _Comment_subredditId;
var _Comment_subredditName;
var _Comment_replies;
var _Comment_approved;
var _Comment_approvedAtUtc;
var _Comment_bannedAtUtc;
var _Comment_edited;
var _Comment_locked;
var _Comment_removed;
var _Comment_stickied;
var _Comment_spam;
var _Comment_distinguishedBy;
var _Comment_numReports;
var _Comment_collapsedBecauseCrowdControl;
var _Comment_score;
var _Comment_permalink;
var _Comment_modReportReasons;
var _Comment_userReportReasons;
var _Comment_url;
var _Comment_ignoringReports;
var _Comment_metadata;
var _Comment_getCommentsListing;
var _Comment_buildCommentsTree;
var Comment = class {
  /**
   * @internal
   */
  constructor(data, metadata) {
    _Comment_id.set(this, void 0);
    _Comment_authorId.set(this, void 0);
    _Comment_authorName.set(this, void 0);
    _Comment_body.set(this, void 0);
    _Comment_createdAt.set(this, void 0);
    _Comment_parentId.set(this, void 0);
    _Comment_postId.set(this, void 0);
    _Comment_subredditId.set(this, void 0);
    _Comment_subredditName.set(this, void 0);
    _Comment_replies.set(this, void 0);
    _Comment_approved.set(this, void 0);
    _Comment_approvedAtUtc.set(this, void 0);
    _Comment_bannedAtUtc.set(this, void 0);
    _Comment_edited.set(this, void 0);
    _Comment_locked.set(this, void 0);
    _Comment_removed.set(this, void 0);
    _Comment_stickied.set(this, void 0);
    _Comment_spam.set(this, void 0);
    _Comment_distinguishedBy.set(this, void 0);
    _Comment_numReports.set(this, void 0);
    _Comment_collapsedBecauseCrowdControl.set(this, void 0);
    _Comment_score.set(this, void 0);
    _Comment_permalink.set(this, void 0);
    _Comment_modReportReasons.set(this, void 0);
    _Comment_userReportReasons.set(this, void 0);
    _Comment_url.set(this, void 0);
    _Comment_ignoringReports.set(this, void 0);
    _Comment_metadata.set(this, void 0);
    makeGettersEnumerable(this);
    assertNonNull(data.id, "Comment id is null or undefined");
    assertNonNull(data.body, "Comment body is null or undefined");
    assertNonNull(data.createdUtc, "Comment is missing created date");
    assertNonNull(data.author, "Comment author is null or undefined");
    assertNonNull(data.parentId, "Comment parentId is null or undefined");
    assertNonNull(data.linkId, "Comment linkId is null or undefined");
    assertNonNull(data.permalink, "Comment permalink is null or undefined");
    assertNonNull(data.subreddit, "Comment is missing subreddit name");
    assertNonNull(data.subredditId, "Comment is missing subreddit id");
    __classPrivateFieldSet28(this, _Comment_id, asT1ID(`t1_${data.id}`), "f");
    __classPrivateFieldSet28(this, _Comment_authorId, data.authorFullname ? asT2ID(data.authorFullname) : void 0, "f");
    __classPrivateFieldSet28(this, _Comment_authorName, data.author, "f");
    __classPrivateFieldSet28(this, _Comment_body, data.body, "f");
    __classPrivateFieldSet28(this, _Comment_subredditId, asT5ID(data.subredditId), "f");
    __classPrivateFieldSet28(this, _Comment_subredditName, data.subreddit, "f");
    __classPrivateFieldSet28(this, _Comment_parentId, isCommentId(data.parentId) ? asT1ID(data.parentId) : asT3ID(data.parentId), "f");
    __classPrivateFieldSet28(this, _Comment_postId, asT3ID(data.linkId), "f");
    __classPrivateFieldSet28(this, _Comment_edited, data.edited ?? false, "f");
    __classPrivateFieldSet28(this, _Comment_locked, data.locked ?? false, "f");
    __classPrivateFieldSet28(this, _Comment_removed, data.removed ?? false, "f");
    __classPrivateFieldSet28(this, _Comment_stickied, data.stickied ?? false, "f");
    __classPrivateFieldSet28(this, _Comment_approved, data.approved ?? false, "f");
    __classPrivateFieldSet28(this, _Comment_approvedAtUtc, data.approvedAtUtc ?? 0, "f");
    __classPrivateFieldSet28(this, _Comment_bannedAtUtc, data.bannedAtUtc ?? 0, "f");
    __classPrivateFieldSet28(this, _Comment_spam, data.spam ?? false, "f");
    __classPrivateFieldSet28(this, _Comment_distinguishedBy, data.distinguished, "f");
    __classPrivateFieldSet28(this, _Comment_numReports, data.numReports ?? 0, "f");
    __classPrivateFieldSet28(this, _Comment_collapsedBecauseCrowdControl, data.collapsedBecauseCrowdControl ?? false, "f");
    __classPrivateFieldSet28(this, _Comment_score, data.score ?? 0, "f");
    __classPrivateFieldSet28(this, _Comment_permalink, data.permalink, "f");
    __classPrivateFieldSet28(this, _Comment_url, new URL(data.permalink ?? "", "https://www.reddit.com/").toString(), "f");
    __classPrivateFieldSet28(this, _Comment_ignoringReports, data.ignoreReports ?? false, "f");
    __classPrivateFieldSet28(this, _Comment_modReportReasons, (data.modReports ?? []).map(([reason]) => reason), "f");
    __classPrivateFieldSet28(this, _Comment_userReportReasons, (data.userReports ?? []).map(([reason]) => reason), "f");
    const createdAt = /* @__PURE__ */ new Date(0);
    createdAt.setUTCSeconds(data.createdUtc);
    __classPrivateFieldSet28(this, _Comment_createdAt, createdAt, "f");
    __classPrivateFieldSet28(this, _Comment_replies, __classPrivateFieldGet29(_a5, _a5, "m", _Comment_getCommentsListing).call(_a5, {
      postId: __classPrivateFieldGet29(this, _Comment_postId, "f"),
      commentId: __classPrivateFieldGet29(this, _Comment_id, "f")
    }, metadata), "f");
    __classPrivateFieldSet28(this, _Comment_metadata, metadata, "f");
  }
  get id() {
    return __classPrivateFieldGet29(this, _Comment_id, "f");
  }
  get authorId() {
    return __classPrivateFieldGet29(this, _Comment_authorId, "f");
  }
  get authorName() {
    return __classPrivateFieldGet29(this, _Comment_authorName, "f");
  }
  get subredditId() {
    return __classPrivateFieldGet29(this, _Comment_subredditId, "f");
  }
  get subredditName() {
    return __classPrivateFieldGet29(this, _Comment_subredditName, "f");
  }
  get body() {
    return __classPrivateFieldGet29(this, _Comment_body, "f");
  }
  get createdAt() {
    return __classPrivateFieldGet29(this, _Comment_createdAt, "f");
  }
  get parentId() {
    return __classPrivateFieldGet29(this, _Comment_parentId, "f");
  }
  get postId() {
    return __classPrivateFieldGet29(this, _Comment_postId, "f");
  }
  get replies() {
    return __classPrivateFieldGet29(this, _Comment_replies, "f");
  }
  get distinguishedBy() {
    return __classPrivateFieldGet29(this, _Comment_distinguishedBy, "f");
  }
  get locked() {
    return __classPrivateFieldGet29(this, _Comment_locked, "f");
  }
  get stickied() {
    return __classPrivateFieldGet29(this, _Comment_stickied, "f");
  }
  get removed() {
    return __classPrivateFieldGet29(this, _Comment_removed, "f");
  }
  get approved() {
    return __classPrivateFieldGet29(this, _Comment_approved, "f");
  }
  get approvedAtUtc() {
    return __classPrivateFieldGet29(this, _Comment_approvedAtUtc, "f");
  }
  get bannedAtUtc() {
    return __classPrivateFieldGet29(this, _Comment_bannedAtUtc, "f");
  }
  get spam() {
    return __classPrivateFieldGet29(this, _Comment_spam, "f");
  }
  get edited() {
    return __classPrivateFieldGet29(this, _Comment_edited, "f");
  }
  get numReports() {
    return __classPrivateFieldGet29(this, _Comment_numReports, "f");
  }
  get collapsedBecauseCrowdControl() {
    return __classPrivateFieldGet29(this, _Comment_collapsedBecauseCrowdControl, "f");
  }
  get score() {
    return __classPrivateFieldGet29(this, _Comment_score, "f");
  }
  get permalink() {
    return __classPrivateFieldGet29(this, _Comment_permalink, "f");
  }
  get userReportReasons() {
    return __classPrivateFieldGet29(this, _Comment_userReportReasons, "f");
  }
  get modReportReasons() {
    return __classPrivateFieldGet29(this, _Comment_modReportReasons, "f");
  }
  get url() {
    return __classPrivateFieldGet29(this, _Comment_url, "f");
  }
  get ignoringReports() {
    return __classPrivateFieldGet29(this, _Comment_ignoringReports, "f");
  }
  toJSON() {
    return {
      id: this.id,
      authorName: this.authorName,
      subredditId: this.subredditId,
      subredditName: this.subredditName,
      body: this.body,
      createdAt: this.createdAt,
      parentId: this.parentId,
      postId: this.postId,
      replies: this.replies,
      approved: this.approved,
      locked: this.locked,
      removed: this.removed,
      stickied: this.stickied,
      spam: this.spam,
      edited: this.edited,
      distinguishedBy: this.distinguishedBy,
      numReports: this.numReports,
      collapsedBecauseCrowdControl: this.collapsedBecauseCrowdControl,
      score: this.score,
      permalink: this.permalink,
      modReportReasons: this.modReportReasons,
      userReportReasons: this.userReportReasons,
      url: this.url,
      ignoringReports: this.ignoringReports
    };
  }
  isLocked() {
    return __classPrivateFieldGet29(this, _Comment_locked, "f");
  }
  isApproved() {
    return __classPrivateFieldGet29(this, _Comment_approved, "f");
  }
  isRemoved() {
    return __classPrivateFieldGet29(this, _Comment_removed, "f");
  }
  isSpam() {
    return __classPrivateFieldGet29(this, _Comment_spam, "f");
  }
  isStickied() {
    return __classPrivateFieldGet29(this, _Comment_stickied, "f");
  }
  isDistinguished() {
    return Boolean(__classPrivateFieldGet29(this, _Comment_distinguishedBy, "f"));
  }
  isEdited() {
    return __classPrivateFieldGet29(this, _Comment_edited, "f");
  }
  isIgnoringReports() {
    return __classPrivateFieldGet29(this, _Comment_ignoringReports, "f");
  }
  async delete() {
    return _a5.delete(this.id, __classPrivateFieldGet29(this, _Comment_metadata, "f"));
  }
  async edit(options) {
    const newComment = await _a5.edit({
      id: this.id,
      ...options
    }, __classPrivateFieldGet29(this, _Comment_metadata, "f"));
    __classPrivateFieldSet28(this, _Comment_body, newComment.body, "f");
    __classPrivateFieldSet28(this, _Comment_edited, newComment.edited, "f");
    return this;
  }
  async approve() {
    await _a5.approve(this.id, __classPrivateFieldGet29(this, _Comment_metadata, "f"));
    __classPrivateFieldSet28(this, _Comment_approved, true, "f");
    __classPrivateFieldSet28(this, _Comment_removed, false, "f");
  }
  async remove(isSpam = false) {
    await _a5.remove(this.id, isSpam, __classPrivateFieldGet29(this, _Comment_metadata, "f"));
    __classPrivateFieldSet28(this, _Comment_removed, true, "f");
    __classPrivateFieldSet28(this, _Comment_spam, isSpam, "f");
    __classPrivateFieldSet28(this, _Comment_approved, false, "f");
  }
  async lock() {
    await _a5.lock(this.id, __classPrivateFieldGet29(this, _Comment_metadata, "f"));
    __classPrivateFieldSet28(this, _Comment_locked, true, "f");
  }
  async unlock() {
    await _a5.unlock(this.id, __classPrivateFieldGet29(this, _Comment_metadata, "f"));
    __classPrivateFieldSet28(this, _Comment_locked, false, "f");
  }
  async reply(options) {
    return _a5.submit({
      id: this.id,
      ...options
    }, __classPrivateFieldGet29(this, _Comment_metadata, "f"));
  }
  async getAuthor() {
    return User.getByUsername(__classPrivateFieldGet29(this, _Comment_authorName, "f"), __classPrivateFieldGet29(this, _Comment_metadata, "f"));
  }
  async distinguish(makeSticky = false) {
    const { distinguishedBy, stickied } = await _a5.distinguish(this.id, makeSticky, false, __classPrivateFieldGet29(this, _Comment_metadata, "f"));
    __classPrivateFieldSet28(this, _Comment_distinguishedBy, distinguishedBy, "f");
    __classPrivateFieldSet28(this, _Comment_stickied, stickied, "f");
  }
  async distinguishAsAdmin(makeSticky = false) {
    const { distinguishedBy, stickied } = await _a5.distinguish(this.id, makeSticky, true, __classPrivateFieldGet29(this, _Comment_metadata, "f"));
    __classPrivateFieldSet28(this, _Comment_distinguishedBy, distinguishedBy, "f");
    __classPrivateFieldSet28(this, _Comment_stickied, stickied, "f");
  }
  async undistinguish() {
    const { distinguishedBy, stickied } = await _a5.undistinguish(this.id, __classPrivateFieldGet29(this, _Comment_metadata, "f"));
    __classPrivateFieldSet28(this, _Comment_distinguishedBy, distinguishedBy, "f");
    __classPrivateFieldSet28(this, _Comment_stickied, stickied, "f");
  }
  async ignoreReports() {
    await _a5.ignoreReports(this.id, __classPrivateFieldGet29(this, _Comment_metadata, "f"));
    __classPrivateFieldSet28(this, _Comment_ignoringReports, true, "f");
  }
  async unignoreReports() {
    await _a5.unignoreReports(this.id, __classPrivateFieldGet29(this, _Comment_metadata, "f"));
    __classPrivateFieldSet28(this, _Comment_ignoringReports, false, "f");
  }
  /**
   * Add a mod note for why the comment was removed
   *
   * @param options.reasonId id of a Removal Reason - you can leave this as an empty string if you don't have one
   * @param options.modNote the reason for removal (maximum 100 characters) (optional)
   * @returns
   */
  addRemovalNote(options) {
    return ModNote.addRemovalNote({ itemIds: [__classPrivateFieldGet29(this, _Comment_id, "f")], ...options }, __classPrivateFieldGet29(this, _Comment_metadata, "f"));
  }
  /** @internal */
  static async getById(id, metadata) {
    const client = Devvit.redditAPIPlugins.LinksAndComments;
    const commentId = isT1ID(id) ? id : `t1_${id}`;
    const response = await client.Info({
      subreddits: [],
      thingIds: [commentId]
    }, metadata);
    if (!response.data?.children?.[0]?.data) {
      throw new Error("not found");
    }
    return new _a5(response.data.children[0].data, metadata);
  }
  /** @internal */
  static getComments(options, metadata) {
    const { postId, commentId, ...rest } = options;
    return __classPrivateFieldGet29(_a5, _a5, "m", _Comment_getCommentsListing).call(_a5, {
      postId: asT3ID(postId),
      commentId: commentId ? asT1ID(commentId) : void 0,
      ...rest
    }, metadata);
  }
  /** @internal */
  static async edit(options, metadata) {
    const client = Devvit.redditAPIPlugins.LinksAndComments;
    const { id } = options;
    let richtextString;
    if ("richtext" in options) {
      richtextString = richtextToString(options.richtext);
    }
    const response = await client.EditUserText({
      thingId: id,
      text: "text" in options ? options.text : "",
      richtextJson: richtextString,
      runAs: RunAs.APP
    }, metadata);
    if (response.json?.errors?.length) {
      throw new Error("Failed to edit comment");
    }
    const comment = response.json?.data?.things?.[0]?.data;
    assertNonNull(comment);
    return new _a5(comment, metadata);
  }
  /** @internal */
  static async delete(id, metadata) {
    const client = Devvit.redditAPIPlugins.LinksAndComments;
    await client.Del({
      id
    }, metadata);
  }
  /** @internal */
  static async approve(id, metadata) {
    const client = Devvit.redditAPIPlugins.Moderation;
    await client.Approve({
      id
    }, metadata);
  }
  /** @internal */
  static async remove(id, isSpam = false, metadata) {
    const client = Devvit.redditAPIPlugins.Moderation;
    await client.Remove({
      id,
      spam: isSpam
    }, metadata);
  }
  /** @internal */
  static async lock(id, metadata) {
    const client = Devvit.redditAPIPlugins.LinksAndComments;
    await client.Lock({
      id
    }, metadata);
  }
  /** @internal */
  static async unlock(id, metadata) {
    const client = Devvit.redditAPIPlugins.LinksAndComments;
    await client.Unlock({
      id
    }, metadata);
  }
  /** @internal */
  static async submit(options, metadata) {
    const client = Devvit.redditAPIPlugins.LinksAndComments;
    const { id } = options;
    let richtextString;
    if ("richtext" in options) {
      richtextString = richtextToString(options.richtext);
    }
    const response = await client.Comment({
      thingId: id,
      text: "text" in options ? options.text : "",
      richtextJson: richtextString,
      runAs: RunAs.APP
    }, metadata);
    if (response.json?.errors?.length) {
      throw new Error("failed to reply to comment");
    }
    const data = response.json?.data?.things?.[0]?.data;
    assertNonNull(data);
    return new _a5(data, metadata);
  }
  /** @internal */
  static async distinguish(id, sticky, asAdmin, metadata) {
    const client = Devvit.redditAPIPlugins.Moderation;
    const response = await client.Distinguish({
      id,
      how: asAdmin ? "admin" : "yes",
      sticky
    }, metadata);
    const comment = response.json?.data?.things?.[0]?.data;
    assertNonNull(comment);
    return {
      distinguishedBy: comment.distinguished,
      stickied: Boolean(comment.stickied)
    };
  }
  /** @internal */
  static async undistinguish(id, metadata) {
    const client = Devvit.redditAPIPlugins.Moderation;
    const response = await client.Distinguish({
      id,
      how: "no",
      sticky: false
    }, metadata);
    const comment = response.json?.data?.things?.[0]?.data;
    assertNonNull(comment);
    return {
      distinguishedBy: comment.distinguished,
      stickied: Boolean(comment.stickied)
    };
  }
  /** @internal */
  static getCommentsByUser(options, metadata) {
    const client = Devvit.redditAPIPlugins.Users;
    return new Listing({
      hasMore: true,
      before: options.before,
      after: options.after,
      pageSize: options.pageSize,
      limit: options.limit,
      async fetch(fetchOptions) {
        const response = await client.UserWhere({
          username: options.username,
          where: "comments",
          ...fetchOptions
        }, metadata);
        assertNonNull(response.data, "Failed to get comments for user");
        const children = response.data.children?.map((child) => new _a5(child.data, metadata)) || [];
        return {
          children,
          before: response.data.before,
          after: response.data.after
        };
      }
    });
  }
  /** @internal */
  static async ignoreReports(id, metadata) {
    const client = Devvit.redditAPIPlugins.Moderation;
    await client.IgnoreReports({
      id
    }, metadata);
  }
  /** @internal */
  static async unignoreReports(id, metadata) {
    const client = Devvit.redditAPIPlugins.Moderation;
    await client.UnignoreReports({
      id
    }, metadata);
  }
};
_a5 = Comment, _Comment_id = /* @__PURE__ */ new WeakMap(), _Comment_authorId = /* @__PURE__ */ new WeakMap(), _Comment_authorName = /* @__PURE__ */ new WeakMap(), _Comment_body = /* @__PURE__ */ new WeakMap(), _Comment_createdAt = /* @__PURE__ */ new WeakMap(), _Comment_parentId = /* @__PURE__ */ new WeakMap(), _Comment_postId = /* @__PURE__ */ new WeakMap(), _Comment_subredditId = /* @__PURE__ */ new WeakMap(), _Comment_subredditName = /* @__PURE__ */ new WeakMap(), _Comment_replies = /* @__PURE__ */ new WeakMap(), _Comment_approved = /* @__PURE__ */ new WeakMap(), _Comment_approvedAtUtc = /* @__PURE__ */ new WeakMap(), _Comment_bannedAtUtc = /* @__PURE__ */ new WeakMap(), _Comment_edited = /* @__PURE__ */ new WeakMap(), _Comment_locked = /* @__PURE__ */ new WeakMap(), _Comment_removed = /* @__PURE__ */ new WeakMap(), _Comment_stickied = /* @__PURE__ */ new WeakMap(), _Comment_spam = /* @__PURE__ */ new WeakMap(), _Comment_distinguishedBy = /* @__PURE__ */ new WeakMap(), _Comment_numReports = /* @__PURE__ */ new WeakMap(), _Comment_collapsedBecauseCrowdControl = /* @__PURE__ */ new WeakMap(), _Comment_score = /* @__PURE__ */ new WeakMap(), _Comment_permalink = /* @__PURE__ */ new WeakMap(), _Comment_modReportReasons = /* @__PURE__ */ new WeakMap(), _Comment_userReportReasons = /* @__PURE__ */ new WeakMap(), _Comment_url = /* @__PURE__ */ new WeakMap(), _Comment_ignoringReports = /* @__PURE__ */ new WeakMap(), _Comment_metadata = /* @__PURE__ */ new WeakMap(), _Comment_getCommentsListing = function _Comment_getCommentsListing2(options, metadata, depthOffset = 0) {
  return new Listing({
    limit: options.limit,
    pageSize: options.pageSize,
    fetch: async (fetchOptions) => {
      let limit = fetchOptions.limit;
      const listingsClient = Devvit.redditAPIPlugins.Listings;
      const linksAndCommentsClient = Devvit.redditAPIPlugins.LinksAndComments;
      let commentId = options.commentId;
      if (fetchOptions.more) {
        if (fetchOptions.more.children.length) {
          const more = fetchOptions.more;
          if (!limit || limit > 100) {
            limit = 100;
          }
          const moreIds = more.children.splice(0, limit);
          const response2 = await linksAndCommentsClient.MoreChildren({
            linkId: options.postId,
            children: moreIds,
            sort: options.sort
          }, metadata);
          if (!response2.json?.data?.things?.length) {
            return { children: [] };
          }
          const { children } = __classPrivateFieldGet29(_a5, _a5, "m", _Comment_buildCommentsTree).call(_a5, response2.json.data.things, options.postId, options, metadata);
          return { children, more: more.children.length ? more : void 0 };
        } else {
          commentId = fetchOptions.more.parentId;
          depthOffset = depthOffset + fetchOptions.more.depth;
        }
      }
      const response = await listingsClient.Comments({
        article: options.postId.substring(3),
        comment: commentId?.substring(3),
        limit,
        depth: options.depth,
        sort: options.sort
      }, metadata);
      let responseChildren = response.listings?.[1]?.data?.children ?? [];
      const topLevelComment = responseChildren[0];
      if (commentId && topLevelComment?.data?.replyList?.data) {
        responseChildren = topLevelComment.data.replyList.data.children;
      }
      return __classPrivateFieldGet29(_a5, _a5, "m", _Comment_buildCommentsTree).call(_a5, responseChildren, commentId ?? options.postId, options, metadata, depthOffset);
    }
  });
}, _Comment_buildCommentsTree = function _Comment_buildCommentsTree2(redditObjects, parentId, options, metadata, depthOffset = 0) {
  const children = [];
  let more;
  const commentsMap = {};
  for (const child of redditObjects) {
    if (!child.data) {
      continue;
    }
    if (child.data.depth != null) {
      child.data.depth = child.data.depth + depthOffset;
    }
    if (child.data.depth != null && options.depth != null && child.data.depth >= options.depth) {
      continue;
    }
    const parentComment = child.data.parentId ? commentsMap[child.data.parentId] : void 0;
    if (child.kind === "t1") {
      if (child.data.name === parentId) {
        continue;
      }
      const comment = new _a5(child.data, metadata);
      commentsMap[comment.id] = comment;
      __classPrivateFieldSet28(comment, _Comment_replies, __classPrivateFieldGet29(_a5, _a5, "m", _Comment_getCommentsListing).call(_a5, {
        ...options,
        postId: comment.postId,
        commentId: comment.id
      }, metadata, depthOffset), "f");
      if ("replyList" in child.data && child.data.replyList?.data) {
        const { children: children2, more: more2 } = __classPrivateFieldGet29(_a5, _a5, "m", _Comment_buildCommentsTree2).call(_a5, child.data.replyList.data.children, comment.id, options, metadata, depthOffset);
        if (children2.length) {
          comment.replies.children.push(...children2);
        }
        if (more2) {
          comment.replies.setMore(more2);
        }
      }
      comment.replies.preventInitialFetch();
      if (parentComment) {
        parentComment.replies.children.push(comment);
      } else {
        children.push(comment);
      }
    } else if (child.kind === "more" && child.data.parentId && child.data.depth != null) {
      const thisMore = {
        parentId: isCommentId(child.data.parentId) ? asT1ID(child.data.parentId) : asT3ID(child.data.parentId),
        children: child.data.children ?? [],
        depth: child.data.depth
      };
      if (parentComment) {
        parentComment.replies.setMore(thisMore);
      } else if (thisMore.parentId === parentId) {
        more = thisMore;
      }
    }
  }
  return { children, more };
};

// node_modules/@devvit/public-api/apis/reddit/models/ModAction.js
function getModerationLog(options, metadata) {
  const client = Devvit.redditAPIPlugins.Moderation;
  return new Listing({
    hasMore: true,
    after: options.after,
    before: options.before,
    limit: options.limit,
    pageSize: options.pageSize,
    fetch: async (fetchOptions) => {
      const response = await client.AboutLog({
        subreddit: options.subredditName,
        mod: options.moderatorUsernames ? options.moderatorUsernames.join(",") : void 0,
        type: options.type,
        ...fetchOptions
      }, metadata);
      return aboutLogResponseToModActions(response);
    }
  });
}
function aboutLogResponseToModActions(response) {
  if (!response.data?.children) {
    throw new Error("AboutLogResponse is missing children");
  }
  const children = response.data.children.map((child) => {
    if (!child.data) {
      throw new Error("ModAction from AboutLogResponse is missing or invalid");
    }
    const { id, mod, modId36, createdUtc, subreddit, subredditNamePrefixed, action, srId36, description, details, targetAuthor, targetBody, targetFullname, targetPermalink, targetTitle } = child.data;
    assertNonNull(id, "ModAction from AboutLogResponse is missing id");
    assertNonNull(mod, "ModAction from AboutLogResponse is missing mod");
    assertNonNull(modId36, "ModAction from AboutLogResponse is missing modId36");
    assertNonNull(createdUtc, "ModAction from AboutLogResponse is missing createdUtc");
    assertNonNull(subreddit, "ModAction from AboutLogResponse is missing subreddit");
    assertNonNull(subredditNamePrefixed, "ModAction from AboutLogResponse is missing subredditNamePrefixed");
    assertNonNull(action, "ModAction from AboutLogResponse is missing action");
    assertNonNull(srId36, "ModAction from AboutLogResponse is missing srId36");
    const createdAt = /* @__PURE__ */ new Date(0);
    createdAt.setUTCSeconds(createdUtc);
    const modAction = {
      id,
      type: action,
      moderatorName: mod,
      moderatorId: `t2_${modId36}`,
      createdAt,
      subredditName: subreddit,
      subredditId: `t5_${srId36}`,
      description,
      details,
      target: targetFullname ? {
        id: targetFullname,
        author: targetAuthor,
        body: targetBody,
        permalink: targetPermalink,
        title: targetTitle
      } : void 0
    };
    return modAction;
  });
  return {
    children,
    after: response.data.after,
    before: response.data.before
  };
}

// node_modules/@devvit/public-api/apis/reddit/models/ModMail.js
var import_protos30 = require("@devvit/protos");
var __classPrivateFieldSet29 = function(receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet30 = function(receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _ModMailService_instances;
var _ModMailService_metadata;
var _ModMailService_transformConversationData;
var _ModMailService_getConversationMessages;
var _ModMailService_getConversationModActions;
var ModMailConversationState;
(function(ModMailConversationState2) {
  ModMailConversationState2["New"] = "New";
  ModMailConversationState2["InProgress"] = "InProgress";
  ModMailConversationState2["Archived"] = "Archived";
  ModMailConversationState2["Appeals"] = "Appeals";
  ModMailConversationState2["JoinRequests"] = "JoinRequests";
  ModMailConversationState2["Filtered"] = "Filtered";
})(ModMailConversationState || (ModMailConversationState = {}));
var R2_TO_MODMAIL_CONVERSATION_STATE = {
  0: ModMailConversationState.New,
  1: ModMailConversationState.InProgress,
  2: ModMailConversationState.Archived,
  3: ModMailConversationState.Appeals,
  4: ModMailConversationState.JoinRequests,
  5: ModMailConversationState.Filtered
};
var ModMailActionType;
(function(ModMailActionType2) {
  ModMailActionType2["Highlighted"] = "Highlighted";
  ModMailActionType2["Unhighlighted"] = "Unhighlighted";
  ModMailActionType2["Archived"] = "Archived";
  ModMailActionType2["Unarchived"] = "Unarchived";
  ModMailActionType2["ReportedToAdmins"] = "ReportedToAdmins";
  ModMailActionType2["Muted"] = "Muted";
  ModMailActionType2["Unmuted"] = "Unmuted";
  ModMailActionType2["Banned"] = "Banned";
  ModMailActionType2["Unbanned"] = "Unbanned";
  ModMailActionType2["Approved"] = "Approved";
  ModMailActionType2["Disapproved"] = "Disapproved";
  ModMailActionType2["Filtered"] = "Filtered";
  ModMailActionType2["Unfiltered"] = "Unfiltered";
})(ModMailActionType || (ModMailActionType = {}));
var R2_TO_MOD_ACTION_TYPE = {
  0: ModMailActionType.Highlighted,
  1: ModMailActionType.Unhighlighted,
  2: ModMailActionType.Archived,
  3: ModMailActionType.Unarchived,
  4: ModMailActionType.ReportedToAdmins,
  5: ModMailActionType.Muted,
  6: ModMailActionType.Unmuted,
  7: ModMailActionType.Banned,
  8: ModMailActionType.Unbanned,
  9: ModMailActionType.Approved,
  10: ModMailActionType.Disapproved,
  11: ModMailActionType.Filtered,
  12: ModMailActionType.Unfiltered
};
var ModMailService = class {
  /**
   * @internal
   */
  constructor(metadata) {
    _ModMailService_instances.add(this);
    _ModMailService_metadata.set(this, void 0);
    this.notificationSubjectPrefix = "[notification]";
    __classPrivateFieldSet29(this, _ModMailService_metadata, metadata, "f");
  }
  /**
   * Marks all conversations read for a particular conversation state within the passed list of subreddits.
   *
   * @param subreddits Array of subreddit names
   * @param state One of the possible conversation states ('all' to read all conversations)
   *
   * @returns conversationIds
   *
   * @example
   * ```ts
   * const conversationIds = await reddit.modMail.bulkReadConversations(
   *   ['askReddit', 'myAwesomeSubreddit'],
   *   'filtered'
   * );
   * ```
   */
  async bulkReadConversations(subreddits, state) {
    const client = Devvit.redditAPIPlugins.NewModmail;
    const { conversationIds } = await client.BulkReadConversations({
      entity: subreddits.join(","),
      state
    }, __classPrivateFieldGet30(this, _ModMailService_metadata, "f"));
    return conversationIds;
  }
  /**
   * Get conversations for a logged in user or subreddits
   *
   * @param params.after id of a modmail
   * @param params.subreddits array of subreddit names
   * @param params.limit an integer between 1 and 100 (default: 25)
   * @param params.sort one of (recent, mod, user, unread)
   * @param params.state One of the possible conversation states ('all' to read all conversations)
   *
   * @example
   * ```ts
   * const {viewerId, conversations} = await reddit.modMail.getConversations({
   *   after: 'abcdef',
   *   limit: 42
   * });
   *
   * const arrayOfConversations = Object.values(conversations);
   * ```
   */
  async getConversations(params) {
    const client = Devvit.redditAPIPlugins.NewModmail;
    const response = await client.GetConversations({
      after: params.after,
      entity: params.subreddits ? params.subreddits.join(",") : void 0,
      limit: params.limit,
      sort: params.sort,
      state: params.state
    }, __classPrivateFieldGet30(this, _ModMailService_metadata, "f"));
    const conversations = {};
    for (const id in response.conversations) {
      conversations[id] = __classPrivateFieldGet30(this, _ModMailService_instances, "m", _ModMailService_transformConversationData).call(this, {
        protoConversation: response.conversations[id],
        protoMessages: response.messages,
        protoModActions: {}
      });
    }
    return {
      conversations,
      viewerId: response.viewerId,
      conversationIds: response.conversationIds
    };
  }
  /**
   * Returns all messages, mod actions and conversation metadata for a given conversation id
   *
   * @param params.conversationId id of a modmail conversation
   * @param params.markRead should be marked as read (default: false)
   *
   * @example
   * ```ts
   * const { conversation, messages, modActions, user } = await reddit.modMail.getConversation({ conversationId: 'abcdef', markRead: true });
   * ```
   */
  async getConversation(params) {
    const client = Devvit.redditAPIPlugins.NewModmail;
    const response = await client.GetConversation({ ...params, markRead: !!params.markRead }, __classPrivateFieldGet30(this, _ModMailService_metadata, "f"));
    return {
      participantSubreddit: response.participantSubreddit,
      conversation: __classPrivateFieldGet30(this, _ModMailService_instances, "m", _ModMailService_transformConversationData).call(this, {
        protoConversation: response.conversation,
        protoMessages: response.messages,
        protoModActions: response.modActions
      }),
      user: response.user
    };
  }
  /**
   * Returns a list of Subreddits that the user moderates with mail permission
   *
   * @example
   * ```ts
   * const subredditsData = await reddit.modMail.getSubreddits();
   *
   * for (const subreddit of Object.values(subreddits)) {
   *   console.log(subreddit.id);
   *   console.log(subreddit.name);
   * }
   * ```
   */
  async getSubreddits() {
    const client = Devvit.redditAPIPlugins.NewModmail;
    const { subreddits } = await client.Subreddits({}, __classPrivateFieldGet30(this, _ModMailService_metadata, "f"));
    return subreddits;
  }
  /**
   * Creates a new conversation for a particular SR.
   *
   * This endpoint will create a ModmailConversation object
   * as well as the first ModmailMessage within the ModmailConversation object.
   *
   * @note
   * Note on {param.to}:
   * The to field for this endpoint is somewhat confusing. It can be:
   * - A User, passed like "username" or "u/username"
   * - A Subreddit, passed like "r/subreddit"
   * - null, meaning an internal moderator discussion
   *
   * In this way to is a bit of a misnomer in modmail conversations.
   * What it really means is the participant of the conversation who is not a mod of the subreddit.
   *
   * If you plan to send a message to the app-account or a moderator of the subreddit, use {@link ModMailService.createModDiscussionConversation}, {@link ModMailService.createModInboxConversation}, or {@link ModMailService.createModNotification} instead.
   * Otherwise, messages sent to the app-account or moderator will automatically be routed to Mod Discussions.
   * @param params.body markdown text
   * @param params.isAuthorHidden is author hidden? (default: false)
   * @param params.subredditName subreddit name
   * @param params.subject subject of the conversation. max 100 characters
   * @param params.to a user (e.g. u/username), a subreddit (e.g. r/subreddit) or null
   *
   * @example
   * ```ts
   * const { conversation, messages, modActions } = await reddit.modMail.createConversation({
   *   subredditName: 'askReddit',
   *   subject: 'Test conversation',
   *   body: 'Lorem ipsum sit amet',
   *   to: null,
   * });
   * ```
   */
  async createConversation(params) {
    const client = Devvit.redditAPIPlugins.NewModmail;
    const response = await client.CreateConversation({
      body: params.body,
      isAuthorHidden: params.isAuthorHidden ?? false,
      srName: params.subredditName,
      subject: params.subject,
      to: params.to ? params.to : void 0
    }, __classPrivateFieldGet30(this, _ModMailService_metadata, "f"));
    return {
      conversation: __classPrivateFieldGet30(this, _ModMailService_instances, "m", _ModMailService_transformConversationData).call(this, {
        protoConversation: response.conversation,
        protoMessages: response.messages,
        protoModActions: response.modActions
      }),
      user: response.user
    };
  }
  /**
   * Creates a conversation in Mod Discussions with the moderators of the given subredditId.
   *
   * Note: The app must be installed in the subreddit in order to create a conversation in Mod Discussions.
   *
   * @param subject - The subject of the message.
   * @param bodyMarkdown - The body of the message in markdown format, e.g. `Hello world \n\n **Have a great day**`.
   * @param subredditId - The ID (starting with `t5_`) of the subreddit to which to send the message, e.g. `t5_2qjpg`.
   * @returns A Promise that resolves a string representing the conversationId of the message.
   * @example
   * ```ts
   * const conversationId = await reddit.modMail.createModDiscussionConversation({
   *   subject: 'Test conversation',
   *   bodyMarkdown: '**Hello there** \n\n _Have a great day!_',
   *   subredditId: context.subredditId
   * });
   * ```
   */
  async createModDiscussionConversation(params) {
    return createModmailConversation({
      subject: params.subject,
      bodyMarkdown: params.bodyMarkdown,
      subredditId: asT5ID(params.subredditId),
      isInternal: true,
      participantType: "MODERATOR",
      conversationType: "INTERNAL"
    }, __classPrivateFieldGet30(this, _ModMailService_metadata, "f"));
  }
  /**
   * Creates a conversation in the Modmail Inbox with the moderators of the given subredditId.
   *
   * @param subject - The subject of the message.
   * @param bodyMarkdown - The body of the message in markdown format, e.g. `Hello world \n\n **Have a great day**`.
   * @param subredditId - The ID (starting with `t5_`) of the subreddit to which to send the message, e.g. `t5_2qjpg`.
   * @returns A Promise that resolves a string representing the conversationId of the message.
   * @example
   * ```ts
   * const conversationId = await reddit.modMail.createModInboxConversation({
   *   subject: 'Test conversation',
   *   bodyMarkdown: '**Hello there** \n\n _Have a great day!_',
   *   subredditId: context.subredditId
   * });
   * ```
   */
  async createModInboxConversation(params) {
    return createModmailConversation({
      subject: params.subject,
      bodyMarkdown: params.bodyMarkdown,
      subredditId: asT5ID(params.subredditId),
      isInternal: false,
      participantType: "PARTICIPANT_USER",
      conversationType: "SR_USER"
    }, __classPrivateFieldGet30(this, _ModMailService_metadata, "f"));
  }
  /**
   * Creates a notification in the Modmail Inbox.
   * This function is different from {@link ModMailService.createModInboxConversation} in that the conversation also appears in the "Notifications" section of Modmail.
   *
   * @param subject - The subject of the message.
   * @param bodyMarkdown - The body of the message in markdown format, e.g. `Hello world \n\n **Have a great day**`.
   * @param subredditId - The ID (starting with `t5_`) of the subreddit to which to send the message, e.g. `t5_2qjpg`.
   * @returns A Promise that resolves a string representing the conversationId of the message.
   * @example
   * ```ts
   * const conversationId = await reddit.modMail.createModNotification({
   *   subject: 'Test notification',
   *   bodyMarkdown: '**Hello there** \n\n _This is a notification!_',
   *   subredditId: context.subredditId
   * });
   * ```
   */
  async createModNotification(params) {
    let notificationSubject = params.subject;
    if (!params.subject.startsWith(this.notificationSubjectPrefix)) {
      notificationSubject = `${this.notificationSubjectPrefix} ${params.subject}`;
    }
    return createModmailConversation({
      subject: notificationSubject,
      bodyMarkdown: params.bodyMarkdown,
      subredditId: asT5ID(params.subredditId),
      isInternal: false,
      participantType: "PARTICIPANT_USER",
      conversationType: "SR_USER"
    }, __classPrivateFieldGet30(this, _ModMailService_metadata, "f"));
  }
  /**
   * Creates a new message for a particular conversation.
   *
   * @param params.conversationId Id of a modmail conversation
   * @param params.body markdown text
   * @param params.isInternal is internal message? (default: false)
   * @param params.isAuthorHidden is author hidden? (default: false)
   *
   * @example
   * ```ts
   * await reddit.modMail.reply({
   *   body: 'Lorem ipsum sit amet',
   *   conversationId: 'abcdef',
   * });
   * ```
   */
  async reply(params) {
    const client = Devvit.redditAPIPlugins.NewModmail;
    const response = await client.CreateConversationMessage({
      body: params.body,
      conversationId: params.conversationId,
      isAuthorHidden: params.isAuthorHidden ?? false,
      isInternal: params.isInternal ?? false
    }, __classPrivateFieldGet30(this, _ModMailService_metadata, "f"));
    return {
      conversation: __classPrivateFieldGet30(this, _ModMailService_instances, "m", _ModMailService_transformConversationData).call(this, {
        protoConversation: response.conversation,
        protoMessages: response.messages,
        protoModActions: {}
      }),
      user: response.user
    };
  }
  /**
   * Marks a conversation as highlighted.
   *
   * @param conversationId Id of a modmail conversation
   *
   * @example
   * ```ts
   * await reddit.modMail.highlightConversation('abcdef');
   * ```
   */
  async highlightConversation(conversationId) {
    const client = Devvit.redditAPIPlugins.NewModmail;
    const response = await client.HighlightConversation({
      conversationId
    }, __classPrivateFieldGet30(this, _ModMailService_metadata, "f"));
    return {
      conversation: __classPrivateFieldGet30(this, _ModMailService_instances, "m", _ModMailService_transformConversationData).call(this, {
        protoConversation: response.conversation,
        protoMessages: response.messages,
        protoModActions: response.modActions
      })
    };
  }
  /**
   * Removes a highlight from a conversation.
   *
   * @param conversationId Id of a modmail conversation
   *
   * @example
   * ```ts
   * await reddit.modMail.unhighlightConversation('abcdef');
   * ```
   */
  async unhighlightConversation(conversationId) {
    const client = Devvit.redditAPIPlugins.NewModmail;
    const response = await client.UnhighlightConversation({
      conversationId
    }, __classPrivateFieldGet30(this, _ModMailService_metadata, "f"));
    return {
      conversation: __classPrivateFieldGet30(this, _ModMailService_instances, "m", _ModMailService_transformConversationData).call(this, {
        protoConversation: response.conversation,
        protoMessages: response.messages,
        protoModActions: response.modActions
      })
    };
  }
  /**
   * Marks a conversation as archived
   *
   * @param conversationId Id of a modmail conversation
   *
   * @example
   * ```ts
   * await reddit.modMail.archive('abcdef');
   * ```
   */
  async archiveConversation(conversationId) {
    const client = Devvit.redditAPIPlugins.NewModmail;
    const response = await client.ArchiveConversation({
      conversationId
    }, __classPrivateFieldGet30(this, _ModMailService_metadata, "f"));
    return {
      conversation: __classPrivateFieldGet30(this, _ModMailService_instances, "m", _ModMailService_transformConversationData).call(this, {
        protoConversation: response.conversation,
        protoMessages: response.messages,
        protoModActions: response.modActions
      })
    };
  }
  /**
   * Marks conversation as unarchived.
   *
   * @param conversationId Id of a modmail conversation
   *
   * @example
   * ```ts
   * await reddit.modMail.unarchiveConversation('abcdef');
   * ```
   */
  async unarchiveConversation(conversationId) {
    const client = Devvit.redditAPIPlugins.NewModmail;
    const response = await client.UnarchiveConversation({
      conversationId
    }, __classPrivateFieldGet30(this, _ModMailService_metadata, "f"));
    return {
      conversation: __classPrivateFieldGet30(this, _ModMailService_instances, "m", _ModMailService_transformConversationData).call(this, {
        protoConversation: response.conversation,
        protoMessages: response.messages,
        protoModActions: response.modActions
      })
    };
  }
  /**
   * Marks a conversation as read for the user.
   *
   * @param params.conversationId Id of a modmail conversation
   * @param params.numHours For how many hours the conversation needs to be muted. Must be one of 72, 168, or 672 hours
   *
   * @example
   * ```ts
   * await reddit.modMail.muteConversation({ conversationId: 'abcdef', numHours: 72 });
   * ```
   */
  async muteConversation(params) {
    const client = Devvit.redditAPIPlugins.NewModmail;
    const response = await client.MuteConversation({
      conversationId: params.conversationId,
      numHours: params.numHours
    }, __classPrivateFieldGet30(this, _ModMailService_metadata, "f"));
    return {
      conversation: __classPrivateFieldGet30(this, _ModMailService_instances, "m", _ModMailService_transformConversationData).call(this, {
        protoConversation: response.conversations,
        protoMessages: response.messages,
        protoModActions: response.modActions
      }),
      user: response.user
    };
  }
  /**
   * Unmutes the non mod user associated with a particular conversation.
   *
   * @param conversationId Id of a modmail conversation
   *
   * @example
   * ```ts
   * await reddit.modMail.unmuteConversation('abcdef');
   * ```
   */
  async unmuteConversation(conversationId) {
    const client = Devvit.redditAPIPlugins.NewModmail;
    const response = await client.UnmuteConversation({
      conversationId
    }, __classPrivateFieldGet30(this, _ModMailService_metadata, "f"));
    return {
      conversation: __classPrivateFieldGet30(this, _ModMailService_instances, "m", _ModMailService_transformConversationData).call(this, {
        protoConversation: response.conversations,
        protoMessages: response.messages,
        protoModActions: response.modActions
      }),
      user: response.user
    };
  }
  /**
   * Marks a conversations as read for the user.
   *
   * @param conversationIds An array of ids
   *
   * @example
   * ```ts
   * await reddit.modMail.readConversations(['abcdef', 'qwerty']);
   * ```
   */
  async readConversations(conversationIds) {
    const client = Devvit.redditAPIPlugins.NewModmail;
    await client.Read({
      conversationIds: conversationIds.join(",")
    }, __classPrivateFieldGet30(this, _ModMailService_metadata, "f"));
  }
  /**
   * Marks conversations as unread for the user.
   *
   * @param conversationIds An array of ids
   *
   * @example
   * ```ts
   * await reddit.modMail.unreadConversations(['abcdef', 'qwerty']);
   * ```
   */
  async unreadConversations(conversationIds) {
    const client = Devvit.redditAPIPlugins.NewModmail;
    await client.Unread({
      conversationIds: conversationIds.join(",")
    }, __classPrivateFieldGet30(this, _ModMailService_metadata, "f"));
  }
  /**
   * Approve the non mod user associated with a particular conversation.
   *
   * @param conversationId Id of a modmail conversation
   *
   * @example
   * ```ts
   * await reddit.modMail.approveConversation('abcdef');
   * ```
   */
  async approveConversation(conversationId) {
    const client = Devvit.redditAPIPlugins.NewModmail;
    const response = await client.ApproveConversation({
      conversationId
    }, __classPrivateFieldGet30(this, _ModMailService_metadata, "f"));
    return {
      conversation: __classPrivateFieldGet30(this, _ModMailService_instances, "m", _ModMailService_transformConversationData).call(this, {
        protoConversation: response.conversations,
        protoMessages: response.messages,
        protoModActions: response.modActions
      }),
      user: response.user
    };
  }
  /**
   * Disapprove the non mod user associated with a particular conversation.
   *
   * @param conversationId Id of a modmail conversation
   *
   * @example
   * ```ts
   * await reddit.modMail.disapproveConversation('abcdef');
   * ```
   */
  async disapproveConversation(conversationId) {
    const client = Devvit.redditAPIPlugins.NewModmail;
    const response = await client.DisapproveConversation({
      conversationId
    }, __classPrivateFieldGet30(this, _ModMailService_metadata, "f"));
    return {
      conversation: __classPrivateFieldGet30(this, _ModMailService_instances, "m", _ModMailService_transformConversationData).call(this, {
        protoConversation: response.conversations,
        protoMessages: response.messages,
        protoModActions: response.modActions
      }),
      user: response.user
    };
  }
  /**
   * Temporary ban (switch from permanent to temporary ban) the non mod user associated with a particular conversation.
   *
   * @param params.conversationId a modmail conversation id
   * @param params.duration duration in days, max 999
   *
   * @example
   * ```ts
   * await reddit.modMail.tempBanConversation({ conversationId: 'abcdef', duration: 42 });
   * ```
   */
  async tempBanConversation(params) {
    const client = Devvit.redditAPIPlugins.NewModmail;
    const response = await client.TempBan({
      ...params
    }, __classPrivateFieldGet30(this, _ModMailService_metadata, "f"));
    return {
      conversation: __classPrivateFieldGet30(this, _ModMailService_instances, "m", _ModMailService_transformConversationData).call(this, {
        protoConversation: response.conversations,
        protoMessages: response.messages,
        protoModActions: response.modActions
      }),
      user: response.user
    };
  }
  /**
   * Unban the non mod user associated with a particular conversation.
   *
   * @param conversationId a modmail conversation id
   *
   * @example
   * ```ts
   * await reddit.modMail.unbanConversation('abcdef');
   * ```
   */
  async unbanConversation(conversationId) {
    const client = Devvit.redditAPIPlugins.NewModmail;
    const response = await client.Unban({
      conversationId
    }, __classPrivateFieldGet30(this, _ModMailService_metadata, "f"));
    return {
      conversation: __classPrivateFieldGet30(this, _ModMailService_instances, "m", _ModMailService_transformConversationData).call(this, {
        protoConversation: response.conversations,
        protoMessages: response.messages,
        protoModActions: response.modActions
      }),
      user: response.user
    };
  }
  /**
   * Endpoint to retrieve the unread conversation count by conversation state.
   *
   * @example
   * ```ts
   * const response = await reddit.modMail.getUnreadCount();
   *
   * console.log(response.highlighted);
   * console.log(response.new);
   * ```
   */
  async getUnreadCount() {
    const client = Devvit.redditAPIPlugins.NewModmail;
    return await client.UnreadCount({}, __classPrivateFieldGet30(this, _ModMailService_metadata, "f"));
  }
  /**
   * Returns recent posts, comments and modmail conversations for a given user.
   *
   * @param conversationId Id of a modmail conversation
   *
   * @example
   * ```ts
   * const data = await reddit.modMail.getUserConversations('abcdef');
   *
   * console.log(data.recentComments);
   * console.log(data.recentPosts);
   * ```
   */
  async getUserConversations(conversationId) {
    const client = Devvit.redditAPIPlugins.NewModmail;
    return await client.UserConversations({ conversationId }, __classPrivateFieldGet30(this, _ModMailService_metadata, "f"));
  }
};
_ModMailService_metadata = /* @__PURE__ */ new WeakMap(), _ModMailService_instances = /* @__PURE__ */ new WeakSet(), _ModMailService_transformConversationData = function _ModMailService_transformConversationData2({ protoConversation, protoMessages, protoModActions }) {
  return {
    ...protoConversation,
    state: R2_TO_MODMAIL_CONVERSATION_STATE[protoConversation.state],
    messages: __classPrivateFieldGet30(this, _ModMailService_instances, "m", _ModMailService_getConversationMessages).call(this, protoConversation, protoMessages),
    modActions: __classPrivateFieldGet30(this, _ModMailService_instances, "m", _ModMailService_getConversationModActions).call(this, protoConversation, protoModActions)
  };
}, _ModMailService_getConversationMessages = function _ModMailService_getConversationMessages2(protoConversation, protoMessages) {
  const messages = {};
  const messageIds = protoConversation.objIds.filter((o) => o.key === "messages").map(({ id }) => id);
  for (const messageId of messageIds) {
    const protoMessage = protoMessages[messageId];
    if (protoMessage) {
      messages[messageId] = protoMessage;
    }
  }
  return messages;
}, _ModMailService_getConversationModActions = function _ModMailService_getConversationModActions2(protoConversation, protoModActions) {
  const modActions = {};
  const modActionIds = protoConversation.objIds.filter((o) => o.key === "modActions").map(({ id }) => id);
  for (const modActionId of modActionIds) {
    const protoModAction = protoModActions[modActionId];
    if (protoModAction) {
      modActions[modActionId] = {
        ...protoModAction,
        actionType: R2_TO_MOD_ACTION_TYPE[protoModAction.actionTypeId]
      };
    }
  }
  return modActions;
};
async function createModmailConversation(params, metadata) {
  const appUserId = metadata[Header.AppUser]?.values[0];
  const operationName = "CreateModmailConversation";
  const persistedQueryHash = "5f9ae20b0c7bdffcafb80241728a72e67cd4239bc09f67284b79d4aa706ee0e5";
  const response = await GraphQL.query(operationName, persistedQueryHash, {
    subject: params.subject,
    bodyMarkdown: params.bodyMarkdown,
    subredditId: params.subredditId,
    authorId: appUserId,
    isInternal: params.isInternal,
    participantType: params.participantType,
    conversationType: params.conversationType
  }, metadata);
  if (response.data?.createModmailConversationV2?.ok) {
    return response.data?.createModmailConversationV2?.conversationId;
  }
  throw new Error("modmail conversation creation failed; ${response.data?.createModmailConversationV2?.errors[0].message}");
}

// node_modules/@devvit/public-api/apis/reddit/models/PrivateMessage.js
var __classPrivateFieldSet30 = function(receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet31 = function(receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _PrivateMessage_id;
var _PrivateMessage_from;
var _PrivateMessage_body;
var _PrivateMessage_bodyHtml;
var _PrivateMessage_created;
var _PrivateMessage_metadata;
var PrivateMessage = class _PrivateMessage {
  /** @internal */
  static async getMessages(options, metadata) {
    const client = Devvit.redditAPIPlugins.PrivateMessages;
    return new Listing({
      ...options,
      fetch: async (fetchOpts) => {
        const listing = await client.MessageWhere({
          ...fetchOpts,
          where: options.type ?? "inbox"
        }, metadata);
        return {
          after: listing.data?.after,
          before: listing.data?.before,
          children: listing.data?.children?.map((child) => {
            return new _PrivateMessage(child.data, metadata);
          }).filter(Boolean) || []
        };
      }
    });
  }
  /** @internal */
  static async send({ to, subject, text }, metadata) {
    const client = Devvit.redditAPIPlugins.PrivateMessages;
    await client.Compose({
      to,
      subject,
      text,
      fromSr: ""
    }, metadata);
  }
  /** @internal */
  static async sendAsSubreddit({ to, fromSubredditName, subject, text }, metadata) {
    const client = Devvit.redditAPIPlugins.PrivateMessages;
    await client.Compose({
      to,
      fromSr: fromSubredditName,
      subject,
      text
    }, metadata);
  }
  /** @internal */
  static async markAllAsRead(metadata) {
    const client = Devvit.redditAPIPlugins.PrivateMessages;
    await client.ReadAllMessages({ filterTypes: "" }, metadata);
  }
  /**
   * @internal
   */
  constructor(data, metadata) {
    _PrivateMessage_id.set(this, void 0);
    _PrivateMessage_from.set(this, void 0);
    _PrivateMessage_body.set(this, void 0);
    _PrivateMessage_bodyHtml.set(this, void 0);
    _PrivateMessage_created.set(this, void 0);
    _PrivateMessage_metadata.set(this, void 0);
    makeGettersEnumerable(this);
    assertNonNull(data.id, "PrivateMessage: Invalid data, no id");
    assertNonNull(data.name, "PrivateMessage: Invalid data, no name");
    assertNonNull(data.created, "PrivateMessage: Invalid data, no created date");
    __classPrivateFieldSet30(this, _PrivateMessage_id, asTID(data.name), "f");
    if (data.author != null) {
      __classPrivateFieldSet30(this, _PrivateMessage_from, {
        type: "user",
        username: data.author,
        id: data.authorFullname ? asT2ID(data.authorFullname) : void 0
      }, "f");
    } else if (data.subreddit != null) {
      __classPrivateFieldSet30(this, _PrivateMessage_from, {
        type: "subreddit",
        name: data.subreddit,
        id: data.subredditId ? asT5ID(data.subredditId) : void 0
      }, "f");
    } else {
      throw new Error("PrivateMessage: Invalid data, no author or subreddit");
    }
    __classPrivateFieldSet30(this, _PrivateMessage_body, data.body ?? "", "f");
    __classPrivateFieldSet30(this, _PrivateMessage_bodyHtml, data.bodyHtml ?? "", "f");
    const created = /* @__PURE__ */ new Date(0);
    created.setUTCSeconds(data.createdUtc);
    __classPrivateFieldSet30(this, _PrivateMessage_created, created, "f");
    __classPrivateFieldSet30(this, _PrivateMessage_metadata, metadata, "f");
  }
  get id() {
    return __classPrivateFieldGet31(this, _PrivateMessage_id, "f");
  }
  get from() {
    return __classPrivateFieldGet31(this, _PrivateMessage_from, "f");
  }
  get body() {
    return __classPrivateFieldGet31(this, _PrivateMessage_body, "f");
  }
  get bodyHtml() {
    return __classPrivateFieldGet31(this, _PrivateMessage_bodyHtml, "f");
  }
  get created() {
    return __classPrivateFieldGet31(this, _PrivateMessage_created, "f");
  }
  async markAsRead() {
    const client = Devvit.redditAPIPlugins.PrivateMessages;
    await client.ReadMessage({ id: __classPrivateFieldGet31(this, _PrivateMessage_id, "f") }, __classPrivateFieldGet31(this, _PrivateMessage_metadata, "f"));
  }
};
_PrivateMessage_id = /* @__PURE__ */ new WeakMap(), _PrivateMessage_from = /* @__PURE__ */ new WeakMap(), _PrivateMessage_body = /* @__PURE__ */ new WeakMap(), _PrivateMessage_bodyHtml = /* @__PURE__ */ new WeakMap(), _PrivateMessage_created = /* @__PURE__ */ new WeakMap(), _PrivateMessage_metadata = /* @__PURE__ */ new WeakMap();

// node_modules/@devvit/public-api/apis/reddit/models/Subreddit.js
var __classPrivateFieldSet31 = function(receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet32 = function(receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Subreddit_id;
var _Subreddit_name;
var _Subreddit_createdAt;
var _Subreddit_type;
var _Subreddit_title;
var _Subreddit_description;
var _Subreddit_language;
var _Subreddit_numberOfSubscribers;
var _Subreddit_numberOfActiveUsers;
var _Subreddit_nsfw;
var _Subreddit_settings;
var _Subreddit_permalink;
var _Subreddit_metadata;
var AboutLocations;
(function(AboutLocations2) {
  AboutLocations2["Reports"] = "reports";
  AboutLocations2["Spam"] = "spam";
  AboutLocations2["Modqueue"] = "modqueue";
  AboutLocations2["Unmoderated"] = "unmoderated";
  AboutLocations2["Edited"] = "edited";
})(AboutLocations || (AboutLocations = {}));
var Subreddit = class _Subreddit {
  /**
   * @internal
   */
  constructor(data, metadata) {
    _Subreddit_id.set(this, void 0);
    _Subreddit_name.set(this, void 0);
    _Subreddit_createdAt.set(this, void 0);
    _Subreddit_type.set(this, void 0);
    _Subreddit_title.set(this, void 0);
    _Subreddit_description.set(this, void 0);
    _Subreddit_language.set(this, void 0);
    _Subreddit_numberOfSubscribers.set(this, void 0);
    _Subreddit_numberOfActiveUsers.set(this, void 0);
    _Subreddit_nsfw.set(this, void 0);
    _Subreddit_settings.set(this, void 0);
    _Subreddit_permalink.set(this, void 0);
    _Subreddit_metadata.set(this, void 0);
    makeGettersEnumerable(this);
    assertNonNull(data.id, "Subreddit id is missing or undefined");
    assertNonNull(data.displayName, "Subreddit name is missing or undefined");
    __classPrivateFieldSet31(this, _Subreddit_id, asT5ID(`t5_${data.id}`), "f");
    __classPrivateFieldSet31(this, _Subreddit_name, data.displayName, "f");
    assertNonNull(data.createdUtc, "Subreddit is missing created date");
    const createdAt = /* @__PURE__ */ new Date(0);
    createdAt.setUTCSeconds(data.createdUtc);
    __classPrivateFieldSet31(this, _Subreddit_createdAt, createdAt, "f");
    __classPrivateFieldSet31(this, _Subreddit_type, asSubredditType(data.subredditType), "f");
    __classPrivateFieldSet31(this, _Subreddit_title, data.title, "f");
    __classPrivateFieldSet31(this, _Subreddit_description, data.description, "f");
    assertNonNull(data.lang, "Subreddit is missing language");
    __classPrivateFieldSet31(this, _Subreddit_language, data.lang, "f");
    __classPrivateFieldSet31(this, _Subreddit_numberOfSubscribers, data.subscribers ?? 0, "f");
    __classPrivateFieldSet31(this, _Subreddit_numberOfActiveUsers, data.activeUserCount ?? 0, "f");
    __classPrivateFieldSet31(this, _Subreddit_nsfw, data.over18 ?? false, "f");
    __classPrivateFieldSet31(this, _Subreddit_permalink, data.url ?? "", "f");
    __classPrivateFieldSet31(this, _Subreddit_settings, {
      acceptFollowers: data.acceptFollowers ?? false,
      allOriginalContent: data.allOriginalContent ?? false,
      allowChatPostCreation: data.allowChatPostCreation ?? false,
      allowDiscovery: data.allowDiscovery ?? false,
      allowGalleries: data.allowGalleries ?? false,
      allowImages: data.allowImages ?? false,
      allowPolls: data.allowPolls ?? false,
      allowPredictionContributors: data.allowPredictionContributors ?? false,
      allowPredictions: data.allowPredictions ?? false,
      allowPredictionsTournament: data.allowPredictionsTournament ?? false,
      allowTalks: data.allowTalks ?? false,
      allowVideoGifs: data.allowVideogifs ?? false,
      allowVideos: data.allowVideos ?? false,
      chatPostEnabled: data.isChatPostFeatureEnabled ?? false,
      collectionsEnabled: data.collectionsEnabled ?? false,
      crosspostable: data.isCrosspostableSubreddit ?? false,
      emojisEnabled: data.emojisEnabled ?? false,
      eventPostsEnabled: data.eventPostsEnabled ?? false,
      linkFlairEnabled: data.linkFlairEnabled ?? false,
      originalContentTagEnabled: data.originalContentTagEnabled ?? false,
      restrictCommenting: data.restrictCommenting ?? false,
      restrictPosting: data.restrictPosting ?? false,
      shouldArchivePosts: data.shouldArchivePosts ?? false,
      spoilersEnabled: data.spoilersEnabled ?? false,
      wikiEnabled: data.wikiEnabled ?? false,
      allowedPostType: asAllowedPostType(data.submissionType),
      allowedMediaInComments: (data.allowedMediaInComments ?? []).map(asCommentMediaTypes),
      bannerBackgroundColor: data.bannerBackgroundColor,
      bannerBackgroundImage: data.bannerBackgroundImage,
      bannerImage: data.bannerImg,
      communityIcon: data.communityIcon,
      headerTitle: data.headerTitle,
      keyColor: data.keyColor,
      mobileBannerImage: data.mobileBannerImage,
      primaryColor: data.primaryColor,
      userFlairs: {
        enabled: data.userFlairEnabledInSr ?? false,
        usersCanAssign: data.canAssignUserFlair ?? false,
        userFlairBackgroundColor: data.userFlairBackgroundColor,
        userFlairTextColor: data.userFlairTextColor
      },
      postFlairs: {
        enabled: data.linkFlairEnabled ?? false,
        usersCanAssign: data.canAssignLinkFlair ?? false
      },
      // R2 bug: url is a permalink
      url: new URL(__classPrivateFieldGet32(this, _Subreddit_permalink, "f"), "https://www.reddit.com").toString()
    }, "f");
    __classPrivateFieldSet31(this, _Subreddit_metadata, metadata, "f");
  }
  /**
   * The ID (starting with t5_) of the subreddit to retrieve. e.g. t5_2qjpg
   */
  get id() {
    return __classPrivateFieldGet32(this, _Subreddit_id, "f");
  }
  /**
   * The name of a subreddit omitting the r/.
   */
  get name() {
    return __classPrivateFieldGet32(this, _Subreddit_name, "f");
  }
  /**
   * The creation date of the subreddit.
   */
  get createdAt() {
    return __classPrivateFieldGet32(this, _Subreddit_createdAt, "f");
  }
  /**
   * The type of subreddit (public, private, etc.).
   */
  get type() {
    return __classPrivateFieldGet32(this, _Subreddit_type, "f");
  }
  /**
   * The title of the subreddit.
   */
  get title() {
    return __classPrivateFieldGet32(this, _Subreddit_title, "f");
  }
  /**
   * The description of the subreddit.
   */
  get description() {
    return __classPrivateFieldGet32(this, _Subreddit_description, "f");
  }
  /**
   * The language of the subreddit.
   */
  get language() {
    return __classPrivateFieldGet32(this, _Subreddit_language, "f");
  }
  /**
   * The number of subscribers of the subreddit.
   */
  get numberOfSubscribers() {
    return __classPrivateFieldGet32(this, _Subreddit_numberOfSubscribers, "f");
  }
  /**
   * The number of active users of the subreddit.
   */
  get numberOfActiveUsers() {
    return __classPrivateFieldGet32(this, _Subreddit_numberOfActiveUsers, "f");
  }
  /**
   * Whether the subreddit is marked as NSFW (Not Safe For Work).
   */
  get nsfw() {
    return __classPrivateFieldGet32(this, _Subreddit_nsfw, "f");
  }
  /**
   * The settings of the subreddit.
   */
  get settings() {
    return __classPrivateFieldGet32(this, _Subreddit_settings, "f");
  }
  /**
   * Whether the user flairs are enabled for this subreddit.
   */
  get userFlairsEnabled() {
    return this.settings.userFlairs.enabled;
  }
  /**
   * Whether the post flairs are enabled for this subreddit.
   */
  get postFlairsEnabled() {
    return this.settings.postFlairs.enabled;
  }
  /**
   * Whether the user can assign user flairs.
   * This is only true if the user flairs are enabled.
   */
  get usersCanAssignUserFlairs() {
    return this.settings.userFlairs.usersCanAssign;
  }
  /**
   * Whether the user can assign post flairs.
   * This is only true if the post flairs are enabled.
   */
  get usersCanAssignPostFlairs() {
    return this.settings.postFlairs.usersCanAssign;
  }
  /**
   * Returns the HTTP URL for the subreddit.
   * (R2 bug: subreddit.url is a permalink path and does not return a fully qualified URL in subreddit.url)
   */
  get url() {
    return this.settings.url;
  }
  /**
   * Returns a permalink path
   * (R2 bug: subreddit.url is a permalink, and does not have a subreddit.permalink field)
   */
  get permalink() {
    return __classPrivateFieldGet32(this, _Subreddit_permalink, "f");
  }
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      createdAt: this.createdAt,
      type: this.type,
      title: this.title,
      description: this.description,
      language: this.language,
      nsfw: this.nsfw,
      numberOfSubscribers: this.numberOfSubscribers,
      numberOfActiveUsers: this.numberOfActiveUsers,
      settings: this.settings
    };
  }
  async submitPost(options) {
    const submitPostOptions = {
      ...options,
      subredditName: __classPrivateFieldGet32(this, _Subreddit_name, "f")
    };
    return Post.submit(submitPostOptions, __classPrivateFieldGet32(this, _Subreddit_metadata, "f"));
  }
  getControversialPosts(options = {}) {
    if (!__classPrivateFieldGet32(this, _Subreddit_name, "f")) {
      throw new Error("subreddit missing displayName - it might not have been fetched");
    }
    return Post.getControversialPosts({
      ...options,
      subredditName: __classPrivateFieldGet32(this, _Subreddit_name, "f")
    }, __classPrivateFieldGet32(this, _Subreddit_metadata, "f"));
  }
  getTopPosts(options = {}) {
    if (!__classPrivateFieldGet32(this, _Subreddit_name, "f")) {
      throw new Error("subreddit missing displayName - it might not have been fetched");
    }
    return Post.getTopPosts({
      ...options,
      subredditName: __classPrivateFieldGet32(this, _Subreddit_name, "f")
    }, __classPrivateFieldGet32(this, _Subreddit_metadata, "f"));
  }
  getApprovedUsers(options = {}) {
    return User.getSubredditUsersByType({
      type: "contributors",
      subredditName: __classPrivateFieldGet32(this, _Subreddit_name, "f"),
      ...options
    }, __classPrivateFieldGet32(this, _Subreddit_metadata, "f"));
  }
  approveUser(username) {
    return User.createRelationship({
      username,
      subredditName: __classPrivateFieldGet32(this, _Subreddit_name, "f"),
      type: "contributor"
    }, __classPrivateFieldGet32(this, _Subreddit_metadata, "f"));
  }
  removeUser(username) {
    return User.removeRelationship({
      username,
      subredditName: __classPrivateFieldGet32(this, _Subreddit_name, "f"),
      type: "contributor"
    }, __classPrivateFieldGet32(this, _Subreddit_metadata, "f"));
  }
  getWikiContributors(options = {}) {
    return User.getSubredditUsersByType({
      type: "wikicontributors",
      subredditName: __classPrivateFieldGet32(this, _Subreddit_name, "f"),
      ...options
    }, __classPrivateFieldGet32(this, _Subreddit_metadata, "f"));
  }
  addWikiContributor(username) {
    return User.createRelationship({
      username,
      subredditName: __classPrivateFieldGet32(this, _Subreddit_name, "f"),
      type: "wikicontributor"
    }, __classPrivateFieldGet32(this, _Subreddit_metadata, "f"));
  }
  removeWikiContributor(username) {
    return User.removeRelationship({
      username,
      subredditName: __classPrivateFieldGet32(this, _Subreddit_name, "f"),
      type: "wikicontributor"
    }, __classPrivateFieldGet32(this, _Subreddit_metadata, "f"));
  }
  getBannedUsers(options = {}) {
    return User.getSubredditUsersByType({
      type: "banned",
      subredditName: __classPrivateFieldGet32(this, _Subreddit_name, "f"),
      ...options
    }, __classPrivateFieldGet32(this, _Subreddit_metadata, "f"));
  }
  banUser(options) {
    return User.createRelationship({
      username: options.username,
      subredditName: __classPrivateFieldGet32(this, _Subreddit_name, "f"),
      type: "banned",
      banReason: options.reason,
      banMessage: options.message,
      note: options.note,
      duration: options.duration,
      banContext: options.context
    }, __classPrivateFieldGet32(this, _Subreddit_metadata, "f"));
  }
  unbanUser(username) {
    return User.removeRelationship({
      username,
      subredditName: __classPrivateFieldGet32(this, _Subreddit_name, "f"),
      type: "banned"
    }, __classPrivateFieldGet32(this, _Subreddit_metadata, "f"));
  }
  getBannedWikiContributors(options = {}) {
    return User.getSubredditUsersByType({
      type: "wikibanned",
      subredditName: __classPrivateFieldGet32(this, _Subreddit_name, "f"),
      ...options
    }, __classPrivateFieldGet32(this, _Subreddit_metadata, "f"));
  }
  banWikiContributor(options) {
    return User.createRelationship({
      username: options.username,
      subredditName: __classPrivateFieldGet32(this, _Subreddit_name, "f"),
      type: "wikibanned",
      banReason: options.reason,
      note: options.note,
      duration: options.duration
    }, __classPrivateFieldGet32(this, _Subreddit_metadata, "f"));
  }
  unbanWikiContributor(username) {
    return User.removeRelationship({
      username,
      subredditName: __classPrivateFieldGet32(this, _Subreddit_name, "f"),
      type: "wikibanned"
    }, __classPrivateFieldGet32(this, _Subreddit_metadata, "f"));
  }
  getModerators(options = {}) {
    return User.getSubredditUsersByType({
      type: "moderators",
      subredditName: __classPrivateFieldGet32(this, _Subreddit_name, "f"),
      ...options
    }, __classPrivateFieldGet32(this, _Subreddit_metadata, "f"));
  }
  inviteModerator(username, permissions) {
    return User.createRelationship({
      type: "moderator_invite",
      subredditName: __classPrivateFieldGet32(this, _Subreddit_name, "f"),
      username,
      permissions: permissions ?? []
    }, __classPrivateFieldGet32(this, _Subreddit_metadata, "f"));
  }
  revokeModeratorInvite(username) {
    return User.removeRelationship({
      username,
      subredditName: __classPrivateFieldGet32(this, _Subreddit_name, "f"),
      type: "moderator_invite"
    }, __classPrivateFieldGet32(this, _Subreddit_metadata, "f"));
  }
  removeModerator(username) {
    return User.removeRelationship({
      type: "moderator",
      subredditName: __classPrivateFieldGet32(this, _Subreddit_name, "f"),
      username
    }, __classPrivateFieldGet32(this, _Subreddit_metadata, "f"));
  }
  setModeratorPermissions(username, permissions) {
    return User.setModeratorPermissions(username, __classPrivateFieldGet32(this, _Subreddit_name, "f"), permissions, __classPrivateFieldGet32(this, _Subreddit_metadata, "f"));
  }
  getMutedUsers(options = {}) {
    return User.getSubredditUsersByType({
      type: "muted",
      subredditName: __classPrivateFieldGet32(this, _Subreddit_name, "f"),
      ...options
    }, __classPrivateFieldGet32(this, _Subreddit_metadata, "f"));
  }
  muteUser(username, note) {
    return User.createRelationship({
      username,
      subredditName: __classPrivateFieldGet32(this, _Subreddit_name, "f"),
      type: "muted",
      note
    }, __classPrivateFieldGet32(this, _Subreddit_metadata, "f"));
  }
  unmuteUser(username) {
    return User.removeRelationship({
      username,
      subredditName: __classPrivateFieldGet32(this, _Subreddit_name, "f"),
      type: "muted"
    }, __classPrivateFieldGet32(this, _Subreddit_metadata, "f"));
  }
  getModerationLog(options) {
    return getModerationLog({
      subredditName: __classPrivateFieldGet32(this, _Subreddit_name, "f"),
      ...options
    }, __classPrivateFieldGet32(this, _Subreddit_metadata, "f"));
  }
  getUserFlairTemplates() {
    return FlairTemplate.getUserFlairTemplates(__classPrivateFieldGet32(this, _Subreddit_name, "f"), __classPrivateFieldGet32(this, _Subreddit_metadata, "f"));
  }
  getPostFlairTemplates() {
    return FlairTemplate.getPostFlairTemplates(__classPrivateFieldGet32(this, _Subreddit_name, "f"), __classPrivateFieldGet32(this, _Subreddit_metadata, "f"));
  }
  createPostFlairTemplate(options) {
    return FlairTemplate.createPostFlairTemplate({
      subredditName: __classPrivateFieldGet32(this, _Subreddit_name, "f"),
      ...options
    }, __classPrivateFieldGet32(this, _Subreddit_metadata, "f"));
  }
  createUserFlairTemplate(options) {
    return FlairTemplate.createUserFlairTemplate({
      subredditName: __classPrivateFieldGet32(this, _Subreddit_name, "f"),
      ...options
    }, __classPrivateFieldGet32(this, _Subreddit_metadata, "f"));
  }
  /**
   * Get the user flair for the given subreddit. If `usernames` is provided then it will return only the
   * flair for the specified users. If retrieving the list of flair for a given subreddit and the list is long
   * then this method will return a `next` field which can be passed into the `after` field on the next call to
   * retrieve the next slice of data. To retrieve the previous slice of data pass the `prev` field into the `before` field
   * during the subsequent call.
   *
   * @param options See interface
   * @param metadata See interface
   *
   * @example
   * ```ts
   * const subredditName = "mysubreddit"
   * const subreddit = await reddit.getSubredditByName(subredditName)
   * const response = await subreddit.getUserFlair();
   * const userFlairList = response.users
   * ```
   * @example
   * ```ts
   * const response = await subreddit.getUserFlair({ after: "t2_awefae"});
   * const userFlairList = response.users
   * ```
   *
   * @example
   * ```ts
   * const response = await subreddit.getUserFlair({ usernames: ['toxictoad', 'badapple']});
   * const userFlairList = response.users
   * ```
   */
  async getUserFlair(options) {
    if (options?.usernames !== void 0) {
      const users = await Promise.all(options.usernames.map(async (name) => {
        const response = await Flair.getUserFlairBySubreddit({
          subreddit: __classPrivateFieldGet32(this, _Subreddit_name, "f"),
          name
        }, __classPrivateFieldGet32(this, _Subreddit_metadata, "f"));
        return convertUserFlairProtoToAPI(response.users[0]);
      }));
      return { users };
    } else {
      const response = await Flair.getUserFlairBySubreddit({
        ...options,
        subreddit: __classPrivateFieldGet32(this, _Subreddit_name, "f")
      }, __classPrivateFieldGet32(this, _Subreddit_metadata, "f"));
      return {
        next: response.next,
        prev: response.prev,
        users: response.users.map((userFlair) => convertUserFlairProtoToAPI(userFlair))
      };
    }
  }
  getModQueue(options = { type: "all" }) {
    return _Subreddit.aboutLocation({
      ...options,
      location: AboutLocations.Modqueue,
      subreddit: __classPrivateFieldGet32(this, _Subreddit_name, "f")
    }, __classPrivateFieldGet32(this, _Subreddit_metadata, "f"));
  }
  getReports(options = { type: "all" }) {
    return _Subreddit.aboutLocation({
      ...options,
      location: AboutLocations.Reports,
      subreddit: __classPrivateFieldGet32(this, _Subreddit_name, "f")
    }, __classPrivateFieldGet32(this, _Subreddit_metadata, "f"));
  }
  getSpam(options = { type: "all" }) {
    return _Subreddit.aboutLocation({
      ...options,
      location: AboutLocations.Spam,
      subreddit: __classPrivateFieldGet32(this, _Subreddit_name, "f")
    }, __classPrivateFieldGet32(this, _Subreddit_metadata, "f"));
  }
  getUnmoderated(options = { type: "all" }) {
    return _Subreddit.aboutLocation({
      ...options,
      location: AboutLocations.Unmoderated,
      subreddit: __classPrivateFieldGet32(this, _Subreddit_name, "f")
    }, __classPrivateFieldGet32(this, _Subreddit_metadata, "f"));
  }
  getEdited(options = { type: "all" }) {
    return _Subreddit.aboutLocation({
      ...options,
      location: AboutLocations.Edited,
      subreddit: __classPrivateFieldGet32(this, _Subreddit_name, "f")
    }, __classPrivateFieldGet32(this, _Subreddit_metadata, "f"));
  }
  /** @internal */
  static aboutLocation(options, metadata) {
    const client = Devvit.redditAPIPlugins.Moderation;
    let only;
    switch (options.type) {
      case "post":
        only = "links";
        break;
      case "comment":
        only = "comments";
        break;
      default:
        only = void 0;
    }
    return new Listing({
      ...options,
      fetch: async (fetchOptions) => {
        const listing = await client.AboutLocation({
          ...fetchOptions,
          ...options,
          only
        }, metadata);
        return parseListing(listing, metadata);
      }
    });
  }
  /**
   * Return a listing of things specified by their fullnames.
   *
   * @param ids Array of thing full ids (e.g. t3_abc123)
   * @example
   * ```ts
   * const subreddit = await reddit.getSubredditByName('askReddit');
   * const listing = subreddit.getCommentsAndPostsByIds(['t3_abc123', 't1_xyz123']);
   * const items = await listing.all();
   * console.log(items) // [Post, Comment]
   * ```
   */
  getCommentsAndPostsByIds(ids) {
    const client = Devvit.redditAPIPlugins.LinksAndComments;
    return new Listing({
      fetch: async () => {
        const listing = await client.Info({ thingIds: ids, subreddits: [__classPrivateFieldGet32(this, _Subreddit_id, "f")] }, __classPrivateFieldGet32(this, _Subreddit_metadata, "f"));
        return parseListing(listing, __classPrivateFieldGet32(this, _Subreddit_metadata, "f"));
      }
    });
  }
  /** @internal */
  static async addRemovalReason(subredditName, title, message, metadata) {
    const client = Devvit.redditAPIPlugins.Subreddits;
    const response = await client.SubredditAddRemovalReason({
      title,
      message,
      subreddit: subredditName
    }, metadata);
    return response.id;
  }
  /** @internal */
  static async getRemovalReasons(subredditName, metadata) {
    const client = Devvit.redditAPIPlugins.Subreddits;
    const result = await client.SubredditGetRemovalReasons({
      subreddit: subredditName
    }, metadata);
    return result.order.map((id) => ({ ...result.data[id] }));
  }
  /** @internal */
  static async getFromMetadata(metadata) {
    assertNonNull(metadata);
    const subredditName = metadata?.[Header.SubredditName]?.values[0];
    if (subredditName) {
      return _Subreddit.getByName(subredditName, metadata);
    }
    const subredditId = metadata?.[Header.Subreddit]?.values[0];
    assertNonNull(subredditId);
    return _Subreddit.getById(asT5ID(subredditId), metadata);
  }
  /** @internal */
  static async getById(id, metadata) {
    const subredditName = await getSubredditNameById(id, metadata);
    if (!subredditName) {
      return;
    }
    return _Subreddit.getByName(subredditName, metadata);
  }
  /** @internal */
  static async getByName(subredditName, metadata) {
    const client = Devvit.redditAPIPlugins.Subreddits;
    const response = await client.SubredditAbout({
      subreddit: subredditName
    }, metadata);
    if (!response?.data) {
      throw new Error("not found");
    }
    return new _Subreddit(response.data, metadata);
  }
};
_Subreddit_id = /* @__PURE__ */ new WeakMap(), _Subreddit_name = /* @__PURE__ */ new WeakMap(), _Subreddit_createdAt = /* @__PURE__ */ new WeakMap(), _Subreddit_type = /* @__PURE__ */ new WeakMap(), _Subreddit_title = /* @__PURE__ */ new WeakMap(), _Subreddit_description = /* @__PURE__ */ new WeakMap(), _Subreddit_language = /* @__PURE__ */ new WeakMap(), _Subreddit_numberOfSubscribers = /* @__PURE__ */ new WeakMap(), _Subreddit_numberOfActiveUsers = /* @__PURE__ */ new WeakMap(), _Subreddit_nsfw = /* @__PURE__ */ new WeakMap(), _Subreddit_settings = /* @__PURE__ */ new WeakMap(), _Subreddit_permalink = /* @__PURE__ */ new WeakMap(), _Subreddit_metadata = /* @__PURE__ */ new WeakMap();
async function getSubredditInfoById(subredditId, metadata) {
  const operationName = "GetSubredditInfoById";
  const persistedQueryHash = "315a9b75c22a017d526afdf2d274616946156451aacfd56dfb91e7ad3f7a2fde";
  const response = await GraphQL.query(operationName, persistedQueryHash, { id: subredditId }, metadata);
  const subredditInfo = response.data?.subredditInfoById;
  if (!subredditInfo)
    throw new Error("subreddit info not found");
  return subredditInfo;
}
async function getSubredditInfoByName(subredditName, metadata) {
  const operationName = "GetSubredditInfoByName";
  const persistedQueryHash = "4aa69726c7e3f5d33ab2bee22b3d74fce645824fddd5ea3ec6dfe30bdb4295cb";
  const response = await GraphQL.query(operationName, persistedQueryHash, { name: subredditName }, metadata);
  const subredditInfo = response.data?.subredditInfoByName;
  if (!subredditInfo)
    throw new Error("subreddit info not found");
  return subredditInfo;
}
async function getSubredditLeaderboard(subredditId, metadata) {
  const operationName = "GetSubredditLeaderboard";
  const persistedQueryHash = "18ead70c46b6446d45ecd8b679b16d9a929a933d6ef25d8262a459cb18b72848";
  const response = await GraphQL.query(operationName, persistedQueryHash, { id: subredditId }, metadata);
  const leaderboard = response.data?.subredditInfoById?.leaderboard;
  if (!leaderboard)
    throw new Error("subreddit leaderboard not found");
  if (!leaderboard.summary)
    throw new Error("subreddit leaderboard summary not found");
  return {
    id: leaderboard.id,
    summary: leaderboard.summary
  };
}
async function getSubredditStyles(subredditId, metadata) {
  const operationName = "GetSubredditStyles";
  const persistedQueryHash = "d491d17ea8858f563ea578b26b9595d64adecf4bf34557d567c7e53c470f5f22";
  const response = await GraphQL.query(operationName, persistedQueryHash, { id: subredditId }, metadata);
  const styles = response.data?.subredditInfoById?.styles;
  if (!styles)
    throw new Error("subreddit styles not found");
  return styles;
}
function asSubredditType(type) {
  if (type === "public" || type === "private" || type === "restricted" || type === "employees_only" || type === "gold_only" || type === "gold_restricted" || type === "archived" || type === "user") {
    return type;
  }
  throw new Error(`invalid subreddit type: ${type}`);
}
function asAllowedPostType(type) {
  if (type === "any" || type === "link" || type === "self") {
    return type;
  }
  throw new Error(`invalid allowed post type: ${type}`);
}
function asCommentMediaTypes(type) {
  if (type === "animated" || type === "giphy" || type === "static" || type === "expression") {
    return type;
  }
  throw new Error(`invalid comment media type: ${type}`);
}
function parseListing(listing, metadata) {
  const children = listing.data?.children ?? [];
  const postsAndComments = children.map((child) => {
    const post = tryParseAsPost(child);
    if (post != null) {
      return post;
    }
    const comment = tryParseAsComment(child);
    if (comment != null) {
      return comment;
    }
    return null;
  }).filter(Boolean);
  return {
    after: listing.data?.after,
    before: listing.data?.before,
    children: postsAndComments
  };
  function tryParseAsPost(obj) {
    try {
      return new Post(obj.data, metadata);
    } catch {
      return null;
    }
  }
  function tryParseAsComment(obj) {
    try {
      return new Comment(obj.data, metadata);
    } catch {
      return null;
    }
  }
}
async function getSubredditNameById(id, metadata) {
  const client = Devvit.redditAPIPlugins.LinksAndComments;
  const response = await client.Info({ thingIds: [id], subreddits: [] }, metadata);
  return response.data?.children[0]?.data?.displayName;
}

// node_modules/@devvit/public-api/apis/reddit/models/Vault.js
async function getVaultByAddress(address, metadata) {
  return getVaultByParams("GetVaultContactByAddress", "3e2f7966a5c120e64fd2795d06a46595c52d988185be98d3ed71c3f81ae80d2e", {
    provider: "ethereum",
    // Only one supported at the moment
    address
  }, metadata);
}
async function getVaultByUserId(userId, metadata) {
  return getVaultByParams("GetVaultContactByUserId", "a854ddc19d0e22c4f36ed917fdbd568f299f3571427e393aee5e2972080fffe9", {
    provider: "ethereum",
    // Only one supported at the moment
    userId
  }, metadata);
}
async function getVaultByParams(operationName, queryHash, params, metadata) {
  const response = await GraphQL.query(operationName, queryHash, params, metadata);
  const contact = response?.data?.vault?.contact;
  const vault = {
    provider: contact?.provider,
    userId: asT2ID(contact?.userId),
    address: contact?.address,
    createdAt: contact?.createdAt,
    isActive: contact?.isActive
  };
  return vault;
}

// node_modules/@devvit/public-api/apis/reddit/models/Widget.js
var import_protos31 = require("@devvit/protos");
var __classPrivateFieldSet32 = function(receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet33 = function(receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Widget_id;
var _Widget_name;
var _Widget_subredditName;
var _Widget_metadata;
var _ImageWidget_images;
var _CalendarWidget_googleCalendarId;
var _CalendarWidget_configuration;
var _CalendarWidget_styles;
var _TextAreaWidget_text;
var _TextAreaWidget_styles;
var _ButtonWidget_buttons;
var _ButtonWidget_description;
var _ButtonWidget_styles;
var _CommunityListWidget_communities;
var _CommunityListWidget_styles;
var _PostFlairWidget_styles;
var _PostFlairWidget_templates;
var _PostFlairWidget_display;
var _CustomWidget_images;
var _CustomWidget_text;
var _CustomWidget_stylesheetUrl;
var _CustomWidget_height;
var _CustomWidget_css;
var _SubredditRulesWidget_rules;
var Widget = class _Widget {
  constructor(widgetData, subredditName, metadata) {
    _Widget_id.set(this, void 0);
    _Widget_name.set(this, void 0);
    _Widget_subredditName.set(this, void 0);
    _Widget_metadata.set(this, void 0);
    makeGettersEnumerable(this);
    __classPrivateFieldSet32(this, _Widget_id, widgetData.id, "f");
    __classPrivateFieldSet32(this, _Widget_name, widgetData.shortName, "f");
    __classPrivateFieldSet32(this, _Widget_subredditName, subredditName, "f");
    __classPrivateFieldSet32(this, _Widget_metadata, metadata, "f");
  }
  get id() {
    return __classPrivateFieldGet33(this, _Widget_id, "f");
  }
  get name() {
    return __classPrivateFieldGet33(this, _Widget_name, "f");
  }
  get subredditName() {
    return __classPrivateFieldGet33(this, _Widget_subredditName, "f");
  }
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      subredditName: this.subredditName
    };
  }
  delete() {
    return _Widget.delete(this.subredditName, this.id, __classPrivateFieldGet33(this, _Widget_metadata, "f"));
  }
  /**
   * @internal
   * @note - This method only returns the widgets listed on the sidebar.
   */
  static async getWidgets(subredditName, metadata) {
    const client = Devvit.redditAPIPlugins.Widgets;
    const response = await client.GetWidgets({
      subreddit: subredditName
    }, metadata);
    assertNonNull(response.layout, "Failed to load widgets for subreddit");
    const widgetsMap = response.items;
    const widgets = [];
    for (const widgetId of response.layout.sidebar?.order ?? []) {
      const widgetData = widgetsMap[widgetId];
      switch (widgetData?.kind) {
        case "image":
          widgets.push(new ImageWidget(widgetData, subredditName, metadata));
          break;
        case "calendar":
          widgets.push(new CalendarWidget(widgetData, subredditName, metadata));
          break;
        case "textarea":
          widgets.push(new TextAreaWidget(widgetData, subredditName, metadata));
          break;
        case "button":
          widgets.push(new ButtonWidget(widgetData, subredditName, metadata));
          break;
        case "community-list":
          widgets.push(new CommunityListWidget(widgetData, subredditName, metadata));
          break;
        case "post-flair":
          widgets.push(new PostFlairWidget(widgetData, subredditName, metadata));
          break;
        case "custom":
          widgets.push(new CustomWidget(widgetData, subredditName, metadata));
          break;
        case "subreddit-rules": {
          const rulesRsp = await Devvit.redditAPIPlugins.Subreddits.SubredditAboutRules({
            subreddit: subredditName
          }, metadata);
          widgets.push(new SubredditRulesWidget(rulesRsp, widgetData, subredditName, metadata));
          break;
        }
        default:
          throw new Error(`Unknown widget type: ${widgetData.kind}`);
      }
    }
    return widgets;
  }
  /** @internal */
  static async delete(subredditName, id, metadata) {
    const client = Devvit.redditAPIPlugins.Widgets;
    await client.DeleteWidget({
      subreddit: subredditName,
      id
    }, metadata);
  }
  /** @internal */
  static async reorder(subredditName, orderByIds, metadata) {
    const client = Devvit.redditAPIPlugins.Widgets;
    await client.OrderWidgets({
      subreddit: subredditName,
      order: orderByIds
    }, metadata);
  }
  /** @internal */
  static async add(widgetData, metadata) {
    switch (widgetData?.type) {
      case "image":
        return ImageWidget.create(widgetData, metadata);
      case "calendar":
        return CalendarWidget.create(widgetData, metadata);
      case "textarea":
        return TextAreaWidget.create(widgetData, metadata);
      case "button":
        return ButtonWidget.create(widgetData, metadata);
      case "community-list":
        return CommunityListWidget.create(widgetData, metadata);
      case "post-flair":
        return PostFlairWidget.create(widgetData, metadata);
      case "custom":
        return CustomWidget.create(widgetData, metadata);
      default:
        throw new Error("Unknown widget type");
    }
  }
};
_Widget_id = /* @__PURE__ */ new WeakMap(), _Widget_name = /* @__PURE__ */ new WeakMap(), _Widget_subredditName = /* @__PURE__ */ new WeakMap(), _Widget_metadata = /* @__PURE__ */ new WeakMap();
var ImageWidget = class _ImageWidget extends Widget {
  constructor(widgetData, subredditName, metadata) {
    super(widgetData, subredditName, metadata);
    _ImageWidget_images.set(this, void 0);
    __classPrivateFieldSet32(this, _ImageWidget_images, widgetData.data.map((data) => {
      assertNonNull(data.url, "Image widget data is missing url");
      assertNonNull(data.height, "Image widget data is missing height");
      assertNonNull(data.width, "Image widget data is missing width");
      assertNonNull(data.linkUrl, "Image widget data is missing linkUrl");
      return {
        url: data.url,
        height: data.height,
        width: data.width,
        linkUrl: data.linkUrl
      };
    }), "f");
  }
  get images() {
    return __classPrivateFieldGet33(this, _ImageWidget_images, "f");
  }
  toJSON() {
    return {
      ...super.toJSON(),
      images: this.images
    };
  }
  /** @internal */
  static async create(options, metadata) {
    const client = Devvit.redditAPIPlugins.Widgets;
    const response = await client.AddImageWidget(options, metadata);
    return new _ImageWidget(import_protos31.GetWidgetsResponse_WidgetItem.fromJSON(response), options.subreddit, metadata);
  }
  /** @internal */
  static async update(options, metadata) {
    const client = Devvit.redditAPIPlugins.Widgets;
    const response = await client.UpdateImageWidget(options, metadata);
    return new _ImageWidget(import_protos31.GetWidgetsResponse_WidgetItem.fromJSON(response), options.subreddit, metadata);
  }
};
_ImageWidget_images = /* @__PURE__ */ new WeakMap();
var CalendarWidget = class _CalendarWidget extends Widget {
  constructor(widgetData, subredditName, metadata) {
    super(widgetData, subredditName, metadata);
    _CalendarWidget_googleCalendarId.set(this, void 0);
    _CalendarWidget_configuration.set(this, void 0);
    _CalendarWidget_styles.set(this, void 0);
    assertNonNull(widgetData.googleCalendarId, "Calendar widget data is missing googleCalendarId");
    assertNonNull(widgetData.configuration, "Calendar widget data is missing configuration");
    assertNonNull(widgetData.styles, "Calendar widget data is missing styles");
    __classPrivateFieldSet32(this, _CalendarWidget_googleCalendarId, widgetData.googleCalendarId, "f");
    __classPrivateFieldSet32(this, _CalendarWidget_configuration, widgetData.configuration, "f");
    __classPrivateFieldSet32(this, _CalendarWidget_styles, widgetData.styles, "f");
  }
  get googleCalendarId() {
    return __classPrivateFieldGet33(this, _CalendarWidget_googleCalendarId, "f");
  }
  get configuration() {
    return __classPrivateFieldGet33(this, _CalendarWidget_configuration, "f");
  }
  get styles() {
    return __classPrivateFieldGet33(this, _CalendarWidget_styles, "f");
  }
  toJSON() {
    return {
      ...super.toJSON(),
      googleCalendarId: this.googleCalendarId,
      configuration: this.configuration,
      styles: this.styles
    };
  }
  /** @internal */
  static async create(options, metadata) {
    const client = Devvit.redditAPIPlugins.Widgets;
    const response = await client.AddCalendarWidget(options, metadata);
    return new _CalendarWidget(import_protos31.GetWidgetsResponse_WidgetItem.fromJSON(response), options.subreddit, metadata);
  }
  /** @internal */
  static async update(options, metadata) {
    const client = Devvit.redditAPIPlugins.Widgets;
    const response = await client.UpdateCalendarWidget(options, metadata);
    return new _CalendarWidget(import_protos31.GetWidgetsResponse_WidgetItem.fromJSON(response), options.subreddit, metadata);
  }
};
_CalendarWidget_googleCalendarId = /* @__PURE__ */ new WeakMap(), _CalendarWidget_configuration = /* @__PURE__ */ new WeakMap(), _CalendarWidget_styles = /* @__PURE__ */ new WeakMap();
var TextAreaWidget = class _TextAreaWidget extends Widget {
  constructor(widgetData, subredditName, metadata) {
    super(widgetData, subredditName, metadata);
    _TextAreaWidget_text.set(this, void 0);
    _TextAreaWidget_styles.set(this, void 0);
    assertNonNull(widgetData.text, "Textarea widget data is missing text");
    assertNonNull(widgetData.styles, "Textarea widget data is missing styles");
    __classPrivateFieldSet32(this, _TextAreaWidget_text, widgetData.text, "f");
    __classPrivateFieldSet32(this, _TextAreaWidget_styles, widgetData.styles, "f");
  }
  get text() {
    return __classPrivateFieldGet33(this, _TextAreaWidget_text, "f");
  }
  get styles() {
    return __classPrivateFieldGet33(this, _TextAreaWidget_styles, "f");
  }
  toJSON() {
    return {
      ...super.toJSON(),
      text: this.text,
      styles: this.styles
    };
  }
  /** @internal */
  static async create(options, metadata) {
    const client = Devvit.redditAPIPlugins.Widgets;
    const response = await client.AddTextAreaWidget(options, metadata);
    return new _TextAreaWidget(import_protos31.GetWidgetsResponse_WidgetItem.fromJSON(response), options.subreddit, metadata);
  }
  /** @internal */
  static async update(options, metadata) {
    const client = Devvit.redditAPIPlugins.Widgets;
    const response = await client.UpdateTextAreaWidget(options, metadata);
    return new _TextAreaWidget(import_protos31.GetWidgetsResponse_WidgetItem.fromJSON(response), options.subreddit, metadata);
  }
};
_TextAreaWidget_text = /* @__PURE__ */ new WeakMap(), _TextAreaWidget_styles = /* @__PURE__ */ new WeakMap();
var ButtonWidget = class _ButtonWidget extends Widget {
  constructor(widgetData, subredditName, metadata) {
    super(widgetData, subredditName, metadata);
    _ButtonWidget_buttons.set(this, void 0);
    _ButtonWidget_description.set(this, void 0);
    _ButtonWidget_styles.set(this, void 0);
    assertNonNull(widgetData.styles, "Button widget data is missing styles");
    __classPrivateFieldSet32(this, _ButtonWidget_buttons, widgetData.buttons, "f");
    __classPrivateFieldSet32(this, _ButtonWidget_description, widgetData.description ?? "", "f");
    __classPrivateFieldSet32(this, _ButtonWidget_styles, widgetData.styles, "f");
  }
  get buttons() {
    return __classPrivateFieldGet33(this, _ButtonWidget_buttons, "f");
  }
  get description() {
    return __classPrivateFieldGet33(this, _ButtonWidget_description, "f");
  }
  get styles() {
    return __classPrivateFieldGet33(this, _ButtonWidget_styles, "f");
  }
  toJSON() {
    return {
      ...super.toJSON(),
      buttons: this.buttons,
      description: this.description,
      styles: this.styles
    };
  }
  /** @internal */
  static async create(options, metadata) {
    const client = Devvit.redditAPIPlugins.Widgets;
    const response = await client.AddButtonWidget(options, metadata);
    return new _ButtonWidget(import_protos31.GetWidgetsResponse_WidgetItem.fromJSON(response), options.subreddit, metadata);
  }
  /** @internal */
  static async update(options, metadata) {
    const client = Devvit.redditAPIPlugins.Widgets;
    const response = await client.UpdateButtonWidget(options, metadata);
    return new _ButtonWidget(import_protos31.GetWidgetsResponse_WidgetItem.fromJSON(response), options.subreddit, metadata);
  }
};
_ButtonWidget_buttons = /* @__PURE__ */ new WeakMap(), _ButtonWidget_description = /* @__PURE__ */ new WeakMap(), _ButtonWidget_styles = /* @__PURE__ */ new WeakMap();
var CommunityListWidget = class _CommunityListWidget extends Widget {
  constructor(widgetData, subredditName, metadata) {
    super(widgetData, subredditName, metadata);
    _CommunityListWidget_communities.set(this, void 0);
    _CommunityListWidget_styles.set(this, void 0);
    __classPrivateFieldSet32(this, _CommunityListWidget_communities, widgetData.data.map((communityData) => import_protos31.CommunityListWidget_CommunityData.fromJSON(communityData)), "f");
    assertNonNull(widgetData.styles, "Community list widget data is missing styles");
    __classPrivateFieldSet32(this, _CommunityListWidget_styles, widgetData.styles, "f");
  }
  get communities() {
    return __classPrivateFieldGet33(this, _CommunityListWidget_communities, "f");
  }
  get styles() {
    return __classPrivateFieldGet33(this, _CommunityListWidget_styles, "f");
  }
  toJSON() {
    return {
      ...super.toJSON(),
      communities: this.communities,
      styles: this.styles
    };
  }
  /** @internal */
  static async create(options, metadata) {
    const client = Devvit.redditAPIPlugins.Widgets;
    const response = await client.AddCommunityListWidget(options, metadata);
    return new _CommunityListWidget(import_protos31.GetWidgetsResponse_WidgetItem.fromJSON(response), options.subreddit, metadata);
  }
  /** @internal */
  static async update(options, metadata) {
    const client = Devvit.redditAPIPlugins.Widgets;
    const response = await client.UpdateCommunityListWidget(options, metadata);
    return new _CommunityListWidget(import_protos31.GetWidgetsResponse_WidgetItem.fromJSON(response), options.subreddit, metadata);
  }
};
_CommunityListWidget_communities = /* @__PURE__ */ new WeakMap(), _CommunityListWidget_styles = /* @__PURE__ */ new WeakMap();
var PostFlairWidget = class _PostFlairWidget extends Widget {
  constructor(widgetData, subredditName, metadata) {
    super(widgetData, subredditName, metadata);
    _PostFlairWidget_styles.set(this, void 0);
    _PostFlairWidget_templates.set(this, void 0);
    _PostFlairWidget_display.set(this, void 0);
    assertNonNull(widgetData.styles, "Post flair widget data is missing styles");
    __classPrivateFieldSet32(this, _PostFlairWidget_styles, widgetData.styles, "f");
    __classPrivateFieldSet32(this, _PostFlairWidget_templates, widgetData.order.map((templateId) => widgetData.templates[templateId]), "f");
    if (!(widgetData.display && widgetData.display === "list" || widgetData.display === "cloud")) {
      throw new Error("Post flair widget data is missing display type");
    }
    __classPrivateFieldSet32(this, _PostFlairWidget_display, widgetData.display, "f");
  }
  get styles() {
    return __classPrivateFieldGet33(this, _PostFlairWidget_styles, "f");
  }
  get templates() {
    return __classPrivateFieldGet33(this, _PostFlairWidget_templates, "f");
  }
  get display() {
    return __classPrivateFieldGet33(this, _PostFlairWidget_display, "f");
  }
  toJSON() {
    return {
      ...super.toJSON(),
      styles: this.styles,
      templates: this.templates,
      display: this.display
    };
  }
  /** @internal */
  static async create(options, metadata) {
    const client = Devvit.redditAPIPlugins.Widgets;
    const response = await client.AddPostFlairWidget(options, metadata);
    return new _PostFlairWidget(import_protos31.GetWidgetsResponse_WidgetItem.fromJSON(response), options.subreddit, metadata);
  }
  /** @internal */
  static async update(options, metadata) {
    const client = Devvit.redditAPIPlugins.Widgets;
    const response = await client.UpdatePostFlairWidget(options, metadata);
    return new _PostFlairWidget(import_protos31.GetWidgetsResponse_WidgetItem.fromJSON(response), options.subreddit, metadata);
  }
};
_PostFlairWidget_styles = /* @__PURE__ */ new WeakMap(), _PostFlairWidget_templates = /* @__PURE__ */ new WeakMap(), _PostFlairWidget_display = /* @__PURE__ */ new WeakMap();
var CustomWidget = class _CustomWidget extends Widget {
  constructor(widgetData, subredditName, metadata) {
    super(widgetData, subredditName, metadata);
    _CustomWidget_images.set(this, void 0);
    _CustomWidget_text.set(this, void 0);
    _CustomWidget_stylesheetUrl.set(this, void 0);
    _CustomWidget_height.set(this, void 0);
    _CustomWidget_css.set(this, void 0);
    assertNonNull(widgetData.stylesheetUrl, "Custom widget data is missing stylesheetUrl");
    assertNonNull(widgetData.height, "Custom widget data is missing height");
    assertNonNull(widgetData.css, "Custom widget data is missing css");
    __classPrivateFieldSet32(this, _CustomWidget_images, widgetData.imageData ?? [], "f");
    __classPrivateFieldSet32(this, _CustomWidget_text, widgetData.text ?? "", "f");
    __classPrivateFieldSet32(this, _CustomWidget_stylesheetUrl, widgetData.stylesheetUrl, "f");
    __classPrivateFieldSet32(this, _CustomWidget_height, widgetData.height, "f");
    __classPrivateFieldSet32(this, _CustomWidget_css, widgetData.css, "f");
  }
  get images() {
    return __classPrivateFieldGet33(this, _CustomWidget_images, "f");
  }
  get text() {
    return __classPrivateFieldGet33(this, _CustomWidget_text, "f");
  }
  get stylesheetUrl() {
    return __classPrivateFieldGet33(this, _CustomWidget_stylesheetUrl, "f");
  }
  get height() {
    return __classPrivateFieldGet33(this, _CustomWidget_height, "f");
  }
  get css() {
    return __classPrivateFieldGet33(this, _CustomWidget_css, "f");
  }
  toJSON() {
    return {
      ...super.toJSON(),
      images: this.images,
      text: this.text,
      stylesheetUrl: this.stylesheetUrl,
      height: this.height,
      css: this.css
    };
  }
  /** @internal */
  static async create(options, metadata) {
    const client = Devvit.redditAPIPlugins.Widgets;
    const response = await client.AddCustomWidget(options, metadata);
    return new _CustomWidget(import_protos31.GetWidgetsResponse_WidgetItem.fromJSON(response), options.subreddit, metadata);
  }
  /** @internal */
  static async update(options, metadata) {
    const client = Devvit.redditAPIPlugins.Widgets;
    const response = await client.UpdateCustomWidget(options, metadata);
    return new _CustomWidget(import_protos31.GetWidgetsResponse_WidgetItem.fromJSON(response), options.subreddit, metadata);
  }
};
_CustomWidget_images = /* @__PURE__ */ new WeakMap(), _CustomWidget_text = /* @__PURE__ */ new WeakMap(), _CustomWidget_stylesheetUrl = /* @__PURE__ */ new WeakMap(), _CustomWidget_height = /* @__PURE__ */ new WeakMap(), _CustomWidget_css = /* @__PURE__ */ new WeakMap();
var SubredditRulesWidget = class extends Widget {
  constructor(subredditAboutRulesRsp, widgetData, subredditName, metadata) {
    super(widgetData, subredditName, metadata);
    _SubredditRulesWidget_rules.set(this, void 0);
    const rules = subredditAboutRulesRsp.rules.map(({ description, priority, shortName, violationReason }) => {
      assertNonNull(description, "Subreddit rule is missing description");
      assertNonNull(priority, "Subreddit rule is missing priority");
      assertNonNull(shortName, "Subreddit rule is missing shortName");
      assertNonNull(violationReason, "Subreddit rule is missing violationReason");
      return {
        description,
        priority,
        shortName,
        violationReason
      };
    });
    __classPrivateFieldSet32(this, _SubredditRulesWidget_rules, rules, "f");
  }
  get rules() {
    return __classPrivateFieldGet33(this, _SubredditRulesWidget_rules, "f");
  }
  toJSON() {
    return {
      ...super.toJSON(),
      rules: this.rules
    };
  }
};
_SubredditRulesWidget_rules = /* @__PURE__ */ new WeakMap();

// node_modules/@devvit/public-api/apis/reddit/models/WikiPage.js
var __classPrivateFieldSet33 = function(receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet34 = function(receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _WikiPage_name;
var _WikiPage_subredditName;
var _WikiPage_content;
var _WikiPage_contentHtml;
var _WikiPage_revisionId;
var _WikiPage_revisionDate;
var _WikiPage_revisionReason;
var _WikiPage_revisionAuthor;
var _WikiPage_metadata;
var _WikiPageRevision_id;
var _WikiPageRevision_page;
var _WikiPageRevision_date;
var _WikiPageRevision_author;
var _WikiPageRevision_reason;
var _WikiPageRevision_hidden;
var _WikiPageSettings_listed;
var _WikiPageSettings_permLevel;
var _WikiPageSettings_editors;
var WikiPagePermissionLevel;
(function(WikiPagePermissionLevel2) {
  WikiPagePermissionLevel2[WikiPagePermissionLevel2["SUBREDDIT_PERMISSIONS"] = 0] = "SUBREDDIT_PERMISSIONS";
  WikiPagePermissionLevel2[WikiPagePermissionLevel2["APPROVED_CONTRIBUTORS_ONLY"] = 1] = "APPROVED_CONTRIBUTORS_ONLY";
  WikiPagePermissionLevel2[WikiPagePermissionLevel2["MODS_ONLY"] = 2] = "MODS_ONLY";
})(WikiPagePermissionLevel || (WikiPagePermissionLevel = {}));
var WikiPage = class _WikiPage {
  /**
   * @internal
   */
  constructor(name, subredditName, data, metadata) {
    _WikiPage_name.set(this, void 0);
    _WikiPage_subredditName.set(this, void 0);
    _WikiPage_content.set(this, void 0);
    _WikiPage_contentHtml.set(this, void 0);
    _WikiPage_revisionId.set(this, void 0);
    _WikiPage_revisionDate.set(this, void 0);
    _WikiPage_revisionReason.set(this, void 0);
    _WikiPage_revisionAuthor.set(this, void 0);
    _WikiPage_metadata.set(this, void 0);
    makeGettersEnumerable(this);
    __classPrivateFieldSet33(this, _WikiPage_name, name, "f");
    __classPrivateFieldSet33(this, _WikiPage_subredditName, subredditName, "f");
    __classPrivateFieldSet33(this, _WikiPage_content, data.contentMd, "f");
    __classPrivateFieldSet33(this, _WikiPage_contentHtml, data.contentHtml, "f");
    __classPrivateFieldSet33(this, _WikiPage_revisionId, data.revisionId, "f");
    __classPrivateFieldSet33(this, _WikiPage_revisionDate, new Date(data.revisionDate * 1e3), "f");
    __classPrivateFieldSet33(this, _WikiPage_revisionReason, data.reason ?? "", "f");
    __classPrivateFieldSet33(this, _WikiPage_revisionAuthor, data.revisionBy?.data ? new User(data.revisionBy.data, metadata) : void 0, "f");
    __classPrivateFieldSet33(this, _WikiPage_metadata, metadata, "f");
  }
  /** The name of the page. */
  get name() {
    return __classPrivateFieldGet34(this, _WikiPage_name, "f");
  }
  /** The name of the subreddit the page is in. */
  get subredditName() {
    return __classPrivateFieldGet34(this, _WikiPage_subredditName, "f");
  }
  /** The Markdown content of the page. */
  get content() {
    return __classPrivateFieldGet34(this, _WikiPage_content, "f");
  }
  /** The HTML content of the page. */
  get contentHtml() {
    return __classPrivateFieldGet34(this, _WikiPage_contentHtml, "f");
  }
  /** The ID of the revision. */
  get revisionId() {
    return __classPrivateFieldGet34(this, _WikiPage_revisionId, "f");
  }
  /** The date of the revision. */
  get revisionDate() {
    return __classPrivateFieldGet34(this, _WikiPage_revisionDate, "f");
  }
  /** The reason for the revision. */
  get revisionReason() {
    return __classPrivateFieldGet34(this, _WikiPage_revisionReason, "f");
  }
  /** The author of this revision. */
  get revisionAuthor() {
    return __classPrivateFieldGet34(this, _WikiPage_revisionAuthor, "f");
  }
  toJSON() {
    return {
      name: __classPrivateFieldGet34(this, _WikiPage_name, "f"),
      subredditName: __classPrivateFieldGet34(this, _WikiPage_subredditName, "f"),
      content: __classPrivateFieldGet34(this, _WikiPage_content, "f"),
      contentHtml: __classPrivateFieldGet34(this, _WikiPage_contentHtml, "f"),
      revisionId: __classPrivateFieldGet34(this, _WikiPage_revisionId, "f"),
      revisionDate: __classPrivateFieldGet34(this, _WikiPage_revisionDate, "f"),
      revisionReason: __classPrivateFieldGet34(this, _WikiPage_revisionReason, "f"),
      revisionAuthor: __classPrivateFieldGet34(this, _WikiPage_revisionAuthor, "f")?.toJSON()
    };
  }
  /** Update this page. */
  async update(content, reason) {
    return _WikiPage.updatePage({
      subredditName: __classPrivateFieldGet34(this, _WikiPage_subredditName, "f"),
      page: __classPrivateFieldGet34(this, _WikiPage_name, "f"),
      content,
      reason
    }, __classPrivateFieldGet34(this, _WikiPage_metadata, "f"));
  }
  /** Get the revisions for this page. */
  async getRevisions(options) {
    return _WikiPage.getPageRevisions({
      subredditName: __classPrivateFieldGet34(this, _WikiPage_subredditName, "f"),
      page: __classPrivateFieldGet34(this, _WikiPage_name, "f"),
      ...options
    }, __classPrivateFieldGet34(this, _WikiPage_metadata, "f"));
  }
  /** Revert this page to a previous revision. */
  async revertTo(revisionId) {
    return _WikiPage.revertPage(__classPrivateFieldGet34(this, _WikiPage_subredditName, "f"), __classPrivateFieldGet34(this, _WikiPage_name, "f"), revisionId, __classPrivateFieldGet34(this, _WikiPage_metadata, "f"));
  }
  /** Get the settings for this page. */
  async getSettings() {
    return _WikiPage.getPageSettings(__classPrivateFieldGet34(this, _WikiPage_subredditName, "f"), __classPrivateFieldGet34(this, _WikiPage_name, "f"), __classPrivateFieldGet34(this, _WikiPage_metadata, "f"));
  }
  /** Update the settings for this page. */
  async updateSettings(options) {
    return _WikiPage.updatePageSettings({
      subredditName: __classPrivateFieldGet34(this, _WikiPage_subredditName, "f"),
      page: __classPrivateFieldGet34(this, _WikiPage_name, "f"),
      listed: options.listed,
      permLevel: options.permLevel
    }, __classPrivateFieldGet34(this, _WikiPage_metadata, "f"));
  }
  /** Add an editor to this page. */
  async addEditor(username) {
    return _WikiPage.addEditor(__classPrivateFieldGet34(this, _WikiPage_subredditName, "f"), __classPrivateFieldGet34(this, _WikiPage_name, "f"), username, __classPrivateFieldGet34(this, _WikiPage_metadata, "f"));
  }
  /** Remove an editor from this page. */
  async removeEditor(username) {
    return _WikiPage.removeEditor(__classPrivateFieldGet34(this, _WikiPage_subredditName, "f"), __classPrivateFieldGet34(this, _WikiPage_name, "f"), username, __classPrivateFieldGet34(this, _WikiPage_metadata, "f"));
  }
  /** @internal */
  static async getPage(subredditName, page, metadata) {
    const client = Devvit.redditAPIPlugins.Wiki;
    const response = await client.GetWikiPage({
      subreddit: subredditName,
      page
    }, metadata);
    assertNonNull(response.data, "Failed to get wiki page");
    return new _WikiPage(page, subredditName, response.data, metadata);
  }
  /** @internal */
  static async getPages(subredditName, metadata) {
    const client = Devvit.redditAPIPlugins.Wiki;
    const response = await client.GetWikiPages({ subreddit: subredditName }, metadata);
    return response.data || [];
  }
  /** @internal */
  static async createPage(options, metadata) {
    return _WikiPage.updatePage(options, metadata);
  }
  /** @internal */
  static async updatePage(options, metadata) {
    const client = Devvit.redditAPIPlugins.Wiki;
    await client.EditWikiPage({
      subreddit: options.subredditName,
      page: options.page,
      content: options.content,
      reason: options.reason ?? ""
    }, metadata);
    return _WikiPage.getPage(options.subredditName, options.page, metadata);
  }
  /** @internal */
  static getPageRevisions(options, metadata) {
    const client = Devvit.redditAPIPlugins.Wiki;
    return new Listing({
      hasMore: true,
      after: options.after,
      limit: options.limit,
      pageSize: options.pageSize,
      async fetch(fetchOptions) {
        const response = await client.GetWikiPageRevisions({
          subreddit: options.subredditName,
          page: options.page,
          limit: fetchOptions.limit,
          after: fetchOptions.after,
          before: fetchOptions.before
        }, metadata);
        return wikiPageRevisionListingProtoToWikiPageRevision(response, metadata);
      }
    });
  }
  /** @internal */
  static async revertPage(subredditName, page, revisionId, metadata) {
    const client = Devvit.redditAPIPlugins.Wiki;
    await client.RevertWikiPage({
      subreddit: subredditName,
      page,
      revision: revisionId
    }, metadata);
  }
  /** @internal */
  static async getPageSettings(subredditName, page, metadata) {
    const client = Devvit.redditAPIPlugins.Wiki;
    const response = await client.GetWikiPageSettings({
      subreddit: subredditName,
      page
    }, metadata);
    assertNonNull(response.data, "Failed to get wiki page settings");
    return new WikiPageSettings(response.data, metadata);
  }
  /** @internal */
  static async updatePageSettings(options, metadata) {
    const client = Devvit.redditAPIPlugins.Wiki;
    const response = await client.UpdateWikiPageSettings({
      subreddit: options.subredditName,
      page: options.page,
      listed: options.listed ? "on" : "",
      permlevel: options.permLevel
    }, metadata);
    assertNonNull(response.data, "Failed to update wiki page settings");
    return new WikiPageSettings(response.data, metadata);
  }
  /** @internal */
  static async addEditor(subredditName, page, username, metadata) {
    const client = Devvit.redditAPIPlugins.Wiki;
    await client.AllowEditor({
      act: "add",
      subreddit: subredditName,
      page,
      username
    }, metadata);
  }
  /** @internal */
  static async removeEditor(subredditName, page, username, metadata) {
    const client = Devvit.redditAPIPlugins.Wiki;
    await client.AllowEditor({
      act: "del",
      subreddit: subredditName,
      page,
      username
    }, metadata);
  }
};
_WikiPage_name = /* @__PURE__ */ new WeakMap(), _WikiPage_subredditName = /* @__PURE__ */ new WeakMap(), _WikiPage_content = /* @__PURE__ */ new WeakMap(), _WikiPage_contentHtml = /* @__PURE__ */ new WeakMap(), _WikiPage_revisionId = /* @__PURE__ */ new WeakMap(), _WikiPage_revisionDate = /* @__PURE__ */ new WeakMap(), _WikiPage_revisionReason = /* @__PURE__ */ new WeakMap(), _WikiPage_revisionAuthor = /* @__PURE__ */ new WeakMap(), _WikiPage_metadata = /* @__PURE__ */ new WeakMap();
var WikiPageRevision = class {
  constructor(data, metadata) {
    _WikiPageRevision_id.set(this, void 0);
    _WikiPageRevision_page.set(this, void 0);
    _WikiPageRevision_date.set(this, void 0);
    _WikiPageRevision_author.set(this, void 0);
    _WikiPageRevision_reason.set(this, void 0);
    _WikiPageRevision_hidden.set(this, void 0);
    __classPrivateFieldSet33(this, _WikiPageRevision_id, data.id, "f");
    __classPrivateFieldSet33(this, _WikiPageRevision_page, data.page, "f");
    __classPrivateFieldSet33(this, _WikiPageRevision_date, new Date(data.timestamp), "f");
    assertNonNull(data.author?.data, "Wiki page revision author details are missing");
    __classPrivateFieldSet33(this, _WikiPageRevision_author, new User(data.author.data, metadata), "f");
    __classPrivateFieldSet33(this, _WikiPageRevision_reason, data.reason ?? "", "f");
    __classPrivateFieldSet33(this, _WikiPageRevision_hidden, data.revisionHidden ?? false, "f");
  }
  get id() {
    return __classPrivateFieldGet34(this, _WikiPageRevision_id, "f");
  }
  get page() {
    return __classPrivateFieldGet34(this, _WikiPageRevision_page, "f");
  }
  get date() {
    return __classPrivateFieldGet34(this, _WikiPageRevision_date, "f");
  }
  get author() {
    return __classPrivateFieldGet34(this, _WikiPageRevision_author, "f");
  }
  get reason() {
    return __classPrivateFieldGet34(this, _WikiPageRevision_reason, "f");
  }
  get hidden() {
    return __classPrivateFieldGet34(this, _WikiPageRevision_hidden, "f");
  }
  toJSON() {
    return {
      id: __classPrivateFieldGet34(this, _WikiPageRevision_id, "f"),
      page: __classPrivateFieldGet34(this, _WikiPageRevision_page, "f"),
      date: __classPrivateFieldGet34(this, _WikiPageRevision_date, "f"),
      author: __classPrivateFieldGet34(this, _WikiPageRevision_author, "f").toJSON(),
      reason: __classPrivateFieldGet34(this, _WikiPageRevision_reason, "f"),
      hidden: __classPrivateFieldGet34(this, _WikiPageRevision_hidden, "f")
    };
  }
};
_WikiPageRevision_id = /* @__PURE__ */ new WeakMap(), _WikiPageRevision_page = /* @__PURE__ */ new WeakMap(), _WikiPageRevision_date = /* @__PURE__ */ new WeakMap(), _WikiPageRevision_author = /* @__PURE__ */ new WeakMap(), _WikiPageRevision_reason = /* @__PURE__ */ new WeakMap(), _WikiPageRevision_hidden = /* @__PURE__ */ new WeakMap();
var WikiPageSettings = class {
  constructor(data, metadata) {
    _WikiPageSettings_listed.set(this, void 0);
    _WikiPageSettings_permLevel.set(this, void 0);
    _WikiPageSettings_editors.set(this, void 0);
    __classPrivateFieldSet33(this, _WikiPageSettings_listed, data.listed, "f");
    __classPrivateFieldSet33(this, _WikiPageSettings_permLevel, data.permLevel, "f");
    __classPrivateFieldSet33(this, _WikiPageSettings_editors, data.editors.map((editor) => {
      assertNonNull(editor.data, "Wiki page editor details are missing");
      return new User(editor.data, metadata);
    }), "f");
  }
  get listed() {
    return __classPrivateFieldGet34(this, _WikiPageSettings_listed, "f");
  }
  get permLevel() {
    return __classPrivateFieldGet34(this, _WikiPageSettings_permLevel, "f");
  }
  get editors() {
    return __classPrivateFieldGet34(this, _WikiPageSettings_editors, "f");
  }
  toJSON() {
    return {
      listed: __classPrivateFieldGet34(this, _WikiPageSettings_listed, "f"),
      permLevel: __classPrivateFieldGet34(this, _WikiPageSettings_permLevel, "f"),
      editors: __classPrivateFieldGet34(this, _WikiPageSettings_editors, "f").map((editor) => editor.toJSON())
    };
  }
};
_WikiPageSettings_listed = /* @__PURE__ */ new WeakMap(), _WikiPageSettings_permLevel = /* @__PURE__ */ new WeakMap(), _WikiPageSettings_editors = /* @__PURE__ */ new WeakMap();
function wikiPageRevisionListingProtoToWikiPageRevision(listingProto, metadata) {
  assertNonNull(listingProto.data?.children, "Wiki page revision listing is missing children");
  const children = listingProto.data.children.map((child) => {
    return new WikiPageRevision(child, metadata);
  });
  return {
    children,
    before: listingProto.data.before,
    after: listingProto.data.after
  };
}

// node_modules/@devvit/shared-types/sanitizeSvg.js
var DISALLOWED_ELEMENTS = [
  // We don't allow images bypass reddit safety checks!
  /**
   * 1/31/24: We need to allow images so we can make things happen.
   * https://reddit.atlassian.net/browse/DX-5740
   */
  // 'image',
  "animate",
  "color-profile",
  "cursor",
  "discard",
  "font-face",
  "font-face-format",
  "font-face-name",
  "font-face-src",
  "font-face-uri",
  "foreignobject",
  "hatch",
  "hatchpath",
  "mesh",
  "meshgradient",
  "meshpatch",
  "meshrow",
  "missing-glyph",
  "script",
  "set",
  "solidcolor",
  "unknown",
  "use"
];
var DISALLOWED_STYLES = [
  /**
   * 1/31/24: We need to allow images so we can make things happen.
   * https://reddit.atlassian.net/browse/DX-5740
   */
  // 'background',
  // 'background-image',
  "border-image",
  "border-image-source",
  "behavior",
  "expression",
  "list-style-image",
  "cursor",
  "content"
];
var DISALLOWED_ATTRIBUTES = [
  "onload",
  "onerror",
  "onclick",
  "onmouseover"
  /**
   * 1/31/24: We need to allow images so we can make things happen.
   * https://reddit.atlassian.net/browse/DX-5740
   */
  // 'href',
];
function ensureXmlns(svg2) {
  if (/xmlns=["']http:\/\/www\.w3\.org\/2000\/svg["']/.test(svg2)) {
    return svg2;
  }
  return svg2.replace(/<svg\b/, '<svg xmlns="http://www.w3.org/2000/svg"');
}
function sanitizeSvg(svg2) {
  if (!svg2) {
    return void 0;
  }
  if (!svg2.trim().startsWith("<svg")) {
    console.log("The provided string is not a valid SVG.");
    return void 0;
  }
  try {
    const disallowedElementsRegex = new RegExp(`<\\s*(${DISALLOWED_ELEMENTS.join("|")})\\b`, "gi");
    const disallowedStylesRegex = new RegExp(`(${DISALLOWED_STYLES.join("|")})\\s*:\\s*url\\s*\\((['"]?)(.*?)\\2\\)`, "gi");
    const disallowedAttributesRegex = new RegExp(`(${DISALLOWED_ATTRIBUTES.join("|")})\\s*(=\\s*(['"]?)(.*?)\\3)?`, "gi");
    svg2 = svg2.trim().replace(/\s+/g, " ");
    svg2 = ensureXmlns(svg2);
    const elementMatches = svg2.match(disallowedElementsRegex) || [];
    const styleMatches = svg2.match(disallowedStylesRegex) || [];
    const attributeMatches = svg2.match(disallowedAttributesRegex) || [];
    let isInvalid = false;
    if (elementMatches.length > 0) {
      isInvalid = true;
      console.warn(`Disallowed elements detected in SVG: ${elementMatches.map((x) => x.replace("<", "")).join(", ")}`);
    }
    if (styleMatches.length > 0) {
      isInvalid = true;
      console.warn(`Disallowed styles detected in SVG: ${styleMatches.map((x) => x.split(":")[0]).join(", ")}`);
    }
    if (attributeMatches.length > 0) {
      isInvalid = true;
      console.warn(`Disallowed attributes detected in SVG: ${attributeMatches.map((x) => x.split("=")[0]).join(", ")}`);
    }
    if (isInvalid) {
      return void 0;
    }
    return svg2;
  } catch {
    return void 0;
  }
}

// node_modules/@devvit/public-api/apis/ui/helpers/svg.js
function svg(strings, ...args) {
  let str = "";
  strings.forEach((string, index) => {
    str += string;
    const arg = args[index];
    if (arg !== void 0) {
      str += `${arg}`;
    }
  });
  str = sanitizeSvg(str);
  if (str === void 0) {
    return "";
  }
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(str)}`;
}

// node_modules/@devvit/public-api/devvit/internals/blocks/handler/useWebView.js
var import_protos32 = require("@devvit/protos");
var import_protos33 = require("@devvit/protos");
var __classPrivateFieldSet34 = function(receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet35 = function(receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _WebViewHook_hookId;
var _WebViewHook_url;
var _WebViewHook_onMessage;
var _WebViewHook_onUnmount;
var _WebViewHook_renderContext;
var _WebViewHook_emitFullscreenEffect;
var WebViewHook = class {
  constructor(params, options) {
    this.state = { messageCount: 0 };
    _WebViewHook_hookId.set(this, void 0);
    _WebViewHook_url.set(this, void 0);
    _WebViewHook_onMessage.set(this, void 0);
    _WebViewHook_onUnmount.set(this, void 0);
    _WebViewHook_renderContext.set(this, void 0);
    this.postMessage = (message) => {
      try {
        const jsonString = JSON.stringify(message);
        __classPrivateFieldGet35(this, _WebViewHook_renderContext, "f").emitEffect(`postMessage${this.state.messageCount++}`, {
          type: import_protos32.EffectType.EFFECT_WEB_VIEW,
          webView: {
            postMessage: {
              webViewId: __classPrivateFieldGet35(this, _WebViewHook_hookId, "f"),
              app: {
                message,
                // This is deprecated, but populated for mobile client backwards compatibility
                jsonString
              }
            }
          }
        });
      } catch (e) {
        console.error(StringUtil.caughtToString(e));
        throw Error("Something went wrong. Please check the contents of your postMessage.");
      }
    };
    this.mount = () => {
      const assets = __classPrivateFieldGet35(this, _WebViewHook_renderContext, "f")?.devvitContext?.assets;
      const url = assets.getURL(__classPrivateFieldGet35(this, _WebViewHook_url, "f"), { webView: true });
      if (!url) {
        throw Error(`useWebView fullscreen request failed; web view asset could not be found`);
      }
      __classPrivateFieldGet35(this, _WebViewHook_emitFullscreenEffect, "f").call(this, true, url);
    };
    this.unmount = () => {
      __classPrivateFieldGet35(this, _WebViewHook_emitFullscreenEffect, "f").call(this, false, "");
    };
    _WebViewHook_emitFullscreenEffect.set(this, (show, url) => {
      __classPrivateFieldGet35(this, _WebViewHook_renderContext, "f").emitEffect("fullscreen", {
        type: import_protos32.EffectType.EFFECT_WEB_VIEW,
        webView: {
          fullscreen: {
            id: __classPrivateFieldGet35(this, _WebViewHook_hookId, "f"),
            show,
            url
          }
        }
      });
    });
    __classPrivateFieldSet34(this, _WebViewHook_url, options.url ?? "index.html", "f");
    __classPrivateFieldSet34(this, _WebViewHook_hookId, params.hookId, "f");
    __classPrivateFieldSet34(this, _WebViewHook_onMessage, options.onMessage, "f");
    __classPrivateFieldSet34(this, _WebViewHook_onUnmount, options.onUnmount, "f");
    __classPrivateFieldSet34(this, _WebViewHook_renderContext, params.context, "f");
  }
  /**
   * Handles UI events originating from the web view and calls associated callbacks for the Devvit app to handle.
   */
  async onUIEvent(event) {
    if (event.webView?.fullScreen) {
      const isVisible = event.webView.fullScreen.visibility === import_protos33.WebViewVisibility.WEBVIEW_VISIBLE;
      if (!isVisible && __classPrivateFieldGet35(this, _WebViewHook_onUnmount, "f"))
        await __classPrivateFieldGet35(this, _WebViewHook_onUnmount, "f").call(this, this);
    } else if (event.webView?.postMessage) {
      if (event.webView.postMessage.jsonString) {
        const parsedJson = JSON.parse(event.webView.postMessage.jsonString);
        await __classPrivateFieldGet35(this, _WebViewHook_onMessage, "f").call(this, parsedJson, this);
      } else {
        await __classPrivateFieldGet35(this, _WebViewHook_onMessage, "f").call(this, event.webView.postMessage.message, this);
      }
    }
  }
};
_WebViewHook_hookId = /* @__PURE__ */ new WeakMap(), _WebViewHook_url = /* @__PURE__ */ new WeakMap(), _WebViewHook_onMessage = /* @__PURE__ */ new WeakMap(), _WebViewHook_onUnmount = /* @__PURE__ */ new WeakMap(), _WebViewHook_renderContext = /* @__PURE__ */ new WeakMap(), _WebViewHook_emitFullscreenEffect = /* @__PURE__ */ new WeakMap();
function useWebView(options) {
  const hook = registerHook({
    namespace: "useWebView",
    initializer: (params) => new WebViewHook(params, options)
  });
  return {
    postMessage: hook.postMessage,
    mount: hook.mount,
    unmount: hook.unmount
  };
}

// src/shared/locales/en.json
var en_default = {
  "dialog-button-label": "OK",
  "not-allowed-dialog": "ACCESS\u21B5DENIED",
  "unauthorized-dialog-level-0": "Nice try, but you\u2019re\u21B5still banned",
  "unauthorized-dialog-level-1": "This time of\u21B5your life is over.\u21B5Accept your ban.",
  "unauthorized-dialog-level-2": "Don\u2019t go back.\u21B5You\u2019ve got so much\u21B5more ahead of you.",
  "unauthorized-dialog-level-3": "Oh... it\u2019s you again.\u21B5Ya, still banned.",
  "unauthorized-dialog-metadata": "YOUR TEAM NEEDS YOU HERE:",
  "unauthorized-dialog-button-label": "Go to {rSlashSubredditName}",
  "paused-dialog-header": "PAUSED",
  "paused-dialog-metadata": "Ready to jump\u21B5back in?",
  "paused-dialog-button-label": "Continue",
  "beat-game-dialog": "You've earned a point.\u21B5Your time here is over.\u21B5Go home. Go on, get.",
  "beat-game-dialog-metadata": "For more games:",
  "beat-game-dialog-button-label": "Go to r/GamesOnReddit",
  "beat-game-dialog-footer": "VIEW YOUR STATS\u21B5AND TEAM STANDINGS AT",
  "verify-email-dialog": "Please verify your\u21B5email to continue.",
  "verify-email-dialog-button-label": "VERIFY EMAIL",
  "leaderboard-play-button": "Play r/Field",
  "leaderboard-play-button-loading": "Loading",
  "leaderboard-teams-header": "CURRENT TEAM SCORES",
  "leaderboard-stats-header": "GAME STATS",
  "leaderboard-stats-players": "PLAYERS",
  "leaderboard-stats-bans": "BANS",
  "leaderboard-stats-fields": "FIELDS",
  "welcome-dialog-greeting": "WELCOME TO",
  "welcome-dialog-team-allocation": "FOR REASONS UNKNOWN,\u21B5YOU\u2019RE ON TEAM:",
  "welcome-dialog-rules": "Same rules but...\u21B5the team that claims\u21B5the field earns their\u21B5way back into\u21B5{rSlashSubredditName}",
  "welcome-dialog-button-label-loading": "Loading",
  "welcome-dialog-button-label-first": "Got It",
  "welcome-dialog-button-label-subsequent": "Enter {rSlashSubredditName}",
  "welcome-dialog-team-overview": "Your opponents are:",
  "games-on-reddit-header": "BROUGHT TO YOU BY",
  "game-claim-button-label": "Claim for {TeamName}",
  "game-claim-button-label-working": "Claiming...",
  "game-claim-button-label-fallback": "Claim",
  "game-footer-title": "SCOREBOARD",
  "ascension-dialog-title": "Team {TeamName} has\u21B5claimed this field.\u21B5Ascend to the next\u21B5round with your team.",
  "ascension-dialog-button-label": "UPWARD!",
  "error-dialog": "An error occurred.\u21B5Please try again later.",
  "unsupported-client-dialog": "Your Reddit client\u21B5is not supported.\u21B5Please use the latest\u21B5Reddit app or website.",
  "unsupported-client-dialog-button-label": "UPDATE",
  "how-to-play-dialog-button-label": "GOT IT. LET ME IN.",
  "banned-dialog-level-0-title": "YOU\u2019RE BANNED",
  "banned-dialog-level-0-metadata": "You found a ban box.\u21B5No more r/Field for you.\u21B5BUT WAIT, THERE\u2019S MORE...",
  "banned-dialog-level-1-title": "BANNED AGAIN!",
  "banned-dialog-level-1-metadata": "We found you a field\u21B5that\u2019s a better fit.\u21B5TIME TO MOVE ON",
  "banned-dialog-level-2-title": "BANANA BANNED!",
  "banned-dialog-level-2-metadata": "You\u2019ve made it this far...\u21B5WHAT\u2019S ONE MORE BAN?!",
  "banned-dialog-level-3-title": "THE FINAL BAN!",
  "banned-dialog-level-3-metadata": "You\u2019ve been banned\u21B5for the last time\u21B5AND EARNED YOUR TEAM A POINT!",
  "banned-dialog-button-label": "But is it enough to win...",
  "staying-dialog-title": "ROUND OVER\u21B5{TeamName}\u21B5claimed the field",
  "staying-dialog-metadata-1": "YOU CLAIMED",
  "staying-dialog-metadata-2": "BOXES WITHOUT GETTING BANNED",
  "staying-dialog-button-label": "TRY AGAIN",
  "error-dialog-no-webgl": "WebGL 2 support\u21B5is required to play.\u21B5Try another device.",
  "point-claim-button-label": "CHECK FOR BAN",
  "point-claim-button-label-after": "YA BANNED!!!",
  "point-claim-scoreboard-title": "SCOREBOARD",
  "point-claim-title": "Good luck getting banned now...",
  "ended-dialog-title": "GAME OVER",
  "ended-dialog-subtitle": "r/Field has ended.",
  "ended-dialog-metadata": "Thank you for trying.\u21B5(Place was better.)",
  "ended-dialog-footer": "VIEW YOUR STATS\u21B5AND TEAM STANDINGS AT",
  "winner-dialog-title": "CONGRATULATIONS!",
  "winner-dialog-metadata-1": "YOU EARNED A POINT FOR",
  "winner-dialog-metadata-2": "by getting banned 4\u21B5times. How glorious!",
  "winner-dialog-footer": "PLAY MORE GAMES\u21B5AND SUBSCRIBE TO"
};

// src/shared/locale.ts
var localesMap = {
  0: en_default
};
function localize(key, localeId) {
  const EMPTY_RESULT = "";
  const DEFAULT_LOCALE = 0;
  return localesMap[localeId ?? DEFAULT_LOCALE][key] ?? EMPTY_RESULT;
}
var lineBreakToken = "\u21B5";
var variableStartToken = "{";

// src/shared/theme.ts
var paletteBlack = 255;
var paletteWhite = 4294967295;
var paletteShade19 = 48;
var paletteShade50 = 128;
var paletteShade80 = 205;
var paletteTint6 = 4294967055;
var paletteTint19 = 4294967088;
var paletteTint60 = 4294967193;
var paletteTint75 = 4294967216;
var paletteConsole = 522465535;
var paletteDisabled = 1347440895;
var paletteFlamingo = 3158737407;
var paletteJuiceBox = 1938942975;
var paletteLasagna = 3664329215;
var paletteSunshine = 3802746367;
var paletteField = 176101631;
var paletteFieldLight = 2113863935;
var paletteFieldDark = 3014911;
var paletteBannedField = 3072464639;
var paletteBannedFieldLight = 4285686015;
var paletteBannedFieldDark = 940313087;
var paletteBananaField = 3854173695;
var paletteBananaFieldLight = 4209714687;
var paletteBananaFieldDark = 740557311;
var paletteWhatIsField = 2840967167;
var paletteWhatIsFieldLight = 3663199231;
var paletteWhatIsFieldDark = 806303999;
var fallbackPixelRatio = 2;
var fontSSize = 12;
var fontMSize = 16;
var fontLSize = 22;
var spacePx = 8;
var radiusPx = spacePx / 2;
function cssHex(val) {
  return `#${val.toString(16).padStart(8, "0")}`;
}

// src/shared/config/config.prod.json
var config_prod_default = {
  devvitConfig: "devvit.prod.yaml",
  leaderboard: {
    title: "Leaderboard",
    subredditName: "GamesOnReddit",
    subredditId: "t5_cs7yk0",
    url: "https://www.reddit.com/r/GamesOnReddit/"
  },
  levels: [
    {
      id: 0,
      subredditId: "t5_2rbc9",
      postId: "t3_1jkhl1m",
      url: "https://www.reddit.com/r/Field/",
      subredditName: "Field",
      theme: {},
      title: "Field"
    },
    {
      id: 1,
      subredditId: "t5_dpi2wi",
      postId: "t3_1jkhly8",
      url: "https://www.reddit.com/r/BannedField/",
      subredditName: "BannedField",
      theme: {},
      title: "BannedField"
    },
    {
      id: 2,
      subredditId: "t5_dkz0k9",
      postId: "t3_1jkhmx9",
      url: "https://www.reddit.com/r/BananaField/",
      subredditName: "BananaField",
      theme: {},
      title: "BananaField"
    },
    {
      id: 3,
      subredditId: "t5_dpi3gj",
      postId: "t3_1jmw52r",
      url: "https://www.reddit.com/r/WhatIsField/",
      subredditName: "WhatIsField",
      theme: {},
      title: "WhatIsField"
    }
  ]
};

// src/shared/types/level.ts
var levelPascalCase = {
  0: "Field",
  1: "BannedField",
  2: "BananaField",
  3: "WhatIsField"
};
var levelShadowColor = {
  0: paletteFieldDark,
  1: paletteBannedFieldDark,
  2: paletteBananaFieldDark,
  3: paletteWhatIsFieldDark
};
var levelBaseColor = {
  0: paletteField,
  1: paletteBannedField,
  2: paletteBananaField,
  3: paletteWhatIsField
};
var levelHighlightColor = {
  0: paletteFieldLight,
  1: paletteBannedFieldLight,
  2: paletteBananaFieldLight,
  3: paletteWhatIsFieldLight
};
var config2 = config_prod_default;

// src/shared/svg-factories/createBorderedContainer.ts
function createBorderedContainer(options) {
  const DEFAULT_BACKGROUND_COLOR = cssHex(paletteBlack);
  const DEFAULT_BORDER_COLOR = cssHex(paletteField);
  const DEFAULT_SHADOW_COLOR = cssHex(paletteBlack);
  const rect = (x, y, width, height) => `M${x} ${y}h${width}v${height}h-${width}v-${height}`;
  const background = `<path d="${rect(4, 4, options.width - 8, options.height - 8)}Z" fill="${options.backgroundColor ?? DEFAULT_BACKGROUND_COLOR}" />`;
  const borderSegments = [
    // Top Left Corner
    "M6 2h2v4h-2v2h-4v-2h2v-2h2v-2",
    // Top Right Corner
    `M${options.width - 8} 2h2v2h2v2h2v2h-4v-2h-2v-4`,
    // Bottom Right Corner
    `M${options.width - 6} ${options.height - 8}h4v2h-2v2h-2v2h-2v-4h2v-2`,
    // Bottom Left Corner
    `M2 ${options.height - 8}h4v2h2v4h-2v-2h-2v-2h-2v-2`,
    // Top Edge (X,Y,W,H)
    rect(8, 2, options.width - 16, 2),
    // Right Edge (X,Y,W,H)
    rect(options.width - 4, 8, 2, options.height - 16),
    // Bottom Edge (X,Y,W,H)
    rect(8, options.height - 4, options.width - 16, 2),
    // Left Edge (X,Y,W,H)
    rect(2, 8, 2, options.height - 16)
  ];
  const border = `<path d="${borderSegments.join("")}Z" fill="${options.borderColor ?? DEFAULT_BORDER_COLOR}" />`;
  const shadowSegments = [
    // Right Edge
    rect(options.width - 2, 8, 2, options.height - 14),
    // Bottom Right Corner
    `M${options.width - 4} ${options.height - 6}h4v2h-2v2h-2v2h-2v-4h2v-2`,
    // Bottom Edge
    rect(8, options.height - 2, options.width - 14, 2)
  ];
  const shadow = `<path d="${shadowSegments.join("")}Z" fill="${options.shadowColor ?? DEFAULT_SHADOW_COLOR}" />`;
  const drawOrder = [background, border, shadow];
  return `<svg width="${options.width}" height="${options.height}" viewBox="0 0 ${options.width} ${options.height}" fill="none" xmlns="http://www.w3.org/2000/svg">${drawOrder.join("")}</svg>`;
}

// src/shared/svg-factories/createCrtLines.ts
function createCrtLines(options) {
  const {
    height,
    width,
    inset = 6,
    distance = 2,
    strokeWidth = 0.5,
    strokeColor = cssHex(paletteBlack)
  } = options;
  const data = [];
  for (let i = inset; i < height - inset; i += distance) {
    data.push(`M${inset} ${i}H${width - inset}`);
  }
  const path = `<path d="${data.join("")}" stroke="${strokeColor}" stroke-width="${strokeWidth}" />`;
  return `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">${path}</svg>`;
}

// src/devvit/components/BorderedContainer.tsx
function BorderedContainer(props) {
  const height = props.height ?? 256;
  const width = props.width ?? 300;
  const backgroundColor = props.backgroundColor ?? cssHex(paletteBlack);
  const borderColor = props.borderColor ?? cssHex(paletteFieldLight);
  const lines = props.lines ?? false;
  return /* @__PURE__ */ Devvit.createElement("zstack", { width: `${width}px`, height: `${height}px` }, /* @__PURE__ */ Devvit.createElement(
    "image",
    {
      imageHeight: Math.ceil(height * props.pixelRatio),
      imageWidth: Math.ceil(width * props.pixelRatio),
      width: "100%",
      height: "100%",
      description: `"${props.children}" button`,
      resizeMode: "fit",
      url: svg`${createBorderedContainer({
        height,
        width,
        borderColor,
        backgroundColor
      })}`
    }
  ), /* @__PURE__ */ Devvit.createElement(
    "vstack",
    {
      height: "100%",
      width: "100%",
      padding: props.padding ?? "medium",
      alignment: props.alignment ?? "center middle"
    },
    props.children
  ), lines && /* @__PURE__ */ Devvit.createElement(
    "image",
    {
      imageHeight: Math.ceil(height * props.pixelRatio),
      imageWidth: Math.ceil(width * props.pixelRatio),
      width: "100%",
      height: "100%",
      description: `"${props.children}" button`,
      resizeMode: "fit",
      url: svg`${createCrtLines({ height, width })}`
    }
  ));
}

// src/shared/svg-factories/createDialogBadge.ts
function createDialogBadge(level) {
  const border = `<rect width="26" height="26" rx="5" ry="5" fill="${cssHex(levelBaseColor[level])}" />`;
  const background = `<rect x="2" y="2" width="22" height="22" rx="3" ry="3" fill="${cssHex(paletteBlack)}" />`;
  const symbol = `<path d="M7 7h4v4h4v-4h4v4h-4v4h4v4h-4v-4h-4v4h-4v-4h4v-4h-4Z" fill="${cssHex(levelHighlightColor[level])}" />`;
  return `<svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">${border}${background}${symbol}</svg>`;
}

// src/shared/svg-factories/createGorLogo.ts
function createGorLogo() {
  return `<svg width="712" height="132" viewBox="0 0 712 132" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M48 0H664V6H676V12H688V18H694V24H700V36H706V48H712V84H706V96H700V108H694V114H688V120H676V126H664V132H0V126H6V120H12V114H18V108H12V96H6V84H0V48H6V36H12V24H18V18H24V12H36V6H48V0Z" fill="${cssHex(paletteTint75)}"/><path d="M60 96V36H120V96H60ZM66 90H114V42H66V90Z M48 6H664V12H48V6ZM48 12V18H36V12H48ZM676 18H664V12H676V18ZM688 24H676V18H688V24ZM694 36H688V24H694V36ZM700 48H694V36H700V48ZM700 48H706V84H700V48ZM30 18H24V24H30V18ZM700 90H694V96H700V90ZM72 72H84V84H72V72ZM84 60H96V72H84V60ZM96 72V84H108V72H96ZM96 60V48H108V60H96ZM72 60H84V48H72V60ZM618.174 52.9106C617.299 52.4031 616.62 51.7087 616.124 50.8139C615.628 49.9192 615.38 48.9309 615.38 47.8359C615.38 46.7408 615.628 45.7526 616.124 44.8578C616.62 43.9631 617.299 43.2687 618.174 42.7612C619.048 42.2537 620.014 42 621.085 42C622.155 42 623.121 42.2537 623.996 42.7612C624.871 43.2687 625.55 43.9631 626.046 44.8578C626.542 45.7526 626.79 46.7408 626.79 47.8359C626.79 48.9309 626.542 49.9192 626.046 50.8139C625.55 51.7087 624.871 52.4031 623.996 52.9106C623.121 53.418 622.155 53.6584 621.085 53.6584C620.014 53.6584 619.048 53.4047 618.174 52.9106ZM616.333 56.3159H625.85V89.4616H616.333V56.3159ZM565.463 89.4468V85.4405H565.345C564.118 86.8828 562.682 87.9912 561.037 88.7658C559.392 89.5403 557.551 89.9409 555.528 89.9409C552.721 89.9409 550.162 89.2064 547.864 87.7375C545.566 86.2685 543.752 84.2386 542.446 81.6345C541.128 79.0304 540.475 76.1325 540.475 72.9007C540.475 69.6689 541.141 66.731 542.472 64.1269C543.804 61.5227 545.632 59.4795 547.956 58.0105C550.279 56.5415 552.864 55.8071 555.71 55.8071C557.564 55.8071 559.248 56.1142 560.776 56.7419C562.303 57.3695 563.648 58.2643 564.81 59.4395H565.019V43.107H574.536V89.4468H565.463ZM562.538 79.7649L562.545 79.7709C561.292 80.9555 559.676 81.5544 557.708 81.5544C556.259 81.5544 554.927 81.1938 553.7 80.486C552.473 79.7782 551.493 78.7766 550.775 77.4679C550.057 76.1592 549.692 74.6368 549.692 72.9541C549.692 71.2715 550.031 69.7624 550.71 68.427C551.389 67.0915 552.342 66.0499 553.556 65.302C554.77 64.5542 556.167 64.1803 557.695 64.1803C559.222 64.1803 560.567 64.5542 561.742 65.302C562.917 66.0499 563.831 67.0915 564.47 68.4136C565.11 69.7491 565.436 71.2314 565.436 72.9007L565.463 82.2354H565.28L562.545 79.7709L562.551 79.7649H562.538ZM199.076 78.7174C201.061 82.2029 203.802 84.9539 207.301 86.9571V86.9437C210.813 88.9469 214.756 89.9485 219.155 89.9485C223.15 89.9485 226.675 89.1205 229.743 87.4512C232.798 85.7819 235.161 83.4849 236.832 80.5336C238.503 77.5956 239.339 74.2704 239.339 70.5712V63.3064H217.928V71.6262H230.03C230.03 73.389 229.573 74.9782 228.646 76.3804C227.72 77.7826 226.453 78.891 224.821 79.6923C223.189 80.4936 221.362 80.8942 219.338 80.8942C216.805 80.8942 214.521 80.2932 212.497 79.078C210.46 77.8761 208.881 76.1801 207.732 74.03C206.596 71.88 206.022 69.5029 206.022 66.6984C206.022 63.894 206.622 61.4368 207.81 59.3135C208.998 57.1901 210.643 55.5475 212.732 54.4124C214.821 53.2773 217.171 52.703 219.756 52.703C221.806 52.703 223.699 53.0369 225.422 53.7046C227.145 54.3723 228.555 55.2404 229.639 56.3354L233.438 47.3078C231.453 46.0792 229.286 45.1444 226.949 44.5034C224.612 43.8757 222.223 43.5552 219.769 43.5552C215.213 43.5552 211.126 44.5835 207.536 46.6401C203.933 48.6967 201.139 51.5011 199.129 55.0667C197.118 58.6324 196.113 62.6387 196.113 66.9789C196.113 71.3191 197.092 75.2319 199.076 78.7174ZM163.204 56.3164H154.013L154 56.303V89.4487H163.517V72.1681C163.517 70.6724 163.844 69.3904 164.483 68.3487C165.123 67.3071 165.972 66.5192 167.016 65.9983C168.061 65.4775 169.209 65.2104 170.45 65.2104C171.155 65.2104 171.833 65.2772 172.473 65.4107C173.113 65.5443 173.674 65.7446 174.131 65.985L177.891 56.6235C177.591 56.3965 177.056 56.2095 176.285 56.0493C175.515 55.9024 174.588 55.8223 173.531 55.8223C171.324 55.8223 169.353 56.2897 167.643 57.2245C165.933 58.1593 164.523 59.3211 163.413 60.6966H163.204V56.3164ZM198.14 44.0437H189.314L170.58 89.4487H179.379L198.14 44.0437ZM267.011 85.4996C265.81 86.9418 264.373 88.0369 262.715 88.8115C261.057 89.586 259.23 89.9733 257.219 89.9733C254.412 89.9733 251.853 89.2388 249.556 87.7698C247.258 86.3008 245.443 84.271 244.138 81.6668C242.819 79.0627 242.166 76.1648 242.166 72.9331C242.166 69.7013 242.832 66.7633 244.164 64.1592C245.496 61.5551 247.323 59.5119 249.647 58.0429C251.971 56.5739 254.556 55.8394 257.402 55.8394C259.386 55.8394 261.201 56.2 262.833 56.9345C264.465 57.669 265.875 58.7106 267.063 60.0861H267.272V56.3335H276.371V89.4792H267.272V85.4996H267.011ZM264.243 79.7972L264.25 79.8033C262.997 80.9878 261.38 81.5867 259.412 81.5867C257.963 81.5867 256.632 81.2262 255.404 80.5184C254.177 79.8106 253.198 78.809 252.48 77.5003C251.762 76.1915 251.397 74.6691 251.397 72.9865C251.397 71.3038 251.736 69.7948 252.415 68.4593C253.094 67.1239 254.047 66.0823 255.261 65.3344C256.475 64.5866 257.872 64.2126 259.399 64.2126C260.927 64.2126 262.272 64.5866 263.447 65.3344C264.621 66.0823 265.535 67.1239 266.175 68.446C266.815 69.7814 267.141 71.2638 267.141 72.9331L267.167 82.2678H266.984L264.25 79.8033L264.256 79.7972H264.243ZM290.319 56.3335H281.259L281.324 56.3469V89.4925H290.868V69.6212C290.868 67.7916 291.299 66.3894 292.173 65.4012C293.048 64.413 294.21 63.9188 295.62 63.9188C297.03 63.9188 298.1 64.413 298.845 65.3878C299.589 66.3627 299.954 67.7649 299.954 69.5678V89.5059H309.38V69.5678C309.38 67.7516 309.811 66.3627 310.686 65.3878C311.547 64.413 312.709 63.9188 314.158 63.9188C315.516 63.9188 316.587 64.413 317.318 65.3878C318.049 66.3627 318.427 67.7649 318.427 69.5678V89.5059H327.971V68.3659C327.971 66.2425 327.644 64.2527 327.018 62.3831C326.378 60.5135 325.281 58.951 323.702 57.709C322.122 56.4671 320.007 55.8394 317.357 55.8394C315.32 55.8394 313.44 56.2401 311.704 57.0146C309.968 57.7892 308.518 58.9376 307.357 60.46H307.2C306.39 58.951 305.32 57.7892 304.001 57.0146C302.67 56.2267 301.116 55.8394 299.328 55.8394C295.62 55.8394 292.669 57.4152 290.476 60.5535H290.319V56.3335ZM338.774 87.7965C336.176 86.3543 334.166 84.3511 332.769 81.7737C331.359 79.1963 330.667 76.2583 330.667 72.9731C330.667 69.6879 331.398 66.563 332.847 63.9589C334.309 61.3548 336.255 59.3516 338.696 57.9494C341.137 56.5472 343.814 55.8394 346.725 55.8394C349.636 55.8394 352.025 56.4938 354.297 57.7892C356.569 59.0845 358.37 60.9275 359.676 63.2912C360.981 65.6549 361.634 68.3391 361.634 71.3572C361.634 72.9731 361.477 74.5356 361.151 76.0046H339.349C339.936 77.9143 340.967 79.4233 342.456 80.5184C343.944 81.6134 345.707 82.161 347.756 82.161C349.205 82.161 350.668 81.9339 352.143 81.4665C353.618 80.9991 354.741 80.4516 355.498 79.824L358.475 87.062C357.234 87.9301 355.668 88.6245 353.788 89.1453C351.908 89.6662 349.923 89.9332 347.835 89.9332C344.401 89.9332 341.385 89.2121 338.787 87.7698L338.774 87.7965ZM352.874 69.9283C352.874 68.6196 352.6 67.4711 352.064 66.4962C351.516 65.5214 350.772 64.7735 349.819 64.2527C348.866 63.7319 347.769 63.4648 346.555 63.4648C344.623 63.4648 343.017 64.0524 341.738 65.2409C340.458 66.4161 339.584 67.9919 339.153 69.9417H352.887L352.874 69.9283ZM365.563 86.0471C366.908 87.3024 368.475 88.2639 370.25 88.945V88.9851C372.026 89.6661 373.88 90 375.812 90C378.005 90 380.029 89.5593 381.882 88.6512C383.736 87.7431 385.211 86.4878 386.308 84.8853C387.405 83.2827 387.953 81.4799 387.953 79.4634C387.953 77.4469 387.431 75.7776 386.386 74.4688C385.342 73.1601 384.154 72.1719 382.822 71.5175C381.491 70.8498 380.042 70.3022 378.501 69.8482L377.652 69.6078C376.386 69.2205 375.407 68.8867 374.689 68.6062C373.984 68.3258 373.383 67.9652 372.887 67.5245C372.391 67.0838 372.143 66.5497 372.143 65.9354C372.143 65.1875 372.47 64.5732 373.096 64.0657C373.723 63.5583 374.506 63.3045 375.485 63.3045C376.464 63.3045 377.326 63.5716 378.044 64.1192C378.775 64.6667 379.389 65.3344 379.885 66.1357L387.209 62.9306C386.608 61.515 385.721 60.2731 384.52 59.2047C383.318 58.1364 381.922 57.3084 380.303 56.7208C378.684 56.1332 376.961 55.8394 375.133 55.8394C372.966 55.8394 371.007 56.2668 369.271 57.1081C367.535 57.9494 366.164 59.1246 365.185 60.6203C364.206 62.116 363.709 63.8254 363.709 65.735C363.709 68.2991 364.532 70.3824 366.19 71.9983C367.848 73.6141 369.976 74.816 372.561 75.6173L373.579 75.9245C374.754 76.245 375.746 76.5655 376.543 76.8459C377.339 77.1264 378.018 77.5136 378.606 77.981C379.193 78.4484 379.48 79.0227 379.48 79.677C379.48 80.1311 379.31 80.5718 378.997 80.9858C378.684 81.3998 378.24 81.747 377.692 82.0007C377.143 82.2544 376.517 82.388 375.838 82.388C374.585 82.388 373.449 81.9874 372.43 81.1861C371.412 80.3848 370.616 79.45 370.054 78.355L362.587 81.7069C363.226 83.3495 364.219 84.7918 365.563 86.0471ZM400.734 86.877C397.235 84.8337 394.467 82.0427 392.457 78.477C390.433 74.9248 389.428 70.9986 389.428 66.7118C389.428 62.425 390.433 58.4721 392.444 54.9466C394.454 51.4076 397.209 48.6299 400.708 46.6C404.207 44.5702 408.097 43.5552 412.379 43.5552C416.661 43.5552 420.513 44.5702 424.024 46.6C427.523 48.6299 430.278 51.421 432.288 54.9466C434.299 58.4721 435.304 62.3983 435.304 66.7118C435.304 71.0253 434.299 74.9515 432.288 78.4904C430.278 82.0293 427.523 84.8337 424.024 86.8636C420.526 88.9068 416.635 89.9351 412.379 89.9351C408.123 89.9351 404.246 88.9202 400.734 86.8636V86.877ZM418.959 78.891C420.93 77.6624 422.497 75.9798 423.633 73.8431C424.769 71.7064 425.33 69.3293 425.33 66.7252C425.33 64.121 424.769 61.744 423.633 59.6073C422.497 57.4705 420.943 55.7879 418.959 54.5593C416.975 53.3307 414.781 52.7164 412.353 52.7164C409.925 52.7164 407.771 53.3307 405.786 54.5593C403.802 55.7879 402.222 57.4705 401.073 59.6073C399.924 61.744 399.337 64.121 399.337 66.7252C399.337 69.3293 399.911 71.7064 401.047 73.8431C402.196 75.9798 403.763 77.6624 405.747 78.891C407.732 80.1196 409.938 80.7339 412.34 80.7339C414.742 80.7339 416.975 80.1196 418.946 78.891H418.959ZM447.728 56.3335H438.485L438.498 56.3469V89.4925H448.042V70.0218C448.042 68.0854 448.564 66.5897 449.608 65.5347C450.653 64.4797 451.984 63.9455 453.59 63.9455C455.196 63.9455 456.449 64.453 457.35 65.4546C458.251 66.4562 458.708 67.9385 458.708 69.915V89.4792H468.251V67.7916C468.251 65.4546 467.833 63.3713 466.985 61.5685C466.136 59.7656 464.935 58.35 463.355 57.3485C461.776 56.3469 459.83 55.8394 457.768 55.8394C455.705 55.8394 453.799 56.2534 452.063 57.0814C450.313 57.9227 448.929 59.1112 447.885 60.6737H447.728V56.3335ZM489.775 44.0437C492.712 44.0437 495.337 44.5912 497.66 45.6729C499.984 46.7546 501.825 48.3571 503.157 50.4538C504.488 52.5504 505.154 55.0477 505.154 57.9456C505.128 60.6299 504.527 63.1004 503.326 65.3306C502.125 67.5608 500.428 69.377 498.222 70.7926L509.058 89.462H498.13L489.279 73.6237C488.47 73.6638 487.83 73.6905 487.347 73.6905H483.548V89.462H473.874V44.0437H489.775ZM488.652 65.5843C490.023 65.5843 491.224 65.3173 492.282 64.7831C493.339 64.2489 494.162 63.501 494.749 62.5529C495.337 61.6047 495.637 60.4963 495.637 59.241C495.637 57.9857 495.337 56.8238 494.723 55.8623C494.109 54.9008 493.248 54.1663 492.138 53.6455C491.028 53.1247 489.736 52.8576 488.274 52.8576H483.574V65.5843H488.652ZM509.345 81.7737C510.742 84.3511 512.753 86.3543 515.351 87.7965L515.364 87.7698C517.962 89.2121 520.977 89.9332 524.411 89.9332C526.5 89.9332 528.484 89.6662 530.364 89.1453C532.244 88.6245 533.811 87.9301 535.051 87.062L532.075 79.824C531.317 80.4516 530.195 80.9991 528.719 81.4665C527.244 81.9339 525.782 82.161 524.333 82.161C522.283 82.161 520.521 81.6134 519.032 80.5184C517.544 79.4233 516.513 77.9143 515.925 76.0046H537.727C538.054 74.5356 538.21 72.9731 538.21 71.3572C538.21 68.3391 537.558 65.6549 536.252 63.2912C534.947 60.9275 533.158 59.0979 530.873 57.7892C528.602 56.4938 526.213 55.8394 523.301 55.8394C520.39 55.8394 517.714 56.5472 515.272 57.9494C512.831 59.3516 510.886 61.3548 509.424 63.9589C507.974 66.563 507.243 69.6879 507.243 72.9731C507.243 76.2583 507.935 79.1963 509.345 81.7737ZM528.654 66.4962C529.189 67.4711 529.463 68.6196 529.463 69.9283L529.476 69.9417H515.742C516.173 67.9919 517.048 66.4161 518.327 65.2409C519.607 64.0524 521.212 63.4648 523.145 63.4648C524.359 63.4648 525.455 63.7319 526.408 64.2527C527.362 64.7735 528.106 65.5214 528.654 66.4962ZM599.358 79.7709L599.352 79.7649H599.365L599.358 79.7709ZM602.276 85.4405V89.4468H611.349V43.107H601.832V59.4395H601.623C600.461 58.2643 599.117 57.3695 597.589 56.7419C596.062 56.1142 594.378 55.8071 592.524 55.8071C589.678 55.8071 587.093 56.5415 584.769 58.0105C582.445 59.4795 580.617 61.5227 579.286 64.1269C577.954 66.731 577.288 69.6689 577.288 72.9007C577.288 76.1325 577.941 79.0304 579.259 81.6345C580.565 84.2386 582.38 86.2685 584.677 87.7375C586.975 89.2064 589.534 89.9409 592.341 89.9409C594.364 89.9409 596.205 89.5403 597.85 88.7658C599.495 87.9912 600.931 86.8828 602.158 85.4405H602.276ZM594.521 81.5544C596.489 81.5544 598.106 80.9555 599.358 79.7709L602.093 82.2354H602.276L602.25 72.9007C602.25 71.2314 601.923 69.7491 601.284 68.4136C600.644 67.0915 599.73 66.0499 598.555 65.302C597.38 64.5542 596.036 64.1803 594.508 64.1803C592.981 64.1803 591.584 64.5542 590.37 65.302C589.155 66.0499 588.202 67.0915 587.524 68.427C586.845 69.7624 586.505 71.2715 586.505 72.9541C586.505 74.6368 586.871 76.1592 587.589 77.4679C588.307 78.7766 589.286 79.7782 590.513 80.486C591.74 81.1938 593.072 81.5544 594.521 81.5544ZM628.657 64.5965H635.55V89.4891H645.068V64.5965H652V56.3435H645.068V46.7951H635.55V56.3435H628.657V64.5965Z" fill-rule="evenodd" clip-rule="evenodd" fill="${cssHex(paletteBlack)}" />
</svg>`;
}

// src/devvit/data/font.json
var font_default = {
  A: "M3 3H4V4H3V3Z M2 5V4H3V5H2Z M2 7V5H1V11H2V8H5V11H6V5H5V4H4V5H5V7H2Z",
  B: "M1 3V11H5V10H6V7H5V6H6V4H5V3H1ZM5 4H2V6H5V4ZM2 10H5V7H2V10Z",
  C: "M5 3H2V4H1V10H2V11H5V10H6V9H5V10H2V4H5V5H6V4H5V3Z",
  D: "M1 3V11H5V10H6V4H5V3H1ZM2 4V10H5V4H2Z",
  E: "M1 3V11H6V10H2V7H5V6H2V4H6V3H1Z",
  F: "M1 3H6V4H2V6H5V7H2V11H1V3Z",
  G: "M2 3H5V4H2V3Z M2 10H1V4H2V10Z M5 10V11H2V10H5Z M5 10V8H4V7H6V10H5Z M5 4V5H6V4H5Z",
  H: "M1 3H2V6H5V3H6V11H5V7H2V11H1V3Z",
  I: "M1 3H6V4H4V10H6V11H1V10H3V4H1V3Z",
  J: "M6 3V10H5V4H3V3H6Z M2 10H5V11H2V10Z M2 10H1V9H2V10Z",
  K: "M1 3H2V6H3V5H4V7H2V11H1V3Z M5 9V7H4V9H5Z M5 9V11H6V9H5Z M5 4V5H4V4H5Z M5 4V3H6V4H5Z",
  L: "M2 3H1V11H6V10H2V3Z",
  M: "M1 3H2V5H3V6H2V11H1V3Z M4 6V8H3V6H4Z M5 5H4V6H5V11H6V3H5V5Z",
  N: "M1 3H2V5H3V6H2V11H1V3Z M4 7H3V6H4V7Z M5 7H4V8H5V11H6V3H5V7Z",
  O: "M5 3H2V4H1V10H2V11H5V10H6V4H5V3ZM5 4V10H2V4H5Z",
  P: "M1 3V11H2V8H5V7H6V4H5V3H1ZM2 7H5V4H2V7Z",
  Q: "M2 3H5V4H2V3Z M2 10H1V4H2V10Z M5 10H2V11H4V12H6V11H5V10Z M5 10H6V4H5V10Z",
  R: "M1 3V11H2V8H4V9H5V11H6V9H5V7H6V4H5V3H1ZM5 4H2V7H5V4Z",
  S: "M2 3H5V4H2V3Z M2 6H1V4H2V6Z M5 7H2V6H5V7Z M5 10V7H6V10H5Z M2 10V11H5V10H2Z M2 10H1V9H2V10Z M5 4H6V5H5V4Z",
  T: "M6 3H1V4H3V11H4V4H6V3Z",
  U: "M1 3H2V10H1V3Z M5 10H2V11H5V10Z M5 10V3H6V10H5Z",
  V: "M1 3H2V8H1V3Z M3 10H2V8H3V10Z M4 10V11H3V10H4Z M5 8H4V10H5V8Z M5 8V3H6V8H5Z",
  W: "M1 3H2V8H1V3Z M3 8V11H2V8H3Z M4 8H3V6H4V8Z M5 8H4V11H5V8Z M5 8V3H6V8H5Z",
  X: "M1 3H2V5H1V3Z M3 6H2V5H3V6Z M4 6H3V7H2V8H1V11H2V8H3V7H4V8H5V11H6V8H5V7H4V6Z M5 5V6H4V5H5Z M5 5V3H6V5H5Z",
  Y: "M1 3H2V6H1V3Z M3 7H2V6H3V7Z M4 7V11H3V7H4Z M5 6H4V7H5V6Z M5 6V3H6V6H5Z",
  Z: "M1 3H6V5H5V4H1V3Z M4 6V5H5V6H4Z M3 7V6H4V7H3Z M2 8V7H3V8H2Z M2 10V8H1V11H6V10H2Z",
  a: "M5 5H2V6H5V7H2V8H1V10H2V11H4V10H5V11H6V6H5V5ZM4 10H2V8H5V9H4V10Z",
  b: "M2 3H1V11H2V10H3V11H5V10H6V6H5V5H3V6H2V3ZM2 7V9H3V10H5V6H3V7H2Z",
  c: "M5 5H2V6H1V10H2V11H5V10H6V9H5V10H2V6H5V7H6V6H5V5Z",
  d: "M5 3H6V11H5V10H4V9H5V7H4V6H5V3Z M2 6V5H4V6H2Z M2 10H1V6H2V10Z M2 10V11H4V10H2Z",
  e: "M2 5H5V6H2V5Z M2 7V6H1V10H2V11H5V10H6V9H5V10H2V8H6V6H5V7H2Z",
  f: "M6 3H3V4H2V5H1V6H2V10H1V11H5V10H3V6H6V5H3V4H6V3Z",
  g: "M2 5H4V6H2V5Z M2 10H1V6H2V10Z M4 10V11H2V10H4Z M5 12H6V5H5V6H4V7H5V9H4V10H5V12Z M5 12V13H2V12H5Z",
  h: "M2 3H1V11H2V7H3V6H5V11H6V6H5V5H3V6H2V3Z",
  i: "M4 3H3V4H4V3Z M4 5H1V6H3V10H1V11H6V10H4V5Z",
  j: "M4 3H5V4H4V3Z M2 5H5V12H4V6H2V5Z M2 12V13H4V12H2Z M2 12H1V11H2V12Z",
  k: "M1 3H2V8H3V7H4V9H2V11H1V3Z M5 10V9H4V10H5Z M5 10V11H6V10H5Z M5 6V7H4V6H5Z M5 6V5H6V6H5Z",
  l: "M1 3H4V10H6V11H1V10H3V4H1V3Z",
  m: "M1 5H3V6H2V11H1V5Z M4 6V11H3V6H4Z M5 6V5H4V6H5Z M5 6V11H6V6H5Z",
  n: "M2 5H1V11H2V7H3V6H5V11H6V6H5V5H3V6H2V5Z",
  o: "M5 5H2V6H1V10H2V11H5V10H6V6H5V5ZM5 6V10H2V6H5Z",
  p: "M2 5H1V13H2V10H3V11H5V10H6V6H5V5H3V6H2V5ZM3 6H5V10H3V9H2V7H3V6Z",
  q: "M2 5H4V6H2V5Z M2 10H1V6H2V10Z M4 10V11H2V10H4Z M5 9H4V10H5V13H6V5H5V6H4V7H5V9Z",
  r: "M1 5H3V6H4V7H3V10H5V11H1V10H2V6H1V5Z M4 6V5H6V6H4Z",
  s: "M2 5H5V6H2V5Z M2 7H1V6H2V7Z M5 7H2V8H5V10H2V9H1V10H2V11H5V10H6V8H5V7Z M5 7H6V6H5V7Z",
  t: "M3 3H2V5H1V6H2V10H3V11H5V10H6V9H5V10H3V6H6V5H3V3Z",
  u: "M2 5H1V10H2V11H4V10H5V11H6V5H5V9H4V10H2V5Z",
  v: "M1 5H2V8H1V5Z M3 10H2V8H3V10Z M4 10V11H3V10H4Z M5 8H4V10H5V8Z M5 8V5H6V8H5Z",
  w: "M1 5H2V10H1V5Z M3 10V11H2V10H3Z M4 10H3V5H4V10Z M5 10H4V11H6V5H5V10Z",
  x: "M1 5H2V6H1V5Z M3 7H2V6H3V7Z M4 7H3V8H2V9H1V11H2V9H3V8H4V9H5V11H6V9H5V8H4V7Z M5 6V7H4V6H5Z M5 6V5H6V6H5Z",
  y: "M2 5H1V8H2V10H3V12H1V13H3V12H4V10H5V8H6V5H5V8H4V10H3V8H2V5Z",
  z: "M6 5H1V6H4V7H3V8H2V9H1V11H6V10H2V9H3V8H4V7H5V6H6V5Z",
  "0": "M2 3H5V4H2V3Z M3 7H2V4H1V10H2V11H5V10H6V4H5V5H4V6H3V7ZM5 6V10H2V8H3V7H4V6H5Z",
  "1": "M3 3H4V10H6V11H1V10H3V5H1V4H3V3Z",
  "2": "M5 3H2V4H1V5H2V4H5V6H4V7H3V8H2V9H1V11H6V10H2V9H3V8H4V7H5V6H6V4H5V3Z",
  "3": "M2 3H5V4H2V3Z M2 4V5H1V4H2Z M5 6V4H6V6H5Z M5 7H3V6H5V7Z M5 10V7H6V10H5Z M2 10V11H5V10H2Z M2 10H1V9H2V10Z",
  "4": "M6 3V11H5V9H1V6H2V8H5V4H4V3H6Z M3 5H2V6H3V5Z M3 5H4V4H3V5Z",
  "5": "M6 3H1V7H5V10H2V9H1V10H2V11H5V10H6V7H5V6H2V4H6V3Z",
  "6": "M5 3H2V4H1V10H2V11H5V10H6V7H5V6H2V4H5V5H6V4H5V3ZM5 7V10H2V7H5Z",
  "7": "M1 3H6V6H5V4H1V3Z M4 7V6H5V7H4Z M3 8H4V7H3V8Z M3 8V11H2V8H3Z",
  "8": "M2 3H5V4H2V3Z M2 6H1V4H2V6Z M5 6H2V7H1V10H2V11H5V10H6V7H5V6ZM5 7V10H2V7H5Z M5 6H6V4H5V6Z",
  "9": "M5 3H2V4H1V7H2V8H5V10H2V9H1V10H2V11H5V10H6V4H5V3ZM5 4V7H2V4H5Z",
  "+": "M4 5H3V7H1V8H3V10H4V8H6V7H4V5Z",
  "&": "M2 3H4V4H2V3Z M2 6H1V4H2V6Z M2 7V6H3V7H2Z M2 10H1V7H2V10Z M4 10V11H2V10H4Z M6 7H4V10H5V8H6V7Z M6 7V6H7V7H6Z M4 4H5V5H4V4Z",
  "*": "M4 3H3V5H2V4H1V5H2V6H1V7H2V6H3V8H4V6H5V7H6V6H5V5H6V4H5V5H4V3Z",
  "@": "M5 3H2V4H1V5H2V4H5V10H4V6H2V7H1V10H2V11H3V10H4V11H5V10H6V4H5V3ZM3 10H2V7H3V10Z",
  ":": "M4 5H3V7H4V5Z M4 9H3V11H4V9Z",
  ",": "M4 9H3V11H2V12H3V11H4V9Z",
  "!": "M4 3H3V9H4V3Z M4 10H3V11H4V10Z",
  ")": "M2 2H3V3H2V2Z M4 4H3V3H4V4Z M4 10V4H5V10H4Z M3 11H4V10H3V11Z M3 11V12H2V11H3Z",
  "%": "M3 3H2V4H1V5H2V6H3V5H4V4H3V3ZM3 4V5H2V4H3Z M6 3H7V5H6V3Z M5 6V5H6V6H5Z M4 7V6H5V7H4Z M3 8V7H4V8H3Z M2 9V8H3V9H2Z M2 9V11H1V9H2Z M4 9H5V10H4V9Z M6 10V11H5V10H6Z M6 9H7V10H6V9Z M6 9H5V8H6V9Z",
  "(": "M5 2H4V3H3V4H2V10H3V11H4V12H5V11H4V10H3V4H4V3H5V2Z",
  ".": "M3 9H4V11H3V9Z",
  "#": "M3 3H4V5H5V3H6V5H7V6H5V8H6V9H4V11H3V9H2V11H1V9H0V8H2V6H1V5H3V3ZM4 6H3V8H4V6Z",
  "?": "M5 3H2V4H1V5H2V4H5V6H4V7H3V9H4V7H5V6H6V4H5V3Z M4 10H3V11H4V10Z",
  ";": "M3 5H4V7H3V5Z M3 9H4V11H3V9Z M3 11V12H2V11H3Z",
  "-": "M2 7H5V8H2V7Z",
  "\u2019": "M4 3H3V5H2V6H3V5H4V3Z",
  ">": "M2 4H3V5H2V4Z M4 6H3V5H4V6Z M5 7H4V6H5V7Z M5 8V7H6V8H5Z M4 9V8H5V9H4Z M3 10H4V9H3V10Z M3 10V11H2V10H3Z",
  "<": "M5 4H4V5H3V6H2V7H1V8H2V9H3V10H4V11H5V10H4V9H3V8H2V7H3V6H4V5H5V4Z",
  "/": "M6 2H5V4H4V6H3V8H2V10H1V12H2V10H3V8H4V6H5V4H6V2Z",
  _: "M1 10H6V11H1V10Z",
  "\u2022": "M2 6H4V8H2V6Z",
  "'": "M5 3H4V4H3V6H4V4H5V3Z",
  "\u2014": "M0 7H7V8H0V7Z"
};

// src/devvit/components/PixelText.tsx
var DEFAULT_SIZE = 11;
var GLYPH_HEIGHT = 14;
var GLYPH_WIDTH = 7;
function PixelText(props) {
  const {
    children,
    size = DEFAULT_SIZE,
    color = "#ff00ff",
    pixelRatio,
    opacity = 1
  } = props;
  const childrenArray = Array.isArray(children) ? children : [children];
  const line = childrenArray[0]?.split("") ?? [];
  let xOffset = 0;
  const characters = [];
  for (const character of line) {
    if (!(character in font_default)) {
      xOffset += GLYPH_WIDTH;
      continue;
    }
    characters.push(`<path
        d="${font_default[character]}"
        transform="translate(${xOffset} 0)"
        fill-rule="evenodd"
        clip-rule="evenodd"
        fill="${color}"
      />`);
    xOffset += GLYPH_WIDTH;
  }
  const width = line.length * GLYPH_WIDTH;
  const height = GLYPH_HEIGHT;
  const scaledHeight = Math.round(GLYPH_HEIGHT / DEFAULT_SIZE * size);
  const scaledWidth = Math.round(
    GLYPH_WIDTH / DEFAULT_SIZE * size * line.length
  );
  return /* @__PURE__ */ Devvit.createElement(
    "image",
    {
      imageHeight: `${scaledHeight * pixelRatio}px`,
      imageWidth: `${scaledWidth * pixelRatio}px`,
      height: `${scaledHeight}px`,
      width: `${scaledWidth}px`,
      description: childrenArray[0],
      resizeMode: "fill",
      url: `data:image/svg+xml;charset=UTF-8,
          <svg
              width="${scaledWidth}"
              height="${scaledHeight}"
              viewBox="0 0 ${width} ${height}"
              xmlns="http://www.w3.org/2000/svg"
          >
              <g opacity="${opacity}">
            ${characters.join("")}
            ${props.underline ? `<rect x="0" y="12" width="${width}" height="1" fill="${color}" />` : ""}
            </g>
          </svg>
        `
    }
  );
}
function getBoundingBoxWidth(text, size) {
  return text.length * GLYPH_WIDTH * (size / DEFAULT_SIZE);
}

// src/devvit/components/GamesOnRedditBanner.tsx
function GamesOnRedditBanner(props, context) {
  const label = props.label ? props.label : localize("games-on-reddit-header");
  return /* @__PURE__ */ Devvit.createElement(
    "vstack",
    {
      width: "100%",
      alignment: "center middle",
      onPress: () => context.ui.navigateTo(config2.leaderboard.url)
    },
    label.split(lineBreakToken).map((line) => /* @__PURE__ */ Devvit.createElement(
      PixelText,
      {
        ...props,
        key: line,
        size: fontSSize,
        color: cssHex(paletteWhite)
      },
      line
    )),
    /* @__PURE__ */ Devvit.createElement("spacer", { height: "8px" }),
    /* @__PURE__ */ Devvit.createElement(
      "image",
      {
        imageWidth: 173 * props.pixelRatio,
        imageHeight: 32 * props.pixelRatio,
        width: "173px",
        height: "32px",
        description: "r/GamesOnReddit Logo",
        resizeMode: "fit",
        url: svg`${createGorLogo()}`
      }
    )
  );
}

// src/devvit/components/Scrim.tsx
function Scrim(props) {
  return /* @__PURE__ */ Devvit.createElement(
    "vstack",
    {
      height: "100%",
      width: "100%",
      backgroundColor: cssHex(paletteShade80),
      onPress: props.onPress
    }
  );
}

// src/devvit/components/StyledButton.tsx
function StyledButton(props) {
  const color = props.color ?? cssHex(paletteFieldLight);
  const height = 44;
  const width = props.width ?? 256;
  const RADIUS2 = 8;
  return /* @__PURE__ */ Devvit.createElement("zstack", { width: `${width}px`, height: `${height}px`, onPress: props.onPress }, /* @__PURE__ */ Devvit.createElement(
    "image",
    {
      imageHeight: Math.ceil(height * props.pixelRatio),
      imageWidth: Math.ceil(width * props.pixelRatio),
      width: "100%",
      height: "100%",
      resizeMode: "fit",
      description: `"${props.children}" button`,
      url: `data:image/svg+xml;charset=UTF-8,
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  
  <!-- Button Shadow -->
  <rect x="0" y="10" width="${width}" height="34" rx="${RADIUS2}" ry="${RADIUS2}" fill="${cssHex(
        paletteBlack
      )}" opacity="0.5" />
  
  <!-- Button Side: Stroke -->
  <rect x="0" y="6" width="${width}" height="34" rx="${RADIUS2}" ry="${RADIUS2}" fill="${cssHex(
        paletteBlack
      )}" />

  <!-- Button Side: Fill -->
  <rect x="1" y="7" width="${width - 2}" height="32" rx="${RADIUS2 - 1}" ry="${RADIUS2 - 1}" fill="${color}" />

  <!-- Button Side: Tint -->
  <rect x="1" y="7" width="${width - 2}" height="32" rx="${RADIUS2 - 1}" ry="${RADIUS2 - 1}" fill="${cssHex(paletteBlack)}" opacity="0.5" />
  
  <!-- Front: Stroke -->
  <rect x="0" y="0" width="${width}" height="34" rx="${RADIUS2}" ry="${RADIUS2}" fill="${cssHex(
        paletteBlack
      )}" />

  <!-- Front: Fill -->
  <rect x="1" y="1" width="${width - 2}" height="32" rx="${RADIUS2 - 1}" ry="${RADIUS2 - 1}" fill="${color}" />

  <!-- Front: Highlight -->
  <rect x="8" y="2" width="${width - 16}" height="3" rx="1.5" ry="1.5" fill="${cssHex(
        paletteWhite
      )}" opacity="0.6" />
  </svg>`
    }
  ), /* @__PURE__ */ Devvit.createElement("vstack", { height: "100%", width: "100%", alignment: "top center" }, /* @__PURE__ */ Devvit.createElement("spacer", { height: "6px" }), /* @__PURE__ */ Devvit.createElement(PixelText, { ...props, size: fontMSize, color: cssHex(paletteBlack) }, props.children)));
}

// src/devvit/components/Dialog.tsx
function Dialog(props) {
  const DEFAULT_HEIGHT = 240;
  const DEFAULT_WIDTH = 288;
  const buttonLabel = props.buttonLabel ?? localize("dialog-button-label");
  const level = props.level ?? 0;
  return /* @__PURE__ */ Devvit.createElement(
    "zstack",
    {
      height: "100%",
      width: "100%",
      alignment: "center middle",
      backgroundColor: cssHex(paletteConsole)
    },
    props.backgroundElement ?? null,
    /* @__PURE__ */ Devvit.createElement(Scrim, null),
    /* @__PURE__ */ Devvit.createElement(
      "vstack",
      {
        height: "100%",
        width: "100%",
        padding: "medium",
        alignment: "center middle"
      },
      /* @__PURE__ */ Devvit.createElement("zstack", { alignment: "top center" }, /* @__PURE__ */ Devvit.createElement("vstack", { padding: "medium" }, /* @__PURE__ */ Devvit.createElement(
        BorderedContainer,
        {
          width: props.width ?? DEFAULT_WIDTH,
          height: props.height ?? DEFAULT_HEIGHT,
          ...props,
          padding: "medium",
          backgroundColor: cssHex(levelShadowColor[level]),
          borderColor: cssHex(levelBaseColor[level])
        },
        /* @__PURE__ */ Devvit.createElement("spacer", { height: "8px" }),
        /* @__PURE__ */ Devvit.createElement("vstack", { grow: true, width: "100%", alignment: "center middle" }, props.children)
      )), /* @__PURE__ */ Devvit.createElement("vstack", null, /* @__PURE__ */ Devvit.createElement("spacer", { height: "6px" }), /* @__PURE__ */ Devvit.createElement(DialogBadge, { ...props, level }))),
      props.button !== false && /* @__PURE__ */ Devvit.createElement(
        StyledButton,
        {
          color: props.buttonColor ? props.buttonColor : cssHex(levelHighlightColor[level]),
          ...props
        },
        buttonLabel
      ),
      props.marketing !== false && /* @__PURE__ */ Devvit.createElement(Devvit.Fragment, null, /* @__PURE__ */ Devvit.createElement("spacer", { height: "24px" }), /* @__PURE__ */ Devvit.createElement(
        GamesOnRedditBanner,
        {
          ...props,
          label: props.marketingLabel ?? ""
        }
      ))
    )
  );
}
function DialogBadge(props) {
  const SIZE = 26;
  return /* @__PURE__ */ Devvit.createElement(
    "image",
    {
      imageHeight: `${SIZE * props.pixelRatio}px`,
      imageWidth: `${SIZE * props.pixelRatio}px`,
      height: `${SIZE}px`,
      width: `${SIZE}px`,
      resizeMode: "fill",
      description: "r/Field Badge",
      url: svg`${createDialogBadge(props.level ?? 0)}`
    }
  );
}

// src/devvit/components/DialogWelcomeLoading.tsx
function DialogWelcomeLoading(props) {
  return /* @__PURE__ */ Devvit.createElement(
    Dialog,
    {
      ...props,
      buttonLabel: localize("welcome-dialog-button-label-loading"),
      buttonColor: cssHex(paletteDisabled)
    },
    /* @__PURE__ */ Devvit.createElement(
      BorderedContainer,
      {
        height: 72,
        width: 256,
        ...props,
        lines: true,
        backgroundColor: cssHex(paletteBlack),
        borderColor: cssHex(levelHighlightColor[props.level])
      },
      /* @__PURE__ */ Devvit.createElement("hstack", null)
    ),
    /* @__PURE__ */ Devvit.createElement("spacer", { grow: true })
  );
}

// src/shared/team.ts
function getTeamFromUserId(id) {
  let hash = 0;
  const input = id.slice(id.length - 4);
  for (let i = 0; i < input.length; i++) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash) % 4;
}
var teamTitleCase = {
  0: "Flamingo",
  1: "Juice Box",
  2: "Lasagna",
  3: "Sunshine"
};
var teamColor = {
  0: paletteFlamingo,
  1: paletteJuiceBox,
  2: paletteLasagna,
  3: paletteSunshine
};

// src/devvit/components/LeaderboardLoading.tsx
function LeaderboardLoading(props) {
  const standings = props.standings ?? [
    { member: 0, score: 0 },
    { member: 1, score: 0 },
    { member: 2, score: 0 },
    { member: 3, score: 0 }
  ];
  const placeholderStat = /* @__PURE__ */ Devvit.createElement(
    "vstack",
    {
      width: "33.332%",
      height: "52px",
      backgroundColor: cssHex(paletteBlack),
      border: "thin",
      borderColor: cssHex(paletteFieldLight)
    }
  );
  return /* @__PURE__ */ Devvit.createElement(
    "vstack",
    {
      height: "100%",
      width: "100%",
      backgroundColor: cssHex(paletteConsole),
      padding: "medium"
    },
    /* @__PURE__ */ Devvit.createElement(
      "vstack",
      {
        height: "100%",
        width: "100%",
        padding: "medium",
        border: "thin",
        borderColor: cssHex(paletteBlack),
        cornerRadius: "medium",
        alignment: "center middle"
      },
      /* @__PURE__ */ Devvit.createElement(
        "image",
        {
          imageHeight: "264px",
          imageWidth: "900px",
          width: "100%",
          height: "60px",
          description: "r/Field Logo",
          url: "field-logo-dark.png",
          resizeMode: "fit"
        }
      ),
      /* @__PURE__ */ Devvit.createElement("spacer", { height: "32px" }),
      /* @__PURE__ */ Devvit.createElement(StyledButton, { width: 200, ...props, color: cssHex(paletteDisabled) }, localize("leaderboard-play-button-loading")),
      /* @__PURE__ */ Devvit.createElement("spacer", { height: "32px" }),
      /* @__PURE__ */ Devvit.createElement(
        PixelText,
        {
          ...props,
          size: fontMSize,
          color: cssHex(paletteWhite),
          underline: true
        },
        localize("leaderboard-teams-header")
      ),
      /* @__PURE__ */ Devvit.createElement("spacer", { height: "8px" }),
      /* @__PURE__ */ Devvit.createElement("hstack", { width: "100%", gap: "small", alignment: "center" }, standings.map((team) => /* @__PURE__ */ Devvit.createElement(
        "vstack",
        {
          width: "25%",
          height: "52px",
          backgroundColor: cssHex(teamColor[team.member]),
          key: `team-${team.member}`
        }
      ))),
      /* @__PURE__ */ Devvit.createElement("spacer", { height: "32px" }),
      /* @__PURE__ */ Devvit.createElement(
        PixelText,
        {
          ...props,
          size: fontMSize,
          color: cssHex(paletteWhite),
          underline: true
        },
        localize("leaderboard-stats-header")
      ),
      /* @__PURE__ */ Devvit.createElement("spacer", { height: "8px" }),
      /* @__PURE__ */ Devvit.createElement("hstack", { width: "100%", gap: "small", alignment: "center" }, placeholderStat, placeholderStat, placeholderStat)
    )
  );
}

// src/devvit/hooks/use-state2.ts
function useState2(init) {
  return useState(init);
}

// src/devvit/components/app-pauser.tsx
var import_app2 = require_server_stub();

// src/devvit/components/DialogPaused.tsx
function DialogPaused(props, _ctx) {
  return /* @__PURE__ */ Devvit.createElement(Dialog, { ...props, buttonLabel: localize("paused-dialog-button-label") }, /* @__PURE__ */ Devvit.createElement(
    BorderedContainer,
    {
      height: 180,
      width: 256,
      ...props,
      lines: true,
      padding: "none",
      backgroundColor: cssHex(paletteBlack),
      borderColor: cssHex(levelHighlightColor[props.level])
    },
    /* @__PURE__ */ Devvit.createElement(
      PixelText,
      {
        ...props,
        size: fontMSize,
        color: cssHex(levelHighlightColor[props.level])
      },
      localize("paused-dialog-header")
    ),
    /* @__PURE__ */ Devvit.createElement("spacer", { size: "small" }),
    localize("paused-dialog-metadata").split(lineBreakToken).map((line) => /* @__PURE__ */ Devvit.createElement(
      PixelText,
      {
        key: line,
        size: fontSSize,
        color: cssHex(paletteWhite),
        ...props
      },
      line
    ))
  ), /* @__PURE__ */ Devvit.createElement("spacer", { height: "4px" }), /* @__PURE__ */ Devvit.createElement("spacer", { grow: true }));
}

// src/shared/const.ts
var INSTALL_REALTIME_CHANNEL = "channel";

// src/devvit/appUpgradeUtils.ts
var getVersionNumberFromRawVersion2 = (rawVersion) => {
  if (rawVersion.includes("+")) return 999999999999999;
  const versionNumber = Number(rawVersion.trim().split(".").pop());
  return Number.isNaN(versionNumber) ? void 0 : versionNumber;
};
var parseDevvitUserAgent2 = (input) => {
  const [company, platform, rawVersion] = input.trim().split(";");
  if (!company || !platform || !rawVersion) {
    console.warn(`Received a malformed devvit-user-agent! Received: '${input}'`);
    return;
  }
  if (company !== "Reddit") {
    console.warn(
      `Received unknown company name in user agent! Received: '${input}'`
    );
    return;
  }
  if (platform === "iOS") {
    const versionNumber = getVersionNumberFromRawVersion2(rawVersion);
    if (versionNumber === void 0) {
      console.warn(
        `Could not parse version number from user agent! Received: '${input}'`
      );
      return;
    }
    return {
      company: "Reddit",
      platform: "iOS",
      rawVersion,
      versionNumber
    };
  }
  if (platform === "Android") {
    const versionNumber = getVersionNumberFromRawVersion2(rawVersion);
    if (versionNumber === void 0) {
      console.warn(
        `Could not parse version number from user agent! Received: '${input}'`
      );
      return;
    }
    return {
      company: "Reddit",
      platform: "Android",
      rawVersion,
      versionNumber
    };
  }
  if (platform === "Shreddit") {
    return {
      company: "Reddit",
      platform: "Shreddit",
      rawVersion
    };
  }
  if (platform === "Play") {
    return {
      company: "Reddit",
      platform: "Play",
      rawVersion
    };
  }
  console.warn("Received unknown platform:", platform);
};
var shouldShowUpgradeAppScreen2 = (parsedDevvitUserAgent) => {
  if (!parsedDevvitUserAgent) {
    console.warn(
      `Could not parse devvit-user-agent! Received: '${JSON.stringify(parsedDevvitUserAgent)}'`
    );
    return false;
  }
  if (parsedDevvitUserAgent.platform === "Android") {
    return parsedDevvitUserAgent.versionNumber < 2511120;
  }
  if (parsedDevvitUserAgent.platform === "iOS") {
    return parsedDevvitUserAgent.versionNumber < 615988;
  }
  return false;
};
var getUpgradeLinkForPlatform2 = (platform) => {
  switch (platform) {
    case "Android":
      return "https://play.google.com/store/apps/details?id=com.reddit.frontpage";
    case "iOS":
      return "https://apps.apple.com/us/app/reddit/id1064216828";
    case "Play":
    case "Shreddit":
      break;
    default:
      console.error(`No upgrade link for platform: ${platform}`);
  }
};

// src/shared/types/v4.ts
var noV4 = "00000000-0000-0000-0000-000000000000";
function V4() {
  return crypto.randomUUID();
}

// src/shared/types/sid.ts
var noSID = `sid-${noV4}`;
function SID() {
  return `sid-${V4()}`;
}

// src/shared/types/tid.ts
var noT2 = "t2_0";
var noT3 = "t3_0";
function isT2(t2) {
  return !!t2?.startsWith("t2_");
}
function isT3(t3) {
  return !!t3?.startsWith("t3_");
}
function T2(t2) {
  if (isT2(t2)) return t2;
  throw Error(`${t2} must start with t2_`);
}
function T3(t3) {
  if (isT3(t3)) return t3;
  throw Error(`${t3} must start with t3_`);
}

// src/devvit/hooks/use-session.ts
function useSession(ctx) {
  const [sid] = useState2(SID);
  const [company, client, version] = ctx.debug.metadata["devvit-user-agent"]?.values[0]?.split(";") ?? [];
  return {
    debug: "app" in ctx.debug,
    // to-do: add to Context.debug.app.
    local: isLocal(),
    scheme: ctx.uiEnvironment?.colorScheme,
    sid,
    // to-do: add to Context?
    t2: T2(ctx.userId ?? noT2),
    // to-do: fix Context typing.
    t3: T3(ctx.postId ?? noT3),
    // to-do: fix Context typing.
    userAgent: { company, client, version }
    // to-do: add to Context.
  };
}
function isLocal() {
  return `${fetch}`.indexOf("circuitBreak") > -1;
}

// src/devvit/components/app.tsx
var import_activePlayers = require_server_stub();
var import_app = require_server_stub();
var import_field = require_server_stub();
var import_levels2 = require_server_stub();
var import_user2 = require_server_stub();

// src/devvit/components/DialogBeatGame.tsx
function DialogBeatGame(props, ctx) {
  return /* @__PURE__ */ Devvit.createElement(
    Dialog,
    {
      onPress: () => ctx.ui.navigateTo(config2.leaderboard.url),
      ...props,
      buttonLabel: localize("beat-game-dialog-button-label")
    },
    /* @__PURE__ */ Devvit.createElement(
      BorderedContainer,
      {
        height: 180,
        width: 256,
        ...props,
        lines: true,
        padding: "none",
        backgroundColor: cssHex(paletteBlack),
        borderColor: cssHex(levelHighlightColor[props.level])
      },
      /* @__PURE__ */ Devvit.createElement("vstack", { height: "100%", width: "100%", alignment: "center middle" }, /* @__PURE__ */ Devvit.createElement("spacer", { height: "16px" }), localize("beat-game-dialog").split(lineBreakToken).map((copy) => /* @__PURE__ */ Devvit.createElement(
        PixelText,
        {
          key: copy,
          ...props,
          size: fontMSize,
          color: cssHex(levelHighlightColor[props.level])
        },
        copy
      )) ?? null, /* @__PURE__ */ Devvit.createElement("spacer", { height: "16px" }))
    ),
    /* @__PURE__ */ Devvit.createElement("spacer", { grow: true }),
    /* @__PURE__ */ Devvit.createElement(PixelText, { ...props, size: fontSSize, color: cssHex(paletteWhite) }, localize("beat-game-dialog-metadata")),
    /* @__PURE__ */ Devvit.createElement("spacer", { grow: true })
  );
}

// src/devvit/components/DialogEnded.tsx
function DialogEnded(props) {
  return /* @__PURE__ */ Devvit.createElement(
    Dialog,
    {
      ...props,
      button: false,
      marketingLabel: localize("ended-dialog-footer")
    },
    /* @__PURE__ */ Devvit.createElement(
      BorderedContainer,
      {
        height: 128,
        width: 256,
        ...props,
        lines: true,
        backgroundColor: cssHex(paletteBlack),
        borderColor: cssHex(levelHighlightColor[props.level])
      },
      /* @__PURE__ */ Devvit.createElement(
        PixelText,
        {
          ...props,
          size: fontLSize,
          color: cssHex(levelHighlightColor[props.level])
        },
        localize("ended-dialog-title")
      ),
      /* @__PURE__ */ Devvit.createElement("spacer", { height: "4px" }),
      /* @__PURE__ */ Devvit.createElement(
        PixelText,
        {
          ...props,
          size: fontMSize,
          color: cssHex(levelHighlightColor[props.level])
        },
        localize("ended-dialog-subtitle")
      )
    ),
    /* @__PURE__ */ Devvit.createElement("spacer", { grow: true }),
    localize("ended-dialog-metadata").split(lineBreakToken).map((line) => /* @__PURE__ */ Devvit.createElement(
      PixelText,
      {
        key: line,
        size: fontMSize,
        color: cssHex(paletteWhite),
        ...props
      },
      line
    )),
    /* @__PURE__ */ Devvit.createElement("spacer", { grow: true })
  );
}

// src/devvit/components/DialogError.tsx
function DialogError(props) {
  return /* @__PURE__ */ Devvit.createElement(Dialog, { ...props, marketing: false, onPress: props.onPress }, /* @__PURE__ */ Devvit.createElement(
    BorderedContainer,
    {
      height: 200,
      width: 256,
      ...props,
      lines: true,
      backgroundColor: cssHex(paletteBlack),
      borderColor: cssHex(levelHighlightColor[props.level])
    },
    localize("error-dialog").split(lineBreakToken).map((copy) => /* @__PURE__ */ Devvit.createElement(
      PixelText,
      {
        ...props,
        key: copy,
        size: fontMSize,
        color: cssHex(levelHighlightColor[props.level])
      },
      copy
    )) ?? null
  ));
}

// src/devvit/components/DialogHowToPlay.tsx
function DialogHowToPlay(props) {
  const width = 256;
  const height = 200;
  const resolution = 2;
  return /* @__PURE__ */ Devvit.createElement(
    Dialog,
    {
      ...props,
      buttonLabel: localize("how-to-play-dialog-button-label")
    },
    /* @__PURE__ */ Devvit.createElement(
      BorderedContainer,
      {
        height: 200,
        width: 256,
        ...props,
        backgroundColor: cssHex(paletteBlack),
        borderColor: cssHex(levelHighlightColor[props.level]),
        padding: "none",
        lines: true
      },
      /* @__PURE__ */ Devvit.createElement("vstack", { height: "100%", width: "100%", alignment: "center middle" }, /* @__PURE__ */ Devvit.createElement(
        "image",
        {
          imageWidth: `${width * resolution}px`,
          imageHeight: `${height * resolution}px`,
          height: `${height}px`,
          width: `${width}px`,
          description: "How to play illustration: 1. Click a cell to select. 2. Click the claim button. 3. Win?",
          resizeMode: "fill",
          url: "how-to-play-illustration.png"
        }
      ))
    )
  );
}

// src/devvit/components/DialogNotAllowed.tsx
function DialogNotAllowed(props) {
  return /* @__PURE__ */ Devvit.createElement(Dialog, { ...props, button: false, marketing: false }, /* @__PURE__ */ Devvit.createElement(
    BorderedContainer,
    {
      height: 200,
      width: 256,
      ...props,
      lines: true,
      backgroundColor: cssHex(paletteBlack),
      borderColor: cssHex(levelHighlightColor[props.level])
    },
    localize("not-allowed-dialog").split(lineBreakToken).map((copy) => /* @__PURE__ */ Devvit.createElement(
      PixelText,
      {
        key: copy,
        ...props,
        size: fontLSize,
        color: cssHex(levelHighlightColor[props.level])
      },
      copy
    )) ?? null
  ));
}

// src/devvit/components/DialogUnauthorized.tsx
function DialogUnauthorized(props, ctx) {
  const words = localize("unauthorized-dialog-button-label").split(" ");
  const tokenIndex = words.findIndex(
    (word) => word.startsWith(variableStartToken)
  );
  const buttonLabel = [
    ...words.slice(0, tokenIndex),
    `r/${levelPascalCase[props.currentLevel]}`,
    ...words.slice(tokenIndex + 1)
  ].join(" ");
  return /* @__PURE__ */ Devvit.createElement(
    Dialog,
    {
      onPress: () => ctx.ui.navigateTo(props.redirectURL),
      ...props,
      buttonLabel
    },
    /* @__PURE__ */ Devvit.createElement(
      BorderedContainer,
      {
        height: 180,
        width: 256,
        ...props,
        lines: true,
        padding: "none",
        backgroundColor: cssHex(paletteBlack),
        borderColor: cssHex(levelHighlightColor[props.level])
      },
      /* @__PURE__ */ Devvit.createElement("vstack", { height: "100%", width: "100%", alignment: "center middle" }, /* @__PURE__ */ Devvit.createElement("spacer", { height: "16px" }), localize(`unauthorized-dialog-level-${props.level}`).split(lineBreakToken).map((copy) => /* @__PURE__ */ Devvit.createElement(
        PixelText,
        {
          key: copy,
          ...props,
          size: fontMSize,
          color: cssHex(levelHighlightColor[props.level])
        },
        copy
      )) ?? null, /* @__PURE__ */ Devvit.createElement("spacer", { height: "16px" }))
    ),
    /* @__PURE__ */ Devvit.createElement("spacer", { height: "4px" }),
    /* @__PURE__ */ Devvit.createElement("spacer", { grow: true }),
    /* @__PURE__ */ Devvit.createElement(PixelText, { ...props, size: fontSSize, color: cssHex(paletteWhite) }, localize("unauthorized-dialog-metadata")),
    /* @__PURE__ */ Devvit.createElement("spacer", { grow: true })
  );
}

// src/devvit/components/DialogUnsupportedClient.tsx
function DialogUnsupportedClient(props, ctx) {
  const sharedProps = {
    size: fontMSize,
    color: cssHex(levelHighlightColor[props.level]),
    ...props
  };
  return /* @__PURE__ */ Devvit.createElement(
    Dialog,
    {
      ...props,
      marketing: false,
      buttonLabel: localize("unsupported-client-dialog-button-label"),
      onPress: () => {
        const upgradeLink = getUpgradeLinkForPlatform2(props.platform);
        if (upgradeLink) {
          ctx.ui.navigateTo(upgradeLink);
        }
      }
    },
    /* @__PURE__ */ Devvit.createElement(
      BorderedContainer,
      {
        height: 200,
        width: 256,
        ...props,
        lines: true,
        backgroundColor: cssHex(paletteBlack),
        borderColor: cssHex(levelHighlightColor[props.level])
      },
      localize("unsupported-client-dialog").split(lineBreakToken).map((copy) => /* @__PURE__ */ Devvit.createElement(PixelText, { key: copy, ...sharedProps }, copy)) ?? null
    )
  );
}

// src/devvit/components/DialogVerifyEmail.tsx
function DialogVerifyEmail(props) {
  return /* @__PURE__ */ Devvit.createElement(
    Dialog,
    {
      ...props,
      buttonLabel: localize("verify-email-dialog-button-label"),
      marketing: false
    },
    /* @__PURE__ */ Devvit.createElement(
      BorderedContainer,
      {
        height: 200,
        width: 256,
        ...props,
        lines: true,
        backgroundColor: cssHex(paletteBlack),
        borderColor: cssHex(levelHighlightColor[props.level])
      },
      localize("verify-email-dialog").split(lineBreakToken).map((copy) => /* @__PURE__ */ Devvit.createElement(
        PixelText,
        {
          key: copy,
          ...props,
          size: fontMSize,
          color: cssHex(levelHighlightColor[props.level])
        },
        copy
      )) ?? null
    )
  );
}

// src/shared/format.ts
function abbreviateNumber(value) {
  if (value >= 1e9) {
    return `${(value / 1e9).toFixed(1)}B`;
  }
  if (value >= 1e6) {
    return `${(value / 1e6).toFixed(1)}M`;
  }
  if (value >= 1e3) {
    return `${(value / 1e3).toFixed(1)}K`;
  }
  return value.toString();
}
function hydrateString(string, data) {
  return string.replace(/{(.*?)}/g, (match, token) => {
    return data[token] || match;
  });
}

// src/shared/svg-factories/createTeamBadgeBackground.ts
function createTeamBadgeBackground(team, width) {
  const height = 38;
  const background = `<path d="M3 9h3v-3h3v-3h${width - 18}v3h3v3h3v20h-3v3h-3v3h-${width - 18}v-3h-3v-3h-3v-20Z" fill="${cssHex(teamColor[team])}" />`;
  const highlight = `<path d="M3 9h3v-3h3v-3h${width - 18}v3h3v3h3v20h-3v3h-3v3h-${width - 18}v-3h-3v-3h-3v-20ZM6 12h3v-3h3v-3h${width - 24}v3h3v3h3v14h-3v3h-3v3h-${width - 24}v-3h-3v-3h-3v-14Z" fill="${cssHex(paletteTint60)}" fill-rule="evenodd" clip-rule="evenodd" />`;
  const shadow = `<path d="M12 35h${width - 21}v-3h3v-3h3v-17h3v20h-3v3h-3v3h-${width - 18}" fill="${cssHex(paletteBlack)}" />`;
  const drawOrder = [background, highlight, shadow];
  return `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">${drawOrder.join("")}</svg>`;
}

// src/devvit/components/TeamBadge.tsx
function TeamBadge(props) {
  const MARGIN = 20;
  const TEXT_SIZE = 16;
  const CAP_WIDTH2 = 12;
  const teamName = teamTitleCase[props.team].toUpperCase();
  const textWidth = getBoundingBoxWidth(teamName, TEXT_SIZE);
  const width = Math.ceil(textWidth + MARGIN * 2 + CAP_WIDTH2 * 2);
  const height = 38;
  return /* @__PURE__ */ Devvit.createElement("zstack", { alignment: "center middle" }, /* @__PURE__ */ Devvit.createElement(
    "image",
    {
      imageWidth: width * props.pixelRatio,
      imageHeight: height * props.pixelRatio,
      width: `${width}px`,
      height: `${height}px`,
      resizeMode: "fill",
      description: "Team Badge Background",
      url: svg`${createTeamBadgeBackground(props.team, width)}`
    }
  ), /* @__PURE__ */ Devvit.createElement(PixelText, { ...props, size: TEXT_SIZE, color: cssHex(paletteWhite) }, teamName));
}

// src/devvit/components/DialogWelcome.tsx
function DialogWelcome(props) {
  const levelName = levelPascalCase[props.level];
  const opponentTeams = [0, 1, 2, 3].filter(
    (team) => team !== props.team
  );
  return /* @__PURE__ */ Devvit.createElement(
    Dialog,
    {
      ...props,
      buttonLabel: props.level === 0 ? localize("welcome-dialog-button-label-first") : hydrateString(localize("welcome-dialog-button-label-subsequent"), {
        rSlashSubredditName: `r/${levelName}`
      })
    },
    /* @__PURE__ */ Devvit.createElement(
      BorderedContainer,
      {
        height: 72,
        width: 256,
        ...props,
        lines: true,
        backgroundColor: cssHex(paletteBlack),
        borderColor: cssHex(levelHighlightColor[props.level])
      },
      /* @__PURE__ */ Devvit.createElement(
        PixelText,
        {
          ...props,
          size: fontMSize,
          color: cssHex(levelHighlightColor[props.level])
        },
        localize("welcome-dialog-greeting")
      ),
      /* @__PURE__ */ Devvit.createElement(
        PixelText,
        {
          ...props,
          size: 22,
          color: cssHex(levelHighlightColor[props.level])
        },
        `r/${levelName}`
      )
    ),
    /* @__PURE__ */ Devvit.createElement("spacer", { grow: true }),
    props.level === 0 && /* @__PURE__ */ Devvit.createElement(Devvit.Fragment, null, localize("welcome-dialog-team-allocation").split(lineBreakToken).map((line) => /* @__PURE__ */ Devvit.createElement(
      PixelText,
      {
        key: line,
        size: fontSSize,
        color: cssHex(paletteWhite),
        ...props
      },
      line
    )), /* @__PURE__ */ Devvit.createElement("spacer", { grow: true }), /* @__PURE__ */ Devvit.createElement(TeamBadge, { ...props }), /* @__PURE__ */ Devvit.createElement("spacer", { grow: true }), /* @__PURE__ */ Devvit.createElement(PixelText, { size: fontSSize, color: cssHex(paletteWhite), ...props }, localize("welcome-dialog-team-overview")), /* @__PURE__ */ Devvit.createElement("hstack", null, /* @__PURE__ */ Devvit.createElement(
      PixelText,
      {
        size: fontSSize,
        color: cssHex(teamColor[opponentTeams[0]]),
        ...props
      },
      teamTitleCase[opponentTeams[0]].toUpperCase()
    ), /* @__PURE__ */ Devvit.createElement(PixelText, { size: fontSSize, color: cssHex(paletteWhite), ...props }, ", "), /* @__PURE__ */ Devvit.createElement(
      PixelText,
      {
        size: fontSSize,
        color: cssHex(teamColor[opponentTeams[1]]),
        ...props
      },
      teamTitleCase[opponentTeams[1]].toUpperCase()
    ), /* @__PURE__ */ Devvit.createElement(PixelText, { size: fontSSize, color: cssHex(paletteWhite), ...props }, ", & "), /* @__PURE__ */ Devvit.createElement(
      PixelText,
      {
        size: fontSSize,
        color: cssHex(teamColor[opponentTeams[2]]),
        ...props
      },
      teamTitleCase[opponentTeams[2]].toUpperCase()
    ))),
    props.level > 0 && /* @__PURE__ */ Devvit.createElement(Devvit.Fragment, null, /* @__PURE__ */ Devvit.createElement("spacer", { size: "small" }), /* @__PURE__ */ Devvit.createElement("vstack", { width: "100%", alignment: "center middle" }, hydrateString(localize("welcome-dialog-rules"), {
      rSlashSubredditName: `r/${levelPascalCase[props.level - 1]}`
    }).split(lineBreakToken).map((line) => /* @__PURE__ */ Devvit.createElement(
      PixelText,
      {
        key: line,
        size: fontMSize,
        color: cssHex(paletteWhite),
        ...props
      },
      line
    )))),
    /* @__PURE__ */ Devvit.createElement("spacer", { grow: true })
  );
}

// src/shared/beatTheGame.ts
var MAX_GLOBAL_POINTS = 69;
var didUserBeatTheGame = (profile) => {
  return profile.globalPointCount > 0 && profile.globalPointCount < MAX_GLOBAL_POINTS && !profile.newGamePlusAt || profile.globalPointCount >= MAX_GLOBAL_POINTS;
};

// src/devvit/components/LeaderboardController.tsx
var import_globalStats = require_server_stub();
var import_leaderboard = require_server_stub();
var import_levels = require_server_stub();
var import_user = require_server_stub();

// src/devvit/components/StatTile.tsx
function StatTile(props) {
  return /* @__PURE__ */ Devvit.createElement(
    "vstack",
    {
      width: "33.332%",
      height: "52px",
      backgroundColor: cssHex(paletteBlack),
      alignment: "center middle",
      border: "thin",
      borderColor: cssHex(paletteFieldLight)
    },
    /* @__PURE__ */ Devvit.createElement(
      PixelText,
      {
        pixelRatio: props.pixelRatio,
        size: fontLSize,
        color: cssHex(paletteFieldLight)
      },
      abbreviateNumber(props.value)
    ),
    /* @__PURE__ */ Devvit.createElement(
      PixelText,
      {
        pixelRatio: props.pixelRatio,
        size: fontSSize,
        color: cssHex(paletteFieldLight)
      },
      props.label
    )
  );
}

// src/devvit/components/TeamTile.tsx
function TeamTile(props) {
  return /* @__PURE__ */ Devvit.createElement(
    "vstack",
    {
      width: "25%",
      height: "52px",
      backgroundColor: props.color,
      alignment: "center middle",
      key: props.key ?? props.label
    },
    /* @__PURE__ */ Devvit.createElement(PixelText, { ...props, size: fontLSize, color: cssHex(paletteBlack) }, abbreviateNumber(props.value)),
    /* @__PURE__ */ Devvit.createElement(PixelText, { ...props, size: fontSSize, color: cssHex(paletteBlack) }, props.label)
  );
}

// src/devvit/components/LeaderboardView.tsx
function LeaderboardView(props) {
  const standings = props.standings?.sort((a, b) => a.member - b.member) ?? [
    { member: 0, score: 0 },
    { member: 1, score: 0 },
    { member: 2, score: 0 },
    { member: 3, score: 0 }
  ];
  return /* @__PURE__ */ Devvit.createElement(
    "vstack",
    {
      height: "100%",
      width: "100%",
      backgroundColor: cssHex(paletteConsole),
      padding: "medium"
    },
    /* @__PURE__ */ Devvit.createElement(
      "vstack",
      {
        height: "100%",
        width: "100%",
        padding: "medium",
        border: "thin",
        borderColor: cssHex(paletteBlack),
        cornerRadius: "medium",
        alignment: "center middle"
      },
      /* @__PURE__ */ Devvit.createElement(
        "image",
        {
          imageHeight: "264px",
          imageWidth: "900px",
          width: "100%",
          height: "60px",
          description: "r/Field Logo",
          url: "field-logo-dark.png",
          resizeMode: "fit"
        }
      ),
      /* @__PURE__ */ Devvit.createElement("spacer", { height: "32px" }),
      props.showPlayButton ? /* @__PURE__ */ Devvit.createElement(Devvit.Fragment, null, /* @__PURE__ */ Devvit.createElement(StyledButton, { width: 256, ...props, onPress: props.onPlay }, "Play r/Field"), /* @__PURE__ */ Devvit.createElement("spacer", { height: "32px" })) : /* @__PURE__ */ Devvit.createElement(Devvit.Fragment, null, /* @__PURE__ */ Devvit.createElement(
        StyledButton,
        {
          pixelRatio: props.pixelRatio,
          width: 256,
          color: cssHex(paletteWhite),
          onPress: props.onSubscribe
        },
        "Join r/GamesOnReddit"
      ), /* @__PURE__ */ Devvit.createElement("spacer", { height: "32px" })),
      /* @__PURE__ */ Devvit.createElement(
        PixelText,
        {
          ...props,
          size: fontMSize,
          color: cssHex(paletteWhite),
          underline: true
        },
        localize("leaderboard-teams-header")
      ),
      /* @__PURE__ */ Devvit.createElement("spacer", { height: "8px" }),
      /* @__PURE__ */ Devvit.createElement("hstack", { width: "100%", gap: "small", alignment: "center" }, standings.map((team) => /* @__PURE__ */ Devvit.createElement(
        TeamTile,
        {
          ...props,
          label: teamTitleCase[team.member],
          value: team.score,
          color: cssHex(teamColor[team.member]),
          key: `team-${team.member}`
        }
      ))),
      /* @__PURE__ */ Devvit.createElement("spacer", { height: "32px" }),
      /* @__PURE__ */ Devvit.createElement(
        PixelText,
        {
          ...props,
          size: fontMSize,
          color: cssHex(paletteWhite),
          underline: true
        },
        localize("leaderboard-stats-header")
      ),
      /* @__PURE__ */ Devvit.createElement("spacer", { height: "8px" }),
      /* @__PURE__ */ Devvit.createElement("hstack", { width: "100%", gap: "small", alignment: "center" }, /* @__PURE__ */ Devvit.createElement(
        StatTile,
        {
          ...props,
          label: localize("leaderboard-stats-players"),
          value: props.players ?? 0
        }
      ), /* @__PURE__ */ Devvit.createElement(
        StatTile,
        {
          ...props,
          label: localize("leaderboard-stats-bans"),
          value: props.bans ?? 0
        }
      ), /* @__PURE__ */ Devvit.createElement(
        StatTile,
        {
          ...props,
          label: localize("leaderboard-stats-fields"),
          value: props.fields ?? 0
        }
      ))
    )
  );
}

// src/devvit/components/DialogWinner.tsx
function DialogWinner(props, ctx) {
  return /* @__PURE__ */ Devvit.createElement(
    Dialog,
    {
      ...props,
      marketingLabel: localize("winner-dialog-footer"),
      buttonLabel: "Play more games",
      onPress: () => {
        ctx.ui.navigateTo(config2.leaderboard.url);
      }
    },
    /* @__PURE__ */ Devvit.createElement(
      BorderedContainer,
      {
        height: 80,
        width: 256,
        ...props,
        lines: true,
        backgroundColor: cssHex(paletteBlack),
        borderColor: cssHex(levelHighlightColor[props.level])
      },
      /* @__PURE__ */ Devvit.createElement(
        PixelText,
        {
          ...props,
          size: fontLSize,
          color: cssHex(levelHighlightColor[props.level])
        },
        localize("winner-dialog-title")
      )
    ),
    /* @__PURE__ */ Devvit.createElement("spacer", { height: "4px" }),
    /* @__PURE__ */ Devvit.createElement("spacer", { grow: true }),
    localize("winner-dialog-metadata-1").split(lineBreakToken).map((line) => /* @__PURE__ */ Devvit.createElement(
      PixelText,
      {
        key: line,
        size: fontSSize,
        color: cssHex(paletteWhite),
        ...props
      },
      line
    )),
    /* @__PURE__ */ Devvit.createElement("spacer", { grow: true }),
    /* @__PURE__ */ Devvit.createElement(TeamBadge, { ...props }),
    /* @__PURE__ */ Devvit.createElement("spacer", { grow: true }),
    localize("winner-dialog-metadata-2").split(lineBreakToken).map((line) => /* @__PURE__ */ Devvit.createElement(
      PixelText,
      {
        key: line,
        size: fontSSize,
        color: cssHex(paletteWhite),
        ...props
      },
      line
    )),
    /* @__PURE__ */ Devvit.createElement("spacer", { grow: true })
  );
}

// src/shared/svg-factories/footerSettings.ts
var CAP_HEIGHT = 108;
var CAP_WIDTH = 48;
var MIDDLE_WIDTH = 1048;
var RADIUS = 8;
var STROKE_WEIGHT = 1;
var TITLE_NOTCH_WIDTH = 128;
var TITLE_NOTCH_HEIGHT = 16;
var HALF_STROKE = STROKE_WEIGHT / 2;

// src/shared/svg-factories/createFooterEnd.ts
function createFooterEnd() {
  const shadow = [
    "M0,8",
    `H${CAP_WIDTH - RADIUS - 8}`,
    `Q${CAP_WIDTH - 8},8 ${CAP_WIDTH - 8},${8 + RADIUS}`,
    `V${84 - RADIUS}`,
    `Q${CAP_WIDTH - 8},${84} ${CAP_WIDTH - RADIUS - 8},${84}`,
    "H0"
  ];
  const bottomTint = [
    "M0,16",
    `H${CAP_WIDTH - RADIUS - 16}`,
    `Q${CAP_WIDTH - 16},16 ${CAP_WIDTH - 16},${16 + RADIUS}`,
    `V${100 - RADIUS}`,
    `Q${CAP_WIDTH - 16},${100} ${CAP_WIDTH - RADIUS - 16},${100}`,
    "H0"
  ];
  const insetContainer = [
    "M0,8",
    `H${CAP_WIDTH - RADIUS - 8}`,
    `Q${CAP_WIDTH - 8},8 ${CAP_WIDTH - 8},${8 + RADIUS}`,
    `V${76 - RADIUS}`,
    `Q${CAP_WIDTH - 8},${76} ${CAP_WIDTH - RADIUS - 8},${76}`,
    "H0"
  ];
  return `<svg width="${CAP_WIDTH}" height="${CAP_HEIGHT}" viewBox="0 0 ${CAP_WIDTH} ${CAP_HEIGHT}" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="${shadow.join("")}" fill="${cssHex(paletteShade19)}" /><path d="${bottomTint.join("")}" fill="${cssHex(paletteBlack)}" /><path d="${insetContainer.join("")}" stroke-width="1" stroke="${cssHex(paletteBlack)}" fill="${cssHex(paletteConsole)}" /></svg>`;
}

// src/shared/svg-factories/createFooterMiddle.ts
function createLeftTextureLine(x, y) {
  return `M${x},${y}h-8m-3,0h-3m-3,0h-8m-8,0h-3m-3,0h-8m-3,0h-3m-3,0h-8m-8,0h-8m-3,0h-3m-3,0h-3m-8,0h-3m-3,0h-8m-3,0h-3m-3,0h-3m-3,0h-16`;
}
function createRightTextureLine(x, y) {
  return `M${x},${y}h8m3,0h3m8,0h3m3,0h8m8,0h8m3,0h8m3,0h3m3,0h3m8,0h3m3,0h3m8,0h3m3,0h3m3,0h3m8,0h22`;
}
function createFooterMiddle() {
  const mid = MIDDLE_WIDTH / 2;
  const bottomTint = ["M0,76", `H${MIDDLE_WIDTH}`, "V100", "H0"];
  const insetContainer = [
    "M0,8",
    `H${MIDDLE_WIDTH}`,
    `M${CAP_WIDTH},76`,
    `H${MIDDLE_WIDTH}`
  ];
  const wingsDark = [
    "M0,16",
    `H${mid - TITLE_NOTCH_WIDTH / 2 - RADIUS}`,
    "M0,21",
    `H${mid - TITLE_NOTCH_WIDTH / 2 - RADIUS}`,
    `M${mid + TITLE_NOTCH_WIDTH / 2 + RADIUS},16`,
    `H${MIDDLE_WIDTH}`,
    `M${mid + TITLE_NOTCH_WIDTH / 2 + RADIUS},21`,
    `H${MIDDLE_WIDTH}`
  ];
  const wingsLight = [
    "M0,17",
    `H${mid - TITLE_NOTCH_WIDTH / 2 - RADIUS}`,
    "M0,22",
    `H${mid - TITLE_NOTCH_WIDTH / 2 - RADIUS}`,
    `M${mid + TITLE_NOTCH_WIDTH / 2 + RADIUS},17`,
    `H${MIDDLE_WIDTH}`,
    `M${mid + TITLE_NOTCH_WIDTH / 2 + RADIUS},22`,
    `H${MIDDLE_WIDTH}`
  ];
  const titleNotch = [
    `M${mid - TITLE_NOTCH_WIDTH / 2},${HALF_STROKE + 8}`,
    `L${mid - TITLE_NOTCH_WIDTH / 2 + TITLE_NOTCH_HEIGHT},${HALF_STROKE + 8 + TITLE_NOTCH_HEIGHT}`,
    `H${mid + TITLE_NOTCH_WIDTH / 2 - TITLE_NOTCH_HEIGHT}`,
    `L${mid + TITLE_NOTCH_WIDTH / 2},${HALF_STROKE + 8}`
  ];
  const cx1 = mid - TITLE_NOTCH_WIDTH / 2;
  const cx2 = mid + TITLE_NOTCH_WIDTH / 2;
  const logoNotch = [
    `M${cx1 - RADIUS},${76}`,
    `C${cx1 - RADIUS / 2},${76} ${cx1 - RADIUS / 2},${76 - 12} ${cx1 + RADIUS},${76 - 12}`,
    // First Bezier curve (smooth curve to the left)
    `H${cx2 - RADIUS}`,
    // Horizontal line before the second curve
    `C${cx2 + RADIUS / 2},${76 - 12} ${cx2 + RADIUS / 2},${76} ${cx2 + RADIUS},${76}`,
    // Second Bezier curve (smooth curve to the right)
    `H${cx2 + RADIUS}`,
    "Z"
  ];
  const bottomRidgeTop = [
    `M0,${84}`,
    `H${cx1 - RADIUS}`,
    // Horizontal line before the first curve
    `C${cx1 - RADIUS / 2},${84} ${cx1 - RADIUS / 2},${84 + 12} ${cx1 + RADIUS},${84 + 12}`,
    // First Bezier curve (smooth downward curve to the left)
    `H${cx2 - RADIUS}`,
    // Horizontal line before the second curve
    `C${cx2 + RADIUS / 2},${84 + 12} ${cx2 + RADIUS / 2},${84} ${cx2 + RADIUS},${84}`,
    // Second Bezier curve (smooth downward curve to the right)
    `H${MIDDLE_WIDTH}`
    // Final horizontal line
  ];
  const bottomRidgeBottom = [
    `M0,${85}`,
    `H${cx1 - 1 - RADIUS}`,
    // Horizontal line before the first curve
    `C${cx1 - 1},${85} ${cx1 - 1},${85 + 12} ${cx1 - 1 + RADIUS},${85 + 12}`,
    // First Bezier curve (smooth downward curve to the left)
    `H${cx2 + 1 - RADIUS}`,
    // Horizontal line before the second curve
    `C${cx2 + 1},${85 + 12} ${cx2 + 1},${85} ${cx2 + 1 + RADIUS},${85}`,
    // Second Bezier curve (smooth downward curve to the right)
    `H${MIDDLE_WIDTH}`
    // Final horizontal line
  ];
  return `<svg width="${MIDDLE_WIDTH}" height="${CAP_HEIGHT}" viewBox="0 0 ${MIDDLE_WIDTH} ${CAP_HEIGHT}" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="${cssHex(paletteConsole)}" /><path d="${titleNotch.join("")}${bottomTint.join("")}${logoNotch.join("")}" fill="${cssHex(paletteBlack)}" /><path d="${insetContainer.join("")}${createRightTextureLine(cx2 + 16, 69)}${createLeftTextureLine(cx1 - 16, 69)}" stroke-width="1" stroke="${cssHex(paletteBlack)}" fill="none" /><path d="${wingsDark.join("")}" stroke-width="1" stroke="${cssHex(paletteShade80)}" fill="none" /><path d="${wingsLight.join("")}${bottomRidgeTop.join("")}${createRightTextureLine(cx2 + 16, 68)}${createLeftTextureLine(cx1 - 16, 68)}" stroke-width="1" stroke="${cssHex(paletteTint19)}" fill="none" /><path d="${bottomRidgeBottom.join("")}" stroke-width="1" stroke="${cssHex(paletteTint6)}" fill="none" /></svg>`;
}

// src/shared/svg-factories/createFooterStart.ts
function createFooterStart() {
  const shadow = [
    `M${CAP_WIDTH},8`,
    `H${8 + RADIUS}`,
    `Q8,8 8,${8 + RADIUS}`,
    `V${84 - RADIUS}`,
    `Q8,${84} ${8 + RADIUS},${84}`,
    `H${CAP_WIDTH}`
  ];
  const bottomTint = [
    `M${CAP_WIDTH},16`,
    `H${16 + RADIUS}`,
    `Q16,16 16,${16 + RADIUS}`,
    `V${100 - RADIUS}`,
    `Q16,${100} ${16 + RADIUS},${100}`,
    `H${CAP_WIDTH}`
  ];
  const insetContainer = [
    `M${CAP_WIDTH},8`,
    `H${8 + RADIUS}`,
    `Q8,8 8,${8 + RADIUS}`,
    `V${76 - RADIUS}`,
    `Q8,${76} ${8 + RADIUS},${76}`,
    `H${CAP_WIDTH}`
  ];
  return `<svg width="${CAP_WIDTH}" height="${CAP_HEIGHT}" viewBox="0 0 ${CAP_WIDTH} ${CAP_HEIGHT}" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="${shadow.join("")}" fill="${cssHex(paletteShade19)}" /><path d="${bottomTint.join("")}" fill="${cssHex(paletteBlack)}" /><path d="${insetContainer.join("")}" stroke-width="1" stroke="${cssHex(paletteBlack)}" fill="${cssHex(paletteConsole)}" /></svg>`;
}

// src/shared/svg-factories/createPersonIcon.ts
function createPersonIcon(team) {
  return `<svg viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 0H8V1H9V5H8V6H4V5H3V1H4V0Z M1 7H11V8H12V12H0V8H1V7Z" fill="${cssHex(teamColor[team])}"/></svg>`;
}

// src/devvit/components/game-screen/Footer.tsx
function Footer(props, context) {
  const teamHeight = 28;
  const teamHeightString = `${teamHeight}px`;
  const teamGap = 12;
  const background = /* @__PURE__ */ Devvit.createElement("hstack", { height: "100%", width: "100%" }, /* @__PURE__ */ Devvit.createElement(
    "image",
    {
      imageWidth: CAP_WIDTH * props.pixelRatio,
      imageHeight: CAP_HEIGHT * props.pixelRatio,
      width: `${CAP_WIDTH}px`,
      height: `${CAP_HEIGHT}px`,
      resizeMode: "fill",
      url: svg`${createFooterStart()}`
    }
  ), /* @__PURE__ */ Devvit.createElement("zstack", { grow: true, height: "100%", alignment: "center middle" }, /* @__PURE__ */ Devvit.createElement(
    "image",
    {
      imageWidth: MIDDLE_WIDTH * props.pixelRatio,
      imageHeight: CAP_HEIGHT * props.pixelRatio,
      width: `${MIDDLE_WIDTH}px`,
      height: `${CAP_HEIGHT}px`,
      resizeMode: "fill",
      url: svg`${createFooterMiddle()}`
    }
  )), /* @__PURE__ */ Devvit.createElement(
    "image",
    {
      imageWidth: CAP_WIDTH * props.pixelRatio,
      imageHeight: CAP_HEIGHT * props.pixelRatio,
      width: `${CAP_WIDTH}px`,
      height: `${CAP_HEIGHT}px`,
      resizeMode: "fill",
      url: svg`${createFooterEnd()}`
    }
  ));
  return /* @__PURE__ */ Devvit.createElement(
    "zstack",
    {
      width: "100%",
      height: `${CAP_HEIGHT}px`,
      alignment: "center middle",
      onPress: props.onPress
    },
    background,
    /* @__PURE__ */ Devvit.createElement("vstack", { width: "100%", height: "100%", alignment: "center top" }, /* @__PURE__ */ Devvit.createElement("spacer", { width: "8px" }), /* @__PURE__ */ Devvit.createElement(
      "vstack",
      {
        height: `${TITLE_NOTCH_HEIGHT}px`,
        width: "100%",
        alignment: "center middle"
      },
      /* @__PURE__ */ Devvit.createElement(PixelText, { ...props, size: 12, color: cssHex(paletteWhite) }, localize("point-claim-scoreboard-title"))
    ), /* @__PURE__ */ Devvit.createElement("spacer", { height: "6px" }), /* @__PURE__ */ Devvit.createElement(
      "hstack",
      {
        width: "100%",
        height: teamHeightString,
        alignment: "center middle"
      },
      /* @__PURE__ */ Devvit.createElement("spacer", { width: "24px" }),
      /* @__PURE__ */ Devvit.createElement("hstack", { grow: true, maxWidth: `${420 + teamGap}px` }, props.scores.sort((a, b) => a.member - b.member).map(({ member, score }) => /* @__PURE__ */ Devvit.createElement("hstack", { key: `team-score-${member}`, width: "25%" }, /* @__PURE__ */ Devvit.createElement("spacer", { width: `${teamGap / 2}px` }), /* @__PURE__ */ Devvit.createElement(
        "vstack",
        {
          grow: true,
          height: teamHeightString,
          border: "thick",
          borderColor: cssHex(paletteShade50),
          backgroundColor: cssHex(teamColor[member])
        },
        /* @__PURE__ */ Devvit.createElement(
          "hstack",
          {
            width: "100%",
            height: "100%",
            alignment: "center middle",
            border: "thick",
            borderColor: cssHex(paletteShade50)
          },
          props.team === member && /* @__PURE__ */ Devvit.createElement(
            "hstack",
            {
              height: "100%",
              alignment: "center middle",
              backgroundColor: cssHex(paletteShade50)
            },
            /* @__PURE__ */ Devvit.createElement("spacer", { width: "4px" }),
            /* @__PURE__ */ Devvit.createElement(
              "image",
              {
                imageHeight: 12 * props.pixelRatio,
                imageWidth: 12 * props.pixelRatio,
                width: "12px",
                height: "12px",
                url: svg`${createPersonIcon(props.team)}`
              }
            ),
            /* @__PURE__ */ Devvit.createElement("spacer", { width: "8px" })
          ),
          /* @__PURE__ */ Devvit.createElement("spacer", { grow: true }),
          /* @__PURE__ */ Devvit.createElement(
            PixelText,
            {
              ...props,
              size: fontMSize,
              color: cssHex(paletteBlack)
            },
            abbreviateNumber(score)
          ),
          /* @__PURE__ */ Devvit.createElement("spacer", { grow: true })
        )
      ), /* @__PURE__ */ Devvit.createElement("spacer", { width: `${teamGap / 2}px` })))),
      /* @__PURE__ */ Devvit.createElement("spacer", { width: "24px" })
    ), /* @__PURE__ */ Devvit.createElement("spacer", { height: "6px" }), /* @__PURE__ */ Devvit.createElement(
      "image",
      {
        imageWidth: 128 * props.pixelRatio,
        imageHeight: 29 * props.pixelRatio,
        width: `${128}px`,
        height: `${29}px`,
        description: "r/GamesOnReddit Button",
        url: `gor-button-${props.claimed ? "enabled" : "disabled"}.png`,
        onPress: () => context.ui.navigateTo(config2.leaderboard.url)
      }
    ))
  );
}

// src/devvit/components/game-screen/Header.tsx
function Header2(props) {
  const borderColor = cssHex(paletteField);
  const CAP_HEIGHT2 = 48;
  const CAP_WIDTH2 = 48;
  const RADIUS2 = 8;
  const leftCapSegments = [
    `M${CAP_HEIGHT2},0`,
    `H${RADIUS2}`,
    `Q0,0 0,${RADIUS2}`,
    `V${CAP_HEIGHT2}`,
    `H${CAP_WIDTH2}`
  ];
  const rightCapSegments = [
    "M0,0",
    `H${CAP_WIDTH2 - RADIUS2}`,
    `Q${CAP_WIDTH2},0 ${CAP_WIDTH2},${RADIUS2}`,
    `V${CAP_HEIGHT2}`,
    "H0"
  ];
  const background = /* @__PURE__ */ Devvit.createElement("hstack", { height: `${CAP_HEIGHT2}px`, width: "100%" }, /* @__PURE__ */ Devvit.createElement(
    "image",
    {
      imageWidth: CAP_WIDTH2 * props.pixelRatio,
      imageHeight: CAP_HEIGHT2 * props.pixelRatio,
      width: `${CAP_WIDTH2}px`,
      height: `${CAP_HEIGHT2}px`,
      resizeMode: "fill",
      description: "Background: Left Cap",
      url: svg`<svg width="${CAP_WIDTH2}" height="${CAP_HEIGHT2}" viewBox="0 0 ${CAP_WIDTH2} ${CAP_HEIGHT2}" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="${leftCapSegments.join("")}" fill="${cssHex(paletteBlack)}" stroke-width="2" stroke="${borderColor}" /></svg>`
    }
  ), /* @__PURE__ */ Devvit.createElement("vstack", { height: "100%", grow: true, backgroundColor: cssHex(paletteBlack) }, /* @__PURE__ */ Devvit.createElement("hstack", { height: "1px", width: "100%", backgroundColor: borderColor }), /* @__PURE__ */ Devvit.createElement("spacer", { grow: true }), /* @__PURE__ */ Devvit.createElement("hstack", { height: "1px", width: "100%", backgroundColor: borderColor })), /* @__PURE__ */ Devvit.createElement(
    "image",
    {
      imageWidth: CAP_WIDTH2 * props.pixelRatio,
      imageHeight: CAP_HEIGHT2 * props.pixelRatio,
      width: `${CAP_WIDTH2}px`,
      height: `${CAP_HEIGHT2}px`,
      resizeMode: "fill",
      description: "Background: Right Cap",
      url: svg`<svg width="${CAP_WIDTH2}" height="${CAP_HEIGHT2}" viewBox="0 0 ${CAP_WIDTH2} ${CAP_HEIGHT2}" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="${rightCapSegments.join("")}" fill="${cssHex(paletteBlack)}" stroke-width="2" stroke="${borderColor}" /></svg>`
    }
  ));
  return /* @__PURE__ */ Devvit.createElement("zstack", { width: "100%", height: `${CAP_HEIGHT2}px`, onPress: props.onPress }, background, /* @__PURE__ */ Devvit.createElement("hstack", { width: "100%", height: "100%" }, /* @__PURE__ */ Devvit.createElement("spacer", { width: "8px" }), /* @__PURE__ */ Devvit.createElement("vstack", { grow: true, height: "100%", alignment: "middle" }, /* @__PURE__ */ Devvit.createElement(PixelText, { ...props, size: 16, color: cssHex(paletteFieldLight) }, localize("point-claim-title")), /* @__PURE__ */ Devvit.createElement("spacer", { height: "2px" }), /* @__PURE__ */ Devvit.createElement("spacer", { height: "12px" })), /* @__PURE__ */ Devvit.createElement("spacer", { width: "8px" })));
}

// src/devvit/components/game-screen/InnerBorder.tsx
function InnerBorder(props) {
  const {
    pixelRatio,
    height = 512,
    width = 50,
    radius = 12,
    inset = 4,
    borderColor = cssHex(paletteBlack),
    borderWidth = 2
  } = props;
  return /* @__PURE__ */ Devvit.createElement("hstack", { height: "100%", width: "100%" }, /* @__PURE__ */ Devvit.createElement(
    "image",
    {
      imageWidth: width * pixelRatio,
      imageHeight: height * pixelRatio,
      width: `${width}px`,
      height: `${height}px`,
      resizeMode: "fill",
      description: "Inset Border: Left Edge Segment",
      url: `data:image/svg+xml;charset=UTF-8,
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="
M${width},${inset}
h-${width - radius - inset}
q-${radius},0 -${radius},${radius}
v${height - radius - radius - inset * 2}
q0,${radius} ${radius},${radius}
h${width - radius - inset}
" fill="none" strokeWidth="${borderWidth}" stroke="${borderColor}" />
</svg>`
    }
  ), /* @__PURE__ */ Devvit.createElement("vstack", { height: `${height}px`, grow: true }, /* @__PURE__ */ Devvit.createElement("spacer", { height: `${inset - borderWidth / 4}px` }), /* @__PURE__ */ Devvit.createElement(
    "hstack",
    {
      width: "100%",
      height: `${borderWidth / 2}px`,
      backgroundColor: borderColor
    }
  ), /* @__PURE__ */ Devvit.createElement("spacer", { grow: true }), /* @__PURE__ */ Devvit.createElement(
    "hstack",
    {
      width: "100%",
      height: `${borderWidth / 2}px`,
      backgroundColor: borderColor
    }
  ), /* @__PURE__ */ Devvit.createElement("spacer", { height: `${inset - borderWidth / 2}px` })), /* @__PURE__ */ Devvit.createElement(
    "image",
    {
      imageWidth: width * pixelRatio,
      imageHeight: height * pixelRatio,
      width: `${width}px`,
      height: `${height}px`,
      resizeMode: "fill",
      description: "Inset Border: Right Edge Segment",
      url: `data:image/svg+xml;charset=UTF-8,
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="
M0,${inset}
h${width - radius - inset}
q${radius},0 ${radius},${radius}
v${height - radius - radius - inset * 2}
q0,${radius} -${radius},${radius}
h-${width - radius - inset}
" fill="none" strokeWidth="${borderWidth}" stroke="${borderColor}" />
</svg>`
    }
  ));
}

// src/devvit/components/game-screen/RaisedPanel.tsx
function RaisedPanel(props) {
  const CAP_HEIGHT2 = 44;
  const CAP_WIDTH2 = 20;
  const RADIUS_OUTER = 4;
  const RADIUS_INNER = 3;
  const borderColor = cssHex(paletteBlack);
  return /* @__PURE__ */ Devvit.createElement("hstack", { height: `${CAP_HEIGHT2}px`, grow: true }, /* @__PURE__ */ Devvit.createElement("hstack", { height: "100%", width: "100%" }, /* @__PURE__ */ Devvit.createElement(
    "image",
    {
      imageWidth: CAP_WIDTH2 * props.pixelRatio,
      imageHeight: CAP_HEIGHT2 * props.pixelRatio,
      width: `${CAP_WIDTH2}px`,
      height: `${CAP_HEIGHT2}px`,
      resizeMode: "fill",
      description: "Background: Left Cap",
      url: svg`<svg width="${CAP_WIDTH2}" height="${CAP_HEIGHT2}" viewBox="0 0 ${CAP_WIDTH2} ${CAP_HEIGHT2}" fill="none" xmlns="http://www.w3.org/2000/svg">
        
        <!-- Shadow -->
        <path d="M${CAP_WIDTH2},0H${RADIUS_OUTER}Q0,0 0,${RADIUS_OUTER}V${CAP_HEIGHT2 - RADIUS_OUTER}Q0,${CAP_HEIGHT2} ${RADIUS_OUTER},${CAP_HEIGHT2}H${CAP_WIDTH2}" fill="${cssHex(paletteShade19)}" />
        
        <!-- Side: Border -->
        <path d="M${CAP_WIDTH2},0H${RADIUS_OUTER}Q0,0 0,${RADIUS_OUTER}V${40 - RADIUS_OUTER}Q0,40 ${RADIUS_OUTER},40 H${CAP_WIDTH2}" fill="${borderColor}" />

        <!-- Side: Fill -->
        <path d="M${CAP_WIDTH2},1H1V${39 - RADIUS_INNER}Q1,39 ${1 + RADIUS_INNER},39H${CAP_WIDTH2}" fill="${cssHex(paletteConsole)}" />

        <!-- Top: Border -->
        <path d="M${CAP_WIDTH2},0H${RADIUS_OUTER}Q0,0 0,${RADIUS_OUTER}V${32 - RADIUS_OUTER}Q0,32 ${RADIUS_OUTER},32H${CAP_WIDTH2}" fill="${borderColor}" />

        <!-- Top: Fill -->
        <path d="M${CAP_WIDTH2},1H${1 + RADIUS_INNER}Q1,1 1,${RADIUS_INNER}V${31 - RADIUS_INNER}Q1,31 ${RADIUS_INNER + 1},31H${CAP_WIDTH2}" fill="${cssHex(paletteConsole)}" />

        <!-- Inset: Border -->
        <path d="M${CAP_WIDTH2},4H${RADIUS_OUTER + 4}Q4,4 4,${RADIUS_OUTER + 4}V${28 - RADIUS_OUTER}Q4,28 ${4 + RADIUS_OUTER},28H${CAP_WIDTH2}" fill="${borderColor}" />

        <!-- Inset: Fill -->
        <path d="M${CAP_WIDTH2},5H${5 + RADIUS_INNER}Q5,5 5,${5 + RADIUS_INNER}V${27 - RADIUS_INNER}Q5,27 ${5 + RADIUS_INNER},27H${CAP_WIDTH2}" fill="#021007" /></svg>`
    }
  ), /* @__PURE__ */ Devvit.createElement("zstack", { grow: true, height: "100%", alignment: "center middle" }, /* @__PURE__ */ Devvit.createElement("vstack", { height: "100%", width: "100%" }, /* @__PURE__ */ Devvit.createElement("hstack", { height: "1px", width: "100%", backgroundColor: borderColor }), /* @__PURE__ */ Devvit.createElement(
    "hstack",
    {
      height: "3px",
      width: "100%",
      backgroundColor: cssHex(paletteConsole)
    }
  ), /* @__PURE__ */ Devvit.createElement("hstack", { height: "1px", width: "100%", backgroundColor: borderColor }), /* @__PURE__ */ Devvit.createElement("hstack", { height: "22px", width: "100%", backgroundColor: "#021007" }), /* @__PURE__ */ Devvit.createElement("hstack", { height: "1px", width: "100%", backgroundColor: borderColor }), /* @__PURE__ */ Devvit.createElement(
    "hstack",
    {
      height: "3px",
      width: "100%",
      backgroundColor: cssHex(paletteConsole)
    }
  ), /* @__PURE__ */ Devvit.createElement("hstack", { height: "1px", width: "100%", backgroundColor: borderColor }), /* @__PURE__ */ Devvit.createElement(
    "hstack",
    {
      height: "7px",
      width: "100%",
      backgroundColor: cssHex(paletteConsole)
    }
  ), /* @__PURE__ */ Devvit.createElement("hstack", { height: "1px", width: "100%", backgroundColor: borderColor }), /* @__PURE__ */ Devvit.createElement(
    "hstack",
    {
      height: "4px",
      width: "100%",
      backgroundColor: cssHex(paletteShade19)
    }
  )), props.active ? /* @__PURE__ */ Devvit.createElement("vstack", { height: "100%", width: "100%", alignment: "center top" }, /* @__PURE__ */ Devvit.createElement("spacer", { height: "6px" }), /* @__PURE__ */ Devvit.createElement(
    "image",
    {
      imageHeight: 48,
      imageWidth: 48,
      width: "20px",
      height: "20px",
      description: "Ban Box Animation",
      resizeMode: "fit",
      url: "logo-flicker.gif"
    }
  )) : null), /* @__PURE__ */ Devvit.createElement(
    "image",
    {
      imageWidth: CAP_WIDTH2 * props.pixelRatio,
      imageHeight: CAP_HEIGHT2 * props.pixelRatio,
      width: `${CAP_WIDTH2}px`,
      height: `${CAP_HEIGHT2}px`,
      resizeMode: "fill",
      description: "Background: Right Cap",
      url: svg`<svg width="${CAP_WIDTH2}" height="${CAP_HEIGHT2}" viewBox="0 0 ${CAP_WIDTH2} ${CAP_HEIGHT2}" fill="none" xmlns="http://www.w3.org/2000/svg">
        
        <!-- Shadow -->
        <path d="M0,0H${CAP_WIDTH2 - RADIUS_OUTER}Q${CAP_WIDTH2},0 ${CAP_WIDTH2},${RADIUS_OUTER}V${CAP_HEIGHT2 - RADIUS_OUTER}Q${CAP_WIDTH2},${CAP_HEIGHT2} ${CAP_WIDTH2 - RADIUS_OUTER},${CAP_HEIGHT2}H0" fill="${cssHex(paletteShade19)}" />
        
        <!-- Side: Border -->
        <path d="M0,0H${CAP_WIDTH2 - RADIUS_OUTER}Q${CAP_WIDTH2},0 ${CAP_WIDTH2},${RADIUS_OUTER}V${40 - RADIUS_OUTER}Q${CAP_WIDTH2},40 ${CAP_WIDTH2 - RADIUS_OUTER},40 H0" fill="${borderColor}" />

        <!-- Side: Fill -->
        <path d="M0,1H${CAP_WIDTH2 - 1}V${39 - RADIUS_INNER}Q${CAP_WIDTH2 - 1},39 ${CAP_WIDTH2 - 1 - RADIUS_INNER},39H0" fill="${cssHex(paletteConsole)}" />

        <!-- Top: Border -->
        <path d="M0,0H${CAP_WIDTH2 - RADIUS_OUTER}Q${CAP_WIDTH2},0 ${CAP_WIDTH2},${RADIUS_OUTER}V${32 - RADIUS_OUTER}Q${CAP_WIDTH2},32 ${CAP_WIDTH2 - RADIUS_OUTER},32H0" fill="${borderColor}" />

        <!-- Top: Fill -->
        <path d="M0,1H${CAP_WIDTH2 - 1 - RADIUS_INNER}Q${CAP_WIDTH2 - 1},1 ${CAP_WIDTH2 - 1},${RADIUS_INNER}V${31 - RADIUS_INNER}Q${CAP_WIDTH2 - 1},31 ${CAP_WIDTH2 - 1 - RADIUS_INNER},31H0" fill="${cssHex(paletteConsole)}" />

        <!-- Inset: Border -->
        <path d="M0,4H${CAP_WIDTH2 - RADIUS_OUTER - 4}Q${CAP_WIDTH2 - 4},4 ${CAP_WIDTH2 - 4},${RADIUS_OUTER + 4}V${28 - RADIUS_OUTER}Q${CAP_WIDTH2 - 4},28 ${CAP_WIDTH2 - RADIUS_OUTER - 4},28H0" fill="${borderColor}" />

        <!-- Inset: Fill -->
        <path d="M0,5H${CAP_WIDTH2 - 5 - RADIUS_INNER}Q${CAP_WIDTH2 - 5},5 ${CAP_WIDTH2 - 5},${5 + RADIUS_INNER}V${27 - RADIUS_INNER}Q${CAP_WIDTH2 - 5},27 ${CAP_WIDTH2 - 5 - RADIUS_INNER},27H0" fill="#021007" /></svg>`
    }
  )));
}

// src/devvit/components/PointClaimScreen.tsx
function PointClaimScreen(props) {
  const REDIRECT_DELAY_MILLIS = 2e3;
  const [claimed, setClaimed] = useState(false);
  const [redirect, setRedirect] = useState(false);
  if (redirect) {
    return /* @__PURE__ */ Devvit.createElement(DialogWinner, { pixelRatio: props.pixelRatio, team: props.team, level: 0 });
  }
  const redirectTimer = useInterval(
    () => setRedirect(true),
    REDIRECT_DELAY_MILLIS
  );
  async function handlePress() {
    await props.onClaimPress();
    setClaimed(true);
    redirectTimer.start();
  }
  return /* @__PURE__ */ Devvit.createElement("zstack", { height: "100%", width: "100%", backgroundColor: cssHex(paletteConsole) }, /* @__PURE__ */ Devvit.createElement(InnerBorder, { ...props }), /* @__PURE__ */ Devvit.createElement("vstack", { height: "100%", width: "100%", padding: "xsmall" }, /* @__PURE__ */ Devvit.createElement("vstack", { width: "100%", grow: true, alignment: "center middle", padding: "small" }, /* @__PURE__ */ Devvit.createElement(Header2, { ...props, scores: props.standings }), /* @__PURE__ */ Devvit.createElement("spacer", { height: "8px" }), /* @__PURE__ */ Devvit.createElement(
    "zstack",
    {
      width: "100%",
      grow: true,
      backgroundColor: cssHex(paletteBlack),
      padding: "small",
      alignment: "center middle"
    },
    /* @__PURE__ */ Devvit.createElement(
      "image",
      {
        imageHeight: 184,
        imageWidth: 184,
        width: "184px",
        height: "184px",
        description: "Ban Box Shadow",
        resizeMode: "fill",
        url: "final-cell-glow.png"
      }
    ),
    claimed && /* @__PURE__ */ Devvit.createElement(
      "image",
      {
        imageHeight: 240,
        imageWidth: 240,
        width: "120px",
        height: "120px",
        description: "Ban Box Animation",
        resizeMode: "fill",
        url: "logo-grow.gif"
      }
    ),
    /* @__PURE__ */ Devvit.createElement(
      "hstack",
      {
        width: "120px",
        height: "120px",
        border: "thick",
        borderColor: cssHex(paletteFieldLight)
      }
    )
  ), /* @__PURE__ */ Devvit.createElement("spacer", { height: "8px" }), /* @__PURE__ */ Devvit.createElement("hstack", { width: "100%", alignment: "center middle" }, /* @__PURE__ */ Devvit.createElement(RaisedPanel, { ...props, active: claimed }), /* @__PURE__ */ Devvit.createElement("spacer", { width: "12px" }), /* @__PURE__ */ Devvit.createElement(
    StyledButton,
    {
      ...props,
      color: cssHex(claimed ? paletteDisabled : teamColor[props.team]),
      onPress: handlePress
    },
    claimed ? localize("point-claim-button-label-after") : localize("point-claim-button-label")
  ), /* @__PURE__ */ Devvit.createElement("spacer", { width: "12px" }), /* @__PURE__ */ Devvit.createElement(RaisedPanel, { ...props, active: claimed }))), /* @__PURE__ */ Devvit.createElement(Footer, { ...props, scores: props.standings, claimed })), claimed && /* @__PURE__ */ Devvit.createElement("vstack", { height: "100%", width: "100%" }, /* @__PURE__ */ Devvit.createElement("hstack", { width: "100%", grow: true, alignment: "center bottom" }, /* @__PURE__ */ Devvit.createElement("spacer", { width: "28px" }), /* @__PURE__ */ Devvit.createElement(
    "hstack",
    {
      grow: true,
      height: "100%",
      maxWidth: "432px",
      alignment: "center bottom"
    },
    /* @__PURE__ */ Devvit.createElement("spacer", { width: `${props.team * 25}%` }),
    /* @__PURE__ */ Devvit.createElement(
      "image",
      {
        imageHeight: 512,
        imageWidth: 256,
        width: "25%",
        height: "128px",
        description: "Point earned",
        resizeMode: "fit",
        url: "earned-a-point.gif"
      }
    ),
    /* @__PURE__ */ Devvit.createElement("spacer", { width: `${100 - (props.team + 1) * 25}%` })
  ), /* @__PURE__ */ Devvit.createElement("spacer", { width: "28px" })), /* @__PURE__ */ Devvit.createElement("spacer", { height: "90px" })));
}

// src/devvit/components/LeaderboardController.tsx
function LeaderboardController(props, context) {
  const pixelRatio = context.uiEnvironment?.dimensions?.scale ?? fallbackPixelRatio;
  const [forcePlayField, setForcePlayField] = useState(false);
  const [state, setState] = useState2(async () => {
    const [standings, globalStats, profile] = await Promise.all([
      (0, import_leaderboard.leaderboardGet)({
        redis: context.redis,
        sort: "DESC"
      }),
      (0, import_globalStats.globalStatsGet)({
        redis: context.redis
      }),
      context.userId ? (0, import_user.userGetOrSet)({
        ctx: context
      }) : null
    ]);
    if (!profile) {
      return {
        status: "viewLeaderboard",
        standings,
        profile: null,
        globalStats
      };
    }
    if (profile.blocked) {
      return {
        status: "notAllowed"
      };
    }
    if (!profile.hasVerifiedEmail) {
      return {
        status: "needsToVerifyEmail"
      };
    }
    if (
      // Always show leaderboard if they're on the leaderboard subreddit
      config2.leaderboard.subredditId === context.subredditId
    ) {
      return {
        status: "viewLeaderboard",
        standings,
        profile,
        globalStats
      };
    }
    if (didUserBeatTheGame(profile)) {
      return {
        status: "beatTheGame"
      };
    }
    const result = await (0, import_levels.levelsIsUserInRightPlace)({
      ctx: context,
      profile
    });
    if (
      // We only show claim global point when they're on the last subreddit now
      config2.levels.at(-1).subredditId === context.subredditId
    ) {
      if (result.pass) {
        return {
          status: "claimGlobalPoint",
          standings,
          profile,
          team: getTeamFromUserId(profile.t2)
        };
      }
      const { pass: _pass, ...rest } = result;
      return { status: "dialog", ...rest, profile };
    }
    return {
      status: "viewLeaderboard",
      standings,
      profile,
      globalStats
    };
  });
  if (state.status === "needsToVerifyEmail") {
    return /* @__PURE__ */ Devvit.createElement(
      DialogVerifyEmail,
      {
        level: config2.levels.find((lvl) => lvl.subredditId === context.subredditId)?.id ?? 0,
        pixelRatio,
        onPress: async () => {
          const user = await context.reddit.getCurrentUser();
          if (user?.hasVerifiedEmail) {
            (0, import_user.userSet)({
              redis: context.redis,
              user: {
                ...await (0, import_user.userGet)({
                  redis: context.redis,
                  userId: context.userId
                }),
                hasVerifiedEmail: true
              }
            });
            context.ui.navigateTo(
              config2.levels.find(
                (lvl) => lvl.subredditId === context.subredditId
              )?.url ?? config2.levels[0].url
            );
          } else {
            context.ui.navigateTo("https://www.reddit.com/settings/account");
          }
        }
      }
    );
  }
  if (state.status === "beatTheGame") {
    return /* @__PURE__ */ Devvit.createElement(
      DialogBeatGame,
      {
        level: config2.levels.find((lvl) => lvl.subredditId === context.subredditId)?.id ?? 0,
        pixelRatio
      }
    );
  }
  if (state.status === "dialog") {
    const level = config2.levels.find((lvl) => lvl.subredditId === context.subredditId)?.id ?? 0;
    if (state.code === "Error") {
      return /* @__PURE__ */ Devvit.createElement(
        DialogError,
        {
          level,
          pixelRatio,
          onPress: () => {
            context.ui.navigateTo(state.redirectURL);
          }
        }
      );
    }
    return /* @__PURE__ */ Devvit.createElement(
      DialogUnauthorized,
      {
        level: config2.levels.find((lvl) => lvl.subredditId === context.subredditId)?.id ?? 0,
        currentLevel: state.profile.currentLevel,
        redirectURL: state.redirectURL,
        pixelRatio
      }
    );
  }
  if (state.status === "notAllowed") {
    return /* @__PURE__ */ Devvit.createElement(
      DialogNotAllowed,
      {
        level: config2.levels.find((lvl) => lvl.subredditId === context.subredditId)?.id ?? 0,
        pixelRatio
      }
    );
  }
  const updateState = async () => {
    const newValue = await (0, import_leaderboard.leaderboardGet)({
      redis: context.redis,
      sort: "DESC"
    });
    setState((x) => ({
      ...x,
      standings: newValue
    }));
  };
  useInterval(updateState, 3e4).start();
  if (state.status === "claimGlobalPoint") {
    return /* @__PURE__ */ Devvit.createElement(
      PointClaimScreen,
      {
        standings: state.standings,
        pixelRatio,
        team: state.team,
        onClaimPress: async () => {
          await (0, import_user.userAttemptToClaimGlobalPointForTeam)({
            ctx: context,
            userId: state.profile.t2
          });
        }
      }
    );
  }
  return /* @__PURE__ */ Devvit.createElement(
    LeaderboardView,
    {
      standings: state.standings.sort((a, b) => a.member - b.member),
      pixelRatio: props.pixelRatio,
      showPlayButton: forcePlayField || !state.profile || !didUserBeatTheGame(state.profile),
      onPlay: () => context.ui.navigateTo(config2.levels[0].url),
      onSubscribe: async () => {
        await context.reddit.subscribeToCurrentSubreddit();
        context.ui.showToast("Subscribed to r/GamesOnReddit");
        if (context.userId) {
          await (0, import_user.userSetNewGamePlusIfNotExists)({
            redis: context.redis,
            userId: context.userId
          });
          setForcePlayField(true);
        }
      },
      players: state.globalStats.totalPlayers,
      bans: state.globalStats.totalBans,
      fields: state.globalStats.totalFields
    }
  );
}

// src/devvit/components/app.tsx
function isLocal2() {
  return !`${fetch}`.includes("getHttpPlugin");
}
var LEADERBOARD_CONFIG = config2.leaderboard;
var levels = config2.levels;
function App(ctx, pause) {
  const session = useSession(ctx);
  if (session.userAgent.client === "iOS") {
    const navigateTo = ctx.ui.navigateTo.bind(ctx.ui);
    ctx.ui.navigateTo = (url) => {
      navigateTo(url);
      if (ctx.subredditId !== config2.leaderboard.subredditId) {
        pause.start();
      }
    };
  }
  if (Date.now() > (/* @__PURE__ */ new Date("2025-04-03T22:00:00.000Z")).getTime()) {
    return /* @__PURE__ */ Devvit.createElement(
      DialogEnded,
      {
        team: ctx.userId ? getTeamFromUserId(ctx.userId) : 0,
        level: levels.find((x) => x.subredditId === ctx.subredditId)?.id ?? levels[0].id,
        pixelRatio: ctx.uiEnvironment?.dimensions?.scale ?? fallbackPixelRatio
      }
    );
  }
  const parsedUserAgent = parseDevvitUserAgent2(
    ctx.debug.metadata["devvit-user-agent"]?.values?.[0] ?? ""
  );
  if (parsedUserAgent && shouldShowUpgradeAppScreen2(parsedUserAgent)) {
    return /* @__PURE__ */ Devvit.createElement(
      DialogUnsupportedClient,
      {
        pixelRatio: ctx.uiEnvironment?.dimensions?.scale ?? fallbackPixelRatio,
        level: 0,
        platform: parsedUserAgent.platform
      }
    );
  }
  const pixelRatio = ctx.uiEnvironment?.dimensions?.scale ?? fallbackPixelRatio;
  if (ctx.subredditId === config2.leaderboard.subredditId || // We now claims a global point on WhatIsField and we're trying to not redo all of the code
  // so we handle this case inside of the same component as it was before.
  ctx.subredditId === levels.at(-1).subredditId) {
    return /* @__PURE__ */ Devvit.createElement(LeaderboardController, { pixelRatio });
  }
  const [challengeEndedState, setChallengeEndedState] = useState2(null);
  const [appState, setAppState] = useState2(async () => await (0, import_app.appInitState)(ctx));
  const [isIframeMounted, setIsIframeMounted] = useState2(false);
  const [isWaitingToReload, setIsWaitingToReload] = useState2(false);
  const [showHowToPlay, setShowHowToPlay] = useState2(false);
  if (appState.status === "needsToVerifyEmail") {
    return /* @__PURE__ */ Devvit.createElement(
      DialogVerifyEmail,
      {
        level: config2.levels.find((lvl) => lvl.subredditId === ctx.subredditId)?.id ?? 0,
        pixelRatio,
        onPress: async () => {
          const user = await ctx.reddit.getCurrentUser();
          if (user?.hasVerifiedEmail) {
            (0, import_user2.userSet)({
              redis: ctx.redis,
              user: {
                ...await (0, import_user2.userGet)({
                  redis: ctx.redis,
                  userId: ctx.userId
                }),
                hasVerifiedEmail: true
              }
            });
            ctx.ui.navigateTo(
              config2.levels.find((lvl) => lvl.subredditId === ctx.subredditId)?.url ?? config2.levels[0].url
            );
          } else {
            ctx.ui.navigateTo("https://www.reddit.com/settings/account");
          }
        }
      }
    );
  }
  if (appState.status === "notAllowed") {
    return /* @__PURE__ */ Devvit.createElement(
      DialogNotAllowed,
      {
        level: config2.levels.find((lvl) => lvl.subredditId === ctx.subredditId)?.id ?? 0,
        pixelRatio
      }
    );
  }
  if (appState.status === "beatTheGame") {
    return /* @__PURE__ */ Devvit.createElement(
      DialogBeatGame,
      {
        level: config2.levels.find((lvl) => lvl.subredditId === ctx.subredditId)?.id ?? 0,
        pixelRatio
      }
    );
  }
  if (appState.status === "dialog") {
    const level = config2.levels.find((lvl) => lvl.subredditId === ctx.subredditId)?.id ?? 0;
    if (appState.code === "Error") {
      return /* @__PURE__ */ Devvit.createElement(
        DialogError,
        {
          level,
          pixelRatio,
          onPress: () => {
            ctx.ui.navigateTo(appState.redirectURL);
          }
        }
      );
    }
    return /* @__PURE__ */ Devvit.createElement(
      DialogUnauthorized,
      {
        level,
        currentLevel: appState.profile.currentLevel,
        redirectURL: appState.redirectURL,
        pixelRatio
      }
    );
  }
  const postMessageChallengeEndedStay = ({
    profile,
    standings
  }) => {
    iframe.postMessage({
      type: "Dialog",
      code: "ChallengeEndedStay",
      message: "This round has ended. Please refresh to begin the next round.",
      redirectURL: "",
      profile,
      standings,
      lvl: profile.currentLevel
    });
  };
  useAsync(
    async () => {
      if (!challengeEndedState) return null;
      const profile = await (0, import_user2.userGet)({
        redis: ctx.redis,
        userId: appState.profile.t2
      });
      const result = await (0, import_levels2.levelsIsUserInRightPlace)({
        ctx,
        profile
      });
      if (result.pass) {
        postMessageChallengeEndedStay({
          profile,
          standings: challengeEndedState.standings
        });
        return null;
      }
      const { pass: _pass, ...rest } = result;
      iframe.postMessage(rest);
      return null;
    },
    {
      depends: challengeEndedState,
      finally() {
        setChallengeEndedState(null);
      }
    }
  );
  const iframe = useWebView({
    onMessage: onMsg,
    onUnmount: () => {
      setIsIframeMounted(false);
      if (isWaitingToReload) {
        reloadApp();
      }
    }
  });
  function reloadApp() {
    const currentUrl = config2.levels.find(
      (lvl) => lvl.subredditId === ctx.subredditId
    )?.url;
    ctx.ui.navigateTo(currentUrl || "");
  }
  function sendInitToIframe(state, { reinit } = { reinit: false }) {
    if (state.status !== "pass") return;
    const {
      appConfig,
      profile,
      challengeConfig,
      challengeNumber,
      initialMapKey,
      initialGlobalXY,
      initialCellsClaimed,
      visible,
      minesHitByTeam,
      team
    } = state;
    const p1 = { profile, sid: session.sid };
    const msg = {
      appConfig,
      bannedPlayers: minesHitByTeam.reduce((acc, v) => acc + v.score, 0),
      challenge: challengeNumber,
      connected: chan.status === ChannelStatus.Connected,
      debug: session.debug,
      field: {
        bans: challengeConfig.totalNumberOfMines,
        partSize: challengeConfig.partitionSize,
        wh: { w: challengeConfig.size, h: challengeConfig.size }
      },
      lvl: state.level.id,
      p1,
      p1BoxCount: profile.lastPlayedChallengeNumberCellsClaimed,
      players: 0,
      // to-do: fill me out. useChannel2()?
      sub: ctx.subredditName ?? "",
      t5: state.level.subredditId,
      team,
      teamBoxCounts: initialCellsClaimed.sort((a, b) => a.member - b.member).map((x) => x.score),
      type: "Init",
      visible,
      initialGlobalXY,
      reinit,
      globalStandings: state.globalStandings
    };
    if (initialMapKey) {
      msg.initialMapKey = initialMapKey;
    }
    iframe.postMessage(msg);
  }
  async function onMsg(msg) {
    if (session.debug)
      console.log(
        `${appState.status === "pass" ? appState.profile.username : "app state no pass"} Devvit \u2190 iframe msg=${JSON.stringify(msg)}`
      );
    switch (msg.type) {
      case "Loaded":
        setIsIframeMounted(true);
        break;
      case "Registered": {
        if (appState.status === "dialog") {
          const { status: _status, ...rest } = appState;
          iframe.postMessage(rest);
        } else if (appState.status === "pass") {
          sendInitToIframe(appState);
        }
        break;
      }
      case "ClaimBoxes": {
        if (appState.status === "dialog") {
          const { status: _status, ...rest } = appState;
          iframe.postMessage(rest);
        } else if (appState.status === "pass") {
          const profile = await (0, import_user2.userGet)({
            redis: ctx.redis,
            userId: appState.profile.t2
          });
          if (profile.blocked) {
            console.warn("Cannot claim boxes, user is not allowed to play.");
            return;
          }
          if (!profile.hasVerifiedEmail) {
            console.warn("Cannot claim boxes, user needs to verify email.");
            return;
          }
          const result = await (0, import_levels2.levelsIsUserInRightPlace)({
            ctx,
            // You need to call this instead of the appState since
            // app state can be stale. Use case where you hit this:
            // 1. User claims a mine
            // 2. User tries to click again before we show
            //    the game over dialog
            profile
          });
          if (result.pass === false) {
            const { pass: _pass, ...rest } = result;
            iframe.postMessage(rest);
            return;
          }
          if (result.code === "RightLevelWrongChallenge" && // Only handle when their appState is out of sync because
          // the claim cells path is the one that updates their last played
          // challenge number!
          appState.challengeNumber !== result.activeChallengeNumberForLevel) {
            console.log(
              "Challenge number mismatch, ending challenge for user to refresh"
            );
            postMessageChallengeEndedStay({
              profile,
              standings: result.standingsForUserLastPlayedChallenge
            });
            return;
          }
          const { newLevel, claimedCells, lostCells } = await (0, import_field.fieldClaimCells)({
            challengeNumber: appState.challengeNumber,
            coords: msg.boxes,
            ctx,
            userId: appState.profile.t2
          });
          iframe.postMessage({ type: "Box", claimedCells, lostCells });
          if (newLevel !== void 0) {
            const result2 = await (0, import_levels2.levelsIsUserInRightPlace)({
              ctx,
              profile: {
                ...profile,
                // Users only descend levels when they hit a mine so we can
                // assume what the state would be if we looked i up live.
                lastPlayedChallengeNumberForLevel: 0,
                lastPlayedChallengeNumberCellsClaimed: 0,
                currentLevel: newLevel
              }
            });
            if (result2.pass === false) {
              const { pass: _pass, ...rest } = result2;
              iframe.postMessage({
                ...rest,
                // levelsIsUserInRightPlace doesn't have enough information to make
                // this determination so we stub it here
                code: "ClaimedABanBox"
              });
              return;
            }
          }
        }
        break;
      }
      case "OnNextChallengeClicked": {
        if (appState.status !== "pass") break;
        const newAppState = await (0, import_app.appInitState)(ctx);
        setAppState(newAppState);
        if (newAppState.status === "pass") {
          console.log("user did not ascend, reiniting iframe");
          sendInitToIframe(newAppState, { reinit: true });
        } else if (newAppState.status === "dialog") {
          console.log("user ascended, redirecting", newAppState);
          iframe.unmount();
          ctx.ui.navigateTo(newAppState.redirectURL);
        }
        break;
      }
      case "OpenLeaderboard":
        ctx.ui.navigateTo(config2.leaderboard.url);
        break;
      case "Dialog":
        if (msg.code !== "ChallengeEndedStay") {
          iframe.unmount();
        }
        ctx.ui.navigateTo(msg.redirectURL);
        break;
      case "ReloadApp": {
        reloadApp();
        break;
      }
      case "ChallengeComplete": {
        setChallengeEndedState(msg);
        break;
      }
      case "ActivePlayerHeartbeat": {
        if (appState.status !== "pass") break;
        await (0, import_activePlayers.activePlayersIncrement)({
          redis: ctx.redis,
          team: appState.team
        });
        break;
      }
      default:
        msg;
    }
  }
  const chan = useChannel({
    name: INSTALL_REALTIME_CHANNEL,
    onMessage(msg) {
      if (!msg || !msg.type) return;
      if (session.debug)
        console.log(
          `${appState.status === "pass" ? appState.profile.username : "app state no pass"} Devvit \u2190 realtime msg=${JSON.stringify(msg)}`
        );
      if (msg.type === "ConfigUpdate" && msg.config.globalReloadSequence > appState.appConfig.globalReloadSequence && appState.appConfig.globalReloadSequence > 0) {
        if (isIframeMounted) {
          setIsWaitingToReload(true);
          const timeoutMillis = Math.floor(Math.random() * 3e4);
          iframe.postMessage({
            type: "SetTimeout",
            timeoutMillis,
            message: { type: "ReloadApp" }
          });
        } else {
          reloadApp();
        }
        return;
      }
      if (msg.type === "ChallengeComplete") {
        if (isIframeMounted) {
          const maxMillis = Math.min(15e3, msg.activePlayers / 1e4);
          const timeoutMillis = Math.floor(Math.random() * maxMillis);
          console.log(`Challenge complete, handling in ${timeoutMillis}ms.`);
          iframe.postMessage({
            type: "SetTimeout",
            message: msg,
            timeoutMillis
          });
        } else setChallengeEndedState(msg);
        return;
      }
      if (isIframeMounted) iframe.postMessage(msg);
    },
    onSubscribed: () => iframe.postMessage({ type: "Connected" }),
    onUnsubscribed: () => iframe.postMessage({ type: "Disconnected" })
  });
  if (isLocal2()) {
    chan.subscribe();
  }
  if (showHowToPlay) {
    return /* @__PURE__ */ Devvit.createElement(
      DialogHowToPlay,
      {
        pixelRatio,
        level: config2.levels.find((lvl) => lvl.subredditId === ctx.subredditId)?.id ?? 0,
        onPress: () => {
          setShowHowToPlay(false);
          iframe.mount();
        }
      }
    );
  }
  return /* @__PURE__ */ Devvit.createElement(
    DialogWelcome,
    {
      team: getTeamFromUserId(session.t2),
      level: config2.levels.find((lvl) => lvl.subredditId === ctx.subredditId)?.id ?? 0,
      pixelRatio,
      onPress: () => appState.status === "pass" && appState.profile.startedPlayingAt ? iframe.mount() : setShowHowToPlay(true)
    }
  );
}

// src/devvit/components/app-pauser.tsx
function AppPauser(ctx) {
  const [paused, setPaused] = useState2(false);
  const pauseInterval = useInterval(() => {
    pauseInterval.stop();
    setPaused(true);
  }, 300);
  if (paused)
    return /* @__PURE__ */ Devvit.createElement(
      DialogPaused,
      {
        level: config2.levels.find((lvl) => lvl.subredditId === ctx.subredditId)?.id ?? 0,
        pixelRatio: ctx.uiEnvironment?.dimensions?.scale ?? fallbackPixelRatio,
        onPress: async () => {
          const appState = await (0, import_app2.appInitState)(ctx);
          switch (appState.status) {
            case "pass":
            case "beatTheGame":
            case "needsToVerifyEmail":
            case "notAllowed":
              setPaused(false);
              break;
            case "dialog":
              ctx.ui.navigateTo(appState.redirectURL);
              break;
            default:
              appState;
          }
        }
      }
    );
  return App(ctx, pauseInterval);
}

// src/devvit/menu-actions/blockUsers.ts
var import_user3 = require_server_stub();
var blockUsersKey = Devvit.createForm(
  {
    title: "Block Users",
    description: "This ban users from all subreddits and challenges.",
    fields: [
      {
        type: "paragraph",
        name: "usernames",
        label: "Usernames",
        required: true,
        helpText: "Enter the usernames of the users you would like to block. Separate multiple usernames with commas."
      }
    ]
  },
  async ({ values }, ctx) => {
    const succeededUsernames = [];
    const failedUsernames = [];
    const items = values.usernames.split(",").map((username) => username.trim());
    if (items.length === 0) {
      ctx.ui.showToast("No usernames provided");
      return;
    }
    for (const username of items) {
      try {
        if (!ctx.subredditName) throw Error("no sub name");
        const user = await ctx.reddit.getUserByUsername(username);
        if (!user) throw Error("user not found");
        await (0, import_user3.userBlock)({
          redis: ctx.redis,
          userId: user.id
        });
        succeededUsernames.push(username);
      } catch (error) {
        console.error(error);
        failedUsernames.push(username);
      }
    }
    ctx.ui.showToast(`Succeeded: ${succeededUsernames.join(", ")}`);
    if (failedUsernames.length) {
      ctx.ui.showToast(`Failed: ${failedUsernames.join(", ")}`);
    }
  }
);
var blockUsersMenuAction = () => ({
  forUserType: ["moderator"],
  label: "[Field] Block Users",
  location: ["post", "subreddit"],
  onPress: (_ev, ctx) => {
    ctx.ui.showForm(blockUsersKey);
  }
});

// src/devvit/menu-actions/endCurrentChallenge.ts
var import_challenge = require_server_stub();
var import_field2 = require_server_stub();
var import_team11 = require_server_stub();
var endGameFormKey = Devvit.createForm(
  {
    title: "End Current Challenge",
    description: "This will immediately end the current challenge",
    fields: [
      {
        type: "boolean",
        name: "confirm",
        label: "Confirm End Game",
        defaultValue: false,
        helpText: "Are you sure you want to end the current challenge immediately?"
      }
    ]
  },
  async ({ values }, ctx) => {
    if (!values.confirm) {
      ctx.ui.showToast("Challenge end cancelled.");
      return;
    }
    try {
      const challengeNumber = await (0, import_challenge.challengeGetCurrentChallengeNumber)({
        redis: ctx.redis
      });
      const standings = await (0, import_team11.teamStatsCellsClaimedGetTotal)(
        ctx.redis,
        challengeNumber
      );
      await (0, import_field2.fieldEndGame)(ctx, challengeNumber, standings);
      ctx.ui.showToast(`Challenge #${challengeNumber} has been ended.`);
    } catch (error) {
      if (error instanceof Error) {
        ctx.ui.showToast(`Error: ${error.message}`);
      } else {
        ctx.ui.showToast("An error occurred while ending the challenge.");
      }
    }
  }
);
var endCurrentChallengeMenuAction = () => ({
  forUserType: ["moderator"],
  label: "[Field] End Current Challenge",
  location: ["post", "subreddit"],
  onPress: (_ev, ctx) => {
    ctx.ui.showForm(endGameFormKey);
  }
});

// src/devvit/menu-actions/getDefaultConfig.ts
var import_defaultChallengeConfig = require_server_stub();
var getDefaultConfigMenuAction = () => ({
  forUserType: ["moderator"],
  label: "[Field] Get Default Config",
  location: ["post", "subreddit"],
  onPress: async (_ev, ctx) => {
    const defaultConfig = await (0, import_defaultChallengeConfig.defaultChallengeConfigMaybeGet)({
      redis: ctx.redis
    });
    if (!defaultConfig) {
      ctx.ui.showToast("No default config found");
      return;
    }
    ctx.ui.showToast(`Default Config: ${JSON.stringify(defaultConfig)}`);
    console.log(`Default Config: ${JSON.stringify(defaultConfig)}`);
  }
});

// src/devvit/menu-actions/makeSuperUser.ts
var import_user4 = require_server_stub();
var superuserFormKey = Devvit.createForm(
  {
    title: "Make Superuser",
    description: "Gives the users added here super powers.",
    fields: [
      {
        type: "paragraph",
        name: "usernames",
        label: "Usernames",
        lineHeight: 4,
        helpText: "Separate multiple usernames with a comma.",
        required: true
      }
    ]
  },
  async ({ values }, ctx) => {
    const succeededUsernames = [];
    const failedUsernames = [];
    const items = values.usernames.split(",").map((username) => username.trim());
    if (items.length === 0) {
      ctx.ui.showToast("No usernames provided");
      return;
    }
    for (const username of items) {
      try {
        if (!ctx.subredditName) throw Error("no sub name");
        const user = await ctx.reddit.getUserByUsername(username);
        if (!user) throw Error("user not found");
        await (0, import_user4.userMakeSuperuser)({
          redis: ctx.redis,
          userId: user.id
        });
        succeededUsernames.push(username);
      } catch (error) {
        console.error(error);
        failedUsernames.push(username);
      }
    }
    ctx.ui.showToast(`Succeeded: ${succeededUsernames.join(", ")}`);
    if (failedUsernames.length) {
      ctx.ui.showToast(`Failed: ${failedUsernames.join(", ")}`);
    }
  }
);
var makeSuperUserMenuAction = () => ({
  forUserType: ["moderator"],
  label: "[Field] Make Superuser",
  location: ["post", "subreddit"],
  onPress: (_ev, ctx) => {
    ctx.ui.showForm(superuserFormKey);
  }
});

// src/devvit/menu-actions/nukeCells.ts
var import_challenge2 = require_server_stub();
var import_field3 = require_server_stub();
var superuserFormKey2 = Devvit.createForm(
  {
    title: "Nuke Cells",
    description: "Nuke cells through rainbow superpowers. Blasts around a given X,Y point. You can see the coordinates by playing selecting a cell. Choose the middle of the thing you want to blast.",
    fields: [
      { type: "number", name: "x", label: "X", required: true },
      { type: "number", name: "y", label: "Y", required: true },
      {
        type: "number",
        name: "blastRadius",
        label: "Blast Radius",
        required: true
      }
    ]
  },
  async ({ values }, ctx) => {
    try {
      if (!ctx.userId) {
        ctx.ui.showToast("Must be logged in to nuke!");
        return;
      }
      const challengeNumber = await (0, import_challenge2.challengeGetCurrentChallengeNumber)({
        redis: ctx.redis
      });
      const fieldConfig = await (0, import_challenge2.challengeConfigGet)({
        redis: ctx.redis,
        challengeNumber,
        subredditId: ctx.subredditId
      });
      (0, import_field3.enforceBounds)({
        coord: { x: values.x, y: values.y },
        rows: fieldConfig.size,
        cols: fieldConfig.size
      });
      if (values.blastRadius < 1) {
        throw new Error("Blast radius must be at least 1");
      }
      if (values.blastRadius > 10) {
        throw new Error("Blast radius must be at most 10");
      }
      await (0, import_field3.fieldNukeCells)({
        blastRadius: values.blastRadius,
        coord: { x: values.x, y: values.y },
        ctx,
        userId: ctx.userId,
        challengeNumber
      });
      ctx.ui.showToast("Cells nuked!");
    } catch (error) {
      if (error instanceof Error) {
        ctx.ui.showToast(error.message);
      } else {
        ctx.ui.showToast("An unknown error occurred");
      }
    }
  }
);
var nukeCellsMenuAction = () => ({
  forUserType: ["moderator"],
  label: "[Field] Nuke Cells",
  location: ["post", "subreddit"],
  onPress: (_ev, ctx) => {
    ctx.ui.showForm(superuserFormKey2);
  }
});

// src/devvit/menu-actions/resetGlobalPointCounter.ts
var import_user5 = require_server_stub();
var resetUserGlobalPointCountFormKey = Devvit.createForm(
  {
    title: "Reset Global Point Counter",
    description: "Reset the global point counter for a user.",
    fields: [
      {
        type: "string",
        label: "Username",
        name: "username",
        required: true
      }
    ]
  },
  async ({ values }, ctx) => {
    try {
      const user = await ctx.reddit.getUserByUsername(values.username);
      if (!user) {
        ctx.ui.showToast(`User ${values.username} not found`);
        return;
      }
      const profile = await (0, import_user5.userGet)({ redis: ctx.redis, userId: user.id });
      await (0, import_user5.userSet)({ redis: ctx.redis, user: { ...profile, globalPointCount: 0 } });
      ctx.ui.showToast(`User ${values.username} global point count reset`);
    } catch (error) {
      if (error instanceof Error) {
        ctx.ui.showToast(error.message);
      } else {
        ctx.ui.showToast("An unknown error occurred");
      }
    }
  }
);
var resetUserGlobalPointCountMenuAction = () => ({
  forUserType: ["moderator"],
  label: "[Field] Reset User Global Point Counter",
  location: ["post", "subreddit"],
  onPress: (_ev, ctx) => {
    ctx.ui.showForm(resetUserGlobalPointCountFormKey);
  }
});

// src/devvit/menu-actions/resetUserStartedPlayingAt.ts
var import_user6 = require_server_stub();
var resetUserStartedPlayingAtFormKey = Devvit.createForm(
  {
    title: "Reset Started Playing At",
    description: "Reset the started playing for a user.",
    fields: [
      {
        type: "string",
        label: "Username",
        name: "username",
        required: true
      }
    ]
  },
  async ({ values }, ctx) => {
    const user = await ctx.reddit.getUserByUsername(values.username);
    if (!user) {
      ctx.ui.showToast(`User ${values.username} not found`);
      return;
    }
    await (0, import_user6.userDeleteStartedPlayingAt)({
      redis: ctx.redis,
      userId: user.id
    });
    ctx.ui.showToast(`User ${values.username} started playing at reset`);
  }
);
var resetUserStartedPlayingAtMenuAction = () => ({
  forUserType: ["moderator"],
  label: "[Field] Reset User Started Playing At",
  location: ["post", "subreddit"],
  onPress: (_ev, ctx) => {
    ctx.ui.showForm(resetUserStartedPlayingAtFormKey);
  }
});

// src/shared/partition.ts
function partitionsPerSide({
  size,
  partitionSize
}) {
  return size / partitionSize;
}

// src/shared/validateChallengeConfig.ts
function validateChallengeConfig(config) {
  if (!Number.isInteger(config.size) || !Number.isInteger(config.partitionSize) || !Number.isInteger(config.mineDensity)) {
    throw new Error("Size, partitionSize, and mineDensity must be integers");
  }
  if (config.size < 1) {
    throw new Error("Size must be greater than 0");
  }
  if (config.partitionSize < 1) {
    throw new Error("Partition size must be greater than 0");
  }
  if (config.partitionSize > 1448) {
    throw new Error("Partition size must be less than or equal to 1448");
  }
  if (config.partitionSize > config.size) {
    throw new Error("Partition size must be less than or equal to size");
  }
  if (config.mineDensity < 0 || config.mineDensity > 100) {
    throw new Error("Mine density must be between 0 and 100");
  }
  if (config.size % config.partitionSize !== 0) {
    throw new Error(
      `Size ${config.size} must be divisible by partitionSize ${config.partitionSize}`
    );
  }
  if (partitionsPerSide(config) > 4) {
    throw new Error(
      `Size ${config.size} divided by partitionSize ${config.partitionSize} must be <= 4`
    );
  }
}

// src/shared/validateFieldArea.ts
function validateFieldArea(size) {
  const area = size * size;
  if (area > 3200 * 3200) {
    throw new Error(
      `Challenge size too large! This is only for testing right now until we find a more efficient way to return all items in a bitfield. At a minimum, we need to the partition a required command so we don't risk sending 10 million bits at once.`
    );
  }
}

// src/devvit/menu-actions/setDefaultConfig.ts
var import_challenge3 = require_server_stub();
var import_defaultChallengeConfig2 = require_server_stub();
var setDefaultConfigFormKey = Devvit.createForm(
  (args) => {
    const data = args;
    const defaults = (0, import_challenge3.makeFallbackDefaultChallengeConfig)();
    return {
      title: "Set Default Config",
      description: "Set the default config - takes effect on start of next challenge.",
      fields: [
        {
          type: "number",
          name: "size",
          label: "Size",
          defaultValue: data?.size ?? defaults.size,
          helpText: "The size of one side of the field. All fields must be a perfect square. For example, put in 10 if you want a 10x10 field (100 cells).",
          required: true
        },
        {
          type: "number",
          name: "partitionSize",
          label: "Partition Size",
          defaultValue: data?.partitionSize ?? defaults.partitionSize,
          helpText: "Must be perfectly divisible by the size given. For example, if you have a 10x10 field, you can put in 2 to have a 5x5 partition.",
          required: true
        },
        {
          type: "number",
          name: "mineDensity",
          label: "Mine Density",
          defaultValue: data?.mineDensity ?? defaults.mineDensity,
          helpText: "Number between 0 and 100. 0:No mines. 100:Only mines.",
          required: true
        },
        {
          type: "number",
          name: "targetGameDurationSeconds",
          label: "Target Game Duration (seconds)",
          defaultValue: 0,
          helpText: "Zero to disable autoscaling. Positive value gives target game duration (in seconds) for autoscaler to target."
        }
      ]
    };
  },
  async ({ values }, ctx) => {
    try {
      const defaultConfig = {
        size: values.size,
        partitionSize: values.partitionSize,
        mineDensity: values.mineDensity,
        targetGameDurationSeconds: values.targetGameDurationSeconds
      };
      validateChallengeConfig(defaultConfig);
      validateFieldArea(defaultConfig.size);
      await (0, import_defaultChallengeConfig2.defaultChallengeConfigSet)({ redis: ctx.redis, config: defaultConfig });
      ctx.ui.showToast("Default config updated successfully!");
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        ctx.ui.showToast(`${error.message}`);
      } else {
        console.error("Unknown error:", error);
        ctx.ui.showToast("Unable to validate config values. Please try again.");
      }
    }
  }
);
var setDefaultConfigMenuAction = () => ({
  forUserType: ["moderator"],
  label: "[Field] Set Default Config",
  location: ["post", "subreddit"],
  onPress: async (_ev, ctx) => {
    try {
      const currentDefaultConfig = await (0, import_defaultChallengeConfig2.defaultChallengeConfigMaybeGet)({
        redis: ctx.redis
      });
      ctx.ui.showForm(setDefaultConfigFormKey, currentDefaultConfig);
    } catch (error) {
      console.error("Error fetching default config:", error);
    }
  }
});

// src/devvit/menu-actions/setUserLevel.ts
var import_user7 = require_server_stub();
var setUserLevelFormKey = Devvit.createForm(
  {
    title: "Set User Level",
    description: "Set a user to a given level. Useful for testing.",
    fields: [
      {
        type: "string",
        label: "Username",
        name: "username",
        required: true
      },
      {
        type: "select",
        label: "Level",
        name: "level",
        required: true,
        options: [0, 1, 2, 3].map((x) => ({
          label: x.toString(),
          value: x.toString()
        }))
      }
    ]
  },
  async ({ values }, ctx) => {
    const user = await ctx.reddit.getUserByUsername(values.username);
    if (!user) {
      ctx.ui.showToast(`User ${values.username} not found`);
      return;
    }
    const newLevel = await (0, import_user7.userSetLevel)({
      level: parseInt(values.level[0], 10),
      redis: ctx.redis,
      userId: user.id
    });
    const newLevelConfig = config2.levels.find((x) => x.id === newLevel);
    if (!newLevelConfig) {
      ctx.ui.showToast(`Level ${newLevel} not found`);
      return;
    }
    ctx.ui.navigateTo(newLevelConfig.url);
  }
);
var setUserLevelMenuAction = () => ({
  forUserType: ["moderator"],
  label: "[Field] Set User Level",
  location: ["post", "subreddit"],
  onPress: (_ev, ctx) => {
    ctx.ui.showForm(setUserLevelFormKey);
  }
});

// src/devvit/menu-actions/unblockUsers.ts
var import_user8 = require_server_stub();
var unblockUserKey = Devvit.createForm(
  {
    title: "Unblock User",
    description: "This ban users from all subreddits and challenges.",
    fields: [
      {
        type: "paragraph",
        name: "usernames",
        label: "Usernames",
        required: true,
        helpText: "Enter the usernames of the users you would like to unblock. Separate multiple usernames with commas."
      }
    ]
  },
  async ({ values }, ctx) => {
    const succeededUsernames = [];
    const failedUsernames = [];
    const items = values.usernames.split(",").map((username) => username.trim());
    if (items.length === 0) {
      ctx.ui.showToast("No usernames provided");
      return;
    }
    for (const username of items) {
      try {
        if (!ctx.subredditName) throw Error("no sub name");
        const user = await ctx.reddit.getUserByUsername(username);
        if (!user) throw Error("user not found");
        await (0, import_user8.userUnblock)({
          redis: ctx.redis,
          userId: user.id
        });
        succeededUsernames.push(username);
      } catch (error) {
        console.error(error);
        failedUsernames.push(username);
      }
    }
    ctx.ui.showToast(`Succeeded: ${succeededUsernames.join(", ")}`);
    if (failedUsernames.length) {
      ctx.ui.showToast(`Failed: ${failedUsernames.join(", ")}`);
    }
  }
);
var unblockUsersMenuAction = () => ({
  forUserType: ["moderator"],
  label: "[Field] Unblock Users",
  location: ["post", "subreddit"],
  onPress: (_ev, ctx) => {
    ctx.ui.showForm(unblockUserKey);
  }
});

// src/shared/types/app-config.ts
function getDefaultAppConfig() {
  return {
    globalClickCooldownMillis: 1e3,
    globalActivePlayerHeartbeatMillis: 3e4,
    globalReloadSequence: 0,
    globalPDFDebug: 0,
    globalPDFGuessAfterMillis: 1e4,
    globalPDFGuessOffsetMillis: -1e3,
    globalPDFMaxDroppedPatches: 5,
    globalPDFMaxParallelFetches: 4,
    globalPDFMaxPatchesWithoutReplace: 100
  };
}

// src/devvit/menu-actions/updateLiveConfig.ts
var import_live_settings = require_server_stub();
var updateLiveConfigFormKey = Devvit.createForm(
  (current) => {
    const defaults = getDefaultAppConfig();
    return {
      title: "Update App Config",
      description: "Sets the app config - updates are immediately sent to all users.",
      fields: [
        {
          type: "number",
          name: "globalClickCooldownMillis",
          label: "Click cooldown time (ms)",
          defaultValue: current.globalClickCooldownMillis ?? defaults.globalClickCooldownMillis,
          helpText: `How long to force the user to wait before claiming another cell (default ${defaults.globalClickCooldownMillis}).`,
          required: true
        },
        {
          type: "number",
          name: "globalActivePlayerHeartbeatMillis",
          label: "Active heartbeat interval (ms)",
          defaultValue: current.globalActivePlayerHeartbeatMillis ?? defaults.globalActivePlayerHeartbeatMillis,
          helpText: `How often clients should send a heartbeat to the server (default ${defaults.globalActivePlayerHeartbeatMillis}).`,
          required: true
        },
        {
          type: "number",
          name: "globalReloadSequence",
          label: "Reload sequence",
          defaultValue: current.globalReloadSequence ?? defaults.globalReloadSequence,
          helpText: `Change this to a different, >0 value to force clients to reload (default ${defaults.globalReloadSequence}). USE WITH CARE.`,
          required: true
        },
        {
          type: "number",
          name: "globalPDFDebug",
          label: "Partition data fetcher: debug mode",
          defaultValue: current.globalPDFDebug ?? defaults.globalPDFDebug,
          helpText: `Debug mode (ints in [0, \u221E), default ${defaults.globalPDFDebug}). 0 is off, great is verbose.`,
          required: true
        },
        {
          type: "number",
          name: "globalPDFGuessAfterMillis",
          label: "Partition data fetcher: realtime silence tolerance (ms)",
          defaultValue: current.globalPDFGuessAfterMillis ?? defaults.globalPDFGuessAfterMillis,
          helpText: `Maximum duration without a realtime update before guessing sequences (ints in [0, \u221E), default ${defaults.globalPDFGuessAfterMillis}).`,
          required: true
        },
        {
          type: "number",
          name: "globalPDFGuessOffsetMillis",
          label: "Partition data fetcher: guess offset (ms)",
          defaultValue: current.globalPDFGuessOffsetMillis ?? defaults.globalPDFGuessOffsetMillis,
          helpText: `When guessing sequences, how far (backward is negative, forward is positive) to adjust the guess to increase the likelihood that the sequence exists (ints in [-\u221E, \u221E), default ${defaults.globalPDFGuessOffsetMillis}).`,
          required: true
        },
        {
          type: "number",
          name: "globalPDFMaxDroppedPatches",
          label: "Partition data fetcher: max dropped patches",
          defaultValue: current.globalPDFMaxDroppedPatches ?? defaults.globalPDFMaxDroppedPatches,
          helpText: `Maximum missed realtime patch messages before preferring a partition replace (ints in [0, \u221E), default ${defaults.globalPDFMaxDroppedPatches}).`,
          required: true
        },
        {
          type: "number",
          name: "globalPDFMaxParallelFetches",
          label: "Partition data fetcher: max parallel fetches",
          defaultValue: current.globalPDFMaxParallelFetches ?? defaults.globalPDFMaxParallelFetches,
          helpText: `Maximum concurrent fetch threads across all partitions (ints in [1, 16], default ${defaults.globalPDFMaxParallelFetches}).`,
          required: true
        },
        {
          type: "number",
          name: "globalPDFMaxPatchesWithoutReplace",
          label: "Partition data fetcher: mandatory replace sequence period",
          defaultValue: current.globalPDFMaxPatchesWithoutReplace ?? defaults.globalPDFMaxPatchesWithoutReplace,
          helpText: `The max sequences to go without fetching a replace instead of just patches (ints in [0, \u221E), default ${defaults.globalPDFMaxPatchesWithoutReplace}).`,
          required: true
        }
      ]
    };
  },
  async ({ values: newLiveConfig }, ctx) => {
    try {
      validateLiveConfig(newLiveConfig);
      await (0, import_live_settings.liveSettingsUpdate)(ctx, newLiveConfig);
      ctx.ui.showToast("Updated live config!");
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        ctx.ui.showToast(`${error.message}`);
      } else {
        console.error("Unknown error:", error);
        ctx.ui.showToast("Unable to validate config values. Please try again.");
      }
    }
  }
);
function validateLiveConfig(newConfig) {
  if (!Number.isInteger(newConfig.globalClickCooldownMillis) || !Number.isInteger(newConfig.globalActivePlayerHeartbeatMillis) || !Number.isInteger(newConfig.globalReloadSequence)) {
    throw new Error(
      "Click cooldown, server polling time, reload sequence must be integers"
    );
  }
  if (newConfig.globalClickCooldownMillis < 0) {
    throw new Error("Click cooldown must be greater than or equal to 0");
  }
  if (newConfig.globalReloadSequence < 0) {
    throw new Error("Reload sequence must be greater than or equal to 0");
  }
  if (newConfig.globalActivePlayerHeartbeatMillis < 250) {
    throw new Error(
      "Server polling time must be greater than or equal to 250ms"
    );
  }
  if (!Number.isInteger(newConfig.globalPDFMaxDroppedPatches) || newConfig.globalPDFMaxDroppedPatches < 0 || !Number.isInteger(newConfig.globalPDFGuessAfterMillis) || newConfig.globalPDFGuessAfterMillis < 0 || !Number.isInteger(newConfig.globalPDFMaxPatchesWithoutReplace) || newConfig.globalPDFMaxPatchesWithoutReplace < 0)
    throw Error(
      "max dropped patches, guess after, and max patches without replace must be ints in [0, \u221E)"
    );
  if (!Number.isInteger(newConfig.globalPDFMaxParallelFetches) || newConfig.globalPDFMaxParallelFetches < 1 || newConfig.globalPDFMaxParallelFetches > 16)
    throw Error("max parallel fetches must be an int in [1, 16]");
  if (!Number.isInteger(newConfig.globalPDFGuessOffsetMillis))
    throw Error("guess offset must be an int in (-\u221E, \u221E)");
}
var updateLiveConfigMenuAction = () => ({
  forUserType: ["moderator"],
  label: "[Field] Update Live Config",
  location: ["post", "subreddit"],
  onPress: async (_ev, ctx) => {
    const currentLiveConfig = await (0, import_live_settings.liveSettingsGet)({
      redis: ctx.redis
    });
    ctx.ui.showForm(updateLiveConfigFormKey, currentLiveConfig);
  }
});

// src/main.tsx
var import_challenge4 = require_server_stub();
var import_defaultChallengeConfig3 = require_server_stub();
var import_loadgen = require_server_stub();
Devvit.configure({ http: true, redditAPI: true, redis: true, realtime: true });
Devvit.addCustomPostType({ name: "", height: "tall", render: AppPauser });
var newPostFormKey = Devvit.createForm(
  (data) => {
    const defaults = (0, import_challenge4.makeFallbackDefaultChallengeConfig)();
    return {
      title: "New BanField Post",
      description: "Used for development purposes only! In production, there will only be one field post per subreddit.",
      fields: [
        {
          type: "number",
          name: "size",
          label: "Size",
          defaultValue: data.currentDefaultSize || defaults.size,
          helpText: "The size of one side of the field. All fields must be a perfect square. For example, put in 10 if you want a 10x10 field (100 cells)."
        },
        {
          type: "number",
          name: "partitionSize",
          label: "Partition Size",
          defaultValue: data.currentDefaultPartitionSize || defaults.partitionSize,
          helpText: "Must be perfectly divisible by the size given. For example, if you have a 10x10 field, you can put in 2 to have a 5x5 partition."
        },
        {
          type: "number",
          name: "mineDensity",
          label: "Mine Density",
          defaultValue: data.currentDefaultMineDensity || defaults.mineDensity,
          helpText: "Number between 0 and 100. 0:No mines. 100:Only mines."
        }
      ]
    };
  },
  async ({ values }, ctx) => {
    try {
      const config = {
        size: values.size,
        partitionSize: values.partitionSize,
        mineDensity: values.mineDensity
      };
      validateChallengeConfig({
        size: config.size,
        partitionSize: config.partitionSize,
        mineDensity: config.mineDensity
      });
      validateFieldArea(config.size);
      await (0, import_challenge4.challengeMakeNew)({ ctx, config });
      if (!ctx.subredditName) throw Error("no sub name");
      const lvl = ctx.subredditName === config2.leaderboard.subredditName ? config2.leaderboard : config2.levels.find((lvl2) => lvl2.subredditName === ctx.subredditName);
      if (!lvl)
        throw Error(
          "Cannot find level, please add the subreddit name to the config file, upload, make a post, and fill in the rest of the config to continue."
        );
      const isLeaderboard = ctx.subredditName === config2.leaderboard.subredditName;
      const post = await ctx.reddit.submitPost({
        preview: isLeaderboard ? /* @__PURE__ */ Devvit.createElement(LeaderboardLoading, { pixelRatio: fallbackPixelRatio }) : /* @__PURE__ */ Devvit.createElement(
          DialogWelcomeLoading,
          {
            pixelRatio: fallbackPixelRatio,
            level: config2.levels.findIndex(
              (lvl2) => lvl2.subredditId === ctx.subredditId
            )
          }
        ),
        subredditName: ctx.subredditName,
        title: lvl.title
      });
      ctx.ui.navigateTo(post.url);
    } catch (error) {
      if (error instanceof Error) {
        ctx.ui.showToast(error.message);
      } else {
        ctx.ui.showToast("An error occurred, please try again.");
      }
    }
  }
);
Devvit.addMenuItem({
  forUserType: ["moderator"],
  label: "[Field] New Post",
  location: ["post", "subreddit"],
  onPress: async (_ev, ctx) => {
    try {
      const currentDefaultConfig = await (0, import_defaultChallengeConfig3.defaultChallengeConfigMaybeGet)({
        redis: ctx.redis
      });
      if (currentDefaultConfig) {
        ctx.ui.showForm(newPostFormKey, {
          currentDefaultSize: currentDefaultConfig?.size,
          currentDefaultPartitionSize: currentDefaultConfig?.partitionSize,
          currentDefaultMineDensity: currentDefaultConfig?.mineDensity
        });
        return;
      }
    } catch (error) {
      console.error("Error fetching default config:", error);
    }
    ctx.ui.showForm(newPostFormKey);
  }
});
Devvit.addMenuItem(makeSuperUserMenuAction());
Devvit.addMenuItem(setUserLevelMenuAction());
Devvit.addMenuItem(setDefaultConfigMenuAction());
Devvit.addMenuItem(getDefaultConfigMenuAction());
Devvit.addMenuItem(updateLiveConfigMenuAction());
Devvit.addMenuItem(endCurrentChallengeMenuAction());
Devvit.addMenuItem(nukeCellsMenuAction());
Devvit.addMenuItem(blockUsersMenuAction());
Devvit.addMenuItem(unblockUsersMenuAction());
Devvit.addMenuItem(resetUserStartedPlayingAtMenuAction());
Devvit.addMenuItem(resetUserGlobalPointCountMenuAction());
Devvit.addSettings([
  {
    scope: SettingScope.App,
    name: "aws-access-key",
    label: "AWS Access Key",
    type: "string",
    isSecret: true
  },
  {
    scope: SettingScope.App,
    name: "aws-secret",
    label: "AWS Secret",
    type: "string",
    isSecret: true
  },
  {
    scope: SettingScope.App,
    name: "drive-load-claims-per-sec",
    label: "Set to positive number, and scheduled handler will generate this many random claims per second",
    type: "number",
    defaultValue: 0
  },
  {
    scope: SettingScope.App,
    name: "drive-load-stride",
    label: "Set to true, and driven load will select cells in order instead of randomly",
    type: "boolean",
    defaultValue: false
  },
  {
    scope: SettingScope.App,
    name: "realtime-batch-enabled",
    label: "Set to true to reduce realtime publish RPS",
    type: "boolean",
    defaultValue: true
  },
  {
    scope: SettingScope.App,
    name: "s3-bucket",
    label: "S3 bucket",
    type: "string",
    defaultValue: "reddit-service-devvit-webview-assets-a1"
  },
  {
    scope: SettingScope.App,
    name: "s3-region",
    label: "S3 region",
    type: "string",
    defaultValue: "us-east-1"
  },
  {
    scope: SettingScope.App,
    name: "s3-path-prefix",
    label: "S3 path prefix",
    type: "string",
    defaultValue: "dev/default"
  },
  {
    scope: SettingScope.App,
    name: "workqueue-debug",
    label: "Set to true to enable workqueue debug logging",
    type: "boolean",
    defaultValue: false
  },
  {
    scope: SettingScope.App,
    name: "workqueue-polling-interval-ms",
    label: "Milliseconds to wait after completing each batch of claimed tasks",
    type: "number",
    defaultValue: 10
  },
  {
    scope: SettingScope.App,
    name: "workqueue-batch-realtime-send",
    label: 'Set to "true" to use realtime batching, which transmits fewer messages',
    type: "string",
    defaultValue: "false"
  },
  {
    scope: SettingScope.App,
    name: "skip-comment-create",
    label: 'Set to "true" to skip comment creation handling',
    type: "string",
    defaultValue: "false"
  }
]);
var main_default = class extends Devvit {
  constructor(config) {
    super(config);
    config.provides(import_protos34.HelloDefinition);
  }
  async Ping(msg, meta) {
    if (!msg.delayMillis) return msg;
    const ctx = Object.assign(
      makeAPIClients({ metadata: meta ?? {} }),
      getContextFromMetadata(meta ?? {})
    );
    const number = await (0, import_challenge4.challengeGetCurrentChallengeNumber)({ redis: ctx.redis });
    await (0, import_loadgen.generateClaim)(ctx, number);
    return msg;
  }
};
/*! Bundled license information:

shallow-clone/index.js:
  (*!
   * shallow-clone <https://github.com/jonschlinkert/shallow-clone>
   *
   * Copyright (c) 2015-present, Jon Schlinkert.
   * Released under the MIT License.
   *)

isobject/index.js:
  (*!
   * isobject <https://github.com/jonschlinkert/isobject>
   *
   * Copyright (c) 2014-2017, Jon Schlinkert.
   * Released under the MIT License.
   *)

is-plain-object/index.js:
  (*!
   * is-plain-object <https://github.com/jonschlinkert/is-plain-object>
   *
   * Copyright (c) 2014-2017, Jon Schlinkert.
   * Released under the MIT License.
   *)
*/

