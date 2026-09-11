//#region ../../utils/dist/rrweb-utils.js
Array.isArray;
var ObjProto = Object.prototype;
ObjProto.hasOwnProperty;
ObjProto.toString;
var MOBILE = "Mobile";
var TABLET = "Tablet";
var NINTENDO = "Nintendo";
var PLAYSTATION = "PlayStation";
var XBOX = "Xbox";
var WINDOWS = "Windows";
"" + MOBILE.toLowerCase();
"" + TABLET.toLowerCase();
new RegExp(XBOX, "i");
new RegExp(NINTENDO, "i"), new RegExp(PLAYSTATION, "i"), new RegExp(WINDOWS, "i");
Date.prototype.getTime;
Date.prototype.toISOString;
var EXCEPTION_STEP_INTERNAL_FIELDS = {
	MESSAGE: "$message",
	TIMESTAMP: "$timestamp"
};
EXCEPTION_STEP_INTERNAL_FIELDS.MESSAGE, EXCEPTION_STEP_INTERNAL_FIELDS.TIMESTAMP;
({
	trace: {
		text: "TRACE",
		number: 1
	},
	debug: {
		text: "DEBUG",
		number: 5
	},
	info: {
		text: "INFO",
		number: 9
	},
	warn: {
		text: "WARN",
		number: 13
	},
	error: {
		text: "ERROR",
		number: 17
	},
	fatal: {
		text: "FATAL",
		number: 21
	}
}).info;
var TRACE_ID_HEX = 32;
var SPAN_ID_HEX = 16;
"0".repeat(TRACE_ID_HEX);
"0".repeat(SPAN_ID_HEX);
var untaintedAccessorCache = Object.create(null);
untaintedAccessorCache.Node = Object.create(null);
untaintedAccessorCache.ShadowRoot = Object.create(null);
untaintedAccessorCache.MutationObserver = Object.create(null);
untaintedAccessorCache.Element = Object.create(null);
function isFunction(value) {
	return typeof value === "function";
}
function patch(source, name, replacement) {
	try {
		if (!(name in source)) return () => {};
		const original = source[name];
		const layer = { next: original };
		const callNext = function(...args) {
			return layer.next.apply(this, args);
		};
		const wrapped = replacement(callNext);
		if (typeof wrapped === "function") {
			wrapped.prototype = wrapped.prototype || {};
			Object.defineProperties(wrapped, {
				__rrweb_original__: {
					enumerable: false,
					value: original
				},
				__rrweb_layer__: {
					enumerable: false,
					value: layer
				}
			});
		}
		source[name] = wrapped;
		return () => {
			if (source[name] === wrapped) {
				source[name] = layer.next;
				return;
			}
			const layerOf = (method) => isFunction(method) ? method.__rrweb_layer__ ?? method.__posthog_layer__ : void 0;
			let current = source[name];
			let currentLayer = layerOf(current);
			while (currentLayer) {
				if (currentLayer.next === wrapped) {
					currentLayer.next = layer.next;
					return;
				}
				current = currentLayer.next;
				currentLayer = layerOf(current);
			}
		};
	} catch {
		return () => {};
	}
}
//#endregion
//#region \0@oxc-project+runtime@0.144.0/helpers/esm/typeof.js
function _typeof(o) {
	"@babel/helpers - typeof";
	return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
		return typeof o;
	} : function(o) {
		return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
	}, _typeof(o);
}
//#endregion
//#region \0@oxc-project+runtime@0.144.0/helpers/esm/toPrimitive.js
function toPrimitive(t, r) {
	if ("object" != _typeof(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
//#endregion
//#region \0@oxc-project+runtime@0.144.0/helpers/esm/toPropertyKey.js
function toPropertyKey(t) {
	var i = toPrimitive(t, "string");
	return "symbol" == _typeof(i) ? i : i + "";
}
//#endregion
//#region \0@oxc-project+runtime@0.144.0/helpers/esm/defineProperty.js
function _defineProperty(e, r, t) {
	return (r = toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[r] = t, e;
}
//#endregion
//#region src/error-stack-parser.ts
/**
* Class StackFrame is a fork of https://github.com/stacktracejs/stackframe/blob/master/stackframe.js
* I fork it because:
* 1. There are some build issues when importing this package.
* 2. Rewrites into typescript give us a better type interface.
* 3. StackFrame contains some functions we don't need.
*/
var StackFrame = class {
	constructor(obj) {
		_defineProperty(this, "fileName", void 0);
		_defineProperty(this, "functionName", void 0);
		_defineProperty(this, "lineNumber", void 0);
		_defineProperty(this, "columnNumber", void 0);
		this.fileName = obj.fileName || "";
		this.functionName = obj.functionName || "";
		this.lineNumber = obj.lineNumber;
		this.columnNumber = obj.columnNumber;
	}
	toString() {
		const lineNumber = this.lineNumber || "";
		const columnNumber = this.columnNumber || "";
		if (this.functionName) return `${this.functionName} (${this.fileName}:${lineNumber}:${columnNumber})`;
		return `${this.fileName}:${lineNumber}:${columnNumber}`;
	}
};
/**
* ErrorStackParser is a fork of https://github.com/stacktracejs/error-stack-parser/blob/master/error-stack-parser.js
* I fork it because:
* 1. There are some build issues when importing this package.
* 2. Rewrites into typescript give us a better type interface.
*/
var FIREFOX_SAFARI_STACK_REGEXP = /(^|@)\S+:\d+/;
var CHROME_IE_STACK_REGEXP = /^\s*at .*(\S+:\d+|\(native\))/m;
var SAFARI_NATIVE_CODE_REGEXP = /^(eval@)?(\[native code])?$/;
var ErrorStackParser = {
	/**
	* Given an Error object, extract the most information from it.
	*/
	parse: function(error) {
		if (!error) return [];
		if (typeof error.stacktrace !== "undefined" || typeof error["opera#sourceloc"] !== "undefined") return this.parseOpera(error);
		else if (error.stack && error.stack.match(CHROME_IE_STACK_REGEXP)) return this.parseV8OrIE(error);
		else if (error.stack) return this.parseFFOrSafari(error);
		else return [];
	},
	extractLocation: function(urlLike) {
		if (urlLike.indexOf(":") === -1) return [urlLike];
		const parts = /(.+?)(?::(\d+))?(?::(\d+))?$/.exec(urlLike.replace(/[()]/g, ""));
		if (!parts) throw new Error(`Cannot parse given url: ${urlLike}`);
		return [
			parts[1],
			parts[2] || void 0,
			parts[3] || void 0
		];
	},
	parseV8OrIE: function(error) {
		return error.stack.split("\n").filter(function(line) {
			return !!line.match(CHROME_IE_STACK_REGEXP);
		}, this).map(function(line) {
			if (line.indexOf("(eval ") > -1) line = line.replace(/eval code/g, "eval").replace(/(\(eval at [^()]*)|(\),.*$)/g, "");
			let sanitizedLine = line.replace(/^\s+/, "").replace(/\(eval code/g, "(");
			const location = sanitizedLine.match(/ (\((.+):(\d+):(\d+)\)$)/);
			sanitizedLine = location ? sanitizedLine.replace(location[0], "") : sanitizedLine;
			const tokens = sanitizedLine.split(/\s+/).slice(1);
			const locationParts = this.extractLocation(location ? location[1] : tokens.pop());
			return new StackFrame({
				functionName: tokens.join(" ") || void 0,
				fileName: ["eval", "<anonymous>"].indexOf(locationParts[0]) > -1 ? void 0 : locationParts[0],
				lineNumber: locationParts[1],
				columnNumber: locationParts[2]
			});
		}, this);
	},
	parseFFOrSafari: function(error) {
		return error.stack.split("\n").filter(function(line) {
			return !line.match(SAFARI_NATIVE_CODE_REGEXP);
		}, this).map(function(line) {
			if (line.indexOf(" > eval") > -1) line = line.replace(/ line (\d+)(?: > eval line \d+)* > eval:\d+:\d+/g, ":$1");
			if (line.indexOf("@") === -1 && line.indexOf(":") === -1) return new StackFrame({ functionName: line });
			else {
				const functionNameRegex = /((.*".+"[^@]*)?[^@]*)(?:@)/;
				const matches = line.match(functionNameRegex);
				const functionName = matches && matches[1] ? matches[1] : void 0;
				const locationParts = this.extractLocation(line.replace(functionNameRegex, ""));
				return new StackFrame({
					functionName,
					fileName: locationParts[0],
					lineNumber: locationParts[1],
					columnNumber: locationParts[2]
				});
			}
		}, this);
	},
	parseOpera: function(e) {
		if (!e.stacktrace || e.message.indexOf("\n") > -1 && e.message.split("\n").length > e.stacktrace.split("\n").length) return this.parseOpera9(e);
		else if (!e.stack) return this.parseOpera10(e);
		else return this.parseOpera11(e);
	},
	parseOpera9: function(e) {
		const lineRE = /Line (\d+).*script (?:in )?(\S+)/i;
		const lines = e.message.split("\n");
		const result = [];
		for (let i = 2, len = lines.length; i < len; i += 2) {
			const match = lineRE.exec(lines[i]);
			if (match) result.push(new StackFrame({
				fileName: match[2],
				lineNumber: parseFloat(match[1])
			}));
		}
		return result;
	},
	parseOpera10: function(e) {
		const lineRE = /Line (\d+).*script (?:in )?(\S+)(?:: In function (\S+))?$/i;
		const lines = e.stacktrace.split("\n");
		const result = [];
		for (let i = 0, len = lines.length; i < len; i += 2) {
			const match = lineRE.exec(lines[i]);
			if (match) result.push(new StackFrame({
				functionName: match[3] || void 0,
				fileName: match[2],
				lineNumber: parseFloat(match[1])
			}));
		}
		return result;
	},
	parseOpera11: function(error) {
		return error.stack.split("\n").filter(function(line) {
			return !!line.match(FIREFOX_SAFARI_STACK_REGEXP) && !line.match(/^Error created at/);
		}, this).map(function(line) {
			const tokens = line.split("@");
			const locationParts = this.extractLocation(tokens.pop());
			return new StackFrame({
				functionName: (tokens.shift() || "").replace(/<anonymous function(: (\w+))?>/, "$2").replace(/\([^)]*\)/g, "") || void 0,
				fileName: locationParts[0],
				lineNumber: locationParts[1],
				columnNumber: locationParts[2]
			});
		}, this);
	}
};
//#endregion
//#region src/stringify.ts
/**
* transfer the node path in Event to string
* @param node - the first node in a node path array
*/
function pathToSelector(node) {
	if (!node || !node.outerHTML) return "";
	let path = "";
	while (node.parentElement) {
		let name = node.localName;
		if (!name) break;
		name = name.toLowerCase();
		const parent = node.parentElement;
		const domSiblings = [];
		if (parent.children && parent.children.length > 0) for (let i = 0; i < parent.children.length; i++) {
			const sibling = parent.children[i];
			if (sibling.localName && sibling.localName.toLowerCase) {
				if (sibling.localName.toLowerCase() === name) domSiblings.push(sibling);
			}
		}
		if (domSiblings.length > 1) name += `:eq(${domSiblings.indexOf(node)})`;
		path = name + (path ? ">" + path : "");
		node = parent;
	}
	return path;
}
/**
* Check if a value is an array.
* This is safe with Proxy objects as Array.isArray checks an internal slot
* without triggering Proxy traps.
*/
function isArray(obj) {
	return Array.isArray(obj);
}
/**
* Check if a value is a plain object (not an array, null, or other type).
* Uses a simple check that avoids Object.prototype.toString.call() which
* can trigger Symbol.toStringTag access on Proxy objects, causing errors
* with Proxies that throw on Symbol property access.
*/
function isObject(obj) {
	return typeof obj === "object" && obj !== null && !isArray(obj);
}
/**
* judge the object's depth
*/
function isObjTooDeep(obj, limit) {
	if (limit === 0) return true;
	const keys = Object.keys(obj);
	for (const key of keys) if (isObject(obj[key]) && isObjTooDeep(obj[key], limit - 1)) return true;
	return false;
}
/**
* stringify any js object
* @param obj - the object to stringify
*/
function stringify(obj, stringifyOptions) {
	const options = {
		numOfKeysLimit: 50,
		depthOfLimit: 4
	};
	Object.assign(options, stringifyOptions);
	const stack = [];
	const keys = [];
	return JSON.stringify(obj, function(key, value) {
		/**
		* forked from https://github.com/moll/json-stringify-safe/blob/master/stringify.js
		* to deCycle the object
		*/
		if (stack.length > 0) {
			const thisPos = stack.indexOf(this);
			~thisPos ? stack.splice(thisPos + 1) : stack.push(this);
			~thisPos ? keys.splice(thisPos, Infinity, key) : keys.push(key);
			if (~stack.indexOf(value)) {
				if (stack[0] === value) value = "[Circular ~]";
				else value = "[Circular ~." + keys.slice(0, stack.indexOf(value)).join(".") + "]";
			}
		} else stack.push(value);
		if (value === null) return value;
		if (value === void 0) return "undefined";
		if (shouldIgnore(value)) return toString(value);
		if (typeof value === "bigint") return value.toString() + "n";
		if (value instanceof Event) {
			const eventResult = {};
			for (const eventKey in value) {
				const eventValue = value[eventKey];
				if (isArray(eventValue)) eventResult[eventKey] = pathToSelector(eventValue.length ? eventValue[0] : null);
				else eventResult[eventKey] = eventValue;
			}
			return eventResult;
		} else if (value instanceof Node) {
			if (value instanceof HTMLElement) return value ? value.outerHTML : "";
			return value.nodeName;
		} else if (value instanceof Error) return value.stack ? value.stack + "\nEnd of stack for Error object" : value.name + ": " + value.message;
		return value;
	});
	/**
	* whether we should ignore obj's info and call toString() function instead
	*/
	function shouldIgnore(_obj) {
		if (isObject(_obj) && Object.keys(_obj).length > options.numOfKeysLimit) return true;
		if (typeof _obj === "function") return true;
		/**
		* judge object's depth to avoid browser's OOM
		*
		* issues: https://github.com/rrweb-io/rrweb/issues/653
		*/
		if (isObject(_obj) && isObjTooDeep(_obj, options.depthOfLimit)) return true;
		return false;
	}
	/**
	* limit the toString() result according to option
	*/
	function toString(_obj) {
		let str = _obj.toString();
		if (options.stringLengthLimit && str.length > options.stringLengthLimit) str = `${str.slice(0, options.stringLengthLimit)}...`;
		return str;
	}
}
//#endregion
//#region src/index.ts
var defaultLogOptions = {
	level: [
		"assert",
		"clear",
		"count",
		"countReset",
		"debug",
		"dir",
		"dirxml",
		"error",
		"group",
		"groupCollapsed",
		"groupEnd",
		"info",
		"log",
		"table",
		"time",
		"timeEnd",
		"timeLog",
		"trace",
		"warn"
	],
	lengthThreshold: 1e3,
	logger: "console"
};
function initLogObserver(cb, win, options) {
	const logOptions = options ? Object.assign({}, defaultLogOptions, options) : defaultLogOptions;
	const loggerType = logOptions.logger;
	if (!loggerType) return () => {};
	let logger;
	if (typeof loggerType === "string") logger = win[loggerType];
	else logger = loggerType;
	let logCount = 0;
	let inStack = false;
	const cancelHandlers = [];
	if (logOptions.level.includes("error")) {
		const errorHandler = (event) => {
			const message = event.message, error = event.error;
			cb({
				level: "error",
				trace: ErrorStackParser.parse(error).map((stackFrame) => stackFrame.toString()),
				payload: [stringify(message, logOptions.stringifyOptions)]
			});
		};
		win.addEventListener("error", errorHandler);
		cancelHandlers.push(() => {
			win.removeEventListener("error", errorHandler);
		});
		const unhandledrejectionHandler = (event) => {
			let error;
			let payload;
			if (event.reason instanceof Error) {
				error = event.reason;
				payload = [stringify(`Uncaught (in promise) ${error.name}: ${error.message}`, logOptions.stringifyOptions)];
			} else {
				error = /* @__PURE__ */ new Error();
				payload = [stringify("Uncaught (in promise)", logOptions.stringifyOptions), stringify(event.reason, logOptions.stringifyOptions)];
			}
			cb({
				level: "error",
				trace: ErrorStackParser.parse(error).map((stackFrame) => stackFrame.toString()),
				payload
			});
		};
		win.addEventListener("unhandledrejection", unhandledrejectionHandler);
		cancelHandlers.push(() => {
			win.removeEventListener("unhandledrejection", unhandledrejectionHandler);
		});
	}
	for (const levelType of logOptions.level) cancelHandlers.push(replace(logger, levelType));
	return () => {
		cancelHandlers.forEach((h) => h());
	};
	/**
	* replace the original console function and record logs
	* @param logger - the logger object such as Console
	* @param level - the name of log function to be replaced
	*/
	function replace(_logger, level) {
		if (!_logger[level]) return () => {};
		return patch(_logger, level, (original) => {
			return (...args) => {
				original.apply(_logger, args);
				if (level === "assert" && !!args[0]) return;
				if (inStack) return;
				inStack = true;
				try {
					const trace = ErrorStackParser.parse(/* @__PURE__ */ new Error()).map((stackFrame) => stackFrame.toString()).splice(1);
					const payload = (level === "assert" ? args.slice(1) : args).map((s) => stringify(s, logOptions.stringifyOptions));
					logCount++;
					if (logCount < logOptions.lengthThreshold) cb({
						level,
						trace,
						payload
					});
					else if (logCount === logOptions.lengthThreshold) cb({
						level: "warn",
						trace: [],
						payload: [stringify("The number of log records reached the threshold.")]
					});
				} catch (error) {
					original.apply(_logger, [
						"rrweb logger error:",
						error,
						...args
					]);
				} finally {
					inStack = false;
				}
			};
		});
	}
}
var PLUGIN_NAME = "rrweb/console@1";
var getRecordConsolePlugin = (options) => ({
	name: PLUGIN_NAME,
	observer: initLogObserver,
	options
});
//#endregion
export { PLUGIN_NAME, getRecordConsolePlugin };

//# sourceMappingURL=rrweb-plugin-console-record.js.map