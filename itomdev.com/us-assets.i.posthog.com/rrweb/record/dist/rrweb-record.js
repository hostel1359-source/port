//#region ../types/dist/rrweb-types.js
var EventType = /* @__PURE__ */ function(EventType) {
	EventType[EventType["DomContentLoaded"] = 0] = "DomContentLoaded";
	EventType[EventType["Load"] = 1] = "Load";
	EventType[EventType["FullSnapshot"] = 2] = "FullSnapshot";
	EventType[EventType["IncrementalSnapshot"] = 3] = "IncrementalSnapshot";
	EventType[EventType["Meta"] = 4] = "Meta";
	EventType[EventType["Custom"] = 5] = "Custom";
	EventType[EventType["Plugin"] = 6] = "Plugin";
	return EventType;
}({});
/**
* Reserved custom-event tag emitted by the recorder when an element enters or
* exits the native Fullscreen API. Native fullscreen is rendered by the UA
* `:fullscreen` pseudo-class with no DOM mutation, so rrweb captures nothing —
* this event lets the replayer re-apply fullscreen layout on playback.
*/
var FullscreenCustomEventTag = "rrweb/fullscreen";
var IncrementalSource = /* @__PURE__ */ function(IncrementalSource) {
	IncrementalSource[IncrementalSource["Mutation"] = 0] = "Mutation";
	IncrementalSource[IncrementalSource["MouseMove"] = 1] = "MouseMove";
	IncrementalSource[IncrementalSource["MouseInteraction"] = 2] = "MouseInteraction";
	IncrementalSource[IncrementalSource["Scroll"] = 3] = "Scroll";
	IncrementalSource[IncrementalSource["ViewportResize"] = 4] = "ViewportResize";
	IncrementalSource[IncrementalSource["Input"] = 5] = "Input";
	IncrementalSource[IncrementalSource["TouchMove"] = 6] = "TouchMove";
	IncrementalSource[IncrementalSource["MediaInteraction"] = 7] = "MediaInteraction";
	IncrementalSource[IncrementalSource["StyleSheetRule"] = 8] = "StyleSheetRule";
	IncrementalSource[IncrementalSource["CanvasMutation"] = 9] = "CanvasMutation";
	IncrementalSource[IncrementalSource["Font"] = 10] = "Font";
	IncrementalSource[IncrementalSource["Log"] = 11] = "Log";
	IncrementalSource[IncrementalSource["Drag"] = 12] = "Drag";
	IncrementalSource[IncrementalSource["StyleDeclaration"] = 13] = "StyleDeclaration";
	IncrementalSource[IncrementalSource["Selection"] = 14] = "Selection";
	IncrementalSource[IncrementalSource["AdoptedStyleSheet"] = 15] = "AdoptedStyleSheet";
	IncrementalSource[IncrementalSource["CustomElement"] = 16] = "CustomElement";
	return IncrementalSource;
}({});
var MouseInteractions = /* @__PURE__ */ function(MouseInteractions) {
	MouseInteractions[MouseInteractions["MouseUp"] = 0] = "MouseUp";
	MouseInteractions[MouseInteractions["MouseDown"] = 1] = "MouseDown";
	MouseInteractions[MouseInteractions["Click"] = 2] = "Click";
	MouseInteractions[MouseInteractions["ContextMenu"] = 3] = "ContextMenu";
	MouseInteractions[MouseInteractions["DblClick"] = 4] = "DblClick";
	MouseInteractions[MouseInteractions["Focus"] = 5] = "Focus";
	MouseInteractions[MouseInteractions["Blur"] = 6] = "Blur";
	MouseInteractions[MouseInteractions["TouchStart"] = 7] = "TouchStart";
	MouseInteractions[MouseInteractions["TouchMove_Departed"] = 8] = "TouchMove_Departed";
	MouseInteractions[MouseInteractions["TouchEnd"] = 9] = "TouchEnd";
	MouseInteractions[MouseInteractions["TouchCancel"] = 10] = "TouchCancel";
	return MouseInteractions;
}({});
var PointerTypes = /* @__PURE__ */ function(PointerTypes) {
	PointerTypes[PointerTypes["Mouse"] = 0] = "Mouse";
	PointerTypes[PointerTypes["Pen"] = 1] = "Pen";
	PointerTypes[PointerTypes["Touch"] = 2] = "Touch";
	return PointerTypes;
}({});
var CanvasContext = /* @__PURE__ */ function(CanvasContext) {
	CanvasContext[CanvasContext["2D"] = 0] = "2D";
	CanvasContext[CanvasContext["WebGL"] = 1] = "WebGL";
	CanvasContext[CanvasContext["WebGL2"] = 2] = "WebGL2";
	return CanvasContext;
}({});
var MediaInteractions = /* @__PURE__ */ function(MediaInteractions) {
	MediaInteractions[MediaInteractions["Play"] = 0] = "Play";
	MediaInteractions[MediaInteractions["Pause"] = 1] = "Pause";
	MediaInteractions[MediaInteractions["Seeked"] = 2] = "Seeked";
	MediaInteractions[MediaInteractions["VolumeChange"] = 3] = "VolumeChange";
	MediaInteractions[MediaInteractions["RateChange"] = 4] = "RateChange";
	return MediaInteractions;
}({});
var NodeType = /* @__PURE__ */ function(NodeType) {
	NodeType[NodeType["Document"] = 0] = "Document";
	NodeType[NodeType["DocumentType"] = 1] = "DocumentType";
	NodeType[NodeType["Element"] = 2] = "Element";
	NodeType[NodeType["Text"] = 3] = "Text";
	NodeType[NodeType["CDATA"] = 4] = "CDATA";
	NodeType[NodeType["Comment"] = 5] = "Comment";
	return NodeType;
}({});
//#endregion
//#region ../utils/dist/rrweb-utils.js
function includes(str, needle) {
	return -1 !== str.indexOf(needle);
}
Array.isArray;
var ObjProto = Object.prototype;
ObjProto.hasOwnProperty;
ObjProto.toString;
function isWebKit(userAgent) {
	return includes(userAgent, "AppleWebKit") && !includes(userAgent, "Chrome");
}
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
var testableAccessors = {
	Node: [
		"childNodes",
		"parentNode",
		"parentElement",
		"textContent"
	],
	ShadowRoot: ["host", "styleSheets"],
	Element: ["shadowRoot"],
	MutationObserver: []
};
var testableMethods = {
	Node: ["contains", "getRootNode"],
	ShadowRoot: ["getSelection"],
	Element: ["querySelector", "querySelectorAll"],
	MutationObserver: ["constructor"]
};
var untaintedBasePrototype = {};
function angularZoneUnpatchedAlternative(key) {
	var _globalThis, _globalThis$__symbol_;
	const angularUnpatchedVersionSymbol = (_globalThis = globalThis) === null || _globalThis === void 0 || (_globalThis = _globalThis.Zone) === null || _globalThis === void 0 || (_globalThis$__symbol_ = _globalThis.__symbol__) === null || _globalThis$__symbol_ === void 0 ? void 0 : _globalThis$__symbol_.call(_globalThis, key);
	if (angularUnpatchedVersionSymbol && globalThis[angularUnpatchedVersionSymbol]) return globalThis[angularUnpatchedVersionSymbol];
	else return;
}
function getUntaintedPrototype(key) {
	if (untaintedBasePrototype[key]) return untaintedBasePrototype[key];
	const candidate = angularZoneUnpatchedAlternative(key) || globalThis[key];
	const defaultPrototype = candidate.prototype;
	const accessorNames = key in testableAccessors ? testableAccessors[key] : void 0;
	const isUntaintedAccessors = Boolean(accessorNames && accessorNames.every((accessor) => {
		var _Object$getOwnPropert;
		return Boolean((_Object$getOwnPropert = Object.getOwnPropertyDescriptor(defaultPrototype, accessor)) === null || _Object$getOwnPropert === void 0 || (_Object$getOwnPropert = _Object$getOwnPropert.get) === null || _Object$getOwnPropert === void 0 ? void 0 : _Object$getOwnPropert.toString().includes("[native code]"));
	}));
	const methodNames = key in testableMethods ? testableMethods[key] : void 0;
	const isUntaintedMethods = Boolean(methodNames && methodNames.every((method) => {
		var _defaultPrototype$met;
		return typeof defaultPrototype[method] === "function" && ((_defaultPrototype$met = defaultPrototype[method]) === null || _defaultPrototype$met === void 0 ? void 0 : _defaultPrototype$met.toString().includes("[native code]"));
	}));
	if (isUntaintedAccessors && isUntaintedMethods) {
		untaintedBasePrototype[key] = candidate.prototype;
		return candidate.prototype;
	}
	const iframeEl = document.createElement("iframe");
	iframeEl.style.display = "none";
	let keepIframeAttached = false;
	try {
		document.body.appendChild(iframeEl);
		const win = iframeEl.contentWindow;
		if (!win) return candidate.prototype;
		const untaintedObject = win[key].prototype;
		if (!untaintedObject) return defaultPrototype;
		if (isWebKit(navigator.userAgent)) {
			iframeEl.classList.add("rr-block", "ph-no-capture");
			iframeEl.setAttribute("__rrwebUntaintedPrototype", key);
			keepIframeAttached = true;
		}
		return untaintedBasePrototype[key] = untaintedObject;
	} catch {
		return defaultPrototype;
	} finally {
		if (!keepIframeAttached && iframeEl.parentNode) document.body.removeChild(iframeEl);
	}
}
var untaintedAccessorCache = Object.create(null);
untaintedAccessorCache.Node = Object.create(null);
untaintedAccessorCache.ShadowRoot = Object.create(null);
untaintedAccessorCache.MutationObserver = Object.create(null);
untaintedAccessorCache.Element = Object.create(null);
function getUntaintedAccessor(key, instance, accessor) {
	var _Object$getOwnPropert2;
	const cache = untaintedAccessorCache[key];
	const cached = cache[accessor];
	if (cached) return cached.call(instance);
	const untaintedPrototype = getUntaintedPrototype(key);
	const untaintedAccessor = (_Object$getOwnPropert2 = Object.getOwnPropertyDescriptor(untaintedPrototype, accessor)) === null || _Object$getOwnPropert2 === void 0 ? void 0 : _Object$getOwnPropert2.get;
	if (!untaintedAccessor) return instance[accessor];
	cache[accessor] = untaintedAccessor;
	return untaintedAccessor.call(instance);
}
var untaintedMethodCache = {};
function getUntaintedMethod(key, instance, method) {
	const cacheKey = `${key}.${String(method)}`;
	if (untaintedMethodCache[cacheKey]) return untaintedMethodCache[cacheKey].bind(instance);
	const untaintedMethod = getUntaintedPrototype(key)[method];
	if (typeof untaintedMethod !== "function") return instance[method];
	untaintedMethodCache[cacheKey] = untaintedMethod;
	return untaintedMethod.bind(instance);
}
function childNodes(n) {
	return getUntaintedAccessor("Node", n, "childNodes");
}
function parentNode(n) {
	return getUntaintedAccessor("Node", n, "parentNode");
}
function parentElement(n) {
	return getUntaintedAccessor("Node", n, "parentElement");
}
function textContent(n) {
	return getUntaintedAccessor("Node", n, "textContent");
}
var isConnectedGetter;
function isConnected(n) {
	if (isConnectedGetter === void 0) {
		var _Object$getOwnPropert3;
		const getter = (_Object$getOwnPropert3 = Object.getOwnPropertyDescriptor(getUntaintedPrototype("Node"), "isConnected")) === null || _Object$getOwnPropert3 === void 0 ? void 0 : _Object$getOwnPropert3.get;
		isConnectedGetter = (getter === null || getter === void 0 ? void 0 : getter.toString().includes("[native code]")) ? getter : null;
	}
	return isConnectedGetter === null || isConnectedGetter === void 0 ? void 0 : isConnectedGetter.call(n);
}
function contains(n, other) {
	return getUntaintedMethod("Node", n, "contains")(other);
}
function getRootNode(n) {
	return getUntaintedMethod("Node", n, "getRootNode")();
}
function host(n) {
	if (!n || !("host" in n)) return null;
	return getUntaintedAccessor("ShadowRoot", n, "host");
}
function styleSheets(n) {
	return n.styleSheets;
}
function shadowRoot(n) {
	if (!n || !("shadowRoot" in n)) return null;
	return getUntaintedAccessor("Element", n, "shadowRoot");
}
function querySelector(n, selectors) {
	return getUntaintedMethod("Element", n, "querySelector")(selectors);
}
function querySelectorAll(n, selectors) {
	return getUntaintedMethod("Element", n, "querySelectorAll")(selectors);
}
function mutationObserverCtor() {
	return getUntaintedPrototype("MutationObserver").constructor;
}
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
var src_default = {
	childNodes,
	parentNode,
	parentElement,
	textContent,
	isConnected,
	contains,
	getRootNode,
	host,
	styleSheets,
	shadowRoot,
	querySelector,
	querySelectorAll,
	mutationObserver: mutationObserverCtor,
	patch
};
//#endregion
//#region ../rrweb-snapshot/src/snapshot-cost.ts
var emptyCost = () => ({
	durationMs: 0,
	stylesheetMs: 0,
	nodeCount: 0,
	cssRuleCount: 0,
	nonDeferrableCssRuleCount: 0,
	deferredStylesheetCount: 0
});
var emptyDeferredStats = () => ({
	deferredCount: 0,
	failedCount: 0,
	abandonedCount: 0,
	totalMs: 0,
	slowestSliceMs: 0
});
function nowMs() {
	try {
		if (typeof performance !== "undefined" && performance.now) return performance.now();
	} catch (e) {}
	return Date.now();
}
/**
* A backgrounded renderer can be suspended (Page Lifecycle freeze, OS-level
* process suspension) between a measurement's start and end reads, so a
* wall-clock delta can measure sleep rather than main-thread work; fleet data
* showed a full-snapshot "duration" of ~266s from exactly this. Two guards
* keep those artifacts out of the gauges:
* - a suspension generation, bumped by the recorder on `visibilitychange` and
*   the Page Lifecycle `freeze`/`resume` events: a sample whose window
*   straddles a bump is discarded. This catches multi-task windows and nested
*   event loops (alert, sync XHR) inside otherwise synchronous windows;
* - a plausibility cap: an OS suspension mid-task fires no event that a
*   handler could observe mid-window, so a single-task window that "measures"
*   longer than the cap is treated as having spanned a suspension.
* Discarded samples are counted so the discard itself stays observable.
*/
var suspensionGeneration = 0;
var discardedDurationSamples = 0;
/** Recorder hook: the document changed visibility or froze/resumed. */
function noteVisibilityChange() {
	suspensionGeneration += 1;
}
/** Capture at a measurement window's start; pass to the matching record call. */
function getSuspensionGeneration() {
	return suspensionGeneration;
}
function getDiscardedDurationSamples() {
	return discardedDurationSamples;
}
/** True (and counted) when a duration sample must not reach any gauge. */
function discardImplausibleDurationSample(ms, startGeneration) {
	if (startGeneration !== suspensionGeneration || ms > 6e4) {
		discardedDurationSamples += 1;
		return true;
	}
	return false;
}
var trackingDepth = 0;
var startedAt = 0;
var startGeneration = 0;
var inProgress = emptyCost();
var lastCost = null;
var stylesheetBudgetRules = null;
var deferredStylesheetLinks = [];
var deferredLinkCount = 0;
var nonDeferrableDepth = 0;
var mutationCost = { slowestBatchMs: 0 };
var deferredStylesheetStats = emptyDeferredStats();
var positiveOrNull = (n) => n && n > 0 ? n : null;
/**
* @param budgetRules cap on the number of CSSRules this snapshot may stringify.
* Sheets beyond the cap are collected by {@link takeDeferredStylesheetLinks} so the
* caller can inline them off the critical path. Pass `null`/`0` for no cap.
*
* Rule count rather than elapsed time, deliberately: elapsed time makes the split
* depend on how contended the machine happens to be, so the same page would defer
* different sheets from load to load. Rule count is a stable proxy - `cssText` cost
* is roughly uniform per rule - and keeps the emitted event stream deterministic.
*/
function beginSnapshotCostTracking(budgetRules) {
	trackingDepth += 1;
	if (trackingDepth > 1) return;
	inProgress = emptyCost();
	deferredStylesheetLinks = [];
	deferredLinkCount = 0;
	stylesheetBudgetRules = positiveOrNull(budgetRules);
	startedAt = nowMs();
	startGeneration = suspensionGeneration;
}
function endSnapshotCostTracking() {
	if (trackingDepth === 0) return lastCost || emptyCost();
	trackingDepth -= 1;
	if (trackingDepth > 0) return inProgress;
	inProgress.durationMs = nowMs() - startedAt;
	inProgress.deferredStylesheetCount = deferredLinkCount;
	deferredStylesheetStats.deferredCount += deferredLinkCount;
	stylesheetBudgetRules = null;
	if (discardImplausibleDurationSample(inProgress.durationMs, startGeneration)) return inProgress;
	lastCost = inProgress;
	return lastCost;
}
/** Cost of the most recent completed `snapshot()`, or null if none has run. */
function getLastSnapshotCost() {
	return lastCost;
}
function countSerializedNode() {
	if (trackingDepth > 0) inProgress.nodeCount += 1;
}
var MAX_COUNT_DEPTH = 32;
/**
* Rules in a list, descending grouping rules (`@media`, `@supports`, `@layer`,
* native nesting) to any depth - counting only the top level would let a
* media-query-organised framework consume the budget at ~1 rule per block and
* sail past the cap sheet after sheet. When `visitedSheets` is given, also
* descends into `@import`ed sheets, each at most once so cyclic or
* diamond-shaped import graphs terminate. Unreadable rules (cross-origin
* `@import`) cost nothing: `stringifyStylesheet` can't read them either.
*/
function countRuleList(rules, visitedSheets, depth) {
	let total = rules.length;
	if (depth >= MAX_COUNT_DEPTH) return total;
	for (let i = 0; i < rules.length; i++) {
		const rule = rules[i];
		try {
			const nested = rule.cssRules;
			if (nested && nested.length) total += countRuleList(nested, visitedSheets, depth + 1);
			else if (visitedSheets && rule.styleSheet) {
				const imported = rule.styleSheet;
				if (!visitedSheets.has(imported)) {
					visitedSheets.add(imported);
					const importedRules = imported.rules || imported.cssRules;
					if (importedRules) total += countRuleList(importedRules, visitedSheets, depth + 1);
				}
			}
		} catch (e) {}
	}
	return total;
}
/**
* Charge a stringified sheet's rules to the running total, in the same units
* as {@link safeCssRuleCount} estimates. `@import`ed sheets are charged by
* their own `stringifyStylesheet` recursion, so they are not descended here.
*/
function countStylesheetRules(rules) {
	if (trackingDepth === 0) return;
	const counted = countRuleList(rules, null, 0);
	inProgress.cssRuleCount += counted;
	if (nonDeferrableDepth > 0) inProgress.nonDeferrableCssRuleCount += counted;
}
/**
* Run `fn` with its stylesheet rule counts marked as never-deferrable. The
* rules still show up in `cssRuleCount` (and in `nonDeferrableCssRuleCount`),
* but they don't charge the inlining budget: a CSSOM-dominated page (e.g.
* styled-components/Emotion `insertRule` output) gets no freeze reduction from
* deferring, so charging it would push ordinary `<link>` sheets into deferral
* for pure fidelity cost.
*/
function runNonDeferrableStylesheetWork(fn) {
	nonDeferrableDepth += 1;
	try {
		return fn();
	} finally {
		nonDeferrableDepth -= 1;
	}
}
function recordStylesheetCost(ms) {
	if (trackingDepth > 0) inProgress.stylesheetMs += ms;
}
/**
* Whether inlining `sheet` would take this snapshot past its stylesheet budget.
* Always false when no budget is configured or no snapshot is in progress, i.e.
* the incremental mutation path is never capped. Guards run before the rule
* count so the unbudgeted paths never pay the walk over the sheet's rules.
*/
function shouldDeferStylesheetInlining(sheet) {
	if (trackingDepth === 0 || stylesheetBudgetRules === null) return false;
	const chargedRuleCount = inProgress.cssRuleCount - inProgress.nonDeferrableCssRuleCount;
	if (chargedRuleCount >= stylesheetBudgetRules) return true;
	return chargedRuleCount + safeCssRuleCount(sheet) > stylesheetBudgetRules;
}
/**
* Rules a sheet would cost to stringify, or 0 when it can't be read at all
* (e.g. cross-origin, where `stringifyStylesheet` bails immediately anyway).
* A sheet that throws partway through still returns the rules counted so far:
* returning 0 would wave a huge but partly-unreadable sheet past the budget.
* See {@link countRuleList} for the nesting and `@import` descent rules.
*/
function safeCssRuleCount(sheet) {
	try {
		const rules = sheet && (sheet.rules || sheet.cssRules);
		if (!rules) return 0;
		const visited = /* @__PURE__ */ new WeakSet();
		visited.add(sheet);
		return countRuleList(rules, visited, 0);
	} catch (e) {
		return 0;
	}
}
function deferStylesheetLink(linkEl) {
	if (trackingDepth > 0) {
		deferredStylesheetLinks.push(linkEl);
		deferredLinkCount += 1;
	}
}
/** Drains the links skipped by the budget. Safe to call after tracking ends. */
function takeDeferredStylesheetLinks() {
	const links = deferredStylesheetLinks;
	deferredStylesheetLinks = [];
	return links;
}
function recordDeferredStylesheetFailure() {
	deferredStylesheetStats.failedCount += 1;
}
function recordDeferredStylesheetsAbandoned(count) {
	if (count > 0) deferredStylesheetStats.abandonedCount += count;
}
/**
* One bounded slice of deferred stylesheet stringification took `ms`.
* `sliceStartGeneration` is the suspension generation captured when the slice
* started; omitting it skips the straddle check but keeps the plausibility cap.
*/
function recordDeferredStylesheetSlice(ms, sliceStartGeneration) {
	if (discardImplausibleDurationSample(ms, sliceStartGeneration ?? suspensionGeneration)) return;
	deferredStylesheetStats.totalMs += ms;
	if (ms > deferredStylesheetStats.slowestSliceMs) deferredStylesheetStats.slowestSliceMs = ms;
}
function getDeferredStylesheetStats() {
	return { ...deferredStylesheetStats };
}
/** `batchStartGeneration`: see {@link recordDeferredStylesheetSlice}. */
function recordMutationCost(ms, batchStartGeneration) {
	if (trackingDepth > 0) return;
	if (discardImplausibleDurationSample(ms, batchStartGeneration ?? suspensionGeneration)) return;
	if (ms > mutationCost.slowestBatchMs) mutationCost.slowestBatchMs = ms;
}
function getMutationCost() {
	return { ...mutationCost };
}
function resetSnapshotCostState() {
	trackingDepth = 0;
	startedAt = 0;
	startGeneration = 0;
	suspensionGeneration = 0;
	discardedDurationSamples = 0;
	inProgress = emptyCost();
	lastCost = null;
	stylesheetBudgetRules = null;
	deferredStylesheetLinks = [];
	deferredLinkCount = 0;
	nonDeferrableDepth = 0;
	mutationCost = { slowestBatchMs: 0 };
	deferredStylesheetStats = emptyDeferredStats();
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
//#region ../rrweb-snapshot/src/utils.ts
/**
* Sentinel that replaces the text content of every `<script>` node during
* serialization (see snapshot.ts). It keeps real script source out of the
* snapshot and marks the node as a script for rebuild. `rebuild.ts` reads this
* value back and must not render it, so the two sides share this one constant.
*/
var SCRIPT_PLACEHOLDER = "SCRIPT_PLACEHOLDER";
function isElement(n) {
	return n.nodeType === n.ELEMENT_NODE;
}
function isShadowRoot(n) {
	const hostEl = n && "host" in n && "mode" in n && src_default.host(n) || null;
	return Boolean(hostEl && "shadowRoot" in hostEl && src_default.shadowRoot(hostEl) === n);
}
/**
* To fix the issue https://github.com/rrweb-io/rrweb/issues/933.
* Some websites use polyfilled shadow dom and this function is used to detect this situation.
*/
function isNativeShadowDom(shadowRoot) {
	return Object.prototype.toString.call(shadowRoot) === "[object ShadowRoot]";
}
/**
* Browsers sometimes destructively modify the css rules they receive.
* This function tries to rectify the modifications the browser made to make it more cross platform compatible.
* @param cssText - output of `CSSStyleRule.cssText`
* @returns `cssText` with browser inconsistencies fixed.
*/
function fixBrowserCompatibilityIssuesInCSS(cssText) {
	/**
	* Chrome outputs `-webkit-background-clip` as `background-clip` in `CSSStyleRule.cssText`.
	* But then Chrome ignores `background-clip` as css input.
	* Re-introduce `-webkit-background-clip` to fix this issue.
	*/
	if (cssText.includes(" background-clip: text;") && !cssText.includes(" -webkit-background-clip: text;")) cssText = cssText.replace(/\sbackground-clip:\s*text;/g, " -webkit-background-clip: text; background-clip: text;");
	return cssText;
}
/**
* Browsers sometimes incorrectly escape `@import` on `.cssText` statements.
* This function tries to correct the escaping.
* more info: https://bugs.chromium.org/p/chromium/issues/detail?id=1472259
* @param cssImportRule
* @returns `cssText` with browser inconsistencies fixed, or null if not applicable.
*/
function escapeImportStatement(rule) {
	const { cssText } = rule;
	if (cssText.split("\"").length < 3) return cssText;
	const statement = ["@import", `url(${JSON.stringify(rule.href)})`];
	if (rule.layerName === "") statement.push(`layer`);
	else if (rule.layerName) statement.push(`layer(${rule.layerName})`);
	if (rule.supportsText) statement.push(`supports(${rule.supportsText})`);
	if (rule.media.length) statement.push(rule.media.mediaText);
	return statement.join(" ") + ";";
}
/**
* Detects empty property values produced by browser CSSOM serialization of
* shorthands that contain `var()`. When a stylesheet has e.g.
*
*     .card { padding: var(--p); padding-bottom: var(--pb); }
*
* browsers store the shorthand's longhands with empty token lists per the
* CSS Custom Properties spec, and `CSSStyleRule.cssText` re-emits them as
* `padding-top: ; padding-right: ; padding-left: ;`. That output silently
* strips the layout from the rule on replay. Same class of bug as
* rrweb-io/rrweb#1667. Custom properties (`--foo: ;`) are intentionally
* allowed to be empty and are excluded.
*/
function hasEmptyShorthandLonghand(css) {
	return /(?:^|[\s;{}])-?[a-zA-Z][\w-]*\s*:\s*;/.test(css);
}
var stringifyStylesheetDepth = 0;
function stringifyStylesheet(s) {
	const isOutermost = stringifyStylesheetDepth === 0;
	const startedAt = isOutermost ? nowMs() : 0;
	stringifyStylesheetDepth += 1;
	try {
		const rules = s.rules || s.cssRules;
		if (!rules) return null;
		countStylesheetRules(rules);
		let sheetHref = s.href;
		if (!sheetHref && s.ownerNode) sheetHref = s.ownerNode.baseURI;
		return fixBrowserCompatibilityIssuesInCSS(Array.from(rules, (rule) => stringifyRule(rule, sheetHref)).join(""));
	} catch (error) {
		return null;
	} finally {
		stringifyStylesheetDepth -= 1;
		if (isOutermost) recordStylesheetCost(nowMs() - startedAt);
	}
}
function stringifyRule(rule, sheetHref) {
	if (isCSSImportRule(rule)) {
		let importStringified;
		try {
			importStringified = stringifyStylesheet(rule.styleSheet) || escapeImportStatement(rule);
		} catch (error) {
			importStringified = rule.cssText;
		}
		try {
			var _rule$styleSheet;
			if (importStringified && ((_rule$styleSheet = rule.styleSheet) === null || _rule$styleSheet === void 0 ? void 0 : _rule$styleSheet.href)) return absolutifyURLs(importStringified, rule.styleSheet.href);
		} catch {}
		return importStringified;
	} else {
		let ruleStringified = rule.cssText;
		if (isCSSStyleRule(rule) && rule.selectorText.includes(":")) ruleStringified = fixSafariColons(ruleStringified);
		if (sheetHref) return absolutifyURLs(ruleStringified, sheetHref);
		return ruleStringified;
	}
}
function fixSafariColons(cssStringified) {
	return cssStringified.replace(/(\[(?:[\w-]+)[^\\])(:(?:[\w-]+)\])/gm, "$1\\$2");
}
function isCSSImportRule(rule) {
	return "styleSheet" in rule;
}
function isCSSStyleRule(rule) {
	return "selectorText" in rule;
}
var CSS_IDENT = /^-?[A-Za-z_][\w-]*$/;
var CSS_LAYER_NAME = /^-?[A-Za-z_][\w-]*(\.-?[A-Za-z_][\w-]*)*$/;
/**
* The opening text of a grouping rule whose children will be stringified
* individually, or null for rules that must keep the one-shot `cssText` read.
*
* Resumable: `@media`, `@supports`, `@layer` blocks (named, dotted, or
* anonymous), `@container` (its name is not reliably part of `conditionText`,
* so it is rebuilt from `containerName`/`containerQuery`), `@keyframes`, and
* natively-nested style rules (their declaration block never appears among
* `cssRules`, so it rides in the prelude). Kept one-shot because their
* prelude cannot be rebuilt from reliable CSSOM properties: childless rules,
* names that would need CSS escaping, `@container` without `containerQuery`
* support, `@page` (margin boxes; shares `selectorText` with style rules but
* keeps legacy type 6), and grouping types with no distinguishing property to
* duck-type on (`@scope`, `@starting-style`).
*/
function getGroupingRulePrelude(rule) {
	const grouping = rule;
	if (!grouping.cssRules || grouping.cssRules.length === 0) return null;
	if (grouping.media && typeof grouping.media.mediaText === "string") return `@media ${grouping.media.mediaText} {`;
	if (isCSSStyleRule(rule)) {
		if (typeof grouping.type === "number" && grouping.type !== 1) return null;
		const declarations = grouping.style ? grouping.style.cssText : "";
		return `${rule.selectorText} {${declarations ? " " + declarations : ""}`;
	}
	if ("containerName" in grouping) {
		if (typeof grouping.containerQuery !== "string" || grouping.containerName && !CSS_IDENT.test(grouping.containerName)) return null;
		return `@container ${grouping.containerName ? `${grouping.containerName} ` : ""}${grouping.containerQuery} {`;
	}
	if (typeof grouping.conditionText === "string") {
		let ruleType = "";
		try {
			var _rule$constructor;
			ruleType = ((_rule$constructor = rule.constructor) === null || _rule$constructor === void 0 ? void 0 : _rule$constructor.name) || "";
		} catch (e) {
			return null;
		}
		if (ruleType === "" || ruleType === "Object" || ruleType === "CSSSupportsRule") return `@supports ${grouping.conditionText} {`;
		return null;
	}
	if (typeof grouping.name === "string") {
		if ("keyText" in grouping.cssRules[0]) return CSS_IDENT.test(grouping.name) ? `@keyframes ${grouping.name} {` : null;
		if (grouping.name === "") return "@layer {";
		return CSS_LAYER_NAME.test(grouping.name) ? `@layer ${grouping.name} {` : null;
	}
	return null;
}
function createStylesheetTextCursor(sheet) {
	const stack = [];
	let done = false;
	let result = null;
	const capturedImports = /* @__PURE__ */ new Map();
	function captureImportChain(rootRules, rootSheet) {
		const walk = [{
			sheet: rootSheet,
			rules: rootRules,
			index: 0
		}];
		while (walk.length > 0) {
			const top = walk[walk.length - 1];
			if (top.index >= top.rules.length) {
				walk.pop();
				continue;
			}
			const rule = top.rules[top.index];
			top.index += 1;
			if (!isCSSImportRule(rule) || capturedImports.has(rule)) continue;
			let imported = null;
			try {
				imported = rule.styleSheet;
			} catch (e) {
				capturedImports.set(rule, null);
				continue;
			}
			if (!imported || walk.some((entry) => entry.sheet === imported)) continue;
			try {
				const importedRules = imported.rules || imported.cssRules;
				if (!importedRules) continue;
				countStylesheetRules(importedRules);
				let sheetHref = imported.href;
				if (!sheetHref && imported.ownerNode) sheetHref = imported.ownerNode.baseURI;
				const snapshot = Array.from(importedRules);
				capturedImports.set(rule, {
					sheet: imported,
					rules: snapshot,
					sheetHref
				});
				walk.push({
					sheet: imported,
					rules: snapshot,
					index: 0
				});
			} catch (e) {}
		}
	}
	function openRootFrame(s) {
		try {
			const rules = s.rules || s.cssRules;
			if (!rules) return false;
			countStylesheetRules(rules);
			let sheetHref = s.href;
			if (!sheetHref && s.ownerNode) sheetHref = s.ownerNode.baseURI;
			const snapshot = Array.from(rules);
			stack.push({
				kind: "sheet",
				sheet: s,
				rules: snapshot,
				sheetHref,
				index: 0,
				parts: [],
				importRule: null
			});
			captureImportChain(snapshot, s);
			return true;
		} catch (e) {
			return false;
		}
	}
	function tryOpenGroupFrame(rule, parent) {
		try {
			const prelude = getGroupingRulePrelude(rule);
			if (prelude === null) return false;
			const sheetHref = parent.sheetHref;
			stack.push({
				kind: "group",
				rules: Array.from(rule.cssRules),
				sheetHref,
				index: 0,
				parts: [],
				prelude: sheetHref ? absolutifyURLs(prelude, sheetHref) : prelude,
				fixColons: parent.kind === "sheet" && isCSSStyleRule(rule) && rule.selectorText.includes(":")
			});
			return true;
		} catch (e) {
			return false;
		}
	}
	function completeTop(text) {
		const frame = stack.pop();
		if (frame.kind === "group") {
			if (text === null) {
				while (stack.length > 0 && stack[stack.length - 1].kind === "group") stack.pop();
				completeTop(null);
				return;
			}
			const parent = stack[stack.length - 1];
			parent.parts.push(text);
			parent.index += 1;
			return;
		}
		if (!frame.importRule) {
			done = true;
			result = text;
			return;
		}
		resolveImport(stack[stack.length - 1], frame.importRule, text);
	}
	function resolveImport(parent, rule, nested) {
		try {
			let importStringified;
			try {
				importStringified = nested || escapeImportStatement(rule);
			} catch (e) {
				importStringified = rule.cssText;
			}
			try {
				var _rule$styleSheet2;
				if (importStringified && ((_rule$styleSheet2 = rule.styleSheet) === null || _rule$styleSheet2 === void 0 ? void 0 : _rule$styleSheet2.href)) importStringified = absolutifyURLs(importStringified, rule.styleSheet.href);
			} catch (e) {}
			if (importStringified) parent.parts.push(importStringified);
			parent.index += 1;
		} catch (e) {
			completeTop(null);
		}
	}
	function stepRule(frame) {
		const rule = frame.rules[frame.index];
		if (frame.kind === "sheet" && isCSSImportRule(rule)) {
			const captured = capturedImports.get(rule);
			if (captured === null) {
				frame.parts.push(rule.cssText);
				frame.index += 1;
				return;
			}
			if (captured) {
				stack.push({
					kind: "sheet",
					sheet: captured.sheet,
					rules: captured.rules,
					sheetHref: captured.sheetHref,
					index: 0,
					parts: [],
					importRule: rule
				});
				return;
			}
			resolveImport(frame, rule, null);
			return;
		}
		if (tryOpenGroupFrame(rule, frame)) return;
		let ruleStringified = rule.cssText;
		if (frame.kind === "sheet" && isCSSStyleRule(rule) && rule.selectorText.includes(":")) ruleStringified = fixSafariColons(ruleStringified);
		frame.parts.push(frame.sheetHref ? absolutifyURLs(ruleStringified, frame.sheetHref) : ruleStringified);
		frame.index += 1;
	}
	if (!openRootFrame(sheet)) done = true;
	return {
		advance(maxRules) {
			if (done) return true;
			const startedAt = nowMs();
			let budget = maxRules > 0 ? maxRules : 1;
			try {
				while (!done && budget > 0) {
					const frame = stack[stack.length - 1];
					if (frame.index >= frame.rules.length) {
						let text = null;
						try {
							if (frame.kind === "group") {
								const assembled = frame.prelude + frame.parts.join("") + "}";
								text = frame.fixColons ? fixSafariColons(assembled) : assembled;
							} else text = fixBrowserCompatibilityIssuesInCSS(frame.parts.join(""));
						} catch (e) {}
						completeTop(text);
						continue;
					}
					budget -= 1;
					try {
						stepRule(frame);
					} catch (e) {
						completeTop(null);
					}
				}
			} catch (e) {
				done = true;
				result = null;
			} finally {
				recordStylesheetCost(nowMs() - startedAt);
			}
			return done;
		},
		text: () => done ? result : null,
		remainingRules: () => {
			if (done) return 0;
			let remaining = 0;
			for (const frame of stack) remaining += frame.rules.length - frame.index;
			return remaining;
		}
	};
}
var Mirror = class {
	constructor() {
		_defineProperty(this, "idNodeMap", /* @__PURE__ */ new Map());
		_defineProperty(this, "nodeMetaMap", /* @__PURE__ */ new WeakMap());
	}
	getId(n) {
		var _this$getMeta;
		if (!n) return -1;
		return ((_this$getMeta = this.getMeta(n)) === null || _this$getMeta === void 0 ? void 0 : _this$getMeta.id) ?? -1;
	}
	getNode(id) {
		return this.idNodeMap.get(id) || null;
	}
	getIds() {
		return Array.from(this.idNodeMap.keys());
	}
	getMeta(n) {
		return this.nodeMetaMap.get(n) || null;
	}
	removeNodeFromMap(n) {
		const id = this.getId(n);
		this.idNodeMap.delete(id);
		if (n.childNodes) n.childNodes.forEach((childNode) => this.removeNodeFromMap(childNode));
		if (isElement(n)) {
			const shadowRootEl = src_default.shadowRoot(n);
			if (shadowRootEl) this.removeNodeFromMap(shadowRootEl);
			if (n.nodeName === "IFRAME" && n.contentDocument) this.removeNodeFromMap(n.contentDocument);
		}
	}
	has(id) {
		return this.idNodeMap.has(id);
	}
	hasNode(node) {
		return this.nodeMetaMap.has(node);
	}
	add(n, meta) {
		const id = meta.id;
		this.idNodeMap.set(id, n);
		this.nodeMetaMap.set(n, meta);
	}
	replace(id, n) {
		const oldNode = this.getNode(id);
		if (oldNode) {
			const meta = this.nodeMetaMap.get(oldNode);
			if (meta) this.nodeMetaMap.set(n, meta);
		}
		this.idNodeMap.set(id, n);
	}
	reset() {
		this.idNodeMap = /* @__PURE__ */ new Map();
		this.nodeMetaMap = /* @__PURE__ */ new WeakMap();
	}
};
function createMirror() {
	return new Mirror();
}
function maskInputValue({ element, maskInputOptions, tagName, type, value, maskInputFn }) {
	let text = value || "";
	const actualType = type && toLowerCase(type);
	if (maskInputOptions[tagName.toLowerCase()] || actualType && maskInputOptions[actualType]) {
		if (maskInputFn) text = maskInputFn(text, element);
		else text = "*".repeat(text.length);
	}
	return text;
}
function toLowerCase(str) {
	return str.toLowerCase();
}
var RENDERING_METADATA_ATTRIBUTES = /* @__PURE__ */ new Set([
	"rr_width",
	"rr_height",
	"rr_left",
	"rr_top",
	"rr_position",
	"rr_transform",
	"rr_display",
	"rr_scrollleft",
	"rr_scrolltop",
	"rr_mediastate",
	"rr_open_mode"
]);
function maskAttributeValue({ element, name, value, maskAllElementAttributes, maskAttributeFn, isGenerated = false }) {
	if (!value) return value;
	if (maskAllElementAttributes) return isGenerated && RENDERING_METADATA_ATTRIBUTES.has(toLowerCase(name)) ? value : "*".repeat(value.length);
	if (maskAttributeFn) return maskAttributeFn(name, value, element);
	return value;
}
var ORIGINAL_ATTRIBUTE_NAME = "__rrweb_original__";
function is2DCanvasBlank(canvas) {
	const ctx = canvas.getContext("2d");
	if (!ctx) return true;
	const chunkSize = 50;
	for (let x = 0; x < canvas.width; x += chunkSize) for (let y = 0; y < canvas.height; y += chunkSize) {
		const getImageData = ctx.getImageData;
		const originalGetImageData = ORIGINAL_ATTRIBUTE_NAME in getImageData ? getImageData[ORIGINAL_ATTRIBUTE_NAME] : getImageData;
		if (new Uint32Array(originalGetImageData.call(ctx, x, y, Math.min(chunkSize, canvas.width - x), Math.min(chunkSize, canvas.height - y)).data.buffer).some((pixel) => pixel !== 0)) return false;
	}
	return true;
}
/**
* Get the type of an input element.
* This takes care of the case where a password input is changed to a text input.
* In this case, we continue to consider this of type password, in order to avoid leaking sensitive data
* where passwords should be masked.
*/
function getInputType(element) {
	try {
		const type = element.type;
		return element.hasAttribute("data-rr-is-password") ? "password" : type ? toLowerCase(type) : null;
	} catch {
		return null;
	}
}
/**
* Extracts the file extension from an a path, considering search parameters and fragments.
* @param path - Path to file
* @param baseURL - [optional] Base URL of the page, used to resolve relative paths. Defaults to current page URL.
*/
function extractFileExtension(path, baseURL) {
	let url;
	try {
		url = new URL(path, baseURL ?? window.location.href);
	} catch (err) {
		return null;
	}
	const match = url.pathname.match(/\.([0-9a-z]+)(?:$)/i);
	return (match === null || match === void 0 ? void 0 : match[1]) ?? null;
}
function extractOrigin(url) {
	let origin = "";
	if (url.indexOf("//") > -1) origin = url.split("/").slice(0, 3).join("/");
	else origin = url.split("/")[0];
	origin = origin.split("?")[0];
	return origin;
}
var URL_IN_CSS_REF = /url\((?:(')([^']*)'|(")(.*?)"|([^)]*))\)/gm;
var URL_PROTOCOL_MATCH = /^(?:[a-z+]+:)?\/\//i;
var URL_WWW_MATCH = /^www\..*/i;
var DATA_URI = /^(data:)([^,]*),(.*)/i;
function absolutifyURLs(cssText, href) {
	return (cssText || "").replace(URL_IN_CSS_REF, (origin, quote1, path1, quote2, path2, path3) => {
		const filePath = path1 || path2 || path3;
		const maybeQuote = quote1 || quote2 || "";
		if (!filePath) return origin;
		if (URL_PROTOCOL_MATCH.test(filePath) || URL_WWW_MATCH.test(filePath)) return `url(${maybeQuote}${filePath}${maybeQuote})`;
		if (DATA_URI.test(filePath)) return `url(${maybeQuote}${filePath}${maybeQuote})`;
		if (filePath[0] === "/") return `url(${maybeQuote}${extractOrigin(href) + filePath}${maybeQuote})`;
		const stack = href.split("/");
		const parts = filePath.split("/");
		stack.pop();
		for (const part of parts) if (part === ".") continue;
		else if (part === "..") stack.pop();
		else stack.push(part);
		return `url(${maybeQuote}${stack.join("/")}${maybeQuote})`;
	});
}
var STRIPED_PLACEHOLDER_SVG = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogIDxkZWZzPgogICAgPHBhdHRlcm4gaWQ9InN0cmlwZXMiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiI+CiAgICAgIDxyZWN0IHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgZmlsbD0iYmxhY2siLz4KICAgICAgPHBhdGggZD0iTTggMEgxNkwwIDE2VjhMOCAwWiIgZmlsbD0iIzJEMkQyRCIvPgogICAgICA8cGF0aCBkPSJNMTYgOFYxNkg4TDE2IDhaIiBmaWxsPSIjMkQyRDJEIi8+CiAgICA8L3BhdHRlcm4+CiAgPC9kZWZzPgogIDxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjc3RyaXBlcykiLz4KPC9zdmc+Cg==";
var MAX_IMAGE_DIMENSION_FOR_RECOMPRESSION = 4096;
var MIN_DATA_URL_LENGTH_FOR_RECOMPRESSION = 1e5;
var MAX_RECOMPRESSION_CACHE_ENTRIES = 10;
var recompressionCache = /* @__PURE__ */ new Map();
function recompressBase64Image(img, dataURL, type, quality) {
	if (dataURL.length < MIN_DATA_URL_LENGTH_FOR_RECOMPRESSION) return dataURL;
	if (!img.complete || img.naturalWidth === 0) return dataURL;
	if (img.naturalWidth > MAX_IMAGE_DIMENSION_FOR_RECOMPRESSION || img.naturalHeight > MAX_IMAGE_DIMENSION_FOR_RECOMPRESSION) return dataURL;
	const cached = recompressionCache.get(dataURL);
	if (cached && cached.type === type && cached.quality === quality) return cached.result;
	try {
		const canvas = document.createElement("canvas");
		canvas.width = img.naturalWidth;
		canvas.height = img.naturalHeight;
		const ctx = canvas.getContext("2d");
		if (!ctx) return dataURL;
		ctx.drawImage(img, 0, 0);
		const recompressed = canvas.toDataURL(type || "image/webp", quality ?? .4);
		const result = recompressed.length < dataURL.length ? recompressed : dataURL;
		if (recompressionCache.size >= MAX_RECOMPRESSION_CACHE_ENTRIES) {
			const oldestKey = recompressionCache.keys().next().value;
			if (oldestKey !== void 0) recompressionCache.delete(oldestKey);
		}
		recompressionCache.set(dataURL, {
			type,
			quality,
			result
		});
		return result;
	} catch (err) {
		return dataURL;
	}
}
function checkDataURLSize(dataURL, maxLength) {
	if (!maxLength || dataURL.length <= maxLength) return dataURL;
	return STRIPED_PLACEHOLDER_SVG;
}
//#endregion
//#region ../rrweb-snapshot/src/snapshot.ts
var _id = 1;
var tagNameRegex = /* @__PURE__ */ new RegExp("[^a-z0-9-_:]");
function genId() {
	return _id++;
}
function getValidTagName(element) {
	if (element instanceof HTMLFormElement) return "form";
	const processedTagName = toLowerCase(element.tagName);
	if (tagNameRegex.test(processedTagName)) return "div";
	return processedTagName;
}
var canvasService;
var canvasCtx;
var SRCSET_NOT_SPACES = /^[^ \t\n\r\u000c]+/;
var SRCSET_COMMAS_OR_SPACES = /^[, \t\n\r\u000c]+/;
function getAbsoluteSrcsetString(doc, attributeValue) {
	if (attributeValue.trim() === "") return attributeValue;
	let pos = 0;
	function collectCharacters(regEx) {
		let chars;
		const match = regEx.exec(attributeValue.substring(pos));
		if (match) {
			chars = match[0];
			pos += chars.length;
			return chars;
		}
		return "";
	}
	const output = [];
	while (true) {
		collectCharacters(SRCSET_COMMAS_OR_SPACES);
		if (pos >= attributeValue.length) break;
		let url = collectCharacters(SRCSET_NOT_SPACES);
		if (url.slice(-1) === ",") {
			url = absoluteToDoc(doc, url.substring(0, url.length - 1));
			output.push(url);
		} else {
			let descriptorsStr = "";
			url = absoluteToDoc(doc, url);
			let inParens = false;
			while (true) {
				const c = attributeValue.charAt(pos);
				if (c === "") {
					output.push((url + descriptorsStr).trim());
					break;
				} else if (!inParens) {
					if (c === ",") {
						pos += 1;
						output.push((url + descriptorsStr).trim());
						break;
					} else if (c === "(") inParens = true;
				} else if (c === ")") inParens = false;
				descriptorsStr += c;
				pos += 1;
			}
		}
	}
	return output.join(", ");
}
var cachedDocument = /* @__PURE__ */ new WeakMap();
function absoluteToDoc(doc, attributeValue) {
	if (!attributeValue || attributeValue.trim() === "") return attributeValue;
	return getHref(doc, attributeValue);
}
function isSVGElement(el) {
	return Boolean(el.tagName === "svg" || el.ownerSVGElement);
}
function getHref(doc, customHref) {
	let a = cachedDocument.get(doc);
	if (!a) {
		a = doc.createElement("a");
		cachedDocument.set(doc, a);
	}
	if (!customHref) customHref = "";
	else if (customHref.startsWith("blob:") || customHref.startsWith("data:")) return customHref;
	a.setAttribute("href", customHref);
	return a.href;
}
function capDataURLSize(dataURL, dataURLOptions) {
	if (dataURLOptions === null || dataURLOptions === void 0 ? void 0 : dataURLOptions.maxBase64ImageLength) return checkDataURLSize(dataURL, dataURLOptions.maxBase64ImageLength);
	return dataURL;
}
function transformAttribute(doc, tagName, name, value, element, dataURLOptions) {
	if (!value) return value;
	if (name === "src" || name === "href" && !(tagName === "use" && value[0] === "#")) {
		if (tagName === "link" && element) {
			var _element$sheet;
			const sheetHref = (_element$sheet = element.sheet) === null || _element$sheet === void 0 ? void 0 : _element$sheet.href;
			if (sheetHref) return sheetHref;
		}
		const transformedValue = absoluteToDoc(doc, value);
		if (transformedValue.startsWith("data:")) {
			if (tagName === "img" && element) {
				let processedDataURL = transformedValue;
				if ((dataURLOptions === null || dataURLOptions === void 0 ? void 0 : dataURLOptions.type) || (dataURLOptions === null || dataURLOptions === void 0 ? void 0 : dataURLOptions.quality) !== void 0) processedDataURL = recompressBase64Image(element, transformedValue, dataURLOptions.type, dataURLOptions.quality);
				return capDataURLSize(processedDataURL, dataURLOptions);
			}
			if (tagName === "image") return capDataURLSize(transformedValue, dataURLOptions);
		}
		return transformedValue;
	} else if (name === "xlink:href" && value[0] !== "#") {
		const transformedValue = absoluteToDoc(doc, value);
		if (tagName === "image" && transformedValue.startsWith("data:")) return capDataURLSize(transformedValue, dataURLOptions);
		return transformedValue;
	} else if (name === "background" && (tagName === "table" || tagName === "td" || tagName === "th")) return absoluteToDoc(doc, value);
	else if (name === "srcset") return getAbsoluteSrcsetString(doc, value);
	else if (name === "style") return absolutifyURLs(value, getHref(doc));
	else if (tagName === "object" && name === "data") return absoluteToDoc(doc, value);
	return value;
}
function ignoreAttribute(tagName, name, _value) {
	return (tagName === "video" || tagName === "audio") && toLowerCase(name) === "autoplay";
}
function _isBlockedElement(element, blockClass, blockSelector) {
	try {
		if (typeof blockClass === "string") {
			if (element.classList.contains(blockClass)) return true;
		} else for (let eIndex = element.classList.length; eIndex--;) {
			const className = element.classList[eIndex];
			if (blockClass.test(className)) return true;
		}
		if (blockSelector) return element.matches(blockSelector);
	} catch (e) {}
	return false;
}
function classMatchesRegex(node, regex, checkAncestors) {
	if (!node) return false;
	if (node.nodeType !== node.ELEMENT_NODE) {
		if (!checkAncestors) return false;
		return classMatchesRegex(src_default.parentNode(node), regex, checkAncestors);
	}
	for (let eIndex = node.classList.length; eIndex--;) {
		const className = node.classList[eIndex];
		if (regex.test(className)) return true;
	}
	if (!checkAncestors) return false;
	return classMatchesRegex(src_default.parentNode(node), regex, checkAncestors);
}
function needMaskingText(node, maskTextClass, maskTextSelector, checkAncestors) {
	let el;
	if (isElement(node)) {
		el = node;
		if (!src_default.childNodes(el).length) return false;
	} else if (src_default.parentElement(node) === null) return false;
	else el = src_default.parentElement(node);
	try {
		if (typeof maskTextClass === "string") {
			if (checkAncestors) {
				if (el.closest(`.${maskTextClass}`)) return true;
			} else if (el.classList.contains(maskTextClass)) return true;
		} else if (classMatchesRegex(el, maskTextClass, checkAncestors)) return true;
		if (maskTextSelector) {
			if (checkAncestors) {
				if (el.closest(maskTextSelector)) return true;
			} else if (el.matches(maskTextSelector)) return true;
		}
	} catch (e) {}
	return false;
}
function removeEventListenerSafely$1(target, type, listener) {
	const removeEventListener = target.removeEventListener;
	if (typeof removeEventListener !== "function") return;
	removeEventListener.call(target, type, listener);
}
function onceIframeLoaded(iframeEl, listener, iframeLoadTimeout) {
	const noop = () => {};
	const win = iframeEl.contentWindow;
	if (!win) return noop;
	let readyState;
	try {
		readyState = win.document.readyState;
	} catch (error) {
		return noop;
	}
	const onSubsequentLoad = () => listener();
	if (readyState !== "complete") {
		let fired = false;
		let timer = null;
		const fireOnce = () => {
			if (fired) return;
			fired = true;
			if (timer !== null) {
				clearTimeout(timer);
				timer = null;
			}
			removeEventListenerSafely$1(iframeEl, "load", onInitialLoad);
			iframeEl.addEventListener("load", onSubsequentLoad);
			listener();
		};
		const onInitialLoad = () => fireOnce();
		timer = setTimeout(fireOnce, iframeLoadTimeout);
		iframeEl.addEventListener("load", onInitialLoad);
		return () => {
			if (timer !== null) {
				clearTimeout(timer);
				timer = null;
			}
			if (fired) removeEventListenerSafely$1(iframeEl, "load", onSubsequentLoad);
			else {
				fired = true;
				removeEventListenerSafely$1(iframeEl, "load", onInitialLoad);
			}
		};
	}
	const blankUrl = "about:blank";
	let winLocationHref;
	try {
		winLocationHref = win.location.href;
	} catch {
		return noop;
	}
	if (winLocationHref !== blankUrl || iframeEl.src === blankUrl || iframeEl.src === "") {
		const initialTimer = setTimeout(listener, 0);
		iframeEl.addEventListener("load", onSubsequentLoad);
		return () => {
			clearTimeout(initialTimer);
			removeEventListenerSafely$1(iframeEl, "load", onSubsequentLoad);
		};
	}
	iframeEl.addEventListener("load", onSubsequentLoad);
	return () => {
		removeEventListenerSafely$1(iframeEl, "load", onSubsequentLoad);
	};
}
var stylesheetLoadTracked = /* @__PURE__ */ new Map();
function resetStylesheetLoadTracking() {
	stylesheetLoadTracked.forEach((controller) => controller.abort());
	stylesheetLoadTracked.clear();
}
function onceStylesheetLoaded(link, listener, styleSheetLoadTimeout) {
	if (stylesheetLoadTracked.has(link)) return;
	let styleSheetLoaded;
	try {
		styleSheetLoaded = link.sheet;
	} catch (error) {
		return;
	}
	if (styleSheetLoaded) return;
	const controller = new AbortController();
	let fired = false;
	const fire = () => {
		if (fired) return;
		fired = true;
		try {
			listener();
		} finally {
			stylesheetLoadTracked.delete(link);
			controller.abort();
		}
	};
	const timer = setTimeout(fire, styleSheetLoadTimeout);
	controller.signal.addEventListener("abort", () => clearTimeout(timer), { once: true });
	link.addEventListener("load", fire, {
		signal: controller.signal,
		once: true
	});
	stylesheetLoadTracked.set(link, controller);
}
function serializeNode(n, options) {
	const { doc, mirror, blockClass, blockSelector, needsMask, inlineStylesheet, maskInputOptions = {}, maskTextFn, maskInputFn, maskAllElementAttributes = false, maskAttributeFn, dataURLOptions = {}, inlineImages, recordCanvas, canvasMaskingConfigured, keepIframeSrcFn, newlyAddedElement = false } = options;
	const rootId = getRootId(doc, mirror);
	switch (n.nodeType) {
		case n.DOCUMENT_NODE: if (n.compatMode !== "CSS1Compat") return {
			type: NodeType.Document,
			childNodes: [],
			compatMode: n.compatMode
		};
		else return {
			type: NodeType.Document,
			childNodes: []
		};
		case n.DOCUMENT_TYPE_NODE: return {
			type: NodeType.DocumentType,
			name: n.name,
			publicId: n.publicId,
			systemId: n.systemId,
			rootId
		};
		case n.ELEMENT_NODE: return serializeElementNode(n, {
			doc,
			blockClass,
			blockSelector,
			inlineStylesheet,
			maskInputOptions,
			maskInputFn,
			maskAllElementAttributes,
			maskAttributeFn,
			dataURLOptions,
			inlineImages,
			recordCanvas,
			canvasMaskingConfigured,
			keepIframeSrcFn,
			newlyAddedElement,
			rootId
		});
		case n.TEXT_NODE: return serializeTextNode(n, {
			doc,
			needsMask,
			maskTextFn,
			rootId
		});
		case n.CDATA_SECTION_NODE: return {
			type: NodeType.CDATA,
			textContent: "",
			rootId
		};
		case n.COMMENT_NODE: return {
			type: NodeType.Comment,
			textContent: src_default.textContent(n) || "",
			rootId
		};
		default: return false;
	}
}
function getRootId(doc, mirror) {
	if (!mirror.hasNode(doc)) return void 0;
	const docId = mirror.getId(doc);
	return docId === 1 ? void 0 : docId;
}
function serializeTextNode(n, options) {
	const { needsMask, maskTextFn, rootId } = options;
	const parent = src_default.parentNode(n);
	const parentTagName = parent && parent.tagName;
	let text = src_default.textContent(n);
	const isStyle = parentTagName === "STYLE" ? true : void 0;
	const isScript = parentTagName === "SCRIPT" ? true : void 0;
	if (isStyle && text) {
		try {
			var _parent$sheet;
			if (n.nextSibling || n.previousSibling) {} else if (shouldDeferStylesheetInlining(parent.sheet)) {} else if ((_parent$sheet = parent.sheet) === null || _parent$sheet === void 0 ? void 0 : _parent$sheet.cssRules) {
				const stringified = stringifyStylesheet(parent.sheet);
				if (stringified && !hasEmptyShorthandLonghand(stringified)) text = stringified;
			}
		} catch (err) {
			console.warn(`Cannot get CSS styles from text's parentNode. Error: ${err}`, n);
		}
		text = absolutifyURLs(text, getHref(options.doc));
	}
	if (isScript) text = SCRIPT_PLACEHOLDER;
	if (!isStyle && !isScript && text && needsMask) text = maskTextFn ? maskTextFn(text, src_default.parentElement(n)) : text.replace(/[\S]/g, "*");
	return {
		type: NodeType.Text,
		textContent: text || "",
		isStyle,
		rootId
	};
}
function findStylesheet(doc, href) {
	return Array.from(doc.styleSheets).find((s) => s.href === href);
}
/**
* in production, we've seen elements like
* `<link type="text/css" rel="stylesheet" id="dark-mode-custom-link"></link>`
* while HTMLLinkElement suggests an href is always present
* the w3c spec is less specific
* and regardless we've seen at least one instance of this in the wild
* let's be defensive and make sure this is typed as possibly undefined
*/
function hrefFrom(n) {
	return n.href;
}
function serializeElementNode(n, options) {
	const { doc, blockClass, blockSelector, inlineStylesheet, maskInputOptions = {}, maskInputFn, maskAllElementAttributes = false, maskAttributeFn, dataURLOptions = {}, inlineImages, recordCanvas, canvasMaskingConfigured, keepIframeSrcFn, newlyAddedElement = false, rootId } = options;
	const needBlock = _isBlockedElement(n, blockClass, blockSelector);
	const tagName = getValidTagName(n);
	const generatedAttributeNames = /* @__PURE__ */ new Set();
	let attributes = {};
	const len = n.attributes.length;
	for (let i = 0; i < len; i++) {
		const attr = n.attributes[i];
		if (!ignoreAttribute(tagName, attr.name, attr.value)) attributes[attr.name] = transformAttribute(doc, tagName, toLowerCase(attr.name), attr.value, n, dataURLOptions);
	}
	if (tagName === "link" && inlineStylesheet && !needBlock) {
		let stylesheet = n.sheet;
		if (!stylesheet) {
			const href = hrefFrom(n);
			if (href) {
				stylesheet = findStylesheet(doc, href);
				if (!stylesheet && href.includes(".css")) {
					const rootDomain = window.location.origin;
					const stylesheetPath = href.replace(window.location.href, "");
					stylesheet = findStylesheet(doc, rootDomain + "/" + stylesheetPath);
				}
			}
		}
		let cssText = null;
		if (stylesheet) {
			if (shouldDeferStylesheetInlining(stylesheet)) deferStylesheetLink(n);
			else cssText = stringifyStylesheet(stylesheet);
		}
		if (cssText) {
			delete attributes.rel;
			delete attributes.href;
			attributes._cssText = cssText;
		}
	}
	if (tagName === "style" && n.sheet && !(n.innerText || src_default.textContent(n) || "").trim().length) {
		const cssText = runNonDeferrableStylesheetWork(() => stringifyStylesheet(n.sheet));
		if (cssText) attributes._cssText = cssText;
	}
	if (tagName === "input" || tagName === "textarea" || tagName === "select") {
		const value = n.value;
		const checked = n.checked;
		if (attributes.type !== "radio" && attributes.type !== "checkbox" && attributes.type !== "submit" && attributes.type !== "button" && value) attributes.value = maskInputValue({
			element: n,
			type: getInputType(n),
			tagName,
			value,
			maskInputOptions,
			maskInputFn
		});
		else if (checked) attributes.checked = checked;
	}
	if (tagName === "option") {
		if (n.selected && !maskInputOptions["select"]) attributes.selected = true;
		else delete attributes.selected;
	}
	if (tagName === "dialog" && n.open) {
		try {
			attributes.rr_open_mode = n.matches("dialog:modal") ? "modal" : "non-modal";
		} catch {
			attributes.rr_open_mode = "modal";
			attributes.ph_rr_could_not_detect_modal = true;
		}
		generatedAttributeNames.add("rr_open_mode");
	}
	if (tagName === "canvas" && recordCanvas && !(canvasMaskingConfigured === null || canvasMaskingConfigured === void 0 ? void 0 : canvasMaskingConfigured())) {
		if (n.__context === "2d") {
			if (!is2DCanvasBlank(n)) attributes.rr_dataURL = n.toDataURL(dataURLOptions.type, dataURLOptions.quality);
		} else if (!("__context" in n)) {
			const canvasDataURL = n.toDataURL(dataURLOptions.type, dataURLOptions.quality);
			const blankCanvas = doc.createElement("canvas");
			blankCanvas.width = n.width;
			blankCanvas.height = n.height;
			if (canvasDataURL !== blankCanvas.toDataURL(dataURLOptions.type, dataURLOptions.quality)) attributes.rr_dataURL = canvasDataURL;
		}
	}
	let serializationComplete = false;
	if (tagName === "img" && inlineImages) {
		if (!canvasService) {
			canvasService = doc.createElement("canvas");
			canvasCtx = canvasService.getContext("2d");
		}
		const image = n;
		const imageSrc = image.currentSrc || image.getAttribute("src") || "<unknown-src>";
		const priorCrossOrigin = image.crossOrigin;
		const maskLateAttribute = (name, value) => serializationComplete ? maskAttributeValue({
			element: n,
			name,
			value,
			maskAllElementAttributes,
			maskAttributeFn
		}) : value;
		const recordInlineImage = () => {
			removeEventListenerSafely$1(image, "load", recordInlineImage);
			try {
				canvasService.width = image.naturalWidth;
				canvasService.height = image.naturalHeight;
				canvasCtx.drawImage(image, 0, 0);
				const dataURL = canvasService.toDataURL(dataURLOptions.type, dataURLOptions.quality);
				attributes.rr_dataURL = maskLateAttribute("rr_dataURL", dataURL);
			} catch (err) {
				if (image.crossOrigin !== "anonymous") {
					image.crossOrigin = "anonymous";
					if (image.complete && image.naturalWidth !== 0) recordInlineImage();
					else image.addEventListener("load", recordInlineImage);
					return;
				} else console.warn(`Cannot inline img src=${imageSrc}! Error: ${err}`);
			}
			if (image.crossOrigin === "anonymous") {
				if (priorCrossOrigin) attributes.crossOrigin = maskLateAttribute("crossOrigin", priorCrossOrigin);
				else image.removeAttribute("crossorigin");
			}
		};
		if (image.complete && image.naturalWidth !== 0) recordInlineImage();
		else image.addEventListener("load", recordInlineImage);
	}
	if (tagName === "audio" || tagName === "video") {
		const mediaAttributes = attributes;
		mediaAttributes.rr_mediaState = n.paused ? "paused" : "played";
		generatedAttributeNames.add("rr_mediaState");
		mediaAttributes.rr_mediaCurrentTime = n.currentTime;
		mediaAttributes.rr_mediaPlaybackRate = n.playbackRate;
		mediaAttributes.rr_mediaMuted = n.muted;
		mediaAttributes.rr_mediaLoop = n.loop;
		mediaAttributes.rr_mediaVolume = n.volume;
	}
	if (!newlyAddedElement) {
		if (n.scrollLeft) attributes.rr_scrollLeft = n.scrollLeft;
		if (n.scrollTop) attributes.rr_scrollTop = n.scrollTop;
	}
	if (needBlock) {
		var _doc$defaultView, _doc$defaultView2, _doc$defaultView3;
		const { width, height, left, top } = n.getBoundingClientRect();
		const computed = (_doc$defaultView = doc.defaultView) === null || _doc$defaultView === void 0 ? void 0 : _doc$defaultView.getComputedStyle(n);
		attributes = {
			class: attributes.class,
			rr_width: `${width}px`,
			rr_height: `${height}px`,
			rr_left: `${Math.floor(left + (((_doc$defaultView2 = doc.defaultView) === null || _doc$defaultView2 === void 0 ? void 0 : _doc$defaultView2.scrollX) || 0))}px`,
			rr_top: `${Math.floor(top + (((_doc$defaultView3 = doc.defaultView) === null || _doc$defaultView3 === void 0 ? void 0 : _doc$defaultView3.scrollY) || 0))}px`
		};
		generatedAttributeNames.add("rr_width");
		generatedAttributeNames.add("rr_height");
		generatedAttributeNames.add("rr_left");
		generatedAttributeNames.add("rr_top");
		if (computed) {
			attributes.rr_position = computed.position || "static";
			generatedAttributeNames.add("rr_position");
			if (computed.transform && computed.transform !== "none") {
				attributes.rr_transform = computed.transform;
				generatedAttributeNames.add("rr_transform");
			}
			if (computed.display && computed.display.startsWith("inline")) {
				attributes.rr_display = computed.display;
				generatedAttributeNames.add("rr_display");
			}
		}
	}
	if (tagName === "iframe" && !keepIframeSrcFn(attributes.src)) {
		if (!n.contentDocument) attributes.rr_src = attributes.src;
		delete attributes.src;
	}
	if (maskAllElementAttributes || maskAttributeFn) {
		for (const [name, value] of Object.entries(attributes)) if (typeof value === "string" || value === null) attributes[name] = maskAttributeValue({
			element: n,
			name,
			value,
			maskAllElementAttributes,
			maskAttributeFn,
			isGenerated: generatedAttributeNames.has(name)
		});
	}
	serializationComplete = true;
	let isCustomElement;
	try {
		if (customElements.get(tagName)) isCustomElement = true;
	} catch (e) {}
	return {
		type: NodeType.Element,
		tagName,
		attributes,
		childNodes: [],
		isSVG: isSVGElement(n) || void 0,
		needBlock,
		rootId,
		isCustom: isCustomElement
	};
}
function lowerIfExists(maybeAttr) {
	if (maybeAttr === void 0 || maybeAttr === null) return "";
	else return maybeAttr.toLowerCase();
}
function slimDOMExcluded(sn, slimDOMOptions) {
	if (slimDOMOptions.comment && sn.type === NodeType.Comment) return true;
	else if (sn.type === NodeType.Element) {
		if (slimDOMOptions.script && (sn.tagName === "script" || sn.tagName === "link" && (sn.attributes.rel === "preload" && sn.attributes.as === "script" || sn.attributes.rel === "modulepreload") || sn.tagName === "link" && sn.attributes.rel === "prefetch" && typeof sn.attributes.href === "string" && extractFileExtension(sn.attributes.href) === "js")) return true;
		else if (slimDOMOptions.headFavicon && (sn.tagName === "link" && sn.attributes.rel === "shortcut icon" || sn.tagName === "meta" && (lowerIfExists(sn.attributes.name).match(/^msapplication-tile(image|color)$/) || lowerIfExists(sn.attributes.name) === "application-name" || [
			"icon",
			"apple-touch-icon",
			"shortcut icon"
		].includes(lowerIfExists(sn.attributes.rel))))) return true;
		else if (sn.tagName === "meta") {
			if (slimDOMOptions.headMetaDescKeywords && lowerIfExists(sn.attributes.name).match(/^description|keywords$/)) return true;
			else if (slimDOMOptions.headMetaSocial && (lowerIfExists(sn.attributes.property).match(/^(og|twitter|fb):/) || lowerIfExists(sn.attributes.name).match(/^(og|twitter):/) || lowerIfExists(sn.attributes.name) === "pinterest")) return true;
			else if (slimDOMOptions.headMetaRobots && [
				"robots",
				"googlebot",
				"bingbot"
			].includes(lowerIfExists(sn.attributes.name))) return true;
			else if (slimDOMOptions.headMetaHttpEquiv && sn.attributes["http-equiv"] !== void 0) return true;
			else if (slimDOMOptions.headMetaAuthorship && ([
				"author",
				"generator",
				"framework",
				"publisher",
				"progid"
			].includes(lowerIfExists(sn.attributes.name)) || lowerIfExists(sn.attributes.property).match(/^article:/) || lowerIfExists(sn.attributes.property).match(/^product:/))) return true;
			else if (slimDOMOptions.headMetaVerification && [
				"google-site-verification",
				"yandex-verification",
				"csrf-token",
				"p:domain_verify",
				"verify-v1",
				"verification",
				"shopify-checkout-api-token"
			].includes(lowerIfExists(sn.attributes.name))) return true;
		}
	}
	return false;
}
var _maxDepthWarned = false;
var _maxDepthReached = false;
function wasMaxDepthReached() {
	return _maxDepthReached;
}
function resetMaxDepthState() {
	_maxDepthReached = false;
	_maxDepthWarned = false;
}
function serializeNodeWithId(n, options) {
	const { doc, mirror, blockClass, blockSelector, maskTextClass, maskTextSelector, skipChild = false, inlineStylesheet = true, maskInputOptions = {}, maskTextFn, maskInputFn, maskAllElementAttributes = false, maskAttributeFn, slimDOMOptions, dataURLOptions = {}, inlineImages = false, recordCanvas = false, canvasMaskingConfigured, onSerialize, onIframeLoad, iframeLoadTimeout = 5e3, onIframeListenerRegistered, onStylesheetLoad, stylesheetLoadTimeout = 5e3, keepIframeSrcFn = () => false, newlyAddedElement = false, depth = 0, maxDepth = 50 } = options;
	let { needsMask } = options;
	let { preserveWhiteSpace = true } = options;
	if (depth >= maxDepth) {
		_maxDepthReached = true;
		if (!_maxDepthWarned) {
			_maxDepthWarned = true;
			console.warn(`[rrweb-snapshot] DOM tree depth exceeded max depth of ${maxDepth}. Children beyond this depth will not be recorded. This may indicate deeply nested DOM structures.`);
		}
		return null;
	}
	if (!needsMask) needsMask = needMaskingText(n, maskTextClass, maskTextSelector, needsMask === void 0);
	countSerializedNode();
	const _serializedNode = serializeNode(n, {
		doc,
		mirror,
		blockClass,
		blockSelector,
		needsMask,
		inlineStylesheet,
		maskInputOptions,
		maskTextFn,
		maskInputFn,
		maskAllElementAttributes,
		maskAttributeFn,
		dataURLOptions,
		inlineImages,
		recordCanvas,
		canvasMaskingConfigured,
		keepIframeSrcFn,
		newlyAddedElement
	});
	if (!_serializedNode) {
		console.warn(n, "not serialized");
		return null;
	}
	let id;
	if (mirror.hasNode(n)) id = mirror.getId(n);
	else if (slimDOMExcluded(_serializedNode, slimDOMOptions) || !preserveWhiteSpace && _serializedNode.type === NodeType.Text && !_serializedNode.isStyle && !_serializedNode.textContent.replace(/^\s+|\s+$/gm, "").length) id = -2;
	else id = genId();
	const serializedNode = Object.assign(_serializedNode, { id });
	mirror.add(n, serializedNode);
	if (id === -2) return null;
	if (onSerialize) onSerialize(n);
	let recordChild = !skipChild;
	if (serializedNode.type === NodeType.Element) {
		recordChild = recordChild && !serializedNode.needBlock;
		delete serializedNode.needBlock;
		const shadowRootEl = src_default.shadowRoot(n);
		if (shadowRootEl && isNativeShadowDom(shadowRootEl)) serializedNode.isShadowHost = true;
	}
	if ((serializedNode.type === NodeType.Document || serializedNode.type === NodeType.Element) && recordChild) {
		if (slimDOMOptions.headWhitespace && serializedNode.type === NodeType.Element && serializedNode.tagName === "head") preserveWhiteSpace = false;
		const bypassOptions = {
			doc,
			mirror,
			blockClass,
			blockSelector,
			needsMask,
			maskTextClass,
			maskTextSelector,
			skipChild,
			inlineStylesheet,
			maskInputOptions,
			maskTextFn,
			maskInputFn,
			maskAllElementAttributes,
			maskAttributeFn,
			slimDOMOptions,
			dataURLOptions,
			inlineImages,
			recordCanvas,
			canvasMaskingConfigured,
			preserveWhiteSpace,
			onSerialize,
			onIframeLoad,
			iframeLoadTimeout,
			onIframeListenerRegistered,
			onStylesheetLoad,
			stylesheetLoadTimeout,
			keepIframeSrcFn,
			depth: depth + 1,
			maxDepth
		};
		if (serializedNode.type === NodeType.Element && serializedNode.tagName === "textarea" && serializedNode.attributes.value !== void 0) {} else for (const childN of Array.from(src_default.childNodes(n))) {
			const serializedChildNode = serializeNodeWithId(childN, bypassOptions);
			if (serializedChildNode) serializedNode.childNodes.push(serializedChildNode);
		}
		let shadowRootEl = null;
		if (isElement(n) && (shadowRootEl = src_default.shadowRoot(n))) for (const childN of Array.from(src_default.childNodes(shadowRootEl))) {
			const serializedChildNode = serializeNodeWithId(childN, bypassOptions);
			if (serializedChildNode) {
				isNativeShadowDom(shadowRootEl) && (serializedChildNode.isShadow = true);
				serializedNode.childNodes.push(serializedChildNode);
			}
		}
	}
	const parent = src_default.parentNode(n);
	if (parent && isShadowRoot(parent) && isNativeShadowDom(parent)) serializedNode.isShadow = true;
	if (serializedNode.type === NodeType.Element && serializedNode.tagName === "iframe") {
		const iframeDisposer = onceIframeLoaded(n, () => {
			const iframeDoc = n.contentDocument;
			if (iframeDoc && onIframeLoad) {
				const serializedIframeNode = serializeNodeWithId(iframeDoc, {
					doc: iframeDoc,
					mirror,
					blockClass,
					blockSelector,
					needsMask,
					maskTextClass,
					maskTextSelector,
					skipChild: false,
					inlineStylesheet,
					maskInputOptions,
					maskTextFn,
					maskInputFn,
					maskAllElementAttributes,
					maskAttributeFn,
					slimDOMOptions,
					dataURLOptions,
					inlineImages,
					recordCanvas,
					canvasMaskingConfigured,
					preserveWhiteSpace,
					onSerialize,
					onIframeLoad,
					iframeLoadTimeout,
					onIframeListenerRegistered,
					onStylesheetLoad,
					stylesheetLoadTimeout,
					keepIframeSrcFn,
					depth: depth + 1,
					maxDepth
				});
				if (serializedIframeNode) onIframeLoad(n, serializedIframeNode);
			}
		}, iframeLoadTimeout);
		onIframeListenerRegistered === null || onIframeListenerRegistered === void 0 || onIframeListenerRegistered(n, iframeDisposer);
	}
	if (serializedNode.type === NodeType.Element && serializedNode.tagName === "link" && serializedNode.attributes.rel === "stylesheet") onceStylesheetLoaded(n, () => {
		if (onStylesheetLoad) {
			const serializedLinkNode = serializeNodeWithId(n, {
				doc,
				mirror,
				blockClass,
				blockSelector,
				needsMask,
				maskTextClass,
				maskTextSelector,
				skipChild: false,
				inlineStylesheet,
				maskInputOptions,
				maskTextFn,
				maskInputFn,
				maskAllElementAttributes,
				maskAttributeFn,
				slimDOMOptions,
				dataURLOptions,
				inlineImages,
				recordCanvas,
				canvasMaskingConfigured,
				preserveWhiteSpace,
				onSerialize,
				onIframeLoad,
				iframeLoadTimeout,
				onStylesheetLoad,
				stylesheetLoadTimeout,
				keepIframeSrcFn,
				depth,
				maxDepth
			});
			if (serializedLinkNode) onStylesheetLoad(n, serializedLinkNode);
		}
	}, stylesheetLoadTimeout);
	return serializedNode;
}
function slimDOMDefaults(slimDOM) {
	if (slimDOM === true || slimDOM === "all") return {
		script: true,
		comment: true,
		headFavicon: true,
		headWhitespace: true,
		headMetaSocial: true,
		headMetaRobots: true,
		headMetaHttpEquiv: true,
		headMetaVerification: true,
		headMetaAuthorship: slimDOM === "all",
		headMetaDescKeywords: slimDOM === "all",
		headTitleMutations: slimDOM === "all"
	};
	if (slimDOM === false) return {};
	return slimDOM;
}
function snapshot(n, options) {
	const { mirror = new Mirror(), blockClass = "rr-block", blockSelector = null, maskTextClass = "rr-mask", maskTextSelector = null, inlineStylesheet = true, inlineImages = false, recordCanvas = false, canvasMaskingConfigured, maskAllInputs = false, maskTextFn, maskInputFn, maskAllElementAttributes = false, maskAttributeFn, slimDOM = false, dataURLOptions, preserveWhiteSpace, onSerialize, onIframeLoad, iframeLoadTimeout, onIframeListenerRegistered, onStylesheetLoad, stylesheetLoadTimeout, keepIframeSrcFn = () => false, maxDepth, inlineStylesheetBudgetRules } = options || {};
	const maskInputOptions = maskAllInputs === true ? {
		color: true,
		date: true,
		"datetime-local": true,
		email: true,
		month: true,
		number: true,
		range: true,
		search: true,
		tel: true,
		text: true,
		time: true,
		url: true,
		week: true,
		textarea: true,
		select: true,
		password: true
	} : maskAllInputs === false ? { password: true } : maskAllInputs;
	const slimDOMOptions = slimDOMDefaults(slimDOM);
	beginSnapshotCostTracking(inlineStylesheetBudgetRules);
	try {
		return serializeNodeWithId(n, {
			doc: n,
			mirror,
			blockClass,
			blockSelector,
			maskTextClass,
			maskTextSelector,
			skipChild: false,
			inlineStylesheet,
			maskInputOptions,
			maskTextFn,
			maskInputFn,
			maskAllElementAttributes,
			maskAttributeFn,
			slimDOMOptions,
			dataURLOptions,
			inlineImages,
			recordCanvas,
			canvasMaskingConfigured,
			preserveWhiteSpace,
			onSerialize,
			onIframeLoad,
			iframeLoadTimeout,
			onIframeListenerRegistered,
			onStylesheetLoad,
			stylesheetLoadTimeout,
			keepIframeSrcFn,
			newlyAddedElement: false,
			maxDepth
		});
	} finally {
		endSnapshotCostTracking();
	}
}
//#endregion
//#region ../rrdom/src/document.ts
/**
* This is designed as an abstract class so it should never be instantiated.
*/
var BaseRRNode = class BaseRRNode {
	constructor(..._args) {
		_defineProperty(this, "parentElement", null);
		_defineProperty(this, "parentNode", null);
		_defineProperty(this, "ownerDocument", void 0);
		_defineProperty(this, "firstChild", null);
		_defineProperty(this, "lastChild", null);
		_defineProperty(this, "previousSibling", null);
		_defineProperty(this, "nextSibling", null);
		_defineProperty(this, "ELEMENT_NODE", 1);
		_defineProperty(this, "TEXT_NODE", 3);
		_defineProperty(this, "nodeType", void 0);
		_defineProperty(this, "nodeName", void 0);
		_defineProperty(this, "RRNodeType", void 0);
	}
	get childNodes() {
		const childNodes = [];
		let childIterator = this.firstChild;
		while (childIterator) {
			childNodes.push(childIterator);
			childIterator = childIterator.nextSibling;
		}
		return childNodes;
	}
	contains(node) {
		if (!(node instanceof BaseRRNode)) return false;
		else if (node.ownerDocument !== this.ownerDocument) return false;
		else if (node === this) return true;
		while (node.parentNode) {
			if (node.parentNode === this) return true;
			node = node.parentNode;
		}
		return false;
	}
	appendChild(_newChild) {
		throw new Error(`RRDomException: Failed to execute 'appendChild' on 'RRNode': This RRNode type does not support this method.`);
	}
	insertBefore(_newChild, _refChild) {
		throw new Error(`RRDomException: Failed to execute 'insertBefore' on 'RRNode': This RRNode type does not support this method.`);
	}
	removeChild(_node) {
		throw new Error(`RRDomException: Failed to execute 'removeChild' on 'RRNode': This RRNode type does not support this method.`);
	}
	toString() {
		return "RRNode";
	}
};
//#endregion
//#region ../rrweb/src/utils.ts
function on(type, fn, target = document) {
	const options = {
		capture: true,
		passive: true
	};
	target.addEventListener(type, fn, options);
	return () => removeEventListenerSafely(target, type, fn, options);
}
function removeEventListenerSafely(target, type, fn, options) {
	callSafely(() => {
		const removeEventListener = target.removeEventListener;
		if (typeof removeEventListener !== "function") return;
		if (options === void 0) {
			removeEventListener.call(target, type, fn);
			return;
		}
		removeEventListener.call(target, type, fn, options);
	});
}
function callSafely(fn) {
	try {
		fn();
	} catch (error) {
		if (!(error instanceof DOMException && error.name === "SecurityError")) throw error;
	}
}
function callAllSafely(fns) {
	fns.forEach((fn) => {
		if (typeof fn !== "function") return;
		try {
			fn();
		} catch (e) {}
	});
}
var DEPARTED_MIRROR_ACCESS_WARNING = "Please stop import mirror directly. Instead of that,\r\nnow you can use replayer.getMirror() to access the mirror instance of a replayer,\r\nor you can use record.mirror to access the mirror instance during recording.";
/** @deprecated */
var _mirror = {
	map: {},
	getId() {
		console.error(DEPARTED_MIRROR_ACCESS_WARNING);
		return -1;
	},
	getNode() {
		console.error(DEPARTED_MIRROR_ACCESS_WARNING);
		return null;
	},
	removeNodeFromMap() {
		console.error(DEPARTED_MIRROR_ACCESS_WARNING);
	},
	has() {
		console.error(DEPARTED_MIRROR_ACCESS_WARNING);
		return false;
	},
	reset() {
		console.error(DEPARTED_MIRROR_ACCESS_WARNING);
	}
};
if (typeof window !== "undefined" && window.Proxy && window.Reflect) _mirror = new Proxy(_mirror, { get(target, prop, receiver) {
	if (prop === "map") console.error(DEPARTED_MIRROR_ACCESS_WARNING);
	return Reflect.get(target, prop, receiver);
} });
function throttle(func, wait, options = {}) {
	let timeout = null;
	let previous = 0;
	return function(...args) {
		const now = Date.now();
		if (!previous && options.leading === false) previous = now;
		const remaining = wait - (now - previous);
		const context = this;
		if (remaining <= 0 || remaining > wait) {
			if (timeout) {
				clearTimeout(timeout);
				timeout = null;
			}
			previous = now;
			func.apply(context, args);
		} else if (!timeout && options.trailing !== false) timeout = setTimeout(() => {
			previous = options.leading === false ? 0 : Date.now();
			timeout = null;
			func.apply(context, args);
		}, remaining);
	};
}
function hookSetter(target, key, d, isRevoked, win = window) {
	const original = win.Object.getOwnPropertyDescriptor(target, key);
	win.Object.defineProperty(target, key, isRevoked ? d : { set(value) {
		setTimeout(() => {
			try {
				d.set.call(this, value);
			} catch {}
		}, 0);
		if (original && original.set) {
			if (original.get) try {
				original.get.call(this);
			} catch {
				return;
			}
			original.set.call(this, value);
		}
	} });
	return () => hookSetter(target, key, original || {}, true);
}
var nowTimestamp = Date.now;
if (!/*@__PURE__*/ /[1-9][0-9]{12}/.test(Date.now().toString())) nowTimestamp = () => (/* @__PURE__ */ new Date()).getTime();
function getWindowScroll(win) {
	var _dom$parentElement, _doc$body, _dom$parentElement2, _doc$body2;
	const doc = win.document;
	return {
		left: doc.scrollingElement ? doc.scrollingElement.scrollLeft : win.pageXOffset !== void 0 ? win.pageXOffset : doc.documentElement.scrollLeft || (doc === null || doc === void 0 ? void 0 : doc.body) && ((_dom$parentElement = src_default.parentElement(doc.body)) === null || _dom$parentElement === void 0 ? void 0 : _dom$parentElement.scrollLeft) || (doc === null || doc === void 0 || (_doc$body = doc.body) === null || _doc$body === void 0 ? void 0 : _doc$body.scrollLeft) || 0,
		top: doc.scrollingElement ? doc.scrollingElement.scrollTop : win.pageYOffset !== void 0 ? win.pageYOffset : (doc === null || doc === void 0 ? void 0 : doc.documentElement.scrollTop) || (doc === null || doc === void 0 ? void 0 : doc.body) && ((_dom$parentElement2 = src_default.parentElement(doc.body)) === null || _dom$parentElement2 === void 0 ? void 0 : _dom$parentElement2.scrollTop) || (doc === null || doc === void 0 || (_doc$body2 = doc.body) === null || _doc$body2 === void 0 ? void 0 : _doc$body2.scrollTop) || 0
	};
}
function getWindowHeight() {
	return window.innerHeight || document.documentElement && document.documentElement.clientHeight || document.body && document.body.clientHeight;
}
function getWindowWidth() {
	return window.innerWidth || document.documentElement && document.documentElement.clientWidth || document.body && document.body.clientWidth;
}
/**
* Returns the given node as an HTMLElement if it is one, otherwise the parent node as an HTMLElement
* @param node - node to check
* @returns HTMLElement or null
*/
function closestElementOfNode(node) {
	if (!node) return null;
	return node.nodeType === node.ELEMENT_NODE ? node : src_default.parentElement(node);
}
/**
* Checks if the given element set to be blocked by rrweb
* @param node - node to check
* @param blockClass - class name to check
* @param blockSelector - css selectors to check
* @param checkAncestors - whether to search through parent nodes for the block class
* @returns true/false if the node was blocked or not
*/
function isBlocked(node, blockClass, blockSelector, checkAncestors) {
	if (!node) return false;
	const el = closestElementOfNode(node);
	if (!el) return false;
	try {
		if (typeof blockClass === "string") {
			if (el.classList.contains(blockClass)) return true;
			if (checkAncestors && el.closest("." + blockClass) !== null) return true;
		} else if (classMatchesRegex(el, blockClass, checkAncestors)) return true;
	} catch (e) {}
	if (blockSelector) {
		if (el.matches(blockSelector)) return true;
		if (checkAncestors && el.closest(blockSelector) !== null) return true;
	}
	return false;
}
function isSerialized(n, mirror) {
	return mirror.getId(n) !== -1;
}
function isIgnored(n, mirror, slimDOMOptions) {
	if (n.tagName === "TITLE" && slimDOMOptions.headTitleMutations) return true;
	return mirror.getId(n) === -2;
}
function isAncestorRemoved(target, mirror) {
	if (isShadowRoot(target)) return false;
	const id = mirror.getId(target);
	if (!mirror.has(id)) return true;
	const parent = src_default.parentNode(target);
	if (parent && parent.nodeType === target.DOCUMENT_NODE) return false;
	if (!parent) return true;
	return isAncestorRemoved(parent, mirror);
}
function legacy_isTouchEvent(event) {
	return Boolean(event.changedTouches);
}
function polyfill(win = window) {
	if ("NodeList" in win && !win.NodeList.prototype.forEach) win.NodeList.prototype.forEach = Array.prototype.forEach;
	if ("DOMTokenList" in win && !win.DOMTokenList.prototype.forEach) win.DOMTokenList.prototype.forEach = Array.prototype.forEach;
}
function isSerializedIframe(n, mirror) {
	return Boolean(n.nodeName === "IFRAME" && mirror.getMeta(n));
}
function isSerializedStylesheet(n, mirror) {
	return Boolean(n.nodeName === "LINK" && n.nodeType === n.ELEMENT_NODE && n.getAttribute && n.getAttribute("rel") === "stylesheet" && mirror.getMeta(n));
}
function hasShadowRoot(n) {
	if (!n) return false;
	if (n instanceof BaseRRNode && "shadowRoot" in n) return Boolean(n.shadowRoot);
	return Boolean(src_default.shadowRoot(n));
}
var StyleSheetMirror = class {
	constructor() {
		_defineProperty(this, "id", 1);
		_defineProperty(this, "styleIDMap", /* @__PURE__ */ new WeakMap());
		_defineProperty(this, "idStyleMap", /* @__PURE__ */ new Map());
	}
	getId(stylesheet) {
		return this.styleIDMap.get(stylesheet) ?? -1;
	}
	has(stylesheet) {
		return this.styleIDMap.has(stylesheet);
	}
	/**
	* @returns If the stylesheet is in the mirror, returns the id of the stylesheet. If not, return the new assigned id.
	*/
	add(stylesheet, id) {
		if (this.has(stylesheet)) return this.getId(stylesheet);
		let newId;
		if (id === void 0) newId = this.id++;
		else newId = id;
		this.styleIDMap.set(stylesheet, newId);
		this.idStyleMap.set(newId, stylesheet);
		return newId;
	}
	getStyle(id) {
		return this.idStyleMap.get(id) || null;
	}
	reset() {
		this.styleIDMap = /* @__PURE__ */ new WeakMap();
		this.idStyleMap = /* @__PURE__ */ new Map();
		this.id = 1;
	}
	generateId() {
		return this.id++;
	}
};
/**
* Get the direct shadow host of a node in shadow dom. Returns null if it is not in a shadow dom.
*/
function getShadowHost(n) {
	var _dom$getRootNode;
	let shadowHost = null;
	if ("getRootNode" in n && ((_dom$getRootNode = src_default.getRootNode(n)) === null || _dom$getRootNode === void 0 ? void 0 : _dom$getRootNode.nodeType) === Node.DOCUMENT_FRAGMENT_NODE && src_default.host(src_default.getRootNode(n))) shadowHost = src_default.host(src_default.getRootNode(n));
	return shadowHost;
}
/**
* Get the root shadow host of a node in nested shadow doms. Returns the node itself if it is not in a shadow dom.
*/
function getRootShadowHost(n) {
	let rootShadowHost = n;
	let shadowHost;
	while (shadowHost = getShadowHost(rootShadowHost)) rootShadowHost = shadowHost;
	return rootShadowHost;
}
function shadowHostInDom(n) {
	const doc = n.ownerDocument;
	if (!doc) return false;
	const shadowHost = getRootShadowHost(n);
	return src_default.contains(doc, shadowHost);
}
function inDom(n) {
	const doc = n.ownerDocument;
	if (!doc) return false;
	if (src_default.contains(doc, n)) return true;
	const connected = src_default.isConnected(n);
	return typeof connected === "boolean" ? connected : shadowHostInDom(n);
}
//#endregion
//#region ../rrweb/src/record/mutation.ts
function isNodeInLinkedList(n) {
	return "__ln" in n;
}
var DoubleLinkedList = class {
	constructor() {
		_defineProperty(this, "length", 0);
		_defineProperty(this, "head", null);
		_defineProperty(this, "tail", null);
	}
	get(position) {
		if (position >= this.length) throw new Error("Position outside of list range");
		let current = this.head;
		for (let index = 0; index < position; index++) current = (current === null || current === void 0 ? void 0 : current.next) || null;
		return current;
	}
	addNode(n) {
		const node = {
			value: n,
			previous: null,
			next: null
		};
		n.__ln = node;
		if (n.previousSibling && isNodeInLinkedList(n.previousSibling)) {
			const current = n.previousSibling.__ln.next;
			node.next = current;
			node.previous = n.previousSibling.__ln;
			n.previousSibling.__ln.next = node;
			if (current) current.previous = node;
		} else if (n.nextSibling && isNodeInLinkedList(n.nextSibling) && n.nextSibling.__ln.previous) {
			const current = n.nextSibling.__ln.previous;
			node.previous = current;
			node.next = n.nextSibling.__ln;
			n.nextSibling.__ln.previous = node;
			if (current) current.next = node;
		} else {
			if (this.head) this.head.previous = node;
			node.next = this.head;
			this.head = node;
		}
		if (node.next === null) this.tail = node;
		this.length++;
	}
	removeNode(n) {
		const current = n.__ln;
		if (!this.head) return;
		if (!current.previous) {
			this.head = current.next;
			if (this.head) this.head.previous = null;
			else this.tail = null;
		} else {
			current.previous.next = current.next;
			if (current.next) current.next.previous = current.previous;
			else this.tail = current.previous;
		}
		if (n.__ln) delete n.__ln;
		this.length--;
	}
};
var moveKey = (id, parentId) => `${id}@${parentId}`;
var XML_NAMESPACE = "http://www.w3.org/XML/1998/namespace";
var XMLNS_NAMESPACE = "http://www.w3.org/2000/xmlns/";
var XLINK_NAMESPACE = "http://www.w3.org/1999/xlink";
function getSerializedAttributeName(target, localName, namespace) {
	if (!namespace) return localName;
	const attribute = target.getAttributeNodeNS(namespace, localName);
	if (attribute) return attribute.name;
	if (namespace === XLINK_NAMESPACE) return `xlink:${localName}`;
	if (namespace === XML_NAMESPACE) return `xml:${localName}`;
	if (namespace === XMLNS_NAMESPACE) return localName === "xmlns" ? localName : `xmlns:${localName}`;
	const prefix = target.lookupPrefix(namespace);
	return prefix ? `${prefix}:${localName}` : localName;
}
/**
* controls behaviour of a MutationObserver
*/
var MutationBuffer = class {
	constructor() {
		_defineProperty(this, "frozen", false);
		_defineProperty(this, "locked", false);
		_defineProperty(this, "texts", []);
		_defineProperty(this, "attributes", []);
		_defineProperty(this, "attributeMap", /* @__PURE__ */ new WeakMap());
		_defineProperty(this, "generatedAttributes", /* @__PURE__ */ new WeakMap());
		_defineProperty(this, "removes", []);
		_defineProperty(this, "mapRemoves", /* @__PURE__ */ new Set());
		_defineProperty(this, "movedMap", {});
		_defineProperty(
			this,
			/**
			* the browser MutationObserver emits multiple mutations after
			* a delay for performance reasons, making tracing added nodes hard
			* in our `processMutations` callback function.
			* For example, if we append an element el_1 into body, and then append
			* another element el_2 into el_1, these two mutations may be passed to the
			* callback function together when the two operations were done.
			* Generally we need to trace child nodes of newly added nodes, but in this
			* case if we count el_2 as el_1's child node in the first mutation record,
			* then we will count el_2 again in the second mutation record which was
			* duplicated.
			* To avoid of duplicate counting added nodes, we use a Set to store
			* added nodes and its child nodes during iterate mutation records. Then
			* collect added nodes from the Set which have no duplicate copy. But
			* this also causes newly added nodes will not be serialized with id ASAP,
			* which means all the id related calculation should be lazy too.
			*/
			"addedSet",
			/* @__PURE__ */ new Set()
		);
		_defineProperty(this, "movedSet", /* @__PURE__ */ new Set());
		_defineProperty(this, "droppedSet", /* @__PURE__ */ new Set());
		_defineProperty(this, "removesSubTreeCache", /* @__PURE__ */ new Set());
		_defineProperty(this, "mutationCb", void 0);
		_defineProperty(this, "blockClass", void 0);
		_defineProperty(this, "blockSelector", void 0);
		_defineProperty(this, "maskTextClass", void 0);
		_defineProperty(this, "maskTextSelector", void 0);
		_defineProperty(this, "inlineStylesheet", void 0);
		_defineProperty(this, "maskInputOptions", void 0);
		_defineProperty(this, "maskTextFn", void 0);
		_defineProperty(this, "maskInputFn", void 0);
		_defineProperty(this, "maskAllElementAttributes", void 0);
		_defineProperty(this, "maskAttributeFn", void 0);
		_defineProperty(this, "keepIframeSrcFn", void 0);
		_defineProperty(this, "recordCanvas", void 0);
		_defineProperty(this, "canvasMaskingConfigured", void 0);
		_defineProperty(this, "inlineImages", void 0);
		_defineProperty(this, "slimDOMOptions", void 0);
		_defineProperty(this, "dataURLOptions", void 0);
		_defineProperty(this, "doc", void 0);
		_defineProperty(this, "mirror", void 0);
		_defineProperty(this, "iframeManager", void 0);
		_defineProperty(this, "stylesheetManager", void 0);
		_defineProperty(this, "shadowDomManager", void 0);
		_defineProperty(this, "canvasManager", void 0);
		_defineProperty(this, "processedNodeManager", void 0);
		_defineProperty(this, "unattachedDoc", void 0);
		_defineProperty(this, "canvasManagerReleased", false);
		_defineProperty(this, "processMutations", (mutations) => {
			mutations.forEach(this.processMutation);
			this.emit();
		});
		_defineProperty(this, "emit", () => {
			if (this.frozen || this.locked) return;
			const startedAt = nowMs();
			const startGeneration = getSuspensionGeneration();
			try {
				this.processBufferedMutations();
			} finally {
				recordMutationCost(nowMs() - startedAt, startGeneration);
			}
		});
		_defineProperty(this, "processBufferedMutations", () => {
			const adds = [];
			const addedIds = /* @__PURE__ */ new Set();
			/**
			* Sometimes child node may be pushed before its newly added
			* parent, so we init a queue to store these nodes.
			*/
			const addList = new DoubleLinkedList();
			const getNextId = (n) => {
				let ns = n;
				let nextId = -2;
				while (nextId === -2) {
					ns = ns && ns.nextSibling;
					nextId = ns && this.mirror.getId(ns);
				}
				return nextId;
			};
			let serializationOptions;
			const pushAdd = (n) => {
				const parent = src_default.parentNode(n);
				if (!parent || !inDom(n) || parent.tagName === "TEXTAREA") return;
				if (this.isBlockedAtEmission(parent)) return;
				const parentId = isShadowRoot(parent) ? this.mirror.getId(getShadowHost(n)) : this.mirror.getId(parent);
				const nextId = getNextId(n);
				if (parentId === -1 || nextId === -1) return addList.addNode(n);
				serializationOptions ?? (serializationOptions = {
					doc: this.doc,
					mirror: this.mirror,
					blockClass: this.blockClass,
					blockSelector: this.blockSelector,
					maskTextClass: this.maskTextClass,
					maskTextSelector: this.maskTextSelector,
					skipChild: true,
					newlyAddedElement: true,
					inlineStylesheet: this.inlineStylesheet,
					maskInputOptions: this.maskInputOptions,
					maskTextFn: this.maskTextFn,
					maskInputFn: this.maskInputFn,
					maskAllElementAttributes: this.maskAllElementAttributes,
					maskAttributeFn: this.maskAttributeFn,
					slimDOMOptions: this.slimDOMOptions,
					dataURLOptions: this.dataURLOptions,
					recordCanvas: this.recordCanvas,
					canvasMaskingConfigured: this.canvasMaskingConfigured,
					inlineImages: this.inlineImages,
					onSerialize: (currentN) => {
						if (isSerializedIframe(currentN, this.mirror)) this.iframeManager.addIframe(currentN);
						if (isSerializedStylesheet(currentN, this.mirror)) this.stylesheetManager.trackLinkElement(currentN);
						if (hasShadowRoot(currentN) && !isBlocked(currentN, this.blockClass, this.blockSelector, true)) this.shadowDomManager.addShadowRoot(src_default.shadowRoot(currentN), this.doc);
					},
					onIframeLoad: (iframe, childSn) => {
						this.iframeManager.attachIframe(iframe, childSn);
						this.shadowDomManager.observeAttachShadow(iframe);
					},
					onIframeListenerRegistered: (iframe, disposer) => {
						this.iframeManager.registerLoadListenerDisposer(iframe, disposer);
					},
					onStylesheetLoad: (link, childSn) => {
						this.stylesheetManager.attachLinkElement(link, childSn);
					}
				});
				const sn = serializeNodeWithId(n, serializationOptions);
				if (sn) {
					adds.push({
						parentId,
						nextId,
						node: sn
					});
					addedIds.add(sn.id);
				}
			};
			for (const node of this.mapRemoves) {
				this.mapRemoves.delete(node);
				this.mirror.removeNodeFromMap(node);
			}
			for (const n of this.movedSet) {
				if (isParentRemoved(this.removesSubTreeCache, n, this.mirror) && !this.movedSet.has(src_default.parentNode(n))) continue;
				pushAdd(n);
			}
			for (const n of this.addedSet) if (!isAncestorInSet(this.droppedSet, n) && !isParentRemoved(this.removesSubTreeCache, n, this.mirror)) pushAdd(n);
			else if (isAncestorInSet(this.movedSet, n)) pushAdd(n);
			else this.droppedSet.add(n);
			let candidate = null;
			while (addList.length) {
				let node = null;
				if (candidate) {
					const parentId = this.mirror.getId(src_default.parentNode(candidate.value));
					const nextId = getNextId(candidate.value);
					if (parentId !== -1 && nextId !== -1) node = candidate;
				}
				if (!node) {
					let tailNode = addList.tail;
					while (tailNode) {
						const _node = tailNode;
						tailNode = tailNode.previous;
						if (_node) {
							const parentId = this.mirror.getId(src_default.parentNode(_node.value));
							if (getNextId(_node.value) === -1) continue;
							else if (parentId !== -1) {
								node = _node;
								break;
							} else {
								const unhandledNode = _node.value;
								const parent = src_default.parentNode(unhandledNode);
								if (parent && parent.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
									const shadowHost = src_default.host(parent);
									if (this.mirror.getId(shadowHost) !== -1) {
										node = _node;
										break;
									}
								}
							}
						}
					}
				}
				if (!node) {
					/**
					* If all nodes in queue could not find a serialized parent,
					* it may be a bug or corner case. We need to escape the
					* dead while loop at once.
					*/
					while (addList.head) addList.removeNode(addList.head.value);
					break;
				}
				candidate = node.previous;
				addList.removeNode(node.value);
				pushAdd(node.value);
			}
			const payload = {
				texts: this.texts.filter((text) => !this.isBlockedAtEmission(text.node)).map((text) => {
					const n = text.node;
					const parent = src_default.parentNode(n);
					if (parent && parent.tagName === "TEXTAREA") this.genTextAreaValueMutation(parent);
					return {
						id: this.mirror.getId(n),
						value: text.value
					};
				}).filter((text) => !addedIds.has(text.id)).filter((text) => this.mirror.has(text.id)),
				attributes: this.attributes.filter((attribute) => !this.isBlockedAtEmission(attribute.node)).map((attribute) => {
					const { attributes } = attribute;
					if (!this.maskAllElementAttributes && !this.maskAttributeFn && typeof attributes.style === "string") {
						const diffAsStr = JSON.stringify(attribute.styleDiff);
						const unchangedAsStr = JSON.stringify(attribute._unchangedStyles);
						if (diffAsStr.length < attributes.style.length) {
							if ((diffAsStr + unchangedAsStr).split("var(").length === attributes.style.split("var(").length) attributes.style = attribute.styleDiff;
						}
					}
					if (this.maskAllElementAttributes || this.maskAttributeFn) {
						for (const [name, value] of Object.entries(attributes)) if (typeof value === "string" || value === null) {
							var _this$generatedAttrib;
							attributes[name] = maskAttributeValue({
								element: attribute.node,
								name,
								value,
								maskAllElementAttributes: this.maskAllElementAttributes,
								maskAttributeFn: this.maskAttributeFn,
								isGenerated: (_this$generatedAttrib = this.generatedAttributes.get(attribute.node)) === null || _this$generatedAttrib === void 0 ? void 0 : _this$generatedAttrib.has(name)
							});
						}
					}
					return {
						id: this.mirror.getId(attribute.node),
						attributes
					};
				}).filter((attribute) => !addedIds.has(attribute.id)).filter((attribute) => this.mirror.has(attribute.id)),
				removes: this.removes,
				adds
			};
			this.texts = [];
			this.attributes = [];
			this.attributeMap = /* @__PURE__ */ new WeakMap();
			this.generatedAttributes = /* @__PURE__ */ new WeakMap();
			this.removes = [];
			this.addedSet = /* @__PURE__ */ new Set();
			this.movedSet = /* @__PURE__ */ new Set();
			this.droppedSet = /* @__PURE__ */ new Set();
			this.removesSubTreeCache = /* @__PURE__ */ new Set();
			this.movedMap = {};
			if (!payload.texts.length && !payload.attributes.length && !payload.removes.length && !payload.adds.length) return;
			this.mutationCb(payload);
		});
		_defineProperty(this, "bufferBelongsToIframe", (iframeEl) => {
			return this.doc === iframeEl.contentDocument;
		});
		_defineProperty(this, "genTextAreaValueMutation", (textarea) => {
			let item = this.attributeMap.get(textarea);
			if (!item) {
				item = {
					node: textarea,
					attributes: {},
					styleDiff: {},
					_unchangedStyles: {}
				};
				this.attributes.push(item);
				this.attributeMap.set(textarea, item);
			}
			const value = Array.from(src_default.childNodes(textarea), (cn) => src_default.textContent(cn) || "").join("");
			item.attributes.value = maskInputValue({
				element: textarea,
				maskInputOptions: this.maskInputOptions,
				tagName: textarea.tagName,
				type: getInputType(textarea),
				value,
				maskInputFn: this.maskInputFn
			});
		});
		_defineProperty(this, "processMutation", (m) => {
			if (isIgnored(m.target, this.mirror, this.slimDOMOptions)) return;
			switch (m.type) {
				case "characterData": {
					const value = src_default.textContent(m.target);
					if (!isBlocked(m.target, this.blockClass, this.blockSelector, false) && value !== m.oldValue) this.texts.push({
						value: needMaskingText(m.target, this.maskTextClass, this.maskTextSelector, true) && value ? this.maskTextFn ? this.maskTextFn(value, closestElementOfNode(m.target)) : value.replace(/[\S]/g, "*") : value,
						node: m.target
					});
					break;
				}
				case "attributes": {
					const target = m.target;
					const tagNameLower = toLowerCase(target.tagName);
					const sourceAttributeName = m.attributeName;
					const attributeNamespace = m.attributeNamespace ?? null;
					let attributeName = getSerializedAttributeName(target, sourceAttributeName, attributeNamespace);
					let value = attributeNamespace ? target.getAttributeNS(attributeNamespace, sourceAttributeName) : m.target.getAttribute(sourceAttributeName);
					if (attributeName === "value") {
						const htmlTarget = target;
						const type = getInputType(htmlTarget);
						value = maskInputValue({
							element: htmlTarget,
							maskInputOptions: this.maskInputOptions,
							tagName: target.tagName,
							type,
							value,
							maskInputFn: this.maskInputFn
						});
					}
					if (isBlocked(m.target, this.blockClass, this.blockSelector, false) || value === m.oldValue) return;
					let item = this.attributeMap.get(m.target);
					const isIframeSrc = tagNameLower === "iframe" && attributeName === "src";
					if (isIframeSrc && !this.keepIframeSrcFn(value) && target.contentDocument) return;
					if (attributeName === "type" && tagNameLower === "input" && (m.oldValue || "").toLowerCase() === "password") target.setAttribute("data-rr-is-password", "true");
					if (!ignoreAttribute(tagNameLower, attributeName, value)) {
						var _this$generatedAttrib2;
						if (!item) {
							item = {
								node: m.target,
								attributes: {},
								styleDiff: {},
								_unchangedStyles: {}
							};
							this.attributes.push(item);
							this.attributeMap.set(m.target, item);
						}
						const transformedValue = transformAttribute(this.doc, tagNameLower, toLowerCase(attributeName), value, target, this.dataURLOptions);
						if (isIframeSrc && !this.keepIframeSrcFn(value)) attributeName = "rr_src";
						item.attributes[attributeName] = transformedValue;
						(_this$generatedAttrib2 = this.generatedAttributes.get(m.target)) === null || _this$generatedAttrib2 === void 0 || _this$generatedAttrib2.delete(attributeName);
						if (attributeName === "style") {
							if (!this.unattachedDoc) try {
								this.unattachedDoc = document.implementation.createHTMLDocument();
							} catch (e) {
								this.unattachedDoc = this.doc;
							}
							const old = this.unattachedDoc.createElement("span");
							const targetStyle = target.style;
							if (m.oldValue) old.style.cssText = m.oldValue;
							for (const pname of Array.from(targetStyle)) {
								const newValue = targetStyle.getPropertyValue(pname);
								const newPriority = targetStyle.getPropertyPriority(pname);
								if (newValue !== old.style.getPropertyValue(pname) || newPriority !== old.style.getPropertyPriority(pname)) {
									if (newPriority === "") item.styleDiff[pname] = newValue;
									else item.styleDiff[pname] = [newValue, newPriority];
								} else item._unchangedStyles[pname] = [newValue, newPriority];
							}
							for (const pname of Array.from(old.style)) if (targetStyle.getPropertyValue(pname) === "") item.styleDiff[pname] = false;
						} else if (attributeName === "open" && tagNameLower === "dialog") {
							if (target.matches("dialog:modal")) item.attributes["rr_open_mode"] = "modal";
							else item.attributes["rr_open_mode"] = "non-modal";
							let generated = this.generatedAttributes.get(m.target);
							if (!generated) {
								generated = /* @__PURE__ */ new Set();
								this.generatedAttributes.set(m.target, generated);
							}
							generated.add("rr_open_mode");
						}
					}
					break;
				}
				case "childList":
					/**
					* Parent is blocked, ignore all child mutations
					*/
					if (isBlocked(m.target, this.blockClass, this.blockSelector, true)) return;
					if (m.target.tagName === "TEXTAREA") {
						this.genTextAreaValueMutation(m.target);
						return;
					}
					m.addedNodes.forEach((n) => this.genAdds(n, m.target));
					m.removedNodes.forEach((n) => {
						const nodeId = this.mirror.getId(n);
						const parentId = isShadowRoot(m.target) ? this.mirror.getId(src_default.host(m.target)) : this.mirror.getId(m.target);
						if (isBlocked(m.target, this.blockClass, this.blockSelector, false) || isIgnored(n, this.mirror, this.slimDOMOptions) || !isSerialized(n, this.mirror)) return;
						if (this.addedSet.has(n)) {
							deepDelete(this.addedSet, n);
							this.droppedSet.add(n);
						} else if (this.addedSet.has(m.target) && nodeId === -1) {} else if (isAncestorRemoved(m.target, this.mirror)) {} else if (this.movedSet.has(n) && this.movedMap[moveKey(nodeId, parentId)]) deepDelete(this.movedSet, n);
						else {
							this.removes.push({
								parentId,
								id: nodeId,
								isShadow: isShadowRoot(m.target) && isNativeShadowDom(m.target) ? true : void 0
							});
							processRemoves(n, this.removesSubTreeCache);
						}
						this.mapRemoves.add(n);
					});
			}
		});
		_defineProperty(
			this,
			/**
			* Make sure you check if `n`'s parent is blocked before calling this function
			* */
			"genAdds",
			(n, target) => {
				if (this.processedNodeManager.inOtherBuffer(n, this)) return;
				if (this.addedSet.has(n)) {
					this.addedSet.delete(n);
					this.addedSet.add(n);
					return;
				}
				if (this.movedSet.has(n)) return;
				if (this.mirror.hasNode(n)) {
					if (isIgnored(n, this.mirror, this.slimDOMOptions)) return;
					this.movedSet.add(n);
					let targetId = null;
					if (target && this.mirror.hasNode(target)) targetId = this.mirror.getId(target);
					if (targetId && targetId !== -1) this.movedMap[moveKey(this.mirror.getId(n), targetId)] = true;
				} else {
					this.addedSet.add(n);
					this.droppedSet.delete(n);
				}
				if (!isBlocked(n, this.blockClass, this.blockSelector, false)) {
					if (n.nodeType === n.TEXT_NODE) return;
					const children = src_default.childNodes(n);
					for (let i = 0, length = children.length; i < length; i++) {
						const childN = children[i];
						if (childN) this.genAdds(childN);
					}
					if (hasShadowRoot(n)) {
						const shadowChildren = src_default.childNodes(src_default.shadowRoot(n));
						for (let i = 0, length = shadowChildren.length; i < length; i++) {
							const childN = shadowChildren[i];
							if (!childN) continue;
							this.processedNodeManager.add(childN, this);
							this.genAdds(childN, n);
						}
					}
				}
			}
		);
	}
	init(options) {
		[
			"mutationCb",
			"blockClass",
			"blockSelector",
			"maskTextClass",
			"maskTextSelector",
			"inlineStylesheet",
			"maskInputOptions",
			"maskTextFn",
			"maskInputFn",
			"maskAllElementAttributes",
			"maskAttributeFn",
			"keepIframeSrcFn",
			"recordCanvas",
			"canvasMaskingConfigured",
			"inlineImages",
			"slimDOMOptions",
			"dataURLOptions",
			"doc",
			"mirror",
			"iframeManager",
			"stylesheetManager",
			"shadowDomManager",
			"canvasManager",
			"processedNodeManager"
		].forEach((key) => {
			this[key] = options[key];
		});
		this.canvasManager.acquire();
	}
	freeze() {
		this.frozen = true;
		this.canvasManager.freeze();
	}
	unfreeze() {
		this.frozen = false;
		this.canvasManager.unfreeze();
		this.emit();
	}
	isFrozen() {
		return this.frozen;
	}
	lock() {
		this.locked = true;
		this.canvasManager.lock();
	}
	unlock() {
		this.locked = false;
		this.canvasManager.unlock();
		this.emit();
	}
	reset() {
		this.releaseCanvasManager();
	}
	releaseCanvasManager() {
		if (this.canvasManagerReleased) return;
		this.canvasManagerReleased = true;
		this.canvasManager.reset();
	}
	bufferDoc() {
		return this.doc;
	}
	destroy() {
		for (const node of this.mapRemoves) {
			this.mapRemoves.delete(node);
			this.mirror.removeNodeFromMap(node);
		}
	}
	isBlockedAtEmission(node) {
		const blockClass = this.blockClass;
		const stateful = blockClass && typeof blockClass !== "string" && (blockClass.global || blockClass.sticky) ? new RegExp(blockClass) : null;
		while (node) {
			if (stateful) stateful.lastIndex = 0;
			if (isBlocked(node, stateful || blockClass, this.blockSelector, true)) return true;
			const root = "getRootNode" in node ? src_default.getRootNode(node) : null;
			node = (root === null || root === void 0 ? void 0 : root.nodeType) === Node.DOCUMENT_FRAGMENT_NODE ? src_default.host(root) : null;
		}
		return false;
	}
};
/**
* Some utils to handle the mutation observer DOM records.
* It should be more clear to extend the native data structure
* like Set and Map, but currently Typescript does not support
* that.
*/
function deepDelete(addsSet, n) {
	const stack = [n];
	while (stack.length) {
		const next = stack.pop();
		addsSet.delete(next);
		if (next.nodeType === next.TEXT_NODE) continue;
		const children = src_default.childNodes(next);
		for (let i = 0, length = children.length; i < length; i++) {
			const childN = children[i];
			if (childN) stack.push(childN);
		}
	}
}
function processRemoves(n, cache) {
	const queue = [n];
	while (queue.length) {
		const next = queue.pop();
		if (cache.has(next)) continue;
		cache.add(next);
		src_default.childNodes(next).forEach((n) => queue.push(n));
	}
}
function isParentRemoved(removes, n, mirror) {
	if (removes.size === 0) return false;
	return _isParentRemoved(removes, n, mirror);
}
function _isParentRemoved(removes, n, _mirror) {
	const node = src_default.parentNode(n);
	if (!node) return false;
	return removes.has(node);
}
function isAncestorInSet(set, n) {
	if (set.size === 0) return false;
	let parent = src_default.parentNode(n);
	while (parent) {
		if (set.has(parent)) return true;
		parent = src_default.parentNode(parent);
	}
	return false;
}
//#endregion
//#region ../rrweb/src/record/error-handler.ts
var errorHandler;
function registerErrorHandler(handler) {
	errorHandler = handler;
}
function unregisterErrorHandler() {
	errorHandler = void 0;
}
/**
* Wrap callbacks in a wrapper that allows to pass errors to a configured `errorHandler` method.
*
* Host API patches must set `context` to `host`. Their callback boundary also
* contains the native operation, so an error handler cannot otherwise reliably
* distinguish an application-visible native exception from recorder work.
*/
var callbackWrapper = (cb, context = "rrweb") => {
	if (!errorHandler) return cb;
	const rrwebWrapped = ((...rest) => {
		try {
			return cb(...rest);
		} catch (error) {
			if (errorHandler && errorHandler(error, context) === true) return;
			throw error;
		}
	});
	return rrwebWrapped;
};
//#endregion
//#region ../rrweb/src/record/observer.ts
var mutationBuffers = [];
function getEventTarget(event) {
	try {
		if ("composedPath" in event) {
			const path = event.composedPath();
			if (path.length) return path[0];
		} else if ("path" in event && event.path.length) return event.path[0];
	} catch {}
	return event && event.target;
}
function initMutationObserver(options, rootEl) {
	const mutationBuffer = new MutationBuffer();
	mutationBuffer.init(options);
	let observer;
	try {
		observer = new (mutationObserverCtor())(callbackWrapper(mutationBuffer.processMutations.bind(mutationBuffer)));
		const mutationObserverInit = {
			attributes: true,
			attributeOldValue: true,
			characterData: true,
			characterDataOldValue: true,
			childList: true,
			subtree: true
		};
		if (options.attributeFilter && options.attributeFilter.length > 0) mutationObserverInit.attributeFilter = options.attributeFilter;
		observer.observe(rootEl, mutationObserverInit);
		mutationBuffers.push(mutationBuffer);
		return {
			observer,
			buffer: mutationBuffer
		};
	} catch (error) {
		try {
			observer === null || observer === void 0 || observer.disconnect();
			mutationBuffer.destroy();
			mutationBuffer.reset();
		} catch {}
		throw error;
	}
}
function initMoveObserver({ mousemoveCb, sampling, doc, mirror }) {
	if (sampling.mousemove === false) return () => {};
	const threshold = typeof sampling.mousemove === "number" ? sampling.mousemove : 50;
	const callbackThreshold = typeof sampling.mousemoveCallback === "number" ? sampling.mousemoveCallback : 500;
	let positions = [];
	let timeBaseline;
	const wrappedCb = throttle(callbackWrapper((source) => {
		const totalOffset = Date.now() - timeBaseline;
		mousemoveCb(positions.map((p) => {
			p.timeOffset -= totalOffset;
			return p;
		}), source);
		positions = [];
		timeBaseline = null;
	}), callbackThreshold);
	const updatePosition = callbackWrapper(throttle(callbackWrapper((evt) => {
		const target = getEventTarget(evt);
		const { clientX, clientY } = legacy_isTouchEvent(evt) ? evt.changedTouches[0] : evt;
		if (!timeBaseline) timeBaseline = nowTimestamp();
		positions.push({
			x: clientX,
			y: clientY,
			id: mirror.getId(target),
			timeOffset: nowTimestamp() - timeBaseline
		});
		wrappedCb(typeof DragEvent !== "undefined" && evt instanceof DragEvent ? IncrementalSource.Drag : evt instanceof MouseEvent ? IncrementalSource.MouseMove : IncrementalSource.TouchMove);
	}), threshold, { trailing: false }));
	const handlers = [
		on("mousemove", updatePosition, doc),
		on("touchmove", updatePosition, doc),
		on("drag", updatePosition, doc)
	];
	return callbackWrapper(() => {
		handlers.forEach((h) => h());
	});
}
function initMouseInteractionObserver({ mouseInteractionCb, doc, mirror, blockClass, blockSelector, sampling }) {
	if (sampling.mouseInteraction === false) return () => {};
	const disableMap = sampling.mouseInteraction === true || sampling.mouseInteraction === void 0 ? {} : sampling.mouseInteraction;
	const handlers = [];
	let currentPointerType = null;
	const getHandler = (eventKey) => {
		return (event) => {
			const target = getEventTarget(event);
			if (isBlocked(target, blockClass, blockSelector, true)) return;
			let pointerType = null;
			let thisEventKey = eventKey;
			if ("pointerType" in event) {
				switch (event.pointerType) {
					case "mouse":
						pointerType = PointerTypes.Mouse;
						break;
					case "touch":
						pointerType = PointerTypes.Touch;
						break;
					case "pen": pointerType = PointerTypes.Pen;
				}
				if (pointerType === PointerTypes.Touch) {
					if (MouseInteractions[eventKey] === MouseInteractions.MouseDown) thisEventKey = "TouchStart";
					else if (MouseInteractions[eventKey] === MouseInteractions.MouseUp) thisEventKey = "TouchEnd";
				} else if (pointerType === PointerTypes.Pen) {}
			} else if (legacy_isTouchEvent(event)) pointerType = PointerTypes.Touch;
			if (pointerType !== null) {
				currentPointerType = pointerType;
				if (thisEventKey.startsWith("Touch") && pointerType === PointerTypes.Touch || thisEventKey.startsWith("Mouse") && pointerType === PointerTypes.Mouse) pointerType = null;
			} else if (MouseInteractions[eventKey] === MouseInteractions.Click) {
				pointerType = currentPointerType;
				currentPointerType = null;
			}
			const e = legacy_isTouchEvent(event) ? event.changedTouches[0] : event;
			if (!e) return;
			const id = mirror.getId(target);
			const { clientX, clientY } = e;
			callbackWrapper(mouseInteractionCb)({
				type: MouseInteractions[thisEventKey],
				id,
				x: clientX,
				y: clientY,
				...pointerType !== null && { pointerType }
			});
		};
	};
	Object.keys(MouseInteractions).filter((key) => Number.isNaN(Number(key)) && !key.endsWith("_Departed") && disableMap[key] !== false).forEach((eventKey) => {
		let eventName = toLowerCase(eventKey);
		const handler = getHandler(eventKey);
		if (window.PointerEvent) switch (MouseInteractions[eventKey]) {
			case MouseInteractions.MouseDown:
			case MouseInteractions.MouseUp:
				eventName = eventName.replace("mouse", "pointer");
				break;
			case MouseInteractions.TouchStart:
			case MouseInteractions.TouchEnd: return;
		}
		handlers.push(on(eventName, handler, doc));
	});
	return callbackWrapper(() => {
		handlers.forEach((h) => h());
	});
}
function initScrollObserver({ scrollCb, doc, mirror, blockClass, blockSelector, sampling }) {
	const lastEmitted = /* @__PURE__ */ new Map();
	const emitScrollPosition = (evt) => {
		const target = getEventTarget(evt);
		if (!target || isBlocked(target, blockClass, blockSelector, true)) return;
		const id = mirror.getId(target);
		let x;
		let y;
		if (target === doc && doc.defaultView) {
			const scrollLeftTop = getWindowScroll(doc.defaultView);
			x = scrollLeftTop.left;
			y = scrollLeftTop.top;
		} else {
			x = target.scrollLeft;
			y = target.scrollTop;
		}
		const key = `${x},${y}`;
		if (lastEmitted.get(id) === key) return;
		lastEmitted.set(id, key);
		scrollCb({
			id,
			x,
			y
		});
	};
	const handlers = [on("scroll", callbackWrapper(throttle(callbackWrapper((evt) => emitScrollPosition(evt)), sampling.scroll || 100)), doc)];
	if ("onscrollend" in doc) handlers.push(on("scrollend", callbackWrapper(emitScrollPosition), doc));
	return () => handlers.forEach((h) => h());
}
function initViewportResizeObserver({ viewportResizeCb }, { win }) {
	let lastH = -1;
	let lastW = -1;
	return on("resize", callbackWrapper(throttle(callbackWrapper(() => {
		const height = getWindowHeight();
		const width = getWindowWidth();
		if (lastH !== height || lastW !== width) {
			viewportResizeCb({
				width: Number(width),
				height: Number(height)
			});
			lastH = height;
			lastW = width;
		}
	}), 200)), win);
}
function findAndRemoveIframeBuffer(iframeEl, knownDocs) {
	for (let i = mutationBuffers.length - 1; i >= 0; i--) {
		const buf = mutationBuffers[i];
		if (!buf) continue;
		let match = buf.bufferBelongsToIframe(iframeEl);
		if (!match && knownDocs && knownDocs.has(buf.bufferDoc())) match = true;
		if (match) {
			buf.reset();
			mutationBuffers.splice(i, 1);
		}
	}
}
var INPUT_TAGS = [
	"INPUT",
	"TEXTAREA",
	"SELECT"
];
var lastInputValueMap = /* @__PURE__ */ new WeakMap();
function initInputObserver({ inputCb, doc, mirror, blockClass, blockSelector, ignoreClass, ignoreSelector, maskInputOptions, maskInputFn, sampling, userTriggeredOnInput }) {
	function eventHandler(event) {
		let target = getEventTarget(event);
		const userTriggered = event.isTrusted;
		const view = doc.defaultView;
		if (target && view && !(target instanceof view.HTMLElement)) return;
		const tagName = target && target.tagName;
		/**
		* If a site changes the value 'selected' of an option element, the value of its parent element, usually a select element, will be changed as well.
		* We can treat this change as a value change of the select element the current target belongs to.
		*/
		if (target && tagName === "OPTION") target = src_default.parentElement(target);
		if (!target || !tagName || INPUT_TAGS.indexOf(tagName) < 0 || isBlocked(target, blockClass, blockSelector, true)) return;
		if (target.classList.contains(ignoreClass) || ignoreSelector && target.matches(ignoreSelector)) return;
		let text = target.value;
		let isChecked = false;
		const type = getInputType(target) || "";
		if (type === "radio" || type === "checkbox") isChecked = target.checked;
		else if (maskInputOptions[tagName.toLowerCase()] || maskInputOptions[type]) text = maskInputValue({
			element: target,
			maskInputOptions,
			tagName,
			type,
			value: text,
			maskInputFn
		});
		cbWithDedup(target, userTriggeredOnInput ? {
			text,
			isChecked,
			userTriggered
		} : {
			text,
			isChecked
		});
		const name = target.name;
		if (type === "radio" && name && isChecked) doc.querySelectorAll(`input[type="radio"][name="${name}"]`).forEach((el) => {
			if (el !== target) {
				const text = el.value;
				cbWithDedup(el, userTriggeredOnInput ? {
					text,
					isChecked: !isChecked,
					userTriggered: false
				} : {
					text,
					isChecked: !isChecked
				});
			}
		});
	}
	function cbWithDedup(target, v) {
		const lastInputValue = lastInputValueMap.get(target);
		if (!lastInputValue || lastInputValue.text !== v.text || lastInputValue.isChecked !== v.isChecked) {
			lastInputValueMap.set(target, v);
			const id = mirror.getId(target);
			callbackWrapper(inputCb)({
				...v,
				id
			});
		}
	}
	const handlers = (sampling.input === "last" ? ["change"] : ["input", "change"]).map((eventName) => on(eventName, callbackWrapper(eventHandler), doc));
	const currentWindow = doc.defaultView;
	if (!currentWindow) return () => {
		handlers.forEach((h) => h());
	};
	const propertyDescriptor = currentWindow.Object.getOwnPropertyDescriptor(currentWindow.HTMLInputElement.prototype, "value");
	const hookProperties = [
		[currentWindow.HTMLInputElement.prototype, "value"],
		[currentWindow.HTMLInputElement.prototype, "checked"],
		[currentWindow.HTMLSelectElement.prototype, "value"],
		[currentWindow.HTMLTextAreaElement.prototype, "value"],
		[currentWindow.HTMLSelectElement.prototype, "selectedIndex"],
		[currentWindow.HTMLOptionElement.prototype, "selected"]
	];
	if (propertyDescriptor && propertyDescriptor.set) handlers.push(...hookProperties.map((p) => hookSetter(p[0], p[1], { set() {
		callbackWrapper(eventHandler)({
			target: this,
			isTrusted: false
		});
	} }, false, currentWindow)));
	return callbackWrapper(() => {
		callAllSafely(handlers);
	});
}
function getNestedCSSRulePositions(rule) {
	const positions = [];
	function recurse(childRule, pos) {
		if (hasNestedCSSRule("CSSGroupingRule") && childRule.parentRule instanceof CSSGroupingRule || hasNestedCSSRule("CSSMediaRule") && childRule.parentRule instanceof CSSMediaRule || hasNestedCSSRule("CSSSupportsRule") && childRule.parentRule instanceof CSSSupportsRule || hasNestedCSSRule("CSSConditionRule") && childRule.parentRule instanceof CSSConditionRule) {
			const index = Array.from(childRule.parentRule.cssRules).indexOf(childRule);
			pos.unshift(index);
			return recurse(childRule.parentRule, pos);
		} else if (childRule.parentStyleSheet) {
			const index = Array.from(childRule.parentStyleSheet.cssRules).indexOf(childRule);
			pos.unshift(index);
		}
		return pos;
	}
	return recurse(rule, positions);
}
/**
* For StyleSheets in Element, this function retrieves id of its host element.
* For adopted StyleSheets, this function retrieves its styleId from a styleMirror.
*/
function getIdAndStyleId(sheet, mirror, styleMirror) {
	let id, styleId;
	if (!sheet) return {};
	if (sheet.ownerNode) id = mirror.getId(sheet.ownerNode);
	else styleId = styleMirror.getId(sheet);
	return {
		styleId,
		id
	};
}
var STYLESHEET_REPLACE_TIMEOUT = 5e3;
function createStyleSheetMutationQueue(win) {
	const queuedMutations = /* @__PURE__ */ new Map();
	const pendingTimeouts = /* @__PURE__ */ new Set();
	let active = true;
	const safeEmit = (emit) => {
		if (!active) return;
		try {
			emit();
		} catch {}
	};
	const flush = (sheet) => {
		var _queue$;
		const queue = queuedMutations.get(sheet);
		if (!queue) return;
		while ((_queue$ = queue[0]) === null || _queue$ === void 0 ? void 0 : _queue$.ready) {
			const mutation = queue.shift();
			if (mutation === null || mutation === void 0 ? void 0 : mutation.emit) safeEmit(mutation.emit);
		}
		if (queue.length === 0) queuedMutations.delete(sheet);
	};
	const queueMutation = (sheet, emit) => {
		if (!sheet) {
			safeEmit(emit);
			return;
		}
		const queue = queuedMutations.get(sheet);
		if (!queue) {
			safeEmit(emit);
			return;
		}
		queue.push({
			emit,
			ready: true
		});
		flush(sheet);
	};
	const queuePendingMutation = (sheet, emit, emitLate) => {
		if (!active) return () => void 0;
		let queue = queuedMutations.get(sheet);
		if (!queue) {
			queue = [];
			queuedMutations.set(sheet, queue);
		}
		const mutation = {
			emit,
			ready: false
		};
		queue.push(mutation);
		let expired = false;
		let settled = false;
		let timeoutId;
		const expire = () => {
			if (expired || settled) return;
			expired = true;
			if (timeoutId !== void 0) pendingTimeouts.delete(timeoutId);
			mutation.ready = true;
			mutation.emit = void 0;
			flush(sheet);
		};
		const complete = (success) => {
			if (settled || !active) return;
			settled = true;
			if (timeoutId !== void 0) {
				win.clearTimeout(timeoutId);
				pendingTimeouts.delete(timeoutId);
			}
			if (expired) {
				if (success) safeEmit(emitLate);
				return;
			}
			mutation.ready = true;
			if (!success) mutation.emit = void 0;
			flush(sheet);
		};
		try {
			timeoutId = win.setTimeout(expire, STYLESHEET_REPLACE_TIMEOUT);
			if (expired || settled) win.clearTimeout(timeoutId);
			else pendingTimeouts.add(timeoutId);
		} catch {
			expire();
		}
		return complete;
	};
	const reset = () => {
		active = false;
		pendingTimeouts.forEach((timeoutId) => win.clearTimeout(timeoutId));
		pendingTimeouts.clear();
		queuedMutations.clear();
	};
	return {
		queueMutation,
		queuePendingMutation,
		reset
	};
}
function initStyleSheetObserver({ styleSheetRuleCb, mirror, stylesheetManager }, { win, mutationQueue }) {
	if (!win.CSSStyleSheet || !win.CSSStyleSheet.prototype) return () => {};
	const insertRule = win.CSSStyleSheet.prototype.insertRule;
	win.CSSStyleSheet.prototype.insertRule = new Proxy(insertRule, { apply: callbackWrapper((target, thisArg, argumentsList) => {
		const [rule] = argumentsList;
		const insertedIndex = target.apply(thisArg, argumentsList);
		stylesheetManager.onCssomSheetMutation(thisArg);
		const { id, styleId } = getIdAndStyleId(thisArg, mirror, stylesheetManager.styleMirror);
		if (id && id !== -1 || styleId && styleId !== -1) mutationQueue.queueMutation(thisArg, () => styleSheetRuleCb({
			id,
			styleId,
			adds: [{
				rule,
				index: insertedIndex
			}]
		}));
		return insertedIndex;
	}, "host") });
	win.CSSStyleSheet.prototype.addRule = function(selector, styleBlock, index = this.cssRules.length) {
		const rule = `${selector} { ${styleBlock} }`;
		return win.CSSStyleSheet.prototype.insertRule.apply(this, [rule, index]);
	};
	const deleteRule = win.CSSStyleSheet.prototype.deleteRule;
	win.CSSStyleSheet.prototype.deleteRule = new Proxy(deleteRule, { apply: callbackWrapper((target, thisArg, argumentsList) => {
		const [index] = argumentsList;
		const result = target.apply(thisArg, argumentsList);
		stylesheetManager.onCssomSheetMutation(thisArg);
		const { id, styleId } = getIdAndStyleId(thisArg, mirror, stylesheetManager.styleMirror);
		if (id && id !== -1 || styleId && styleId !== -1) mutationQueue.queueMutation(thisArg, () => styleSheetRuleCb({
			id,
			styleId,
			removes: [{ index }]
		}));
		return result;
	}, "host") });
	win.CSSStyleSheet.prototype.removeRule = function(index) {
		return win.CSSStyleSheet.prototype.deleteRule.apply(this, [index]);
	};
	let replace;
	if (win.CSSStyleSheet.prototype.replace) {
		replace = win.CSSStyleSheet.prototype.replace;
		win.CSSStyleSheet.prototype.replace = new Proxy(replace, { apply: callbackWrapper((target, thisArg, argumentsList) => {
			const [text] = argumentsList;
			const result = target.apply(thisArg, argumentsList);
			try {
				const then = result === null || result === void 0 ? void 0 : result.then;
				if (thisArg.ownerNode || !result || typeof then !== "function") return result;
				stylesheetManager.onCssomSheetMutation(thisArg);
				const { id, styleId } = getIdAndStyleId(thisArg, mirror, stylesheetManager.styleMirror);
				if (!(id && id !== -1 || styleId && styleId !== -1)) return result;
				const completeMutation = mutationQueue.queuePendingMutation(thisArg, () => styleSheetRuleCb({
					id,
					styleId,
					replace: text
				}), () => {
					const lateStyleSheetText = stringifyStylesheet(thisArg);
					if (lateStyleSheetText !== null) styleSheetRuleCb({
						id,
						styleId,
						replace: lateStyleSheetText
					});
				});
				try {
					then.call(result, () => completeMutation(true), () => completeMutation(false));
				} catch {
					completeMutation(false);
				}
			} catch {}
			return result;
		}, "host") });
	}
	let replaceSync;
	if (win.CSSStyleSheet.prototype.replaceSync) {
		replaceSync = win.CSSStyleSheet.prototype.replaceSync;
		win.CSSStyleSheet.prototype.replaceSync = new Proxy(replaceSync, { apply: callbackWrapper((target, thisArg, argumentsList) => {
			const [text] = argumentsList;
			const result = target.apply(thisArg, argumentsList);
			stylesheetManager.onCssomSheetMutation(thisArg);
			const { id, styleId } = getIdAndStyleId(thisArg, mirror, stylesheetManager.styleMirror);
			if (id && id !== -1 || styleId && styleId !== -1) mutationQueue.queueMutation(thisArg, () => styleSheetRuleCb({
				id,
				styleId,
				replaceSync: text
			}));
			return result;
		}, "host") });
	}
	const supportedNestedCSSRuleTypes = {};
	if (canMonkeyPatchNestedCSSRule("CSSGroupingRule")) supportedNestedCSSRuleTypes.CSSGroupingRule = win.CSSGroupingRule;
	else {
		if (canMonkeyPatchNestedCSSRule("CSSMediaRule")) supportedNestedCSSRuleTypes.CSSMediaRule = win.CSSMediaRule;
		if (canMonkeyPatchNestedCSSRule("CSSConditionRule")) supportedNestedCSSRuleTypes.CSSConditionRule = win.CSSConditionRule;
		if (canMonkeyPatchNestedCSSRule("CSSSupportsRule")) supportedNestedCSSRuleTypes.CSSSupportsRule = win.CSSSupportsRule;
	}
	const unmodifiedFunctions = {};
	Object.entries(supportedNestedCSSRuleTypes).forEach(([typeKey, type]) => {
		unmodifiedFunctions[typeKey] = {
			insertRule: type.prototype.insertRule,
			deleteRule: type.prototype.deleteRule
		};
		type.prototype.insertRule = new Proxy(unmodifiedFunctions[typeKey].insertRule, { apply: callbackWrapper((target, thisArg, argumentsList) => {
			const [rule] = argumentsList;
			const insertedIndex = target.apply(thisArg, argumentsList);
			stylesheetManager.onCssomSheetMutation(thisArg.parentStyleSheet);
			const { id, styleId } = getIdAndStyleId(thisArg.parentStyleSheet, mirror, stylesheetManager.styleMirror);
			if (thisArg.parentStyleSheet && (id && id !== -1 || styleId && styleId !== -1)) {
				const index = [...getNestedCSSRulePositions(thisArg), insertedIndex];
				mutationQueue.queueMutation(thisArg.parentStyleSheet, () => styleSheetRuleCb({
					id,
					styleId,
					adds: [{
						rule,
						index
					}]
				}));
			}
			return insertedIndex;
		}, "host") });
		type.prototype.deleteRule = new Proxy(unmodifiedFunctions[typeKey].deleteRule, { apply: callbackWrapper((target, thisArg, argumentsList) => {
			const [index] = argumentsList;
			const result = target.apply(thisArg, argumentsList);
			stylesheetManager.onCssomSheetMutation(thisArg.parentStyleSheet);
			const { id, styleId } = getIdAndStyleId(thisArg.parentStyleSheet, mirror, stylesheetManager.styleMirror);
			if (thisArg.parentStyleSheet && (id && id !== -1 || styleId && styleId !== -1)) {
				const nestedIndex = [...getNestedCSSRulePositions(thisArg), index];
				mutationQueue.queueMutation(thisArg.parentStyleSheet, () => styleSheetRuleCb({
					id,
					styleId,
					removes: [{ index: nestedIndex }]
				}));
			}
			return result;
		}, "host") });
	});
	return callbackWrapper(() => {
		win.CSSStyleSheet.prototype.insertRule = insertRule;
		win.CSSStyleSheet.prototype.deleteRule = deleteRule;
		replace && (win.CSSStyleSheet.prototype.replace = replace);
		replaceSync && (win.CSSStyleSheet.prototype.replaceSync = replaceSync);
		Object.entries(supportedNestedCSSRuleTypes).forEach(([typeKey, type]) => {
			type.prototype.insertRule = unmodifiedFunctions[typeKey].insertRule;
			type.prototype.deleteRule = unmodifiedFunctions[typeKey].deleteRule;
		});
	});
}
function initAdoptedStyleSheetObserver({ mirror, stylesheetManager }, host) {
	var _host$defaultView, _host$ownerDocument;
	let hostId = null;
	if (host.nodeName === "#document") hostId = mirror.getId(host);
	else hostId = mirror.getId(src_default.host(host));
	const patchTarget = host.nodeName === "#document" ? (_host$defaultView = host.defaultView) === null || _host$defaultView === void 0 ? void 0 : _host$defaultView.Document : (_host$ownerDocument = host.ownerDocument) === null || _host$ownerDocument === void 0 || (_host$ownerDocument = _host$ownerDocument.defaultView) === null || _host$ownerDocument === void 0 ? void 0 : _host$ownerDocument.ShadowRoot;
	const originalPropertyDescriptor = (patchTarget === null || patchTarget === void 0 ? void 0 : patchTarget.prototype) ? Object.getOwnPropertyDescriptor(patchTarget === null || patchTarget === void 0 ? void 0 : patchTarget.prototype, "adoptedStyleSheets") : void 0;
	if (hostId === null || hostId === -1 || !patchTarget || !originalPropertyDescriptor) return () => {};
	Object.defineProperty(host, "adoptedStyleSheets", {
		configurable: originalPropertyDescriptor.configurable,
		enumerable: originalPropertyDescriptor.enumerable,
		get() {
			var _originalPropertyDesc;
			return (_originalPropertyDesc = originalPropertyDescriptor.get) === null || _originalPropertyDesc === void 0 ? void 0 : _originalPropertyDesc.call(this);
		},
		set(sheets) {
			let result;
			try {
				var _originalPropertyDesc2;
				result = (_originalPropertyDesc2 = originalPropertyDescriptor.set) === null || _originalPropertyDesc2 === void 0 ? void 0 : _originalPropertyDesc2.call(this, sheets);
			} catch (e) {
				if (!!e && typeof e === "object" && e.name === "NotAllowedError") return;
				throw e;
			}
			if (hostId !== null && hostId !== -1) try {
				stylesheetManager.adoptStyleSheets(sheets, hostId);
			} catch (e) {}
			return result;
		}
	});
	return callbackWrapper(() => {
		Object.defineProperty(host, "adoptedStyleSheets", {
			configurable: originalPropertyDescriptor.configurable,
			enumerable: originalPropertyDescriptor.enumerable,
			get: originalPropertyDescriptor.get,
			set: originalPropertyDescriptor.set
		});
	});
}
function initStyleDeclarationObserver({ styleDeclarationCb, mirror, ignoreCSSAttributes, stylesheetManager }, { win, mutationQueue }) {
	const setProperty = win.CSSStyleDeclaration.prototype.setProperty;
	win.CSSStyleDeclaration.prototype.setProperty = new Proxy(setProperty, { apply: callbackWrapper((target, thisArg, argumentsList) => {
		var _thisArg$parentRule;
		const [property, value, priority] = argumentsList;
		const result = target.apply(thisArg, argumentsList);
		if (ignoreCSSAttributes.has(property)) return result;
		const sheet = (_thisArg$parentRule = thisArg.parentRule) === null || _thisArg$parentRule === void 0 ? void 0 : _thisArg$parentRule.parentStyleSheet;
		stylesheetManager.onCssomSheetMutation(sheet);
		const { id, styleId } = getIdAndStyleId(sheet, mirror, stylesheetManager.styleMirror);
		if (id && id !== -1 || styleId && styleId !== -1) {
			const index = getNestedCSSRulePositions(thisArg.parentRule);
			mutationQueue.queueMutation(sheet, () => styleDeclarationCb({
				id,
				styleId,
				set: {
					property,
					value,
					priority
				},
				index
			}));
		}
		return result;
	}, "host") });
	const removeProperty = win.CSSStyleDeclaration.prototype.removeProperty;
	win.CSSStyleDeclaration.prototype.removeProperty = new Proxy(removeProperty, { apply: callbackWrapper((target, thisArg, argumentsList) => {
		var _thisArg$parentRule2;
		const [property] = argumentsList;
		const result = target.apply(thisArg, argumentsList);
		if (ignoreCSSAttributes.has(property)) return result;
		const sheet = (_thisArg$parentRule2 = thisArg.parentRule) === null || _thisArg$parentRule2 === void 0 ? void 0 : _thisArg$parentRule2.parentStyleSheet;
		stylesheetManager.onCssomSheetMutation(sheet);
		const { id, styleId } = getIdAndStyleId(sheet, mirror, stylesheetManager.styleMirror);
		if (id && id !== -1 || styleId && styleId !== -1) {
			const index = getNestedCSSRulePositions(thisArg.parentRule);
			mutationQueue.queueMutation(sheet, () => styleDeclarationCb({
				id,
				styleId,
				remove: { property },
				index
			}));
		}
		return result;
	}, "host") });
	return callbackWrapper(() => {
		win.CSSStyleDeclaration.prototype.setProperty = setProperty;
		win.CSSStyleDeclaration.prototype.removeProperty = removeProperty;
	});
}
function initMediaInteractionObserver({ mediaInteractionCb, blockClass, blockSelector, mirror, sampling, doc }) {
	const handler = callbackWrapper((type) => throttle(callbackWrapper((event) => {
		const target = getEventTarget(event);
		if (!target || isBlocked(target, blockClass, blockSelector, true)) return;
		const { currentTime, volume, muted, playbackRate, loop } = target;
		mediaInteractionCb({
			type,
			id: mirror.getId(target),
			currentTime,
			volume,
			muted,
			playbackRate,
			loop
		});
	}), sampling.media || 500));
	const handlers = [
		on("play", handler(MediaInteractions.Play), doc),
		on("pause", handler(MediaInteractions.Pause), doc),
		on("seeked", handler(MediaInteractions.Seeked), doc),
		on("volumechange", handler(MediaInteractions.VolumeChange), doc),
		on("ratechange", handler(MediaInteractions.RateChange), doc)
	];
	return callbackWrapper(() => {
		handlers.forEach((h) => h());
	});
}
function initFontObserver({ fontCb, doc }) {
	const win = doc.defaultView;
	if (!win) return () => {};
	const handlers = [];
	const fontMap = /* @__PURE__ */ new WeakMap();
	const originalFontFace = win.FontFace;
	win.FontFace = function FontFace(family, source, descriptors) {
		const fontFace = new originalFontFace(family, source, descriptors);
		fontMap.set(fontFace, {
			family,
			buffer: typeof source !== "string",
			descriptors,
			fontSource: typeof source === "string" ? source : JSON.stringify(Array.from(new Uint8Array(source)))
		});
		return fontFace;
	};
	const restoreHandler = patch(doc.fonts, "add", function(original) {
		return function(fontFace) {
			setTimeout(callbackWrapper(() => {
				const p = fontMap.get(fontFace);
				if (p) {
					fontCb(p);
					fontMap.delete(fontFace);
				}
			}), 0);
			return original.apply(this, [fontFace]);
		};
	});
	handlers.push(() => {
		win.FontFace = originalFontFace;
	});
	handlers.push(restoreHandler);
	return callbackWrapper(() => {
		handlers.forEach((h) => h());
	});
}
function initSelectionObserver(param) {
	const { doc, mirror, blockClass, blockSelector, selectionCb } = param;
	let collapsed = true;
	const updateSelection = callbackWrapper(() => {
		const selection = doc.getSelection();
		if (!selection || collapsed && (selection === null || selection === void 0 ? void 0 : selection.isCollapsed)) return;
		collapsed = selection.isCollapsed || false;
		const ranges = [];
		const count = selection.rangeCount || 0;
		for (let i = 0; i < count; i++) {
			const { startContainer, startOffset, endContainer, endOffset } = selection.getRangeAt(i);
			if (isBlocked(startContainer, blockClass, blockSelector, true) || isBlocked(endContainer, blockClass, blockSelector, true)) continue;
			ranges.push({
				start: mirror.getId(startContainer),
				startOffset,
				end: mirror.getId(endContainer),
				endOffset
			});
		}
		selectionCb({ ranges });
	});
	updateSelection();
	return on("selectionchange", updateSelection);
}
function initCustomElementObserver({ doc, customElementCb }) {
	const win = doc.defaultView;
	if (!win || !win.customElements) return () => {};
	return patch(win.customElements, "define", function(original) {
		return function(name, constructor, options) {
			try {
				customElementCb({ define: { name } });
			} catch (e) {
				console.warn(`Custom element callback failed for ${name}`);
			}
			return original.apply(this, [
				name,
				constructor,
				options
			]);
		};
	});
}
function mergeHooks(o, hooks) {
	const { mutationCb, mousemoveCb, mouseInteractionCb, scrollCb, viewportResizeCb, inputCb, mediaInteractionCb, styleSheetRuleCb, styleDeclarationCb, canvasMutationCb, fontCb, selectionCb, customElementCb } = o;
	o.mutationCb = (...p) => {
		if (hooks.mutation) hooks.mutation(...p);
		mutationCb(...p);
	};
	o.mousemoveCb = (...p) => {
		if (hooks.mousemove) hooks.mousemove(...p);
		mousemoveCb(...p);
	};
	o.mouseInteractionCb = (...p) => {
		if (hooks.mouseInteraction) hooks.mouseInteraction(...p);
		mouseInteractionCb(...p);
	};
	o.scrollCb = (...p) => {
		if (hooks.scroll) hooks.scroll(...p);
		scrollCb(...p);
	};
	o.viewportResizeCb = (...p) => {
		if (hooks.viewportResize) hooks.viewportResize(...p);
		viewportResizeCb(...p);
	};
	o.inputCb = (...p) => {
		if (hooks.input) hooks.input(...p);
		inputCb(...p);
	};
	o.mediaInteractionCb = (...p) => {
		if (hooks.mediaInteaction) hooks.mediaInteaction(...p);
		mediaInteractionCb(...p);
	};
	o.styleSheetRuleCb = (...p) => {
		if (hooks.styleSheetRule) hooks.styleSheetRule(...p);
		styleSheetRuleCb(...p);
	};
	o.styleDeclarationCb = (...p) => {
		if (hooks.styleDeclaration) hooks.styleDeclaration(...p);
		styleDeclarationCb(...p);
	};
	o.canvasMutationCb = (...p) => {
		if (hooks.canvasMutation) hooks.canvasMutation(...p);
		canvasMutationCb(...p);
	};
	o.fontCb = (...p) => {
		if (hooks.font) hooks.font(...p);
		fontCb(...p);
	};
	o.selectionCb = (...p) => {
		if (hooks.selection) hooks.selection(...p);
		selectionCb(...p);
	};
	o.customElementCb = (...c) => {
		if (hooks.customElement) hooks.customElement(...c);
		customElementCb(...c);
	};
}
function initObservers(o, hooks = {}) {
	const currentWindow = o.doc.defaultView;
	if (!currentWindow) return () => {};
	mergeHooks(o, hooks);
	let mutationObserver;
	let mutationBuffer;
	const handlers = [];
	const cleanup = callbackWrapper(() => {
		try {
			if (mutationBuffer) try {
				mutationBuffer.destroy();
				mutationBuffer.reset();
			} finally {
				const index = mutationBuffers.indexOf(mutationBuffer);
				if (index !== -1) mutationBuffers.splice(index, 1);
			}
			o.shadowDomManager.resetForDoc(o.doc);
			mutationObserver === null || mutationObserver === void 0 || mutationObserver.disconnect();
		} finally {
			callAllSafely(handlers);
		}
	});
	try {
		if (o.recordDOM) {
			const result = initMutationObserver(o, o.doc);
			mutationObserver = result.observer;
			mutationBuffer = result.buffer;
		}
		handlers.push(initMoveObserver(o));
		handlers.push(initMouseInteractionObserver(o));
		handlers.push(initScrollObserver(o));
		handlers.push(initViewportResizeObserver(o, { win: currentWindow }));
		handlers.push(initInputObserver(o));
		handlers.push(initMediaInteractionObserver(o));
		if (o.recordDOM) {
			const styleSheetMutationQueue = createStyleSheetMutationQueue(currentWindow);
			handlers.push(styleSheetMutationQueue.reset);
			handlers.push(initStyleSheetObserver(o, {
				win: currentWindow,
				mutationQueue: styleSheetMutationQueue
			}));
			handlers.push(initAdoptedStyleSheetObserver(o, o.doc));
			handlers.push(initStyleDeclarationObserver(o, {
				win: currentWindow,
				mutationQueue: styleSheetMutationQueue
			}));
			if (o.collectFonts) handlers.push(initFontObserver(o));
		}
		handlers.push(initSelectionObserver(o));
		handlers.push(initCustomElementObserver(o));
		for (const plugin of o.plugins) handlers.push(plugin.observer(plugin.callback, currentWindow, plugin.options));
	} catch (error) {
		try {
			cleanup();
		} catch {}
		throw error;
	}
	return cleanup;
}
function hasNestedCSSRule(prop) {
	return typeof window[prop] !== "undefined";
}
function canMonkeyPatchNestedCSSRule(prop) {
	return Boolean(typeof window[prop] !== "undefined" && window[prop].prototype && "insertRule" in window[prop].prototype && "deleteRule" in window[prop].prototype);
}
//#endregion
//#region ../rrweb/src/record/cross-origin-iframe-mirror.ts
var CrossOriginIframeMirror = class {
	constructor(generateIdFn) {
		_defineProperty(this, "generateIdFn", void 0);
		_defineProperty(this, "iframeRemoteIdToLocalIdMap", /* @__PURE__ */ new WeakMap());
		_defineProperty(this, "iframeLocalIdToRemoteIdMap", /* @__PURE__ */ new WeakMap());
		this.generateIdFn = generateIdFn;
	}
	getId(iframe, remoteId, remoteToLocalMap, localToRemoteMap) {
		if (remoteId < 0) return remoteId;
		const remoteIdToLocalIdMap = remoteToLocalMap || this.getRemoteIdToLocalIdMap(iframe);
		const localIdToRemoteIdMap = localToRemoteMap || this.getLocalIdToRemoteIdMap(iframe);
		let localId = remoteIdToLocalIdMap.get(remoteId);
		if (localId === void 0) {
			localId = this.generateIdFn();
			remoteIdToLocalIdMap.set(remoteId, localId);
			localIdToRemoteIdMap.set(localId, remoteId);
		}
		return localId;
	}
	getIds(iframe, remoteIds) {
		const remoteIdToLocalIdMap = this.getRemoteIdToLocalIdMap(iframe);
		const localIdToRemoteIdMap = this.getLocalIdToRemoteIdMap(iframe);
		return remoteIds.map((remoteId) => this.getId(iframe, remoteId, remoteIdToLocalIdMap, localIdToRemoteIdMap));
	}
	getRemoteId(iframe, localId, map) {
		if (typeof localId !== "number") return localId;
		if (localId < 0) return localId;
		return (map || this.getLocalIdToRemoteIdMap(iframe)).get(localId) ?? -1;
	}
	getRemoteIds(iframe, localIds) {
		const localIdToRemoteIdMap = this.getLocalIdToRemoteIdMap(iframe);
		return localIds.map((localId) => this.getRemoteId(iframe, localId, localIdToRemoteIdMap));
	}
	reset(iframe) {
		if (!iframe) {
			this.iframeRemoteIdToLocalIdMap = /* @__PURE__ */ new WeakMap();
			this.iframeLocalIdToRemoteIdMap = /* @__PURE__ */ new WeakMap();
			return;
		}
		this.iframeRemoteIdToLocalIdMap.delete(iframe);
		this.iframeLocalIdToRemoteIdMap.delete(iframe);
	}
	getRemoteIdToLocalIdMap(iframe) {
		let remoteIdToLocalIdMap = this.iframeRemoteIdToLocalIdMap.get(iframe);
		if (!remoteIdToLocalIdMap) {
			remoteIdToLocalIdMap = /* @__PURE__ */ new Map();
			this.iframeRemoteIdToLocalIdMap.set(iframe, remoteIdToLocalIdMap);
		}
		return remoteIdToLocalIdMap;
	}
	getLocalIdToRemoteIdMap(iframe) {
		let localIdToRemoteIdMap = this.iframeLocalIdToRemoteIdMap.get(iframe);
		if (!localIdToRemoteIdMap) {
			localIdToRemoteIdMap = /* @__PURE__ */ new Map();
			this.iframeLocalIdToRemoteIdMap.set(iframe, localIdToRemoteIdMap);
		}
		return localIdToRemoteIdMap;
	}
};
//#endregion
//#region ../rrweb/src/record/iframe-manager.ts
var IframeManager = class {
	constructor(options) {
		_defineProperty(this, "iframes", /* @__PURE__ */ new WeakMap());
		_defineProperty(this, "crossOriginIframeMap", /* @__PURE__ */ new WeakMap());
		_defineProperty(this, "crossOriginIframeMirror", new CrossOriginIframeMirror(genId));
		_defineProperty(this, "crossOriginIframeStyleMirror", void 0);
		_defineProperty(this, "crossOriginIframeRootIdMap", /* @__PURE__ */ new WeakMap());
		_defineProperty(this, "mirror", void 0);
		_defineProperty(this, "mutationCb", void 0);
		_defineProperty(this, "wrappedEmit", void 0);
		_defineProperty(this, "loadListener", void 0);
		_defineProperty(this, "pageHideListener", void 0);
		_defineProperty(this, "stylesheetManager", void 0);
		_defineProperty(this, "recordCrossOriginIframes", void 0);
		_defineProperty(this, "messageHandler", void 0);
		_defineProperty(this, "nestedIframeListeners", /* @__PURE__ */ new Map());
		_defineProperty(this, "attachedWindows", /* @__PURE__ */ new WeakMap());
		_defineProperty(this, "attachedDocuments", /* @__PURE__ */ new WeakMap());
		_defineProperty(this, "attachedIframes", /* @__PURE__ */ new Map());
		_defineProperty(this, "loadListenerDisposers", /* @__PURE__ */ new WeakMap());
		_defineProperty(this, "iframeElementsById", /* @__PURE__ */ new Map());
		_defineProperty(this, "pageHideHandlers", /* @__PURE__ */ new WeakMap());
		this.mutationCb = options.mutationCb;
		this.wrappedEmit = options.wrappedEmit;
		this.stylesheetManager = options.stylesheetManager;
		this.recordCrossOriginIframes = options.recordCrossOriginIframes;
		this.crossOriginIframeStyleMirror = new CrossOriginIframeMirror(this.stylesheetManager.styleMirror.generateId.bind(this.stylesheetManager.styleMirror));
		this.mirror = options.mirror;
		this.messageHandler = this.handleMessage.bind(this);
		if (this.recordCrossOriginIframes) window.addEventListener("message", this.messageHandler);
	}
	addIframe(iframeEl) {
		this.iframes.set(iframeEl, true);
		if (iframeEl.contentWindow) this.crossOriginIframeMap.set(iframeEl.contentWindow, iframeEl);
	}
	registerLoadListenerDisposer(iframeEl, disposer) {
		let bucket = this.loadListenerDisposers.get(iframeEl);
		if (!bucket) {
			bucket = /* @__PURE__ */ new Set();
			this.loadListenerDisposers.set(iframeEl, bucket);
		}
		bucket.add(disposer);
		const id = this.mirror.getId(iframeEl);
		if (id !== -1) this.iframeElementsById.set(id, iframeEl);
	}
	getIframeElementById(iframeId) {
		var _this$attachedIframes;
		return ((_this$attachedIframes = this.attachedIframes.get(iframeId)) === null || _this$attachedIframes === void 0 ? void 0 : _this$attachedIframes.element) ?? this.iframeElementsById.get(iframeId) ?? null;
	}
	forgetIframeId(iframeId) {
		this.attachedIframes.delete(iframeId);
		this.iframeElementsById.delete(iframeId);
	}
	disposeLoadListeners(iframeEl) {
		const bucket = this.loadListenerDisposers.get(iframeEl);
		if (!bucket) return;
		bucket.forEach((d) => callSafely(d));
		this.loadListenerDisposers.delete(iframeEl);
	}
	removePageHideListener(iframeEl) {
		const bucket = this.pageHideHandlers.get(iframeEl);
		if (!bucket) return;
		bucket.forEach(({ win, handler }) => {
			removeEventListenerSafely(win, "pagehide", handler);
		});
		this.pageHideHandlers.delete(iframeEl);
	}
	addLoadListener(cb) {
		this.loadListener = cb;
	}
	addPageHideListener(cb) {
		this.pageHideListener = cb;
	}
	removeLoadListener() {
		this.loadListener = void 0;
	}
	trackIframeContent(iframeEl, content) {
		const iframeId = this.mirror.getId(iframeEl);
		this.attachedIframes.set(iframeId, {
			element: iframeEl,
			content
		});
		return iframeId;
	}
	attachIframe(iframeEl, childSn) {
		var _this$loadListener;
		const iframeId = this.trackIframeContent(iframeEl, childSn);
		if (iframeEl.contentDocument) {
			let docs = this.attachedDocuments.get(iframeEl);
			if (!docs) {
				docs = /* @__PURE__ */ new Set();
				this.attachedDocuments.set(iframeEl, docs);
			}
			docs.add(iframeEl.contentDocument);
		}
		this.mutationCb({
			adds: [{
				parentId: iframeId,
				nextId: null,
				node: childSn
			}],
			removes: [],
			texts: [],
			attributes: [],
			isAttachIframe: true
		});
		const win = iframeEl.contentWindow;
		if (this.recordCrossOriginIframes && win && !this.nestedIframeListeners.has(win)) {
			const nestedHandler = this.handleMessage.bind(this);
			callSafely(() => {
				win.addEventListener("message", nestedHandler);
				this.nestedIframeListeners.set(win, nestedHandler);
				let wins = this.attachedWindows.get(iframeEl);
				if (!wins) {
					wins = /* @__PURE__ */ new Set();
					this.attachedWindows.set(iframeEl, wins);
				}
				wins.add(win);
			});
		}
		callSafely(() => {
			const pageHideWindow = iframeEl.contentWindow;
			if (!pageHideWindow) return;
			let bucket = this.pageHideHandlers.get(iframeEl);
			if (bucket) {
				for (const entry of bucket) if (entry.win === pageHideWindow) return;
			}
			const handler = () => {
				var _this$pageHideListene;
				(_this$pageHideListene = this.pageHideListener) === null || _this$pageHideListene === void 0 || _this$pageHideListene.call(this, iframeEl);
				if (iframeEl.contentDocument) this.mirror.removeNodeFromMap(iframeEl.contentDocument);
			};
			pageHideWindow.addEventListener("pagehide", handler);
			if (!bucket) {
				bucket = /* @__PURE__ */ new Set();
				this.pageHideHandlers.set(iframeEl, bucket);
			}
			bucket.add({
				win: pageHideWindow,
				handler
			});
		});
		(_this$loadListener = this.loadListener) === null || _this$loadListener === void 0 || _this$loadListener.call(this, iframeEl);
		if (iframeEl.contentDocument && iframeEl.contentDocument.adoptedStyleSheets && iframeEl.contentDocument.adoptedStyleSheets.length > 0) this.stylesheetManager.adoptStyleSheets(iframeEl.contentDocument.adoptedStyleSheets, this.mirror.getId(iframeEl.contentDocument));
	}
	handleMessage(message) {
		const crossOriginMessageEvent = message;
		if (crossOriginMessageEvent.data.type !== "rrweb" || crossOriginMessageEvent.origin !== crossOriginMessageEvent.data.origin) return;
		if (!message.source) return;
		const iframeEl = this.crossOriginIframeMap.get(message.source);
		if (!iframeEl) return;
		const transformedEvent = this.transformCrossOriginEvent(iframeEl, crossOriginMessageEvent.data.event);
		if (transformedEvent) this.wrappedEmit(transformedEvent, crossOriginMessageEvent.data.isCheckout);
	}
	transformCrossOriginEvent(iframeEl, e) {
		switch (e.type) {
			case EventType.FullSnapshot: {
				this.crossOriginIframeMirror.reset(iframeEl);
				this.crossOriginIframeStyleMirror.reset(iframeEl);
				/**
				* Replaces the original id of the iframe with a new set of unique ids
				*/
				this.replaceIdOnNode(e.data.node, iframeEl);
				const rootId = e.data.node.id;
				this.crossOriginIframeRootIdMap.set(iframeEl, rootId);
				this.patchRootIdOnNode(e.data.node, rootId);
				this.trackIframeContent(iframeEl, e.data.node);
				return {
					timestamp: e.timestamp,
					type: EventType.IncrementalSnapshot,
					data: {
						source: IncrementalSource.Mutation,
						adds: [{
							parentId: this.mirror.getId(iframeEl),
							nextId: null,
							node: e.data.node
						}],
						removes: [],
						texts: [],
						attributes: [],
						isAttachIframe: true
					}
				};
			}
			case EventType.Meta:
			case EventType.Load:
			case EventType.DomContentLoaded: return false;
			case EventType.Plugin: return e;
			case EventType.Custom:
				this.replaceIds(e.data.payload, iframeEl, [
					"id",
					"parentId",
					"previousId",
					"nextId"
				]);
				return e;
			case EventType.IncrementalSnapshot: switch (e.data.source) {
				case IncrementalSource.Mutation:
					e.data.adds.forEach((n) => {
						this.replaceIds(n, iframeEl, [
							"parentId",
							"nextId",
							"previousId"
						]);
						this.replaceIdOnNode(n.node, iframeEl);
						const rootId = this.crossOriginIframeRootIdMap.get(iframeEl);
						rootId && this.patchRootIdOnNode(n.node, rootId);
					});
					e.data.removes.forEach((n) => {
						this.replaceIds(n, iframeEl, ["parentId", "id"]);
					});
					e.data.attributes.forEach((n) => {
						this.replaceIds(n, iframeEl, ["id"]);
					});
					e.data.texts.forEach((n) => {
						this.replaceIds(n, iframeEl, ["id"]);
					});
					return e;
				case IncrementalSource.Drag:
				case IncrementalSource.TouchMove:
				case IncrementalSource.MouseMove:
					e.data.positions.forEach((p) => {
						this.replaceIds(p, iframeEl, ["id"]);
					});
					return e;
				case IncrementalSource.ViewportResize: return false;
				case IncrementalSource.MediaInteraction:
				case IncrementalSource.MouseInteraction:
				case IncrementalSource.Scroll:
				case IncrementalSource.CanvasMutation:
				case IncrementalSource.Input:
					this.replaceIds(e.data, iframeEl, ["id"]);
					return e;
				case IncrementalSource.StyleSheetRule:
				case IncrementalSource.StyleDeclaration:
					this.replaceIds(e.data, iframeEl, ["id"]);
					this.replaceStyleIds(e.data, iframeEl, ["styleId"]);
					return e;
				case IncrementalSource.Font: return e;
				case IncrementalSource.Selection:
					e.data.ranges.forEach((range) => {
						this.replaceIds(range, iframeEl, ["start", "end"]);
					});
					return e;
				case IncrementalSource.AdoptedStyleSheet:
					var _e$data$styles;
					this.replaceIds(e.data, iframeEl, ["id"]);
					this.replaceStyleIds(e.data, iframeEl, ["styleIds"]);
					(_e$data$styles = e.data.styles) === null || _e$data$styles === void 0 || _e$data$styles.forEach((style) => {
						this.replaceStyleIds(style, iframeEl, ["styleId"]);
					});
					return e;
			}
		}
		return false;
	}
	replace(iframeMirror, obj, iframeEl, keys) {
		for (const key of keys) {
			if (!Array.isArray(obj[key]) && typeof obj[key] !== "number") continue;
			if (Array.isArray(obj[key])) obj[key] = iframeMirror.getIds(iframeEl, obj[key]);
			else obj[key] = iframeMirror.getId(iframeEl, obj[key]);
		}
		return obj;
	}
	replaceIds(obj, iframeEl, keys) {
		return this.replace(this.crossOriginIframeMirror, obj, iframeEl, keys);
	}
	replaceStyleIds(obj, iframeEl, keys) {
		return this.replace(this.crossOriginIframeStyleMirror, obj, iframeEl, keys);
	}
	replaceIdOnNode(node, iframeEl) {
		this.replaceIds(node, iframeEl, ["id", "rootId"]);
		if ("childNodes" in node) node.childNodes.forEach((child) => {
			this.replaceIdOnNode(child, iframeEl);
		});
	}
	patchRootIdOnNode(node, rootId) {
		if (node.type !== NodeType.Document && !node.rootId) node.rootId = rootId;
		if ("childNodes" in node) node.childNodes.forEach((child) => {
			this.patchRootIdOnNode(child, rootId);
		});
	}
	removeIframeById(iframeId) {
		const entry = this.attachedIframes.get(iframeId);
		const iframe = (entry === null || entry === void 0 ? void 0 : entry.element) || this.iframeElementsById.get(iframeId) || this.mirror.getNode(iframeId);
		this.iframeElementsById.delete(iframeId);
		if (iframe) {
			const win = iframe.contentWindow;
			const capturedWins = this.attachedWindows.get(iframe);
			if (capturedWins) {
				capturedWins.forEach((capturedWin) => {
					const handler = this.nestedIframeListeners.get(capturedWin);
					if (handler) {
						removeEventListenerSafely(capturedWin, "message", handler);
						this.nestedIframeListeners.delete(capturedWin);
					}
					this.crossOriginIframeMap.delete(capturedWin);
				});
				this.attachedWindows.delete(iframe);
			}
			if (win && this.nestedIframeListeners.has(win)) {
				removeEventListenerSafely(win, "message", this.nestedIframeListeners.get(win));
				this.nestedIframeListeners.delete(win);
			}
			if (win) this.crossOriginIframeMap.delete(win);
			this.iframes.delete(iframe);
			this.disposeLoadListeners(iframe);
			this.removePageHideListener(iframe);
			const capturedDocs = this.attachedDocuments.get(iframe);
			if (capturedDocs) {
				capturedDocs.forEach((doc) => {
					callSafely(() => this.mirror.removeNodeFromMap(doc));
				});
				callSafely(() => findAndRemoveIframeBuffer(iframe, capturedDocs));
				this.attachedDocuments.delete(iframe);
			}
		}
		if (entry) this.attachedIframes.delete(iframeId);
	}
	cleanupDetachedIframes() {
		if (this.attachedIframes.size === 0) return;
		const orphaned = [];
		this.attachedIframes.forEach((_entry, iframeId) => {
			if (!this.mirror.has(iframeId)) orphaned.push(iframeId);
		});
		orphaned.forEach((iframeId) => this.removeIframeById(iframeId));
	}
	reattachIframes() {
		this.attachedIframes.forEach(({ content }, iframeId) => {
			if (!this.mirror.has(iframeId)) {
				this.attachedIframes.delete(iframeId);
				return;
			}
			this.mutationCb({
				adds: [{
					parentId: iframeId,
					nextId: null,
					node: content
				}],
				removes: [],
				texts: [],
				attributes: [],
				isAttachIframe: true
			});
		});
	}
	destroy() {
		if (this.recordCrossOriginIframes) removeEventListenerSafely(window, "message", this.messageHandler);
		this.nestedIframeListeners.forEach((handler, contentWindow) => {
			removeEventListenerSafely(contentWindow, "message", handler);
		});
		this.nestedIframeListeners.clear();
		const tracked = /* @__PURE__ */ new Set();
		this.iframeElementsById.forEach((el) => tracked.add(el));
		this.attachedIframes.forEach(({ element }) => tracked.add(element));
		tracked.forEach((iframe) => {
			this.disposeLoadListeners(iframe);
			this.removePageHideListener(iframe);
		});
		this.crossOriginIframeMirror.reset();
		this.crossOriginIframeStyleMirror.reset();
		this.attachedIframes.clear();
		this.crossOriginIframeMap = /* @__PURE__ */ new WeakMap();
		this.iframes = /* @__PURE__ */ new WeakMap();
		this.crossOriginIframeRootIdMap = /* @__PURE__ */ new WeakMap();
		this.loadListenerDisposers = /* @__PURE__ */ new WeakMap();
		this.pageHideHandlers = /* @__PURE__ */ new WeakMap();
		this.attachedDocuments = /* @__PURE__ */ new WeakMap();
		this.attachedWindows = /* @__PURE__ */ new WeakMap();
		this.iframeElementsById = /* @__PURE__ */ new Map();
	}
};
//#endregion
//#region ../rrweb/src/record/shadow-dom-manager.ts
var ShadowDomManager = class {
	constructor(options) {
		_defineProperty(this, "shadowDoms", /* @__PURE__ */ new WeakSet());
		_defineProperty(this, "mutationCb", void 0);
		_defineProperty(this, "scrollCb", void 0);
		_defineProperty(this, "bypassOptions", void 0);
		_defineProperty(this, "mirror", void 0);
		_defineProperty(this, "restoreHandlers", []);
		this.mutationCb = options.mutationCb;
		this.scrollCb = options.scrollCb;
		this.bypassOptions = options.bypassOptions;
		this.mirror = options.mirror;
		this.init();
	}
	init() {
		this.reset();
		this.patchAttachShadow(Element, document);
	}
	addShadowRoot(shadowRoot, doc) {
		var _dom$host;
		if (!isNativeShadowDom(shadowRoot)) return;
		if (this.shadowDoms.has(shadowRoot)) return;
		this.shadowDoms.add(shadowRoot);
		const ownerDoc = ((_dom$host = src_default.host(shadowRoot)) === null || _dom$host === void 0 ? void 0 : _dom$host.ownerDocument) ?? doc;
		const { observer, buffer } = initMutationObserver({
			...this.bypassOptions,
			doc: ownerDoc,
			mutationCb: this.mutationCb,
			mirror: this.mirror,
			shadowDomManager: this
		}, shadowRoot);
		this.restoreHandlers.push({
			doc: ownerDoc,
			handler: () => {
				observer.disconnect();
				buffer.destroy();
				buffer.releaseCanvasManager();
				const index = mutationBuffers.indexOf(buffer);
				if (index !== -1) mutationBuffers.splice(index, 1);
			}
		});
		this.restoreHandlers.push({
			doc: ownerDoc,
			handler: initScrollObserver({
				...this.bypassOptions,
				scrollCb: this.scrollCb,
				doc: shadowRoot,
				mirror: this.mirror
			})
		});
		setTimeout(() => {
			if (shadowRoot.adoptedStyleSheets && shadowRoot.adoptedStyleSheets.length > 0) this.bypassOptions.stylesheetManager.adoptStyleSheets(shadowRoot.adoptedStyleSheets, this.mirror.getId(src_default.host(shadowRoot)));
			this.restoreHandlers.push({
				doc: ownerDoc,
				handler: initAdoptedStyleSheetObserver({
					mirror: this.mirror,
					stylesheetManager: this.bypassOptions.stylesheetManager
				}, shadowRoot)
			});
		}, 0);
	}
	/**
	* Monkey patch 'attachShadow' of an IFrameElement to observe newly added shadow doms.
	*/
	observeAttachShadow(iframeElement) {
		if (!iframeElement.contentWindow || !iframeElement.contentDocument) return;
		this.patchAttachShadow(iframeElement.contentWindow.Element, iframeElement.contentDocument);
	}
	/**
	* Patch 'attachShadow' to observe newly added shadow doms.
	*/
	patchAttachShadow(element, doc) {
		const manager = this;
		this.restoreHandlers.push({
			doc,
			handler: patch(element.prototype, "attachShadow", function(original) {
				return function(option) {
					const sRoot = original.call(this, option);
					const shadowRootEl = src_default.shadowRoot(this);
					if (shadowRootEl && inDom(this)) manager.addShadowRoot(shadowRootEl, doc);
					return sRoot;
				};
			})
		});
	}
	reset() {
		this.restoreHandlers.forEach(({ handler }) => {
			try {
				handler();
			} catch (e) {}
		});
		this.restoreHandlers = [];
		this.shadowDoms = /* @__PURE__ */ new WeakSet();
	}
	resetForDoc(doc) {
		const remaining = [];
		for (const entry of this.restoreHandlers) if (entry.doc === doc) try {
			entry.handler();
		} catch (e) {}
		else remaining.push(entry);
		this.restoreHandlers = remaining;
	}
};
//#endregion
//#region ../rrweb/src/record/observers/canvas/canvas-mask.ts
var SKIP_FRAME = "skip-frame";
function computeFrameMaskRegions(masking, canvas, captureWidth, captureHeight, displayWidth, displayHeight) {
	if (!masking || typeof masking.regionsFn !== "function") return;
	let regions;
	try {
		regions = masking.regionsFn(canvas);
	} catch {
		return SKIP_FRAME;
	}
	if (regions === void 0) return;
	if (!Array.isArray(regions) || !regions.every(isValidRegion)) return SKIP_FRAME;
	const sx = captureWidth / displayWidth;
	const sy = captureHeight / displayHeight;
	return regions.filter((r) => r.width > 0 && r.height > 0).map((r) => {
		const left = Math.floor(r.x * sx);
		const top = Math.floor(r.y * sy);
		return {
			x: left,
			y: top,
			width: Math.ceil((r.x + r.width) * sx) - left,
			height: Math.ceil((r.y + r.height) * sy) - top
		};
	});
}
function isValidRegion(r) {
	if (typeof r !== "object" || r === null) return false;
	const { x, y, width, height } = r;
	return Number.isFinite(x) && Number.isFinite(y) && Number.isFinite(width) && Number.isFinite(height) && width >= 0 && height >= 0;
}
//#endregion
//#region ../../../../../../setup-pnpm/node_modules/.bin/store/v11/links/@/base64-arraybuffer/1.0.2/f63fa6b5c318cf1c9f6bdd1d4292ad2f15f76f2ec78475025a2d44070e896fe9/node_modules/base64-arraybuffer/dist/base64-arraybuffer.es5.js
var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var lookup = typeof Uint8Array === "undefined" ? [] : /* @__PURE__ */ new Uint8Array(256);
for (var i = 0; i < chars.length; i++) lookup[chars.charCodeAt(i)] = i;
var encode = function(arraybuffer) {
	var bytes = new Uint8Array(arraybuffer), i, len = bytes.length, base64 = "";
	for (i = 0; i < len; i += 3) {
		base64 += chars[bytes[i] >> 2];
		base64 += chars[(bytes[i] & 3) << 4 | bytes[i + 1] >> 4];
		base64 += chars[(bytes[i + 1] & 15) << 2 | bytes[i + 2] >> 6];
		base64 += chars[bytes[i + 2] & 63];
	}
	if (len % 3 === 2) base64 = base64.substring(0, base64.length - 1) + "=";
	else if (len % 3 === 1) base64 = base64.substring(0, base64.length - 2) + "==";
	return base64;
};
//#endregion
//#region ../rrweb/src/record/observers/canvas/serialize-args.ts
var canvasVarMap = /* @__PURE__ */ new Map();
function variableListFor(ctx, ctor) {
	let contextMap = canvasVarMap.get(ctx);
	if (!contextMap) {
		contextMap = /* @__PURE__ */ new Map();
		canvasVarMap.set(ctx, contextMap);
	}
	if (!contextMap.has(ctor)) contextMap.set(ctor, []);
	return contextMap.get(ctor);
}
var saveWebGLVar = (value, win, ctx) => {
	if (!value || !(isInstanceOfWebGLObject(value, win) || typeof value === "object")) return;
	const name = value.constructor.name;
	const list = variableListFor(ctx, name);
	let index = list.indexOf(value);
	if (index === -1) {
		index = list.length;
		list.push(value);
	}
	return index;
};
function serializeArg(value, win, ctx, dataURLOptions) {
	if (value instanceof Array) return value.map((arg) => serializeArg(arg, win, ctx, dataURLOptions));
	else if (value === null) return value;
	else if (value instanceof Float32Array || value instanceof Float64Array || value instanceof Int32Array || value instanceof Uint32Array || value instanceof Uint8Array || value instanceof Uint16Array || value instanceof Int16Array || value instanceof Int8Array || value instanceof Uint8ClampedArray) return {
		rr_type: value.constructor.name,
		args: [Object.values(value)]
	};
	else if (value instanceof ArrayBuffer) return {
		rr_type: value.constructor.name,
		base64: encode(value)
	};
	else if (value instanceof DataView) return {
		rr_type: value.constructor.name,
		args: [
			serializeArg(value.buffer, win, ctx, dataURLOptions),
			value.byteOffset,
			value.byteLength
		]
	};
	else if (value instanceof HTMLImageElement) {
		const name = value.constructor.name;
		const { src } = value;
		return {
			rr_type: name,
			src
		};
	} else if (value instanceof HTMLCanvasElement) return {
		rr_type: "HTMLImageElement",
		src: value.toDataURL(dataURLOptions.type, dataURLOptions.quality)
	};
	else if (value instanceof ImageData) return {
		rr_type: value.constructor.name,
		args: [
			serializeArg(value.data, win, ctx, dataURLOptions),
			value.width,
			value.height
		]
	};
	else if (isInstanceOfWebGLObject(value, win) || typeof value === "object") return {
		rr_type: value.constructor.name,
		index: saveWebGLVar(value, win, ctx)
	};
	return value;
}
var serializeArgs = (args, win, ctx, dataURLOptions) => {
	return args.map((arg) => serializeArg(arg, win, ctx, dataURLOptions));
};
var isInstanceOfWebGLObject = (value, win) => {
	const supportedWebGLConstructorNames = [
		"WebGLActiveInfo",
		"WebGLBuffer",
		"WebGLFramebuffer",
		"WebGLProgram",
		"WebGLRenderbuffer",
		"WebGLShader",
		"WebGLShaderPrecisionFormat",
		"WebGLTexture",
		"WebGLUniformLocation",
		"WebGLVertexArrayObject",
		"WebGLVertexArrayObjectOES"
	].filter((name) => typeof win[name] === "function");
	return Boolean(supportedWebGLConstructorNames.find((name) => value instanceof win[name]));
};
//#endregion
//#region ../rrweb/src/record/observers/canvas/2d.ts
function initCanvas2DMutationObserver(cb, win, blockClass, blockSelector, dataURLOptions) {
	const handlers = [];
	const props2D = Object.getOwnPropertyNames(win.CanvasRenderingContext2D.prototype);
	for (const prop of props2D) try {
		if (typeof win.CanvasRenderingContext2D.prototype[prop] !== "function") continue;
		const restoreHandler = patch(win.CanvasRenderingContext2D.prototype, prop, function(original) {
			return function(...args) {
				if (!isBlocked(this.canvas, blockClass, blockSelector, true)) setTimeout(() => {
					const recordArgs = serializeArgs(args, win, this, dataURLOptions);
					cb(this.canvas, {
						type: CanvasContext["2D"],
						property: prop,
						args: recordArgs
					});
				}, 0);
				return original.apply(this, args);
			};
		});
		handlers.push(restoreHandler);
	} catch {
		const hookHandler = hookSetter(win.CanvasRenderingContext2D.prototype, prop, { set(v) {
			if (!isBlocked(this.canvas, blockClass, blockSelector, true)) cb(this.canvas, {
				type: CanvasContext["2D"],
				property: prop,
				args: [v],
				setter: true
			});
		} });
		handlers.push(hookHandler);
	}
	return () => {
		handlers.forEach((h) => h());
	};
}
//#endregion
//#region ../rrweb/src/record/observers/canvas/canvas.ts
var WEBGL_CONTEXT_NAMES = ["webgl", "webgl2"];
function getNormalizedContextName(contextType) {
	return contextType === "experimental-webgl" ? "webgl" : contextType;
}
function getRequiredWebGPUTextureUsage(win) {
	const textureUsage = win.GPUTextureUsage;
	if (!textureUsage) return null;
	return textureUsage.COPY_SRC | textureUsage.RENDER_ATTACHMENT;
}
function getCanvasFromWebGPUContext(context) {
	const { canvas } = context;
	if (!canvas || typeof canvas !== "object") return null;
	return canvas;
}
function isCanvasNode(canvas) {
	return "nodeType" in canvas;
}
function initCanvasWebGPUContextObserver(win, blockClass, blockSelector) {
	const GPUCanvasContext = win.GPUCanvasContext;
	if (!(GPUCanvasContext === null || GPUCanvasContext === void 0 ? void 0 : GPUCanvasContext.prototype) || typeof GPUCanvasContext.prototype.configure !== "function") return;
	return patch(GPUCanvasContext.prototype, "configure", function(original) {
		return function(configuration) {
			const canvas = getCanvasFromWebGPUContext(this);
			if (!canvas || isCanvasNode(canvas) && isBlocked(canvas, blockClass, blockSelector, true)) return original.call(this, configuration);
			if (isCanvasNode(canvas) && !("__context" in canvas)) canvas.__context = "webgpu";
			const requiredUsage = getRequiredWebGPUTextureUsage(win);
			if (requiredUsage === null || !configuration) return original.call(this, configuration);
			return original.call(this, {
				...configuration,
				usage: typeof configuration.usage === "number" ? configuration.usage | requiredUsage : requiredUsage
			});
		};
	});
}
function initCanvasContextObserver(win, blockClass, blockSelector, setPreserveDrawingBufferToTrue) {
	const handlers = [];
	try {
		if (setPreserveDrawingBufferToTrue) {
			const restoreWebGPUConfigureHandler = initCanvasWebGPUContextObserver(win, blockClass, blockSelector);
			if (restoreWebGPUConfigureHandler) handlers.push(restoreWebGPUConfigureHandler);
		}
		const restoreHandler = patch(win.HTMLCanvasElement.prototype, "getContext", function(original) {
			return function(contextType, ...args) {
				const ctxName = getNormalizedContextName(contextType);
				if (!isBlocked(this, blockClass, blockSelector, true)) {
					if (!("__context" in this)) this.__context = ctxName;
					if (setPreserveDrawingBufferToTrue && WEBGL_CONTEXT_NAMES.includes(ctxName)) {
						if (args[0] && typeof args[0] === "object") {
							const contextAttributes = args[0];
							if (!contextAttributes.preserveDrawingBuffer) contextAttributes.preserveDrawingBuffer = true;
						} else args.splice(0, 1, { preserveDrawingBuffer: true });
					}
				}
				return original.apply(this, [contextType, ...args]);
			};
		});
		handlers.push(restoreHandler);
	} catch {
		console.error("failed to patch HTMLCanvasElement.prototype.getContext");
	}
	return () => {
		handlers.forEach((h) => h());
	};
}
//#endregion
//#region ../rrweb/src/record/observers/canvas/webgl.ts
function patchGLPrototype(prototype, type, cb, blockClass, blockSelector, win, dataURLOptions) {
	const handlers = [];
	const props = Object.getOwnPropertyNames(prototype);
	for (const prop of props) {
		if ([
			"isContextLost",
			"canvas",
			"drawingBufferWidth",
			"drawingBufferHeight"
		].includes(prop)) continue;
		try {
			if (typeof prototype[prop] !== "function") continue;
			const restoreHandler = patch(prototype, prop, function(original) {
				return function(...args) {
					const result = original.apply(this, args);
					saveWebGLVar(result, win, this);
					if (!!this.canvas && "tagName" in this.canvas && !isBlocked(this.canvas, blockClass, blockSelector, true)) {
						const recordArgs = serializeArgs(args, win, this, dataURLOptions);
						const mutation = {
							type,
							property: prop,
							args: recordArgs
						};
						cb(this.canvas, mutation);
					}
					return result;
				};
			});
			handlers.push(restoreHandler);
		} catch {
			const hookHandler = hookSetter(prototype, prop, { set(v) {
				if (!!this.canvas && "tagName" in this.canvas && !isBlocked(this.canvas, blockClass, blockSelector, true)) cb(this.canvas, {
					type,
					property: prop,
					args: [v],
					setter: true
				});
			} });
			handlers.push(hookHandler);
		}
	}
	return handlers;
}
function initCanvasWebGLMutationObserver(cb, win, blockClass, blockSelector, dataURLOptions) {
	const handlers = [];
	if (typeof win.WebGLRenderingContext !== "undefined") handlers.push(...patchGLPrototype(win.WebGLRenderingContext.prototype, CanvasContext.WebGL, cb, blockClass, blockSelector, win, dataURLOptions));
	if (typeof win.WebGL2RenderingContext !== "undefined") handlers.push(...patchGLPrototype(win.WebGL2RenderingContext.prototype, CanvasContext.WebGL2, cb, blockClass, blockSelector, win, dataURLOptions));
	return () => {
		handlers.forEach((h) => h());
	};
}
//#endregion
//#region ../rrweb/src/record/workers/image-bitmap-data-url-worker.ts?worker&inline
var jsContent = "(function() {\n	//#region ../../../../../../setup-pnpm/node_modules/.bin/store/v11/links/@/base64-arraybuffer/1.0.2/f63fa6b5c318cf1c9f6bdd1d4292ad2f15f76f2ec78475025a2d44070e896fe9/node_modules/base64-arraybuffer/dist/base64-arraybuffer.es5.js\n	var chars = \"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/\";\n	var lookup = typeof Uint8Array === \"undefined\" ? [] : /* @__PURE__ */ new Uint8Array(256);\n	for (var i = 0; i < chars.length; i++) lookup[chars.charCodeAt(i)] = i;\n	var encode = function(arraybuffer) {\n		var bytes = new Uint8Array(arraybuffer), i, len = bytes.length, base64 = \"\";\n		for (i = 0; i < len; i += 3) {\n			base64 += chars[bytes[i] >> 2];\n			base64 += chars[(bytes[i] & 3) << 4 | bytes[i + 1] >> 4];\n			base64 += chars[(bytes[i + 1] & 15) << 2 | bytes[i + 2] >> 6];\n			base64 += chars[bytes[i + 2] & 63];\n		}\n		if (len % 3 === 2) base64 = base64.substring(0, base64.length - 1) + \"=\";\n		else if (len % 3 === 1) base64 = base64.substring(0, base64.length - 2) + \"==\";\n		return base64;\n	};\n	//#endregion\n	//#region ../rrweb/src/record/workers/image-bitmap-data-url-worker.ts\n	const lastFingerprintMap = /* @__PURE__ */ new Map();\n	const transparentFingerprintMap = /* @__PURE__ */ new Map();\n	const lastSentAtMap = /* @__PURE__ */ new Map();\n	const PROVIDER_KEYFRAME_INTERVAL_MS = 3e4;\n	function hashPixels(data) {\n		const view = new Uint32Array(data.buffer, data.byteOffset, data.byteLength >>> 2);\n		let primaryHash = 2166136261;\n		let secondaryHash = 2654435769;\n		for (let i = 0; i < view.length; i++) {\n			primaryHash ^= view[i];\n			primaryHash = Math.imul(primaryHash, 16777619);\n			secondaryHash ^= view[i];\n			secondaryHash = Math.imul(secondaryHash, 2246822507);\n		}\n		return `${(primaryHash >>> 0).toString(16)}:${(secondaryHash >>> 0).toString(16)}`;\n	}\n	function frameFingerprint(width, height, data) {\n		return `${width}x${height}:${hashPixels(data)}`;\n	}\n	function transparentFingerprint(width, height) {\n		const pixelCount = width * height;\n		let hash = transparentFingerprintMap.get(pixelCount);\n		if (hash === void 0) {\n			hash = hashPixels(new Uint8ClampedArray(pixelCount * 4));\n			transparentFingerprintMap.set(pixelCount, hash);\n		}\n		return `${width}x${height}:${hash}`;\n	}\n	const worker = self;\n	let reusableCanvas = null;\n	let reusableCtx = null;\n	worker.onmessage = async function(e) {\n		if (\"resetFrameDedup\" in e.data) {\n			lastFingerprintMap.clear();\n			return;\n		}\n		if (\"OffscreenCanvas\" in globalThis) {\n			const { id, bitmap, width, height, displayWidth, displayHeight, dataURLOptions, maskRegions } = e.data;\n			try {\n				if (!reusableCanvas || reusableCanvas.width !== width || reusableCanvas.height !== height) {\n					reusableCanvas = new OffscreenCanvas(width, height);\n					reusableCtx = reusableCanvas.getContext(\"2d\", { willReadFrequently: true });\n				}\n				const ctx = reusableCtx;\n				ctx.clearRect(0, 0, width, height);\n				ctx.drawImage(bitmap, 0, 0);\n				bitmap.close();\n				if (maskRegions) {\n					ctx.fillStyle = \"black\";\n					for (const region of maskRegions) ctx.fillRect(region.x, region.y, region.width, region.height);\n				}\n				const fingerprint = frameFingerprint(width, height, ctx.getImageData(0, 0, width, height).data);\n				if (fingerprint === (lastFingerprintMap.get(id) ?? transparentFingerprint(width, height))) {\n					const lastSentAt = lastSentAtMap.get(id);\n					if (!(maskRegions !== void 0 && lastSentAt !== void 0 && Date.now() - lastSentAt >= PROVIDER_KEYFRAME_INTERVAL_MS)) return worker.postMessage({ id });\n				}\n				const blob = await reusableCanvas.convertToBlob(dataURLOptions);\n				const arrayBuffer = await blob.arrayBuffer();\n				worker.postMessage({\n					id,\n					type: blob.type,\n					base64: encode(arrayBuffer),\n					displayWidth,\n					displayHeight\n				});\n				lastFingerprintMap.set(id, fingerprint);\n				lastSentAtMap.set(id, Date.now());\n			} catch {\n				worker.postMessage({ id });\n			}\n		} else {\n			e.data.bitmap.close();\n			return worker.postMessage({ id: e.data.id });\n		}\n	};\n	//#endregion\n})();\n";
var blob = typeof self !== "undefined" && self.Blob && new Blob(["(self.URL || self.webkitURL).revokeObjectURL(self.location.href);", jsContent], { type: "text/javascript;charset=utf-8" });
function WorkerWrapper(options) {
	let objURL;
	try {
		objURL = blob && (self.URL || self.webkitURL).createObjectURL(blob);
		if (!objURL) throw "";
		const worker = new Worker(objURL, { name: options === null || options === void 0 ? void 0 : options.name });
		worker.addEventListener("error", () => {
			(self.URL || self.webkitURL).revokeObjectURL(objURL);
		});
		return worker;
	} catch (e) {
		return new Worker("data:text/javascript;charset=utf-8," + encodeURIComponent(jsContent), { name: options === null || options === void 0 ? void 0 : options.name });
	}
}
//#endregion
//#region ../rrweb/src/record/observers/canvas/canvas-manager.ts
var MIN_CANVAS_RESOLUTION_SCALE = .1;
var CanvasManager = class {
	onFullSnapshot() {
		var _this$resetFrameDedup;
		(_this$resetFrameDedup = this.resetFrameDedup) === null || _this$resetFrameDedup === void 0 || _this$resetFrameDedup.call(this);
	}
	acquire() {
		this.refCount += 1;
	}
	reset() {
		if (this.refCount > 0) this.refCount -= 1;
		if (this.refCount > 0) return;
		this.teardown();
	}
	teardown() {
		if (this.torndown) return;
		this.torndown = true;
		this.pendingCanvasMutations.clear();
		this.resetObservers && this.resetObservers();
		if (this.rafIdTimestamp !== null) {
			cancelAnimationFrame(this.rafIdTimestamp);
			this.rafIdTimestamp = null;
		}
		if (this.rafIdFlush !== null) {
			cancelAnimationFrame(this.rafIdFlush);
			this.rafIdFlush = null;
		}
	}
	freeze() {
		this.frozen = true;
	}
	unfreeze() {
		this.frozen = false;
	}
	lock() {
		this.locked = true;
	}
	unlock() {
		this.locked = false;
	}
	constructor(options) {
		_defineProperty(this, "pendingCanvasMutations", /* @__PURE__ */ new Map());
		_defineProperty(this, "rafStamps", {
			latestId: 0,
			invokeId: null
		});
		_defineProperty(this, "mirror", void 0);
		_defineProperty(this, "mutationCb", void 0);
		_defineProperty(this, "resetObservers", void 0);
		_defineProperty(this, "frozen", false);
		_defineProperty(this, "locked", false);
		_defineProperty(this, "rafIdTimestamp", null);
		_defineProperty(this, "rafIdFlush", null);
		_defineProperty(this, "refCount", 0);
		_defineProperty(this, "torndown", false);
		_defineProperty(this, "resetFrameDedup", null);
		_defineProperty(this, "processMutation", (target, mutation) => {
			if (this.rafStamps.invokeId && this.rafStamps.latestId !== this.rafStamps.invokeId || !this.rafStamps.invokeId) this.rafStamps.invokeId = this.rafStamps.latestId;
			if (!this.pendingCanvasMutations.has(target)) this.pendingCanvasMutations.set(target, []);
			this.pendingCanvasMutations.get(target).push(mutation);
		});
		const { sampling = "all", win, blockClass, blockSelector, recordCanvas, dataURLOptions, resolutionScale, canvasMasking } = options;
		this.mutationCb = options.mutationCb;
		this.mirror = options.mirror;
		if (recordCanvas && sampling === "all") this.initCanvasMutationObserver(win, blockClass, blockSelector, dataURLOptions);
		if (recordCanvas && typeof sampling === "number") this.initCanvasFPSObserver(sampling, win, blockClass, blockSelector, {
			dataURLOptions,
			resolutionScale,
			canvasMasking
		});
	}
	initCanvasFPSObserver(fps, win, blockClass, blockSelector, options) {
		if (!("OffscreenCanvas" in win)) return;
		const scale = typeof options.resolutionScale === "number" && Number.isFinite(options.resolutionScale) ? Math.min(1, Math.max(MIN_CANVAS_RESOLUTION_SCALE, options.resolutionScale)) : 1;
		const canvasContextReset = initCanvasContextObserver(win, blockClass, blockSelector, true);
		const snapshotInProgressMap = /* @__PURE__ */ new Map();
		let worker;
		try {
			worker = new WorkerWrapper();
		} catch {
			return;
		}
		let workerErrored = false;
		worker.onerror = () => {
			var _worker$terminate;
			workerErrored = true;
			cancelAnimationFrame(rafId);
			(_worker$terminate = worker.terminate) === null || _worker$terminate === void 0 || _worker$terminate.call(worker);
			this.resetFrameDedup = null;
		};
		this.resetFrameDedup = () => {
			worker.postMessage({ resetFrameDedup: true });
		};
		worker.onmessage = (e) => {
			const { id } = e.data;
			snapshotInProgressMap.set(id, false);
			if (!("base64" in e.data)) return;
			const { base64, type, displayWidth, displayHeight } = e.data;
			const dw = displayWidth;
			const dh = displayHeight;
			this.mutationCb({
				id,
				type: CanvasContext["2D"],
				commands: [{
					property: "clearRect",
					args: [
						0,
						0,
						dw,
						dh
					]
				}, {
					property: "drawImage",
					args: [
						{
							rr_type: "ImageBitmap",
							args: [{
								rr_type: "Blob",
								data: [{
									rr_type: "ArrayBuffer",
									base64
								}],
								type
							}]
						},
						0,
						0,
						dw,
						dh
					]
				}],
				displayWidth: dw,
				displayHeight: dh
			});
		};
		const timeBetweenSnapshots = 1e3 / fps;
		let lastSnapshotTime = 0;
		let rafId;
		const getCanvas = () => {
			const matchedCanvas = [];
			const searchCanvas = (haystack) => {
				try {
					haystack.querySelectorAll("canvas").forEach((canvas) => {
						if (!isBlocked(canvas, blockClass, blockSelector, true)) matchedCanvas.push(canvas);
					});
					haystack.querySelectorAll("*").forEach((elem) => {
						if (elem.shadowRoot) searchCanvas(elem.shadowRoot);
					});
				} catch {}
			};
			searchCanvas(win.document);
			return matchedCanvas;
		};
		const takeCanvasSnapshots = (timestamp) => {
			if (workerErrored) return;
			if (lastSnapshotTime && timestamp - lastSnapshotTime < timeBetweenSnapshots) {
				rafId = requestAnimationFrame(takeCanvasSnapshots);
				return;
			}
			lastSnapshotTime = timestamp;
			getCanvas().forEach(async (canvas) => {
				const id = this.mirror.getId(canvas);
				if (snapshotInProgressMap.get(id)) return;
				if (canvas.width === 0 || canvas.height === 0) return;
				snapshotInProgressMap.set(id, true);
				try {
					if (["webgl", "webgl2"].includes(canvas.__context)) {
						var _context$isContextLos, _context$getContextAt;
						const context = canvas.getContext(canvas.__context);
						if (context === null || context === void 0 || (_context$isContextLos = context.isContextLost) === null || _context$isContextLos === void 0 ? void 0 : _context$isContextLos.call(context)) {
							snapshotInProgressMap.set(id, false);
							return;
						}
						if ((context === null || context === void 0 || (_context$getContextAt = context.getContextAttributes()) === null || _context$getContextAt === void 0 ? void 0 : _context$getContextAt.preserveDrawingBuffer) === false) context.clear(context.COLOR_BUFFER_BIT);
					}
					const displayWidth = canvas.clientWidth || canvas.width;
					const displayHeight = canvas.clientHeight || canvas.height;
					const captureWidth = Math.max(1, Math.round(displayWidth * scale));
					const captureHeight = Math.max(1, Math.round(displayHeight * scale));
					const maskRegions = computeFrameMaskRegions(options.canvasMasking, canvas, captureWidth, captureHeight, displayWidth, displayHeight);
					if (maskRegions === "skip-frame") {
						snapshotInProgressMap.set(id, false);
						return;
					}
					const bitmap = await createImageBitmap(canvas, scale < 1 ? {
						resizeWidth: captureWidth,
						resizeHeight: captureHeight,
						resizeQuality: "medium"
					} : {
						resizeWidth: captureWidth,
						resizeHeight: captureHeight
					});
					worker.postMessage({
						id,
						bitmap,
						width: captureWidth,
						height: captureHeight,
						displayWidth,
						displayHeight,
						dataURLOptions: options.dataURLOptions,
						maskRegions
					}, [bitmap]);
				} catch {
					snapshotInProgressMap.set(id, false);
				}
			});
			rafId = requestAnimationFrame(takeCanvasSnapshots);
		};
		rafId = requestAnimationFrame(takeCanvasSnapshots);
		this.resetObservers = () => {
			var _worker$terminate2;
			canvasContextReset();
			cancelAnimationFrame(rafId);
			(_worker$terminate2 = worker.terminate) === null || _worker$terminate2 === void 0 || _worker$terminate2.call(worker);
			this.resetFrameDedup = null;
		};
	}
	initCanvasMutationObserver(win, blockClass, blockSelector, dataURLOptions) {
		this.startRAFTimestamping();
		this.startPendingCanvasMutationFlusher();
		const canvasContextReset = initCanvasContextObserver(win, blockClass, blockSelector, false);
		const canvas2DReset = initCanvas2DMutationObserver(this.processMutation.bind(this), win, blockClass, blockSelector, dataURLOptions);
		const canvasWebGL1and2Reset = initCanvasWebGLMutationObserver(this.processMutation.bind(this), win, blockClass, blockSelector, dataURLOptions);
		this.resetObservers = () => {
			canvasContextReset();
			canvas2DReset();
			canvasWebGL1and2Reset();
		};
	}
	startPendingCanvasMutationFlusher() {
		this.rafIdFlush = requestAnimationFrame(() => this.flushPendingCanvasMutations());
	}
	startRAFTimestamping() {
		const setLatestRAFTimestamp = (timestamp) => {
			this.rafStamps.latestId = timestamp;
			this.rafIdTimestamp = requestAnimationFrame(setLatestRAFTimestamp);
		};
		this.rafIdTimestamp = requestAnimationFrame(setLatestRAFTimestamp);
	}
	flushPendingCanvasMutations() {
		this.pendingCanvasMutations.forEach((_values, canvas) => {
			const id = this.mirror.getId(canvas);
			this.flushPendingCanvasMutationFor(canvas, id);
		});
		this.rafIdFlush = requestAnimationFrame(() => this.flushPendingCanvasMutations());
	}
	flushPendingCanvasMutationFor(canvas, id) {
		if (this.frozen || this.locked) return;
		const valuesWithType = this.pendingCanvasMutations.get(canvas);
		if (!valuesWithType || id === -1) return;
		const values = valuesWithType.map((value) => {
			const { type, ...rest } = value;
			return rest;
		});
		const { type } = valuesWithType[0];
		this.mutationCb({
			id,
			type,
			commands: values
		});
		this.pendingCanvasMutations.delete(canvas);
	}
};
//#endregion
//#region ../rrweb/src/record/stylesheet-manager.ts
var StylesheetManager = class {
	constructor(options) {
		_defineProperty(this, "trackedLinkElements", /* @__PURE__ */ new WeakSet());
		_defineProperty(this, "pendingDeferredSheets", /* @__PURE__ */ new Set());
		_defineProperty(this, "mutationCb", void 0);
		_defineProperty(this, "adoptedStyleSheetCb", void 0);
		_defineProperty(this, "maskAllElementAttributes", void 0);
		_defineProperty(this, "maskAttributeFn", void 0);
		_defineProperty(this, "styleMirror", new StyleSheetMirror());
		this.mutationCb = options.mutationCb;
		this.adoptedStyleSheetCb = options.adoptedStyleSheetCb;
		this.maskAllElementAttributes = options.maskAllElementAttributes ?? false;
		this.maskAttributeFn = options.maskAttributeFn;
	}
	attachLinkElement(linkEl, childSn) {
		if ("_cssText" in childSn.attributes) this.mutationCb({
			adds: [],
			removes: [],
			texts: [],
			attributes: [{
				id: childSn.id,
				attributes: childSn.attributes
			}]
		});
		this.trackLinkElement(linkEl);
	}
	/**
	* Inline a `<link rel=stylesheet>` that the full snapshot skipped because it
	* ran out of stylesheet budget. The returned task stringifies a bounded rule
	* range per `advance` call, accumulating across calls, and emits ONE
	* attribute mutation carrying the complete `_cssText` when the last slice
	* finishes - a partial sheet never reaches the wire, and dropping the task
	* mid-sheet emits nothing and leaks nothing. Same mutation shape as
	* {@link attachLinkElement} - the replayer swaps the link for a `<style>`
	* carrying `_cssText`. Returns null when there is nothing to inline.
	*/
	beginDeferredLinkInlining(linkEl, id) {
		if (id === -1 || !linkEl.isConnected) return null;
		let cursor = null;
		let capturedSheet = null;
		try {
			capturedSheet = linkEl.sheet;
			if (capturedSheet) cursor = createStylesheetTextCursor(capturedSheet);
		} catch (e) {}
		if (!cursor || !capturedSheet) {
			recordDeferredStylesheetFailure();
			return null;
		}
		const readyCursor = cursor;
		let invalidatedByMutation = false;
		const pendingEntry = {
			sheet: capturedSheet,
			invalidate: () => {
				invalidatedByMutation = true;
			}
		};
		this.pendingDeferredSheets.add(pendingEntry);
		let completed = false;
		return {
			advance: (maxRules) => {
				if (completed) return true;
				const startedAt = nowMs();
				const startGeneration = getSuspensionGeneration();
				let finished = true;
				try {
					if (invalidatedByMutation) {
						completed = true;
						recordDeferredStylesheetFailure();
						return true;
					}
					if (!readyCursor.advance(maxRules)) {
						finished = false;
						return false;
					}
					completed = true;
					const cssText = readyCursor.text();
					if (!linkEl.isConnected) return true;
					let currentSheet = null;
					try {
						currentSheet = linkEl.sheet;
					} catch (e) {}
					if (currentSheet !== capturedSheet) {
						recordDeferredStylesheetFailure();
						return true;
					}
					if (!cssText) {
						recordDeferredStylesheetFailure();
						return true;
					}
					this.emitCssTextMutation(linkEl, id, cssText);
					return true;
				} finally {
					if (finished) this.pendingDeferredSheets.delete(pendingEntry);
					recordDeferredStylesheetSlice(nowMs() - startedAt, startGeneration);
				}
			},
			remainingRules: () => readyCursor.remainingRules(),
			discard: () => {
				this.pendingDeferredSheets.delete(pendingEntry);
			}
		};
	}
	/**
	* Recorder hook: application code mutated `sheet` through the CSSOM
	* (insertRule/deleteRule/setProperty/removeProperty). A pending deferral
	* whose captured root sheet is `sheet` must never emit: the mutation was
	* already recorded as a StyleSheetRule/StyleDeclaration event, and a later
	* `_cssText` mutation carrying the defer-time text would overwrite it in
	* replay. Cancelling keeps the link's href-only fallback, and the loss is
	* counted when the task next advances. Mutations to `@import`ed sheets
	* inside a captured chain deliberately do NOT invalidate: an imported sheet
	* has no ownerNode and is not in the style mirror, so the observers cannot
	* attribute (and never emit) an event for it - there is nothing the
	* defer-time text could overwrite, and that text is exactly what a
	* synchronous pass at defer time would have recorded.
	*/
	onCssomSheetMutation(sheet) {
		if (!sheet || this.pendingDeferredSheets.size === 0) return;
		for (const pending of this.pendingDeferredSheets) if (pending.sheet === sheet) {
			this.pendingDeferredSheets.delete(pending);
			pending.invalidate();
		}
	}
	/** One-call variant of {@link beginDeferredLinkInlining}: the whole sheet in a single slice. */
	inlineDeferredLinkElement(linkEl, id) {
		var _this$beginDeferredLi;
		(_this$beginDeferredLi = this.beginDeferredLinkInlining(linkEl, id)) === null || _this$beginDeferredLi === void 0 || _this$beginDeferredLi.advance(Infinity);
	}
	emitCssTextMutation(linkEl, id, cssText) {
		this.mutationCb({
			adds: [],
			removes: [],
			texts: [],
			attributes: [{
				id,
				attributes: { _cssText: maskAttributeValue({
					element: linkEl,
					name: "_cssText",
					value: cssText,
					maskAllElementAttributes: this.maskAllElementAttributes,
					maskAttributeFn: this.maskAttributeFn
				}) }
			}]
		});
	}
	trackLinkElement(linkEl) {
		if (this.trackedLinkElements.has(linkEl)) return;
		this.trackedLinkElements.add(linkEl);
		this.trackStylesheetInLinkElement(linkEl);
	}
	adoptStyleSheets(sheets, hostId) {
		if (sheets.length === 0) return;
		const adoptedStyleSheetData = {
			id: hostId,
			styleIds: []
		};
		const styles = [];
		for (const sheet of sheets) {
			let styleId;
			if (!this.styleMirror.has(sheet)) {
				const newStyleId = this.styleMirror.add(sheet);
				styleId = newStyleId;
				const startedAt = nowMs();
				try {
					runNonDeferrableStylesheetWork(() => {
						try {
							const sheetRules = sheet.rules || sheet.cssRules;
							if (sheetRules) countStylesheetRules(sheetRules);
						} catch (e) {}
						styles.push({
							styleId: newStyleId,
							rules: Array.from(sheet.rules || CSSRule, (r, index) => ({
								rule: stringifyRule(r, sheet.href),
								index
							}))
						});
					});
				} finally {
					recordStylesheetCost(nowMs() - startedAt);
				}
			} else styleId = this.styleMirror.getId(sheet);
			adoptedStyleSheetData.styleIds.push(styleId);
		}
		if (styles.length > 0) adoptedStyleSheetData.styles = styles;
		this.adoptedStyleSheetCb(adoptedStyleSheetData);
	}
	reset() {
		this.styleMirror.reset();
		this.trackedLinkElements = /* @__PURE__ */ new WeakSet();
		this.pendingDeferredSheets.clear();
		resetStylesheetLoadTracking();
	}
	trackStylesheetInLinkElement(_linkEl) {}
};
//#endregion
//#region ../rrweb/src/record/processed-node-manager.ts
/**
* Keeps a log of nodes that could show up in multiple mutation buffer but shouldn't be handled twice.
*/
var ProcessedNodeManager = class {
	constructor() {
		_defineProperty(this, "nodeMap", /* @__PURE__ */ new WeakMap());
		_defineProperty(this, "active", false);
	}
	inOtherBuffer(node, thisBuffer) {
		const buffers = this.nodeMap.get(node);
		return buffers && Array.from(buffers).some((buffer) => buffer !== thisBuffer);
	}
	add(node, buffer) {
		if (!this.active) {
			this.active = true;
			requestAnimationFrame(() => {
				this.nodeMap = /* @__PURE__ */ new WeakMap();
				this.active = false;
			});
		}
		this.nodeMap.set(node, (this.nodeMap.get(node) || /* @__PURE__ */ new Set()).add(buffer));
	}
	destroy() {}
};
//#endregion
//#region ../rrweb/src/record/index.ts
var wrappedEmit;
var takeFullSnapshot;
var canvasManager;
var recording = false;
try {
	if (Array.from([1], (x) => x * 2)[0] !== 2) {
		var _cleanFrame$contentWi;
		const cleanFrame = document.createElement("iframe");
		document.body.appendChild(cleanFrame);
		Array.from = ((_cleanFrame$contentWi = cleanFrame.contentWindow) === null || _cleanFrame$contentWi === void 0 ? void 0 : _cleanFrame$contentWi.Array.from) || Array.from;
		document.body.removeChild(cleanFrame);
	}
} catch (err) {
	console.debug("Unable to override Array.from", err);
}
var mirror = createMirror();
var nonUserInitiatedSources = /* @__PURE__ */ new Set([
	IncrementalSource.Mutation,
	IncrementalSource.MediaInteraction,
	IncrementalSource.StyleSheetRule,
	IncrementalSource.CanvasMutation,
	IncrementalSource.Font,
	IncrementalSource.Log,
	IncrementalSource.StyleDeclaration,
	IncrementalSource.AdoptedStyleSheet
]);
function whenIdle(cb) {
	const win = window;
	if (typeof win.requestIdleCallback === "function") {
		const handle = win.requestIdleCallback(cb, { timeout: 2e3 });
		return { cancel: () => {
			var _win$cancelIdleCallba;
			return (_win$cancelIdleCallba = win.cancelIdleCallback) === null || _win$cancelIdleCallba === void 0 ? void 0 : _win$cancelIdleCallba.call(win, handle);
		} };
	}
	const handle = setTimeout(cb, 250);
	return { cancel: () => clearTimeout(handle) };
}
var DEFERRED_STYLESHEET_RULES_PER_SLICE = 200;
var DEFERRED_STYLESHEET_SLICES_PER_FALLBACK_TICK = 10;
var DEFERRED_STYLESHEET_SYNC_FLUSH_MAX_SLICES = 50;
/**
* Inline the `<link rel=stylesheet>` elements the snapshot skipped once it ran out
* of stylesheet budget, emitting each as an attribute mutation. The unit of work is
* a bounded range of CSSRules, not a whole sheet: a resumable cursor stringifies
* {@link DEFERRED_STYLESHEET_RULES_PER_SLICE} rules per slice and accumulates, so
* even a monolithic sheet never holds the main thread for one long task. At least
* one slice per idle callback so a busy main thread still makes progress, more
* slices (and more sheets) while the deadline says we're genuinely idle. A sheet's
* mutation is emitted atomically when its last slice completes - cancelling
* mid-sheet emits nothing for that sheet.
*
* Exported for unit tests only.
*/
function inlineDeferredStylesheets(links, stylesheetManager, onDone) {
	let cancelled = false;
	let pending = null;
	let index = 0;
	let task = null;
	const hasWork = () => task !== null || index < links.length;
	const startNextTask = () => {
		const link = links[index];
		links[index] = null;
		index += 1;
		if (link) callSafely(() => {
			task = stylesheetManager.beginDeferredLinkInlining(link, mirror.getId(link));
		});
	};
	const advanceActiveTask = () => {
		if (!task) return;
		const activeTask = task;
		let finished = true;
		callSafely(() => {
			finished = activeTask.advance(DEFERRED_STYLESHEET_RULES_PER_SLICE);
		});
		if (finished) task = null;
	};
	const runOneSlice = () => {
		if (!task) startNextTask();
		advanceActiveTask();
	};
	const step = (deadline) => {
		pending = null;
		if (cancelled) return;
		let slices = 0;
		do {
			try {
				runOneSlice();
			} catch (e) {
				task === null || task === void 0 || task.discard();
				task = null;
				recordDeferredStylesheetsAbandoned(1);
			}
			slices += 1;
		} while (!cancelled && hasWork() && (deadline ? !deadline.didTimeout && deadline.timeRemaining() > 5 : slices < DEFERRED_STYLESHEET_SLICES_PER_FALLBACK_TICK));
		if (cancelled) return;
		if (hasWork()) pending = whenIdle(step);
		else onDone();
	};
	pending = whenIdle(step);
	return {
		cancel: () => {
			cancelled = true;
			task === null || task === void 0 || task.discard();
			task = null;
			pending === null || pending === void 0 || pending.cancel();
			pending = null;
		},
		flush: () => {
			if (cancelled) return;
			cancelled = true;
			pending === null || pending === void 0 || pending.cancel();
			pending = null;
			let slices = 0;
			let skipped = 0;
			while (hasWork() && slices < DEFERRED_STYLESHEET_SYNC_FLUSH_MAX_SLICES) {
				if (!task) startNextTask();
				const activeTask = task;
				if (!activeTask) continue;
				if (Math.floor(activeTask.remainingRules() / DEFERRED_STYLESHEET_RULES_PER_SLICE) + 1 > DEFERRED_STYLESHEET_SYNC_FLUSH_MAX_SLICES - slices) {
					activeTask.discard();
					task = null;
					skipped += 1;
					continue;
				}
				try {
					advanceActiveTask();
				} catch (e) {
					task === null || task === void 0 || task.discard();
					task = null;
					skipped += 1;
				}
				slices += 1;
			}
			if (hasWork() || skipped > 0) {
				let abandoned = skipped + (task !== null ? 1 : 0);
				for (let i = index; i < links.length; i++) if (links[i] !== null) abandoned += 1;
				recordDeferredStylesheetsAbandoned(abandoned);
				task === null || task === void 0 || task.discard();
				task = null;
			}
			onDone();
		}
	};
}
function record(options = {}) {
	let deferredStylesheetInlining;
	const { emit, checkoutEveryNms, checkoutEveryNth, blockClass = "rr-block", blockSelector = null, ignoreClass = "rr-ignore", ignoreSelector = null, maskTextClass = "rr-mask", maskTextSelector = null, inlineStylesheet = true, inlineStylesheetBudgetRules, maskAllInputs, maskInputOptions: _maskInputOptions, slimDOMOptions: _slimDOMOptions, maskInputFn, maskTextFn, maskAllElementAttributes = false, maskAttributeFn, hooks, packFn, sampling = {}, dataURLOptions: _dataURLOptions = {}, canvasResolutionScale, canvasMasking, mousemoveWait, recordDOM = true, recordCanvas = false, recordCrossOriginIframes = false, recordAfter = options.recordAfter === "DOMContentLoaded" ? options.recordAfter : "load", userTriggeredOnInput = false, collectFonts = false, inlineImages = false, plugins, keepIframeSrcFn = () => false, ignoreCSSAttributes = /* @__PURE__ */ new Set([]), attributeFilter, errorHandler } = options;
	registerErrorHandler(errorHandler);
	const dataURLOptions = {
		type: "image/webp",
		quality: .4,
		maxBase64ImageLength: 1048576,
		..._dataURLOptions
	};
	const inEmittingFrame = recordCrossOriginIframes ? window.parent === window : true;
	let passEmitsToParent = false;
	if (!inEmittingFrame) try {
		if (window.parent.document) passEmitsToParent = false;
	} catch (e) {
		passEmitsToParent = true;
	}
	if (inEmittingFrame && !emit) throw new Error("emit function is required");
	if (!inEmittingFrame && !passEmitsToParent) return () => {};
	if (mousemoveWait !== void 0 && sampling.mousemove === void 0) sampling.mousemove = mousemoveWait;
	mirror.reset();
	const maskInputOptions = maskAllInputs === true ? {
		color: true,
		date: true,
		"datetime-local": true,
		email: true,
		month: true,
		number: true,
		range: true,
		search: true,
		tel: true,
		text: true,
		time: true,
		url: true,
		week: true,
		textarea: true,
		select: true,
		password: true
	} : _maskInputOptions !== void 0 ? _maskInputOptions : { password: true };
	const slimDOMOptions = slimDOMDefaults(_slimDOMOptions !== void 0 ? _slimDOMOptions : false);
	polyfill();
	let lastFullSnapshotEvent;
	let incrementalSnapshotCount = 0;
	const iframeObserverCleanups = /* @__PURE__ */ new Map();
	let runAndDetachIframeCleanup;
	let cleanupDetachedIframeObservers;
	const eventProcessor = (e) => {
		for (const plugin of plugins || []) if (plugin.eventProcessor) e = plugin.eventProcessor(e);
		if (packFn && !passEmitsToParent) e = packFn(e);
		return e;
	};
	wrappedEmit = (r, isCheckout) => {
		var _mutationBuffers$;
		const e = r;
		e.timestamp = nowTimestamp();
		if (((_mutationBuffers$ = mutationBuffers[0]) === null || _mutationBuffers$ === void 0 ? void 0 : _mutationBuffers$.isFrozen()) && e.type !== EventType.FullSnapshot && !(e.type === EventType.IncrementalSnapshot && nonUserInitiatedSources.has(e.data.source))) mutationBuffers.forEach((buf) => buf.unfreeze());
		if (inEmittingFrame) emit === null || emit === void 0 || emit(eventProcessor(e), isCheckout);
		else if (passEmitsToParent) {
			const message = {
				type: "rrweb",
				event: eventProcessor(e),
				origin: window.location.origin,
				isCheckout
			};
			window.parent.postMessage(message, "*");
		}
		if (e.type === EventType.FullSnapshot) {
			lastFullSnapshotEvent = e;
			incrementalSnapshotCount = 0;
		} else if (e.type === EventType.IncrementalSnapshot) {
			if (e.data.source === IncrementalSource.Mutation && e.data.isAttachIframe) return;
			incrementalSnapshotCount++;
			const exceedCount = checkoutEveryNth && incrementalSnapshotCount >= checkoutEveryNth;
			const exceedTime = checkoutEveryNms && e.timestamp - lastFullSnapshotEvent.timestamp > checkoutEveryNms;
			if (exceedCount || exceedTime) takeFullSnapshot(true);
		}
	};
	const wrappedMutationEmit = (m) => {
		if (m.removes && m.removes.length > 0) {
			const addedIds = m.adds.length > 0 ? new Set(m.adds.map((add) => add.node.id)) : null;
			const addedIframeElements = /* @__PURE__ */ new Set();
			if (m.adds.length > 0) for (const add of m.adds) {
				const node = mirror.getNode(add.node.id);
				if (node && node.nodeName === "IFRAME") addedIframeElements.add(node);
			}
			m.removes.forEach(({ id }) => {
				if (addedIds && addedIds.has(id)) return;
				const removedIframe = iframeManager.getIframeElementById(id);
				if (removedIframe && addedIframeElements.has(removedIframe)) {
					iframeManager.forgetIframeId(id);
					return;
				}
				runAndDetachIframeCleanup === null || runAndDetachIframeCleanup === void 0 || runAndDetachIframeCleanup(id);
				iframeManager.removeIframeById(id);
			});
			cleanupDetachedIframeObservers === null || cleanupDetachedIframeObservers === void 0 || cleanupDetachedIframeObservers();
			iframeManager.cleanupDetachedIframes();
		}
		wrappedEmit({
			type: EventType.IncrementalSnapshot,
			data: {
				source: IncrementalSource.Mutation,
				...m
			}
		});
	};
	const wrappedScrollEmit = (p) => wrappedEmit({
		type: EventType.IncrementalSnapshot,
		data: {
			source: IncrementalSource.Scroll,
			...p
		}
	});
	const wrappedCanvasMutationEmit = (p) => wrappedEmit({
		type: EventType.IncrementalSnapshot,
		data: {
			source: IncrementalSource.CanvasMutation,
			...p
		}
	});
	const wrappedAdoptedStyleSheetEmit = (a) => wrappedEmit({
		type: EventType.IncrementalSnapshot,
		data: {
			source: IncrementalSource.AdoptedStyleSheet,
			...a
		}
	});
	const stylesheetManager = new StylesheetManager({
		mutationCb: wrappedMutationEmit,
		adoptedStyleSheetCb: wrappedAdoptedStyleSheetEmit,
		maskAllElementAttributes,
		maskAttributeFn
	});
	const iframeManager = new IframeManager({
		mirror,
		mutationCb: wrappedMutationEmit,
		stylesheetManager,
		recordCrossOriginIframes,
		wrappedEmit
	});
	/**
	* Exposes mirror to the plugins
	*/
	for (const plugin of plugins || []) if (plugin.getMirror) plugin.getMirror({
		nodeMirror: mirror,
		crossOriginIframeMirror: iframeManager.crossOriginIframeMirror,
		crossOriginIframeStyleMirror: iframeManager.crossOriginIframeStyleMirror
	});
	const processedNodeManager = new ProcessedNodeManager();
	const canvasMaskingConfigured = canvasMasking === null || canvasMasking === void 0 ? void 0 : canvasMasking.configured;
	canvasManager = new CanvasManager({
		recordCanvas,
		mutationCb: wrappedCanvasMutationEmit,
		win: window,
		blockClass,
		blockSelector,
		mirror,
		sampling: sampling.canvas,
		dataURLOptions,
		resolutionScale: canvasResolutionScale,
		canvasMasking
	});
	const shadowDomManager = new ShadowDomManager({
		mutationCb: wrappedMutationEmit,
		scrollCb: wrappedScrollEmit,
		bypassOptions: {
			blockClass,
			blockSelector,
			maskTextClass,
			maskTextSelector,
			inlineStylesheet,
			maskInputOptions,
			dataURLOptions,
			maskTextFn,
			maskInputFn,
			maskAllElementAttributes,
			maskAttributeFn,
			recordCanvas,
			canvasMaskingConfigured,
			inlineImages,
			sampling,
			slimDOMOptions,
			iframeManager,
			stylesheetManager,
			canvasManager,
			keepIframeSrcFn,
			processedNodeManager,
			attributeFilter
		},
		mirror
	});
	takeFullSnapshot = (isCheckout = false) => {
		if (!recordDOM) return;
		beginSnapshotCostTracking(inlineStylesheetBudgetRules);
		try {
			wrappedEmit({
				type: EventType.Meta,
				data: {
					href: window.location.href,
					width: getWindowWidth(),
					height: getWindowHeight()
				}
			}, isCheckout);
			deferredStylesheetInlining === null || deferredStylesheetInlining === void 0 || deferredStylesheetInlining.cancel();
			deferredStylesheetInlining = void 0;
			stylesheetManager.reset();
			shadowDomManager.init();
			mutationBuffers.forEach((buf) => buf.lock());
			let node = null;
			let deferredStylesheetLinks = [];
			try {
				node = snapshot(document, {
					mirror,
					blockClass,
					blockSelector,
					maskTextClass,
					maskTextSelector,
					inlineStylesheet,
					maskAllInputs: maskInputOptions,
					inlineStylesheetBudgetRules,
					maskTextFn,
					maskInputFn,
					maskAllElementAttributes,
					maskAttributeFn,
					slimDOM: slimDOMOptions,
					dataURLOptions,
					recordCanvas,
					canvasMaskingConfigured,
					inlineImages,
					onSerialize: (n) => {
						if (isSerializedIframe(n, mirror)) iframeManager.addIframe(n);
						if (isSerializedStylesheet(n, mirror)) stylesheetManager.trackLinkElement(n);
						if (hasShadowRoot(n)) shadowDomManager.addShadowRoot(src_default.shadowRoot(n), document);
					},
					onIframeLoad: (iframe, childSn) => {
						iframeManager.attachIframe(iframe, childSn);
						shadowDomManager.observeAttachShadow(iframe);
					},
					onIframeListenerRegistered: (iframe, disposer) => {
						iframeManager.registerLoadListenerDisposer(iframe, disposer);
					},
					onStylesheetLoad: (linkEl, childSn) => {
						stylesheetManager.attachLinkElement(linkEl, childSn);
					},
					keepIframeSrcFn
				});
			} finally {
				deferredStylesheetLinks = takeDeferredStylesheetLinks();
			}
			if (!node) return console.warn("Failed to snapshot the document");
			wrappedEmit({
				type: EventType.FullSnapshot,
				data: {
					node,
					initialOffset: getWindowScroll(window)
				}
			}, isCheckout);
			mutationBuffers.forEach((buf) => buf.unlock());
			canvasManager.onFullSnapshot();
			if (deferredStylesheetLinks.length) {
				const inlining = inlineDeferredStylesheets(deferredStylesheetLinks, stylesheetManager, () => {
					if (deferredStylesheetInlining === inlining) deferredStylesheetInlining = void 0;
				});
				deferredStylesheetInlining = inlining;
			}
			if (recordCrossOriginIframes) iframeManager.reattachIframes();
			if (document.adoptedStyleSheets && document.adoptedStyleSheets.length > 0) stylesheetManager.adoptStyleSheets(document.adoptedStyleSheets, mirror.getId(document));
		} finally {
			endSnapshotCostTracking();
		}
	};
	try {
		const handlers = [];
		handlers.push(on("pagehide", () => {
			try {
				deferredStylesheetInlining === null || deferredStylesheetInlining === void 0 || deferredStylesheetInlining.flush();
			} catch (e) {}
			deferredStylesheetInlining = void 0;
		}, window));
		for (const suspensionEvent of [
			"visibilitychange",
			"freeze",
			"resume"
		]) handlers.push(on(suspensionEvent, noteVisibilityChange, document));
		runAndDetachIframeCleanup = (iframeId) => {
			const cleanups = iframeObserverCleanups.get(iframeId);
			if (!cleanups) return;
			cleanups.forEach((cleanup) => {
				callSafely(cleanup);
				const idx = handlers.indexOf(cleanup);
				if (idx !== -1) handlers.splice(idx, 1);
			});
			iframeObserverCleanups.delete(iframeId);
		};
		cleanupDetachedIframeObservers = () => {
			for (const [iframeId] of iframeObserverCleanups) {
				const iframe = mirror.getNode(iframeId);
				if (!iframe) {
					runAndDetachIframeCleanup === null || runAndDetachIframeCleanup === void 0 || runAndDetachIframeCleanup(iframeId);
					continue;
				}
				try {
					if (!iframe.contentDocument || !iframe.contentDocument.defaultView) runAndDetachIframeCleanup === null || runAndDetachIframeCleanup === void 0 || runAndDetachIframeCleanup(iframeId);
				} catch {
					runAndDetachIframeCleanup === null || runAndDetachIframeCleanup === void 0 || runAndDetachIframeCleanup(iframeId);
				}
			}
		};
		const observe = (doc) => {
			var _plugins$filter;
			return callbackWrapper(initObservers)({
				mutationCb: wrappedMutationEmit,
				mousemoveCb: (positions, source) => wrappedEmit({
					type: EventType.IncrementalSnapshot,
					data: {
						source,
						positions
					}
				}),
				mouseInteractionCb: (d) => wrappedEmit({
					type: EventType.IncrementalSnapshot,
					data: {
						source: IncrementalSource.MouseInteraction,
						...d
					}
				}),
				scrollCb: wrappedScrollEmit,
				viewportResizeCb: (d) => wrappedEmit({
					type: EventType.IncrementalSnapshot,
					data: {
						source: IncrementalSource.ViewportResize,
						...d
					}
				}),
				inputCb: (v) => wrappedEmit({
					type: EventType.IncrementalSnapshot,
					data: {
						source: IncrementalSource.Input,
						...v
					}
				}),
				mediaInteractionCb: (p) => wrappedEmit({
					type: EventType.IncrementalSnapshot,
					data: {
						source: IncrementalSource.MediaInteraction,
						...p
					}
				}),
				styleSheetRuleCb: (r) => wrappedEmit({
					type: EventType.IncrementalSnapshot,
					data: {
						source: IncrementalSource.StyleSheetRule,
						...r
					}
				}),
				styleDeclarationCb: (r) => wrappedEmit({
					type: EventType.IncrementalSnapshot,
					data: {
						source: IncrementalSource.StyleDeclaration,
						...r
					}
				}),
				canvasMutationCb: wrappedCanvasMutationEmit,
				fontCb: (p) => wrappedEmit({
					type: EventType.IncrementalSnapshot,
					data: {
						source: IncrementalSource.Font,
						...p
					}
				}),
				selectionCb: (p) => {
					wrappedEmit({
						type: EventType.IncrementalSnapshot,
						data: {
							source: IncrementalSource.Selection,
							...p
						}
					});
				},
				customElementCb: (c) => {
					wrappedEmit({
						type: EventType.IncrementalSnapshot,
						data: {
							source: IncrementalSource.CustomElement,
							...c
						}
					});
				},
				blockClass,
				ignoreClass,
				ignoreSelector,
				maskTextClass,
				maskTextSelector,
				maskInputOptions,
				inlineStylesheet,
				sampling,
				recordDOM,
				recordCanvas,
				canvasMaskingConfigured,
				inlineImages,
				userTriggeredOnInput,
				collectFonts,
				doc,
				maskInputFn,
				maskTextFn,
				maskAllElementAttributes,
				maskAttributeFn,
				keepIframeSrcFn,
				blockSelector,
				slimDOMOptions,
				dataURLOptions,
				mirror,
				iframeManager,
				stylesheetManager,
				shadowDomManager,
				processedNodeManager,
				canvasManager,
				ignoreCSSAttributes,
				attributeFilter,
				plugins: (plugins === null || plugins === void 0 || (_plugins$filter = plugins.filter((p) => p.observer)) === null || _plugins$filter === void 0 ? void 0 : _plugins$filter.map((p) => ({
					observer: p.observer,
					options: p.options,
					callback: (payload) => wrappedEmit({
						type: EventType.Plugin,
						data: {
							plugin: p.name,
							payload
						}
					})
				}))) || []
			}, hooks);
		};
		const loadListener = (iframeEl) => {
			try {
				const iframeId = mirror.getId(iframeEl);
				const cleanup = observe(iframeEl.contentDocument);
				if (typeof cleanup === "function") {
					handlers.push(cleanup);
					if (iframeId !== -1) {
						let bucket = iframeObserverCleanups.get(iframeId);
						if (!bucket) {
							bucket = /* @__PURE__ */ new Set();
							iframeObserverCleanups.set(iframeId, bucket);
						}
						bucket.add(cleanup);
					}
				}
			} catch (error) {
				console.warn(error);
			}
		};
		iframeManager.addLoadListener(loadListener);
		iframeManager.addPageHideListener((iframeEl) => {
			const iframeId = mirror.getId(iframeEl);
			runAndDetachIframeCleanup === null || runAndDetachIframeCleanup === void 0 || runAndDetachIframeCleanup(iframeId);
			findAndRemoveIframeBuffer(iframeEl);
		});
		let lastFullscreenId = -1;
		const emitFullscreen = (payload) => wrappedEmit({
			type: EventType.Custom,
			data: {
				tag: FullscreenCustomEventTag,
				payload
			}
		});
		const emitFullscreenChange = () => {
			const doc = document;
			const fullscreenEl = doc.fullscreenElement ?? doc.webkitFullscreenElement ?? doc.mozFullScreenElement ?? doc.msFullscreenElement ?? null;
			const id = fullscreenEl ? mirror.getId(fullscreenEl) : -1;
			if (id === lastFullscreenId) return;
			if (lastFullscreenId !== -1) emitFullscreen({
				id: lastFullscreenId,
				enter: false
			});
			lastFullscreenId = id;
			if (id !== -1) emitFullscreen({
				id,
				enter: true
			});
		};
		const init = () => {
			takeFullSnapshot();
			const cleanup = observe(document);
			if (typeof cleanup === "function") handlers.push(cleanup);
			handlers.push(on("fullscreenchange", emitFullscreenChange));
			handlers.push(on("webkitfullscreenchange", emitFullscreenChange));
			handlers.push(on("mozfullscreenchange", emitFullscreenChange));
			handlers.push(on("MSFullscreenChange", emitFullscreenChange));
			recording = true;
		};
		if (["interactive", "complete"].includes(document.readyState)) init();
		else {
			handlers.push(on("DOMContentLoaded", () => {
				wrappedEmit({
					type: EventType.DomContentLoaded,
					data: {}
				});
				if (recordAfter === "DOMContentLoaded") init();
			}));
			handlers.push(on("load", () => {
				wrappedEmit({
					type: EventType.Load,
					data: {}
				});
				if (recordAfter === "load") init();
			}, window));
		}
		return () => {
			try {
				deferredStylesheetInlining === null || deferredStylesheetInlining === void 0 || deferredStylesheetInlining.flush();
			} catch (e) {}
			deferredStylesheetInlining = void 0;
			callAllSafely(handlers);
			processedNodeManager.destroy();
			iframeManager.removeLoadListener();
			iframeManager.destroy();
			iframeObserverCleanups.clear();
			shadowDomManager.reset();
			mirror.reset();
			recording = false;
			unregisterErrorHandler();
		};
	} catch (error) {
		console.warn(error);
	}
}
record.addCustomEvent = ((tag, payload) => {
	if (!recording) throw new Error("please add custom event after start recording");
	wrappedEmit({
		type: EventType.Custom,
		data: {
			tag,
			payload
		}
	});
});
record.freezePage = (() => {
	mutationBuffers.forEach((buf) => buf.freeze());
});
record.takeFullSnapshot = ((isCheckout) => {
	if (!recording) throw new Error("please take full snapshot after start recording");
	takeFullSnapshot(isCheckout);
});
record.mirror = mirror;
//#endregion
export { getDeferredStylesheetStats, getDiscardedDurationSamples, getLastSnapshotCost, getMutationCost, record, resetMaxDepthState, resetSnapshotCostState, wasMaxDepthReached };

//# sourceMappingURL=rrweb-record.js.map